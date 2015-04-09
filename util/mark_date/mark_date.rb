all = ''
dates = {}
Dir["../../source/writings/*.md"].each do |file|
  date_matched = file.match /(\d{4}-\d{2}-\d{2})-(\d{2})-(\d{2})/
  unless date_matched
    $stderr.puts "#{file} name failed to match date!"
    next
  end

  date = "#{date_matched[1]} #{date_matched[2]}:#{date_matched[3]}"

  if dates[date]
    # $stderr.puts "date dup: #{dates[date]} == #{file}"
  else
    dates[date] = []
  end

  dates[date] << file

  full_date = "date: #{date}:0#{dates[date].size} +0800"

  if dates[date].size > 1
    $stderr.puts "date dup: #{date} = #{dates[date]}, so #{full_date}"
  end
  # puts "#{file}\t#{date}"

  str = IO.read file, encoding: 'utf-8'
  matched = str.match(/(---\n\n)/)
  if matched
    str = str.gsub(/(---\n\n)/, "#{full_date}\n\\1")
  end

  all += "#{str}\n\n\n"
  IO.write file, str
end

# IO.write 'test.txt', all