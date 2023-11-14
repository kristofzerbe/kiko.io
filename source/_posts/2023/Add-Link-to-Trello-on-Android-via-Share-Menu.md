---
slug: Add-Link-to-Trello-on-Android-via-Share-Menu
title: Add Link to Trello on Android via Share Menu
subtitle:
date: 2023-11-13 17:11:47
photograph:
  file: D50_1524.jpg
  name: Floral Magic VIII
  socialmedia: /static/images/social-media/Add-Link-to-Trello-on-Android-via-Share-Menu.png
categories:
  - Tools
tags:
  - Trello
  - Android
related:
  - Add-website-to-Trello-card-the-better-way
  - Adding-Screenshots-to-Trello-Cards-on-Android
  - Generate-Content-from-Trello
syndication:
  - host: Mastodon
    url: null
---

I have been collecting interesting links in various Trello boards for many years and also process some of them automatically, such as my [Tiny Tools](/collections/tiny-tools).

However, the official Trello Android App has the problem eversince that, when you want to create a URL as a Trello card in the browser, the URL is entered in the ``Description`` and not as an ``Attachment``, where it actually belongs.

![Share Link with Trello App](share-trello-app.png)

I have solved this for myself for years using a **bookmarklet** in the Chrome browser (see {% post_link 2020/Add-website-to-Trello-card-the-better-way %}) and get along quite well with it. However, there is one catch, that has annoyed me ever since:  
I find an interesting link in the Mastodon WebApp, for example, and tap on it. What opens, however, is the WebView integrated in Android and not my standard Chrome browser, in which the bookmarklet would be available. So, for links that I want to store, I always have to open the WebView menu and select "Open in Chrome Browser". I cannot use the general SHARE menu. At least not so far ... :)

<!-- more -->

The bookmarklet does nothing more as sending the link with some additional information like ``name`` (title) to the URL [https://trello.com/add-card](https://trello.com/add-card), where the user can select the desired board and list:

```js Trello-AddCard-Bookmarklet.js
javascript: (function (win, name, desc) {
  win.open(
    "https://trello.com/add-card" +
      "?source=" +
      win.location.host +
      "&mode=popup" +
      "&url=" +
      encodeURIComponent(win.location.href) +
      (name ? "&name=" + encodeURIComponent(name) : "") +
      (desc ? "&desc=" + encodeURIComponent(desc) : ""),
    "add-trello-card",
    "width=500,height=600,left=" +
      (win.screenX + (win.outerWidth - 500) / 2) +
      ",top=" +
      (win.screenY + (win.outerHeight - 740) / 2)
  );
})(window, document.title, getSelection ? getSelection().toString() : "");
```

If you want to use this bookmarklet, you have to remove all line breaks from the code, decode the url and save it as a bookmark ... or you visit [https://trello.com/add-card](https://trello.com/add-card) and drag the link "Send to Trello" to your bookmark list. It comes out the same.

![Create Link Card via Trello Add Card Page](trello-add-page.png)

As I said above, the Trello Bookmarklet e.g. Add Card page works differently to the Android app from the same company in terms of the URL. Are different departments not talking to each other?

However ... for me, the bookmarklet is history, because there is a much better approach that uses the Add Card page also, but can be called up from the standard Android Share Menu.

---

## Power Tool: HTTP Shortcuts

The trigger for my new solution was my search for better interaction possibilities from my blog to the IndieWeb. One hit was the article [Android IndieWeb interactions with the HTTP Shortcuts app](https://snarfed.org/android-indieweb-interactions-with-the-http-shortcuts-app) by Ryan Barrett, which uses the app [**HTTP Shortcuts**](https://http-shortcuts.rmy.ch/) by **Roland Meyer** to serve as a **Share Target** for LIKE, FOLLOW and REPLY actions. 

Share Target? A while ago I had the idea of using the [Web Share Target API](https://developer.chrome.com/articles/web-share-target/) to solve my problem above, but haven't got round to setting up such a PWA yet.

But I no longer have to do that, because the HTTP Shortcuts app not only offers me the option of serving as a share target, but also significantly more functions for creating Android shortcuts, which are extremely useful:

- **Browser Shortcut** - Open the URL in the browser
- **Scripting Shortcut** - Write JavaScript for advanced workflows
- **Multi-Shortcut** - Trigger multiple shortcuts at once

All these shortcuts can be used to send any HTTP requests and process the responses in a variety of ways. The feature list is impressive and well [documented](https://http-shortcuts.rmy.ch/documentation).

### Scripting Shortcut for calling Trello's Add Card Page

For my case, I need a scripting shortcut to process the information shared by the Android sharing dialogue to call the Add Card page. This is done via static variables that are created in HTTP Shortcuts and can then be used later in the script:

![Setting Up Variables](httpshortcuts-variables.png)

Creating the shortcut is quite simple, as you can see from the screenshots. Select the type, assign a name, perhaps a suitable icon and (importantly) tick the option **Show as app shortcut on launcher and promote as Direct Share target**, which ensures that the shortcut appears in the Android Share menu.

![Shortcuts List and Creating/Editing Shortcut](httpshortcuts-shortcut.png)

![Scripting Shortcut Settings](httpshortcuts-shortcut-settings.png)

The script is no less straightforward, because it simply assembles the URL to the Trello Add Card page with the static variables and opens it using the app's built-in JavaScript function ``openUrl``:

```js
const url = getVariable("SharedUrl");
const title = getVariable("SharedTitle");

const getHostnameFromRegex = (url) => {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches && matches[1];
}
const hostname = getHostnameFromRegex(url);

const trelloAddUrl = 
  "https://trello.com/add-card?source=" + hostname + 
    "&mode=popup&url=" + encodeURIComponent(url) + 
    "&name=" + encodeURIComponent(title);

openUrl(trelloAddUrl);
```

---

## Conclusion

The result is convincing and frees me from the bookmarklet on my smartphone, but I will continue to use it on my desktop browser.

The HTTP Shortcuts app, however, has really got me hooked. I see a lot of potential for automating things on my smartphone and will keep you updated as I develop more solutions with it. Thank you Roland for this gem ...

![Shortcut as Share Target](httpshortcuts-share.png)