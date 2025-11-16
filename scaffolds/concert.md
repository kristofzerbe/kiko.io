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
  - host: GitHub
    url: 
  - host: Mastodon
    url: 
---


<!-- more -->

{% image_masonry
  "file|title"
%}

{% peertube "clip.place" "ID" "PXL_" %}