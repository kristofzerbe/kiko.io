---
slug: Hexo-Tag-Plugin-Collection
title: Hexo Tag Plugin Collection
subtitle: All tag plugins used for kiko.io available on Github
date: 2021-12-12T14:07:36.000Z
photograph:
  file: D50_4919.jpg
  name: Ready To Fly
  link: 'https://500px.com/photo/1038382606'
  socialmedia: /static/images/social-media/Hexo-Tag-Plugin-Collection.png
project: hexo-tag-plugins
categories:
  - Tools
tags:
  - Hexo
  - Plugin
  - Collection
  - GitHub
  - VS Code
related:
  - Show-related-posts-in-Hexo
  - A-New-Blog-Customizing-Hexo
  - Forking-Hexo-plugin-hexo-index-anything
---

Since day one of this blog I use **Tag Plugins**, sometimes as NPM packages from other developers, sometimes developed by myself.

The latter have grown significantly over time and I want to share them with you by publishing them in a Github project called **hexo-tag-plugins**, where you can download and use those you need on extending your own Hexo based blog.

On the Github page you can find all the info on how to use the plugins. In this article I will only briefly introduce them:

{% anchorlist
  "Anchor|anchor"
  "Anchorlist|anchorlist"
  "Alertbox|alertbox"
  "Alternative Blockqoute|blockquote_alt"
  "Blockquote Details|blockquote_details"
  "Codepen|codepen"
  "CodeSandbox|codesandbox"
  "Download Link|download-link"
  "Image Compare|image-compare"
  "Image Link|image-link"
  "Image Slide|image-slide"
  "Indiepen|indiepen"
  "More Info|more-info"
%}

<!-- more -->

{% anchor "anchor" HR  %}

## Anchor

Anchor element as ``A``- or ``HR``-Tag as jump target for example from a ``Anchorlist``.

**Usage Example:**

```js
{% anchor "my-anchor" HR  %}
```

**Live Output:**

```html
<hr id="my-anchor">
```

