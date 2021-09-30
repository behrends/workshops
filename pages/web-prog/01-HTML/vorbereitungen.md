# Vorbereitungen

import Callout from 'nextra-theme-docs/callout'

<Callout>
  **Dauer:** höchstens 45 Minuten

  Vorführung / Live Coding: 20 Minuten \
  Übung: 15 Minuten \
  Diskussion: 10 Minuten

  Themen:

  - Motivation: Beispiel-App zeigen (_whole game teaching_)
  - Gemeinsam App entwickeln (_live coding_, _learning by doing_)
  - Entwicklungsumgebungen (lokal und in der Cloud)

  Übung: VS Code installieren, Projekt erstellen und starten

  **Ziel:** Einrichtung der Entwicklungsumgebung
</Callout>

## Beispiel-App

TODO: App bauen!

Eine Beispiel-App (TODO Wetter?) dient zur Veranschaulichung des 
konkreten Lernziels. Diese App wurde als reines Webfrontend mit 
HTML, CSS und JavaScript ohne Frameworks entwickelt und kann
hier ausprobiert werden (TODO: Link auf Deployment und Code).

Wir werden diese App gemeinsam während der ersten Termine
entwickeln und somit ein Teil der wesentlichen Konzepte
von HTML, CSS und JavaScript auf praktische Weise erlernen.

## Webentwicklung: Frontend vs. Backend

![Webentwicklung](/images/web-prog/web-development.png)

Wir haben nur 33 Vorlesungsstunden, daher beschränken wir die Themen:

- nur Frontend (HTML/CSS/JavaScript)
- kein Backend (PHP, ASP.NET, …)
- Single Page App (keine Navigation)
- keine Frameworks (reines HTML/CSS/JavaScript)

**33 Vorlesungsstunden sind auch für HTML/CSS/JavaScript sehr knapp…**

Weitere Technologien des Internets und der Webentwicklung 
werden ggf. in anderen Vorlesungen behandelt.

Eine [_Frontend Developer Roadmap_](https://roadmap.sh) zeigt den 
Umfang der Front-Webentwicklung ohne Backend

JavaScript und auch CSS entwickeln sich beständig weiter und haben ein großes Umfeld mit einigen Frameworks und Erweiterungen, siehe z.B.

- [_State of JavaScript_](https://stateofjs.com)
- [_State of CSS_](https://stateofcss.com)


HTML, CSS und JavaScript stellen nur die Grundlagen und den Ausgangspunkt der clientseitigen Web-Entwicklung im Frontend dar (d.h. zur Ausführung im Browser).

## Ablauf

In der gemeinsamen „Vorlesung“ wird hauptsächlich **aktives** Lernen
durch Live Coding stattfinden. Dabei sollten die Studierenden
mitprogrammieren und interaktiv Fragen stellen. **Daher bitte immer den 
Laptop mitbringen.** Folien wird es kaum geben, da diese nur ein 
**passives** Lernen ermöglichen. 

Aufgrund der knappen Zeit werden nur die wesentliche Aspekte im Unterricht 
besprochen. Durch praktische Übungen und insbesondere das Gruppenprojekt 
werden die Inhalte angewendet und vertieft. 

In Moodle wird Material zum Nachschlagen bereitgestellt. Eigene Recherchen
im Selbststudium sind während der Webentwicklung unumgänglich und 
verstärken das aktive Lernen. 

Der Dozent bietet Hilfestellung und Coaching während des Projekts an. Wir werden in den späteren Terminen auch Zeit für das gemeinsame Programmieren 
haben.

## Entwicklungsumgebung

Für die Webentwicklung eignet sich im Prinzip jeder Texteditor und 
fast jede Entwicklungsumgebung für andere Programmiersprachen, da
diese meistens auch Unterstützung für HTML, CSS und JavaScript bieten.
Außerdem gibt es sehr gut funktionierende Entwicklungsumgebungen in 
der Cloud, für die nur eine Internetverbindung und ein Browser benötigt wird.

### Lokal auf dem eigenen Rechner (z.B. VS Code)

Lediglich ein Texteditor wird benötigt. Empfohlen wird der flexible und
kostenlose Editor Visual Studio Code von Microsoft (VS Code), der von
vielen Webentwicklern eingesetzt wird. Es können aber auch andere Editoren
verwendet werden. VS Code wird empfohlen, da mit diesem das Live Coding
vorgeführt wird. 

```
Vorführung: VS Code mit Live Server und der Beispiel-App, 
Ablauf der Entwicklung und des LiveCodings (mitmachen!)
```

### Webentwicklung in der Cloud

Es gibt zahlreiche Programmierumgebungen für Webentwickler in
der Cloud. 

```
Vorführung: Beispiel-App in Glitch und/oder Replit (TODO), 
Ablauf der Entwicklung und des LiveCodings (mitmachen!)
```

[Codepen](https://codepen.io) ist sehr nützlich für Beispiele. 
Hier werden im Gegensatz zu Glich und Replit die Dateien verborgen
und es gibt nur drei Editoren jeweils für HTML, CSS und JavaScript.


## Übung

- VS Code herunterladen und installieren
- In VS Code die Erweiterung (bzw. _extension_) „_Live Server_“ einrichten
- Datei `index.html` erstellen und in Projektordner speichern (TODO: Vorführung?)
- Beliebigen Text in `index.html` eingeben, speichern und Live Server starten
- glitch.com (https://www.glitch.new/blank) oder replit.com ausprobieren (nur mit Anmeldung)

## Zusammenfassung???

## Diskussion

Gab es Schwierigkeiten bei der Installation? 

Wenn die Arbeit im Team beginnt, dann sollten die Gruppen sich überlegen, 
ob sie mit git, GitHub/GitLab/etc. und VS Code arbeiten oder das Projekt
ohne git gemeinsam in der Cloud mit Glitch oder Replit entwickeln (ohne git).
Im letzten Fall sollte trotzdem immer wieder eine lokale Kopie der Dateien
erstellt werden und VS Code kann nützlich für die lokale Entwicklung sein.
Im Prinzip wäre auch eine Entwicklung im Team mit Codepen möglich, wenn
es nur eine Datei jeweils für HTML, CSS und JavaScript gibt.

Kennt jemand weitere empfehlenswerte Editoren, Cloud-Umgebungen, etc.?

NodeJS wird in der Vorlesung und im Projekt nicht benötigt.