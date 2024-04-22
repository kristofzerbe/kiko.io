---
slug: Generate-Social-Media-Images-Automatically
title: Generate Social Media Images Automatically
subtitle: null
date: 2021-07-10T11:07:31.000Z
photograph:
  file: DSC_6776.jpg
  name: Color Brushes
  socialmedia: /static/images/social-media/Generate-Social-Media-Images-Automatically.png
project: Social Media Image Generator
categories:
  - Coding
tags:
  - JavaScript
  - Imaging
  - Hexo
  - GitHub
related:
  - Automatic-Header-Images-in-Hexo
  - Discoveries-11
  - A-New-Blog-Customizing-Hexo
---

From day one of this blog I wanted to combine two of my passions: tech stuff and photography. All these photos I have shot myself in recent years and now they are representing my thoughts & findings about digital technology. I wrote about my approach to provide these images in my post {% post_link Automatic-Header-Images-in-Hexo %}.

When I share one of my posts on social media I provide the appropriate image as a visual anchor to my writing. The technique behind this are the ``meta`` tags in the HTML of my posts:

```html
<!-- Schema.org for Google -->
<meta itemprop="image" content="https://kiko.io/photos/normal/DSC_6776.jpg">

<!-- Open Graph -->
<meta property="og:image" content="https://kiko.io/photos/normal/DSC_6776.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:image" content="https://kiko.io/photos/normal/DSC_6776.jpg">
```

There are several meta tags for different purposes regarding images. For more information see the links at the end of this post. To make a long story short: The sum of these approaches ensures that when an article is posted, the corresponding image is also displayed in the social media post.

But ... it's only the image, without a visual reference to the post itself. In this article I want to show you how to combine the photo with some meta information of the post automatically, to get a **Social Media Image**.

![Generation Flow](Generate-Social-Media-Images-Automatically/generation-flow.png)

<!-- more -->

---

