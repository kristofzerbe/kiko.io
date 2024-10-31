---
slug: Diving-Into-the-World-of-Lemmy
title: Diving Into the World of Lemmy
subtitle:
date: 2024-10-26 12:48:26
photograph:
  file: D50_9942_2407.jpg
  name: Thomas Garden 24-07 XXIX
  socialmedia: /static/images/social-media/Diving-Into-the-World-of-Lemmy.png
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Lemmy
related:
  - Mentions-United-3-2-1-go
  - Push-Over-Webmentions
  - Hexo-and-the-IndieWeb
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/113378863170909812
  - host: Lemmy
    title: lemmy@lemmy.ml
    url: https://programming.dev/post/21031156
  - host: Lemmy
    title: meta@programming.dev
    url: https://programming.dev/post/21031933
---

Slightly triggered by the post [My blog now has Lemmy comments](https://blog.coship.fyi/blog/lemmy-comments/), I thought it would be a good idea to take a closer look at another great representative of the Fediverse world: [**Lemmy**](https://en.wikipedia.org/wiki/Lemmy_(social_network)). Of course, also with an eye on the possibility of developing another [**Mentions United Provider Plugin**](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-plugins), along the lines of what “Coship” can do, I also can do and that for everyone ;)

<!-- more -->

First of all, I had to confront myself with Lemmy. I've used a few platforms in my life and am currently mainly on [Mastodon](https://indieweb.social) and [Pixelfed](https://pixelfed.social), but [Reddit](https://en.wikipedia.org/wiki/Reddit), the role model for Lemmy, was never one of them. It seemed very confusing and complex to me and I had the same feeling with Lemmy. It's all a bit different from Mastodon, but that's mainly because you have to deal with another level here, the communities.

Finding a suitable Lemmy instance is quite easy thanks to the server catalog at [join-lemmy.org](https://join-lemmy.org/instances), although you don't know exactly where you've landed after registration. I also really wanted to use my usual handle 'kiko' and that was already taken for large instances such as [lemmy.world](https://lemmy.world) and [lemmy.ml](https://lemmy.ml). I've now found a place at [**programming.dev**](https://programming.dev) because although I also follow political and other topics in the Fediverse, I want to devote myself primarily to technical topics at Lemmy, a self-proclaimed link aggregator for the Fediverse, and most of my links are of a technical nature. You can find me now at [kiko@programming.dev](https://programming.dev/u/kiko).

A few settings down the line and using the wonderful [Photon](https://github.com/Xyphyn/photon) theme, I felt comfortable enough on my Lemmy instance to do a [first post](https://programming.dev/post/20878811) about my Mentions United solution in the Fediverse community on lemmy.ml, including cross-posting to [fediverse@lemmy.world](https://programming.dev/post/20880252) and [indieweb@programming.dev](https://programming.dev/post/20881358). I simply needed a few interactions to get my new provider plugin up and running.

---

### The API - A First Look

The code, written in Rust, which runs on every Lemmy instance, also contains an **integrated API** that can be used to read some data from the system without any authentication. There also seem to be methods that require a bearer token when making a request, but I'm not sure about that, nor have I found anywhere where I could have one issued to me as a user.

In general, the API documentation is somewhat neglected and, on request, you are often referred to the source code of the Lemmy-JS client, which doesn't really help in any way. Better are independent alternatives such as [**Unofficial Lemmy OpenAPI Documentation**](https://mv-gh.github.io/lemmy_openapi_spec/) or the somewhat crude [**lemmy.readme.io**](https://lemmy.readme.io/), which greets you on the start page with a 'Get API Key', where nothing of the sort is possible and cannot be. Simply misleading and, from a usability point of view, really poorly done, but that's probably more down to the used service readme.io.

The problem with third-party documentation, which is not part of the development or deployment process, is that it often does not reflect the possibilities accurately enough ... and of course I ran into such a shortcoming.

Since I had the first interactions on my first Lemmy post, I tried to get them through the documented API route ``.../api/v3/comment/list?post_id`` against my instance, but the result was always an empty set of comments. After puzzling for a while, I asked for help in a second Lemmy post to [lemmy_support@lemmy.ml](https://p.programming.dev/post/programming.dev/2095422) and received a few unhelpful answers, until I crossposted to [meta@programming.dev](https://programming.dev/post/20968051) and received the hint from [Admiral Patrick](https://dubvee.org/u/ptz) to try supplying a few optional parameters and voila: it worked.

{% alertbox info %}
To get the comments of a Lemmy post via API in the current version v3, you need to use the route ``https://<your-instance-domain>/api/v3/comment/list?post_id=<your-post-id>`` and add the parameter **``type_=All``**! To sort them in ascending publishing date order, add the parameter ``sort=Old`` as well.
{% endalertbox %}

Let's see if I need the ``max_depth`` parameter as well, as the tip suggests. At the moment, it seems like I have everything I need to get started with my plugin.

In general, however, I find the Lemmy API sometimes a bit strange, and not only because of the somewhat odd parameter values for ``sort``: Hot, Top, New, Old and Controversial. Whoever came up with this hasn't heard of self-explanatory code.

The JSON response from the Lemmy API is, as is often the case, massive and full of redundancies, which is probably because pre-built objects are simply stuffed into the comments of the list when the route is called. So an entry contains not only the actual ``Comment'' object, but also the referencing information as a complete object:

```json
{ 
  "comments": [
    {
      "comment": { ... },
      "creator": { ... },
      "post": { ... },
      "community": { ... },
      "counts": { ... }
    }
  ]
}
```

The ``community`` object alone contains 17 attributes, some of which are extensive text, and is inherently the same object for all entries. It is similar with the ``post`` object. It's not that there is no important information there, but I find the constant repetition to be a waste and a higher-level meta-object would have done the job.

What I do find a really good solution for, though, is how the comments are linked to each other, or rather how this is reflected in the response. Wherever ``parent_id`` is used in other objects, a comment has a ``path`` with a dot-separated list of all comment IDs up to the current comment, starting with 0. This means that you don't have to work your way through the individual comments in search of the structure; instead, it is delivered to you directly.

---

But well... actually, I just wanted to make a short note for myself about my initial findings, but the text just kept getting longer. I'll get to work now and build the Lemmy plugin for Mentions United and report back ...