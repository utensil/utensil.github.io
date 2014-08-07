# encoding: UTF-8
require './downmark_it'
require './pinyin.rb'
require 'open-uri'
require 'nokogiri'

pinyin = PinYin::PinYin.instance
# paste the newest link here
next_page_link = 'http://utensil-river.diandian.com/post/2014-07-22/40062272726'
stop_link = 'http://utensil-river.diandian.com/post/2014-01-05/40060688236'
doc = Nokogiri::HTML(open(next_page_link).read)

while true do
  (doc/'.text-post').each do |post|
    title = (post/'h2').inner_text.strip
    puts next_page_link

    #puts pinyin.to_pinyin(title, separator = '-', tone = true) 
    file_name = ''

    datetime = (post/'.date').inner_text.strip.gsub(/[ :]/, '-')

    file_name = "#{datetime}-#{pinyin.to_permlink(title)}.md"

    tags = []
    (post/'p.tags a').each { |tag| tags << tag.inner_text }

    unless File.exist?(file_name)
      File.open(file_name, "w") do |f|
        f.puts "---\r\ntitle: #{title}\r\ntags: #{tags.join ', '}\r\n---\r\n"  
        f.puts DownmarkIt.to_markdown((post/'.rich-content').inner_html, 'utf-8').gsub(/\r\n\r\n\r\n|\n\n\n/, '\r\n')
      end
    end
  end

  next_page_link = (doc/'.pageturn a.next_page') 

  if next_page_link.size > 0
    next_page_link = next_page_link[0].attr('href')
    break if next_page_link == stop_link
    doc = Nokogiri::HTML(open(next_page_link).read)
  else
    break
  end

  sleep(1.0)
end 

