---
title: Device Class Detection in JavaScript
subtitle: The unusual way by using CSS Media Queries
photograph:
  file: 19-05 Israel-0145.jpg
  name: Jaffa Pepsi
  link: 'https://500px.com/photo/1001750615/Jaffa-Pepsi-by-Kristof-Zerbe'
categories:
  - JavaScript
tags:
  - JavaScript
  - CSS
  - Browser
related:
  - Change-CSS-class-when-element-scrolls-into-viewport
date: 2020-09-28 15:27:17
---
In some occasions it is necessary to know which device a user is using while writing JavaScript Web Apps. Should be nothing regarding layout, because for this we have [``CSS Media Queries``](https://developer.mozilla.org/de/docs/Web/CSS/Media_Queries/Using_media_queries). 

Somewhere around 2011 W3C introduced [``matchMedia()``](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), which *returns a MediaQueryList object that can be used to detemnine if the document matches the media query string.* The using is pretty straightforward and feels a bit like RegEx matching in JS:

```js
const mediaQuery = window.matchMedia('(min-width: 1025px)')
if (mediaQuery.matches) {
  // do something...  
}
```

If you are interested in this API, you will find good introductions to the topic [here](https://css-tricks.com/working-with-javascript-media-queries/), [here](https://hacks.mozilla.org/2012/06/using-window-matchmedia-to-do-media-queries-in-javascript/) and [here (German)](https://www.mediaevent.de/javascript/window-matchMedia.html).

One point of criticism on this pure JS approach can be, that you have to maintain the breakpoints in addition to CSS ... **but why not use these existing breakpoints in JS**?

<!-- more -->

If you implement a feature that is based on the different device classes, you don't have to determine the current class with dozens of lines of JavaScript code, if you just can ask the DOM.

## The CSS/JS Breakpoint Hack

For this approach, we take advantage of the fact, that CSS can be used to define not only styles, but also content. We always use it, when showing an icon by using a symbol font like FontAwesome:

```css
my-fancy-icon::before {
  font-family: FontAwesome5Solid;
  content: "\f186";
}
```

Mixed with a ``@media`` rule, we can "inject" the needed device value into the DOM, for example into the ``BODY`` tag, but you can take whatever you want:

```css
@media (min-width: 1025px) {
  body:before {
    content: "DESKTOP";
  }
}
```

Just one line more in the masses of CSS code to make a Web App responsive, but with this one you can do without many lines of JS.

Now you can read out this value via JavaScript by getting the styles of the tag and get the injected content:

```js
  var style = window.getComputedStyle(document.querySelector("body"), ":before");
  var breakpoint = style.getPropertyValue("content").replace(/\"/g, "");
```

It is advisable to embed this request into an event listener of ``DOMContentLoaded``, because the rule has to be set, before you can access it.

See a simple working pen:

{% codepen WNwWjBR 'CSS/JS Breakpoint Hack' css %}
