---
title: RailsCast 笔记【不完整】
tags: ruby, 自学记录
---

走过了弯路，看过了那些粗制滥造、过时、或者至少不够有深度的书之后，才知道：Ruby for Rails+The Ruby Programming Language+Agile Web Development with Rails+RailsCast这一个套装，才是学习Ruby on Rails最快最好的途径。其中RailsCast是免费的视频，目前已有152集。它的最大价值是让你直观地感觉到Rails中隐藏的力量。如果你整个 系列走下来，当你遇到一个问题时，你知道在Rails中大约可以以什么方式做到。当你心中有了明确的方向，只需要手持API Reference Manual，就可以解决一路上的问题。
 
寒假到现在用Ruby on Rails为导师完成了一个小型教学网站，主要有课程管理、博客发表、课件上传下载、作业布置和上交以及留言系统。以后可能再在这里添加一份完整的功能介 绍吧。这个网站倾注了我大量的心血，解决了无数稀奇古怪的bug，对网站也做了许多次重构，实现了许多细小的功能，经过这番历练，我终于对基于MVC的网 站开发有了一个较为全局的认识，对Rails也非常熟悉了，也部分实践了我在《Web 2.0网站开发心得》中对Ajax的适度使用的原则。遗憾的是，由于时间的缘故，我无法把所有我想实现的特性都实现，项目已经需要投入实际使用当中了。希 望它在性能和稳定性方面能够不让人失望吧。以后再添加一个尚未全部实现的特性列表到这里吧。如果有时间，我想把整个网站在Ruby 1.9 on Rails 2.3下用BDD的方式重新开发一次，对网站整体做更大的重构，同时完整地使用Git来进行版本管理，同时借助于自己计划编写的GitRoller来制作 一系列视频。
 
主要使用的技术：
 
Ruby 1.8.6 on Rails 2.2 . Most of the ideas are inspired by Rails Cast
 
Rails plugins or gems used:

* jRails
* will_paginate
* paperclip
* mimetype-fu
* populator
* faker
* JavaScript Library Used:
* jQuery
* TinyMCE
* TableSorter
* jCalendar

Layout based on YAML . Some CSS are stolen from WebCredible and Firefox 
Plugins(Germany).

以下列表基于时间倒序整理。

新特性介绍
-------------

* 152. Rails 2.3 Extras
* 151. Rack Middleware
* 150. Rails Metal
* 149. Rails Engines
* 148. App Templates in Rails 2.3
* 140. Rails 2.2 Extras

JavaScript 、Ajax
-------------------

* 147. Sortable Lists
* 136. jQuery
* 114. Endless Page
* 103. Site Wide Announcements
* 88. Dynamic Select Menus
* 45. RJS Tips
* 44. Debugging RJS
* 43. AJAX with RJS

电子商务
--------------------

* 146. PayPal Express Checkout
* 145. Integrating Active Merchant
* 144. Active Merchant Basics
* 143. PayPal Security
* 142. PayPal Notifications
* 141. PayPal Basics

Git 、Contribute
-------------------

* 113. Contributing to Rails with Git
* 105. Gitting Rails 2.1 RC1
* 96. Git on Rails
* 50. Contributing to Rails
* 36. Subversion on Rails

DIY
-----

* 135. Making a Gem：制作一个Gem。你对Rails的扩充，只要符合一定的文件布局，就能又可以当插件用，又可以当gem用。
* 33. Making a Plugin：制作插件的方法。define_method、read_attribute、instance_variable_set等等。
* 62. Hacking ActiveRecord：如何为ActiveRecord增加方法。
* 58. How to Make a Generator：做一个自己的Generator。本质：erb。

分页、预览、搜索、附件
-----------------------

* 120. Thinking Sphinx：全文搜索
* 111. Advanced Search Form：多个条件综合搜索。本质：动态merge hash。
* 37. Simple Search Form：单一条件搜索。本质：SQL之LIKE。
* 38. Multibutton Form：预览功能。本质：在同一个action中根据params的不同而展现不同的行为。
* 51. will_paginate：分页。
* 134. Paperclip：DSL风格轻松附件上传、验证、缩略图生成。我探索了的高级用法：任意多个附件、附件重命名等。

