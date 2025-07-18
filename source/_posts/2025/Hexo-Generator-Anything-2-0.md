---
slug: Hexo-Generator-Anything-2-0
title: Hexo Generator Anything 2.0
subtitle: Refactoring & New Features
date: 2025-07-18 07:45:56
photograph:
  file: 24-12-Suedafrika-3417-D50.jpg
  name: Addo Beauty III
  socialmedia: /static/images/social-media/Hexo-Generator-Anything-2-0.jpg
project: Hexo Generator Anything
categories:
  - Coding
tags:
  - JavaScript
  - Hexo
  - Plugin
  - GitHub
related:
  - Forking-Hexo-plugin-hexo-index-anything
  - Mentions-United-New-Renderer-and-Refactorings
  - Simplest-Console-File-Logger
syndication:
  - host: Mastodon
    url:
---

I recently wanted to add the entry [/Defaults](/defaults/) to my [Slash Pages](/slashes/) collection and implement it simply as an overview page of the existing AppDefaults posts for each year. My plugin [Hexo Generator Anything](https://github.com/kristofzerbe/hexo-generator-anything) seemed ideal for this, at least as a basis, because my requirements for /Defaults were a little different, but I thought that could be quickly resolved with one or two new features in the plugin.

After various WTF moments involving bugs and incorrect naming of functions, variables and configurations, I also gave the plugin a refactoring, which led to breaking changes in the configuration and thus to a new major version number.

<!-- more -->

---
## Recap

*(What on earth is he talking about?)*

In my blog software [Hexo](https://hexo.io), posts are created as Markdown files with metadata in Frontmatter format, which are translated into static pages during the build using EJS templates. Hexo natively supports three types of overview pages: Latest Posts on the start page and one each for the tags and categories defined in the Frontmatter of the posts.

[Hexo Generator Anything](/projects/hexo-generator-anything/) is now a plugin that allows you to generate overview pages for any desired Frontmatter attributes via configuration, for example for an attribute ``author``: if Jim, Bob and Alice write posts, the plugin generates a MAIN INDEX page with a list of all authors and POSTS INDEX pages for the three, with a list of their posts:

```
output/authors/index.html

output/authors/jim/index.html
output/authors/bob/index.html
output/authors/alice/index.html
```

The configuration in ``_config.yml`` would now look like this:

```yml
anything:
  defaults:
    layout:
      main: anything-main
      posts: anything-posts
  index_mappings:
    - variable: author
      path: author
```

---
## New Feature: SKIP_MAIN

For my new /Defaults page, however, I didn't need a new Frontmatter attribute to group all posts somehow, but only one to **pick out certain posts** from the bunch. I chose ``misc`` as attribute name for this (any other string would work as well) and stored the value ``defaults`` for the posts that should be listed. What the old plugin would have generated for me would be:

```
output/misc/index.html
output/misc/defaults/index.html
```

However, I didn't need a MAIN INDEX page or the associated MISC subfolder, but rather:

```
output/defaults/index.html
```

This is now possible with the new mapping configuration setting ``skip_main``, which also makes ``path`` obsolete if used:

```yml
index_mappings:
  - variable: misc
    skip_main: true
```

## New Feature: Individual Templates

The new overview page for posts should also differ slightly from the default, so you can now specify individual templates for each mapping entry:

```yml
index_mappings:
  - variable: misc
    skip_main: true
    layout:
      posts: anything-posts-misc
```

---
## Whats Next?

The plugin code is quite old, as I already [took it over as a fork](/post/Forking-Hexo-plugin-hexo-index-anything/) in 2021 and it still uses gems such as [Lodash](https://lodash.com/) and [Moment](https://momentjs.com/), which are no longer necessary in today's JavaScript development and could be a burden in the future. Therefore, it would be time for another refactoring towards Vanilla JS ...