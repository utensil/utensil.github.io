---
title: Eclipse之舒适化打造(黑底TextMate配色方案、Jodeclipse等) 
tags: IDE
---

> 2013最新按语：很多人来到我的博客，都是为了搜索Eclipse的黑底配色方案。现在文中的epf貌似已经不能在最新的Eclipse里面使用了，而现在又有人发展出了Eclipse主题插件[Eclipse Color Themes]( http://eclipsecolorthemes.org/ )，我就在插件的主题库里添加了本文中的主题：名为“UtensilAleviaDark” ( http://eclipsecolorthemes.org/?view=theme&id=16265 )。为了备份，本blog也提供下载：[Eclipse Color Theme(XML) - for Eclipse Color Theme Plugin](downloads/theme-16265.xml) 、[Eclipse Preferences (EPF) - for Eclipse Import](downloads/theme-16265.epf)

一直不喜欢Java，进公司却立刻要接手Java的项目，别扭归别扭，但一直知道Eclipse给Java打造了很好的编程体验，做Java程序员，会被Eclipse照顾得很好：从模板到自动完成，从quick-fix到代码间超链接跳跃，从代码自动生成到自动重构...
 
不过它离完全适合于我的舒适还有一段距离，所以我一边善其事一边利器，在这里把自己的打造过程和大家分享：
 
我喜欢黑底的配色方案，需要各种语法成分能够以不同的颜色相去分。我不想在白花花既不省电又伤眼睛的背景上看一整片颜色单调的代码。我喜欢圆润等宽的字体（比如TextMate的Monaco），也喜欢字体大些不必费眼。
 
于是：
 
我基于Textmate vibrant ink进行改造，修复了导入Textmate Vibrant Ink导致的同词双击高亮失灵，部分参照All Hellow's Eve主题将许多颜色进行重调同时用DejaVu Sans Mono 14号字体(附件中有，请复制到C:\Windows\Fonts)，Java在我的Eclipse终于有了舒服、漂亮的黑底配色方案。
 
...调完一看，只剩下括号是白色了...话不多说，直接上图：

![](colored-eclipse-sample-1.png)
 
图中copyOfRange为类静态方法。

![](colored-eclipse-sample-2.png) 

图中toSurrogate 为类实例方法。
 
Java的反编译相对C++要容易许多，如果没有故意做混淆，反编译出来的代码可读性相当高。而在多款反编译软件中，Jode的口碑貌似最好，经试用也非常令人满意，而Jodeclipse这个插件，将反编译.clsss和jar包做得不留痕迹，无缝集成，踏class/jar包如入源码之地，更有从使用jar包的程序中直接超链接跳入，外加标准库源代码和Javadoc自动attach，怎一个爽字了得！(上图就是Jodeclipse自动attach下的String类部分源代码)
 
习惯用Eclipse自动更新的同志只需要加一个Remote Site——http://www.technoetic.com/eclipse/update ，按提示安装即可，喜欢自己下jar包的同志可以去sourceforge...(注：目前它和伽利略还不能直接完美结合，我之前折腾了好久才突然可以，还在查找原因，老版本都很好)
 
最后呢，BreadCrumb(Alt+Shift+B)比快速大纲(Ctrl+O)好用，有了它，我就可以常年最小化Package Explorer了。
 
喜欢的同志就下载吧，只需要在Eclipse—>File->Import->General->Preference中将之导入即可。导入之前，记得备份workspace 下的.metadata里的org.eclipse.core.runtime，这样如果不喜欢还可以恢复哦。
 
这个epf是一个绿色版的epf，是我用Beyond Compare辛辛苦苦比较刚安装的Eclipse和Textmate vibrant ink，去除了无关的配置之后，尽可能纯净的一个epf呢~只包含配色方案、字体调节、以及打开了BreadCrumb(可用Alt+Shift+B关掉)，有使用问题向我反馈哦~

> 原安全风险声明（已基本不适用2013最新按语中的Eclipse Color Themes版）：
> 
> 安装有风险，下载需谨慎。
> 
> 我使用的Java Eclipse是Eclipse Galileo For Java。
> 
> 我使用的C++ Eclipse是Eclipse Helios For C/C++。
> 
> Java 配色方案仅适用于Java， C++ 配色方案仅适用于C++ ~其余语言比如js未能顾及。因为每种语言我是在单独的Eclipse里面编辑的，如Java用JDT，C++用CDT，js、rails用RadRails。
> 
> 导入之前，记得备份workspace 下的.metadata里的org.eclipse.core.runtime，这样如果不喜欢还可以恢复哦。也可以切换workspace进行试用。
> 
> 而且 如果你在workspace中没有什么重要的东西，可以切换workspace或者将整个workspace 下的.metadata删除，就可以恢复。
> 
> 字体大是个人偏好，我屏幕比较大和宽，这样看起来舒服。如果不喜欢字体和颜色，可以在Preferences中的搜索框输入color，探索一番过滤后的几个选项，就可以按你自己的意愿挑颜色、字体了。
 
 