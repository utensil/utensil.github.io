---
title: 在Bash下输出彩色的文本
tags: bash
---

我们知道，Linux下的Bash里的命令ls默认是开启颜色显示的，用各种颜色来区分不同的文件类型，这说明Bash内置了彩色显示的功能。Bash不是GUI而是CLI，许多电脑高手都偏爱CLI，因为那种亲自以语句操纵世界的感觉无以伦比。可是，请想象一下，在没有语法高亮的情况下编写成千上万行的代码，那是什么感觉？编程会变成一种精神的折磨，并且极大提高出错率。

我研究在bash下输出彩色的文本的初衷，是想使自己在写一些Shell脚本时，能够在用户界面上做得漂亮些。后来，由于发现英文文献上介绍的方法有错漏之处，也很不人性化，于是不断调试，不断改进，最终我写出了一个 **支持命令行参数、管道和stdin重定向为文件，并具有较高容错性能** 的脚本。脚本本身的使用价值未必特别高，但在编写的过程中，为了达到我需要的目的，对Bash进行了大量试探，对它的许多特性有了深入的了解，并对许多问题形成了一整套的解决方案，为以后的其他应用的打下了基础。

echo的-n和-e选项
-----------------

输出彩色的文本，我们使用的命令是echo。大家都知道echo可以显示一些字符串，可以显示一些变量。例如：

```no-highlight
[root@VMFedora5 ~]# echo 'Hello! Here is the content!'
Hello! Here is the content!
[root@VMFedora5 ~]# var1="The number"
[root@VMFedora5 ~]# var2=7
[root@VMFedora5 ~]#echo "$var1 is $var2 ."
The number is 7 .
``` 

首先我们来了解一下-n这个选项，它的意思是让echo别换行。例如

```no-highlight
[root@VMFedora5 ~]#echo -n "Don't return:"
Don't return:[root@VMFedora5 ~]#
```

这个选项很有用。这样就可以在一行里显示五彩缤纷的字了。

然后我们来了解一下-e这个选项。这个选项是彩色的灵魂，加了这个选项，echo就要开始认一些转义字符。用英语说就叫enable escape sequence.

例如：

```bash
echo -e "/034"
```

这就是-e的作用了。
 
我写了个脚本试试，从/000试到/777。为什么只试到/777呢？因为这里用的其实是8进制的数。例如：

```bash 
#!/bin/bash
 
for (( i=0;i<=7;i=i+1 ))
do
     for (( j=0;j<=7;j=j+1 ))
     do
         for (( k=0;k<=7;k=k+1 ))
         do
         echo -n "$i$j$k   "
         echo -en "//$i$j$k   "
         done
     echo
     done
done
```

这个脚本的编写中最激动人心的是`echo -en "//$i$j$k   "`这一句，因为编程都是希望能够节省劳动，所以希望Bash能够自动化生成一些处理方式。比如这句命令里，Bash因为`””`而将`//`变成`/`，`$i`、`$j`、`$k`变成相应的数字，然后-e选项又将，比如，`/546`变成了相应的特殊字符输出。在这种试探的过程中，我们窥见了echo背后的运行机理。

用转义字符输出彩色文本
------------------------

我先说明一下我是怎么介绍一个命令的。黑体的，代表命令中固定的部份；下标的只是一个说明，代表这里这里会有几种选择，我会在后面注明所有的选择。

好了，这就是，彩色的完整命令：

```bash
echo -e "/E[3${FgColor};4${BgColor}m""/033[${turn_on}m${content}/033[${turn_off}m"
```

看到有点晕吧？

`/E[`的意思是：嗯，我要开始定义前景背景色了。

`3`代表是前景色，`4`代表是背景色。顺序不能颠倒。

`${FgColor}` 和 `${BgColor}` 的选择有：

* 0     黑色
* 1     红色
* 2     绿色
* 3     黄色
* 4     蓝色
* 5     洋红
* 6     青
* 7     灰色
* 8、9   白色

`;`是用来分割前景色和背景色的。

`m`是说，嗯，前景背景色定义完了。

