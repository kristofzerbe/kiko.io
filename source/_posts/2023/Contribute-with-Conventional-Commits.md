---
slug: Contribute-with-Conventional-Commits
title: Contribute with Conventional Commits
subtitle: Fun with a Pull Request
date: 2023-09-15 17:57:40
photograph:
  file: DSC_7903.jpg
  name: Vintage Letters
  socialmedia: /static/images/social-media/Contribute-with-Conventional-Commits.png
categories:
  - Tools
tags:
  - Publishing
  - VS Code
  - Git/GitHub
related:
  - Gitpod-Visual-Studio-Code-on-the-Web
  - Mastodon-simply-explained
  - Syndicate-Mastodon-Hashtags-in-your-favorite-Feed-Reader
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111070207610797812
---

I'll be honest ... I need some Git training. From time to time I contribute small things to GitHub projects and sometimes get confused with all the commands. ``Fork``, ``Clone``, ``Commit``, ``Stage``, ``Pull Request`` ... all things that mean something to me, but that I certainly haven't internalized. And so it happens that I sometimes mess up a pull request or something similar.

Sure, my blog here also lives in GitHub, both in terms of source control and hosting on GitHub Pages, but here I'm the only one committing. No issues, no branches, no pull requests or anything else. I change something, hit commit and I'm done.

Another point I can't dismiss: I'm a Windows guy who likes to click buttons. The command line is not for me at all.  
*What was the name of the parameter? Do I have to write ``--param=xxx`` or ``/param:xxx`` ... damn where is the button?*  
My brain is probably too small for that.

Visual Studio Code is a big help there ... it has buttons! But that doesn't save me when it comes to Git, because you have to know in which order to press which of these buttons!

<!-- more -->

Yesterday I discovered a small bug in my favorite Mastodon client [Elk](https://elk.zone), which could be solved with one line of CSS. So ... cloned the thing, looked for the source file, inserted the line ... and googled how to submit the change on my repo clone as a pull request to the Elk project, and found this great tutorial on Medium from someone, with the name Supritha:

[>>> How to Create a Pull Request on GitHub using VS Code](https://levelup.gitconnected.com/how-to-create-a-pull-request-on-github-using-vs-code-f03db28308c4)

Fantastic. The pull request was a breeze. BUT ... on the pull request page of Elk on GitHub the first check threw an error regarding **Semantic Pull Request**, with the message the title was wrong ... what the heck?

While I was reading the documentation (after the first attempt to change the title to something reasonable and another failure), one of the Elk developers [Joaquín](https://github.com/userquin) was so nice and corrected the title and pointed me to the very doc I was reading:

**[>>> Conventional Commits <<<](https://www.conventionalcommits.org/en/v1.0.0/#summary)**

Okay ... I was already happy that nothing went wrong this time, but that was too early, as so often in IT ;)

Here to read: [fix(ui): Empty lines in posts from Pixelfed are doubled/tripled (#2392)](https://github.com/elk-zone/elk/pull/2394)

Since I am a structured person, I liked the commit message rules used by the Elk team, because they open up a space to make the commits easier to evaluate automatically afterwards. I think a great help for projects of this scale ... currently 202 contributors!

Actually I don't have a Git project where the **Convertional Commits** would be useful, but for my future Me ... READ THIS POST!

(And for my employees, in case they read this: I have an idea that we should definitely establish soon ... ;)
