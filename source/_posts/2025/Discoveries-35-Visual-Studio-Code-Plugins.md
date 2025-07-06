---
slug: Discoveries-35-Visual-Studio-Code-Plugins
title: "Discoveries #35 - Visual Studio Code Plugins"
subtitle:
date: 2025-06-18 11:05:56
photograph:
  file: 24-12-Suedafrika-0733-D50.jpg
  name: Cape Town Cooling
  socialmedia: /static/images/social-media/Discoveries-35-Visual-Studio-Code-Plugins.jpg
series: Discoveries
categories:
  - Collection
tags:
  - VS Code
  - Plugins
related:
  - Discoveries-34-JS-Libraries
  - Discoveries-33-Image-Presentation
  - Discoveries-32-CSS
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/114705389325642812
---

I've been using Visual Studio Code pretty much since it came out, initially to get away from its big, bulky "brother" Visual Studio in terms of web development. So I'm very happy about how the tool has evolved, especially the plugin scene, which has taken my primary work tool to new heights of productivity. I'd like to introduce a few of the "smaller" but no less helpful plugins in this edition of this month's Discoveries...

{% anchorlist
  "MinifyAll|minifyall"
  "Json Editor|json-editor"
  "Regex Previewer|regex-previewer"
  "File Browser|file-browser"
  "File Utils|file-utils"
  "Compare Folders|compare-folders"
  "Encode Decode|encode-decode"
  "Font Preview|font-preview"
  "Paste Image|paste-image"
  "Path Intellisense|path-intellisense"
%}

<!-- more -->

