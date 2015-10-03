---
title: 《规范场，扭结和引力》读书笔记
tags: 物理, 读书笔记
code_mode: math|lang
---

第一部分 Electromagnetism
=========================

第一章 Maxwell's Equations
-----------------------------


通过引入复值向量场$ E+iB $，利用Maxwell方程中的duality将其化为两个方程，再展开回Maxwell方程的常见形式。

分析了Maxwell方程的Lorentz不变性，指出在本部分结束时，我们能够意识到Maxwell方程其实可以写成：

$$ dF=0 $$
$$ *d*F=J $$

第二章 Manifolds
-------------------------

本章意在以坐标无关的方式介绍流形。

以开集、拓扑空间、领域等概念开场，介绍了$ chart $这种能够把拓扑空间映射为$ \mathbb{R}^n $的东西，从而定义了$ n $维流形。

从而自然也就可以把定义在$ n $维流形上的函数$ f $，通过$ f \rightarrow f \cdot chart^{-1} $的方式，变成了在$ \mathbb{R}^n $上定义的函数。

稍微讨论了一下流形的连续和光滑。

$ \mathbb{C}^{\infty}(M) $ 表示流形$ M $上的光滑实值函数的集合。

第三章 Vector Fields
--------------------------

### 第一小节 向量场

这一小节革新了我们对向量场的传统观念。

不再把向量视为具有大小和方向的箭头，而视为在其方向上的对任意$ f $的方向导数，即$ v = v^\mu \partial_\mu $。

进一步抽象地将流形$ M $上的向量场$ v $定义为：

$$ v: \mathbb{C}^{\infty}(M) \rightarrow \mathbb{C}^{\infty}(M) $$

并且满足线性法则以及Leibniz法则:

$$ v (f + g) = vf + vg $$

$$ v (\alpha f) = \alpha vf $$

$$ v(fg) = v(f) g + f v(g) $$

并定义了向量场的和与积。

随后证明了 `$ \\{ \partial_\mu \\} $` 形成$ Vect(\mathbb{R}^n) $的一组基，也即任意$ v $都可以唯一地表示为$ v^\mu \partial_\mu $的形式，。

综上，我们意识到了向量场的方向导数本质，并回归了向量的分量定义。

$ Vect(M) $，表示$ M $上所有向量场的集合。

$ v $在点$ p $，定义了切向量。点$ p $的所有的切向量组成$ T_p M $。

$ \gamma : R \rightarrow M $，定义了曲线。

### 第二小节  逆变和协变

我稍微滥用一下定义域这个词来解释：

如果有微分同胚（diffeomorphism）$ \phi: M \rightarrow N $，另有$  f : N \rightarrow R $，那么：$ f \phi ： M \rightarrow R $。

如果我们定义 $ \phi^* f = f  \phi $，那么$ \phi^* $就是一种把一个定义域在$ N $的函数$ f $“拉回（pullback）”定义域$ M $的操作。

我们称实值函数$ f $具有逆变（contravariant）的性质，因为它在拉回操作下保持了同样的行为。

那么再给出“推前（pushforward）”定义：

$$ (\phi_* v)f = v ( \phi^* f ) $$

其中，$ f: N \rightarrow R， v:  \mathbb{C}^{\infty}(M) \rightarrow \mathbb{C}^{\infty}(M)  $。

注意看：
右边是通过先把$ f $从定义域$ N $拉回到$ M $，然后将向量场作用其上。
左边是通过先把向量场从$ M $推前到$ N $，然后将其作用在$ f $上。

我们称切向量场具备协变（covariant）的性质，因为它在推前操作下保持了同样的行为。

以下是我画的一个帮助理解的示意图：

![](2011-04-13-notes-on-gauge-theories-knots-and-gravity/pull-and-push.jpg)

### 第三小节 流和李括号

顺着$ v $，我们可以得到积分曲线$ \gamma $。想象一个点顺着$ \gamma $流动，在时间$ t $我们就得到了这么一个映射：

$$ \phi_t : M \rightarrow M $$

$ \\{\phi_t \\} $也就成为了$ v $生成的流。

李括号其实很像柏松括号，或者说算符的互易子。

$$ [v, w] = v w - w v $$

李括号也就表征了“先顺$ v $流再顺$ w $流的流”与“先顺$ w $流再顺$ v $流的流”之间不可互易的程度。

第四章 Differential Forms
--------------------------

### 第一小节 1-形式

向量场是倒腾函数的，1-形式则是把向量场倒腾成另外的函数。

$$ \omega： Vect(M) \rightarrow \mathbb{C}^{\infty}(M) $$

同样需要满足线性法则：

$$ \omega（v + w）= \omega v + \omega  w $$
$$ \omega (g v ) = g \omega ( v ) $$

