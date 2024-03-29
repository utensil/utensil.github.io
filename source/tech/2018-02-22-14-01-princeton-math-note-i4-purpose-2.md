---
title: 《普林斯顿数学指引》读书笔记——I.4 数学研究的一般目的（下）
tags: 数学
code_mode: math
---

> 按：这篇笔记是系列笔记的第六篇，第一部分有4节，每节对应1-2篇笔记。
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

### 4 Discovering Patterns（发现模式）

> When a problem looks too difficult to solve, one should not give up completely. A much more productive reaction is to formulate related but more approachable questions.

当一个问题看起来太难解决，不应该完全放弃。一种更有成果的应对是提出相关但更易接近的问题。

> For some problems, the best approach is to build a highly structured pattern that does what you want, while for others—usually problems for which there is no hope of obtaining an exact answer—it is better to look for less specific arrangements. “Highly structured” in this context often means “possessing a high degree of symmetry.”

对于有的问题，最好的办法是构建一个高度结构化的模式，使其具备所需要的特性；而对于另一些问题——这些问题通常不太可能获得一个精确的回答——寻找不那么具体的排布反而更好。在这个语境下，“高度结构化”常常意味着“具有高度对称性”。

These facts about the Leech lattice illustrate a general principle of mathematical research: often, if a mathematical construction has one remarkable property, it will have others as well. In particular, a high degree of symmetry will often be related to other interesting features.

### 5 Explaining Apparent Coincidences （解释表观巧合）

> It is not obvious how seriously we should take this observation, and when it was first made by John McKay opinions differed about it. Some believed that it was probably just a coincidence, since the two areas seemed to be so different and unconnected. Others took the attitude that the function `j(z)` and the Monster group are so important in their respective areas, and the number 196 883 so large, that the surprising numerical fact was probably pointing to a deep connection that had not yet been uncovered.

这个观察结果（按：上文提到椭圆模函数`j(z)`的级数定义中的一个系数比魔群的最小可能维数只大了1）应该在多大程度上被严肃地对待，并不是那么显然，而且当John McKay首次观察到它时，人们的观点就已经有了分歧。有人相信这很可能只是一个巧合，因为这两个领域看上去很不一样也没有关联。其他人则采取了这么一种态度，椭圆模函数`j(z)`和魔群在他们各自的领域都那么重要，而196883这个数字又这么大，这种惊人的数值上的事实，可能指向某种尚未发现的深刻联系。

> Another general principle of mathematical research: if you can obtain the same series of numbers (or the same structure of a more general kind) from two different mathematical sources, then those sources are probably not as different as they seem. Moreover, if you can find one deep connection, you will probably be led to others.

数学研究的又一个一般性原则：如果你能够从两个不同的数学来源，获得同样的数字序列（或者某种更一般的数学对象形成的同样结构），那么这两个数学来源很可能没有它们看上去那么不一样。甚至，如果你可以找到一个深刻联系，还会顺藤摸瓜找到更多联系。

### 6 Counting and Measuring （计数与度量）

> This is a simple example of a counting argument, that is, an answer to a question that begins “How many.” However, the word “argument” is at least as important as the word “counting,” since we do not put all the symmetries in a row and say “one, two, three, . . . , sixty,”(resorting to “brute force”) as we
might if we were counting in real life.What we do instead is come up with a reason for the number of rotational symmetries being 5 × 12. At the end of the process, we understand more about those symmetries than merely how many there are.

这（按：“正二十面体有多少个旋转对称？”）是“计数论证”的一个简单例子，即对“有多少个”这类问题的回答。然而，“论证”这个词至少和“计数”一样重要，因为我们并非把所有的对称排成一列然后像我们在日常生活中计数一样一个一个数下去（采用蛮力的方式），而是提出了旋转对称总数为 5 × 12的理由。这个过程结束后，我们对这些对称获得了更深入的理解，而不只是它们有多少个。

> Even if an exact answer does not seem to be forthcoming, it is still very interesting to obtain estimates. In this case, one can try to define an easily calculated function f such that f (n) is always approximately equal to t(n). If even that is too hard, one can try to find two easily calculated functions L and U such that L(n) ≤ t(n) ≤ U(n) for every n. If we succeed, then we call L a lower bound for t and U an upper bound.

