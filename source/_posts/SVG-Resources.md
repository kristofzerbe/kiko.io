---
title: SVG Resources
subtitle:
date: 2021-04-09 14:07:53
hitcountId: kDhbCVvpR
photograph:
  file: DSC_4936.jpg
  name: Forgotten Motocycle
  link: 'https://500px.com/photo/82409157/Forgotten-Motocycle-by-Kristof-Zerbe/'
categories:
  - UI-Design
tags:
  - Great Finds
  - SVG
  - Imaging
related:
  - Discoveries-8
  - Use-a-duplicate-image-to-drop-a-shadow
  - Implement-source-switch-for-SPA
---
<style>
  button {
    background-color: #f1f1f1;
    border: none;
    padding: 1rem;
    margin-bottom: 1rem;
    margin-right: 1rem;
    cursor: pointer;
  }
  em {
    opacity: 0.33;
  }
  #info {
    color: silver;
    display: block;
    height: 24px;
  }
  #info.result {
    color: green;
    font-weight: bold;
  }
</style>
<script>
  var timeoutID;
  function setInfo(e,m) {
    let info = document.getElementById(e);
    info.textContent = m;
    info.classList.add("result");
    window.clearTimeout(timeoutID);
    timeoutID = setTimeout(function() {
      info.textContent = "Guess and click...";
      info.classList.remove("result");
      window.clearTimeout(timeoutID);
    }, 2000);
  }
</script>

Since beginning beginning of time, people are using symbols to make things clear quickly and easily. So do we when developing websites and web apps by using icons. Everybody knows what's behind a loupe symbol or a hamburger icon.

<button onClick="setInfo('info', 'Yes, it\'s a SEARCH button ;)');">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
    d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" />
</svg>
</button>
<button onClick="setInfo('info', 'Yeah ... an OPEN MENU button ;)');">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor"
    d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" />
  <path fill="currentColor"
    d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z" />
  <path fill="currentColor"
    d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z" />
</svg>
</button><br><span id="info">Guess and click...</span>

The way we implement icons have changed in the past. From BMP files to GIF and JPG files, PNG files, to complete or customizable symbol fonts like [fontello.com](https://fontello.com), to Scalable Vector Graphics (SVG).

SVG's in particular are becoming increasingly popular, because they are nothing more than XML-like code, that can be manipulated via CSS or JS, their digital footprint is unbeatable small and they scale seemlessly.

Dealing with SVG's is a little bit more difficult than placing a PNG in HTML, because of its complexity, but it is worth learning as much as possible about it. So did I in the last couple of month and I want to share my finds on the web with you in this post.

<!-- more -->

## Using SVG's in brief

The most useful way of using SVG's is as an image out of a file, either directly ...:

<button><img src="{% asset_path options.svg %}" /></button><br><em>(use DevTools [F12] to inspect the element)</em>

```html
<img src="images/options.svg" />
```

... or as a background image:

<style>
  button.options {
    height: 56px;
    width: 56px;
    background-image: url({% asset_path options.svg %});
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
</style>
<button class="options"></button><br><em>(use DevTools [F12] to inspect the element)</em>

```html
<style>
  button.options {
    height: 56px;
    width: 56px;
    background: url(images/options.svg);
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
</style>

<button class="options"></button>
```

As files, no matter how small, has to be requested from the server, you can also define SVG's inline for better performance:

<div>
<button>
<svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
        d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z" />
  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
        d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z" />
</svg>
</button><br><em>(use DevTools [F12] to inspect the element)</em>
</div><br>

```html
<body>
  ...
  <button>
    <svg xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
            d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z" />
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
            d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z" />
    </svg>
  </button>
  ...
</body>
```

If you want to use a SVG multiple times, you can define it once by wrapping it up in a ``symbol`` tag with an ``id`` and use it wherever you want:

<div>
<svg xmlns="http://www.w3.org/2000/svg" hidden style="display:none">
  <symbol id="options" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
          d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z" />
    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
          d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z" />
  </symbol>
</svg>
<button><svg width="24" height="24"><use xlink:href="#options" /></svg></button>
<button><svg width="24" height="24"><use xlink:href="#options" /></svg></button><br><em>(use DevTools [F12] to inspect the elements)</em>
</div><br>

```html
<body>
  <svg xmlns="http://www.w3.org/2000/svg">
    <symbol id="options" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
            d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z" />
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
            d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z" />
    </symbol>
  </svg>
    ...
    <button>
      <svg width="24" height="24"><use xlink:href="#options" /></svg>
    </button>
    ...
    <button>
      <svg width="24" height="24"><use xlink:href="#options" /></svg>
    </button>
    ...
</body>
```

## SVG Resources

Finding the right SVG for your project is time consuming, like it is for symbol fonts or PNG's. So here are a few tips getting SVG's for free:

{% source "css.gg" https://css.gg SVG-Resources css_gg.png %}
700+ icons, downloadable as SVG, PNG, XD, Figma, Styled Component (Typescript) or even pure CSS.
{% endsource %}

---

{% source "Tabler Icons" https://tabler-icons.io SVG-Resources tabler-icons_io.png %}
Over 1.250 icons in several categories, downloadable as SVG or PNG.
{% endsource %}

---

{% source "Boxicons" https://boxicons.com SVG-Resources boxicons_com.png %}
  1.500 regular or filled icons, downloadable as SVG or PNG. Supports animations, Web Components and is also available as font.
{% endsource %}

---

{% source "Feather" https://feathericons.com SVG-Resources feathericons_com.png %}
  268 icons as SVG, with customizable size, stroke with and color.
{% endsource %}

---

{% source "Majesticons" https://majesticons.com SVG-Resources majesticons_com.png %}
  210 line and solid icons, with Figma support and also available as Github repository.
{% endsource %}

---

{% source "Google Fonts - Material Icons" https://fonts.google.com/icons SVG-Resources fonts_google_com+icons.png %}
  At least ... an own frontend of Googles Material Icons inside [Google Fonts](https://font.google.com) for downloading them individually as SVG, PNG or Android/iOS package.
{% endsource %}

---

Last but not least, SVG is more powerful then drawing stuff. It's possible to add raster images, text with a particular font and use many CSS-like techniques like gradients and animations. See links below...

{% moreinfo '{ "list": [
  [
    "CSS Tricks", "Using SVG",
    "https://css-tricks.com/using-svg/"
  ],
  [
    "CSS-Tricks", "Use and Reuse Everything in SVG… Even Animations!",
    "https://css-tricks.com/use-and-reuse-everything-in-svg-even-animations/"
  ],
  [
    "CSS Tricks", "An SVG That Isn’t All… SVG",
    "https://css-tricks.com/svg-isnt-svg/"
  ],
  [
    "mediaevent.de", "Sieben Wege, SVG in HTML-Seiten zu setzen (German)",
    "https://www.mediaevent.de/svg-in-html-seiten/"
  ],
  [
    "Foxland", "Simple and Accessible SVG Menu Hamburger Animation",
    "https://foxland.fi/simple-accessible-svg-menu-hamburger-animation/"
  ]
]}' %}
