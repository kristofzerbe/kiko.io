---
hidden: true
isLocale: true
permalink: post/The-Long-Farewell-to-Stylus/de
#--------------------------------------------------
title: Der lange Abschied von Stylus
subtitle: Umstellung von Stylus auf CSS in Hexo, Teil 1
date: 2025-11-30 18:36:32
photograph:
  file: 25-07-Schweden-809-D50.jpg
  name: Vaxholm Wood
  socialmedia: /static/images/social-media/The-Long-Farewell-to-Stylus.jpg
series: A New Blog
categories:
  - Coding
tags:
  - Hexo
  - Stylus
  - CSS
related:
  - Colophon-Impetus-Technology
  - Hexo-Generator-Anything-2-0
  - Simplest-Console-File-Logger
bandcamp:
  artist: Quintana
  album: The Traveler|2477741210
  track: The Traveler|275147839
---

Seit ich mich 2019 entschieden habe den Static Site Generator (SSG) [Hexo](https://hexo.io/) als Grundlage für mein Blog zu verwenden, hadere ich mit dem Umstand das es im Standard mit dem CSS-Präprozessor [Stylus](https://stylus-lang.com/) über ein mit installiertes Plugin arbeitet. Ich dachte ich brauche nur etwas Zeit, um mich an die vereinfachte aber für mich ungewohnte Notation zu gewöhnen und nehme die Annehmlichkeiten wie Funktionen, Mixins, Variablen und dergleichen mit. Mit der Zeit wuchs aber der Funktionsumfang von nativem CSS derart, das ich anfing in meinen Stylus-Code Workarounds für neue und nicht unterstützte Features einzubauen, was ihn deutlich komplexer und unübersichtlicher machte. Ich gewöhnte mich nicht, sondern bin seit geraumer Zeit eigentlich nur noch genervt von Stylus.

<!-- more -->

Die Entscheidung mich von Stylus zu trennen und auf natives CSS umzustellen, habe ich immer wieder aufgeschoben, denn es bedeutet nach 5 Jahren Herumgebastel eine Menge Kleinarbeit, aber ich habe einfach irgendwann angefangen und bin dabei in kleinen Schritten vorgegangen. Ziel war erstmal den Stylus-Code 1:1 in natives CSS umzusetzen und dabei Fehler, die sich in den letzten Jahren angesammelt haben, zu bereinigen, um dann die Möglichkeit zu haben die Struktur mit modernem CSS erneuern zu können.

Ich habe eine Sekunde überlegt, ob ich nicht einfach die ``style.css``, die das Hexo-Plugin [hexo-renderer-stylus](https://github.com/hexojs/hexo-renderer-stylus) aus den dutzenden separaten ``styl``-Dateien beim Build erzeugt, als Basis für den Umbau nehmen sollte, aber es ergab keinen Sinn von oben anzufangen und die über 7.000 Zeilen danach in einzelne Häppchen zu zerlegen und neuzustrukturieren. Man renoviert ja auch nicht in dem man erstmal einen Eimer Farbe im Zimmer explodieren lässt, sondern sucht sich eine erste Ecke aus und macht es Stück für Stück.

---

## 1. Variablen

Die Datei ``_variables.styl`` enthält was sie verspricht: Variablen. Und die sollten als erstes verschwinden, denn native CSS Variablen (oder Custom Properties) wurden bereits [2022 vom W3C eingeführt](https://www.w3.org/TR/css-variables-1/) und bieten eine große Flexibilität, die Workarounds von Präprozessoren überflüssig macht.

Ein Beispiel aus meinem Code vorher:

```styl _variables.styl
color-link = #000
color-hover-link = #555

dark-color-link = #fff
dark-color-hover-link = #bbb
```

Mit diesen 4 Variablen wurde die Farbe eines Links eingestellt, je nachdem welches **Theme** der User auf der Site gewählt hat ('light' ist Standard), was sich im ``data-theme``-Attribut des ``html``-Elements niederschlägt, das dann als Selector in den Styles verwendet wird:

```styl page.styl
a
  color: color-link
  /[data-theme="dark"] &
    color: dark-color-link
  &:hover
    color: color-hover-link
    /[data-theme="dark"] &
      color: dark-color-hover-link
```

Stylus hat bislang beim Build daraus folgenden Code erzeugt:

```css
a {
  color: #000;
}

[data-theme="dark"] a {
  color: #fff;
}

a:hover {
  color: #555;
}

[data-theme="dark"] a:hover {
  color: #bbb;
}
```

Ich habe nun alle Stylus-Variablen Stück für Stück in einer neuen CSS-Datei als native Variablen umgesetzt und sie in allen ``styl``-Dateien durch ihr neues Equivalent ``var(--variable-name)`` ersetzt. Das Beispiel von oben sieht nun so aus:

```css main.css
:root {
  --color-link: #000;
  --color-hover-link: #555;
}
:root[data-theme="dark"] { 
  --color-link: #fff;
  --color-hover-link: #bbb;
}
```

```styl page.styl
a
  color: var(--color-link)
  &:hover
    color: var(--color-hover-link)
```

... und im Ergebnis ist das erzeugte CSS um zwei Anweisungen kürzer.

In diesem Schritt habe ich die Gelegenheit genutzt die über die Jahre unsinnig angewachsene Menge an Variablen auszudünnen und Styles zu vereinheitlichen. Zudem konnte ich alle ``/[data-theme="dark"] &``-Regeln entfernen, da die Festlegung einer Farbe anhand des angelegten Themes nun bereits bei der Definition der nativen CSS-Variable geschieht.

Die einzigen Stylus-Variablen, die nach dieser Behandlung übrig geblieben waren, sind ein paar Stylus-spezifische (siehe Punkt 2) und meine eigenen Media-Queries (wie ``mq-mobile = "screen and (max-width: 479px)"``), die ich leider **nicht** als CSS-Variablen umsetzen konnte, weil CSS Regeln nicht mit HTML-Elementen verbunden sind, sondern einen globalen Scope haben, wie Ben Holmes in seinem Beitrag [Want CSS variables in media query declarations? Try this!](https://bholmes.dev/blog/alternative-to-css-variable-media-queries/) erläutert. Aber dazu zu einem späteren Zeitpunkt mehr ...

---

## 2. Grid, Mixins und nib

Das Standard Hexo-Theme 'Landscape' besitzt ein viergliedriges Layout: ``header`` und ``footer``, sowie ``main`` und ``aside`` (Sidebar), die zum Content (``div#content.outer``) zusammengefasst sind. Während die ersten beiden sich immer über die gesamte Seitenbreite erstrecken, teilen sich die anderen beiden den horizontalen Platz über ein fluides "Grid"-System mit beim Build errechneten Prozentangaben. Das System ist im Standard vielseitig einstellbar, je nachdem ob und wo man die Sidebar hinhaben möchte, aber ich habe mich für mein Layout entschieden und brauche somit den ganzen Einstellungskram nicht.

![Hexo Fluid Layout](/post/The-Long-Farewell-to-Stylus/hexo-fluid-layout.png)

Natürlich würde man ein solches Layout in 2025 anders implementieren, aber das war nicht die Aufgabe in diesem Schritt. Ich musste nur zusehen alle Variablen und Funktionen loszuwerden, die in mehreren Dateien definiert oder verwendet wurden. Ausgangspunkt war die ``_variables.styl`` und die dortige Variable ``sidebar`` die ihren Wert aus der ``_config.yml`` des Hexo-Themes zog. Diesem roten Faden folgend habe ich unzählige Werte, Funktionen und Referenzen gelöscht, wie man am [GitHub-Commit #1a24503 (Removed Stylus Gridsystem)](https://github.com/kristofzerbe/kiko.io/commit/1a24503343b323a531b7e1f852883609424c7af4) nachvollziehen kann. Das Ganze habe ich einfach durch fixe Werte ersetzt, notwendige Dateien zusammengelegt und konnte dann die ``_grid.styl`` und alle nicht benötigen ``sidebar-*.styl`` löschen. Übrig geblieben ist folgendes:

```styl style.styl
.outer
  max-width: 1220px

main
  @media mq-normal
    display: inline
    float: left
    width: 73%
    margin: 0 1%
    
#sidebar
  @media mq-normal
    display: inline
    float: left
    width: 23%
    margin: 0 1%
```

---

Die Datei ``_mixin.styl`` loszuwerden war recht einfach, da sie im Grunde nur ein paar Funktionen enthält, die an eingesetzter Stelle CSS-Code ablegt.

Blieben nur noch folgende zwei Variablen übrig:

```styl
support-for-ie = false
vendor-prefixes = webkit moz ms official
```

Nach etwas Herumprobieren, habe ich herausbekommen, das diese zu den [nib CSS3 extensions for Stylus](https://stylus.github.io/nib/) gehören, einer Library die das Stylus-Renderer-Plugin direkt mitinstalliert. Es besitzt ein paar für Stylus-User nützliche Funktionen, wie ``global-reset()`` und ``clear-fix()`` von den Hexo Gebrauch macht. Es ist aber auch zuständig für die Ergänzung des Ausgabe-CSS um vendor-spezifische Deklarationen à la ``-moz-box-shadow`` und dergleichen, die 2025 völlig aus der Zeit gefallen sind. Nach der Übernahme der Deklarationen der o.g. Funktionen und dem Löschen der Anweisung ``@import "nib"``, konnten auch diese beiden Variablen weg.

---

## 3. CSS-Dateistruktur & Bundling

Nachdem ich in Schritt 1 und 2 bereits einiges von Stylus in die neue ``main.css`` migriert hatte, war es an der Zeit die Deklarationen in unterschiedliche Dateien zu strukturieren. Die Variablen in ``defaults.css``, alle Resets in ``reset.css`` und, da es einen Quickwin darstellte, alle Font-Styles in ``fonts.css``. Alle diese Dateien mussten nun bei Build wieder zur ``main.css`` vereint und verkleinert werden.

Eine Super-Duper-Bundling-Bibliothek brauchte ich dafür nicht, denn zum einen sollte man sparsam mit Abhängigkeiten sein und zum anderen bot mir Hexo mit dem mir gut bekannten [Generatoren](https://hexo.io/api/generator)-Konzept alles was ich brauchte, um ein paar Dateien in der richtigen Reihenfolge aneinanderzuhängen. Zudem setze ich das Plugin [hexo-browsersync](https://github.com/hexojs/hexo-browsersync) für das Live-Reloading beim Coden ein und das sorgt nach dem Speichern einer Datei dafür, das alle Generatoren einmal laufen.

Mein CSS-Bundle-Generator ist im Prinzip dem Plugin [hexo-css-merge](https://github.com/MoNwastaken/hexo-css-merge) sehr ähnlich, von dem ich die Idee zum Einsatz von [clean-css](https://github.com/clean-css/clean-css) für die Komprimierung habe, verzichtet aber weitgehend auf Einstellbarkeit und ist etwas kürzer:

```yml _config-yaml
css_bundle:
  target: main
  files_in_order:
    - defaults
    - fonts
    - reset
```

```js generator-css-bundle.js
const fs = require('hexo-fs');
const path = require('path');
const cleanCSS = require('clean-css');

hexo.extend.generator.register('css-bundle', function () {
  const config = this.config;
  const bundle = config.css_bundle;

  let result = [];
  
  let files = bundle.files_in_order.map(file => {
    return path.join("themes", config.theme, config.source_dir, "css", `${file}.css`);
  });

  let styles = "";
  files.forEach(file => {
    styles += fs.readFileSync(file);
  });

  result.push({
    path: `/css/${bundle.target}.css`,
    data: styles
  });

  let clean = new cleanCSS().minify(styles);

  result.push({
    path: `/css/${bundle.target}.min.css`,
    data: clean.styles
  });

  return result;
});
```

---

## Fazit nach den ersten Schritten

Es macht Spaß Dinge rauszuwerfen, die man ohnehin nie gebraucht hat. Hexo's Theming-Möglichkeiten per se sind auch heute noch  beeindruckend, aber Leute wie ich fangen schnell an Herumzubasteln, sodass ein einfacher Theme-Wechsel schon noch einigen Wochen nicht mehr möglich, aber auch gar nicht mehr erwünscht ist. Es macht den Wechsel vom eingebauten Präprozessor Stylus zu nativen CSS aber komplexer und langwieriger.

Ich habe noch einiges an Arbeit vor mir, bis ich endlich auf Basis von reinem CSS anfangen kann das Layout technisch zu modernisieren. Vor Allem die Scroll-Header-Lösung auf JavaScript-Basis geht mit schon lange auf die Nerven, aber ich habe bereits einen Prototypen auf CSS-Basis gebaut, für den ich allerdings die HTML-Struktur umstellen muss und das geht kaum mit Stylus und den ganzen Hacks am Bein.

In der Zwischenzeit besteht mein Blog aus zwei Stylesheets: die neue ``main.min.css`` und die alte ``style.css`` von Stylus, aber so nach und nach wird die eine größer und die andere kleiner.

Es geht weiter mit dem Umbau. Stay tuned ...