部署
-----

* 133. Capistrano Tasks
* 123. Subdomains
* 122. Passenger in Development

REST 、路由
------------

* 34. Named Routes：有名路由。例如对于:controller => :users, :action => new，可以命名为login，这样url就是/login了，一种美化。
* 79. Generate Named Routes：对map做send，动态生成named route，防止重名。
* 63. Model Name in URL：让url中可以包含有意义的信息，而不只是id。
* 70. Custom Routes：让url中可以包含多个参数作为路径，如2007/01/08。本质：":year/:month/:day"。
* 46. Catch-all Route：让url中此后的全部路径成为一个数组。例如对于"/*path"，"/a/b/c"的params[:path]就是['a','b','c']。
* 35. Custom REST Actions
* 139. Nested Resources
* 95. More on ActiveResource
* 94. ActiveResource Basics
* 92. make_resourceful
* 117. Semi-Static Pages
 
控制器
-------

* 131. Going Back：重定向到用户之前浏览的页面。
* 87. Generating RSS Feeds：创建RSS。
* 78. Generating PDF Documents：创建PDF。
* 77. Destroy Without JavaScript：在没有javaScript的情况下，如何让用户确认删除。

用户、Session 、Authentication相关
------------------------------------

* 84. Cookie Based Session Store： 没什么意思。讨论了一下session的存储机制。
* 19. Where Administration Goes：  管理员与普通用户共享一个界面。额外收获：action_model_path(var_model)。
* 20. Restricting Access：   根据是否管理员显隐一些部分，以及阻止一些action的perform。helper_method :admin?、before_filter :authorize, :except => :index。
* 21. Super Simple Authentication：  管理员的简单认证。通过session等各种方式判断是否管理员。session的创建与销毁。
* 67. restful_authentication：  介绍了restful_authenticate这个插件，非常好用的多用户管理。
* 68. OpenID Authentication：  基于OpenID的认证。
* 82. HTTP Basic Authentication：  内嵌在http协议中的基于用户名和密码的简单认证。2.3现在实现了HTTP Digest Authentication，保密程度更高。
* 119. Session Based Model：  可以让非注册用户在发表留言后一定时间内仍然可以回来修改留言。
* 65. Stopping Spam with Akismet：  阻止垃圾留言。
* 61. Sending Email：  发送邮件。
* 124. Beta Invitations： 邀请系统。

视图
-----

* 132. Helpers Outside Views
* 125. Dynamic Layouts
* 118. Liquid
* 100. 5 View Tips
* 69. Markaby in Helper
* 64. Custom Helper Modules
* 40. Blocks in View
* 32. Time in Text Field
* 31. Formatting Time
* 30. Pretty Page Title
* 18. Looping Through Flash
* 8. Layouts and content_for
* 7. All About Layouts

重构
-----

* 91. Refactoring Long Methods
* 75. Complex Forms Part 3
* 74. Complex Forms Part 2
* 73. Complex Forms Part 1
* 101. Refactoring Out Helper Object
* 12. Refactoring User Name Part 3
* 11. Refactoring User Name Part 2
* 10. Refactoring User Name Part 1
* 80. Simplify Views with Rails 2.0
* 55. Cleaning Up the View
* 99. Complex Partials

后台Rake
-----------

* 66. Custom Rake Tasks：如何写Rake任务。
* 127. Rake in Background：在后台运行Rake来执行耗时任务。
* 128. Starling and Workling：通过Rake的后台队列来异步执行Rakes。
* 129. Custom Daemon ：后台的daemon。和128的区别就像cron和at的区别。
* 130. Monitoring with God：监视daemon。

模型、数据库层
---------------

