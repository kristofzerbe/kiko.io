---
title: "#TIL | Execute ES6 module with node.js"
date: 2021-07-06 12:00:00
---

When executing a script designed as an ES6 module (f.e. ``node my-module.js``), it will fail with the error ``Cannot use import statement outside a module``.

Add ``"type": "module"`` to package.json and it will work.