注意，这里从向量场定义里的数乘变成了函乘。

同样，很容易定义1-形式的和与函积。

$ \Omega^1(M) $表示M上的所有1-形式的集合。

定义一种特殊的1-形式——外微分$ df $：

$$ df(v) = v f $$

接下来通过对 $ d \sin x = \cos x dx $ 两边的分别变形，在外微分的语境下，阐释了微分形式不变形的真谛。

$ \\{ dx^\mu \\} $ 形成 1-形式在$ \mathbb{R}^n $上的一组基。

于是可以定义：

`$$ \omega_\mu = w(\partial_\mu) $$`

得到：

$$ \omega = \omega_\mu dx^\mu  $$

这样1-形式也被我们展开成了分量形式。

### 第二小节 余切向量

于是我们很自然得到了余切向量：

`$$ \omega_p(v_p) = \omega(v)(p) $$`

点$ p $的所有余切向量组成$ T^*_p M $。

余切向量是逆变的。

### 第三小节 坐标变换

以上的讨论都是不涉及具体坐标的。

在不同的坐标选择之间，如何变换？

`$$ \partial_\mu = T^\upsilon_\mu \partial'_\upsilon $$`

很容易推得：

$$ T^\upsilon_\mu = \partial x'^\upsilon / \partial x^\mu  $$

而且这个变换关系也适用在向量场和1-形式上：

$$ v'^\upsilon = T^\upsilon_\mu v^\mu $$

$$  \omega'^\upsilon = \omega^\upsilon_\mu \omega^\mu $$

### 第四小节 p-形式

通过定义 只需满足

$$ w \wedge v = - v \wedge w $$

的外代数 $ \wedge $。

这个代数构成了$  \wedge V $。

严格的代数规则见书中，其中这个反交换规则是不包含在内的，而是作为一个自然的推论。

我们定义p-形式为“p个1-形式的$  \wedge V $乘”的线性组合。

一般情况下，p-形式具有如下的形式：

$$ 1/(p!) \omega_1...p dx^1 \wedge ... \wedge dx^p $$

$ v\wedge w $和$ u \wedge v \wedge w $我们得到了类似叉乘$ v × w $和三乘 $ u \cdot (v × w) $的结果，区别在于，叉乘的结果是向量， 三乘的结果是标量，而这里的结果分别是2-形式和3-形式。

在这个过程中，我们发现叉乘的右手规则，其实是不必要的，唯有当我们企图把一个2-形式映射为一个1-形式的时候，才会涉及到手性。

### 第五小节 外微分

我们定义严格的外微分：

$$ d: \omega^p（M）\rightarrow \omega^{p+1}(M) $$

1. $ p $从$ 0 \rightarrow 1 $的定义还是基于之前的外微分定义；
2. 满足线性规则
3. $ d(\omega \wedge\mu) = d\omega\wedge\mu + (-1)^p  \omega\wedge d\mu $。
4. $ d^2 \omega = 0 $。

于是我们看得很清楚，在$ R^3 $中

1. $ \operatorname{grad} $是$ p $从$ 0 \rightarrow 1 $
2. $ \operatorname{curl} $是$ p $从$ 1 \rightarrow 2 $
3. $ \operatorname{div} $是$ p $从$ 2 \rightarrow 3 $

第五章 Rewriting Maxwell's Equations
-------------------------------------

### 第一小节 第一对方程


目的：将

$$ \nabla \cdot B = 0 $$

$$ \nabla \times E + \partial_t B = 0 $$

推广到任意流形。

首先把B作为2-形式处理：

`$$ B = B_x dy \wedge dz + B_y dz \wedge dx + B_z dx \wedge dy $$`

E作为1-形式处理：

`$$ E = E_x dx + E_y dy + E_z dz $$`

定义统一电磁场$ F $为$ R^4 $上的2-形式：

$$ F = B + E \wedge dt $$

$$ F =  \frac{1}{2} F_{\mu\upsilon} dx^\mu \wedge dx^\upsilon $$

其分量组成一个反对称的矩阵，见书中。

第一对方程可以简单地写成：

$$ dF = 0 $$

通过将其拆成类空部分和类时部分，不难重新推导出第一对方程。

但这个方程的普遍性不仅仅适用于可以将流形M拆成$ R \times R^3 $的情形。

注意：我们通常概念意义上的电场和磁场，则只有在可以将流形M拆成$ R \times R^3 $的情形下，才有定义。

### 第二小节 度规


第一对方程，并不涉及度规。它们是普遍协变的，也就是无论怎么伸缩扭曲时空的微分同胚，都可以用其push back得到对应的解。

度规是一种广义的距离，或者说间距。

