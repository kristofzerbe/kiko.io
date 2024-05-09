---
slug: Horizontal-navigation-menu-above-an-image
title: Horizontal navigation menu above an image
subtitle: 'How to deal with coverage, readability and scrollbars'
date: 2020-07-20T15:55:47.000Z
photograph:
  file: 19-07-Schottland-0495.jpg
  name: Ancient Kitchen Stuff
  socialmedia: /static/images/social-media/Horizontal-navigation-menu-above-an-image.png
series: A New Blog
tags:
  - CSS
  - Stylus
categories:
  - UI/UX
related:
  - Automatic-Header-Images-in-Hexo
  - A-New-Blog-Customizing-Hexo
  - A-New-Blog-VS-Code-Hexo-and-GitHub-Pages
---

I changed the main menu of my blog, because I wanted to get rid of the hamburger menu on the upper left, which was shown only for smartphones, but was not really reachable conveniently. Beside that it made no sense to have different navigations for different devices.

My choice was to implement a horizontal scrolling menu, which can grow over the time, without any need of customizing. As I have quite big header images and I wanted to place the new navigation in a more accessible zone, I decided to place it at the bottom, but above the header image.

<!-- more -->

Problem was, not to cover a big part of the image with a full-colored or even semitransparent bar, by using a RGBA background color. I wanted it more translucent, but with enough contrast on bright images for the menu items to read.

The recently introduced W3C feature ``backdrop-filter`` was just the right thing for that. It is [supported by most modern browsers](https://caniuse.com/#feat=css-backdrop-filter), but it has to have a backup strategy for the rest of the bunch.

The HTML is simple: 

```html
<nav id="header-nav" role="navigation">
  <ul class="menu">        
  
    <li class="menu-item">
      <a href="/first" title="First">
        <span>First Item</span>
      </a>
    </li>
            
    <li class="menu-item">
      <a href="/second" title="Second">
        <span>Second Item</span>
      </a>
    </li>
    
  </ul>
</nav>
```

And here's the [Stylus](https://stylus-lang.com/docs) code for my approach:

```styl
#header-nav
  position: absolute
  bottom: 0
  width: 100%
  height: auto
  box-sizing: content-box
  overflow-x: scroll
  overflow-y: hidden
  
  // BACKDROP-FILTER
  backdrop-filter: blur(5px) brightness(90%)
  @supports not (backdrop-filter: none)
    background: rgba(0,0,0,0.25)
  
  // SCROLLBAR
  &::-webkit-scrollbar
    display: none
  @supports not (webkit-scrollbar)  
    scrollbar-width: none
  
  .menu
    display: flex
    list-style: none
    margin: 0
    padding: 0
    
    .menu-item
      flex-basis: 80px 
      flex-shrink: 0
      flex-grow: 1
      max-width: 100px
      margin: 0 2px
      text-overflow: ellipsis;
      
      a
        display: inline-block
        width: 100%
        padding: 10px 0
        color: #ffffff
        font-weight: bold
        text-decoration: none
        text-align: center        
```

The navigation box is ``absolute`` positioned on the image, is as wide as the screen and scrolls exclusively horizontal. The items are a unordered list, with default width and arranged by ``flex``.

In case a browser doesn't understand ``backdrop-filter``, the navigation bar is shown with a classic alpha channel opacity.

When having a horizontal scroll feature, the scrollbar shown by the browser is beyond beautiful. To prevent this, I used the CSS pseudo element ``::-webkit-scrollbar``, which is supported by WebKit and Blink bowsers, with a fallback for all other browsers. Both strategies allows to be still able to scroll. If you want to have a scrollbar, but not the built-in, I can only recommend to read something about styling scrollbars, like [here](https://css-tricks.com/custom-scrollbars-in-webkit/) and [here](https://css-tricks.com/the-current-state-of-styling-scrollbars/).