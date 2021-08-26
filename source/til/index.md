---
title: "#TIL - Today I Learned"
date: 2021-07-05 12:01:00
hitcountId: WfGCn1IVy
photograph: 
  file: $til.jpg
  name: Riga Locks
  link: 'https://500px.com/photo/82409189/riga-locks-by-kristof-zerbe'
---

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
