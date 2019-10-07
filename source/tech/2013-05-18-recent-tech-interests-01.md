--- 
title: 近来的技术兴趣（上）
tags: 自学记录
---

> 在这世上，那些最为自己的事情，你只能自己动手。别人的推导和模拟无法替你建立到物理世界的桥梁，别人写的程序与你的需求总是有所偏差，别人设计的博客主题与你的审美总有些许不同，别人的文字无法表达你的真实感受。如果你可以，就不应该依赖别人从而差强人意地生活。
>
> 这就是我学习和倒腾许多东西的动力，一如我技术博客的签名：“对用语句构建世界的迷恋，以及对世界背后的话语的追索”。前半句的外延里，物理公式、程序代码、线条与色彩、文字乃至我所不掌握的音乐，都是构建世界的语句，是它们使我感觉到自己对这个世界的能动性。后半句是说，生活在一个自己可以设法理解的世界对于我而言是多么重要，虽然我或许没有能力为其它的人类贡献认知，但我如此享受以认真的态度消化和重新整合前人的认知的过程。

这是我在上篇博客[《用Middleman搭建静态博客》](../../../2013/03/21/static-blogging-with-middleman.html)里写的话。

庄子说：

> 吾生也有涯，而知也无涯。以有涯随无涯，殆己。

这基本上是对我这种强烈的认知和动手的愿望的一种反讽。我的生活、我的青春、我的时间、我的精力，仿佛就这样被我过于广泛的兴趣吞噬；而我这些广泛的兴趣却又仿佛被我的拖延症无限地稀释，时间里留下的尽是敝帚自珍的半成品碎片。

这篇博客是为了梳理我这段时间发散出来的技术兴趣点，做一个TODO List式的东西，避免这些曾经的兴趣和进展，变成许久以后翻找出来的一声叹息。

下面的每一项兴趣点，都包含初衷、进展（含技术选型）这几部分。

PDF文件重排
============

初衷
-----

我有一个三星Galaxy S3的手机，它是我上下班时的伴侣。但它的屏幕没有iPad那么大，所以它没法舒适地阅读没为小屏幕移动设备重排过的PDF，尤其是不仅仅包含文字，还包含数学公式和图表，甚至是多栏的PDF。

所以我希望做一个能把PDF转成Responsive的Web页面的东西。

进展
-----

语言：ruby, html5/css3/js

