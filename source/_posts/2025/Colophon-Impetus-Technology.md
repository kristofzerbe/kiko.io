---
slug: Colophon-Impetus-Technology
title: Colophon - Impetus & Technology
subtitle:
date: 2025-04-21 12:32:00
photograph:
  file: DSC_6766.jpg
  name: Old Dice
  socialmedia: /static/images/social-media/Colophon-Impetus-Technology.png
series: A New Blog
categories:
  - Misc
tags:
  - Hexo
related:
  - App-Defaults-2024
  - Include-and-provide-JSON-data-in-Hexo-EJS-Templates
  - The-State-of-the-Blog
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114376388233094484
---

Ever since I introduced [Slash Pages](/slashes) on my blog about a year ago, the entry "**Colophon**" has been bumming around in my to-do list. Intended to describe how this blog works and how I deal with it, this endeavor has taken on such proportions in my head that the "coming soon" sticker has become very resistant. I would now like to counter this with a new strategy: write it in chunks. I'm going to tackle the individual sections in a loose sequence, starting with the why and the choice of technology ...

<!-- more -->

> "Colophon" is a design word for 'how it was made', with a silent 'why' ...

---

## Impetus

In September 2019, I had a problem with the integration of ActiveDirectory data in SQL and wanted to document the solution somewhere. I remembered my orphaned blogger.com thingy running under the domain kiko.io, but found it rather creepy and no longer in keeping with the spirit of the times. Something new was needed and I wanted full control over the code and the posts. I was particularly excited about the **Static Site Generators** based on Node.JS that were emerging at the time, because they stood out from the server-side construction method using ASP.NET or PHP that was prevalent at the time and generated pure HTML as before.

