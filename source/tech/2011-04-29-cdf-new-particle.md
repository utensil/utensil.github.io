---
title: CDF的新粒子？
tags: 物理
code_mode: math
---

以下汇总自[GrossmannZ(@einsteinii)的微博](http://t.qq.com/einsteinii)，以及[李淼老师的博客](http://limiao.net/2831)，并有自己的一些补充。

[纽约时报4月5日报道](http://www.nytimes.com/2011/04/06/science/06particle.html?_r=2)，费米实验室Tevatron对撞机准备公布一个质量120-160GeV，3σ的意外信号。

该信号从未被理论预测过，如果属实，将暗示一个有趣的新发现。注意，粒子物理实验依赖统计，3σ表示“值得注意”，宣布新粒子发现需要5σ。该结果已提交[PRL](http://arxiv.org/abs/1104.0699)。

实验的主要结果是在终态为W玻色子和两个喷注（夸克引起的）的事件统计中发现一个鼓包。在粒子物理实验中，这类鼓包通常是由质量相当的粒子引起的。

论文摘录：

> ... dominated by events where a W boson, which decays leptonically, is produced in association with jets (W+jets).... The result is compatible with expectation from a Monte Carlo simulation of a W boson plus a particle with a mass of 150 GeV/c2 and decaying into two jets.

(个人对W+jet的理解：在质子-反质子高能对撞过程中，产生了W+和夸克，W+以衰变为正电子和电子中微子的方式被观测到，而夸克由于不能自由存在，则通过它碎入重组形成的强子射流（jets）的方式观测到。W+ jets是高能对撞的主要背景，其它的比如双玻色子WW、WZ过程、Z+过程和Top过程等发生的频率都低于W+。需要用MC模拟估算所有这些过程并从对撞机探测器的数据中剔除，才能够发现过程中产生的新粒子。)

在CDF组文章出现的五天前，就有一篇文章(http://arxiv.org/abs/arXiv:1103.6035) 认为W+2jets的反常是由Z’衰变引起的。Z’玻色子的质量大约是150Gev，不仅解释了W+2jets，还能解释以前的top夸克forward-backward不对称性。  


在CDF文章之后，很快，Kingman Cheung和他的合作者写了一篇Z’文章：http://arxiv.org/abs/1104.1375 。

北大马伯强教授和台大何小刚教授讨论了用intrinsic strange quarks想法解释CDF的反常，也很快写出文章：http://arxiv.org/abs/1104.1894 。

CDF作者之一，意大利粒子物理学家Tommaso Dorigo对该实验结果做了通俗的讨论，在讨论了几种可能的误差后，他个人表示这不大可能是新发现：http://www.science20.com/quantum_diaries_survivor/new_massive_particle_some_kind_higgs-77857

文中认为常见各种系统误差应该不大可能是这个结果的原因，认为标准模型外但理论物理内还是存在模型可以解释这个数据，如Z’:  http://arxiv.org/abs/arXiv:1103.6035 。但他个人认为是MC模拟对W+jet建模不够准确造成的数据差异。

另外，文中认为这个数据给DZERO和LHC都是一个指引，如果它们能在同一质量范围和同类事件中得到相当于或超过3σ的结果，就爽了。BTW，mark：这个实验的p-value是`7.6*10^-4`，相当于3.2倍标准差。 

Tommaso在4月7日的两篇博客 http://www.science20.com/quantum_diaries_survivor 里继续讨论了这个结果。参考较早前D0类似的分析结果，统计波动的可能性比较大。对撞实验要求对背景噪音有足够好的理解和建模；*假设*这个意外的结果来自于对某个背景的估计不足，放大背景则可能将它淹没。

前一条关于费米实验室3σ意外信号的转播不是在质疑实验结果的有效性，而是为了说明对背景的理解在粒子物理实验中的重要性。那个gif动画只是一个演示而不代表任何关于背景正式信息。这样的信号不罕见，多数时候它们来自统计波动，更多的数据会将其抹平；另一方面，一些新发现就是这么逐渐浮出水面的。

在不断积累数据的过程中，人们不断提高对背景的理解和建模，这对粒子物理实验，尤其是复杂的对撞机探测器实验而言是极其重要的。Tevatron对撞了数十年，人们对它有了相当好的理解；LHC刚运行不久，能量、亮度较Tevatron都有数量级的提升，背景也更加复杂，理解它的过程绝不容易。

关于两周前费米实验室CDF意外发现Wjj通道上3σ溢出（图中蓝色曲线），Zack Sullivan在 http://arxiv.org/abs/1104.3790v1 指出，CDF采用的MC模拟对背景估计不足，且在过去CDF对单顶夸克生产过程的测量中找到了这个过程贡献背景的证据。也就是说，如果人们用信号减去用实验数据得到的背景，这个溢出是不会存在的。

传统上，对撞机探测器的数据分析利用动力学对数据进行比较简单的筛选，分析中所有的不确定性都被人较好地控制着，但这么做效率低下难以抓住重点；于是后来人们通过复杂的算法在粒子反应的相空间里寻找关系，可一旦变量多到一定程度，人们就容易失去了对不确定性足够好的控制而不能准确估计误差。

说到底，报告一个数字总是相对简单的，而指出这个数字的误差范围通常比得到它本身要花费大得多的代价。