哪怕准确的答案看上去不易找到，获得其估计也是非常有趣的。这种情况下，我们可以尝试定义一个容易计算的函数f，使得f(n)总是近似地等于t(n)。即使这太难，我们也可以尝试找两个容易计算的函数L和U，使得对于所有n，L(n) ≤ t(n) ≤ U(n)均成立。如果成功找到了，我们就称L为下界，而称U为上界。

> Given a set of objects, one may wish to know, besides its size, roughly what a typical one of those objects looks like. Many questions of this kind take the form of asking what the average value is of some numerical parameter that is associated with each object.

给定数学对象的一个集合，除了它的大小，我们可能希望知道，这个集合的一个典型对象大概是什么样子的。这类问题很多具有同样的形式，即求与每个对象关联的某种数值参数的平均值。

> There are many problems in mathematics where one wishes to maximize or minimize some quantity in the presence of various constraints. These are called extremal problems. As with counting questions, there are some extremal problems for which one can realistically hope to work out the answer exactly, and many more for which, even though an exact answer is out of the question, one can still aim to find interesting estimates.

数学中有很多问题，都是希望在各种约束下，最大化或最小化某些量。这些问题被称为极值问题。就像计数问题一样，有的极值问题可以获得精确答案，而更多的问题，虽然精确答案不可能获得，但依然可以找到有趣的估计。

### 7 Determining Whether Different Mathematical Properties Are Compatible （判定不同的数学性质是否相容）

> Suppose that we wish to determine whether G has some property P that some groups have and others do not. Since we cannot prove that the property P follows from the group axioms, it might seem that we are forced to abandon the general theory of groups and look at the specific group G. However, in many situations there is an intermediate possibility: to identify some fairly general property Q that the group G has, and show that Q implies the more particular property P that interests us.

假定我们希望判定群G是否具备某种性质P，该特性有的群具备而其他群不具备。因为我们不能证明性质P服从群公理，我们可能被迫放弃群的一般理论而考察具体的群G。然而，很多情况下，存在一种间接的可能：识别出群G具备某种比较一般的性质Q，而证明性质Q可以导出我们感兴趣的更为具体的性质P。

### 8 Working with Arguments that Are Not Fully Rigorous （利用不完全严格的论证）

> A mathematical statement is considered to be established when it has a proof that meets the high standards of rigor that are characteristic of the subject. However, nonrigorous arguments have an important place in mathematics as well. For example, if one wishes to apply a mathematical statement to another field, such as physics or engineering, then the truth of the statement is often more important than whether one has proved it. However, this raises an obvious question: if one has not proved a statement, then what grounds could there be for believing it? There are in fact several different kinds of nonrigorous justification.

当一个数学命题有了一份满足该门学科特有的严格性的高标准的证明，它才被认为成立。然而，不完全严格的论证在数学里也有非常重要的地位。例如，如果我们希望应用一个数学命题到另外一个领域，比如物理或者工程，命题是否为真要比命题是否被证明更为重要。然而，这就提出了一个显然的问题：如果一个命题尚未被证明，那相信其为真有什么基础呢？实际上，存在着几种非严格的“正当化”论证。

> There are large numbers of papers with theorems that are proved only under the assumption of some version of the Riemann hypothesis. Therefore, anybody who proves the Riemann hypothesis will change the status of all these theorems from conditional to fully proved. How should one regard a proof if it relies on the Riemann hypothesis? One could simply say that the proof establishes that such and such a result is implied by the Riemann hypothesis and leave it at that. But most mathematicians take a different attitude. They believe the Riemann hypothesis, and believe that it will one day be proved. So they believe all its consequences as well, even if they feel more secure about results that can be proved unconditionally.

