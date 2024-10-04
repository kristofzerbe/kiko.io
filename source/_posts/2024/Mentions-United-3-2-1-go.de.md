---
hidden: true
isLocale: true
permalink: post/Mentions-United-3-2-1-go/de
#--------------------------------------------------
slug: Mentions-United-3-2-1-go
title: Mentions United ... 3, 2, 1, Go
subtitle: Eine JavaScript-Lösung, um Blog-Beiträge mit ihren Interaktionen zu verbinden
date: 2024-10-03 15:22:21
photograph:
  file: D50_0272_2408.jpg
  name: Thomas Garden 24-08 XIII
  socialmedia: /static/images/social-media/Mentions-United-3-2-1-go.png
series: IndieWeb
project: mentions-united
categories:
  - Tools
tags:
  - Webmention
  - Interactions
related:
  - Push-Over-Webmentions
  - Hexo-and-the-IndieWeb
  - IndieFediWebVerse
---

<img src="/images/mentions-united.svg" class="float-right no-zoom">

## Perspektive

Bloggen bedeutet, die eigene Meinung in ein öffentliches Schaufenster zu stellen und natürlich erhofft man sich Reaktionen darauf, sonst würde man die eigenen Gedanken eher in ein kleines Büchlein schreiben und im Nachttischschrank verstecken. Blogbeiträge sind somit immer nur die erste Hälfte einer Konversation mit den Mitmenschen, den Lesern, den Web-Usern. Die andere Hälfte sind eben jene Reaktionen oder besser Interaktionen. Likes, Kommentare oder Links von anderen Bloggern, die die Meinung in einem eigenen Blog-Beitrag aufgreifen, um sie weiterzuverbreiten oder zu diskutieren. Aus diesen beiden Hälften entsteht eine Geschichte.

<!-- more -->

Blogs zu betreiben, so scheint es, wird aktuell wieder beliebter. Nach vielen Jahren der Einhegung durch große "Meinungskonzerne", die es zwar einfach gemacht haben sich mitzuteilen, haben viele Menschen gemerkt, dass diese Simplizität einen Preis hat, denn die Meinung selbst oder gar der Mensch stand dort nie im Mittelpunkt des Interesses. Der Content im Zentrum der geschlossenen Netzwerke wird monetär verwertet oder zur Manipulation anderer eingesetzt. Bloggen ist heute somit auch heute Ausdruck des Wunsches nach Freiheit und Unabhängigkeit und Emanzipation von den großen Social Media Plattformen.

Diese Freiheit bringt es allerdings mit sich, dass man zum einen ein gerüttelt Maß an technischem Verständnis mitbringen muss und die Vernetzung des Contents nicht so einfach ist wie bei den großen Plattformen, wo man nur in Lage sein muss eine Tastatur zu bedienen. Blogging-Plattformen wie Wordpress sind an dieser Stelle sicherlich eine Hilfe, aber am Ende des Tages hat man lediglich einen Blog, in das man seine Gedanken in Form von Posts niederschreiben und veröffentlichen kann, aber nicht automatisch Kommunikation. Der wichtigste Baustein für eine echte Konversation mittels eines Blogs ist der Hyperlink, dem zentralen Element des World Wide Web, und im Gegensatz zu den 2000er-Jahren, den Anfängen des Bloggens, gibt es heute einige Möglichkeiten über einen Link zu kommunizieren und somit zu einem Austausch zu kommen, der über das bloße Kommentieren am Blog-Post hinausgeht.

---

## Interaktionen

Ein Beispiel: Alice schreibt auf ihrem Blog einen Beitrag ...

1. Bob liest ihn und schreibt seinerseits etwas zum Thema in seinem Blog, wobei er den Beitrag von Alice über deren URL erwähnt 
2. Alice postet die URL zu ihrem Beitrag mit der Überschrift auf einer Social Web Plattform wie Mastodon. Chris liest den Post und setzt einen Like
3. Daniel antwortet auf den Mastodon-Post und repostet ihn gleichzeitig
4. Alice syndiziert den kompletten Beitrag inklusive der URL zum Original auf einer Entwickler-Plattform wie zum Beispiel DEV und Eric kommentiert diesen Post

Alle oben genannten Interaktionen haben zwar ihren Ursprung auf Alice's Blog, aber sie liegen außerhalb ihres Systems und spiegeln sich im Originalbeitrag nicht wieder. Für Bob wäre der Kommentar von Eric oder die Antwort von Daniel sicherlich interessant, aber er bekommt davon ebenso wenig mit wie Alice von Bob's Erwähnung auf seinem Blog. Es fehlt eine Auflistung aller Interaktionen aus dem Web am Originalbeitrag.

