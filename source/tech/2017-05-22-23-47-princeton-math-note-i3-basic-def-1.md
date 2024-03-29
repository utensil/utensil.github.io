---
title: 《普林斯顿数学指引》读书笔记——I.3 一些基本的数学定义（上）
tags: 数学
code_mode: math
---

> 按：这篇笔记是系列笔记的第三篇，第一部分有4节，每节对应1-2篇笔记。
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

# I.3 Some Fundamental Mathematical Definitions （一些基本的数学定义）

## 1 The Main Number Systems （主要的数系）

> The modern view of numbers is that they are best regarded not individually but as parts of larger wholes, called number systems; the distinguishing features of number systems are the arithmetical operations—such as addition, multiplication, subtraction, division, and extraction of roots—that can be performed on them. This view of numbers is very fruitful and provides a springboard into abstract algebra.

对于数的现代视角是，最好不要把数当作独立个体，而应视为一个更大的整体的一部分，这个整体称之为数系。数系最突出的特点是，可以在其上完成算术运算，包括加、减、乘、除、开方。这种关于数的视角是富有成果的，它是通向抽象代数的跳板。

注：中文版将“individually”译为“孤立地”不太准确，另外“view”翻译成“视角”要比“观点”更自然。

> Of course, the phrase “1, 2, 3, 4, and so on” does not constitute a formal definition, but it does suggest the following basic picture of the natural numbers, one that we tend to take for granted. (i) Given any natural number n there is another, n+1, that comes next—known as the successor of n. (ii) A list that starts with 1 and follows each number by its successor will include every natural number exactly once and nothing else. This picture is encapsulated by the Peano Axioms [III.69].

当然，“1, 2, 3, 4 ……”这样的描述，并不算是正式的定义，但它的确提出了下面这个我们视为理所当然的对自然数的描述：

(i)  给定一个自然数n，后面必然跟着一个自然数n+1，称为n的后继者；
(ii) 一个从1开始，且随后每一个数是前一个数的后继者的数列，会正好包含每个自然数各一次，且不再包含其他东西。

