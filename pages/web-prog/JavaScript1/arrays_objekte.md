import Callout from 'nextra-theme-docs/callout'

# Arrays / Objekte

<Callout>
  **Dauer:** 20 Minuten

  **Themen:**
  - Arrays sind Listen
  - Objekte sind Dictionaries bzw. HashMaps
</Callout>

## Arrays 

Arrays werden in JavaScript mit eckigen Klammern `[…]` deklariert. 
Arrays können Werte verschiedener Typen enthalten und die Länge des 
Arrays muss nicht festgelegt werden und kann zur Laufzeit variieren.

```js
let empty = []; // leeres Array
const chars = ['a', 'b', 'c'];
const myList = [1, 2, 3, 4, 5];
const myMixedList = [1, 'eins', 'one', 1.0, false];

// erster Eintrag mit [0]
console.log(myList[0]); // ==> 1

// erster Eintrag ändern:
myList[0] = -1;
console.log(myList[0]); // ==> -1

// Länge der Liste mit length
console.log(myMixedList.length); // ==> 4

// Arrays sind vom Typ 'object'
console.log(typeof myList); // --> 'object'

// Neuen Eintrag ans Ende des Array anhängen:
myList.push(6);
// ---> nun gilt myList === [1,2,3,4,5,6]
// myList ist zwar eine Konstante aber dies ist erlaubt
// die eigentliche Zuweisung der Konstanten bleibt erhalten
// nur das konkrete, zugewiesene Array ändert sich

// --> es gibt viele weitere Methoden für Arrays
```

## Objekte

In JavaScript lassen sich mit Objekten beliebige Werte 
zusammenfassen. Die Werte sind in Objekten bestimmten 
Schlüsseln bzw. Eigenschaften zugeordnet. Objekte werden mit 
geschweiften Klammern deklariert:

```js
let object1 = { name: 'Jane', age: 33 };
```

Objekte sind also Sammlungen von Schlüssel/Wert-Paaren 
(_key/value pairs_).

Der Zugriff auf einzelne Werte erfolgt mit `object.key` oder 
`object['key']` bzw. `object["key"]`:

```js
// lesender Zugriff
console.log(object1.name); // oder object['name']
console.log(object1['age']); // oder object.age

// schreibender Zugriff
object['name'] = 'Janet'; // oder object.name = ...
object.age = 30; // oder object['age'] = ...
```

Objekte können auch weitere Objekte, Arrays oder Funktionen als Eigenschaften enthalten:

```js
let object2 = {
  firstName: 'John',
  lastName: 'Smith',
  age: 27,
  address: {
    zip: 79098,
    city: 'Freiburg',
  },
  professions: ['IT specialist', 'Farmer'],
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(object2.getFullName());
console.log(object2.address.city);
```

Objekte sind die Grundlage für JSON (_JavaScript Object Notation_).


<Callout type="warning">
Aus Python-Sicht entsprechen Arrays den Lists und Objekte
den Dictionaries.

Aus Java-Sicht können Objekte mit HashMaps verglichen werden.
</Callout>
