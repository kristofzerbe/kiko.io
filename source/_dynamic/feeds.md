---
title: Feeds
date: 2023-08-30 14:47:33
permalink: /feeds
photograph:
  file: $23-05-Holland-0806.jpg
  name: Knitting Colors
teaser: "Aggregation of the articles as Atom, RSS, JSON or HTML feed"
---

For years, I had integrated only one [Atom](https://en.wikipedia.org/wiki/Atom_(web_standard)) feed in this blog, which gave an excerpt of the article to the posts and a link to read more. A poll on Mastodon on the topic [made me change](/notes/2023/feed-full-length-article/) to the full article text ... but this also meant that the feed size grew by about 80%, which is also not okay for everyone.

On this page you will now find not only both Atom feed variants for my last 20 [**Posts**](/archives), but also some in the good old [RSS 2.0](https://en.wikipedia.org/wiki/RSS) and the relatively new [JSON feed](https://en.wikipedia.org/wiki/JSON_Feed) format.

---

<section class="feeds">

## Posts

<div class="feed-group">
  <strong>Full Content</strong>
  <!-- TODO: Tag Plugins are not working here: see https://github.com/hexojs/hexo/issues/4713
  {% feed_link "feed-posts-atom-full", "atom" %}
  {% feed_link "feed-posts-rss-full", "rss" %}
  {% feed_link "feed-posts-json-full", "json" %}
  -->
  <a href="/atom.xml" class="atom site-default">
    <span><strong>Atom Feed</strong> (atom.xml)</span>
  </a>
  <a href="/rss.xml" class="rss">
    <span><strong>RSS 2.0 Feed</strong> (rss.xml)</span>
  </a>
  <a href="/feed.json" class="json">
    <span><strong>JSON Feed</strong> (feed.json)</span>
  </a>
</div>

<div class="feed-group">
  <strong>Excerpt Only</strong>
  <!-- TODO: Tag Plugins are not working here: see https://github.com/hexojs/hexo/issues/4713
  {% feed_link "feed-posts-atom-excerpt", "atom" %}
  {% feed_link "feed-posts-rss-excerpt", "rss" %}
  {% feed_link "feed-posts-json-excerpt", "json" %} -->

  <a href="/atom-excerpt.xml" class="atom">
    <span><strong>Atom Feed</strong> (atom-excerpt.xml)</span>
  </a>
  <a href="/rss-excerpt.xml" class="rss">
    <span><strong>RSS 2.0 Feed</strong> (rss-excerpt.json)</span>
  </a>
  <a href="/feed-excerpt.json" class="json">
    <span><strong>JSON Feed</strong> (feed-excerpt.json)</span>
  </a>
</div>

</section>

<section class="mf2feed">

  ## HTML Feed

  As an alternative, that can be read by humans and machines, here is the same data in the form of a microformat-based [h-feed](https://microformats.org/wiki/h-feed).

  <!-- TODO: Tag Plugins are not working here: see https://github.com/hexojs/hexo/issues/4713 ... Workaround: placeholder replacement in generator-dynamic-feeds.js
   -->
   {% feed_microformats %}
  
</section>