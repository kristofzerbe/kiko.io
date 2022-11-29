---
title: "#TIL | CSS's :where()"
date: 2022-01-29 12:00:00
syndication: 
---

The [``:where()``](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) pseudo selector helps you writing cleaner code on the one hand. Instead of writing:

```CSS
.wrapper h1,
.wrapper h2,
.wrapper h3 {
  color: red;
}
```

... you can do:

```CSS
.wrapper :where(h1, h2, h3) {
  color red;
}
```

On the other hand, it is a so called **forgiving selector**, which rougly means, if one of the selectors in a selector list isn't valid, it works nevertheless.