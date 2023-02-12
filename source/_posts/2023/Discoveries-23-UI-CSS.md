---
slug: Discoveries-23-UI-CSS
title: 'Discoveries #23 -  UI/CSS'
subtitle:
date: 2023-02-12 11:45:10
photograph:
  file: 22-08 Bretagne-Jersey-1332.jpg
  name: Seagull Meeting
  link: https://500px.com/photo/1056125597/seagull-meeting-by-kristof-zerbe
  socialmedia: /static/images/social-media/Discoveries-23-UI-CSS.png
series: Discoveries
categories:
  - Misc
tags:
  - Collection
related:
  - Discoveries-22-Tips-Tricks
  - Discoveries-21-Sites-Pages
  - Discoveries-20-CSS-UI
syndication:
  - host: Mastodon
    url: 
---

As a visual person, I'm always thrilled when I come across small but subtle tips, tricks or even entire solutions that lift my understanding of what can be done with CSS to new heights. Of course, this month ``:has()`` is once again one of them, but also once again contributions from [Bramus van Damme](https://www.bram.us) and [Ahmad Shadeed](https://ishadeed.com), whose posts I read without exception because they are both so good at what they do.

{% anchorlist 
  "Tree views in CSS|tree-views-in-css|tree-views-in-css"
  "Scroll Shadows With JavaScript|scroll-shadows-with-javascript"
  "CSS Mirror Editing in Edge DevTools for VS Code|css-mirror-editing-in-edge-devtools-for-vs-code"
  "Prevent Scroll Chaining With Overscroll Behavior|prevent-scroll-chaining-with-overscroll-behavior"
  "Display content in the title bar - Microsoft Edge Development|display-content-in-the-title-bar-microsoft-edge-development"
  "The large, small, and dynamic viewport units|the-large-small-and-dynamic-viewport-units"
  "An Interactive Guide to Flexbox in CSS|an-interactive-guide-to-flexbox-in-css"
  "Flexbox Dynamic Line Separator|flexbox-dynamic-line-separator"
  "Style a parent element based on its number of children using CSS :has()|style-a-parent-element-based-on-its-number-of-children-using-css-has"
  ":has(): the family selector|has-the-family-selector"
%}

<!-- more -->

{% discovery "Tree views in CSS" "Kate Rose Morley" "https://iamkate.com/code/tree-views/" Discoveries-23-UI-CSS tree-views-in-css.png %}
Kate shows us how to create a tree view as collapsible list, created using only html and css, without the need for JavaScript
{% enddiscovery %}

{% discovery "Scroll Shadows With JavaScript" "Chris Coyier" "https://css-tricks.com/scroll-shadows-with-javascript/" Discoveries-23-UI-CSS scroll-shadows-with-javascript.png %}
A good scrollable design shows the user if he can scroll further or not. Chris has an approach on that with pure CSS.
{% enddiscovery %}

{% discovery "CSS Mirror Editing in Edge DevTools for VS Code" "Christian Heilmann" "https://christianheilmann.com/2021/09/16/css-mirror-editing-in-edge-devtools-for-vs-code/" Discoveries-23-UI-CSS css-mirror-editing-in-edge-devtools-for-vs-code.png %}
How often do you fiddle around with CSS in Chrome&#39;s DevTools and copy the stuff back to your code? Christian shows how Mirror Editing works.
{% enddiscovery %}

{% discovery "Prevent Scroll Chaining With Overscroll Behavior" "Ahmad Shadeed" "https://ishadeed.com/article/prevent-scroll-chaining-overscroll-behavior/" Discoveries-23-UI-CSS prevent-scroll-chaining-with-overscroll-behavior.png %}
Dealing with scroll boundaries when you have many scrolling boxes on a page is a mess, until you have read Ahmad&#39;s advice regarding the use of &#39;overscroll-behavior&#39;
{% enddiscovery %}

{% discovery "Display content in the title bar - Microsoft Edge Development" "Microsoft Learn" "https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay" Discoveries-23-UI-CSS display-content-in-the-title-bar-microsoft-edge-development.png %}
In PWAs, at least on the desktop, a lot of space is wasted with the title bar of the window. The use of &#39;display_override&#39; should change that.
{% enddiscovery %}

{% discovery "The large, small, and dynamic viewport units" "Bramus Van Damme" "https://web.dev/viewport-units/" Discoveries-23-UI-CSS the-large-small-and-dynamic-viewport-units.png %}
The most used device on the Internet has long been the smartphone, but the visible area is trimmed by the browsers there from the necessary dynamic toolbars. To address this, there are new size units.
{% enddiscovery %}

{% discovery "An Interactive Guide to Flexbox in CSS" "Josh Comeau" "https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/" Discoveries-23-UI-CSS an-interactive-guide-to-flexbox-in-css.png %}
There are plenty of Flexbox tutorials, cheat sheets and generators, but Josh turns it into an interactive learning lesson. Very memorable.
{% enddiscovery %}

{% discovery "Flexbox Dynamic Line Separator" "Ahmad Shadeed" "https://ishadeed.com/article/flexbox-separator/" Discoveries-23-UI-CSS flexbox-dynamic-line-separator.png %}
Flexbox again and Ahmad again ... If you need separator lines between boxes for different devices, here&#39;s how the can be done nice and easy.
{% enddiscovery %}

{% discovery "Style a parent element based on its number of children using CSS :has()" "Bramus Van Damme" "https://www.bram.us/2022/11/17/style-a-parent-element-based-on-its-number-of-children-using-css-has/" Discoveries-23-UI-CSS style-a-parent-element-based-on-its-number-of-children-using-css-has.png %}
:has() is the hottest kid in town right now, because it allows the long-cherished dream of many web developers to style a parent element depending on his children. Bramus shows how...
{% enddiscovery %}

{% discovery ":has(): the family selector" "Jhey Tompkins" "https://developer.chrome.com/blog/has-m105/" Discoveries-23-UI-CSS has-the-family-selector.png %}
As :has() is so hot, it&#39;s good to have another resource talking about. Jhey has collected so many examples that hardly any questions remain open.
{% enddiscovery %}