有大量的论文中存在许多定理，它们都是在黎曼假说的某种形式成立的前提下进行证明的。因此，任何人只要证明了黎曼假说，就将这些定理的状态从有条件的变成了完全被证明的。我们应该如何对待一个依赖黎曼假说的证明？我们可以简单地说该证明证明了黎曼假说蕴含了该结论，然后不再深究。但大多数数学家采取不同的态度。他们相信黎曼假说，而且相信它有一天会被证明。所以他们相信黎曼假说的所有推论，虽然他们觉得具备无条件证明的结论更为可靠。

> There is far more to a conjecture than simply a wild guess: for it to be accepted as important, it should have been subjected to tests of many kinds. For example, does it have consequences that are already known to be true? Are there special cases that one can prove? If it were true, would it help one solve other problems? Is it supported by numerical evidence? Does it make a bold, precise statement that would probably be easy to refute if it were false?

> It requires great insight and hard work to produce a conjecture that passes all these tests, but if one succeeds, one has not just an isolated statement, but a statement with numerous connections to other statements. This increases the chances that it will be proved, and greatly increases the chances that the proof of one statement will lead to proofs of others as well. Even a counterexample to a good conjecture can be extraordinarily revealing: if the conjecture is related to many other statements, then the effects of the counterexample will permeate the whole area.

猜想比瞎猜具备更丰富的内涵：要被接受为重要的猜想，它需要接受多种多样的测试。例如，它是否存在已知为真的推论？有没有可以被证明的特例？如果它成立，是否可以帮助解决其他问题？它是否为数值上的证据所支持？它是否作出大胆而精确的预言，其如果非真，很容易被证伪？

需要非常强的洞察力与大量的工作才能提出一个能够通过如上测试的猜想，不过如果成功了，得到的就不仅仅是一个孤立的命题，却是一个与其他命题有着无数联系的命题。这增加了它被证明的可能性，也极大地增加了一个命题的证明会引出其他命题的证明的可能性。即使一个好的猜想的反例也能揭示许多东西：如果该猜想与许多其他的命题相关，该反例的影响会渗透到整个领域。

> The more precise the predictions that follow from a conjecture, the more impressive it is when they are confirmed by later numerical evidence. Of course, this is true not just of mathematics but of science more generally.

一个猜想的预言越精确，当它后来被数值证据证明时，它就更令人印象深刻。当然这不仅仅对于数学成立，对于更一般的科学也是如此。

> Although almost nothing has been rigorously proved, physicists have a collection of nonrigorous methods that, if used carefully, seem to give correct results. With their methods, they have in some areas managed to establish statements that go well beyond what mathematicians can prove. Such results are fascinating to mathematicians, partly because if one regards the results of physicists as mathematical conjectures then many of them are excellent conjectures, by the standards explained earlier: they are deep, completely unguessable in advance, widely believed to be true, backed up by numerical evidence, and so on. Another reason for their fascination is that the effort to provide them with a rigorous underpinning often leads to significant advances in pure mathematics.

物理学家有一系列不严格的方法，虽然几乎都没有被严格证明过，但如果小心使用，似乎能给出正确的结果。采用他们的方法，能够在一些领域建立一些命题，而这些命题远非数学家们所能够证明。这些结论对于数学家是非常有吸引力的，一部分是因为如果把这些物理学家的结果当作数学猜想，按照之前解释过的标准，它们中的许多都是优秀的猜想：它们是深刻的，不可能事先猜测出来，被广泛认为是真实的，具备数值证据的支持，等等。其吸引力的另外一个理由是，用严格的基础证明它们，往往带来纯数学的重大进展。

> One might wonder whether rigor is important: if the results established by nonrigorous arguments are clearly true, then is that not good enough? As it happens, there are examples of statements that were “established” by nonrigorous methods and later shown to be false, but the most important reason for caring about rigor is that the understanding one gains from a rigorous proof is frequently deeper than the understanding provided by a nonrigorous one. The best way to describe the situation is perhaps to say that the two styles of argument have profoundly benefited each other and will undoubtedly continue to do so.

人们可能怀疑严格性是否还重要：如果非严格的论证建立的结论明确是真的，这还不够好吗？有例子表明，确实有不严格的方法“建立”起来的命题后来被证明是非真的，但在乎严格性的更重要的理由是人们从一份严格的证明中获得的理解往往远比一份不严格的证明中获得的理解要深刻得多。对这种局面最好的描述是，这两种论证的风格都深深受益于彼此，而以后无疑还会继续如此。

