---
alias: /categories/Tools/Hexo-and-the-IndieWeb-Receiving-Webmentions/index.html
title: Hexo and the IndieWeb (Receiving Webmentions)
subtitle: Use webmention.io the easy way
date: 2021-05-13 14:16:00
hitcountId: UJ4z8jVX2
photograph:
  file: 19-12 Kroatien-0183.jpg
  name: Dubrovnik Fishnet
  link: 'https://500px.com/photo/1022776833/Dubrovnik-Fishnet-by-Kristof-Zerbe/'
series: IndieWeb
categories:
  - Tools
tags:
  - Hexo
  - Blogging
  - Publishing
  - Share
related:
  - Hexo-and-the-IndieWeb
  - Hexo-and-the-IndieWeb-Sending-Webmentions
---

{% alertbox info %}
This is part three of the splitted original post {% post_link 2021/Hexo-and-the-IndieWeb "Hexo and the IndieWeb" %}. Don't miss Part 2 {% post_link 2021/Hexo-and-the-IndieWeb-Sending-Webmentions "Hexo and the IndieWeb (Sending Webmentions)" %} either.
{% endalertbox %}

---

A meaningful interaction has always two directions: sending and receiving. In this part of the post I want to show you how to receive Webmentions from other blogs participating in the IndieWeb.

