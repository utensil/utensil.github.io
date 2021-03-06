---
title: Linux 2.6内核笔记【Process-1】
tags: 内核, linux, 读书笔记
---

终于挣脱了《Understanding the Linux Kernel》的Process一章。中文版的翻译低级错误太多，所以只好继续看影印版。
 
简介部分，除了通常我们对Process的认识，Linux中值得一提的是：笨重的不分青红皂白把父进程整个地址空间都复制过来的`fork()`用了传说中的Copy-on-Write技术；还有就是2.6启用了lightweight process来支持native的thread。从前是模拟pthread实现，现在的native thread有了LinuxThreads, Native POSIX Thread Library(NPTL)和IBM's Next Generation Posix Threading Package(NGPT)这些库支持。而这又引入了thread group的概念，因为属于同一进程的多个线程(lightweight process)虽然是process，却要以某种一致的方式响应`getpid()`类的系统调用，因此被放在同一个thread group中。
 
也因为这个原因，本文中的process都直接写英文，偶尔出现进程，那是在传统的语境下讨论进程与线程之间的关系。
 
Process Descriptor，也就是struct task_struct，又名task_t，是一个长达306行，集合了众多设计智慧的结构。它非常复杂，不仅有很多字段来表征process的属性，还有很多指向其他结构的指针，比如thread_info这个非常重要的结构。

process的状态
--------------
 
### 字段state
 
运行着的
TASK_RUNNING   其实是 可运行的。`schedule()`按照时间片轮流让所有状态为TASK_RUNNING的process运行。
 
睡眠着、等待着的
TASK_INTERRUPTIBLE   在等待hardware interrupt, system resource,或是signal。
TASK_UNINTERRUPTIBLE   同上，但signal叫不醒。

停下来了的
TASK_STOPPED  退出了。
TASK_TRACED 被Debugger停下来。
 
### 字段exit_state或state

EXIT_ZOMBIE   非正常死亡。其parent process还没有用`wait4()`或`waitpid()`取他的遗物，所以内核不敢焚烧尸体。
EXIT_DEAD  遗物获取完毕了，可以焚烧尸体了。如果是非正常死亡，由于init会接过来做养父，所以init会获取他的遗物。
 
process之间的组织
--------------------
 
有时候面向对象的思想会阻碍我们对现实世界的表达，尤其是可能阻碍性能上的优化。

STL这种利用泛型实现的不侵入的，一般化的途径固然好。但 2.6内核中task_t的结构说明，使用侵入式的embeded数据结构，可以更好地在实体间织出多种关系，满足性能和各方面的要求。

只使用task_t一个结构，利用embeded的双向链表(struct list_head)和单向链表(struct hlist_head)，process之间就织出了process list、runqueue、waitqueue、pidhash table、chained list(thread group)等多个关系，并由外在的array统领，实现了高效率的查找与多个字段间的映射。
 
此笔记不具体复述书中的讨论，只勾勒基本图景。
 
process list包含了所有的task_t， 用的是双向链表，内嵌字段名是tasks。
 
runqueue包含了所有state为TASK_RUNNING的task_t，由140个（一个优先级一个）双向链表组成，内嵌字段名是run_list。这140个双向链表的头放在struct prio_array_t里的一个array中。
 
我们知道，PID可以唯一identify一个process。其实PID有4种，一种是process自身create时候内核 sequentially分配的ID(pid)，一种是thread group中leader的PID（tgid），这个ID其实是进程的主线程的ID，一种是process group中eader的PID(pgrp)[补充介绍：process group的一个常见例子就是：在Bash中执行ls|grep sth|more这样的命令，这里3个process就应该被组织在一个process group中]，还有一种是一个session中leader的PID。
 
因此pidhash table是一个有4项的array，每个array分别是一个对该类PID的hash。这个hash对collision的解决办法是chaining。以tgid为例，collide的tgid的进程被一个单向链表chain着，而同一tgid的进程则只有leader挂在chian上，其他则以双向链表的形式挂在leader上。
 
注意，根据我在LXR中的查证，2.6.11中的对pidhash table、chained list很重要的struct pid，在最新的2.6.29中已经被包裹在struct pid_link中，而且内部的字段也脱胎换骨，其中用于表达thread group的内嵌双向链表字段被拆出来直接放在task_t里。这样对thread group的表达就更为清晰直接。因此书中的讨论已不完全适用。
 
waitqueues，则是所有TASK_INTERRUPTIBLE和TASK_UNINTERRUPTIBLE状态的process。它们按所等待的事件分别排在不同的队（双向链表）中。
 
这里涉及的结构是wait_queue_t。它除了process的指针，还包含了flag和类型为wait_queue_func_t的唤醒处理函数。
 
flag为0说明等待的事件是nonexclusive的，所以事件发生时，唤醒所有等它的process，为1说明等待的事件是exclusive的，比如只有一个的资源，就只唤醒一个。
 
在队列中nonexclusive的process永远从前面加进去（不必分先来后到，大家一起醒），exclusive的process永远从后面加进去（要分先来后到）。这是由`add_wait_queue()`、`add_wait_queue_exclusive()`成的。这样排队，使得wake_up宏中的循环可以在成功唤醒第一个exclusive的process就终止。
 
睡眠和唤醒process的函数或宏有：sleep_on族、2.6引入的wait族函数、wait_event族宏、wake_up族宏。这里只讲一下`sleep_on()`
 
`sleep_on()`本质就是把进程从runqueue拿出来放进wait_queue，然后重新调用`schedule()`面对新的runqueue，按照算法，继续调度。`schedule()`回之后（说明又让自己执行了），就把自己再从从wait_queue拿出来放进runqueue，然后接着执行自己接下来的代码。
 
内核是如何获取当前process的
--------------------------------

用current这个宏可以获得当前process的task_t结构的指针。
 
低版本Linux的current是一个邪恶的全局变量。高版本则利用了内存布局，智能地推断出当前process。
 
Linux用一个union把当前process的thread_info和(倒着增长的)kernel栈放在一个两page长（8kb）的内存区域。
 
```cpp
union thread_union {  
      struct thread_info thread_info;  
      unsigned long stack[2048]; /* 1024 for 4KB stacks */  
  };  
```
 
利用这样的内存布局，三行汇编就可以获得当前process:
 
``` 
movl $0xffffe000,%ecx /* or 0xfffff000 for 4KB stacks */  
  
andl %esp,%ecx  
  
movl (%ecx),p
```  
 
第一二行mask掉esp的一部分，到达了thread_info所对齐的地方。
然后利用指向相应task_t的task字段在thread_info的offset 0的位置的事实，直接**ecx赋值给p，这时p就是当前process的task_t结构的指针。