---
title: 如何快速切换hosts
tags: 技巧
---

开发或者测试的时候，经常需要在生产环境、开发环境和测试环境等环境中切换，切换自然是靠修改`C:\WINDOWS\system32\drivers\etc\hosts`了。

但是hosts切换不能立即生效，需要重启浏览器，甚至还要清缓存等，很不方便。

下面介绍一种每次改完hosts能够立即生效，甚至可以前一个页面在生产，改了hosts之后，下一个页面就跳到开发环境。

其基本方法就是要操作系统不缓存任何DNS的解析结果，每次遇到域名，都进行全新解析，这样就能起到这个效果。

打开`regedit`，修改注册表，

找到

```no-highlight
HKeyCurrentUser\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings
```

设置如下几个键值：

```no-highlight
DnsCacheEnabled 0x0 (REG_DWORD)

DnsCacheTimeout 0x0 (REG_DWORD)

ServerInfoTimeOut 0x0 (REG_DWORD)
```

即可。

简单解释一下：

* `DnsCacheEnabled 0x0 (REG_DWORD)` 意思是disabled掉 DNS缓存
* `DnsCacheTimeout 0x0 (REG_DWORD)` 意思是设置 DNS缓存超时时间为0，即永远都是超时、失效的。
* `ServerInfoTimeOut 0x0 (REG_DWORD)` 意思是设置 域名/服务器信息缓存的超时时间为0，即永远都是超时、失效的。

没有其它影响，但由于hosts生效快，可能少暴露一些bug，呵呵~
