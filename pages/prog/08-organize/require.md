import Callout from 'nextra-theme-docs/callout'

# `exports` und `require` (CommonJS in NodeJS)

<Callout>
  **Dauer:** 30 Minuten
  
  **Ziel:** Code aufteilen in NodeJS mit CommonJS
</Callout>

**Vorbemerkung**

Wir benötigen `require` aktuell (Februar 2022) 
noch in replit.com, weil dort in der NodeJS-Umgebung 
leider standardmäßig eine veraltete Version von 
NodeJS zum Einsatz kommt (Version 12). Diese 
unterstützt nur den Ansatz mit `require` im
Modulsystem „CommonJS“. In aktuellen Versionen 
von NodeJS kann mit den neueren `import-` und 
`export-`Anweisungen gearbeitet werden, die etwas 
intuitiver sind. 

TODO: diese Seite kann entfernt werden, sobald
replit.com NodeJS 14 oder neuer verwendet

---

Damit Code übersichtlicher und wiederverwendbar 
ist, können z.B. Funktionen oder Klassen in 
eigenen Dateien definiert werden.

JavaScript gibt keine bestimmte Struktur vor, bietet 
aber flexible Mechanismen für den Export und Import 
von Funktionen oder Klassen an.

Nehmen wir an, wir benötigen an mehreren Stellen 
im Code eine bestimmte Hilfsfunktion zur Berechnung 
einer Summe aus zwei Zahlen: 

```js
function sum(a,b) {
  return a+b;
}
```

## Exportieren von Funktionen usw. mit `exports`

Wenn eine Funktion, Klasse, Variable oder 
Konstante in einer bestimmten Datei deklariert 
wird, dann muss diese dort exportiert werden, um
sie in anderen Dateien zu verwenden.

Dazu steht in NodeJS und somit auch in replit.com 
das Modulsystem CommonJS bereit (eine Datei ist 
oft ein Modul).

Mit einer Art „globalem Objekt“ namens `exports`
können Funktionen usw. in dem System exportiert werden: 

```js
function sum(a,b) {
  return a+b;
}

exports.sum = sum;
```

Hierbei kann `exports` wie ein Objekt aufgefasst 
werden, das mit zu exportierenden Funktionen usw. „befüllt“ wird.

Das Beispiel oben zeigt, dass nur eine Funktion 
exportiert wird. Weitere Exports sind natürlich 
durch die gleiche Art möglich, z.B. für eine
Klasse namens „`MyClass`“:

```js
exports.MyClass = MyClass;
```

 In replit.com könnte z.B. eine Datei 
 `computations.js` in einem Verzeichnis/Ordner 
 `util` erstellt werden (`util` steht hier 
 für `utilities` also „Hilfsfunktionen“):

![Export in replit.com](/images/prog/repl_export.png)

## Importieren von Funktionen usw. mit `require`

Um Funktionen o.ä. aus anderen Dateien (bzw. Modulen)
zu importieren, kann im Modulsystem CommonJS mit
`require` gearbeitet werden.

Meistens stehen die gewünschten `require`-Anweisungen
für das Importieren am Anfang einer Datei: 

```js
let { sum } = require('./util/computations');

console.log(sum(1,2));
```

Bei `require` wird in runden Klammern und 
Anführungszeichen (also als String) der Pfad zu 
der Datei angegeben.

Oben wird vom aktuellen Verzeichnis `./` über das 
Unterverzeichnis `util/` die Datei `computations` 
referenziert.

 **WICHTIG:** Die Dateiendung `.js` wird bei 
 einer `require`-Anweisung weggelassen! 

Die Zuweisung `let { sum } =` sorgt dafür, dass 
die importierte Funktion mit der Bezeichnung `sum`
auch in dieser Datei zur Verfügung steht.

In dem `console.log`-Aufruf wird daher durch 
`sum(1,2)` die importierte Funktion `sum` verwendet.

Gibt es mehrere zu importierende Dinge, die in einer 
anderen exportiert wurden, dann können diese so 
„aufgezählt“ werden: 

```js
let { myFunction, theClass, aConst } = require('./util/stuff');
```
