utensil.github.io
=====================

[![Build Status](https://github.com/utensil/utensil.github.io/actions/workflows/ruby.yml/badge.svg)](https://github.com/utensil/utensil.github.io/actions/workflows/ruby.yml) 

My personal blog.

The technical posts and the writings now live in their own repositories,
each split out with full git history and original timestamps preserved:

- Tech — <https://github.com/utensil/tech> → <https://utensil.github.io/tech/>
- Writings — <https://github.com/utensil/writings> → <https://utensil.github.io/writings/>

This repository keeps the remaining site (and the legacy `/blogs/...` redirects
to the Hugo blog).

How To Build Manually
------------------------

### Prepare

```
#for editing the source
git clone --depth 1 -b middleman https://github.com/utensil/utensil.github.io.git utensil-middleman
cd utensil-middleman/
sudo gem install bundler
bundle

#for publishing
cd ..
git clone --depth 1 -b master https://github.com/utensil/utensil.github.io.git utensil.github.io
```
### Run

```
cd utensil-middleman/
bundle exec middleman server
```

### Build

```
cd utensil-middleman/
bundle exec middleman build
```

### Publish

```
cd utensil.github.io
cp -rf ../utensil-middleman/build/* ./
git commit -a -m 'commit log'
git push origin
```

Licence
--------

Codes are licensed by MIT License, see `LICENSE.md`. Blog contents are licensed by [(CC) BY-NC-ND](http://creativecommons.org/licenses/by-nc-nd/3.0/).

Copyright (c) 2011-2021 Utensil (https://github.com/utensil)