`/033[`加上`${turn_on}`和`m`，意思是：嗯，我要开始用刚才定义的前景背景色写字了。后面紧跟着要写的内容`${content}`。

`/033[`加上`${turn_off}`和`m`，意思是：嗯，我写完了。

`${turn_on}`的选择有：

* 1     淡些、粗些
* 4     下划线
* 7     反相（颠倒前景色和背景色）
* 9     删除线
* 2、3、5、6、8     正常

`${turn_off}`的选择，只有一个：0

以上这些选择的效果，是我依据英文文献一个一个调试出来的，英文文献上漏了一些颜色，也没有提到`${turn_on}`的那么多选择。在具体的调试中，我还发现`${turn_on}`选项的结果有时会因`${FgColor}` 和 `${BgColor}`  的选择而发生细微的变化，尤其是在涉及到白色、灰色的时候。不过这是细节，就不举例子了。

我们来试一试输出前景红色背景白色的"Red"：

```no-highlight
[root@VMFedora5 ~]# echo -e "/E[31;49m""/033[5mRed/033[0m"
Red
```

试用脚本输出彩色文本
---------------------

难道我们每次都些这么辛苦吗？会折磨死人的……

我发现，下面这段代码的效果与上面是一样的

```no-highlight
[root@VMFedora5 ~]#i=31
[root@VMFedora5 ~]#j=49
[root@VMFedora5 ~]# echo -e "/E[""$i;$j""m""/033[""1""m""Red""/033[""0""m"
Red
```

这就意味着我们可以将每个控制单元分别设成变量，然后写一个Shell脚本，来代替这种笨拙的方式。

先写一个简单的，实现刚才那个效果的Shell脚本。

```bash
#!/bin/bash
#"Colorizing" Scripts
 
function Color()
{
Fg="3""$1"
Bg="4""$2"
SetColor="/E[""$Fg;$Bg""m"
UseColor="/033[""$3""m"
Content="$4"
EndColor="/033[0m"
 
echo -en "$SetColor""$UseColor""$Content""$EndColor"
 
}
```
```no-highlight 
Color 1 9 5 Red
[root@VMFedora5 ~]# chmod +x Color.sh
[root@VMFedora5 ~]# ./Color.sh
Red[root@VMFedora5 ~]#
```

注意，这个脚本中已经用到了参数传递。对于函数Color而言，$1是函数接收的第一个参数，$n是第n个，以此类推。

$1是前景色，$2是背景色, $3是样式（即turn_on），$4是字符串。

试使脚本能够容错和接受带空格的字符串
---------------------------------------------

在方才的脚本里，我们只要把脚本中最后一句改成`Color $@`，就可以输出任意颜色的字符。例如：

```bash
#!/bin/bash
#"Colorizing" Scripts
 
function Color()
{
Fg="3""$1"
Bg="4""$2"
SetColor="/E[""$Fg;$Bg""m"
UseColor="/033[""$3""m"
Content="$4"
EndColor="/033[0m"
 
echo -en "$SetColor""$UseColor""$Content""$EndColor"
 
}
 
Color $@

```

```no-highlight
[root@VMFedora5 ~]# ./Color.sh 1 9 5 Red
Red[root@VMFedora5 ~]#
```

但这里有两个前提，一是这个脚本的使用者要准确无误地懂得§2的内容，否则就会出错；二是只能输出连续的字符，不能输出带有空格的字符串，这是因为空格会使后继的字符变成$5、$6、$7……从而不能被函数接收到。

所以我们要试着使脚本能够容错和接受带空格的字符串。

我们先将刚才的函数Color改写成函数subColor：

```bash
function subColor()
{
Fg=$1
Bg=$2
SetColor="/E[""$Fg;$Bg""m"
UseColor="/033[""$3""m"
EndColor="/033[0m"
Content="$e"
echo -en "$SetColor""$UseColor"$Content"$EndColor"
 
}
``` 

注意这里的`Content="$e"`这一句，这一句说明，我们将专门生成全局变量$e来容纳带空格的字符串。

然后我们重新写一个Color，作为主函数。具体内容稍等，我们先将使脚本能够容错和接受带空格的字符串的两个模块写好。

