---
title: 一个用sed给xml的标签编号的Bash脚本
tags: bash
---

> 2012年9月按：这件事情的实际功效不值一提。这样的事情更适合用一门真正的脚本语言（ruby、python等等）来做，用bash来做有点别扭。不过在生产上，有时除了bash和那些最为普遍的unix命令行工具，你并没有脚本语言环境，纵然有，你也没有外网环境来安装一些第三方包。这就是为什么，实际工作中的我们往往需要熟练迅速地把unix那些原始而专注的小工具组装成特殊场合适用的军刀。说起来感叹当初没有工作经验的自己，这么一点小功能这么慢做完，都会发篇博客纪念一下，那这几年工作中熟练而迅速的组装，可以写多少博客了？

记录一下这个小脚本，试探了很久才研究出这个方法来给我的一个xml文件编号。

这个文件最初是从博客上直接复制粘贴下来的，根据其格式先对其html tag替换做好标记，然后用一句sed转换成xml的：

```bash
cat susan.txt|
sed -e 's/title/(.*/)$/<//content>/r/n<//blog>/r/n<blog>/r/n<title>/1<//title>/'|
sed -e 's/timestamp/(.*/)/<timestamp>/1<//timestamp>/r/n<content>/'|
sed -e 's/[ ]+/  /' > susanfmt.xml
```

当然，还要稍作调整。

但接着我需要对博客进行编号，即每一个<blog>我都需要变成<blog id="编号">，sed自己是干不了了，所以结合一点Bash：

```bash
declare -i j=1

for ((i=$(cat susanfmt.xml|tee susanalt.xml|wc -l);i>=1;i--)) 
do
  sed -i -e "$i""s/<blog>/<blog id==/"$i/">/" susanalt.xml
  grep "<blog id==/"$i/">" susanalt.xml
  if [ $? -eq 0 ]
  then
    sed -i -e "$i""s/<blog id==/"$i/">/<blog id=/"$j/">/" susanalt.xml
    j=$j+1
  fi
done
```

以上，先将目的文档susanfmt.xml复制到susanalt.xml，同时计算出行数。从最后一行到第一行，先将遇到的`<blog>`替换成`<blog id=="该行行数">`，注意多了一个=号，这是防止与最终结果相冲突。这明显不是我们要的，用grep的返回值确认的确做了一次替换后，将id=="行数"改成id="编号"。有点怪异，而且重复工作也多，效率较低，但是这是目前唯一想到的办法。