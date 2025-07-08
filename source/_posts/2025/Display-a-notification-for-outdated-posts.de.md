---
hidden: true
isLocale: true
permalink: post/Display-a-notification-for-outdated-posts/de
#--------------------------------------------------
title: Hinweis für veraltete Beiträge anzeigen
subtitle:
date: 2025-07-08 15:05:00
photograph:
  file: 24-12-Suedafrika-3330-D70.jpg
  name: Hartebeest Grass
  socialmedia: /static/images/social-media/Display-a-notification-for-outdated-posts.jpg
series: A New Blog
categories:
  - Coding
tags:
  - Hexo
  - JavaScript
related:
  - jsrepo-Build-your-own-tool-registry
  - Hexo-Determine-and-Use-Online-Status
  - Convert-HTML-into-Plain-Text-in-Hexo
---

Ich bin immer irriert, wenn ich im Web etwas recherchiere und an einem Treffer kein Datum steht, wann der Autor den Beitrag verfasst hat. Bei Blogbeiträgen ist das leider allzu häufig der Fall. Andere  Quellen wie Foren (Stack Exchange und die üblichen Verdächtigen) haben das Problem meist nicht. Dort geht mein Blick immer zuerst auf das Antwortdatum und ich kann mir ausmalen, ob der Beitrag veraltet ist oder nicht. Gerade im IT-technischen Bereich haben Beiträge eine recht kurze Halbwertzeit und es macht einen himmelweiten Unterschied, ob man versucht eine Problem mit einer völlig veralteten Information zu lösen oder mit einer noch recht frischen.

