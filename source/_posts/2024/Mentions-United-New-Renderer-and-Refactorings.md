---
slug: Mentions-United-New-Renderer-and-Refactorings
title: 'Mentions United: New Renderer and Refactorings'
subtitle:
date: 2024-11-17 17:19:33
photograph:
  file: D50_9555_2406.jpg
  name: Thomas Garden 24-06 V
  socialmedia: >-
    /static/images/social-media/Mentions-United-New-Renderer-and-Refactorings.png
project: mentions-united
categories:
  - Coding
tags:
  - Webmention
  - Interactions
related:
  - Mentions-United-3-2-1-go
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-Native-Mastodon-Provider
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/113499449609783497
  - host: Lemmy
    title: Fediverse
    url: https://programming.dev/post/21827898
  - host: Lemmy
    title: IndieWeb
    url: https://programming.dev/post/21827931
---

Until now, I only occasionally checked the runtime of my Mentions United scripts by using a console output. It didn't seem to be that important, because the scripts run asynchronously and the interactions only appear at the end of an article, with some time to spare before the reader gets there. However, the console times always referred to the providers that were actually executed and said nothing about the time that was actually needed. I also show the number of interactions at the beginning of an article, but not at the interactions themselves. In my head, the idea of a summary line was forming ...

```html
<p class="interactions-summary-line">
  INTERACTION-COUNT interactions collected by 
  <a target="_blank" href="https://github.com/kristofzerbe/MentionsUnited">Mentions United</a> 
  via PROVIDER-COUNT unique providers and 
  REQUEST-COUNT requests in DURATION seconds
</p>
```

<!-- more -->

Interestingly, I couldn't achieve what I wanted with the information already available in the main script and had to adjust pretty much everything a little.

First of all, I removed the previous calls to ``console.time`` from all providers and replaced them with central calls of `` window.performance.now()``, all wrapped in functions that are passed to the RETRIEVE methods via a new ``args`` object.

In the same way, I now measure the start and end times across all providers in the main script and store them in a new ``#info`` property.

So far, all renderers have only received the list of interactions. In the new **Summary List** renderer, however, I needed more information, so I changed the default for all and now pass an ``args`` object that contains not only the interactions but also the available providers and the new info property.

Overall, it would only be minor changes, but in fact in all scripts and accordingly I have also adjusted all version numbers.

Have fun trying it out :)