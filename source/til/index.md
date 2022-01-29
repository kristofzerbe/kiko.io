---
title: "#TIL - Today I Learned"
date: 2021-07-05 12:01:00
photograph: 
  file: $til.jpg
  name: Riga Locks
  link: 'https://500px.com/photo/82409189/riga-locks-by-kristof-zerbe'
---

<section>
<time>29 Jan 2022</time>

## CSS's :where()

The [``:where()``](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) pseudo selector helps you writing cleaner code on the one hand. Instead of writing:

```CSS
.wrapper h1,
.wrapper h2,
.wrapper h3 {
  color: red;
}
```

... you can do:

```CSS
.wrapper :where(h1, h2, h3) {
  color red;
}
```

On the other hand, it is a so called **forgiving selector**, which rougly means, if one of the selectors in a selector list isn't exist valid, it works nevertheless.

</section>

<section>
<time>07 Jan 2022</time>

## IIS: Allow Plus sign in Url's

Due to [security reasons](https://blogs.iis.net/thomad/iis7-rejecting-urls-containing) IIS only allows the ``+`` sign in query strings. But sometimes you may have an image file like ``landscape + night.jpg``, which won't be shown on your website.

The solution is, to allow unescaped plus signs in ``web.config`` and also do a rewrite to UrlDecode the requested Uri:

```xml
<configuration>
  <system.webServer>
    <security>
      <requestFiltering allowDoubleEscaping="True" />
    </security>
    <rewrite>
      <rules>
        <rule name="RewriteUserFriendlyURL1" stopProcessing="false">
          <match url="\+" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="{UrlDecode:{REQUEST_URI}}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

[Source](http://n8v.enteuxis.org/2010/07/convincing-iis7-to-accept-urls-containing-plusses/)

</section>

<section>
<time>21 Oct 2021</time>

## Optional Chaining on Methods and Indexes

In ECMAScript 2020 the optional chaining operator was introduced into JavaScript. The question mark right behind the property name helps to prevent null reference exceptions:

```js
const foo = { bar: null };

foo.bar.prop // TypeError: Cannot read properties of undefined = NullReferenceException

foo?.bar?.prop // undefined
```

This works also on methods calls and index access:

```js
foo.doSomething.?()
foo.aList.?[0]
```

Important: The parentheses for the parameter listing or the index expression must be preceded by a period!

</section>

<section>
<time>10 Oct 2021</time>

## Convert backslash into forward slash

While developing Node.js on Windows and dealing with paths, like ``path.join``, the folder separator will be a backslash always. But on the web a forward slash is recommended. Most browsers have no problem showing an image with a relative path like ``/images\my-image.jpg``, but it is not ideal.

Replacing backslashes with foreward slashed seems easy, but it has its pitfalls, because JS uses the backslash for escaping. A safe way to address backslashes on replacing is to use its octal representation ``\134``:

```js
let myPath = path.join(root, "images", "my-image.jpg").replace(/\134/g,"/");
```

Another way to get correct paths, you can use Node's path methods ``normalize`` or ``resolve``.

</section>

<section>
<time>26 Sep 2021</time>

## Debugging Hexo with VSCode

If you want to debug your own [Hexo generators](https://hexo.io/api/generator.html) within VSCode, you have to create an entry in your ``./.vscode/launch.json``, which points to Hexo CLI with the argument ``generate``:

```json
"version": "0.2.0",
"configurations": [
  {
    "type": "node",
    "request": "launch",
    "name": "hexo generate",
    "program": "${workspaceFolder}/node_modules/hexo-cli/bin/hexo",
    "args": [
      "generate"
    ]
  }
]
```
</section>

<section>
<time>15 Sep 2021</time>

## display: contents

Some HTML elements does not have a visual styling, because their purpose is to 'group' others. But those wrappers have sometimes a negative effect on styling with techniques like ``grid`` or ``flex``. 

``display: contents`` makes those elements a hidden ghost if needed, for easier styling of its children.

```html
<style>
  .box-content { display: contents }
</style>

<div class="box">
  <div class="box-content">
    <h2><!-- Title --></h2>
    <p><!-- Description --></p>
  </div>
  <img src="image.jpg" alt="">
</div>
```

... will be parsed by the browser like:

```html
<div class="box">
  <h2><!-- Title --></h2>
  <p><!-- Description --></p>
  <img src="image.jpg" alt="">
</div>
```
</section>

<section>
<time>06 Jul 2021</time>

## Execute ES6 module with node.js

When executing a script designed as an ES6 module (f.e. ``node my-module.js``), it will fail with the error ``Cannot use import statement outside a module``.

Add ``"type": "module"`` to package.json and it will work.
</section>

<section>
<time>05 Jul 2021</time>

## Async Delay using Timeout

A little helper function to delay the execution of a script asynchonously

```js
const delay = ms => new Promise((resolve, reject) => {
   setTimeout(_ => resolve(), ms)
});

await delay(1000);
```
</section>

<section>
<time>02 Jul 2021</time>

## Detect Touch Input Devices

As of the W3C draft of Media Queries Level 5, touch devices can be detected by using the ``hover`` and the ``pointer`` media feature:

```css
/* smartphones, touchscreens */
@media (hover: none) and (pointer: coarse) {
    /* ... */
}

/* mouse, touch pad */
@media (hover: hover) and (pointer: fine) {
    /* ... */
}
```

</section>

<section>
<time>05 Jan 2021</time>

## Module Script Access

When using ``<script type="module">``, which allows to dynamically include ES6 modules via ``import``, and bootstrapping the app in the script via ``var app = new App();``, there is no access to ``app`` in developer tools or links with ``javascript: app.myFunc()``. It has to be made visible by ``window.app = New App();``.

</section>