Aus genannten Gründen steht bei allen meinen Beiträgen hier auf kiko.io daher links oben, klein aber fein, das Erstellungsdatum des jeweiligen Posts zur Orientierung. Dem Impetus von [Elio Struyf](https://www.eliostruyf.com/) folgend, der seine Posts nach einem Jahr mit einem Hinweis garniert, mag das manchmal aber nicht plakativ genug sein und so habe ich mich entschlossen ebenfalls solche Hinweistexte zum Alter eines Posts einzuführen, aber ein wenig bedachter.

<!-- more -->

Artikel altern unterschiedlich schnell oder auch gar nicht. Warum sollte ich an meinen Fotobeiträgen davor warnen, das sie schon ein Jahr oder älter sind? Fotos währen ewig. Das gleiche bei Events, die bei mir meist das Datum im Titel tragen. Bei Best-Of-&lt;Jahr&gt;-Beiträgen ergeben Alterungshinweise auch nur bedingt Sinn, denn bei denen ist zwar klar das die Informationen aus einem bestimmten Abschnitt in der Zeit stammen, aber der ein oder andere Link könnte bereits den Weg allen Irdischen gegangen sein. Mein System musste also einigermaßen flexibel sein.

---

## Festlegen des Zeitrahmens

Zu allererst habe ich im Frontmatter meiner Posts ein neues Attribut mit dem Namen ``outdates:`` eingeführt und alle jenen Beiträgen den Wert ``never`` zugewiesen, bei denen ich zu keinem Zeitpunkt einen solchen Hinweis anzeigen möchte. Für jene Posts, die nach einer gewissen Zeit nach der Erstellung den Hinweis bekommen sollen, habe ich ein Kurzformat gewählt, das die drei wichtigsten Perioden abdeckt: ``y`` für Jahre, ``m`` für Monate und ``d`` für Tage, obwohl ich nicht glaube, dass ich Letzteres jemals brauche. Mit einer vorangestellten Zahl ergibt das einen gut auswertbaren Zeitraum ... zum Beispiel ``2y`` bedeutet 2 Jahre oder ``18m`` 18 Monate.

Jeden Post aus den letzten 5 Jahren anzupassen und bei neuen Posts jedesmal daran zu denken ``outdates`` zu befüllen, war mir aber zu aufwendig. Da jeder Artikel bei mir nur eine einzige Kategorie besitzt, obwohl mein SSG-System [Hexo](https://hexo.io) dafür eine Liste anbietet, habe ich in meiner ``config.yml`` einen neuen Abschnitt eingeführt, der für jede notwendige Kategorie einen Standard vorgibt:

```yaml
outdates:
  - default: 1y
    categories:
      - Misc
  - default: 18m
    categories:
      - Collection
  - default: 2y
    categories:
      - Coding
      - Tools
      - UI/UX
```

So hatte ich schon einmal für alle Beiträge, die den Hinweis bekommen sollen, einen entsprechenden Wert (ein Zeitraumskürzel oder ``periodShort``), den ich in der EJS-basierten Vorlage für die Artikel nur noch auswerten musste.

---

## Implementierung

Für den oberen Rand meiner Beiträge habe ich schon länger eine Möglichkeit für erläuternden Text eingebaut, den ich für die Hinweise nutzen konnte. Das wenige HTML und die Berechnung des Zeitpunkts der Anzeige habe ich in ein EJS-Partial gepackt und dies in der Hauptvorlage eingebunden:

```ejs article.ejs
...
<div class="article-inner">
  <%- partial('post/outdates') %>
  ...
</div>
...
```

```ejs outdates.ejs
<%
  let outdateText;
  let periodShort = post.outdates;

  // ...
  // outdateText = ... 
%>
<% if (outdateText) { %>
  <small class="top-exclamation">
    <span><%- outdateText %></span>
  </small>
<% } %>
```

Zunächst habe ich ausgeschlossen, dass der Wert ``never`` zu einem Ausgabetext führt und dann den Standard anhand der Kategorie ermittelt, wenn denn eine für den Artikel festgelegt ist:

```js outdates.ejs
let outdateText;
let periodShort = post.outdates;

if (periodShort !== "never") {

  // get default by category from config
  if (periodShort === undefined && post.categories && post.categories.length) {
    const category = post.categories.data[0].name;
    periodShort = config.outdates.find(od => od.categories.includes(category))?.default;
  }

  // ...
  // outdateText = ... 
}
```

Der nächste Schritt war das Zerlegen und bewerten des ``periodShort``. Ersteres habe ich in einen eigenen [Hexo-Helper](https://hexo.io/api/helper) ausgelagert, daher hier nur der JS-Code, den man auch so in EJS einbinden kann. Er gibt ein ganzes Bündel an Informationen zurück, unter anderem die Anzahl der Tage, die ein ``periodShort`` ausdrückt. Damit wird dann später weitergerechnet.

```js
function convert_periodshort(value) {

  let ret = {
    num: parseInt(value.slice(0, -1)),
    unit: value.slice(-1)
  }

  ret.numString = humanizeNumber(ret.num);

  switch (ret.unit) {
    case "y": 
      ret.unitString = "year" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num * 365; 
      break;
    case "m": 
      ret.unitString = "month" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num * 30; 
      break;
    case "d": 
      ret.unitString = "day" + ((ret.num > 1) ? "s" : "");
      ret.days = ret.num; 
      break;
    default: break;
  }

  return ret;
}
```

In Zeile 8 wird über ``humanizeNumber`` der Zahlenwert in ein Wort übersetzt, zum Beispiel '8' in 'acht'. Auf diesen Code habe ich an dieser Stelle verzichtet, da es im Web unzählige Varianten dazu gibt. Man kann hier aber auch nur ``ret.num`` einsetzen.

Hier die Verwendung der Funktion im EJS-Partial und die Berechnung der Differenz zwischen dem Erstellungsdatum (oder dem Datum des letzten Updates, falls vorhanden) und dem aktuellen Datum in Tagen. Die beiden Tagessummen werden anschließend miteinander verglichen und ist die Differenz größer als die Anzahl der Tage aus dem Periodenwert, wird der Text zu Anzeige festgelegt und die Variablen darin gefüllt. Mittels ``maxYears`` prüfe ich zuvor aber noch, ob der Differenz vielleicht noch mehr Jahre zurückliegt als gefordert, um zu verhindert, das im Text steht "mehr als 2 Jahre", obwohl es bereits 5 sind.

```js outdates.ejs
if (periodShort !== "never") {

  // get default by category from config
  // ...

  if (periodShort) {
    let period = convert_periodshort(periodShort);

    const dateToday = new Date();
    const dateCreated = new Date((post.updated > post.date) ? post.updated : post.date);
    const diffTime = Math.abs(dateToday - dateCreated);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let maxYears = Math.floor(diffDays / 365);
    if ((period.unit === "y" && maxYears > period.num) || (period.unit !== "y" && maxYears >= 1)) {
      period = convert_periodshort(maxYears + "y");
    }

    outdateText =
      `This post is over ${period.numString} ${period.unitString} 
      old. Please be aware that some of this information may no 
      longer be up to date, links may no longer work, or the author 
      may simply has a different opinion or solution today.`;
  }
}
```

---

## Das Ergebnis

... ist ganz ansehnlich und informativ, wie ich finde, und ist von nun an den Artikeln zu sehen, wo er Sinn ergibt.

![](/post/Display-a-notification-for-outdated-posts/outdated-post-note-sample.jpg)

Im Original des Codes ([siehe GitHub](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/layout/_partial/post/outdates.ejs)) habe ich zusätzlich noch die Lokalisierung in die deutsche Sprache eingebaut.
