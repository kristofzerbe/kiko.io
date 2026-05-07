---
hasLocale: true
#--------------------------------------------------
slug: Integration-of-the-Byline-Feed-Extension
title: Integration of the Byline Feed Extension
subtitle: 
date: 2026-05-07 12:28:48
photograph:
  file: Bild-0429.jpg
  name: Mountain Speakers
  socialmedia: /static/images/social-media/Integration-of-the-Byline-Feed-Extension.jpg
categories:
  - Tools
tags:
  - Feeds
  - Identity
  - IndieWeb
related:
  - Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
  - Read-You-Feed-Reader-for-Android
  - Pimping-the-Permalink
bandcamp:
  artist: Howling Giant
  album: Glass Future|3605903048
  track: First Blood of Melchor|3255928040
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/35
  - host: Bubbles
    url: https://bubbles.town/entry/163506
  - host: Mastodon
    url: https://indieweb.social/@kiko/116532933115541973
  - host: IndieNews
    url: https://news.indieweb.org/en/kiko.io/post/Integration-of-the-Byline-Feed-Extension/
---

Lately, there's been a lot of buzz in my tech bubble about good old RSS/Atom feeds. Not only are people rediscovering them and making them available on their blogs, but new services are also popping up around this 30-year-old technology. It's just so wonderfully independent and fits the trend of moving away from increasingly terrible platforms at the protocol level and returning to the free, open internet.

A good example of this is, of course, my new daily companion [Bubbles](https://bubbles.town/) by Ben, but also initiatives like [Sourcefeed](https://www.sourcefeed.app/) by [Terry Godier](https://www.terrygodier.com/), which rely on RSS-based content publishing WITHOUT a dedicated website. Write, Feed, done.

Terry recently published another project that Ben had addressed in a similar way a few days earlier. Ben's was about integrating a Fediverse address into the commenting process on Bubbles via a meta tag on one's own blog. In other words, enriching the posts extracted from the feed with additional information about the blogger.

<!-- more -->

---

Terry now has published a specification for an RSS/Atom extension called [**byline**](https://www.bylinespec.org/), which allows any desired personal information to be integrated directly into the feed.

{% cardlink %}
url: https://blog.terrygodier.com/2026/05/04/my-plan-with-rss.html
title: "My plan with RSS"
description: "With Current, Sourcefeed, and Byline all in the world now, the thesis is probably close to being clear. I fundamentally believe that people want to make things …"
host: blog.terrygodier.com
favicon: https://blog.terrygodier.com/favicon.png
{% endcardlink %}

The specification already leaves very few questions unanswered and even includes a [generator](https://www.bylinespec.org/tools/generator) for easily generating the code, as well as a [validator](https://www.bylinespec.org/tools/validator), which unfortunately cannot yet handle URLs.

```xml atom.xml
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:byline="https://bylinespec.org/1.0">
  ...
  
  <byline:contributors>
    <byline:person id="kristofz">
      <byline:name>Kristof Zerbe</byline:name>
      <byline:url>https://kiko.io</byline:url>
      <byline:avatar>https://kiko.io/images/kiko-reverentgeek-200-straight.png</byline:avatar>
      <byline:profile href="https://indieweb.social/@kiko" rel="mastodon"/>
      <byline:profile href="https://github.com/kristofzerbe" rel="github"/>
      ... more profiles
      <byline:uses>https://kiko.io/uses</byline:uses>
      <byline:theme style="light"/>
    </byline:person>
  </byline:contributors>
  
  <entry> ... </entry>
  ...
</feed>
```

Anyone who is familiar with my website knows that I'm actually quite generous — some might even say wasteful — with my basic personal information, such as my real name and profile links. For example, the footer always includes a meta link that allows anyone to pull the [JSON-LD](https://json-ld.org/) data embedded in the pages, which I've deliberately made machine-readable.

Of course, Ben could now use Bubbles to query the bloggers' websites for JSON-LD after reading the feed, but the question is, why should Bubbles make any additional requests at all when I can already provide everything directly in the feed?!

All 6 of my [feeds](/feeds) (RSS, Atom, JSON with full text or excerpts) now include a byline block, which not only saves Ben from having to make additional requests but also eliminates the question of what information he can or should use. I simply deliver it with the feed.

With **byline**, some of the hoops you have to jump through to provide or retrieve additional information about the person beyond the standard `author` field become unnecessary. And as always on the open and free web, it's up to each individual to decide what and how much of it they use. I hope that Terry's idea will be a success and that classic feed validators like the [W3C Feed Validation Service](https://validator.w3.org/feed/), [RSS Validator](https://www.rssboard.org/rss-validator), or [CAP-Validator](https://cap-validator.appspot.com/validate) will quickly add the new extension to their portfolio and more blogs start to integrate **byline**.

Spread the word ...

---

{% cardlink %}
url: https://www.bylinespec.org/examples/personal-blog
title: "Byline: Structured Identity for Syndication Feeds"
description: "An open specification that adds author context to RSS, Atom, and JSON Feed."
host: www.bylinespec.org
favicon: https://www.bylinespec.org/favicon.ico?favicon.0b3bf435.ico
{% endcardlink %}
