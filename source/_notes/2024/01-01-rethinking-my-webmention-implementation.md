---
title: "Rethinking my Webmention Implementation"
date: 2024-01-01
type: link
rel:
  verb: like-of
  caption: "janmonschke.com: Adding webmentions to your static blog"
  url: https://janmonschke.com/adding-webmentions-to-your-static-blog
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/111681633236614494
---

To start the new year, I decided to overhaul [my Webmention implementation](/post/Hexo-and-the-IndieWeb-Receiving-Webmentions/) in the next weeks, having already revised the display of incoming Webmentions and deleted the "good old" comments without replacement during my New Year's vacation.

I was triggered by **Jan Monschke** who, almost exactly a year ago, described in great detail how he implemented #Webmention on his GitHub-based blog and used its [#Actions](https://github.com/features/actions). The local storage of the data is particularly relevant for me here, as I currently only load it in the post via JavaScript from my endpoint [webmention.io](https://webmention.io). If the site goes down, there is suboptimally nothing more to see...

This will also be a good opportunity to finally integrate my Notes into the automatic Webmention sending (incl. setting the correct verbs such as ``u-in-reply-to``, ``u-repost-of`` ``u-like-of``, ``u-bookmark-of``, etc.), because at the moment I still do this manually via [webmention.app](https://webmention.app).

**Let's go** ... and a happy new year to everyone on the #IndieWeb

```cardlink
url: https://janmonschke.com/adding-webmentions-to-your-static-blog
title: "Adding webmentions to your static blog | Jan Monschke"
description: "The portfolio and blog of Jan Monschke"
host: janmonschke.com
favicon: https://janmonschke.com/assets/favicon-32x32.png
image: https://janmonschke.com/img/content/KdmuQLs0HQ-600.jpeg
```
