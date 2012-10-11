---
title: Linux 2.6内核笔记【Process-2：切换】
tags: 内核, linux, 读书笔记
---

在看Linux内核的时候发现，CPU自己认得（或者说is expecting）很多struct，很多时候内核要做的事情是在内存里准备好这些struct里CPU需要的数据，以供CPU完成相应的任务。比如寻址中的paging部分，内核只需要把page directory中的数据准备好，并把page directory的地址放入cr3，CPU自己就能根据page directory中的数据进行寻址。就像一种契约，CPU对struct的期望，正是内核所要做的事情，反过来说，内核要做的事情仅仅是满足CPU的期望而已。
 
不知读者是否与我有同感，但对于我而言，这使得写操作系统突然变得远远不如想象中那么困难了。因为困难的地方在底层，在硬件。这正是学编程的世界， 没学之前，你永远觉得编程是不可能的事情——如果刚刚学会了C的语法，你会觉得，C里头把数据在内存里移来移去， 加加减减，明明是只能让小孩子玩过家家的东西，怎么就可以在屏幕上画画？让机器做事？后来意识到了好多好多的库，原来自己只需要调用API就好了，那 API的那一边又是怎么实现的呢？终于知道API里面是怎么实现的了，却发现这些实现永远也只是在调用另外一层API，只不过更为底层的API。往地里越钻越深，穿越一层又一层的API，才发现最终不过是在为硬件的期望准备内存中的数据。当然这样的描述忽略了同时在底层我们也发出了汇编指令让机器去做一些除了操作内存加加减减的事情，但硬件才是生命自身，它的电路决定了它如何理会指令、中断和各种事件，如何突然不执行我们（比如，当前用户进程）给它的下一 个指令，突然知道利用内存中的数据去进行上下文转换，如此等等。
 
其实上面这番话也可以反过来说。每当我们的知识前进一步，学的更深了，回头望去，我们承学的东西，不过是一层API，一层界面罢了。
 
一点感想，下面进入正题，这次的笔记是讲述Process的切换：
 
TSS
---------------

先介绍一下对80x86的hardware context switch很重要的TSS结构。
 
> Task State Segment
>  
> A task gate descriptor provides an indirect, protected reference to a > Task State Segment.
> 
> The Task State Segment is a special x86 structure which holds > information about a task. It is used by the operating system kernel for > task management. Specifically, the following information is stored in > the TSS:
> 
> * Processor register state
> * I/O Port permissions
> * Inner level stack pointers
> * Previous TSS link
> All this information should be stored at specific locations within the TSS as specified in the IA-32 manuals.
 
在Linux低版本中，进程切换仅仅需要far jmp到要切换的进程的TSS的selector所在就可以了。（far jmp除了修改eip还修改cs）。
 
在Linux 2.6当中，TSS保存在每CPU一个的GDT（其地址存在gdtr中）中，虽然每个process的TSS不同，但Linux 2.6却不利用其中的 hardware context switch以一个far jmp来实现任务转换，而用一系列的mov指令来实现。这样做的原因是：

1. 可以检验ds和es的值，以防恶意的forge。
2. 硬转换和软转换所用时间相近，而且硬转换是无法再优化的，软转换则可以。
 
Linux 2.6对TSS的使用仅限于：
 
1. User Mode向Kernel Mode切换的时候，从TSS中获取Kernel Stack。
2. User Mode使用in或者out指令的时候，用TSS中的 I/O port permission bitmap验证权限.
 
有一点要注意，process switching是发生在Kernel Mode，在转为Kernel Mode的时候，用户进程使用的通用register已经保存在Kernel Stack上了。然而非通用的register，如esp，由于不能放在TSS中，所以是放在task_t中的一个类型为thread_struct的 thread字段中。
 
process切换两部分：切换paging这里不讲，切换kernel stack、hardware context是由switch_to宏完成的。
 
switch_to宏中的last
--------------------------

switch_to宏的任务就是让一个process停下来，然后让另外一个process运行起来。
 
`switch_to(prev, next, last)`。prev、next分别是切换前后的process的process descriptor(task_t)的地址。last的存在要解释一下：
 
由于switch_to中造成了进程的切换，所以其中前半部分指令在prev的语境(context、Kernel Stack)中执行，后半部分却在next的语境中执行。
 
假设B曾切换为O，那么由于一切换，B就停下来了，所以在B的感觉保持是next为O，prev为B。当我们要从A切换到B的时候，一切换B就醒了，但它却仍然以为next是O，prev是B，就不认识A了。然而A switch_to B中的后半部分却需要B知道A。
 
因此这个宏通常都是这么用的：`switch_to(X, Y, X)`。
 
switch_to详解
------------------

 
书上认为直接看pseudo的汇编代码比较好，我却觉得直接看Linux源代码中的inline汇编代码更为自在（为了阅读方便和语法高亮有效，却掉了原代码中宏定义的换行，想查看原来的代码，请访问http://lxr.linux.no/linux+v2.6.11/include/asm-i386/system.h#L15 ）：
 
