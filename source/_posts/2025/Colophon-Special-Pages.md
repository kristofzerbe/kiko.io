---
slug: Colophon-Special-Pages
title: Colophon - Special Pages
subtitle:
date: 2025-07-29 17:34:50
photograph:
  file: 22-08-Bretagne-Jersey-0210.jpg
  name: Automotive Beauty
  socialmedia: /static/images/social-media/Colophon-Specials.jpg
series: A New Blog
categories:
  - Misc
tags:
  - Hexo
related:
  - Colophon-Writing
  - Colophon-Hosting-Deployment
  - Colophon-Impetus-Technology
syndication:
  - host: Mastodon
    url: null
---

{% alertbox info %}
This is the fourth post in completing my [colophon](/Colophon). You can find links to the previous ones at the end of the article.
{% endalertbox %}

Of course, a blog is primarily intended for publishing articles, but to offer added value, these websites usually consist not only of the article pages themselves, but also of index pages, search pages, and other features, depending on the whims of the author and website developer. This site also has these special pages, which I will explain in this issue of my short series.

<!-- more -->

---

## Pages

In addition to posts, Hexo also has simple Pages without any time reference or other processed meta information. These pages are not listed on any overview page; instead, the Markdown is simply generated as it is. An example of this in this blog would be the 404 error page.

---

## Anything Pages

Hexo includes overview pages of posts based on the ``date`` on the start page and in the archive, as well as one overview page each for categories and tags, both of which I do not use.

To generate additional indexes based on my posts meta information, I use my own project [**Hexo Generator Anything**](/projects/hexo-generator-anything/), which is a fork of the long-standing *Hexo Index Anything*. This allows me to configure overview pages of posts dedicated to a specific topic, such as my [Series](/series/) or my [Projects](/projects/). In general, two pages are created: a MAIN INDEX page with a list of the available values of a meta entry (such as an overview of all my projects) and a POSTS INDEX page with the list of posts for a specific value (such as the posts for a project). Since version 2.0, Anything can also be configured to omit the MAIN PAGE, to pick just a few posts for an overview page, like my [Defaults](/defaults/) page. Each Anything page requires an additional MD file with an introductory text and some metadata on how it should be generated.

---

## Dynamic Pages

For all cases where Markdown is not enough or certain data must be collected beforehand or pulled from external sources, I have introduced so-called Dynamic Pages in my blog. These always consist of four parts:

- **Markdown file**, for introductory text and meta data
- **On-Generate-Before script**, to prepare all necessary data
- **EJS template**, to convert the data into HTML
- **Generator script**, to generate the page on build

I also use this page type when client-side JavaScript is required on the page to avoid having to embed scripts in Markdown. They are better placed in the EJS template, and I have significantly more options for manipulating the output as I need it.

Pretty much all of my [Slash Pages](/slashes/) are based on this four-part structure, such as the [Blogroll](/blogroll/), which processes external RSS feeds during generation, the [Tiny Tools](/tools/tiny-tools/), whose data is stored in synchronized Obsidian folder structures, even the [About](/about/) page, which offers a few interactive gimmicks using JS, but also more complex pages such as all of my [Photo](/photos/) pages or the [**Pagefind**](https://pagefind.app)-driven [Search](/search/).

---

## Others

The [Sitemap](/sitemap) is a truly unique page, as it is not composed of traditional HTML, but rather XML, formatted according to the [sitemaps.org protocol](https://www.sitemaps.org/protocol.html) and simply dressed up a bit using XSL. As a result, it does not really match the look and feel of the other pages on this blog. However, this makes it uncompromisingly machine-readable.
