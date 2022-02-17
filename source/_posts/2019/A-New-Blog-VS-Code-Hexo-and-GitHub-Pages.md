---
alias: /categories/Tools/A-New-Blog-VS-Code-Hexo-and-GitHub-Pages/index.html
slug: A-New-Blog-VS-Code-Hexo-and-GitHub-Pages
title: 'A New Blog: VS Code, Hexo and GitHub Pages'
subtitle: Part One of having fun with Hexo and GitHub Pages
date: 2019-09-24T00:00:00.000Z
photograph:
    file: 19-07 Schottland-0405.jpg
    name: Tiny Scots 7
    link: 'https://500px.com/photo/1002666873/Tiny-Scots-7-by-Kristof-Zerbe'
    socialmedia: /static/images/social-media/A-New-Blog-VS-Code-Hexo-and-GitHub-Pages.png
series: A New Blog
tags:
    - VS Code
    - Hexo
    - GitHub
    - Blogging
categories:
    - Tools
related:
    - Automatic-Header-Images-in-Hexo
    - A-New-Blog-Blogging-and-Synching-en-route
    - A-New-Blog-Customizing-Hexo
---

A few days ago I puzzled over a technical problem regarding SQL Server, Active Directory and Visual Studio Database Projects. With tips, hints and snippets from several websites I got it running and the solution was absolutely memorable. For myself and for others. Nothing is harder than to know 'you did this before...', but not to remember how.

Because of this strong leaning towards oblivion, I started over 20 years ago my very first website **zerbit.de**, manually crafted with Classic ASP and a SQL Server database as backend, with an editor, tagging, categories and so on. It was really exciting to build this blog from scratch and writing articles for it, but it was so time consuming to expand the features of the website and keep it running, that some day I quit it silently.

So, to document the solution mentioned above, I could use tools like OneNote or others, like in the past years, but this would be just for me and not for all developers, who have a similar problem. I felt it would be unfair to participate from the knowledge of others to get my solution and dont give something back.

I decided to write an article just in HTML and publish it on my personal GitHub Page that I didn't used so far. Ok, just Text ... ugly. Just a little CSS and a little more structure and maybe I should do something with Vue JS ... STOP ... It would be better to pick one of the cool new static website generators based on Node.js, to detain myself from inventing the wheel again and save my time to write articles. So I did a little research and found [HEXO](https://hexo.io) ... Bingo! I can work with my favorite editor [Visual Studio Code](https://code.visualstudio.com/), its all HTML, JavaScript and CSS, I can write my articles in Markdown and Hexo has a lot of helpers for stuff Markdown doesn't provide, it produces static files and works only with files, therefore no need for a database ... and it is well documented.
<!-- more -->

## Installation

.. is quite easy, as described here: [https://hexo.io/docs/setup](https://hexo.io/docs/setup)

1. Create folder and open in VS Code
2. Open VS Code Terminal window
3. Install Hexo with ``$ npm install -g hexo-cli``
4. Init Hexo project with ``$ hexo init``
5. Install dependencies with ``npm install``
6. Done

![New Hexo Project](A-New-Blog-VS-Code-Hexo-and-GitHub-Pages/vscode-1.png)

## Writing

### Create new post/draft

Hexo has posts and drafts, whereat drafts has to published via a Hexo command to become a post. To create an article use the command ``hexo new post|draft "My Title"``. The title will be converted in a URL-encoded string and will be used as file name and url.

### Meta data
Every post/draft starts with its header (so called [Front Matter](https://hexo.io/docs/front-matter)) to store some meta data, which describes the post, like ``title``, ``date``, ``tags`` or ``categories``. This is used by Hexo to classify and arrange your post during the build.

### Markdown
Hexo posts/drafts are written in [Markdown](https://en.wikipedia.org/wiki/Markdown). Good syntax reference are the [Markdown Guide](https://www.markdownguide.org/basic-syntax/) and the more detailed [Markdown Syntax Guide](https://sourceforge.net/p/hexo/wiki/markdown_syntax/).

### Excerpt
Is is usual to show a short excerpt an the start page of a blog, to keep it compact and teasering the user to click on a READ MORE button. To achieve this, you just have to add following comment to your article. Everything above is the excerpt and everything below is only shown, when you enter the article:

    <!-- more -->

### Images

Some articles will contain images to illustrate something and the question is, where should they be stored? Answer: In a folder beside the post/draft, which has the same name as the article MD file. To get this, you have to activate the setting ``post_asset_folder`` in your ``_config.yml``. Now this folder will be created automatically, when you add a new post/draft.

In your Markdown you reference your image with:

    {% asset_img image-1.png "Test Image" %}

![Reference Image](A-New-Blog-VS-Code-Hexo-and-GitHub-Pages/vscode-2.png)

## Build

Hexo is a website generator, so a build will generate the whole website in a special folder, which has to be published. This output folder can be configured in the ``_config.yml``:

    public_dir: public

To wipe the output folder, run the command:

    hexo clean

To start the build, run:

    hexo generate

To view the website via the build-in local Hexo server, run:

    hexo server

## Publishing

Most "complex" task was to publish the new blog on [GitHub Pages](https://pages.github.com/). My first approach was to use my personal page, as I did with my single HTML file, but this didn't work, because I wanted to store the whole project on GitHub and it is not possible to point a personal page to the subdirectory **docs** or use a different branch as **master**.

The simple solution was to create a new repository, named after my my blog **kiko.io**, to store teh whole project and point the GitHub Page to the subdirectory **docs** in the settings of the repository.

![GitHub Settings](A-New-Blog-VS-Code-Hexo-and-GitHub-Pages/github-1.png)

By overriding the default publish folder of Hexo in ``_config.yml`` ...

    public_dir: docs

... everything was set up. Commit and Push via git and done.

Hexo has its own deploying mechanism and it is advisable to disable it, by commenting out the Deployment section ``_config.yml``.

Next step was to use my own custom domain for the blog. To achieve this, the most easiest way is to create a text file named ``CNAME`` (without extension!) with the content of the domain in a single line and publish this file in the root of the docs folder. Github will recognize this file and do the setup automatically.

To point the domain to GitHub, I had to create following ``A`` records in my domain providers DNS settings:

* 185.199.108.153
* 185.199.109.153
* 185.199.110.153
* 185.199.111.153

Last step was to enable **Enforce HTTPS** in the repositories settings.
