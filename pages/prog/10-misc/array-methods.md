import Callout from 'nextra-theme-docs/callout'

# Array-Methoden

<Callout>  
  **Dauer:** 20 Minuten

  - Arrays bieten viele Methoden
  - Beispiele: `splice`, `slice`, `find`, `filter`, `map` 

  **Ziel:** Möglichkeiten mit Arrays ausschöpfen
</Callout>

Arrays bieten in JavaScript 
[zahlreichhe Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
für unterschiedliche Situationen. In einer 
[früheren Lektion](/prog/06-arrays/arrays#ausblick)
wurden bereits die Methoden `push` zum Hinzufügen 
eines Elements in ein Array und `forEach` zum 
Durchlaufen eines Arrays erwähnt. 

Hier werden weitere praktische Beispiel-Methoden
gezeigt.

## Elemente entfernen mit `splice`

[`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
ist eine mächtige Methode, um den Inhalt eines
Arrays zu verändern. Ein Beispiel, das zeigt,
wie ein bestimmtes Element entfernt wird:

```js
const colors = ["orange", "blue", "red", "green"];
// entferne ein Element ab Index zwei (red)
colors.splice(2,1);
console.log(colors); 
// --> ["orange", "blue", "green"];
```

Hier bezeichnet das erste Argument (`2`) den 
Start-Index und das zweite Argument (`1`) die
Anzahl der ab dem Start-Index zu entfernenden 
Elemente.

`splice` bietet noch viel mehr Möglichkeiten, wie
[hier in MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) nachzulesen.

<Callout type="error">
Bei `splice` ist zu beachten, dass das Array
verändert wird. Im Gegensatz dazu liefert
`slice` (!) eine Kopie des Arrays.
</Callout>

## Teile eines Arrays mit `slice` kopieren

Mit `slice` lassen sich Teile eines Arrays
kopieren. Hierbei wird das Array selbst **nicht**
verändert. Zum Beispiel können wir alle Elemente
ab einem bestimmten Index bis zum Ende des
Arrays als neues Array kopieren:

```js
const colors = ["orange", "blue", "red", "green"];
// kopiere alle Elemente ab dem zweiten Index ("red")
const colors2 = colors.slice(2);

// colors2 ist ein neues Array:
console.log(colors2); 
// --> ["red", "green"];

// colors wurde nicht verändert!
console.log(colors); 
// --> ["orange", "blue", "red", "green"];
```

Auch `slice` ist eine flexible Methode, siehe
dazu [die Beschreibung in MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

<Callout type="error">
`slice` liefert eine Kopie des Arrays. Im 
Gegensatz verändert `splice` (!) direkt das Array.
</Callout>

## find

## filter

## map

<Callout type="warning">
**Vertiefendes Material**

- [Array-Methoden bei javascript.info](https://javascript.info/array-methods)
- [Referenz aller Array-Methoden bei MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
</Callout>