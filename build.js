#!/usr/bin/env node

/*
Metalsmith build file
See the "scripts" section in package.json for usage
From: https://github.com/craigbuckler/metalsmith-demo/blob/master/build.js
*/

'use strict';

// Packages
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');

// Configuration
const dir = {
  base: __dirname + '/',
  destination: './build/',
  layouts: './src/layouts',
  source: './src/',
  html: './src/html/'
};

const isDevEnv = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production');
const browserSync = isDevEnv ? require('metalsmith-browser-sync') : null;

// Build pipeline
const metalsmith = Metalsmith(dir.base)
  .clean(!isDevEnv)
  .source(dir.html)
  .destination(dir.destination)
  .use(layouts({
    default: 'layout.html',
    directory: dir.layouts,
    engine: 'handlebars'
  }));

if (browserSync) {
  metalsmith.use(browserSync({
    files: [`${dir.source}**/*`],
    server: dir.destination,
  }));
}

metalsmith.build(function (err) {
  if (err) {
    throw err;
  }

  console.log('Build finished!');
});
