---
title: 把 Middleman 升上去，把旧页面留下来
tags: web, ruby, middleman, AI
---

这个博客的 Middleman 升级，我想做已经很久了。

它不是一个很新的站点。技术博客、文字博客、英文博客，Markdown、Haml、SCSS、middleman-blog、代码高亮、公式、日历、tags、中文路径和中文锚点，都在这里运行了许多年。它一直能生成，一直能发布，于是也一直可以暂时不动。

但这种稳定并不可靠。Ruby、Middleman、Haml、Sass 和一堆 gem 被固定在旧时间里，越久越像一块不能碰的积木。之前我也试过几次升级，每次都很快碰到依赖问题：这个版本能装，那个版本不兼容；这个 gem 还能跑，另一个 gem 已经不适合新的 Ruby；某个报错看起来可以绕过去，但绕过去以后，又不知道页面是不是仍然以原来的方式生成。

真正让我迟迟没有继续做下去的，不是某一个报错，而是不确定这些旧页面能不能整体活下来。尤其是 Haml 参与了许多 layout 和页面组织，Markdown 里也混入过 HTML，middleman-blog 又负责把文件名、日期、tag 和 URL 接在一起。只要其中一层的语义变了，页面也许仍然能生成，但生成出来的已经不是原来的博客。

## 为什么拖了这么久

静态博客容易给人一种错觉：既然最后只是 HTML、CSS 和 JavaScript，那么只要旧的生成结果还在，生成器本身就不那么重要。

但静态的是生成结果，不是生成器。生成器、模板引擎和依赖版本一起决定了这些 HTML 怎样被写出来。这个站点的历史越久，里面没有写明的约定就越多：Haml helper 输出的是 HTML 还是字符串，Markdown filter 如何处理内嵌 HTML，文章文件名如何变成公开 URL，中文 tag 怎样对应到页面内锚点，浏览器会把某个资源当作页面打开还是当作文件下载。

这些约定平时不显眼，因为它们都在正常工作。一旦升级，它们就从背景里浮出来。

所以我以前每次想升级，都会很快退回去。不是因为不想动，而是因为没有把握说明“动完之后还是同一个站点”。

## 要升级的是依赖，要保住的是页面

这次升级一开始就应该明确：目标不是把 `Gemfile` 里的版本号改新，而是让旧页面在新的依赖下保持原来的行为。

这里的“页面”不是抽象地说文字还在。它包括原来的 URL、浏览器看到的 `text/html; charset=utf-8`、可读的中文正文、没有被转义出来的 HTML 标签，以及索引、日历、tags 这些入口仍然通向原来的内容。

内部实现可以改，依赖组合可以改，配置写法也可以改。但公开路径、正文渲染、页面结构和浏览器行为，不应该因为升级而悄悄换掉。

换句话说，这次升级真正要做的，是把旧站点的生成结果迁移到新的 Middleman 生态里，而不是把旧站点改造成另一个新站点。

## 几个真正改变行为的地方

这次遇到的麻烦里，有些只是普通的依赖协调，有些则真正改变了旧站点的行为。下面这些点不只是“新版本写法不同”，而是如果不处理，旧页面会以另一种方式被生成出来。

### Haml 输出不再能含混

最明显的是 Haml。旧 layout 里很多 helper 输出用 `=` 就能自然落成 HTML。升级之后，哪些地方是普通字符串，哪些地方是已经生成好的 HTML，必须写清楚。

比如正文输出原来可以写成：

```haml
= yield
```

现在必须改成：

```haml
!= yield
```

同样，`stylesheet_link_tag`、`javascript_include_tag`、`yield_content :head`、`yield_content :scripts` 这类 helper 的结果，也不能再让 Haml 当成普通文本处理。否则页面里会直接出现 `&lt;section&gt;`、`&lt;p&gt;`、`&lt;link&gt;` 这种可见标签。第一次升级后 writings 渲染成一片垃圾，问题就在这里：不是样式坏了，而是 HTML 被转义成了文本。

所以 layout 里后来变成了这种写法：

```haml
!= safe_yield_content :head
!= yield
!= safe_yield_content :scripts
```

首页和列表页也要用同样的原则。文章摘要来自 `article.body`，已经是渲染后的 HTML，所以输出时必须是：

```haml
!= article_body(article)
```

这一点在 writings 的首页和 tags 页尤其明显。旧写法是把每篇文章的源文件重新交给 app 渲染：

```haml
= article.app.render_template(article.source_file)
```

升级之后，这个接口不再适合作为列表页里嵌入正文的方式。新写法是从 middleman-blog 的 article 对象取出已经渲染好的 body，再明确告诉 Haml 这是 HTML：

