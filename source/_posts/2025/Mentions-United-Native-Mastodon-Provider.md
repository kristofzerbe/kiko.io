---
hasLocale: true
#--------------------------------------------------
slug: Mentions-United-Native-Mastodon-Provider
title: 'Mentions United: Native Mastodon Provider'
subtitle: 
date: 2025-01-12 14:54:21
photograph:
  file: D50_9807_2407.jpg
  name: Thomas Garden 24-07 XIII
  socialmedia: /static/images/social-media/Mentions-United-Native-Mastodon-Provider.png
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Mastodon
related:
  - Mentions-United-3-2-1-go
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-New-Renderer-and-Refactorings
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/113816442246434483
---

When I started Mentions United to collect and display the interactions of syndication from the various Fediverse platforms on my static blog, I initially focused on my needs with regard to the range of functions... see also [**Mentions United... 3, 2, 1, Go**](/post/Mentions-United-3-2-1-go/).

At the top of the list were, of course, **Webmentions**, closely followed by **Mastodon** and the classic non-Fediverse platforms such as Flickr, where I syndicate my photos, among other things. I was able to cover this group of platforms completely with the Webmentions provider plugin, because thanks to [brid.gy](https://brid.gy]) and [webmention.io](https://webmention.io), their interactions are also converted into Webmentions.

![Provider Webmention](post/Mentions-United-Native-Mastodon-Provider/Provider-webmention.png)

<!-- more -->

The first native plugin was **Pixelfed**, which could so far not be connected to brid.gy due to incompatibilities, and a little later one for **Lemmy**.

Now, not everyone wants to go through the detour via Webmentions to connect to Mastodon, so I have now added a native provider plugin for Mastodon to the project:

![Provider Mastodon](post/Mentions-United-Native-Mastodon-Provider/Provider-mastodon.png)

Using the plugin on your own page is just as “simple” as the others. After including the main script and the required plugins (for example, the renderer LIST) in the HTML ...

```html
<script src="/js/mentions-united.js"></script>
<script src="/js/mentions-united-provider_mastodon.js"></script>
<script src="/js/mentions-united-renderer_list.js"></script>
```

... the main script is initialized and executed after the page has been loaded with the plugins:

```html
<script>
window.addEventListener('load', function() {

  const mentionsUnited = new MentionsUnited({
    ownerName: "__OWNER-NAME__"
  },
  [
    new MentionsUnitedProvider_Webmentions({
      syndicationUrl: "__MASTODON-URL__"
    }),  
    new MentionsUnitedRenderer_List({
      placeholderId: "__PLACEHOLDER-ELEMENT-ID__"
    })
  ]);

  mentionsUnited.load()
    .then(() => {
      return mentionsUnited.show();
    })
    .then((count) => {
      // do something final... 
    });

}
</script>
```

In the example, only the ``__VARIABLES__`` need to be replaced and the Mastodon interactions appear on the page. A little CSS for the HTML generated by the renderer, which replaces an existing placeholder element... and that's it.

The new Mastodon provider plugin has a few optional options in addition to the ``syndicationUrl``, which is the full URL to the Mastodon post, as documented in the [section on the GitHub page](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#mastodon).

---

## Webmentions versus Mastodon Provider

With the use of the new Mastodon provider, it is theoretically possible to download and display the interactions of the platform twice if, like me, you have connected Mastodon via webmention.io. Therefore, the existing Webmentions provider plugin has a new option called ``skipOrigins``, which can be used, for example, to filter out all ``mastodon`` interactions before processing.

I will continue to pull Mastodon interactions onto my site via Webmentions, because this has the advantage of not only pulling interactions that are directly attached to the syndication URL, but also mentions of the post URL in other Mastodon posts that brid.gy collects for me.

---

## Project Status January 2025

![Provider Overview](post/Mentions-United-Native-Mastodon-Provider/Provider-Overview.png)

The project now includes a total of **5 providers** plugins that retrieve the data and **5 renderer** plugins that convert the data into HTML. Of course, I would like to see Mentions United eventually cover all possible Fediverse platforms, but to do that I need your help. I am neither present on all platforms nor do I have the time to implement them all. So if you would like to help connect another provider or have your own idea for a visualization in the form of a new renderer... you are welcome to join.