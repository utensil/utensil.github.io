utensil.github.io
=====================

My personal blog, including my technical blog and my writings.

How To
--------

### Prepare

```
#for editing the source
git clone git@github.com:utensil/utensil.github.com.git utensil-middleman
cd utensil-middleman/
git checkout -b middleman origin/middleman
gem install bundler
bundle

#for publishing
cd ..
git clone git@github.com:utensil/utensil.github.com.git utensil.github.com
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
cd utensil.github.com
cp -rf ../utensil-middleman/build/* ./
git commit -a -m 'commit log'
git push origin
```

Licence
--------

MIT Licence, see LICENCE.
Copyright (c) 2011-2014 Utensil Song (https://github.com/utensil)