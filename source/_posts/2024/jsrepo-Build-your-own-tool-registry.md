---
slug: jsrepo-Build-your-own-tool-registry
title: jsrepo - Build your own tool registry
subtitle:
date: 2024-12-16 18:06:50
photograph:
  file: D50_9610_2406.jpg
  name: Thomas Garden 24-06 XIII
  socialmedia: /static/images/social-media/jsrepo-Build-your-own-tool-registry.png
categories:
  - Coding
tags:
  - JavaScript
related:
  - Discoveries-31
  - Ensure-Accessibility-on-Icon-Links
  - Mentions-United-3-2-1-go
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/113664203082977292
---

Every craftsman has one: his own toolbox, which he tends and takes care of. The most diverse tools accumulate there over the years, both bought and homemade, but all things that make his life easier.

Web developers are basically craftsmen too, and EVERYONE has their tools and utilities that can be found in almost every project. These are small code snippets that aren't worth creating an NPM package for or that aren't even meant to be made public. Very often, you simply copy one of these tools from the old project into the new one, or you may have even put them in a ``tools.js`` and always take over the entire file.

[Aidan Bleser](https://aidanbleser.com/) from San Antonio has created **[jsrepo.js](https://jsrepo.dev/)**, a tool that makes it easy to create and maintain your own toolbox in a project hosted on GitHub (or GitLab or BitBucket) and to integrate individual methods into new projects. A code registry all to yourself ...

<!-- more -->

{% image_link "jsrepo.png" "https://jsrepo.dev/" "jsrepo" %}

The code in a jsrepo registry is organized by so called **blocks** that simply represent subfolders (as categories) and the individual tool files ... for example ``/src/utils/math.js``.

``npx jsrepo init --registry`` will generate a **jsrepo-build-config.json** and ``npm run build:registry`` will build the registry by creating a **jsrepo-manifest.json**, which is the backbone of the registry.

After committing the registry repo, you can use it in a project by initialising the use of jsrepo with ``npx jsrepo init --project`` and then by adding the desired tool with a command with the following structure: ``npx jsrepo add --repo github/<owner>/<repo>/<category>/<name>``.

The cool thing about this is, that the individual tools in the blocks can also be dependent on NPM packages. These are installed automatically when you add a tool from the registry to your project. The same applies if one block requires another block.

Over time, your registry will grow and change. To make this easier, Aidan has integrated two easy-to-use CLI methods: ``update`` and ``diff``. There is a good documentation of all available options here: [https://jsrepo.dev/docs/cli](https://jsrepo.dev/docs/cli).

I will soon start to clean out my toolbox and get it in shape with jsrepo, so that the manual copying will come to an end.

---

## More Info

{% moreinfo '{ "list": [
  [ "Aidan Bleser (Daily.dev)", "How I share my code across multiple JS projects without having to use npm", "https://app.daily.dev/posts/how-i-share-my-code-across-multiple-js-projects-without-having-to-use-npm-6lqv8zmdl" ],
  [ "Aidan Bleser (GitHub)", "std - Types and utility functions brokered with jsrepo.", "https://github.com/ieedan/std" ]
]}' %}

Here's a how-to video Aidan shared on YouTube:

{% video <iframe src="https://www.youtube.com/embed/IyJQI3z8PWg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> %}
