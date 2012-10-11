---
title: Linux 2.6内核笔记【内存管理】
tags: 内核, linux, 读书笔记
---

4月14日
-----------
 
很多硬件的功能，物尽其用却未必好过软实现，Linux出于可移植性及其它原因，常常选择不去过分使用硬件特性。

比如Linux只使用四个segment，分别是`__USER_CS`、`__USER_DS`、`__KERNEL_CS`、`__KERNEL_DS`，因为Paging可以完成segmentation的工作，而且可以完成的更好。而且这样简化了很多，统一了逻辑地址和线性地址。

而TSS存在每CPU一个的GDT中，虽然每个process的TSS不同，但Linux 2.6却不利用其中的hardware context switch（虽然低版本使用）以一个far jmp来实现任务转换，而用一系列的mov指令来实现。这样做的原因是：

1. 可以检验ds和es的值，以防恶意的forge。
2. 硬转换和软转换所用时间相近，而且硬转换是无法再优化的，软转换则可以。
  
4月15日
----------
 
Paging也就是将linear地址转成物理地址的机制。

内存被视为一堆4k的小page frame（就像空的格子），在归OS管的Paging机制的苟延残喘下，仿佛地存放着多于page frame数目的page（数据）。要通过两层索引（directroy和table）来寻到page，再加offset寻到址。这两层索引中的entry包含一些标志表明该page在不在内存里，是否被改写过，最近是否访问过，以及读/写访问权限。

如果page entry里的Page Size标志和cr4的PSE标志设置了的话（Extended Paging），就是4M一片page frame，这样就只用directory一层索引了。

从奔腾pro开始，adress针脚非常神奇地从32增加到36，有了一个叫做PAE的机制，它启用（cr4的PAE标志设置）的时候就是2M一片page frame了。这样可以寻址64GB，远远超越了没启用前4GB的理论极限（实际极限1GB）。但这样的寻址非常别扭，因为物理地址虽然因此变成了36位，线性地址仍是32位，要想寻址超过4GB，要用cr3去指向不同的PDPT或在31-30bit指定PDPT中entry。不过，更郁闷的是，这并不能改变process的地址空间4GB的限制，仅仅是内核可以用这么多内存来运行更多的process。
 
在64位机器上，由于如果只用两层的话，索引条目会太多，严重消耗内存，所以只好再加层数，alpha、ia64、ppc64、sh64都是3层（虽然每层bit数不一），x86_64非常神奇地用了4层。
 
Paging换的是page，Cache换的是line。但是如何在Cache中确定某个内存地址在不在呢？或者说，某内存地址附近的数据，放在Cache中什么位置好呢？不能一对一映射过来(direct mapping)，这样会导致巨大的Cache；也不能随意放（fully associative）然后在旁边标记(tag)说是什么地址附近的，这样会导致每次找Cache都是线性查找。一个浪费空间一个浪费时间，因此有一种折衷叫做N-Way Set Associative，有点像Hash。首先把Cache分成很多个N line的集合，然后弄个hash函数把一个地址唯一地映射到某个集合里，之后至于放在这N line中的哪一line就无所谓了。找的时候，先一瞬间找到集合，然后对N line进行线性查找。
 
读的时候，自然有cache hit和cache miss。对于写操作，cache hit的话，可能有两种不同的处理方法：write-through（Cache和RAM都写）和wirte-back（line换出时写RAM）。Linux清空PCD (Page Cache Disable)和PWT (Page Write-Through)，永远启用cache并使用write-back策略。
 
哈哈，TLB（Translation Lookaside Buffers ）解决了我心中的一大疑问：每次寻址（将linear翻译成physical），都要非常艰辛地查directroy和table，访问多次RAM（你以为这些东西不是放在RAM里啊？！），岂不累死。幸好，我们有TLB，这样最近翻译的成果就可以缓存在里面，这样就省得每次翻译啦。
 
4月17日
---------
 
Linux用了四层索引来做Paging。这样既可以通过隐藏掉中间两层来做无PAE的32位paging，又可以隐藏掉pud来支持有PAE的3位paging，还可以支持64位的paging。

|         |                       |
|---------|-----------------------| 
|pte_t    |Page Table             |    
|pmd_t    |Page Middle Directory  | 
|pud_t    |Page Upper Directory   |   
|pgd_t    |Page Global Directory  | 
 
每个进程的内存空间中0到PAGE_OFFSET（0xc0000000，即3G）-1是用户空间，PAGE_OFFSET到0xffffffff（4G）则是内核空间（只有内核态才能寻址）。
 
启动的时候，Linux问BIOS内存格局如何，保留第1个MB（`machine_specific_memory_setup()`），然后把自己放在第2个MB开始的地方（从_text到_etext是内核代码，从_etext到_edata是初始化了的内核数据）。
 
在这个过程中：
 
Linux首先建立初始（provisional）页表（startup_32()），使RAM前8M（两页）可以用两种方式寻址，用来存放最小的自己（text、data、初始页表、128k的堆空间）。
 
初始pgd放在swapper_pg_dir中。所有项为0，但0、1与0x300、0x301分别完成线性地址的前8M和3G+8M到物理地址前8M的映射。
 
接着，Linux建立最终页表。
 
线性地址最高的128M保留给Fix-Mapped Linear Addresses和Noncontiguous Memory Allocation用，所以，最终页表只需要把PAGE_OFFSET后面的896M映射到物理地址的前896M。剩余RAM由Dynamic Remapping来完成。然后用`zap_low_mapping()`把原先那个初始页表清掉。
 
`paging_init()`会执行：

`pagetable_init()` //一个循环，初始化了swapper_pg_dir
cr3 <- swapper_pg_dir
cr4 |= PAE
`__flush_tlb_all()`
 
Linux利用CPU有限的指令和行为模式，实现了一系列操纵tlb的函数，应用于不同的情境。
 
值得一记的是Lazy TLB模式，在多CPU系统中，它可以避免无意义的TLB刷新。
