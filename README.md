utensil.github.io
=====================

[![Build Status](https://travis-ci.org/utensil/utensil.github.io.png?branch=middleman)](https://travis-ci.org/utensil/utensil.github.io) [![Stories in Ready](https://badge.waffle.io/utensil/utensil.github.io.png?label=ready&title=Ready)](http://waffle.io/utensil/utensil.github.io) [![Dependency Status](https://www.versioneye.com/user/projects/53e7069535080d77a40000f7/badge.svg?style=flat)](https://www.versioneye.com/user/projects/53e7069535080d77a40000f7) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/utensil/utensil.github.io?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

My personal blog, including my technical blog and my writings.

How To Build Manually
------------------------

### Prepare

```
#for editing the source
git clone git@github.com:utensil/utensil.github.io.git utensil-middleman
cd utensil-middleman/
git checkout -b middleman origin/middleman
gem install bundler
bundle

#for publishing
cd ..
git clone git@github.com:utensil/utensil.github.io.git utensil.github.io
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

Copyright (c) 2011-2014 Utensil Song (https://github.com/utensil)
