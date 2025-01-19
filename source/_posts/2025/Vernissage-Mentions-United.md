---
hasLocale: true
#--------------------------------------------------
slug: Vernissage-Mentions-United
title: Vernissage & Mentions United
subtitle: A new photo platform and how to link it to your blog
date: 2025-01-18 12:51:56
photograph:
  file: D50_9044_2405.jpg
  name: Thomas Garden 24-05 XXIV
  socialmedia: /static/images/social-media/Vernissage-Mentions-United.png
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Vernissage
  - Pixelfed
related:
  - Mentions-United-Native-Mastodon-Provider
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-3-2-1-go
syndication:
  - host: Mastodon
    url: null
---

Since yet another tech billionaire (this time the one from Meta) has decided that he can go without morality and decency and crawl as far as possible into the far-right a*** of the soon-to-be 47th president of the United States, there has been a considerable significant migration of users from Instagram to the Fediverse alternative [**Pixelfed**](https://github.com/pixelfed/pixelfed), a photo-centric platform that has so far led a rather shadowy existence alongside the big player Mastodon.

I am very pleased about the fact that the Pixelfed inventor [@Dansup](https://pixelfed.social/dansup) currently has to increase the resources of his [pixelfed.social](https://pixelfed.social) server every day, on which I also have an [account](https://pixelfed.social/kristofz), to cope with the rush. Instagram is, alongside Threads, the last meta-product where I have an account, and I can only welcome an open and decentralized counterweight to it.

But I have to admit that although I regularly publish my photos on Pixelfed, I'm not 100% satisfied with the platform. On the one hand, the UI and handling are currently (still) quite clumsy and on the other hand, it is more a platform for everyday pictures of the selfie generation than a photo platform, as 500px has been for me for years. I spend my free time with photography and therefore want to present my work primarily in the context of a portfolio-based approach. This is only partially the case for Pixelfed, due to its focus on being an Instagram replacement.

I feel much more comfortable on the new and rising star in the Fediverse sky called **Vernissage** by [Marcin Czachurski](https://vernissage.photos/@mczachurski), that I discovered a few weeks ago and fell in love with.

![Vernissage UI](/post/Vernissage-Mentions-United/vernissage-ui.png)

<!-- more -->

If you are somehow familiar with the name *Vernissage*, you might be using the formerly named iOS app for Pixelfed, which Marcin renamed [Impressia](https://apps.apple.com/de/app/impressia-for-pixelfed/id1663543216) when he started to build an [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub) powered alternative photo hosting service under the old name.

The platform technically consists of several components such as the VernissageServer (API, written in Swift) and the Angular frontend VernissageWeb, and it's impressive what it can already do since the initial commit on GitHub in mid-2023 and how stable the current beta is. The project's roadmap (https://github.com/orgs/VernissageApp/projects/2) promises a lot of good things for the future, even though Vernissage is already better than Pixelfed in many areas. Adding photos, for example, is much more convenient and even offers AI support for tags and ALT texts. The processing and display of metadata embedded in the photo file, such as EXIF, is exemplary and comparable to other commercial platforms such as 500px and Flickr. The web interface works as an installable WebApp and already offers various notification options and, above all, a photo-centered view without text, which I prefer.

So far, there is only the instance operated by Marcin himself **[vernissage.photos](https://vernissage.photos)**, but I am sure that in the near future one or the other IT enthusiast interested in photography will prefer to set up its own Vernissage instance rather than a new Pixelfed instance. For networking, it doesn't matter anyway, because through the Fediverse all platforms are connected and photo contributions from Mastodon, for example, are also displayed in Vernissage and you can connect with the creators.

---

## Blog Connectivity via Mentions United

To date, I have published 36 of my more recent photos on my Vernissage account at [https://vernissage.photos/@kiko](https://vernissage.photos/@kiko), and in the coming weeks and months, more will gradually be added as I also upload selected older photos to Vernissage. Of course, the account, like the platform itself, is still relatively unknown, but I have already received some interactions such as likes, reposts and comments, which is why I decided to link it to my blog... using my dedicated JavaScript solution [Mentions United](/projects/mentions-united/).

{% alertbox info %}
If you don't know what this is all about, I recommend the article [**Mentions United ... 3, 2, 1, Go**](/post/Mentions-United-3-2-1-go/), in which I describe what Mentions United actually is and what you can use it for.
{% endalertbox %}

As of today, there is a [**Mentions United provider plugin for Vernissage**](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-vernissage):

![Provider Vernissage](post/Vernissage-Mentions-United/Provider-vernissage.png)

The implementation is almost identical to that of the existing [Pixelfed plugin](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-pixelfed) and only differs in details. There is only one difference in use: you do not need an API key because read access to likes, reposts and conversations is free (as with Mastodon).

You can see what the interactions collected with it look like on the photo page of the header image of this post, for example. [Photo Thomas Garden 24-05 XXIV](/photos/D50_9044_2405/).

Have fun taking photographs and communicating... see you at [Vernissage](https://vernissage.photos) :)