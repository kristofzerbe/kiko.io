---
slug: IndieFediWebVerse
title: IndieFediWebVerse
subtitle: We should only have one identity in the Fediverse
date: 2023-12-27 13:54:38
photograph:
  file: 23-09-11-Speyer-0022.jpg
  name: Yellow Curves
  socialmedia: /static/images/social-media/IndieFediWebVerse.png
categories:
  - Misc
tags:
  - Fediverse
  - IndieWeb
  - Identity
related:
  - Hexo-WebFinger-and-better-discoverability
  - Mastodon-Share-Bottom-Sheet-Dialog
  - Don-t-be-ignorant-and-offer-a-theme-switch
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111652881681835667
---

Today I was listening to Mike McCue's Dot Social podcast where he [talks](https://about.flipboard.com/inside-flipboard/eugen-rochko/) with Eugen Rochko about Mastodon and ActivityPub. At around 12:30 Eugen talked about Twitter and the fact that Tumblr is willing to join the Fediverse network and he asked a question, which he immediately tried to improve again:

> I think that is the future, because why should we have all these different accounts ... ehh ... like ... ehh ... all these different experiences that are required to connect with different people, when we could have just one account and connect with everyone who uses different services just from one account?

<div class="video-wrapper" style="margin-top:1rem;">
<iframe title="The State of the Federation, with Mastodon's Eugen Rochko" width="560" height="315" src="https://flipboard.video/videos/embed/60495342-c321-4949-9cc9-0fa1a1f2d788?start=12m30s" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

This slip of the tongue and Eugens emphasis on "ONE account" hit me, because it points to something that has bothered me about Fediverse so far, as wonderfully open and forward-looking as it is:

**It doesn't free me from the need to be a duplicate of myself everywhere in the form of an account.**

... because I'm not only a Mastodon, Pixelfed or &lt;you name it &gt; user. I'm me at kiko.io in the first place!

<!-- more -->

---

## My <s>home</s> website is my castle

I consider this website to be the center of my digital and public persona. This is me, in terms of longer articles about this and that and an initial place for my photos, that are suitable for a wide audience. From here I transport my content to other channels like Mastodon, dev.to or photo platforms like Pixelfed and some old classic silos like Flickr or 500px.

This syndication is done manually and I'm fine with that at the moment. For one thing, some platforms have no API at all and for another, they all have a slightly different post structure or even length limits. Tools like Bridgy Fed, which turn a website into its own Fediverse actor, won't help me and I don't really want that either, because I want to decide on the form of distribution myself. Maybe one day there will be an AI-driven tool that will help me to summarize my content in my own language specifically for the platform I want my content to syndicate and post it with a click. But for now I want to decide how, where and when.

But my point here is a different one: I am the owner, creator and operator of this blog, or to put it in ActivityPub language: **&#64;me&#64;kiko.io**. But I am not only interested in publishing my articles or photos, but also in communicating in other ways, away from my own content, but still with reference to myself and my main identity.

On Mastodon, however, I am *&#64;kiko&#64;indieweb.de* and on Pixelfed you interact with *&#64;kristofz&#64;pixelfed.social* because the name 'kiko' was already taken. To get to the point: I always appear on the platforms as someone else, away from my main identity. I chat with one identity, comment on a photo with another and like a book review with a completely different one. It's a bit of a split personality a la Dr. Jekyll and Mister Hyde, but it should be always *&#64;me&#64;kiko.io*, or at least something like that.

The difference between the classic web services and all Fediverse services is, that they are interoperable, so you need and get an address and not just a login name and password. But they behave in this particular way like the classic services: they create the address on their domain for you after you have logged in with your username and password. You can't bring the address with you. 

The only widely known interoperable service where this is not the case is email, which is often used as an example for comparison with the Fediverse. Of course you can also use a Gmail or Yahoo mail address, but in my case me&#64;kiko.io is a working mail address, even if I rarely use it. This is not possible in the Fediverse.

I recently tried to make my main identity discoverable using a WebFinger file, at least in the Fediverse, but is less than a crutch and has its pitfalls.

I would like to see some sort of alias system where you can choose which alias of your main identity you want to use on each platform. Using the main identity doesn't work if you are active on more than one platform because the Fediverse inbox/outbox system requires a unique address. But *&#64;mastodon&#64;kiko.io* or *&#64;pixelfed&#64;kiko.io* would work. Along a pattern such as ``@{Platform}@{Own Domain}`` ... or even better and more flexible by a Webfinger-like file on your (static) website which defines the endpoints of a particular alias of your main identity to the plattform.

For example, if I no longer want to run Mastodon via indieweb.social (Tim, that will never happen), then I export my data there, import it to mastodon.social, for example, and just change the endpoint of the address *&#64;mastodon&#64;kiko.io* in my file, deploy and I'm done. Full control.

Now, if we imagine there was a tool that could collect and aggregate the interactions that occur in the inboxes of such main identity aliases under the full control of the domain owner, would feel like a dream come true, at least for me. I appreciate [brid.gy](https://brid.gy/) and [webmention.io](https://webmention.io/) and the work of their authors and operators Ryan Barret and Aaron Parecki, but these tools are band-aids to make the shortcomings of today's Fediverse somewhat bearable.

---

Unfortunately, I am not in a position or capable to implement everything like this technically, even if I understand the principles behind all the stuff, but surely there is someone out there with similar ideas and the skills to go with it.

This reorganization or rather evolution of the Fediverse would really be a liberation from the old ways of functioning and would actually give control back to the users, who are the real basis of social media platforms.

A little more [IndieWeb](https://indieweb.org/) would be good for the Fediverse. Just in the direction of a IndieFediWebVerse...
