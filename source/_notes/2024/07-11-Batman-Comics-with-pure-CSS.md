---
title: "Batman Comics with pure CSS"
date: 2024-07-11 
type: link
rel:
  verb: like-of
  caption: "Batman-Comic.CSS"
  url: https://alvaromontoro.com/blog/68056/batman-comic-css
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112767128980027149
---

I really can't say that I'm a big fan of TailwindCSS, because I don't like decorating my HTML with dozens of predefined classes instead of implementing a meaningful class directly in my own CSS code.

However, [Alvaro Montoro](https://front-end.social/@alvaromontoro) shows how you can use predefined classes in a meaningful and even hilarious way with his [**Batman-Comic.CSS project**](https://alvaromontoro.com/sansjs/demos/batman-comic-css/), which enables you to create a comic without having the slightest idea about drawing comics!

Define the basic structure, add CSS classes for the various facial expressions, add texts for the speech bubbles ... Done. It's so amazingly cool and I think I will use it frequently in my posts, because sometimes a comic says more than a thousand words.

Here is a classic ... consisting of 10 HTML tags and a linked CSS file (and some tiny style adjustments ;):

<link rel="stylesheet" href="/assets/batman-comic.css">
<style>
  .bubble {
    font-weight: 900;
    font-size: 2em;
    line-height: initial;
  }
</style>
<div class="batman-comic" style="width:100%">
  <section class="three">
    <div class="bubble pos-x-20 pos-y-10 width-40 left short">The batremote of the batmobile doesn't work!</div>
    <div class="robin eyes-angry mouth-sad pos-x-30"></div>
    <div class="bubble pos-x-80 pos-y-10">Check the battery...</div>
    <div class="batman eyes-doubt mouth-left pos-x-70"></div>
  </section>
  <section class="three">
    <div class="bubble pos-x-25 pos-y-10 left short">What's an Ery?</div>
    <div class="robin eyes-think mouth-whisper mouth-right rotate-head-right pos-x-30"></div>
    <div class="batman blush mouth-no eyes-surprise pos-x-70"></div>
  </section>
</div>
<small class="label">powered by Alvaro Montoro's <a href="https://alvaromontoro.com/sansjs/demos/batman-comic-css/">Batman-Comic.CSS</a></small>

#CSS #Batman #Comic


```cardlink
url: https://alvaromontoro.com/blog/68056/batman-comic-css
title: "Batman-Comic.CSS"
description: "Move aside, TailwindCSS, the next best CSS utility-class library, is already here, and it's all about web development... and comics. Because the caped crusader makes everything better. Read more about this nerdy side project, how it works, and how you could collaborate. :: Blog post at Alvaro Montoro's Personal Website."
host: alvaromontoro.com
image: https://alvaromontoro.com/images/blog/batman-comic-css-0.webp
```