---
title: 《普林斯顿数学指引》读书笔记——I.4 数学研究的一般目的（上）
tags: 数学
code_mode: math
---

> 按：这篇笔记是系列笔记的第五篇，第一部分有4节，每节对应1-2篇笔记。
> 
> 笔记的方式，是引用一段个人觉得比较有亮点的英文原文，再给一段简化的中文说明，不采用中文版的翻译，不自行做直接翻译，只说明要点。因为不可能大段大段地去引用，必然会有语境的丢失，会做一些补充说明，以“按：”开始。对中文版翻译进行更正或调整的说明，以“注：”开始。偶尔也会插入自己的议论，以“评：”开始。
>
> 全系列笔记目录：
> 
> * [《普林斯顿数学指引》读书笔记——I.1 数学是关于什么的](http://utensil.github.io/tech/2017/02/07/23-12-princeton-math-note-i1-about.html) 
> * [《普林斯顿数学指引》读书笔记——I.2 数学的语言和语法](http://utensil.github.io/tech/2017/02/11/21-01-princeton-math-note-i2-lang.html)
> * [《普林斯顿数学指引》读书笔记——I.3 一些基本的数学定义（上）](http://utensil.github.io/tech/2017/05/22/23-47-princeton-math-note-i3-basic-def-1.html)
> * [《普林斯顿数学指引》读书笔记——I.3 一些基本的数学定义（下）](http://utensil.github.io/tech/2017/09/10/00-51-princeton-math-note-i3-basic-def-2.html)
> * [《普林斯顿数学指引》读书笔记——I.4 数学研究的一般目的（上）](http://utensil.github.io/tech/2017/11/04/23-20-princeton-math-note-i4-purpose-1.html)
> * [《普林斯顿数学指引》读书笔记——I.4 数学研究的一般目的（下）](http://utensil.github.io/tech/2018/02/22/14-01-princeton-math-note-i4-purpose-2.html)

## I.4 The General Goals of Mathematical Research （数学研究的一般目的）

### 1 Solving Equations （解方程）

> Mathematics is full of objects and structures (of a mathematical kind), but they do not simply sit there for our contemplation: we also like to do things to them.

数学里充满了对象和结构，但是它们并不是静静地呆在那里供我们沉思：我们也想要对它们实施各种操作。

> Transformations like these give rise to a never-ending source of interesting problems. If we have defined some mathematical process, then a rather obvious mathematical project is to invent techniques for carrying it out. This leads to what one might call direct questions about the process. However, there is also a deeper set of inverse questions, which take the following form. Suppose you are told what process has been carried out and what answer it has produced. Can you then work out what the mathematical object was that the process was applied to?

像这样的变换会产生无穷无尽的有趣问题。如果我们定义了某个数学过程，那么创造一种方法来执行它，就是一个特别显然的数学课题。这会引出可称之为该数学过程的直接问题。然而，存在一组更深层次的逆问题，具备如下形式：假定你已被告知怎样的数学过程被执行了，以及它所产生的答案，你能否找到该数学过程是作用于什么数学对象之上的？

> Because x and y can be very much more general objects than numbers, the notion of solving equations is itself very general, and for that reason it is central to mathematics.

因为x和y这些未知项可以是比数一般得多的对象，解方程式的概念本身也就是非常一般的，因此它成为了数学的中心问题之一。

> We have just discussed the generalization of linear equations from one variable to several variables. Another direction in which one can generalize them is to think of linear functions as polynomials of degree 1 and consider functions of higher degree.

我们刚才讨论了线性方程从一元到多元的推广。另外一个推广它们的方向是将线性函数看作一次多项式，从而考虑更高次数的函数。

> What matters about an equation is often the existence and properties of solutions and not so much whether one can find a formula for them.

对于一个方程最关键的通常是解的存在性与其性质，而不那么在于能否找到解的公式。

> In many instances the explicit solubility of an equation is a relative notion. 

在许多情况下，解的显式的可解性是一个相对的概念。（比如根号2这样的数的定义就是它是x^2=2的解，允许根式出现在解的公式中，本身就放宽了公式的定义来使得相当多的方程变得显式可解了。）

> The answer to the question of whether a particular equation has a solution varies according to where the solution is allowed to be.

一个特定的方程是否有解，取决于允许解被允许在哪里求解。（这里的哪里指的是数域或者数学对象的集合。）

> ......a typical Diophantine equation, the name given to an equation if one is looking for integer solutions.

(上面的例子是)一个典型的丢番图方程。如果要找的是方程的整数解，就可以给该方程这个名字。

> What does this tell us about Diophantine equations? We can no longer dream of a final theory that will encompass them all, so instead we are forced to restrict our attention to individual equations or special classes of equations, continually developing different methods for solving them.

丢番图方程告诉了我们什么呢？我们再也不能梦想有一个囊括所有这种方程（解法）的最终理论，相反，我们被迫聚焦于个别或特定类别的方程，并且持续地对它们发展不同的解法。

> For many reasons, differential equations represent a jump in sophistication. One is that the unknowns are functions, which are much more complicated objects than numbers or n-dimensional points. (For example, the first equation above asks what function x of t has the property that if you differentiate it twice then you get -k^2 times the original function.) A second is that the basic operations one performs on functions include differentiation and integration, which are considerably less “basic” than addition and multiplication. A third is that differential equations that can be solved in “closed form,” that is, by means of a formula for the unknown function f , are the exception rather than the rule, even when the equations are natural and important.

有许多理由说明求解微分方程在精巧性上是一个飞跃。其中一个是此时未知项是函数，它相比数或者n维空间的点来说是复杂得多的对象（例如，上面的第一个方程要求，关于t的函数x在微分两次之后还原为原来的函数，但乘上一个-k^2的因子）。第二个理由是现在施加于函数上的运算包括了微分和积分，它们远不如加法和乘法那么“基本”。第三个理由是可以“封闭形式”求解的微分方程（即通过未知函数f的公式来表达）只是例外而非常规，即使方程非常自然和重要。

> As with polynomial equations, this can depend on what you count as an allowable solution. Sometimes we are in the position we were in with the equation x^2 = 2: it is not too hard to prove that solutions exist and all that is left to do is name them.

就像多项式方程一样，（微分方程的可解性）可能取决于把什么当作被允许的解。有时候我们就像回到了面对方程x的平方等于2时的局面：证明解的存在并不难，只需要给它取一个名字就行了。

> Sometimes there are ways of proving that solutions exist even if they cannot be easily specified. Then one may ask not for precise formulas, but for general descriptions. For example, if the equation has a time dependence (as, for instance, the heat equation and wave equations have), one can ask whether solutions tend to decay over time, or blow up, or remain roughly the same. These more qualitative questions concern what is known as asymptotic behavior, and there are techniques for answering some of them even when a solution is not given by a tidy formula.

有时候存在多种方法证明解是存在的，哪怕这些解不能被轻易指定。这时，人们会不要求得到精确的公式，只希望得到一般性的描述。例如，如果这个方程有对时间的依赖性（比如热的方程和波的方程就都有），人们就会问解是否随着时间而衰减，或者爆发，或者大体上不变。这些更加定性的问题，关注的是所谓的渐进性态，有一些技巧来回答部分此类问题，即使此时解无法由干净利落的公式给出。

### 2 Classifying（分类）

> If one is trying to understand a new mathematical structure, such as a group [I.3 §2.1] or a manifold [I.3 §6.9], one of the first tasks is to come up with a good supply of examples. Sometimes examples are very easy to find, in which case there may be a bewildering array of them that cannot be put into any sort of order. Often, however, the conditions that an example must satisfy are quite stringent, and then it may be possible to come up with something like an infinite list that includes every single one.

如果想理解一个数学结构，例如群[I.3 §2.1] 或者一个流形[I.3 §6.9]，首要任务之一就是想出足够多的例子。有时候例子找起来很容易，却只是多得眼花缭乱而理不出任何秩序的一大堆。然而，时常这些例子必须要满足的条件相当严格，于是这时，想出的就像一个无限长的、包含每一个具体例子的清单。

评：这一段无论是中文还是英文，都始终没有理解作者的意思。为什么主体是分类，谈的却是举例？如果谈的是举出典型的例子，并且围绕着典型的例子进行聚类分组，还可以理解，但这里并没有表达这个意思。提出说存在容易找例子但不好分类组织的情况，但没有给出解决方案，就直接说变成了一个无限长的清单，是逃避了问题，还是这种情况每个例子就的确是一类，与其他例子没有共性？再考虑到下面一段话提到对清单中每一个例子验证某一个命题成立，则该命题对于该数学结构成立，却没有在这段话中交代如何确保分类是不漏不重（Mutually Exclusive Collectively Exhaustive，MECE）的。

> Classifications are very useful because if we can classify a mathematical structure then we have a new way of proving results about that structure: instead of deducing a result from the axioms that the structure is required to satisfy, we can simply check that it holds for every example on the list, confident in the knowledge that we have thereby proved it in general. This is not always easier than the more abstract, axiomatic approach, but it certainly is sometimes. Indeed, there are several results proved using classifications that nobody knows how to prove in any other way. More generally, the more examples you know of a mathematical structure, the easier it is to think about that structure—testing hypotheses, finding counterexamples, and so on. If you know all the examples of the structure, then for some purposes your understanding is complete.

分类是非常有用的，因为如果能够对一种数学结构进行分类，就有了一种证明有关该结构的结果的新方法：不必从这个结构所必须满足的公理中来推出结果，而只需要验证这个结果是否对于这个（分类）清单中的每一个例子都成立，我们就可以很有信心地知道我们借此一般性地证明了该结果。

这样做并不总是比更抽象的公理方法更容易，但有时确实要容易一些。事实上，有一些结果就是用分类才证明的，而且至今无人知晓如何用其他方式证明。更一般地说，对于一个数学结构知道的例子越多，对这个结构进行思考就越容易——检验假设、寻找反例等等。如果已经知道了一个结构所有的例子，则对于某些目的而言，我们完全懂得了这个结构。

> We therefore know that the regular polytopes in dimensions three and higher fall into three families—the n-dimensional versions of the tetrahedron, cube, and octahedron—together with five “exceptional” examples—the dodecahedron, the icosahedron, and the three four-dimensional polytopes just described. This situation is typical of many classification theorems. The exceptional examples, often called “sporadic,” tend to have a very high degree of symmetry—it is almost as if we have no right to expect this degree of symmetry to be possible, but just occasionally by a happy chance it is. The families and sporadic examples that occur in different classification results are often closely related, and this can be a sign of deep connections between areas that do not at first appear to be connected at all. Sometimes one does not try to classify all mathematical structures of a given kind, but instead identifies a certain class of “basic” structures out of which all the others can be built in a simple way.

因此我们知道在3维和更高维的情况下，正多胞形分为三个族类，即n维版本的正四面体、正六面体、正八面体，再加上五个特例——三维的正12面体和正20面体，还有刚才描述的三个4维多胞体（按：这里不方便展开介绍，可参见 [List of regular polytopes and compounds](https://en.wikipedia.org/wiki/List_of_regular_polytopes_and_compounds)）。这种情形在许多分类定理中非常典型。这些特例，常称为“零星的”，通常倾向于具有非常高的对称性——这种程度的对称性我们不敢期望其可能，却奇迹般地存在。这些出现在不同分类结果中的族类以及特例，时常具备相互间紧密的联系，这正是乍一看毫无关联的领域间有深刻联系的一个信号。有时我们并不打算把某一类型的数学结构全部加以分类，而是从中识别出某一类基本的结构，使得其他结构全可以由它们简单地构造出来。

> Why should nonequivalence be harder to prove than equivalence? The answer is that in order to show that two objects are equivalent, all one has to do is find a single transformation that demonstrates this equivalence. However, to show that two objects are not equivalent, one must somehow consider all possible transformations and show that not one of them works. How can one rule out the existence of some wildly complicated continuous deformation that is impossible to visualize but happens, remarkably, to turn a sphere into a torus?

为什么不等价比等价要难证明呢？答案在于，要证明两个对象等价，只要找到一个变换来演示其等价性，而要证明两个对象不等价，就要考虑一切可能的变换，而且证明没有一个有效。我们如何才能排除存在一个极为复杂的、无法可视化的连续变换把一个球面变成一个环面的可能性呢？

> The Euler number is an example of an invariant. This means a function φ, the domain of which is the set of all objects of the kind one is studying, with the property that if X and Y are equivalent objects, then φ(X) = φ(Y). To show that X is not equivalent to Y, it is enough to find an invariant φ for which φ(X) and φ(Y) are different. Sometimes the values φ takes are numbers (as with the Euler number), but often they will be more complicated objects such as polynomials or groups.

欧拉示性数是不变式的一个例子。不变式即是一个函数φ，它的定义域是要研究的那一类的全部对象的集合，而且具有如下的属性，如果两个对象X和Y等价，则φ(X) = φ(Y)。为了证明X和Y不等价，只需要找到一个不变式使得这两个不变式不相等即可，有时候这个不变式的值φ是一个数，但往往会是更复杂的数学结构，例如多项式或者群。

### 3 Generalizing （推广）

> When an important mathematical definition is formulated, or theorem proved, that is rarely the end of the story. However clear a piece of mathematics may seem, it is nearly always possible to understand it better, and one of the most common ways of doing so is to present it as a special case of something more general.

当一个重要的数学定义得以提出，或者一个重要的数学定理得以证明，往往并不是故事的结束。不论一项数学工作看似多么清楚明显，总存在更好地理解它的可能，而最常见的达成这个目标的方式，就是将其重述为一个更一般的概念的特例。

> Why did it help to generalize the problem in this way? One might think that it would be harder to prove a result if one assumed less. However, that is often not true. The less you assume, the fewer options you have when trying to use your assumptions, and that can speed up the search for a proof. Had we not generalized the problem above, we would have had too many options.

为什么用这种方式把问题推广会有利于问题的解决？人们可能以为，假设更少时，证明一个结果更难 ，然而实际情况往往并非如此。假设得更少，尝试使用这些假设时需要作出的选择就更少，这可以加速对证明（路径）的搜寻。如果我们没有把问题一般化，我们会拥有过多的选择（需要去尝试）。

> There is no clear distinction between weakening hypotheses and strengthening conclusions, since if we are asked to prove a statement of the form P ⇒ Q, we can always reformulate it as ¬Q ⇒¬P. Then, if we weaken P we are weakening the hypotheses of P ⇒ Q but strengthening the conclusion of ¬Q⇒¬P.

弱化结论与强化结论，并不是那么泾渭分明，因为如果我们被要求证明形如P ⇒ Q的命题，我们总可以将其重新表述为 ¬Q ⇒¬P。于是，如果我们弱化了P，我们是在弱化 P ⇒ Q 的假设，却同时也是在强化¬Q⇒¬P的结论。

> The abstract concept of a group helps one to see Fermat’s little theorem in a completely new way: it can be viewed as a special case of a more general result, but a result that cannot even be stated until one has developed some new, abstract concepts. This process of abstraction has many benefits. Most obviously, it provides us with a more general theorem, one that has many other interesting particular cases. Once we see this, then we can prove the general result once and for all rather than having to prove each case separately. A related benefit is that it enables us to see connections between results that may originally have seemed quite different. And finding surprising connections between different areas of mathematics almost always leads to significant advances in the subject.

群的抽象概念可以帮助人们以全新的视角看待费马小定理：它可以被看作更为一般的结果的一个特例，但这个更一般的结果在某种新的抽象概念被发展出来之前，甚至无法被陈述。这种抽象的过程具备许多益处。最明显的是，它为我们提供了更为一般的定理，该定理具备许多其他有趣的特定应用。一旦我们看到了这一点，我们就可以一劳永逸地证明一般性的结果，而不必分别证明每种情况。

> The word “abstract” is often used to refer to a part of mathematics where it is more common to use characteristic properties of an object than it is to argue directly from a definition of the object itself (though, as the example of √ 2 shows, this distinction can be somewhat hazy). The ultimate in abstraction is to explore the consequences of a system of axioms, such as those for a group or a vector space. However, sometimes, in order to reason about such algebraic structures, it is very helpful to classify them, and the result of classification is to make them more concrete again.

“抽象”这个词常常被用来指代更常使用对象特征性质而非直接从对象自身的定义出发论证的那一部分数学（虽然 √ 2 的例子说明，这种区别可能会有些模糊）。抽象的最终目的是探索一系列公理的后果，例如一个群或者一个向量空间的公理。然而，有时候，为了就这样的代数结构进行推理，对它们进行分类会很有帮助，而分类的结果却又把它们变得更为具体了。

> one reformulates part of geometry in terms of a certain algebraic structure and then generalizes the algebra.

人们用某个特定的代数结构来重新表示几何的一部分，然后推广该代数。

> A process that has generated many of the most important problems and results in mathematics, particularly over the last century or so: the process of generalization from one variable to several variables.

从一元推广到多元的过程，在数学中产生了相当多最重要的问题和结果，尤其是在过去的一个世纪里。

> This geometrical interpretation is important, and goes a long way toward explaining why extensions of definitions and theorems from one variable to several variables are so interesting. If we generalize a piece of algebra from one variable to several variables, we can also think of what we are doing as generalizing from a one-dimensional setting to a higher-dimensional setting. This idea leads to many links between algebra and geometry, allowing techniques from one area to be used to great effect in the other.

这种几何解释是重要的，而且相当有助于解释为何定义和定理从一元到多元的扩展如此有趣。如果我们将一项代数工作从一元推广到多元，我们也可以将这个过程视为从1维的设定推广到高维的设定。这种思想引出了代数与几何之间的许多关联，使得一个领域的数学技艺能够运用到另一个领域并发挥极大作用。

> 本文也发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/212315388)