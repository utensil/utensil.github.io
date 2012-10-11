---
title: Ruby On Rails之继续乾坤大挪移
tags: rails, 自学记录
---

> 2012年9月按：rails的变化一日千里，我过往几篇关于rails的博客都过时得很快。当初从CSDN迁移到javaeye的时候，抛弃了一篇关于怎么从1.x迁移到2.x的博客，现在这篇博客也真的很想抛弃了。现在RadRails对于我而言已经笨重得没有必要，完全迁移到了Sublime Text 2（类似Mac下的TextMate）之下，Rails也早就走到了3.x。

最终买了《Practical Rails Projects》。原来那本《征服Ruby On Rails》遍地开花，什么都讲一点，但比较浅，难以深入体会。比如原来只能体会一下ROR的CRUD的快速开发scaffold ，却仍难对如何用这个框架做真正的网站有一个概念。而本来想一起买的《Ruby on Rails社区网站开发》，全书做出来的那个社区网站架在网上了，我去看了一下，没什么好感，所以赶紧不买了。

买回来之后，去Apress和Fecit下载了全部的源代码（非常慢非常艰辛），架起了新版的Aptana Studio 2之RadRails做IDE，开始做里面的项目的时候，才发现，这本书又是针对Rails 1.x……还有其他过时的方面，比如它的MonkeyTasks项目里面用到的Acts as Authenticated插件，已经不再开发了，接下它的火炬的是restful_authentication这个插件，和原来比有不变的东西，但也有许多微妙的变化，总体来讲，是变得更好用更方便了，但移植的过程我花了很多时间对着书去揣摩和试错。不过，移植一直是相当有趣的一项工作，我喜欢，按部就班地照着书做，又有什么意思呢？（关于移植细节，不在此敷述。可参见 http://d.hatena.ne.jp/zariganitosh/20080726/1217141005 ）

现在是基本回到Windows下来了。前段时间找工作，改简历，还是Office 2007顺手和不走样，上Q也多，又被旋风下载、QQ影音、QQ拼音、FTPRush这些好用的软件粘住，所以很少回Linux那边了。把Linux下的很多习惯带回了Windows，比如上网还是用火狐——遨游的在线收藏总是连不上，无法信任；同时遨游又经常假死——火狐加上FireGesture、Easy DragToGo和Foxmarks在线收藏这几个插件，功能齐全，速度又快，远远胜过遨游，只有遇到那些写得不规范的网站，才回一回遨游去看。

在Windows下用XAMPP重新搭建起了Apache+MySQL+php+phpMyAdmin，也装上了Zend Studio的Windows版，它的确是非常不错的跨平台php开发环境，这里推荐 http://www.zendstudio.net/ 这个博客，上面有齐Zend Studio在各平台的下载链接，甚至还有注册机，文章也精彩。

而Aptana Studio呢，就更是优秀的跨平台Web 2.0开发环境。它本身具有对HTML、CSS、JavaScript的完善支持（光自动完成这一块就比Zend Studio舒适好多，唯一的缺憾是没有WYSIWYG编辑，不过其实这个在Web 2.0当中比较少用到），再以插件的形式提供了对各大Ajax库、php、Python、Ruby on Rails、Air、CVS/Subversion、SQL Explorer等的完善支持，而这么好的东西居然是免费的！它的商业版只多了一些我们通常用不着的功能。

Aptana Studio是基于Eclipse的，同时有Eclipse Plug-in版和Standalone版，建议下载Standalone版,熟悉Eclipse的人都知道它的插件的dependency的问题常常较麻烦，还是Standalone，专门整合好的好。而且建议下载zip版而不是setup版，因为后者会出现一些莫名其妙的运行错误，较不稳定，而且会出现元数据目录名的乱码，而后者是绿色版，没有这些问题。下载页面是http://www.aptana.com/studio/download 。另外一个问题是等到Studio本身下载下来了，要搭建RadRails环境时，就需要用插件更新，但是可能是我们这里的网络太慢，等待很久，而且最终会失败，所以建议大家将更新站点下载到本地来，地址是http://update.aptana.com/update/ ，上面有各个插件的列表，比如点RadRails进去，下面Manual Installation一节就可以下载更新站点到本地，这样安装插件时就非常快了，那里有操作说明，这里就不敷述了。

RadRails自带JRuby，也有常见的Ruby库，而且它还自动带有Apache出品的Derby数据库，它就像Sqlite一样小巧、基于文件，开发时可以用它做数据库，反正切换数据库在ROR中不过是几行配置文件的事。同时，RadRails还自带Mongrel服务器，也有内置的浏览器。有了RadRails，ROR的一切都变得轻松！