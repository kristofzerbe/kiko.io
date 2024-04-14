---
slug: My-Switch-to-Obsidian
title: My Switch to Obsidian
subtitle: One To Replace Them All
date: 2024-04-01 18:55:00
photograph:
  file: 23-07-Mallorca-0300.jpg
  name: Lots of Things
  socialmedia: /static/images/social-media/My-Switch-to-Obsidian.png
categories:
  - Tools
tags:
  - Obsidian
  - Plugins
related:
  - Johnny-Decimal-Emerging-from-the-Abyss
  - Manipulation-of-Lists-within-a-Sentence-of-Natural-Language
  - Experimenting-with-the-font-LEXEND
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112197053480608719
---

The best ideas always come to you at the most inopportune moments and places. Whereas you used to grab a piece of paper and try to capture the idea in illegible handwriting, today it is often a mobile app or a desktop application into which you hammer the most important key points. This change has advantages, as not a single tree needs to be chopped down for the many ideas that are produced every day and the digital scraps of ideas can later be changed, refined, formatted and processed in other ways very easily. But it also has disadvantages, because the range of digital helpers is so large that you always have the feeling you've backed the wrong horse. One app can do this, but not that, while another can do that, but is only available in the cloud, where you don't know who is reading what, and the third can do all that, but is only available with an expensive subscription. There's always something. Paper, on the other hand, is always paper...

Even though I still do a lot of handwriting on paper, simply because it is often much quicker, I have acquired an amazing zoo of different digital helpers in recent years (I work in IT anyway), all of which have a specific purpose but are more or less not interoperable with each other. This is on the one hand because a suitable tool for me is not available for a different device class or operating system and on the other, because the objectives of the tools differ, as you not only have ideas that you want to capture in text, but also have to deal with tasks, collections of links, research texts, code snippets and the like.

![Obsisian Switch](My-Switch-to-Obsidian/obsidian-switch.png)

<!-- more -->

