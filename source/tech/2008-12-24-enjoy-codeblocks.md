---
title: 享受Code::Blocks编辑快感的几个关键
tags: cpp
---

> 感谢Loaden的补充。此文是对帖子 http://wxforum.shadonet.com/viewtopic.php?t=22128 的总结和整理，按个人喜好做了取舍和重新排序。

说明：

1. 以下需要设置的地方均在Settings->Editor...弹出的对话框中。

2. 不少命令都可针对当前行或选中的代码块，下文简称当前行或选中块。

日常编辑
------------

* 按住Ctrl滚滚轮，代码的字体会随你心意变大变小，对保护视力特别有好处。 
* 在编辑区按住右键可拖动代码，省去拉（尤其是横向）滚动条之麻烦；相关设置：Mouse Drag Scrolling。 
* Ctrl+D可复制当前行或选中块。
* Ctrl+Shift+C注释掉当前行或选中块，Ctrl+Shift+X则解除注释。 
* Tab缩进当前行或选中块,Shift+Tab减少缩进。
* 可拖动选中块使其移动到新位置，按住Ctrl则为复制到新位置。
* 按下Atl，再拖动鼠标，可以实现部分选择（即只选中一个区域内的字符，而不会包含它们所在行的其他字符)。
* 需要更大编辑空间时，F2和Shift+F2分别可以显隐下方Logs & others栏和左方的Management栏。

自动完成与缩写
---------------

1. 优化代码自动完成功能：在Code-completion and symbol browser中， 
* 将Automatically launch when typed # letter中的4改成2，这样打两个字母就会有提示了。 
* 将Keyword sets to additionally include中1到9都勾上（可在Syntax highlighting 的keywords...中设置，其中1是C++关键字，3是Doxygen关键字；我曾将wxWidgets的类名都加入7并设置相应的字体（粗黑体），看代码时特别爽） 
* 将Delay for auto-kick-in when typing [.::->]拉到 200ms，这样快点出来提示 
* 选中Case-sensitive match，防止一些无关的东西干扰，如果你想它帮你纠正大小写，那就去掉勾 
* 在Keyboard short-cuts中将Edit->Code complete的快捷键由Ctrl+Space改为Alt+/，因为前者与中文输入法切换冲突，该快捷键为已经输入的（不是正在输入的）词提供自动完成。 
2. 看Abbreviation一栏，里面定义了许多缩写（还可以自定义），只要输入这些缩写，并按Ctrl+J，就可以自动完成常用的代码框架，并将光标放在恰当的地方（自定义时用|表达）。常用的有：guard、class、switch等。
3. 如果你声明了一个类，你可以在cpp文件中右击，Insert->All class methods without implementation...来插入你还没定义的方法的定义（省去不少打字的功夫哦），也可使用Insert->Class Method declaration/implementation...来插入一个方法的声明或定义。 

导航相关
----------

* Ctrl+G 到达指定行，ALT+G 到达指定文件，Ctrl+Alt+G 到达指定函数（支持头文件中的函数定义），F11 切换源文件与头文件。
* Ctrl+PageUp 到达上一个函数，Ctrl+PageDown 到达下一个函数。
* Ctrl+B 添加书签，Alt+PageUp和Alt+PageDown可以切换书签。
* Ctrl+Shift+B可找到匹配的括号。
* 看长代码时，可右击，Folding->Fold All，然后慢慢展开来看，也可充分利用左方Management栏的Symbol浏览器。 
* 在一个变量、函数或宏上右击，三个以Find开头的菜单项，分别可以为你转到它的声明、定义和找到所有出现的地方（按F2在下方Thread Search那里查看）。

其他
-----

* General Settings中可以设置缩进、自动换行等细节。 
* 让Code::Blocks永远记住你的Layout，尤其是debug的layout，善用debug工具栏。
* 备份C:\Documents and Settings\[你的用户名]\Application Data\codeblocks\Default.conf，如遇重装，将其放在codeblocks.exe所在目录，就不会丢失你的配置；这样也可以 打造出Code::Blocks的绿色版。