### 9 Finding Explicit Proofs and Algorithms （寻求显式的证明和算法）

> A fundamental dichotomy in mathematics: If you are proving that a mathematical object exists, then sometimes you can do so explicitly, by actually describing that object, and sometimes you can do so only indirectly, by showing that its nonexistence would lead to a contradiction.

数学中基础的两分法：如果你在证明一个数学对象存在，那么有时你可以通过实际描述这个对象来显式地证明，而有时你只能通过证明其不存在会带来矛盾来间接证明其存在性。

> Just as, all else being equal, a rigorous argument is preferable to a nonrigorous one, so an explicit or algorithmic argument is worth looking for even if an indirect one is already established, and for similar reasons: the effort to find an explicit argument very often leads to new mathematical insights. (Less obviously, as we shall soon see, finding indirect arguments can also lead to new insights.)

就像，一切其他条件相同时，一个严格的论证优于一个不严格的论证，一个显式的或有算法的论证是值得寻找的，即使一个间接的论证已经建立。基于相似的理由：寻找一个显式论证的努力常常带来全新的数学洞察。（不那么显然地，正如我们很快会看到的，寻找间接论证也能带来新的洞察。）

### 10 What Do You Find in a Mathematical Paper? （在数学论文中可以找到什么？）

> A typical paper is usually a mixture of formal and informal writing. Ideally (but by no means always), the author writes a readable introduction that tells the reader what to expect from the rest of the paper. And if the paper is divided into sections, as most papers are unless they are quite short, then it is also very helpful to the reader if each section can begin with an informal outline of the arguments to follow. But the main substance of the paper has to be more formal and detailed, so that readers who are prepared to make a sufficient effort can convince themselves that it is correct.

一篇典型的数学论文通常是形式的和非形式的写作风格的混合物。理想情况下（但并非总是如此），作者会写一段可读的介绍来告诉读者能从论文中的其他部分读到什么。而且如果论文被分成几个部分（大部分论文都如此，除非它们非常短），如果每一部分都以一段后继论证的非形式的大纲开始，对读者会有很大帮助。但论文的主要实质部分应该是比较形式、比较详细的，使得做好付出充分努力准备的读者，可以说服他们自己该论文是正确的。

> The most important of these statements are usually called theorems, but one also finds statements called propositions, lemmas, and corollaries. One cannot always draw sharp distinctions between these kinds of statements, but in broad terms, this is what the different words mean. A theorem is a statement that you regard as intrinsically interesting, a statement that you might think of isolating from the paper and telling other mathematicians about in a seminar, for instance. The statements that are the main goals of a paper are usually called theorems. A proposition is a bit like a theorem, but it tends to be slightly “boring.” It may seem odd to want to prove boring results, but they can be important and useful. What makes them boring is that they do not surprise us in any way. They are statements that we need, that we expect to be true, and that we do not have much difficulty proving.

数学命题中最重要的通常被称之为定理，不过论文中还有一些被称之为命题、引理、推论（又称系）。这些类型的命题很难做清楚的区分，但它们的字面意思大概说明了这种区分。一个定理，是一个本质上有趣的命题，比如它可以从论文中单独抽出来在研讨会上告诉其他数学家。一个命题有点像一个定理，但它们倾向于有点乏味。似乎证明乏味的结论很奇怪，但它们可能很重要而且有用。使得它们乏味的只是它们并不在任何角度上带来惊喜。它们是我们需要的命题，我们期待它们为真，而且它们证明起来并不难。

> Often, if you are trying to prove a theorem, the proof becomes long and complicated, in which case if you want anybody to read it you need to make the structure of the argument as clear as possible. One of the best ways of doing this is to identify subgoals, which take the form of statements intermediate between your initial assumptions and the conclusion you wish to draw from them. These statements are usually called lemmas.

