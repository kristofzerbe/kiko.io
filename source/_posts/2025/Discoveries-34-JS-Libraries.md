---
slug: Discoveries-34-JS-Libraries
title: "Discoveries #34 - JS Libraries"
subtitle:
date: 2025-05-24 08:16:57
photograph:
  file: D50_9418_2406.jpg
  name: Dependable Engines
  socialmedia: /static/images/social-media/Discoveries-34-JS-Libraries.jpg
series: Discoveries
categories:
  - Collection
tags:
  - JavaScript
related:
  - Discoveries-33-Image-Presentation
  - Discoveries-32-CSS
  - Discoveries-31
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114562023025083098
---

This is only the third issue of Discoveries in the last six months. That's because I currently have significantly less time and energy to devote to non-work-related activities. This includes reading my many news sources, but also collecting and summarising the things I want to highlight on my blog.

However, here are a few discoveries from the last few months on the topic of JavaScript libraries that I would like to try out for myself as soon as possible...

{% anchorlist
  "vConsole|vconsole"
  "Quicklink|quicklink"
  "easyShortcut.js|easyshortcutjs"
  "MapLibre GL JS|maplibre-gl-js"
  "HTML Minification for Static Sites|html-minification-for-static-sites"
  "find-up|find-up"
  "absolute-masonry|absolute-masonry"
  "JsonTree.js|jsontreejs"
  "SilverBox|silverbox"
%}

<!-- more -->

{% discovery "vConsole" "Tencent" "https://github.com/Tencent/vConsole" Discoveries-34-JS-Libraries key:vconsole %}
Ever wanted to debug your Web App on a mobile phone, without the need of another computer and cables? Try this lightweight, extendable front-end developer tool for mobile web development, written in Vanilla JS and freely available at GitHub. It has plugin and theme support.

@@@cardlink
url: https://github.com/Tencent/vConsole
title: "GitHub - Tencent/vConsole: A lightweight, extendable front-end developer tool for mobile web page."
description: "A lightweight, extendable front-end developer tool for mobile web page. - Tencent/vConsole"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/892489f7776e04c119e6dc01ae6d2e493d6206674ded7801778fd4e28dce24ec/Tencent/vConsole
@@@
{% enddiscovery %}

{% discovery "Quicklink" "Google Chrome Labs" "https://getquick.link/" Discoveries-34-JS-Libraries key:quicklink %}
This project aims to be a drop-in solution for sites to prefetch links based on what is in the user’s viewport. There is also a Chrome extension that injects and initializes the necessary code in every site you visit.

```js
<script defer src="https://cdn.jsdelivr.net/npm/quicklink@3.0.1/dist/quicklink.umd.js"></script>
<script>
  window.addEventListener('load', () => {
    quicklink.listen();
  });
</script>
```

@@@cardlink
url: https://getquick.link/
title: "Home | Quicklink"
description: "Faster subsequent page-loads by prefetching in-viewport links during idle time."
host: getquick.link
favicon: https://getquick.link/assets/images/icons/favicon-32x32.png
@@@
{% enddiscovery %}

{% discovery "easyShortcut.js" "Alireza Mohammadi" "https://github.com/wwwAlireza/easyShortcut.js" Discoveries-34-JS-Libraries key:easyshortcutjs %}
It is possible to operate a web app in a browser using the keyboard, but it only feels like an app when the developer provides hotkeys for important functions. This lib helps to create custom keyboard shortcuts, for example new ...

```js
shortcut({
  ctrl: false, 
  alt: false, 
  shift: false, 
  meta: false, 
  key: "A", 
  fn: ()=>{ alert("Hello World") }
})
```

@@@cardlink
url: https://github.com/wwwAlireza/easyShortcut.js
title: "GitHub - wwwAlireza/easyShortcut.js: JavaScript Library To Create Custom Keyboard Shortcuts"
description: "JavaScript Library To Create Custom Keyboard Shortcuts - wwwAlireza/easyShortcut.js"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/55c2f445752b868eb6897688377d41ff2b4c7ec0dcbeecae71aa16881c7237bb/wwwAlireza/easyShortcut.js
@@@
{% enddiscovery %}

{% discovery "MapLibre GL JS" "MapLibre Organization" "https://maplibre.org/maplibre-gl-js/docs/" Discoveries-34-JS-Libraries key:maplibre-gl-js %}
Open source map solutions are rare and difficult to find among the many paid stuff available. Leaflet is a really good solution, and MapLibre doesn't want to let it grab all the attention. It's written in TypeScript and promises a good performance, due to GPU-accelerated vector tile rendering.

![](/post/Discoveries-34-JS-Libraries/maplibre-gl-js.png)

@@@cardlink
url: https://maplibre.org/maplibre-gl-js/docs/
title: "MapLibre GL JS"
description: "MapLibre GL JS is a TypeScript library that uses WebGL to render interactive maps from vector tiles in a browser."
host: maplibre.org
favicon: https://maplibre.org/favicon.ico
image: https://www.maplibre.org/maplibre-gl-js/docs/assets/images/social/index.png
@@@
{% enddiscovery %}

