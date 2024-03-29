---
title: 《普林斯顿数学指引》读书笔记——I.3 一些基本的数学定义（下）
tags: 数学
code_mode: math
---

> 按：这篇笔记是系列笔记的第四篇，第一部分有4节，每节对应1-2篇笔记。
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

### 5 Basic Concepts of Mathematical Analysis（数学分析的基本概念）

> The sequence 1/2, 2/3, 3/4, 4/5. . . . In a sense, the numbers in this sequence approach 2, since each one is closer to 2 than the one before, but it is clear that this is not what we mean. What matters is not so much that we get closer and closer, but that we get arbitrarily close, and the only number that is approached in this stronger sense is the obvious “limit”, 1.

注：中文版误将此段中的2更正为1，而原书作者的意思其实是故意拿一个2来说明极限的真正含义。

这个序列的确一个比一个靠近2，因此某种意义上也是在趋近2。然而我们真正用“趋近”来表示的意思应该不仅仅是我们能越靠越近，而是我们能靠得任意地近。在这个更强的意义下，唯一在被趋近的数值，显然就是极限1。

> The notion of limit applies much more generally than just to real numbers. If you have any collection of mathematical objects and can say what you mean by the distance between any two of those objects, then you can talk of a sequence of those objects having a limit. Two objects are now called $\delta$-close if the distance between them is less than $ \delta $ , rather than the difference. (The idea of distance is discussed further in metric spaces [III.58].) For example, a sequence of points in space can have a limit, as can a sequence of functions. (In the second case it is less obvious how to define distance—there are many natural ways to do it.) A further example comes in the theory of fractals (see dynamics [IV.15]): the very complicated shapes that appear there are best defined as limits of simpler ones.

