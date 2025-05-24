---
title: "#TIL | Stylus vs. CSS built-in functions"
date: 2023-06-29 18:30
type: til
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/110629153911568315
---

I think [Stylus](https://stylus-lang.com/) had its time, but it's starting to be a real pain. 1 hour until I realized that it disassembles ``padding-top: max(30px, 3%)`` because it has such a function itself.

Workaround: ``padding-top: @css { max(30px, 3%) }``

#stylus #CSS
