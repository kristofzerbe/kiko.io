---
hidden: true
isLocale: true
permalink: post/Using-GitHub-as-Commenting-Platform-2025-Edition/de
#--------------------------------------------------
title: Verwendung von GitHub als Kommentierungsplattform, Edition 2025
subtitle: Diesmal kein Utterances, sondern Webmentions
date: 2025-08-02 17:31:39
photograph:
  file: 24-05-Wales-7314.jpg
  name: Sky Construction
  socialmedia: >-
    /static/images/social-media/Using-GitHub-as-Commenting-Platform-2025-Edition.jpg
series: A New Blog
categories:
  - Tools
tags:
  - Hexo
  - GitHub
related:
  - Using-GitHub-as-Commenting-Platform
  - Mentions-United-3-2-1-go
  - Push-Over-Webmentions
---

Von Beginn dieses Blogs in 2019 an, gab es die Möglichkeit die Artikel auf der Seite zu kommentieren. Zunächst mit Disqus, welches ich aber aus Gründen nach nicht einem Jahr gegen [Utterances](https://utteranc.es) ausgetauscht habe. Das passte für mich ganz gut, denn der Code meines Blogs liegt nicht nur öffentlich auf GitHub, sondern wird auch auf GitHub Pages gehostet. Nach einer Weile habe ich aber auch dieses wieder aus dem Code entfernt und mich voll und ganz auf Webmentions und Fediverse-Syndizierungen konzentriert, was am Ende in der Entwicklung meiner [Mentions-United](/post/Mentions-United-3-2-1-go)-Lösung gipfelte.

Gestern habe ich mich ein wenig mit [@jsstaedtler](https://mastodon.art/@jsstaedtler) auf Mastodon über Kommentarformulare, Syndizierungen und dergleichen unterhalten und dabei wurde mein ToDo wieder ein eigenes Kommentarformular einzubinden wieder in den Fokus gerückt, denn in einem hat Johann recht: Interaktionen NUR über Syndizierungen und Webmentions anzubieten, wird den Usern nicht gerecht, die keinerlei Accounts auf diesen Plattformen besitzen oder Webmention-fähige Blogs betreiben. Es sollte für jeden was dabei sein.

Da dies ein statisches Blog ist, ging mein erster Gedanke sicherlich in die Richtung einer der zahlreichen Kommentarplattformen wie Formspree, Formspark, GetForm, Static Forms, FormSubmit und wie sie alle heißen, aber ich möchte diese neue Abhängigkeit eigentlich vermeiden und für eine simple Kommentarfunktion, die eh kaum jemand nutzen wird, im Monat 15$ zu bezahlen sehe ich eh nicht ein. Mit genügt meine schlechte Erfahrung mit Disqus. Nun wird der ein oder andere sagen: "*Halt, halt ... XXX kostet doch nur 5$ und YYY gar nichts*", aber meine Anforderungen haben sich mit den Jahren geändert: Ich brauche keine Oldschool-Mail über eingehende Kommentare, wie sie fast alle diese Dienste versenden, sondern eine **Plattform auf der die Kommentare mit Moderationsfunktion gespeichert werden und von wo ich sie über eine API und einem Mentions United Plugin in meine Seite ziehen kann**. 

<!-- more -->

Den einzigen Kandidaten aus dieser Kategorie, den ich mir demnächst vielleicht noch einmal ansehe ist [Form Owl](https://formowl.dev) von BirdyDev Ltd. Das Ding ist noch in der Alpha-Phase, aber auf Reddit diskutiert der User 'linhub' über die nächsten zu implementierenden Features und die gehen in meine Richtung. Was mich aber wieder einmal kolossal nervt, ist das Versteckspiel des/der Macher von FormOwl. BirdDev's Website gibt nur her, das es wohl eine Web-Agentur aus Kanada ist, aber ohne weitere Informationen zur Firma oder den/die Menschen dahinter. Nur Hubert, der in die Kamera grinst und chatten will. Das nenne ich mal vertrauensbildend. Will ich mit Dingen von Leuten arbeiten, die so intransparent sind wie die italienische Mafia?

---

## Ein neues Syndizierungsziel

Aber zurück zu meinem Problem ... Meine Recherche förderte einen [Beitrag von Michael Walter Van Der Velden](https://mikevdv.dev/blog/2022-08-25-switching-to-webmention-comments) aus dem Jahr 2022 zutage, der beschrieb, wie er Utterances losgeworden ist, ABER das Prinzip dahinter (Speicherung der Kommentare in einem GitHub-Issue zum Beitrag) weiterverwenden und über Webmentions an seine Seite binden konnte. Hoppala, daran hatte ich gar nicht gedacht. Seit ich Utterances abgeschafft habe, liegen ein paar Issues, die über Kommentare reingekommen sind, in meinem Repository herum. Es sind, wie Michael vollkommen richtig ausführt, klassische Syndizierungen, wie ich sie jeden Tag in meinem Blog einsetze, aber eben nur auf der Plattform GitHub und in Form eines Issues zum jeweiligen Post.

Ich speichere die Syndizierungen eines Posts auf einer Plattform in den Metadaten (Frontmatter) der Markdown-Datei. Das für GitHub zu erweitern war einfach, da die gesamte Infrastruktur für die Anzeige des Links auf der Beitragsseite bereits vorhanden ist und lediglich das Icon in den Styles zur Anzeige fehlte:

```yaml
---
slug: Using-GitHub-as-Commenting-Platform
title: Using GitHub as Commenting Platform
subtitle: Integrate Utterances GitHub Issue Commenting to Hexo
date: 2020-07-05T14:55:16.000Z
...
syndication:
  - host: GitHub
    url: https://github.com/kristofzerbe/kiko.io/issues/3
```

Das einzige was ich tun musste, ist die URL der betroffenen Beiträge (wie zum Beispiel [Using GitHub as Commenting Platform](/post/Using-GitHub-as-Commenting-Platform) aus 2020) von [**brid.gy**](https://brid.gy) über meinen GitHub-Account noch einmal crawlen lassen und sofort wurden neue Webmentions auf meinem Endpunkt [webmention.io](https://webmention.io/) registriert, die beim Neuladen der Seite automatisch vom entsprechenden [Mentions United Plugin](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-webmentions) gezogen und angezeigt wurden.

Was ich mir nun überlegen muss ist, wie und zu welchem Zeitpunkt bei der Erstellung eines neuen Beitrags ich das Issue automatisch über die [GitHub-API](https://docs.github.com/en/rest/issues?apiVersion=2022-11-28) erzeugen lasse. Bis dahin werde ich das manuell bei den Beiträgen tun wo es Sinn ergibt: 

1. Repo ``kristofzerbe/kiko.io`` auf github.com aufrufen
2. Neues Issue mit dem Titel ``post/<SLUG>`` und dem Titel und Excerpt als Inhalt erzeugen
3. Die Issue-URL in die Metadaten des Beitrags unter ``syndication`` eintragen

---

## Fazit

Das Schöne an der Lösung: Ich werde über [Pushover](/post/Push-Over-Webmentions/) bei jeder eingehenden Webmention (und somit auch über einen neuen Issue-Kommentar) informiert und kann unliebsame Dinge über die mehr als ausgereiften Kommentarfunktionen von GitHub schnell wegmoderieren ohne ein neues Build anstoßen zu müssen, da Mentions United eine Client-Lösung ist. Da ist Spam schneller weg als man es buchstabieren kann :)

Das Blöde an der Lösung: Ich habe nun zwar eine weitere Kommentarfunktion, aber dafür braucht der User wiederum einen Account auf einer Plattform, diesmal GitHub, und ein echtes Kontaktform ist es auch nicht. Wieder nur ein Link ... mein ToDo ist immer noch offen.