极限的概念可应用在远比实数广泛的领域。如果我们有任何一族数学对象，而且能定义任意两个对象间的距离，那么我们就可以谈论这些对象的一个序列有没有极限。如果两个对象的距离（而不是差）小于 $ \delta $ ，那么它们可被称为“$\delta$-逼近的”。（距离的概念将在[度量空间](https://en.wikipedia.org/wiki/Metric_space)[III.58]里进一步讨论）。

例如，空间中的点的序列可以拥有一个极限，函数的序列也可以。（函数间的距离的定义方式没有那么显然，不过存在很多自然的方式来对其进行定义。）一个更进一步的例子来自分形的理论（见动力学[IV.15]）：在里面出现的复杂图形，最好是定义为较简单的图形的极限。

> We say that $ f $ is continuous at $ a $ if 
>
>  $$  \forall \epsilon \gt 0, \exists \delta \gt 0, |x-a| \lt \delta \Rightarrow |f(x)-f(a)| \lt \epsilon $$ 
>
> This says that however accurate you wish $ f(x) $  to be as an estimate for $  f(a) $ , you can achieve this accuracy if you are prepared to make $ x $ a sufficiently good approximation to $ a $ . The function $ f $  is said to be continuous if it is continuous at every $ a $ . Roughly speaking, what this means is that $ f $  has no “sudden jumps.” (It also rules out certain kinds of very rapid oscillations that would also make accurate estimates difficult.)

我们说函数 $ f $ 在 $ a $ 处连续，如果

$$  \forall \epsilon \gt 0, \exists \delta \gt 0, |x-a| \lt \delta \Rightarrow |f(x)-f(a)| \lt \epsilon $$ 

上面的公式其实就是说， $ f(x) $ 作为对 $ f(a) $ 的估算，无论我们希望这个估算多么精确，对应的精度都是可以达到的，只要我们准备好让 $  x  $ 是 $  a  $ 的一个足够好的近似。如果一个函数在每个点 $  a  $ 处都连续，它就是连续函数。粗略地说，就是它没有突然的跳跃（这也就排除了会使得精确的估计变得困难的某一类急速震荡）。

> Continuous functions are functions that preserve the structure provided by convergent sequences and their limits.

连续函数就是可以保持由收敛序列及其极限所提供的结构的函数。

> Heat takes time to travel through a medium, so although the temperature at some distant point $ (x',y',z') $ will eventually affect the temperature at $ (x,y,z) $ , the way the temperature is changing right now (that is, at time t) will be affected only by the temperatures of points very close to $ (x,y,z) $ : if points in the immediate neighborhood of $ (x,y,z) $ are hotter, on average, than $  (x,y,z) $ itself, then we expect the temperature at $ (x,y,z) $ to be increasing, and if they are colder then we expect it to be decreasing.

热需要时间来在介质中传导，所以虽然在很远处的点 $ (x',y',z') $ 的温度最终会影响到点 $ (x,y,z) $ ，此刻（在时间t）温度改变的方式却仅被紧挨着点 $ (x,y,z) $ 的点的温度所影响：如果在 $ (x,y,z) $ 的极近邻域的点平均比点 $ (x,y,z) $ 自己更热，那么我们就会预期点 $ (x,y,z) $ 的温度会上升，如果平均更冷，那我们预期就会下降。

> The symbol  $  \Delta  $ , defined by 
>
>  $$  \Delta f =\frac{\partial^2 f}{\partial x^2}+\frac{\partial^2 f}{\partial y^2}+\frac{\partial^2 f}{\partial z^2}  $$
>
> , is known as the Laplacian. What information does  $  \Delta f  $  give us about a function $ f $ ? The answer is that it captures the idea in the last paragraph: it tells us how the value of $ f $ at $ (x,y,z) $ compares with the average value of $ f $ in a small neighborhood of $ (x,y,z) $ .

定义为

$$  \Delta f =\frac{\partial^2 f}{\partial x^2}+\frac{\partial^2 f}{\partial y^2}+\frac{\partial^2 f}{\partial z^2}  $$

的符号 $  \Delta  $ ，称为拉普拉斯算子。 $  \Delta f  $ 向我们提供了关于函数 $ f $ 的哪些信息？它抓住了上一段所描述的思想：f在点 $ (x,y,z) $ 的值与点 $ (x,y,z) $ 的极小领域的平均值相比如何。

> A second equation of great importance is the Laplace equation,  $  \Delta f = 0  $ . Intuitively speaking, this says of a function $ f $ that its value at a point $ (x,y,z) $ is always equal to the average value at the immediately surrounding points.

第二个特别重要的方程式拉普拉斯方程，即 $  \Delta f = 0  $ 。直观地看，这是在说，一个函数 $ f $ 在点 $ (x,y,z) $ 的值，总是等于紧挨着该点的点的平均值。

> For two or more variables, a function has more flexibility—it can lie above the tangent lines in some directions and below it in others. As a result, one can impose a variety of boundary conditions on $ f $ (that is, specifications of the values $ f $ takes on the boundaries of certain regions), and there is a much wider and more interesting class of solutions.

在二元或多元的情况下，一个函数可以有更大的灵活性：它可以在某些方向上高于切线，而在其他方向上低于切线。结果是，我们可以对 $ f $ 赋予多种边值条件（即在特定区域的边界上指定 $ f $ 的值），从而也就有了更广泛和更有趣的各类解。

>  $  \square^2 h  $  is shorthand for  $  \Delta h - \frac{1}{v^2} \frac{\partial^2 h}{\partial t^2}  $ 
>
> The operation  $  \square^2  $  is called the d'Alembertian, after [d'Alembert](https://en.wikipedia.org/wiki/Jean_le_Rond_d%27Alembert) [VI.19], who was the first to formulate the wave equation.

 $  \square^2 h  $  是 $  \Delta h - \frac{1}{v^2} \frac{\partial^2 h}{\partial t^2}  $  的简写。

算子 $  \square^2  $ 又被称为 d'Alembertian 算子，以法国数学家[d'Alembert](https://en.wikipedia.org/wiki/Jean_le_Rond_d%27Alembert) [VI.19] 命名，他是首个用公式表示波方程的人。

评：包含这两个符号，不是因为这是新知识，只是在我少年时代初次接触这个三角形、正方形还有另外一个倒三角形时，对数学符号升起了某种神秘崇高的感觉，至今看到这几个符号依然能唤起那时的感觉。我如此喜欢这种用幼儿时代就接触的符号来浓缩中学时代才能理解的知识的方式。

> We have been at pains to distinguish integration from antidifferentiation, but a famous theorem, known as _the fundamental theorem of calculus_, asserts that the two procedures do, in fact, give the same answer, at least when the function in question has certain continuity properties that all “sensible” functions have. So it is usually legitimate to regard integration as the opposite of differentiation. More precisely, if $ f $ is continuous and $ F(x) $ is defined to be $ \int^x_a f(t)dt $ for some $ a $, then $ F $ can be differentiated and $ F'(x) = f(x) $ . That is, if you integrate a continuous function and differentiate it again, you get back to where you started.

我们花了不少功夫来把积分和逆微分区分开来，但是有一个称为__微积分基本定理__的著名定理断言这两个程序事实上会给出相同的答案，至少当所考察的函数具有所有“合理”的函数一定会具有的某些连续性时是这样的。因此，通常都认为把积分看成微分的逆运算是合法的。确切些说，如果 $ f $ 是连续的，而 $ F(x) $ 可以对于某个常数 $ a $ 定义为 $  \int^x_a f(t)dt  $ ，则 $  F(x)  $ 可以微分，且  $  F'(x) = f(x)  $ 。就是说，如果先把一个连续函数积分了，再去做微分，就会回到原来的函数。

评：这段话对于学过高等数学的同学可能感觉平淡无奇，不过双语对照阅读起来，还是有一些新的感觉，所以摘录出来。

> These facts begin to suggest that complex differentiability is a much stronger condition than real differentiability and that we should expect holomorphic functions to have interesting properties.

这些事实（按：上面讨论了柯西-黎曼方程）开始揭示，复可微是一个远比实可微要强得多的条件，我们也可以期待全纯函数会具备许多有趣的属性。

> It is not necessary for the function f to be defined on the whole of $ C $ for [Cauchy's theorem](https://en.wikipedia.org/wiki/Cauchy%27s_integral_theorem) to be valid: everything remains true if we restrict attention to a simply connected domain, which means an open set with no holes in it. If there are holes, then two path integrals may differ if the paths go around the holes in different ways. Thus, path integrals have a close connection with the topology of subsets of the plane, an observation that has many ramifications throughout modern geometry. For more on topology, see section 6.4 of this article and [Algebraic Topology](https://en.wikipedia.org/wiki/Algebraic_topology) [IV.10].

为了使[柯西定理](https://en.wikipedia.org/wiki/Cauchy%27s_integral_theorem)成立，并不需要函数定义在整个复数平面 $ C $ 上，如果限制函数定义在整个复数平面的一个单连通区域，即没有洞的开集合上，则一切依然成立。如果区域里有洞，则两条有相同起点和终点的路径积分可能不一样，如果这两条路径以不同的方式环绕洞。因此，路径积分与平面的子集合的拓扑学有密切的关系，这一点观察，在整个现代几何学里非常多的引申与影响。关于拓扑学，可以进一步参看[代数拓扑](https://en.wikipedia.org/wiki/Algebraic_topology) 这一条目。

> For complex functions differentiability implies infinite differentiability.

对于复函数，可微性蕴含着无穷可微性。

在第五节的最后，中文版讨论了[Liouville's theorem](https://en.wikipedia.org/wiki/Liouville%27s_theorem_(complex_analysis))，而英文电子版缺失。这个定理是说：如果函数 $ f $ 是定义在整个复平面上的全纯函数，而且函数 $ f $ 是有界的（即存在一个常数 $ C $ ，使得对于每一个复数 $ z $ 都有 $ |f(z)| \le C $ ），则函数必为常数。

### 6 What Is Geometry? （什么是几何学）

> However, if you have not met the advanced concepts and have no idea what modern geometry is like, then you will get much more out of this book if you understand two basic ideas: the relationship between geometry and symmetry, and the notion of a manifold.

如果你还没有见过一些进阶的概念，并且对于现代几何学是什么样的一无所知，那么你只要理解两个基本的概念（几何学与对称之间的关系，以及流形的概念），就能从这本书收获更多。

评：点出了现代几何学的这两个最为核心的概念的关键性。这段话在中文版中，错误地将“进阶”翻译为“高深”，并且将进阶概念与一无所知的并列关系翻译成假设关系。

> Broadly speaking, geometry is the part of mathematics that involves the sort of language that one would conventionally regard as geometrical, with words such as “point,” “line,” “plane,” “space,” “curve,” “sphere,” “cube,” “distance,” and “angle” playing a prominent role. However, there is a more sophisticated view, first advocated by klein [VI.56], which regards transformations as the true subject matter of geometry. So, to the above list one should add words like “reflection,” “rotation,” “translation,” “stretch,” “shear,” and “projection,” together with slightly more nebulous concepts such as “angle-preserving map” or “continuous deformation.”

一般来说，几何学就是数学里涉及我们通常会按照惯例视为几何语言的部分，如“点”、“直线”、“平面”、“空间”、“曲线”、“球”、“立方体”、“距离”，还有“角度”这样的词汇扮演了突出的角色。然而，还存在一种更为深刻的观点，最初为克莱因所主张，认为变换才是这门科学的真正的主题。所以除了上面列举的这些词以外，还要加上“反射”、“旋转”、“平移”、“拉伸”、“剪切”、“投影”，以及还有稍微有些朦胧的概念，例如“保角映射”或者“连续变形”。

> These can be thought of in two different ways. One is that they are the transformations of the plane, or of space, or more generally of $ R^n $ for some n, that preserve distance.

可以有两种方式来看待刚性变换，其一是将它们看作对平面或三维空间或者更一般的 $ R^n $ 空间，所做的保持距离不变的变换。

> Every such transformation can be realized as a combination of rotations, reflections, and translations, and this gives us a more concrete way to think about the group.

每一个这样的变换都可以用旋转、反射和平移的复合来实现。给了我们一种更具体的方式来想象群。

> Since linear maps include stretches and shears, they preserve neither distance nor angle, so these are not concepts of affine geometry.

因为线性映射中还包含了拉伸和剪切，它们既不能保持距离，也不能保持角度，所以距离和角度都不是仿射几何学的概念。

> Although angles in general are not preserved by linear maps, angles of zero are.

虽然线性映射一般并不保持角度不变，但是为零的角度却会被它们保持。

> The idea that the geometry associated with a group of transformations “studies the concepts that are preserved by all the transformations” can be made more precise using the notion of equivalence relations [I.2 §2.3].

通过等价关系的概念，可以将与变换群相关联的几何“研究的是被所有的这些变换所保持的概念”这个思想表达得更确切。

> Topology can be thought of as the geometry that arises when we use a particularly generous notion of equivalence, saying that two shapes are equivalent, or homeomorphic, to use the technical term, if each can be “continuously deformed” into the other.

拓扑学可以认为是当我们使用特别宽松的等价概念时自然涌现的几何学，其中我们说两个图形是等价的，或者用技术的术语来说是同胚的，只要它们均可连续变形为另外一个。

> The appropriate group of transformations is SO(3): the group of all rotations about some axis that goes through the origin. (One could allow reflections as well and take O(3).)

球面几何学中适合表达n维球面S^n的变换群 SO(3)，它是所有以经过原点的直线为轴的旋转。我们也可以选择还包含了反射的群O(3)。

> The group of transformations that produces hyperbolic geometry is called PSL(2,R), the projective special linear group in two dimensions.

产生双曲几何学的变换群是二维的射影特殊线性群，叫做PSL(2,R)。

> To get from this group to the geometry one must first interpret it as a group of transformations of some two dimensional set of points. Once we have done this, we have what is called a model of two-dimensional hyperbolic geometry.

为了从这个群中得出对应的几何学，我们必须先把它理解为，某个2维点集合的变换群，一旦我们做到了这一点，我们就有了二维双曲几何的模型。

> The three most commonly used models of hyperbolic geometry are called the half-plane model, the disk model, and the hyperboloid model.

双曲几何学的三个最常用的模型是半平面模型、圆盘模型和双曲面模型。

> Here are two ways of regarding the projective plane. The first is that the set of points is the ordinary plane, together with a “point at infinity.” The group of transformations consists of functions known as projections.
>
> A second view of the projective plane is that it is the set of all lines in $ R^3 $ that go through the origin. Since a line is determined by the two points where it intersects the unit sphere, one can regard this set as a sphere, but with the significant difference that opposite points are regarded as the same—because they correspond to the same line. (This is quite hard to imagine, but not impossible. Suppose that, whatever happened on one side of the world, an identical copy of that event happened at the exactly corresponding place on the opposite side. ...... It might under such circumstances be more natural to say that there was only one Paris and only one you and that the world was not a sphere but a projective plane.)

对射影平面有两种观点：第一种观点认为，这个点集合其实就是普通的平面加上无穷远点。组成射影变换群的函数我们称为投影。

对射影平面的第二种观点，是把它看作 $ R^3 $ 中过原点的直线的集合。因为一条这样的直线可由它与单位球面的两个交点决定，所以也可以把这个集合看成就是单位球面，但是与普通的球面有一个值得注意的区别，就是（单位球面上）相对的点可以视作同一点，因为它们对应于同一条直线。这一点很难想象，但并非不可能。假设有这样一个世界，在它的一边发生的任何事，该事件一个完全一致的副本，都会在另外一边完全对应的地方发生。（按：接下来作者举了真实的“你”去副本的“巴黎”的例子）在这种情况下，说只有一个“巴黎”，只有一个“你”，那就更加自然了，不过这时世界已经不再是球面，而是一个射影平面了。

> A Lorentz transformation is a linear map from $ R^4 $ to $ R^4 $ that preserves these “generalized distances.”

洛伦兹变换就是一个保持其上“广义距离”不变的从 $ R^4 $ 到 $ R^4 $ 的线性映射。

> Let us therefore imagine a planet covered with calm water. If you drop a large rock into the water at the North Pole, a wave will propagate out in a circle of everincreasing radius. (At any one moment, it will be a circle of constant latitude.) In due course, however, this circle will reach the equator, after which it will start to shrink, until eventually the whole wave reaches the South Pole at once, in a sudden burst of energy.

让我们想象一个为静止水体所覆盖的行星，如果丢一块大石头到在北极的水里，水波会以半径越来越大的圈传播开去（在任何时刻，这个圈都是一个纬圈）然而，到了一定时候，这个圈到达了赤道，此后它会开始收缩，直到最后，整个波同一时间到达南极，发生能量的突然爆发。

> Now imagine setting off a three-dimensional wave in space—it could, for example, be a light wave caused by the switching on of a bright light. The front of this wave would now be not a circle but an ever-expanding spherical surface. It is logically possible that this surface could expand until it became very large and then contract again, not by shrinking back to where it started, but by turning itself inside out, so to speak, and shrinking to another point on the opposite side of the universe. ......More to the point, this account can be turned into a mathematically coherent and genuinely three-dimensional description of the 3-sphere.

现在来想象三维的空间里突然发出的波——例如，它可以是打开一盏明亮的灯所产生的光波。现在波前（又称为波阵面）不再是一个圈，而是一个不断扩展的球面。逻辑上，这个球面可以扩展到非常大然后又开始收缩，但并不是收缩回到原点，而是从里翻到外地收缩到宇宙另外一端的某一点上。……更重要的是，这样的解释可以变成一种对3维球面的数学上连贯自洽的真正的三维描述。

> A different and more general approach is to use what is called an atlas. An atlas of the world (in the normal, everyday sense) consists of a number of flat pages, together with an indication of their overlaps: that is, of how parts of some pages correspond to parts of others. Now, although such an atlas is mapping out an external object that lives in a three-dimensional universe, the spherical geometry of Earth’s surface can be read off from the atlas alone.

处理这个问题的一个不同的，而且更加一般的途径是使用图册或者图集（atlas）。日常生活中的一本世界地图册是由许多平面的地图页订成的，加上对于它们之间的重叠的说明，说明某些页面的一部分如何对应另外一些页面的一部分。虽然这样的图册是在地图上标出存在于三维宇宙中的外部对象，地球表面的球面几何（所包含的信息）可以仅从这些图册中就读出。

> The idea of an atlas can easily be generalized to three dimensions. A “page” now becomes a portion of threedimensional space. The technical term is not “page” but “chart,” and a three-dimensional atlas is a collection of charts, again with specifications of which parts of one chart correspond to which parts of another.

图册的概念很容易推广到三维的情形情况。这时每一页都是三维空间的一部分。专业术语中，不说页，而是说“区图”（chart）。一个三维图册，就是区图的集合，同样加上对于一个区图的某一部分如何对应于另一区图的哪一部分的说明。

> The formal definition of a manifold uses the idea of atlases: indeed, one says that the atlas is a manifold.

流形（manifold）的正式定义中使用了图册（atlas）的概念，人们可以说图册就是一个流形。

> It may be better to think of a d-manifold in the “extrinsic” way that we first thought about the 3-sphere: as a d-dimensional “hypersurface” living in some higher-dimensional space. Indeed, there is a famous theorem of Nash that states that all manifolds arise in this way.

（按：就获得对流形的直观理解的目的而言，）最好以外在的方式（按：与内蕴（intrinsic）的方式相反，内蕴的方式不要参照任何包含其的空间）来看待一个d-流形，就像我们最初考察3维球面时一样，将其视为一个存在于更高维的空间中的d维超曲面。实际上，有一个著名的纳什定理，指出所有的流形都是这样产生的。

> This is guaranteed if the function that gives the correspondence between the overlapping overlapping parts (known as a transition function) is itself differentiable. Manifolds with this property are called differentiable manifolds: manifolds for which the transition functions are continuous but not necessarily differentiable are called topological manifolds. The availability of calculus makes the theory of differentiable manifolds very different from that of topological manifolds.

如果转移函数（即给出两个区图间的重叠部分的对应关系的函数）自身是可微的，那么这个函数对于两个区图同为可微或不可微就得到了保证。具备以上属性的流形可以称为可微流形。而具备仅连续但不一定可微的转移函数的流形被称为拓扑流形。微分的可用使得微分可微流形与拓扑流形的理论迥异。

> The single most important moral to draw from the above problems is that if we wish to define a notion of distance for a given manifold, we have a great deal of choice about how to do so. Very roughly, a Riemannian metric is a way of making such a choice.

从以上问题所能得到最重要的教训就是，如果想在一个给定的流形上定义距离的概念，有很多种方式可以可供选择。而粗略地说，黎曼度量就是进行选择的方法。

按：这之前讨论了采用区图中的相应点间的距离来定义流形中的两点距离的三个问题，分别是：

1. 两点可能属于不同的区图；
2. 对同一流形有很多种选择区图的方式从而无法得到距离的唯一定义（而就算给定一个区图，在重叠的部分距离的定义也未必兼容）；
3. 图册里的区图是平坦的，因此图册内的距离将难以体现流形上最短路径的长度。

> As should be clear by now from the above discussion, on any given manifold there is a multitude of possible Riemannian metrics. A major theme in Riemannian geometry is to choose one that is “best” in some way. ......More generally, one searches for extra conditions to impose on Riemannian metrics. Ideally, these conditions should
be strong enough that there is just one Riemannian metric that satisfies them, or at least that the family of such metrics should be very small.

从以上的讨论中应该可以清晰看出，在任意给定的流形上总有许多可能的黎曼度量。黎曼几何学的一个重大主题就是从其中选择在某些方面最好的黎曼度量。……更通用的方法是，要找出附加在黎曼度量上的额外条件，这些额外的条件要足够地强，使得只有一个黎曼度量能够满足它们，或者至少要使得满足这些条件的黎曼度量族很小。

> 本文也发表于知乎：[&#x29c9;](https://zhuanlan.zhihu.com/p/211327649)