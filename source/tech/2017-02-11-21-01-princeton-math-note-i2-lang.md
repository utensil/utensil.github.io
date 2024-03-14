---
title: 《普林斯顿数学指引》读书笔记——I.2 数学的语言和语法
tags: 数学
code_mode: math
---

> 按：这篇笔记是系列笔记的第二篇，第一部分有4节，每节对应1-2则笔记。
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

# I.2 The Language and Grammar of Mathematics（数学的语言和语法）

本节写得特别出彩，完全可以当作一篇自包含的essay来读。学过数理逻辑的同学对本节介绍的内容并不陌生，然而本节精彩之处正是清晰阐述了数学家们选择从自然语言走向数学语言的内在逻辑。

这里先做一个简表，将本节介绍的符号和含义对应列出，后面不再赘述，而专注于更有洞见的内容。

|符号 | 含义 | 例子 |
|-------|-------| -------|
|  $ \in $  |  属于 |  $ 5 \in \{n : n < 10\} $   |
|  $ \notin $  |  不属于 |  $ (3, 3) \notin \{(x, y) : x^2+y^2=1\} $  |
|  $ \to $  |  映射 |  $ f : A \to B $, 其中A为定义域， B为值域 |
|  $ \mapsto $  |  映射 |  $ f : x \mapsto y $  代表  $ y = f\(x\) $  |
|  $ \sim $  |  等价于  |  $ x \sim y, y \sim z \Rightarrow x \sim z $   |
|  $ \Rightarrow  $  | 蕴含  |  $ P \Rightarrow Q $   |
|  $ \wedge $  | 且 |  $ P \wedge Q $   |
|  $ \vee $    | 或 |  $ P \vee Q $   |
|  $ \forall $  |  对于所有……  |  $ \forall n \in N, n \in Z $   |
|  $ \exists $  |  存在……  |  $ \exists n \in Z, n \in N $  |


## Introduction（引言）

> The main reason for using mathematical grammar is that the statements of mathematics are supposed to be completely precise, and it is not possible to achieve complete precision unless the language one uses is free of many of the vaguenesses and ambiguities of ordinary speech. Mathematical sentences can also be highly complex: if the parts that made them up were not clear and simple, then the unclarities would rapidly accumulate and render the sentences unintelligible.

使用数学语法主要是因为，数学命题理应是完全精确的。要做到完全精确，使用的语言就必须摆脱充斥于日常语言中的含糊和歧义。数学命题也可能是高度复杂的：如果构成这些命题的各个部分并不简明清晰，这些不清晰的地方就会很快地积累起来，使得整个表述无法理解。

注：上面这段点睛的话，中文版有多处错译（如“are supposed to be”、“is free of”、“ordinary speech”、“not clear and simple”等），容易产生误解，大家可对照看下。

## Four Basic Concepts（四大基本概念）

> Sets are also very useful if one is trying to do metamathematics, that is, to prove statements not about mathematical objects but about the process of mathematical reasoning itself.

研究元数学的时候，集合时常是很有用的。元数学的目标是去证明一类特别的命题，这些命题并非关于数学对象，而是关于数学推理过程自身的。

> Sets allow one to reduce greatly the number of parts of speech that one needs, turning almost all of them into nouns.