* 126. Populating a Database
* 109. Tracking Attribute Changes
* 121. Non Active Record Model
* 112. Anonymous Scopes
* 108. named_scope
* 107. Migrations in Rails 2.1
* 83. Migrations in Rails 2.0
* 16. Virtual Attributes
* 15. Fun with Find Conditions
* 14. Performing Calculations on Models
* 4. Move Find into Model
* 3. Find Through Association
* 2. Dynamic find_by Methods
* 59. Optimistic Locking
* 41. Conditional Validations

关联
------

* 52. Update through Checkboxes：一对多。通过checkbox来更新关联的items。"item_ids[]"。
* 57. Create Model Through Text Field ：一对多。Choose_or_create。collection_select。
* 102. Auto-Complete Association：一对多。Find_or_create_by。自动完成。
* 17. HABTM Checkboxes：多对多。产品与Catagory。
* 47. Two Many-to-Many：多态的多对多。

Scope 、group
--------------

* 76. scope_out
* 42. with_options
* 5. Using with_scope
* 29. group_by Month
* 28. in_groups_of
* 6. Shortcut Blocks with Symbol to_proc
 
性能
----

* 1. Caching with Instance Variables：  用||=的方式缓存查询结果。
* 115. Caching in Rails 2.1：  用fectch cache的方式缓存结果。
* 137. Memoization：  用memorize的方式缓存结果。
* 89. Page Caching： 缓存页面。caches_page。如何用sweeper来清除过期页面。expire_page。
* 93. Action Caching：  缓存动作。
* 90. Fragment Caching：  缓存一个partial、或者说片段。 
* 98. Request Profiling：  如何测试网站的性能瓶颈。
* 97. Analyzing the Production Log：  分析生产状态下运行的网站的日志查找网站的性能瓶颈。
* 23. Counter Cache Column：  例如，缓存博客拥有的评论数目。这样显示博客目录时，不必为每一个博客COUNT一次评论数目。
* 22. Eager Loading：   例如，一个课程拥有多个课件，如果find时使用了:include => :课件, :select => 'id, title'，显示课程目录时，也可以同时读取相关课件的标题信息。用于减少一个页面发起SQL查询的数目。

Log 、调试
-----------

* 24. The Stack Trace： 如何理解堆栈追溯。
* 9. Filtering Sensitive Logs： 在日志中过滤掉敏感信息。
* 104. Exception Notifications：  当网站发生问题，发个邮件给管理员。exception_notifier和exception_logger。 
* 86. Logging Variables：  如何在日志中输出变量的值。eval(..., binding)。
* 56. The Logger：  如何自定义和查看日志。
* 54. Debugging with ruby-debug：  如何调试Ruby。
* 53. Handling Exceptions：  用ruby的异常机制处理异常。
* 49. Reading the API：  比较好用的Rails文档
* 48. Console Tricks：  使用控制台script/console的技巧。

测试
------

* 116. Selenium
* 81. Fixtures in Rails 2.0
* 71. Testing Controllers with RSpec
* 60. Testing without Fixtures

设置
-------

* 85. YAML Configuration File：  如何读取自己的YAML配置文件。我尝试了的高级使用：根据用户设置生成YAML配置，保证网站重启后用户的设置仍然有效。
* 72. Adding an Environment：   除了通常的development、production、test三种网站运行环境之外，添加一个staging环境用于演示。
* 138. I18n：    国际化。
* 106. Time Zones in Rails 2.1：  设置时区。或让用户自己指定时区。
* 39. Customize Field Error：    自定义当表单提交验证失败时显示错误信息的方式。
* 110. Gem Dependencies：  通过config.gem指定网站依赖的gem，对其存在进行验证，并可通过rake gems:install安装所需的gem。方便部署。

安全
-----

* 27. Cross Site Scripting：    如何使用h函数和sanitize函数来消除用户提交内容中带来安全风险的javascript脚本。
* 26. Hackers Love Mass Assignment：   通过attr_protected和attr_accessible防止黑客可以给某些字段赋值。
* 25. SQL Injection：   通过使用?来防止SQL注入式的攻击。
* 13. Dangers of Model in Session：  千万不要把模型保存在session里面。 