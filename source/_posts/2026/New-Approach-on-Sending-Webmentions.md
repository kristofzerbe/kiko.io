---
hasLocale: true
#--------------------------------------------------
slug: New-Approach-on-Sending-Webmentions
title: New Approach on Sending Webmentions
subtitle: Console Script vs. EchoFeed
date: 2026-01-08 18:20:22
photograph:
  file: 25-07-Schweden-585-D50.jpg
  name: Swedish Windows
  socialmedia: /static/images/social-media/New-Approach-on-Sending-Webmentions.jpg
series: IndieWeb
categories:
  - Tools
tags:
  - Hexo
  - Publishing
  - Webmention
related:
  - Hexo-and-the-IndieWeb-Sending-Webmentions
  - Hexo-and-the-IndieWeb-Receiving-Webmentions
  - Mentions-United-New-Renderer-and-Refactorings
bandcamp:
  artist: Black Swamp Water
  album: Distant Thunder|2491836742
  track: Bitter Harvest |1479502368
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/25
  - host: Mastodon
    url: https://indieweb.social/@kiko/115862091855262716
  - host: IndieNews
    url: https://news.indieweb.org/en
---

Four years ago, I made this blog fit for [IndieWeb](https://en.wikipedia.org/wiki/IndieWeb). The most important part for me was the integration of [Webmentions](https://indieweb.org/Webmention), which are mainly automated "pings" sent from one website to another, telling the latter: "Hey, I mentioned your post ABC in my post XYZ." Such a connection between two blogs is certainly not the same as the fast interactions of the [Fediverse](https://en.wikipedia.org/wiki/Fediverse) [platforms](https://fediverse.party/en/miscellaneous/), which are more like email or chat, but are usually one-way and, unfortunately, still rather rare. But for me, they offer a healthy basis for networking my own digital home with others who think along similar lines.

<!-- more -->

In general, it seems that good old blogs, equipped with modern technology, are becoming fashionable again, because what the formerly hip Silicon Valley garage boys have done to the digital social world is simply incomprehensibly creepy and will probably get a lot worse with the advent of AI. And I'm not the only one who's happy about the revival of the old blog days:

{% cardlink %}
url: https://henry.codes/writing/a-website-to-destroy-all-websites/
title: "A Website To End All Websites | Henry From Online"
description: "How to win the war for the soul of the internet, and build the Web We Want."
host: henry.codes
favicon: https://henry.codes/meta/favicon-32x32.png
image: https://henry.codes/img/og/og-a-website-to-destroy-all-websites.png
{% endcardlink %}
<br>
{% cardlink %}
url: https://www.joanwestenberg.com/the-case-for-blogging-in-the-ruins/
title: "The Case for Blogging in the Ruins"
description: "In 1751, Denis Diderot began publishing his Encyclopédie, a project that would eventually span 28 volumes and take more than two decades to complete. The French government banned it twice. The Catholic Church condemned it, Diderot's collaborators abandoned him, his publisher secretly censored entries behind his back, and he worked"
host: www.joanwestenberg.com
favicon: https://www.joanwestenberg.com/content/images/size/w256h256/2025/11/Westenberg-Brand-Icon--Transparent-Background--4.png
image: https://images.unsplash.com/photo-1609147110636-8470ee620ee6
{% endcardlink %}

---

My approach to sending Webmentions was based on a custom script for my static site generator called [Hexo Console Webmention](/projects/hexo-console-webmention/), which builds on the work of [Remy Sharp](https://remysharp.com/2019/06/18/send-outgoing-webmentions).

In the meantime, a lot of water has flowed down the Rhine (as we say in my home region) and the possibilities have become more diverse. Generally, what always bothered me about the script was, that it could only run after the build & deployment and, in addition, the entire artifact, including all NPM packages, had to be loaded again as the last step in my GitHub Action (the blog lives on GitHub Pages). Not only was this time-consuming, it also wasn't really resource-efficient.

[Robb Knight](https://rknight.me/) launched [**EchoFeed** ](https://echofeed.app/) in [2024](https://rknight.me/blog/echofeed/), which is essentially the counterpart to [Webmention.io](https://webmention.io/), which, of course, collects Webmentions. Robb's sending mechanism relies on RSS, Atom, or JSON feeds as data sources, at least one of which every blogger should offer on their own site. These are linked in the app to "services" such as Webmentions, Mastodon, Bluesky, and others to create so-called **Echos**. These Echos pull the feed data from the server every 15 minutes as standard and use templates to turn it into posts ... or Webmentions.

A fantastic way for me to clean up some of the blog code, even if I have one more dependency now, but seriously... who cares if a webmention arrives late or not at all?
