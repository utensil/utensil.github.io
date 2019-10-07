require 'tilt/template'

class MarkdownHtmlFilterTemplate < Tilt::Template
  self.default_mime_type = "text/html"

  def self.engine_initialized?
    defined? ::Html::Pipeline
  end

  def initialize_engine
    require 'html/pipeline'
  end

  def prepare
    @engine = HTML::Pipeline.new [
      HTML::Pipeline::MarkdownFilter
    ], asset_root: "/", gfm: true, unsafe: true, tagfilter: false
  end

  def evaluate(scope, locals, &block)
    @output ||= @engine.call(data)[:output].to_s
  end

end