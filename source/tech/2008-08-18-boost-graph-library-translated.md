--- 
title: 【翻译】Boost Graph库简介 
tags: cpp, 库
---

本章为Boost Graph Library的在线文档的第一章(参见 http://www.boost.org/doc/libs/1_36_0/libs/graph/doc/table_of_contents.html )。前段时间研究编译原理中的属性计算时，看到拓扑排序，突然对Boost中的这个库有了兴趣，就翻译了这篇简介。

Boost 图类库（BGL）
-------------------

图(graph)是一种数学抽象，可用于解决计算机科学领域的多种问题。因此，这种抽象必须也由计算机程序表达出来。一个用于遍历图的标准化的范型接口，对于促进对图算法和数据结构的重用，具有无可比拟的重要性。Boost 图类库（BGL）的一部份是一个可用于访问图的结构的范型接口，同时隐藏了其实现细节。这是一个开放的接口，这意味着任何实现了该接口的图类库，都将可以与BGL范型算法（或是其他使用了该接口的算法）相互协作。BGL提供了一些遵循该接口的通用目的的图类，但它们并不企图成为唯一的图类；肯定会有其他图类更适合于特定场合。我们相信，BGL的主要贡献将是对该接口的规划。

BGL图接口和图组件是范型的(generic )，如同标准模板库(STL)[2]。在下一节中我们将回顾范型编程在STL中扮演的角色，并将其与我们如何在图的背景下应用范型编程相比较。

当然，如果你已经熟悉范型编程，大可以跳过这一节！这里是目录 。

BGL的源代码是Boost分发包的一部份，你可以在[这里]下载。

### 如何构建BGL
 
根本不用！ Boost 图类库是一个仅有头文件(header-only)的类库，并不需要构建后才能使用。唯一的例外是GraphViz输入分析器 。

当编译使用BGL的程序时，记住开启优化 。例如，在Microsoft Visual C++中选择Release模式，或给GCC加上-O2或-O3选项。

### STL中的范型
 
STL以三种方式体现出它是范型的。

#### Algorithm/Data-Structure Interoperability
#### 算法/数据结构互操作性

首先，每个算法都是以一种数据结构中性的方式写成的，允许一个单独的模板函数在许多不同类型的容器施行操作。迭代器的概念是降低算法和数据结构耦合程度的关键因素。这项技术的影响在于将STL的代码规模从O(M*N) 降低到O(M+N) ，其中是M 算法的数量而N 是容器的数量。考虑有20种算法和5种数据结构的情形，这将是写100个函数与仅写25个函数的区别！而且这种区别将随着算法和数据结构数目的增多而变得更大。
 
#### Extension through Function Objects
#### 可扩展性（通过函数对象）

其次，STL的算法和数据结构是可扩展的。通过使用函数对象，用户可以改造和定制STL。正是这种弹性使得STL成为解决现实问题的优秀工具。每个编程问题都会带来它自己的实体集合和需要建模的交互。函数对象提供了这样一种机制来扩展STL使其能处理每个问题领域的细节。
 
#### Element Type Parameterization
#### 元素类型的参数化

第三，STL容器的元素类型是参数化的。虽然这点非常重要，但它可能是最不有趣的一种方式。范性编程常常被简单地总结为参数化的列表，如std::list<T> 。这仅仅挠到了问题的皮毛!
 
### Boost Graph库中的范型

如同STL，BGL也以三种方式体现出它是范型的。

#### Algorithm/Data-Structure Interoperability
#### 算法/数据结构互操作性

首先，BGL的图算法是按照一个抽象掉了特定的图结构的细节的接口写成的。和STL一样，BGL使用迭代器来定义数据结构遍历的接口。有三种不同的图遍历模式：遍历图的所有顶点，经过所有的边，以及沿着图的邻接结构（从一个顶点到它的邻居）。对每一种遍历模式，都有一种专门的迭代器。

该范型接口使得像breadth_first_search() 这样的模板函数可以工作于多种多样的图结构之上，无论是以指针链接的节点实现的图，还是编码在数组里的图。这种弹性对于图论领域尤其重要。图结构常常是为特定的应用定制的。在以前，如果程序员想要重用一个算法实现他们必须将他们的图数据转换/复制到图类库的规定的图结构。在使用像LEDA, GTL, Stanford GraphBase这样的库的时候，正是这样；对于用Fortran写成的图算法，就更是如此。这严重地限制了它们的图算法的重用。

相反，通过外部适配(external adaptation， 参见小节如何将既有的图转换为BGL )，定制的（或者甚至是遗留的）图结构可以原封不动地与BGL范型图算法共同使用。外部适配将一个新的接口包裹在一个数据结构外面，无需复制，也无需将数据放在适配对象里。BGL的接口经过仔细的设计，以使这个适配的过程尽可能简单。为了演示这一点，在BGL图算法中，我们为多种图结构（LEDA图、Stanford GraphBase图，甚至 Fortran风格的数组）构建了接口连接代码。
 
#### Extension through Visitors
#### 可扩展性（通过Visitor）

其次，BGL的图算法是可扩展的。BGL引入了visitor （访问子）的概念，其实它只是一个有多个方法的函数对象。在图算法中，常常需要在一些关键点(event points )插入用户定义的操作。访问子对象有一个不同的、只在关键点才调用的方法。具体的关键点以及相应的访问子方法依具体的算法而定。它们通常包括像start_vertex() , discover_vertex() , examine_edge() , tree_edge() , and finish_vertex()这样的方法。
 
#### Vertex and Edge Property Multi-Parameterization
#### 顶点和边属性的多重参数化

BGL的第三种范型方式，类似于STL容器中的元素类型的参数化，可是情况比STL容器要复杂一些。我们既需要将值（称为“属性”）关联于图的顶点，也需要关联于边。另外，常常需要将多重属性关联于每个顶点和每条边；这正是所谓的多重参数化。STL的std::list<T> 类有一个参数T指定它的元素类型。相似地，BGL图类有对应于顶点和边的属性的模板参数。一个属性参数 指定属性的参数化的类型，同时给该属性分派一个识别标签。这个标签用于区分开一个顶点或边所具有的多个属性。关联于一个特定的顶点或边的 属性值，可以经由一个属性映射表（property map ）获得。对每一个属性，都有一张单独的属性映射表。

传统的图库和图结构会在遇到图属性参数化时变得无能为力。这是图结构必须为具体应用定制的一个主要原因。BGL中的图类中属性的参数化使得它们非常适合于重用。
 
### Algorithms 算法
 
BGL算法包括一个算法模式（实现为范型算法）的核心集合，以及大量的图算法。核心的算法模式有：
 
* 广度优先搜索(Breadth First Search )
* 深度优先搜索(Depth First Search )
* 成本一致搜索(Uniform Cost Search )

这些算法模式自身并不对图计算任何有意义的量；他们仅仅为构造图算法建筑基石。BGL中现有的图算法包括：

* Dijkstra最短路径(Dijkstra's Shortest Paths)
* Bellman-Ford最短路径(Bellman-Ford Shortest Paths)
* Johnson所有节点对间最短路径(Johnson's All-Pairs Shortest Paths)
* Kruskal最小生成树(Kruskal's Minimum Spanning Tree)
* Prim最小生成树(Prim's Minimum Spanning Tree)
* 连通区域(Connected Components)
* 强连通区域(Strongly Connected Components)
* 动态连通区域(使用不相交集合)(Dynamic Connected Components (using Disjoint Sets) )
* 拓扑排序(Topological Sort)
* 转置(Transpose)
* 逆Cuthill Mckee排序(Reverse Cuthill Mckee Ordering)
* 最小最后顶点排序(Smallest Last Vertex Ordering)
* 顺序顶点染色(Sequential Vertex Coloring)
 
### Data Structures 数据结构
 
BGL目前提供两个图类和一个边链表适配器。

* adjacency_list
* adjacency_matrix
* edge_list

adjacency_list类是通用目的的，是图类中的瑞士军刀。它是高度参数化的，因此它可以为不同场合进行优化：图是有向的还是无向的，是否允许平行边，只可以高效访问出边还是也可高效访问入边，快速顶点插入与删除的额外空间开销等等。

adjacency_matrix将边储存在一个|V| x |V| 矩阵中（其中|V| 是顶点数）。这个矩阵的元素代表图中的边。邻接矩阵表示特别适合于非常密集的图，即边的数目接近|V|2 。
edge_list类是一个适配器，它接受任何类型的边迭代器实现一个边链表图( E dge List Graph )。 