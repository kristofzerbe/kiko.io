---
slug: Provide-Blog-Metadata-via-JSON-LD
title: Provide Blog Metadata via JSON-LD
subtitle: Centralization of a website's schema.org data in the HEAD instead of everywhere in the HTML
date: 2023-02-05
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
hidden: true
---

Chris Coyier's post "[Open Graph Blues](https://chriscoyier.net/2023/01/28/open-graph-blues/)" got me thinking that my blog's metadata, which are used by Google among others to index my pages, aren't really at the cutting edge anymore. I took the markup of the individual elements of the pages via [schema.org](https://schema.org) Microdata attributes from the standard Hexo template years ago and always adjusted it by value, but never questioned that there are more modern variants to provide the metadata.

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

Lots of textual overhead and the hardest part is maintaining it over the long term. Better would be a complete search engine description in the haeder of a page, where also the other meta information is available. JSON-LD to the rescue...

<!-- more -->

---

## Structured Meta Data ...

Google has published tons of information in its [Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) on how to place metadata on your page to be found more easily in the index. You can also see that they are maintained by the update date of individual pages, for example "*Last updated 2023-01-26 UTC*". End of last week. That's up to date, fine.

Of course, they also show how to use Microdata, but recommended is the use of [JSON-LD](https://json-ld.org/), a structured and centralized inclusion of the required information via a SCRIPT tag in the header of the page. Thereby information about the **website** in general, the **author**, the **organization** behind it and the actual **article** page can be combined separately in one piece of JSON code.

{% alertbox exclamation %}
Google's solution is based on schema.org, but they have picked only what is necessary for them, which means: they deal only with a subset of the schema.org types.
{% endalertbox %}

Since it is somewhat cumbersome to write correct JSON-LD by hand, there are of course online editors for it, e.g. within the [web code tools](https://webcode.tools/generators/structured-data) or [Merkle](https://technicalseo.com/tools/schema-markup-generator/).

---

## ... Author

First of all, this code is about me myself and I...

```json
{
  "@context": "http://schema.org/",
  "@type": "Person",
  "@id": "kiko.io/#person",
  "name": "Kristof Zerbe",
  "url": "https://kiko.io/about",
  "image": "https://kiko.io/images/kristof-zerbe.png",
  "sameAs": [
    "https://indieweb.social/@kiko",
    "https://github.com/kristofzerbe",
    "https://500px.com/p/kikon"
  ]  
}
```

{% alertbox info %}
It is advisable to include so called **Node Identifiers** (``@id``) in order to reuse certain information later on as a reference and prevent repeating data.
{% endalertbox %}

---

## ... Organization

Most blogs are run by individuals and not necessarily by organizations, so you might think this area would not be interesting, but it is for a reason: only here you can deposit the link to a logo of your blog, which can then be displayed in the search.

```json
{
  "@context": "http://schema.org/",
  "@type": "Organization",
  "@id": "kiko.io/#organization",
  "name": "kiko.io",
  "url": "https://kiko.io",
  "logo": "https://kiko.io/images/apple-touch-icon.png"
}
```

---

## ... Website

The JSON block related to this website itself looks like this:

```json
{
  "@context": "http://schema.org/",
  "@type": "WebSite",
  "@id": "kiko.io/#website",
  "url": "https://kiko.io",
  "name": "kiko.io",
  "description": "Blog about memorable tech stuff by Kristof Zerbe",
  "inLanguage": "en-US",
  "publisher": {
      "@id": "kiko.io/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://kiko.io/search/?q={searchTerm}"
    },
    "query-input": "required name=searchTerm"
  }
}
```

Remarkable in this block is the ``potentialAction``, which specifies the possibility to let the search engine (Google, whatelse) integrate a Sitelinks Search Box, a search box inside the result list, as described [here](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox). There is a shorthand format for this and some generators like Merkle are using it, but it is not recommended, because it's non-standard.

---

## ... Page Specific Data

The last blocks can be output on any page, as they describe the blog and the person behind in general, but the following are page-specific and differs depending on the page, of course.

### Images

I use my own photographs on every page as header images and to provide some additional information on these, there is a JSON block for those images.

```json
{
  "@context": "http://schema.org/",
  "@type": "ImageObject",
  "@id": "kiko.io#photo",
  "contentUrl": "https://kiko.io/photos/normal/D70_9216.jpg",
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "acquireLicensePage": "https://kiko.io/photos",
  "creditText": "Kristof Zerbe",
  "copyrightNotice": "Kristof Zerbe (CC BY-SA 4.0)",
  "creator": {
    "@id": "kiko.io/#person"
  }
}
```

For better recognition of my posts, I generate a special image for each blog post for the social media platforms. It is based on the  photo associated with the post and includes the it's title and subtitle in addition to the logo. How I generate these things can be read in my post {% post_link 2021/Generate-Social-Media-Images-Automatically %}. For this image there is a second JSON block, with which I can reference it in the further:

```json
{
  "@context": "http://schema.org/",
  "@type": "ImageObject",
  "@id": "kiko.io#socialMediaImage",
  "contentUrl": "https://kiko.io/images/social-media/Provide-Blog-Metadata-via-JSON-LD.png",
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "acquireLicensePage": "https://kiko.io/photos",
  "creditText": "Kristof Zerbe",
  "copyrightNotice": "Kristof Zerbe (CC BY-SA 4.0)",
  "creator": {
    "@id": "kiko.io/#person"
  }
}
```

![Social Media image of this post](/images/social-media/Provide-Blog-Metadata-via-JSON-LD.thumb.png)

### Article

```json
{
  "@context": "http://schema.org/",
  "@type": "Article",
  "@id": "kiko.io#socialMediaImage",
  "headline": "Provide Blog Metadata via JSON-LD",
  "image": [
    "https://kiko.io/images/social-media/Provide-Blog-Metadata-via-JSON-LD.png"
  ],
  "datePublished": "2023-02-02T12:00:00+00:00",
  "dateModified": "2023-02-02T12:00:00+00:00",
  "author": [{
    "@id": "kiko.io/#person"
  }],
  "publisher": [{
      "@id": "kiko.io/#organization"
  }]
}
```

Here the identifiers defined in the other blocks are used for referencing the ``author`` and the ``publisher``, as in the block ``website``.

---

## Gluing all together

...

---

## Test your JSON-LD

When you have everything together, it is advisable to test the resulting code. Schema.org offers such a tool at **[https://validator.schema.org/](https://validator.schema.org/)**. In addition, there is the [Google Rich Results Test](https://search.google.com/test/rich-results), which validates your code against the partially specific implementation for their own search engine.

![]()

---

## More Information

{% moreinfo '{ "list": [
  [ "Google Search Central", "Introduction to structured data markup in Google Search",
  "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" ],
  [ "Patrick Coombe and Craig Mount", "Steal Our JSON-LD",
  "https://jsonld.com/" ],
  [ "Andrew Welch", "Annotated JSON-LD Structured Data Examples",
  "https://nystudio107.com/blog/annotated-json-ld-structured-data-examples" ],
  [ "Alberto Carniel", "Schema markup and structured data ultimate guide (JSON-LD)",
  "https://www.albertocarniel.com/post/schema-markup" ],
  [ "Brian Gorman", "An SEO’s Guide to Writing Structured Data (JSON-LD)",
  "https://moz.com/blog/writing-structured-data-guide" ],
  [ "Merkle", "Schema Markup Generator (JSON-LD)",
  "https://technicalseo.com/tools/schema-markup-generator/" ],
  [ "webcode.tools", "Generators > Structured Data",
  "https://webcode.tools/generators/structured-data" ]
]}' %}