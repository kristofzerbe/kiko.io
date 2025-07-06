---
hidden: true
isLocale: true
permalink: post/Collecting-Links-with-Obsidian-for-Processing/de
#--------------------------------------------------
title: Links mit Obsidian sammeln und verarbeiten
subtitle: Tschüss Trello ... es war schön mit Dir
date: 2025-07-06 12:09:24
photograph:
  file: D50_3210.jpg
  name: Floral Magic LIII
  socialmedia: /static/images/social-media/Collecting-Links-with-Obsidian-for-Processing.jpg
categories:
  - Coding
tags:
  - Obsidian
  - JavaScript
  - Hexo
related:
  - Discoveries-35-Visual-Studio-Code-Plugins
  - Reusable-API-proxy-in-just-a-few-lines-of-JavaScript
  - jsrepo-Build-your-own-tool-registry
---

Bookmarking-Tools sind nicht umsonst wahnsinnig beliebt. Wir sammeln doch alle für uns interessante Quellen im Netz, um später mit den Informationen darin irgendetwas anstellen zu wollen, auch wenn es oft beim 'wollen' bleibt und der Bookmark-Haufen immer größer und unübersichtlicher wird. Ich bilde da keine Ausnahme.

Bereits ein paar Monate nach dem Start dieses Blogs 2019 habe ich mich entschlossen die für mich wichtigsten 10 Links eines Monats in den sogenannten [Discoveries](/series/discoveries/) als Beitrag zu veröffentlichen und eine Serie daraus zu machen. Die allererste Ausgabe habe ich noch manuell mit den in Pocket gespeicherten Links zusammengeschrieben, aber bereits mit der zweiten begonnen diesen Prozess mithilfe eines Trello-Boards und darin enthaltenen Spalten für jede Ausgabe zumindest zum Teil zu automatisieren.

{% cardlink %}
url: https://kiko.io/post/Discoveries-1/
title: "Discoveries #1 - kiko.io"
description: "Due to my daily routine, I'm reading a lot of articles on the web regarding software development. The most interesting stuff ends up on my Pocket lis..."
host: kiko.io
favicon: https://kiko.io/favicon.ico
image: https://kiko.io/images/social-media/Discoveries-1.jpg
{% endcardlink %}

Rund um das Link-Sammeln auf Trello habe ich vor allem für mobile Geräte ein paar Abkürzungen gefunden, über die ich auch [immer](/post/Add-website-to-Trello-card-the-better-way/) [wieder](/post/Add-Link-to-Trello-on-Android-via-Share-Menu/) [geschrieben](/post/Adding-Screenshots-to-Trello-Cards-on-Android/) [habe](/post/Generate-Content-from-Trello/) und irgendwann habe ich einen neuen Bereich im Blog namens [Tiny-Tools](/tools/tiny-tools/) aufgemacht, dessen Datengrundlage ebenfalls eine Trello-Spalte bildete, aber fortlaufend von mir aktualisiert und erweitert wurde.

Obwohl ich für mich die Verwendung von Trello annähernd perfektioniert hatte, hat sich nicht immer richtig angefühlt ein Kanban-Tool für Linksammlungen zu missbrauchen, zudem auch Atlassian nach der Übernahme 2017 immer wieder die Anzeige von Links auf Kacheln zu meinen Ungunsten verändert hat. Für mich hat ein Link, so wie ich ihn für diesen Zweck brauche, einen Dokumentencharakter, mit Attributen, Anhängen und dergleichen, und die Trello-Kacheln spiegelten das nur unzureichend wieder, auch in der Bearbeitung der Daten.

<!-- more -->

---

## Hey Obsidian...

Letztes Jahr habe ich all mein erinnerungswürdiges Zeug (Dokumentationen, Notizen, Tasks, Links, usw.) von diversen Plattformen auf eine zentralisiert: [Obsidian](/post/My-Switch-to-Obsidian/) und mir war von Anfang an klar, das ich meine Automatismen für die Discoveries und die Tiny Tools auch irgendwann dahin umstellen würde, weil das Tool mit seiner Markdown-basierten Dokumentenstruktur deutlich näher an dem dran ist was ich brauche und auch wohin ich die Links verarbeiten will.

### Sammeln der Links

Jeden Link, den ich aufheben möchte teile ich zunächst mit der Obsidian App ... hier mal am Beispiel eines meiner eigenen:

![Screenshots 1 ... 2 ... 3](post/Collecting-Links-with-Obsidian-for-Processing/collecting-links-1.png)

Alles was über das Sharing in die Obsidian App hereinkommt speichere ich zunächst als "Today's daily note" (Screenshot 1) in meiner Inbox und das dafür zuständige Core Plugin ist so konfiguriert das automatisch das Standard-Note-Template angewandt und der Titel mit dem aktuellen Datum vorbelegt wird (Screenshot 2).

```md Note Template.md
---
created: {{DATE:YYYY-MM-DD HH:mm}}
tags:
---
```