首先看一下有没有现成的产品或库。试用了JavaScript写的[PDF.JS](https://github.com/mozilla/pdf.js)，它不能很好地进行屏幕适配，也不能很好地渲染数学公式。

那么就需要能够解析PDF文件格式的库。

发现了ruby的库[pdf-reader](https://github.com/yob/pdf-reader)。用它成功读取了PDF文件的文本内容和每个文本的位置，从而用position:absolute的CSS把PDF渲染成HTML。一开始是渲染单页，然后推广到多页的PDF。

纯粹的图片我还没有实验，但看起来并不困难。

库里自带一种根据位置相对关系把单个的字符合并成文本块的算法，十分有用，提升了渲染效果。可以根据这个思路，对数学公式进行合并，避免发生公式被重排拆散的问题。有了文本块，可以根据文本块的相对关系来计算文本块相互之间的优先级，也可以把单个的文本块进行换行等，从而实现重排。

遇到的问题有：

1. 这个库大包大揽解决了PDF特有的编码问题，也导致它对中文PDF支持一塌糊涂；
2. 这个库虽然支持读PDF内嵌的TTF字体，使得我可以用HTML5的WebFonts来解决字体渲染的问题，但不支持[Adobe Type 1 Font Format](http://partners.adobe.com/public/developer/en/font/T1_SPEC.PDF)（这是一种可以用PostScript的子集和一些预定义的PS子程序来描述字体glyph的字体格式，以下简称Type 1），见我提交的[这个Issue](https://github.com/yob/pdf-reader/issues/84)，而很多含数学公式的PDF经常内嵌这种字体，用来绘制数学符号甚至图表，使得这种支持变得必须。

我按照Type 1的spec和别人写的一个[指引](http://www.math.ubc.ca/~cass/piscript/type1.pdf)，尝试自己解析这种字体，取得了一些进展，但在二层解密处以和spec完全一致的算法无法解出相应的ps语句。

然后我想起了[FreeType](http://www.freetype.org/freetype2/index.html)，它可以支持Type 1的解析，我只需要用它的ruby-binding或者直接采用ffi的方式来读取Type 1的字体，把它转成TTF或者渲染成图片就可以解决这个问题。渲染成图片已经实现，但是转成其它字体格式却并不可行，因为FreeType的设计目标是渲染字体，并不是要做一个全能的字体操纵和转换的库，这方面需要另想办法。

最近看到了一个C++把含多栏和数学公式的PDF较好地转成HTML的项目[pdf2htmlEX](http://coolwanglu.github.com/pdf2htmlEX/)。缺点是这个项目并没有在html中保留可用来做重排的语义信息（如分栏、公式位置）。

最近从图书馆借了一本书[《Visual C++数字图像模式识别典型案例详解》](http://book.douban.com/subject/11523292/)，这本书以很大的篇幅详尽介绍了如何把扫描版的含多栏和数学公式的PDF，利用数字图像模式识别技术，转成文字版的PDF，里面包括inline和非inline的数学公式的提取、单个数学符号的提取与识别，有很多很有启发的思想。

借助文件完成的Socket转发（aka file-to-datapipe）
=================================================

初衷
-----

假设有两台PC，它们之间网络无法互通，但它们都能访问到某个文件服务器，而且可读可写，那么显然，它们之间可以交换数据。但是有很多场合是需要它们之间进行socket通讯的，比如远程桌面，再比如PC A能访问PC B不能访问的网络环境，需要代理或者转发。

进展
-----

语言：ruby

socket相关操作采用[EventMachine](https://github.com/eventmachine/eventmachine)，文件变动侦听采用[wdm](https://github.com/Maher4Ever/wdm)，因为它在Windows下能利用ReadDirectoryChangesW这个支持侦听网络映射磁盘文件变动的API。

详细的方案已设计，但未开始编码。

RTX插件
========

初衷
-----

在现实工作中需要批量导出RTX聊天记录，以供更高效地查找过往会话。

进展
-----

语言：ruby, C++11

通过[API Monitor](http://www.rohitab.com/apimonitor)追踪RTX对DLL的调用，研究出RTX读取本地聊天记录文件（加密的SQLite）的方式。已用ruby通过ffi调用同样的DLL，完成RTX聊天记录的批量导出，支持绘画中的文本、文本+图片、文本环绕图片、文件，支持伴随导出的html迁移图片，暂不支持迁移文件（但这个很容易添加）。

过程中发现[VOLE - A Neat C++ COM/Automation Driver](http://vole.sourceforge.net/)这个由我很推崇的《Extened STL》一书的作者写的调用COM的C++库，配合上也由他写的[STLSoft - Robust, Lightweight, Cross-platform, Template Software](http://www.stlsoft.org/)中的dl_open，可以用C++高效简洁地完成同样的事情，而且可以方便地写RTX的插件。RTX的插件体系依赖VC6，VOLE对C++11不友好，这两个点虽然不造成实际编码的困难，但让对业务写的代码有审美洁癖的我很难受。

高性能异步业务逻辑服务
========================

初衷
-----

工作中存在这样的场景，实际运行中需要等待的IO（比如对外部系统的网络调用）很多，但同时业务逻辑又很重，比如需要多次调用外部系统，之间还有逻辑依赖。这种情况下如果需要承载大的业务量，不应每个请求都开一个线程在那里等IO，而应采用异步的思路，IO回来了，才占用线程。

但是异步的方式来写程序，思路是断开的。这个项目的目标正是希望能够以同步的方式写业务逻辑，但以异步方式执行。具体的实现思路可见[asynchronous javascript](http://www.medikoo.com/asynchronous-javascript/)，里面介绍了用deferred和promises进行异步编程的范式，这样可以做到代码写起来是同步的(思维顺着走，不用绕回调)，跑起来是异步的(性能)；而且某一步抛出异常，能够在最后统一处理。

进展
-----

语言：Java, C++1

未开始编码，初步设想异步IO部分可采用[Netty](http://netty.io/) ，业务逻辑部分自然是新写。

基于NLP和MLN的AI对话系统
===========================

初衷
-----

乔布斯去世前推出了Siri，但是Siri试用下来纯粹是模式匹配，毫无记忆和状态，而且过度依赖云端。以前也学过一些AI的我觉得时至今日，科技不应该只有这点实用水平。于是找了很多相关的资料来学习，然后发现这里面水很深，难怪实用性的APP仅采用了模式匹配的方式来做。但我始终觉得，具备一定对记忆和自学能力的AI对话系统是可行的，是一个可以追求、可以触达的目标。

这背后我有很多具体的想法，但在实现前先不再这里展开了。这里仅仅记下找到的一些开源库和资料。

### 语音识别方面

#### CMU Sphinx: Open Source Toolkit For Speech Recognition

* [Web site](http://cmusphinx.sourceforge.net/)

#### Julius: Open-Source Large Vocabulary CSR Engine

* [Web site](http://julius.sourceforge.jp/en_index.php)

#### SHoUT: Large vocabulary continuous speech recognition

* [Web site](http://shout-toolkit.sourceforge.net/index.html)
* [Audio prepare](http://stackoverflow.com/questions/8284943/identifying-segments-when-a-person-is-speaking)

#### VoxForge: Open-source acoustic models

* [Web site](http://www.voxforge.org/home)

#### LibriVox: Free audiobooks

* [Web site](http://librivox.org/)

#### Synthesis APIs In Windows Vista

* [Introduction](http://msdn.microsoft.com/en-us/magazine/cc163663.aspx)

### 自然语言处理方面

* [Ltp: Language Technology Platform](http://ir.hit.edu.cn/ltp/)
* 分词：[CRF++](http://crfpp.sourceforge.net/)
* SVM训练：[svmtools](http://www.lsi.upc.edu/~nlp/SVMTool/)
* NER（Named Entity Recognition, 命名实体识别）: [Maximum Entropy Modeling Toolkit for Python and C++](http://homepages.inf.ed.ac.uk/lzhang10/maxent_toolkit.html)
* [treat](https://github.com/louismullie/treat)
* [stanford-core-nlp](https://github.com/louismullie/stanford-core-nlp)
  - http://nlp.stanford.edu/software/index.shtml
  - http://www-nlp.stanford.edu/nlp/javadoc/javanlp/
  - http://www.computing.dcu.ie/~acahill/tagset.html
  - http://nlp.stanford.edu/software/dependencies_manual.pdf
  - http://www-nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/trees/semgraph/SemanticGraph.html
* [open-nlp](https://github.com/louismullie/open-nlp)
* [LingPipe](http://alias-i.com/lingpipe/index.html)
* [brat rapid annotation tool](https://github.com/nlplab/brat)
* [The CLEF Initiative](http://www.clef-initiative.eu/home)
* [Text REtrieval Conference (TREC)](http://trec.nist.gov/)
* [Research on Advanced Natural Language Processing and Text Mining: aNT](http://www.nactem.ac.uk/aNT/)
* [SHOGUN](http://www.shogun-toolbox.org/) is a large scale machine learning toolbox with focus on especially Support Vector Machines (SVM).
* [Encog Machine Learning Framework](http://www.heatonresearch.com/encog): Machine learning algorithms such as Support Vector Machines, Artificial Neural Networks, Genetic Programming, Bayesian Networks, Hidden Markov Models and Genetic Algorithms are supported. 
* [SHARK](http://image.diku.dk/shark/sphinx_pages/build/html/index.html) is a fast, modular, feature-rich open-source C++ machine learning library

### 分词方面

#### 分词库

* [rseg -- ruby](https://github.com/yzhang/rseg)
* [LibMMSeg -- C++](http://www.coreseek.cn/opensource/mmseg/)
* [RMMSg -- ruby](http://rmmseg.rubyforge.org)
* [ICTCLAS -- C++](http://ictclas.org/index.html)

#### 全文搜索框架

* [Lucene](http://lucene.apache.org/)
* [Ferret](https://github.com/dbalmain/ferret)
* [Solr](http://lucene.apache.org/solr/)

#### 词库

* [CC-CEDICT](http://cc-cedict.org/wiki/)
  - [搜索](http://www.mdbg.net/chindict/chindict.php)
* [Wikipedia Chinese article title list](http://download.wikimedia.org/zhwiki/)
* [QQDict api](http://dict.qq.com/dict)
  - `?q= 词语 &f=cloud&c=QQCloudDict.oPopupWnd.callback&t=bd+wl&n=1+1&p=0+0`
* [更多词典](http://technology.chtsai.org/wordlist/)

#### 微博应用

* [新浪微薄关键词](http://app.thunlp.org/weibo/index.jsp)
* [腾讯微博关键词](http://166.111.138.15:8080/qqweibo/intro.html#tec)
* [豆瓣关键词](http://166.111.138.15:8080/douban)

#### 算法

* rseg 使用 http://xiecc.blog.163.com/blog/static/14032200671110224190/
* RMMSg 使用 http://lifegoo.pluskid.org/?p=261 http://technology.chtsai.org/mmseg/
* ICTCLAS 使用 http://ictclas.org/docs/%E5%9F%BA%E4%BA%8E%E5%A4%9A%E5%B1%82%E9%9A%90%E9%A9%AC%E6%A8%A1%E5%9E%8B%E7%9A%84%E6%B1%89%E8%AF%AD%E8%AF%8D%E6%B3%95%E5%88%86%E6%9E%90%E7%A0%94%E7%A9%B6.pdf
* 微博应用 使用，不是分词算法，是关键词提取算法 http://166.111.138.15:8080/qqweibo/conll2011.pdf

#### R语言、KNIME与宋词那些事

* [英语文本分析软件](http://www.dictionsoftware.com/)
* [宋词二字R语言词频分析](http://yixuan.cos.name/cn/2011/03/text-mining-of-song-poems/)
* [果壳网的转贴](http://www.guokr.com/post/74433)
* [宋词傻瓜机](http://mrsunli.com/2011/songci/)
* [宋词多字KNIME词频分析](http://www.freeon.info/?p=739)
* [KNIME](http://www.knime.org/)
* [一种宋词自动生成的遗传算法及其机器实现](http://wenku.baidu.com/view/bf7c8a00b52acfc789ebc9be.html)
* [统计词话（一）](http://cos.name/2011/03/statistics-in-chinese-song-poem-1/)
* [《全唐诗》、《全宋词》统计分析报告（内有整理后的全唐诗和全宋词下载，可供再度整理）](http://yixf.name/2011/03/21/%E5%B1%B1%E4%BA%BA%E4%BD%95%E5%A4%84%E5%90%9B%E4%B8%8D%E8%A7%81%EF%BC%9F%E4%B8%9C%E9%A3%8E%E4%B8%80%E8%8A%B1%E5%80%9A%E9%98%91%E5%B9%B2%EF%BC%81-%E2%80%94%E2%80%94%E3%80%8A%E5%85%A8%E5%94%90%E8%AF%97/)
* [R与中文分词](http://cos.name/cn/topic/105321)
* [RStudio](http://rstudio.org/)

#### 未整理的链接

* http://www.google.com.hk/ggblog/googlechinablog/2006/04/blog-post_7327.html
* http://www.google.com.hk/ggblog/googlechinablog/2006/04/blog-post_2507.html
* http://www.google.com.hk/ggblog/googlechinablog/2006/04/blog-post_1583.html
* http://www.matrix67.com/blog/archives/4212 http://drupal.org/project/csplitter http://www.williamlong.info/archives/1839.html
* http://www.hudong.com/wiki/%E5%8F%8C%E6%95%B0%E7%BB%84trie%E6%A0%91
* http://gump-bean.iteye.com/blog/436426

### 机器学习算法方面

已有的算法有：

1. [Parallel Logistic Regression](http://en.wikipedia.org/wiki/Logistic_regression)
2. [Bagging Logistic Regression](http://en.wikipedia.org/wiki/Bootstrap_aggregating)
3. [Random Decision Tree/forest](http://en.wikipedia.org/wiki/Random_forest)
4. [Regular singular value decomposition]
(http://en.wikipedia.org/wiki/Singular_value_decomposition)
5. [Gradient boosting decision tree](http://en.wikipedia.org/wiki/Gradient_boosting)

### 带概率的逻辑方面（主要是Markov Logic Network）

* [Markov logic network](http://en.wikipedia.org/wiki/Markov_logic_network)
* [Alchemy - Open Source AI](http://alchemy.cs.washington.edu/) [onlineengine](http://alchemy.cs.washington.edu/api/html/index.html)
* [Alchemy 2.0: Probabilistic theorem proving ](https://code.google.com/p/alchemy-2/)
* [markov thebeast: Markov Logic / Statistical Relational Learning Software](https://code.google.com/p/thebeast/)
* [machine learning open source software](http://mloss.org/software/)
* [An Exercise with Statistical Relational Learning Systems](https://lirias.kuleuven.be/bitstream/123456789/230569/1/srl)
* [PRISM is a general programming language intended for symbolic-statistical modeling](http://sato-www.cs.titech.ac.jp/prism/)

### 书籍

* 《Clever Algorithms: Nature-Inspired Programming Recipes》
* 《Information Theory, Inference and Learning Algorithms》
* 《Machine Learning: A Probabilistic Perspective》
* 《Speech and Language Processing: an Introducation to Natural Language Processing, Computational L inguistics, and Speech Recognition》
* 《统计自然语言处理基础》
* 《数据挖掘中的新方法：支持向量机》
* 《集体智慧编程》与《智能Web算法》其一
* 《人工智能:一种现代方法》
* 《游戏开发中的人工智能》
* 《小型智能机器人制作全攻略》

> 未完待续，继续写（下）
