import Callout from 'nextra-theme-docs/callout'

# Vorbereitungen

<Callout>
  **Dauer:** höchstens 45 Minuten \
  Vorführung / Live Coding: 20 Minuten \
  Übung: 15 Minuten \
  Diskussion: 10 Minuten

  **Themen:**
  - Motivation: Beispiel-App zeigen (_whole game teaching_)
  - Gemeinsam App entwickeln (_live coding_, _learning by doing_)
  - Entwicklungsumgebungen (lokal und in der Cloud)

  **Übung:** VS Code installieren, Projekt erstellen und starten

  **Ziele:** Einstieg ins Thema, Einrichtung der Entwicklungsumgebung
</Callout>

## Beispiel-App

Eine Beispiel-App dient zur Veranschaulichung des konkreten Lernziels. 
Diese App wurde als reines Webfrontend mit HTML, CSS und JavaScript 
ohne Frameworks entwickelt und kann hier ausprobiert werden:
[wds20a-final.glitch.me](https://wds20a-final.glitch.me)

Wir werden diese App gemeinsam während der ersten Termine
entwickeln und somit ein Teil der wesentlichen Konzepte
von HTML, CSS und JavaScript auf praktische Weise erlernen.

## Webentwicklung: Frontend vs. Backend

![Webentwicklung](/images/web-prog/web-development.png)

Wir haben nur 33 Vorlesungsstunden, daher beschränken wir die Themen:

- nur Frontend (HTML/CSS/JavaScript)
- kein Backend (PHP, ASP.NET, …)
- Single Page App (evtl. nur eine HTML-Seite)
- keine Frameworks (reines HTML/CSS/JavaScript)

**33 Vorlesungsstunden sind auch für HTML/CSS/JavaScript sehr knapp…**

Weitere Technologien des Internets und der Webentwicklung 
werden ggf. in anderen Vorlesungen behandelt.

Eine [_Frontend Developer Roadmap_](https://roadmap.sh) zeigt den 
großen Umfang der Front-Webentwicklung ohne Backend.

JavaScript und auch CSS entwickeln sich beständig weiter und haben ein großes Umfeld mit einigen Frameworks und Erweiterungen, siehe z.B.

- [_State of JavaScript_](https://stateofjs.com)
- [_State of CSS_](https://stateofcss.com)

HTML, CSS und JavaScript stellen nur die Grundlagen und den Ausgangspunkt der clientseitigen Web-Entwicklung im Frontend dar (d.h. zur Ausführung im Browser).

## Ablauf

In der gemeinsamen „Vorlesung“ wird hauptsächlich **aktives** Lernen
durch Live Coding stattfinden. Dabei sollten die Studierenden
mitprogrammieren und interaktiv Fragen stellen. **Daher sollten alle 
bitte immer ihren Laptop mitbringen.** Folien wird es kaum geben, 
da diese nur ein **passives** Lernen ermöglichen. 

Aufgrund der knappen Zeit werden nur die wesentliche Aspekte im Unterricht 
besprochen. Durch praktische Übungen und insbesondere das Gruppenprojekt 
werden die Inhalte angewendet und vertieft. 

In Moodle wird Material zum Nachschlagen bereitgestellt. Eigene Recherchen
im Selbststudium sind während der Webentwicklung unumgänglich und 
verstärken das aktive Lernen. 

Dozierende bieten Hilfestellung und Coaching während des Projekts an. 
Wir werden in den späteren Terminen auch Zeit für das gemeinsame
Programmieren haben.

## Entwicklungsumgebung

Für die Webentwicklung eignet sich im Prinzip jeder Texteditor und 
fast jede Entwicklungsumgebung für andere Programmiersprachen, da
diese meistens auch Unterstützung für HTML, CSS und JavaScript bieten.
Außerdem gibt es sehr gut funktionierende Entwicklungsumgebungen in 
der Cloud, für die nur eine Internetverbindung und ein Browser benötigt wird.

<Callout type="warning">
Welche Entwicklungsumgebungen setzen Sie gerne ein (lokal/cloud)?
</Callout>

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

[VS Code](https://code.visualstudio.com) kann in allen Betriebssystemen
installiert werden. Eine nützliche Erweiterung ist der _Live Server_,
mit dem lokale Web-Projekte lokal gestartet und in einem Browser 
ausgeführt werden können.

### Webentwicklung in der Cloud

Es gibt zahlreiche Programmierumgebungen für Webentwickler in
der Cloud. 

```
Vorführung: Beispiel-App in Glitch, Ablauf der Entwicklung und 
des LiveCodings (mitmachen!)
```

Es gibt einige weitere Cloud-Umgebungen, wie z.B. die sehr umfangreiche
Plattform [replit](https://replit.com). Projekte wie 
[Gitpod](https://www.gitpod.io) lassen die Grenze von lokal/cloud 
verschwinden, indem VS Code auch im Browser unterstützt wird.

[Codepen](https://codepen.io) ist sehr nützlich für Beispiele. 
Hier werden im Gegensatz zu Glich die Dateien verborgen
und es gibt nur drei Editoren jeweils für HTML, CSS und JavaScript. 
Dadurch lassen sich einzelne Bestandteile bzw. Komponenten einer
Webanwendung unabhängig vom Rest der App programmieren.


## Übung

- VS Code herunterladen und installieren
- In VS Code die Erweiterung (bzw. _extension_) „_Live Server_“ einrichten
- Datei `index.html` erstellen und in Projektordner speichern (TODO: Vorführung?)
- Beliebigen Text in `index.html` eingeben, speichern und Live Server starten
- glitch.com via [glitch.new/blank](https://www.glitch.new/blank) und [codepen.io](https://codepen.io) ausprobieren.

## Zusammenfassung

- HTML, CSS und JavaScript sind als Frontend-Technologien, die 
vom Browser ausgeführt werden, Bestandteil jeder Webanwendung
- Im Backend kommen beliebige andere Sprachen zum Einsatz
- In dieser Veranstaltung beschränken wir uns aufgrund der wenigen 
Zeit auf HTML, CSS und JavaScript
- Mit reinem HTML, CSS und JavaScript lassen sich bereits nicht-triviale
Anwendungen bauen (siehe Beispiel-App)
- Für das Live Coding und die Arbeit im Team werden Codepen, Glitch, und
VS Code empfohlen.

## Diskussion

Gab es Schwierigkeiten bei der Installation? 

Wenn die Arbeit im Team beginnt, dann sollten die Gruppen sich überlegen, 
ob sie mit git, GitHub/GitLab/etc. und VS Code arbeiten oder das Projekt
ohne git gemeinsam in der Cloud mit Glitch oder Replit entwickeln (ohne git).
Im letzten Fall sollte trotzdem immer wieder eine lokale Kopie der Dateien
erstellt werden und VS Code kann nützlich für die lokale Entwicklung sein.
Im Prinzip wäre auch eine Entwicklung im Team mit Codepen möglich, wenn
es nur eine Datei jeweils für HTML, CSS und JavaScript gibt.

Für die Arbeit in Glitch und Codepen kann eine kostenlose Anmeldung 
sinnvoll sein, damit die Anwendungen nicht verloren gehen.

Kennt jemand weitere empfehlenswerte Editoren, Cloud-Umgebungen, Tools?

**Bemerkung:** NodeJS wird in der Vorlesung und im Projekt nicht benötigt.