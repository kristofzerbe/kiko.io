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
  - 
syndication:
  - host: Mastodon
    url: 
---


<!-- more -->

{% photo_list
  "name|title"
%}

{% photo_masonry
  "name"
%}
