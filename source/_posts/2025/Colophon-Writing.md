---
slug: Colophon-Writing
title: Colophon - Writing
subtitle:
date: 2025-05-29 19:42:12
photograph:
  file: 23-05-Holland-0453.jpg
  name: Steel Tangle
  socialmedia: /static/images/social-media/Colophon-Writing.png
series: A New Blog
categories:
  - Misc
tags:
  - Hexo
related:
  - Colophon-Hosting-Deployment
  - Colophon-Impetus-Technology
  - The-State-of-the-Blog
syndication:
  - host: Mastodon
    url: null
---

{% alertbox info %}
This is the third part of my [colophon](/Colophon), which I am writing in chunks, because of the resistant "coming soon" sticker. The first part was about the [impetus and technology](/post/Colophon-Impetus-Technology) behind kiko.io and the second about [hosting and deployment](/post/Colophon-Hosting-Deployment).
{% endalertbox %}

---

## Writing

I write my posts mainly in my favorite editor, [**Visual Studio Code**](https://code.visualstudio.com/), where I also develop all infrastructure code related to my SSG Hexo. This is the only place where I can start the whole thing and see if it works. The only exception is Android on my smartphone, as there is no reasonable VS Code-like solution for this. Here, I switch to [**Obsidian**](https://obsidian.md/), my central knowledge base. All drafts and posts that have already been created are automatically synchronized to my Obsidian vault, which also lives on OneDrive, using [**SyncBack Pro**](https://www.2brightsparks.com/syncback/sbpro.html) whenever changes are made. On Android, [**OneSync**](https://play.google.com/store/apps/details?id=com.ttxapps.onesyncv2) takes care of this job. This means that I also have everything automatically on my smartphone.

<!-- more -->

For completely new posts, I have a special folder in Obsidian called ``21.11 ToBlog`` and a suitable template for my Hexo structure. Back at my computer, all I have to do is create a post in the command line with a photo and all the extras and copy the content into Markdown.

For my notes, I even use an Obsidian-first strategy: Using the plugin [**QuickAdd**](https://github.com/chhoumann/quickadd) and a corresponding template, I create a new notes file in the synchronized notes folder ``source/_notes`` and then only have to execute the Git commit on my computer to publish the note. There are five types of notes: Standard, #TIL, Like, Bookmark, and Reply. They differ only slightly in the FrontMatter, but become important later when the WebMentions are automatically sent during the build. For notes that are still in the rough, I have a folder called ``21.12 ToNote`` in Obsidian, where I can store things that I'm not ready to publish yet, because not everything I write ends up seeing the light of day.

### Language

Obviously, English is not my native language, especially if you look at my posts up until around 2023. They are a little stiff for my taste and not particularly rich in vocabulary. I do have my own feeling for the language, but it's based on school English and not enough practice. To make life easier for my readers (and myself), I currently write all my posts in my own language, German, and then run them through [**DeepL**](https://www.deepl.com/de/translator), an AI-powered translation app from Cologne. I then adapt the results to my own sense of language and hope that it sounds reasonably good. For certain posts, I also create a language variant of the German text on the blog.