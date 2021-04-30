---
title: Hexo and the IndieWeb
subtitle: Make your blog ready for social interaction via Webmentions
hitcountId:
date: 2021-05-02 12:00:00
photograph:
  file: DSC_5088.jpg
  name: Steel Flower
  link: 'https://500px.com/photo/82409209'
categories:
  - Tools
tags:
  - Hexo
  - Blogging
  - Publishing
  - Share
related:
  - Using-GitHub-as-Commenting-Platform
  - Show-related-posts-in-Hexo
  - Pimping-the-Permalink
hidden: true
---

It is cool to publish your thoughts on your own blog under your only domain and not only on big social media platforms, because that way you keep control over your content. But what makes Facebook, Twitter and others "social" is the interaction between the people. Likes, Retweets, Mentions, Replies are the fuel which drives them. But most of the blogging solutions offers only rudimentary interactions, in form of article comments. The comment hurdle is high because interacting on someone else's site is different from interacting on what is supposed to be your own, such as your Twitter or Facebook feed.

The project [**IndieWeb**](https://indieweb.org/) and their approach of [**Webmentions**](https://indieweb.org/Webmention), has the goal to fill this gap. As a [W3C recommendation](https://www.w3.org/TR/webmention/), it defines standards how the social interaction of independent blogging solutions can be technically implemented without the need of manual intervention. Let software do the job...

In this article I will only briefly go into the basics and then show an implementation solution for the SSG [**Hexo**](https://hexo.io).

<!-- more -->

---

## Terminology & Basic Concepts

There are a lot of posts out there which explains the basic concepts of the IndieWeb and Webmentions in particular and you will stumble upon some terms, which has to be explained:

<details>
  <summary>Personal Domain</summary>
  <blockquote>... is a domain name that you personally own, control, and use to represent yourself on the internet. Getting a personal domain is the first step towards getting on the indieweb, and is therefore a requirement for IndieMark Level 1</blockquote>
  <cite><a href="https://indieweb.org/personal-domain">indieweb.org (Personal Domain)</a></cite>
</details>

<details>
  <summary>Microformats</summary>
  <blockquote>... are small patterns of HTML to represent commonly published things like people, events, blog posts, reviews and tags in web pages. They are the quickest & simplest way to provide an API to the information on your website.</blockquote>
  <cite><a href="http://microformats.org/">microformats.org (Wiki)</a></cite>
</details>

<details>
  <summary>POSSE</summary>
  <blockquote>... is an abbreviation for Publish (on your) Own Site, Syndicate Elsewhere, the practice of posting content on your own site first, then publishing copies or sharing links to third parties (like social media silos) with original post links to provide viewers a path to directly interacting with your content.</blockquote>
  <cite><a href="https://indieweb.org/POSSE">indieweb.org (POSSE)</a></cite>
</details>

<details>
  <summary>Backfeed</summary>
  <blockquote>... is the process of syndicating interactions on your POSSE copies back (AKA reverse syndicating) to your original posts.</blockquote>
  <cite><a href="https://indieweb.org/backfeed">indieweb.org (Backfeed)</a></cite>
</details>

<details>
  <summary>Webmentions</summary>
  <blockquote>... is a web standard for mentions and conversations across the web, a powerful building block that is used for a growing federated network of comments, likes, reposts, and other rich interactions across the decentralized social web.</blockquote>
  <cite><a href="https://indieweb.org/Webmention">indieweb.org (Webmention)</a></cite>
</details>

<details>
  <summary>Web sign-in</summary>
  <blockquote>... is signing in to websites using your personal web address (without having to use your e-mail address). Web sign-in supersedes OpenID.</blockquote>
  <cite><a href="https://indieweb.org/Web_sign-in">indieweb.org (Web sign-in)</a></cite>
</details>

<details>
  <summary>RelMeAuth</summary>
  <blockquote>...is an authentication method that uses personal URL for identity that rel-me link to established OAuth provider(s) to perform the actual authentication.</blockquote>
  <cite><a href="https://indieweb.org/RelMeAuth">indieweb.org (RelMeAuth)</a></cite>
  <blockquote>... is a proposed open standard for using rel="me" links to profiles on oauth supporting services to authenticate via either those profiles or your own site. RelMeAuth is the technology behind Web sign-in.</blockquote>
  <cite><a href="http://microformats.org/wiki/RelMeAuth">microformats.org (RelMeAuth)</a></cite>
</details>

<details>
  <summary>IndieAuth</summary>
  <blockquote>... is a federated login protocol for Web sign-in, enabling users to use their own domain to sign in to other sites and services.</blockquote>
  <cite><a href="https://indieweb.org/IndieAuth">indieweb.org (IndieAuth)</a></cite>
</details>

All these concepts describe aspects of the technical implementation in a blog software to become part of the automated social interaction.

Four things has to be supported:

1. The HTML has to tell others who you are
2. The HTML has to give basic informations about your articles (posts)
3. Sending a message to another blog, in case you mentioned one of its posts
4. Reveiving messages from other blogs, in case they mentioned one of your posts

Point 3 is probably the most interesting for all of us, because it pats our own ego on the back, since we usually don't write for ourselves, but for others, and reactions to it show us that it wasn't pointless.

---

## Step 1: The Personal & Profile HTML

### Personal Information

HTML is machine-readable per se, but you have to tell others what to look for to get specific information about you, like your name, your mail-address or links to other profiles f.e. Github, Twitter and so on.

It is necessary to have this information not only in an ABOUT page, but also on each post page. You can achieve this either by having an ABOUT block like here on kiko.io or providing the information in hidden HTML tags elsewhere in your HTML. It does not matter which tags you use, you only have to add a defined  class to the tag of a particular information in your Hexo EJS file. The information will be extracted out of the tag's inner text.

The most used classes for personal blogs as follows:

|Class|Information|
|---|---|
|[**h-card**](http://microformats.org/wiki/h-card)|Wrapper for all personal information.<br> *All other classes below has to be used on child tags*|
|**p-name**|Full name|
|**u-email**|Email address|
|**u-photo**|Photo|
|**p-role**|Role|
|**u-url**|URL representing the person|
|**p-locality**|City or Town|
|**p-region**|State or province|
|**p-country-name**|Country name|

{% alertbox exclamation %}
Please keep in mind not to give too much information about you to the public. It could get unpleasant...
{% endalertbox %}

### Profile Information

For providing links to other profiles, anchor (``A``) tags with the special attribute [``rel="me"``](http://microformats.org/wiki/rel-me) will be used, which indicates profile equivalence and can be used for [identity-consolidation](http://microformats.org/wiki/identity-consolidation).

With this extension of you blog HTML, you are able to sign in using your domain at sites which provide **Web Sign-In** over the concept of **RelMeAuth**, for example thos who use [**IndieAuth**](https://indieauth.com/). You only have to make sure, that the endpoints of your profile links have **backlinks to your blog** with a ``rel="me``". Unfortunately, not many services offer the definition of such a backlink. Github, for example, is an exception.

### Example

{% asset_img about-markup.png %}

---

## Step 2: The Article HTML

Tagging posts with meta information for the IndieWeb is similarly simple, by adding following classes in your article.ejs file:

|Class|Information|
|---|---|
|[**h-entry**](http://microformats.org/wiki/h-entry)|Wrapper for all post related information|
|**p-name**|Title|
|**p-summary**|Short summary|
|**e-content**|Content| 
|**dt-published**|Publish date|
|**dt-updated**|Update date|
|**u-url**|Permalink|

In case you work with the default Hexo theme 'landscape', I advise you to split your ``article.ejs`` in two files, because it is used for the article itself and for the excerpts on the start page and archive pages also. I have made an ``excerpt.ejs`` with all the information needed for listing the posts and cut back my ``article.ejs`` to the bare minimum, but with the IndieWeb related classes above (of course in the linked partials), because only the article page itself should have these informations, respectively an ``h-entry`` class, to indicate that there are IndieWeb data!

```html article.ejs

<article id="<%= post.layout %>-<%= post.slug %>" 
         class="article article-type-<%= post.layout %> h-entry" itemscope itemprop="blogPost">
  
  <div class="article-meta">
    <%- partial('post/date', { class_name: 'article-date', date_format: 'DD MMM YYYY' }) %>
    <%- partial('post/category', { class_name: 'article-category' }) %>
  </div>
  
  <div class="article-inner">
    <header class="article-header">
      <%- partial('post/title', { class_name: 'article-title', show_link: false }) %>
      <%- partial('post/subtitle', { class_name: 'article-subtitle' }) %>
    </header>
    
    <div class="article-entry e-content" itemprop="articleBody">
      <%- post.content %>
    </div>
    
    <footer class="article-footer">      
      <%- partial('post/tag', { class_name: 'article-tags' }) %>
      <%- partial('post/permalink', { class_name: 'article-permalink' }) %>
    </footer>
  </div>

  <%- partial('post/comments') %>
  <%- partial('post/related') %>
  <%- partial('post/nav') %>

</article>
```

---

## Step 3: Sending Webmentions

After you have created your new Hexo post with ``hexo new post "My Post"`` and spend a couple of minutes/hours/days on writing meaningful text, you publish it by running ``hexo generate`` and copying the generated HTML to your server. Next step would be to inform all the blogs you linked to in your post that you have done just that. You want to send **Webmentions**.

Doing this together with generating or uploading is suboptimal, because you only want to do this once and preferably for all links in your article ... and in an automated way.

A good solution is to use [**webmention.app**](https://webmention.app/) from Remy Sharp for creating a separate [Hexo Console](https://hexo.io/api/console.html) Command, which calls Remy's service for the newly generated post URL.

---

## Step 4: Receiving Webmentions

---

{% moreinfo '{ "list": [
  [ "Max Böck", "Using Webmentions in Eleventy",
  "https://mxb.dev/blog/using-webmentions-on-static-sites/" ],
  [ "Sia Karamalegos", "An In-Depth Tutorial of Webmentions + Eleventy","https://sia.codes/posts/webmentions-eleventy-in-depth/" ],
  ["Paul Kinlan", "Using Web Mentions in a static site (Hugo)", "https://paul.kinlan.me/using-web-mentions-in-a-static-sitehugo/"],
  ["Paul Kinlan", "Webmention.app", "https://paul.kinlan.me/webmention-app/"],
  [ "Remy Sharp", "Send Outgoing Webmentions", 
  "https://remysharp.com/2019/06/18/send-outgoing-webmentions" ],
  [ "Bryce Wray", "Webmentions in three SSGs: Part 1", 
  "https://brycewray.com/posts/2020/04/webmentions-three-ssgs-1" ],
  [ "Several (Forum)", "Anyone for Webmention?", 
  "https://discourse.gohugo.io/t/anyone-for-webmention/10411" ]
]}' %}