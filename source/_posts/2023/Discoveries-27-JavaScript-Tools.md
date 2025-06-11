---
slug: Discoveries-27-JavaScript-Tools
title: 'Discoveries #27 - JavaScript Tools'
subtitle:
date: 2023-11-20 15:16:39
photograph:
  file: 22-08-Bretagne-Jersey-1491.jpg
  name: Medieval Art
  socialmedia: /static/images/social-media/Discoveries-27-JavaScript-Tools.jpg
series: Discoveries
categories:
  - Collection
tags:
  - JavaScript
related:
  - Discoveries-26-JavaScript-HowTo-s
  - Discoveries-25-Tutorials-HowTo-s
  - Discoveries-24-JavaScript-UI
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111443843746228740
---

This month&#39;s Discoveries are about small, large, new and somewhat older JavaScript tools that can make life and coding easier for developers. Why reinvent the wheel when someone has already done it. Happy Coding :)

{% anchorlist 
  "Spacing.js - Measuring|spacing-js-measuring"
  "Ukiyo.js - Parallax Effect|ukiyo-js-parallax-effect"
  "IntersectionObserver Debugger|intersectionobserver-debugger"
  "mande - Fetch Wrapper|mande-fetch-wrapper"
  "Vest - Declarative Validations Framework|vest-declarative-validations-framework"
  "Granim.js - Gradient Animation|granim-js-gradient-animation"
  "RoughNotation|roughnotation"
  "barba.js - Page Transitions|barba-js-page-transitions"
  "dead-or-alive - URL Checker|dead-or-alive-url-checker"
  "timeago - Format Date|timeago-format-date"
%}

<!-- more -->

{% discovery "Spacing.js - Measuring" "Steven Lei" "https://spacingjs.com/" Discoveries-27-JavaScript-Tools spacing-js-measuring.png %}
Have you ever wanted to measure your web layout during development? Steven has a solution for you. Either as JavaScript integrated in HTML or as a Chrome plugin.
{% enddiscovery %}

{% discovery "Ukiyo.js - Parallax Effect" "Yiteng Jun" "https://github.com/yitengjun/ukiyo-js" Discoveries-27-JavaScript-Tools ukiyo-js-parallax-effect.png %}
This ES6 library is an easy to use tool for creating efficient background parallax effects for &lt;img&gt;, &lt;picture&gt;, &lt;video&gt; elements and background images. It can be called manually via JavaScript or automatically via a special class or data attribute.
{% enddiscovery %}

{% discovery "IntersectionObserver Debugger" "Rodrigo Pombo" "https://github.com/pomber/intersection-observer-debugger" Discoveries-27-JavaScript-Tools intersectionobserver-debugger.png %}
This tiny script is a debugging tool, included during development, which shows you the root, target, and intersection every time an IntersectionObserver is triggered.
{% enddiscovery %}

{% discovery "mande - Fetch Wrapper" "Eduardo San Martin Morote" "https://github.com/posva/mande" Discoveries-27-JavaScript-Tools mande-fetch-wrapper.png %}
With mande Eduardo has written a great wrapper for JavaScripts fetch(), which not only relieves you of a lot of typing work, but also comes with a few useful extensions, e.g. for nuxt. This turns an API call into a one-liner.
{% enddiscovery %}

{% discovery "Vest - Declarative Validations Framework" "Evyatar Alush" "https://github.com/ealush/vest" Discoveries-27-JavaScript-Tools vest-declarative-validations-framework.png %}
Vest is a declarative validation framework for validating form input that is as easy to use as the Mocha or Jest unit test libraries.
{% enddiscovery %}

{% discovery "Granim.js - Gradient Animation" "Benjamin Blonde" "https://sarcadass.github.io/granim.js/examples.html" Discoveries-27-JavaScript-Tools granim-js-gradient-animation.png %}
Benjamin has created a library to animate gradients as complex as you need them. It supports pausing when it&#39;s not in view and different blending modes for images.
{% enddiscovery %}

{% discovery "RoughNotation" "Preet Shihn" "https://roughnotation.com/" Discoveries-27-JavaScript-Tools roughnotation.png %}
To emphasize something important on a sheet of paper, you sometimes use a highlighter. This library brings that to the web in an animated way. With a circle around it, underlined ... or both, you&#39;re sure to attract attention.
{% enddiscovery %}

{% discovery "barba.js - Page Transitions" "Multiple Contributors" "https://barba.js.org/features/user-friendly/" Discoveries-27-JavaScript-Tools barba-js-page-transitions.png %}
Barba is a library that allows you to create fluid and smooth transitions between pages on your website, while we wait for the [View Transitions API](https://caniuse.com/?search=View+Transitions+API).
{% enddiscovery %}

{% discovery "dead-or-alive - URL Checker" "Titus Wormer" "https://github.com/wooorm/dead-or-alive" Discoveries-27-JavaScript-Tools dead-or-alive-url-checker.png %}
This URL checker ensures that links do not lead to nothing, whether on websites, in node projects or in service workers. It even checks anchor links for the presence of the element.
{% enddiscovery %}

{% discovery "timeago - Format Date" "Whoever Titanium is..." "https://github.com/Titanium2099/timeago" Discoveries-27-JavaScript-Tools timeago-format-date.png %}
&#39;Your message was sent 5 minutes ago&#39;. Notes like these are easy to bring into a web application with this script. It currently only supports English, but is easily customizable.
{% enddiscovery %}
