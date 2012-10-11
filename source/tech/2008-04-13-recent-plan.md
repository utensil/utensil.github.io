--- 
title: 近来情况以及下一周的写作计划
tags: wx, 自学记录
---

最近，关于wxWidgets，主要在忙于帮wxWidgets开发团队做即将出炉的wxWidgets2.9.0的文档的revision，在这一版里，他们改用了Doxygen替代原先的LaTeX，他们写了一个脚本来将原来的LaTeX文档转成 Doxygen，但转换过程中必然有这样那样的缺漏，所以需要人工进行revision，并对旧的文档作一次全新的重新审视和改进。这里工作量非常巨大，我前两天刚完成o到p的revision，这里头包含了十几个文件，其中最痛苦的一个文件，我产生了700多行的diff……还要对遇到的一些先例总结成revision note，与主负责人frm商量……英语写作能力到不见得上升了多少，不过写作量剧增……

还在作的另外一件事，是在写一个utility，用于为文档提供控件们在Windows，Ubuntu和Mac OS上的截图。写这个Util的最大收获，就是，我被迫在三个平台上同时调试我的程序，而且这里头还涉及一个wxWidgets的Bug，wxScreenDC和wxClientDC在Mac上无法Blit……上一周主要时间花在文档的revision上了，这一周就多花点时间在这个Util上面吧。还需要熟悉XRC……

最近在整理关于局域网内多文件传输的思路，终于在看一本Python的书的时候得到了启发……试着实现一个Demo吧。前两天研究了Thor大侠的802.1x连接的程序的源代码，结论是它基本上是可以移植的，类md5直接可以重用，主要需要把类Dot1x用跨平台的pcap和wxWidgets重写，不过这将是巨大的工作量。

这段时间读了好几本厚书，近期也将作完它们的笔记，接下来的紧迫的任务主要有深入学习AutoCAD，要把它掌握得滚瓜烂熟，包括所有的短命令。还有学习AutoLisp编程。这是以后的饭碗呢，要花多些精力，不要整天不务正业搞wxWidgets，呵呵~

另外一个紧迫的任务是完成对《Java与模式》这本厚达1024页的书的笔记，Rose是不是一个好选择，还得考虑考虑。

下一周希望能够开始写关于wxWidgets的心得体会了，准备写成一个系列教程。第一篇就是《轻装上阵跨平台》，讲述使用gcc与wxWidgets提供的Bakefile支持，来实现在不依赖任何IDE的情况下，在三大平台上编译wxWidgets，wxWidgets的例子以及自己的wxWidgets程序。

第二篇计划介绍Code::Blocks和wxFormBuilder的双剑合璧。