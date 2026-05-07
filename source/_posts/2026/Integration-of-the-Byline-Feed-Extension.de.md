---
hidden: true
isLocale: true
permalink: post/Integration-of-the-Byline-Feed-Extension/de
#--------------------------------------------------
title: Integration der Byline-Feed-Erweiterung
subtitle: 
date: 2026-05-07 12:28:48
photograph:
  file: Bild-0429.jpg
  name: Mountain Speakers
  socialmedia: /static/images/social-media/Integration-of-the-Byline-Feed-Extension.jpg
categories:
  - Tools
tags:
  - Feeds
  - Identity
  - IndieWeb
related:
  - Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
  - Read-You-Feed-Reader-for-Android
  - Pimping-the-Permalink
bandcamp:
  artist: Howling Giant
  album: Glass Future|3605903048
  track: First Blood of Melchor|3255928040
---

In letzter Zeit dreht sich in meiner Tech-Bubble irgendwie eine Menge um gute alte RSS/Atom-Feeds. Nicht nur das Leute sie wiederentdecken und auf Ihren Blogs zur Verfügung stellen, sondern es entstehen auch neue Dienste rund um die 30 Jahre alte Technik. Sie ist halt so schön unabhängig und folgt dem Trend sich über die Protokollebene von den immer schrecklicher werdenden Plattformen abzusetzen und sich wieder dem freien, offenen Internet zuzuwenden.

Ein gutes Beispiel dafür ist natürlich mein neuer Alltagsbegleiter [Bubbles](https://bubbles.town/) von Ben, aber auch Initiativen wie [Sourcefeed](https://www.sourcefeed.app/) von [Terry Godier](https://www.terrygodier.com/), das auf RSS-basierte Veröffentlichung von Inhalten OHNE eigene Website setzt. Schreiben, Feed, fertig.

Terry hat vor Kurzem ein weiteres Projekt veröffentlicht, das Ben ein paar Tage zuvor ebenfalls in ähnlicher Form adressiert hat. Bei Ben ging es um die Einbindung einer Fediverse-Adresse in den Kommentierungsprozess auf Bubbles über ein Meta-Tag im eigenen Blog. Also um die Anreicherung der aus dem Feed extrahieren Posts mit weiteren Informationen zur Person des Bloggers.

<!-- more -->

---

Terry nun hat eine Spezifikation einer RSS/Atom-Erweiterung Namen [**byline**](https://www.bylinespec.org/) veröffentlicht, mit der sich alle gewünschten persönlichen Informationen direkt in den Feed integrieren lassen.

{% cardlink %}
url: https://blog.terrygodier.com/2026/05/04/my-plan-with-rss.html
title: "My plan with RSS"
description: "With Current, Sourcefeed, and Byline all in the world now, the thesis is probably close to being clear. I fundamentally believe that people want to make things …"
host: blog.terrygodier.com
favicon: https://blog.terrygodier.com/favicon.png
{% endcardlink %}

Die Spezifikation lässt jetzt schon kaum eine Frage offen und enthält gar einen [Generator](https://www.bylinespec.org/tools/generator) zur bequemen Erzeugung des Codes und einen [Validator](https://www.bylinespec.org/tools/validator), der aber aktuell leider noch nicht mit URL's umgehen kann.

```xml atom.xml
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:byline="https://bylinespec.org/1.0">
  ...
  
  <byline:contributors>
    <byline:person id="kristofz">
      <byline:name>Kristof Zerbe</byline:name>
      <byline:url>https://kiko.io</byline:url>
      <byline:avatar>https://kiko.io/images/kiko-reverentgeek-200-straight.png</byline:avatar>
      <byline:profile href="https://indieweb.social/@kiko" rel="mastodon"/>
      <byline:profile href="https://github.com/kristofzerbe" rel="github"/>
      ... more profiles
      <byline:uses>https://kiko.io/uses</byline:uses>
      <byline:theme style="light"/>
    </byline:person>
  </byline:contributors>
  
  <entry> ... </entry>
  ...
</feed>
```

Wer meine Website kennt, weiß das ich für manchen gar verschwenderisch mit meinen grundlegenden persönlichen Informationen wie meinem Klarnamen und meinen Profil-Links umgehe. Im Footer findet sich zum Beispiel immer der Meta-Link, über den sich jeder die in die Seiten eingebetteten [JSON-LD](https://json-ld.org/)-Daten reinziehen kann, die ich dadurch aber eben auch bewusst maschinell lesbar gemacht habe.

Natürlich könnte Ben mit Bubbles nun hergehen und nach dem Einlesen des Feeds die Websites der Blogger auch nach JSON-LD abfragen, aber die Frage ist, warum sollte Bubbles überhaupt weitere Requests durchführen, wenn ich ihm direkt im Feed schon alles mitliefern kann?!

Alle meine 6 [Feeds](/feeds) (RSS, Atom, JSON mit Volltext oder Auszug) haben nun einen byline-Block und damit erübrigt sich für Ben nicht nur der zusätzliche Requests, sondern auch die Frage was für Informationen er nutzen kann oder sollte. Ich liefere sie einfach mit.

Mit **byline** erübrigen sich einige Verrenkungen die man machen muss, um über das im Standard vorgesehene Feld `author` hinaus zusätzliche Informationen zur Person anzubieten bzw. abzurufen. Und wie immer im offenen und freien Web ist es jedem selbst überlassen was und wieviel er davon nutzt. Ich zumindest hoffe das Terry's Idee zum Erfolg führt und die klassischen Feed-Validatoren wie [W3C Feed Validation Service](https://validator.w3.org/feed/), [RSS Validator](https://www.rssboard.org/rss-validator) oder [CAP-Validator](https://cap-validator.appspot.com/validate) die neue Erweiterung schnell ins Portfolio aufnehmen und weitere Blogs **byline** integrieren.

Spread the word ...

---

{% cardlink %}
url: https://www.bylinespec.org/examples/personal-blog
title: "Byline: Structured Identity for Syndication Feeds"
description: "An open specification that adds author context to RSS, Atom, and JSON Feed."
host: www.bylinespec.org
favicon: https://www.bylinespec.org/favicon.ico?favicon.0b3bf435.ico
{% endcardlink %}
