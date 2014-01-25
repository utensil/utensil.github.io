#!/bin/bash

# check out master to "build" and clean up

git clone --depth=50 --branch=master git://github.com/utensil/utensil.github.com.git build
(
  cd build
  # remove all files except .git and .travis.yml
  ls -1|xargs rm -rf
)

# build site to "build"

bundle exec middleman build

lastCommit=$(git log --oneline | head -n 1)

cd build
git add -f .
git commit -m $lastCommit
git config remote.origin.url
git push origin
