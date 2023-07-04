---
slug: Extension-of-downupPopup-Back-Button-Escape-Key-More
title: 'Extension of downupPopup: Back Button, Escape Key & More'
subtitle: Contributing to Ali Dinçer's Bottom Sheet project
date: 2023-07-04 13:07:38
photograph:
  file: D50_7484.jpg
  name: Garden Beauties XV
  link: https://500px.com/photo/1049601877/Garden-Beauties-XV-by-Kristof-Zerbe/
categories:
  - UI/UX
tags:
  - UI
  - jQuery
  - GitHub
  - Contributing
related:
  - Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
  - Provide-Blog-Metadata-via-JSON-LD
  - Discoveries-24-JavaScript-UI
syndication:
  - host: Mastodon
    url: null
hidden: true
---

I recently introduced a Bottom Sheet dialog on this blog to display a page's metadata, using Ali Dincer's work: [downupPopup](https://downuppopupjs.dincerali.com/). I described the way to do this in my post [Show pages meta data (JSON-LD) in Bottom Sheet](/post/Show-pages-meta-data-JSON-LD-in-Bottom-Sheet/).

Shortly after that [Koos Looijensteijn](https://octodon.social/@koos) triggered me with his post [How to make digital business cards and share them via QR codes](https://www.kooslooijesteijn.net/blog/digital-business-cards-vcard-qr-code-website) and I felt like using my newly introduced dialog manager based on downupPopup for my own contact card. But more about that at a later time, respectively blog post...

Important for this post is that Ali's bottom sheet solution did not offer everything I wanted for my implementation:

## Make Dialog Reusable

Ali's approach to calling the dialog was to create and initialize the necessary HTML elements if it didn't already exist in the DOM. I pulled out the initialization to make the component reusable. There is now a preparation part and an initialization part and the latter is always called, no matter if another bottom sheet dialog was already created before.

[My commit on this part](https://github.com/ali-dincer/downupPopup.js/pull/2/commits/f3751ca56c4809decc1ec3845e5c301a13292773)...

<!-- more -->

## Dynamic Distance



## Closing Dialog by ESC Key or BACK Button


