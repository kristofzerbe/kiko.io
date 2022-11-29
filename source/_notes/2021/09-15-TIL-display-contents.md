---
title: "#TIL | display: contents"
date: 2021-09-15 12:00:00
syndication: 
---

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
