---
hidden: true
isLocale: true
permalink: post/ChartsCSS-Without-a-single-line-of-JavaScript/de
#--------------------------------------------------
title: ChartsCSS - Without a single line of JavaScript
subtitle: How to spice up boring HTML tables just with CSS
date: 2026-01-06T17:47:37+01:00
photograph:
  file: 25-05-Portugal-1024-D50.jpg
  name: Massive Blooming I
  socialmedia: /static/images/social-media/ChartsCSS-Without-a-single-line-of-JavaScript.jpg
series: Great Finds
categories:
  - UI/UX
tags: 
  - Visualization
  - HTML
  - CSS
related:
  - StreetComplete-Contribution-while-passing-by
  - The-Last-Image-Gallery
  - Don-t-be-ignorant-and-offer-a-theme-switch
bandcamp:
  artist: Quintana
  album: Eternity|2409501860
  track: Heading Down|3190982730
---

<img src="/post/ChartsCSS-Without-a-single-line-of-JavaScript/logo-animation.svg" class="float-right no-zoom" />

Das ich meinem Blog irgendwann eine [Statistikseite](/stats) gönne, steht schon länger fest. Nur aus Spaß am Code-Basteln, ohne tieferliegenden Grund. Im Sommer habe ich meine Ideen dazu auf ein paar Obsidian-Seiten niedergeschrieben und mich mal so umgesehen, was es für Möglichkeiten zur Datenvisualisierung gibt. Ist doch netter und eingängiger ein paar der Statistiken als Balken und Törtchen anzuzeigen, als nur in öden Zahlenkolonnen. Ich bin ja eher der visueller Typ ... "Alles so schön bunt hier".

Ein Recherchefund stach aus der Masse der üblich verdächtigen JavaScript-Tools heraus: [**ChartsCSS**](https://chartscss.org/) von [Rami Yushuvaev](https://github.com/ramiy) und Lana Gordiievska. Es versprach, die Klassiker der Zahlenvisualisierung wie Balken- und Tortendiagramme **ohne eine Zeile Script** auf eine Web-Seite zu bringen, sondern **ausschließlich mit CSS-Styles**!

<!-- more -->

Ich habe nun ein paar freie Tage am Jahresende genutzt und meine Statistiken in Angriff genommen, inklusive dem bereits 5 Jahre alten CSS-Framework von Rami ... und was soll ich sagen: Es ist wirklich beeindruckend wie clever er die gängigen Style-Methoden nutzt, um aus HTML-Tabellen (! ... richtig gelesen) bunte Diagramme zu machen, die sich superleicht mit eigenen Styles anpassen lassen, ohne in der gerade einmal 59KB großen ``charts.min.css`` herumfingern zu müssen. Mir stand der Sinn lediglich nach einem Balkendiagramm, daher habe ich in die Torten codetechnisch nur mal reingeschaut, aber nicht wirklich durchdrungen wie Rami aus rechteckigen Zellen Tortenstückchen macht!?

![ChartsCSS Beispiele](/post/ChartsCSS-Without-a-single-line-of-JavaScript/chartcss-samples.png)

Neben diesen 5 verfügbaren Diagrammtypen sind laut Website drei weitere geplant: Radial, Polar und Radar, aber die kommen nicht wirklich in die Gänge, da das Projekt ein wenig zu stehen scheint. Rami hat vor 6 Monaten die aktuelle Version 1.20 veröffentlicht und die vorherige stammt aus dem Jahr 2023. Das macht aber nicht viel, denn das was da ist, ist exzellent. So auch die Dokumentation unter [chartscss.org/docs](https://chartscss.org/docs/), die aufgrund der vielen Beispiele kaum Fragen offen lässt.

## Fazit

Wer sich mit JavaScript schwer tut, aber HTML und CSS einigermaßen beherrscht, kommt mit [ChartsCSS](https://chartscss.org/) zu sehr ansehnlichen Ergebnissen. Meist braucht es einfach nicht mehr.

Ein Beispiel gibts hier ... [/stats](/stats)
