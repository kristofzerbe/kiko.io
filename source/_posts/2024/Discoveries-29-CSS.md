---
slug: Discoveries-29-CSS
title: 'Discoveries #29 - CSS'
subtitle:
date: 2024-04-22 14:57:31
photograph:
  file: DSC_7910.jpg
  name: White Crystal
  socialmedia: /static/images/social-media/Discoveries-29-CSS.png
series: Discoveries
categories:
  - Collection
tags:
  - CSS
related:
  - Discoveries-28-UI-Components
  - Discoveries-27-JavaScript-Tools
  - Discoveries-26-JavaScript-HowTo-s
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112315522798697329
---

It&#39;s almost impossible to keep track of all the wonderful tips and tricks about CSS, because hardly a quarter goes by without new functions being introduced by the W3C and browser manufacturers. I diligently collect everything I can find in order to try it out at some point, but I hardly ever get round to it. If you feel the same way ... here are a few more gems for your pile ... :)

{% anchorlist 
  "A Fancy Hover Effect For Your Avatar|a-fancy-hover-effect-for-your-avatar"
  "Mixing Colors with CSS|mixing-colors-with-css"
  "CSS Proxied Variables via JS (css-proxied-vars)|css-proxied-variables-via-js-css-proxied-vars-"
  "Resetting Inherited CSS with “Revert”|resetting-inherited-css-with-revert-"
  "Solved: Tricky Floating Image Alignment|solved-tricky-floating-image-alignment"
  "CSS Blurry Shimmer Effect|css-blurry-shimmer-effect"
  "Scroll progress animations in CSS|scroll-progress-animations-in-css"
  "Speedy CSS Tip! Animated Gradient Text|speedy-css-tip-animated-gradient-text"
  "imagehover: CSS hover effect library for images|imagehover-css-hover-effect-library-for-images"
  "Scrollbar.app|scrollbar-app"
%}

<!-- more -->

{% discovery "A Fancy Hover Effect For Your Avatar" "Temani Afif" "https://css-tricks.com/a-fancy-hover-effect-for-your-avatar/" Discoveries-29-CSS a-fancy-hover-effect-for-your-avatar.png %}
Most avatar images are a bit boring. Temani&#39;s solution adds a bit of flair by splitting an image into frame and content and letting the content jump out of the frame on hover
{% enddiscovery %}

{% discovery "Mixing Colors with CSS" "Ryan Trimble" "https://ryantrimble.com/blog/mixing-colors-with-css/" Discoveries-29-CSS mixing-colors-with-css.png %}
In his short article, Ryan introduces us to the relatively but widely available CSS function color-mix(), which can be used to mix two colours together.
{% enddiscovery %}

{% discovery "CSS Proxied Variables via JS (css-proxied-vars)" "Andrea Giammarchi" "https://github.com/WebReflection/css-proxied-vars" Discoveries-29-CSS css-proxied-variables-via-js-css-proxied-vars-.png %}
Andrea&#39;s work makes it easy to influence the variables available in the CSS code using JavaScript. Read, set, update ... no problem with this script.
{% enddiscovery %}

{% discovery "Resetting Inherited CSS with “Revert”" "Scott Vandehey" "https://cloudfour.com/thinks/resetting-inherited-css-with-revert/" Discoveries-29-CSS resetting-inherited-css-with-revert-.png %}
If you don&#39;t need to support IE, Scott has a great tip for you on how to reset any styles within the DOM using standard CSS.
{% enddiscovery %}

{% discovery "Solved: Tricky Floating Image Alignment" "Tyler Sticka" "https://cloudfour.com/thinks/solved-tricky-floating-image-alignment/" Discoveries-29-CSS solved-tricky-floating-image-alignment.png %}
Tyler combines in his post the overflow behavior of <code>float</code>, with the alignment behavior of <code>grid</code> or <code>flex</code>, in order to show perfect aligned text alongside an image.
{% enddiscovery %}

{% discovery "CSS Blurry Shimmer Effect" "Yair Even Or" "https://www.smashingmagazine.com/2024/01/css-blurry-shimmer-effect/" Discoveries-29-CSS css-blurry-shimmer-effect.png %}
CSS <code>box-shadow</code> is a cool way to make elements stand out from the background. Yair takes this to a new level by using a gradual blur effect instead of a simple colour.
{% enddiscovery %}

{% discovery "Scroll progress animations in CSS" "Michelle Barker" "https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/" Discoveries-29-CSS scroll-progress-animations-in-css.png %}
Scroll-linked animations are often used to show the user where they are on the page. Michelle goes through the possibilities of using pure CSS to create different animation styles.
{% enddiscovery %}

{% discovery "Speedy CSS Tip! Animated Gradient Text" "Jhey Tompkins" "https://web.dev/speedy-css-tip-animated-gradient-text/" Discoveries-29-CSS speedy-css-tip-animated-gradient-text.png %}
Gradient text is cool, but animated gradient text is even cooler. A real eye catcher and Jhey tells us how it works.
{% enddiscovery %}

{% discovery "imagehover: CSS hover effect library for images" "Daniel Abel" "https://github.com/zkreations/imagehover" Discoveries-29-CSS imagehover-css-hover-effect-library-for-images.png %}
With this library, developers can enhance the visual appeal of their projects by adding animated transitions to their images when users hover over them.
{% enddiscovery %}

{% discovery "Scrollbar.app" "Henri Parviainen" "https://scrollbar.app/" Discoveries-29-CSS scrollbar-app.png %}
This little web app by Henri helps developers to design and implement custom scrollbars in their projects. Copy and Paste the code you need…
{% enddiscovery %}

