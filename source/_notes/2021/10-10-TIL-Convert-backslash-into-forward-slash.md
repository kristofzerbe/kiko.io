---
title: "#TIL | Convert backslash into forward slash"
date: 2021-10-10 12:00:00
type: til
syndication: 
---

While developing Node.js on Windows and dealing with paths, like ``path.join``, the folder separator will be a backslash always. But on the web a forward slash is recommended. Most browsers have no problem showing an image with a relative path like ``/images\my-image.jpg``, but it is not ideal.

Replacing backslashes with foreward slashed seems easy, but it has its pitfalls, because JS uses the backslash for escaping. A safe way to address backslashes on replacing is to use its octal representation ``\134``:

```js
let myPath = path.join(root, "images", "my-image.jpg").replace(/\134/g,"/");
```

Another way to get correct paths, you can use Node's path methods ``normalize`` or ``resolve``.
