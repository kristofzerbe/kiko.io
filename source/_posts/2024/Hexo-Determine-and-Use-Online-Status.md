---
slug: Hexo-Determine-and-Use-Online-Status
title: 'Hexo: Determine and Use Online Status'
subtitle:
date: 2024-12-28 12:47:01
photograph:
  file: D50_7042_2404.jpg
  name: Thomas Garden 24-04 XII
  socialmedia: /static/images/social-media/Hexo-Determine-and-Use-Online-Status.png
categories:
  - Tools
tags:
  - Hexo
  - JavaScript
  - Accessibility
related:
  - Generate-Content-from-Trello
  - Image-Masonry-Tag-Plugin-for-Hexo
  - Include-and-provide-JSON-data-in-Hexo-EJS-Templates
syndication:
  - host: Mastodon
    url: null
---

I have customized my Hexo installation a lot over the last few years to generate my blog kiko.io. This mainly concerns countless generators that help me to create content aside from posts and integrate it into the structure. There are also a few that have to load data from external web servers, such as my [Blogroll](/blogroll).

Sometimes I also travel to areas with only limited Internet coverage, as I am currently doing in the mountains of South Africa, and of course all those generators that need external data throw errors and the build process stops. Changing code on the off chance, committing it and hoping that the GitHub Action doesn't throw any errors is, to say the least, suboptimal. A small automatic switch was needed to at least allow me to build and test the new feature when working on the blog, as long as one of these generators is not affected.

<!-- more -->

For my current solution to the problem, I use the NPM package [**is-internet-available**](https://www.npmjs.com/package/is-internet-available) from [Javad Mnjd](https://github.com/jd1378), which checks the connection against a definable web server (the default is google.com) and returns a promise with the status, which I evaluate at the very beginning of the Hexo call chain (``onReady``) and store in the structure of the global ``hexo`` variables for later use. The script content is actually only 2 lines long. With the icing (console output), it's 4 lines:

```js
const log = require("hexo-log")({ debug: false, silent: false });
const { green, red } = require("chalk");
const { isInternetAvailable } = require('is-internet-available');

hexo.on('ready', async function(){

  const isOnline = await isInternetAvailable();
  hexo.status = isOnline ? "online" : "offline";

  let statusColor = isOnline ? green : red;
  log.info("Hexo is " + statusColor(hexo.status.toUpperCase()));
});
```

The following check is now placed at the start of the code wherever external data is accessed:

```js
if(hexo.status === "offline") { 
  log.error("NO NETWORK CONNECTION FOR XXX GENERATION");
  return null;
}
```

Just in line with the motto... don't even try, just get out.

So I can now tinker with the CSS offline as much as I like and still are able take a look at the stuff before I put it online.
