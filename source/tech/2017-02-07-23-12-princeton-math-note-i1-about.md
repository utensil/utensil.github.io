---
title: 《普林斯顿数学指引》读书笔记——I.1 数学是关于什么的
tags: 数学
code_mode: math
---

> 按：我是在同事的朋友圈发现[《普林斯顿数学指引》](https://book.douban.com/subject/25817381/)的，看了介绍感觉会很有启发，随即就下了英文电子版，然后又向同事借来了中文版的第一卷。恰逢几个整段时间，看到100多页，然后又中断了1个月，又用了几个夜晚从头再读并同时在英文电子版上标注笔记，终于咀嚼完了提纲挈领的第一部分（此时也已经粗读完了第二部分），所以在此做个笔记，记录感想。
>
> 中文版的译者虽然是我自《重温微积分》就接触过的齐民友教授，也能看得出翻译的态度是认真的，但依然存在很多不流畅、不准确的翻译，甚至有多处因理解不到位对原文做的“更正”，笔记中会部分指出。中文版对于阅读的加速作用还是很明显的，但常常需要对照英文版确认，这点依然还是很不理想。网上的英文版除了没有目录之外，也比中文版少了部分段落，但不多。我在网上没能找到译作的官方勘误表，只有原编者[在他的博客上发布了一些勘误](https://gowers.wordpress.com/category/princeton-companion-to-mathematics/)。
>
> 笔记的方式，是引用一段个人觉得比较有亮点的英文原文，再给一段简化的中文说明，不采用中文版的翻译，不自行做直接翻译，只说明要点。因为不可能大段大段地去引用，必然会有语境的丢失，会做一些补充说明，以“按：”开始。对中文版翻译进行更正或调整的说明，以“注：”开始。偶尔也会插入自己的议论，以“评：”开始。
>
> 这篇笔记是系列笔记的第一篇，第一部分有4节，对应4则笔记。
>
> 全系列笔记目录：
> 
> * [《普林斯顿数学指引》读书笔记——I.1 数学是关于什么的](http://utensil.github.io/tech/2017/02/07/23-12-princeton-math-note-i1-about.html) 
> * [《普林斯顿数学指引》读书笔记——I.2 数学的语言和语法](http://utensil.github.io/tech/2017/02/11/21-01-princeton-math-note-i2-lang.html)
> * [《普林斯顿数学指引》读书笔记——I.3 一些基本的数学定义（上）](http://utensil.github.io/tech/2017/05/22/23-47-princeton-math-note-i3-basic-def-1.html)
> * [《普林斯顿数学指引》读书笔记——I.3 一些基本的数学定义（下）](http://utensil.github.io/tech/2017/09/10/00-51-princeton-math-note-i3-basic-def-2.html)
> * [《普林斯顿数学指引》读书笔记——I.4 数学研究的一般目的（上）](http://utensil.github.io/tech/2017/11/04/23-20-princeton-math-note-i4-purpose-1.html)
> * [《普林斯顿数学指引》读书笔记——I.4 数学研究的一般目的（下）](http://utensil.github.io/tech/2018/02/22/14-01-princeton-math-note-i4-purpose-2.html)

# I.1 What Is Mathematics About? （数学是关于什么的）

## Algebra, Geometry, and Analysis（代数、几何与分析）

按：为了回答“数学是什么”这个棘手的问题，作者从一个粗略的近似分类开始，即先把数学粗分成代数、几何和分析这三个领域，再在这个基础上细分修正。

### Algebra versus Geometry（代数与几何的区别与联系）

> The objects of geometry, and the processes that they undergo, have a much more visual character than the equations of algebra.

几何比代数天生具备更多可视的特性，无论是几何研究的对象，还是它们经历的过程。

> The methods used to solve geometrical problems very often involve a great deal of symbolic manipulation, although good powers of visualization may be needed to find and use these methods and pictures will typically underlie what is going on. 

解决几何问题的方法常常需要很多符号操作（这点和代数是相似的），但要找到这些方法，需要很强的可视化能力，而且问题的内在机理背后也蕴含着图形。

注：中文版将“pictures will typically underlie what is going on”译作“在它的下面，典型地有图形在”，非常生硬。这里尝试把“what's going on”当作“how it works”意会成了“内在机理”，不一定准确，请大家体会原文。

> As for algebra, is it “mere” symbolic manipulation? Not at all: very often one solves an algebraic problem by finding a way to visualize it.

代数也不仅仅是符号的操作，常常会需要可视化的手法来帮助找到解法。

评：符号操作和图形化，是代数和几何各自的突出特点，但它们的研究领域和方法你中有我、我中有你，没有清晰的界限。

> Mathematicians vary widely in their ability and willingness to follow an argument like that one. If you cannot quite visualize it well enough to see that it is definitely correct, then you may prefer an algebraic approach.
>
> It is often possible to translate a piece of mathematics from algebra into geometry or vice versa. Nevertheless, there is a definite difference between algebraic and geometric methods of thinking——one more symbolic and one more pictorial——and this can have a profound influence on the subjects that mathematicians choose to pursue.

按：上文对一个代数和几何都可以解决的问题给出了一个非常典型的几何式的解法。

数学家们使用上述几何化的论述方式的能力和意愿是很不一样的。如果你难以建立对上述思路直观的、可视化的一种把握，并且看出来其显然是对的，那你一定倾向于代数的思路。

一个代数问题往往可以变换为一个几何问题来解决，反之亦然。但是，代数化和几何化的思考方式是泾渭分明的，这对于数学家选择什么样的数学主题去追寻有非常显著的影响。

评：一下子击中了我的软肋。我在数学上能明显感觉到的自己的瓶颈，就是不容易在脑海中建立一个立体的可视化的图景，即使我已经对问题有了清晰的理性了解。我在初中的时候还不能明白并有意识地去锻炼自己来突破这个瓶颈，于是就非常倾向于解析几何的思路来把几何问题转化为代数问题，而不喜欢去凭借（我缺乏的）图像直觉来画辅助线、感觉图形中的各种距离和角度关系。这个问题到了高中的立体几何变得更为突出，但我依然没有察觉，迷恋上了微分几何，沉浸在更多的符号里。与此同时，因为自己的大脑不能提供出色的可视化，所以特别喜欢用编程的方式（从而依然是符号化的领域）来进行可视化，从LOGO到Mathematica到Dot再到D3再到WebGL。

### Algebra versus Analysis（代数与分析的区别和联系）

> As a first approximation, one might say that a branch of mathematics belongs to analysis if it involves limiting processes, whereas it belongs to algebra if you can get to the answer after just a finite sequence of steps.

有人可能会认为分析就是涉及到极限过程的数学分支，而如果能够通过有限步得到答案的问题则属于代数。

> However, here again the first approximation is so crude as to be misleading, and for a similar reason: if one looks more closely one finds that it is not so much branches of mathematics that should be classified into analysis or algebra, but mathematical techniques.

其实被区分为分析或代数的，不应该是数学问题的分支，而是数学技艺。

评：这点和在讨论几何与代数的区别时简直如出一辙。可见数学问题本身是不应该被分类的，一个问题可以有来自多个数学领域的解法，或者解法会需要多个数学领域结合。所以能分类的，也只是数学技艺/技术。

注：mathematical techniques中文版译作“数学技巧”，容易引起误解，无论是技术、技艺、方法，都更准确一些。

> There are two features......that are typical of analysis. First, although the statement we wished to prove was about a limiting process, and was therefore “infinitary,” the actual work that we needed to do to prove it was entirely finite. Second, the nature of that work was to find sufficient conditions for a certain fairly simple inequality to be true.

分析有两个非常典型的特点。首先，虽然我们想要证明的命题涉及到极限的过程，因此是无限的，但为了证明它所要做的工作，却完全是有限的。其次，这些证明工作的本质，是去找到相当简单的特定不等式成立的充分条件。

> The ... argument is somewhat long, but each step consists in proving a rather simple inequality——this is the sense in which the proof is typical of analysis.

上述的论证虽然比较长，但是每一步仅仅包含证明一个非常简单的不等式，正是在这样一个意义上，这个证明是典型的分析证明。

Succinctly, algebraists like equalities and analysts like inequalities.

代数学家喜欢等式，分析学家喜欢不等式。

## The Main Branches of Mathematics（数学的主要分支）

### Algebra（代数）

按：这小节的介绍比较一般，所以只有下面这段被摘录，不代表全小节的中心思想就是下面这段。下同。

> (There is) a contrast that appears in many branches of mathematics, namely the distinction between general, abstract statements and particular, concrete ones. One algebraist might be thinking about groups, say, in order to understand a particular rather complicated group of symmetries, while another might be interested in the general theory of groups on the grounds that they are a fundamental class of mathematical objects.

在数学的许多分支中，都有这样一种对比，即一般的、抽象的命题和特殊的、具体的命题之间的区别。一个代数学家考察群，可能是为了理解一个特定的、复杂的对称群，而另外一个代数学家，则可能是因为群是数学对象的一个基本类别，从而对其一般理论感兴趣。

注：中文版将contrast译作“对立”，不妥。此处译为“对比”，感觉也未达意，请大家体会原文。

### Number Theory（数论）

> Most number theorists are not directly trying to solve equations in integers; instead they are trying to understand structures that were originally developed to study such equations but which then took on a life of their own and became objects of study in their own right.

绝大多数的数论学家，并不直接尝试用整数解方程，而是去努力理解各种最初是为了解整数方程而发展起来的数学结构。

> As a rough rule of thumb, the study of equations in integers leads to algebraic number theory and the study of prime numbers leads to analytic number theory.

粗糙地说，研究方程的整数解，引导到代数数论，而解析数论的根源是素数的研究。

### Geometry（几何）

> Within the study of manifolds, one can attempt a further classification, according to when two manifolds are regarded as “genuinely distinct.”

在研究流形时，可以依据“什么条件下可以把两个流形看成是真正不同”而做进一步的分类。

> ......relative distances are not important to topologists, since one can change them by suitable continuous stretches. A differential topologist asks for the deformations to be “smooth” (which means “sufficiently differentiable”).

对于拓扑学家，相对距离是不重要的，因为距离可以被适当的连续拉伸来改变。一个微分拓扑学家，则还会要求变形是“光滑的”（即“充分可微”）。

> At the other, more “geometrical,” end of the spectrum are mathematicians who are much more concerned by the precise nature of the distances between points on a manifold (a concept that would not make sense to a topologist) and in auxiliary structures that one can associate with a manifold. See Riemannian Metrics [I.3 §6.10] and Ricci Flow [III.80]

在数学研究领域里的更为“几何”的另一端，则有这样的数学家，他们对流形上的点之间的距离的精确的本性，更为感兴趣，更加关心可以与流形相关联的辅助结构，参见[黎曼度量](https://en.wikipedia.org/wiki/Riemannian_manifold#Riemannian_metrics)和[里奇流](https://en.wikipedia.org/wiki/Ricci_flow)。

注：“auxiliary structures that one can associate with a manifold”中文版和此处的译法都不太好，请体会原文。

### Algebraic Geometry（代数几何）

> Algebraic geometers also study manifolds, but with the important difference that their manifolds are defined using polynomials.

代数几何学家也研究流形，不过他们研究的流形，是由多项式来定义的。

> Algebraic geometry is algebraic in the sense that it is “all about polynomials” but geometric in the sense that the set of solutions of a polynomial in several variables is a geometric object.

从“完全是关于多项式”的角度来看，代数几何是代数的，但是，就多变量多项式的解的集合是一个几何对象而言，它又是几何的。

> An important part of algebraic geometry is the study of singularities. Often the set of solutions to a system of polynomial equations is similar to a manifold, but has a few exceptional, singular points. 

代数几何的一个重要部分是对奇点的研究。一个多项式方程组的解的集合，通常类似于一个流形，但会有少数例外的奇点。

注：中文版将singularities误译为“奇异性”。

### Analysis（分析）

> Like algebra, analysis has some abstract structures that are central objects of study, such as Banach Spaces [III.64], Hilbert Spaces [III.37], C*-Algebras [IV.19 ∽3], and Von Neumann Algebras [IV.19 ∽2]. These are all infinite-dimensional vector spaces [I.3 ∽2.3], and the last two are “algebras,” which means that one can multiply their elements together as well as adding them and multiplying them by scalars. Because these structures are infinite dimensional, studying them involves limiting arguments, which is why they belong to analysis. However, the extra algebraic structure of C.-algebras and von Neumann algebras means that in those areas substantial use is made of algebraic tools as well. And as the word “space” suggests, geometry also has a very important role.

和代数一样，分析也有其抽象的一面。例如，[巴拿赫空间](https://en.wikipedia.org/wiki/Banach_space)、[希尔伯特空间](https://en.wikipedia.org/wiki/Hilbert_space)、[C*-代数](https://en.wikipedia.org/wiki/C*-algebra)、[冯·诺依曼代数](https://en.wikipedia.org/wiki/Von_Neumann_algebra)都处在研究的中心。这些都是无限维向量空间，后两个还是代数，这意味着其中的元素，不但可以相加，可以与标量相乘，还可以彼此相乘。因为这些构造都是无限维的，研究它们的过程中要用到极限的论证，这就是为什么它们可以被归类到分析。然而C*-代数和冯·诺依曼代数里额外的代数结构也就意味着会大量地使用到代数工具。而“空间”一词，又表示几何也会起到重要的作用。

注：中文版对substantial use错译为“本质地应用”。

> Dynamics [IV.15] is another significant branch of analysis. It is concerned with what happens when you take a simple process and do it over and over again.......The answer turns out to depend in a complicated way on the original number `z0`. The study of how it depends on $ z_0 $ is a question in dynamics.

动力学是分析的另外一个引人注目的分支，它研究的是，当我们将一个非常简单的过程，反复地进行下去，会发生什么。……其结果，是这个（状态的）序列以一种复杂的方式依赖于初始状态 $ z_0 $ 。对这个序列如何依赖于初始状态的研究，正是动力学中的一个问题。

> Much of dynamics is concerned with the long-term behavior of solutions to these (partial differential equations).

动力学的相当大的一部分，就是关于偏微分方程的解的渐近性态的研究。

注：中文版在此处将原文的偏微分方程更正为常微分方程，理由不充分，存疑，此处不采纳；中文版将the long-term behavior of solutions（直接意思是“解的长期行为”）翻译为渐进性态，而渐进性态对应的英文术语是Asymptotic Behavior，不确定是否正确，待查证确认。

### 逻辑

> The word “logic” is sometimes used as a shorthand for all branches of mathematics that are concerned with fundamental questions about mathematics itself, notably set theory [IV.1], category theory [III.8], model theory [IV.2], and logic in the narrower sense of “rules of deduction.”

“逻辑”一词常常用作对“关于数学自身的基本问题的所有数学分支”的一个简称，特别值得关注的包括[集合理论](https://en.wikipedia.org/wiki/Set_theory)、[范畴理论](https://en.wikipedia.org/wiki/Category_theory)、[模型理论](https://en.wikipedia.org/wiki/Model_theory)，而狭义的逻辑，指的则是“演绎的规则”。

> Category theory is another subject that began as a study of the processes of mathematics and then became a mathematical subject in its own right. It differs from set theory in that its focus is less on mathematical objects themselves than on what is done to those objects——in particular, the maps that transform one to another.

范畴理论本来是来自对数学过程的研究，后来其自身也变成了一门数学学科。它与集合理论的不同在于，它较少关注数学对象本身，而是研究加诸这些对象之上的过程，尤其是从一个对象变换到另外一个对象的映射。

注：中文版将“another subject”误译作“另一个例子”。

> A model for a collection of axioms is a mathematical structure for which those axioms, suitably interpreted, are true. For example, any concrete example of a group is a model for the axioms of group theory.

一组公理的模型，是（在适当诠释后）使得公理成立的数学结构。例如，任何一个群的具体例子，就是群论公理的一个模型。

### 组合数学（Combinatorics）

> A first definition is that combinatorics is about counting things.

第一种定义：组合数学是关于如何对事物进行计数的。

> Combinatorics is sometimes called “discrete mathematics” because it is concerned with “discrete” as opposed to “continuous” structures.

第二种定义：组合数学，有时又被称之为离散数学，因为它考虑的是离散的结构，而不是连续的结构。

> A third definition is that combinatorics is concerned with mathematical structures that have “few constraints.”

第三种定义：组合数学处理的是具有极少量约束的数学结构。

注：中文版将constraints译为限制，而不使用数学文献中常见的约束，不妥。

> The first question counts as number theory, since it concerns a very specific sequence—the sequence of squares—and one would expect to use properties of this special set of numbers in order to determine the answer, which turns out to be yes......The second question concerns a far less structured sequence. All we know about an is its rough size—it is fairly close to $ n^2 $ —but we know nothing about its more detailed properties...The second problem belongs to combinatorics. The answer is not known. If the answer turns out to be yes, then it will show that, in a sense, the number theory in the first problem was an illusion and that all that really mattered was the rough rate of growth of the sequence of squares.

按：上文中举了两个例子来说明数论和组合数学的区别。两个问题都是问是否存在一个可以用1000种不同方法写成两数之和的正整数。区别是第一个问题里的“两数”，都是平方数，第二个问题里的“两数”，则都来自一个正整数序列，里面每一项的值都位于 $ n^2 $ 和 $ (n+1)^2 $ 之间。

第一个问题可以算作数论问题，因为它考察的是一个非常特定的序列——完全平方数序列，而且会希望用特定的数的集合的性质来回答。这个问题的答案是肯定的，的确存在这样一个正整数。

第二个问题，则是关于一个结构化程度低得多的序列。我们只知道其粗略的大小（接近 $ n^2 $ ），但对其更精确的性质一无所知。……第二个问题属于组合数学，答案如何尚不得而知。如果答案是肯定的，则它在一定意义上表明，数论对第一个问题的回答与解释只是一个幻象，真正起作用的，其实是完全平方序列粗略的增长率。

注：中文版将“a far less structured sequence”译为“构造要少得多的对象”，对理解并无帮助，且丢失了“序列”的信息量，不妥。

### Theoretical Computer Science（理论计算机科学）

> Theoretical computer science is concerned with efficiency of computation, meaning the amounts of various resources, such as time and computer memory, needed to perform given computational tasks. There are mathematical models of computation that allow one to study questions about computational efficiency in great generality without having to worry about precise details of how algorithms are implemented.

理论计算机科学关注的是计算的效率的问题，如完成一定的计算任务所需的各种资源量，比如时间和计算机内存。计算的数学模型，使得数学家可以以很大的通用性来研究计算效率的问题，而无需考虑算法如何具体执行。

### Probability（概率论）

> It may happen that there is a “critical probability” p with the following property: if the probability of infection after contact of a certain kind is above p then an epidemic may very well result, whereas if it is below p then the disease will almost certainly die out. A dramatic difference in behavior like this is called a phase transition. (See probabilistic models of critical phenomena [IV.26] for further discussion.)

（对于疾病的传播，）可能有一个具备如下属性的“临界概率”p存在：如果接触后感染的概率高于p，就很可能发生传染，而小于p时疾病几乎一定会自行消失。这样性态上的剧变被称为相变，参见[临界现象的概率模型](http://www.math.ubc.ca/~slade/pcm0007_final.pdf)。

### Mathematical Physics（数学物理）

> There is still a big cultural difference between the two subjects: mathematicians are far more interested in finding rigorous proofs, whereas physicists, who use mathematics as a tool, are usually happy with a convincing argument for the truth of a mathematical statement, even if that argument is not actually a proof. The result is that physicists, operating under less stringent constraints, often discover fascinating mathematical phenomena long before mathematicians do.

数学和物理学，仍有着巨大的文化上的差异：数学家们，对于寻找严格证明的兴趣要大得多，而物理学家们则是把数学作为一种工具，对于一个数学命题是否为真，只要有了令人信服的论证，哪怕这种论证还不真正就是一个证明，物理学家也就满足了。结果是，物理学家们是在不太严苛的限制下工作的，所以他们发现迷人的数学现象，常常比数学家早不少。

> The articles Vertex Operator Algebras [IV.13], Mirror Symmetry [IV.14], General Relativity and the Einstein Equations [IV.17], and Operator Algebras [IV.19] describe some fascinating examples of how mathematics and physics have enriched each other.

[顶点算子代数](https://en.wikipedia.org/wiki/Vertex_operator_algebra)、[镜面对称](https://en.wikipedia.org/wiki/Mirror_symmetry_%28string_theory%29)、[广义相对论](https://en.wikipedia.org/wiki/General_relativity)和[爱因斯坦场方程](https://en.wikipedia.org/wiki/Einstein_field_equations)、[算子代数](https://en.wikipedia.org/wiki/Operator_algebra)，这些条目描述了一些数学和物理丰富彼此的精彩例子。

> 本文同步发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/26943619)