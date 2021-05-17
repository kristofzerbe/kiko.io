---
alias: /categories/Photo-Editing/Triangulate-your-images-with-Triangula/index.html
title: Triangulate your images with Triangula
subtitle:
date: 2021-04-30 14:56:13
hitcountId: RpB2l3hzH
photograph:
  file: 20-08 Mallorca-7195.jpg
  name: Bottle Series
  link: 'https://500px.com/photo/1023572576'
categories:
  - Photo-Editing
tags:
  - Imaging
  - Great Finds
  - SVG
related:
  - SVG-Resources
  - Adding-Screenshots-to-Trello-Cards-on-Android
  - Dopamine-How-Software-should-be
---

As I am a photo enthusiast I'm always excited to find new tools, to give images a unique look. Today I stumbled over [**Triangula**](https://github.com/RH12503/triangula). Ever seen one of those cool backgrounds, where a picture has been broken up into lots of little triangles?

> In trigonometry and elementary geometry, the division of a surface into triangles is called a triangular grid, triangular mesh or triangulation.   
> *Wikipedia*

Whoever [RH12503 (Ryan H??)](https://github.com/RH12503) is, he did an amazing job on creating this little Go program, including a pleasing UI, do convert images into those equivalents.

<!-- more -->

{% asset_img triangula.gif "Triangula UI" %}

These images are absolute great for background images in websites, in order to make the details less recognisable.

There is a [web version of Triangula](https://rh12503.github.io/triangula/), but the desktop version (including a console version) is much faster. Best feature is the ability not only to save the generated images as PNG, but also as SVG!

### Example with 1.000 Generations

{% image_compare "triangula-1-compare" "DSC_7006-HDR_ORIGINAL.jpg" "DSC_7006-HDR_TRIANGULATED.png" "Triangulated" %}

### Example with 10.000 Generations

{% image_compare "triangula-2-compare" "19-07 Schottland-0512_ORIGINAL.jpg" "19-07 Schottland-0512_TRIANGULATED.png" "Triangulated" %}

### Example with 20.000 Generations

{% image_compare "triangula-3-compare" "DSC_8860_ORIGINAL.jpg" "DSC_8860_TRIANGULATED.png" "Triangulated" %}
