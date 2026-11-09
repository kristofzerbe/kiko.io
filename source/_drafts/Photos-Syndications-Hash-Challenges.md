---
slug: Photos-Syndications-Hash-Challenges
title: Photos, Syndications, Hash Challenges
subtitle:
date: 2026-11-06 10:58:07
photograph:
  file: 26-07-Potsdam-0167-D50.jpg
  name: St.Nikolai Dome I
  socialmedia: /static/images/social-media/Photos-Syndications-Hash-Challenges.jpg
categories:
  - xxx
tags:
  - xxx
related:
  - Mentions-United-3-2-1-go
  - Exploit-the-feedback-potential-with-syndication-links
  - 
bandcamp:
  artist: xxx
  album: xxx|0
  track: xxx|0
syndication:
  - site: GitHub
    url:
  - site: Bubbles
    url:
  - site: Mastodon
    url:
---
Ich bin glaube ich momentan ein klein wenig besessen von meinen Fotos und investiere fast jede freie Minute in sie. Das sind bei mir mehr Aspekte als man vielleicht zunächst denkt. Nicht nur das ich die Bilder vom Sommerurlaub in Polen noch fertig bearbeite, sondern ich habe vor Jahren begonnen meine, diese Website Stück für Stück zur Präsentationsplattform meiner Fotos auszubauen und werkele ständig an neuen Features herum.

<!-- more -->

---
## Fotos

Es beginnt alles mit dem Foto selbst. Auf Reisen schleppe ich immer meine Nikon D500 mit mir herum und wenn ich sie mal nicht zur Hand habe, nehme ich das Smartphone, obwohl die Qualität dieser Bilder immer zu wünschen übrig lässt. Wieder Zuhause landen die RAW-Bilder in einem eigenen Ordner mit Datum und Reiseziel auf einer großen, doppelt gesicherten Festplatte, von wo aus ich sie in Lightroom importiere und teils wochenlang bearbeite, eben bis ich zufrieden bin. Über ein Sterne-System werden sie von mir bewertet und die 3er bis 5er als JPEG zur weiteren Verwendung exportiert.

Jahrelang habe ich meine Bilder ausschließlich auf Plattformen wie Flickr, 500px und anderen veröffentlicht, Fotoalben daraus gemacht oder auf Leinwand drucken lassen und verschenkt. Bis ich 2019 mein Blog für Tech-Themen gestartet habe und mir dachte: eines meiner eigenen Bilder als Header-Bild wäre doch nett. Das erste und zunächst einzige, namens [Sea Wall](https://kiko.io/photos/$19-05-Israel-0228/), ist immer noch auf der [Startseite](https://kiko.io) zu sehen. Kurze Zeit später hatten jedoch alle Seiten ihr eigenes Header-Bild und ich habe begonnen jeden Post ebenfalls mit einem individuellen Foto zu versehen. Bei der Erstellung eines neuen Posts hat sich zu Anfang ein Script per Zufall eine Bilddatei aus einem Pool-Ordner geschnappt, umkopiert und die Referenz dazu im Markdown des Posts gespeichert. 

Da ich allzu oft für bestimmte Posts bereits ein passendes Foto im Kopf hatte, habe ich irgendwann Einfluss auf den Zufallsalgorithmus genommen und verwende ihn heute nur noch selten. Dafür entstand eine [Photo-Seite](https://kiko.io/photos/), auf der nicht nur die bereits verwendeten Bilder aufgelistet werden, sondern auch die Pool-Fotos für eine bequemere Auswahl des Header-Bilds für neue Posts.

In jedem meiner Fotos stecken eine Menge Informationen in Form von EXIF- und IPTC-Daten und ich dachte mir es wäre zu schade die ungenutzt zu lassen und außerdem wären ja einzelne Fotoseiten für die Bilder auch ganz schön. Also habe ich irgendwann das Hinzufügen neuer Pool-Fotos gescripted und lese dabei die Metadaten aus und lege sie neben dem Foto in einer JSON-Datei ab.

Unter anderem sind in den Metadaten die Koordinaten des Fotos enthalten und Nicolas inspirierte mich mit seiner [Map of photo locations](https://nicolas-hoizey.photo/map/) etwas ähnliches zu bauen, nachdem ich eine Karte in die einzelnen Foto-Seiten eingebaut hatte: meine [Photos Map](https://kiko.io/photos/map).

## Syndizierung

Mit jedem neuen Skandal einer Internet-Plattform in den letzten Jahren wurde ich mehr in die Prinzipien des [IndieWeb](https://indieweb.org/) hineingezogen. Sollen die geld- und machtgierigen Arschlöcher doch zum Teufel gehen. My website is my castle ... und ich setze mit meinen Inhalten konsequent auf [POSSE](https://indieweb.org/POSSE) (_**P**ublish on your **O**wn **S**ite, **S**yndicate **E**lsewhere_). So auch mit den Fotos.

Nun hatte ich viele der Header- und Pool-Bilder in der Vergangenheit bereits irgendwo veröffentlicht und ich habe in den Meta-Dateien einen benutzerdefinierten Abschnitt eingeführt, um dort die bestehenden Links der [Inhaltssyndizierung](https://de.wikipedia.org/wiki/Content-Syndication) zu sammeln, auch wenn dort der notwendige Link zu meiner Fotoseite fehlte, den ich bei neuen Veröffentlichungen aber nun immer setze. Wo das nicht möglich war, habe ich die Plattform einfach verlassen. FU 500px.

Die Mechanik über [Mentions United](https://github.com/kristofzerbe/Mentions-United) die Likes und Kommentare meiner Text-Posts auf meine Website zurückzuholen, habe ich dann auf meine Fotoseiten erweitert.

