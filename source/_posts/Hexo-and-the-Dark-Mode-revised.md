---
title: Hexo and the Dark Mode ... revised
subtitle: Second approach to implement 'prefers-color-scheme'
xphoto: '19-07 Schottland-0025.jpg'
tags:
  - Hexo
  - CSS
  - Stylus
  - JavaScript
  - Dark Mode
categories:
  - Tools
date: 2019-10-26 14:08:05
---

While writing my post [Hexo and the Dark Mode](/categories/Tools/Hexo-and-the-Dark-Mode) a few days ago, I thought it would be nice, if I could switch between the normal (light) and the dark theme, I've created for the support of the OS-related Dark Mode, even manually. The only thing I needed was a toggle element and a little bit of JavaScript.

Of course, I couldn't manipulate the [media query ``prefers-color-scheme``](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-scheme) itself, but introduce a different way by blog uses it. Instead of implementing the media query directly into my CSS (or Stylus) code, I used a root selector, which can be manipulated by JavaScript ... something like this:

```css
body {
    background-color: white;
    color: black;
}

[data-theme="dark"] body {
    background-color: black;
    color: white;
  }
}
```
<!-- more -->

In every Stylus file, where I used ``@media prefers-dark`` to achieve the automatic switch by the OS, I changed this line into ``/[data-theme="dark"] &`` :

```styl
#mobile-nav-header
  background-color: color-background
  /[data-theme="dark"] &
    background-color: dark-color-background
  img.avatar
    ...
    /[data-theme="dark"] &
      filter: brightness(85%)
```

Some explanations on the [Stylus syntax](http://stylus-lang.com/docs/selectors.html): ``/`` means the root of the DOM and ``&`` points to the parent selector. Therefore the example will be rendered into this:

```css
#mobile-nav-header {
    background-color: #f1f1f1;
}
[data-theme="dark"] #mobile-nav-header {
    background-color: #111;
}

#mobile-nav-header img.avatar {
...
}
[data-theme="dark"] #mobile-nav-header img.avatar
    filter: brightness(85%);
}
```

Only problem was: the "Root + Parent" Stylus selector doesn't work in the block variables in the ``_extend.styl``. So I had to copy all theme relevant styles directly to the elements, where such a block was used: ``@extend <block-name>``.

### The Toggle Switch

In the ``footer.ejs`` I added a toggle checkbox, where I could bind my JavaScript...

```html
<div id="footer-theme">
    <input type="checkbox" id="theme-switch">
    <label for="theme-switch"></label>
</div>
```

... and some CSS in the ``footer.styl``, to style it:

```styl
input#theme-switch[type=checkbox] {
  display:none;
}

input#theme-switch[type=checkbox] + label
  height: 16px
  width: 16px
  display: inline-block
  padding: 12px
  font-size: 22px
  cursor: pointer
  &:before
    display: inline-block
    font-size: inherit
    text-rendering: auto
    -webkit-font-smoothing: antialiased
    font-family: fa-icon-solid
    content: icon-moon

input#theme-switch[type=checkbox]:checked + label
  &:before
    content: icon-sun
```

The ``icon`` variables are defined in the ``_variables.styl`` like this:

```styl
icon-moon = "\f186"
icon-sun = "\f185"
```

### The JavaScript

Everything was now prepared to implement the switching code in JavaScript, which should support a manual switch by clicking the toggle element as well as the automatic switch by the OS.

I wrapped all necessary code into a seperate JS file and placed a reference in the ``after-footer.ejs``, which places it at the bottom of the HTML:

```ejs
<%- js('js/dark-mode-toggle.js') %>
```

```js
function detectColorScheme() {
    var theme = "light"; //default

    // get last used theme from local cache
    if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") === "dark"){
            theme = "dark";
        }
    } else if(!window.matchMedia) { 
        // matchMedia not supported  
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // OS has set Dark Mode
        theme = "dark";
    }

    // set detected theme
    if (theme === "dark") {
        setThemeDark();
    } else {
        setThemeLight();
    }
}

const toggleTheme = document.querySelector('input#theme-switch[type="checkbox"]');

function setThemeDark() {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleTheme.checked = true;
}
function setThemeLight() {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    toggleTheme.checked = false;
}

// Listener for theme change by toggle
toggleTheme.addEventListener('change', function(e) {
    if (e.target.checked) {
        setThemeDark();
    } else {
        setThemeLight();
    }
}, false);

// Listener for theme change by OS
var toggleOS = window.matchMedia('(prefers-color-scheme: dark)');
toggleOS.addEventListener('change', function (e) {
    if (e.matches) {
        setThemeDark();
    } else {
        setThemeLight();
    }
});

// call theme detection
detectColorScheme();
```

By using the both ``addEventListener``'s, each switch will be recognized and this approach is capable to support even more themes, just by using different values in the ``data-theme`` attribute.

## Related

* [Hexo and the Dark Mode](/categories/Tools/Hexo-and-the-Dark-Mode)