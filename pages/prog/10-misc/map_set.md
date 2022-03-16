import Callout from 'nextra-theme-docs/callout'

# Map und Set

<Callout>  
  **Dauer:** 20 Minuten

  - Map als Alternative zu Objekten
  - Set anstatt Array verhindert doppelte Werte

  **Ziel:** Datenstrukturen Map und Set als Ergänzung
</Callout>

Hier werden zwei weitere Datenstrukturen in 
JavaScript vorgestellt: `Map` und `Set`.

`Map` stellt im Prinzip eine „Erweiterung“ von 
JavaScript-Objekten mit nützlichen Hilfsmethoden
dar. `Set` kann als 
Alternative zu Arrays hilfreich sein, wenn jeder
Eintrag nur höchstens einmal vorkommen darf
(wie bei einer Menge in der Mathematik).

## Map

Mit `Map` steht eine Alternative zu 
JavaScript-Objekten zur Verfügung. Es gibt
einige Unterschiede zwischen `Map` und Objekte,
wie [hier in MDN beschrieben](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps).

Insbesondere hat `Map` eine optimierte Performance, 
und es gibt einige Hilfsmethoden in `Map`. Eine
`Map` wird mit `new Map()` erzeugt und mit 
`get` und `set` stehen Methoden zum Setzen und 
Auslesen von Werten bereit:

```js
const cities = new Map();
cities.set('FR', 'Freiburg');
cities.set('OG', 'Offenburg');
cities.set('LÖ', 'Lörrach');

console.log(cities.get('OG')); // Offenburg
console.log("Anzahl Städte: " + cities.size);
```

`map.size` (keine Methode!) ergibt die 
Anzahl der Einträge.

Eine `Map` kann auf unterschiedliche Arten
durchlaufen werden: 

```js
// nur die Schlüssel
for (let cityCode of cities.keys()) {
  console.log(cityCode); 
  // FR, OG, LÖ
}

// nur die Werte
for (let cityName of cities.values()) {
  console.log(cityName); 
  // Freiburg, Offenburg, Lörrach
}

// alle Schlüssel/Wert-Paare
for (let entry of cities) {
  console.log(entry);
  // [ 'FR', 'Freiburg' ]
  // [ 'OG', 'Offenburg' ]
  // [ 'LÖ', 'Lörrach' ]
}
```

Hilfreich sind u.a. diese `Map`-Methoden:

- `map.delete(key)` &mdash; löscht einen Eintrag
- `map.clear()` &mdash; löscht alle Einträge

<Callout type="error">
Leider funktioniert eine `Map` nicht direkt
mit JSON (`stringify`, `parse`) wie es bei
Objekten der Fall ist. Mehr Infos zum Umgang
mit JSON bei einer `Map` hier:
https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
</Callout>

## Set

Falls eine Liste erstellt werden soll, die
keine doppelten Einträge enthalten darf, dann
ist `Set` eine passende Alternative zu einem
Array. Erstellt wird ein `Set` mit `new Set()`
und das Hinzufügen erfolgt mit `add()`:

```js
const cities = new Set();
cities.add('Freiburg');
cities.add('Karlsruhe');
cities.add('Basel');
```

Ein `Set` kann mit `for` durchlaufen werden:

```js
for (let city of cities) {
  console.log(city);
  // Freiburg
  // Karlsruhe
  // Basel
}
```

Mit `has()` kann überprüft werden, ob ein
Eintrag bereits vorhanden ist. Doppelte 
Einträge werden vermieden:

```js
console.log(cities.has('Karlsruhe')); // true

console.log(cities.size); // --> 3
cities.add('Karlsruhe');
console.log(cities.size); // --> 3
```

Hilfreich sind u.a. diese `Set`-Methoden:

- `set.delete(value)` &mdash; löscht einen Eintrag
- `set.clear()` &mdash; löscht alle Einträge

<Callout type="warning">
**Vertiefendes Material**

- [Map und Set bei javascript.info](https://javascript.info/map-set)
- [Map-Referenz bei MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set-Referenz bei MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
</Callout>