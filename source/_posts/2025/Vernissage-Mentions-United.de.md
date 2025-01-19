---
hidden: true
isLocale: true
permalink: post/Vernissage-Mentions-United/de
#--------------------------------------------------
title: Vernissage & Mentions United
subtitle: Eine neue Foto-Plattform und ihre Anbindung an Dein Blog
date: 2025-01-18 12:51:56
photograph:
  file: D50_9044_2405.jpg
  name: Thomas Garden 24-05 XXIV
  socialmedia: /static/images/social-media/Vernissage-Mentions-United.png
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Vernissage
  - Pixelfed
related:
  - Mentions-United-Native-Mastodon-Provider
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-3-2-1-go
---

Seit wieder einmal ein Tech-Milliardär (diesmal der von Meta) zu der Meinung gelangt ist, er könnte auf Moral und Anstand verzichten und dem baldigen 47. Präsidenten der USA so tief wie nur irgendmöglich in den rechtsextremen A*** kriechen, gibt es eine nicht unbedeutende Abwanderung von Usern von Instagram zur Fediverse-Alternative [**Pixelfed**](https://github.com/pixelfed/pixelfed), einer foto-zentrierten Plattform, die bislang neben dem großen Mastodon eher ein Schattendasein geführt hat.

Ich freue mich sehr darüber, das der Pixelfed-Erfinder [@Dansup](https://pixelfed.social/dansup) aktuell jeden Tag die Resourcen seines [pixelfed.social](https://pixelfed.social)-Servers hochschrauben muss, auf dem auch ich ein [Konto](https://pixelfed.social/kristofz) habe, um dem Ansturm gerecht zu werden. Instagram ist neben Threads das letzte Meta-Produkt, bei dem ich ein Konto habe und ein offenes und dezentrales Gegengewicht dazu kann ich nur begrüßen.

Ich muss aber gestehen, dass ich meine Fotos zwar regelmäßig auf Pixelfed veröffentliche, aber nicht zu 100% mit der Plattform zufrieden bin. Zum einen ist das UI und die Handhabung aktuell (noch) recht sperrig und zum anderen ist es eben eher eine Plattform für alltägliche Bilder der Generation Selfie, als eine Foto-Plattform, wie es zum Beispiel 500px jahrelang für mich war. Ich beschäftige mich in meiner Freizeit mit der Fotografie und möchte meine Arbeit daher vor Allem im Rahmen eines Portfolioansatzes präsentieren. Das ist Pixelfed aufgrund der Stoßrichtung Instagram-Ersatz für mich nur bedingt.

Deutlich wohler fühle ich mich daher auf dem neuen und aufgehenden Stern am Fediverse-Himmel namens **Vernissage** von [Marcin Czachurski](https://vernissage.photos/@mczachurski), das ich vor ein paar Wochen entdeckt und lieben gelernt habe.

![Vernissage UI](/post/Vernissage-Mentions-United/vernissage-ui.png)

<!-- more -->

Wem der Name *Vernissage* irgendwie bekannt vorkommen sollte, verwendet vielleicht die früher so genannte iOS-App für Pixelfed, die letztes Jahr von Marcin in [Impressia](https://apps.apple.com/de/app/impressia-for-pixelfed/id1663543216) umbenannt wurde, als er sich daran machte eine [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub)-getriebene alternative Fotoplattform unter dem alten Namen zu bauen.

Die Plattform besteht technisch aus mehreren Komponenten wie dem VernissageServer (API, geschrieben in Swift) und dem Angular-Frontend VernissageWeb und es ist beeindruckend was das Ding seit dem initialen Commit auf GitHub Mitte 2023 bereits kann und wie stabil die aktuell Beta ist. Die [Roadmap des Projekts](https://github.com/orgs/VernissageApp/projects/2) verspricht viel Gutes für die Zukunft, auch wenn Vernissage schon jetzt in vielen Bereichen besser ist als Pixelfed. So ist das Hinzufügen von Fotos deutlich komfortabler und bietet gar KI-Unterstützung bei Tags und ALT-Texten. Auch die Verarbeitung and Anzeige von in die Fotodatei eingebetten Meta-Daten wie EXIF ist vorbildlich und vergleichbar mit anderen kommerziellen Plattformen wie 500px und Flickr. Die Weboberfläche funktioniert als installierbare WebApp und bietet schon jetzt diverse Benachrichtungspunkte und vor allem die fotozentrierte Ansicht ohne Text, wie ich sie bevorzuge.

Bislang gibt es nur die von Marcin selbstbetriebene Instanz **[vernissage.photos](https://vernissage.photos)**, aber ich bin mir sicher, dass in naher Zukunft der ein oder andere fotointeressierte IT'ler lieber eine eigene Vernissage- als eine neue Pixelfed-Instanz aufsetzen wird. Für die Vernetzung spielt es eh keine Rolle, denn durch das Fediverse sind alle Plattformen eh vernetzt und Fotobeiträge zum Beispiel aus Mastodon werden auch in Vernissage angezeigt und man kann sich mit den Urhebern vernetzen.

---

## Blog-Anbindung über Mentions United

Bis heute habe ich 36 meiner jüngeren Fotos auf meinem Vernissage-Konto unter [https://vernissage.photos/@kiko](https://vernissage.photos/@kiko) veröffentlicht und in den nächsten Wochen und Monaten werden es sukzessive mehr, wenn ich auch ausgewählte ältere Fotos ebenfalls auf Vernissage hochlade. Natürlich ist das Konto, wie die Plattform eben auch, noch recht unbekannt, aber ich habe schon einige Interaktionen wie Likes, Reposts und Kommentare erhalten und mich deshalb daran gemacht diese an mein Blog anzubinden ... mit meiner dafür entwickelten JavaScript-Lösung [Mentions United](/projects/mentions-united/).

{% alertbox info %}
Wenn du nicht weißt, wovon ich rede, empfehle ich dir den Artikel [**Mentions United ... 3, 2, 1, Go**](/post/Mentions-United-3-2-1-go/), in dem ich beschreibe, was Mentions United eigentlich ist und wofür du es nutzen kannst.
{% endalertbox %}

Seit heute gibt es ein [**Mentions United Provider Plugin für Vernissage**](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-vernissage):

![Provider Vernissage](post/Vernissage-Mentions-United/Provider-vernissage.png)

Die Implementierung ist nahzu identisch zu der des bestehenden [Pixelfed-Plugins](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-pixelfed) und unterscheidet sich nur in Details. In der Verwendung gibt es nur einen Unterschied: ihr braucht keinen API-Key, denn der lesende Zugriff auf die Likes, Reposts und die Konversationen ist (wie bei Mastodon) frei.

Wie die damit eingesammelten Interaktionen aussehen, könnt ihr Euch unter anderem auf der Foto-Seite des Header-Bildes dieses Beitrags ansehen ... [Photo Thomas Garden 24-05 XXIV](/photos/D50_9044_2405/).

Viel Spaß beim Fotografieren und Kommunizieren ... wir sehen uns auf [Vernissage](https://vernissage.photos) :)