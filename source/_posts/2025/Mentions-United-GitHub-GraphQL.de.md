---
hidden: true
isLocale: true
permalink: post/Mentions-United-GitHub-GraphQL/de
#--------------------------------------------------
title: Mentions United, GitHub & GraphQL
subtitle:
date: 2025-11-09 12:10:14
outdates: never
photograph:
  file: D50_4445.jpg
  name: Garden Beauties IV
  socialmedia: /static/images/social-media/Mentions-United-GitHub-GraphQL.jpg
project: mentions-united
categories:
  - Coding
tags:
  - GitHub
bandcamp:
  artist: Howling Giant
  album: Crucible & Ruin|578609549
  track: Beholder I, Downfall|508254087
related:
  - Mentions-United-3-2-1-go
  - Mentions-United-Native-Mastodon-Provider
  - Using-GitHub-as-Commenting-Platform-2025-Edition
---

Vor einigen Monaten habe ich in meinem Post [Using GitHub as Commenting Platform, 2025 Edition](/post/Using-GitHub-as-Commenting-Platform-2025-Edition) dargelegt, wie man recht einfach GitHub Issues als Kommentarplattform nutzen kann:

1. Für jeden Post ein GitHub Issue anlegen, das mindestens die Post-URL enthält
2. Auf der Post-Seite einen Syndizierungslink zum Issue hinzufügen
3. Brid.gy und Webmention.io ihren Job machen lassen
4. Mentions United in die Seite einbinden, um die Kommentare über das [Provider-Plugin Webmentions](https://github.com/kristofzerbe/Mentions-United?tab=readme-ov-file#provider-webmentions) anzuzeigen

So habe ich es mir zu Angebohnheit gemacht jeden neuen Post in einem GitHub-Issue zu syndizieren. Damit erspare ich mir ein eigenes Spam-sicheres Kommentarsystem, was auf [SSG](https://en.wikipedia.org/wiki/Static_site_generator)-Sites eh schwierig bis gar nicht umzusetzen ist. 

Man mag nun einwenden, das die Datenkette **Site** &rarr; **GitHub** &rarr; **brid.gy** &rarr; **webmention.io** &rarr; **Site** recht lang ist und einigen Raum für Fehler bietet, aber dazu kann ich nur sagen: Ja, richtig, denn genau das ist momentan der Fall!

Ein Blog wie dieser, mit zwei drei Beiträgen im Monat (sofern es die Zeit erlaubt) wird nun nicht überschüttet mit Kommentaren und so ging etwas Zeit ins Land bis ich gemerkt habe, dass brid.gy momentan zwar meinen GitHub-Account noch abfragt, aber leider zu keinem Ergebnis mehr kommt und somit auch keine Webmentions für GitHub-Issue Kommentare mehr weiterreicht. Die Kette ist gerissen!
Sicherlich werde ich den Schöpfer [Ryan Barrett](https://snarfed.org/about) mal darüber informieren, aber das hilft mir aktuell nicht weiter und so habe ich mich entschlossen ein [natives GitHub Provider Plugin für Mentions United](https://github.com/kristofzerbe/Mentions-United?#provider-github) zu bauen.

<!-- more -->

---

## Das GitHub Provider Plugin

![Architecture GitHub Provider-Plugin](Mentions-United-GitHub-GraphQL/Provider-github.png)

Der Weg dahin war jetzt nicht wirklich komplex, denn meine Code-Vorlage für neue Mention United Provider enthält schon das Grundgerüst, was ich nur füllen musste. Auch hatte ich es hier etwas einfacher, denn im Gegensatz zum meinem nativen [Provider Plugin für Mastodon](/post/Mentions-United-Native-Mastodon-Provider/) brauchte ich hier keine Instanzen zu evaluieren, sondern konnte mich direkt an [https://api.github.com](https://api.github.com) wenden.

Die ersten Abrufe des für meine Zwecke zuständigen API-Endpunkts ``https://api.github.com/repos/{{OWNER}}/{{REPO}}/issues/{{ISSUENO}}/comments`` ergab eine Menge Daten, wovon ich aber 80% nicht brauchte, aber auch einiges fehlte. So löst GitHub den Autor eines Kommentars über REST lediglich in einem ``login`` Objekt auf, das den Namen des Benutzers aber nicht enthält. Dafür hätte ich dann einen weiteren API-Endpunkt bemühen müssen. Viel eleganter, zeitsparender und resourcenschonender erschien mir daher der Weg über [GitHubs GraphQL API](https://docs.github.com/en/graphql). Die beste Gelegenheit mich endlich mal in das Thema [GraphQL](https://en.wikipedia.org/wiki/GraphQL) einzuarbeiten.

Im Gegensatz zu einem klassischen GET-Request auf eine REST-Url mit verschiedenen URL-Parametern gibt es bei GraphQL nur eine URL auf die man mittels POST im Request-Body eine speziell für diesen Abruf definierte Query mitschickt. Hier mein erster Versuch, die sich wie folgt liest:

Abfrage des Repositories XXX des Besitzers YYY über alle Issues mit der Nummer ZZZ und Ausgabe der Felder ``url`` und ``title`` und den ersten 100 Kommentaren in einer Nodes-Liste mit den Feldern ``id``, ``login``, ``body``, ``url`` und ``createdAt``:

```http
POST https://api.github.com/graphql
Authorization: Bearer {{TOKEN}}
Accept: application/vnd.github+json
X-REQUEST-TYPE: GraphQL

query {
  repository(owner: "YYY", name: "XXX") {
    issue(number: ZZZ) {
      url
      title
      comments(first: 100) {
        nodes {
          id
          author {
            login
          }
          body
          url
          createdAt
        }
      }
    }
  }
}
```

Der Trick weitere Autoreninformationen auszugeben ist, zunächst den Typen des Feld ``author`` mittels ``__typename`` aufzunehmen, denn das Interface kann entweder ein ``User``, ein ``Bot`` oder eine ``Organization`` sein, und es dann explizit als User zu definieren, um weitere Felder genau dieses Typs auszugeben:

```http
  author {
    __typename
    ... on User {
      login      
      name
      avatarUrl
      websiteUrl
    }
  }
```

Der Abruf einer solchen GraphQL-Abfrage ist recht simpel, wenn man das Konstrukt einmal verstanden hat. Hier ein Auszug aus dem fertigen Plugin, welches [frei auf GitHub verfügbar](https://github.com/kristofzerbe/Mentions-United/blob/main/mentions-united-provider_github.js) ist:

```js
issueCommentQuery() { return { 
  query: `{
    repository(owner: "${this.owner}", name: "${this.repo}") {
      issue(number: ${this.issueNo}) {
        url
        title
        comments(first: 100) {
          nodes { 
            ... more fields 
          }
        }
      }
    }
  }`}; 
}

let fetchOptions = {
  method: 'POST',
  headers: {
    'X-REQUEST-TYPE': 'GraphQL',
    'Accept': 'application/vnd.github+json'
  },
  body: JSON.stringify(this.issueCommentQuery())
};

const apiResponse = await fetch(this.graphApiUrl(), fetchOptions);
const apiData = await apiResponse.json();
```

---

## Fazit

Wieder ein natives Mentions United Plugin und sogar eines, welches ich in naher Zukunft noch erweitern werde, denn über diese Mechanik kann man auch alle Issues und Kommentare von GitHub ziehen, in der die eigene Post-URL Erwähnung gefunden hat.

Hier ein Beispiel, wie das Ergebnis aussieht:

{% cardlink %}
url: https://kiko.io/post/How-To-Visual-Studio-Database-Project-and-ADSI/#interactions
title: "How-To: Visual Studio Database Project and ADSI - kiko.io"
description: "If you are working with a Visual Studio Database Project and have to deal with data from the Active Directory via a Linked Server, you have to announc..."
host: kiko.io
favicon: https://kiko.io/favicon.ico
image: https://kiko.io/images/social-media/How-To-Visual-Studio-Database-Project-and-ADSI.jpg
{% endcardlink %}