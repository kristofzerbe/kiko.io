---
title: "Wrap Wrap Wrapedi Wrap"
date: 2022-11-24 08:45:00
hide: true
---

I'm working on a new [#Hexo](https://hexo.io/) [generator](https://hexo.io/api/generator.html) for my blog [kiko.io](https://kiko.io) and there are plenty of images involved in the future, which I want to resize via [Sharp](https://github.com/lovell/sharp) and minify via [Imgmin](https://github.com/imagemin/imagemin). At all there will be about 15 to 20 lines of code which will do the job. But ... did a very similar thing a while ago and now I have two daemons sitting on my shoulder:

Angel:
> Nahh ... it's not necessary to create a centralized module out of it. These are just a few lines of code and you use the base libraries directly, so you can always see in the future in which ways you used them. No need for a wrapper.

Devil:
> Pardon me! You always want to write clean code and one of the principles of Clean Code is DRY - *Don't repeat yourself*! For sure you have to summarize this code also.

Angel:
> Sorry pal, but it is not worth the effort. In case you want to extend the functionality on the one side you have to introduce new parameters, the other one doesn't know of. I remind you of the Clean Code principle KISS - *Keep it simple and stupid*.

<!-- more -->

