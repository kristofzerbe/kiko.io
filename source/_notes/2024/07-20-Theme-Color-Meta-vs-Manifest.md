---
title: "#TIL | Theme Color - Meta vs. Manifest"
date: 2024-07-20
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112821729396540861
---

A few weeks ago, I finally implemented the [dominant color automatically extracted from the header image](/post/get-and-use-a-dominant-color-that-matches-the-header-image/) also in the CSS as [`accent-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) and of course I use it for the respective page in the [Meta tag `theme-color`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color) too.

However, I noticed today that the latter does not work and after some research it was clear that a fixed `theme_color` from a web manifest suppresses the value of the meta tag. At least in Chromium browsers.

**Solution**: Simply omit `theme_color` in the manifest, because the browser then takes the meta value as a fallback, and the color of the entire WebApp changes per page and the dark gray status bar is gone ...

<video width="360px" controls autoplay muted playsinline loop>
  <source src="_attachments/Screenshot_2024-07-20_160624~2.mp4" type="video/mp4">
</video>

#css #manifest #theme