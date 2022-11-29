---
title: "#TIL | Module Script Access"
date: 2021-01-05 12:00:00
syndication: 
---

When using `<script type="module">`, which allows to dynamically include ES6 modules via `import`, and bootstrapping the app in the script via `var app = new App();`, there is no access to `app` in developer tools or links with `javascript: app.myFunc()`. It has to be made visible by `window.app = New App();`.
