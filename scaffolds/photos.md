---
slug: {{ slug }}
title: '{{ title }}'
subtitle: 
date: {{ date }}
photograph: 
  file: 
  name: 
  socialmedia: /static/images/social-media/{{ slug }}.png
series: New Photos
categories:
  - Photo
tags:
  - Imaging
  - Publishing
related:
  - Pool-Photo-Generator
syndication:
  - host: Mastodon
    url: 
---


<!-- more -->

{% photo_list
  "name|title"
%}
