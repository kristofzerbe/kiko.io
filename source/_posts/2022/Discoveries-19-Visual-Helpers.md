---
slug: Discoveries-19-Visual-Helpers
title: 'Discoveries #19 - Visual Helpers'
subtitle:
date: 2022-07-09 12:30:17
photograph:
  file: D50_0053.jpg
  name: Thomas' Ruby Prince I
  link: https://500px.com/photo/1031618817
  socialmedia: /static/images/social-media/Discoveries-19-JS-Libraries.png
series: Discoveries
categories:
  - Misc
tags:
  - Collection
related:
  - Discoveries-18-JS-UI
  - Discoveries-17-CSS
  - Discoveries-16-JavaScript
---

Colors and images are the visual meat on the boil of any web solution. If you don't convince the visitor's eye, they will quickly leave and if users have to work with a visually poor solution, they will be too dissatisfied, no matter how well the algorithms work. 

Below are a few JavaScript libraries that help to create appealing interfaces.

{% anchorlist  
  "Color Thief|color-thief"
  "Vibrant Colors|vibrant-colors"
  "Color.js|colorjs"
  "TinyColor|tinycolor"
  "Qix color|qix-color"
  "Alpha Paintlet|alpha-paintlet"
  "DOM to Image|dom-to-image"
  "imagesLoaded|images-loaded"
  "Graphery SVG|graphery-svg"
  "Flickity|flickity"
%}

<!-- more -->

{% discovery "Color Thief" "Lokesh Dhakar" "https://lokeshdhakar.com/projects/color-thief/" Discoveries-19 color-thief.png %}
Lokesh has developed a JS library which extracts a color palette from any given image. Very useful to adjust the colors of a page for example to the hero image. It works in the client as well as in Node.JS applications.
{% enddiscovery %}

{% discovery "Vibrant Colors" "Corbin Crutchley et al" "https://github.com/Vibrant-Colors/node-vibrant" Discoveries-19 vibrant-colors.png %}
Corbin Crutchley is one of the maintainer of the library **Color Vibrant**, which extracts the colors from a given image as *Color Thief* does, but with many more features. It classifies the colors in the extracted palette for using as common shortcuts, it has a WebWorker for avoiding freezing the UI thread and it has converting methods into several color spaces. Stunning work ... see the [Pen](https://codepen.io/kopol/pen/QWjwrPN) from Konstantin Polunin.
{% enddiscovery %}

{% discovery "Color.js - Let's get serious about color" "Lea Verou & Chris Lilley" "https://colorjs.io/" Discoveries-19 colorjs.png %}
As Lea Verou says in her [blog post](https://lea.verou.me/2022/06/releasing-colorjs/) on releasing **Color.js**, there was a lack of color libraries that did the things she (and many others) needed on working with colors. So she teamed up with Chris Lilley, the father of SVG, to create a JS library that covers pretty much everything regarding color coding. I bet Color.js will become a new standard lib for all of us.
{% enddiscovery %}

{% discovery "TinyColor" "Brian Grinstead" "https://github.com/bgrins/TinyColor" Discoveries-19 tinycolor.png %}
Brian's ambitions were certainly not the same as Lea Verou's, but with TinyColors he has started something, that can be quite helpful on a smaller scale in converting from one color space to another.
{% enddiscovery %}

{% discovery "Qix color" "Josh Junon" "https://github.com/Qix-/color" Discoveries-19 qix-color.png %}
Josh Junon, or 'Qix' on Github, provides us a lib with only 496 lines and 10.9 KB, for immutable color conversion and manipulation with support for CSS color strings. For in between...
{% enddiscovery %}

{% discovery "Alpha Paintlet" "Dave Rupert" "https://daverupert.com/2021/10/alpha-paintlet/" Discoveries-19 alpha-paintlet.png %}
The Web API ``CSS.paintWorklet`` (see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/PaintWorklet)) is an experimental feature in Chromium browsers for extending CSS with JavaScript by writing Worklets. Dave shows us how to do this with his 'Alpha Paintlet', which manipulates the alpha channel.
{% enddiscovery %}

{% discovery "DOM to Image" "Anatolii Saienko" "https://github.com/tsayen/dom-to-image" Discoveries-19 dom-to-image.png %}
Ever wanted to store an arbitary DOM node as an image? With Anatolii's solution a breeze. Just load the library and call ``domtoimage.toPng(node)``. It supports PNG, JPEG and SVG.
{% enddiscovery %}

{% discovery "imagesLoaded" "David DeSandro" "https://imagesloaded.desandro.com/" Discoveries-19 images-loaded.png %}
Sometimes it is important to know when an image was loaded on a website, for example to follow up with further actions. David has a Vanilla script and jQuery solution for this problem and it works with background images too. An important helper ... well done.
{% enddiscovery %}

{% discovery "Graphery SVG" "-unknown-" "https://www.graphery.org/svg/" Discoveries-19 graphery-svg.png %}
Writing an SVG is not really an amusement. If you are more familiar with JS, you can use Vanilla JS with lots of ``createElement`` and ``setAttribut`` or the wrapper solution from Graphery, which is chainable and very well documented.
{% enddiscovery %}

{% discovery "Flickity" "Evan S" "https://codepen.io/Skoulix/pen/BRJRPd" Discoveries-19 flickity.png %}
Last but not least, a very cool hero image solution from Evan. It uses the parallax effect for sliding hero images in the background. Very cool.
{% enddiscovery %}
