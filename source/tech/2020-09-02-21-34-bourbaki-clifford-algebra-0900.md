---
title: Bourbaki之Clifford Algebra法译英之零：译前记
tags: 数学
code_mode: math
---

## 缘起

我大约在2015年9月时开始接触到[Geometric Algebra](https://en.wikipedia.org/wiki/Geometric_algebra)，被它深深吸引，开启了很多相关的学习，后来也深深参与到了相关一些开源软件的开发或维护中。今年开始接触了[Lean](http://leanprover.github.io/)这个[theorem prover](https://en.wikipedia.org/wiki/Proof_assistant)，想要把自己对Geometric Algebra的认知进行[formalize](https://en.wikipedia.org/wiki/Formal_system)，过程中接触到Lean的[mathlib](https://github.com/leanprover-community/mathlib)背后的维护团队中的数学家是比较推崇[Bourbaki](https://en.wikipedia.org/wiki/Nicolas_Bourbaki)的。

推崇Bourbaki的原因是，Bourbaki按照自己的理念重塑了数学的基础，许多的theorem prover在遇到formalization独有的一些对数学进行工程化组织的问题时，殊途同归地采取了Bourbaki中的一些思想，比如[filter](https://www.imo.universite-paris-saclay.fr/~pmassot/topology.pdf)，而这些思想不仅在构建一个通用而交织的数学formalization库的过程中找到了实用性，更因为这实用性的体会让人更深地领会了其中思想的本质与价值，而倘若只是在一般数学研究或者教学中，Bourbaki的思想虽有一定启发性，却没有这般不可或缺的价值。

我一开始是希望用相对初等的Geometric Algebra的方式来formalize，但经过一段时间的尝试，发现这样并不能达成我的愿景，于是还是要回归到[Clifford Alegbra](https://en.wikipedia.org/wiki/Clifford_algebra)的层面。找了很多相关的文献，也开始找Bourbaki的Clifford Alegbra，它是在Éléments de Mathématique丛书的Algèbre系列的[Chapitre 9 Formes sesquilinéaires et formes quadratiques](https://www.amazon.com/Alg%C3%A8bre-Chapitre-Elements-Mathematique-French-ebook/dp/B00F6CT1EI) 这册里面，结果从纸书和电子书的搜寻中双重确认了这册书还只有法文版，没有英文版（当然更别提中文版了，不过数学和理工科的书本来也很少再去看中文版了，翻译水平参差不齐），进一步确认是发现了Arkadiusz Jadczyk的这篇博客[Comments on Clifford algebras](http://arkadiusz-jadczyk.eu/blog/2019/01/comments-clifford-algebras/)，作者读了相关的英文文献，结合法文版的Bourbaki，写了一个[英文版的Note](http://arkadiusz-jadczyk.eu/docs/clifford.pdf)。这个Note对formalization很有参考价值，但与法文版并不一一对应，而我还是希望了解Bourbaki原始的处理方式。

恰好我已经断断续续学了一段时间的法语，虽然水平根本不入门，但偶尔处理一些短篇的感兴趣的法文的材料时，发现如果适度借助这个时代的科技（如[法语助手](https://www.frdic.com/)、[DeepL翻译](https://www.deepl.com/)、[Linguee](https://www.linguee.fr/francais-anglais/)等），直接阅读法文材料其实没有那么大的障碍，这也符合我学习外语的基本思想：不求精通，但求这个语言背后的世界对我打开，我可以与之互动，而不至于有绝对的能力障碍或心理障碍。

直接尝试阅读法文的数学材料会得到来自4个方面的便利：

- 只要认识法文的基础词汇，大部分法文高级词汇都和英文相似
- 数学公式可以辅助判断法文内容
- 数学材料中的法文基本用固定的句式，容易举一反三
- 数学材料中的法文在性数和变位时态等语法方面也相对单一

因此打算启动这个翻译的计划，仅翻译与Clifford Algebra相关的少量章节到英文，满足个人练习和学习的需要。发布上来是考虑到可能会对其他人有用，或者错讹之处可能得到指正。而且，这个专栏自从创建，就一直没有写点什么，实在是学习和用学习到的知识尝试做东西占据了更多的时间，而没有及时沉淀总结，这次是个好机会也是个合适的题材。

在本次法译英中，主要采取如下方法组织各种语言的内容：

- 以翻译后的英文为主
- 每段后引用法文原文参考
- 可选有少量中文的讨论，数学讨论以“讨论：”开始，翻译讨论以“译注：”开始

一个有益的数学文本中常见的法语词汇参考是[French Glossary](http://www-users.math.umn.edu/~kwlan/documents/french-glossary.pdf)，可以更好地找到法语词汇在数学语境下的含义。我本来想要顺便写一个词汇表的，但发现大部分已经被这个涵盖了。不过有时间还是写一个常见的惯用法为宜。

本次翻译过程中，还用到了OCR识别相关的技术来提升录入效率，包括：

- [Mathpix Snip](https://mathpix.com/)
- [Detexify](https://detexify.kirelabs.org/classify.html)
- [ShapeCatcher](https://shapecatcher.com/index.html)

当然，效率工具只是效率工具，人自身是结果质量的最终保障。

> 本文也发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/212963574)

<!-- ## 目录

- [Bourbaki之Clifford Algebra法译英之一：9.1 Clifford代数的定义与泛性质（上）](https://zhuanlan.zhihu.com/p/212965494)
- [Bourbaki之Clifford Algebra法译英之二：9.1 Clifford代数的定义与泛性质（下）](https://zhuanlan.zhihu.com/p/237923156) -->