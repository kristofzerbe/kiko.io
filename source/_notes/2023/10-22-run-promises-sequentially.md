---
title: "#Link | Run Promises Sequentially"
date: 2023-10-22
hide: false
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/111277842918707560
---

Uhh, this idea is good and I really need to try it out. Instead of going through an array of promises in a cumbersome way to make sure that the things run in sequence as sometimes needed, just use ``Array.reduce`` as Angelos Chalaris suggests:

```js
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());
  ```

[30 Seconds Of Code - Run JavaScript promises in series](https://www.30secondsofcode.org/js/s/run-promises-in-series)

#JavaScript
