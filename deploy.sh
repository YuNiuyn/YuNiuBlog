#!/usr/bin/env sh
set -e
npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/YuNiuyn/YuNiuyn.github.io.git master
cd -