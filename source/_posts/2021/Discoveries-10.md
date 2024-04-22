---
slug: Discoveries-10
title: 'Discoveries #10'
subtitle: null
date: 2021-05-24T17:04:26.000Z
photograph:
  file: 19-07-Schottland-0372.jpg
  name: Tiny Scots 6
  socialmedia: /static/images/social-media/Discoveries-10.png
series: Discoveries
categories:
  - Collection
tags:
  - JavaScript
related:
  - Discoveries-9
  - Discoveries-8
  - Discoveries-7
---

Todays Discoveries it's all about my favourite programming language JavaScript. Some tiny tips and tricks alongside with a deep dive into 'console' and some helful UI libraries. Have fun...

{% anchorlist  
  "Beyond Console.log()|beyond-console-log"
  "DOMGuard - Stop scammers from the manipulating DOM|dom-guard"
  "Handling User Permissions in JavaScript|handling-permissions-in-js"
  "html-chain - Make html by chaining javascript functions|html-chain"
  "Accessible Autocomplete|accessible-autocomplete"
  "JS DataTable|js-datatable"
  "MK Charts|mk-charts"
  "Snabbt.js - Fast animations with Javascript and CSS transforms|snabbt-js"
  "SimplyLazy - Pure JavaScript Image Lazy Loader|simply-lazy",
  "Blury-Loading|blury-loading"
%}

<!-- more -->

{% discovery "Beyond Console.log()" "Christian Heilmann" "https://www.sitepoint.com/beyond-console-log-level-up-your-debugging-skills/" Discoveries-10 beyond-console-log.png %}
The browser console is propably the most used tool for debugging JavaScript, but most of the time we all just scatch the surface. Christian show us the power of the console.
{% enddiscovery %}

{% discovery "DOMGuard - Stop scammers from the manipulating DOM" "David Wells" "https://dom-guard.netlify.app/" Discoveries-10 dom-guard.png %}
There are many attack vectors scammers use to draw money out of the pockets. You have to make it as difficult as possible for them. Davids idea is to protect the DOM of the browser against changes utilizing the JS MutationObserver. Clever.
{% enddiscovery %}

{% discovery "Handling User Permissions in JavaScript" "Andreas Remdt" "https://css-tricks.com/handling-user-permissions-in-javascript/" Discoveries-10 handling-permissions-in-js.png %}
In case you have to intregrate a permission system into your Web App, to separate features from different user groups, Andreas post on CSS Tricks is a very good entry point into the subject.
{% enddiscovery %}

{% discovery "html-chain - Make html by chaining javascript functions" "Matthew Elphick" "https://github.com/maael/html-chain" Discoveries-10 html-chain.png %}
There are several ways on dealing with HTML in JavaScript. My favourite approach are literals. Matthew gives us with his library the possibility to do it in a LINQ-style by chaining commands.
{% enddiscovery %}

{% discovery "Accessible Autocomplete" "Government Digital Service" "https://github.com/alphagov/accessible-autocomplete" Discoveries-10 accessible-autocomplete.png %}
Many cool looking UI elements on the web are not accessible for the impaired. But especially public services has to be aware of that. Developers from the British Government Digital Service have created a full WAI-ARIA compatible library for autocomplete inputs.
{% enddiscovery %}

{% discovery "JS DataTable" "Luigi Verolla" "https://github.com/luverolla/js-datatable" Discoveries-10 js-datatable.png %}
Deaing with tables in HTML can be a mess, when you try to add some functionality like searching, sorting and paging and that also responsive. Take a nap, because Luigi has a fully functional solution for this.
{% enddiscovery %}

{% discovery "MK Charts" "Marcus Kirschen" "https://mkirschen.de/mk-scripts/mk-charts/" Discoveries-10 mk-charts.png %}
Dashboards everywhere. In case you don't have a specialized UI library and just want to add some circle charts to your UI, try out Marcus' solution. Just define the values in your HTML tag and let MK Charts do the rest. Simple and easy.
{% enddiscovery %}

{% discovery "Snabbt.js - Fast animations with Javascript and CSS transforms" "Daniel Lundin" "https://daniel-lundin.github.io/snabbt.js/" Discoveries-10 snabbt-js.png %}
Snabbt is quite old in terms of the IT industry, but still worth mentioning, because it is a really light and fast solution for adding animations to your Web App. See the demos ... it's still stunning.
{% enddiscovery %}

{% discovery "SimplyLazy - Pure JavaScript Image Lazy Loader" "Max (maxshuty)" "https://maxshuty.github.io/simply-lazy/" Discoveries-10 simply-lazy.png %}
Lazy loading can be a must on image heavy webs and you got bazillion results while searching for the right JS library. I can recommend Max's solution, because it's quite tiny and has callback as well as default image support.
{% enddiscovery %}

{% discovery "Blury-Loading" "S.M.Abtahi Noor" "https://github.com/19smabtahinoor/Blury-Loading" Discoveries-10 blury-loading.png %}
Apropos loading ... maybe you want to preload your Web App's sources completely and show the user a loading visual? Take this nice looking approach: while a percentage figure is running upwards, the background image is getting less blurry. A three-liner, but cool. Thanks Mr. Noor.
{% enddiscovery %}