```haml
!= article_body(article)
```

这里如果少了 `!`，页面不会只是少一点样式，而是会把一整段文章 HTML 当作文字输出。比如原来应该成为 DOM 的 `<p>`、`<blockquote>`、`<span>`，会变成用户在页面上看见的 `&lt;p&gt;`、`&lt;blockquote&gt;`、`&lt;span&gt;`。这类问题很难靠肉眼逐个标签检查，因为新旧生成结果不可能做到字符串完全一致；真正要保住的是 DOM 语义，而不是 HTML 字符串逐字相同。

### 文章路径必须按旧文件名保留

另一个关键问题是 middleman-blog 对文章路径的处理。旧站点长期依赖文件名到公开 `.html` 路径的对应关系。例如：

```
source/tech/2013-03-21-static-blogging-with-middleman.haml
/tech/2013/03/21/static-blogging-with-middleman.html
```

升级后，如果完全交给新版本推导，大小写、下划线、已经带 `.html` 的文件名，都可能不再以旧方式落到输出目录里。URL 看起来只是字符串，但对一个已经发布了十几年的博客来说，URL 就是内容的一部分。

最后的处理不是去逐篇改文章，而是在 resource list 阶段把旧文件名规则写回去：

```ruby
match = source_file.match(%r{/source/(tech|writings|blogs)/(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|haml)\z})
article_name = match[5]
extension = article_name.end_with?('.html') ? '' : '.html'
resource.destination_path = "#{match[1]}/#{match[2]}/#{match[3]}/#{match[4]}/#{article_name}#{extension}"
```

这样做的意思是：日期仍然来自文件名，slug 也仍然来自文件名，已经写在文件名里的 `.html` 不再被重复追加。

### `.html.haml` 比 `.haml` 更明确

还有一类问题来自模板文件本身。旧站点里有 `index.haml`、`calendar.haml`、`tags.haml` 这样的页面入口。在新的 Middleman 里，它们作为模板能被处理，但输出资源的扩展和 content type 不够稳定，尤其在部署后可能被浏览器当作下载。

所以这些入口页改成了更明确的名字：

```
source/tech/index.html.haml
source/tech/calendar.html.haml
source/tech/tags.html.haml
```

文章资源则在上面的路径保持逻辑里补上：

```ruby
def resource.content_type
  'text/html; charset=utf-8'
end
```

一个链接能返回 200，并不等于浏览器会把它当作网页。这里必须同时保住路径和 `text/html; charset=utf-8`。

### tags 页面同时有模板和脚本行为

最后是 tags 页面。它不是一页纯静态目录，而是两部分叠在一起：下面有按 tag 分组的文章列表，上面还有一个由 JSON 驱动的 tag cloud。这个 cloud 靠 JavaScript 读取 tag 权重，再画成可以点击的可视化组件。

这里有两个需要保住的接口。第一个是 layout 插槽。`content_for` 要把 stylesheet 和 script 塞进外层 layout 的 `head` 和 `scripts` 区域，所以后来改成直接传入 helper 结果：

```haml
- content_for(:head, stylesheet_link_tag("jqcloud.css"))
- content_for(:scripts, javascript_include_tag("jqcloud-1.0.1.js") + javascript_include_tag("tags.js"))
```

第二个是 JSON 数据入口。这个 JSON 不是给人直接阅读的页面，而是给 tag cloud 这个组件喂数据的接口。原来的 `tags.js` 默认请求相对路径：

```js
['tags', 'json'].join('.')
```

这在不同部署路径下容易请求错位置。现在每个 tags 页面把自己的 JSON 入口写到 DOM 上：

```haml
#tag_cloud{"data-tags-json" => "/tech/tags.json"}
```

脚本只读取这个值：

```js
var tagsJsonPath = tagCloud.data('tags-json') || ['tags', 'json'].join('.');
```

这样 `/tech/tags.html`、`/writings/tags.html`、`/blogs/tags.html` 各自请求自己的 JSON，tag cloud 才会画出对应 section 的内容，不再依赖浏览器怎样解释当前相对路径。

## 把升级交给 /goal

这次我尝试让 Codex 通过 `/goal` 来做这件事。

一开始我其实只是想先讨论计划：先 survey 当前 repository，再把升级 Ruby、Middleman 和所有 Ruby 依赖这件事整理成一个可验证的任务，最后再转成 `/goal`。我没有预期它马上就创建 `/goal`，也没有预期 `/goal` 会带着隐含的时间和 token 约束。第一次运行中，事情卡在了预算和延续性上。这件事本身值得记下来：当任务交给 agent 时，目标不只是“要做什么”，还包括“做完之前允许它怎样持续工作”。

