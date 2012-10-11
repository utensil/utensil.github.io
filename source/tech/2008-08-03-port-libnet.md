--- 
title: 如何将libnet移植到MinGW
tags: cpp, 库, 网络
---

> 2012年4月4日按：长期无人维护的The Libnet Packet Construction Library （ http://packetfactory.openwall.net/projects/libnet/ ）重新活在了 https://github.com/sam-github/libnet 。这里有两个杯具：一、原作者unreachable，说明这可能是一位陨落的程序员；二、我当年写的（粗暴的）《如何将libnet移植到MinGW》不再适用……

鉴于网上存在两个libnet，本文中所谓libnet是指位于 http://www.packetfactory.net/libnet/ 的The Libnet Packet Construction Library。

libnet是一个小型的接口函数库，主要用C语言写成，提供了低层网络数据报的构造、处理和发送功能。libnet的开发目的是：建立一个简单统一的网络编程接口以屏蔽不同操作系统低层网络编程的差别，使得程序员将精力集中在解决关键问题上。它的主要特点是：

* 高层接口：libnet主要用C语言写成。
* 可移植性：libnet目前可以在Linux、FreeBSD、Solaris、WindowsNT等操作系统上运行，并且提供了统一的接口。
* 数据报构造：libnet提供了一系列的TCP/IP数据报文的构造函数以方便用户使用。
* 数据报的处理：libnet提供了一系列的辅助函数，利用这些辅助函数，帮助用户简化那些烦琐的事务性的编程工作。
* 数据报发送：libnet允许用户在两种不同的数据报发送方法中选择。

另外libnet允许程序获得对数据报的绝对的控制，其中一些是传统的网络程序接口所不提供的。这也是libnet的魅力之一。

详细介绍可参见《使用libnet与libpcap构造TCP/IP协议软件》（ http://www.ibm.com/developerworks/cn/linux/l-tcpip/ ）。

本来看到libnet源代码树根目录中的configure脚本，我以为只需要在MSYS下键入configure然后make就可以了。谁料断断续续折腾了几个星期，根据gcc的出错信息强行修改了十余处源代码，才使其编译通过，却又遭遇大量链接出错，实在令人气馁。今天决心从问题的根源下手，终于用一个比原先简洁得多的修改方案使其通过编译和链接，特写此博客予以记述。

### 基本前提

正确下载和安装MinGW和MSYS，假设分别位于C:\MinGW和C:\msys。（下载地址：http://sourceforge.net/project/showfiles.php?group_id=2435 ）

### 准备工作

1）从 http://www.packetfactory.net/libnet/dist/ 下载libnet的源代码。我选择的文件是libnet-1.1.3-RC-01.tar.gz。解压。将其内容复制到D:\libnet，注意，此操作的结果应使D:\libnet下有include、src等子文件夹。也可自选其它位置，本文按D:\libnet进行叙述。

2）因为libnet依赖于libpcap，所以要从 http://www.winpcap.org/devel.htm 下载Developer's Pack。我选择的是4.0.2。解压。将Include子文件夹中的文件复制到D:\libnet\include。Gnuc.h文件会冲突，这无关紧要，我选择保留libnet自己那个。将Lib子文件夹中的文件复制到D:\libnet/lib（原来没有这个文件夹的，自己建）。

3）试着编译一下：在msys中

```bash
cd /d/libnet
./configure
make
```

如果configure出错，说明MinGW或MSYS安装不正确。可能是没有将C:\MinGW\bin加入PATH，修改C:\msys\profile，在

```bash
if [ $MSYSTEM == MINGW32 ]; then
  export PATH=".:/usr/local/bin:/mingw/bin:/bin:$PATH"
else
  export PATH=".:/usr/local/bin:/bin:/mingw/bin:$PATH"
fi
```

后面加上：

```bash
export PATH="/c/MinGW/bin:$PATH"
```

其它错误类型本文不予考虑。

