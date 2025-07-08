---
hasLocale: true
#--------------------------------------------------
slug: Display-a-notification-for-outdated-posts
title: Display a notification for outdated posts
subtitle:
date: 2025-07-08 15:05:00
photograph:
  file: 24-12-Suedafrika-3330-D70.jpg
  name: Hartebeest Grass
  socialmedia: /static/images/social-media/Display-a-notification-for-outdated-posts.jpg
series: A New Blog
categories:
  - Coding
tags:
  - Hexo
  - JavaScript
related:
  - jsrepo-Build-your-own-tool-registry
  - Hexo-Determine-and-Use-Online-Status
  - Convert-HTML-into-Plain-Text-in-Hexo
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114819276808921125
---

I am always confused when I am researching something on the web and a hit does not include the date when the author wrote the post. Unfortunately, this is all too often the case with blog posts. Other sources such as forums (Stack Exchange and the usual suspects) normally do not have this problem. In that context, I always look at the date of the response first and can then guess whether the post is out of date or not. In the IT sector in particular, posts have a fairly short half-life, and it makes a world of difference whether you try to solve a problem with completely outdated information or with something that is still fairly recent.

For the reasons mentioned above, all my posts here on kiko.io therefore have the date of posting in small but clear letters in the top left corner for reference. Following the impetus of [Elio Struyf](https://www.eliostruyf.com/), who adds a note to his posts after one year, this may sometimes not be striking enough, so I have decided to introduce such notes on the age of a post as well, but in a slightly more thoughtful way.

<!-- more -->

Articles age at different paces, or not at all. Why should I warn people that my photo posts are a year old or even older? Photos last forever. The same goes for events, which usually have the date in the title. In 'Best of &lt;year&gt;' posts, age warnings only make limited sense, because although it is clear that the information comes from a specific period of time, one or two links may already have gone the way of all things earthly. So my system had to be moderately flexible.

---

## Defining the time frame

First of all, I have introduced a new attribute called ``outdates:`` in the Frontmatter of my posts and assigned the value ``never`` to all posts for which I do not want to display such a notice at any time. For those posts that should receive the notice after a certain period of time after creation, I have chosen a short format that covers the three most important periods: ``y`` for years, ``m`` for months and ``d`` for days, although I don't think I'll ever need the latter. Preceded by a number, it gives a period of time that is easy to evaluate ... for example, ``2y`` means 2 years or ``18m`` means 18 months.

However, I found it too time-consuming to adjust every post from the last 5 years and remember to fill in 'outdates' every time I post something new. Since each article only has a single category, even though my SSG system [Hexo](https://hexo.io) offers a list for this purpose, I have added a new section to my ``config.yml`` that specifies a default for each necessary category:

```yaml
outdates:
  - default: 1y
    categories:
      - Misc
  - default: 18m
    categories:
      - Collection
  - default: 2y
    categories:
      - Coding
      - Tools
      - UI/UX
```

So I already had a suitable value (a ``periodShort``) set for all posts that should receive the note, which I only had to evaluate in the EJS-based template for the articles.

---

## Implementation

For the top edge of my posts, I have integrated a while ago a feature for informative text that I could use for the notes. I put the little bit of HTML and the calculation of when to display it in an EJS partial and integrated this into the main template:

```ejs article.ejs
...
<div class="article-inner">
  <%- partial('post/outdates') %>
  ...
</div>
...
```

```ejs outdates.ejs
<%
  let outdateText;
  let periodShort = post.outdates;

  // ...
  // outdateText = ... 
%>
<% if (outdateText) { %>
  <small class="top-exclamation">
    <span><%- outdateText %></span>
  </small>
<% } %>
```

First, I ruled out that the value 'never' would result in output text and then determine the default based on the category, if one is specified for the article:

```js outdates.ejs
let outdateText;
let periodShort = post.outdates;

if (periodShort !== "never") {

  // get default by category from config
  if (periodShort === undefined && post.categories && post.categories.length) {
    const category = post.categories.data[0].name;
    periodShort = config.outdates.find(od => od.categories.includes(category))?.default;
  }

  // ...
  // outdateText = ... 
}
```

The next step was to break down and evaluate the ``periodShort``. I outsourced the former to a separate [Hexo helper](https://hexo.io/api/helper), so here is just the JS code, which can also be integrated into EJS as is. It returns a whole bundle of information, including the number of days expressed by a ``periodShort``. This is then used for ongoing calculations later on.

```js
function convert_periodshort(value) {

  let ret = {
    num: parseInt(value.slice(0, -1)),
    unit: value.slice(-1)
  }

  ret.numString = humanizeNumber(ret.num);

  switch (ret.unit) {
    case "y": 
      ret.unitString = "year" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num * 365; 
      break;
    case "m": 
      ret.unitString = "month" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num * 30; 
      break;
    case "d": 
      ret.unitString = "day" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num; 
      break;
    default: break;
  }

  return ret;
}
```

In line 8, ``humanizeNumber`` converts the numerical value into a word, for example "8" into "eight". I have omitted this code here, as there are countless variants of this on the web. However, you can also just use ``ret.num`` here.

Here is how the function is used in the EJS partial and how the difference between the creation date (or the date of the last update, if available) and today is calculated in days. The two daily totals are then compared with each other and if the difference is greater than the number of days from the period value, the text is set to display and the variables are filled in. However, I use ``maxYears`` before to check whether the difference is perhaps more years ago than required, to prevent the text from saying "more than 2 years" when it is already 5.

```js outdates.ejs
if (periodShort !== "never") {

  // get default by category from config
  // ...

  if (periodShort) {
    let period = convert_periodshort(periodShort);

    const dateToday = new Date();
    const dateCreated = new Date((post.updated > post.date) ? post.updated : post.date);
    const diffTime = Math.abs(dateToday - dateCreated);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let maxYears = Math.floor(diffDays / 365);
    if ((period.unit === "y" && maxYears > period.num) || (period.unit !== "y" && maxYears >= 1)) {
      period = convert_periodshort(maxYears + "y");
    }

    outdateText =
      `This post is over ${period.numString} ${period.unitString} 
      old. Please be aware that some of this information may no 
      longer be up to date, links may no longer work, or the author 
      may simply has a different opinion or solution today.`;
  }
}
```

---

## The Result

... is quite appealing and informative, in my opinion, and will now be displayed alongside articles where it makes sense.

![](/post/Display-a-notification-for-outdated-posts/outdated-post-note-sample.jpg)

In the original code ([see on GitHub](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/layout/_partial/post/outdates.ejs)), I have also added localisation into German.
