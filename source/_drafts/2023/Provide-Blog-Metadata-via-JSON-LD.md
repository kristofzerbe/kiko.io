---
slug: Provide-Blog-Metadata-via-JSON-LD
title: Provide Blog Metadata via JSON-LD
subtitle:
date: 2023-01-31 15:36:21
photograph:
  file: D70_9216.jpg
  name: Broken Onion
  link: https://500px.com/photo/1031574243
series: A New Blog
categories:
  - Tools
tags:
  - Hexo
  - Search
  - Blogging
related:
  - Pagefind-UI-and-URL-Parameters
  - Integration-of-Pagefind-in-Hexo
  - The-State-of-the-Blog
syndication:
  - host: Mastodon
    url: null
---

Chris Coyier's post "Open Graph Blues" got me thinking that my blog's metadata, which are used by Google among others to index my pages, aren't really at the cutting edge anymore. I took the markup of the individual elements of the pages via [schema.org](https://schema.org) Microdata attributes from the standard Hexo template years ago and always adjusted it by value, but never questioned that there are more modern variants to provide the metadata.

It's Ok for Google to use Microdata attributes, but the HTML code of my templates is getting more and more opaque, because next to these stick to the tags also those for the Indieweb, classes for CSS and last but not least those for the own indexing via Pagefind. There becomes from a simple

```html
<article>
  <h1>Title of my latest blog post</h1>
  <p> ... </p>
</article>
```

quickly becomes a ...

```html
<article class="article-type-post h-entry" 
        data-pagefind-body="" data-pagefind-meta="type:Article" itemscope itemprop="blogPost">
  <h1 class="article-title p-name" 
      itemprop="name">Title of my latest blog post</h1>
  <p> ... </p>
</article>
```

Lots of textual overhead and the hardest part is maintaining it over the long term. Better would be a complete search engine description in the HEAD, where also the other meta information is stored. JSON-LD to the rescue...

<!-- more -->

## Structured Meta Data

Google has published tons of information in its [Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) on how to place metadata on your page to be found more easily in the index. You can also see that they are maintained by the update date of individual pages, for example "*Last updated 2023-01-26 UTC*". End of last week. That's up to date, fine.