集合通过把几乎所有的词都变成名词，使我们能够大为减少所需的[词类](https://en.wikipedia.org/wiki/Part_of_speech)的数量。

> Over and over again, throughout mathematics, it is useful to think of a mathematical phenomenon, which may be complex and very un-thinglike, as a single object.

贯穿数学诸多领域，把一个数学现象（哪怕它可能很复杂，很不像是一个东西）看成一个单一对象，一次又一次地被证明是非常有用的。

> Many algebraic structures are most naturally thought of as sets of functions. (See, for example, the discussion of groups and symmetry in [I.3 §2.1]. See also Hilbert Spaces [III.37], Function Spaces [III.29], and Vector Spaces [I.3 §2.3].)

许多代数结构，看成函数的集合最为自然。参见[I.3 §2.1]关于群和对称的讨论，又可见[希尔伯特空间](https://en.wikipedia.org/wiki/Hilbert_space)、[函数空间](https://en.wikipedia.org/wiki/Function_space)以及[向量空间](https://en.wikipedia.org/wiki/Vector_space)。

> To specify a function, therefore, one must be careful to specify two sets as well: the domain, which is the set of objects to be transformed, and the range, which is the set of objects they are allowed to be transformed into.

因此要确定一个函数，就必须同时仔细地确定两个集合：一个是定义域（domain），即要被变换的对象的集合，另一个是值域（range），即被允许变换成的对象的集合。

> “Most” functions, though not most functions that one actually uses, are so arbitrary that they cannot be defined. (Such functions may not be useful as individual objects, but they are needed so that the set of all functions from one set to another has an interesting mathematical structure.)

绝大多数函数（虽然里面大部分函数我们很少实际使用）都非常的任意，以至于他们难以被干净地定义。这些函数，虽然作为个别的对象不一定有用，但是需要有它们，从一个集合到另外一个集合的所有的函数的集合才会具备有趣的数学结构。

> To use “<” in a sentence, one should precede it by a noun and follow it by a noun. For the resulting grammatically correct sentence to make sense, the nouns should refer to numbers (or perhaps to more general objects that can be put in order). A mathematical “object” that behaves like this is called a relation, though it might be more accurate to call it a potential relationship. “Equals” and “is an element of” are two other examples of relations.

如果要在一个句子里面使用符号`<`，它的前后就要各放一个名词。这样得到的句子语法上虽然正确，但要有意义，这两个名词都应该代表数，或者具有次序关系的更一般的数学对象。一个具备上述这种行为的数学对象称为一个关系，虽然称它为潜在的关系更为准确一些。“等于”和“属于”，是关系的另外两个例子。

> There are many situations in mathematics where one wishes to regard different objects as “essentially the same,” and to help us make this idea precise there is a very important class of relations known as equivalence relations.

在数学里有许多时候，我们希望把不同的对象看成是“本质上相同”的。为了把握这种思想，有一类非常重要的关系，称为“等价关系”。

> What exactly is it that these two relations have in common? The answer is that they both take a set (in the first case the set of all geometrical shapes, and in the second the set of all whole numbers) and split it into parts, called equivalence classes, where each part consists of objects that one wishes to regard as essentially the same.

这两个关系究竟有什么共同之处呢？答案是，它们都取一个集合（前者是所有几何图形的集合，后者是所有整数的集合），并把它划分成几个部分，其中每个部分各自都由希望被看作“本质上相同”的对象组成，称为一个等价类。

> One of the main uses of equivalence relations is to make precise the notion of quotient [I.3 §3.3] constructions.

等价关系的主要用途之一是使得商这个概念的构造变得精确。

> These last two operations raise another issue: unless the set A is chosen carefully, they may not always be defined. For example, if one restricts one’s attention to the positive integers, then the expression 3 − 5 has no meaning. There are two conventions one could imagine adopting in response to this. One might decide not to insist that a binary operation should be defined for every pair of elements of A, and to regard it as a desirable extra property of an operation if it is defined everywhere. But the convention actually in force is that binary operations do have to be defined everywhere, so that “minus,” though a perfectly good binary operation on the set of all integers, is not a binary operation on the set of all positive integers.

后几种运算（减法、除法和升幂）提出来另外一个问题：除非集合A选择得很仔细，这几种运算并非总能被定义。例如，如果限制只关注正整数，则表达式3-5就没有意义。

不难想到两种解决上述问题的约定。第一种约定决定不再坚持“一个二元运算要对每一对元素都有定义”，从而将一个二元运算处处有定义看成是一个额外的、令人喜欢的特性。

然而，真正实施的约定是第二种约定：一个二元运算必须处处有定义。因此，减法虽然在所有整数的集合上是良好定义的二元运算，在所有正整数的集合上则不是一个二元运算。

注：此处中文版将第一种约定的两个子句当作两个约定来处理，不符合原义，尤其是考虑这样译两个约定其实就是一个意思，所以此处做了修改。

> These basic properties of binary operations are fundamental to the structures of abstract algebra. See four important algebraic structures [I.3 §2] for further details.

二元运算的这些基本性质，是各个抽象代数结构的基础，详见四个重要的代数结构 [I.3 §2] （即群、域、向量空间和环）。

## 一点初等逻辑（Some Elementary Logic）

> In English the word “implies” suggests some sort of connection between P and Q, that P in some way causes Q or is at least relevant to it. If P causes Q then certainly P cannot be true without Q being true, but all a mathematician cares about is this logical consequence and not whether there is any reason for it. Thus, if you want to prove that P ⇒ Q, all you have to do is rule out the possibility that P could be true and Q false at the same time.

在日常的英语里，“implies”（蕴含）一词暗示在P和Q之间有某种联系，即P以某种方式导致了Q，至少与这个过程有关联。如果确实是P（唯一地）导致了Q，当然P非真时Q也无法为真。然而数学家关心的只是逻辑推论关系，而不是背后的理由。所以如果需要证明P ⇒ Q，唯一要做的就是排除P为真而Q非真这种情况（而无需排除P为非真时Q为真这种情况）。

> Words like “all,” “some,” “any,” “every,” and “nothing” are called quantifiers, and in the English language they are highly prone to this kind of ambiguity. Mathematicians therefore make do with just two quantifiers, and the rules for their use are much stricter. They tend to come at the beginning of sentences, and can be read as “for all” (or “for every”) and “there exists” (or “for some”).

诸如“all”（所有）、“some”（有些）、“any”（任一）、“every”（每一）、“nothing”（没有），这样的一些单词，都称为量词，而在日常的英语语言里，很容易产生歧义。所以数学家们，只需要用到两个量词来解决所有的问题，而且使用的规则也要严格得多。它们总是被放在句首，其中∀可被读作“for all”（对于所有……）或“for every”（对于每一个……），∃则读作“there exists”（存在……）或“for some”（对于某些）。

> Let us take A to be a set of positive integers and ask ourselves what the negation is of the sentence “Every number in the set A is odd.” Many people when asked this question will suggest, “Every number in the set A is even.” However, this is wrong: if one thinks carefully about what exactly would have to happen for the first sentence to be false, one realizes that all that is needed is that at least one number in A should be even. So in fact the negation of the sentence is, “There exists a number in A that is even.”

取一个由正整数构成的集合A，并且问“A中的每个数均为奇数”这句话的反面是什么？许多人被问到这个问题的时候都会说，应该是“A中的每个数均为偶数”。然而这是错的：如果我们仔细考虑了要使得该命题非真究竟需要什么，就会看到，需要的是A中至少有一个数是偶数，所以事实上，这句话的反面是“A中存在一个数为偶数”。

> A variable such as `m`, which denotes a specific object, is called a free variable. It sort of hovers there, free to take any value. A variable like `a` and `b`, of the kind that does not denote a specific object, is called a bound variable, or sometimes a dummy variable. (The word “bound” is used mainly when the variable appears just after a quantifier.

代表一个特定对象的变元称之“自由变元”，它可以自由地取任何值。并不代表某一特定对象的变元，称为“约束变元”，或者“哑变元”。“约束”一词主要用在变元紧跟着量词的情况下（其他情况一般叫“哑变元”）。

注：此处中文版将“variable”译作“变项”并不为错，但并不自然，而且“项”一般是一个表达式了，“元”更基本一些，所以改为“变元”（当然，此处语境显然不适合“变量”的译法）。

> Yet another indication that a variable is a dummy variable is when the sentence in which it occurs can be rewritten without it.

一个变元是哑变元还有一个标志，就是它们所在的句子原则上可以改写成没有它们的形式（按：即通过将它们展开为实际的值，见原书例子）。

> The language typically used is a careful compromise between fully colloquial English, which would indeed run the risk of being unacceptably imprecise, and fully formal symbolism, which would be a nightmare to read. The ideal is to write in as friendly and approachable a way as possible, while making sure that the reader (who, one assumes, has plenty of experience and training in how to read mathematics) can see easily how what one writes could be made more formal if it became important to do so. And sometimes it does become important: when an argument is difficult to grasp it may be that the only way to convince oneself that it is correct is to rewrite it more formally.

数学家们实际使用的典型语言，则是完全口语化的英语与完全形式化的符号语言之间的一种仔细推敲后的折衷产物。完全用前者会冒着引入无法接受的不精确的风险，完全用后者，人们读起来则像在做噩梦一样。理想的办法是用一种尽可能对读者友好、易于接受的形式，同时又确保读者（假使他们拥有相当多的阅读数学文章的经验和训练）在认为必要的情况下，可以很容易看出如何将其进行更形式化的改写。这种必要的情况有时的确会出现：当一个论证很难掌握时，使人确信这个论证为正确的唯一办法，正是对其进行更形式化的改写。

注：上面这段话，中文版有几处错译（如“run the risk of”、“making sure”等），容易产生误解，大家可对照看下。

> In practice, there are many different levels of formality, and mathematicians are adept at switching between them. It is this that makes it possible to feel completely confident in the correctness of a mathematical argument even when it is not presented in the manner of (18)—though it is also this that allows mistakes to slip through the net from time to time.

实践中，形式化有多种不同的尺度，而数学家们很善于在其中转换。这使得一个数学论证即使没有写得完全形式化，数学家们也能对其正确性有完全的信心——虽然这种转换也使得种种错误如同漏网之鱼般时不时地钻了进来。

> 本文同步发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/211280335)