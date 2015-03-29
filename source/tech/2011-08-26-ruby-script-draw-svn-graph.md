---
title: 一个生成SVN Graph的ruby脚本
tags: ruby
---

<!-- <script src="https://gist.github.com/1170025.js"> </script> -->

```ruby

#README
# In order to run this script, the following command line tools must be installed:
# 1) a subversion client, under Windows, Slik SVN is recommended: http://www.sliksvn.com/en/download
# 2) a Graphviz toolset, which can be downloaded from http://www.graphviz.org/
# Also the following ruby gems must be installed:
require 'rubygems'

#'xmlsimple'
# gem: http://rubyforge.org/frs/?group_id=638
# doc: http://xml-simple.rubyforge.org/
# gem install -l xml-simple-1.0.13.gem
require 'xmlsimple'

#gem: http://rubygems.org/downloads/ruby-graphviz-1.0.0.gem
#git:  https://github.com/glejeune/Ruby-Graphviz
#doc: http://rdoc.info/github/glejeune/Ruby-Graphviz
#article: http://www.omninerd.com/articles/Automating_Data_Visualization_with_Ruby_and_Graphviz
require 'graphviz'
  
#USAGE:
repo_path = ARGV[0] 
file_name = ARGV[1]

#fetch svn log info in the format of xml
repo_log_xml = `svn log #{repo_path} -v --xml` #TODO username etc.

unless $?.success?
  puts "Can't fetch log info from #{repo_path}, because #{repo_log_xml}"
  exit
end

#store the xml in a file for futher query
xml_file = File.open("#{file_name}.xml", "w+")
xml_file.puts repo_log_xml
xml_file.close

#simple xml parser
svn_log = XmlSimple.xml_in(repo_log_xml,  { "forcearray" => false })
#puts svn_log.inspect

f = File.open("#{file_name}.dot", "w+")

#start constructing dot file
f.puts %Q|
digraph "#{repo_path}" {

    //size = "3000, 4000"
    fontsize = 24
    //ranksep=equally
    //ratio = fill
    //ratio = compress
    ratio = 1.6
    //ratio = auto
    //rotate=90
    //orientation=landscape
    //page="8.5,11"
    //page="11,17"
    // { rank = same; node1; node2; }
    // subgraph "cluster_**" { label = }
    // "<anchor>" node:anchor
    //compound=true
    //lhead/ltail -> subgraph
    
    ranksep=.75//equally
    //nodesep=equally
    //center=true
    //concentrate=true

    node [
        fontsize = 24
        shape = "record"
    ]

    edge [
        fontsize = 24
        arrowsize = 2
    ]
    
|

  svn_log["logentry"].each do |log|
    
    paths = log["paths"]  
    if paths.class == Hash
      path = paths["path"]
      if path.respond_to?(:has_key?) && path.has_key?("copyfrom-path")
        
        from_path = path["copyfrom-path"]
        from_rev = path["copyfrom-rev"]
        to_path = path["content"]
        to_rev = log["revision"]
        
        #shortening the brach/tag name
        #FIXME our svn projects are postfixed by _proj, see if how can we do it without such name convention
        from_path.gsub! /^\/.*_proj/, ""
        to_path.gsub! /^\/.*_proj/, ""
        
        #rule to filter out illegal charaters in commit log for dot language
        safe_msg = log["msg"].to_s          
        safe_msg.gsub! /\n/, "\\n"
        
        correct_copy = (from_path =~ /tags/ && to_path =~ /branches/) || (from_path =~ /branches/ && to_path =~ /tags/)                
          
        f.puts %Q%"#{to_path}"[label="{#{to_path}|#{to_rev}|#{log["date"]}|#{log["author"]}|#{safe_msg}}" #{ "shape = \"Mrecord\"" if to_path =~ /tags/}]%
        f.puts %Q%"#{from_path}" -> "#{to_path}"[label = "#{from_rev}" #{"style = \"dashed\"" unless correct_copy}]%

      end
    end
  end

f.puts %Q|
}
|

f.close

cmd = %Q|dot -Nfontname=simsun -T svg -o #{file_name}.svg #{file_name}.dot|

puts cmd

system cmd

puts "Nice job!" if $?.success?
```