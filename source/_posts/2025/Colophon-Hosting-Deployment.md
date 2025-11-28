---
slug: Colophon-Hosting-Deployment
title: Colophon - Hosting & Deployment
subtitle: 
date: 2025-05-02 18:04:00
photograph:
  file: DSC_9332.jpg
  name: Driving Home
  socialmedia: /static/images/social-media/Colophon-Hosting-Deployment.jpg
misc: colophon
series: A New Blog
categories:
  - Misc
tags:
  - Hexo
related:
  - Colophon-Impetus-Technology
  - Colophon-Writing
  - Colophon-Special-Pages
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114439959438360765
---

{% alertbox info %}
This is the second post in completing my [colophon](/Colophon).
{% endalertbox %}

---

## Hosting

I host the entire blog publicly on [**GitHub**](https://github.com/kristofzerbe/kiko.io) and thus commit every change, be it a code adjustment or a new post. Web hosting is handled by [**GitHub Pages**](https://pages.github.com/) via the address [https://kristofzerbe.github.io/kiko.io](https://kristofzerbe.github.io/kiko.io), to which I have bound my domain kiko.io via DNS entries.

<!-- more -->

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

---

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

---

## Local

I like to work with different device classes without interruption, be it my smartphone, tablet or various notebooks. That's why the local repository is stored entirely in an [**OneDrive**](https://OneDrive.com) folder, which is synchronized to all devices. On Android, this is done by [**OneSync**](https://play.google.com/store/apps/details?id=com.ttxapps.onesyncv2), although the Git files are not taken into account there, as there is no really useful Git client for Android.

As soon as I have finished a new post or another change, I commit to GitHub from the computer I am currently sitting at and the deployment is executed automatically as described above.
