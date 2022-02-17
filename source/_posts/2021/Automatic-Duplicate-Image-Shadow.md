---
slug: Automatic-Duplicate-Image-Shadow
title: Automatic Duplicate Image Shadow
subtitle: Drop an image shadow with the image itself via JavaScript
date: 2021-07-16T17:45:30.000Z
photograph:
  file: 18-09 Kroatien-0349.jpg
  name: Colorful Twig
  link: 'https://500px.com/photo/303713979'
  socialmedia: /static/images/social-media/Automatic-Duplicate-Image-Shadow.png
categories:
  - JavaScript
tags:
  - CSS
  - DOM
  - Imaging
related:
  - Use-a-duplicate-image-to-drop-a-shadow
  - Generate-Social-Media-Images-Automatically
  - Triangulate-your-images-with-Triangula
---

At the beginning of the year I wrote a {% post_link 2021/Use-a-duplicate-image-to-drop-a-shadow "post"  %} about showing a shadow on an image with the image itself instead of using ``box-shadow``, to make the image appear glass-like.

![Image Shadow](Automatic-Duplicate-Image-Shadow/image-shadow.jpg)

Nice trick, but it would be much easier to have a little script, that does this automatically for all images on a page. In this post I will show you how to achieve this.

<!-- more -->

The script is not really rocket science: We just have to surround an image tag....

```html
<img src="my-image.jpg" />
```

... with a wrapper, which holds the original image and a blurred duplicate of it:

```html
<div class="shadow-wrapper">
  <img class="drop-shadow" src="my-image.jpg" />
  <img class="shadow" src="my-image.jpg" />
</div>
```

The rest will be done by CSS:

```css
div.shadow-wrapper { /* Wrapper */
    position: relative;
    margin-bottom: 30px;
}
div.shadow-wrapper img.drop-shadow { /* Original image */
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    margin: 0;
    float: none;
}
div.shadow-wrapper img.shadow { /* Shadow image */ 
    position: absolute;
    width: 90%;
    left: 5%;
    top: 15%;
    z-index: 0;
    filter: blur(10px);
    opacity: 0.8;
    margin: 0;
    float: none;
}
```

To make long story short: The wrapper is positioned ``relative`` and both images ``absolute``. The shadow image is 10% smaller than the original, blurred by 10 pixels and lies beneath the original one, slightly shifted down by 15%.

Very important is to give the wrapper a bottom margin, otherwise the shadow will be rendered to tight to other elements, what looks not good.

## The Script

What the script should do:

* Take any image tag with a particular class name (here ``drop-shadow``)
* Create a new wrapper with all classes the image tag has
* Size the wrapper as the image
* Place the image tag inside the wrapper
* Clone the image tag and append it to the wrapper also
* Replace the image tag with the new wrapper HTML

```js
document.querySelectorAll("img.drop-shadow").forEach(function(item) {

  let wrapper = document.createElement("div");
  wrapper.classList.add("shadow-wrapper");

  item.classList.forEach(function(c) {
    if (c != "drop-shadow") wrapper.classList.add(c);
  });
  wrapper.style.width = item.clientWidth + "px";
  wrapper.style.height = item.clientHeight + "px";

  wrapper.insertAdjacentHTML("beforeend", item.outerHTML);

  let shadow = item.cloneNode();
  shadow.classList.remove("drop-shadow");
  shadow.classList.add("shadow");
  wrapper.insertAdjacentHTML("beforeend", shadow.outerHTML);

  item.outerHTML = wrapper.outerHTML;
}
```

The result in comparison with no shadow and the default ``box-shadow``:

{% indiepen "sample" 600 %}

Happy shadowing...
