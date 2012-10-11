---
title: Linux 2.6内核笔记【Process-3：fork、内核进程】
tags: 内核, linux, 读书笔记
---
 
> 按：最后的几篇Linux内核笔记实在是太难产了，这中途读完了APUE，并以JavaEye闲聊的形式做了无数细小的笔记（不日将整理为博客）；也第3次（还是第4次?）阅读了《ACE程序员指南》，不过这一次终于做下了笔记；也看完了Programming Erlang，用Erlang来写基于UDP的TCP的ErlyUbt已经渐渐现出眉目，也已push到了GitHub上面。可惜就是这段时间的该做的正事却没什么进展...
 
> 《Understanding Linux Kernel》在18号必须还给图书馆了...在这两天电脑坏了的日子里，第3次读了即将做笔记的中断与异常、内核同步、时间测量，其余的章节也略读完毕，这些章节希望能够写成一些细小的闲聊。预期电脑应该在今晚恢复正常，在这之前，我来到图书馆，开始写作这酝酿已久的笔记。 第一篇，是对Process的一个收尾。
 
Process的终止 
------------------------

这不是本笔记关注的重点，只记下以下一点：
 
C库函数`exit()`调用`exit_group()`系统调用（做事的是`do_group_exit()`），这会终止整个线程组，而`exit_group()`会调用`exit()`系统调用（做事的是`do_exit()`）来终止一个指定的线程。 
 
Process的诞生
------------------

POSIX里，创建process需要`fork()`，古老的`fork()`是很汗的，它会完整复制父进程的所有资源。Linux则将fork细分为下面三种情况：
 
如果是fork一个正常进程，那么就用Copy-on-Write（CoW）技术，子进程先用着父进程的所有页，它企图修改某一页时，再复制那一页给它去改；
 
如果要的是线程（轻量级进程），那么就是大家共同享有原先那些资源，大家一条船；
 
还有就是`vfork()`所代表的情况：子进程创建出来后，父进程阻塞，这样老虎不在家，猴子当大王，子进程继续用原先的地址空间，直到它终止，或者执行新的程序，父进程就结束阻塞。
 
一个关于系统调用的准备知识：系统调用`xyz()`的函数名往往为`sys_xyz()`，下文对系统调用仅以`sys_xyz()`的形态表达。
 
clone()界面
---------------- 

在Linux里，创建进程的总的界面是`clone()`，这个函数并没有定义在Linux内核源代码中，而是libc的一部分，它负责建立新进程的stack并调用`sys_clone()`。而`sys_clone()`里面实际干活的是`do_fork()`，而`do_fork()`做了许多前前后后的琐事，真正复制进程描述符和相关数据结构的是`copy_process()`。
 
`clone()`是这个样子的：clone(fn, arg, flags, child_stack, 其它我们不关心的参数)。
 
fn是新进程应执行的函数， arg是这个函数的参数。
 
flags的低字节指定新进程结束时发送给老进程的信号，通常为SIGCHLD，高字节则为clone_flag，clone_flag很重要，它决定了clone的行为。有趣的一些clone_flag包括（这些flag定义于<linux/include/linux/sched.h >）：
 
* CLONE_VM(Virtual Memory)：新老进程共享memory descriptor和所有Page Table；
* CLONE_FS(File System)；
* CLONE_FILES；
* CLONE_SIGHAND(Signal Handling)：新老进程共享信号描述符（signal * handler和现已blocked/pending的信号队列）；
* CLONE_PTRACE：用于Debugging；
* CLONE_PARENT：老进程的real_parent登记为新进程的parent和real_parent；
* CLONE_THREAD：新进程加入老进程的线程组；
* CLONE_STOPPED：创建你，但你别运行。
 
child_stack则是新进程用户态stack的地址，要么共享老进程的，要么老进程应为新进程分配新的stack。
 
do_fork()探究
--------------------- 

书中说：`fork()`和`vfork()`只不过是建立在调用`clone()`基础上的wrapper函数（也在libc中），实际上：
 
