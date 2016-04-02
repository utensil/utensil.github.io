#!/bin/bash

lastCommit=$(git log --oneline | head -n 1)

mkdir build
mv .git build/
cd build
git checkout -b master origin/master
cd ../

mv build/.git ./
bundle exec middleman build --verbose
mv .git build/

cd build

echo "set up $GH_REPO [via travis] for $GIT_NAME <${GIT_EMAIL}>"
export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
git config --global push.default simple
git branch -a
echo "STATUS"
git status
echo "remotes pre pre-authorized remote url"
git remote -v
git config remote.origin.url $REPO_URL
git pull origin HEAD:master

git add --all -f .
git rm $(git ls-files --deleted|grep -v README.md)
git commit -m "$lastCommit"
git push origin HEAD:master

#cd ..
#mv build/.git ./
#git checkout -b middleman origin/middleman