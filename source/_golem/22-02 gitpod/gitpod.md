---
key: gitpod
title: 
author: Kristof Zerbe
created: 2022-02-14
published: 
url:
---

**TEASER**

...

## Konfiguration des Arbeitsbereichs anhand des Projektes

Neben den generellen Einstellmöglichkeiten, bietet gitpod eine individuelle Konfiguration je Projekt. Dazu wird im Stamm des Projektordners die Datei **.gitpod.yml** gesucht und verwendet. Alle Einstellungsmöglichkeiten sind in den [gitpod Docs](https://www.gitpod.io/docs/references/gitpod-yml) gut dokumentiert.

### Verwendung eines benutzerdefinierten Containers

Der Standard-Container, den gitpod beim Start eines Arbeitsbereiches hochfährt basiert auf Debian/Ubuntu und enthält bereits eine Menge an Frameworks und Sprachen wie Node, Java, Go, Python und einiges mehr. Wer jedoch ein anderes Image verwenden möchte, kann dies über den Eintrag **image** einstellen, entweder indem man ein öffentliches Images referenziert oder den Namen eines Dockerfiles im Projekt angibt. Die Möglichkeiten hierbei sind zahlreich und im Abschnitt [Custom Docker Image](https://www.gitpod.io/docs/config-docker) zu finden.

### Aufgaben beim Start



### Erweiterungen einbinden

Bei der Erstellung des gitpod Arbeitsbereichs lassen sich über die Konfigurationdatei **.gitpod.yml** auch die Visual Studio Code-Erweiterungen einbinden, die man zum Arbeiten braucht. Am einfachsten geht das, wenn die Erweiterung auf der offenen Plattform [Open VSX Registry](https://open-vsx.org) vertreten ist, da gitpod standardmäßig dort nach dem Muster ``${publisher}.${name}`` sucht.

Beispiel:

```
vscode:
  extensions:
    - HookyQR.beautify
    - kamikillerto.vscode-colorize
```

Es lassen sich aber auch VSIX-Dateien aus anderen Quellen über die vollständige Url einbinden. Microsoft bietet mit dem [Visual Studio Marketplace](https://marketplace.visualstudio.com/) zwar die primäre und größte Quelle an Erweiterungen an, verzichtet aber leider auf die Angabe eines kompletten Download-Pfades der VSIX-Datei. Man kann diesen aber anhand des nachfolgenden Musters sehr einfach nachbauen:

``https://${publisher}.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${extension}/${version}/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage``

Die notwendigen Information zu den Variablen *Publisher*, *Extension* und *Version* in diesem Muster erhält man über die Detailseite einer Erweiterung in Visual Studio Code.

![Detail-Seite der Erweiterung in Visual Studio Code](vscode-hexo-utils-details-page.png)

Ausgabe:

```
Name: vscode-hexo-utils
Id: fantasy.vscode-hexo-utils
Description: vscode extension for hexo
Version: 0.2.1
Publisher: fantasy
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=fantasy.vscode-hexo-utils
```

Daraus wird in der **.gitpod.yml** folgender Eintrag:

```
vscode:
  extensions:
    - https://fantasy.gallery.vsassets.io/_apis/public/gallery/publisher/fantasy/extension/vscode-hexo-utils/0.2.1/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage
```