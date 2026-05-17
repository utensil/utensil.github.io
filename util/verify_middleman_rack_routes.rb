# frozen_string_literal: true

require 'rack/mock'
require 'middleman/rack'
require_relative 'verify_middleman_routes'

rack = Rack::MockRequest.new(Middleman.server)
failures = []

ROUTES.each do |path, terms|
  response = rack.get(path)
  body = response.body.to_s
  body.force_encoding('UTF-8')

  failures << "#{path}: expected 200, got #{response.status}" unless response.status == 200
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

  puts "#{path} #{response.status} #{response['content-type']}"
end

REDIRECT_ROUTES.each do |path, target|
  response = rack.get(path)
  body = response.body.to_s
  body.force_encoding('UTF-8')

  failures << "#{path}: expected 200, got #{response.status}" unless response.status == 200
  unless response['content-type'].to_s.include?('text/html')
    failures << "#{path}: expected text/html, got #{response['content-type'].inspect}"
  end
  failures << "#{path}: response body is not valid UTF-8" unless body.valid_encoding?
  failures << "#{path}: missing canonical redirect target #{target.inspect}" unless body.include?(%(<link rel=canonical href="#{target}">)) || body.include?(%(rel="canonical" href="#{target}"))
  failures << "#{path}: missing refresh redirect target #{target.inspect}" unless body.include?(%(url=#{target}))
  ESCAPED_HTML_MARKERS.each do |marker|
    failures << "#{path}: contains escaped HTML marker #{marker.inspect}" if body.include?(marker)
  end

  puts "#{path} #{response.status} #{response['content-type']} -> #{target}"
end

if failures.any?
  warn failures.join("\n")
  exit 1
end

puts "Verified #{ROUTES.size} routes and #{REDIRECT_ROUTES.size} redirects through Middleman Rack app"
