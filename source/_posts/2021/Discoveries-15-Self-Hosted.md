---
title: 'Discoveries #15 - Self Hosted'
subtitle:
date: 2021-12-25 12:18:51
photograph:
  file: 21-08-05 Kroatien-3015.jpg
  name: Combination Lock
  link: 'https://500px.com/photo/1037371999'
series: Discoveries
categories:
  - Misc
tags:
  - Collection
related:
  - Discoveries-14
  - Discoveries-13
  - Discoveries-12-Tutorials
---

Especially on Github you can find amazing open source solutions for self hosting, that makes it unnecessary to rely on web services from companies you did not know. In this issue of Discoveries I would like to introduce you to a few of them ... Happy Holidays

{% anchorlist  
  "AppFlowy|appflowy"
  "Bangle.io|bangle-io"
  "Cal.com (formerly Calendso)|calendso"
  "RSS-proxy|rss-proxy"
  "FreshRSS|fresh-rss"
  "Statsig's Status Page|status-page"
  "changedetection.io|changedetection"
  "Homer|homer"
  "Fiddly|fiddly"
  "FileDrop|filedrop"
%}

<!-- more -->

{% discovery "AppFlowy" "-unknown-" "https://github.com/AppFlowy-IO/appflowy" Discoveries-15-Self-Hosted appflowy.png %}
[AppFlowy.IO](https://www.appflowy.io/) is a [Notion](https://notion.so) clone, written in Flutter and Rust und runs on macOS (with installer), Windows and Linux.
{% enddiscovery %}

{% discovery "Bangle.io" "-unknown-" "https://github.com/bangle-io/bangle-io" Discoveries-15-Self-Hosted bangle-io.png %}
[Bangle.io](https://bangle.io/) is a web based note taking platform, like [Notion](https://notion.so), but local only. It is written in TypeScript and relies on Markdown and works also offline.
{% enddiscovery %}

{% discovery "Cal.com (formerly Calendso)" "Cal.com Team" "https://github.com/calendso/calendso" Discoveries-15-Self-Hosted calendso.png %}
[Cal.com](https://cal.com/) is an alternative scheduling service to [Calendsy](https://calendly.com/), driven by a company as a service, but also available as Open Source for selfhosting. It is written in JavaScript (Next.js).
{% enddiscovery %}

{% discovery "RSS-proxy" "Github User 'damoeb'" "https://github.com/damoeb/rss-proxy" Discoveries-15-Self-Hosted rss-proxy.png %}
RSS-proxy ([demo](https://rssproxy-v1.migor.org/)), written in TypeScript, is a web service to create ATOM, RSS or JSON feeds by analyzing a websites static HTML structure. Helpful for websites, that doesn't provide a feed.
{% enddiscovery %}

{% discovery "FreshRSS" "Alexandre Alapetite & Others" "https://github.com/FreshRSS/FreshRSS" Discoveries-15-Self-Hosted fresh-rss.png %}
FreshRSS ([demo](https://demo.freshrss.org/)) is an alternative to feed.ly and other online RSS readers and aggregators, written in PHP. It supports custom tags, push notifications and extensions and has a CLI.
{% enddiscovery %}

{% discovery "Statsig's Status Page" "statsig.com Team" "https://github.com/statsig-io/statuspage/" Discoveries-15-Self-Hosted status-page.png %}
This open source status page solution ([demo](https://status.statsig.com/)) uses Github actions to run a ``sh`` script every hour against configurable URL's to check their status and log it in a static ``index.html``.
{% enddiscovery %}

{% discovery "changedetection.io" "Github User 'dgtlmoon'" "https://github.com/dgtlmoon/changedetection.io" Discoveries-15-Self-Hosted changedetection.png %}
Web solution for monitoring configurable websites or JSON API's for changes, written in Python. It detects changes, notifies and shows the differences.
{% enddiscovery %}

{% discovery "Homer" "Bastien Wirtz" "https://github.com/bastienwirtz/homer" Discoveries-15-Self-Hosted homer.png %}
A simple, but nice dashboard for your servers and services, configurable with YAML and written in Vue.
{% enddiscovery %}

{% discovery "Fiddly" "Sara Vieira" "https://github.com/SaraVieira/fiddly" Discoveries-15-Self-Hosted fiddly.png %}
Fiddly creates customizable HTML pages out of your Github projects README files for hosting on Github Pages , Netlify or others under a dedicated domain.
{% enddiscovery %}

{% discovery "FileDrop" "Khodadad (Adrian) Nouchin" "https://github.com/Xtrendence/FileDrop" Discoveries-15-Self-Hosted filedrop.png %}
FileDrop is an application to share files in the same network through a browser. It is written in JavaScript and Electron (Server) and is using WebSocket for encrypted transport. Releases are available for Windows, macOS and Linux.
{% enddiscovery %}