后来把预算放开之后，Codex 确实推进了升级：Ruby 升上去了，Middleman 升上去了，依赖重新锁定，GitHub Actions 也跟着调整。但第一次看似完整的结果并不可靠。writings 页面渲染成了转义后的垃圾，部分 tech 链接表现得像下载，tags 的问题也还没有被覆盖到。

这不是 agent 特有的问题。人手工做这种升级，也很容易在几个页面打开以后放松警惕。只是 agent 会把这个问题放大：它可以很快做很多改动，也可以很快给出一个看起来完整的结论。如果目标没有把什么叫“没有坏”写清楚，它就会按照最容易拿到的证据继续往前走。

## 第一次跑出来的结果并不可靠

第一次失败之后，我们先 revert。

既然已经知道生成结果不可信，就不应该在坏结果上继续补丁式修补，而应该回到升级前，再重新定义验证方法。

第二次 `/goal` 的指令就具体得多：回到升级前重新做版本升级；完成后不能只说 build 成功，要用后台 Middleman dev server 验证主要路径的实际渲染；验证通过后再 commit 和 push。

这句话后来被拆成了几个很具体的检查项。我们先用旧版本生成一份 baseline，把所有输出路径保存下来；再用新版本生成结果，比较完整路径清单，确认没有意外的 extensionless/html 漂移。然后选取真实会访问的页面：`/tech/`、`/writings/`、`/blogs/`，各自的 calendar 和 tags，几篇技术文章，几篇中文 writings，英文博客的两篇文章。

这些页面不只检查状态码，还检查 content type、UTF-8、代表性正文，以及是否出现 `&lt;section`、`&lt;p&gt;` 这类被转义出来的 HTML 痕迹。

所谓验证，不是替命令补一个安心的句号，而是把那些隐含的契约逐条显形。

## 重新定义什么叫验证通过

这次后来真正有用的验证，大致分成三层。

第一层是静态生成结果。build 必须成功，输出路径必须和旧版本一致。这里检查的是公开站点的形状：旧版本有的 `/writings/2013/...html`、`/tech/2013/...html`、`/blogs/2014/...html`，新版本也必须有，不能悄悄变成无扩展名路径，也不能多出一组重复页面。

第二层是 Middleman 的 Rack 应用。它不需要真的开端口，但可以证明在新配置和新依赖下，应用层会怎样响应这些路径。这里检查的是生成器内部对资源的理解：访问文章路径时应该返回 200，content type 应该是 `text/html; charset=utf-8`，正文里应该能找到抽样文章的标题和中文段落。

第三层是真正的后台 dev server。它通过 HTTP 请求访问 `127.0.0.1` 上运行的 Middleman，检查浏览器最终会面对的状态码、content type 和正文。这里检查的是最接近实际浏览的行为：`/writings/` 不能是一页被转义出来的标签，tech 文章不能变成下载，`/tech/tags.html` 这类入口不能只是在 Rack 层看起来存在。

这三层验证并不复杂，但组合起来以后，才比较接近这个站点真正需要保住的东西。尤其是中文 writings 的抽样很重要，因为它能同时覆盖编码、正文渲染、Markdown/Haml 混合输出和旧文章路径。

这里没有逐个标签去比对新旧 HTML。那样做也不太现实：Middleman、Haml、Markdown filter 升级后，属性顺序、空白、换行、自闭合写法都可能变化，字符串不相同并不代表页面坏了。实际检查的是更接近语义的东西：关键页面必须能返回 HTML，正文里的代表性中文必须还在，页面里不能出现 `&lt;section`、`&lt;p&gt;`、`&lt;span` 这类被转义出来的标签。它不是证明每一个角落都完全相同，但能抓住“HTML 没有成为 DOM，而是变成了文本”这种最危险的偏差。

Codex 并不比人更懂这个旧博客。它真正帮上忙的地方，是可以在明确的验证框架里反复跑、反复修、反复比较。前提是目标必须逼它承认什么才算证据。

## 最后漏掉的 tags

即使这样，tags 还是最后才被发现。

原因也很简单：我们验证了 tags 页面能返回 200，也验证了里面出现一些文章内容，但这只覆盖了静态列表。tag cloud 是另一个层次的东西：它要由 JavaScript 请求 JSON，再把 JSON 变成一个可点击的可视化组件。简单的文本内容验证、路径验证、HTML 格式验证，都没有真的让这个组件跑起来。

