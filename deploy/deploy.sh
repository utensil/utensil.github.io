#!/bin/bash

lastCommit=$(git log --oneline | head -n 1)

# travis only pull one branch, this force git to recognize origin/master
echo "[STEP] ensure origin/master is in remote"
git remote set-branches --add origin master
git fetch
git branch -r

echo "[STEP] prepare git status before generating the site"
mkdir build
mv .git build/
cd build
git checkout -b master origin/master@{-1}
git checkout master
git branch -a
cd ../

echo "[STEP] generate the site"
mv build/.git ./
bundle exec middleman build --verbose
mv .git build/


cd build
echo "[STEP] set up $GH_REPO [via travis] for $GIT_NAME <${GIT_EMAIL}>"
export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
git config --global push.default simple
git config remote.origin.url $REPO_URL
git remote -v
git fetch origin HEAD:master
git status

echo "[STEP] push to Github Page"
git add --all -f .
git rm $(git ls-files --deleted|grep -v README.md)
git commit -m "$lastCommit"
git push origin HEAD:master
