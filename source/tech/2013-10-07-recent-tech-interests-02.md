--- 
title: 近来的技术兴趣（下）
tags: 自学记录
---

LOLFormat
==========

初衷
-----

希望能够将《英雄联盟》中英雄的模型导出成包含动画信息的通用3D模型格式。

进展
-----

[lol-model-format](https://github.com/utensil/lol-model-format): 为 http://code.google.com/p/lolmodelviewer/ 所启发，解析了.skn（顶点、三角形信息）、.skl（骨架、蒙皮信息）、.anm（动画信息），成功将模型的静态部分转化为md2和dae格式，然而在动画部分完全卡壳，至今未能成功转换。

[lolmodelviewer](https://github.com/utensil/lolmodelviewer)：从 http://code.google.com/p/lolmodelviewer/ 改写而成，使其能够读取《英雄联盟》中文版目录结构下的英雄模型文件。

仍需深入反思自己对计算机图形学和骨架动画的理解。而且对二进制格式的反向工程的理解还是基本为零，只是在有样学样。

现代OpenGL学习
================

初衷
-----

以前学的都是古代OpenGL（ fixed function OpenGL pipeline、glBegin, glEnd, glVertex*, glNormal*, glTextCoord*, glTranslate*, glRotate*, glLoadIdenity, glModelViewMatrix），见我在[Github上的utensil/opengl-work](https://github.com/utensil/opengl-work)项目。

在做lol-model-format期间，接触了一些现代OpenGL的皮毛，需要系统性地学习现代OpenGL。

见： http://gamedev.stackexchange.com/questions/32876/good-resources-for-learning-modern-opengl-3-0-or-later#32917

进展
-----

### 软硬件准备

* 新购电脑的显卡支持OpenGL 4.4+ ( https://developer.nvidia.com/opengl-driver )；
* 以前用GLUT，现在用[GLFW](http://www.glfw.org/index.html)；
* 以前也没用[GLEW](http://glew.sourceforge.net/)来做OpenGL的运行时加载（Unfortunately, accessing OpenGL functions isn’t as simple as `#include <GL/gl.h>` unless you want to use an ancient version of OpenGL. In modern OpenGL, the API functions are determined at run time, not compile time. GLEW will handle the run time loading of the OpenGL API.）、动态的特性和extension检查；
* C++ 11可用[OGLplus](https://github.com/matus-chochlik/oglplus)；
* Ruby 2.0+可用[opengl-bindings](https://github.com/vaiorabbit/ruby-opengl)，有大量精彩例子，已运行过；
* Python可考虑[vispy](https://github.com/vispy/vispy)

### 网上教程

* [An intro to modern OpenGL Chapter 1-4](http://duriansoftware.com/joe/An-intro-to-modern-OpenGL.-Table-of-Contents.html)
* [Open.GL](https://github.com/Overv/Open.GL) : http://open.gl/
* [Tomdalling OpenGL Series](https://github.com/tomdalling/opengl-series) ：http://tomdalling.com/blog/modern-opengl/
* [OpenGL Tutorial Org](http://www.opengl-tutorial.org/)
* [OGLDEV Modern OpenGL Tutorial](http://ogldev.atspace.co.uk/index.html)
* [Learning Modern 3D Graphics Programming](http://www.arcsynthesis.org/gltut/)
* [Modern OpenGL Slides](https://github.com/vispy/euroscipy2013) : http://prezi.com/uho-fgtvrzrh/modern-opengl/
* [Modern Shader-based OpenGL Techniques](http://www.qtdeveloperdays.com/northamerica/modern-shader-based-opengl-techniques)

### 书籍

* OpenGL Programming Guide: The Official Guide to Learning OpenGL, Version 4.3 (8th Edition) : __The Red Book__
* OpenGL Shading Language (3rd Edition) : __The Orange Book__
* OpenGL ES 2.0 Programming Guide : OpenGL ES 2.0基本上就是删除了所有古代API的OpenGL 4.1，因此这本书反而成为了现代OpenGL最好的介绍。
* OpenGL SuperBible: Comprehensive Tutorial and Reference (4th Edition) （第5版被恶评，普遍认为没有很好地介绍现代OpenGL，所以大家都推荐用第4版来作为古代OpenGL的参考）
* 3D Math Primer for Graphics and Game Development


OpenCL学习
===========

初衷
-----

希望能对OpenCL和WebCL有所了解。

进展
-----

* 新购电脑的显卡支持OpenCL和CUDA。
* 阅读了《OpenCL异构计算》一书，了解了OpenCL的基本思想和概念。
* 写了一些简单的tutorial级代码。
* 尝试用ffi和SWIG为OpenCL构造一个简单的ruby binding。

Redis学习
=======================

初衷
-----

希望学会NoSQL界思考问题的方式，从表结构设计到运营维护。

进展
------

* [十五分钟介绍 Redis 数据结构](http://blog.1001i.com/computer/redis/introduce-redis)
* [浅谈REDIS数据库的键值设计](http://www.hoterran.info/redis_kv_design)
* [开发笔记 (2) ：redis 数据库结构设计](http://blog.codingnow.com/2011/11/dev_note_2.html)
* [新浪微博开放平台中的Redis实践](http://www.infoq.com/cn/presentations/tfl-sina-weibo-platform-redis-practice)

驱动学习
============

初衷
-----

希望对Window、Linux、Android这3个场景下的内核、驱动有所了解，不至于完全被隔离在硬件之外。

计划
-----

* 《Windows内核原理与实现》
* 《Windows 7设备驱动程序开发》
* 《寒江独钓 : WINDOWS内核安全编程》
* 《竹林蹊径 : 深入浅出 Windows 驱动开发》
* 《Linux内核设计的艺术 : 图解Linux操作系统架构设计与实现原理》
* 《精通Linux设备驱动程序开发》
* 《深入Linux设备驱动程序内核机制》
* 《深入理解Android : 卷I》
* 《Android内核剖析》
* 《Android底层接口与驱动开发技术详解》

WebKit学习
============

初衷
-----

WebKit内核为Mac、iPad、Android、Chrome等平台所使用，而且现在进化为Blink了。而且最近也在使用node-webkit。对Webkit内部的了解不能完全是空白。

BPMN规则与工作流Demo系统
=========================

初衷
-----

我从前都是用UML来进行项目和系统的总体设计，尤其用得多的是用例图、时序图，设计数据库的时候会用类图的简化版，鸟瞰系统架构的时候会用协作图的变种，做原子服务时会用状态机图。

后来发现对于业务逻辑重而复杂的情况，UML的流程图并不能很好描述，于是我发现了BPMN。BPMN广泛用于OA工作流，但我希望它能够用于类似业务逻辑规则系统中，把业务逻辑理得更清晰。

进展
-----

http://www.camunda.org/

高可用分布式事务Demo系统
==========================

初衷
-----

希望将这些年工作中体会到的高可用分布式事务系统（包括容灾和性能、PCRQ、CAP、BASE等方面）的思想，提炼写成一个最小业务逻辑的demo。

告警轻松看 on Android
=======================

初衷
-----

希望能够将收到的告警自动提取文本模式，并组查看。

音乐拆分
===========

初衷
-----

希望能够找到一个思路，将音乐自动识别出多个声部的旋律和音色，并进行可视化。

Mathematica成果整理
========================

初衷
-----

早年为不同的目的写有一些Mathematica的nb脚本，需要整理。

进展
-----

暂时都汇总到`my_nb_files`下，未整理。


