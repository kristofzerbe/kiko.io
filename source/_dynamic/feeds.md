---
title: Feeds
date: 2023-08-30 14:47:33
updated: 2024-02-22 21:24:47
permalink: /feeds
photograph:
  file: $23-05-Holland-0806.jpg
  name: Knitting Colors
caption: "/Feeds"
teaser: "Aggregation of the articles as Atom, RSS, JSON or HTML feed"
---

On this page you will find [Atom](https://en.wikipedia.org/wiki/Atom_(web_standard)) feed variants for my last 20 posts ([Articles](/archives) and [Notes](notes)), but also some in the good old [RSS 2.0](https://en.wikipedia.org/wiki/RSS) and the [JSON feed](https://en.wikipedia.org/wiki/JSON_Feed) format.

A list of all feeds can also be found via my [.well-known/feeds](/.well-known/feeds) endpoint, which I wrote about [here](/post/My-well-known-feeds-and-thoughts-beyond/). You can find more feeds, including from the people I follow on Fediverse, at [rss-is-dead.lol](https://rss-is-dead.lol/user?profileUrl=https%3A%2F%2Findieweb.social%2Fusers%2Fkiko).

<hr class="divider" />

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

  As an alternative, that can be read by humans and machines, here are the posts (articles with excerpt only) in the form of a microformat-based [h-feed](https://microformats.org/wiki/h-feed).

  <!-- TODO: Tag Plugins are not working here: see https://github.com/hexojs/hexo/issues/4713 ... Workaround: placeholder replacement in generator-dynamic-feeds.js
   -->
   <hr />
  {% feed_microformats %}
  
</section>