{% discovery "HTML Minification for Static Sites" "Jim Nielsen" "https://blog.jim-nielsen.com/2025/html-minification/" Discoveries-34-JS-Libraries key:html-minification-for-static-sites %}
Every now and then, I've thought about automatically reducing the size of the HTML on my static pages to save my readers a few bytes when downloading. I'm now taking Jim's approach and analysis as an opportunity to do this with html-minifier. Not that I'm hoping for a big effect due to the large number of photos ;)

```js
{
  "scripts": {
    "build": "<BUILD-COMMAND>"
    "postbuild": "html-minifier 
      --input-dir <BUILD-DIR> 
      --output-dir <BUILD-DIR> 
      --file-ext html <OPTIONS>"
  }
}
```

@@@cardlink
url: https://blog.jim-nielsen.com/2025/html-minification/
title: "HTML Minification for Static Sites"
description: "Writing about the big beautiful mess that is making things for the world wide web."
host: blog.jim-nielsen.com
@@@

html-minifier on GitHub ... [https://github.com/kangax/html-minifier](https://github.com/kangax/html-minifier)
{% enddiscovery %}

{% discovery "find-up" "Sindre Sorhus" "https://github.com/sindresorhus/find-up" Discoveries-34-JS-Libraries key:find-up %}
Paths in JavaScript development with Node.js are usually handled by messing around with strings split into arrays. At least for finding parent elements, this is not necessary thanks to the library from Sindre.

```txt
/
└── Users
    └── sindresorhus
        ├── unicorn.png
        └── foo
            └── bar
                ├── baz
                └── example.js
```

```js
import path from 'node:path';
import {findUp, pathExists} from 'find-up';

console.log(await findUp('unicorn.png'));
//=> '/Users/sindresorhus/unicorn.png'
```

@@@cardlink
url: https://github.com/sindresorhus/find-up
title: "GitHub - sindresorhus/find-up: Find a file or directory by walking up parent directories"
description: "Find a file or directory by walking up parent directories - sindresorhus/find-up"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/629e2f179217fd5a519c7399ba823cf436c29ec1b3d68aad7c327d9c46ae15d9/sindresorhus/find-up
@@@
{% enddiscovery %}

{% discovery "absolute-masonry" "dalzein (GitHub User)" "https://github.com/dalzein/absolute-masonry" Discoveries-34-JS-Libraries key:absolute-masonry %}
I would prefer to have a CSS-native Masonry solution for my photos today rather than tomorrow, but it looks like I will have to wait a little longer. When it comes to interactive views, however, there is no way around JavaScript. This script, which is approximately 12 KB in size, sets the bar quite high for such a solution.

![](/post/Discoveries-34-JS-Libraries/absolute-masonry.gif)

@@@cardlink
url: https://github.com/dalzein/absolute-masonry
title: "GitHub - dalzein/draggable-masonry: JavaScript library for creating masonry layouts with draggable UI elements"
description: "JavaScript library for creating masonry layouts with draggable UI elements - dalzein/draggable-masonry"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/fbae6c499aa45f5ddb41244f077666e045b32f8482670b3ba5a615c0ef1d396f/dalzein/draggable-masonry
@@@
{% enddiscovery %}

{% discovery "JsonTree.js" "William Troup" "https://github.com/williamtroup/JsonTree.js" Discoveries-34-JS-Libraries key:jsontreejs %}
JSON is basically plain text, but with a structure, a tree structure. Visualising this in a meaningful way is sometimes essential. William's library not only helps with this, but also offers features that are usually only found in full-blown code editors. Chapeau, great stuff!

@@@cardlink
url: https://github.com/williamtroup/JsonTree.js
title: "GitHub - williamtroup/JsonTree.js: 🔗 A lightweight JavaScript library that generates customizable tree views to better visualize, and edit, JSON data."
description: "🔗 A lightweight JavaScript library that generates customizable tree views to better visualize, and edit, JSON data. - williamtroup/JsonTree.js"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/761831241/6474333f-f46e-415f-91d3-0c46d6481680
@@@
{% enddiscovery %}

{% discovery "SilverBox" "Saber Heydari" "https://github.com/Silverethical/silverBox" Discoveries-34-JS-Libraries key:silverbox %}
In times when CSS-native modal dialogs are becoming increasingly prevalent and sophisticated, JavaScript solutions are no longer in such high demand, but this one is worth a second look due to its ease of use and beauty.

![](/post/Discoveries-34-JS-Libraries/silverbox.png)

@@@cardlink
url: https://github.com/Silverethical/silverBox
title: "GitHub - Silverethical/silverBox: Lightweight and versatile JavaScript library to create customizable modals and alerts for your web applications. Built with pure JavaScript and zero dependencies."
description: "Lightweight and versatile JavaScript library to create customizable modals and alerts for your web applications. Built with pure JavaScript and zero dependencies. - Silverethical/silverBox"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/c30a98ff4e07e96219b155df5b8a0643b21e487bb281605b377969ee5b186407/Silverethical/silverBox
@@@
{% enddiscovery %}
