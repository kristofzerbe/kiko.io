---
hasLocale: true
#--------------------------------------------------
slug: Using-GitHub-as-Commenting-Platform-2025-Edition
title: Using GitHub as Commenting Platform, 2025 Edition
subtitle:
date: 2025-08-02 17:31:39
photograph:
  file: 24-05-Wales-7314.jpg
  name: Sky Construction
  socialmedia: >-
    /static/images/social-media/Using-GitHub-as-Commenting-Platform-2025-Edition.jpg
series: A New Blog
categories:
  - Tools
tags:
  - Hexo
  - GitHub
related:
  - Using-GitHub-as-Commenting-Platform
  - Mentions-United-3-2-1-go
  - Push-Over-Webmentions
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/10
  - host: Mastodon
    url: https://indieweb.social/@kiko/114960238792894189
---

From the beginning of this blog in 2019, it was possible to comment on articles on the site. Initially, this was done with Disqus, but for reasons I won't go into here, I replaced it with [Utterances](https://utteranc.es) after less than a year. This worked well for me because the code for my blog is not only publicly available on GitHub, but is also hosted on GitHub Pages. After a while, however, I removed this from the code as well and focused entirely on Webmentions and Fediverse syndications, which ultimately resulted in the development of my [Mentions-United](/post/Mentions-United-3-2-1-go) solution.

Yesterday, I had a little chat with [@jsstaedtler](https://mastodon.art/@jsstaedtler) on Mastodon about comment forms, syndication, and the like, and that brought my to-do of integrating a comment form back into my focus, because Johann is right about the following: Offering interactions ONLY via syndication and Webmentions does not work for users who do not have accounts on these platforms or do not run Webmention-enabled blogs. There should be something for everyone.

Since this is a static blog, my first thought was certainly to use one of the numerous comment platforms such as Formspree, Formspark, GetForm, Static Forms, FormSubmit, and whatever else they are called, but I would really like to avoid this new dependency, and I don't see the point in paying $15 a month for a simple comment function that hardly anyone will use anyway. My bad experience with Disqus is enough for me. Now, some of you will say, “Wait, wait... XXX only costs $5 and YYY is free,” but my requirements have changed over the years: I don't need old-school emails about incoming comments, which is what almost all of these services send, but rather a **platform where comments are stored with a moderation function and from where I can pull them into my site via an API and a Mentions United plugin**.

<!-- more -->

The only candidate in this category that I might take another look at soon is [Form Owl](https://formowl.dev) by BirdyDev Ltd. It's still in the alpha phase, but on Reddit, user ‘linhub’ is discussing the next features to be implemented, and they're right up my alley. What really annoys me, though, is the game of hide-and-seek played by the creator(s) of FormOwl. BirdDev's website only reveals that it's a web agency from Canada, but provides no further information about the company or the people behind it. Just Hubert, smiling at the camera and wanting to chat. That's what I call confidence-building. Do I want to work with people who are as transparent as the Italian mafia?

---

## A new syndication target

But back to my problem ... My research uncovered a [post by Michael Walter Van Der Velden](https://mikevdv.dev/blog/2022-08-25-switching-to-webmention-comments) from 2022, which described how he got rid of Utterances, BUT was able to continue using the principle behind them (storing comments in a GitHub issue for the post) and link them to his site via webmentions. Oops, I hadn't thought of that. Since I got rid of Utterances, a few issues that came in via comments have been lying around in my repository. As Michael correctly points out, these are classic syndications, as I use them every day in my blog, but only on the GitHub platform and in the shape of an issue for the respective post.

I store the syndications of a post on a platform in the metadata (Frontmatter) of the Markdown file. Extending this for GitHub was easy, as the entire infrastructure for displaying the link on the post page already exists and only the icon was missing in the styles for display:

```yaml
---
slug: Using-GitHub-as-Commenting-Platform
title: Using GitHub as Commenting Platform
subtitle: Integrate Utterances GitHub Issue Commenting to Hexo
date: 2020-07-05T14:55:16.000Z
...
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/3
```

All I had to do was to let [**brid.gy**](https://brid.gy) crawl again the URLs of the affected posts (such as [Using GitHub as Commenting Platform](/post/Using-GitHub-as-Commenting-Platform) from 2020) via my GitHub account, and new Webmentions were immediately recorded on my endpoint [webmention.io](https://webmention.io/), which were automatically pulled from the corresponding [Mentions United plugin](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-webmentions) and displayed, as the page was reloaded.

What I now have to consider is how and at what point during the creation of a new post I want to have the issue automatically generated via the [GitHub API](https://docs.github.com/en/rest/issues?apiVersion=2022-11-28). Until then, I will do this manually for posts where it makes sense:

1. Go to the repo ``kristofzerbe/kiko.io`` on github.com
2. Create a new issue with the title ``post/<SLUG>`` and the title and excerpt as content
3. Enter the issue URL in the metadata of the post under ``syndication``

---

## Conclusion

The beauty of this solution: I am notified via [Pushover](/post/Push-Over-Webmentions/) of every incoming Webmention (and thus also of new issue comments) and can quickly moderate unpleasant things using GitHub's more than mature comment functions without having to trigger a new build, as Mentions United is a client solution. Spam is gone faster than you can spell it :)

The downside of this solution: I now have another comment function, but users need an account on another platform, this time GitHub, and it's not a real contact form. Its just another link ... my to-do is still open.
