import Callout from 'nextra-theme-docs/callout'

# Exports/Imports mit `require`

<Callout>
  **Dauer:** 20 Minuten
  
  **Ziel:** Code aufteilen
</Callout>

**Vorbemerkung**

Wir benötigen `require` aktuell (Februar 2022) 
noch in replit.com, weil dort in der NodeJS-Umgebung 
leider standardmäßig eine veraltete Version von 
NodeJS zum Einsatz kommt (Version 12). Diese 
unterstützt nur den Ansatz mit `require`. In
aktuellen Versionen von NodeJS kann mit 
den neueren `import-` und `export-`Anweisungen
gearbeitet werden, die etwas intuitiver sind. 

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

Wenn eine Funktion, Klasse, Variable oder 
Konstante in einer bestimmten Datei deklariert 
wird, dann muss diese dort exportiert werden.

Dazu steht in NodeJS und somit auch repl.it das Modulsystem CommonJS bereit (eine Datei ist oft ein Modul).

Mit einer Art „globalem Objekt“ namens exports können Funktionen usw. in dem System exportiert werden: 
