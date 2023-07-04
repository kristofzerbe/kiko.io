---
slug: Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
title: Show pages meta data (JSON-LD) in Bottom Sheet
subtitle: Visualize the generated meta code on your page in a sliding panel for review and information purposes
date: 2023-06-11 14:11:45
photograph:
  file: 22-08 Bretagne-Jersey-0683.jpg
  name: Water Numbers
  link: https://500px.com/photo/1056125514/water-numbers-by-kristof-zerbe
categories:
  - UI/UX
tags:
  - JSON-LD
  - Meta
  - Publishing
related:
  - Provide-Blog-Metadata-via-JSON-LD
  - Discoveries-24-JavaScript-UI
  - Generate-Social-Media-Images-Automatically
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/110526411227460649
---

A few months ago I introduced new meta data (JSON-LD) for the pages of this blog and also {% post_link 2023/Provide-Blog-Metadata-via-JSON-LD "wrote about my implementation" %}. Works also everything quite well ... only the verification of the generated data was a bit cumbersome:

1. Open DevTools for a page in Chrome.
2. Search in the HEAD of the source code for the included script ("application/ld+json")
3. Copy out JSON-LD code
4. Format JSON into VS code ... and check

Nothing for now and simply impossible on the smartphone, even if there would be a reasonable Chrome extension for displaying JSON-LD data, but it does not exist (yet). Another problem was that I use automatically generated Socal Media images for my articles, which are included in the JSON-LD, but do not appear anywhere in the page and thus were beyond my control. I simply wanted to display all the generated stuff.

Since I've been a fan of the so-called bottom sheets since the first version of Google's Material Design, I imagined a script that grabs the code embedded in the page and pushes a panel with all the data visualized there into the page from the bottom ... and the whole act was easier than I thought.

<!-- more -->

---

## The Bottom Sheet Component

