---
hasLocale: true
#--------------------------------------------------
slug: TownSquare-Chatting-with-Strangers
title: TownSquare -  Chatting with Strangers
subtitle: New Web Widget for Blog Interactions
date: 2026-06-26 14:02:17
photograph:
  file: 24-12-Suedafrika-1994-D50.jpg
  name: Addo Superiority
  socialmedia: /static/images/social-media/TownSquare-Chatting-with-Strangers.jpg
categories:
  - Tools
tags:
  - Blogging
  - Interactions
related:
  - Mentions-United-Loves-Bubbles
  - Mentions-United-New-Renderer-and-Refactorings
  - New-Approach-on-Sending-Webmentions
bandcamp:
  artist: Gudger
  album: Gudger III|3596528364
  track: Live it Down|1826128330
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/42
  - host: Bubbles
    url: https://bubbles.town/entry/44564983
  - host: Mastodon
    url: https://indieweb.social/@kiko/116816551625739701
  - host: IndieNews
    url: https://news.indieweb.org/en/kiko.io/post/TownSquare-Chatting-with-Strangers/
---

You stroll around a traditional market in town, stop at a stall and have a look at what's on offer. You're never alone, as others are doing the same. Unless you're in a hurry and you like people, it's quite common to strike up a casual conversation with other stall-goers or even the stallholder. "The stand is quite busy." "The product is rather expensive, though." "It's hot today, but it's finally supposed to rain this afternoon." Conversations that we usually forget quite quickly, but which make us social beings.

One problem with the traditional internet, on the other hand, is that you usually 'surf' the web on your own. Reading a blog post is a passive activity, and contact with the blogger, if possible at all, is asynchronous. Social networks are somewhat different in this regard, but the platforms usually operate in a silo, acting in their own interests – with all the associated excesses – and outside the confines of your own blog. The latter can be mitigated somewhat, for example, by using tools such as [Mentions United](https://kiko.io/projects/mentions-united/) to bring platform interactions 'home', but these interactions are still asynchronous and merely link content to comments, likes and the like.

<!-- more -->

---

[Cauê Napier](https://cauenapier.com/) has reduced the distance between blog owners and visitors in a playful way with his [**TownSquare**](https://townsquare.cauenapier.com/) project – and right on the blog itself, using embedded JavaScript and CSS as a widget. In an interactive, customizable scene, your own website acts as a stall, and visitors stroll past as stick figures whom you can address in a sort of chat. You can give yourself a name and, browser-dependent, crown yourself the owner in the admin console so that other visitors can see when the blogger is present. There, you can also moderate the chats and kick users out if they behave badly. 

![Town Square Screenshot](/post/TownSquare-Chatting-with-Strangers/town-square.png)

The project is available on [GitHub](https://github.com/cauenapier/TownSquare) (without license specified so far) and consists of the mentioned web widget and a Node.js server, which you can self-host if you wish to operate independently of Cauê's own instance.

TownSquare is less than a month old, and Cauê openly admits that AI did most of the work. Whilst that leaves a slightly bitter aftertaste at first, I find the concept convincing and have confidence that he will properly test all upcoming enhancements before release. That's why you'll find the new town square in the footer of all my pages...

---

{% cardlink %}
url: https://news.ycombinator.com/item?id=48608570
title: "Hacker News - Show HN: TownSquare, a tiny presence layer for websites"
host: news.ycombinator.com
favicon: y18.svg
{% endcardlink %}