容错部份，我们用函数ParaCheck来解决：

```bash
function ParaCheck()
{
if [ $a -le 0 ] || [ $b -le 0 ] || [ $c -le 0 ] || [ $a -gt 10 ] || [ $b -gt 10 ] || [ $c -gt 9 ]
then
    ShowHelp
else
    if [ $a -eq 10 ]
    then
        a=30
    else
        a=30+$a
    fi
    if [ $b -eq 10 ]
    then
        b=40
    else
        b=40+$b
    fi
fi
}
```
 

这个函数所用到的$a、$b、$c分别会在主程序Color那里被声明为整数，并赋值为$1、$2、$3：

```bash
declare -i a=$1
declare -i b=$2
declare -i c=$3
``` 

这一步相当于强制转换字符串类型的$1、$2、$3为整数类型。

经过试探，我发现，如果$1、$2、$3本身被输入为非数字的字符串，在强制转型的过程中，会变成0。这就是检错的原理，只要将$1、$2、$3等于0的情况排除，就排除了输入为非数字的字符串（空或非空皆然）的情形，然后再限制$1、$2、$3分别小于等于10、10、9。

所以我就必须将黑色的代码改变为10，并在程序中处理好，最终传递给subColor的，只要是黑色，还会是0。为此，我们将原来应该放置在subColor里的为前景色代码前加上3，为背景色代码前加上4的工作放置在ParaCheck里完成。

如果出了错，就会启动函数ShowHelp：

```bash
function ShowHelp()
{
echo "Error!"
echo "Your parameters were $a,$b,$c,they are unexpected parameters."
echo "Show help file or continue?(h|c)"
read Choice
case $Choice in
    h|H)
        echo "This is a script for coloring characters and strings."
        echo "There are four parameters.Parameters are seperated by spacebars."
        echo "The frst parameter is a number ranged from 1 to 10,represents the foreground color."
        echo "The second parameter is  a number ranged from 1 to 10,represents the background color."
        Color 1 8 2 "1    red";echo
        Color 2 8 2 "2    green";echo
        Color 3 8 2 "3    yellow";echo
        Color 4 8 2 "4    blue";echo
        Color 5 8 2 "5    magenta";echo
        Color 6 8 2 "6    cyan";echo
        Color 7 8 2 "7    gray";echo
        Color 8 8 2 "8    white";echo
        Color 9 8 2 "9    white";echo
        Color 10 8 2 "10   black";echo
        echo "The third parameter is a number ranged from 1 to 9,represents the style of the characters."
        Color 10 8 1 "1    lighter,and bold";echo
        Color 10 8 4 "4    draw a line under the string.";echo
        Color 10 8 7 "7    swap the foreground color and the background color";echo
        Color 10 8 9 "9    draw a deleting line";echo
        echo "The fourth parameter is the content you wanna clolor,a string."
        echo "Thanks for using this script ! "
        echo "script halted."
        exit 1
 
        ;;
    c|C)
        echo "script halted."
        exit 1
        ;;
    *)
        ShowHelp
esac
   
}
``` 

在这个函数中，已经使用了主程序，来显示彩色的帮助文档。之所以写成英文的，是为了能在不支持中文的界面也得以显示。可能有些英语语法错误，但基本意思是明了的。

接下来我们要生成一个带空格的字符串赋给$e，我们通过函数GenString来实现：

```bash
function GenString()
{
    e=""
    declare -i f=1
 
    for d in $@
    do
        if [ $f -eq 1 ] || [ $f -eq 2 ] || [ $f -eq 3 ]
        then
            e=$e
        elif [ $f –eq 4 ]
        then
            e=”$e$d”
        else
            e="$e $d"
        fi
       
        let f=$f+1
    done
 
}
``` 

对于脚本接收的参数$n，我始终未能试探到将n作为变量加以控制的方法，从函数中可以看出，我是通过另设变量加for循环的方式解决的。我们遍历$@里所有的参数，前3个直接忽略，第4个赋给e，后继的参数都加上一个空格跟在e后面。

此时脚本全文为：

