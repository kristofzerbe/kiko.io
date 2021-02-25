---
title: {{ title }}
subtitle: 
date: {{ date }}
hitcountId: {{ hitcount.io }}
photograph: 
  file: ''
  name: ''
  link: ''
part: {{ part }}
categories:
  - Discoveries
tags:
  - Great Finds
related:
  - Discoveries-{{ part - 1 }}
  - Discoveries-{{ part - 2 }}
  - Discoveries-{{ part - 3 }}
---

{% anchorlist 
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
  "TITLE|IMGFILE"
%}

<!-- more -->

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}

{% discovery "TITLE" "AUTHOR" URL Discoveries-{{ part }} IMGFILE.png %}
{% enddiscovery %}
