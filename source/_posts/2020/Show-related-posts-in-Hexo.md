---
slug: Show-related-posts-in-Hexo
title: Show related posts in Hexo
subtitle: null
date: 2020-10-03T13:17:03.000Z
photograph:
  file: 18-09-Kroatien-0323.jpg
  name: Garden Eden
  socialmedia: /static/images/social-media/Show-related-posts-in-Hexo.jpg
series: A New Blog
categories:
  - Tools
tags:
  - Hexo
related:
  - 404-Page-in-Hexo-for-GitHub-Pages
  - A-New-Blog-Customizing-Hexo
  - A-New-Blog-VS-Code-Hexo-and-GitHub-Pages
---
It is always nice to point the readers of your blog's articles to related posts, they might be interested in. They stay a little longer to understand what you have to offer and increases the likelihood that they become loyal readers, followers or subscribers. Related posts has become a standard on delivering news and posts.

In the default Hexo theme **Landscape**, on which this blog is based, there is no such function built in, but as the Hexo community is very busy, there are some plugins you can use.

<!-- more -->

## Plugin: hexo-list-related-posts

This plugin, available at [GitHub](https://github.com/nkmk/hexo-list-related-posts) is pretty lean and generates a list of links to related posts based on tags. It just counts how often a tag is occuring and shows a list of related posts either by count descending or randomly.

**Advantage**:

* Easy and fast

**Disadvantage**:

* Necessity of a sophisticated tag system
* Technical approach

## Plugin: hexo-related-posts

[Sergey Zwezdin](https://github.com/sergeyzwezdin/hexo-related-posts) made much more effort in his solution. The plugins depends on statistic methodologies like [Stemming](https://en.wikipedia.org/wiki/Stemming) and [TF/IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf), provided by the Node library [Natural](https://github.com/NaturalNode/natural). It has plenty setting options like weighting and reserved words in order to optimize results.

**Advantages**:

* Much better results

**Disadvantages**:

* Huge installation, because of many dependent Node modules
* Necessity of maintaining reserved words
* Technical approach

## Manually Curated

One point, that no technical solution can achieve is: you can guide the reader through your blog, by pointing out posts, which doesn't really belong to the topic, but tries to give him a wider perspective on your thoughts or work. This is only possible, if you link the related posts manually. Here is a way to implement the requirements...

The right place to store related posts is in the [Frontmatter](https://hexo.io/docs/front-matter.html) of your article. Create a list below the keyword ``related`` and take the slug (name of the post file) of the posts you want to show below the article as entries:

```yaml
title: My New fancy Post
related:
  - my-other-post
  - one-of-my-first-posts
  - yet-another-post
```

In your ``article.ejs`` add a new partial called **related** to the place where it should be shown under the content of the actual article:

```html
<article 
  id="<%= post.layout %>-<%= post.slug %>" 
  class="article article-type-<%= post.layout %>" 
  itemscope itemprop="blogPost">
  
  ...

  <div class="article-inner">
    <%- post.content %>
  </div>

  <% if (!index){ %>

    <!-- NEW RELATED PARTIAL -->
    <%- partial('post/related') %>

    <%- partial('post/comments') %>
    <%- partial('post/nav') %>
  <% } %>

</article>
```

In the folder ``themes/landscape/layout/_partial/post``, where all partials are stored which belongs to posts, create the new partial file:

```html related.ejs
<% if (post.related && post.related.length){ %>
  <div class="article-related">
    <h2>Related</h2>
    <div class="archives">

      <!-- Loop through the Frontmatter list of RELATED posts -->  
      <% post.related.forEach(function(item) { %>

        <!--Determine the post(s) with the given slug -->  
        <%
          var posts = site.posts.filter(function(post) {
            return post.slug.toLowerCase() === item.toLowerCase();
          });
        %>

        <!-- Loop through the post(s) and render the archive panel -->
        <% posts.each(function(post) { %>
          <%- partial('../archive-post', { post: post, show_link: true }) %>
        <% }); %>

      <% }); %>

    </div>
  </div>
<% } %>
```

<small><em>(Remove the comments, because they doesn't belong to EJS)</em></small>

In this partial we loop through the Frontmatter list of related posts, determine the post by the given slug and render an archive panel for each post.

The list ``site.posts`` should always contain a slug just once, therefore getting an array of posts and looping is just a precuation.

What you are getting you can see below...