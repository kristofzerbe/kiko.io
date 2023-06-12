---
title: "#TIL | CSS Logical Properties"
date: 2023-05-12

syndication: 
- host: Mastodon
  url: 
---

I really wasn't aware of the new CSS Logical Properties[CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), but as I read [Chris thoughts on that](https://chriscoyier.net/2023/06/06/modern-css-in-real-life/), it makes absolutely sense to switch completely.

#CSS

<!-- more -->

In short, `margin-right: 1vw` is correct for a Western user who reads from left to right, assuming that right is the end of an element. In other languages, such as Arabic or Hebrew, this is not the case, since the reading direction is from right to left. In other languages, it is from top to bottom. There, the notation `margin-inline-end: 1vw` is more suitable, once you have internalized the concept INLINE = parallel to the text flow and BLOCK = perpendicular to the text flow. START and END mean the same in all languages.