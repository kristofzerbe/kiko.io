---
slug: Pattern-for-dynamic-Hexo-pages
title: Pattern for dynamic Hexo pages
subtitle: Set up pages with dynamic data easily
date: 2021-08-25T09:43:44.000Z
photograph:
  file: D50_4451.jpg
  name: Garden Beauties I
  socialmedia: /static/images/social-media/Pattern-for-dynamic-Hexo-pages.jpg
categories:
  - Tools
tags:
  - Hexo
related:
  - Generate-Social-Media-Images-Automatically
  - Forking-Hexo-plugin-hexo-index-anything
  - Show-related-posts-in-Hexo
---

[Hexo](https://hexo.io/) is a great SSG platform for blogging. Just write your Markdown beneath some Frontmatter meta data, run ``hexo generate`` and publish the results to a web server.

But at some point you may want to process different data from internal or external sources and integrate it into your blog. Hexo doesn't support this out of the box, but has a powerful feature called [Generator](https://hexo.io/api/generator.html), which helps you to achieve your goal. The following is a sample and pattern of how to implement this.

The starting point of my example is the requirement to display several elements of the same type on a dynamic page, but you can of course adapt the example according to your needs.

<!-- more -->

---

## The Page

First of all we need a Hexo page for the meta data and for some text we want to show at the beginning of the page to describe what is shown below. In order not to interfer the classic post generation, we create a new folder in Hexo's ``source`` folder called **``_dynamic``**, where we place the MD file for the new dynamic page.

{% alertbox exclamation %}
The underscore in the name of the folder ``_dynamic`` is important, because Hexo doesn't touch subfolders in ``source`` with this starting character while generating the site. Without, it would be treated as a normal page.
{% endalertbox %}

```md ./source/_dynamic/my-special-page.md
---
title: My Title
subtitle: My Subtitle
date: 2021-08-24 19:24:00
mySpecialProperty: "Lorem ipsum dolor sit amet"
---

Some text to show above the dynamic created content...

```

The Frontmatter data has no limits. You can add as much properties as you like.

---

## The Layout Template

Hexo works with EJS layout files. Whenever a page should be created, the calling method has to define which layout file should be used. Therefor we create a special EJS file for our dynamic page and place it in the ``layout`` folder.

```js ./themes/&lt;your-theme&gt;/layout/my-special-layout.ejs
<h1 class="page-title"><%= page.title %></h1>
<h2 class="page-subtitle"><%= page.subtitle %></h2>

<div class="page-content">
  <%- page.content %>

  <div class="view grid">
    <% for(var i=0; i < page.items.length; i++) { %>
      <%- partial('_partial/my-special-item', { item: page.items[i] }) %>
    <% } %>
  </div>  

</div>

<script>
  // Extend the page with JavaScript ...
</script>
```

On generating the page later on, an object called ``page`` will be used to process the EJS, with all information we want to show on the page, like ``content`` (text of the Markdown file) and all meta data from the Frontmatter (title, subtitle and so on).

Special attention is paid to **``items``**, because this property holds the list of all items we want to show on the page. Each object in this list have multiple custom properties you define, when you are assemble the data to show in the generator, but more about that later.

In the ``script`` tag you can write JavaScript to interact with your data on the page, like filtering stuff or other things the user should can do with your data.

---

## The Partial Template For Items

In order not to blow up the layout EJS, it is advisable to separate the template for the item itself to an extra file, referenced in the layout file (``_partial/my-special-item``) as a Partial.

```js ./themes/&lt;your-theme&gt;/layout/_partial/my-special-item.ejs
<div class="my-item">
    <!-- Definition of an item -->
</div>
```

The layout EJS will iterate over the list of items in the FOR loop and handover one of these object to the Partial to render.

---

## The Generator

As we have made our preparations, we are now able to implement our special generator itself.

Hexo uses so called Generators to "produce" the HTML for your site and you can add your own by using the ``register`` method. The result of a generator has to be an object with at least three properties:

* ``data`` - Data object with all necessary information to process the given layout EJS
* ``path`` - The path where the HTML file should be created
* ``layout`` - The layout EJS file, which should be processed

```js ./themes/&lt;your-theme&gt;/scripts/my-special-generator.js
hexo.extend.generator.register("my-special-generator", async function(locals) {
  
  // INSTANTIATE A NEW DATA OBJECT
  let page = {};
  page.name = "my-special-page";

  // Do something to get content and data for the page

  // INSTANTIATE THE RESULT OBJECT
  let result = {
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "my-special-layout"
  }

  // RETURN THE RESULT
  return result;  
});
```

In this basic structure, you will find again the layout file, we created earlier. The output will be rendered in an HTML file called ``index.html`` at the subfolder ``my-special-page``, as we take the name of the page for it, as we did it for the name of the source MD file.

The next thing we have to implement here, is the content of the source MD file.

{% alertbox info %}
The parameter ``locals`` gives you access to the site variables, with all information about the site and its pages, posts, categories and tags!
{% endalertbox %}

The first 4 lines in the following script are the references to some helpers we need. Please be sure, that you install them first via ``npm install``.

```js ./themes/&lt;your-theme&gt;/scripts/my-special-generator.js
const log = require('hexo-log')({ debug: false, silent: false });
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("my-special-generator", async function(locals) {
  
  // GET REFERENCE TO HEXO'S CONFIGURATION
  let config = this.config;

  // SHOW MESSAGE ON GENERATING
  log.info("Processing items for dynamic page");

  let page = {};
  page.name = "my-special-page";

  // GET THE PATH TO THE SOURCE FILE
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");

  // GET THE CONTENT OF THE SOURCE FILE
  const md = fs.readFileSync(mdSource);

  // PARSE THE FRONTMATTER OF THE SOURCE FILE
  let fm = front.parse(md);

  // ADD THE FRONTMATTER TO THE DATA OBJECT
  page = {...page, ...fm};

  // CONVERT MARKDOWN CONTENT OF THE SOURCE FILE INTO HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });

  // Do something to get items data for the page
  //page.items = [];
  //...

  let result = {
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "my-special-layout"
  }

  return result;  
});
```

The only thing missing now, is your implemention of filling ``page.items`` with a list of objects you want to show on the page. There are no limits to your imagination. Get data from external API's or process JSON data, stored in the ``data`` folder ... or whatever you prefer.

A live example of this approach are the pages [TINY TOOLS](/collections/tiny-tools/) (processing data from the Trello API) and [PHOTOS](/photos) here on this blog.
