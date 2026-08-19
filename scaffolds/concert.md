---
slug: {{ slug }}
title: {{ title }}
subtitle: 
date: {{ date }}
photograph: 
  file: 
  name: 
  socialmedia: /static/images/social-media/{{ slug }}.jpg
series: 
project: 
categories:
  - Event
tags:
  - Concert
related:
  - xxx
bandcamp:
  artist: xxx
  album: xxx|0
  track: xxx|0
syndication:
  - site: GitHub
    url: 
  - site: Bubbles
    url: 
  - site: Mastodon
    url: 
---


<!-- more -->

---

{% photo_masonry
  "file"
%}

{% peertube "clip.place" "ID" "PXL_" %}