这个描述被浓缩为[佩亚诺公理](https://en.wikipedia.org/wiki/Peano_axioms)。

> The set of all integers—positive, negative, and zero— is usually denoted  $ \mathbb{Z} $  (for the German word “Zahlen,” meaning “numbers”). Within this system, subtraction is always possible: that is, if $ m $ and $ n $ are integers, then so is $ m - n $.

所有整数——正负整数与零——的集合，常记作 $ \mathbb{Z} $ （德文表示数的单词“Zahlen”的第一个字母），在这个属性里，减法总是可能的：即如果 $ m $ 和 $ n $ 都是整数，那么 $ m - n $ 也是。

> A more theoretical justification for the rational numbers is that they form a number system in which division is always possible——except by zero. This fact, together with some basic properties of the arithmetical operations, means that Q is a field.

按：上文提到，如果只需要计数，那整数就够了，需要有理数的其中一个理由是测量的需要，包括长度、重量、温度和速度等。

一个为有理数的更为理论化的合理性论证，是它们组成了一个除法总是可能的数系（除了除以零），这个事实，以及一些算术运算的基本性质，意味着Q是一个域。

注：这里把“justification”译作“合理性论证”，其实也可以更简单地译为“依据”。因为这里作者其实是想要为引入没那么自然的数系寻找依据，解释其必要性和合理性。

> Because real numbers are intimately connected with the idea of limits (of successive approximations), a true appreciation of the real number system depends on an understanding of mathematical analysis.

由于实数与（逐次逼近的）极限过程紧密地联系着，对实数系真正的领会就依赖于对数学分析的理解。

注：中文版将“successive approximations”译为“逐步逼近”，但其对应的数学术语的常见译法是“逐次逼近”，其英文解释“A method for estimating the value of an unknown quantity by repeated comparison to a sequence of known quantities”里的关键词也是“repeated”而非“gradually”，因此此处不应用“逐步”。

按：这里下一小节讨论了复数，但没有什么特别的洞见，所以没有摘录。要真正理解复数，需要理解[Geometric Algebra](https://book.douban.com/subject/26302270/)，回头会单独整理笔记。

## 2 Four Important Algebraic Structures （四个重要的代数结构）

按：这节简要介绍了群、域、向量空间和环。

> If S is any mathematical structure, then a symmetry of S is a function from S to itself that preserves its structure. If S is a geometrical shape, then the mathematical structure that should be preserved is the distance between any two of its points.

如果S是任意的数学结构，S的对称就是一个由S到其自身的、能保持这个结构的函数。例如，当S是一个几何图形时，则应该得到保持的数学结构（之一），就是其上任意两点的距离。

> It is fruitful to draw an analogy with the geometrical situation and regard any structure-preserving function as a sort of symmetry. Because of its extreme generality, symmetry is an all-pervasive concept within mathematics; and wherever symmetries appear, structures known as groups follow close behind.

与几何的情况进行类比，并把任意可以保持结构的函数都当作某种对称，这样做是富有成果的。由于其极度的通用性，对称是一个在数学里无处不在的概念；而且只要哪里有了对称出现，像群这样的概念就会如影随形。

> Although several number systems form groups, to regard them merely as groups is to ignore a great deal of their algebraic structure. In particular, whereas a group has just one binary operation, the standard number systems have two, namely addition and multiplication (from which further ones, such as subtraction and division, can be derived).

虽然好几个数域都是群，但只把他们看成群，就忽略了其代数结构很大的一部分。尤其是群里面只有一个二元运算，标准的数域却有两个，即加法和乘法（由它们还可以得到其他附加的运算，比如减法和除法）。

> A very general rule when defining mathematical structures is that if a definition splits into parts, then the definition as a whole will not be interesting unless those parts interact. Here our two parts are addition and multiplication, and the properties mentioned so far do not relate them in any way. But one final property, known as the distributive law, does this, and thereby gives fields their special character.

在定义数学结构的时候，有一个很一般的原理：如果一个数学定义，可以分成几个部分，则除非这些部分可以相互作用，否则这个定义就没有什么意思（仅仅相当于分成的几个部分对应的原来就定义过的数学结构而已）。域的加法和乘法，就是这样的两个部分，而迄今为止提到的所有性质，并未把它们以某种方式联系起来。然而，最后的一个性质，即分配律，做到了这一点，从而给了域独有的特性。

> In addition to $ \mathbb{Q} $ ,  $ \mathbb{R} $ , and $ \mathbb{C} $ , one other field stands out as fundamental, namely $ F_p $ , which is the set of integers modulo a prime p, with addition and multiplication also defined modulo p (see Modular Arithmetic [III.60]).

除了 $ \mathbb{Q} $ 、 $ \mathbb{R} $ 、 $ \mathbb{C} $ 之外，还有一个引人注目的基础域，即 $ F_p $ 。它是整数对素数p取模组成的集合，其中的加法、减法，也被定义为对p取模，详见[模算术](https://en.wikipedia.org/wiki/Modular_arithmetic)。

> There is an important process of extension that allows one to build new fields out of old ones. The idea is to start with a field F, find a polynomial P that has no roots in F, and “adjoin” a new element to F with the stipulation that it is a root of P. This produces an extended field F, which consists of everything that one can produce from this root and from elements of F using addition and multiplication.

有一个重要的过程与域有关，这个过程称之为域的扩张，它使我们能够从原来的域构造出新的域来。其基本的思想就是从一个域F开始，找一个在F中没有根的多项式P，然后把一个新的元素附加到F上，约定这个元素就是P的根。这样的过程，会产生一个扩张的域，它会包含，所有可以用这个根与F中的元素通过加法和乘法产生出来所有“数”。

评：这段话从抽象的角度，描述了带来整个复数域的 $ \mathit{i} $ （定义为 $ x^2+1 $ 这个多项式的根）的诞生过程。

> A second very significant justification for introducing fields is that they can be used to form vector spaces.

引入域的另外一个重要依据是，它们可以用来构成向量空间。

> A vector space is a mathematical structure in which the notion of linear combination makes sense.

向量空间就是一个线性组合的概念在其中有意义的数学结构。

> There is one final remark to make about scalars. They were defined earlier as real numbers that one uses to make linear combinations of vectors. But it turns out that the calculations one does with scalars, in particular solving simultaneous equations, can all be done in a more general context. What matters is that they should belong to a field, so $ \mathbb{Q} $ ,  $ \mathbb{R} $ and $ \mathbb{C} $can all be used as systems of scalars, as indeed can more general fields. If the scalars for a vector space V come from a field F, then one says that V is a vector space over F. This generalization is important and useful: see, for example, Algebraic Numbers [IV.3 §17].

关于标量还有最后一个说明。之前，标量被定义为构造向量的线性组合时所用的实数。其实，我们用标量所做的计算，尤其是在解联立方程时，在更广泛的语境下也可以做。真正重要的是，（用于计算的“数”）必须属于一个域，所以$ \mathbb{Q} $ 、 $ \mathbb{R} $ 、 $ \mathbb{C} $都可以用作标量的系统，更一般的域也是可以的。如果一个向量空间V的标量来自域F，我们就说V是域F上的向量空间，这个推广重要而且有用，可见[代数数](https://en.wikipedia.org/wiki/Algebraic_number)。

> Roughly speaking, a ring is an algebraic structure that has most, but not necessarily all, of the properties of a field. In particular, the requirements of the multiplicative operation are less strict. The most important relaxation is that nonzero elements of a ring are not required to have multiplicative inverses; but sometimes multiplication is not even required to be commutative.

粗略的说，环一种具备域的几乎所有，但不是所有性质的代数结构。尤其是，对乘法运算的要求就没那么严格，最重要的放松之处是不要求环中的非零元具有乘法逆，而且有时乘法甚至不被要求是可交换的。

## 3 Creating New Structures Out of Old Ones （从老结构中创造出新结构）

> Examples make it much easier to answer basic questions. If you have a general statement about structures of a given type and want to know whether it is true, then it is very helpful if you can test it in a wide range of particular cases. If it passes all the tests, then you have some evidence in favor of the statement. If you are lucky, you may even be able to see why it is true; alternatively, you may find that the statement is true for each example you try, but always for reasons that depend on particular features of the example you are examining. Then you will know that you should try to avoid these features if you want to find a counterexample. If you do find a counterexample, then the general statement is false, but it may still happen that a modification to the statement is true and useful. In that case, the counterexample will help you to find an appropriate modification.

有了例子，回答一些基本的问题变得容易不少。如果我们有了一个关于某个给定类型的结构的一般命题，而又想知道它是否正确，这时，如果能够用诸多个案来检验这个命题，会很有帮助。如果这个命题通过了所有的检验，就有了有利于这个命题的证据。如果运气好，我们也许还能看出这个命题为什么是正确的。另外，也可能发现这个命题对于你进行检验的每一个例子都是对的，但是都仅仅是因为所用例子本身的特别之处，这个时候我们就会知道，在寻找反例时需要怎样避免这些特别之处。如果确实找到了一个反例，那么这个一般的命题当然不成立了，然而有可能这个命题在经过某些修改以后，依然成立并且有用。在这种情况下，反例就会帮助我们找到适当的修改。

> Even though $ \mathbb{Q}(i) $ is contained in $ \mathbb{C} $ , it is a more interesting field in some important ways. But how can this be? Surely, one might think, an object cannot become more interesting when most of it is taken away. But a moment’s further thought shows that it certainly can: for example, the set of all prime numbers contains fascinating mysteries of a kind that one does not expect to encounter in the set of all positive integers.
>
> ......and in many other fields of a similar kind, we can ask which polynomial equations have solutions. This turns out to be a deep and important question that simply does not arise in the larger field C.

虽然 $ \mathbb{Q}(i) $ 包含在 $ \mathbb{C} $ 中，但它在某些很重要的角度上是一个更有意思的域。为什么会这样子呢？人们肯定以为如果把一个对象的绝大部分都拿走了，它不可能变得更有意思。然而进一步想象一下，就会发现这确实是可能的：例如所有素数的集合会拥有某种特别迷人的、而不可能为所有正整数的集合所具备的特性。

……而且在，许多类似于 $ \mathbb{Q}(i) $ 的域中，我们可以问哪些多项式方程有解。这在后来被证明是一个非常深刻而且重要的问题，但在更大的域 $ \mathbb{C} $ 中，这样的问题根本就不会出现（因为[代数的基本定理](https://en.wikipedia.org/wiki/Fundamental_theorem_of_algebra)告诉我们，每一个多项式方程在 $ \mathbb{C} $ 内都有解）。

> We will now convert $ \mathbb{Q}[x] $ into a field in what may at first seem a rather strange way: by regarding the polynomial $ x^3-x-1 $ as “equivalent” to the zero polynomial. To put this another way, whenever a polynomial involves $ x^3 $ we will allow ourselves to replace $ x^3 $ by $ x+1 $, and we will regard the new polynomial that results as equivalent to the old one.
>
> All polynomials that are not equivalent to zero (that is, are not multiples of $ x^3-x-1 $) have multiplicative inverses in this generalized sense.
>
> We simply decide that when two polynomials are equivalent, we will regard them as equal, and we denote the resulting mathematical structure by $ \mathbb{Q}[x]/(x^3 - x - 1) $ . This structure turns out to be a field, and it turns out to be important as the smallest field that contains $ \mathbb{Q} $ and also has a root of the polynomial $ x^3 - x - 1 $ .

我们现在要用一种乍一看非常奇怪的方法，来把$ \mathbb{Q}[x] $（具有有理数系数的多项式的集合）变成一个域，方法就是，认为 $ x^3-x-1 $ 等价于零多项式。换句话说，一旦一个多项式里面有 $ x^3 $ 的话，我们就可以把它换成 $ x+1 $ ，并且认为这样得出的新多项式等价于原来的多项式。

所有不等价于零的多项式，都在这个广义的意义下具有乘法逆。

我们只是简单地规定将两个等价的多项式视为相等，并把得到的数学结构记为 $ \mathbb{Q}[x]/(x^3 - x - 1) $ ，这个结构结果被证明是一个域，而且还是个重要的域，因为它是包含 $ \mathbb{Q} $ 且拥有多项式 $ x^3-x-1 $ 的根的最小的域。

> We define two expressions `ab` and `cd` to be equivalent if `ad = bc` and we regard equivalent expressions as denoting the same number. Notice that the expressions can be genuinely different, but we think of them as denoting the same object. If we do this, then we must be careful whenever we define functions and binary operations.
>
> ……In general, it is essential to check that if you put equivalent objects in then you get equivalent objects out.

按：上面这里其实就是对有理数的约分的含义做了推广。

我们定义只要`ad = bc`那么`ab`和`cd` 这两个表达式就等价，并且我们将等价的表达式看作在标记同一个数。注意这些表达式可能的确不一样，但我们将其视为对同一个对象的标记。如果我们这样做，在我们定义函数和二元运算的时候就要十分小心。

一般而言，最起码要验证，如果输入的是等价的对象，（函数或二元运算）输出的也应该是等价的对象。

> Why is the word “quotient” used? Well, a quotient is normally what you get when you divide one number by another, so to understand the analogy let us think about dividing 21 by 3. We can think of this as dividing up twenty-one objects into sets of three objects each and asking how many sets we get.

这里为什么我们使用了“商”这个词？商通常是指当用某个数去分割（divide，在英语里，既有除的意思，也有分割的意思）另外一个数时所得到的东西。为了理解这个比喻，我们考虑21除以3，我们可以认为，这是把21个对象分成了3个对象一组，然后问一共可以分得多少个组。

> ...then we find that this cylinder is itself “folded around” so that if you go “upwards” by a distance of 1 then you get back to where you started. But that is what a torus is: a cylinder that is folded back into itself. (This is not the only way of defining a torus,however. For example, it can be defined as the product of two circles.) 

按：上文将 $ R^2 $ 平面上的点(x, y)和（x+1，y）定义成等价并看成相同，就会得到柱面（cylinder ），然后又进一步将(x, y)和(x, y+1)定义成等价并看成相同，就会得到[环面（torus）](https://en.wikipedia.org/wiki/Torus)。

我们会发现，这个柱面自己卷了起来，如果往上走了一段为1的距离，就会回到出发点。但这就是一个环面：一个被折叠成自己的柱面（然而，这不是定义环面唯一的方法，例如还可以把它定义为两个圆周的乘积）。

> Many other important objects in modern geometry are defined using quotients. It often happens that the object one starts with is extremely big, but that at the same time the equivalence relation is very generous, in the sense that it is easy for one object to be equivalent to another. In that case the number of “genuinely distinct” objects can be quite small.

现代几何中的许多重要的对象，都是用商来定义的。经常有这样的情况，一个对象很大，但同时等价关系又很宽松，也就是一个对象，很容易就与另外一个对象等价了，在这个情况下，真正不同的对象的数目可能很小。

> One often starts with a hopelessly large and complicated structure but “divides out most of the mess” and ends up with a quotient object that has a structure that is simple enough to be manageable while still conveying important information. Good examples of this are the Fundamental Group [IV.10 §3] and the Homology and Cohomology Groups [IV.10 §2] of a topological space; an even better example is the notion of a Moduli Space [IV.8].

通常是从一个大的令人绝望而又极为复杂的对象出发，但将绝大部份的乱七八糟的部分都分出来除掉了（divides out），结果得到的商结构足够简单，而且能够处理，与此同时，依旧能传递重要的信息。[基本群](https://en.wikipedia.org/wiki/Fundamental_group)、拓扑空间的[同调群](https://en.wikipedia.org/wiki/Homology_(mathematics))与[上同调群](https://en.wikipedia.org/wiki/Cohomology)都是好例子，[模空间](https://en.wikipedia.org/wiki/Moduli_space)甚至是一个更好的例子。

## 4 Functions between Algebraic Structures （代数结构之间的函数）

> A function that preserves structure is generally known as a homomorphism.

一个保持结构的函数就称为一个同态（homomorphism）。

> An isomorphism between two structures X and Y is a homomorphism f : X → Y that has an inverse g : Y → X that is also a homomorphism.

两个结构之间的同构（isomorphism ）就是这样的一种同态：同态f : X → Y的逆g : Y → X也是一个同态。

> An isomorphism is a homomorphism that is also a Bijection [I.2 §2.2].That is, f is a one-to-one correspondence between X and Y that preserves structure.

一个同构就是同时也是双射的同态。也就是说，f是X和Y之间的一一对应，并且保持了结构。

虽然很基础，但还是将[I.2 §2.2]中涉及双射的段落摘录如下：

> If we want to undo the effect of a function f : A → B, then we can, as long as we avoid the problem that occurred with the approximating function discussed earlier. That is, we can do it if f(x) and f(x') are different whenever x and x' are different elements of A. If this condition holds, then f is called an injection. On the other hand, if we want to find a function g that is undone by f , then we can do so as long as we avoid the problem of the integer-doubling function. That is, we can do it if every element y of B is equal to f(x) for some element x of A (so that we have the option of setting g(y) = x). If this condition holds, then f is called a surjection. If f is both an injection and a surjection, then f is called a bijection. Bijections are precisely the functions that have inverses.

对于一个函数f : A → B，如果只要当 f(x)和f(x')不同的时候，x和x'总不相同，我们就总是可以消除函数的效果（使f(x)变回x），这时，f被称之为一个单射（injection）。

评：单射就是（B中的元素）只要被映射过来，就是（从A）唯一地（即“单”）映射过来（即“射”）。

另一方面，只要B中的每一个元素y都等于A中某个元素x的f(x)，我们就总能找到一个能被f消除效果的函数g，这时f被称为一个满射（surjection）。

评：满射就是（B中的元素）每个（即“满”）都能（从A）映射过来（即“射”）。

一个既是单射又是满射的函数f，就是一个双射（bijection）。双射正是那些有逆的函数。

评：满射解决的是“有”的问题，单射解决的是“只有”的问题，所以双射就是“有且只有”，所以B中每个元素都能找到映射的来源，而且来源还唯一，这时映射的这个唯一来源，就是逆。所以“双射”里的“双”字更多是“成双成对”的意思，更好的译法或许是“对射”。费了这些口舌，就是想解释清楚这些译法都是什么意思，当年学的时候，挺烦这些不好记的中文译名的。英文术语里，in-前缀代表“进入、里内”，sur-前缀代表“在…..之上” ，其实也不是太好理解。

> In general, if there is an isomorphism between two algebraic structures X and Y, then X and Y are said to be isomorphic (coming from the Greek words for “same” and “shape”). Loosely, the word “isomorphic” means “the same in all essential respects,” where what counts as essential is precisely the algebraic structure. What is absolutely not essential is the nature of the objects that have the structure.

一般地说，两个代数结构X和Y间若有同构的函数关系，就说X同构于Y。同构中的iso和morphic分别源自希腊单词“相同”和“形状”。粗略地说，同构这个词的意思就是“在所有本质的方面都相同”。算作本质的正是代数结果，而绝对不属于本质的，就是具有这种结构的对象自身的本性。

> An automorphism of X is a function from X to itself that preserves the structure (which now comes in the form of statements like ab = c). The composition of two automorphisms is clearly a third, and as a result the automorphisms of a structure X form a group. Although the individual automorphisms may not be of much interest, the group certainly is, as it often encapsulates what one really wants to know about a structure X that is too complicated to analyze directly.

X的自同构是，一个能够保持结构的、到X自身的函数。两个自同构的复合显然还是一个自同构，于是代数结构X的所有自同构可以形成一个群。虽然作为个体的自同构并不那么有趣，自同构的群，却很有意思。这类群往往蕴含了我们关于一个结构真正想知道的信息，这些信息往往过于复杂，无法直接分析。

> So f takes every rational number to itself. What can we say about f(√ 2)? Well, f(√ 2)f (√ 2) = f(√ 2 · √ 2) = f(2) = 2, but this implies only that f(√ 2) is √ 2 or − √ 2. It turns out that both choices are possible: one automorphism is the “trivial” one f(a + b √ 2) = a + b √ 2 and the other is the more interesting one f(a + b √ 2) = a − b √ 2. This observation demonstrates that there is no algebraic difference between the two square roots.

f把每一个有理数都变成自身，那f(√ 2)会是多少呢？从 f(√ 2)f (√ 2) = f(√ 2 · √ 2) = f(2) = 2可知f(√ 2)是√ 2或− √ 2。究竟是哪一个？其实，两种选择都是可能的：一个自同构是平凡的：f(a + b √ 2) = a + b √ 2；另外一个更为有趣：f(a + b √ 2) = a − b √ 2。这个观察说明了，两个平方根并没有代数上的区别。

> The automorphism groups associated with certain field extensions are called Galois Groups [III.30], and are a vital component of the proof of the insolubility of the quintic [V.24], as well as of large parts of algebraic number theory (see Algebraic Numbers [IV.3]).

与部分域扩张相关联的自同构群被称为[伽罗瓦群](https://en.wikipedia.org/wiki/Galois_group)，而且是对五次方程的不可解性而言不可或缺的成分。同时它也是代数数论相当大一部分内容，详见[代数数](https://en.wikipedia.org/wiki/Algebraic_number)。

注：中文版有一段英文电子版中没有的、关于同态关系中的核（kernel）的讨论：核是X中所有使得f(x)为Y中的恒等元的那些x的集合，是X的有趣的子结构；环同态的核必然是一个理想[III.81]。

> Let V be another vector space of functions, and let u be a function of two variables. (The functions involved have to have certain properties for the definition to work, but let us ignore the technicalities.) Then we can define a linear map T on the space V by the formula $ (Tf)(x) = \int u(x,y)f(y) dy $ . 
>
> Definitions like this one can be hard to take in, because they involve holding in one’s mind three different levels of complexity. At the bottom we have real numbers, denoted by x and y. In the middle are functions like f , u, and Tf, which turn real numbers (or pairs of them) into real numbers. At the top is another function, T, but the “objects” that it transforms are themselves functions: it turns a function like f into a different function Tf. This is just one example where it is important to think of a function as a single, elementary “thing” rather than as a process of transformation. (See the discussion of functions in the language and grammar of mathematics [I.2 §2.2].) 
>
> Another remark that may help to clarify the definition is that there is a very close analogy between the role of the two-variable function u(x,y) and the role of a matrix  $ a_ij $ (which can itself be thought of as a function of the two integer variables i and j). Functions like u are sometimes called kernels. 
>
> For more about linear maps between infinite-dimensional spaces, see Operator Algebras [IV.19] and Linear Operators [III.52].

令V为函数的向量空间，u为一个二元函数。（这里涉及到函数必须具备某些特定特征，上述定义才有意义，但我们现在可以把这些技术细节忽略掉。）然后我们可以在空间V上定义一个线性映射T，满足 $ (Tf)(x) = \int u(x,y)f(y) dy $ 。

像这样的定义可能难以接受，因为它们涉及到三个层次的复杂性。在底层有两个实数，可以表示为x和y。中间一层有一些函数，如f、u和Tf，它们都是将实数（或实数对）映射为实数。最顶层是另外一个函数T，但它所转换映射的对象本身就是函数：它将一个函数f变成另外一个函数Tf。这个例子说明了如下思维方式的重要性：将函数看作单一和基础的东西而非一个转换的过程。（参见[I.2 §2.2]中对此的讨论）另外一个有助于理清这个定义的点是：二元函数u(x,y)的角色与矩阵 $ a_ij $ 极其类似。（矩阵a_ij自己也可以被看作两个整数变量i和j的函数）

关于无限空间之间的线性映射，可以参考[算子代数](https://en.wikipedia.org/wiki/Operator_algebra)和[线性算子](http://mathworld.wolfram.com/LinearOperator.html)

> In many cases the eigenvectors and eigenvalues associated with a linear map contain all the information one needs about the map, and in a very convenient form. Another answer is that linear maps occur in many different contexts, and questions that arise in those contexts often turn out to be questions about eigenvectors and eigenvalues

在许多情况下，线性映射的本征向量与本征值，包含了关于这个线性映射我们所有需要了解的信息，而且是以非常方便的形式。线性映射出现在很多情境中，这些情境中出现的问题往往正是关于本征向量和本征值的问题。

> function [III.25] $ e^x $ : that its derivative is the same function. In other words, if $ f(x) = e^x $ , then $ f'(x) = f(x) $ . Now differentiation, as we saw earlier, can be thought of as a linear map, and if $ f'(x) = f(x) $ then this map leaves the function f unchanged, which says that f is an eigenvector with eigenvalue 1. More generally, if $ g(x) = e^{(\lambda x)} $ , then $ g'(x) = \lambda e^{(\lambda x)} = \lambda g(x) $ , so g is an eigenvector of the differentiation map, with eigenvalue $ \lambda $ . Many linear differential equations can be thought of as asking for eigenvectors of linear maps defined using differentiation.

指数函数$ e^x $的导数是其自身。换句话说，如果 $ f(x) = e^x $ ，那么 $ f'(x) = f(x) $ 。这样微分运算就可以被看作一种线性映射。如果 $ f'(x) = f(x) $ ，那么这个映射使函数f保持不变，这说明f是一个具备本征值1的本征向量。更一般的，如果 $ g(x) = e^{(\lambda x)} $ ，那么 $ g'(x) = \lambda e^{(\lambda x)} = \lambda g(x) $ ，这样g就是微分映射的一个本征向量，其本征值为λ。许多线性微分方程可以被视为在求用微分运算定义的线性映射的本征向量。

> 本文也发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/211305818)