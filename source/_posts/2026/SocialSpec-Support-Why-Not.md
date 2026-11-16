---
hasLocale: true
#--------------------------------------------------
title: SocialSpec Support ... Why Not?
subtitle:
date: 2026-11-16 18:11:58
photograph:
  file: 24-05-Wales-7264.jpg
  name: Color Carousel
  socialmedia: /static/images/social-media/SocialSpec-Support-Why-Not.jpg
series: IndieWeb
categories:
  - Coding
tags:
  - IndieWeb
  - Social Media
  - Identity
related:
  - New-Approach-on-Sending-Webmentions
  - Exploit-the-feedback-potential-with-syndication-links
  - IndieFediWebVerse
bandcamp:
  artist: Solar Sons
  album: Altitude|570176032
  track: O.G|1992310630
syndication:
  - site: Bubbles
    url: null
  - site: Mastodon
    url: null
  - site: IndieNews
    url: https://news.indieweb.org/en
---

A few weeks ago, I read for the first time on the Fediverse about the [SocialSpec](https://socialspec.org/) initiative, which aims to shed some light on the people behind the blog by using specific standardized files in the blog's ``.well-known`` folder and summarizing this information in a sort of profile.

In addition to the required RSS feed, these are:

1. **following.opml** - Who I follow via feed (blogroll)
2. **about.md** - Who I am, as plain text in Markdown
3. **contact.vcf** - Contact information as a vCard

At the time, the only way to view such a "profile" was via an iOS app, and that was where I jumped ship. But Matthias revived the topic for me with his post [SocialSpecing & HyperTexting](https://notiz.blog/2026/11/07/socialspecing-hypertexting/), and I thought to myself… Why not? Especially since there's now a web app for it: [Social Browser at sodir.org](https://sodir.org/profile.html?d=kiko.io).

<!-- more -->

All the necessary information already exists on my blog, since I've been enriching my website code with [Microformats](https://microformats.org/wiki/) according to the principles of the IndieWeb for quite some time. Exporting this data a second time during the build, this time to a well-known file, was quick and easy, and the result is convincing:

![Social Browser - kiko.io](/post/SocialSpec-Support-Why-Not/socialspec-kikoio.png)

Now, there is criticism from IndieWeb regarding SocialSpec, which is primarily based on the [rejection of sidefiles](https://indieweb.org/sidefile-antipattern). They claim this is an anti-pattern and should be avoided due to the DRY principle (Don't Repeat Yourself). If I've learned one thing in my long career, it's that you should be guided by principles, but let common sense take the lead. Sometimes repetition is appropriate and easier. That's the case here, too. Implement Microformats and the SocialSpec files if you want to save others the trouble of parsing HTML. The most important thing is… **be indie**. Do whatever you want.