```cpp
asmlinkage int sys_fork(struct pt_regs regs)  
{  
        return do_fork(SIGCHLD, regs.esp, &regs, 0, NULL, NULL);  
}  
  
asmlinkage int sys_clone(struct pt_regs regs)  
{  
        /* 略去用于把regs拆开成可以传递给do_fork的参数的代码 */  
        return do_fork(clone_flags, newsp, &regs, 0, parent_tidptr, child_tidptr);  
}  
  
asmlinkage int sys_vfork(struct pt_regs regs)  
{  
        return do_fork(CLONE_VFORK | CLONE_VM | SIGCHLD, regs.esp, &regs, 0, NULL, NULL);  
}
```  
 
我一开始猜想，`fork()`和`vfork()`直接呼唤`sys_fork()`和`sys_vfork()`应该也没什么问题，但是，注意到这三个系统调用都只接受pt_regs这样仅包含寄存器的参数，显然`clone()`的工作中主要的部分是把它自身接受的参数转换成寄存器的值，事实上，clone还需要将fn和args压入stack，因为`do_fork()`是这样子的：
 
`do_fork(clone_flags, stack_start, regs, 一些我们不关心的参数)`
 
也就是说`do_fork()`不了解也不需要知道fn和args，它做完fork之后，在某个return处，类似于之前在process切换用过的技巧（jmp+ret）将使CPU从stack中获取返回地址，并错误而正确地拿到了fn的地址。这正是`clone()`这个wrapper要做的事情，`fork()`和`vfork()`不妨复用`clone()`的辛苦。
 
`do_fork()`调用完copy_process之后，除非你指定CLONE_STOPPED，就会呼唤`wake_up_new_task()`，这里面有一点很有趣：
 
如果新老进程在同一CPU上运行，而且没有指定CLONE_VM（也就是终究要分家，要动用CoW），那么就会让新进程先于老进程运行，这样，如果新进程一上来就exec，就省去了CoW的功夫。
 
这是因为exec内部会调用`flush_old_exec()`，从与老进程的共享中中脱离，从此拥有自己的信号描述符、文件，释放了原先的mmap，消灭了对老进程的所有知识——这正是为什么成功执行的exec不会返回也无法返回。总之，此后再也没有共享，自然也不会需要CoW。（参见《Program Execution》一章《exec function》中的介绍。）
 
内核进程（Kernel thread）
------------------------------- 

什么是书中所说的“内核线程”？首先要说明，由于Linux内核中对process和thread的混用，这里的thread其实完全可以理解为process，等价于普通的进程，不能理解为老进程中的一个属于内核的线程。因此，下文都称之为内核进程。
 
内核进程是会和其他进城一样被调度的实体，它和进程的唯一区别就是，它永远运行于内核态，也只访问属于内核的那一部分线性地址（大于PAGE_OFFSET的）。
 
这就使得创建它的时候非常省事，直接和创建它的普通进程共享小于PAGE_OFFSE的线性地址，反正它也不用：
 
```cpp 
int kernel_thread(int (*fn)(void *), void * arg, unsigned long flags)  
{  
        /* 略去用于设置regs的代码 */  
        return do_fork(flags | CLONE_VM | CLONE_UNTRACED, 0, &regs, 0, NULL, NULL);  
}
```  

<linux/include/linux/sched.h >中甚至定义了

```cpp 
#define CLONE_KERNEL     (CLONE_FS | CLONE_FILES | CLONE_SIGHAND )
``` 

可供`kernel_thread()`调用的时候使用，这样节省的克隆就更多了。
 
内核进程由于不受不必要的用户态上下文拖累，可以用于执行一些重要的内核任务，比如，刷新磁盘高速缓存，交换出不用的pageframe，服务网络连接等等，这些任务以前是周期性执行的进程，是线性的执行方式，现在的内核把用户态从他们身上剥离，并且和其它进程放到一起来调度，能获得更好的响应表现。
 
所有进程的祖先是进程0，称为idle进程或swapper进程，它是内核初始化时创建的一个内核进程，它初始化一堆数据结构之后会创建init进程，执行`init()`函数，其中调用exec执行了init程序，至此，init进程变成了一个普通进程。而idle进程之后则一直执行`cpu_idle()`函数没事干。调度程序只有在没有进程处于可运行状态（TASK_RUNNING）才会选择它。
 
如果有多个CPU，BIOS一开始会禁用其它CPU，只留一个，进程0就在其上诞生，它会激活其它CPU，并通过`copy_process()`让每个CPU都有一个pid为0的进程，从而形成了每个CPU都有一个0进程的局面。