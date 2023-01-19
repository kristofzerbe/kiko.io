---
slug: Integration-of-Pagefind-in-Hexo
title: Integration of Pagefind in Hexo
subtitle: Adding a low-bandwidth local search to a static Hexo-powered website
date: 2023-01-19 13:24:00
photograph:
  file: 22-08 Bretagne-Jersey-0201.jpg
  name: Proud Vespa
  link: https://500px.com/photo/1056125429/proud-vespa-by-kristof-zerbe
series: A New Blog
categories:
  - Tools
tags:
  - Hexo
  - Search
  - Blogging
related:
  - Pattern-for-dynamic-Hexo-pages
  - The-State-of-the-Blog
  - Show-related-posts-in-Hexo
syndication:
  - host: Mastodon
    url: null
---

From the beginning of this blog I wanted to provide some kind of full text search in order to give my users the ability to find stuff by keyword.

There are a few Hexo plugins that have approached the subject, but it was not really satisfactory and performant. So I relied on the worlds biggest search engine: Google. A search button, which drives out a small input field and with the pressing of the ENTER key the form was sent via GET to ``//google.com/search``.

![Google Site Search on kiko.io](Integration-of-Pagefind-in-Hexo/google-site-search.png)

The procedure was simple, but also burdened with the fact that I always expose my users to Google. At least until now ... :)

