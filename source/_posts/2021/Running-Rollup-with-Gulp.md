---
title: Running Rollup with Gulp
subtitle: Use Rollup.js as JavaScript bundler in your Gulp pipeline
date: 2021-07-29 15:34:03
hitcountId:
photograph:
  file: 20-08 Mallorca-6871.jpg
  name: Coal Flame
  link: 'https://500px.com/photo/1023572877'
categories:
  - JavaScript
tags:
  - SPA
  - Bundling
related:
  - Implement-source-switch-for-SPA
  - Remote-Testing-and-Debugging-with-Chrome
---

Writing an SPA (Single Page Application) in JavaScript/CSS always means to keep an eye on small files to deliver. Especially when utilizing a bunch of libraries and frameworks, bundling is some sort of a must. The offer on bundlers and task runners is large on the web: [WebPack](https://webpack.js.org/), [Snowpack](https://www.snowpack.dev/), [Browserify](https://browserify.org/), [Parcel](https://parceljs.org/), [Grunt](https://gruntjs.com/), [Gulp](https://gulpjs.com/) and "DingDong" (just replace with the hotest new shit available).

But, it is not always necessary to replace your complete building pipeline, when the new "DingDong" is hyped in the media. Brave old tools like [Gulp](https://gulpjs.com) are doing their job pretty well ... and you are able to integrate some more modern approaches on bundling JS, for example.

I couple of months ago, while working on a private project, I became attentive to [Rollup.js](https://www.rollupjs.org/), a next-generation JavaScript module bundler from Rich Harris, the author of Svelte. Rollup uses the new standardized format for code modules included in the ES6 revision of JavaScript and supports Tree-Shaking, which means that it analyzes all your ES6 ``imports`` statements and bundles only the code which is used. Pretty cool ... but ... it is a JavaScript bundler only and there are no plugins for Gulp, my favourite task runner.

In this article I will show you, how to integrate Rollup in your Gulp bundling pipeline.

<!-- more -->

---

## Install Rollup

Best practice is to install Rollup globally:

```js
npm install --global rollup
```

---

## The Gulp File

Starting point was my ``gulpfile.js`` as follows:

```js gulpfile.js
const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const cssimport = require("gulp-cssimport");
const cleancss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

/* Clean distribution folder */
function clean() {
    return del('./dist/**', { force: true });
}

/* Bundle CSS with sourcemapping, imports and cleaning */
function css() {
  return src('./styles/app.css')
    .pipe(sourcemaps.init())
    .pipe(cssimport({}))
    .pipe(cleancss({ debug: true }, (details) => {
      console.log(`${details.name} BEFORE: ${details.stats.originalSize}`);
      console.log(`${details.name} AFTER: ${details.stats.minifiedSize}`);
    }))
    .pipe(sourcemaps.write('.', { sourceRoot: '/styles' }))
    .pipe(dest('./dist/'));
}

exports.default = series(clean, css);

```

This pipeline only bundles CSS yet, when calling ``gulp`` in the command line.

---

## Calling Rollup for JS bundling

Rollup has [dozens of parameters](https://www.rollupjs.org/guide/en/#command-line-reference) to define everything you need, but it also supports a config file, which allows you to configure everything there and run ``rollup -c`` only. Very useful on this approach.

```js rollup.config.js
export default {
  input: './js/app.js',
  output: {
    file: './dist/app.js',
    format: 'es',
    sourcemap: true
  }
};
```

As there is no Gulp plugin for Rollup, we need to execute Rollup in the Gulp pipeline by command. For this I've created a helper in my ``gulpfile.js``, to be able to execute whichever command:

```js gulpfile.js
let HELPERS = {
  execute: (command) => {
    const process = exec(command);
    process.stdout.on('data', (data) => { console.log(data.toString()); })
    process.stderr.on('data', (data) => { console.log(data.toString()); })
    process.on('exit', (code) => { 
      console.log('Process exited with code ' + code.toString()); 
    })
    return process;
  }
}
```

This helper is used in a Gulp command function to call Rollup:

```js gulpfile.js
function javascript() {
    return HELPERS.execute('rollup -c');
}
```

The last thing I had to do, is to insert the command in the pipeline to run in parallel to the CSS bundling:

```js gulpfile.js
exports.default = series(clean, parallel(css, javascript));
```

Pretty straightforward, isn't it? Happy bundling with Rollup and Gulp...