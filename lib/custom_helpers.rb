module CustomHelpers
  def some_method
    # ...do something here...
  end

  def parent_path_of(rs)
    parts = rs.path.split('/')
    parts.pop
    parts.join('/')
  end

  def children_of(parent)
    parent_pages_hash = sitemap.resources.group_by { |p| parent_path_of(p)}

    parent_pages_hash[parent].keep_if { |a| is_blog?(a) }
  end

  def source_file_name_of(rs)
    rs.source_file.split('/').last
  end

  def is_blog?(rs)
    rs.respond_to?(:source_file) && source_file_name_of(rs).match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/) && rs.data['title']
  end

  def date_of(rs)
    return DateTime.now unless is_blog?(rs)

    #puts source_file_name_of(rs)
    m = source_file_name_of(rs).match /(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/

    unless m.nil?
      DateTime.new(m[1].to_i, m[2].to_i, m[3].to_i, m[4].to_i, m[5].to_i)
    else
      m = source_file_name_of(rs).match /(\d{4})-(\d{2})-(\d{2})/
      DateTime.new(m[1].to_i, m[2].to_i, m[3].to_i)
    end    
  end

  def next_of(rs)
    parent_path = parent_path_of(rs)
    children_of(parent_path).sort_by{|a| date_of(a)}.find {|a| date_of(a) > date_of(rs) }
  end

  def prev_of(rs)
    parent_path = parent_path_of(rs)
    children_of(parent_path).sort_by{|a| date_of(a)}.reverse.find {|a| date_of(a) < date_of(rs) }
  end

  def tags_of(parent, update = false)
    return @tags if !update && !@tags.nil?

    @tags = {}

    children_of(parent).each do |article|
      tags = (article.data['tags'] || '').split ','
      tags.each do |tag|
        tag = tag.strip
        @tags[tag] = [] if @tags[tag].nil?
        @tags[tag] << article
      end
    end

    @tags     
  end
end