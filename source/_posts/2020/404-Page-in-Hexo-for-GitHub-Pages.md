---
slug: 404-Page-in-Hexo-for-GitHub-Pages
title: 404 Page in Hexo for GitHub Pages
subtitle: Provide an error page automatically when resource not found
date: 2020-09-23T14:28:50.000Z
photograph:
  file: 19-07-Schottland-0935.jpg
  name: Tattoo Tuba
  socialmedia: /static/images/social-media/404-Page-in-Hexo-for-GitHub-Pages.jpg
series: A New Blog
categories:
  - Tools
tags:
  - GitHub
  - Hexo
  - Error
related:
  - Using-GitHub-as-Commenting-Platform
  - Automatic-Header-Images-in-Hexo
  - A-New-Blog-VS-Code-Hexo-and-GitHub-Pages
---
As this blog is a static one, generated by [Hexo](https://hexo.io) and hostet at [GitHub](https://pages.github.com/), the page which was shown, when a user enters an Url which points to nowhere, was the default GitHub 404 page.

![GitHub 404 Page](404-Page-in-Hexo-for-GitHub-Pages/github-404-page.png)

<!-- more -->

Not optimal and should be solved by an own Hexo page, because **GitHub Pages allows you to deliver a custom 404 page** by creating simply a ``404.html`` in the root of the website.

As you can create separate pages in Hexo, this is done quickly by:

```cmd
hexo new page "404"
```

It generates a new folder named ``404`` in your ``source`` folder, where a ``index.md`` is placed. In this file you can enter the text as Markdown  you want to show to the user, in case of a 404 error (page not found) occurs.

On generating the static files by ``hexo generate``, a subfolder ``404`` with a ``index.html`` will be created, which doesn't really work with GitHub Pages, because it needs a ``404.htm`` in the root.

You can fix this, by defining the ``permalink`` in the Frontmatter of your page:

```yaml
---
title: 404
permalink: /404.html
---
```

Example ... click here: [https://kiko.io/no-page-here](https://kiko.io/no-page-here)