如果make出错，这属于正常，除非它说的是找不到pcap.h，这样的话，请检查第二步做对没有。

读者可自行尝试修正其错误，也可按照下面这个简洁方案。

4）顺便介绍一下如何察看MinGW的预定义宏：

```bash
gcc -dM -E - < nul
```

这个命令在处理跨平台和移植性问题时相当有用。比如从它的输出可以看出，`_WIN32`、`__WIN32__`、`__MINGW32__`等宏已经被定义，这样，面对那些基于这些宏的预处理语句，就有一个清晰些的思路，不用去猜。

### 修改方案

1）修改include/win32/libnet.h为：

```cpp
#if (__MINGW32__)
#include "pcap.h"
#define HAVE_NET_ETHERNET_H 0
#include "../libnet.h"
#include <wincrypt.h>
#else
原来文件内容
#endif
```

观察第4行，这是把编译器导引回去读include/libnet.h，那个头文件是为UNIX-Like系统写的，也是最初的头文件，Linux下或Cygwin下都用它，没什么问题。本文件（include/win32/libnet.h）是为VC写的，由于libnet没有被官方地移植到MinGW，在src/*.c文件中，把又是Win32又不是Cygwin的情况都按照是VC处理了。结果MinGW被牛头不对马嘴地安上了只适合VC的头文件，自然会出问题了。但是include/libnet.h也不是直接就能用，需要进行一些微调。这里面几个语句的顺序非常重要。

2）修改include/libnet-functions.h中函数`libnet_open_raw4(libnet_t *l)`前的

```cpp
#if ((__WIN32__) && !(__CYGWIN__))
```

为

```cpp
#if ((__WIN32__) && !(__CYGWIN__)) && !(__MINGW32__)
```

3）修改src/libnet_link_none.c为

```cpp
#if (__MINGW32__)
#include "libnet_link_win32.c"
#else
原文件内容
#endif
```

此处修改是权宜之计，因为不知为什么，libnet_link_win32.c没有被编译，却把没做任何事的libnet_link_none给编译了。与其去研究Makefile，不如来个调包。

4）此时编译可通过。然而出现大量undefined reference这种链接错误。修改之前make过程生成的src/libnet.la中的

```makefile
dependency_libs=''
```

为

```makefile
dependency_libs='-lwsock32 -lws2_32 -liphlpapi -L/d/libnet/lib -lwpcap -lpacket'
```

注意，其中-L/d/libnet/lib一项，是叫gcc到D:\libnet\lib去寻找libwpcap.a和libpacket.a。要根据你自己放置它们的位置进行调整。

此时链接会成功，但编译到例子 `get_addr.c` 时，出现错误undefined reference to `_imp__optarg`。这样libnet就成功编译了。例子之所以出错，是因为它使用了getopt来处理例子中需要处理的命令行参数，而该函数在MinGW似乎有可移植性问题，MinGW mailing list上有一个人在2006年问了这个问题怎么解决，到现在还没有人答他。所幸这个问题不影响libnet库本身。

此时你会在src/.lib下发现编译好的libnet.a。大小为19M多，是静态库。

5）顺便介绍一下怎么察看里面的函数：

```bash
nm   -g   --defined-only --demangle  libnet.a
```

### 测试例程

这个例程修改自arp.c和libpcap的例子basic_dump.c

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "../sample/libnet_test.h"
int
main(int argc, char *argv[])
{
    int c;
    u_int32_t i;
    libnet_t *l;
    libnet_ptag_t t;
    char *device = NULL;
    u_int8_t *packet;
    u_int32_t packet_s;
    char errbuf[LIBNET_ERRBUF_SIZE];
    printf("libnet 1.1 packet shaping: ARP[link -- autobuilding ethernet]/n");
    if (argc > 1)
    {
         device = argv[1];
    }
    else
    {
            pcap_if_t *alldevs;
            pcap_if_t *d;
            int inum;
            int i=0;
            char errbuf[PCAP_ERRBUF_SIZE];
            /* Retrieve the device list */
            if(pcap_findalldevs(&alldevs, errbuf) == -1)
            {
                fprintf(stderr,"Error in pcap_findalldevs: %s/n", errbuf);
                exit(1);
            }
            /* Print the list */
            for(d=alldevs; d; d=d->next)
            {
                printf("%d. %s", ++i, d->name);
                if (d->description)
                    printf(" (%s)/n", d->description);
                else
                    printf(" (No description available)/n");
            }
            if(i==0)
            {
                printf("/nNo interfaces found! Make sure WinPcap is installed./n");
                return -1;
            }
            printf("Enter the interface number (1-%d):",i);
            scanf("%d", &inum);
            if(inum < 1 || inum > i)
            {
                printf("/nInterface number out of range./n");
                /* Free the device list */
                pcap_freealldevs(alldevs);
                return -1;
            }
            /* Jump to the selected adapter */
            for(d=alldevs, i=0; i< inum-1 ;d=d->next, i++);
            device = d->name;
    }
    l = libnet_init(
            LIBNET_LINK_ADV,                        /* injection type */
            device,                                 /* network interface */
            errbuf);                                /* errbuf */
    if (l == NULL)
    {
        fprintf(stderr, "%s", errbuf);
        exit(EXIT_FAILURE);
    }
    else
    i = libnet_get_ipaddr4(l);
    t = libnet_build_arp(
            ARPHRD_ETHER,                           /* hardware addr */
            ETHERTYPE_IP,                           /* protocol addr */
            6,                                      /* hardware addr size */
            4,                                      /* protocol addr size */
            ARPOP_REPLY,                            /* operation type */
            enet_src,                               /* sender hardware addr */
            (u_int8_t *)&i,                         /* sender protocol addr */
            enet_dst,                               /* target hardware addr */
            (u_int8_t *)&i,                         /* target protocol addr */
            NULL,                                   /* payload */
            0,                                      /* payload size */
            l,                                      /* libnet context */
            0);                                     /* libnet id */
    if (t == -1)
    {
        fprintf(stderr, "Can't build ARP header: %s/n", libnet_geterror(l));
        goto bad;
    }
    t = libnet_autobuild_ethernet(
            enet_dst,                               /* ethernet destination */
            ETHERTYPE_ARP,                          /* protocol type */
            l);                                     /* libnet handle */
    if (t == -1)
    {
        fprintf(stderr, "Can't build ethernet header: %s/n",
                libnet_geterror(l));
        goto bad;
    }
    if (libnet_adv_cull_packet(l, &packet, &packet_s) == -1)
    {
        fprintf(stderr, "%s", libnet_geterror(l));
    }
    else
    {
        fprintf(stderr, "packet size: %d/n", packet_s);
        libnet_adv_free_packet(l, packet);
    }
    c = libnet_write(l);
    if (c == -1)
    {
        fprintf(stderr, "Write error: %s/n", libnet_geterror(l));
        goto bad;
    }
    else
    {
        fprintf(stderr, "Wrote %d byte ARP packet from context /"%s/"; "
                "check the wire./n", c, libnet_cq_getlabel(l));
    }
    libnet_destroy(l);
    return (EXIT_SUCCESS);
bad:
    libnet_destroy(l);
    return (EXIT_FAILURE);
}
/* EOF */
```

设置注意事项：

1. 环境变量：对编译器，要添加：D:\libnet\include；对连接器，要添加D:\libnet\lib和D:\libnet\src\.libs
2. 链接的库：（按顺序）`libnet.a libpacket.a libwpcap.a libiphlpapi.a libws2_32.a libwsock32.a`

3. 运行此程序，运行所有WinPcap的程序一样，要下载并安装WinPcap（ http://www.winpcap.org/install/default.htm ）。
