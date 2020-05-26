#!/usr/bin/env bash
set -euox pipefail

remote_branch="gh-pages"
remote_repo=${GITHUB_URL:-`git config remote.origin.url`}
current_sha=`git rev-parse HEAD`

echo "Deployment starting for SHA $current_sha"

cd ./_site
git init
git add .
git commit -m "Generated site for SHA $current_sha"
git push --force $remote_repo master:$remote_branch
rm -rf .git
cd ../

echo "Deployment completed"