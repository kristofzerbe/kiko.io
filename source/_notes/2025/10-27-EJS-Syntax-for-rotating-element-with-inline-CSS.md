---
title: "#TIL | EJS Syntax for rotating element with inline CSS"
date: 2025-10-27T12:29:52+01:00
type: til
syndication: 
- host: Mastodon
  url: 
---
For a new section of my blog, I've been experimenting a bit with CSS over the past few weeks to find the right layout. Even though I'm not using the following snippet, I want to save my future self from having to research again how to rotate an element with inline CSS in a narrow range around 0:

```ejs
style="rotate: <%#- (Math.random() * (-1.25 - 1.25) + 1.25).toFixed(2) %>deg"
```

#CSS