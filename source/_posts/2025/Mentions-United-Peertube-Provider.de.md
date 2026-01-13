---
hidden: true
isLocale: true
permalink: post/Mentions-United-Peertube-Provider/de
#--------------------------------------------------
title: "Mentions United: Peertube Provider"
subtitle: 
date: 2025-05-03 17:55:00
outdates: never
photograph:
  file: D50_9566_2406.jpg
  name: Thomas Garden 24-06 VII
  socialmedia: /static/images/social-media/Mentions-United-Peertube-Provider.jpg
project: mentions-united
categories:
  - Coding
tags:
  - Fediverse
  - Peertube
related:
  - Mentions-United-Native-Mastodon-Provider
  - Mentions-United-Lemmy-plugin-a-few-updates
  - Mentions-United-3-2-1-go
---

Ich hantiere nicht oft mit Videos, schon gar nicht in Bezug auf Social Media. Aber ab und zu nehme ich eines mit meinem Smartphone auf, zum Beispiel auf einem Konzert oder einem Fußballspiel, und möchte über das Event später bloggen. Die MP4-Dateien habe ich dann als Asset in das entsprechende Markdown eingebunden. Über die Jahre kamen da ein paar MB zusammen und ich musste mir irgend wann überlegen wohin damit, um die Größe des Blogs unter 1GB zu halten. Auslagern nach YouTube? Geht schon, aber das wäre für mich die falsche Richtung. Irgendwas im Fediverse oder Social Web? Na klar ... **Peertube**!

<!-- more -->

