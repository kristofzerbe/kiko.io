---
title: "#TIL | Async Delay using Timeout"
date: 2021-07-05 12:00:00
syndication: 
---

A little helper function to delay the execution of a script asynchonously

```js
const delay = ms => new Promise((resolve, reject) => {
   setTimeout(_ => resolve(), ms)
});

await delay(1000);
```
