---
slug: Image-Masonry-Tag-Plugin-for-Hexo
title: Image Masonry Tag Plugin for Hexo
subtitle: Easy use of the wonderful Macy.js library to display images in posts 
date: 2023-09-01 16:07:37
photograph:
  file: 20-08 Mallorca-7333.jpg
  name: Red Hopper
  link: https://500px.com/photo/1023564296
  socialmedia: /static/images/social-media/Image-Masonry-Tag-Plugin-for-Hexo.png
project: Hexo Tag Plugins
categories:
  - Tools
tags:
  - Hexo
  - Plugin
  - GitHub
related:
  - Hexo-Tag-Plugin-Collection
  - GitHub-Tag-Plugins-for-Hexo
  - Forking-Hexo-plugin-hexo-index-anything
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/110991254816820166
---

Displaying a few more images than usual in a post is always a bit tricky, because you have to make sure they don't get too big and drown out the text. But they should not be too small either and the arrangement is also important to consider.

For this purpose I have so far used my [Image Slider Tag Plugin](/post/Hexo-Tag-Plugin-Collection/#image-slide), but with this you only ever see one of the images and have to scroll through the rest horizontally. A medium sized overview, best in the so called masonry format, where images are automatically assembled based on their size on a limited area, would be much better for some cases. There are a variety of CSS or JavaScript solutions out there on the net, but the most suitable for me was [**Macy.js**](http://macyjs.com/) ... and how I integrated it into my Hexo environment is what I want to describe here.

<!-- more -->

Like ([Tiny Slider](https://github.com/ganlanyuan/tiny-slider)), Macy.js is also based on JavaScript, as the name already expresses. The setup in HTML is very simple: a certain number of wrappers are arranged in a container, each of which contains an image:

``` html
<div id="macy-container">
  <div>
    <img src="/photos/normal/D50_0053.jpg" alt="">
  </div>
  <div>
    <img src="/photos/normal/D50_0075.jpg" alt="">
  </div>
  <div>
    <img src="/photos/normal/D50_0086.jpg" alt="">
  </div>
  <div>
    <img src="/photos/normal/D50_1092.jpg" alt="">
  </div>
  <div>
    <img src="/photos/normal/D50_1147.jpg" alt="">
  </div>
  <div>
    <img src="/photos/normal/D50_1577.jpg" alt="">
  </div>
  <div>
    <img src="/photos/normal/_D50_3251.jpg" alt="">
  </div>
</div>  
```

It does not matter whether the images are the same size or whether they are in portrait or landscape format. Macy.js then takes care of the sensible arrangement of the images in the container. All that is missing now is the call to the script:

``` js
let macy = new Macy({
  container: '#macy-container',
  trueOrder: false,
  waitForImages: false,
  useOwnImageLoader: false,
  debug: true,
  mobileFirst: true,
  columns: 2,
  margin: {
    y: 6,
    x: 6
  },
  breakAt: {
    1024: {
      margin: {
        x: 8,
        y: 8
      },
      columns: 4
    },
    768: 3
  }
});
```

For more information on the available parameters (and there are some interesting), please visit [https://github.com/bigbite/macy.js](https://github.com/bigbite/macy.js).

---

## The Tag Plugin

To make it easy for Hexo users, I created a tag plugin from the code above and added it to my [Hexo Tag Plugin Collection on GitHub](https://github.com/kristofzerbe/hexo-tag-plugins#image-masonry).

**Usage Example:**

```js
{% image_masonry
  "../../photos/normal/D50_0053.jpg|Thomas' Ruby Prince I"
  "../../photos/normal/_D50_3251.jpg|No Name"
  "../../photos/normal/D50_0086.jpg|Thomas' German Flag"
  "../../photos/normal/D50_1147.jpg|Poppy Green"
  "../../photos/normal/D50_0075.jpg|Thomas Wild Tulips"
  "../../photos/normal/D50_7474.jpg|Garden Beauties XIV"
  "../../photos/normal/D50_4451.jpg|Garden Beauties I"
  "../../photos/normal/D50_1577.jpg|Floral Magic XIV"
%}
```

**Live Output:**
{% image_masonry
  "../../photos/normal/D50_0053.jpg|Thomas' Ruby Prince I"
  "../../photos/normal/_D50_3251.jpg|No Name"
  "../../photos/normal/D50_0086.jpg|Thomas' German Flag"
  "../../photos/normal/D50_1147.jpg|Poppy Green"
  "../../photos/normal/D50_0075.jpg|Thomas Wild Tulips"
  "../../photos/normal/D50_7474.jpg|Garden Beauties XIV"
  "../../photos/normal/D50_4451.jpg|Garden Beauties I"
  "../../photos/normal/D50_1577.jpg|Floral Magic XIV"
%}