Anschließend konvertieren ich den Link in einen [CardLink](https://github.com/nekoshita/obsidian-auto-card-link) und vergebe einen vernünftiger Titel und passende Tags (Screenshot 3).

Um aus dem Link in der Inbox sofort oder später eine Discovery zu machen, über die ich bloggen möchte, füge ich das Template 'kiko.io Discovery' ein (Screenshot 4), das über paar weitere Attribute verfügt:

```md kiko.io Discovery.md
---
created: {{DATE:YYYY-MM-DD HH:mm}}
tags: 
title: {{title}}
slug: 
author:
---
```

![Screenshots 4 ... 5 ... 6](post/Collecting-Links-with-Obsidian-for-Processing/collecting-links-2.png)

Danach verschiebe ich die Note in einen Ordner, in dem alle Discoveries für die Veröffentlichung als Blog-Post zunächst gesammelt werden (Screenshot 5), und schreibe für den Link einen kurzen Text, in dem der Content vorgestellt und das Ganze wenn nötig mit einem Bild garniert wird (Screenshot 6). Ich habe mir Obsidian so eingestellt, dass über die Zwischenablage eingefügten Bilder aller meiner Notes automatisch in einen relativen Ordner namens ``_attachments`` gespeichert werden. Dort muss ich ihnen dann nur einen vernünftigen Namen geben (wofür der Slug bestens geeignet ist) und das Link-Dokument ist fertig für die Weiterverarbeitung.

Der Prozess für die Tiny Tools ist übrigens derselbe, auch wenn hier ein anderes Template zum Einsatz kommt, der Anlageordner ein anderer ist und die Dinger nach der Synchronisation in mein Blog-Projekt automatisch beim Build des Blogs auf eine einzelne Seite verarbeitet werden.

### Auswahl für einen neuen Post

Für eine neue Ausgabe der Discoveries clustere ich bereits im Vorfeld Links mit einem ähnlichen Thema in einem Unterordner und füge eine Übersichtsnotiz ein, die den gleichen Namen wie der Ordner und der spätere Post trägt, beginnend mit der nächsten Nummer und den Thema, z.B. ``35 - Visual Studio Code Plugins``. Diese Übersichtsdatei hat auch wieder ein eigenes Obsidian Template:

```md kiko.io DISCOVERIES.md
---
published: 
hero:
---
![](HERO-URL)

---

INTRO

---

%% Begin Waypoint %%

%% End Waypoint %%
```

In das ``hero``-Property kommt der Dateiname (ohne Endung) eines meiner [Pool-Photos](/photos), das ich für den neuen Post verwenden möchte, und in den Image-Link des Contents zur Vorab-Visualisierung dessen komplette URL. ``INTRO`` ersetze ich dann mit einem für den Post passenden Einleitungstext. Der [Waypoint-Block](https://github.com/IdreesInc/Waypoint) enthält automatisch die Namen der Link-Dokumente in diesem Ordner, daher muss ich vor der Veröffentlichung lediglich die umschließende ``Waypoint``-Anweisung entfernen und die Links nach meinen Wünschen umsortieren.

Hier der fertige Markdown-Code der Übersichtsseite der letzten Discovery-Ausgabe [Discoveries #35 - Visual Studio Code Plugins](/post/Discoveries-35-Visual-Studio-Code-Plugins/) und der des ersten Link-Dokuments in der Liste:

<details><summary>35 - Visual Studio Code Plugins.md</summary>
```md
---
published: 
hero: 24-12-Suedafrika-0733-D50
---
![](https://kiko.io/reserve/24-12-Suedafrika-0733-D50/normal.jpg)

---

I've been using Visual Studio Code pretty much since it came out, initially to get away from its big, bulky "brother" Visual Studio in terms of web development. So I'm very happy about how the tool has evolved, especially the plugin scene, which has taken my primary work tool to new heights of productivity. I'd like to introduce a few of the "smaller" but no less helpful plugins in this edition of this month's Discoveries...

---

- [[MinifyAll]]
- [[Json Editor]]
- [[Regex Previewer]]
- [[File Browser]]
- [[File Utils]]
- [[Compare Folders.md]]
- [[Encode Decode]]
- [[Font Preview]]
- [[Paste Image]]
- [[Path Intellisense]]
```
</details>

<details><summary>MinifyAll.md</summary>
```md
---
created: 2025-06-16 14:13
tags:
  - VSCode
  - Plugin
title: MinifyAll
slug: minifyall
author: Jose Gracia Berenguer
---
I deal with many JSON files and often use the command "Format Document" when the document is minified, which makes it easier to edit the content. Afterwards it was always a little bit tricky to minify the JSON again, because there is no built-in command for that. This plugin helps a lot ...

'''cardlink
url: https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall
title: "MinifyAll - Visual Studio Marketplace"
description: "Extension for Visual Studio Code - Minifier for JSON, CSS, HTML, XML, TWIG, LESS, SASS, SCSS, JavaScript, JSONC, and JavaScriptReact(testing). Compressor of files and folders. You will love its simplicity!"
image: https://josee9988.gallerycdn.vsassets.io/extensions/josee9988/minifyall/2.10.0/1634826159461/Microsoft.VisualStudio.Services.Icons.Default
'''
```
</details>

### Erzeugen des Posts

Um zu jeder Zeit über die Konsole in meinem Blog-Projekt einen neuen Discoveries-Post zu erzeugen, wird der gesamte Discoveries-Ordner von Obsidian in ein entsprechendes Datenverzeichnis synchronisiert. Das gilt auch für das Archiv, in das der Unterordner eines generierten Posts nach der Erstellung automatisch verschoben wird.

Die Konvertierung ist ein einmaliger Vorgang, denn die Obsidian-Struktur muss nur einmal in die passende Post-Struktur meines Blogs übersetzt werden, um beim Build von meinem SSG Hexo in einen statischen Beitrag verwandelt werden zu können. Dafür habe ich mir ein Node-Script namens **DiscoveriesConverter** in Form einer Klasse geschrieben, das beim Aufruf über einen Runner als einzigen Parameter den Namen des zu verarbeitenden Unterordners entgegennimmt.

```js _run_discoveries-converter.cjs
const folderName = process.argv[2].toString();
const dc = new DiscoveriesConverter(folderName);
dc.convert();
```

![Process Chain](post/Collecting-Links-with-Obsidian-for-Processing/process-chain-complete.png)

Der DiscoveriesConverter ist recht umfangreich geworden, weil ich viele Spezialitäten meines Blogs berücksichtigt habe, um den Prozess vollständig zu automatisieren, daher hier nur die Beschreibung der einzelnen Schritte. Den [kompletten Code gibts auf GitHub](https://github.com/kristofzerbe/kiko.io/blob/master/lib/discoveries-converter.cjs).

#### constructor()

1. Hexo config.yaml lesen
2. Datenordner festlegen
3. Fotoordner festlegen
4. Vorlagendatei für Handlebars festlegen
5. Ausgabeordner festlegen
6. Neues Beitragsobjekt initialisieren
7. Haupteigenschaften des neuen Beitrags festlegen

#### convert()

1. Discovery-Datei und Frontmatter lesen
2. Foto für den Beitrag festlegen
3. Intro als Markdown abrufen
4. Elemente aus dem Inhalt über „getItem()“ abrufen
   1. Link-Datei und Frontmatter lesen
   2. Neues Link-Objekt initialisieren
   3. CardLink-Daten aus dem Inhalt abrufen
   4. Anhangsbilder aus dem Inhalt über ``getAttachment()`` abrufen
5. Erstelle einen Post-Ordner
6. Erstelle einen Post aus der Handlebars-Vorlage
7. Speichere den neuen Post
8. Kopiere die Anhänge des Elements in den Post-Ordner und verschiebe sie in den Discovery-Ordner
9. Verschiebe das Foto in PHOTOS

Eine Besonderheit des Codes ist sicherlich, das alle Datei-Handling-Aktionen zunächst in einer Objektstruktur (``file.io.[name].[in|out].[copy|move])`` gesammelt werden und erst ganz am Ende (Punkt 8 und 9) tatsächlich auf das Dateisystem losgelassen werden. Das erleichtert das Debuggen erheblich, da bereits kopierte oder verschobene Dateien vor dem nächsten Versuch nicht erst wieder in den Ursprungszustand zurückversetzt werden müssen.

Ein paar Spezialitäten, wie das Herausfiltern der Daten eines CardLinks oder die der Bilderanhänge aus dem Content via RegEx, sind in einer [Tools-Datei](https://github.com/kristofzerbe/kiko.io/blob/master/lib/tools.cjs) ausgelagert, da ich die Funktionalität auch an anderer Stelle im Blog-Projekt benötige.

Zu guter Letzt muss ich nur noch einmal über den vom DiscoveryConverter erzeugten Post drüberschauen und ihn dann zu GitHub übertragen, damit er mit dem Blog gebaut und somit veröffentlicht wird.

---

## Fazit

Mit dieser Lösung habe ich mich von einem weiteren großen Daten-Dienst getrennt und auf simple Dateien unter meiner vollen Kontrolle heruntergebrochen. Das System ist zudem zu jederzeit nach meinen eigenen Wünschen anpassbar, weil die ganze Logik dahinter flexibel und offen ist ... und ich bin  sogar in jedem Schritt vom Sammeln bis zum Post ein stückweit schneller, sofern keine Fehler auftreten ;)

Ich kann nur empfehlen sich eingehender mit den Möglichkeiten von Obsidian zu beschäftigen. Es basiert am Ende, wie diese Website und so vieles in der IT, auf purem Text, mit dem Entwickler umzugehen wissen.
