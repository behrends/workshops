# Einstieg in HTML

import Callout from 'nextra-theme-docs/callout'

<Callout>
  **Dauer:** 15 Minuten

  Vorführung / Live Coding: 15 Minuten

  Themen:

  - Zweck von HTML, CSS und JavaScript
  - Elemente und Tags in HTML
  - HTML: Aufbau und Struktur

  **Ziel:** Erste Schritte in HTML
</Callout>

## Frontend-Technologien in der Web-Entwicklung

Browser verstehen drei „Sprachen“: HTML, CSS und 
JavaScript (wir ignorieren hier Bilder, WebAssembly, usw.).
Veranschaulichen lässt sich dies im Browser mit 
„_view source_“ für eine Webseite.

_Struktur und Inhalte_ ⟶ `HTML` \
_Aussehen/Gestaltung_ ⟶ `CSS` \
_Verhalten/Logik und Interaktion_ ⟶ `JavaScript`

HTML ist die einfachste dieser Technologien. CSS ist bereits um einiges komplexer.

JavaScript ist eine vollwertige Programmiersprache mit vielen zusätzlichen Aspekten (DOM, Events, JS-Frameworks, Bibliotheken, TypeScript, usw.).

Webseite: statischer Inhalt mit kaum interaktiver Logik (JavaScript) \
**Webanwendung:** dynamischer Inhalt mit viel interaktiver Logik (JavaScript)

```
Kurze Vorführung des Zusammenspiels von HTML, CSS und 
JavaScript in Codepen.io (z.B. h1 mit Farbe, button und alert mit JS)
```

## HTML allgemein

HTML steht für _**H**yper**T**ext**M**arkup**L**anguage_. Mit _Hypertext_ 
wird ausgedrückt, dass Webseiten durch Links miteinander verknüpft 
werden können. _Markup Language_ steht für „Auszeichnungssprache“, mit
der einzelne Elemente als Bestandteile der Webseite definiert werden.

[Mehr auf Prog Content](https://www.progcontent.com/html-kompakt/intro)

## Elemente und Tags

Aufbau eines Elements am Whiteboard/Excalidraw zeigen (Elemente, öffnende/schließende Tags, hierarchische (Baum-)Struktur, Eltern- und Kindelemente,
leere Elemente, Attribute).

[Mehr auf Prog Content](https://www.progcontent.com/html-kompakt/elemente-tags)

<Callout type="warning">
HTML zu lernen bedeutet, sich mit dem „Vokabular“ der 
verfügbaren Elemente vertraut zu machen.
</Callout>

```
In Codepen h1- und img-Elemente zeigen
```

## Aufbau und Struktur

`DOCTYPE`, `html`, `head`, `body`, Kommentare

[Mehr auf Prog Content](https://www.progcontent.com/html-kompakt/aufbau)

```
In Codepen h1- und img-Elemente zeigen und in html, head, body 
mit DOCTYPE überführen, evtl. auch in lokaler Datei und/oder
glitch/replit/
```

```
Zeigen oder erwähnen, dass Browser teilweise Fehler oder Ungenauigkeiten 
in HTML tolerieren und nur kurz auf Validierung hinweisen 
(https://validator.w3.org/)
```


## DevTools im Browser

Jeder Browser hat eingebaute Werkzeuge für Entwickler
(_web developer tools_). Öffnen durch Menü im Browser
oder Tastenbefehl (z.B. `F12`). 

```
Kurze Vorführung der DevTools in Firefox und/oder Chrome
```

```
Ausprobieren:
HTML mit View Source und DevTools lernen, indem Elemente
inspiziert werden.
```

