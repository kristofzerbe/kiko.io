---
slug: Discoveries-31
title: "Discoveries #31"
subtitle:
date: 2024-10-07 13:28:54
photograph:
  file: D50_9511_2406.jpg
  name: Bent Details
  socialmedia: /static/images/social-media/Discoveries-31.png
series: Discoveries
categories:
  - Collection
tags:
  - Templating
  - HTML
  - JavaScript
  - Node.js
related:
  - Discoveries-30-CSS-HowTo-s
  - Discoveries-29-CSS
  - Discoveries-28-UI-Components
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/113266679764249475
---

It's been three months since the last Discoveries, but it's by no means as if I haven't found a few things worth writing about in the meantime. I just had to prioritize my own new JS solution [**Mentions United**](/post/Mentions-United-3-2-1-go/) ... and there also had to be a bit of leisure time left over.

This time, I was particularly impressed by the web component &lt;browser-mockup&gt;, not least because its author responded to problem reports so quickly and competently.

Have fun discovering new tech marvels…

{% anchorlist
  "&lt;browser-mockup&gt;|browser-mockup"
  "TypeIt|typeit"
  "The Odin Project|the-odin-project"
  "Can you convert a video to pure css?|convert-video-to-pure-css"
  "code.movie|code-movie"
  "BrowserPub|browserpub"
  "Magery|magery"
  "MiniSearch|minisearch"
  "DotNetJS|dotnetjs"
  "striptags|striptags"
%}

<!-- more -->

{% discovery "&lt;browser-mockup&gt;" "catapart" "https://github.com/catapart/magnitce-browser-mockup" Discoveries-31 browser-mockup.png %}
Whoever 'catapart' is, she/he/* did an amazing job on creating this custom HTML element, which mocks the Chrome browser for visual demonstrations and screenshots. You can just use his on <a href="https://catapart.github.io/magnitce-browser-mockup/demo/screenshot.html" title="‌">screenshot tool</a>  or integrate the Web Component into your solution.
{% enddiscovery %}

{% discovery "TypeIt" "Alex MacArthur" "https://www.typeitjs.com/" Discoveries-31 typeit.png %}
Alex says about his typewriter solution “The most versatile JavaScript typewriter effect library on the planet”. I'm always a bit suspicious of such big words, but maybe it's true. In any case, the JS library is wonderfully suited for animating text on a website. However, it is only free for personal use or for open source projects.
{% enddiscovery %}

{% discovery "The Odin Project" "multiple contributors" "https://www.theodinproject.com/" Discoveries-31 the-odin-project.png %}
The entire internet can be a learning resource, but it usually takes a while for beginners to find the good sites. Here is a really good one, and it is also very well structured and maintained by a community.
{% enddiscovery %}

{% discovery "Can you convert a video to pure css?" "David Gerrells" "https://dgerrells.com/blog/can-you-convert-a-video-to-pure-css" Discoveries-31 convert-video-to-pure-css.png %}
I am familiar with some of the crazy things Jhey Tomkins (<a href="https://jhey.dev">https://jhey.dev</a>) does with CSS. David too ... but what he was inspired to do in this post is simply insane. He converts small videos into pure CSS! I have to admit, though, that in the first third of the post I didn't really know what he was talking about... ;)
{% enddiscovery %}

{% discovery "code.movie" "Peter Kröner" "https://code.movie/" Discoveries-31 code-movie.png %}
Code examples are worth a thousand words. The knowledgeable reader can understand the code, but it is sometimes difficult or even impossible to understand how the author came up with it. The only solution is to split the example into several blocks... or to use Peter's JavaScript library, which can be used to animate code as it is created, with full syntax highlighting.
{% enddiscovery %}

{% discovery "BrowserPub" "John Spurlock" "https://browser.pub/" Discoveries-31 browserpub.png %}
Every wanted to get a technical insight into ActivityPub, the protocol which drives the Fediverse aka Social Web? John has written a browser for Activity Pub in the name of which, browser.pub, already suggests. It can be used, for example, to view the data behind your own Mastodon account. It's great for learning ...
{% enddiscovery %}

{% discovery "Magery" "Caolan McMahon" "https://github.com/caolan/magery" Discoveries-31 magery.png %}
Caolan's small JS library takes working with HTML templates to a new, more convenient level. It supports variables as well as some data attributes for loops and conditionals and other useful things. The processed templates can then be easily bound to JSON data. It's nice that Magery takes advantage of HTML standards and doesn't reinvent the wheel as some of the modern framework do.
{% enddiscovery %}

{% discovery "MiniSearch" "Luca Ongaro" "https://github.com/lucaong/minisearch" Discoveries-31 minisearch.png %}
With this JS library, Luca has developed a small but powerful in-memory full-text search engine that can run in Node as well as in the browser. It can do auto-suggestion, fuzzy search and controllable result ranking... and all this at just under 7KB in size.
{% enddiscovery %}

{% discovery "DotNetJS" "Artyom Sovetnikov" "https://github.com/Elringus/DotNetJS" Discoveries-31 dotnetjs.png %}
Write a library in C# and use it in TypeScript or JavaScript? Possible with Artyom's Bootsharp ... and all without Blazor. This opens up completely new possibilities for .NET web developers.
{% enddiscovery %}

{% discovery "striptags" "Eric Norris" "https://www.npmjs.com/package/striptags/v/3.1.1" Discoveries-31 striptags.png %}
A small but incredibly useful little helper in dealing with HTML from Eric. HTML in and out of plain text, with the option to keep one or two tags if you need them.
{% enddiscovery %}
