---
slug: Discoveries-32-CSS
title: "Discoveries #32 - CSS"
subtitle:
date: 2024-11-30 11:24:28
photograph:
  file: 23-09-11-Speyer-0029.jpg
  name: Red Motor Cover
  socialmedia: /static/images/social-media/Discoveries-32-CSS.jpg
series: Discoveries
categories:
  - Collection
tags:
  - CSS
  - HTML
related:
  - Discoveries-31
  - Discoveries-30-CSS-HowTo-s
  - Discoveries-29-CSS
syndication:
  - host: Mastodon
    url: 
---

This is now the fourth Discoveries issue in a row that deals with CSS and I wonder why. Maybe because CSS has been exploding in terms of functionality recently and many JavaScript articles on the web nearly always highlight some aspect of framework functionality, but I prefer to deal with vanilla JS.
Well then, here are a few CSS gems that I can only warmly recommend reading ... also for my future self.

{% anchorlist 
  "You don't need JavaScript for that|you-don-t-need-javascript-for-that"
  "Use cases for CSS comparison functions|use-cases-for-css-comparison-functions"
  "LH units are cool|lh-units-are-cool"
  "A Friendly Introduction to Container Queries|a-friendly-introduction-to-container-queries"
  "Style Queries|style-queries"
  "The Power of Composition with CSS Variables|the-power-of-composition-with-css-variables"
  "A Deep CSS Dive Into Radial And Conic Gradients|a-deep-css-dive-into-radial-and-conic-gradients"
  "Solved by CSS Scroll-Driven Animations: hide a header when scrolling down, show it again when scrolling up|solved-by-css-scroll-driven-animations-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up"
  "Making a Parallax SVG Landscape|making-a-parallax-svg-landscape"
  "Skeleton Screen Loading Animation using HTML & CSS|skeleton-screen-loading-animation-using-html-css"
%}

<!-- more -->

{% discovery "You don't need JavaScript for that" "Kilian Valkhof" "https://www.htmhell.dev/adventcalendar/2023/2/" Discoveries-32-CSS you-don-t-need-javascript-for-that.webp %}
In times when web developers often only know their way around JavaScript frameworks and even abstract CSS with JS, it's good to read articles that show a different way. Like this one by Kilian. Switches, dialogs, accordions ... all with HTML and CSS only.
{% enddiscovery %}

{% discovery "Use cases for CSS comparison functions" "Ahmad Shadeed" "https://ishadeed.com/article/use-cases-css-comparison-functions/" Discoveries-32-CSS use-cases-for-css-comparison-functions.webp %}
Many of my Discoveries are about CSS and each time there is at least one contribution from Ahmad. Here is a somewhat older, but important contribution to internalize min(), max() and clamp().
{% enddiscovery %}

{% discovery "LH units are cool" "Andy Bell" "https://piccalil.li/blog/lh-units-are-cool/" Discoveries-32-CSS lh-units-are-cool.webp %}
Combining icons and text, for example on a button, is sometimes a real pain. In this short tip, Andy introduced me to the LH unit, which puts the problem into perspective and which I really must try out.
{% enddiscovery %}

{% discovery "A Friendly Introduction to Container Queries" "Josh W. Comeau" "https://www.joshwcomeau.com/css/container-queries-introduction/" Discoveries-32-CSS a-friendly-introduction-to-container-queries.webp %}
As Josh says: "For a very long time, the most-requested CSS feature has been <em>container queries.</em> That's been our holy grail, the biggest missing piece in the CSS toolkit. Well, container queries have finally arrived …". In this article, Josh gives us a brief and easy-to-understand introduction to the possibilities.
{% enddiscovery %}

{% discovery "Style Queries" "Una Kravets" "https://una.im/style-queries/" Discoveries-32-CSS style-queries.webp %}
Container queries are on everyone's lips, i.e. @container declarations can be found in more and more code due to their broad support. However, most of them relate to the size of an element. However, you can also use a specific style as a basis, as Una shows us.
{% enddiscovery %}

{% discovery "The Power of Composition with CSS Variables" "Maxime Heckel" "https://blog.maximeheckel.com/posts/the-power-of-composition-with-css-variables/" Discoveries-32-CSS the-power-of-composition-with-css-variables.webp %}
Maxime shows us in his article how you can compose colors quite nicely with CSS variables. No more dozens of predefined HEX or RGB colors. Let CSS and HSLA get to work.
{% enddiscovery %}

{% discovery "A Deep CSS Dive Into Radial And Conic Gradients" "Ahmad Shadeed" "https://www.smashingmagazine.com/2022/01/css-radial-conic-gradient/" Discoveries-32-CSS a-deep-css-dive-into-radial-and-conic-gradients.webp %}
Until I read Ahmad's article, I wasn't even aware of all the things you can do with gradients, such as the dotted pattern effact. Wow. A must-read.
{% enddiscovery %}

{% discovery "Solved by CSS Scroll-Driven Animations: hide a header when scrolling down, show it again when scrolling up" "Bramus Van Damme" "https://www.bram.us/2024/09/29/solved-by-css-scroll-driven-animations-hide-a-header-when-scrolling-up-show-it-again-when-scrolling-down/" Discoveries-32-CSS solved-by-css-scroll-driven-animations-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up.webp %}
Scroll-driven animations are a wonderful way to guide the user through a page in an elegant way. Bramus never tires of showing us the various possibilities. This article is about the automatic hiding of the header ... without any JavaScript.
{% enddiscovery %}

{% discovery "Making a Parallax SVG Landscape" "Alistair Shepherd" "https://alistairshepherd.uk/writing/parallax-svg-landscape-1/" Discoveries-32-CSS making-a-parallax-svg-landscape.webp %}
Parallax effects, especially in relation to header images, are absolute eye-catchers. Alistairs not only has a really nice example of this on his blog, he also shows us how he created it with SVG files. Marvelous.
{% enddiscovery %}

{% discovery "Skeleton Screen Loading Animation using HTML & CSS" "Shantanu Jana" "https://dev.to/shantanu_jana/skeleton-screen-loading-animation-using-html-css-1ec3" Discoveries-32-CSS skeleton-screen-loading-animation-using-html-css.webp %}
This is an older post by Shanatu that shows us step by step how to create skeleton loading animations with pure HTML and CSS to give the user something to look at while the page loads.
{% enddiscovery %}
