### 
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Haml
###

# CodeRay syntax highlighting in Haml
# First: gem install haml-coderay
# require 'haml-coderay'

# CoffeeScript filters in Haml
# First: gem install coffee-filter
# require 'coffee-filter'

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

###
# Page command
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

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Change the CSS directory
# set :css_dir, "alternative_css_directory"

# Change the JS directory
# set :js_dir, "alternative_js_directory"

# Change the images directory
# set :images_dir, "alternative_image_directory"

set :encoding,    "utf-8"

require "redcarpet"

module Haml::Filters::Redcarpet
  include Haml::Filters::Base  

  def render(text)
    Redcarpet::Markdown.new(Redcarpet::Render::HTML, 
                  :tables => true,
                  :autolink => true, 
                  :no_intra_emphasis => true,
                  :fenced_code_blocks => true,
                  #:smartypants => true,
                  #:superscript => true ,
                  :space_after_headers => true).render(text)
  end
end

# Markdown
set :markdown_engine, :redcarpet
set :markdown, :tables => true,
               :autolink => true, 
               :no_intra_emphasis => true,
               :fenced_code_blocks => true,
               #:smartypants => true,
               #:superscript => true,
               :space_after_headers => true

set :md, :layout_engine => :haml
set :haml, :layout_engine => :haml #, :encoding => 'utf-8'

with_layout 'tech_layout.haml' do
  page "/tech/*.html"
end

with_layout 'writings_layout.haml' do
  page "/writings/*.html"
end

require "middleman-blog"
activate :blog do |tech_blog|
  tech_blog.name = 'tech'
  tech_blog.prefix = 'tech'
  tech_blog.layout = 'tech_layout'
end

activate :blog do |writings_blog|
  writings_blog.name = 'writings'
  writings_blog.prefix = 'writings'
  writings_blog.layout = 'writings_layout'
end

#ignore '/writings/*.md'
#ignore '/writings/*.haml'

ignore '**/Thumbs.db'
ignore '*_layout.haml'


#activate :blog do |writings_blog|
#  writings_blog.prefix = "writings"
#  writings_blog.layout = 'writings_layout'
#end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript

  # activate :minify_html
  
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
