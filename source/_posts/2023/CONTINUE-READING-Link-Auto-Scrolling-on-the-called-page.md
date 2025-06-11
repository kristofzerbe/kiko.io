---
slug: CONTINUE-READING-Link-Auto-Scrolling-on-the-called-page
title: CONTINUE READING Link & Auto Scrolling on the called page
subtitle: Help your user to read on directly
date: 2023-07-29 16:14:35
photograph:
  file: D50_5099.jpg
  name: Ground Light
  socialmedia: /static/images/social-media/CONTINUE-READING-Link-Auto-Scrolling-on-the-called-page.jpg
series: A New Blog
categories:
  - Coding
tags:
  - JavaScript
  - UI
  - Usability
related:
  - Anatomy-of-Service-Worker-Communication
  - The-Last-Image-Gallery
  - Generate-Social-Media-Images-Automatically
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/110798153748266303
---

On the home page of a blog or other text-heavy site with regular new articles, it is often advisable not to display the entire text of the article, but a more or less large excerpt and a READ MORE or CONTINUE READING link that leads to the rest of the article, usually a stand-alone article page. This allows the user to quickly get a picture of, say, the last dozen posts when he comes here to browse your texts.

However, it is somewhat unpleasant if you as the author decide to display a larger excerpt after all, and the user lands at the top of the called page after clicking on the MORE link and first has to scroll/navigate to the right place until he can resume reading. This destroys his reading flow. It is better to take the user directly to the page where the MORE link interrupted the text on the home page.

With a hash and some JavaScript this is done so quickly, that I wonder why I haven't implemented this on my own blog already :)

<!-- more -->

The principle is quite simple:

1. append a hash to the MORE link URL the user will click
2. detect the hash on the called article page and scroll via JavaScript to an anchor element that was rendered here instead of the MORE link
3. remove the hash from the URL again

## Some pre-explanation of my example

My blog is based on the static website generator [Hexo](https://hexo.io). So I write my articles in [Markdown](https://en.wikipedia.org/wiki/Markdown) and use for the interruption of an article a built-in helper, which uses the comment ``<!-- more -->`` to hack the **Content** into two parts (**Excerpt** and **More**) and replaces it with simple **``<span id="more"></span>``**. I use the **Excerpt** for the start and other overview pages and the **Content** for the article pages themselves.

## Expand the MORE link

In my template for the start page, 8 articles are currently rendered into the page via a separate *EXCERPT* template. This contains the code for the MORE link (``excerpt_link`` in my example):

```js ../layout/partial/excerpt.ejs
...

<div class="article-entry">
  <%- post.excerpt %>

  <% if (theme.excerpt_link){ %>
    <p class="article-more-link">
      <a href="<%- url_for(post.path) + '#continue' %>">
        <%= theme.excerpt_link %>
      </a>
    </p>
  <% } %>

</div>

...
```

I simply appended the hash "**&#35;continue**" to the ``url_for(post.path)`` statement and this is it for the start page.

## The JS on the article page

Since some of my pages deal with hashes, I have a general script that loads in the footer of each page and checks the hashes passed to the page. In the switch statement I only needed a new case for **continue**.

The first thing I did was to remove the hash again from the because I don't want to show that to the user. It is only a tool for a better reading flow and should not have any further effects.

To scroll around on a page via JavaScript, there is the ``scrollIntoView`` method, which provides a wonderfully smooth scrolling effect with the ``behavior: "smooth"`` and ``inline: "nearest"`` options. In my case, however, this was out of the question, since it does not support an offset, which I need for my fixed header.

The solution was the classic ``window.scrollTo()`` function, which is a bit more work, but you can specify exactly where you want the page to go.

```js ../layout/partial/after-footer.ejs
<script>
var hash = window.location.hash.substr(1);

switch (hash.toLowerCase()) {
  ...

  case "continue":
    history.replaceState(null, null, ' '); // remove hash

    window.scrollTo({ // scroll to the MORE element in the Article
      behavior: 'smooth',
      top:
        document.querySelector("#more").getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        200, // with a little buffer around it
      });
    break;
  
  default: break;
}
</script>
```

This is it ...