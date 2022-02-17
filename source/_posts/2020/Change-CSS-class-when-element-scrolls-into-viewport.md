---
alias: /categories/JavaScript/Change-CSS-class-when-element-scrolls-into-viewport/index.html
slug: Change-CSS-class-when-element-scrolls-into-viewport
title: Change CSS class when element scrolls into viewport
subtitle: null
date: 2020-07-13T18:24:39.000Z
photograph:
  file: D70_7695.jpg
  name: Onion Bokeh
  link: 'https://500px.com/photo/260478167'
  socialmedia: /static/images/social-media/Change-CSS-class-when-element-scrolls-into-viewport.png
series: A New Blog
tags:
  - jQuery
  - CSS
categories:
  - JavaScript
related:
  - Using-GitHub-as-Commenting-Platform
  - A-New-Blog-Customizing-Hexo
---
I had a neat visual gimmick on the start page of this blog, that the gray-scaled header image of a post in the list scaled up to 100% and became colored, when the user hovered over it:

```css
.article-inner .article-photo {
  height: 150px;
  width: 100%;
  object-fit: cover;
  transform: scale(1);
  transform-style: preserve-3d;
  transition: all ease-out 0.6s;
  opacity: 0.3;
  filter: grayscale(1) contrast(0.5);
}
.article-inner:hover .article-photo {
  transform: scale(1.1);
  opacity: 1;
  filter: grayscale(0) contrast(1);
}
```

Nice, but a little bit useless on smartphones or tablets, where HOVER  doesn't really work.

<!-- more -->

A better idea was to transform the header image automatically, when it becomes visible to the user. So I changed the HOVER selector into a class...

```css
.article-photo.in-view {
    transform: scale(1.1);
    opacity: 1;
    filter: grayscale(0) contrast(1);
}
```

... and wrote a little JS function to determine the point, where the images is fully visible in the viewport:

```js
function isVisibleInViewPort(e) {
  var viewTop = $(window).scrollTop();
  var viewBottom = viewTop + $(window).height();
  var eTop = $(e).offset().top;
  var eBottom = eTop + $(e).height();
  return ((eBottom <= viewBottom) && (eTop >= viewTop));
}
```

This function I had to bind to the windows scroll event to all header images only:

```js
$(window).on('scroll', function() {
  $(".article-photo").each(function() {
    if (isVisibleInViewPort($(this))) {
      $(this).addClass("in-view");
    } else {
      $(this).removeClass("in-view");
    }
  });
});
```
