---
slug: How-to-consume-web-feeds-as-JSON-in-Node-JS
title: How to consume web feeds as JSON in Node.JS
subtitle: Building a blogroll with the latest posts
date: 2024-06-08 15:47:14
photograph:
  file: 23-09-11-Speyer-0041.jpg
  name: Mercedes Gold
  socialmedia: /static/images/social-media/How-to-consume-web-feeds-as-JSON-in-Node-JS.png
series: A New Blog
categories:
  - Coding
tags:
  - JavaScript
  - Node.js
related:
  - Manipulation-of-Lists-within-a-Sentence-of-Natural-Language
  - My-Switch-to-Obsidian
  - Generate-Content-from-Trello
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112581793409878030
---

Weekend! To compensate another turbulent management week I needed a little HTML/CSS/JS tinkering. The most willing victim was the idea to add the feeds of the great bloggers to [my new blogroll](/blogroll), I was working on, and then read out the latest post from the feed and display it as well. Greetings to Ryan Mulligan, whose [Blogroll](https://ryanmulligan.dev/blogroll/) gave me the impetus for this.

My new blogroll is based on an **Obsidian** file in which I collect links from bloggers worth following in the form of card links. If I discover someone new who should be on the blogroll, I simply share the link with Obsidian, where I previously opened the blogroll file, and convert the link using the Card Link Replace command. In the background, the blogroll file is then automatically copied to my blog project via OneDrive and SyncBack on my home server, where it is automatically processed the next time it is generated. Or I upload it directly to GitHub and the new entry is immediately available on kiko.io.

<!-- more -->

The nice thing about the Obsidian plugin [Auto Card Link](https://github.com/nekoshita/obsidian-auto-card-link) is that it retrieves the most important meta information about the website from the corresponding server during the conversion and stores it in the Markdown file in frontmatter format:

````
```cardlink
url: https://kiko.io
title: "kiko.io - Memorable (Tech) Stuff"
description: "Blog about memorable (tech) stuff by Kristof Zerbe"
host: kiko.io
favicon: https://kiko.io/favicon.ico
image: https://kiko.io/images/hero.jpg
feed: ...
```
````

What is missing, of course, is the respective URL to the **feed**. I then have to copy this manually into the meta data as a new ``feed`` attribute.

To convert the data in my Hexo-powered blog project, I use one of my so-called **Dynamic Pages**, which always consist of the following components: a **Markdown file** for the introductory text, a specific **Hexo generator** and a special **layout file in EJS format**. In the generator, I load the copy of the Obsidian blogroll file, read in the existing entries and store them as items for the page to be created via the layout file.

This part of the weekend was still easy. What took a little longer was the solution for the **Latest Post**. One reason for this is that every blogger has their own idea of what a feed of their own posts should look like. I came across RSS in various versions, Atom and JSON feeds. Sometimes sorted by date in descending order, sometimes in ascending order, sometimes not sorted at all. In order not to make my life unnecessarily difficult, I tried to find at least the lowest common denominator on the bloggers' sites, namely RSS 2.0 or at least one in XML format.

---

## Fetching feed and convert to JSON

Fetching the respective feed endpoint in my generator was still easy thanks to [axios](https://github.com/axios/axios), but parsing the XML content with Node.JS on-board methods is not a pleasure. I needed a specialised Node library for this. Someone clever will have had the need to convert any feed to JSON! Google says this person was **Dan MacTough** with his [node-feedparser](https://github.com/danmactough/node-feedparser) many many moons ago and indeed the description of the GitHub readme read like the solution. But Google also told me that there is a library called [feed2json](https://www.npmjs.com/package/feed2json), which also converts RSS and Atom feeds into JSON feeds and can even be used online at [feed2json.org](https://feed2json.org). On closer inspection, the actual credits for feed2json also belong to Dan, as it is merely a wrapper around node-rssparser.

The lib was quickly installed with NPM ... and here is the part of the code that does the main work - significantly pseudo-shortened, but commented:

```js
const axios = require('axios');
const feed2json = require('feed2json');

let promises = [];

// iterate over entries in blogroll for page.items => fmBlog
... {
  promises.push(new Promise((resolve, reject) => {

    // fetch feed, while skipping errors
    axios.get(fmBlog.feed, { validateStatus: () => true }).then(response => {

      // parse result
      feed2json.fromString(response.data, fmBlog.feed, (error, json) => {
        if (!error) {

          // sort posts by published date descending
          json.items.sort((a,b) => a.date_published - b.date_published).reverse();

          // get latest post
          let feedItem = json.items[0];

          // transfer needed data to item
          fmBlog.latest_post = {
            "url": feedItem.url,
            "title": feedItem.title,
            "date_published": feedItem.date_published
          };

          // add new item for entry
          page.items.push(fmBlog);

          resolve();
        } else {
          reject();
        }
      });
    });
  }));
}

// resolve all promises
return Promise.all(promises).then(function() {

  // sort blogs on page by latest post
  page.items.sort((a,b) => a.latest_post.date_published - b.latest_post.date_published).reverse();

  // ... return page for generation via layout
});
```

The wonderful thing about this code is its simplicity thanks to the wrapper and the underlying parser library. You can find the complete Hexo blogroll generator that leads to this result here:

* [../scripts/generator-dynamic-blogroll.js](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/scripts/generator-dynamic-blogroll.js)
* [../layout/blogroll.ejs](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/layout/blogroll.ejs)
* [../source/_dynamic/blogroll.md](https://github.com/kristofzerbe/kiko.io/blob/master/source/_dynamic/blogroll.md)

I currently have 28 entries on my blogroll and the page is generated in around 3 seconds on my little Surface notebook. Of course, it also depends a little on how accessible the feeds are. To ensure that axios does not stop the whole process when downloading, it is advisable to simply skip them. 
