#!/bin/bash

echo -e "\033[0;32mDeploying root...\033[0m"

# Build the project.
hugo -t "kijtra"

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
git subtree push --prefix=public https://github.com/kijtra/kijtra.github.io.git master


echo -e "\033[0;32mDeploying public directory...\033[0m"

# Go To Public folder
cd public
# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back
cd ..
