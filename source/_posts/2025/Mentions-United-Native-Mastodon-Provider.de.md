---
hidden: true
isLocale: true
permalink: post/Mentions-United-Native-Mastodon-Provider/de
#--------------------------------------------------
title: 'Mentions United: Native Mastodon Provider'
subtitle: 
date: 2025-01-12 14:54:21
outdates: never
photograph:
  file: D50_9807_2407.jpg
  name: Thomas Garden 24-07 XIII
  socialmedia: /static/images/social-media/Mentions-United-Native-Mastodon-Provider.jpg
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Mastodon
related:
  - Mentions-United-3-2-1-go
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-New-Renderer-and-Refactorings
---

Als ich mit Mentions United angefangen habe, um auf meinem statischen Blog die Interaktionen der Syndizierungen auf den verschiedenen Fediverse-Plattformen einzusammeln und anzuzeigen, habe ich mich hinsichtlich des Funktionsumfanges zunächst einmal um meine Bedürfnisse gekümmert ... siehe auch [**Mentions United ... 3, 2, 1, Go**](/post/Mentions-United-3-2-1-go/).

Ganz oben auf der Liste standen natürlich **Webmentions**, dicht gefolgt von **Mastodon** und den klassischen Nicht-Fediverse-Plattformen wie Flickr, wo ich unter anderem meine Fotos syndiziere. Diese Gruppe an Plattformen konnte ich komplett über das Webmentions-Provider Plugin abdecken, denn dank [brid.gy](https://brid.gy]) und [webmention.io](https://webmention.io) werden deren Interaktionen ebenfalls in Webmentions umgewandelt.

![Provider Webmention](post/Mentions-United-Native-Mastodon-Provider/Provider-webmention.png)

<!-- more -->

Das erste native Plugin war **Pixelfed**, das auf Grund von Unkompatibilitäten bislang nicht an brid.gy angebunden werden konnte, und wenig später eines für **Lemmy**.

Nun möchte nicht jeder für die Anbindung von Mastodon dem Umweg über Webmentions gehen, daher habe ich dem Projekt nun ein natives Provider Plugin für Mastodon hinzugefügt:

![Provider Mastodon](post/Mentions-United-Native-Mastodon-Provider/Provider-mastodon.png)

Der Einsatz des Plugins auf der eigenen Seite ist genauso "einfach", wie die der anderen. Nach dem Einbinden des Haupt-Scripts und der benötigten Plugins (zum Beispiel der Renderer LIST) in das HTML ...

```html
<script src="/js/mentions-united.js"></script>
<script src="/js/mentions-united-provider_mastodon.js"></script>
<script src="/js/mentions-united-renderer_list.js"></script>
```

... wird das Haupt-Script nach dem Laden der Seite mit den Plugins initialisiert und ausgeführt:

```html
<script>
window.addEventListener('load', function() {

  const mentionsUnited = new MentionsUnited({
    ownerName: "__OWNER-NAME__"
  },
  [
    new MentionsUnitedProvider_Webmentions({
      syndicationUrl: "__MASTODON-URL__"
    }),  
    new MentionsUnitedRenderer_List({
      placeholderId: "__PLACEHOLDER-ELEMENT-ID__"
    })
  ]);

  mentionsUnited.load()
    .then(() => {
      return mentionsUnited.show();
    })
    .then((count) => {
      // do something final... 
    });

}
</script>
```

In dem Beispiel müssen nur die ``__VARIABLES__`` ersetzt werden und die Mastodon Interaktionen erscheinen auf der Seite. Noch ein wenig CSS für das vom Renderer erzeugte HTML, das ein vorhandenes Placeholder-Element ersetzt ... und fertig.

Das neue Mastodon Provider-Plugin hat neben der ``syndicationUrl``, die die vollständige URL zum Mastodon-Post darstellt, noch ein paar optionale Optionen, die im [Abschnitt auf der GitHub-Seite](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#mastodon) dokumentiert sind.

---

## Webmentions versus Mastodon Provider

Mit dem Einsatz des neuen Mastodon Providers ist es theoretisch möglich, das man die Interaktionen der Plattform doppelt herunterlädt und anzeigt, wenn man wie ich Mastodon an webmention.io angebunden hat. Daher hat das bestehende Webmentions-Provider-Plugin eine neue Option namens ``skipOrigins`` erhalten, mit dem man zum Beispiel alle ``mastodon`` Interaktionen vor der Verarbeitung herausfiltern kann.

Ich werde auch weiterhin die Mastodon Interaktionen als Webmentions auf meine Seite ziehen, denn dies hat den entscheidenden Vorteil, dass nicht nur die Interaktionen herausgezogen werden, die direkt an der Syndizierungs-URL hängen, sondern auch Erwähnungen der Post-URL in anderen Mastodon-Posts, die brid.gy für mich einsammelt.

---

## Projektstand Januar 2025

![Provider Overview](post/Mentions-United-Native-Mastodon-Provider/Provider-Overview.png)

Insgesamt beinhaltet das Projekt nun **5 Provider** Plugins, die die Daten holen, und **5 Renderer** Plugins, die die Daten in HTML umsetzen. Natürlich möchte ich das Mentions United irgendwann alle möglichen Fediverse-Plattformen abbildet, aber dazu bin ich auf Eure Hilfe angewiesen, denn weder bin ich auf allen Plattformen vertreten, noch habe ich die Zeit sie alle zu implementieren. Wenn Du also mithelfen magst einen weiteren Provider anzubinden oder eine eigene Idee für die Darstellung in Form eines neuen Renderers hast ... Du bist herzlich eingeladen mitzumachen.