[Bryce Wray](https://mstdn.social/@BryceWrayTX) set me on a new path with his post [Sweeter searches with Pagefind](https://www.brycewray.com/posts/2022/12/sweeter-searches-pagefind/), in which he talks about his experience with the still fairly fresh tool [**Pagefind**](https://pagefind.app/)...

{% blockquote_alt "Liam Bigelow @ pagefind.app" "https://pagefind.app/" %}
Pagefind is a fully static search library that aims to perform well on large sites, while using as little of your users’ bandwidth as possible, and without hosting any infrastructure ...
{% endblockquote_alt %}

Pardon me? A full text search for SSG's running completely in the browser? It sounded so great that I had to try it right away. And what can I say ... it not only works fantastically well, but is also extremely easy to implement. Of course, you have to consider a few things, especially with regard to the SSG Hexo I use, but I didn't find any big hurdles, also because the tool is so [well documented](https://pageind.app). Let's see what my implementation looks like...

<!-- more -->

---

## The Tool in Brief

Pagefind it is a Node.js tool and is started via the Node Package Runner (npx) and **runs against the static files already created during the build**. It indexes all the desired pages or even parts of the pages and creates meta and index files for them in a special build folder, which can be retrieved later via JavaScript. To make things a bit more user-friendly, Pagefind also directly generates the necessary JavaScript and CSS files for a UI.

... but Liam can explain better how it works: 

{% video <iframe src="https://www.youtube.com/embed/74lsEXqRQys" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> %}

---

## Implementation in Hexo

First of all I decided to store all necessary parameters in a supported [config file](https://pagefind.app/docs/config-sources/) in the root of my blog project.

```yaml pagefind.yml
source: docs
bundle_dir: pagefind
exclude_selectors:
  - ".note-list"
  - ".anything-list"
  - ".article-related"
```

``source`` defines the relative folder where all static files are created during the build and which should now be indexed.

``bundle_dir`` overrides the default storage folder called ``_pagefind``, which is created in the build folder for the search files. This is necessary because my blog is built and hosted on **Github Pages** and the responsible GitHub Action goes over folders with a starting underscore on deployment. More info on that [here](https://github.com/orgs/community/discussions/23640) and [here](https://github.com/CloudCannon/pagefind/discussions/126).

``exclude_selectors`` is a list of all those page elements whose content should NOT be indexed, but more about that later.

With another setting called ``glob`` it is possible to tell Pagefind which files to index, but this currently has its pitfalls when trying to exclude some. Liam already [has this on the screen](https://github.com/CloudCannon/pagefind/discussions/127) for one of the next versions.

---

### Limiting Indexing Content

A post on a web page never stands alone, but is surrounded by other elements such as navigation, further links, etc. However, these addional elements should not end up in the index. Pagefind skips some of them like ``nav``, ``form`` or ``script`` automatically, but there always remain some that should be excluded by hand.

Best option to narrow down the indexable content is the use of the attribute ``data-pagefind-body``. Instead of excluding something, tell Pagefind what to include. However, this approach makes it easier, but also has consequences:

{% blockquote_alt "pagefind.app" "https://pagefind.app/docs/indexing/" %}
If *data-pagefind-body* is found **anywhere** on your site, any pages without this attribute will be removed from your index.
{% endblockquote_alt %}

In my case, I had a few places in my templates that I needed to add the attribute to:

| Type | File | Element |
|---|---|---|
| Post | _partial/article.ejs | article |
| Notes | note.ejs | article |
| Page | page.ejs | .page-content |
| Dynamic Page | [name].ejs | .page-content |
| Anything Page | _partial/anything-page-item.ejs | .anything-content |

All elements inside of the elements attributed like that, I had to exclude via the setting ``exclude_selectors`` in the config (see above).

---

### Specifying Meta Information

It was important to me to show the date of a post in the search result, because nothing is as inaccurate as a post that is many years old. With Pagefind you select the HTML element in the templates in which the meta value is located and attribute it with ``data-pagefind-meta``, for example:

```html date.ejs
<time class="published dt-published" itemprop="datePublished"
      data-pagefind-meta="date">
  <%= date(page.date, 'DD MMM YYYY') %>
</time>
```

As title for the search hit Pagefind searches for H1 tags and takes the value of the last tag it finds. If you are not sure that there is always only one H1 tag on the page (and for me it is), then you better specify which tag it should take:

```html title.ejs
<h1 class="<%= class_name %>" itemprop="name" data-pagefind-meta="title">
  <%= post.title %>
</h1>
```

Thus, on specifying meta data you can refer not only to the content of a tag, but also to other attributes. Here's the example for my special Hexo implementation for header images:

```html photograph.ejs
<img id="header-photo" data-pagefind-meta="image[src], image_alt[alt]"
     src="/photos/normal/<%= page.photograph.file %>" 
     alt="<%= page.photograph.name%>"
     width="0" height="0"/>
```

In case there is simply no element that contains the meta value, you can also specify it within the attribute:

```html article.ejs
<article id="note-<%= page.slug %>" itemprop="blogPost"   
       data-pagefind-body 
       data-pagefind-meta="type:Note">
 ...
</article>
```

---

### Adding a Search Page

Pagefind includes not only everything to get search results from the created index by JavaScript, but also the complete [UI for a search page](https://pagefind.app/docs/ui/), which means that you can build the complete search into your site yourself, or simply take a pre-built UI and visually customize it if necessary. I did the latter.

The following code is the basic structure of the search page as suggested by Pagefind:

```html
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js" type="text/javascript"></script>

<div id="search"></div>
<script>
  window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({ element: "#search" });
  });
</script>
```

To accommodate this in Hexo, it is advisable to use your own template and generate the page with an appropriate generator. A standard PAGE in Markdown format is only conditionally suitable for this, because links and scripts are needed. I described how to implement such a generator that renders descriptive Markdown in addition to the EJS template in my post {% post_link 2021/Pattern-for-dynamic-Hexo-pages %}, and I've taken that approach here as well.

For simplicity, I won't list the full code here, but link to my blog's GitHub repo:

| File | Description |
|---|---|
| [*/source/_dynamic/*<br>**search.md**](https://github.com/kristofzerbe/kiko.io/blob/master/source/_dynamic/search.md) | Markdown file with Frontmatter data and introduction text |
| [*/themes/landscape/layout/*<br>**search.ejs**](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/layout/search.ejs) | Layout template for search page |
| [*/themes/landscape/script/*<br>**generator-dynamic-search.js**](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/script/generator-dynamic-search.js) | Hexo Generator for creating the page during build |
| [*/themes/landscape/script/source/css/*<br>**_pagefind.styl**](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/script/source/css/_pagefind.styl) | Customized CSS Variables and style overrides|

For the visual customization of the user interface Pagefind provides some CSS variables in the automatically generated CSS file. These help a bit to customize the UI to your own ideas, but I decided to override some of the styles in a seperate file called ``_pagefind.styl``, which will be bundled via ``@import "_pagefind"`` in the main ``styles.styl``.

Since the main bundled CSS file is loaded in the HEAD before the ``_pagefind.css`` somewhere in the page, for simplicity I first made sure to pull the overrides with ``!important``. This is not yet pretty and I will have to revise this later on.

---

### Running Build and Pagefind

Thus prepared, the rest is a piece of cake. Pagefind does not need to be installed, because if you call the npm package via npx, the latest version will be downloaded and executed automatically. You just have to make sure that the hexo build has run before. The best way is to run the following command:

``hexo clean && hexo generate &&``**``npx pagefind``**

This my result in the console:

```accesslog
Running Pagefind v0.10.7 (Extended)
Running from: "...\\kiko.io"
Source:       "docs"
Bundle Directory:  "pagefind"

[Walking source directory]
Found 319 files matching **/*.{html}

[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.

[Reading languages]
Discovered 1 language: en

[Building search indexes]
Total: 
  Indexed 1 language
  Indexed 124 pages
  Indexed 7220 words
  Indexed 0 filters
  Indexed 0 sorts

Finished in 5.924 seconds
```

---

### Mount in GitHub Action

Since I am hosting this blog on GitHub Pages and the complete build and deployment is done by a GitHub Action, I added a step to the ``hexo-build`` job in the workflow file so that after the build Pagefind indexes the result:

```yml hexo-build.yml
jobs:
  hexo-build:
    runs-on: ubuntu-latest
    steps:
      ...
      - name: Build
        run: npm run generate
      - name: Run Pagefind
        run: npm_config_yes=true npx pagefind
      ...
```

Thankfully, in his article on Pagefind, Bryce also put me on the track of how to prevent a possible security prompt caused by npx from blocking Pagefind to run ... [npm_config_yes=true](/notes/2023/avoid-npx-install-prompt/).

---

### The Result

The finished solution is really amazing. As soon as you start typing, the included Pagefind JavaScript updates the results list ... and it's sooo fast. Really an exciting tool. Thanks to Liam and CloudCannon.

{% image_link "kiko-io-search.png" "/search" "Pagefind Search on kiko.io" %}

I hope that my explanation has inspired you to try it out for yourself on your Hexo driven blog or website. If you need some help or advice, drop me a line...

---

## More Info

{% moreinfo '{ "list": [
  [ "CloudCannon", "Pagefind",
  "https://pagefind.app/" ],
  [ "Liam Bigelow", "Introducing Pagefind: Static Low-bandwidth Search at Scale",
  "https://cloudcannon.com/blog/introducing-pagefind/" ],
  [ "Bryce Wray", "Pagefind is quite a find for site search",
  "https://www.brycewray.com/posts/2022/07/pagefind-quite-find-site-search/" ],
  [ "Bryce Wray", "Sweeter searches with Pagefind",
  "https://www.brycewray.com/posts/2022/12/sweeter-searches-pagefind/" ],
  [ "Nicolas Deville", "Pagefind",
  "https://notes.nicolasdeville.com/helpers/pagefind/" ]
]}' %}
