import Callout from 'nextra-theme-docs/callout'

# Übungen

<Callout>
  **Dauer:** 90 Minuten \
  davon 20 Minuten Besprechung/Diskussion

**Ziel:** Übungen für bisherige Konzepte
</Callout>

Mit den folgenden Aufgaben wollen wir die bisherigen
Konzepte wie Variablen/Konstanten, Ein- und Ausgabe,
Operatoren, Funktionen, `if/else if/else` und `switch` 
anwenden und somit vertiefen.

Die folgenden Aufgaben bauen aufeinander auf und sind
bewusst so formuliert, dass nacheinander verschiedene
Konzepte hinzukommen.

## 2.1 Ein- und Ausgabe mit Konstanten und Template-Strings

Schreiben Sie ein Programm, das für drei Schulfächer die
jeweilige Bezeichnung des Fachs und die erreichten Punkte 
in insgesamt 6 Konstanten einliest. Berechnen Sie die durchschnittliche Punktzahl für Fächer. Geben Sie danach
die Namen der Fächer und die durchschnittliche Punktzahl
mit Hilfe von Template-Strings aus. Schreiben Sie hierfür 
noch keine eigenen Funktionen.

Beispielhafter Programmablauf:

```
Bezeichnung: Deutsch
Erreichte Punkte: 85

Bezeichnung: Mathe
Erreichte Punkte: 99

Bezeichnung: Sachkunde
Erreichte Punkte: 67

Prüfungen wurden in Deutsch, Mathe und Sachkunde abgelegt.
Durchschnittliche Punktzahl: 84
```

## 2.2  Funktionen mit Parameter ohne Rückgabewert

Ändern Sie das Programm folgendermaßen.

Schreiben Sie zwei Funktionen mit passenden Parametern
für die beiden Ausgaben am Ende (siehe Beispiel):

```
Prüfungen wurden in Deutsch, Mathe und Sachkunde abgelegt.
Durchschnittliche Punktzahl: 84
```

Nennen Sie die Funktionen z.B. `printExams` und `printAverage`
mit Parametern und ersetzen Sie im Programm 
die bisherigen Ausgaben mit den passenden Funktionsaufrufen, 
die die Konstanten aus der vorigen Aufgaben verwenden:

```
// Argumente bzw. Namen der Konstanten ggf. anpassen
printExams(subject1, subject2, subject3);
printAverage(average);
```

Die Ausgabe des Programms sollte sich nicht ändern.

## 2.3 Funktion mit Rückgabewert

Schreiben Sie nun in Ihrem Programm eine Funktion, die
drei Parameter mit Punkten hat, die durchschnittliche 
Punktzahl berechnet und den Durchschnitt der Punkte als 
Rückgabewert hat. Ersetzen Sie die bisherige Berechnung des Durchschnitts mit einem passenden Funktionsaufruf. 
Wenn diese Funktion z.B. `getAverage` heißt, dann könnte Sie 
so aufgerufen werden:

```js
// Argumente bzw. Namen der Konstanten ggf. anpassen
const average = getAverage(grade1, grade2, grade3);
```

Die Ausgabe des Programms sollte sich nicht ändern.