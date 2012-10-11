--- 
title: 驰骋wxWidgets系列之<简介+轻装上阵跨平台>
tags: wx, 自学记录
---

> 2009年4月按：由于原文太长，这里只贴出简介和当初的按语，请下载附件的pdf版[《驰骋wxWidgets》](downloads/Ride-with-wxWidgets.pdf)阅读。如想在网上查看，请访问我的CSDN博客。由于时间、精力和兴趣转移，全系列远未完成，现在只有第一章和不完整的第二章。

wxWidgets简介
---------------

Utensil  2008 - 04 - 27 按：上个星期做了很多事，包括实现了文件传输、实现了透明蒙版（用于选定要截屏的控件）、开始了q到r的revision，还有就是写成了这篇文章。是在 写着写着原定计划介绍怎么编译wxWidgets一章的时候，发现必须对wxWidgets做一份自己的介绍，网上流传的那些介绍都感觉不够带劲。文中保 留了自己的偏颇之处。

这篇东西是用Word排版的，我只是简单的拈贴进来，不做走位格式的整理，全书写成之后，会以pdf文档的形式发布。保留所有版权，转载请评论，或告知utensilcandel @ gmail . com 。

轻装上阵跨平台
----------------

本章的目的是讲述，如何实现在不依赖任何 IDE的情况下，使用 gcc 编译器在 Windows 、 Linux 、 Mac OS 三大平台上编译 wxWidgets 、 wxWidgets 的例子，以及利用 wxWidgets 提供的 Bakefile 支持来编译自己的 wxWidgets 程序。本章还涉及到了一些上下游的细节，一些初次尝试者会卡壳的地方。