---
title: "#Link | Run Promises Sequentially"
date: 2023-10-22
rel:
  verb: like-of
  caption: "Run JavaScript promises in series - 30 seconds of code"
  url: https://www.30secondsofcode.org/js/s/run-promises-in-series
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/111277842918707560
---

Uhh, this idea is good and I really need to try it out. Instead of going through an array of promises in a cumbersome way to make sure that the things run in sequence as sometimes needed, just use ``Array.reduce`` as Angelos Chalaris suggests:

```js
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());
```

#JavaScript

```cardlink
url: https://www.30secondsofcode.org/js/s/run-promises-in-series
title: "Run JavaScript promises in series - 30 seconds of code"
description: "Learn how to resolve promises one after another (sequentially) in JavaScript."
host: www.30secondsofcode.org
favicon: https://www.30secondsofcode.org/assets/icons/favicon-32x32.png?v=30swp20231218115417
image: https://www.30secondsofcode.org/assets/cover/sail-away-800.webp
```