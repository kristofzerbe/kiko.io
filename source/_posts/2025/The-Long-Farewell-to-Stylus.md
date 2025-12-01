---
hasLocale: true
#--------------------------------------------------
slug: The-Long-Farewell-to-Stylus
title: The Long Farewell to Stylus
subtitle: Switching from Stylus to CSS in Hexo, Part 1
date: 2025-11-30 18:36:32
photograph:
  file: 25-07-Schweden-809-D50.jpg
  name: Vaxholm Wood
  socialmedia: /static/images/social-media/The-Long-Farewell-to-Stylus.jpg
series: A New Blog
categories:
  - Coding
tags:
  - Hexo
  - Stylus
  - CSS
related:
  - Colophon-Impetus-Technology
  - Hexo-Generator-Anything-2-0
  - Simplest-Console-File-Logger
bandcamp:
  artist: Quintana
  album: The Traveler|2477741210
  track: The Traveler|275147839
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/22
  - host: Mastodon
    url: https://indieweb.social/@kiko/115643359647175107
---

Since I decided in 2019 to use the static site generator (SSG) [Hexo](https://hexo.io/) as the foundation for my blog, I have been struggling with the fact that it works with the CSS preprocessor [Stylus](https://stylus-lang.com/) via a pre-installed plugin. I thought I just needed some time to get used to the simplified but unfamiliar notation and take advantage of features such as functions, mixins, variables, and the like. Over time, however, the functionality of native CSS grew to such an extent that I started to implement workarounds for new and unsupported features in my Stylus code, which made it significantly more complex and confusing. I didn't get used to it, but instead just got annoyed by Stylus for quite some time.

<!-- more -->

I kept putting off the decision to leave Stylus behind and switch to native CSS because, after five years of tinkering around, it meant a lot of legwork, but I just started at some point and proceeded in small steps. The initial goal was to convert the Stylus code 1:1 to native CSS and clean up errors that had accumulated over the last few years, so that I would then have the opportunity to revamp the structure with modern CSS.

I thought for a second about whether I should just use the ``style.css`` file that the Hexo plugin [hexo-renderer-stylus](https://github.com/hexojs/hexo-renderer-stylus) generates from the dozens of separate ``styl`` files during the build, but it didn't make sense to start at the top and then break down the more than 7,000 lines into individual chunks and restructure them. You don't renovate by first exploding a bucket of paint in the room, but by choosing a corner and doing it work-by-work.

---

## 1. Variables

The file ``_variables.styl`` contains what it promises: variables. And those should be the first to be removed, because native CSS variables (or custom properties) were already introduced by the W3C in 2022 and offer great flexibility, making workarounds from preprocessors unnecessary.
Here's an example from my previous code:

```styl _variables.styl
color-link = #000
color-hover-link = #555

dark-color-link = #fff
dark-color-hover-link = #bbb
```

These 4 variables were used to set the color of a link depending on which **theme** the user selected on the site (‘light’ is default), which is reflected in the ``data-theme`` attribute of the ``html`` element, which is then used as a selector in the styles:

```styl page.styl
a
  color: color-link
  /[data-theme="dark"] &
    color: dark-color-link
  &:hover
    color: color-hover-link
    /[data-theme="dark"] &
      color: dark-color-hover-link
```

Stylus has generated the following code from the build so far:

```css
a {
  color: #000;
}

[data-theme="dark"] a {
  color: #fff;
}

a:hover {
  color: #555;
}

[data-theme="dark"] a:hover {
  color: #bbb;
}
```

I have now converted all stylus variables one by one into native variables in a new CSS file and replaced them in all ``styl`` files with their new equivalent ``var(--variable-name)``. The example from above now looks like this:

```css main.css
:root {
  --color-link: #000;
  --color-hover-link: #555;
}
:root[data-theme="dark"] { 
  --color-link: #fff;
  --color-hover-link: #bbb;
}
```

```styl page.styl
a
  color: var(--color-link)
  &:hover
    color: var(--color-hover-link)
```

... and as a result, the generated CSS is two statements shorter.

In this step, I took the opportunity to slim down the number of variables, which had grown absurdly over the years, and to standardize styles. I was also able to remove all ``/[data-theme="dark"] &`` rules, as the color is now set based on the theme created when defining the native CSS variable.

The last remaining stylus variables after this process are a few stylus-specific ones (see section 2) and my own media queries (such as ``mq-mobile = "screen and (max-width: 479px)"``), which I unfortunately could **not** transform into CSS variables because CSS rules are not linked to HTML elements, but have a global scope, as Ben Holmes explains in his post [Want CSS variables in media query declarations? Try this!](https://bholmes.dev/blog/alternative-to-css-variable-media-queries/). But more on that later on ...

---

## 2. Grid, Mixins and nib

The standard Hexo theme ‘Landscape’ has a four-part layout: ``header`` and ``footer``, as well as ``main`` and ``aside`` (sidebar), which are combined into content (``div#content.outer``). While the first two always extend across the entire page width, the other two share the horizontal space via a fluid “grid” system with percentages calculated during the build. The system is highly customizable in the standards, depending on whether and where you would like to have the sidebar, but I have decided to go with my layout and therefore do not need all the configuration stuff.

![Hexo Fluid Layout](The-Long-Farewell-to-Stylus/hexo-fluid-layout.png)

Of course, such a layout would be implemented differently in 2025, but that wasn't the task at this stage. I just had to get rid of all variables and functions that were defined or used in multiple files. The starting point was ``_variables.styl`` and its variable ``sidebar``, which got its value from the Hexo theme's ``_config.yml``. Following this thread, I deleted countless values, functions, and references, as can be seen in [GitHub commit #1a24503 (Removed Stylus Gridsystem)](https://github.com/kristofzerbe/kiko.io/commit/1a24503343b323a531b7e1f852883609424c7af4). I simply replaced the whole thing with fixed values, merged the necessary files, and was then able to delete the ``_grid.styl`` and all unnecessary ``sidebar-*.styl`` files. This is what remained:

```styl style.styl
.outer
  max-width: 1220px

main
  @media mq-normal
    display: inline
    float: left
    width: 73%
    margin: 0 1%
    
#sidebar
  @media mq-normal
    display: inline
    float: left
    width: 23%
    margin: 0 1%
```

---

Getting rid of the ``_mixin.styl`` file was pretty straightforward, as it basically just contains a few functions that place CSS code where it is used.

That just left the following two variables:

```styl
support-for-ie = false
vendor-prefixes = webkit moz ms official
```

After some trial and error, I discovered that these belong to the [nib CSS3 extensions for Stylus](https://stylus.github.io/nib/), a library that is installed with the Stylus renderer plugin. It has a few useful functions for Stylus users, such as ``global-reset()`` and ``clear-fix()``, which Hexo makes use of. However, it is also responsible for adding vendor-specific declarations such as ``-moz-box-shadow`` and the like to the output CSS, which will be completely out of date by 2025. After adopting the declarations of the above functions and deleting the ``@import "nib"`` statement, these two variables could also be removed.

---
## CSS File Structure & Bundling

After migrating some of the Stylus code to the new ``main.css`` in steps 1 and 2, it was time to structure the declarations into separate files. The variables in ``defaults.css``, all resets in ``reset.css`` and, since it was a quick win, all font styles in ``fonts.css``. All these files now had to be merged back automatically while building into ``main.css`` and minified.

I didn't need a super-duper bundling library for this, because, on the one hand, you should be thrifty with dependencies and, on the other hand, Hexo offered me everything I needed to concatenate a few files in the right order with Hexo's [Generators](https://hexo.io/api/generator) concept, which I was already familiar with. I also use the [hexo-browsersync](https://github.com/hexojs/hexo-browsersync) plugin for live reloading while coding, which ensures that all generators run once after saving a file.

My CSS bundle generator is very similar in its principle to the [hexo-css-merge](https://github.com/MoNwastaken/hexo-css-merge) plugin, from which I got the idea to use [clean-css](https://github.com/clean-css/clean-css) for compression, but it largely omits configurability and is somewhat shorter:

```yml _config-yaml
css_bundle:
  target: main
  files_in_order:
    - defaults
    - fonts
    - reset
```

```js generator-css-bundle.js
const fs = require('hexo-fs');
const path = require('path');
const cleanCSS = require('clean-css');

hexo.extend.generator.register('css-bundle', function () {
  const config = this.config;
  const bundle = config.css_bundle;

  let result = [];
  
  let files = bundle.files_in_order.map(file => {
    return path.join("themes", config.theme, config.source_dir, "css", `${file}.css`);
  });

  let styles = "";
  files.forEach(file => {
    styles += fs.readFileSync(file);
  });

  result.push({
    path: `/css/${bundle.target}.css`,
    data: styles
  });

  let clean = new cleanCSS().minify(styles);

  result.push({
    path: `/css/${bundle.target}.min.css`,
    data: clean.styles
  });

  return result;
});
```

---

## Conclusion after the first steps

It's fun to throw out things you never needed anyway. Hexo's theming capabilities per se are still impressive even today, but people like me quickly start tinkering around, so that a simple theme change is no longer possible after a few weeks, but also no longer desirable. However, it makes the switch from the built-in Stylus preprocessor to native CSS more complex and time-consuming.

I still have a lot of work to do until I can finally start to modernise the layout technically based on plain CSS. The JavaScript-based scroll header solution in particular has been bothering me for a while now, but I've already built a CSS-based prototype, for which I need to change the HTML structure, and that's hardly possible with Stylus and all the hacks in the way.

In the meantime, my blog consists of two stylesheets: the new ``main.min.css`` and the old ``style.css`` from Stylus, but gradually one is getting bigger and the other smaller.

The rebuild continues. Stay tuned...
