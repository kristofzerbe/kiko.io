---
hasLocale: true
#--------------------------------------------------
slug: Collecting-Links-with-Obsidian-for-Processing
title: Collecting Links with Obsidian for Processing
subtitle: Bye Trello ... it was nice with you
date: 2025-07-06 12:09:24
photograph:
  file: D50_3210.jpg
  name: Floral Magic LIII
  socialmedia: /static/images/social-media/Collecting-Links-with-Obsidian-for-Processing.jpg
categories:
  - Coding
tags:
  - Obsidian
  - JavaScript
  - Hexo
related:
  - Discoveries-35-Visual-Studio-Code-Plugins
  - Reusable-API-proxy-in-just-a-few-lines-of-JavaScript
  - jsrepo-Build-your-own-tool-registry
syndication:
  - host: Mastodon
    url: null
---

Bookmarking tools are not incredibly popular for nothing. We all collect interesting sources on the web in order to want to do something with the information in them later, even if it often remains a 'want' and the pile of bookmarks becomes steadily larger and more confusing. I am no exception.

Just a few months after starting this blog in 2019, I decided to publish the 10 links that I found most important each month in the so-called [Discoveries](/series/discoveries/) as a post and turn it into a series. I wrote the very first edition manually using the links saved in Pocket, but with the second edition I started to automate this process, at least in part, using a Trello board with columns for each edition.

{% cardlink %}
url: https://kiko.io/post/Discoveries-1/
title: "Discoveries #1 - kiko.io"
description: "Due to my daily routine, I'm reading a lot of articles on the web regarding software development. The most interesting stuff ends up on my Pocket lis..."
host: kiko.io
favicon: https://kiko.io/favicon.ico
image: https://kiko.io/images/social-media/Discoveries-1.jpg
{% endcardlink %}

When it comes to collecting links on Trello, I found a few shortcuts, especially for mobile devices, [which](/post/Add-website-to-Trello-card-the-better-way/) [I wrote](/post/Add-Link-to-Trello-on-Android-via-Share-Menu/) [about](/post/Adding-Screenshots-to-Trello-Cards-on-Android/) [repeatedly](/post/Generate-Content-from-Trello/). At one point, I created a new section in my blog called [Tiny Tools](/tools/tiny-tools/), which was also based on a Trello column, but was continuously updated and expanded by me.

Although I had almost perfected the use of Trello for my own purposes, it never felt quite right to misuse a Kanban tool for link collections, especially since Atlassian, after the takeover in 2017, repeatedly changed the display of links on the cards to my disadvantage. For me, a link, as I need it for this purpose, has a document character, with attributes, attachments, and the like, and the Trello tiles did not adequately reflect this, even when editing the data.

<!-- more -->

---

## Hey Obsidian...

Last year, I moved all my memorable stuff (documentation, notes, tasks, links, etc.) from various platforms to one centralized location: [Obsidian](/post/My-Switch-to-Obsidian/) and it was clear to me from the start that I would someday switch my automatic processes for Discoveries and Tiny Tools there as well, because the tool, with its Markdown-based document structure, is much closer to what I need and to where I want to process the links.

### Collecting links
I first share every link I want to keep with the Obsidian app... here's an example of one of my own:

![Screenshots 1 ... 2 ... 3](post/Collecting-Links-with-Obsidian-for-Processing/collecting-links-1.png)

Everything that comes into the Obsidian app via sharing is first saved as "Today's daily note" (screenshot 1) in my inbox, and the corresponding core plugin is configured to automatically apply the standard note template and pre-fill the title with the current date (screenshot 2).

```md Note Template.md
---
created: {{DATE:YYYY-MM-DD HH:mm}}
tags:
---
```

