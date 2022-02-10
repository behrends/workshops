import Callout from 'nextra-theme-docs/callout'

# `break` und `continue` in Schleifen

<Callout>
  **Dauer:** 15 Minuten

- `break` bricht Schleifen sofort ab
- `continue` überspringt den Rest des Schleifenblocks

**Ziel:** Spezielle Kontrolle über den Schleifenablauf
</Callout>

Manchmal sollen bestimmte Berechnungsschritte in 
Schleifen übersprungen werden oder die Schleife 
soll vorzeitig beendet werden.

Das Überspringen geschieht mit `continue` und das 
Beenden der Schleife kann mit `break` erzwungen werden.

`break` und `continue` können in allen 
Schleifenarten verwendet werden. 

## break 

Mit dem Schlüsselwort `break` brechen Schleifen 
ihre Wiederholungen sofort ab und setzen die
Ausführung des Programms nach Schleifenende fort.

```js
// Zähle nur bis 10
let i = 1;
while (true) { // Bedingung ist immer wahr
  console.log(i);
  if(i == 10) {	
    break; // Schleife bricht ab ---> weiter ab Schleifenende 
  }	
  i++;	
} // Schleifenende

console.log("Fertig");
```

![break in Schleifen](/images/prog/break.png)

```js
for(let j = 0; true; j++) {
  console.log(j);
  if(j == 10) {
    break; // Schleife bricht ab ---> springe auf Zeile 19	
  }	
} // Schleifenende
```

## `continue`

Mit dem Schlüsselwort `continue` springt 
die Ausführung der Schleife wieder an ihren Anfang.
Der Rest des Schleifenblocks wird in dieser 
Wiederholung nicht ausgeführt.

```js
for(let j = 0; j <= 10; j++) {
  if(j % 2 == 1) {
    continue; // nächster Durchlauf ---^ Springe hoch zum Anfang der Schleife
  }
  console.log(j); // nur gerade Zahlen werden ausgegeben	
}
```

![continue in Schleifen](/images/prog/continue.png)

```js
// Gebe nur gerade Zahlen zwischen 1 und 10 aus
let i = 0;
while (i <= 10) {
  i++;
  if(i % 2 == 1) {
    continue; // nächster Durchlauf ---^ Springe hoch zum Anfang der Schleife 
  }	
  console.log(i); // nur gerade Zahlen werden ausgegeben	
}
```

**Bemerkung:** Die obigen Beispiele hätten auch bloß 
mit `if/else if/else` umgesetzt werden können. Die
Verwendung von `break` und `continue` kann jedoch
in manchen Fällen besser lesbaren Programmcode 
ergeben.