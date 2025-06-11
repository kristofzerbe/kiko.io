---
slug: Discoveries-34-JS-Libraries
title: "Discoveries #34 - JS Libraries"
subtitle:
date: 2025-05-24 08:16:57
photograph:
  file: D50_9418_2406.jpg
  name: Dependable Engines
  socialmedia: /static/images/social-media/Discoveries-34-JS-Libraries.jpg
series: Discoveries
categories:
  - Collection
tags:
  - JavaScript
related:
  - Discoveries-33-Image-Presentation
  - Discoveries-32-CSS
  - Discoveries-31
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114562023025083098
---

This is only the third issue of Discoveries in the last six months. That's because I currently have significantly less time and energy to devote to non-work-related activities. This includes reading my many news sources, but also collecting and summarising the things I want to highlight on my blog.

However, here are a few discoveries from the last few months on the topic of JavaScript libraries that I would like to try out for myself as soon as possible...

{% anchorlist 
  "vConsole|vconsole"
  "Quicklink|quicklink"
  "easyShortcut.js|easyshortcut-js"
  "MapLibre GL JS|maplibre-gl-js"
  "HTML Minification for Static Sites|html-minification-for-static-sites"
  "find-up|find-up"
  "absolute-masonry|absolute-masonry"
  "JsonTree.js|jsontree-js"
  "SilverBox|silverbox"
%}

<!-- more -->

{% discovery "vConsole" "Tencent" "https://github.com/Tencent/vConsole" Discoveries-34-JS-Libraries vconsole.png %}
Ever wanted to debug your Web App on a mobile phone, without the need of another computer and cables? Try vConsole, a lightweight, extendable front-end developer tool for mobile web development, written in Vanilla JS and freely available at GitHub. It has plugin and theme support.
{% enddiscovery %}

{% discovery "Quicklink" "Google Chrome Labs" "https://getquick.link/" Discoveries-34-JS-Libraries quicklink.png %}
This project aims to be a drop-in solution for sites to prefetch links based on what is in the user's viewport. There is also a Chrome extension that injects and initializes the necessary code in every site you visit.
{% enddiscovery %}

{% discovery "easyShortcut.js" "Alireza Mohammadi" "https://github.com/wwwAlireza/easyShortcut.js" Discoveries-34-JS-Libraries easyshortcut-js.png %}
It is possible to operate a web app in a browser using the keyboard, but it only feels like an app when the developer provides hotkeys for important functions. This lib helps to create custom keyboard shortcuts, for example <code>new shortcut({ctrl: false, alt: false, shift: false, meta: false, key: "A", fn: ()=>{ alert("Hello World") }})</code>
{% enddiscovery %}

{% discovery "MapLibre GL JS" "MapLibre Organization" "https://maplibre.org/maplibre-gl-js/docs/" Discoveries-34-JS-Libraries maplibre-gl-js.png %}
Open source map solutions are rare and difficult to find among the many paid stuff available. Leaflet is a really good solution, and MapLibre doesn't want to let it grab all the attention. It's written in TypeScript and promises a good performance, due to GPU-accelerated vector tile rendering.
{% enddiscovery %}

{% discovery "HTML Minification for Static Sites" "Jim Nielsen" "https://blog.jim-nielsen.com/2025/html-minification/" Discoveries-34-JS-Libraries html-minification-for-static-sites.png %}
Every now and then, I've thought about automatically reducing the size of the HTML on my static pages to save my readers a few bytes when downloading. I'm now taking Jim's approach and analysis as an opportunity to do this with <a href="https://github.com/kangax/html-minifier">html-minifier</a>. Not that I'm hoping for a big effect due to the large number of photos ;)
{% enddiscovery %}

{% discovery "find-up" "Sindre Sorhus" "https://github.com/sindresorhus/find-up" Discoveries-34-JS-Libraries find-up.png %}
Paths in JavaScript development with Node.js are usually handled by messing around with strings split into arrays. At least for finding parent elements, this is not necessary thanks to the library from Sindre.
{% enddiscovery %}

{% discovery "absolute-masonry" "dalzein (GitHub User)" "https://github.com/dalzein/absolute-masonry" Discoveries-34-JS-Libraries absolute-masonry.png %}
I would prefer to have a CSS-native Masonry solution for my photos today rather than tomorrow, but it looks like I will have to wait a little longer. When it comes to interactive views, however, there is no way around JavaScript. This script, which is approximately 12 KB in size, sets the bar quite high for such a solution.
{% enddiscovery %}

{% discovery "JsonTree.js" "William Troup" "https://github.com/williamtroup/JsonTree.js" Discoveries-34-JS-Libraries jsontree-js.png %}
JSON is basically plain text, but with a structure, a tree structure. Visualising this in a meaningful way is sometimes essential. William's library not only helps with this, but also offers features that are usually only found in full-blown code editors. Chapeau, great stuff!
{% enddiscovery %}

{% discovery "SilverBox" "Saber Heydari" "https://github.com/Silverethical/silverBox" Discoveries-34-JS-Libraries silverbox.png %}
In times when CSS-native modal dialogs are becoming increasingly prevalent and sophisticated, JavaScript solutions are no longer in such high demand, but this one is worth a second look due to its ease of use and beauty.
{% enddiscovery %}