My old blog at zerbit.de, where I wrote about technology stuff between [2005](https://web.archive.org/web/20050508184754/http://www.zerbit.de/index.asp) and [2013](https://web.archive.org/web/20130117000914/http://zerbit.de/default.aspx) in a very similar way to today, but in German and under ASP Classic or later ASP.NET on Windows Server 2003, no longer existed at that time. I also wanted to start something completely new and write in English, firstly to increase the possible audience and secondly to train myself in the only foreign language I was still familiar with from my school days.

{% image_slide
  "/colophon/zerbit-2005.png|zerbit.de 2005|480"
  "/colophon/zerbit-2013.png|zerbit.de 2013|480"
  "/colophon/kiko-io-2014.png|kiko.io 2014 (blogger.com)|480"
%}

Inevitably, I ask myself why I blog at all, keyword: "audience". To save my future self from having to research again? Surely. To attract attention? Surely. To make a name for myself? Certainly, that too. Joel Chrono put it quite well in a recent post [Blogging Expectations](https://joelchrono.xyz/blog/blogging-expectations/). I think every blogger wants to be read, otherwise they would write it on the wall in the basement. Not admitting that is self-deception. Am I being read? More likely no. Can I deal with it? Yes. Am I happy about any positive feedback? Definitely :D

---

## Technology

My selection in 2019 for the new blog was short and fell on [**Hexo**](https://hexo.io), an open source **SSG** that is more commonly used in Asia. It stood out for me because it seemed to be infinitely expandable with themes, plugins and plenty of API. This is true, but I quickly learned that complexity, a lack of documentation and a very small number of maintainers get in the way at some point.

I used Hexo's default theme called **Landscape** because the layout includes a large hero photo and I intended to integrate my many photos into the design right from the start. In the meantime, I have done this so excessively that my site will probably never get an A+ performance ranking. In addition to the styles, a Hexo theme also contains some of the functionality of the system, which I have revised over the years to such an extent that I will never be able to use another theme, making the whole concept obsolete for me. Unfortunately, you can't expand or omit themes in Hexo.

What was new to me at the time was the template engine [**EJS**](https://ejs.co/) integrated into Hexo, which is used by so-called generators to render the desired HTML from simple Markdown files in which the posts are stored. In the [**Frontmatter**](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g) (YAML format) in the header of each Markdown file, the parameters and additional information of a post are defined which the generator needs for its work.

Hexo offers the option of creating simple **Pages** and **Posts** with a time reference, as well as categorization and keywording, whereby only the latter are listed in the various overview pages. Using [Tag Plugins](/projects/hexo-tag-plugins/) based on [**Nunjucks**](https://mozilla.github.io/nunjucks/), more complex HTML content can also be inserted into Markdown and I have made some use of this.

### Plugins & Tools

Hexo can be easily extended to your own needs using plugins, and in my environment some are now indispensable, as are other JS tools that I use in self-written generators:

- [hexo-asset-link](https://github.com/liolok/hexo-asset-link) - Convert Markdown style asset links to HTML
- [hexo-generator-alias](https://github.com/hexojs/hexo-generator-alias) - Generate alias pages for redirecting to posts
- [hexo-generator-anything](https://github.com/kristofzerbe/hexo-generator-anything/tree/main) - Generate index pages from custom front matter variables
- [hexo-generator-copy](https://github.com/niahoo/hexo-generator-copy) - Copy static files from static_dir to public_dir
- [hexo-hide-posts](https://github.com/prinsss/hexo-hide-posts) - Hide specific posts via Frontmatter
- [feed2json](https://github.com/earthboundkid/feed2json) - Convert RSS/Atom feeds to JSON
- [front-matter](https://github.com/jxson/front-matter) - Extract meta data from documents
- [handlebars](https://github.com/handlebars-lang/handlebars.js) - Build semantic templates
- [puppeteer](https://github.com/puppeteer/puppeteer) - Control headless Chrome
- [exifr](https://github.com/MikeKovarik/exifr) - Read EXIF from image
- [sharp](https://github.com/lovell/sharp) - Convert images
- [imagemin](https://github.com/imagemin/imagemin) - Minify images
- [pagefind](https://github.com/cloudcannon/pagefind) - Create static search index

### Build

I rely on [**NPM**](https://www.npmjs.com/) and [**Grunt**](https://gruntjs.com/) to build the blog. Grunt is responsible for downloading the fonts used and for bundling and minimizing the external asset scripts and styles.

To build and start my blog locally from scratch, the following commands are required in sequence:

1. grunt
2. hexo clean
3. hexo generate
4. npx pagefind
5. hexo server

I have created various combinations of these as **NPM run scripts**, including `npm run build` (steps 1, 3 and 4) for deployment.

### JavaScript Client-Libraries

For a little more functionality, I use a few external scripts that are integrated into the HTML pages that need them:

- [Macy](https://github.com/bigbite/macy.js) - Masonry layout
- [Spotlight](https://github.com/nextapps-de/spotlight) - Lightbox gallery
- [Tiny Slider 2](https://github.com/ganlanyuan/tiny-slider) - Image slider
- [Medium-Zoom](https://github.com/francoischalifour/medium-zoom) - Zooming images
- [Image Compare Viewer](https://github.com/kylewetton/image-compare-viewer) - Compare before and after images
- [downupPopup.js](https://github.com/ali-dincer/downupPopup.js) - Bottom Sheet dialog
- [AutoTyping.js](https://github.com/tsanak/autotyping) - Animated typing effects
- [LC Select](https://github.com/LCweb-ita/LC-select) - Featured vanilla javascript dropdowns
- [Leaflet](https://leafletjs.com/) - Mobile-friendly interactive maps
- [Scroll-Timeline](https://github.com/flackr/scroll-timeline) - Reading progress bar
- [QR-Code-Styling](https://github.com/kozakdenys/qr-code-styling) - Generating QR codes with a logo and styling
- [Nearest-Color](https://github.com/dtao/nearest-color) - Find the nearest color
- [TinyColor](https://github.com/bgrins/TinyColor) - Color manipulation and conversion
- [ColorNames](https://github.com/timoxley/colornames) - Maps color names to HEX color values
- [Vibrant.js](https://github.com/jariz/vibrant.js/) - Extract prominent colors from an image

---

[Colophon](/colophon) will be continued ...

I have repeatedly written about certain aspects of this blog in the [A New Blog](/series/a-new-blog) series in recent years. Don't miss it.
