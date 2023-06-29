---
title: "#TIL | Stylus vs. CSS built-in functions "
date: 2023-06-29
syndication: 
- host: Mastodon
  url: 
---

I think Stylus had its time, but it's starting to be a real pain. 1 hour until I realized that it disassembles padding-top: max(30px, 3%) because it has such a function itself.

Workaround: padding-top: @css { max(30px, 3%) }

#stylus #css
