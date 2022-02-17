---
slug: Discoveries-16-JavaScript
title: 'Discoveries #16 - JavaScript'
subtitle: null
date: 2022-01-29T13:39:24.000Z
photograph:
  file: 20-08 Mallorca-7019.jpg
  name: Sliced
  link: 'https://500px.com/photo/1023572758'
  socialmedia: /static/images/social-media/Discoveries-16-JavaScript.png
series: Discoveries
categories:
  - Misc
tags:
  - Collection
related:
  - Discoveries-15-Self-Hosted
  - Discoveries-14
  - Discoveries-13
---

In the first discoveries of 2022 I would like to offer you some interesting links to JavaScript articles that have general language features as their topic or extend them in a clever way. The language (respectively the [ECMA standard](https://en.wikipedia.org/wiki/ECMAScript) behind it) is growing from year to year and it is exiting to see how it is expanding.

{% anchorlist  
  "Modern Javascript: Everything you missed over the last 10 years|modern-javascript"
  "How can I define an enum in JavaScript?|define-enum"
  "'export default thing' is different to 'export { thing as default }'|export-default-thing"
  "Dynamic, Conditional Imports|dynamic-conditional-imports"
  "10 Client-side Storage Options and When to Use Them|storage-options"
  "An Intro to JavaScript Proxy|js-proxy"
  "The Observer Pattern in JavaScript - The Key to a Reactive Behavior|observer-pattern"
  "Why JavaScript Developers Should Prefer Axios Over Fetch|prefer-axios-over-fetch"
  "Toolkit for managing multiple promises|antfu-p"
  "Promisify an entire object or class instance|promisify"
%}

<!-- more -->

{% discovery "Modern Javascript: Everything you missed over the last 10 years" "Sandro Turriate" "https://turriate.com/articles/modern-javascript-everything-you-missed-over-10-years" Discoveries-#16 modern-javascript.png %}
Sandra has written this post about the language features of ECMA Script 2020 a couple of months ago as a kind of CheatSheet, with runnable examples and a lot of useful background knowledge.
{% enddiscovery %}

{% discovery "How can I define an enum in JavaScript?" "Angelos Chalaris" "https://www.30secondsofcode.org/articles/s/javascript-enum" Discoveries-16 define-enum.png %}
Angelos describes is this post, two different ways to define enums in JavaScript, as you might know them other languages.
{% enddiscovery %}

{% discovery "'export default thing' is different to 'export { thing as default }'" "Jake Archibald" "https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default/" Discoveries-16 export-default-thing.png %}
IMPORT and EXPORT are a fine way to separate code, but you need to know and keep in mind a few things, as Jake shows us here.
{% enddiscovery %}

{% discovery "Dynamic, Conditional Imports" "Chris Coyier " "https://css-tricks.com/dynamic-conditional-imports/" Discoveries-16 dynamic-conditional-imports.png %}
When you separate code in different ES modules, you may come to the point where you want import a module depending on a specific condition. Chris show us here, how to deal with this easily.
{% enddiscovery %}

{% discovery "10 Client-side Storage Options and When to Use Them" "Craig Buckler" "https://www.sitepoint.com/client-side-storage-options-comparison/" Discoveries-16 storage-options.png %}
Especially if you are writing a web app, you need to consider what storage options you have, to provide the user an optimal user experience. Craig list them all in his post and goes into the specific characteristics and possible uses.
{% enddiscovery %}

{% discovery "An Intro to JavaScript Proxy" "Travis Almand" "https://css-tricks.com/an-intro-to-javascript-proxy/" Discoveries-16 js-proxy.png %}
JavaScript provides a PROXY, which enables you to intercept and redefine fundamental operations for an object. Is it not that common to use it, but it has great advantages, as Travis show us.
{% enddiscovery %}

{% discovery "The Observer Pattern in JavaScript - The Key to a Reactive Behavior" "Fernando Doglio" "https://blog.bitsrc.io/the-observer-pattern-in-javascript-the-key-to-a-reactive-behavior-f28236e50e10" Discoveries-16 observer-pattern.png %}
Sometimes it is necessary to decouple functionality in JS, in order to write cleaner code or to increase complexity. Fernando shows us how to implement our own observers, with subscribing, notifying and all that stuff.
{% enddiscovery %}

{% discovery "Why JavaScript Developers Should Prefer Axios Over Fetch" "Sabesan Sathananthan" "https://betterprogramming.pub/why-javascript-developers-should-prefer-axios-over-fetch-294b28a96e2c" Discoveries-16 prefer-axios-over-fetch.png %}
FETCH is the method defined in the ECMA standard to get data from remote servers, but in the meanwhile the library [Axios](https://github.com/axios/axios) has become almost a de-facto standard in the industry and Sabesan tells why.
{% enddiscovery %}

{% discovery "Toolkit for managing multiple promises" "Anthony Fu" "https://github.com/antfu/p" Discoveries-16 antfu-p.png %}
This tiny library makes it easier to deal with multiple promises as it PROMISE.ALL does. Remarkable.
{% enddiscovery %}

{% discovery "Promisify an entire object or class instance" "Gar" "https://github.com/wraithgar/gar-promisify" Discoveries-16 promisify.png %}
Mixing async with non-async code may have some pitfalls, you can avoid by using Gar's tiny library.
{% enddiscovery %}
