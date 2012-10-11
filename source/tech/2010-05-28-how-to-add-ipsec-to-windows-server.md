---
title: 如何为Windows服务器添加ipsec
tags: 技巧
---

Linux下本机有防火墙iptables，有时候需要关注，这个众所周知。

Windows下的ipsec，却不是各个都熟悉。

但是，每次新增一个IP访问，除了配置路由，还需要配置ipsec。

```
rem 先给新加的filter起个名字
netsh ipsec static add filterlist name=allow_xxx_server_to_80

rem 然后添加源与目的
netsh ipsec static add filter filterlist=allow_xxx_server_to_80 srcaddr=来源机器IP srcmask=32 dstaddr=本机IP dstmask=32 dstport=80 protocol=TCP
rem 诸如此类可以添加一串

rem 设置规则，这里的动作是m_permit，从属于Windows_Center这个策略
netsh ipsec static add rule name=allow_xxx_server policy=Windows_Center filterlist=allow_xxx_server_to_80 filteraction=m_permit

rem 让策略生效
netsh ipsec static set policy name=Windows_Center assign=y
```

那么如何找到动作(filteraction)和策略(policy)的名字呢？

```
C:\Documents and Settings\Administrator>netsh ipsec  static show

The following commands are available:

Commands in this context:
show all       - Displays details of all policies and related information.
show filteraction - Displays filter action details.
show filterlist - Displays filter list details.
show gpoassignedpolicy - Displays details of a group assigned policy.
show policy    - Displays policy details.
show rule      - Displays rule details.
show store     - Displays the current policy store.
```

搜索关键字：

* Windows server 2003
* 设置
* IP安全
* 策略