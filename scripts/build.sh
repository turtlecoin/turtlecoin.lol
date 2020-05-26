#!/usr/bin/env bash
set -euox pipefail

echo "Build starting"

# Get the latest turtlecoin/paper-turtle
git submodule update --recursive --remote --merge

# Generate the static site
rm -rf ./_site
bundle exec jekyll build

# Setup paper-turtle (auto copied by Jekyll) in the build folder
rm -rf _site/paper-turtle/.git
mv _site/paper-turtle _site/wallet

#bundle exec rake tests

echo "Build complete"