Starting point of my thoughts were two posts from [**Drew McLellan** (Dynamic Social Sharing Images)](https://24ways.org/2018/dynamic-social-sharing-images/) and [**Ryan Filler** (Automatic Social Share Images)](https://www.ryanfiller.com/blog/automatic-social-share-images/), to which I have already referred in my post {% post_link Discoveries-11 %}.

Drew and Ryan utilizes the Node.JS library [Puppeteer](https://github.com/puppeteer/puppeteer), which runs a headless Chromium (or Chrome browser) over the DevTools protocol to process a web page ... for example to take a screenshot:

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

The idea is, to create a temporary HTML page with the photo and all necessary text for the social media image, take a screenshot of it and save it as PNG.

As I run my blog with [Hexo](https://hexo.io), a Static Site Generator (SSG), all information about a post is defined in a [Markdown](https://en.wikipedia.org/wiki/Markdown) (MD) file with some [Frontmatter](https://hexo.io/docs/front-matter.html) for the meta information.

Therefore, the **Social Media Image Generator** script in my mind had to do following tasks:

1. Iterate recursively over all MD files in Hexo ``_source/posts`` folder
2. Read the MD's Frontmatter (for information about photo, title, subtitle and more)
3. Create a temporary HTML file with the aid of a template
4. Run Puppeteer script over the temporary file to take a screenshot
5. Store the PNG to a central folder
6. Optimize the PNG
7. Change the meta tags in the posts to reference the new image

---

## The Frontmatter

I pimped the Frontmatter of the original Hexo configuration a bit, in order to provide an individual photo for each post:

```yaml
---
title: Generate Social Media Images Automatically
subtitle:
date: 2021-07-10 11:07:31
photograph:
  file: DSC_6776.jpg
  name: Color Brushes
  link: 'https://500px.com/photo/79965349'
categories:
  - JavaScript
...
---
```

Among other, there are the basic information, I wanted to have on my social media image: ``photograph.file`` (as the image itself) and ``title``, ``subtitle`` and ``categories`` (for the text on the image).

---

## The Script

**The complete script, in two versions (CommonJS and ES Module) is available at [GitHub](https://github.com/kristofzerbe/social-media-image-generator).**

tl;dr

My script became a JavaScript ``class``, separating the tasks in several methods and a constructor to get all necessary information as parameters. The class exports the main method ``generate()`` for calling the script:

```js social-media-image-generator.cjs
const _currentPath = __dirname;

var _postFolder;
var _photoFolder;
var _templateFile;
var _targetFolder;

class Generator {

  constructor(postFolder, photoFolder, templateFile, targetFolder) { 
    _postFolder = path.join(_currentPath, postFolder);
    _photoFolder = path.join(_currentPath, photoFolder);
    _templateFile = path.join(_currentPath, templateFile);
    _targetFolder = path.join(_currentPath, targetFolder);
  }

  generate() { ... }

  getPostFiles(dirPath, allFiles) { ... }

  async processPost(fileName, vars) { ... }

  async createImage(fileName, tempFile) { ... }
}
module.exports.Generator = Generator
```

I chose parameters, in order not to bind the script too tightly to my favourite SSG Hexo:

* ``_postFolder`` - Where are the post files stored?
* ``_photoFolder`` - Where are the photos stored?
* ``_templateFile`` - Where is the template file for the temporary HTML stored?
* ``_targetFolder`` - Where should the generated PNG files be stored?

### Get the posts

First task was to get all MD files out of the ``_postFolder`` recursively:

```js social-media-image-generator.cjs
const fs = require("fs");
const path = require("path");

class Generator {

  generate() {
    const postFiles = this.getPostFiles(_postFolder);
  }

  getPostFiles(dirPath, allFiles) {
      // READ FOLDER CONTENT
      let files = fs.readdirSync(dirPath);

      //INIT TEMP ARRAY
      allFiles = allFiles || [];

      files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          // CALL THE METHOD RECURSIVELY
          allFiles = this.getPostFiles(dirPath + "/" + file, allFiles)
        } else if (file.indexOf(".md")>=0) {
          // PUSH MD FILES TO TEMP ARRAY
          allFiles.push(path.join(dirPath, "/", file))
        }
      });
      return allFiles;
    }
  }

}
```

### Get the template and the temporary folder

I chose [Handlebars](https://handlebarsjs.com/) as the template engine to generate the temporary HTML file, because it is so easy to handle.

```html social-media-image.handlebars
<html>
  <head>
    <style>
      ...
    </style>
  </head>
  <body>
    <div class="wrap">
      ...
      <img id="photo" src="{{photo}}">
      <div class="container">
        ...
        <section id="title">
            {{#each categories}}
            <small>{{this}}</small>
            {{/each}}
            <h1>{{title}}</h1>
            {{#if subtitle}}
            <h2>{{subtitle}}</h2>
            {{/if}}
        </section>
      </div>    
    </div>
  </body>
</html>
...
```

Handlebars is able to compile a template into a JavaScript variable, what makes it easy to reuse it. Good for performance and stability.

As I wanted to utilize the template to generate temporary HTML files, I needed a temporary folder, which can be deleted afterwards.

```js social-media-image-generator.cjs
const handlebars = require("handlebars");

var _template;
const _tempFolder = "./~temp";

class Generator {

  constructor(postFolder, photoFolder, templateFile, targetFolder) { 
    
    ...

    // GET THE TEMPLATE CONTENT
    let source = fs.readFileSync(_templateFile).toString('utf8');

    // COMPILE THE TEMPLATE FOR FURTHER USE ONCE
    _template = handlebars.compile(source);

    // CREATE TEMP FOLDER IN THE WORKING DIRECTORY
    if (!fs.existsSync(_tempFolder)) {
      fs.mkdirSync(_tempFolder);
    }
  }

}
```

### Process the posts

Second step was to process all the posts found.

```js social-media-image-generator.cjs
const fs = require("fs");
const path = require("path");
const url = require("url");
const frontmatter = require("front-matter");

const _tempFolder = "./~temp";

class Generator {

  generate() {
      let self = this;

      const postFiles = this.getPostFiles(_postFolder);

      var postsProcessed = 0;

      // ITERATE OVER ALL POSTS
      postFiles.forEach((file) => {
        fs.readFile(file, 'utf8', function(err, data) {
          if (err) throw err

          // READ THE FRONTMATTER
          let content = frontmatter(data);

          let fileName = path.basename(file, path.extname(file));
      
          // only process posts with defined photograph file 
          // and if social media file is missing
          if (content.attributes.photograph?.file && 
              !fs.existsSync(path.join(_targetFolder, fileName + ".png"))) {
            
            // CALL PROCESSING METHOD
            self.processPost(
              fileName,
              {
                title: content.attributes.title, 
                subtitle: content.attributes.subtitle, 
                categories: content.attributes.categories,
                photo: url.pathToFileURL(
                  path.join(_photoFolder, content.attributes.photograph.file)
                )
              })
              .then(() => {

                // DELETE TEMP FOLDER AFTER PROCESSING
                if (postsProcessed === postFiles.length) {
                  fs.rmdirSync(_tempFolder, { recursive: true });
                }
              });
          }
          postsProcessed += 1;
        })
      });
  }

  async processPost(fileName, vars) {

      // GET HTML FOR POST VIA HANDLEBARS
      let html = _template(vars);

      let tempFile = path.join(_tempFolder, fileName + ".html");

      //WRITE TEMPORARY HTML FILE
      fs.writeFile(tempFile, html, (err) => {
        if(err) { throw(err); }
        //console.log(tempFile + " saved");
      });

      //CALL IMAGING METHOD
      await this.createImage(fileName, tempFile);

      return;
    }
}
```

### Get the image

As I had the temporary HTML file now, I only had to open up a Puppeteer instance, load the file and take the screenshot:

```js
const puppeteer = require("puppeteer/cjs-entry");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");

class Generator {

  async createImage(fileName, tempFile) {
    var self = this;

    // LAUNCH CHROMIUM AND A NEW PAGE
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // LOAD THE TEMPORARY HTML FILE
    await page.goto(url.pathToFileURL(tempFile));

    // SET THE EXACT WIDTH & HEIGHT
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });

    let imgFile = path.join(_targetFolder, fileName + ".png");

    // TAKE SCREENSHOT INTO PNG FILE AT TARGET FOLDER
    await page.screenshot({
      path: imgFile
    });

    await browser.close();

    // OPTIMIZE THE PNG FILE
    await imagemin([imgFile], 'build', {
      plugins: [
        imageminPngquant({ quality: '75-90' })
      ]
    });

    return;
  }

}
```

---

## Running the script

If you already have lots of post in MD files and appropriate photographs, you can create an execution script...

```js run-social-media-images.cjs
 const Generator = require("./social-media-image-generator.cjs").Generator;

 const postFolder = process.argv[2].toString();
 const photoFolder = process.argv[3].toString();
 const templateFile = process.argv[4].toString();
 const targetFolder = process.argv[5].toString();

 const generator = new Generator(postFolder, photoFolder, templateFile, targetFolder);
 generator.generate();
```

... and run it as follows:

```js Example execution in the console...
node "./lib/run-social-media-images.cjs" "../source/_posts" "../static/photos/normal" "../templates/social-media-image.handlebars" "../static/images/social-media"
```

---

## Hexo Integration

In case you are running your blog with Hexo also, you can hook on the ``ready`` event to let it run on ``hexo generate`` automatically:

```js /scripts/on-ready-generate-social-media-images.js
const log = require('hexo-log')({
    debug: false,
    silent: false
});

const Generator = require("../lib/social-media-image-generator.cjs").Generator;

hexo.on("ready", function() {
    
    log.info("Running Social-Media-Image-Generator...");

    const postFolder = "../source/_posts";
    const photoFolder = "../static/photos/normal";
    const templateFile = "../templates/social-media-image.handlebars";
    const targetFolder = "../static/images/social-media";

    const generator = new Generator(postFolder, photoFolder, templateFile, targetFolder);
    generator.generate();

});
```

It is important not to store the ``social-media-image-generator.cjs`` in Hexo's ``scripts`` folder like the event script above, because Hexo will try to execute it automatically. You have to create a different folder like ``lib`` to store and reference it from there.

---

## The Result

Here is the result from my approach in Hexo, as I run ``hexo generate`` for this blog post:

<img src="/images/social-media/Generate-Social-Media-Images-Automatically.png" />

The very last thing I had to do, was to change the source of the image meta tag mentioned at the top, to reference to newly created social media image.

Here's the new image in action at Twitter:

![Tweet Preview](Generate-Social-Media-Images-Automatically/twitter.png)

---

## More Info

{% moreinfo '{ "list": [
  [
    "CSS Tricks", "The Essential Meta Tags for Social Media",
    "https://css-tricks.com/essential-meta-tags-social-media/"
  ],
  [
    "The Open Graph Protocol", "The Open Graph Protocol",
    "https://opengraphprotocol.org/"
  ],
  [
    "Drew McLellan", "Dynamic Social Sharing Images",
    "https://24ways.org/2018/dynamic-social-sharing-images/"
  ],
  [
    "Ryan Filler", "Automatic Social Share Images",
    "https://www.ryanfiller.com/blog/automatic-social-share-images/"
  ],
  [
    "The GitHub Blog", "A framework for building Open Graph images",
    "https://github.blog/2021-06-22-framework-building-open-graph-images/"
  ]
]}' %}