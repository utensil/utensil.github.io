---
title: 普通、文艺、2B物理学家和数学家
tags: 物理
code_mode: math
---

看到网上流传一张图，普通物理学家、文艺物理学家、2B物理学家以及数学家的区别（Maxwell方程组的4种形式……）：

![](tech/images/different-style-of-physicist.jpg)

其实这张图中存在一些有趣的地方，下面细细道来。

普通物理学家
-------------

按照原图的设定，普通物理学家使用Maxwell方程组的微分形式。

最常见的表达方式（[国际单位制](http://en.wikipedia.org/wiki/International_System_of_Units)）：

$$ \nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0} \label{eq:mw1}$$

$$ \nabla \times \vec{B} = \mu_0\vec{J} + \mu_0\epsilon_0 \frac{\partial \vec{E}}{\partial t} \label{eq:mw2}$$

$$ \nabla \cdot \vec{B} = 0 \label{eq:mw3}$$

$$ \nabla \times \vec{E} = - \frac{\partial \vec{B}}{\partial t} \label{eq:mw4}$$

由于这个公式中每个符号的意思都早已约定俗成广为人知，这里不作赘述，不清楚的同学请移步[维基百科词条对每个符号的解释](http://en.wikipedia.org/wiki/Maxwell's_equations#Table_of_terms_used_in_Maxwell.27s_equations) 。

而在网上流传的图中，虽然同样是微分形式，却使用了[高斯单位制](http://en.wikipedia.org/wiki/Gaussian_units)：

$$ \nabla \cdot \vec{E} = 4 \pi \rho $$

$$ \nabla \times \vec{B} = \frac{4\pi}{c}\vec{J} + \frac{1}{c}  \frac{\partial \vec{E}}{\partial t} $$

$$ \nabla \cdot \vec{B} = 0 $$

$$ \nabla \times \vec{E} = - \frac{1}{c} \frac{\partial \vec{B}}{\partial t} $$

虽然说高斯单位制在历史上有它的地位，但时至今日还使用它，其实比较自找麻烦了。维基百科这么描述它在今日的流行程度：

> SI units are by far the most common today. In engineering and practical areas, SI is near-universal and has been for decades, while in technical, scientific literature (such as theoretical physics and astronomy), Gaussian units were predominant until recent decades, but are now getting progressively less so.

何况在我看来，使用高斯单位制（尤其是里面对量纲的调整和形式上的简化）得到的公式形式是不利于进一步推广的。

文艺物理学家
-------------

按照原图的设定，文艺物理学家使用Maxwell方程组的协变形式:

$$ \partial_\mu F^{\mu\nu} = j^\nu \label{eq:artmw1} $$

$$ \partial_\mu \tilde{F}^{\mu\nu} = 0 \label{eq:artmw2} $$

上面这里的表述比原图简单，是因为使用了对偶张量：

$$ \tilde{F}^{\mu\nu} = \frac{1}{2} \epsilon^{\mu\nu\rho\sigma} F_{\rho\sigma} $$

其中$ \epsilon^{\mu\nu\rho\sigma} $ 是[Levi-Civita符号](http://en.wikipedia.org/wiki/Levi-Civita_symbol)，一个反对称轮换符号。

简单推导如下（此处不赘述广为人知的[Einstein求和规则](http://en.wikipedia.org/wiki/Einstein_notation)，以及希腊字母代表0至3的遍历，英文字母代表1至3的遍历的惯例）：

令

$$ A^\mu = (\phi, \vec{A}) $$

使得：

$$ \vec{B} = \nabla \times \vec{A}, \vec{E} = - \frac{\partial \vec{A}}{\partial t} - \nabla \phi $$

再定义

$$ F^{\mu\nu} = - F^{\nu\mu} = \partial^\mu A^\nu - \partial^\nu A^\mu \label{eq:fmunudef} $$

不难看出：

$$ F^{0i} = - E^i $$

$$ F^{ij} = - \epsilon^{ijk} B^k $$

定义

$$ j^\nu = (\rho, \vec{j}) $$

则不难通过展开$ \eqref{eq:artmw1} $得到$ \eqref{eq:mw3} $和$ \eqref{eq:mw4} $。

显然，$ \eqref{eq:fmunudef} $的定义使得$ \eqref{eq:mw1} $和$ \eqref{eq:mw2} $ 自然得到满足（因为恒等式$ \nabla \cdot ( \nabla \times \vec{A}) \equiv 0$ 和 $ \nabla \times (\nabla \phi ) \equiv 0 $， 这里的$ \phi $ 为任意标量， $ \vec{A} $为任意矢量）。

但是$ \eqref{eq:fmunudef} $的定义使其显式提到了$ A^\mu $，其实这是可以避免的：

从$ \eqref{eq:fmunudef} $可知：

$$ \partial^\lambda F^{\mu\nu} + \partial^\mu F^{\nu\lambda} + \partial^\nu F^{\lambda\mu} = 0 \label{eq:pfz} $$

由于$ \epsilon^{\mu\nu\rho\sigma} $的反对称性，不难证明$ \eqref{eq:artmw2} $可以导出$ \eqref{eq:pfz} $。

推导完毕。

值得一提的是，如果我们采用张量分析标准的[Ricci calculus的符号](http://en.wikipedia.org/wiki/Ricci_calculus)，$ \eqref{eq:artmw2} $还可以写成：

$$ F_{[\mu\nu,\lambda]} = 0 $$

2B物理学家
-------------

按照原图的设定，2B物理学家使用Maxwell方程组的积分形式。

$$ \oiint\limits_{\partial V} \vec{E} \cdot d \vec{\sigma} = \frac{Q}{\epsilon} \label{eq:2bmw1} $$

$$ \oint\limits_{\partial S} \vec{B} \cdot d \vec{l} = \mu I + \mu \epsilon \frac{\partial \Phi ( \vec{E} )}{\partial t} \label{eq:2bmw2} $$

$$ \oiint\limits_{\partial V} \vec{B} \cdot d \vec{\sigma} = 0 \label{eq:2bmw3} $$

$$ \oint\limits_{\partial S} \vec{E} \cdot d \vec{l} = - \frac{\partial \Phi ( \vec{B} )}{\partial t} \label{eq:2bmw4} $$

积分形式说起来就打瞌睡，不展开了。对于人类这种比较宏观的生物，积分形式有它的用途，但是它不是描述物理规律的合适形态。

数学家
--------

按照原图的设定，数学家使用Maxwell方程的星算符（Hodge Star Operator）形式：


$$ d * F = J \label{eq:mathmw1} $$

$$ d F = 0  \label{eq:mathmw2} $$


这个是Gauge Field Theory里面的形式了，这个形式最为简洁和优美，其内涵和推导过程详见我的[读书笔记](../../../2011/04/13/notes-on-gauge-theories-knots-and-gravity.html)。

原图和读书笔记里的形式略有出入，区别笔记里在于把$ J $定义为一个1-形式，而原图把$ J $定义为一个3-形式，两者之间正好对偶（相差一个*算符），见 http://en.wikipedia.org/wiki/Mathematical_descriptions_of_the_electromagnetic_field#Current_1-form.2C_dual_current_3-form
