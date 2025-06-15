---
title: "#TIL | Replace with RegEx in VSCode"
date: 2025-06-15
type: til
syndication:
  - host: Mastodon
    url:
---

I have been working with Visual Studio Code for a long time now, and just recently I had to figure out how to use regular expressions not only to search, but also to replace code fragments. The trick is to use parentheses to create capturing groups, which you can then reference in order using the dollar sign.

My problem seemed simple: Find all image URLs with a specific path, but different file names, in all files and replace the file extension from PNG to JPG. I had to dig a bit and this is how it works:

Search:
```
(\/static\/images\/social-media\/[\w-]*)(.png)
```

Replace:
```
$1.jpg
```

#VSCode #RegEx 