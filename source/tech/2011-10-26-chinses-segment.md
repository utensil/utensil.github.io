---
title: 中文分词那些事
tags: AI
---

分词库
---------

* [rseg -- ruby](https://github.com/yzhang/rseg)
* [LibMMSeg -- C++](http://www.coreseek.cn/opensource/mmseg/)
* [RMMSg -- ruby](http://rmmseg.rubyforge.org)
* [ICTCLAS -- C++](http://ictclas.org/index.html)

全文搜索框架
--------------

* [Lucene](http://lucene.apache.org/)
* [Ferret](https://github.com/dbalmain/ferret)
* [Solr](http://lucene.apache.org/solr/)

词库
-----

* [CC-CEDICT](http://cc-cedict.org/wiki/)
  - [搜索](http://www.mdbg.net/chindict/chindict.php)
* [Wikipedia Chinese article title list](http://download.wikimedia.org/zhwiki/)
* [QQDict api](http://dict.qq.com/dict)
  - `?q= 词语 &f=cloud&c=QQCloudDict.oPopupWnd.callback&t=bd+wl&n=1+1&p=0+0`
* [更多词典](http://technology.chtsai.org/wordlist/)

微博应用
----------

* [新浪微薄关键词](http://app.thunlp.org/weibo/index.jsp)
* [腾讯微博关键词](http://166.111.138.15:8080/qqweibo/intro.html#tec)
* [豆瓣关键词](http://166.111.138.15:8080/douban)

算法
-----

* rseg 使用 http://xiecc.blog.163.com/blog/static/14032200671110224190/
* RMMSg 使用 http://lifegoo.pluskid.org/?p=261 http://technology.chtsai.org/mmseg/
* ICTCLAS 使用 http://ictclas.org/docs/%E5%9F%BA%E4%BA%8E%E5%A4%9A%E5%B1%82%E9%9A%90%E9%A9%AC%E6%A8%A1%E5%9E%8B%E7%9A%84%E6%B1%89%E8%AF%AD%E8%AF%8D%E6%B3%95%E5%88%86%E6%9E%90%E7%A0%94%E7%A9%B6.pdf
* 微博应用 使用，不是分词算法，是关键词提取算法 http://166.111.138.15:8080/qqweibo/conll2011.pdf

机器学习算法库
----------------

已有的算法有：

1. [Parallel Logistic Regression](http://en.wikipedia.org/wiki/Logistic_regression)
2. [Bagging Logistic Regression](http://en.wikipedia.org/wiki/Bootstrap_aggregating)
3. [Random Decision Tree/forest](http://en.wikipedia.org/wiki/Random_forest)
4. [Regular singular value decomposition]
(http://en.wikipedia.org/wiki/Singular_value_decomposition)
5. [Gradient boosting decision tree](http://en.wikipedia.org/wiki/Gradient_boosting)


R语言、KNIME与宋词那些事
------------------------

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

未整理的链接
-------------

* http://www.google.com.hk/ggblog/googlechinablog/2006/04/blog-post_7327.html
* http://www.google.com.hk/ggblog/googlechinablog/2006/04/blog-post_2507.html
* http://www.google.com.hk/ggblog/googlechinablog/2006/04/blog-post_1583.html
* http://www.matrix67.com/blog/archives/4212 http://drupal.org/project/csplitter http://www.williamlong.info/archives/1839.html
* http://www.hudong.com/wiki/%E5%8F%8C%E6%95%B0%E7%BB%84trie%E6%A0%91
* http://gump-bean.iteye.com/blog/436426