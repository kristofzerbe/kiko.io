---
title: "Wrap Wrap Wrapedi-Wrap"
date: 2022-11-29 07:45:00
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/109426757955654512
---

I'm working on a new [generator](https://hexo.io/api/generator.html) for my [#Hexo](https://hexo.io/) driven blog and there are plenty of images involved in the future, which I want to resize via [Sharp](https://github.com/lovell/sharp) and minify via [Imgmin](https://github.com/imagemin/imagemin). At all, there will be about 10 to 15 lines of formatted code which will do the job. But ... I did a very similar thing a while ago and now I have two demons sitting on my shoulder, debating wether or not to wrap the code in a single function:

<!-- more -->

**Angel**:
> Nahh ... it's not necessary to create a centralized module out of it. These are just a few lines of code and you use the base libraries directly, so you can always see in the future in which ways you used them. No need for a wrapper.

**Devil**:
> Pardon me! You always want to write clean code and one of the principles of clean code is DRY - *Don't repeat yourself*! For sure you have to summarise this code also.

**Angel**:
> Sorry pal, but it is not worth the effort. In case you want to extend the functionality on the one side you have to introduce new parameters, the other one doesn't know of. I remind you of the Clean Code principle KISS - *Keep it simple and stupid*.

**Devil**:
> You are stupid! In case something changes in the base libraries in the future, you have to maintain several occurrences of using. And I bet, you will forget one ... as always!

**Angel**:
> I don't want to overdo it with the abstraction. Exactly this kind of thing always leads to unnecessarily complex software, that even the author will hardly understand in a year's time!

**Devil**:
> Exact this kind of thinking and laziness leads to unmaintainable and poorly performing software!

**Angel**:
> KISS...

**Devil**:
> DRY!

**Angel**:
> KISS!

What do you think?