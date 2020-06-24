---
title: Automatic Header Images in Hexo
photograph:
  file: D70_7344.jpg
  name: Non Toccare
  link: 'https://500px.com/photo/1017605762'
tags:
  - Hexo
  - Blogging
categories:
  - Tools
date: 2020-06-22 17:49:16
subtitle:
---

Every article in this blog has an individual header image, to bring a little bit color into it. In this post I will show you how I deal with the images in using and automatic provisioning.

For serving these pictures I use a static folder, as described in [A New Blog: Customizing Hexo](/categories/Tools/A-New-Blog-Customizing-Hexo/). The hard work is done by the plugin [Hexo Generator Copy](https://github.com/niahoo/hexo-generator-copy), which copies the static files into the ``public_dir`` while generating.

<!-- more -->

## Static File Structure

It is always advisable to provide one image for every device class, in order to save bandwidth and make the page loading as fast as possible:

```txt
| static/
   | photos/
      | mobile/
         | my-lovely-picture.jpg
         | ...
      | tablet/
         | my-lovely-picture.jpg
         | ...
      | normal/
         | my-lovely-picture.jpg
         | ...
```

The ``mobile`` images are at least 480 pixels wide, the ``tablet`` variants 768 pixels and the standard or ``normal`` one 1280 pixels. 

While creating the JPG files, it is important to compress them with a tool like [JPEGMini](https://www.jpegmini.com/) to save data while loading.

## Binding

In order to bind a picture with some additional information to an article, I have extended the Frontmatter of every post:

```yaml
photograph:
    file: 'my-lovely-image.jpg'
    name: 'My Lovely Image'
    link: 'https://500px.com/photo/123456789/My-Lovely-Image'
```

## Usage in Theme

It relies on your Hexo theme, how to use a header image. In my theme (derived from the standard theme) I just added following code in the ``article.js`` to show the individual header image as a background image at the top of the article:

```html
<% if (!index && post.photograph){ %>
<style>
  #banner {
    background-size: cover;
  }
  @media screen and (max-width: 479px) {
    #banner { background-image:
      linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 75%),
      url("/photos/mobile/<%= post.photograph.file %>"); }
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    #banner { background-image: 
      linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 75%),
      url("/photos/tablet/<%= post.photograph.file %>"); }
  }
  @media screen and (min-width: 768px) {
    #banner { background-image: 
      linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 75%),
      url("/photos/normal/<%= post.photograph.file %>"); }
  }
</style>
<script>
  var photoLink = document.getElementById("header-photo-link");
  photoLink.href = "<%= post.photograph.link%>";
  photoLink.innerHTML = "see <strong><%= post.photograph.name%></strong> at 500px";
</script>
<% } %>
```

Important part here is the use of the Frontmatter data ``post.photograph.file`` in the URL of the background CSS. The script fills the additional information into the absolute positioned element ``header-photo-link`` which is placed on top of the header.

## Pooling Images

As it is time consuming to generate the necessary images, I have created another static folder ``pool`` to store prepared files and a text file with the additional information about the image. The structure of ``pool`` is different to ``photos``, because of my image workflow and some limitations of automating the provisioning.

```txt
| static/
   | pool/
      | my-lovely-picture/
         | meta.txt
         | mobile.jpg
         | normal.jpg
         | tablet.jpg
      | ...
```
The ``meta.txt`` is a simple text file with two lines of text: first the name of the image and second the Url to link to, which will be inserted in the appropriate Frontmatter fields on creating a new post:

```txt
My Lovely Image
https://500px.com/photo/123456789/My-Lovely-Image
```

## Automate binding and provisioning on new post

Developers are lazy and I do not make an exception. Having all these pool images and the meta informations, it would be nice, if Hexo just picks and processes one of the pool folders automatically, when I'm creating a new post by calling ``hexo new "My shiny new post"`` ... and it was easier then I thought.

### Where to place the code for the automatism

Hexo has a great [API](https://hexo.io/api/) to write [plugins](https://hexo.io/plugins/) and it is not very difficult to setup a new plugin for this, which can be published to the [NPM registry](https://www.npmjs.com/search?q=hexo). But it is also possible to extend Hexo's functionality by using a simple script. All you need is a **``script``** folder in the root of your Hexo project. Any JS files which is placed there, will be executed by Hexo.

Therefore, lets use a script called ``\scripts\process-photo-on-new.js`` ...

### Things an automatism should do - Step by Step

1. Hook into the creation of a post
2. Pick randomly one of the pool images
3. Place the content of the meta.txt in the Frontmatter
4. Move the 3 device-dependend images into the ``photos`` folder

#### Step 1 - Hook into the creation of a post

The needed event, the automatism can hook on, is:

```javascript
hexo.on('new', function(data){
  //
});
```

It will be executed every time you call the ``hexo new`` command. The parameter ``data`` is an object with two fields:

* ``path``  
Full path to the MD file of the new post

* ``content``  
Complete content of the scaffold (template), which Hexo has used to create the new post; default is ``/scaffolds/post.md``.

By preloading the Hexo Front matter library and parsing ``data.content`` we get access to the definition of the new post:

```javascript
const front = require('hexo-front-matter');

hexo.on('new', function(post){

  // parse article content
  var post = front.parse(data.content);
});
```

#### Step 2 - Pick randomly one of the pool images

There are some build-in variables to get the full path, for example, of the ``source`` folder, we can use to define the needed paths to the ``pool`` and the ``photo`` folder.

```javascript
const front = require('hexo-front-matter');

hexo.on('new', function(post){
  var post = front.parse(data.content);

  // set the path variables
  var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "pool";
  var photosDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "photos";
});
```

Next, we need to preload the Hexo FS library for file access, to list the content of the ``poolDir``, including the subfolders, and filter out the meta files. Out of the resulting array we pick one randomly, to use for the new post:

```javascript
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

hexo.on('new', function(post){
  var post = front.parse(data.content);

  var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "pool";
  var photosDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "photos";

  // list all files
  var files = fs.listDirSync(poolDir);

  // filter the list to get meta files of each subfolder
  var metaFiles = files.filter(file => file.match(/.*[\\]meta.txt/g));

  // pick one randomly
  var metaFile = metaFiles[Math.floor(Math.random() * metaFiles.length)];

  // get the name of the picked photo
  var photoName = metaFile.split("\\")[0];
});
```

#### Step 3 - Place the content of the meta.txt in the Frontmatter

Now we have to read the meta file, place the data in the Frontmatter and save the article file:

```javascript
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

hexo.on('new', function(post){
  var post = front.parse(data.content);

  var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "pool";
  var photosDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "photos";
  
  var files = fs.listDirSync(poolDir);
  var metaFiles = files.filter(file => file.match(/.*[\\]meta.txt/g));
  var metaFile = metaFiles[Math.floor(Math.random() * metaFiles.length)];

  // read meta file
  var meta = fs.readFileSync(poolDir + "\\" + metaFile);
  var metas = meta.split("\n");

  // place file and additional info in the Frontmatter
  post.photograph.file = photoName + ".jpg";
  post.photograph.name = metas[0];
  post.photograph.link = metas[1];

  // convert content back
  postStr = front.stringify(post);
  postStr = '---\n' + postStr;

  // store article
  fs.writeFile(data.path, postStr, 'utf-8');
});
```

#### Step 4 - Move the 3 device-dependend images into the photos folder

Last but not least, we have to move the pool images into the ``photos`` folder and remove the pool folder with all its processed content:

```javascript
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

hexo.on('new', function(post){
  var post = front.parse(data.content);

  var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "pool";
  var photosDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "photos";
  
  var files = fs.listDirSync(poolDir);
  var metaFiles = files.filter(file => file.match(/.*[\\]meta.txt/g));
  var metaFile = metaFiles[Math.floor(Math.random() * metaFiles.length)];

  var meta = fs.readFileSync(poolDir + "\\" + metaFile);
  var metas = meta.split("\n");

  post.photograph.file = photoName + ".jpg";
  post.photograph.name = metas[0];
  post.photograph.link = metas[1];

  postStr = front.stringify(post);
  postStr = '---\n' + postStr;

  fs.writeFile(data.path, postStr, 'utf-8');

  //copy normal image
  fs.copyFile(
    poolDir + "\\" + photoName + "\\normal.jpg",
    photosDir + "\\normal\\" + photoName + ".jpg",
      function() {

        //copy tablet image
        fs.copyFile(
          poolDir + "\\" + photoName + "\\tablet.jpg",
          photosDir + "\\tablet\\" + photoName + ".jpg",
          function() {

            //copy mobile image
            fs.copyFile(
              poolDir + "\\" + photoName + "\\mobile.jpg",
              photosDir + "\\mobile\\" + photoName + ".jpg",
              function() {

                //remove orphaned pool folder
                fs.rmdirSync(poolDir + "\\" + photoName);
              });
          });
      });

});
```

Now it so easy to write a new post, because almost everything is set and I can concentrate on the article. Also, it is a nice surprise to see, which photo the script has chosen. The only thing I have to do from time to time, is to refill the pool folder with new images.