定义向量空间V上的度规g为：

$$ g: V \times V \rightarrow R $$

满足：

双线性条件：

$$ g(cv + v', w) = c g(v, w) + g(v', w) $$

$$ g(v, cw + w') = c g(v, w) + g(v, w') $$

可交换：

$$ g(v, w) =  g (w, v) $$

非退化：

$$ \forall w \in V [ g(v, w) == 0 ]  \Rightarrow v = 0 $$

有了度规，可以选取一组正交的基：$ \\{ e_\mu \\} $

正交，也就是满足：

$$ g(e_\mu, e_\upsilon) = ( \mu==\upsilon ? 0 : ±1 ) $$

$ Signature(p, q) $：$ q $是正交基中-1的数目。$ p+q=n $

对 $ \gamma : [0,1] \rightarrow M $定义弧长（类空时）或原时（类时时）：

$$\int \sqrt{g(\gamma'(t), \gamma'(t))} dt $$

$$ g_{\mu\upsilon} = g(e_\mu, e_\upsilon)  $$

$$ g^{\mu\upsilon} = g_{\mu\upsilon}^{-1} $$

度规的指标升降不在此赘述。

定义1-形式的内积：

`$$ <\omega, \mu> = g^{\alphaβ} \omega_\alpha \mu_β $$`

再定义 p-形式的内积：

$$ < e^1 \wedge ... \wedge e^p, f^1 \wedge ... \wedge f^p > = \det [ < e^i, f^j >] $$

### 第三小节 体积形式

给定V的两组基： `$ \\{ e_\mu \\} $`， `$ \\{ f_\mu \\} $`

有映射 $ T : V \rightarrow V $，使得：

`$$ T e_\mu = f_\mu $$`

如果，$ \det  T > 0 $，我们说，这两组基，具有相同的取向。

定义体积元为

$$ e_1 \wedge ... \wedge e_n $$

，它是 $ \wedge^n V $ 中的非零元素。

设另一组基 `$ f_\upsilon = T^\mu_\upsilon e_\mu $` ，则得到：

`$$
f_1 \wedge ... \wedge f_n
= (T^i_1 e_i) \wedge ... \wedge ( T^i_n e_i)
= sign(\sigma) T^\sigma(1)_1 ... T^\sigma(1)_1 e_1 \wedge ... \wedge e_n
= \det  T e_1 \wedge ... \wedge e_n
$$`

其中$ \sigma $是一组1..n的全排列/全置换，$ sign(\sigma) $则是n维的Levi-Civita符号，详见维基百科。

定义M上的体积形式\omega为无处消失的n-形式，其标准形式为：

$$ \omega = dx^1 \wedge ... \wedge x^n $$

对于每一个点，$ \omega_p $都是$ T^*_p M $的一个体积元。

从上面可以看出，体积形式和基的取向密切相关，实际上，如果体积形式不存在，流形是不可取向的。比如在Mobius strip上，无法选定一组光滑变化的基。

若有取向的$chart$ `$ \phi_\alpha : U_\alpha \rightarrow \mathbb{R}^n $` 覆盖 $ M $ ，则

`$$ g_{\mu\upsilon} = g(\partial_\mu, \partial_\upsilon) $$`

而体积形式的正则形式为：

$$ vol = \sqrt{|\det  g|} dx^1 \wedge ... \wedge x^n $$

这个形式的体积形式，将不受$ chart $选择的变化的影响，保持不变。证明见书。

第四小节 Hodge Star Operator（星算符？）

可以参考：http://planetmath.org/encyclopedia/HodgeStarOperator.html

面元到面元的映射：

$$ * : \omega^p（M）\rightarrow \omega^{n-p} (M) $$

满足：

$$ \forall \omega,  \mu \in \omega^p（M）：\omega \wedge * \mu = <\omega, \mu> vol $$

从此定义，不难推算出落实到按基的Hodge Star Operator的计算方法。详细见书中习题。

### 第五小节 第二对方程

不难看出第二对方程和第一对方程在做了如下变换之后非常相似，只剩下右侧的区别：

$$ E \rightarrow -B, B \rightarrow E $$

也不难算出， $ *F $正好起了类似的效果。

定义

电流密度

$$ j = j_i dx^i $$

在加上电荷成分，定义 current

$$ J = j - ρdt $$

按同样的把戏，不难验算第二对方程可以写成：

$$ *d*F=J $$

根据上一节，我们知道：在$ R^4 $上，$ ** = ±1 $

当$ **=1 $时，也就是当流形是黎曼的时候，书中讨论了2-形式的self-dual和anti-self-dual。

书中还讨论了maxwell方程在真空中的解。

第六章 DeRham Theory in Electromagnetism
---------------------------------------------