```bash
#!/bin/bash
#"Colorizing" Scripts
 
#First,define functions.
 
function subColor()
{
Fg=$1
Bg=$2
SetColor="/E[""$Fg;$Bg""m"
UseColor="/033[""$3""m"
EndColor="/033[0m"
Content=$e
echo -en "$SetColor""$UseColor"$Content"$EndColor"
 
}
 
function ShowHelp()
{
echo "Error!"
echo "Your parameters were $a,$b,$c,they are unexpected parameters."
echo "Show help file or continue?(h|c)"
read Choice
case $Choice in
    h|H)
        echo "This is a script for coloring characters and strings."
        echo "There are four parameters.Parameters are seperated by spacebars."
        echo "The frst parameter is a number ranged from 1 to 10,represents the foreground color."
        echo "The second parameter is  a number ranged from 1 to 10,represents the background color."
        Color 1 8 2 "1    red";echo
        Color 2 8 2 "2    green";echo
        Color 3 8 2 "3    yellow";echo
        Color 4 8 2 "4    blue";echo
        Color 5 8 2 "5    magenta";echo
        Color 6 8 2 "6    cyan";echo
        Color 7 8 2 "7    gray";echo
        Color 8 8 2 "8    white";echo
        Color 9 8 2 "9    white";echo
        Color 10 8 2 "10   black";echo
        echo "The third parameter is a number ranged from 1 to 9,represents the style of the characters."
        Color 10 8 1 "1    lighter,and bold";echo
        Color 10 8 4 "4    draw a line under the string.";echo
        Color 10 8 7 "7    swap the foreground color and the background color";echo
        Color 10 8 9 "9    draw a deleting line";echo
        echo "The fourth parameter is the content you wanna clolor,a string."
        echo "Thanks for using this script ! "
echo "Script halted."
exit 1
 
 
        ;;
    c|C)
        echo "script halted."
        exit 1
        ;;
    *)
        ShowHelp
esac
   
}
 
function ParaCheck()
{
if [ $a -le 0 ] || [ $b -le 0 ] || [ $c -le 0 ] || [ $a -gt 10 ] || [ $b -gt 10 ] || [ $c -gt 9 ]
then
    ShowHelp
else
    if [ $a -eq 10 ]
    then
        a=30
    else
        a=30+$a
    fi
    if [ $b -eq 10 ]
    then
        b=40
    else
        b=40+$b
    fi
fi
}
 
function GenString()
{
    e=""
    declare -i f=1
 
    for d in $@
    do
        if [ $f -eq 1 ] || [ $f -eq 2 ] || [ $f -eq 3 ]
        then
            e=$e
        elif [ $f –eq 4 ]
        then
            e=”$e$d”
        else
            e="$e $d"
        fi
       
        let f=$f+1
    done
 
}
 
function Color()
{
declare -i a=$1
declare -i b=$2
declare -i c=$3
ParaCheck
GenString $@
subColor $a $b $c $e
}
 
#Here is where the script begins.
 
Color $@
```

测试一下：

```no-highlight
[root@VMFedora5 ~]# chmod +x Color.sh
[root@VMFedora5 ~]# ./Color.sh 2 8 2 This is Green.
 This is Green.[root@VMFedora5 ~]# ./Color.sh 2 8 2 This is Green.;echo
This is Green.
```

这说明程序能正常工作。再看看出了错的话，程序是怎么处理的：

```no-highlight
[root@VMFedora5 ~]# ./Color.sh uwei wjeu wieuf woiewoe
Error!
Your parameters were $a,$b,$c,they are unexpected parameters.
Show help file or continue?(h|c)
h
This is a script for coloring characters and strings.
There are four parameters.Parameters are seperated by spacebars.
The frst parameter is a number ranged from 1 to 10,represents the foreground color.
The second parameter is  a number ranged from 1 to 10,represents the background color.
1 red
2 green
3 yellow
4 blue
5 magenta
6 cyan
7 gray
8 white
9 white
10 black
The third parameter is a number ranged from 1 to 9,represents the style of the characters.
1 lighter,and bold
4 draw a line under the string.
7 swap the foreground color and the background color
9 draw a deleting line
 
The fourth parameter is the content you wanna clolor,a string.
Thanks for using this script!
[root@VMFedora5 ~]# ./Color.sh
Error!Show help file or continue?(h/c)
c
Script halted.
[root@VMFedora5 ~]# ./Color.sh
Error!
Your parameters were $a,$b,$c,they are unexpected parameters.
Show help file or continue?(h|c)
f
Error!
Your parameters were $a,$b,$c,they are unexpected parameters.
Show help file or continue?(h|c)
c
Script halted.
[root@VMFedora5 ~]#mv Color.sh color
```

