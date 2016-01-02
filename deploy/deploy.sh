#!/bin/bash

# check out master to "build" and clean up

git clone --depth=50 --branch=master git://github.com/utensil/utensil.github.com.git build
(
  cd build
  # remove all files except README.md, .git and .travis.yml
  ls -1|grep -v README.md|xargs rm -rf
)

# build site to "build"

bundle exec middleman build --verbose

lastCommit=$(git log --oneline | head -n 1)

# push to remote

cd build

echo "set up $GH_REPO [via travis] for $GIT_NAME <${GIT_EMAIL}>"
export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
git config --global push.default simple
git branch -a
echo "STATUS"
git status
git remote rename origin old
echo "remotes pre pre-authorized remote url"
git remote -v
git remote add origin $REPO_URL
git config remote.origin.url $REPO_URL

git add --all -f .
git rm $(git ls-files --deleted|grep -v README.md)
git commit -m "$lastCommit"
git push origin HEAD:master