As Hexo is a SSG it generates static HTML pages. This has the advantage that the pages can be hosted just about anywhere (in my case [Github Pages](https://pages.github.com/), but also the disadvantage of not having a real backend. Therefore, we need an external service that acts as an Webmention endpoint, where other people can send their webmentions.

[Aaron Parecki](https://aaronparecki.com/), co-founder of the IndieWeb, has made a service called [**webmention.io**](https://webmention.io/) we can use for free. It is able to convert old-fashioned Pingbacks to Webmentions, supports deleting of unwanted mentions, has a Blocklist for blocking domains, Webhooks for real-time processing and last but not least an API to get all your Webmentions per page or per site.

<!-- more -->

## Setup

webmention.io needs a registration and Aaron uses his own authentication method **Web Sign-In** over [IndieLogin](https://indielogin.com/) to achieve that.

{% asset_img indielogin.png %}

After you have signed in, you see your settings with two important links, you have to integrate in the head of your HTML:

```html
  <link rel="webmention" href="https://webmention.io/[YOUR-BLOG-DOMAIN]/webmention" />
  <link rel="pingback" href="https://webmention.io/[YOUR-BLOG-DOMAIN]/xmlrpc" />
```

They define your page on the one hand as a webmention- and on the other hand as a pingback endpoint. Every send Webmention or Pingback from another blog is routed to these URL's.

You will also find your **API Key** on this page. To be honest, is not a real API key, but rather a key to retrieve all incoming webmentions at once. Therefore it does not need to be kept private and secured. There is no way to modify your incoming Webmentions over it.

## Incoming Webmentions

{% alertbox info %}
I'm implementing my Hexo/Webmention solution as I'm writing this post, therefore I don't have any Webmentions to show as an example. Since all mentions on webmention.io are publicly accessible, I simply use Max Böcks article [Using Webmentions in Eleventy](https://mxb.dev/blog/using-webmentions-on-static-sites/) in the following. Max, I hope it is ok ... :)
{% endalertbox %}

Aaron has defined three ways to get the incoming mentions of a particular article on your blog:

### 1. View as HTML page

{% pre_highlight %}
https://webmention.io/api/<b>mentions.html</b>?target=<i>https://mxb.dev/blog/using-webmentions-on-static-sites/</i>
{% endpre_highlight %}

{% asset_img view-html.png %}

Using it this way, webmention.io integrates the content with some styles and other information of the sending post for easy reading.
<br>

### 2. Consume as Atom feed

{% pre_highlight %}
https://webmention.io/api/<b>mentions.atom</b>?target=<i>https://mxb.dev/blog/using-webmentions-on-static-sites/</i>
{% endpre_highlight %}

{% asset_img view-atom.png %}
<br>

### 3. Get as JSON

{% pre_highlight %}
https://webmention.io/api/<b>mentions.jf2</b>?target=<i>https://mxb.dev/blog/using-webmentions-on-static-sites/</i>
{% endpre_highlight %}

{% asset_img view-json.png %}
<br>

Especially the last one is interesting for us, because we can use it to automate getting the data and integrate it in our blog post.

You can also use all these Url's to get the Webmentions of all of your pages, by changing the ``target`` parameter into:

{% pre_highlight %}
...?<b>token</b>=[YOUR-API-KEY]
{% endpre_highlight %}

The feed with token for getting all webmentions is particularly practical for checking whether there are new ones for your blog via a feed reader.

There are some parameters you have to be aware of:

| Parameter | Example |
| -------- | ------- |
| Paging | ``?per-page=20&page=0`` (**default**, page 1 with 20 entries) |
| Sorting By | ``?sort-by=created`` (**default**) |
| Sorting Direction | ``?sort-dir=down`` (**default**, newest first) |
| Time Limit | ``?since=2021-05-10T12:00:00-0700`` |
| ID Limit | ``?since_id=500``).

You can find more on parameters in the documentation of webmention.io's source code here: [https://github.com/aaronpk/webmention.io](https://github.com/aaronpk/webmention.io).

## The Data

Let's dive into the data. The JSON is a list and every Webmention is an entry underneath ``children``, with following useful fields:

| Field | Purpose |
| ---- | ------- |
|``author.name``|Name of the sender|
|``author.photo``|Avatar photo of the sender|
|``author.url``|Personal URL of the sender|
|``wm-id``|Unique ID of the Webmention|
|``wm-target``|URL of your post|
|``wm-received``|UTC Date/Time sended|
|``wm-source``|URL of the sending post |
|``published``|Publish Date/Time of the sending post|
|``wm-property``|Webmention type out of the following values:<ul><li><b>mention-of</b>&nbsp;:&nbsp;Mention as link in post</li><li><b>in-reply-to</b>&nbsp;:&nbsp;Reply to your post</li><li><b>like-of</b>&nbsp;:&nbsp;Like of your post</li><li><b>repost-of</b>&nbsp;:&nbsp;Repost of your post</li><li><b>bookmark-of</b>&nbsp;:&nbsp;Bookmark of your post</li></ul>|

Other occuring fields are optional, but no less interesting for displaying them at your post:

| Field | Purpose |
| ---- | ------- |
|``name``|Name of the Webmention (title of the sending post or something)|
|``summary.type``|Summary type of the Webmention, e.g. "text/plain"|
|``summary.value``|Summary text of the Webmention|
|``content.html``|Content as HTML of sending post|
|``content.text``|Content as text of sending post|

The fact that we get the complete HTML content of the sending post, means that we easily can parse it for IndieWeb microformats (see {% post_link 2021/Hexo-and-the-IndieWeb "Part 1" %}) to get even more information about it and the blog owner!

---

## Integration

We have two ways to choose from in order to integrate the data thus obtained into the post:

1. Static ... means while generating the site
2. Dynamic ... means real-time via client-side Javascript

The static approach has two big disadvantages:

- The Webmentions are only visible with a time delay, due to the need of generating the pages of the site
- Hexos generation mechanism only takes those, whose content has beed updated in the meanwhile, but do not take into account any external data like Webmentions. We would have to fire up the time consuming ``clean`` and ``generate`` all the time

So, let's go for the dynamic approach, a little bit JavaScript, which loads the Webmentions on page load (like most Commenting platforms do).

First of all, we need a placeholder in our article.ejs, where the Webmentions will be displayed. Somewhere near the comments and implemented as another partial:

```html layout/_partial/article.ejs

<article id="<%= post.layout %>-<%= post.slug %>" 
         class="article article-type-<%= post.layout %> h-entry" itemscope itemprop="blogPost">

  ...

  <%- partial('post/webmentions') %>

  <%- partial('post/comments') %>
  <%- partial('post/related') %>
  <%- partial('post/nav') %>

</article>
```

```html layout/_partial/post/webmentions.ejs
<div class="article-webmentions">

  <div class="webmentions-placeholder">
    <p class="wm-placeholder">No Webmentions yet...</p>
  </div>
  
  <script>
    window.addEventListener('load', function () {
      insertWebmentions('<%- post.slug.toLowerCase() %>');
    })    
  </script>

</div>
```

The call ``insertWebmentions`` references to the asset script ``webmentions.js``, which will be bundled via Grunt in my case, but you can place it where you want and add it to your articles head element. The main thing is, that it will load when the article page is launched.

The script checks, if the user has already loaded the Webmentions for the current page from webmention.io in the last hour and do so if not, and stores the data in the browser by the pages key (slug) and with a timestamp:

```js assets/webmentions.js
function insertWebmentions(key) {
  const lsTimestamp = "wmts_" + key;
  const lsWebmentions = "wm_" + key;

  const currentUrl = window.location.href;
  const wmUrl = `https://webmention.io/api/mentions.jf2?target=${currentUrl}&per-page=1000&sort-dir=up`;

  let lastRequest;
  let webmentions;

  // Get data from browser storage, if available
  if (localStorage.getItem(lsTimestamp) && 
    localStorage.getItem(lsWebmentions)) {

    lastRequest = localStorage.getItem(lsTimestamp);
    webmentions = JSON.parse(localStorage.getItem(lsWebmentions));
  }

  if(webmentions && lastRequest && Math.abs(Date.now() - lastRequest) / (60*60*1000) < 1) {
    // Webmentions are present and not older than an hour
    process();
  } else {
    // Get Webmentions from webmention.io
    load().then(() => { process(); });
  };

  /**
   * Load webmention.io's JSON data for the current page
   */
  async function load() {
    const response = await fetch(wmUrl);
    webmentions = await response.json();
    localStorage.setItem(lsWebmentions, JSON.stringify(webmentions));
    localStorage.setItem(lsTimestamp, Date.now());
  }

  /**
   * Process Webmentions
   */
  function process() {
    ...
  }
}
```

Actually the script loads the first 1000 Webmentions in ascending order of their retreiving date. Should last for a while or I may feel like adding real paging at some point ;)

On processing the webmentions, a separate HTML block is generated for each type (``wm-property``) regarding the content of the Webmention, whereby the header is always the same. The ``VERB`` refers to the Webmentions type: *mentioned*, *replied*, *liked*, *bookmarked* or *reposted*.

```html HEADER
<div class="wm-card h_card">
  <a class="wm-photo-link u-url" href="[AUTHOR.URL]">
    <img class="wm-photo u-photo" width="44" height="44" 
          src="[AUTHOR.PHOTO]" alt="[AUTHOR.NAME]">
  </a>
  <div class="wm-meta">
    <a class="wm-name p-name" href="[AUTHOR.URL]">[AUTHOR.NAME]</a>
    <span class="wm-verb">[VERB] on</span>
    <time class="wm-date dt-published" datetime="[WM-RECEIVED]">
      [formatted WM-RECEIVED]
    </time>
    <small>[Running Number]</small>
  </div>
</div>
```

The HTML of the five implemented types:

```html MENTION
<div class="webmention wm-mentioned" id="[WM-ID]">
  [HEADER HTML]
  <div class="wm-content p-content">
    <p>[First 50 words of CONTENT.TEXT with ellipsis]</p>
    <a class="wm-source" href="[WM-SOURCE]">[WM-SOURCE]</a>
  </div>
</div>
```

```html REPLY
<div class="webmention wm-mentioned" id="[WM-ID]">
  [HEADER HTML]
  <div class="wm-content p-content">
    <p>[Complete CONTENT.HTML]</p>
    <a class="wm-source" href="[WM-SOURCE]">[WM-SOURCE]</a>
  </div>
</div>
```

```html LIKE & BOOKMARK (no content)
<div class="webmention wm-mentioned" id="[WM-ID]">
  [HEADER HTML]
</div>
```

```html REPOST
<div class="webmention wm-mentioned" id="[WM-ID]">
  [HEADER HTML]
  <div class="wm-content p-content">
    <p>
      ... at <a href="[WM-SOURCE]">[WM-SOURCE]</a>
    </p>
  </div>
</div>
```

The result will look like this, after adding some styles:

{% asset_img wm-example.png %}

You can download the complete JavaScript- and the Stylus file on Github:  
[**https://github.com/kristofzerbe/Hexo-and-the-IndieWeb-Files**](https://github.com/kristofzerbe/Hexo-and-the-IndieWeb-Files)

---

### Form for sending Webmentions manually

As you may noticed in {% post_link 2021/Hexo-and-the-IndieWeb-Sending-Webmentions "Part 2" %}, some manual work is necessary to have webmentions sent. Therefore, it is good to give the user a possibility to submit his blog post, where he mentions yours, directly. As webmentions.io supports posting a new source, the HTML form is quite simple an we can integrate it in the partial from above, below the script tag:

```html layout/_partial/post/webmentions.ejs
<div class="article-webmentions">

  ...

  <form class="webmention-form" 
        action="https://webmention.io/<%- config.title %>>/webmention" 
        name="webmention-form" method="post">
    
    <label for="webmention-form-source">Your Article URL:</label><br>
    <input class="webmention-form-source" 
          type="url" name="source" 
          placeholder="https://your-blog.com/your-article" required="">
    
    <input type="hidden" name="target" value="<%- post.permalink %>>">
    
    <input type="submit" value="Send Webmention">
  
  </form>

</div>
```

The variable ``config.title`` defines the name of your blog with which you have registered at webmention.io. In the hidden input, we use the permalink of the current page/article as the mentions target.

---

## Building Bridges

Yes, the IndieWeb and Webmentions are an alternative concept of social networking, bypassing the big silos like Facebook, Twitter and Co. ... but they exist and they have a massive reach. Of course, your posts will be shared there, so why not include those mentions?

[**Bridgy**](https://brid.gy/) is such a bridge builder. It connects your blog with the big social media players:

{% asset_img bridgy.png %}

The only thing you have to do, is to allow Bridgy to access your social media data, like your Tweets on Twitter. If somebody mentions you and one of your articles as a Tweet, Reply or Like, it sends a mention to the endpoint defined in your HTML, in our case webmention.io. Thats it ... kinda magic.

---

## Summary

Some people say, Webmentions makes commenting forms on blogs, like Disqus or others, obsolete, but I don't agree with that, because not every visitor owns a blog and not every blog owner want's to write a post only to comment the thoughts of another blogger. Both approaches work well side by side and complement each other. Webmentions are super to build a blog network and  increasing your blogs coverage. As I said in {% post_link 2021/Hexo-and-the-IndieWeb "Part 1" %} ... we write for readers.

---

{% moreinfo '{ "list": [
  [ "indieweb.org", "webmention.io",
  "https://indieweb.org/webmention.io"],
  [ "Max Böck", "Using Webmentions in Eleventy",
  "https://mxb.dev/blog/using-webmentions-on-static-sites/" ],
  [ "Max Böck", "Webmention Analytics",
  "https://mxb.dev/blog/webmention-analytics/" ],
  ["Paul Kinlan", "Using Web Mentions in a static site (Hugo)", "https://paul.kinlan.me/using-web-mentions-in-a-static-sitehugo/"],
  [ "Sia Karamalegos", "An In-Depth Tutorial of Webmentions + Eleventy","https://sia.codes/posts/webmentions-eleventy-in-depth/" ],
  [ "Keith J. Grant", "Adding Webmention Support to a Static Site",
  "https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/"],
  [ "Chris Bongers", "Goodbye comments, welcome Webmentions",
  "https://h.daily-dev-tips.com/goodbye-comments-welcome-webmentions" ]
]}' %}