最后那里，我将脚本更名为color，准备将来放进/bin/下面，作为一个一般性的命令来使用。

试使脚本能够接受管道、stdin重定向
------------------------------------

脚本写到这个程度应该过得去了吧？可是我发现，这个脚本并不能接受管道：

```no-highlight 
[root@VMFedora5 ~]# cat file|./color 3 4 7
[root@VMFedora5 ~]#
```
 
这摧毁了我准备把它当作一般性命令使用的初衷，所以我决定继续改写。而且我还设想，我的这个脚本应当能够接受stdin重定向为一个如下形式的文件：

``` 
3 4 1 Here is
6 10 4 the end of this line.Tn
10 10 5 Test
```
 
从而能自动显示多彩的文字。
 
在这个文件中，只要是以Tn结尾的一行，就会换行。上面这个文件的显示结果应当是：

```no-highlight  
[root@VMFedora5 ~]# ./color <file
Here is the end of this line.
Test[root@VMFedora5 ~]#
```
 
首先要改写主程序Color：

```bash 
function Color()
{
declare -i a=$1
declare -i b=$2
declare -i c=$3
 
    
     if [ -c /dev/stdin ]
     then
         ParaCheck
         GenString $@
         subColor $a $b $c $e
     else
         if [ -p /dev/stdin ]
         then
              ParaCheck
              e=`cat /dev/stdin`
              subColor $a $b $c $e
         else
              if [ -f /dev/stdin ]
              then
                   cat /dev/stdin 1>sth.sth
                   ReadRich
                   yes|rm sth.sth 2>/dev/null
                   yes|rm tmp.tmp 2>/dev/null
                   yes|rm op1.awk 2>/dev/null
                   yes|rm op2.awk 2>/dev/null
              else
                   ParaCheck
                   GenString $@
                   subColor $a $b $c $e
             
              fi
         fi
     fi
 
 
}
```

这里主要使用的是-c、-p、-f这三个判断，分别判断/dev/stdin是否是字符设备（这里即键盘），是否是管道，和是否是文件。我为了找到这个方法可是伤透了脑筋……
 
如果是键盘，这说明既没有使用管道也没有使用stdin重定向，而使用的是命令行参数。于是就和原来一样，检查参数并生成字符串。
 
如果是管道，这说明要将stdin的内容接受为字符串，事实上，这样的一个后果是原文中如果有换行，就直接被无视了。不过这不重要，所以我也就没有做特别的修正了。
 
如果是文件，这就说明是stdin重定向为文件了，于是将该文件内容写进sth.sth这个临时文件。并启用函数ReadRich来解读这个文件。最后将ReadRich生成的临时文件都删除。
 
如果都不是，这就很危险了，这说明是由ShowHelp里（请到本文最后的脚本清单处找，ShowHelp为了适应新情况，做了不少改动）那些关闭了stdin的语句来调用主函数Color的，于是就和原来一样，检查参数并生成字符串。
 
ReadRich就是处理文件的核心程序了。为了它，我还临时抱佛脚地去学了Awk。基本上是要靠两个子函数AwkGenL和AwkGenC来生成对op1.awk和op2.awk，分别是用来将每行记录分割开来和在每行记录中读取每个区块。同时还使用了wc和cut……其实用awk是因为一开始没有发现cut的威力……
 
