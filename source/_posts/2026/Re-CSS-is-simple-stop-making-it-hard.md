---
slug: Re-CSS-is-simple-stop-making-it-hard
title: 'Re: CSS is simple, stop making it hard'
subtitle: No ... don't use tables, please
date: 2026-07-13 19:07:04
photograph:
  file: 25-07-Schweden-386-D50.jpg
  name: Color Sweets
  socialmedia: /static/images/social-media/Re-CSS-is-simple-stop-making-it-hard.jpg
categories:
  - UI/UX
tags:
  - CSS
  - HTML
  - JulyReply
related:
  - ChartsCSS-Without-a-single-line-of-JavaScript
  - REP-Embedding-Bandcamp-Tracks
  - Favourite-Pens-of-2024-July-Edition
syndication:
  - host: Bubbles
    url: null
  - host: Mastodon
    url: null
  - host: IndieNews
    url: https://news.indieweb.org/en
---

I came across [Martijn's post on Bubbles](https://bubbles.town/entry/44743163) today and would like to take this opportunity to answer his question...

> I can already hear you complaining that you shouldn't use tables for layout. Why exactly?

<p></p>

{% cardlink %}
url: https://blog.brixit.nl/css-is-simple-stop-making-it-hard/
title: "CSS is simple, stop making it hard"
description: "Or: how to embrace 1997 CSS"
host: blog.brixit.nl
image: https://blog.brixit.nl/image/w600/static//static/files/blog.brixit.nl/1783158947/random-header.jpg
{% endcardlink %}

<!-- more -->

---

All of us (with 40+ years under our belts) used tables in the late 90s to achieve the holy grail of layout ...

HEADER
NAV | CONTENT | ADS
FOOTER

... BUT ... back then, on the one hand, we had no other options, and on the other, there was simply no other display device available apart from the monitor on our computers under the desk! All layouts were in landscape format with a resolution of at least 800 x 600. So it didn't matter that we had rigidly fixed the positioning of the layout elements directly in the HTML using rows (TR) and cells (TD).

However, with the advent of tablets and smartphones, the width available in portrait mode became far too narrow to accommodate three side-by-side sections that were still legible, and the fixed structure dictated by HTML became a drawback if you did not want to create two versions (as was common practice initially) – one for desktops and another for mobile devices. If we take statistics such as those from [SimilarWeb for June 2026](https://www.similarweb.com/platforms/) at face value, the proportion of **desktop visits** to websites currently stands at **less than 33%**, and the trend is downwards. Other analyses will certainly reach the same conclusion.

CSS has made web development much simpler here, even though the techniques behind it have, in some cases, reached a level of complexity that is almost incomprehensible. However, `flex` and `grid` are generally a blessing, even in their simplest form, and no one **– really NO ONE –** needs to rely on TABLE in 2026, nor should it be used for anything other than … tables. And even this only in exceptional cases.

---

This post is part of the [#JulyReply](https://robertbirming.com/julyreply/) campaign initiated by Robert Birming.
