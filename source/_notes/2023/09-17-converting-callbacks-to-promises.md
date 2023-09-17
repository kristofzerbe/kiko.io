---
title: "Converting Callbacks to Promises"
date: 2023-09-17
syndication: 
- host: Mastodon
  url: 
---

Ever stumbled over an third-party JS librarywhich uses callbacks and had to build a Promise wrapper around it? In my today's readings, an article from Scott Robinson draw my attention, as he was [talking about an automatic conversion](https://stackabuse.com/converting-callback-apis-to-promises-in-node-js/) of these types of function calls. He utilizes **Bluebird**, which is able to convert a whole library into Promises with one call ... never noticed, but sooo useful!

[Bluebird](http://bluebirdjs.com/docs/getting-started.html)

#js #promise #callback #conversion