人工打开页面后，问题立刻暴露：Tags 标题出现两次，下面的 tag 列表跑到不该在的位置。继续查下去才发现，Haml 的 `content_for` 写法把一整份页面结构塞进了 `<head>`，而 tags.js 又依赖相对的 `tags.json`，部署后容易请求到错误位置。

这件事补上了最后一块验证：对于会交互的页面，不能只验证静态正文，还要验证它引用的数据入口和组件绑定。后来验证脚本增加了 `/tech/tags.json`、`/writings/tags.json`、`/blogs/tags.json`，也增加了 tags 页面结构检查：只能有一个 doctype，只能有一份 tags.js，并且 tag cloud 要指向对应 section 的 JSON。

这不是说人工 review 可以被省掉。恰恰相反，这次 tags 问题说明，人会用一种测试尚未覆盖的方式去点击页面。好的验证方法往往就是从这种人工发现里长出来的。

## 不急着换技术栈，但要少让正文依赖它

在这次之前，我认真想过要不要离开现在这套技术栈。Ruby、Middleman、middleman-blog、Haml、Sass 叠在一起，时间久了以后，升级不像升级，更像拆一团被固定在旧时间里的依赖。

这次升级改变了我的判断。它不是完全不可维护，只是不能再靠手工试错和大致浏览来维护。`/goal` 的意义也在这里：不是让 agent 一直尝试，而是把目标写成可以检查的条件，再在失败之后继续补全这些条件。

但这并不意味着以后写正文还应该继续使用很多框架层面的表达方式。内容本身当然可以复杂，可以有长段落、代码、公式、引用、表格和各种结构；但组织正文的格式最好尽量停留在 Markdown 和纯文本能表达的范围里。如果需要复杂页面，再让 layout、helper 或单独模板去承担复杂性。

这点有一点反讽：本文参考的[《用 Middleman 搭建静态博客》](/tech/2013/03/21/static-blogging-with-middleman.html)正是一篇 Haml 写成的博客。它记录了当年我怎样借助 Haml 获得组织页面的自由；而这次升级则提醒我，这种自由多年以后也会成为迁移时需要重新证明的契约。

所以结论不是立刻离开 Middleman，而是继续使用它，同时让正文少背一些框架的债。生成器可以演化，正文最好更容易被未来的生成器接走。

## 附录：两次 prompt 和 `/goal`

第一次 prompt：

```
Now we need to discuss a plan and in the end you will turn this into a goal

For the current repository, I want you to bump the Ruby, middleman and all Ruby packages and dependencies to a recent but not latest version provided that they are compatible; After the bump there will be errors, fix them, Adjust configuration, github actions; The result should be verified by equivalent build.

You need to survey the repo, And devise a verifiable task for `/goal`
```

第一次生成的 `/goal`：

```
objective:
Upgrade /Users/utensil/projects/utensil.github.io from its old Ruby 2.6/2.7 + Middleman 3 dependency set to a recent compatible Ruby/Middleman stack without using latest-edge releases; fix resulting build/config/template/plugin/CI errors; add or update lockfiles and version declarations; update GitHub Actions accordingly; and verify success with an equivalent local Middleman build that produces the static site output from the upgraded bundle.

token_budget:
30000
```

第二次 prompt：

```
now update our goal to verify with the background middleman dev server to ensure the render is correct

how about create a new goal

I have cleared the existing goal and you may create a new goal.

update the goal to commit and push after verification

writings rendered to garbage; and tech links rendered to no ext so becomes download

your verification is invalid and didn't check against major paths and sample contents

now please first revert the 2 commits in git (by new 2 commits) and push so it is back to your version bump

then devise a new verifiable goal; clear the existing goal and set the new goal

no, back to before version bump

I clear the goal for you

go on
```

第二次生成的 `/goal`：

```
objective:
Redo the Ruby/Middleman upgrade from the pre-version-bump baseline with verification that matches real site behavior, not just HTTP status: first inventory current route behavior and expected generated paths before changing versions; choose a recent compatible Ruby, Middleman, middleman-blog, Haml, and dependency set; update Ruby/tooling/Gemfile/Gemfile.lock/GitHub Actions/config only as needed; fix upgrade regressions without changing public URLs or forcing downloads; verify static build output and a background Middleman dev server against representative routes and sample content, including /, /tech/, /tech/calendar.html, /tech/tags.html, at least three tech article links resolving as text/html with correct content, /writings/, /writings/calendar.html, /writings/tags.html, at least three writings article links resolving as text/html with readable UTF-8 Chinese content rather than garbage, /blogs/, /blogs/calendar.html, /blogs/tags.html, and both English blog article links; compare generated public paths before and after to ensure no unintended extensionless/html path drift; commit only after verification passes; push to origin/middleman after the verified commit.
```
