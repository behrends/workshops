import Callout from 'nextra-theme-docs/callout'

# Funktionen (Teil 1)

<Callout>
  **Dauer:** 30 Minuten

  - Aufbau und Verwendung von Funktionen
  - Deklaration, Parameter, Rückgabewerte
  - Aufruf und Verwendung von Rückgabewerten

  **Ziel:** Funktionen geben Programmen Struktur
</Callout>

<Callout type="warning">
Wir betrachten Funktionen hier zunächst als Möglichkeit,
Anweisungen zusammenzufassen und somit Struktur im
Programm zu erhalten.

Funktionen sind ein mächtiges Werkzeug und wir werden
später noch weitere Aspekte kennenlernen.
</Callout>

Mit Funktionen lassen sich Teile des ausführbaren 
Programmcodes zu „Unterprogrammen“ zusammenfassen.

Beispiele: Einlesen von Daten (Benutzereingaben durch die 
Tastatur), Formatierung einer Ausgabe auf dem Bildschirm, 
komplexe Berechnungen, usw.

Folgendes kann mit Funktionen erreicht werden:

- Strukturierung bzw. Modularisierung des Programms
- Reduzierung des Programmieraufwands (z.B. Wiederverwendbarkeit)
- Leichtere Wartbarkeit von Programmen

**Bisherige Verwendung bzw. Aufrufe von Funktionen**

Im folgenden Beispiel sind zwei Funktionsaufrufe zu sehen:

```js
let input = prompt("Bitte Namen eingeben");
console.log(input);
```

Die Funktion `prompt` wird mit einem Text-**Parameter/-Argument**
aufgerufen und wir weisen das Ergebnis bzw. den **Rückgabewert**
der Funktion einer Variablen `input` zu.

Im **Aufruf** von `console.log` **übergeben** wir `input` als 
*Parameter/Argument* an die Funktion.


## Grundstruktur von Funktionen

Eine Funktion kann keine bis beliebig viele Parameter 
(Argumente) haben. Eine Funktion hat **immer** einen 
Rückgabewert (Ergebnis) &mdash; auch ohne `return`.

![Grundstruktur von Funktionen](/images/prog/funktionen.png)

Die Parameter werden durch unterschiedliche Namen in den runden Klammern angegeben (`param1, param2, usw`). Rückgabewerte werden 
durch `return` meistens als letzte Zeile am Ende des 
Funktionsrumpf angegeben.

Endet die Ausführung einer Funktion ohne `return`-Anweisung, dann 
wird `undefined` als Ergebnis der Funktion zurückgeliefert.

Parameter und Rückgabewerte werden in JavaScript nicht mit 
Datentypen angegeben — dies kann nahtlos durch die Erweiterung 
mit TypeScript erfolgen. 

## Deklaration einer Funktion

Betrachten wir folgendes Beispiel:

```js
function testFunction(firstParam, secondParam) {
  let x = 0;

  // Anweisungen und Berechnungen im Funktionsrumpf	
  x = 123 + firstParam + secondParam;
	
  // Rückgabewert - meist am Ende der Methode
  return x;
}
```

Somit besteht die Deklaration einer Funktion aus

- Dem Schlüsselwort `function` gefolgt von einem Namen (oben `testFunction`)
- den beliebig vielen Parametern der Funktion, die unterschiedliche Namen haben und mit Komma voneinander getrennt werden (oben `firstParam` und `secondParam`).
- dem Funktionsrumpf zwischen `{ … }`
- optional: einer `return`-Anweisung, die das Ergebnis der Funktion zurückliefert (wenn erforderlich bzw. gewünscht)

Der **Funktionsrumpf** steht zwischen `{ … }` und enthält Anweisungen.

Lokale Variablen können im Rumpf der Methode deklariert werden, sodass dies ihr Gültigkeitsbereich ist.


### Aufruf einer Funktion

Der Aufruf der Funktion aus obigem Beispiel erfolgt mit 
passenden Parametern: 

```js
testFunction(15, 26);
```

**Achtung:** es dürfen auch mehr oder weniger Parameter 
angegeben werden (also aufpassen!).

Beim Aufruf sollte (!) die vorgesehende Paramateranzahl mit passenden Datentypen angegeben werden.

Das Ergebnis der Funktion kann z.B. einer Variablen zugewiesen werden: 

```js
const result = testFunction(15, 26);
```

Danach steht das Ergebnis bzw. der Rückgabewert des 
Funktionsaufrufs in der Konstanten `result` zur weiteren
Verwendung bereit.


## Ablauf des Funktionsaufrufs im Detail

Zur Veranschaulichung des Ablaufs eines Funktionsaufrufs 
soll die folgende grobe Darstellung dienen:

- Initialisiere die Parameter der Funktion mit den Werten der aktuellen Parameter wie sie beim Aufruf angegeben sind.
- Führe den Rumpf der Funktion aus.
- Falls vorhanden, gib den Rückgabewert (Ergebniswert) zurück.
- Vernichte alle lokalen Variablen und Parameter-Variablen der Funktion.

Was bedeutet dies für die Parameter?

- Die Funktion arbeitet mit Kopien der aktuellen Parameter.
- Wenn also Variablen als Parameter im Aufruf einer Funktion verwendet werden, dann ändern sich diese Variablen nicht durch die Anweisungen in der Funktion.
- Dies wird „_call-by-value_“ genannt, weil nur die Werte und nicht Referenzen an Funktionen übergeben werden.


**Bemerkung zu Parametern**

Funktionen erhalten Parameter als Kopien der Werte 
(_call-by-value_), d.h. Zuweisungen an Parameter habe keine 
Auswirkung außerhalb der Funktion.

**Änderungen an Eigenschaften von Objekt-Parametern wirken 
sich aber aus!**

<Callout type="warning">
Es folgt ein Beispiel, dass evtl. erst später nachvollziehbar 
wird nachdem wir Objekte in JavaScript besprochen haben.
</Callout>

```js
function changeStuff(a, b, c) {	
  a = a * 10;
  b.item = "changed";
  c = {item: "changed"};
}
	
let num=10, obj1={item: "unchanged"}, obj2={item: "unchanged"};
	
changeStuff(num, obj1, obj2);
console.log(num);  // 10  (also unverändert)
console.log(obj1.item); // "changed"
console.log(obj2.item); // "unchanged"
```

Quelle dazu bei [stackoverflow](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language
)