```bash 
function AwkGenL()
{
echo "BEGIN {" 1>op1.awk
echo 'FS="/n"' 1>>op1.awk
echo 'RS="EOF"' 1>>op1.awk
echo "}" 1>>op1.awk
Item=$1
echo "{print /$"$Item"}" 1>>op1.awk
}
 
 
function AwkGenC()
{
Item=$1
echo "{print /$"$Item"}" 1>op2.awk
}
 
 
function ReadRich()
{
declare -i lines=`wc -l sth.sth|awk '{print $1}'`
for ((i=1; i<=$lines;i=$i+1))
do
     AwkGenL $i
     AwkGenC 1
     awk -f op1.awk sth.sth 1>tmp.tmp
     declare -i a=`awk -f op2.awk tmp.tmp`
     AwkGenC 2
     declare -i b=`awk -f op2.awk tmp.tmp`
     AwkGenC 3
     declare -i c=`awk -f op2.awk tmp.tmp`
     ParaCheck
     declare -i words=`wc -m tmp.tmp|awk '{print $1}'`
     words=$words-1
     declare -i ParaPos=`awk '{print $1" "$2" "$3}' tmp.tmp|wc -m|awk '{print $1}'`
     ParaPos=$ParaPos+1
     declare -i w=$words-1
     Tn=`cut -c$w-$words tmp.tmp`
 
     if [ "$Tn" = "Tn" ]
     then
         words=$words-2
         e=`cut -c$ParaPos-$words tmp.tmp`
         subColor $a $b $c $e
         echo
     else
         e=`cut -c$ParaPos-$words tmp.tmp`
         subColor $a $b $c $e
     fi  
done
}
``` 
 
至此，整个脚本终于完成。脚本全文为：

