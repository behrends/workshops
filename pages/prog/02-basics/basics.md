import Callout from 'nextra-theme-docs/callout'

# Grundbegriffe

<Callout>
  **Dauer:** 25 Minuten

  - Anweisungen
  - Syntax und Semantik
  - Fehler in Programmen
  - Kommentare

  **Ziel:** Allgemeine Konzepte für das Programmieren
</Callout>

## Anweisungen

Anweisungen sind die eigentlichen „Befehle“ in einer Programmiersprache. Sie entsprechen meistens einer Zeile Code 
und müssen mit einem Zeilenumbruch oder einem Semikolon enden.

Beispiel mit einer Bildschirmausgabe des Texts `Hello, World!` 
gefolgt von der Berechnung einer Summe mit Variablenzuweisung 
und abschließender Ausgabe der Variablen: 

```js
console.log("Hello, World!");
let sum = 100 + 23;
console.log(sum); 
```

Es ist meistens nicht schlimm, wenn am Ende einer Zeile mal ein 
Semikolon fehlt. Dieses Beispiel funktioniert auch solange eine 
Anweisung pro Zeile angegeben wird:

```js
console.log("Hello, World")
let sum = 100 + 23
console.log(sum)
```

Meistens wird eine Anweisung pro Zeile angegeben &mdash; 
zusätzlich werden die Beispiele in der Vorlesung auch ein 
Semikolon am Ende der Zeile haben.

Später sehen wir auch, wie mehrere Anweisungen bzw. Code-Zeilen zu
einem Block mit `{ ... }` zusammengefasst werden (Funktionen, 
`if/for/while`, usw.).

## Syntax und Semantik

**Syntax:**
- Aufbau der (Programmier)Sprache
- Regeln zur Konstruktion von zulässigen Sätzen.

Syntaktisch korrekt: „Die Sonne scheint immer.“
Syntaktisch inkorrekt: „Scheint Sonne die immer.“

**Semantik:** \
Bedeutung der einzelnen Sätze und Ausdrücke einer Sprache. So 
haben die Sätze „_Das Gras ist grün._“ und  „_Das Grün grast._“
eine unterschiedliche Bedeutung. In der Anwendung von 
Programmiersprachen kann sich Semantik auf das Ergebnis eines
Programms beziehen, d.h. ob das gewünschte Ergebnis erreicht wird.

**Beispiel inkorrekter JavaScript-Syntax**

```js
1000 + 10 4;
456 { 33;
let num ber = 3 + 5;
console.log"Klammer fehlt")
```

Was sind die Fehler in diesem Programm? (Jede Zeile enthält 
syntaktische Fehler bzw. _syntax errors_ ). Diese zu erkennen
und zu beheben ist oft Teil der Programmierung.

Durch das Verständnis und die Anwendung aufeinander aufbauenden 
Konzepte lernen wir die Syntax einer Sprach schrittweise kennen. 

**Beispiel eines Programms mit problematischer Semantik**

```js
console.log(1000 / 0);
console.log(1000 / "zero");
console.lok("es sollte log heißen");
console.log("dies ist ok");
```

Was ist hier das Problem?

Dieser Code kann in JavaScript ausgeführt werden, bricht aber mit 
einem Fehler bei der dritten Anweisung ab (Laufzeitfehler
bzw. _runtime error_). 

Bei der ersten Anweisung erscheint `Infinity` und bei der 
zweiten `NaN` (_not a number_) auf dem Bildschirm. Bei der 
dritten Anweisung tritt ein sogenannter Laufzeitfehler auf 
(hier ein `TypeError`). 

## Anweisungen in JavaScript

Die Anweisungen werden im Programmablauf nacheinander ausgeführt/
Sollte es eine Anweisung im Programm geben, die fehlerhaft ist, 
dann bricht das Programm die Ausführung ab und stoppt.

Dies liegt daran, dass JavaScript eine interpretierte Sprache ist 
(wie u.a. PHP und Python) — im Gegensatz dazu sind u.a. Java, C, 
C++, und C# kompilierte Sprachen.

„Fehlerhaft“ kann hier u.a. bedeuten, dass ein Syntaxfehler im Code 
vorliegt oder zur Laufzeit (also während der Ausführung) ein Fehler
auftritt (siehe `TypeError` auf vorheriger Folie).

Werkzeuge wie ESLint und Spracherweiterungen wie TypeScript helfen,
mögliche Fehler (Syntax, TypeErrors, usw.) bereits beim
Programmieren im Code zu entdecken. 

<Callout type="warning">
Ein wichtiger und leider sehr häufiger Aspekt des 
Programmierens ist, sich mit Fehlern gelassen 
auseinanderzusetzen, diese zu untersuchen und zu beheben.
</Callout>


## Kommentare

Kommentare helfen uns oder anderen, den Code zu verstehen.
Kommentare können im Prinzip beliebigen Text enthalten — 
hier wird die Syntax nicht überprüft.

Es gibt zwei Arten, in JavaScript Kommentare anzugeben. Auf
einer Zeile mit `//` am Anfang wird alles danach bis zum 
Zeilenende ignoriert und nicht als Programm bzw. Anweisung 
aufgefasst:

```js
// Dies ein Kommentar auf einer Zeile (nur diese Zeile!)
```

Mit `/*` wird ein möglicherweise mehrzeiliger Kommentar 
eingeleitet, der sich über mehrere Zeilen bis zum abschließenden
`*/` ausstrecken kann:

```js
/* Links steht der Begrenzer am Anfang
  So können längere Texte in Kommentaren erstellt werden.
  Hier zwischen wird alles ignoriert.
  Dieser Kommentar läuft also über mehrere Zeilen bis
  zum Begrenzer am Ende rechts hiervon */
```