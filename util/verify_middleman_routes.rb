# frozen_string_literal: true

require 'net/http'
require 'uri'

BASE_URL = URI(ARGV.fetch(0, 'http://127.0.0.1:4567'))

ROUTES = {
  '/' => [],
  '/tech/' => [],
  '/tech/calendar.html' => ['Bourbaki', '近来的技术兴趣', '代码之美'],
  '/tech/tags.html' => ['Bourbaki', '近来的技术兴趣', '代码之美'],
  '/tech/2020/09/12/19-45-bourbaki-clifford-algebra-0901b.html' => ['Bourbaki'],
  '/tech/2013/05/18/recent-tech-interests-01.html' => ['近来的技术兴趣'],
  '/tech/2009/04/21/notes-on-beautiful-code.html' => ['代码之美'],
  '/writings/' => ['返初', '抵达', '父母'],
  '/writings/calendar.html' => ['返初', '抵达', '父母'],
  '/writings/tags.html' => ['返初', '抵达', '父母'],
  '/writings/2023/10/05/21-06-fan-chu.html' => ['返初', '林错风穿逡巡雁'],
  '/writings/2021/09/19/12-10-di-da.html' => ['抵达'],
  '/writings/2018/05/20/22-09-fu-mu.html' => ['父母'],
  '/blogs/' => [],
  '/blogs/calendar.html' => [],
  '/blogs/tags.html' => []
}.freeze

REDIRECT_ROUTES = {
  '/blogs/2016/06/09/on-love-in-the-context-of-super-ai.html' => 'https://utensil.github.io/blog/posts/on-love-in-the-context-of-super-ai/',
  '/blogs/2016/05/20/on-tech-dev-and-doomsday.html' => 'https://utensil.github.io/blog/posts/on-tech-dev-and-doomsday/'
}.freeze

ESCAPED_HTML_MARKERS = ['&lt;link', '&lt;section', '&lt;p&gt;', '&lt;article'].freeze
TAG_PAGE_EXPECTATIONS = {
  '/tech/tags.html' => '/tech/tags.json',
  '/writings/tags.html' => '/writings/tags.json',
  '/blogs/tags.html' => '/blogs/tags.json'
}.freeze
JSON_ROUTES = TAG_PAGE_EXPECTATIONS.values.freeze

if $PROGRAM_NAME == __FILE__
  failures = []

  ROUTES.each do |path, terms|
    uri = BASE_URL + path
    response = Net::HTTP.get_response(uri)
    body = response.body.to_s
    body.force_encoding('UTF-8')

    failures << "#{path}: expected 200, got #{response.code}" unless response.code == '200'
    unless response['content-type'].to_s.include?('text/html')
      failures << "#{path}: expected text/html, got #{response['content-type'].inspect}"
    end
    failures << "#{path}: response body is not valid UTF-8" unless body.valid_encoding?
    terms.each do |term|
      failures << "#{path}: missing #{term.inspect}" unless body.include?(term)
    end
    ESCAPED_HTML_MARKERS.each do |marker|
      failures << "#{path}: contains escaped HTML marker #{marker.inspect}" if body.include?(marker)
    end
    if TAG_PAGE_EXPECTATIONS.key?(path)
      expected_json = TAG_PAGE_EXPECTATIONS.fetch(path)
      doctype_count = body.scan('<!DOCTYPE html>').size
      failures << "#{path}: expected one document, found #{doctype_count} doctypes" unless doctype_count == 1
      unless body.include?("data-tags-json='#{expected_json}'")
        failures << "#{path}: missing absolute tag JSON path #{expected_json.inspect}"
      end
      tags_script_count = body.scan(%r{/javascripts/tags\.js}).size
      failures << "#{path}: expected one tags.js include, found #{tags_script_count}" unless tags_script_count == 1
    end

    puts "#{path} #{response.code} #{response['content-type']}"
  end

  JSON_ROUTES.each do |path|
    uri = BASE_URL + path
    response = Net::HTTP.get_response(uri)
    body = response.body.to_s

    failures << "#{path}: expected 200, got #{response.code}" unless response.code == '200'
    failures << "#{path}: expected JSON array body" unless body.lstrip.start_with?('[')

    puts "#{path} #{response.code} #{response['content-type']}"
  end

  REDIRECT_ROUTES.each do |path, target|
    uri = BASE_URL + path
    response = Net::HTTP.get_response(uri)
    body = response.body.to_s
    body.force_encoding('UTF-8')

    failures << "#{path}: expected 200, got #{response.code}" unless response.code == '200'
    unless response['content-type'].to_s.include?('text/html')
      failures << "#{path}: expected text/html, got #{response['content-type'].inspect}"
    end
    failures << "#{path}: response body is not valid UTF-8" unless body.valid_encoding?
    failures << "#{path}: missing canonical redirect target #{target.inspect}" unless body.include?(%(<link rel=canonical href="#{target}">)) || body.include?(%(rel="canonical" href="#{target}"))
    failures << "#{path}: missing refresh redirect target #{target.inspect}" unless body.include?(%(url=#{target}))
    ESCAPED_HTML_MARKERS.each do |marker|
      failures << "#{path}: contains escaped HTML marker #{marker.inspect}" if body.include?(marker)
    end

    puts "#{path} #{response.code} #{response['content-type']} -> #{target}"
  end

  if failures.any?
    warn failures.join("\n")
    exit 1
  end

  puts "Verified #{ROUTES.size} routes and #{REDIRECT_ROUTES.size} redirects at #{BASE_URL}"
end