Die Techniken um dies zu bewerkstelligen existieren heute alle. Man muss sie nur anwenden:

*zu 1:* Bob setzt eine [Webmention](https://en.wikipedia.org/wiki/Webmention) ab, auf den von Alice auf der Beitragsseite verlinkten Endpunkt (zum Beispiel [webmention.io](https://webmention.io/)) und Alice holt sie dort über die API ab
*zu 2 und 3:* Alice hat zuvor [brid.gy](https://brid.gy) so eingerichtet, dass Interaktionen von Mastodon ebenfalls an den Webmention-Endpunkt geliefert werden
*zu 4:* Alice holt die DEV-Kommentare über die dedizierte API ab

Gerade die Interaktionen aus dem Social Web aka [Fediverse](https://en.wikipedia.org/wiki/Fediverse) sieht man auf diversen Blogbeiträgen heute schon. Sie werden meist direkt über die API von Mastodon auf die Seite gezogen. Dabei wird aber meist ein wichtiger Aspekt vernachlässigt: die **Verlinkung der selbst durchgeführten Syndizierungen auf dem Originalbeitrag**, um den Lesern die Möglichkeit zu geben mit einem Klick auf einer Interaktionsmöglichkeit zu landen!

Wie bekommt Alice aber nun die Interaktionen auf Ihre Seite, ohne sich in die jeweiligen API's einarbeiten zu müssen?

Sie verwendet einfach die Client-Scripte des Projekts **[Mentions United](https://github.com/kristofzerbe/Mentions-United)**...

---

## Antrieb

Vor drei Jahren habe ich auf diesem Blog nicht nur Webmentions eingeführt und [hier](https://kiko.io/post/Hexo-and-the-IndieWeb-Receiving-Webmentions/) und [hier](https://kiko.io/post/Hexo-and-the-IndieWeb-Sending-Webmentions/) darüber berichtet, sondern auch begonnen systematisch meine manuellen Syndizierungen auf anderen Plattformen aufzuzeichnen und unter dem Beitrag anzuzeigen.
Textbeträge syndiziere ich auf Mastodon und wenn es inhaltlich passt auch auf DEV und Fotos auf Pixelfed, Flickr und ein paar anderen (leider) geschlossenen Plattformen. Alle Webmentions und Interaktionen von Mastodon und Flickr habe ich dabei über die Kombination von Aaron Parecki's [webmention.io](https://webmention.io/) und Ryan Barrett's [brid.gy](https://brid.gy) eingesammelt und über ein clientseitig ausgeführtes JavaScript auf die Beitragsseite gebracht.

Was aber immer fehlte waren die Interaktionen der anderen Plattformen. Zwar könnte brid.gy prinzipiell Likes und Kommentare von Pixelfed, der größten Fotoplattform im Social Web einsammeln, aber ein paar mittlerweile seit 4 Jahren bekannte [Bugs](https://github.com/snarfed/bridgy/issues/927) in der Plattform verhindert dies.

Nun bin ich nicht der geduldigste Mensch und da auch nach mehrmaligem Nachfragen im Pixelfed-Issue keinerlei Reaktionen zu verzeichnen waren und das für mich eh nur ein Problem gelöst hätte, dachte ich mir: dann bau ich halt selbst etwas, was in der Lage ist Interaktionen von allen möglichen API's abzuholen und in meine Beitragsseiten einzufügen.

---

## Projekt &laquo;Mentions United&raquo;

Wie sagte schon Robb Knight über sein [EchoFeed](https://echofeed.app/):

> Naming things is hard, leave me alone.

Leichter festzulegen war die Funktionsweise und die Struktur der Lösung. Es sollte zum einen eine **reine Client-JavaScript-Anwendung** werden, die im Browser auf der Seite ausgeführt wird, um sicherzustellen, das die Daten immer aktuell sind und zurückgezogene Interaktionen keine Berücksichtigung finden, und zum anderen sollten über ein **Plugin-System** immer nur die Skripte ausgeführt werden, die auch benötigt werden.

Das Projekt besteht daher aus einem nur 7 KB großen **Haupt-Skript** und zwei Arten von Plugin-Skripten:

- **Provider-Plugins** zum Abrufen personenbezogener Interaktionsdaten und deren Zusammenführung in einem gemeinsamen Format

- **Renderer-Plugins** zum Umwandeln der gesammelten Daten in HTML und Einfügen in die Seite

Im Haupt-Skript (``mentions-united.js``) sind die maßgeblichen Methoden implementiert:

- **register(plugin)** - Registriert ein Plugin-Skript zur Ausführung 
- **load()** - Führt in allen registrierten Provider-Plugins die Methode ``retrieve()`` aus, die die Daten von den jeweiligen API's einsammelt
- **show()** - Führt in allen registrierten Renderer-Plugins die Methode ``render(interactions)`` aus, die die zusammengeführten Daten in HTML umsetzt und einfügt

Weitergehende Erklärungen, wie die Lösung aufgebaut ist, findet sich in der README des [GitHub Repos](https://github.com/kristofzerbe/Mentions-United).

### Verfügbare Plugins

Die initial entwickelten Plugins decken natürlich zunächst einmal meine Bedürfnisse für dieses Blog ab, aber es wäre wunderbar wenn mit der Zeit weitere aus der Entwickler-Community hinzukommen würden. Ich selbst werde in den nächsten Wochen noch native Provider-Plugins für Mastodon und Flickr beisteuern, um die aktuelle Abhängigkeit von brid.gy verringern zu können, wo sie nicht mehr notwendig ist.

- Provider-Plugin **Webmentions** (``mentions-united-provider_webmentions.js``)
  Holt alle Interaktionen von der webmention.io API über die URL des Blogbeitrags (Target) ab, seien dies echte Webmentions oder über brid.gy eingesteuerte Interaktionen der Plattformen Mastodon, Bluesky, GitHub, Flickr und anderen

- Provider-Plugin **Pixelfed** (``mentions-united-provider_pixelfed.js``)
  Holt alle Interaktionen von der API einer Pixelfed-Instanz über die Syndizierungs-URL (Source) ab. In den übergebenen Optionen kann man auch eine API-Proxy-URL angeben, um den für den Abruf notwendigen Schlüssel nicht öffentlich verfügbar zu machen

- Provider-Plugin **DEV.to** (``mentions-united-provider_devto.js``)
  Holt alle Kommentare von der DEV API über die Syndizierungs-URL ab

![Provider Overview](post/Mentions-United-3-2-1-go/Provider-Overview.png)

Sobald alle Interaktionen eingesammelt sind können die Renderer-Plugins diese auf unterschiedliche Art und Weise in die Seite einarbeiten. Wichtig dabei zu beachten ist, dass die Lösung reines HTML ohne jeglich Styles ausgibt, denn diese sind dann doch sehr individuell.

- Renderer-Plugin **List** (``mentions-united-renderer_list.js``)
  Erzeugt eine absteigend sortierte Liste aller Interaktionen

- Renderer-Plugin **Avatars by Type** (``mentions-united-renderer_avatars-by-type.js``)
  Erzeugt eine inline Avatar-Liste aller Interaktionen eines übergebenen Typs, zum Beispiel Likes

- Renderer-Plugin **Total Number** (``mentions-united-renderer_total-number.js``)
  Erzeugt einen Anker mit der Anzahl der Interaktionen

Weitere Informationen zu den Plugins, den Optionen und viele weitere Details dazu sind auf dem [GitHub-Repository](https://github.com/kristofzerbe/Mentions-United) zum Projekt zu finden.

### Verwendung auf dieser Website

So sieht die etwas abgespeckte Umsetzung auf kiko.io aus, die auf dem SSG [Hexo](https://hexo.io/) basiert ...

Hexo verwendet für die Beiträge [Markdown](https://en.wikipedia.org/wiki/Markdown)-Dateien mit Metadaten im [Front Matter](https://hexo.io/docs/front-matter)-Format. Darin ist neben den Klassikern wie ``title`` und ``date`` und weiteren, eine Liste namens ``syndication`` enthalten, in der alle URLs mit Hostnamen aufgelistet sind, auf denen der Beitrag manuell syndiziert wurde, zum Beispiel:

```yaml
---
title: "Batman Comics with pure CSS"
date: 2024-07-11
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/112767128980027149
  - host: DevTo
    url: https://dev.to/kristofzerbe/batman-comics-with-pure-css-5ggk
---
```

Die Umsetzung der Beiträge von Markdown in HTML basiert auf [EJS](https://ejs.co/). Jeder Beitragstyp hat dabei seine eigene Vorlagendatei, aber in allen eingebunden ist eine gesonderte EJS-Datei für die Interaktionen. In dieser werden die Syndizierungsdaten des Beitrags verabeitet und die Mentions United Skripte eingesetzt, um die entsprechenden Interaktionen aus den API-Zielen zu ermitteln und anzuzeigen.

Zunächst wird festgestellt, ob für diesen Beitrag neben dem Standard-Provider-Skript "Webmention", der für alle Beiträge geladen wird, weitere erforderlich sind:

```js
<%
  let syndications = post.syndication?.filter(s => s.url?.length > 0 && s.host?.length > 0);

  let synDevTo = syndications?.find(s => s.host.toLowerCase() === "devto");
  let synPixelfed = syndications?.find(s => s.host.toLowerCase() === "pixelfed");
%>
```

In einem HTML-Block werden die von den Renderer-Plugins zu ersetzenden Platzhalter definiert und die **Mentions United**-Skripte werden an Ort und Stelle geladen, aber einige Provider-Plugins nur, wenn dies aufgrund der Syndizierungsdaten erforderlich ist:

```ejs
<div id="article-interactions" class="article-interactions">
  <h2>Interactions</h2>
  
  <div class="message loading">Loading</div>

  <div id="interactions-likes-placeholder"></div>
  <div id="interactions-reposts-placeholder"></div>
  <div id="interactions-list-placeholder"></div>

  <%- js('js/mentions-united.js') %>

  <%- js('js/mentions-united-provider_webmentions.js') %>
  <% if (synDevTo) { %><%- js('js/mentions-united-provider_devto.js'); %><% } %>
  <% if (synPixelfed) { %><%- js('js/mentions-united-provider_pixelfed.js'); %><% } %>

  <%- js('js/mentions-united-renderer_avatars-by-type.js') %>
  <%- js('js/mentions-united-renderer_list.js') %>
<div>  
```

Im folgenden Skriptblock wird das Hauptskript von **Mentions United** mit den Einstellungen und einer Reihe von Plugins initialisiert, die sofort registriert werden sollen. Anschließend werden die Plugins, die für diesen Artikel zusätzlich erforderlich sind, einzeln registriert. Schließlich wird zuerst die Hauptmethode „load“ und dann „show“ aufgerufen, wodurch die abgerufenen Interaktionen in die Seite eingefügt werden. Am Ende wird die Ladenachricht auf der Seite je nach Ergebnis angepasst oder gelöscht.

```html
<script>
window.addEventListener('load', function () {

  // initialize main script with settings and some plugins needed anyway
  const mentionsUnited = new MentionsUnited({
    ownerName: "<%- config.author %>"
  },
  [
    new MentionsUnitedProvider_Webmentions({
      targetUrl: "<%- post.permalink %>",
      tryResolveTitle: true
    }),  
    new MentionsUnitedRenderer_AvatarsByType({
      placeholderId: "interactions-likes-placeholder",
      typeVerb: "like"
    }),
    new MentionsUnitedRenderer_AvatarsByType({
      placeholderId: "interactions-reposts-placeholder",
      typeVerb: "repost"
    }),
    new MentionsUnitedRenderer_List({
      placeholderId: "interactions-list-placeholder",
      skipTypes: "like,repost"
    })
  ]);

  // register plugins individually, if necessary for this post
  <% if (synDevTo) { %>
  mentionsUnited.register(new MentionsUnitedProvider_DevTo({
    sourceUrl: "<%- synDevTo.url %>"
  }));
  <% } %>

  <% if (synPixelfed) { %>
  mentionsUnited.register(new MentionsUnitedProvider_Pixelfed({
    sourceUrl: "<%- synPixelfed.url %>",
    apiBaseUrl: "<%- config.api-proxy-base-url %>/pixelfed"
  }));
  <% } %>

  // retrieve and insert Interactions and change message afterwards
  mentionsUnited.load()
    .then(() => {
      return mentionsUnited.show();
    })
    .then((count) => {
      let msg = document.querySelector(".article-interactions .message");
      if (count === 0) {
        msg.classList.remove("loading");
        msg.innerHTML = "No interactions yet";
      } else {
        msg.remove();
      }
    });
    
});
</script>
```

Sollte dieser Beitrag bereits eine Interaktion nach sich gezogen haben, ist direkt unter diesem Artikel ein Beispiel zu sehen ...

---

{% cardlink %}
url: https://github.com/kristofzerbe/Mentions-United
title: "GitHub - Mentions-United"
description: "Client-side retrieving and rendering of interactions from the web"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/0fe9e95a6f88c32b45c88b5975b2c30fae6804c682e40d432d1bc3762d7bf293/kristofzerbe/Mentions-United
{% endcardlink %}

<br>