---
hasLocale: true
#--------------------------------------------------
slug: Mentions-United-Peertube-Provider
title: "Mentions United: Peertube Provider"
subtitle: 
date: 2025-05-03 17:55:00
outdates: never
photograph:
  file: D50_9566_2406.jpg
  name: Thomas Garden 24-06 VII
  socialmedia: /static/images/social-media/Mentions-United-Peertube-Provider.jpg
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Peertube
related:
  - Mentions-United-Native-Mastodon-Provider
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-3-2-1-go
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114444873846639999
  - host: DevTo
    url: https://dev.to/kristofzerbe/mentions-united-peertube-provider-179a
  - host: Lemmy
    title: JavaScript
    url: https://programming.dev/post/29679304
---

I don't often work with videos, especially not on social media. But every now and then I record one with my smartphone, for example at a concert or a soccer match, and want to blog about the event later. I then embed the MP4 files as an asset in the corresponding Markdown. Over the years, a few MB have accumulated and at some point I had to think about where to put them in order to keep the size of the blog under 1GB. Outsourcing to YouTube? I can, but that would be the wrong direction for me. Something on Fediverse or the social web? Of course ... **Peertube**!

<!-- more -->

On the German instance [**clip.place**](https://clip.place/c/kiko_io/videos) operated by adminForge, a channel for the videos was quickly created and uploaded. Basically I only had to change the URL's in the `video` and `iframe` tags to the new ones.

{% alertbox info %}
One sentence about the offer from [adminForge](https://adminforge.de/). Stefan Giebel's portal brings together an incredible number of web-based tools, all of which he hosts himself. There are currently 77 services on 9 servers hosted on servers in Germany and the offer includes well-known Fediverse platforms such as Mastodon, Pixelfed and Peertube, as well as Matrix, Diagramme, FreshRSS, Poll, Trash Mail, Password Exchange, Dropfile and many more, through to alternative front-ends for commercial services and rounded up by numerous [IT-Tools for Developers](https://tools.adminforge.de/). His offer is definitely worth a look and a donation!
{% endalertbox %}

I don't expect a lot of comments on my videos on clip.place, as I currently use it more as a repository or syndication target, but you never know ... and since I have so far added a [Mentions United Provider Plugin](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-plugins) to all of my connected platforms that have a free API, one is now also available for [**Peertube**](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-peertube).

![Provider Peertube](post/Mentions-United-Peertube-Provider/Provider-peertube.png)

As always, the data for the plugin, i.e. the video URLs, are in the frontmatter of my post. Here is an example of my concert post [WIRTZ DNA-Tour 2024, Leipzig @ 2024-02-17](post/WIRTZ-DNA-Tour-2024-Leipzig-2024-02-17):

```yaml
syndication:
  - host: PeerTube
    url: https://clip.place/w/quf3PWpmKJjRwm89axBLY2
```

In the EJS template for my posts, it is checked whether there is at least one Peertube syndication for the current post and if so, the Peertube provider plugin is integrated and initialized after the main Mention United script in the JS code. Finally, the ``retrieve`` method contained in the plugin is called via the general Mentions United ``load`` and the comments are displayed on the page, if there are any.

```ejs
let synPeertube = syndications?.filter(s => s.host.toLowerCase() === "peertube");

<% if (synPeertube?.length > 0) { %>
<%- js('js/mentions-united-provider_peertube.js'); %>
<% } %>

<script>
  ...
  const mentionsUnited = new MentionsUnited({ ... });

  <% synPeertube?.forEach(syn => { %>
  mentionsUnited.register(new MentionsUnitedProvider_Peertube({ 
    syndicationUrl: "<%- syn.url %>",
    syndicationTitle: "<%- syn.title %>"
  }));
  <% }); %>

  ...
  mentionsUnited.load()
    .then(() => { 
      return mentionsUnited.show(); 
    })
</script>
```

Actually, everything is the same as always, but the [Peertube API](https://docs.joinpeertube.org/api/rest-getting-started) still has a special feature: although there is an open RESTful API, there are no fixed auth tokens that could be generated in the account UI, for example. Instead, you first have to retrieve the client tokens via the API in order to generate an auth token valid for 24 hours, also via a REST endpoint. A little cumbersome, but you can also retrieve the comments of a video via a token-free [Video Feed API](https://docs.joinpeertube.org/api-rest-reference.html#tag/Video-Feeds) JSON format and limit the amount of data with a parameter for the video ID:

```url
/feeds/video-comments.json?videoId={{ID}}
```

Unfortunately, this procedure has a small catch: In contrast to the REST API, the feed does not provide the complete author data of the comment, but only the display name and the profile URL:

```json
"author": {
  "name": "Kristof Zerbe",
  "url": "https://clip.place/accounts/kiko"
}
```

Thankfully, the REST endpoint ``/api/v1/accounts`` does not require an auth token and so I collect all unique authors in the Peertube Provider plugin, cut the ``name`` from the profile URL and use it to retrieve the complete data separately. For example:

```json /api/v1/accounts/kiko
{
  "url": "https://clip.place/accounts/kiko",
  "name": "kiko",
  "host": "clip.place",
  "avatars": [
    {
      "width": 48,
      "path": "/lazy-static/avatars/e0891432-0f45-48c5-86c0-594a395f3d91.png",
      "fileUrl": "https://clip.place/lazy-static/avatars/e0891432-0f45-48c5-86c0-594a395f3d91.png",
      "createdAt": "2025-04-01T06:16:21.893Z",
      "updatedAt": "2025-04-01T06:16:21.893Z"
    },
    { "width": 120, ... }
    { "width": 600, ... },
    { "width": 1500, ... }
  ],
  "id": 17957,
  "hostRedundancyAllowed": false,
  "followingCount": 0,
  "followersCount": 0,
  "createdAt": "2025-03-31T07:15:05.857Z",
  "displayName": "Kristof Zerbe",
  "description": "https://kiko.io",
  "updatedAt": "2025-04-01T06:10:52.234Z",
  "userId": 213
}
```

I mainly focused on the avatar URL, because a small picture of the commenter is a standard for Mentions United interactions and I don't want to deviate from this.

Of course, the number of additional requests for many comments increases significantly with this approach, but I have already opened an [Issue (#6998)](https://github.com/issues/created?issue=Chocobozzz%7CPeerTube%7C6998) for this in the GitHub project. Let's see when I can remove the account retrieval again.

Here's an example I used to test the new Peertube Provider plugin: [https://kiko.io/post/WIRTZ-DNA-Tour-2024-Leipzig-2024-02-17/#interactions](https://kiko.io/post/WIRTZ-DNA-Tour-2024-Leipzig-2024-02-17/#interactions)
