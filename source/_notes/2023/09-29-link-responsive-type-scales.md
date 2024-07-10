---
title: "#Link | Responsive type scales"
date: 2023-09-29
type: link
rel:
  verb: like-of
  caption: "Responsive type scales with composable CSS utilities"
  url: https://tobiasahlin.com/blog/responsive-fluid-css-type-scales
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/111150583926797975
---

This CSS calculation to create responsive type size by Tobias Ahlin is somewhat the sickest I've ever seen ...

``` css
.container-adaptive {  
  --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
  
  font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);  
}
```

... but works great. It would only be nice if it were simpler.

[https://tobiasahlin.com/blog/responsive-fluid-css-type-scales](https://tobiasahlin.com/blog/responsive-fluid-css-type-scales)

#css #responsive #type

```cardlink
url: https://tobiasahlin.com/blog/responsive-fluid-css-type-scales
title: "Responsive type scales with composable CSS utilities"
description: "With the help of calc(), clamp() and CSS vars, we can create composable, responsive, and fluid type scales that smoothly adapts to viewport and container widths."
host: tobiasahlin.com
favicon: https://tobiasahlin.com/images/favicon.ico
image: https://tobiasahlin.com/static/-social/og_blog-responsive-fluid-css-type-scales.jpg
```
