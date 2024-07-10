---
title: "#TIL | Force Refresh Android Chrome"
date: 2022-12-24 10:05:00
type: til
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/109568040848262163
---

Reloading a web page in Chrome on Android without letting the browser use it's cache (hard reload, CTRL + F5 on desktop) isn't that simple, if you want to avoid clearing your whole cache. But there is a workaround if the website is installable as PWA: 

1. Install it via the three dot menu in Chrome
2. Long press on the icon in launcher
3. Select "Website Settings"
4. Tap on "Delete and Reset"
5. Confirm the dialog "Do you really want to reset all local data..."

Last thing is the point: It doesn't delete the PWA itself, but all data stored in the cache for it.
