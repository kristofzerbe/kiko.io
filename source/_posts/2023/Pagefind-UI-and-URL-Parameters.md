---
slug: Pagefind-UI-and-URL-Parameters
title: Pagefind UI and URL Parameters
subtitle: 
date: 2023-01-31 11:04:00
photograph:
  file: D50_7076.jpg
  name: German Roofage
  link: https://500px.com/photo/1045391866
series: A New Blog
categories:
  - Tools
tags:
  - Hexo
  - Search
  - Blogging
related:
  - Integration-of-Pagefind-in-Hexo
  - The-State-of-the-Blog
  - Pattern-for-dynamic-Hexo-pages
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/109784950464754190
---

A couple of days ago I wrote about my attempt to {% post_link 2023/Integration-of-Pagefind-in-Hexo "integrate Pagefind in my blog" %}. In the meantime, I further refined the indexing by excluding more content areas and adding more for the metadata to make the search results even better.

But one thing was still missing: controlling the search via url parameters, so that you can actually consider the page as a search page. I came across this in a post about the sense and nonsense of Open Graph attributes and other search engine related metadata nowadays. Google, for example, [likes to use JSON-LD](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) and when describing the site you can define a search page which then makes it easier to search the site directly via Google ... see [Sitelinks search box (WebSite) structured data](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox)

In my implementation, I decided to adapt the [Pagefind UI](https://pagefind.app/docs/ui/) for myself instead of developing everything from scratch via JavaScript. There are always some limitations with pre-built solutions, but I want to show here that they are actually none for the inclusion of a url parameter.

<!-- more -->

My Pagefind search page is accessible at [/search](/search) and therefore it's easy to provide with parameters, f.e. ``/search/?q=test``. Retrieving them on the page via JavaScript is no rocket science either:

```js Search Page
<script>

  // get value search parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchString = urlParams.get("q");

  // initialize Pagefind UI
  window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({ element: "#search" });
  });

</script>
```

Now Pagefind does not offer the possibility to initialize the search on the page already with a certain value, which would be the easiest way. You can only insert the value supplied via the URL parameter into the initialized INPUT field **afterwards** and ensure that the search is triggered with it.

Unfortunately, Pagefind also does not provide a callback method to do things after successful initialization. So, my implementation needs a "guard" that kicks in as soon as the INPUT field is ready for a search string to be entered. For this I use the following small function called ``waitForElm``, which uses JS's ``MutationAbserver`` and is located in my *tools.js* file. It triggers a Promise as soon as an element is available on the page.

```js tools.js
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
```

With this function and the name of the INPUT field that Pagefind inserts into the ``#search`` wrapper during initialization, the URL parameter can now be set. 

Since Pagefind already shows results when typing the first characters, the easiest way to trigger the search after setting the value is by dispatching the ``input`` event.

```js Search Page
<script>

  // get value search parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchString = urlParams.get("q");

  // initialize Pagefind UI
  window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({ element: "#search" });
  });

  // setting the incoming value and the focus into the  
  // generated INPUT field as it appears and trigger the search
  waitForElm(".pagefind-ui__search-input").then((elm) => {
    elm.focus();
    if (searchString) { 
      elm.value = searchString;
      elm.dispatchEvent(new Event('input'));
    }
  });  

</script>
```

You can try my solution here: **[/search/?q=pagefind](/search/?q=pagefind)**
