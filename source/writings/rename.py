import os
import glob
# pip install python-frontmatter
import frontmatter

files = glob.glob('*.md')

for file in files:
    post = frontmatter.load(file)
    if 'date' in post:
        old_filename = str(file)
        date_filename = old_filename[0:10]
        date_frontmatter = str(post['date'])[0:10]
        if date_filename != date_frontmatter:
            # print(date_filename, date_frontmatter)
            new_filename = old_filename.replace(date_filename, date_frontmatter)
            if not os.path.exists(new_filename):
                print(f'mv {old_filename} {new_filename}')
                os.rename(old_filename, new_filename)