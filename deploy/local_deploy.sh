GIT_NAME=utensil GIT_EMAIL=utensilcandel@gmail.com GH_REPO=utensil/utensil.github.io GH_TOKEN=utensil bash deploy/deploy.sh
cd build
git checkout middleman
cd ..
mv build/.git ./
