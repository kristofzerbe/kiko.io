---
slug: Head-Care
title: Head Care
subtitle: Cleaning up META and LINK tags
date: 2024-07-18 10:38:17
photograph:
  file: 23-08-Mecklenburg-Seen-0433.jpg
  name: Sparkling Duck
  socialmedia: /static/images/social-media/Head-Care.png
categories:
  - Coding
tags:
  - HTML
  - Meta
  - Publishing
related:
  - Include-and-provide-JSON-data-in-Hexo-EJS-Templates
  - Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
  - Get-and-use-a-dominant-color-that-matches-the-header-image
syndication:
  - host: Mastodon
    url: null
---

Actually, I just wanted to add the [blogroll link tag](https://opml.org/blogroll.opml) to the header of my blog, which [Dave Winer](http://davewiner.com/) mentioned in a comment on Dan Q's post [.well-known/feeds](https://danq.me/2023/08/23/well-known-feeds/#comment-246479). But since I was already in my [``head.ejs``](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/layout/_partial/head.ejs), I tidied up and reorganised it a bit. It's like a basement: you just put things in there and at some point it looks messy.

So I went through every META and LINK tag and researched it in documentaries or pseudo-documentaries and also looked at a lot of page sources from sites whose creators should know how to do it. The picture wasn't consistent, how could it be otherwise, but I did pick up a few things, including new ones, and integrated them in my head. (Nice wordplay)

<!-- more -->

---

## meta name="viewport"

This HTML5 classic has remained unchanged and is essential for a responsive web design. It tells the browser how to control the dimensions and scaling of the viewport.

``` html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

{% moreinfo_label "More Info:" '[
  [ "MDN Web Docs", "Viewport meta tag", "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag" ]
]' %}

---

## meta name="generator"

This tag indicates which software was used to generate a website and I have noticed it in some page source texts and it is also included in the HTML5 specs. I couldn't find out what deeper meaning this information has for browsers/crawlers et al, but I'm always up for useless but descriptive things :)

``` html
<meta name="generator" content="Hexo 7.2.0">
```

{% moreinfo_label "More Info:" '[
  [ "whatwg.org", "HTML Standard - Standard metadata names", "https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names" ]
]' %}

---

## link rel="canonical"

One of the most important link tags intended for search engines, it indicates whether a page is "canonical", i.e. the only true source of information. It identifies the preferred and most representative version of a piece of content that may be available on several URLs and prevents it from slipping down the search engine index due to duplicates.

``` html
<link rel="canonical" href="https://kiko.io/post/Head-Care/">
```

{% moreinfo_label "More Info:" '[
  [ "Wikipedia", "Canonical link element", "https://en.wikipedia.org/wiki/Canonical_link_element" ],
  [ "Google Search Central", "How to specify a canonical with rel=&quot;canonical&quot; and other methods", "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls" ]
]' %}

---

## meta name="title | description | excerpt"

These three tags form the foundation for all automatic processing of a page, be it search engines, social media services or those from the federated web. Without them, there are no headlines or teaser texts on Google and Co. and you will probably not even be included in the index.

I keep fiddling around with the excerpt again and again, because it is sometimes quite complex to generate a reasonable text excerpt from my Markdown content. I haven't found the ultimate solution yet. At the moment I'm trying to help myself with RegEx and a few libs.

By the way, I have completely stopped offering meta keywords at this point. They don't really work anyway and are more of a relic from the past.

``` html
<meta name="title" content="Head Care - kiko.io">
<meta name="description" content="Cleaning up META and LINK tags">
<meta name="excerpt" content="Actually, I just wanted to add ... [more text]"
```

{% moreinfo_label "More Info:" '[
  [ "whatwg.org", "HTML Standard - Standard metadata names", "https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names" ]
]' %}

---

## meta property="og: ..."

Open Graph, and thus the ``og:`` meta tags, is an invention of Facebook, but is now very widespread, open source and has become a near-standard. It defines attributes that make an object, in this case a web page, an object in a **social graph**. We already know ``url``, ``title`` and ``description`` from other meta tags, which are repeated here but enriched with additional attributes. I find ``og:image`` as a very useful way of specifying a representation image that is displayed as a visual equivalent when linking to a Facebook or Mastodon post, for example.

``` html
<meta property="og:site_name" content="kiko.io">
<meta property="og:type" content="blog">
<meta property="og:url" content="https://kiko.io/post/Head-Care/">
<meta property="og:title" content="Head Care - kiko.io">
<meta property="og:description" content="Cleaning up META and LINK tags">
<meta property="og:logo" content="https://kiko.io/images/icon-192x192.png" />
<meta property="og:image" content="https://kiko.io/images/social-media/Head-Care.png">
<meta property="og:locale" content="en_US">
```

{% moreinfo_label "More Info:" '[
  [ null, "The Open Graph protocol", "https://ogp.me/" ]
]' %}

---

## meta property="twitter: ..."

The so-called Twitter Card Tags were a kind of counter-design from Twitter to Facebook's Open Graph and generally complement it today. I don't really fancy anything that comes out of Elon Musk's social media toy shop any more, but for the sake of tradition and to remain compatible, I'm leaving them in as they are.

What do you think? Should they be taken out?

``` html
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://kiko.io/post/Head-Care/">
<meta property="twitter:title" content="Head Care - kiko.io">
<meta property="twitter:description" content="Cleaning up META and LINK tags">
<meta property="twitter:image" content="https://kiko.io/images/social-media/Head-Care.png">
```

{% moreinfo_label "More Info:" '[
  [ "Twitter Developer Platform", "Getting started with Cards", "https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup" ]
]' %}

---

## link rel="license"

I have copied these two tags from [Matthias Pfefferle's notizBlog](https://notiz.blog/). I think it's good to make it machine-readable under which conditions the output of my brain and fingers can be used by others. Until now, I only had a corresponding badge with a link on my [photos page](/photos).
``` html
<link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" type="text/html" />
<link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/rdf" type="application/rdf+xml" />
```

{% moreinfo_label "More Info:" '[
  [ "CreativeCommons", "CC REL by Example", "https://opensource.creativecommons.org/ccrel-guide/" ],
  [ "Microformats Wiki", "rel=&quot;license&quot;", "https://microformats.org/wiki/rel-license" ]
]' %}

---

## meta name="author"

So that everyone knows who is responsible by name for what you are forced to read here, there is this tag. However, there is always discussion as to whether this should be the web creator or the author of the text. In my case, it doesn't make any difference.

``` html
<meta name="author" content="Kristof Zerbe">
```

{% moreinfo_label "More Info:" '[
  [ "whatwg.org", "HTML Standard - Standard metadata names", "https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names" ]
]' %}

---

## meta name="fediverse:creator"

Here's the newest kid in town ... launched by the creators of [Mastodon](https://joinmastodon.org/) to make journalists and others in the writing world more visible. It allows authors who work with multiple publishers or platforms to link directly to their presence in the Fediverse and thereby connecting the users to the person itself. Syndicated posts from platforms that support the new feature will have a link to the author's handle below the post. I don't really need that thing, but it's neat and who knows what else the Fedi people will come up with.

``` html
<meta name="fediverse:creator" content="@kiko@indieweb.social">
```

{% moreinfo_label "More Info:" '[
  [ "Mastodon Blog - Eugen Rochko", "Highlighting journalism on Mastodon", "https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/" ],
  [ "Chris McLeod", "Adding the New Mastodon Link Attribution Meta Tag", "https://chrismcleod.dev/blog/adding-the-new-mastodon-link-attribution-meta-tag/" ]
]' %}

---

## link rel="me"

I use these tags to link my blog to my other identities/profile pages on the web to show that the same person is represented on both sides. A simple identity verification, which is also the foundation for IndieWeb authentication services such as [IndieAuth](https://indieauth.com/), as used on [webmention.io](webmention.io), for example. With the additional ``authn`` I select which providers are considered for authentication. Mastodon uses this for the green tick in the profile also.

``` html
<link rel="me" href="https://indieweb.social/@kiko">
<link rel="me authn" href="https://github.com/kristofzerbe">
<link rel="me authn" href="mailto:kristof.zerbe@gmail.com">
```

{% moreinfo_label "More Info:" '[
  [ "IndieWeb", "rel-me", "https://indieweb.org/rel-m" ],
  [ "Microformats Wiki", "RelMeAuth", "https://microformats.org/wiki/RelMeAuth" ],
  [ "auth.hawx.me", "relme-auth - Sign in with your domain", "https://auth.hawx.me/" ]
]' %}

---

## link rel="webmention | pingback"

This blog is a static one and lives on GitHub Pages, i.e. there is no reactive component in the background that could respond to any kind of request, apart from retrieving pages. However, if someone wants to send me a so-called Webmention (or a slightly older Pingback), someone should answer and in my case this is the fabulous [Webmention.io](https://webmention.io/) service from [Aaron Parecki](https://aaronparecki.com/) and I let all requesters know this, with these two tags.

``` html
<link rel="webmention" href="https://webmention.io/kiko.io/webmention" />
<link rel="pingback" href="https://webmention.io/kiko.io/xmlrpc" />

```

{% moreinfo_label "More Info:" '[
  [ "IndieWeb", "Webmention", "https://indieweb.org/Webmention" ],
  [ "Jan Monschke", "Adding webmentions to your static blog", "https://janmonschke.com/adding-webmentions-to-your-static-blog/" ],
  [ "(myself)", "Hexo and the IndieWeb (Receiving Webmentions)", "https://kiko.io/post/Hexo-and-the-IndieWeb-Receiving-Webmentions/" ]
]' %}

---

## link rel="blogroll"

Now let's get to the main reason for this post ... (see introduction above). I've had a [lot of fun](/notes/2024/Blogroll-Feed-Heavyweight-Championship/) implementing my own [blogroll](/blogroll) into my SSG Hexo over the last few weeks and the news that someone is trying to bring the many blogrolls on the web together is exciting. No one knows exactly what that might look like yet, but it's like Dan Q. says:

> Now all we need is some tools that can do such detection!

<br>
``` html
<link rel="blogroll" type="text/xml" href="https://kiko.io/blogroll.xml" title="kiko.io&#39;s Blogroll">
```

{% moreinfo_label "More Info:" '[
  [ "Dan Q.", "link rel=&quot;blogroll&quot;", "https://danq.me/2024/05/03/23615/" ],
  [ "opml.org (Dave Winer)", "About blogrolls", "https://opml.org/blogroll.opml" ]
]' %}

---

## link rel="search"

Last year I integrated a [search via Pagefind into this blog](/post/Integration-of-Pagefind-in-Hexo/) and thus made myself a little less dependent on Google. What I forgot to do is to technically explain to a search engine how my search mechanism can be used so that the user can go directly from the search to my search results. This can be done via an XML file in OpenSearch description format

``` html
<link rel="search" type="application/opensearchdescription+xml" href="https://kiko.io/opensearch.xml" title="kiko.io"/>
```

{% moreinfo_label "More Info:" '[
  [ "Arthur Denner", "How to implement a search shortcut (OpenSearch) on any website", "https://arthurdenner.hashnode.dev/how-to-implement-a-search-shortcut-opensearch-on-any-website" ],
  [ "Microsoft Learn", "Creating an OpenSearch Description File in Windows Federated Search", "https://learn.microsoft.com/en-us/windows/win32/search/-search-federated-search-osdx-file" ],
  [ "MDN Web Docs", "OpenSearch description format", "https://developer.mozilla.org/en-US/docs/Web/OpenSearch" ]
]' %}

---

## script type="application/ld+json"

Of course, my head element also contains the JSON-LD script that I wrote about over a year ago and which I suspect will basically replace the meta and link tag world in the long run with regard to search engines, because it's simply better structured and can probably be processed more easily as the stuff above.

``` html
<script type="application/ld+json">{ "@context":"http://schema.org/", ... [more code] }</script>
```

{% moreinfo_label "More Info:" '[
  [ "Google Search Central", "Introduction to structured data markup in Google Search", "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" ],
  [ "(myself)", "Provide Blog Metadata via JSON-LD", "/post/Provide-Blog-Metadata-via-JSON-LD/" ]
]' %}

---

## link rel="alternate"

It's always good to make things easy for your users. This also applies to finding a feed on a website, in whatever form. For the so-called *feed autodiscovery* specified in HTML5, ``alternate`` link tags with the corresponding MIME type are used. I have integrated several different [feeds](/feeds) (Atom, RSS, JSON and HTML) on my site and placed the variants with the complete text in the autodiscovery.

What appeals to me now is what Dan Q. brought up in the post in the introduction to this article: [``.well-known/feeds``](https://danq.me/2023/08/23/well-known-feeds). Let's see if I can tinker with it tonight or tomorrow ...

``` html
<link rel="alternate" type="application/atom+xml" href="https://kiko.io/atom.xml" title="kiko.io&#39;s Atom Feed (Full Content)">
<link rel="alternate" type="application/rss+xml" href="https://kiko.io/rss.xml" title="kiko.io&#39;s RSS Feed (Full Content)">
<link rel="alternate" type="application/json" href="https://kiko.io/feed.json" title="kiko.io&#39;s JSON Feed (Full Content)">
<link rel="alternate" type="application/mf2+html" href="https://kiko.io/feeds/index.html" title="kiko.io&#39;s HTML Microformats Feed (Excerpt)">
```

{% moreinfo_label "More Info:" '[
  [ "The WHATWG Blog", "Feed Autodiscovery", "https://blog.whatwg.org/feed-autodiscovery" ],
  [ "whatwg.org", "HTML Standard - Link type &quot;alternate&quot;", "https://html.spec.whatwg.org/#rel-alternate" ],
  [ "Microformats Wiki", "rel-alternate", "https://microformats.org/wiki/rel-alternate" ],
  [ "Jim Nielsen", "Making Your RSS Feeds Automatically Discoverable", "https://blog.jim-nielsen.com/2021/automatically-discoverable-rss-feeds/" ]
]' %}

---

## link rel="manifest"

Is a blog an app? I think so. An app for reading stuff. That's why it makes sense for me to technically raise my blog to the same level as WebApps/PWA's by offering a corresponding [manifest](/manifest.json), that shows the browser how to install kiko.io on the system, if the user want to.

``` html
<link rel="manifest" href="/manifest.json">
```

{% moreinfo_label "More Info:" '[
  [ "MDN Web Docs", "Web app manifests", "https://developer.mozilla.org/en-US/docs/Web/Manifest" ]
]' %}

---

## link rel="icon | apple-touch-icon"

In addition to the information on the manifest, which already contains pretty much all the information a browser needs to display the website nicely on his OS, this classic is part of the standard repertoire and should not be missing. Nothing is duller than a browser tab without an icon. Since Apple always does everything a little differently, a PNG image should be provided for iOS.

As with all resources, relative paths are useful here so that the site is also displayed correctly during local development.

``` html
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
```

{% moreinfo_label "More Info:" '[
  [ "W3C", "How to Add a Favicon to your Site", "https://www.w3.org/2005/10/howto-favicon" ],
  [ "webhint", "Use Apple Touch Icon", "https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/" ]
]' %}

---

## meta name="theme-color"

This tag is similar to the icon and can also be found in the manifest, but it is not a bad idea to tell the browser the desired color for the environment in this way too.

``` html
<meta name="theme-color" content="#444">
```

{% moreinfo_label "More Info:" '[
  [ "MDN Web Docs", "theme-color", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color" ]
]' %}

---

## meta name="color-scheme"

The ``color-scheme`` tag points in a slightly different direction than the previous one. It can be used to specify whether and which color scheme the website supports: **light** or **dark** or both. I am a great advocate of [individual theme switches](/post/don-t-be-ignorant-and-offer-a-theme-switch/), but for this you first have to implement and offer two different themes in the CSS. This tag makes the presence of these known to the browser.

I have also used the tag so far and built a theme switch around it, but I have overlooked one thing:

> Providing both keywords indicates that the first scheme is preferred (by the author), but the second is also acceptable if the user prefers it instead.

I've defined them the wrong way round so far, as I'm not a fan of dark themes and prefer the light ones.

``` html
<meta name="color-scheme" content="light dark">
```

{% moreinfo_label "More Info:" '[
  [ "web.dev (Thomas Steiner)", "Improved dark mode default styling with the color-scheme CSS property and the corresponding meta tag", "https://web.dev/articles/color-scheme" ]
]' %}

---

## link rel="preload"

I use special web fonts and an individual photo for each page. To preload these files before they are actually used, it makes sense to use the PRELOAD link, which tells the browser: *"Hey, I'm going to need this anyway. Load it now"*.

It is essential to inform the browser of the correct MIME type of the resource and to indicate the specific class via the ``as`` attribute. The additional attribute ``crossorigin`` is only required if the resource is not located on your own server, as it is then retrieved using a CORS request.

``` html
<link rel="preload" as="font" type="font/woff2" href="/css/fonts/lexend/webfonts/Lexend-ExtraLight.woff2">
...
<link rel="preload" as="image" type="image/jpeg" href="/images/social-media/Head-Care.png" imagesrcset="/images/social-media/Head-Care.png 480w, /images/social-media/Head-Care.png 768w">
```

{% moreinfo_label "More Info:" '[
  [ "MDN Web Doc", "rel=preload", "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload" ],
  [ "whatwg.org", "HTML Standard - Link type &quot;preload&quot;", "https://html.spec.whatwg.org/multipage/links.html#link-type-preload" ]
]' %}

---

## link rel="stylesheet"

Yes, of course. For the sake of completeness, I have to mention the links via which the CSS is loaded into the page as an external resource also. Without these, the web would look dull and empty.

``` html
<link rel="stylesheet" href="/css/dist/asset-bundle.min.css">
<link rel="stylesheet" href="/css/style.css">
```

{% moreinfo_label "More Info:" '[
  [ "MDN Web Docs", "The External Resource Link element", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link" ],
  [ "freeCodeCamp", "How to Link CSS to HTML – Stylesheet File Linking", "https://www.freecodecamp.org/news/how-to-link-css-to-html/" ]
]' %}

---

## Conclusion

Small cause, big effect. I learnt a lot from refactoring my HEAD and I have to admit that I'm tempted to take a closer look at all those [extensions](https://wiki.whatwg.org/wiki/MetaExtensions). I would at least be satified, if the work I have done here, can also improve your header a little.

Happy Coding :)