Then I convert the link into a [CardLink](https://github.com/nekoshita/obsidian-auto-card-link) and give it a meaningful title and appropriate tags (Screenshot 3).
To turn the link in the inbox into a Discovery, that I want to blog about, either immediately or later, I insert the template 'kiko.io Discovery' (screenshot 4), which has a few additional attributes:

```md kiko.io Discovery.md
---
created: {{DATE:YYYY-MM-DD HH:mm}}
tags: 
title: {{title}}
slug: 
author:
---
```

![Screenshots 4 ... 5 ... 6](post/Collecting-Links-with-Obsidian-for-Processing/collecting-links-2.png)

Next, I move the note to a folder where all discoveries are initially collected for publication as blog posts (screenshot 5), and write a short text for the link introducing the content and adding an image if necessary (screenshot 6). I have set up Obsidian in a way so that images inserted from the clipboard of all my notes are automatically saved in a relative folder called ``_attachments``. There, I just have to give them an appropriate name (for which the slug is ideal) and the link document is ready for further processing.
Incidentally, the process for Tiny Tools is the same, even though a different template is used here, the attachment folder is different, and after synchronization with my blog project, the items are automatically processed into a single page when the blog is built.

### Selecting for a new post

For a new issue of Discoveries, I cluster links with a similar topic in a subfolder in advance and add an overview note with the same name as the folder and the subsequent post, starting with the next number and the subject, e.g., ``35 - Visual Studio Code Plugins``. This overview file also has its own Obsidian template:

```md kiko.io DISCOVERIES.md
---
published: 
hero:
---
![](HERO-URL)

---

INTRO

---

%% Begin Waypoint %%

%% End Waypoint %%
```

The ``hero`` property contains the file name (without extension) of one of my [pool photos](/photos) that I want to use for the new post, and its complete URL is inserted into the image link of the content for preview. Next, I replace ``INTRO`` with an introductory text that is appropriate for the post. The [Waypoint block](https://github.com/IdreesInc/Waypoint) automatically contains the names of the link documents in this folder, so all I have to do before publishing is remove the surrounding ``Waypoint`` statement and reorder the links as desired.

Here is the finished Markdown code for the overview page of the latest Discovery issue [Discoveries #35 - Visual Studio Code Plugins](/post/Discoveries-35-Visual-Studio-Code-Plugins/) and for the first link document in the list:

<details><summary>35 - Visual Studio Code Plugins.md</summary>
```md
---
published: 
hero: 24-12-Suedafrika-0733-D50
---
![](https://kiko.io/reserve/24-12-Suedafrika-0733-D50/normal.jpg)

---

I've been using Visual Studio Code pretty much since it came out, initially to get away from its big, bulky "brother" Visual Studio in terms of web development. So I'm very happy about how the tool has evolved, especially the plugin scene, which has taken my primary work tool to new heights of productivity. I'd like to introduce a few of the "smaller" but no less helpful plugins in this edition of this month's Discoveries...

---

- [[MinifyAll]]
- [[Json Editor]]
- [[Regex Previewer]]
- [[File Browser]]
- [[File Utils]]
- [[Compare Folders.md]]
- [[Encode Decode]]
- [[Font Preview]]
- [[Paste Image]]
- [[Path Intellisense]]
```
</details>

<details><summary>MinifyAll.md</summary>
```md
---
created: 2025-06-16 14:13
tags:
  - VSCode
  - Plugin
title: MinifyAll
slug: minifyall
author: Jose Gracia Berenguer
---
I deal with many JSON files and often use the command "Format Document" when the document is minified, which makes it easier to edit the content. Afterwards it was always a little bit tricky to minify the JSON again, because there is no built-in command for that. This plugin helps a lot ...

'''cardlink
url: https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall
title: "MinifyAll - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Minifier for JSON, CSS, HTML, XML, TWIG, LESS, SASS, SCSS, JavaScript, JSONC, and JavaScriptReact(testing). Compressor of files and folders. You will love its simplicity!"
image: https://josee9988.gallerycdn.vsassets.io/extensions/josee9988/minifyall/2.10.0/1634826159461/Microsoft.VisualStudio.Services.Icons.Default
'''
```
</details>

### Creating the post
In order to create a new Discoveries post in my blog project at any time via the console, the entire Discoveries folder from Obsidian is synchronized to a corresponding data directory. This also applies to the archive, to which the subfolder of a generated post is automatically moved after creation.

The conversion is a one-time process, because the Obsidian structure only needs to be translated once into the appropriate post structure of my blog in order to be converted into a static post when my SSG Hexo is built. For this purpose, I wrote a Node script called **DiscoveriesConverter** as a class, which, when called via the runner, takes the name of the subfolder to be processed as its only parameter.

```js _run_discoveries-converter.cjs
const folderName = process.argv[2].toString();
const dc = new DiscoveriesConverter(folderName);
dc.convert();
```

![Process Chain](post/Collecting-Links-with-Obsidian-for-Processing/process-chain-complete.png)

The DiscoveriesConverter has become quite extensive because I have taken many special features of my blog into account in order to fully automate the process, so here is just a description of the separate steps. The complete code is available on GitHub (https://github.com/kristofzerbe/kiko.io/blob/master/lib/discoveries-converter.cjs).

#### constructor()

1. Read Hexo config.yaml
2. Set data folder
3. Set photo dir
4. Set template file for Handlebars
5. Set output folder
6. Init new post object
7. Set main properties of new post

#### convert()

1. Read Discovery file & Frontmatter
2. Set photograph for the post
3. Get intro as Markdown
4. Get items from content via ``getItem()``
   1. Read link file & Frontmatter
   2. Init new link object
   3. Get CardLink data from content
   4. Get attachment image(s) from content via ``getAttachment()``
5. Create post folder
6. Generate post from Handlebars template
7. Store new post
8. Copy item attachments to post folder and move to Discovery folder
9. Move photograph to PHOTOS

A special aspect of the code is that all file handling actions are first collected in an object structure (``file.io.[name].[in|out].[copy|move])`` and only actually released to the file system at the very end (steps 8 and 9). This makes debugging much easier, as files that have already been copied or moved do not have to be restored to their original state before the next attempt.

A few special features, such as filtering out data from a card link or image attachments from the content via RegEx, have been moved to a [tools file](https://github.com/kristofzerbe/kiko.io/blob/master/lib/tools.cjs), as I need this functionality elsewhere in the blog project.

Last but not least, I just need to review the post generated by DiscoveryConverter and then transfer it to GitHub so that it can be built with the blog and published.

---

## Conclusion

With this solution, I have disengaged myself from another large data service and broken it down into simple files that are under my complete control. The system can also be customized at any time according to my own desire, because the entire logic behind it is flexible and open... and I am even a little faster at every step from collection to posting, as long as no errors occur ;)

I can only recommend to take a closer look at the possibilities offered by Obsidian. In the end, like this website and so much else in IT, it is based on pure text, which developers know to work with.