```bash
#!/bin/bash
#"Colorizing" Scripts
 
#First,define functions.
 
 
function subColor()
{
Fg=$1
Bg=$2
SetColor="/E[""$Fg;$Bg""m"
UseColor="/033[""$3""m"
EndColor="/033[0m"
Content=$e
echo -en "$SetColor""$UseColor"$Content"$EndColor"
 
}
 
 
function ShowHelp()
{
echo "Error!"
echo "Your parameters were $a,$b,$c,they are unexpected parameters."
echo "Show help file or continue?(h|c)"
if [ -c /dev/stdin ]
then
read Choice
else
     Choice="h"
fi
 
case $Choice in
     h|H)
         echo
echo "This is a script for coloring characters and strings."
         echo "There are four parameters.Parameters are seperated by spacebars."
         echo "The frst parameter is a number ranged from 1 to 10,represents the foreground color."
         echo "The second parameter is  a number ranged from 1 to 10,represents the background color."
         Color 1 8 2 "1    red" <&-;echo
         Color 2 8 2 "2    green" <&-;echo
          Color 3 8 2 "3    yellow" <&-;echo
         Color 4 8 2 "4    blue" <&-;echo
         Color 5 8 2 "5    magenta" <&-;echo
         Color 6 8 2 "6    cyan" <&-;echo
         Color 7 8 2 "7    gray" <&-;echo
         Color 8 8 2 "8    white" <&-;echo
         Color 9 8 2 "9    white" <&-;echo
         Color 10 8 2 "10   black" <&-;echo
         echo "The third parameter is a number ranged from 1 to 9,represents the style of the characters."
         Color 10 8 1 "1    lighter,and bold" <&-;echo
         Color 10 8 4 "4    draw a line under the string." <&-;echo
         Color 10 8 7 "7    swap the foreground color and the background color" <&-;echo
         Color 10 8 9 "9    draw a deleting line" <&-;echo
         echo "The fourth parameter is the content you wanna clolor,a string."
         echo "Thanks for using this script! "
         echo "Script halted."
          exit 1
 
 
         ;;
     c|C)
         echo "Script halted."
         exit 1
         ;;
     *)
         ShowHelp
esac
    
 
}
 
 
function ParaCheck()
{
if [ $a -le 0 ] || [ $b -le 0 ] || [ $c -le 0 ] || [ $a -gt 10 ] || [ $b -gt 10 ] || [ $c -gt 9 ]
then
     ShowHelp
else
     if [ $a -eq 10 ]
     then
         a=30
     else
         a=30+$a
     fi
     if [ $b -eq 10 ]
     then
         b=40
     else
         b=40+$b
     fi
fi
}
 
 
function GenString()
{
     e=""
     declare -i f=1
 
     for d in $@
     do
         if [ $f -eq 1 ] || [ $f -eq 2 ] || [ $f -eq 3 ] || [ $d = "" ]
         then
              e=$e
         elif [ $f -eq 4 ]
         then
              e="$e$d"
         else
              e="$e $d"
         fi
        
         let f=$f+1
     done
 
}
 
 
function AwkGenL()
{
echo "BEGIN {" 1>op1.awk
echo 'FS="/n"' 1>>op1.awk
echo 'RS="EOF"' 1>>op1.awk
echo "}" 1>>op1.awk
Item=$1
echo "{print /$"$Item"}" 1>>op1.awk
}
 
 
function AwkGenC()
{
Item=$1
echo "{print /$"$Item"}" 1>op2.awk
}
 
 
function ReadRich()
{
declare -i lines=`wc -l sth.sth|awk '{print $1}'`
for ((i=1; i<=$lines;i=$i+1))
do
     AwkGenL $i
     AwkGenC 1
     awk -f op1.awk sth.sth 1>tmp.tmp
     declare -i a=`awk -f op2.awk tmp.tmp`
     AwkGenC 2
     declare -i b=`awk -f op2.awk tmp.tmp`
     AwkGenC 3
     declare -i c=`awk -f op2.awk tmp.tmp`
     ParaCheck
     declare -i words=`wc -m tmp.tmp|awk '{print $1}'`
     words=$words-1
     declare -i ParaPos=`awk '{print $1" "$2" "$3}' tmp.tmp|wc -m|awk '{print $1}'`
     ParaPos=$ParaPos+1
     declare -i w=$words-1
     Tn=`cut -c$w-$words tmp.tmp`
 
     if [ "$Tn" = "Tn" ]
     then
         words=$words-2
         e=`cut -c$ParaPos-$words tmp.tmp`
         subColor $a $b $c $e
         echo
     else
         e=`cut -c$ParaPos-$words tmp.tmp`
         subColor $a $b $c $e
     fi  
done
}
 
 
function Color()
{
declare -i a=$1
declare -i b=$2
declare -i c=$3
 
    
     if [ -c /dev/stdin ]
     then
         ParaCheck
         GenString $@
         subColor $a $b $c $e
     else
         if [ -p /dev/stdin ]
         then
              ParaCheck
              e=`cat /dev/stdin`
              subColor $a $b $c $e
         else
              if [ -f /dev/stdin ]
              then
                   cat /dev/stdin 1>sth.sth
                   ReadRich
                   yes|rm sth.sth 2>/dev/null
                   yes|rm tmp.tmp 2>/dev/null
                   yes|rm op1.awk 2>/dev/null
                   yes|rm op2.awk 2>/dev/null
              else
                  ParaCheck
                   GenString $@
                   subColor $a $b $c $e
              fi
         fi
     fi
 
 
}
 
#Here is where the script begins.
 
Color $@
```

后记
-------

我非常喜欢Shell，我觉得这种语言在设计理念上就非常优秀，何况由于它和系统是紧密结合的，可以让我亲自用语句来操纵系统，那种感觉真的是无以伦比，不像C++，虽然我更喜欢C++，觉得它是最完美的形而上学，但自学了C++以来，还没在什么具体的方面用到它……而我一接触Shell，马上就在某网络场合需要它……

此脚本经过在Fedora Core 5的图形界面的控制台下反复调试，最终运行完美。可是调试的过程实在是吐血，有时候此处一个极其微小的错误，却在相差十万八千里的彼处报错，结果一找就是半个小时……好了，终于写完了。
 
参考文献
-----------

1.    英文文献http://www.80x86.cn/article.asp?id=316
2.    《鸟哥的Linux私房菜》
3.    《高级Bash脚本编程指南(一) 》 http://blog.chinaunix.net/u/27852/showart_213701.html
4.    Awk中文手册
5.    大量网站
6.    其实，最重要的参考文献是Bash，因为，没有在Bash下的不断试探，根本找不出解决许多问题的办法。