See [https://github.com/kristofzerbe/hexo-tag-plugins#anchor](https://github.com/kristofzerbe/hexo-tag-plugins#anchor) for more details.

{% anchor "anchorlist" HR %}

## Anchorlist

Creates an overview of all anchors in the content with jump links.

**Usage Example:**

```js
{% anchorlist
  "My First Anchor|a1"
  "My Second Anchor|a2"
%}
```

**Live Output:**

{% anchorlist
  "My First Anchor|a1"
  "My Second Anchor|a2"
%}

See [https://github.com/kristofzerbe/hexo-tag-plugins#anchorlist](https://github.com/kristofzerbe/hexo-tag-plugins#anchorlist) for more details.

{% anchor "alertbox" HR %}

## Alertbox

Renders a iconized colored box with text for warnings or with some special information. 6 styles are provided: Exclamation, Question, Warning, Info, Success and Note.

This plugin uses a FontAwesome font for the icons and some styles that also need to be included in your Hexo project.

**Usage Example:**

```js
{% alertbox warning %}
Something has failed!
{% endalertbox %}
```

**Live Output:**

{% alertbox warning %}
Something has failed!
{% endalertbox %}

{% alertbox exclamation %}
Uuh, keep attention!
{% endalertbox %}

{% alertbox success %}
Everything's fine
{% endalertbox %}

{% alertbox question %}
What's up?
{% endalertbox %}

{% alertbox info %}
Some important information
{% endalertbox %}

{% alertbox note %}
Just as note...
{% endalertbox %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#alertbox](https://github.com/kristofzerbe/hexo-tag-plugins#alertbox) for more details.

{% anchor "blockquote_alt" HR %}

## Alternative Blockquote

An alternative blockquote tag plugin for quotes with citator and reference url.

**Usage Example:**

```js
{% blockquote_alt "Anonymous" "https://en.wikipedia.org/wiki/Lorem_ipsum" %}
Lorem ipsum dolor sit amet...
{% endblockquote_alt %}
```

**Live Output:**

{% blockquote_alt "Anonymous" "https://en.wikipedia.org/wiki/Lorem_ipsum" %}
Lorem ipsum dolor sit amet...
{% endblockquote_alt %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#alternative-blockquote](https://github.com/kristofzerbe/hexo-tag-plugins#alternative-blockquote) for more details.

{% anchor "blockquote_details" HR %}

## Blockquote Details

Blockquote including summary, citator and reference url, wrapped in a ``details`` tag.

**Usage Example:**

```js
{% blockquote_details "Lorem ipsum" "Anonymous" "https://en.wikipedia.org/wiki/Lorem_ipsum" %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
{% endblockquote_details %}
```

**Live Output:**

{% blockquote_details "Lorem ipsum" "Anonymous" "https://en.wikipedia.org/wiki/Lorem_ipsum" %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
{% endblockquote_details %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#blockquote-details](https://github.com/kristofzerbe/hexo-tag-plugins#blockquote-details) for more details.

{% anchor "codepen" HR %}

## Codepen

Embedding a pen from [Codepen](https://codepen.io).

**Usage Example:**

```js
{% codepen "abjJNYE" "Lorem Ipsum" html 250 %}
```

**Live Output:**

{% codepen "abjJNYE" "Lorem Ipsum" html 250 %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#codepen](https://github.com/kristofzerbe/hexo-tag-plugins#codepen) for more details.

{% anchor "codesandbox" HR %}

## CodeSandbox

Tag Plugin for embedding a sandbox from [CodeSandbox](https://codesandbox.io/).

**Usage Example:**

```js
{% codesandbox "cool-shamir-de613" "Lorem Ipsum" 300 %}
```

**Live Output:**

{% codesandbox "cool-shamir-de613" "Lorem Ipsum" 300 %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#codesandbox](https://github.com/kristofzerbe/hexo-tag-plugins#codesandbox) for more details.

{% anchor "downloadlink" HR %}

## Download Link

Button link for downloading an asset file, with additional caption ("Download &lt;additionalCaption&gt; &lt;assetFile&gt;").

**Usage Example:**

```js
{% download_link "example-image_ORIGINAL.jpg" "Photo" %}
```

**Live Output:**

{% download_link "example-image_ORIGINAL.jpg" "Photo" %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#download-link](https://github.com/kristofzerbe/hexo-tag-plugins#download-link) for more details.

{% anchor "image-compare" HR %}

## Image Compare

Comparing two images side-by-side with the aid of the JS library [Image Compare Viewer](https://image-compare-viewer.netlify.app/).

**Usage Example:**

```js
{% image_compare 
  "example-image_ORIGINAL.jpg"
  "example-image_PRESET.jpg"
  "Lightroom Preset" 
%}
```

**Live Output:**

{% image_compare
  "example-image_ORIGINAL.jpg"
  "example-image_PRESET.jpg"
  "Lightroom Preset"
%}

See [https://github.com/kristofzerbe/hexo-tag-plugins#image-compare](https://github.com/kristofzerbe/hexo-tag-plugins#image-compare) for more details.

{% anchor "image-link" HR %}

## Image Link

Renders an image including ALT attribute within a link.

**Usage Example:**

```js
{% image_link "kiko-io-screenshot.png" "http://kiko.io" "Blog kiko.io" %}
```

**Live Output:**

{% image_link "kiko-io-screenshot.png" "http://kiko.io" "Blog kiko.io" %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#image-link](https://github.com/kristofzerbe/hexo-tag-plugins#image-link) for more details.

{% anchor "image-slide" HR %}

## Image Slide

Shows multiple images within a slider with the aid of the JS library [Tiny Slider](https://github.com/ganlanyuan/tiny-slider).

**Usage Example:**

```js
{% image_slide
  "example-image_ORIGINAL.jpg|Original"
  "example-image_PRESET.jpg|Lightroom Preset"
%}
```

**Live Output:**

{% image_slide
  "example-image_ORIGINAL.jpg|Original"
  "example-image_PRESET.jpg|Lightroom Preset"
%}

See [https://github.com/kristofzerbe/hexo-tag-plugins#image-slide](https://github.com/kristofzerbe/hexo-tag-plugins#image-slide) for more details.

{% anchor "indiepen" HR %}

## Indiepen

Embedding a "local" pen (`index.html`, `main.js` and `styles.css` stored in an asset subfolder) via [Indiepen](https://indiepen.tech).

**Usage Example:**

```js
{% indiepen "indiepen-example" 300 html %}
```

**Live Output:**

{% indiepen "indiepen-example" 300 html %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#indiepen](https://github.com/kristofzerbe/hexo-tag-plugins#indiepen) for more details.

{% anchor "more-info" HR %}

## More Info

Renders a list of related, informative links regarding a post.

**Usage Example:**

```js
{% moreinfo '{ "list": [
  [ "Wikipedia", "Markdown",
  "https://en.wikipedia.org/wiki/Markdown" ],
  [ "Markdown Guide", "Basic Syntax",
  "https://www.markdownguide.org/basic-syntax/" ],
  [ "Daring Fireball", "Markdown: Syntax",
  "https://daringfireball.net/projects/markdown/syntax" ]
]}' %}
```

**Live Output:**

{% moreinfo '{ "list": [
  [ "Wikipedia", "Markdown",
  "https://en.wikipedia.org/wiki/Markdown" ],
  [ "Markdown Guide", "Basic Syntax",
  "https://www.markdownguide.org/basic-syntax/" ],
  [ "Daring Fireball", "Markdown: Syntax",
  "https://daringfireball.net/projects/markdown/syntax" ]
]}' %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#more-info](https://github.com/kristofzerbe/hexo-tag-plugins#more-info) for more details.
