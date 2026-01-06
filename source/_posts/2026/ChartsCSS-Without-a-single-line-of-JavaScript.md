---
hasLocale: true
#--------------------------------------------------
slug: ChartsCSS-Without-a-single-line-of-JavaScript
title: ChartsCSS - Without a single line of JavaScript
subtitle: How to spice up boring HTML tables just with CSS
date: 2026-01-06T17:47:37+01:00
photograph:
  file: 25-05-Portugal-1024-D50.jpg
  name: Massive Blooming I
  socialmedia: /static/images/social-media/ChartsCSS-Without-a-single-line-of-JavaScript.jpg
series: Great Finds
categories:
  - UI/UX
tags: 
  - Visualization
  - HTML
  - CSS
related:
  - StreetComplete-Contribution-while-passing-by
  - The-Last-Image-Gallery
  - Don-t-be-ignorant-and-offer-a-theme-switch
bandcamp:
  artist: Quintana
  album: Eternity|2409501860
  track: Heading Down|3190982730
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/24
  - host: Mastodon
    url: https://indieweb.social/@kiko/115849509743528621
---

<img src="/post/ChartsCSS-Without-a-single-line-of-JavaScript/logo-animation.svg" class="float-right no-zoom" />

I've known for a while that I want to add a [statistics page](/stats) to my blog. Just for the fun of tinkering with code, without any deeper reason. In the summer, I wrote down my ideas on a few Obsidian pages and looked around to see what options were available for data visualization. It's nicer and more intuitive to display some of the statistics as bars and pies than just in boring numerical columns. I'm more of a visual person... "Everything is so colorful here."

One research find stood out from the crowd of the usual JavaScript tools: [**ChartsCSS**](https://chartscss.org/) by [Rami Yushuvaev](https://github.com/ramiy) and Lana Gordiievska. It promised to bring classic number visualizations such as bar and pie charts to a web page **without a single line of script**, but **exclusively with CSS styles**!

<!-- more -->

I took advantage of a few days off at the end of the year to tackle my statistics, including Ramy's CSS framework, which is already five years old... and what can I say? It's really impressive how cleverly he uses common style methods to turn HTML tables (! ... read: correctly) into colorful charts that can be easily customized with your own styles without having to fiddle around with the mere 59KB ``charts.min.css`` file. I just wanted a bar chart, so I only peeked at the code for the pie charts, but I didn't really figure out how Ramy turns rectangular table cells into pie slices!?

![ChartsCSS Samples](/post/ChartsCSS-Without-a-single-line-of-JavaScript/chartcss-samples.png)

In addition to these five available chart types, according to the website, three more are planned: Radial, Polar, and Radar, but they are not really getting off the ground, as the project seems to have stalled a bit. Ramy released the current version 1.20 six months ago, and the previous one dates back to 2023. But that doesn't matter much, because what's there is excellent. The same goes for the documentation at [chartscss.org/docs](https://chartscss.org/docs/), which leaves hardly any questions unanswered thanks to its many examples.

## Conclusion

If you're struggling with JavaScript but have a reasonable understanding of HTML and CSS, you can achieve very impressive results with [ChartsCSS](https://chartscss.org/). In most cases, that's all it takes.

Here's an example... [/stats](/stats)
