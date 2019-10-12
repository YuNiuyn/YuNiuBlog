#!/usr/bin/env sh
set -e
npm run build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/YuNiuyn/YuNiuBlog.git master:gh-pages
cd -