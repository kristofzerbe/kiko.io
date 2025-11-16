---
slug: {{ slug }}
title: '{{ title }}'
subtitle: 
date: {{ date }}
photograph: 
  file: 
  name: 
  socialmedia: /static/images/social-media/{{ slug }}.jpg
series: New Photos
categories:
  - Photo
tags:
  - Imaging
  - Publishing
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

---

{% photo_list
  "name|title"
%}

{% photo_masonry
  "name"
%}
