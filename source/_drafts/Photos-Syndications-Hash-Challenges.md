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
Ich bin glaube ich momentan ein klein wenig besessen von meinen Fotos und investiere fast jede freie Minute in sie. Das sind bei mir mehr Aspekte als man vielleicht zunächst denkt. Nicht nur das ich die Bilder vom Sommerurlaub in Polen gerade erst fertig bearbeitet habe, sondern ich habe vor Jahren begonnen meine, diese Website Stück für Stück zur Präsentationsplattform meiner Fotos auszubauen und werkele ständig an neuen Features herum.

<!-- more -->

---
## Fotos

Es beginnt alles mit dem Foto selbst. Auf Reisen schleppe ich immer meine Nikon D500 mit mir herum und wenn ich sie mal nicht zur Hand habe, nehme ich das Smartphone, obwohl die Qualität dieser Bilder immer zu wünschen übrig lässt. Wieder Zuhause landen die RAW-Bilder in einem eigenen Ordner mit Datum und Reiseziel auf einer großen, doppelt gesicherten Festplatte, von wo aus ich sie in Lightroom importiere und teils wochenlang bearbeite, eben bis ich zufrieden bin. Über ein Sterne-System werden sie von mir bewertet und die 3er bis 5er als JPEG zur weiteren Verwendung exportiert.

Jahrelang habe ich meine Bilder ausschließlich auf Plattformen wie Flickr, 500px und anderen veröffentlicht, Fotoalben daraus gemacht oder auf Leinwand drucken lassen und verschenkt. Bis ich 2019 mein Blog für Tech-Themen gestartet habe und mir dachte: eines meiner eigenen Bilder als Header-Bild wäre doch nett. Das erste und zunächst einzige, namens [Sea Wall](https://kiko.io/photos/$19-05-Israel-0228/), ist immer noch auf der [Startseite](https://kiko.io) zu sehen. Kurze Zeit später hatten jedoch alle Seiten ihr eigenes Header-Bild und ich habe begonnen jeden Post ebenfalls mit einem individuellen Foto zu versehen. Bei der Erstellung eines neuen Posts hat sich zu Anfang ein Script per Zufall eine Bilddatei aus einem Pool-Ordner geschnappt, umkopiert und die Referenz dazu im Markdown des Posts gespeichert. 

Da ich allzu oft für bestimmte Posts bereits ein passendes Foto im Kopf hatte, habe ich irgendwann Einfluss auf den Zufallsalgorithmus genommen und verwende ihn heute nur noch selten. Dafür entstand eine eigene Seite unter [/photos](https://kiko.io/photos/), auf der nicht nur die bereits verwendeten Bilder aufgelistet werden, sondern auch die Pool-Fotos, zur bequemeren Auswahl des Header-Bilds für neue Posts, und jene mit dem Sonderstatus 'Reserved', von denen ich bereits weiß wo ich sie einsetzen möchte.
 
Nun stecken in jedem meiner Fotos eine Menge Informationen in Form von EXIF- und IPTC-Daten und ich dachte mir irgendwann es wäre zu schade diese ungenutzt zu lassen und außerdem wären ja einzelne Fotoseiten für die Bilder auch ganz schön. Also habe ich irgendwann das Hinzufügen neuer Pool-Fotos gescripted und lese dabei die Metadaten aus und lege sie für die weitere Verarbeitung neben dem Foto in einer JSON-Datei ab.

So sind in den Metadaten die Koordinaten des Fotos enthalten und ich habe die individuelle Fotoseite um eine interaktive, auf OpenStreetMap basierenden, Karte erweitert. Zudem inspirierte mich Nicolas mit seiner [Map of photo locations](https://nicolas-hoizey.photo/map/) dazu, etwas Ähnliches zu bauen: meine [/photos/map](https://kiko.io/photos/map), auf der die Standorte aller Fotos auf einer Weltkarte verzeichnet sind und zum Stöbern einladen.

## Syndizierung

Mit jedem neuen Skandal einer Internet-Plattform in den letzten Jahren wurde ich mehr in die Prinzipien des [IndieWeb](https://indieweb.org/) hineingezogen. Sollen die geld- und machtgierigen Bosse der Plattformen doch zum Teufel gehen. My website is my castle ... und ich setze mit meinen Inhalten konsequent auf [POSSE](https://indieweb.org/POSSE) (_**P**ublish on your **O**wn **S**ite, **S**yndicate **E**lsewhere_), so auch mit den Fotos. Alles was ich produziere wird zuerst auf kiko.io online gestellt und wenn ich Lust habe woanders mit Link aufs Original geteilt. Konsequent.

Nun hatte ich viele der Header- und Pool-Bilder in der Vergangenheit bereits irgendwo veröffentlicht und ich habe in den Meta-Dateien einen benutzerdefinierten Abschnitt eingeführt, um dort die bestehenden Links der [Inhaltssyndizierung](https://de.wikipedia.org/wiki/Content-Syndication) zu sammeln, auch wenn dort der notwendige Link zu meiner Fotoseite fehlte, den ich bei neuen Veröffentlichungen aber nun immer setze. Wo das nicht möglich war, habe ich die Plattform einfach verlassen. Grüße und ein herzliches FU u.a. an 500px.

Die Mechanik client-seitig über die Javascript-Lösung [Mentions United](https://github.com/kristofzerbe/Mentions-United) die Likes und Kommentare meiner Text-Posts, zum Beispiel auf Mastodon, auf meine Website zurückzuholen, habe ich dann auf meine Fotoseiten erweitert und dafür Plugins für [Pixelfed](https://github.com/kristofzerbe/Mentions-United#provider-pixelfed) und [Vernissage](https://github.com/kristofzerbe/Mentions-United#provider-vernissage) geschrieben. Jeder neue Syndizierung wird von mir manuell in die Linkliste der Metadatei eingetragen und taucht dann auf der Fotoseite mit den dazu eingesammelten Interaktionen auf. 

Irgendwann stand ich allerdings vor dem Problem ein Foto veröffentlichen zu wollen, welches sich aber nicht unbedingt für ein Header-Bild eignete. Ich brauchte also neben den "Photos" und dem Pool eine neue Ecke für Bilder, aus denen ich Foto-Seiten generieren konnte, die aber nicht als Asset einem bestimmten Post zugeordnet und dort verwendet wurden. Wo hebt man Dinge auf, die man nicht ständig braucht? Klar, in einer Scheune ...

Stand heute habe ich 340 Fotos in Verwendung, 309 liegen im Pool, 17 in Reserve und 806 in der besagten Scheune. Über alle habe ich 1.770 Syndizierungen gemacht, wobei ich manche Bilder auf bis zu 6 verschiedenen Plattformen veröffentlicht habe.

## Hash Challenges

Die letzte Zahl steigt unter anderem deswegen kontinuierlich, weil ich im August 2026 die Hash Challenge #Fotovorschlag auf Mastodon entdeckt habe, wo ein Bot jeden Morgen um 08:00 Uhr das Thema des Tages ausgibt und die User dazu aufruft ein passendes Foto zu posten. Seit meiner ersten Teilnahme am 10.08. musste ich nur 5 mal passen, weil ich tatsächlich nichts zum Thema gefunden habe, im Gegensatz zu den anderen 95 mal. Ich habe die Challenge inzwischen in meine Morgenroutine eingebaut und möchte bis Jahresende unter 10 Misses bleiben. Sportlich, aber machbar. Um den Überblick zu behalten, habe ich dafür sogar eine eigene Seite gebaut: [/photos/fotovorschlag](https://kiko.io/photos/fotovorschlag/)