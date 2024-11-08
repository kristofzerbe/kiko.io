---
title: "#TIL | Styling images in Markdown via URL hash"
date: 2024-11-08
type: til
rel:
  verb: bookmark-of
  caption: Aligning Images In Markdown
  url: https://www.surinderbhomra.com/Blog/2020/05/12/Aligning-Images-In-Markdown
syndication: 
- host: Mastodon
  url: 
---
Oh man! The other day I fumbled HTML with inline styles into one of my Markdown files to let the text flow past it classically with FLOAT on the left side. But there is a simple and charming solution to solve this in general purely via the image URL and some CSS that I could have come up with myself ...

I was led to this by a [Mastodon post from Matt Wilkie](https://vmst.io/@maphew/113445531772804983), who cites a blog post from Surinder Bhomra. It's just a simple hash added to the Markdown image URL (and which has no further impact) ...

```md
![my alt-text](path/to/my-image.jpg#right)
```

... and a little bit CSS:

```css
img[src*='#left'] {
  float: right;
  margin: 10px 0 10px 10px;
}
```


#markdown #images 

```cardlink
url: https://www.surinderbhomra.com/Blog/2020/05/12/Aligning-Images-In-Markdown
title: "Aligning Images In Markdown | Surinder Bhomra"
description: "A nice clean way for positioning images left, right and centre within markdown."
host: www.surinderbhomra.com
favicon: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+YGDBIGLyt29eYAAABxelRYdFJhdyBwcm9maWxlIHR5cGUgOGJpbQAAeJxFi0EOwCAIBO+8ok9YERW+U8Wkh/7/WrQHl2SzsAzp/bx0bZVKWYXFZEBijmbq4OqRcmGp0ta+m+XxeTgu60w/lzAkDe3DdAI3Q9wUMFPvM5Dm9AHV7xwzsKQoYQAAAI56VFh0UmF3IHByb2ZpbGUgdHlwZSBleGlmAAAYlWVO2w2AMAj8ZwpHAEorjoPRJm7g+GKLidVL6KU87g7286gw3aCkIHnWspSCDtlkQ2TDDvXKSMTOKXoU5S9Zm0cfOov5YH0POmVGYv0IcXOZy3IffoTykyIgOgoO/2TB75RNyLqLDMdUPWZb/vUfO7gA9zE6L6qOI3AAAABPelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzjyiwoSeZSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouACiVDuMqIm0fAAAA+klEQVQY0wXBzUoCYRgF4HPe+WKG0GkUIyIhFzO0aVFSN+DCba0iuo6upHVdQIuWXUEuIiSKiCTaqAsxYkhNJ/Pn9Dxs0YycTVRwAgAHSEyvXyeH9cQDxDfSdHUxh799XhdkkpbZY7YQ2pdtA40QskGQr56epTcLwBHgqLJRqsa53v0wkgPA5VYpDIK10kCAMwiR1zj4ujsuR6HoDDI/mUTBtx8HTnQm2vxvvxKm5XZMyJlA78MfbaLzUJPkDFI+vS0UV9OjcAkYSfg1m46fw9oPIQcQ3c9cfxafvLeSeIVdjpsvg/5Tfo+eFXd32LFmYzr7zZTJ1/ow+Qf9d2kdmxH3QwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wNi0xMlQxODowNjo0NyswMDowMDTpOGkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDYtMTJUMTg6MDY6NDcrMDA6MDBFtIDVAAAAEXRFWHRleGlmOkNvbG9yU3BhY2UAMQ+bAkkAAAAYdEVYdGV4aWY6RXhpZkltYWdlTGVuZ3RoADUwMB1k3N0AAAAXdEVYdGV4aWY6RXhpZkltYWdlV2lkdGgANTAwgPtZzwAAABJ0RVh0ZXhpZjpFeGlmT2Zmc2V0ADkwWYzemwAAAABJRU5ErkJggg==
image: https://ik.imagekit.io/surinderbhomra/Blog/Stock/WallTilesDifferentSizes.jpg?tr=w-1000
```
