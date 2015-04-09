---
title: Kenneth C.Louden的《程序设计语言——原理与实践》的一点笔记
tags: 读书笔记
date: 2007-08-29 17:00:00 +0800
---

编程范式：面向对象程序设计（C++、Java、Smalltalk）、函数式程序设计（Scheme、Haskell、ML）、逻辑式程序设计（Prolog）。

* 以拜伦之女Ada（历史上第一位程序员：分析机）命名的Ada。
* FORTRAN（FORmula TRANslation）
* COBOL（公共的面向商业语言）——设计目的是使他人能够阅读程序元设计的程序，因而语法复杂。
* Algol：Pascal、C、Ada的鼻祖。
* LISP（LISt Processor）：Common LISP、Scheme。垃圾回收、递归。
* APL：函数式风格、具有大运算符集、要使用特殊终端的希腊符号集、运算能力强大、非结构化。深刻地* 影响的FP。
* BASIC（Beginners All-purpose Symbolic Code）。
* 趋势：Web编程、库以及脚本语言。

C++设计时的指导思想：

* 不应无故不兼容（C和其他系统和语言）
* 其发展应由实际编程需要驱动而非由理论上的考虑。
* 不因有可能就增加一个纯粹的特性
* 任何新增特性的实现，必须以不降低程序运行效率为前提，至少也要保证不增加额外开销。
* 不应强调单一程序设计形式。
* 维持和强化其强类型检查特点
* “你不知道的东西不会伤害你”

Scheme的语法：

```
expression -> atom | list
atom -> number | string | identifier | character | boolean
list -> `(' expression-sentence `)'
expression-sentence -> expression expression-sentence | expression 
```

Scheme的核心内容：

* 表达式中operator要写为前缀（prefix）
* 读入-求值-打印 循环。避免求值：quote list | ' list
* (if 条件 真时的值 假时的值)
* (cond (条件1 值1) (条件2 值2) (条件3 值3) (else 缺省值))
* 没有变量。常量：(define 名字 值)* ，在“将一个名字约束到一个值”的意义上理解。同样的方式可以定义函数。
* 暂时约束：(let ((名字1 值1) (名字2 值2)) expression)
* I/O： (read) 、(display 内容) 、(newline)
* 表操作：若L为(1 2 3) ，(car L) 为1，(cdr L)为(2 3)， (cons 4 L)为 (4 1 2 3)。
* λ演算：(lamda param-list  body)