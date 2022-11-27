---
title: "#TIL | Detect Touch Input Devices"
date: 2021-07-02 12:00:00
---

As of the W3C draft of Media Queries Level 5, touch devices can be detected by using the ``hover`` and the ``pointer`` media feature:

```css
/* smartphones, touchscreens */
@media (hover: none) and (pointer: coarse) {
    /* ... */
}

/* mouse, touch pad */
@media (hover: hover) and (pointer: fine) {
    /* ... */
}
```
