---
slug: Pool-Photo-Generator
title: Pool Photo Generator
subtitle: How to create multiple device dependend header photos with Node
date: 2023-08-21
photograph:
  file: 23-05 Holland-0174.jpg
  name: Beer Copper
  link: https://500px.com/photo/1073785345
  socialmedia: /static/images/social-media/Pool-Photo-Generator.png
categories:
  - JavaScript
tags:
  - Imaging
  - Node.js
related:
  - Automatic-Header-Images-in-Hexo
  - Generate-Social-Media-Images-Automatically
  - A-New-Blog-Customizing-Hexo
syndication:
  - host: Mastodon
    url: null
---

Since the existence of this blog, the posts all have a custom header image that I generate from my own photos. Already three years ago (omg ... really?) I described in an article how to do this with Hexo: {% post_link "2020/Automatic-Header-Images-in-Hexo" %}.

To keep it short, I use a pool folder for this, in which I keep in subfolders next to a ``meta.txt``, for the title of the image and an external url on 500px for interactions to the image, three variants that I need for a new post:

- mobile.jpg (width 480px)
- tablet.jpg (width 768px)
- normal.jpg (width 1280px)

The only piece of the puzzle that was still missing was the automatic generation of these three image variants and the meta file based on a selected photo that I want to add to the pool of available header images. So far it was fun to generate the header images manually either on the desktop or on the smartphone, but it really doesn't have to be. My goal now was to write a script where I just throw a selected photo into a folder and the NodeJS script does the rest.

My photo workflow is based on Adobe Lightroom Classic and one of the steps is to give a title to the good ones I use here as well. So the script had to include four steps when iterating over the inbound folder's JPG files:

1. create new pool folder
2. read meta data (IPTC -> title) and write it to meta.txt
3. create the three image variants
4. delete the processed image from the inbound folder

<!-- more -->

---

## The Script

I implemented the script as a class with the following skeleton:

``` js pool-photo-generator.cjs
'use strict';

[requirements ...]

[vars ...]

class PoolPhotoGenerator { 

  /**
   * Contructor of PoolPhotoGenerator
   * @param {String} inboundFolder 
   * @param {String} poolFolder 
   */
  constructor(inboundFolder, poolFolder) { ... }

  /**
   * Runs the generation of inbound photos to pool photos
   */
  generate() { ... }

  /**
   * Helper function to create image variant
   * @param {String} imgSource 
   * @param {String} imgTarget 
   * @param {Number} sizeWidth 
   */
  async createImageVariant(imgSource, imgTarget, sizeWidth) { ... }

}
module.exports.PoolPhotoGenerator = PoolPhotoGenerator;
```

### Requirements

To handle files and folders in NodeJS you need at least ``fs`` and ``path``:

``` js
const fs = require("fs");
const path = require("path");
```

For image processing there's no better solution as [Sharp](https://sharp.pixelplumbing.com/):

``` js
const sharp = require('sharp');
sharp.cache(false); //prevents keeping source file open
```

Similarly powerful, but intended for reading image metadata is [EXIFR](https://mutiny.cz/exifr/):

```js
const exifr = require('exifr');
```

### Vars

I just needed three vars for holding the full qualified path of the current execution folder and the names of the two incoming parameters:

``` js
const _currentPath = __dirname;

let _inboundFolder;
let _poolFolder;
```

### Constructor

In this case, the constructor only serves to provide and check the necessary parameters of the class:

``` js
constructor(inboundFolder, poolFolder) {

  _inboundFolder = path.join(_currentPath, inboundFolder);
  _poolFolder = path.join(_currentPath, poolFolder);

  if (!fs.existsSync(_inboundFolder)) {
    throw "Inbound folder not found"
  }
  if (!fs.existsSync(_poolFolder)) {
    throw "Pool folder not found"
  }
}
```

### Function 'generate'

This is the main function to call, and it first reads the input folder for JPG and cycles through all the hits. Then for each file the above four steps are executed:

``` js
generate() { 
    let self = this;

    const inboundFiles = fs.readdirSync(_inboundFolder);

    const jpgFiles = inboundFiles.filter(file => {
      return path.extname(file).toLowerCase() === ".jpg";
    });

    jpgFiles.forEach((file) => { 
      const imgFile = path.join(_inboundFolder, file);

      // Step 1: Create new pool folder
      const newPhotoFolder = path.join(_poolFolder, file.replace(path.extname(file), ''));
        fs.mkdirSync(newPhotoFolder);

      // Step 2: Read TITLE from IPTC and write to meta.txt
      const iptcMeta = exifr.parse(imgFile, { iptc: true }).then(output => {
        let title = output.ObjectName || "No Title";
        fs.writeFile(path.join(newPhotoFolder, "meta.txt"), title);
      });

      // Step 3: Create image variants
      const createMobile = self.createImageVariant(imgFile, path.join(newPhotoFolder, "mobile.jpg"), 480);
      const createTablet = self.createImageVariant(imgFile, path.join(newPhotoFolder, "tablet.jpg"), 768);
      const createNormal = self.createImageVariant(imgFile, path.join(newPhotoFolder, "normal.jpg"), 1280);

      // Step 4: Delete processed JPG in inbound folder, when everything is done
      Promise.all([
          iptcMeta, 
          createMobile, 
          createTablet, 
          createNormal
        ]).then(() => {
          fs.unlinkSync(imgFile);
        });

    }

}
```

### Function 'createImageVariant'

This helper function reduces the original image to the desired size and saves it in the destination (pool) folder as a JPG:

``` js
async createImageVariant(imgSource, imgTarget, sizeWidth) {

  await sharp(imgSource)
    .resize({
      fit: sharp.fit.contain,
      width: sizeWidth
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(imgTarget);
}
```

In the above code I have omitted some syntactical sugar. You can find the complete script here: [https://github.com/kristofzerbe/kiko.io/blob/master/lib/pool-photo-generator.cjs](https://github.com/kristofzerbe/kiko.io/blob/master/lib/pool-photo-generator.cjs)

---

## The Runner

I integrated the call to the generator into my Hexo workflow, but also wrote a small runner to run it independently:

``` js
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_pool-photo-generator.cjs"
 */

const PoolPhotoGenerator = require("../lib/pool-photo-generator.cjs").PoolPhotoGenerator;

const inboundFolder = "../new_photos"; //my inbound folder
const poolFolder = "../static/pool"; //my pool folder

const generator = new PoolPhotoGenerator(inboundFolder, poolFolder);
generator.generate();
```

---

## Conclusion

Last but not least, in my existing Lightroom workflow, I configured the wonderful [plugin Jeffrey's "Collection Publisher"](http://regex.info/blog/lightroom-goodies/collection-publisher) to create the new pool photos directly through it into the Inbound folder. Once the changes are committed to Github, where the blog is hosted and the deployment action happens, the new header images are created and displayed at [https:\\kiko.io\photos}(https:\\\kiko.io\photos) and are available for a new post.