Recently I stumbled across a small but nice bottom sheet script that is based on jQuery but that I still use on this blog itself: [**downupPopup.js**](https://downuppopupjs.dincerali.com/) by [Ali Dinçer](https://dincerali.com/). It has several settings and is just about 5 KB in size, if you add the CSS code. What's nice about it is, that all the animations that make such a component stand out, are based on said CSS and are not jQuery-driven.

The bottom sheet is based on a base HTML element with a required child element:

```html
<div id="myElement1">
  <div class="downupPopup-content">
    Lorem ipsum dolor sit amet...
  </div>
</div>
```

This is first initialized with the desired settings, with the script adding the necessary inline styles, and then you can open and close it:

```js
$("#myElement1").downupPopup();

$("#myElement1").downupPopup('open');
$("#myElement1").downupPopup('close');
```

Now my solution should work on-the-fly and without a previously defined element in the HTML ... and it should be reusable, because if I already include a bottom sheet component, then I wanted to use it for future occasions. For this I wrote myself a small manager that makes different uses possible with a single call.

It has one function each for a specific bottom sheet dialog and beside it base variables and functions (``base``) to keep the infrastructure code of the former as small as possible:

```js dialog.js
var dpDialog = {
  'base': {
    'element': null,
    'content': null,
    'options': {
      animation: "ease",
      duration: 400,
      radiusLeft: "6px",
      radiusRight: "6px",
      width: "100%",
    },
    'init': function(options) {
      let opt = {...dpDialog.base.options, ...options};

      if ($("#dpElement").length === 0) { 
        // create new
        dpDialog.base.element = $(`
          <div id="dpElement">
            <div class="downupPopup-content"></div>
          </div>`);
          dpDialog.base.element.appendTo("body");
          dpDialog.base.content = dpDialog.base.element.find(".downupPopup-content");
      } else { // reset existing
        dpDialog.base.element.downupPopup("close");
        dpDialog.base.content.empty();
      }

      dpDialog.base.element.downupPopup(opt);
    },
    'show': function() {
      setTimeout(() => {
        dpDialog.base.element.downupPopup("open");
      }, 100);  
    }
  },
  'myFirstTest': function() {
    // INIT DIALOG
    dpDialog.base.init({
      headerText: "Test",
      distance: 75
    });

    // ADD CONTENT
    let content = `
      <section>
        <p>Lorem ipsum dolor sit amet...</p>
      </section>
    `;
    $(content).appendTo(dpDialog.base.content);

    // OPEN DIALOG
    dpDialog.base.show();
  },
  'pageMeta': function() {
    // INIT DIALOG
    dpDialog.base.init({
      headerText: "Page Meta",
      contentScroll: true,
      distance: 6
    });

    // ADD CONTENT
    // ... appending stuff to dpDialog.base.content

    // OPEN DIALOG
    dpDialog.base.show();
  }
};
window.dialog = dpDialog; // make it globally available
```

The base ``init`` function takes care of initializing the downupPopup component, including dynamically inserting the necessary HTML element and attaching the desired settings. ``show`` opens up the dialog, with a small time delay, to ensure that the content has already been inserted. 
Dialog functions in the example above are: ``myFirstTest`` and ``pageMeta``.

Calling one of the dialog functions is simple:

```html
<a href="javascript:dpDialog.myFirstTest()">Open Test Dialog</a>
```

Try here: <a href="javascript:dpDialog.myFirstTest()">Open Test Dialog</a>

### Problem with the original implementation solved

Ali decided in his original implementation to apply the given settings only once to a popup element. Once initialized, it could not be reused with different settings. To avoid having to destroy an existing element before initializing a new one, which would have caused a massive timing problem due to the animation, I decided to fork his code and give him a [pull request](https://github.com/ali-dincer/downupPopup.js/pull/2).

You can find my script here, as long as Ali didn't include the PR in his code: [kristofzerbe/downupPopup.js](https://github.com/kristofzerbe/downupPopup.js)

---

## The PageMeta Dialog

Now that I had my desired display option, it was time to bring the ``pageMeta`` dialog function to life.

My first thought was to use a JSON-LD parser in JavaScript provided by [**json-ld.org**](https://json-ld.org), but this is not even quickly usable, since it validates the code to be parsed at runtime against schema.org and every of my calls failed with CORS warnings. Now I didn't want to turn this into a PhD thesis, I just wanted to display my highly customized JSON-LD, so I worked out the function quite individually.

### The Code Itself

I wanted to show two things in the dialog: the code itself and a visual representation of it for a better overview.

Getting the content for the code was really straight forward:

```js dialog.js
...
  'pageMeta': function() {
    // INIT DIALOG
    dpDialog.base.init({
      headerText: "Page Meta",
      contentScroll: true,
      distance: 6
    });

    // ADD CONTENT
    // Grab the JSON-LD code from the page
    let json = JSON.parse($('script[type="application/ld+json"]').text());

    // Create new dialog section for the code
    let secCode = $('<section></section>').appendTo(dpDialog.base.content);
    // Append header
    secCode.append('<h1>JSON-LD</h1>');
    // Append formatted code als PRE element
    secCode.append('<pre class="json">' + syntaxHighlight(JSON.stringify(json, undefined, 2))) + '</pre>';

    // OPEN DIALOG
    dpDialog.base.show();
  }
...
```

Since I had taken care to compress my JSON-LD code to save space, I now needed to get it back into a readable format. Time saver was the following script, which I found on [StackOverflow (pretty-print JSON using JavaScript)](https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript):

```js
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}
```

```css (Stylus format)
pre.json
  font-family: 'Roboto Mono',monospace
  font-size: 13px
  .string 
    color: #4271ae
  .number 
    color: #4271ae
  .boolean 
    color: #4271ae
  .null
    color: #ababab
  .key
    color: #c15353
```


### The Visual Representation

My JSON-LD is hierarchically structured. Each page always has a ``PERSON`` block for information about me as a person, then an ``ORGANIZATION`` block about the "people" behind the blog (just me), then a ``WEBSITE`` block for the description of the website itself and a ``WEBPAGE`` block for a single page. Article pages like this, also have an ``ARTICLE`` block and the note pages have a ``BLOGPOSTING`` block.

Therefore, it seemed logical to me to display the blocks as an accordion using the DETAILS element, with only the first one open at startup.

To process the required HTML, I wrote a helper function for each block that returns a string literal template to which the calling code passes the necessary data.

To save space, only one block is included in the example below. The others work similarly. 

{% alertbox info %}
You can see the complete code here and modify it for your purposes: [**dialog.js** of the blog kiko.io](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/source/js/dialog.js).
{% endalertbox %}

```js dialog.js
...
  'pageMeta': function() {
    // INIT DIALOG
    dpDialog.base.init({
      headerText: "Page Meta",
      contentScroll: true,
      distance: 6
    });

    // ADD CONTENT
    // Grab the JSON-LD code from the page
    let json = JSON.parse($('script[type="application/ld+json"]').text());

    // Create new dialog section for the visual representation
    let secVisual = $('<section></section>').appendTo(dpDialog.base.content);

    // ... other blocks for the visual representation 

    // Block WEBSITE
    function getWebSite(website, organization) {
      return `
        <details>
          <summary>WebSite</summary>
          <div>
            <label>Name</label>
            <p>${website.name}</p>
            <label>Description</label>
            <p>${website.description}</p>
            <label>Language</label>
            <p>${website.inLanguage}</p>
            <label>Publisher</label>
            <p>${organization.name}</p>
          </div>
        </details>
      `;
    }

    // Get WebSite block from JSON
    let jWebSite = json["@graph"].filter(x => x["@type"] === "WebSite");
    // Get referenced Publisher information (Organization)
    let jPublisher = json["@graph"].filter(x => x["@id"] === jWebSite[0].publisher["@id"]);
    // Get filled HTML from template helper function above
    let tWebSite = getWebSite(jWebSite[0], jPublisher[0]);
    // Append HTML to content
    secVisual.append($(tWebSite));

    // ... other blocks for the visual representation 

    // ... (Code stuff from above)

    // OPEN DIALOG
    dpDialog.base.show();
  }
...
```

## Conclusion

It was fun to add a new feature to the site, even more so because it helps me keep track of the meta data of each page myself.

Here (or in the footer of each page) you can see the result:

<a href="javascript:dpDialog.pageMeta();"><strong>Open Page Meta for this article...</strong></a>

---

## More Information

{% moreinfo '{ "list": [
  [ "Ali Dinçer", "downupPopup.js",
  "https://downuppopupjs.dincerali.com/" ],
  [ "Kristof Zerbe", "Fork from downupPopup.js (Make Popup Reusable, with PR)",
  "https://github.com/kristofzerbe/downupPopup.js" ],
  [ "Google", "Material Design 3 - Compontents, Bottom Sheets",
  "https://m3.material.io/components/bottom-sheets/overview" ]

]}' %}