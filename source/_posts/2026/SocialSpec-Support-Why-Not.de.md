---
hidden: true
isLocale: true
permalink: post/SocialSpec-Support-Why-Not/de
#--------------------------------------------------
slug: SocialSpec-Support-Why-Not
title: SocialSpec Support ... Why Not?
subtitle:
date: 2026-11-16 18:11:58
photograph:
  file: 24-05-Wales-7264.jpg
  name: Color Carousel
  socialmedia: /static/images/social-media/SocialSpec-Support-Why-Not.jpg
series: IndieWeb
categories:
  - Coding
tags:
  - IndieWeb
  - Social Media
  - Identity
related:
  - New-Approach-on-Sending-Webmentions
  - Exploit-the-feedback-potential-with-syndication-links
  - IndieFediWebVerse
bandcamp:
  artist: Solar Sons
  album: Altitude|570176032
  track: O.G|1992310630
---

Vor einigen Wochen habe ich im Fediverse zum ersten mal etwas über die Initiative [SocialSpec](https://socialspec.org/) gelesen, die zum Ziel hat über einzelne standardisierte Dateien im .well-known Ordner eines Blogs den Menschen im Hintergrund etwas näher zu beleuchten und in einer Art Profil zusammenzufassen.

Neben dem obligatorischen RSS-Feed sind das:

1. **following.opml** - Wem ich per Feed folge (Blogroll)
2. **about.md** - Wer ich bin als Freitext in Markdown
3. **contact.vcf** - Kontaktdaten als vCard

Als Anzeigemöglichkeit eines solchen "Profils" wurde damals lediglich eine iOS-App propagiert und da war ich schon raus. Matthias hat das Thema aber mit seinem Post [SocialSpecing & HyperTexting](https://notiz.blog/2026/11/07/socialspecing-hypertexting/) bei mir noch einmal aufgewärmt und ich dachte mir ... Warum nicht? Zumal es mit [Social Browser unter sodir.org](https://sodir.org/profile.html?d=kiko.io) nun auch eine Web-Anwendung dafür gibt.

<!-- more -->

Alle benötigten Informationen sind auf meinem Blog bereits vorhanden, da ich schon lange meinen Website-Code mit [Microformats](https://microformats.org/wiki/) nach den Prinzipien des IndieWeb anreichere. Diese Daten beim Build ein zweites Mal, nun in eine well-known-Datei auszuleiten, war schnell gemacht und das Ergebnis weiß zu überzeugen:

![Social Browser - kiko.io](/post/SocialSpec-Support-Why-Not/socialspec-kikoio.png)

Nun gibt es aus dem IndieWeb Kritik an SocialSpec, die vor allem in der [Ablehnung von Sidefiles](https://indieweb.org/sidefile-antipattern) begründet ist. Das sei ein Anti-Pattern und sei wegen dem DRY-Prinzip (Don't Repeat Yourself) zu vermeiden. Wenn ich eines in meiner langen Karriere gelernt habe ist es, dass man sich an Prinzipien orientieren, aber den gesunden Menschenverstand die Arbeit übernehmen lassen sollte. Manchmal ist sich Wiederholen angebracht und einfacher. So auch hier. Baut Microformats ein und die SocialSpec-Dateien, wenn ihr anderen das HTML-Parsen ersparen wollt. Das Wichtigste ist ... **seid Indie**. Macht was ihr wollt.
