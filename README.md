utensil.github.io
=====================

[![Build Status](https://github.com/utensil/utensil.github.io/actions/workflows/ruby.yml/badge.svg)](https://github.com/utensil/utensil.github.io/actions/workflows/ruby.yml) 
My personal blog, including my technical blog and my writings.

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
