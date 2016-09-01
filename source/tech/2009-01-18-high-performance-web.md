---
title: 心得：Web 2.0站点如何提高可用性与性能
tags: web
---

看了一些书和一些网站之后，关于Web 2.0站点如何提高可用性与性能的一点心得。基本上结合了《高性能网站》与Hijax的思路。

可以参考的一些网址：

[《高性能网站建设指南》读后随感](http://www.dbanotes.net/web/high_performance_web_site.html)
[Yahoo!网站性能最佳体验的34条黄金守则——JavaScript和CSS](http://yy-web.iteye.com/blog/274059)
[图片优化漫谈](http://www.cnblogs.com/wanghongyuan/archive/2009/01/14/1375664.html)
[High Performance Web Sites 读书笔记](http://www.hickwu.com/?cat=4)
[Hijax](http://domscripting.com/blog/display/41)
[Hijax PPT(同时也是一个可退化的Demo)](http://domscripting.com/presentations/xtech2006/)
[AHAH: Asynchronous HTML and HTTP](http://microformats.org/wiki/rest/ahah)

以下是心得：

1）Web 2.0 站点，应当在CSS没有load成功的情况下，依然能够呈现有意义有层次的内容

这就是为什么，使用ul/li这样的办法来实现Menu要好过div。我们在XHTML中依然要保持文档自身的逻辑，而不能过于依赖CSS。不要过于滥用CSS，使得XHTML文件中只剩下一堆没有任何意义感的div和span。

2）Web 2.0 站点应当能够在JavaScript被禁用的情况下，自然地退化为传统的Web 1.0的每页面刷新模式（所谓的Hijax开发方式）

这就意味着，应该使用渐进式的方式引入Ajax：首先使用户点击的是一个真的链接，然后再用JavaScript加以拦截，并以Ajax的方式获取信息和刷新部分页面，而且在标签里直接onclick，而要在外部js中通过操作DOM的方式实现，并且在函数体中return false以禁用那个链接。

这也意味着后端必须以模块化的方式实现，既能返回整个页面，也能返回部分页面，或者数据或脚本。这对于Ruby的erb特别好实现。推荐视频（http://media.railscasts.com/videos/136_jquery.mov），不过你得熟悉jQuery和Rails。

这还意味着，对数据有效性的验证，Ajax仅仅起提升用户体验的效果（即时性），真正的验证需要在后端再做。

优先使用返回部分页面（即Ahah方式），接下来依次考虑：JSON、XML、JavaScript脚本。

不要滥用Ajax。何况这种滥用，不利于SEO(搜索引擎优化)。有一些过于富的应用，应该使用Air使其成为桌面程序，却又拥有Web的许多优点，如CSS就非常利于程序的换肤。

3）Web 2.0 站点应当为用户在Web 1.0时代建立起的许多直觉提供支持，这包括：页面刷新提示、后退/前进支持，甚至可收藏的链接。

页面刷新提示是最基本的。包括正在读取的动画、保存成功的一个div的提示等。

关于后两方面，网上有不少讨论。Hijax的方式将方便可收藏性的实现。

4)Web 2.0 站点应该能够以某种方式提供Web Services

可以以REST方式或SOAP方式，或曰Open API来为其他网站提供它所实现的服务。这可以使网站的服务的可重用性大大提高。

5）Web 2.0 站点必须保持较高的性能

不可以因为追求rich而让网速poor的用户无法顺利访问。

这里讲三个我能理解的要点：

将CSS置于页面头部（注意对于IE，@import相当于将其至于尾部，所以应尽量避免@import），这样可以CSS中指定的样式更早起作用，避免用户看到较丑陋的HTML或空白。

将脚本置于页面脚部，这样可以防止脚本的执行阻塞了页面的载入，而且这也合乎逻辑，因为大多数脚本本质上都在页面完全载入之后，改变其DOM，或作其他功能性运算。

尽可能减少连接，即减少小文件的传输，这意味着将CSS、js、图片文件尽可能地合并，并争取以压缩的方式传输——理想状况只有一个CSS，一个js，一张图片（即CSS
Sprites技术）。
