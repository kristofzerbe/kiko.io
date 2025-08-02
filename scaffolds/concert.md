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