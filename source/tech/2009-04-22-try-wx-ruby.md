---
title: wxRuby尝鲜 
tags: wx
---

wxRuby最好玩的地方是它对wxWidgets多加了一层糖衣的语法。
 
安装了

``` 
gem install wxruby
```

之后，还要安装

``` 
gem install wx_sugar
```

这样子，我们不仅具有了一些`:param_name => value`这样的糖衣，可以使用`attr_*`族来暴露实例变量，还有了用`do...end`块来做layout和菜单的能力，比较爽的一点还有用block来处理事件。
 
简单讲解一下怎么使用`:param_name => value`这样的糖衣：比如wxRuby中某函数`f(a,b)`，有了wx_sugar之后，就可以写`f(:a=>5, :b=>'string')`来调用。
 
下面这个小程序使用了wxAUI和wxStyledTextCtrl。用途是在非常长的文本文件中，同时搜索多个关键字，建立索引，包含上下文和定位的链接。
 
multi_searcher.rb
 
```ruby
require 'rubygems'  
require 'wx'  
require 'wx_sugar/all'  
require 'erb'  
require 'ya2yaml'  
  
include Wx  
  
$KCODE = 'utf8'  
  
def min(a, b)  
    a >= b ? b : a  
end  
  
def max(a, b)  
    a >= b ? a : b  
end  
  
class KeywordsPane < Panel  
    def initialize(parent, options = {})  
        super(parent, options.merge!(:size => [500, 500]))  
        arrange_vertically do  
            add @keyword = TextCtrl.new(self, :style => Wx::TE_MULTILINE, :size => [-1, 200]), :proportion => 1              
              
            arrange_horizontally do  
                add @status = StaticText.new(self, :label => '', :size => [150, -1]), :proportion => 1  
                add Button.new(self, :label => '查找') do |button|  
                    evt_button(button) do |event|  
                        #search  
                        get_parent.filecontent_pane.search(@keyword.get_value)  
                    end                   
                end               
            end  
        end       
    end  
      
    attr_reader :keyword, :status  
end  
  
class ReportPane < Panel   
    def initialize(parent, options = {})  
        super(parent, options.merge!(:size => [500, 500]))  
        arrange_vertically do  
            add @report = HtmlWindow.new(self), :proportion => 1 do |report|  
                evt_html_link_clicked(report) do | event |  
                    position = event.get_link_info.get_href.sub(/position\:\/\//, '').split(',')  
                    get_parent.filecontent_pane.file.set_selection position[0].to_i, position[1].to_i  
                end  
            end  
            add Button.new(self, :label => '保存报告') do |button|  
                evt_button(button) do |event|  
                    ask4file = FileDialog.new(self, :style => FD_SAVE, :message => '保存报告', :wildcard => 'HTML files(*.html)|*.html')  
                    File.new(ask4file.get_path, 'w').write @report_text if ask4file.show_modal == Wx::ID_OK  
                end  
            end  
        end  
          
    end  
      
    attr_reader :report  
    attr_writer :report_text  
end  
  
class FilecontentPane < Panel   
    def initialize(parent, options = {})  
        super(parent, options.merge!(:size => [500, 500]))  
          
        arrange_vertically do  
            add Button.new(self, :label => '打开要查找的文件') do |button|  
                evt_button(button) do |event|  
                    #open file  
                    ask4file = FileDialog.new(self, :message => '打开要查找的文件')  
                    @file.load_file(ask4file.get_path) if ask4file.show_modal == Wx::ID_OK  
                    # auto adapt to the width of max line count  
                    @file.set_margin_width 0, @file.text_width(33, "__#{@file.get_line_count}")   
                end  
            end  
            add @file = StyledTextCtrl.new(self), :proportion => 1  
            @file.set_margin_width 0, @file.text_width(33, '999') # show line number  
            add StaticText.new(self, :label => '小提示：按住Ctrl+鼠标滚轮可以缩放文字大小')  
        end  
    end  
      
    def search(keywords)  
        keywords_a = keywords.split(', ')  
        @search_result = {}  
        file_length = @file.get_text_length  
          
        beg_pos = 0       
          
        keywords_a.each do |k|  
            @search_result[k] = []  
              
            @file.goto_pos 0  
            @file.search_anchor  
              
            while((beg_pos = @file.search_next(0,k)) != -1)               
                  
                end_pos = beg_pos + k.length  
                  
                context = @file.get_text_range max(beg_pos - 520, 0), min(end_pos + 520, file_length)  
                  
                context.gsub! k, '<font size=7><b><u>\0</u></b></font>'   
                # coord = [@file.line_from_position(beg_pos), @file.get_column(beg_pos)]  
                @search_result[k] << { :context => context, :position => [beg_pos, end_pos], :coord => [@file.line_from_position(beg_pos), @file.get_column(beg_pos)]}  
                  
                get_parent.keywords_pane.status.set_label "正在搜索#{k}...完成%3.2f%% ..." % (beg_pos * 100.0 / file_length)    
                  
                @file.goto_pos end_pos + 1  
                @file.search_anchor  
            end  
        end  
        get_parent.keywords_pane.status.set_label '搜索完成，正在生成报告...'  
        get_parent.report_pane.report.set_page report_text = ERB.new(File.read('report.html.erb'), 0, "%<>").result(binding)  
              
        get_parent.keywords_pane.status.set_label ''  
        get_parent.report_pane.report_text = report_text  
    end   
      
    attr_reader :file  
end  
  
class MyFrame < Frame  
   def initialize(title)  
        super(nil, :title => title, :size => [800, 600])  
        @mgr = AuiManager.new  
        @mgr.set_managed_window(self)  
          
        pi = AuiPaneInfo.new  
        pi.set_name('keywords_pane').set_caption('在下面键入关键字，每个关键字之间用 一个逗号一个空格 隔开（例如keyword1, keyword2）：')  
        pi.top.set_maximize_button.set_close_button(false)        
        @mgr.add_pane(@keywords_pane = KeywordsPane.new(self), pi)  
                  
        pi = AuiPaneInfo.new  
        pi.set_name('report_pane').set_caption('查找结果报告')  
        pi.left.set_maximize_button.set_close_button(false)       
        @mgr.add_pane(@report_pane = ReportPane.new(self), pi)  
          
        pi = AuiPaneInfo.new  
        pi.set_name('filecontent_pane').set_caption('被查找文件')  
        pi.center.set_maximize_button.set_close_button(false)  
        @mgr.add_pane(@filecontent_pane = FilecontentPane.new(self), pi)      
          
        @mgr.update  
   end  
     
   attr_reader :keywords_pane, :report_pane, :filecontent_pane  
end  
  
  
class MyApp < App  
   def on_init  
     frame = MyFrame.new('多关键字搜索助手')  
     frame.show  
   end  
end  
  
a = MyApp.new  
a.main_loop  
``` 
 
程序中使用的erb模板report.html.erb:
 
```html 
<html>  
<body>  
<% @search_result.each do |keyword, info| %>  
<dt><%= keyword %>(找到<%= info.length %>处)</dt>  
<dd>  
<% unless info.empty? %>  
    <table border=1>  
        <tr>  
            <th>位置</th>  
            <th>上下文</th>  
        </tr>  
        <% info.each do |v|%>  
            <tr>  
                <td><a href='position://<%= v[:position].join ',' %>'><%= "#{v[:coord][0]}行#{v[:coord][1]}列" %></a></td>  
                <td><pre><%= v[:context] %></pre></td>  
            </tr>  
        <% end %>  
    </table>  
<% end %>  
</dd>  
<% end %>  
</body>  
</html>
```  
 