通常，如果你想要证明一个定理，证明会变得很长和很复杂，这种情况下，如果你想让任何人来阅读它，你需要使得论证的结构越清晰越好。其中最好的办法就是识别出子目标，其形式就是位于最初前提与你想要证明的最终结论中间的中介命题。这些命题通常被称为引理。

> A corollary of a mathematical statement is another statement that follows easily from it. Sometimes the main theorem of a paper is followed by several corollaries, which advertise the strength of the theorem. Sometimes the main theorem itself is labeled a corollary, because all the work of the proof goes into proving a different, less punchy statement from which the theorem follows very easily. If this happens, the author may wish to make clear that the corollary is the main result of the paper, and other authors would refer to it as a theorem.

一个数学命题的推论是另外一个很容易从其推出的命题。有时一篇论文的主定理后面会跟着一系列的推论，它们会展现出定理的威力。有时主定理本身被标为一个推论，因为所有证明的工作都是为了证明一个不同的、不那么简练有力的命题，而主定理能从中很容易地推导出来。如果这种情况发生，作者可能希望说明这个推论是论文的主要结果，而其他作者会将其当作定理来引用。

> A purely formal proof would be very long and almost impossible to read. And yet, the fact that arguments can in principle be formalized provides a very valuable underpinning for the edifice of mathematics, because it gives a way of resolving disputes. If a mathematician produces an argument that is strangely unconvincing, then the best way to see whether it is correct is to ask him or her to explain it more formally and in greater detail. This will usually either expose a mistake or make it clearer why the argument works.

一份纯粹形式的证明会非常的长，而且几乎没法阅读。然而，论证原则上可以被形式化，为数学大厦提供了非常有价值的基础，因为它提供了一种解决争端的途径。如果一个数学家给出了一份奇怪的没有说服力的论证，那检验它是否正确的最佳办法就是要求他或她采用更为形式化、具备更丰富细节的方式解释该论证。这通常能揭示出一个错误或者使得该论证为什么有效变得更清晰。

> Some mathematicians will tell you that the main aim of their research is to find the right definition, after which their whole area will be illuminated. Yes, they will have to write proofs, but if the definition is the one they are looking for, then these proofs will be fairly straightforward.

有的数学家会告诉你，他们研究的主要目标是找到正确的定义，有了这些定义，他们的整个领域都被照亮了。是的，他们必须要写证明，但如果定义正是他们所寻找的那个，这些证明会是相当直接了当的。

> The main aim of an article in mathematics is usually to prove theorems, but one of the reasons for reading an article is to advance one’s own research. It is therefore very welcome if a theorem is proved by a technique that can be used in other contexts. It is also very welcome if an article contains some good unsolved problems.

一篇数学文章的主要目的常常是证明定理，但阅读一篇文章的其中一个理由是推进自己的研究。因此，如果一个定理是被一种可以应用在其他场景的技巧所证明的，这篇文章会非常受欢迎。如果一篇文章包含一些好的尚未解决的问题，它也会很受欢迎。

> Perhaps the most important feature of a good problem is generality: the solution to a good problem should usually have ramifications beyond the problem itself. A more accurate word for this desirable quality is “generalizability,” since some excellent problems may look rather specific.

一个好问题的最重要的特性，可能是其一般性：一个好问题的解，通常应该具备超越其自身的衍生影响。对于这个理想性质的一个更为精确的词是“可泛化性，因为某些优秀的问题可能看上去非常具体。

> It is quite common for a good problem to look uninteresting until you start to think about it. Then you realize that it has been asked for a reason: it might be the “first difficult case” of a more general problem, or it might be just one well-chosen example of a cluster of problems, all of which appear to run up against the same difficulty.

很常见的一种情况是：在开始真正思考它之前，一个好问题看上去挺无趣的。然后你会意识到问出这样的问题背后的原因： 它可能是一个更一般问题的首个困难特例，或者它可能是一簇问题的精心挑选的特例，它们全都会遇到同样的困难。

> Sometimes a problem is just a question, but frequently the person who asks a mathematical question has a good idea of what the answer is.

有时一个问题只是一个提问，但通常提出一个数学问题的人，对于答案应该是怎么样的，也已经有了很好的概念。

> 本文也发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/212315568)