Auf der deutschen von adminForge betriebenen Instanz [**clip.place**](https://clip.place/c/kiko_io/videos) war schnell eine Kanal für die Videos erstellt und diese hochgeladen. Im Grunde musste ich nur die URL's in den `video` bzw. `iframe` Tags auf die neue ändern.

{% alertbox info %}
Einen Satz zum Angebot von [adminForge](https://adminforge.de/). Stefan Giebel hat unter seinem Portal eine unfassbare Menge an webbasierten Tools zusammengefasst, die er alle selbst hostet. Aktuell sind es 77 Dienste auf 9 Servern in Deutschland und das Angebot reicht von bekannten Fediverse-Plattformen wie Mastodon, Pixelfed und Peertube über Matrix, Diagramme, FreshRSS, Poll, Trash Mail, Password Exchange, Dropfile und vielen weiteren, bis hin zu alternativen Frontends kommerzieller Dienste und abgerundet durch zahlreiche [IT-Tools für Developer](https://tools.adminforge.de/). Sein Angebot ist definitiv einen Blick und eine Spende wert!
{% endalertbox %}

Ich erwarte kein besonderes Kommentaraufkommen zu meinen Videos auf clip.place, da ich es aktuell eher als Ablage bzw. Syndizierungsziel nutze, aber man weiß ja nie ... und da ich bislang allen von mir angebundenen Plattformen, die über eine freie API verfügen, ein [Mentions United Provider Plugin](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-plugins) spendiert habe, ist nun auch eines für [**Peertube**](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-peertube) verfügbar.

![Provider Peertube](post/Mentions-United-Peertube-Provider/Provider-peertube.png)

Die Daten für das Plugin, d.h. die Video-URL's liegen bei mir wie immer im Frontmatter des Beitrags. Hier am Beispiel meines Konzertbeitrags [WIRTZ DNA-Tour 2024, Leipzig @ 2024-02-17](post/WIRTZ-DNA-Tour-2024-Leipzig-2024-02-17):

```yaml
syndication:
  - host: PeerTube
    url: https://clip.place/w/quf3PWpmKJjRwm89axBLY2
```

In der EJS-Vorlage für meine Posts wird entschieden, ob es für den aktuelle Beitrag mindestens eine Peertube-Syndizierung gibt und wenn ja das Peertube Provider Plugin eingebunden und nach dem Mention United-Hauptskript im JS-Code initialisiert. Am Ende wird die im Plugin enthaltene ``retrieve`` Methode über das generelle Mentions United ``load`` aufgerufen und die die Kommentare auf der Seite angezeigt, sondern denn welche vorhanden sind.

```ejs
let synPeertube = syndications?.filter(s => s.host.toLowerCase() === "peertube");

<% if (synPeertube?.length > 0) { %>
<%- js('js/mentions-united-provider_peertube.js'); %>
<% } %>

<script>
  ...
  const mentionsUnited = new MentionsUnited({ ... });

  <% synPeertube?.forEach(syn => { %>
  mentionsUnited.register(new MentionsUnitedProvider_Peertube({ 
    syndicationUrl: "<%- syn.url %>",
    syndicationTitle: "<%- syn.title %>"
  }));
  <% }); %>

  ...
  mentionsUnited.load()
    .then(() => { 
      return mentionsUnited.show(); 
    })
</script>
```

Eigentlich alles so wie immer, aber die [Peertube-API](https://docs.joinpeertube.org/api/rest-getting-started) hat derzeit noch eine Besonderheit: es gibt zwar eine offene RESTful-API, aber keine fixen Auth-Tokens, die man sich zum Beispiel in der Konto-UI generieren lassen könnte. Stattdessen muss man sich über die API zunächst die Client-Tokens abrufen, um damit dann ein für 24 Stunden gültiges Auth-Token ebenfalls über einen REST-Endpunkt erzeugen. Etwas umständlich, aber man kann die Kommentare eines Videos auch über eine Token-freie [Video-Feed-API](https://docs.joinpeertube.org/api-rest-reference.html#tag/Video-Feeds) JSON-Format abrufen und mit einem Parameter zur Video-ID die Datenmenge eingrenzen:

```url
/feeds/video-comments.json?videoId={{ID}}
```

Leider hat dieses Vorgehen einen kleinen Haken: Im Gegensatz zur REST-API bekommt man über den Feed keine vollständigen Autordaten des Kommentars, sondern nur den Anzeigenamen und die Profil-URL:

```json
"author": {
  "name": "Kristof Zerbe",
  "url": "https://clip.place/accounts/kiko"
}
```

Zum Glück benötigt der REST-Endpunkt ``/api/v1/accounts`` aber kein Auth-Token und so sammele ich im Peertube Provider Plugin alle eindeutigen Autoren, schneide den ``name`` aus der Profil-URL heraus und rufe damit die vollständigen Daten gesondert ab. Zum Beispiel:

```json /api/v1/accounts/kiko
{
  "url": "https://clip.place/accounts/kiko",
  "name": "kiko",
  "host": "clip.place",
  "avatars": [
    {
      "width": 48,
      "path": "/lazy-static/avatars/e0891432-0f45-48c5-86c0-594a395f3d91.png",
      "fileUrl": "https://clip.place/lazy-static/avatars/e0891432-0f45-48c5-86c0-594a395f3d91.png",
      "createdAt": "2025-04-01T06:16:21.893Z",
      "updatedAt": "2025-04-01T06:16:21.893Z"
    },
    { "width": 120, ... }
    { "width": 600, ... },
    { "width": 1500, ... }
  ],
  "id": 17957,
  "hostRedundancyAllowed": false,
  "followingCount": 0,
  "followersCount": 0,
  "createdAt": "2025-03-31T07:15:05.857Z",
  "displayName": "Kristof Zerbe",
  "description": "https://kiko.io",
  "updatedAt": "2025-04-01T06:10:52.234Z",
  "userId": 213
}
```

Abgesehen habe ich es dabei vor Allem auf die Avatar-URL, denn ein kleines Bild des Kommentators ist bei Mentions United Interaktionen ein Standard, von dem ich nicht abweichen möchte.

Natürlich steigt die Anzahl der zusätzlichen Requests bei vielen Kommentaren bei diesem Vorgehen deutlich an, aber ich habe im GitHub-Projekt bereits ein [Issue (#6998)](https://github.com/issues/created?issue=Chocobozzz%7CPeerTube%7C6998) dazu aufgemacht. Mal sehen wann ich den Account-Abruf wieder ausbauen kann.

Hier noch ein Beispiel, an dem ich das neue Peertube Provider Plugin getestet habe: [https://kiko.io/post/WIRTZ-DNA-Tour-2024-Leipzig-2024-02-17/#interactions](https://kiko.io/post/WIRTZ-DNA-Tour-2024-Leipzig-2024-02-17/#interactions)
