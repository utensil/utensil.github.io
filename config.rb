###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# set :css_dir, 'stylesheets'

# set :js_dir, 'javascripts'

# set :images_dir, 'images'

# Build-specific configuration
# configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
# end

Time.zone = 'Hongkong'
set :encoding,    "utf-8"

# require "redcarpet"

# module Haml::Filters::Redcarpet
#   include Haml::Filters::Base  

#   def render(text)
#     Redcarpet::Markdown.new(Redcarpet::Render::HTML, 
#                   :tables => true,
#                   :autolink => true, 
#                   :no_intra_emphasis => true,
#                   :fenced_code_blocks => true,
#                   #:smartypants => true,
#                   #:superscript => true ,
#                   :space_after_headers => true).render(text)
#   end
# end

helpers do
  def safe_yield_content(symbol)
    ret = ""
    begin
      ret = yield_content symbol
    rescue Exception => e
      ret = "#{symbol}\n#{e.message}\n#{e.backtrace.inspect}"
      puts ret
    end
    return ret
  end

  def section_articles(blog_name = current_page.data.blog)
    blog(blog_name).articles.sort_by(&:source_file).reverse
  end

  def section_tags(blog_name = current_page.data.blog)
    blog(blog_name).tags.sort_by { |_, articles| -articles.size }
  end

  def article_body(article)
    article.body.to_s.encode('UTF-8', invalid: :replace, undef: :replace, replace: '')
  end
end

# Markdown
# set :markdown_engine, :redcarpet
# set :markdown, :tables => true,
#                :autolink => true, 
#                :no_intra_emphasis => true,
#                :fenced_code_blocks => true,
#                #:smartypants => true,
#                #:superscript => true,
#                :space_after_headers => true,
#                :input => "GFM",
#                :parse_block_html => true

# set :markdown_engine, :kramdown
# set :markdown,
#     layout_engine: :haml,
#     tables: true,
#     autolink: true,
#     no_intra_emphasis: true,
#     fenced_code_blocks: true,
#     space_after_headers: true,
#     input: 'GFM',
#     parse_block_html: true

require 'lib/mytemplate'
set :markdown_engine, :MarkdownHtmlFilter

# with_layout 'tech_layout.haml' do
#   page "/tech/*.html"
# end

# with_layout 'writings_layout.haml' do
#   page "/writings/*.html"
# end

page "/tech/*.html", :layout => 'blog_layout'
page "/writings/*.html", :layout => 'blog_layout'
page "/blogs/*.html", :layout => 'blog_layout_en'

set :layout, false

require "middleman-blog"
require "middleman-blog/blog_data"

module Middleman
  module Blog
    module BlogArticle
      def slug
        path_part('title')
      end

      def content_type
        'text/html; charset=utf-8'
      end
    end

    class BlogData
      def permalink_options(resource, extra = {})
        params = resource.metadata[:page].slice(*@permalink_template.variables.map(&:to_sym))

        params.each do |key, value|
          params[key] = safe_parameterize(value, preserve_underscores: @options.preserve_underscores_in_slugs)
        end

        params
          .merge(date_to_params(resource.date))
          .merge(lang: resource.lang.to_s, locale: resource.locale.to_s, title: raw_title_from_source(resource))
          .merge(extra)
      end

      def raw_title_from_source(resource)
        basename = File.basename(resource.source_file.to_s)
        basename = basename.sub(/\.[^.]+\z/, '')
        basename.sub(/\A\d{4}-\d{2}-\d{2}-/, '')
      end
    end
  end
end

class PreserveBlogFileBasenamePaths
  def manipulate_resource_list(resources)
    resources.each do |resource|
      source_file = resource.source_file.to_s
      match = source_file.match(%r{/source/(tech|writings|blogs)/(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|haml)\z})
      next unless match

      article_name = match[5]
      extension = article_name.end_with?('.html') ? '' : '.html'
      resource.destination_path = "#{match[1]}/#{match[2]}/#{match[3]}/#{match[4]}/#{article_name}#{extension}"
      def resource.content_type
        'text/html; charset=utf-8'
      end
    end

    resources
  end
end

activate :blog do |tech_blog|
  tech_blog.name = 'tech'
  tech_blog.prefix = 'tech'
  tech_blog.sources = '{year}-{month}-{day}-{title}'
  tech_blog.permalink = '/{year}/{month}/{day}/{title}.html'
  tech_blog.layout = 'blog_layout'
end

activate :blog do |writings_blog|
  writings_blog.name = 'writings'
  writings_blog.prefix = 'writings'
  writings_blog.sources = '{year}-{month}-{day}-{title}'
  writings_blog.permalink = '/{year}/{month}/{day}/{title}.html'
  writings_blog.layout = 'blog_layout'
end

activate :blog do |blogs_blog|
  blogs_blog.name = 'blogs'
  blogs_blog.prefix = 'blogs'
  blogs_blog.sources = '{year}-{month}-{day}-{title}'
  blogs_blog.permalink = '/{year}/{month}/{day}/{title}.html'
  blogs_blog.layout = 'blog_layout_en'
  blogs_blog.paginate = true
  blogs_blog.per_page = 5
end

after_configuration do
  sitemap.register_resource_list_manipulator(:preserve_blog_file_basename_paths, PreserveBlogFileBasenamePaths.new, 60)
end

#ignore '/writings/*.md'
#ignore '/writings/*.haml'

ignore '**/Thumbs.db'
ignore '*_layout.haml'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript

  activate :minify_html
  
  # Enable cache buster
  activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
