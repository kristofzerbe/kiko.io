---
title: Colophon
date: 2024-05-28 09:58:31
updated: 2025-04-21 12:32:00
permalink: /colophon
photograph:
  file: $23-07-Mallorca-0773.jpg
  name: Table Greenery
caption: "/Colophon"
teaser: "A few words about how this blog is structured, created and hosted"
---

<section class="impetus">

## Impetus

In September 2019, I had a problem with the integration of ActiveDirectory data in SQL and wanted to document the solution somewhere. I remembered my orphaned blogger.com thingy running under the domain kiko.io, but found it rather creepy and no longer in keeping with the spirit of the times. Something new was needed and I wanted full control over the code and the posts. I was particularly excited about the **Static Site Generators** based on Node.JS that were emerging at the time, because they stood out from the server-side construction method using ASP.NET or PHP that was prevalent at the time and generated pure HTML as before.

My old blog at zerbit.de, where I wrote about technology stuff between [2005](https://web.archive.org/web/20050508184754/http://www.zerbit.de/index.asp) and [2013](https://web.archive.org/web/20130117000914/http://zerbit.de/default.aspx) in a very similar way to today, but in German and under ASP Classic or later ASP.NET on Windows Server 2003, no longer existed at that time. I also wanted to start something completely new and write in English, firstly to increase the possible audience and secondly to train myself in the only foreign language I was still familiar with from my school days.

<div class="image-slider" id="isc1">
<div><img width="480" src="/colophon/zerbit-2005.png" alt="zerbit.de 2005" /></div>
<div><img width="480" src="/colophon/zerbit-2013.png" alt="zerbit.de 2013" /></div>
<div><img width="480" src="/colophon/kiko-io-2014.png" alt="kiko.io 2014 (blogger.com)" /></div>
</div>
<script>tns({container:"#isc1",items:1,slideBy:"page",controls:false,nav:true});</script>

Inevitably, I ask myself why I blog at all, keyword: "audience". To save my future self from having to research again? Surely. To attract attention? Surely. To make a name for myself? Certainly, that too. Joel Chrono put it quite well in a recent post [Blogging Expectations](https://joelchrono.xyz/blog/blogging-expectations/). I think every blogger wants to be read, otherwise they would write it on the wall in the basement. Not admitting that is self-deception. Am I being read? More likely no. Can I deal with it? Yes. Am I happy about any positive feedback? Definitely :D

</section>

<section class="technology">

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

</section>

<section class="Hosting">

## Hosting

I host the entire blog publicly on [**GitHub**](https://github.com/kristofzerbe/kiko.io) and thus commit every change, be it a code adjustment or a new post. Web hosting is handled by [**GitHub Pages**](https://pages.github.com/) via the address [https://kristofzerbe.github.io/kiko.io](https://kristofzerbe.github.io/kiko.io), to which I have bound my domain kiko.io via DNS entries.

My domains are hosted at [**United Domains**](https://www.united-domains.de/) and 10 other domains point to the main domain kiko.io, which are parked there:

- kristofz.de
- kristofz.me
- kristofz.net
- kristofz.social
- kristofzer.be
- kristofzerbe.com
- kristofzerbe.de
- kristof-zerbe.de
- zerbit.de
- zerbit.net

</section>

<section class="Deployment">

## Deployment

A commit to the GitHub repository automatically triggers the deployment of the entire code via a dedicated GitHub action called [``Build & Deploy kiko.io``](https://github.com/kristofzerbe/kiko.io/blob/master/.github/workflows/build-and-deploy.yml), which contains three jobs:

##### A. build

  1. Checkout
  2. NPM Install
  3. Run Build
  4. Commit Changes on MD Files (updated)
  5. Upload artifact

##### B. deploy  

1. Deploy artifact to GitHub Pages

##### C. finish  

1. Checkout
2. NPM Install
3. Run Webmention

In the last step, the code is checked out again to be able to execute a Hexo Console script called [``webmention``](https://github.com/kristofzerbe/kiko.io/blob/master/scripts/console/console-webmentions.js), which sends [**webmentions**](https://indieweb.org/Webmention) for all URLs of the latest blog post. Unfortunately, this only works in an extra step because the referring page of the webmention has to be online at this point.

</section>

<section class="Local">

## Local

I like to work with different device classes without interruption, be it my smartphone, tablet or various notebooks. That's why the local repository is stored entirely in an [**OneDrive**](https://OneDrive.com) folder, which is synchronized to all devices. On Android, this is done by [**OneSync**](https://play.google.com/store/apps/details?id=com.ttxapps.onesyncv2), although the Git files are not taken into account there, as there is no really useful Git client for Android.

As soon as I have finished a new post or another change, I commit to GitHub from the computer I am currently sitting at and the deployment is executed automatically as described above.

</section>

<section class="Writing">

## Writing

I write my posts mainly in my favorite editor, [**Visual Studio Code**](https://code.visualstudio.com/), where I also develop all infrastructure code related to my SSG Hexo. This is the only place where I can start the whole thing and see if it works. The only exception is Android on my smartphone, as there is no reasonable VS Code-like solution for this. Here, I switch to [**Obsidian**](https://obsidian.md/), my central knowledge base. All drafts and posts that have already been created are automatically synchronized to my Obsidian vault, which also lives on OneDrive, using [**SyncBack Pro**](https://www.2brightsparks.com/syncback/sbpro.html) whenever changes are made. On Android, [**OneSync**](https://play.google.com/store/apps/details?id=com.ttxapps.onesyncv2) takes care of this job. This means that I also have everything automatically on my smartphone.

For completely new posts, I have a special folder in Obsidian called ``21.11 ToBlog`` and a suitable template for my Hexo structure. Back at my computer, all I have to do is create a post in the command line with a photo and all the extras and copy the content into Markdown.

For my notes, I even use an Obsidian-first strategy: Using the plugin [**QuickAdd**](https://github.com/chhoumann/quickadd) and a corresponding template, I create a new notes file in the synchronized notes folder ``source/_notes`` and then only have to execute the Git commit on my computer to publish the note. There are five types of notes: Standard, #TIL, Like, Bookmark, and Reply. They differ only slightly in the FrontMatter, but become important later when the WebMentions are automatically sent during the build. For notes that are still in the rough, I have a folder called ``21.12 ToNote`` in Obsidian, where I can store things that I'm not ready to publish yet, because not everything I write ends up seeing the light of day.

### Language

Obviously, English is not my native language, especially if you look at my posts up until around 2023. They are a little stiff for my taste and not particularly rich in vocabulary. I do have my own feeling for the language, but it's based on school English and not enough practice. To make life easier for my readers (and myself), I currently write all my posts in my own language, German, and then run them through [**DeepL**](https://www.deepl.com/de/translator), an AI-powered translation app from Cologne. I then adapt the results to my own sense of language and hope that it sounds reasonably good. For certain posts, I also create a language variant of the German text on the blog.

</section>

More coming soon ...
