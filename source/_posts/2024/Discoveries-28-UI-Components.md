---
slug: Discoveries-28-UI-Components
title: 'Discoveries #28 - UI Components'
subtitle:
date: 2024-02-23 14:14:10
photograph:
  file: 23-08-Mecklenburg-Seen-0040.jpg
  name: Grinning Horse
  socialmedia: /static/images/social-media/Discoveries-28-UI-Components.png
series: Discoveries
categories:
  - Collection
tags:
  - UI
related:
  - Discoveries-27-JavaScript-Tools
  - Discoveries-26-JavaScript-HowTo-s
  - Discoveries-25-Tutorials-HowTo-s
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111986306738554713
---

UI is the first building block for UX. Build a user interface that is easy to understand and use and your users will have a good experience and enjoy your website or web app.

In this new edition of Discoveries (after three long months without), we look at UI elements that are worth a second look. Some of these I&#39;m pretty sure I&#39;ll incorporate into one of my existing projects and others I&#39;ll find an opportunity for in the future.

{% anchorlist 
  "Syntax highlighting code blocks with Prism and the Custom Highlight API|syntax-highlighting-code-blocks-with-prism-and-the-custom-highlight-api"
  "Syntax.js|syntax-js"
  "Replace JavaScript Dialogs With New HTML Dialog|replace-javascript-dialogs-with-new-html-dialog"
  "Build an off-canvas menu with &lt;dialog&gt; and web components|build-an-off-canvas-menu-with-dialog-and-web-components"
  "Windowise|windowise"
  "Accordion Slider - Responsive and Touch-enabled accordion|accordion-slider-responsive-and-touch-enabled-accordion"
  "floatype.js|floatype-js"
  "canvas-datagrid|canvas-datagrid"
  "TreeData.js|treedata-js"
  "Grid-Overflow|grid-overflow"
%}

<!-- more -->

{% discovery "Syntax highlighting code blocks with Prism and the Custom Highlight API" "Bramus" "https://codepen.io/bramus/pen/VwRqGVo" Discoveries-28-UI-Components syntax-highlighting-code-blocks-with-prism-and-the-custom-highlight-api.png %}
&quot;Show me the code or it doesn&#39;t happen&quot;. Every tech-related blogger has to have to show code once in a while. In HTML there is the CODE tag for this, but hardly anyone can do without syntax highlighting. The best-known libraries for this are <a href="https://highlightjs.org/">highlight.js</a> and <a href="https://prismjs.com/">Prism.js</a>. Bramus shows us how the latter will work with the new Custom Highlight API (W3C Draft).
{% enddiscovery %}

{% discovery "Syntax.js" "William Troup" "https://github.com/williamtroup/Syntax.js" Discoveries-28-UI-Components syntax-js.png %}
Speaking of highlighting ... William has set out to develop an alternative to the top dogs with Syntax.js. Under an MIT licence, without dependencies and fresh UI ideas.
{% enddiscovery %}

{% discovery "Replace JavaScript Dialogs With New HTML Dialog" "Mads Stoumann" "https://css-tricks.com/replace-javascript-dialogs-html-dialog-element/" Discoveries-28-UI-Components replace-javascript-dialogs-with-new-html-dialog.png %}
The relatively new HTML tag DIALOG offers developers more possibilities than you might think, because it goes far beyond the alert() or prompt() approach. In this article, Mads explains the basics using examples.
{% enddiscovery %}

{% discovery "Build an off-canvas menu with <dialog> and web components" "Mark Conroy" "https://blog.logrocket.com/build-off-canvas-menu-web-components/" Discoveries-28-UI-Components build-an-off-canvas-menu-with-dialog-and-web-components.png %}
Mark goes one step further with the DIALOG element and shows how you can use it to build an attractive off-canvas menu ... and I already know exactly where I will use this approach ;)
{% enddiscovery %}

{% discovery "Windowise" "Gao Sun" "https://gao-sun.github.io/windowise/" Discoveries-28-UI-Components windowise.png %}
More than 7 years ago, Gao presented Windowise, a library that uses all kinds of HTML tags to offer the user interesting and effective interaction options. The name of the project says it all.
{% enddiscovery %}

{% discovery "Accordion Slider - Responsive and Touch-enabled accordion" "David Ghiurău (bqworks)" "https://bqworks.net/accordion-slider/" Discoveries-28-UI-Components accordion-slider-responsive-and-touch-enabled-accordion.png %}
Presenting images in an interesting way is always a challenge and many slideshow libraries look very similar. David&#39;s Accordion Slider (especially example 1) is a real exception and works on all device classes, which is not a matter of course.
{% enddiscovery %}

{% discovery "floatype.js" "Kailash Nadh" "https://github.com/knadh/floatype.js" Discoveries-28-UI-Components floatype-js.png %}
We all know autocomplete drop downs from our favourite IDE, whatever it is called. Kailash has something similar for every normal textarea.
{% enddiscovery %}

{% discovery "canvas-datagrid" "Tony Germaneri" "https://github.com/TonyGermaneri/canvas-datagrid" Discoveries-28-UI-Components canvas-datagrid.png %}
This is a Canvas based data grid web component, which looks and feels like an early Excel or other spreadsheet. Let your user load JSON, edit cells, sort columns and so on. Cool and useful.
{% enddiscovery %}

{% discovery "TreeData.js" "Raphael Amorim" "https://raphamorim.io/treeData.js/" Discoveries-28-UI-Components treedata-js.png %}
Not only genealogists like to visualise connections as a tree. Such a tree is quickly created using a Value/Parent object and Raphael&#39;s solution.
{% enddiscovery %}

{% discovery "Grid-Overflow" "Roman Flössler" "https://github.com/Roman-Flossler/Grid-Overflow" Discoveries-28-UI-Components grid-overflow.png %}
This is a pure CSS solution for masonry layout and grid layout, where grid items can be given vertigo, panorama or VIP class to overflow into the next cell.
{% enddiscovery %}

