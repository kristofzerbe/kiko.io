---
title: "#TIL | CSS's :not([class]) selector"
date: 2023-01-02 17:35:00
syndication: 
- host: Mastodon
  url: 
---

Some links need to look different from standard links, be it with a background image or other special formatting. Mostly you simply create a new class like ``a.img-link`` or something like that.

To be able to style the standard ``a`` tag (without classes) as needed, it may be necessary to exclude the special link classes, such as ``a:not(.img-link) {...}``. If you have several of them, it quickly becomes confusing.

What I didn't know until now is that you can use **``a:not([class]) {...}``** to generally exclude ALL links with a class. Very nice ...

#CSS #TIL