```cpp  
#define switch_to(prev,next,last)  
do {                                 
      unsigned long esi,edi;                                           
      asm volatile("pushfl\n\t"                                        
                   "pushl %%ebp\n\t"                                   
                   "movl %%esp,%0\n\t"        /* save ESP */           
                   "movl %5,%%esp\n\t"        /* restore ESP */        
                   "movl $1f,%1\n\t"          /* save EIP */           
                   "pushl %6\n\t"             /* restore EIP */        
                   "jmp __switch_to\n"                                 
                   "1:\t"                                              
                   "popl %%ebp\n\t"                                    
                   "popfl"                                             
                   :"=m" (prev->thread.esp),"=m" (prev->thread.eip),   
                    "=a" (last),"=S" (esi),"=D" (edi)                  
                   :"m" (next->thread.esp),"m" (next->thread.eip),     
                    "2" (prev), "d" (next));                           
} while (0)
```  
 
 
简单解说一下这里用到的gcc的inline汇编语法。首先看上去像是汇编代码的自然就是汇编代码了，每个指令写到一对""中（这是换行接着写同一个 string的好办法）还要加\n\t实在是比较麻烦但还算清晰可读。如果熟悉AT&T的汇编语法，读起来不是难事。
 
第一个冒号后面有很多类似于"=m" (prev->thread.esp)的东东以逗号相隔，这些是这段汇编所输出的操作数，=表达了这个意思。其中m代表内存中的变量，a代 表%eax，S代表%esi，D代表%edi。但"=m" (prev->thread.esp)和"=a"(last)是完全不同的输出方向，前者在movl %%esp,%0一句中（%0代表了prev->thread.esp）把%esp的内容输出给了prev->thread.esp，后者则 独立成句，直接在整段汇编的最后自动将last的值写到%eax，完成了last的使命。
 
第二个冒号后面的则是输入给这段汇编的操作数。其中d代表%edx。2代表了prev的值将与%2（也就是"=a"(last)）共用一个寄存器。
 
这些操作数在汇编中以%n（n是数字）的形式引用，输出和输入站在一个队里报数：输出的第一个是%0，顺次递增，到了"m" (next->thread.esp)就排到了%5，依此类推。
 
本来还应该有一个冒号，用来告诉编译器会被破坏的寄存器（因为笨笨的C编译器认为只有他自己在改寄存器，常常自作主张作出假设进行优化）。这里中途 在jmp __switch_to我们的确破坏过%eax，但我们巧妙地改回来了（看下面），我们也破坏了%ebp和eflags，但我们通过一对push和pop 却也恢复了它们。因此我们不需要告诉编译器我们改过，因为我们改回来了。
 
asm后面的volatile是告诉C编译器不要随便以优化为理由改变其中代码的执行顺序。
 
还有一个地方需要解释，那就是$1f，这个指的是标号为1的代码的起始地址。在"1:\t"这一行我们定义了这个标号。
如果对gcc的inline汇编产生了兴趣，参见：http://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html#s5
 
下面开始详细分析：
 
```cpp 
/* 首先，我们在prev的语境中执行 */  
  
  
/* 保存ebp和eflags于prev的Kernel Stack上 */  
  
pushfl  
pushl %ebp  
  
%esp => prev->thread.esp   /*保存了prev的esp */  
next->thread.esp => %esp   /*读出next之前保存的esp。这个时候，由于esp被改成了next的Kernel Stack，而标示process的thread_info挨着esp（参见笔记process-1中的对current的解释），我们现在实际变成了是在进程next的语境中执行了。不过我们还没有真正开始执行next自己的代码，且看下面 */  
  
1 => prev->thread.eip /*把标号为1的代码的地址存入prev->thread.eip中，以备将来恢复。如果有人不知道，说明一下：CPU的eip寄存器中放的是CPU要执行的下一行代码的地址 */  
  
/* 正是下面这两句的巧妙配合使得这两句执行完后，CPU完完全全跑去执行next代码，不再执行后面的代码。这也正是原书没有讲清楚的（过于分散了），各位读者注意咯!*/  
  
pushl next->thread.eip /* 把原先保存下来的next的下一条指令地址，push到next的Kernel stack顶部。这个next->thread.eip通常储存的是next被切换之前push进stack的那个标号为1的代码地址（简称：next的1），但如果next从未被切换过，即是一个刚被fork了、新开始执行的进程，那么存在next->thread.eip中的就是 ret_from_fork()函数的起始地址。 */  
  
jmp __switch_to /* __switch_to是一个用寄存器来传达参数的函数，里面执行了检查、保存FPU、保存debug寄存器等琐事。重点是：__switch_to是一个函数！这里居然用的是jmp而不是call！这正是巧妙之处。__switch_to()作为一个函数执行完了之后会返回(ret)，但由于我们不是call它的（call 会自动把下一条指令的地址push入stack顶部，相应地返回的时候ret会从stack的顶部获取返回地址——下一条指令的地址，这是一种完美的配合），ret就把上一句push入stack顶部的next->thread.eip当作下一条指令了，于是我们就自然而然地顺着next之前执行的地址执行下去了，直到下一次process切换回来。 */  
  
/* .......下面的代码不会继续执行......直到进程切换回来然后跳到prev的1 */  
  
1:  
  
popl %ebp  
popfl  
  
/* 到这里这个宏就结束了，所以就会顺着执行prev的接下来的代码。这也正是为什么我们之前把prev的1的地址push进stack就可以达到回到prev自己的代码的原因。 */  
``` 

这篇笔记不会解释__switch内部琐屑的细节了，因为最神奇的事情不是发生在里面，人生苦短，不用去琢磨过于琐屑的事情。