---
slug: Ensure-Accessibility-on-Icon-Links
title: Ensure Accessibility on Icon Links
subtitle: ... automatically with a small client-side script
date: 2024-07-25 08:06:34
photograph:
  file: 23-05-Holland-0368.jpg
  name: Red Black Pigeon
  socialmedia: /static/images/social-media/Ensure-Accessibility-on-Icon-Links.png
categories:
  - UI/UX
tags:
  - Accessibility
  - JavaScript
  - UI
related:
  - Use-a-duplicate-image-to-drop-a-shadow
  - Don-t-be-ignorant-and-offer-a-theme-switch
  - SVG-Resources
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112848140684070777
  - host: DevTo
    url: https://dev.to/kristofzerbe/ensure-accessibility-on-icon-links-4j7g
---

I am gradually saying goodbye to icon fonts in this blog in favor of SVG files, which I prefer to integrate using ``background-image`` in order to remain flexible. 

During the modification, I noticed that although I have sometimes provided icon-only links with a ``title``, these do not play any role in terms of [accessibility](https://www.a11yproject.com/posts/creating-valid-and-accessible-links/). People who are dependent on a screen reader have not yet been able to recognize what these links are.

Where were two ways to change this: ``aria-label`` or add text and make it invisible. The former is basically just a crutch that is [not even fully supported](https://www.w3.org/WAI/ARIA/1.0/CR/implementation-report) by all browsers and so only the invisible text remained. I found a suitable and very well-working solution on [Stack Overflow](https://stackoverflow.com/questions/62703524/how-to-make-an-html-link-displayed-as-an-icon-accessible) by [GrahamTheDev](https://dev.to/grahamthedev):

```html
<a class="my-icon-link" title="My Link">
  <span class="visually-hidden">My Link</span>
</a>
```

```css
.my-icon-link {
  background-image: url(/images/icons/my-icon.svg);
}

.visually-hidden { 
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px; 
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: rect(1px, 1px, 1px, 1px); /*maybe deprecated but we need to support legacy browsers */
  clip-path: inset(50%); /*modern browsers, clip-path works inwards from each corner*/
  white-space: nowrap; /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
}
```

<!-- more -->

My task was now to extend all textless icon links in the code with the SPAN ... or to find an **automatism** for this, because all these links already have a title and it is exactly what needs to be transferred to the link text.  Since accessibility is not impaired when text is injected via JavaScript, I have found the following **client-side** solution, which is embedded in the footer of each page via ``script``:

```js
function ensureIconLinkText() {
  let linksWithoutText = document.querySelectorAll("a[href^='http']:empty");
  linksWithoutText.forEach(e => {
    if (window.getComputedStyle(e).display !== "none") {
      if (e.title) {
        let eText = document.createElement("span");
        eText.innerText = e.title;
        eText.classList.add("visually-hidden");
        e.append(eText);
      } else {
        console.error("Link without Text and Title: " + e.outerHTML);
      }
    }
  });
}

ensureIconLinkText();
```

The code in text form:
*Find all A tags without text, run through them and if the element was not intentionally hidden and if a title is defined, create a new SPAN tag with its text value und insert this into the link, otherwise output an error in the console* 

With this approach, I can leave the links as they are and can see in the console whether I have forgotten a title somewhere.
