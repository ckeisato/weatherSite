rm -rf public
gulp build
cd public
git init
git add -A
git commit -m 'update weatherSite'
git push -f git@github.com:ckeisato/weatherSite.git master:gh-pages
