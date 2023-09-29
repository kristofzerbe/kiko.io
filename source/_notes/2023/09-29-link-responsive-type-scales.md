---
title: "#Link | Responsive type scales"
date: 2023-09-29
syndication: 
- host: Mastodon
  url: 
---

This CSS calculation to create responsive type size by Tobias Ahlin is somewhat the sickest I've ever seen ...

`.container-adaptive {  
  --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
  
  font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);  
}`

... but works great. It would only be nice if it were simpler.

[https://tobiasahlin.com/blog/responsive-fluid-css-type-scales](https://tobiasahlin.com/blog/responsive-fluid-css-type-scales)

#css #responsive #type
