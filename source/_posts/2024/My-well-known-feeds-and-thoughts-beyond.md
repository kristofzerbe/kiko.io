---
slug: My-well-known-feeds-and-thoughts-beyond
title: My .well-known/feeds and thoughts beyond
subtitle: Every idea has to start somewhere
date: 2024-07-19 14:42:05
photograph:
  file: D50_9022_2405.jpg
  name: Thomas Garden 24-05 XXII
  socialmedia: /static/images/social-media/My-well-known-feeds-and-thoughts-beyond.png
categories:
  - Coding
tags:
  - Meta
  - Publishing
related:
  - Head-Care
  - Include-and-provide-JSON-data-in-Hexo-EJS-Templates
  - Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112814832031474529
---

Triggered by [Dan Q.'s post '.well-known/feeds'](https://danq.me/2023/08/23/well-known-feeds/), in which he suggests using a consistent per-site file along the lines of the resource identifier pattern [.well-known](https://en.wikipedia.org/wiki/Well-known_URI) for providing feeds, instead of placing links on all individual pages, I have summarised my feeds accordingly today, simply because this solution feels more correct to me.

His approach is actually quite smart, because he simply combines two existing techniques: [OPML (Outline Processor Markup Language)](https://en.wikipedia.org/wiki/OPML) and those [well-known URI's](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml). It was therefore not particularly difficult for me to create such a file. I do exactly the same with my [blogroll](/blogroll), only now the [feeds](/feeds) are my own, in different formats and variants.

> Every idea has to start somewhere

... as Colin Walker said in his comment.

<!-- more -->

Here's my [.well-known/feeds](/.well-known/feeds):

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>kiko.io&#x27;s Feeds</title>
    <dateCreated>2023-08-30T12:47:33.000Z</dateCreated>
    <ownerName>Kristof Zerbe</ownerName>
    <ownerId>https://kiko.io</ownerId>
    <docs>https://kiko.io/feeds</docs>
  </head>
  <body>
    <outline text="Atom Feed (Full Content)" type="rss" version="ATOM1" xmlUrl="https://kiko.io/atom.xml" htmlUrl="https://kiko.io" description="Last 20 posts as Atom feed"/>
    <outline text="Atom Feed (Excerpt)" type="rss" version="ATOM1" xmlUrl="https://kiko.io/atom-excerpt.xml" htmlUrl="https://kiko.io" description="Last 20 posts with excerpt only as Atom feed"/>
    <outline text="RSS Feed (Full Content)" type="rss" version="RSS2" xmlUrl="https://kiko.io/rss.xml" htmlUrl="https://kiko.io" description="Last 20 posts as RSS feed"/>
    <outline text="RSS Feed (Excerpt)" type="rss" version="RSS2" xmlUrl="https://kiko.io/rss-excerpt.xml" htmlUrl="https://kiko.io" description="Last 20 posts with excerpt only as RSS feed"/>
    <outline text="JSON Feed (Full Content)" type="rss" version="JSON1" xmlUrl="https://kiko.io/feed.json" htmlUrl="https://kiko.io" description="Last 20 posts as JSON feed"/>
    <outline text="JSON Feed (Excerpt)" type="rss" version="JSON1" xmlUrl="https://kiko.io/feed-excerpt.json" htmlUrl="https://kiko.io" description="Last 20 posts with excerpt only as JSON feed"/>
    <outline text="HTML Microformats Feed (Excerpt)" type="rss" version="MF2HTML" xmlUrl="https://kiko.io/feeds/index.html" htmlUrl="https://kiko.io" description="Last 20 arcticles with excerpt only as HTML Microformats feed"/>
  </body>
</opml>
```

---

## The OPML 'type' problem

Dan lists his different feeds (among other links) in his file, which differ in content, but are always in the same RSS format. In contrast, I actually only have two different content types, full and excerpt, but in 4 different formats: RSS, Atom, JSON and MF2/HTML. Depending on taste.

There is a problem that [Ruben Schade already noticed](https://rubenerd.com/interpreting-the-opml-type-attribute/) in 2021: OPML requires the value ``rss`` as type, i.e. other types such as ``atom`` or the like are not provided. Dave Winer writes quite succinctly in the spec:

> Each sub-element of the body of the OPML document is a node of type rss or an outline element that contains nodes of type rss.

The only space that opens up here is the use of the ``version`` attribute, but that is just speculation. Although Dave uses it by himself in one of his OPML examples (``RSS1``), the spec says:

> There are no known values for Atom feeds, but they certainly could be provided.

Hmmm, take it or leave it? But how else am I supposed to distinguish between the 4 different formats in the OPML? Like Ruben, I have decided to simply put the values that make the most sense to me in ``version``:

- ATOM1
- RSS2
- JSON
- MF2HTML

Let's see what happens ... especially as Dan's OPML approach is [still a proposal](https://github.com/Dan-Q/well-known-feeds). The one is only partly related to the other, but if .well-kown/feeds becomes more popular, maybe there will be an update to OPML where you can use the type what it seemed to be intended for.

---

## Thoughts beyond ...

In my post yesterday, I reported on the [refactoring of my blog's HEAD](/post/Head-Care/), which of course also mentioned the ALTERNATE links for the feeds, which the new file could replace.

If you now take a closer look at the META information, not only does the latter apply to the entire site, but also:

- meta name="generator"
- link rel="me"
- link rel="webmention | pingback"
- link rel="blogroll"
- link rel="search"
- link rel="manifest"
- meta name="theme-color"
- meta name="color-scheme"

... and of course a large part of the JSON-LD that does not refer to the individual page, such as the @type's ``WebSite``, ``Organisation`` and ``Person``.

All of this information also applies on a site-per-site basis and why not make it available to the user agent centrally and save some bytes when delivering the pages as a nice additional effect? (Not that web developers sometimes leave no stone unturned in order to save characters and thus bandwidth, but are forced to use dozens of lines in the header).

Of course there is some META information that can differ from page to page, such as ``meta name="author"``, but with personal blogs there is only ever one person who can be considered as the author. This could therefore also be moved to a kind of ``.well-known/site-meta``. (Not to be confused with the existing [host-meta](https://datatracker.ietf.org/doc/html/rfc6415)).

Interestingly, Dan takes up the topic indirectly, because in his OPML there are two blocks: ``Blog`` (with the feeds) and ``Elsewhere``, in which only the first URL is actually of the ``rss`` type and the others are simply profile links to GitHub, YouTube and others. At least ``link rel="me"`` has already been mapped this way, which I would not have expected from a feed resource.

From my point of view, something like this could make sense, but is not yet fully thought out:

``` xml .wellknown/site-meta
<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
<head>
    <title>kiko.io&#x27;s Site Meta</title>
    <dateCreated>2023-08-30T12:47:33.000Z</dateCreated>
    <ownerName>Kristof Zerbe</ownerName>
    <ownerEmail>kristof.zerbe@gmail.com</ownerEmail>
    <ownerId>https://kiko.io</ownerId>
  </head>
  <body>
    <outline text="Site" purpose="site">
      <outline text="Name" purpose="name" content="kiko.io"/>
      <outline text="Url" purpose="url" content="https://kiko.io"/>
      <outline text="Author" purpose="author" content="Kristof Zerbe"/>
      <outline text="Fediverse Creator" purpose="fediverse:creator" content="@kiko@indieweb.social"/>
      <outline text="Locale" purpose="locale" content="en_US"/>
      <outline text="Type" purpose="type" content="Blog"/>
      <outline text="Generators" purpose="generator">
        <outline text="Hexo 7.2.0" type="link" url="https://hexo.io"/>
      </outline>
      <outline text="Licenses" purpose="license">
        <outline text="CC BY-SA 4.0" type="link" url="https://creativecommons.org/licenses/by-sa/4.0/"/>
        <outline text="CC BY-SA 4.0 (RDF)" type="xml" version="RDF" xmlUrl="https://creativecommons.org/licenses/by-sa/4.0/rdf"/>
      </outline>
      <outline text="Profiles" purpose="me">
        <outline text="Mastodon" type="link" url="https://indieweb.social/@kiko"/>
        <outline text="GitHub" type="link" url="https://github.com/kristofzerbe" auth="true"/>
        <outline text="Mail" type="link" url="mailto:kristof.zerbe@gmail.com" auth="true"/>
      </outline>
      <outline text="Webmention" purpose="webmention" type="link" url="https://webmention.io/kiko.io/webmention"/>
      <outline text="Pingback" purpose="pingback" type="link" url="https://webmention.io/kiko.io/xmlrpc"/>
      <outline text="Blogroll" purpose="blogroll" type="xml" version="opml" xmlUrl="https://kiko.io/blogroll.xml"/>
      <outline text="Search" purpose="search" type="xml" version="opensearchdescription" xmlUrl="https://kiko.io/opensearch.xml"/>
      <outline text="Icon" purpose="icon" type="link" url="https://kiko.io/favicon.ico">
      <outline text="Web Manifest" purpose="manifest" type="json" jsonUrl="https://kiko.io/manifest.json"/>
      <outline text="Theme Color" purpose="theme-color" content="#444"/>
      <outline text="Color Scheme" purpose="color-scheme" content="light dark"/>
      <outline text="Feeds" purpose="feeds">
        <outline text="Atom Feed (Full Content)" type="atom" version="ATOM1" xmlUrl="https://kiko.io/atom.xml" htmlUrl="https://kiko.io" description="Last 20 posts as Atom feed"/>
        <outline text="Atom Feed (Excerpt)" type="atom" version="ATOM1" xmlUrl="https://kiko.io/atom-excerpt.xml" htmlUrl="https://kiko.io" description="Last 20 posts with excerpt only as Atom feed"/>
        <outline text="RSS Feed (Full Content)" type="rss" version="RSS2" xmlUrl="https://kiko.io/rss.xml" htmlUrl="https://kiko.io" description="Last 20 posts as RSS feed"/>
        <outline text="RSS Feed (Excerpt)" type="rss" version="RSS2" xmlUrl="https://kiko.io/rss-excerpt.xml" htmlUrl="https://kiko.io" description="Last 20 posts with excerpt only as RSS feed"/>
        <outline text="JSON Feed (Full Content)" type="json" version="JSON1" xmlUrl="https://kiko.io/feed.json" htmlUrl="https://kiko.io" description="Last 20 posts as JSON feed"/>
        <outline text="JSON Feed (Excerpt)" type="json" version="JSON1" xmlUrl="https://kiko.io/feed-excerpt.json" htmlUrl="https://kiko.io" description="Last 20 posts with excerpt only as JSON feed"/>
        <outline text="HTML Microformats Feed (Excerpt)" type="mf2html" version="MF2HTML" xmlUrl="https://kiko.io/feeds/index.html" htmlUrl="https://kiko.io" description="Last 20 arcticles with excerpt only as HTML Microformats feed"/>
      </outline>
    </outline>
  </body>
</opml>
```

I could well imagine taking some of the weight off my pages, because this information should actually be centralised.

Your thoughts?
