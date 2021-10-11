---
title: The Last Image Gallery...
subtitle: "... you have to deal with: Spotlight"
date: 2021-10-10 12:28:09
hitcountId:
photograph:
  file: 18-09 Kroatien-0340.jpg
  name: Seating Group
  link: 'https://500px.com/photo/303713997/-by-Kristof-Zerbe'
series: Great Finds
categories:
  - JavaScript
tags:
  - Plugin
  - Imaging
  - GitHub
related:
  - Generate-Social-Media-Images-Automatically
  - Automatic-Duplicate-Image-Shadow
  - Use-a-duplicate-image-to-drop-a-shadow
---

In the last decade(s) I have seen and tried many image galleries and lightboxes for showing images or groups of images. Depending on your needs, you can choose out of trillions of solutions, for every JS framework or vanilla JS, in every flavour, size and color. With many of them, however, you reach the limits quite quickly. Be it in terms of visual adaptability, extensibility or implementation. Customization cost time and nerves, especially if the respective library has structural weaknesses.

However, from today on, I don't need to look for a suitable solution for my next project, because I found one that leaves absolutely none of my wishes unfulfillede: [**Spotlight**](https://nextapps-de.github.io/spotlight/) by Nextapps from Berlin, Germany.

{% asset_img spotlight.jpg "Spotlight" %}

To make it clear: this is not a paid advertising text or something like that. That wouldn't make sense either, because Spotlight is Open Source ([Apache 2.0 License](https://en.wikipedia.org/wiki/Apache_License)) and its code is availabel at GitHub. I'm just thrilled with the work of the developers.

<!-- more -->

---

The first step on implementing every image gallery solution is the installation. Spotlight has different options, but the easiest one is to download the **bundled version**, which includes both the JS files and the image (icon) and CSS files. For the non-bundles files, you can choose the minified versions or even the original ES6 and LESS files. There is a NPM package also.

For the implementation you can either choose a declarative way using the ``spotlight`` class, where the shown thumb images to click on needs to have a wrapper...

```html
<a class="spotlight" href="img1.jpg">
    <img src="thumb1.jpg">
</a>
<a class="spotlight" href="img2.jpg">
    <img src="thumb2.jpg">
</a>
```

... or programmatically via JavaScript:

```js
var gallery = [
    { src: "img1.jpg" },
    { src: "img2.jpg" }
];
Spotlight.show(gallery /*, options */);
```

Next to the image, at the bottom left corner, a title, a description and/or a button can be displayed on a gallery slide, which is completely compatible with all types of devices.

It is possible to define image groups to show separately in the declaration mode by having an extra wrapper around a bunch of image wrappers. All options how the gallery has to be shown are also declarative:

```html
<div class="spotlight-group" 
     data-title="Group title">
    <a class="spotlight" href="img1.jpg" 
       data-title="This is a title">
        <img src="thumb1.jpg">
    </a>
    <a class="spotlight" href="img2.jpg" 
       data-title="This is another title"
       data-description="This is a description">
        <img src="thumb2.jpg">
    </a>
</div>
```

Spotlight has 9 built-in controls to show in the bar at the top left:

* Fullscreen
* Zoom in
* Zoom out
* Autofit
* Close
* Theme
* Play (Slideshow)
* Download

... and there is a possibility to insert custom controls during initialization.

If you provide several image sizes, Spotlight picks the optimal version regarding the current devices resolution, pixel ratio and bandwidth. But Spotlight is not limited to images. It can also display videos and even custom HTML fragments (DOM nodes) as slides.

Through its JavaScript API you can fully remote control the gallery and it has several options to customize the appearance of the slides to every need you can imagine.

---

The implementation is a breeze. It took me less than 10 minutes to get Spotlight working here on this blog at the [photo page](/photos)!

I can't think of any use case right now, that you couldn't implement easily and quickly with this amazing library. Congrats folks ... extremely well done!

[{% asset_img logo.png %}](https://nextapps-de.github.io/spotlight/)
