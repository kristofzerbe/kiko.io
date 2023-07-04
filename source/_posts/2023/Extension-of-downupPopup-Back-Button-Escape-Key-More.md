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
---

I recently introduced a Bottom Sheet dialog on this blog to display a page's metadata (<a href="javascript:dialog.pageMeta()">like this</a>), using Ali Dincer's work: [**downupPopup**](https://downuppopupjs.dincerali.com/). I described the way to do this in [a post](/post/Show-pages-meta-data-JSON-LD-in-Bottom-Sheet/) a couple three weeks ago.

Shortly after that [Koos Looijensteijn](https://octodon.social/@koos) triggered me with his post [How to make digital business cards and share them via QR codes](https://www.kooslooijesteijn.net/blog/digital-business-cards-vcard-qr-code-website) and I felt like using my newly introduced dialog manager based on downupPopup for my own contact card.  
**But more about that at a later time, respectively blog post...**

Important for this post is that Ali's bottom sheet solution did not offer everything I wanted for my implementation:

## 1. Make Dialog Reusable

As I have already described in the above mentioned article: Ali's approach to calling the dialog was to create and initialize the necessary HTML elements if it didn't already exist in the DOM. I pulled out the initialization to make the component reusable. There is now a preparation part and an initialization part and the latter is always called, no matter if another bottom sheet dialog was already created before.

[My GitHub commit on this part](https://github.com/ali-dincer/downupPopup.js/pull/2/commits/f3751ca56c4809decc1ec3845e5c301a13292773)...

<!-- more -->

---

## 2. Dynamic Distance

Since it makes no sense to have to scroll around on a contact card if the space provided by the web designer is not sufficient at small resolutions, I need a more dynamic approach to Ali's *``distance``*, which sets the distance of the bottom sheet to the top of the viewport. 

To do this, I introduced a new setting called **``minContentHeight``** that can specify in pixels how high the content must be at least for everything to be visible. Because this makes the possibly specified ``distance`` absurd,  I overwrite this specification with a value calculated with it and only then enter the distance value into the element attribute for further use. 

For the calculation to be correct, however, I need a fixed value for the HEADER of the dialog at this point, which was previously only defined in the CSS. In retrospect, this was a good decision, because once slight pixel shifts between HEADER and CONTENT disappeared in Google's Chrome, my preferred browser.

```js downupPopup.js
// Option Handling
...

var settings = $.extend({
  ...
  minContentHeight: null,
  ...
});

// Initialization
...

// setting header height
const $head = $this.find(".downupPopup-header");
$head.find("span").text(settings.headerText);
const headH = 6;
$head.css('height', '' + headH + 'vh');

// calculating dynamic distance by given minContentHeight
if (settings.minContentHeight) { 
  let calcDistance = Math.round((100 * (window.innerHeight - settings.minContentHeight) / window.innerHeight)) - headH;
  settings.distance = Math.max(0, calcDistance);
}

$this.attr('distance', settings.distance);

// setting distance to top
const $cont = $this.find(".downupPopup-content");
const contH = 100 - settings.distance - headH;
$cont.css('height', '' + contH + 'vh');
...
```

[My GitHub commit on this part](https://github.com/ali-dincer/downupPopup.js/pull/2/commits/0b1b72a4dd5ceb4b1436540a44c24f256f92a1ad)...

---

## 3. Closing Dialog by ESC Key or BACK Button

With Koos' really nice [contact card](https://www.fortomorrow.eu/en/contact/koos), I noticed that I automatically tried to close his SHARE DATA popup dialog with the QRCode, which is created on-the-fly with JavaScript, with the BACK button, but ended up on a completely different, previously called page. I guess this is a psychological thing: if an element not bound to the url overlaps the current page, people (or just me?) perceives it as an independent page and try to navigate with long learned methods.

So what was missing was, on the one hand, the ability to close the dialog using the **ESCAPE key** (for desktop users) and, on the other hand, to manipulate the URL history so that the **BACK button** or the corresponding mobile gesture works as expected.

For the latter I needed again a new setting: the hash which will be added to the current URL to make the BACK button work: ``urlHash``. 

In addition, there were several redundant places in the original code, with which the dialog was closed, which I have summarized in a function, in order to avoid the new necessary to write several times. ([my GitHub commit on this part](https://github.com/ali-dincer/downupPopup.js/pull/2/commits/fa0e119b42a444f1cb671d02381029f662d94591)).

```js downupPopup.js
// Option Handling
...

var settings = $.extend({
  ...
  urlHash: null,
  ...
});

// General CLOSE function
function close() {
  ...

  // unbind ESC
  $(document).off('keyup');

  // remove url hash & unbind BACK button
  if (settings?.urlHash || $this.attr('hash')) {
    history.replaceState(null, null, ' ');
    $(window).off("popstate");
  }
}

// Initialization
...

// bind ESC to close
$(document).on('keyup', function(event) {
  if(event.key == "Escape") {
    close();
  }
});

if (settings.urlHash) {
  // set url hash & bind BACK button to close
  window.location.hash = settings.urlHash;
  $(window).on("popstate", function(){
    close();
  });
}

$this.attr('hash', settings.urlHash);

...
```

The key of this code regarding the BACK button is to put the passed hash into the URL when initializing the dialog via ``window.location.hash`` and to make sure that it is closed when the hash is removed again by the BACK button. I achieved this by using the [``popstate``](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event) event, which fires when the active history entry changes.

When the dialog is about to close, I had to make sure that the ``history`` entry is overwritten via [``replaceState``](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) with ``null`` (delete) and remove the previously bound ``popstate`` event again, to avoid side effects.

The code for the ESC key is similar: Bind the ``keyup`` event on startup to close the dialog and remove it again on close.

[My GitHub commit on this part](https://github.com/ali-dincer/downupPopup.js/pull/2/commits/1577a0e6306f75101afb09dc05f7abf80dc29e40)...

---

## Conclusion

Everything works as expected and I hope that Ali will process my pull request soon. Until then you can find the code [in my fork](https://github.com/kristofzerbe/downupPopup.js).

All in all, the script has not become more readable or easier to maintain, even by using jQuery. In my head I already have the idea to do a complete rewrite as ESM class. Reason for this is surely Ali's approach to realize commands like 'open' and 'close' as string parameters. This works better than real functions of an instantiated object. Furthermore, it is necessary to cache settings like ``distance`` and ``urlHash`` in HTML attributes, which does not have to be this way.