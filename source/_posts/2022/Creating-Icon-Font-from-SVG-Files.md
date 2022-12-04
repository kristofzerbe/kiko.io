---
slug: Creating-Icon-Font-from-SVG-Files
title: Creating Icon Font from SVG Files
subtitle:
date: 2022-09-17 15:08:34
photograph:
  file: D70_8789.jpg
  name: Old Master Veggies II
  link: https://500px.com/photo/1024009266
  socialmedia: /static/images/social-media/Creating-Icon-Font-from-SVG-Files.png
categories:
  - JavaScript
tags:
  - SVG
  - Font
  - Bundling
related:
  - SVG-Resources
  - Running-Rollup-with-Gulp
syndication: 
- host: Twitter
  url: https://twitter.com/kristofz/status/1571557065222508544
---

A several years ago I started building a little PWA and chose [Bootswatch 3.3.5.](https://bootswatch.com/3/) for theming. As it depends on Bootstrap I was able to use the [icons from Bootstrap](https://icons.getbootstrap.com/). At the beginning I needed only a handful of these icons, but with the time it became more and more difficult to find the right one, because the Bootstrap Glyphicons in version 3 included only around 250 icons and there was not always the right one. Also, the app was always lugging around well over 100 KB of extra files, of which I actually only needed a few kilobytes.

In another project I had used [Fontello](https://fontello.com/), where you can build and download your own icon font from a selection of available icons. Very nice, but I didn't feel like fiddling with project-specific configuration files on the Fontello website. But since you could upload your own SVG files in Fontello, which were then taken over into the font, the same had to work somehow with a Node.JS plugin!?

And yes [gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont) from [Nicolas Froidure](https://github.com/nfroidure) was exactly what I needed.

![gulp-iconfont on GitHub](..\Creating-Icon-Font-from-SVG-Files/gulp-iconfont.png)

---

## First Solution

Just copy a bunch of SVG files in a folder, run gulp and there was my own customized icon font with a tolerable size of around 20 kilobytes. At that time, [Thomas Jaggi](https://github.com/backflip) had taken care of the creation of a CSS file with the correct code points that matched the font with his tool [gulp-iconfont-css](https://www.npmjs.com/package/gulp-iconfont-css).

<!-- more -->

### Setup

First I needed some SVG files...

```md
|-- Images
    |-- SVG
        |-- alert.svg
        |-- cancel.svg
        |-- delete.svg
        |-- email.svg
        |-- flag.svg
        |-- link.svg
```

... and the NPM packages of my task runner [gulp.js](https://gulpjs.com/):

```
npm install --save-dev gulp-iconfont
npm install --save-dev gulp-iconfont-css
```

For generating the CSS file a template called ``_icons.css`` is shipped with the NPM package of **gulp-iconfont-css**, which can be customized as needed. In my case I just made a copy into a folder called ``Templates``, where I store all other template files I need for my PWA.

```CSS Templates/icons-template.css
@font-face {
  font-family: "<%= fontName %>";
  src: url('<%= fontName %>.eot');
  src: url('<%= fontName %>.eot?#iefix') format('eot'),
       url('<%= fontName %>.woff2') format('woff2'),
       url('<%= fontName %>.woff') format('woff'),
       url('<%= fontName %>.ttf') format('truetype'),
       url('<%= fontName %>.svg#<%= fontName %>') format('svg');
}

.<%= cssClass %>:before {
  font-family: "<%= fontName %>";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

<% _.each(glyphs, function(glyph) { %>
.<%= cssClass %>-<%= glyph.fileName %>:before {
  content: "\<%= glyph.codePoint %>";
}
<% }); %>
```

As I was using Gulp for building my app, I had to integrate a new task for creating the icon font in the ``gulpfile.js``:

```JS /gulpfile.js
var iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css');

var distFolder = 'Build';
var fontName = 'MyAppIcons'; 

gulp.task('create-iconfont', function(){
  return gulp.src(['Images/SVG/*.svg']) 
    .pipe(iconfontCss({
      fontName: fontName, 
      path: 'Templates/icons-template.css',
      targetPath: fontName + '.css',
      fontPath: distFolder
    }))
    .pipe(iconfont({
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      fontName: fontName, // Required
      fontHeight: 1001,
      normalize: true,
      prependUnicode: true, // Recommended
      timestamp: Math.round(Date.now() / 1000) // Recommended
    }))
    .pipe(gulp.dest(distFolder));
  });

gulp.task('build', 
  gulp.series(
    'create-iconfont'
    // other gulp tasks
  )
);
```

I little explanation on that ... First of all the task for **gulp-iconfont-css** has to be inserted before piping the files through **gulp-iconfont**, in order to create the CSS file properly. Following options were used:

#### gulp-iconfont-css

|Option|Description|
|---|---|
|``fontName``|Name that the generated font will have |
|``path``|Path to the template for generating CSS file|
|``targetPath``|Path where the CSS file will be generated|
|``fontPath``|Path to the icon font file|

#### gulp-iconfont

The library combines some other projects such as [svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont), [gulp-svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont#svgicons2svgfontoptions) and [gulp-svg2ttf](https://github.com/nfroidure/gulp-svg2ttf) to create the different font formats, because its just a wrapper around them.

|Option|Description|
|---|---|
|``formats``|Font file formats that will be created|
|``fontName``|Name of the font (for *svgicons2svgfont*)|
|``fontHeight``|Minimum height on scaling icons|
|``normalize``|Normalize icons by scaling them to the height of the highest icon (for *svgicons2svgfont*)|
|``prependUnicode``|Prefix files with their automatically allocated unicode code point (for *gulp-svgicons2svgfont*)|
|``timestamp``|Get consistent builds when watching files (for *gulp-svg2ttf*)|

### Output

After running ``gulp build`` all files needed were generated:

```md
|-- Build
    |-- MyAppIcons.css
    |-- MyAppIcons.eot
    |-- MyAppIcons.svg
    |-- MyAppIcons.ttf
    |-- MyAppIcons.woff
    |-- MyAppIcons.woff2
```

```CSS MyAppIcons.css
@font-face {
  font-family: "MyAppIcons";
  src: url('MyAppIcons.eot');
  src: url('MyAppIcons.eot?#iefix') format('eot'),
       url('MyAppIcons.woff2') format('woff2'),
       url('MyAppIcons.woff') format('woff'),
       url('MyAppIcons.ttf') format('truetype'),
       url('MyAppIcons.svg#MyAppIcons') format('svg');
}

.icon:before {
  font-family: "MyAppIcons";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-alert:before {
  content: "\E001";
}

.icon-cancel:before {
  content: "\E002";
}

.icon-delete:before {
  content: "\E003";
}

.icon-email:before {
  content: "\E004";
}

.icon-flag:before {
  content: "\E005";
}

.icon-link:before {
  content: "\E006";
}
```

All I had to do now, was to reference the new CSS file in my HTML and decorating my HTML tags with one of the new ``icon``-classes. Yes! My had my own icon font, just by copying some SVG files in a folder...

### The Problem

A while later, as my app grew, I needed some new icons, but in the meantime I had used the content codes elsewhere in static CSS files, for example with other pseudo-selectors like AFTER.

```CSS style.css
.my-special-link::after {
  font-family: "MyAppIcons";
  content: "\E006";
}
```

After copying a few new icon files to the SVG folder and running the build, I found that most of the icons didn't fit anymore!?

After a short research it was clear to me what had happened. With the insertion of the new SVG files, the order of the files in the folder was changed. But since the libraries processed this folder in alphabetical order, file by file, and simply incremented the codes to be assigned, the codes had simply shifted.

In the example above, this can be easily understood if we insert a file named **cloud.svg** here. The code for *cancel.svg* (``E002``) remains untouched, but *cloud.svg* now gets ``E003`` and *delete.svg* ``E004`` and so on. The hardwired icon for ``.my-special-link`` (``E006``) now showed instead of the link icon a flag icon.

---

## Newer Solution

I don't know when this happened, because I don't keep a constant eye on my little PWA and thus the further development of the related tools, but after having manually adjusted the moved codes two or three times now and once again wanting to change a few things on the PWA's icons, I had enough and came across the following sentence on the gulp-iconfont-css page on GitHub:

{% blockquote_alt "backflip (Thomas Jaggi)" "https://github.com/backflip/gulp-iconfont-css" %}
Recent versions of gulp-iconfont emit a glyphs (or codepoints < 4.0.0) event (see docs) which should likely be used instead of the workflow described below. However, it will continue to work as expected.
{% endblockquote_alt %}

Ahh, ok. I don't need the **gulp-iconfont-css** anymore. I can create the CSS file by myself. Lets see how the **gulp-iconfont** task looks, after rewriting:

```JS /gulpfile.js
var iconfont = require('gulp-iconfont');

var distFolder = 'Build';

var fontObj = {
  fontName: "MyAppIcons",
  cssClass: "icon"
};

gulp.task("create-iconfont", function () {
  return gulp
    .src(["Images/SVG/*.svg"])
    .pipe(
      iconfont({
        fontName: fontObj.fontName,
        fontHeight: 1001,
        formats: ["svg", "ttf", "eot", "woff", "woff2"],
        normalize: true,
        prependUnicode: true,
        timestamp: Math.round(Date.now() / 1000),
      })
    )
    .on("glyphs", function (glyphs, options) {

      fontObj.glyphs = glyphs.map(mapGlyphs);

      console.log(fontObj, options);

      gulp
        .src('Templates/icons-template.css')
        .pipe(consolidate("lodash", fontObj))
        .pipe(rename({ basename: fontObj.fontName }))
        .pipe(gulp.dest(distFolder));
    })
    .pipe(gulp.dest(distFolder));
});

function mapGlyphs(glyph) {
  return {
    fileName: glyph.name,
    codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase(),
  };
}

gulp.task('build', 
  gulp.series(
    'create-iconfont'
    // other gulp tasks
  )
);
```

First I have introduced a new ``fontObj`` variable to hold all informations for the untouched CSS template. The major difference is now, that ``iconfont`` is the only main task, with a subtask where the glyphs are processed directly via [``consolidate``](https://www.npmjs.com/package/consolidate). The ``mapGlyphs()`` function ensures that the file names with the CodePoints are transferred into an easily usable structure.

Works fine, but doesn't solve my problem with the shifted CodePoints, when inserting new SVG icons ... but someone remarked in a StackOverflow article to have a look at the test files of *gulp-iconfont*. **There, the SVG files carry as prefix the name of the CodePoints to be used for this file!**. Unfortunately, this feature is not documented, but it works...

```md
|-- Images
    |-- SVG
        |-- uE001-alert.svg
        |-- uE002-cancel.svg
        |-- uE003-delete.svg
        |-- uE004-email.svg
        |-- uE005-flag.svg
        |-- uE006-link.svg
        |-- uE007-cloud.svg
```

Now the order of the SVG files doesn't matter anymore. I just copy a new SVG file into the folder and rename it with a currently unused Unicode.

---

## Upcoming Solution: Using SVG Sprites

Interestingly, the inventor of **gulp-iconfont** page writes on the GiHub page:

{% blockquote_alt "Nicolas Froidure (nfroidure)" "https://github.com/nfroidure/gulp-iconfont" %}
Warning: While this plugin may still be useful for fonts generation or old browser support, you should consider using SVG icons directly. Indeed, when i created gulp-iconfont and all its related modules, using SVG icons was just not realistic for a wide browser suppport but i was already conviced that SVG was the future, that's why i wanted my SVG source files to sit separated in a folder. So, now, just enjoy switching to SVG with almost no effort :). Was a great open source journey with you all!
{% endblockquote_alt %}

This goes along with some older articles of Chris Coyer from CSSTricks:

* https://css-tricks.com/svg-sprites-use-better-icon-fonts/
* https://css-tricks.com/svg-symbol-good-choice-icons/
* https://github.com/w0rm/gulp-svgstore

Maybe it's time to say goodbye to icon fonts completely and use SVG files directly, but in my opinion this is not suitable for all needs. Especially if you work a lot with pesudo selectors, a general rebuild of the code and the UI will be necessary and you would do well to weigh the cost-benefit carefully.