{% discovery "MinifyAll" "Jose Gracia Berenguer" "https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall" Discoveries-35-Visual-Studio-Code-Plugins key:minifyall %}
I deal with many JSON files and often use the command "Format Document" when the document is minified, which makes it easier to edit the content. Afterwards it was always a little bit tricky to minify the JSON again, because there is no built-in command for that. This plugin helps a lot ...

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall
title: "MinifyAll - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Minifier for JSON, CSS, HTML, XML, TWIG, LESS, SASS, SCSS, JavaScript, JSONC, and JavaScriptReact(testing). Compressor of files and folders. You will love its simplicity!"
image: https://josee9988.gallerycdn.vsassets.io/extensions/josee9988/minifyall/2.10.0/1634826159461/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Json Editor" "Nick DeMayo" "https://marketplace.visualstudio.com/items?itemName=nickdemayo.vscode-json-editor" Discoveries-35-Visual-Studio-Code-Plugins key:json-editor %}
Sometimes, however, even readable formatting is only of limited help when editing a JSON file. For such purposes, this JSON editor has proven to be extremely useful.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=nickdemayo.vscode-json-editor
title: "Json Editor - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Generate a tree view editor of the active JSON document"
image: https://nickdemayo.gallerycdn.vsassets.io/extensions/nickdemayo/vscode-json-editor/0.3.0/1614008149777/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Regex Previewer" "Christof Marti" "https://marketplace.visualstudio.com/items?itemName=chrmarti.regex" Discoveries-35-Visual-Studio-Code-Plugins key:regex-previewer %}
Regular expressions are pretty much the worst, but also the most powerful thing when it comes to strings. A recurring nightmare when you have to write them, at least for me. Normally, I use online tools such as [regex101.com](https:/regex101.com) or [regexr.com](https://regexr.com), but this plugin is great for quick checks in between.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=chrmarti.regex
title: "Regex Previewer - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Regex matches previewer for JavaScript, TypeScript, PHP and Haxe in Visual Studio Code."
image: https://chrmarti.gallerycdn.vsassets.io/extensions/chrmarti/regex/0.5.1/1730212557494/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "File Browser" "Bodil Stokke" "https://marketplace.visualstudio.com/items?itemName=bodil.file-browser" Discoveries-35-Visual-Studio-Code-Plugins key:file-browser %}
I don't work exclusively with the keyboard, so I usually prefer a click UI. But in VS Code, picking a file from thousands in countless subfolders can sometimes be a real challenge. This plugin helps with that by providing a fully keyboard driven file open dialog.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=bodil.file-browser
title: "File Browser - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - A nicer alternative to the file open dialog."
image: https://bodil.gallerycdn.vsassets.io/extensions/bodil/file-browser/0.2.11/1668854930123/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "File Utils" "Steffen Leistner" "https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils" Discoveries-35-Visual-Studio-Code-Plugins key:file-utils %}
While we're on the subject of file management... Once you've found the right file, you'll want to do something with it. With this plugin, at least duplicating, moving, renaming, and deleting files and directories is much easier.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils
title: "File Utils - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - A convenient way of creating, duplicating, moving, renaming and deleting files and directories."
image: https://sleistner.gallerycdn.vsassets.io/extensions/sleistner/vscode-fileutils/3.10.3/1690034496024/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Compare Folders" "Moshe Feuchtwanger" "https://marketplace.visualstudio.com/items?itemName=moshfeu.compare-folders" Discoveries-35-Visual-Studio-Code-Plugins key:compare-folders %}
On this blog, I use three different sizes for the hero images, which are created in advance and stored in separate folders. Sometimes things go wrong, so it's good to be able to compare two folders directly in VSCode to find out which image size is missing.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=moshfeu.compare-folders
title: "Compare Folders - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Compare folders by contents, present the files that have differences and display the diffs side by side"
image: https://moshfeu.gallerycdn.vsassets.io/extensions/moshfeu/compare-folders/0.25.1/1729900268675/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Encode Decode" "Mitch Denny" "https://marketplace.visualstudio.com/items?itemName=mitchdenny.ecdc" Discoveries-35-Visual-Studio-Code-Plugins key:encode-decode %}
Basically, web development always involves working with text, with or without structure, i.e. Strings, HTML/XML entities, Unicode, Base64, MD5, SHA, etc. So it's good to have a little helper right in the IDE that can convert these textual structures.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=mitchdenny.ecdc
title: "Encode Decode - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - An extension for Visual Studio Code that allows you to quickly convert text selections."
image: https://mitchdenny.gallerycdn.vsassets.io/extensions/mitchdenny/ecdc/1.8.0/1656396518023/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Font Preview" "Cameron Cuff" "https://marketplace.visualstudio.com/items?itemName=ctcuff.font-preview" Discoveries-35-Visual-Studio-Code-Plugins key:font-preview %}
Typography is crucial when designing a website. It is important to choose the right fonts first and then check new versions later on. This plugin can help you display everything you need to know about a font file directly in the IDE.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=ctcuff.font-preview
title: "Font Preview - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Preview fonts in VS Code"
image: https://ctcuff.gallerycdn.vsassets.io/extensions/ctcuff/font-preview/2.2.1/1658365554442/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Paste Image" "mushan" "https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image" Discoveries-35-Visual-Studio-Code-Plugins key:paste-image %}
A picture is sometimes worth a thousand words. Embedding them in Markdown is easy, but first you need to have the image as a PNG, JPG, or whatever file format. A screenshot is quickly made and copied to the clipboard ... and this plugin automatically saves it as a file in the current or previously configured folder directly in VS Code.

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image
title: "Paste Image - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - paste image from clipboard directly"
image: https://mushan.gallerycdn.vsassets.io/extensions/mushan/vscode-paste-image/1.0.4/1548255946926/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}

{% discovery "Path Intellisense" "Christian Kohler" "https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense" Discoveries-35-Visual-Studio-Code-Plugins key:path-intellisense %}
I don't know who came up with the Intellisense principle, but I think we all owe that person a huge debt of gratitude. VS Code already does this very well out of the box, but with a few plugins it becomes even more convenient. Here's one for file paths...

@@@cardlink
url: https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense
title: "Path Intellisense - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Visual Studio Code plugin that autocompletes filenames"
image: https://christian-kohler.gallerycdn.vsassets.io/extensions/christian-kohler/path-intellisense/2.9.0/1717321332008/Microsoft.VisualStudio.Services.Icons.Default
@@@
{% enddiscovery %}
