---
key: mouse-without-borders
title: Maus ohne Grenzen
author: Kristof Zerbe
created: 2022-08-13
published: 
url:
---

**Mehrere Monitore an einem Rechner sind für die effektive IT-Arbeit elementar. Für die Bedienung von mehreren Rechnern mit einem Eingabeset hingegen bedarf es Hilfsmittel, zum Beispiel eines aus der Microsoft Garage**

Der Trend geht zum Zweit- oder Drittgerät, gerade bei IT-Arbeitern. Neben dem stationären Rechner, der vielleicht noch unter dem Tisch steht, gibt es ein Laptop und wohlmöglich noch ein Tablet. Alle prinzipiell verbunden mit Cloud-Services. Ist er Schreibtisch groß genug, tummeln sich dort eventuell zwei Monitore und eine vollewertige Tastatur, die an den Desktop angeschlossen sind, links das Laptop auf dem zwei drei Spezialprogramme installiert sind und auf der rechten Seite das aufgestellte Surface-Tablet für die Kommunikation mit seiner angeklemmten Schmalspurtastatur. Und verteilt auf dem Tisch drei Mäuse in unterschiedlichen Farben, um nicht ständig die falsche zu erwischen. Ein Szenario mit dem sich auch der Autor dieser Zeilen konfrontiert sah ... ja, bis ihm vor ein paar Jahren ein kleines Tool für Microsoft Windows vor die Füße fiel, das das Eingabechaos schlagartig beendete: Mouse Without Borders.

Microsoft ermutigt, wie viele IT-Konzerne, seine Mitarbeiter zu Side-Projects, die dann entweder irgendwann den Weg in eines der Hauptprodukte finden oder unter der Flagge Microsoft Garage (https://www.microsoft.com/en-us/garage/) veröffentlicht werden. So auch das Werk von Truong Do, einem Microsoft-Mitarbeiter aus Washington, der sich im Daily-Business mit Microsoft Dynamics beschäftigt. Er hatte wohl auch die Nase voll von den zahlreichen Eingabegeräten und entwickelte vor über 10 Jahren bereits ein Tool mit dem sich der Mauszeiger eines Windows-Geräts über die eigene Monitorgrenze hinweg zu einem weiteren Gerät verschieben lässt, wobei eine der Tastaturen dann auf dem Gerät aktiviert wird, auf dem sich der Mauszeiger gerade befindet.

Die Inbetriebnahme ist simpel:

1. Tool via http://aka.ms/mm herunterladen
2. Sicherstellen, dass alle Geräte im geichen Netzwerk verfügbar sind
3. Auf allen Geräten das Installationsprogramm laufen lassen
4. Von einem Gerät ausgehend, mittels des vom Programm generierten Sicherheitscodes die jeweils anderen Geräte verknüpfen
5. Die Geräte anhand der Standortes auf dem Schreibtisch im Programm via Drag & Drop anordnen
6. Done

(mouse-without-borders-setup.png)
(mouse-without-borders-options.png)

Bis zu vier Geräte können so quasi zu einem "zusammenwachsen", wobei es irrelevant ist, wieviele Geräte tatsächlich an sind. Bei der Verknüpfung werden die Maschinennamen erkannt, können aber beliebig abgeändert werden.

## Weitere Features

Neben dem Hauptzweck, Maus und Tastatur über mehrere Geräte zu teilen, kann man auch eine gemeinsame Zwischenablage einstellen (Share Clipboard) und es ermöglichen Dateien via Drag & Drop von einem Rechner auf den anderen zu kopieren (Transfer File). Dabei wird auf dem Zielrechner ein spezieller Ordner auf dem Desktop erstellt, in dem diese Dateien via Zwischenablage landen. Nützlich ist auch, dass der Nutzer nicht zum Langstreckenschubser wird, wenn der Zeiger mal auf dem ganz rechten Gerät steht und er zum ganz linken muss, denn wo es rechts aufhört, gehts es ganz links weiter.

Für Tastaturliebhaber hat Truong Do für jedes verknüpfte Gerät Tastenkürzel verfügbar gemacht, wobei man zwischen F-Tasten oder Zahlen wählen kann. Mittels Ctrl-Alt-L können zudem alle Maschinen auf einmal gesperrt werden. Hakt die Verbindung einmal, hilft ein beherztes Ctrl-Alt-R, um sie alle wieder in die Spur zu bekommen.

Als Extra-Goodie hat Truong Do noch eine Schmalspur-Screenshot-Erfassung eingebaut, die man aber getrost abschalten kann, denn Sie kommt gegen Tools wie Brian Scotts Cropper (https://github.com/brhinescot/Cropper) oder Greenshot (https://github.com/greenshot/greenshot) nicht an, sondert behindert eher, weil sie gängige Tastenkürzel belegt.

## Fazit

Ja, mehrere große Monitore und Remote-Lösungen der klassischen Art, wie RDP oder TeamViewer helfen mehrere Machinen gleichzeitig zu bedienen, aber hat man den Gerätezoo physisch zusammenstehen, fühlt sich die Arbeit mit Mouse Without Borders an, als hätte man vier oder mehr Monitore, mit dem Vorteil, dass die einzelnen Rechner nichts von ihrer Performance abgeben müssen. Das Schöne ist auch, dass es vollkommen egal ist, welche Windows-Version auf den Geräten zum Einsatz kommt. Von Windows 7 aufwärts wird alles unterstützt.
