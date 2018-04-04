# turtlecoin.lol

[![Build Status](https://travis-ci.org/jerme404/turtlecoin.lol.svg?branch=master)](https://travis-ci.org/jerme404/turtlecoin.lol)

To submit or propose changes to the main marketing page, submit a pull request to this repository

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/)


Gulp
```
npm install -g gulp
```
### Build Instructions

Clone the repository.
```
git clone https://github.com/turtlecoin/turtlecoin.lol
cd turtlecoin.lol
```
Install packages
```
npm install
```
Run tests
```
gulp test
```
Build
```
gulp build
```

## Adding a Language
Files in the languages folder are combined during the build process. The language picker is automatically populated with the available languages, so no need to edit any HTML to add a language.
* Copy languages/en.json to your-language.json, like es.json, de.json, etc.
* Translate everything.
* Run gulp build. If any of your formatting is bad, you'll see an error.  
* If no errors, your language is now included.  Open www/index.html in a browser to see it in action.
