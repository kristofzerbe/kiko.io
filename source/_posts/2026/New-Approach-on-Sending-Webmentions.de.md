---
hidden: true
isLocale: true
permalink: post/New-Approach-on-Sending-Webmentions/de
#--------------------------------------------------
title: Neuer Ansatz zum Versenden von Webmentions
subtitle: Konsolenskript vs. EchoFeed 
date: 2026-01-08 18:20:22
photograph:
  file: 25-07-Schweden-585-D50.jpg
  name: Swedish Windows
  socialmedia: /static/images/social-media/New-Approach-on-Sending-Webmentions.jpg
series: IndieWeb
categories:
  - Tools
tags:
  - Hexo
  - Publishing
  - Webmention
related:
  - Hexo-and-the-IndieWeb-Sending-Webmentions
  - Hexo-and-the-IndieWeb-Receiving-Webmentions
  - Mentions-United-New-Renderer-and-Refactorings
bandcamp:
  artist: Black Swamp Water
  album: Distant Thunder|2491836742
  track: Bitter Harvest |1479502368
---

Vor 4 Jahren habe ich diesen Blog fit gemacht fürs [IndieWeb](https://en.wikipedia.org/wiki/IndieWeb). Der wichtigste Teil dabei war für mich die Integration von [Webmentions](https://indieweb.org/Webmention), also meist automatisiert gesendete "Pings" von einer Webseite in Richtung einer anderen, die Letzterer sagt: "Hey, ich habe Deinen Post ABC in meinem Post XYZ erwähnt". Eine solche Verbindung zweier Blogs ist sicherlich nicht gleichzusetzen mit den schnellen Interaktionen der [Fediverse](https://en.wikipedia.org/wiki/Fediverse)-[Plattformen](https://fediverse.party/en/miscellaneous/), die meist eher Mail oder Chats ähneln, sondern gehen zumeist nur einmalig in eine Richtung und sind aktuell leider noch eher selten. Aber sie bieten eine für mich gesunde Grundlage der Vernetzung der eigenen digitalen Heimat mit anderen die ähnlich ticken.

<!-- more -->

Generell, so scheint es, kommen die guten alten Blogs, bestückt mit moderner Technik, gerade wieder in Mode, denn was die ehemals so hippen Silicon-Valley-Garagen-Boys aus der digitalen sozialen Welt gemacht haben, ist schlicht unfassbar gruselig und wird mit dem Einzug von AI wohl noch um einiges schlimmer. Und ich bin aktuell nicht der einzige, der sich über das Revival der alten Blog-Zeiten freut:

{% cardlink %}
url: https://henry.codes/writing/a-website-to-destroy-all-websites/
title: "A Website To End All Websites | Henry From Online"
description: "How to win the war for the soul of the internet, and build the Web We Want."
host: henry.codes
favicon: https://henry.codes/meta/favicon-32x32.png
image: https://henry.codes/img/og/og-a-website-to-destroy-all-websites.png
{% endcardlink %}
<br>
{% cardlink %}
url: https://www.joanwestenberg.com/the-case-for-blogging-in-the-ruins/
title: "The Case for Blogging in the Ruins"
description: "In 1751, Denis Diderot began publishing his Encyclopédie, a project that would eventually span 28 volumes and take more than two decades to complete. The French government banned it twice. The Catholic Church condemned it, Diderot's collaborators abandoned him, his publisher secretly censored entries behind his back, and he worked"
host: www.joanwestenberg.com
favicon: https://www.joanwestenberg.com/content/images/size/w256h256/2025/11/Westenberg-Brand-Icon--Transparent-Background--4.png
image: https://images.unsplash.com/photo-1609147110636-8470ee620ee6
{% endcardlink %}

---

Mein Ansatz Webmentions zu senden, basierte auf einem eigenen Script für meinen Static Site Generator namens [**Hexo Console Webmention**](/projects/hexo-console-webmention/), das auf der Arbeit von [Remy Sharp](https://remysharp.com/2019/06/18/send-outgoing-webmentions) aufsetzt.

Inzwischen ist einiges an Wasser den Rhein hinuntergeflossen (wie man in meiner Heimat sagt) und die Möglichkeiten sind vielfältiger geworden. Generell hat mich an dem Script immer gestört, das es immer erst nach dem Build & Deployment laufen konnte und dazu in meiner GitHub-Action (das Blog lebt auf GitHub Pages) als letzten Punkt noch einmal das gesamte Artefakt inklusive aller NPM-Pakete geladen werden musste. Das war nicht nur ein Zeitfresser, sondern auch nicht wirklich ressourcenschonend.

[Robb Knight](https://rknight.me/) hat [2024](https://rknight.me/blog/echofeed/) mit [**EchoFeed** ](https://echofeed.app/)sozusagen das Gegenstück zu [Webmention.io](https://webmention.io/) an den Start gebracht, das sich bekanntlich um das Einsammeln von Webmentions kümmert. Als Datenquelle(n) setzt Robb auf RSS-, Atom- oder JSON-Feeds, von denen mindestens eine Variante jeder Blogger auf der eigenen Seite anbieten sollte. Diese verknüpft man in der App mit "Diensten" wie Webmentions, Mastodon, Bluesky und weiteren zu sogenannten **Echos**. Diese Echos zerren sich die Feed-Daten im Standard alle 15 Minuten vom Server und machen über Templates daraus Posts ... oder eben Webmentions.

Ein fantastischer Weg für mich etwas im Blog-Code aufzuräumen, auch wenn ich jetzt eine Abhängigkeit mehr habe, aber im Ernst ... was macht es wenn eine Webmention mal später oder gar nicht kommt.
