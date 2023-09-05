---
alias: /categories/JavaScript/Implement-source-switch-for-SPA/index.html
slug: Implement-source-switch-for-SPA
title: Implement source switch for SPA
subtitle: Asynchronous loading of JS and CSS depending on the environment
date: 2020-10-04T17:01:02.000Z
photograph:
  file: DSC_6063.jpg
  name: Illuminated Chair
  socialmedia: /static/images/social-media/Implement-source-switch-for-SPA.png
categories:
  - JavaScript
tags:
  - SPA
  - Bundling
related:
  - Better-Input-Change-Event
  - Localization-with-resource-files-in-JavaScript-web-apps
---
A while ago I wrote a Single Page Application (SPA) with jQuery and and decided to use some useful plugins to avoid reinventing the wheel. To keep the delivered sources small, I used the bundler [Gulp](https://gulpjs.com/), to pack all JS plugins in a single file and another one for my custom JS code. I used the same procedure with the CSS files.

The SPA contained only a single HTML file in which all bundeled sources and needed HTML template blocks were included, in order to load most of the stuff while starting the app, when the users sees a GMail-like  loading screen.

But the whole thing had one disadvantage: Debugging for example in Chrome Dev Tool is not a joy, if the code is packed with [Gulp Concat](https://www.npmjs.com/package/gulp-concat) and [Gulp Uglify](https://www.npmjs.com/package/gulp-concat). It would be much more convenient, if the source loading can be done depending on the environment.

<!-- more -->

First step was to replace the SCRIPT and LINK tags in die ``index.html`` with a dynamic loading approach using JavaScript.

## Dynamic JS loading

For some custom code it was necessary to load the plugins previously, because of dependencies.

```js
function addScriptAsync(url) {
  return new Promise(function(resolve, reject) {

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    script.addEventListener("load", function() {
      resolve(script);
    }, false);

    script.addEventListener("error", function() {
      reject(script);
    }, false);

    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
```

By returning a ``Promise``, the calling code is able to wait for a dependent source to load:

```js
addScriptAsync("Build/vendor.min.js").then(function() {
  addScriptAsync("Build/custom.min.js");
});
```

## Dynamic CSS loading

Loading CSS is pretty straightforward and includes an ``id`` as parameter, in order to be able to access the style afterwards, for example when tehh user is chanhing the SPA's theme: 

```js
function addStylesheet(url, id) {

  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = url;

  if (id) { stylesheet.setAttribute("id", id); }
  document.getElementsByTagName('head')[0].appendChild(stylesheet);
}
```

```js
addStylesheet("Build/vendor.css");
addStylesheet("Build/custom.css");
```

## Consider the environment

Now everything was set up to implement a switch, depending on whether the SPA was started locally or in production.

```js
var _DEV = (window.location.hostname.indexOf("localhost") !== -1);

addStylesheet("Build/vendor.css");
if (_DEV) {
  addStylesheet("Libraries/styles.css");
  addStylesheet("Libraries/helpers.css");
  ...
} else {
  addStylesheet("Build/custom.css");
}

addScriptAsync("Build/vendor.min.js").then(function() {
  if (_DEV) {
    addScriptAsync("Libraries/prototypes.js")
      .then(function() { return addScriptAsync("Libraries/tools.js"); })
      .then(function() { return addScriptAsync("Libraries/app.js"); })
      ...
  } else {
    return addScriptAsync("Build/custom.min.js");
  }
})

```