One of my central tools so far has been **Trello**, in which I have collected and managed links and tasks on dozens of boards. For example, some columns of my [COLLECTION board](https://trello.com/b/D6zIhLus/collections) are used for the automated creation of my tools section and for the recurring [Discovery posts](https://kiko.io/series/discoveries/) here on kiko.io. While some to-do's could still be managed in Trello, this was rather inconvenient for simple tasks and so I tended to use **Google Keep** for such things, because I could also share individual task notes with other people there.

For bookmarking in Trello, I had created bookmarklet shortcuts, which worked well for individual links, but quickly turned into a clicking orgy for several dozen. Enriching the links with descriptions and images was also a diligent work that I put up with, but it was still annoying.

As it was not possible to map larger research projects or ideas with Trello, I initially used **OneNote** and later **Notion**, as these tools have very good simplified text editors and it is possible to write in a structured way. I had a lot of fun with Notion in particular for a while, until I tried to use it as an editor for the drafts and articles of my blog. In contrast to my Hexo-driven blog, Notion is not file-based but cloud-based and offers hardly any options for integrating a third-party Markdown structure. However, a blog based on an SSG is based on a lot of individual Markdown files that need to be edited.

I didn't need to look for a solution for my Windows machines because I have my favourite IDE **Visual Studio Code**, which is of course also excellent for writing Markdown. On my smartphone and tablet running Android, however, it was a challenge to find the right one. It's really amazing how rare good editors are on Android! The most suitable solution for writing my articles there was the app [**Markor**](https://play.google.com/store/apps/details?id=net.gsantner.markor). As all of my blog's sources are stored on **OneDrive** anyway and are therefore always available on all machines, I used [**OneSync**](https://play.google.com/store/apps/details?id=com.ttxapps.onesyncv2) on Android to synchronise at least the posts and drafts, which I could then edit with Markor. To create new articles, I also synchronised the Hexo Scaffolds and integrated them into Markor as templates. Unfortunately, the app takes some getting used to and so does its developer, who doesn't feel like interacting with his users in a sensible way, but the whole thing worked reasonably well.

---

## The Eureka Moment

I stumbled across the Notion alternative **Obsidian** at some point, but didn't pay any further attention to it, assuming it was just another one of the cloud-based note-taking tools that were sprouting up like mushrooms on every corner for a while. Notion, Confluence ... all the same, only the corporations and the subscription models behind them are different. I didn't get beyond the start page with the marketing slogans back then.

However, this changed when I read an article by Rob Knight about his approach to giving his digital life a new structure. The idea fascinated me (but more about that in a later post...) and I started to do some research. Many sources on the subject mentioned Obsidian and I started to look more closely at the tool and its possibilities.

One eye-opener was that Obsidian is by no means one of the above-mentioned cloud tools with login and synchronisation on computers I didn't know, but works with a **local file structure** that can be synchronised with on-board tools, but not necessarily. A so-called Obsidian Vault is nothing more than a folder on the hard drive in which everything else is stored. In my case, this meant that I could also create such a folder under my OneDrive folder and everything would be synchronised to all machines as usual!

{% alertbox info %}
"*Microsoft OneDrive ... uuhhh*", some people may think, and they could even be right, but in order to be able to work in a distributed way, you have to, as they say, die a death. So far, I haven't regretted my [switch from Dropbox to OneDrive](https://kiko.io/post/Thanks-Dropbox-but-I-m-off/), because Microsoft is doing everything right for Windows users in terms of functionality and stability.
{% endalertbox %}

---

## Replacement of Markor

Thanks to the local Vault and the tool's really good Markdown editor, which works excellently both on the desktop under Windows and on mobile under Android, it was really easy for me to get rid of my Markor workaround. The posts and drafts of my blog project are immediately synchronised within the OneDrive folder structure to the Vault and back on one of my stationary machines using [**SyncBackPro**](https://www.2brightsparks.com/syncback/sbpro.html) when changes are made. It seemed pointless to include the entire project with all node modules and JavaScript files in the Vault, because I only want to have in Obsidian what I need for writing. 

As it is possible to work with templates in Obsidian, I was able to reuse Hexo's Scaffolds directly. The only difference now is, that I first create an empty file in the appropriate folder in Obsidian and then apply the template to this file.

---

## Transfer of Notion data

The two note-taking apps Obsidian and Notion are of course similar in their objectives, but have different concepts. In Obsidian, for example, a folder is just a folder. If you are used to a folder also being a note in Notion or Confluence, you need to adjust a little ... or you can use the community plugin **Folder Note** to get back the familiar behaviour. The most practical option here is to set the plugin options to ``Folder Name Inside``, which means that when you click on a folder in Obsidian Explorer, an MD file with the same name inside the folder is displayed.

{% cardlink %}
url: https://github.com/xpgo/obsidian-folder-note-plugin
host: github.com
title: "GitHub - xpgo/obsidian-folder-note-plugin"
description: "Plugin to add description note to a folder for Obsidian. - xpgo/obsidian-folder-note-plugin"
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/5e0f517b4ff09bac8ca606e448e3a7dab3baba9a3928e9e6c1e2ec6a21e8619f/xpgo/obsidian-folder-note-plugin
{% endcardlink %}

The **Note Folder Autorename** plugin is also a very valuable aid in this context, ensuring that a folder is automatically renamed as soon as the title of the Folder Note changes in order to keep both synchronised.

{% cardlink %}
url: https://github.com/pjeby/note-folder-autorename
title: "GitHub - pjeby/note-folder-autorename"
description: "Obsidian plugin to support folder-overview notes by keeping their folder in sync - pjeby/note-folder-autorename"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/335475050/077f0300-659c-11eb-85b8-a2e26539c9ab
{% endcardlink %}

Transferring my Notion data was not a big deal, because on the one hand it wasn't much and on the other hand there is a plugin called **Importer** that is able to process Notion export files, among other formats. With a little rework and the help of **Folder Note**, the look and feel is now almost the same for me in Obsidian.

{% cardlink %}
url: https://github.com/obsidianmd/obsidian-importer
title: "GitHub - obsidianmd/obsidian-importer"
description: "Obsidian Importer lets you import notes from other apps and file formats into your Obsidian vault. - obsidianmd/obsidian-importer"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/665163927/d617698b-1fc2-4353-81f8-9e346134853e
{% endcardlink %}

As I have used almost no databases in Notion, I can't say much about importing them, but I have become aware of two plugins that offer similar functionality in Obsidian: [Database Folder](https://github.com/RafaelGB/obsidian-db-folder) and [DataLoom](https://github.com/trey-wallis/obsidian-dataloom). Will have to give them a try ...

---

## Dissolving the Trello boards

Replacing Trello as a classic Kanban tool is no real challenge thanks to the cleverly programmed **Kanban** plugin, apart from the fact that there is no import option and I had to transfer the cards by hand. What is impressive about the plugin is that a simple header/task structure is used as the data basis, which is displayed purely visually as a Kanban board, including drag & drop of the cards! Superb ...

{% cardlink %}
url: https://github.com/mgmeyers/obsidian-kanban
title: "GitHub - mgmeyers/obsidian-kanban"
description: "Create markdown-backed Kanban boards in Obsidian. Contribute to mgmeyers/obsidian-kanban development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/358435115/ad610dff-8526-4e5b-b241-6b74d9b6468a
{% endcardlink %}

Transferring my link collections seemed a little more complicated at first, because in the past I used Trello's options to display meta information such as title, author and often an image on the card for a URL and I didn't want to get worse in Obsidian and only display the simple text of the URL. I also found a solution for this in the form of the **Auto Card Link** plugin, which fetches the meta data ``url``, ``host``, ``title``, ``description``, ``image`` and ``favicon`` of a link from the underlying web server when inserting a link or later via a command and stores it in Markdown as a special code block and displays it as a card in the graphical view.

{% cardlink %}
url: https://github.com/nekoshita/obsidian-auto-card-link
title: "GitHub - nekoshita/obsidian-auto-card-link"
description: "Contribute to nekoshita/obsidian-auto-card-link development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/7596faf6fba33fba28bf2db82b23fe03d9e064478347b75212f2ad6f26cd57fd/nekoshita/obsidian-auto-card-link
{% endcardlink %}

Transferring the links from a Trello column to a Markdown file in Obsidian was most easily done with the Chrome browser on Android, because there you can drag and drop all open links into a tab group and then use ``Select Tabs``, ``Select All`` and ``Split Tabs`` to transfer the URL list as text into Markdown and convert the URLs individually into card links.

Switching from Trello to Obsidian regarding the link collections has another advantage for me: I can enter notes on a topic under the links collected in this way and if there is more to say about a link, I can move it to a single file and link it to the main file.

---

## Keep ToDo's in a new form

So far, I have used Google Keep to maintain simple task lists that I share with other people and I will continue to do so for the sake of simplicity, for example for the shopping list with my wife, but I have also used the tool in some cases for ToDo's where Trello's Kanban approach seemed too much for me. I have translated these into simple Obsidian task lists and try to keep track of them using an overview page. 

The **Data View** plugin is a great help here, as it allows you to summarise all Obsidian content using your own query language called [DQL](https://blacksmithgu.github.io/obsidian-dataview/queries/dql-js-inline/). The tool is so powerful that hardly any wishes remain unfulfilled. ``WHERE``, ``SORT``, ``GROUP BY`` ... everything on on-board.

{% cardlink %}
url: https://github.com/blacksmithgu/obsidian-dataview
title: "GitHub - blacksmithgu/obsidian-dataview"
description: "A data index and query language over Markdown files, for https://obsidian.md/. - blacksmithgu/obsidian-dataview"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/1a9391ee8425664018dde2d70129ca398b0b8519cc40c027e3a247fd3afaa1fe/blacksmithgu/obsidian-dataview
{% endcardlink %}

---

## Other useful plugins

With the plugins mentioned above, it was easy for me to switch from the individual tools to Obsidian. There are also other community plugins, that I wouldn't want to be without and that make me feel at home in my new note-taking hub:

### File Explorer Note Count

By default, you cannot see how many files are in a folder. This plugin will change this.

{% cardlink %}
url: https://github.com/ozntel/file-explorer-note-count
title: "GitHub - ozntel/file-explorer-note-count"
description: "Obsidian Plugin for viewing the number of elements under each folder within the file explorer - ozntel/file-explorer-note-count"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/1f9c6ff31918d6b9889b032907fcab9cd9e89a41410e6e2f885913a2c8c4a844/ozntel/file-explorer-note-count
{% endcardlink %}

### Iconize

A picture is sometimes worth a thousand words. Using icons wisely makes it easier to understand what a file or folder is intended for.

{% cardlink %}
url: https://github.com/FlorianWoelki/obsidian-iconize
title: "GitHub - FlorianWoelki/obsidian-iconize"
description: "Simply add icons to anything you want in Obsidian. - FlorianWoelki/obsidian-iconize"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/3ca09b09ee507984688d161b2573315f453878c6b0687386691b35c797f62c66/FlorianWoelki/obsidian-iconize
{% endcardlink %}

### File Color

Where an icon is too much or contradictory, it is also sufficient to give a file or folder a different color, for example gray for additional folders such as "Attachments", which are not quite as important.

{% cardlink %}
url: https://github.com/ecustic/obsidian-file-color
title: "GitHub - ecustic/obsidian-file-color"
description: "An Obsidian plugin for setting colors on folders and files in the file tree. - ecustic/obsidian-file-color"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/f8e64c2855b7272e3fde2b803b3dd86c2721f0a508022d5a106bac64ebcb0597/ecustic/obsidian-file-color
{% endcardlink %}

### Editing toolbar

Especially on Android it is a relief to display a bar with the most important formatting commands at the top of a document.

{% cardlink %}
url: https://github.com/PKM-er/obsidian-editing-toolbar
title: "GitHub - PKM-er/obsidian-editing-toolbar"
description: "An obsidian toolbar plugin, modified from the Cmenu plugin - PKM-er/obsidian-editing-toolbar"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/532797913/242d7290-450a-414b-a6c9-890ed0798a77
{% endcardlink %}

### Meta Bind

Some workflows work better if you display dedicated fields to fill in or select options instead of using editable text. This is especially true for frontmatter data. This plugin is able to build such "forms" and even redirect the input to other files.

{% cardlink %}
url: https://github.com/mProjectsCode/obsidian-meta-bind-plugin
title: "GitHub - mProjectsCode/obsidian-meta-bind-plugin"
description: "A plugin for Obsidian to make your notes interactive with inline input fields, metadata displays, and buttons. - mProjectsCode/obsidian-meta-bind-plugin"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/78deeb473febf7d4da6c8bbb6447a4c813bc5a5fd47db7f78fc8691896d957ca/mProjectsCode/obsidian-meta-bind-plugin
{% endcardlink %}

### Waypoint

For folders with a large number of files, it can be useful to create an overview file (Table Of Contents). This plugin ensures that such lists are updated automatically and complements **Folder Note** wonderfully.

{% cardlink %}
url: https://github.com/IdreesInc/Waypoint
title: "GitHub - IdreesInc/Waypoint"
description: "Obsidian plugin that gives you the power to generate dynamic MOCs in your folder notes. Enables folders to show up in the graph view and removes the need for messy tags! - IdreesInc/Waypoint"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/6440af2517ef5c440010a11f6ad4aad1876530833c8f2a7bb77bd950c282a759/IdreesInc/Waypoint
{% endcardlink %}

### VSCode Editor

Obsidian is not a code editor and is primarily limited to Markdown files. With this plugin, which uses the Monaco editor used in VS Code, almost all text-based files can be displayed and edited.

{% cardlink %}
url: https://github.com/sunxvming/obsidian-vscode-editor
title: "GitHub - sunxvming/obsidian-vscode-editor"
description: "Edit Code Files like VSCode in Obsidian. Contribute to sunxvming/obsidian-vscode-editor development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/9340eacec3813372871a7b057ddd247bce353e87da47aa2c2b33d499a613da0c/sunxvming/obsidian-vscode-editor
{% endcardlink %}

### Commander

Obsidian offers a lot of commands and a lot of layout areas where you could display them as buttons. This plugin brings them together.

{% cardlink %}
url: https://github.com/phibr0/obsidian-commander
title: "GitHub - phibr0/obsidian-commander"
description: "Commander - Obsidian Plugin | Add Commands to every part of Obsidian's user interface - phibr0/obsidian-commander"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://repository-images.githubusercontent.com/484165496/3405a6b2-97e0-491a-b1cb-c87a97352aa5
{% endcardlink %}

---

## Conclusion

I am extremely satisfied with my new Obsidian setup, which is based on the motto "One To ~~Rule~~ Replace Them All". Everything is file-based, so it offers various options for automatic further processing, and I have the information completely under my control at all times. I still have to think of a few things here and there as to how I can move the remnants of the tools I used previously, but that's only a matter of time. There is no question that Obsidian will remain my central source of information. 

However, as described above, this switch was only the **starting point of a much more far-reaching reorganisation of my digital life**, albeit an important one. After all, a central platform is only as good as the overview you have of it. I will report on this new organisational structure in my next article.