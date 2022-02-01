import Callout from 'nextra-theme-docs/callout'

# Objekte in JavaScript

<Callout>
  **Dauer:** 45 Minuten

  - Bedeutung von Objekten in JavaScript 
  - Objekte sind Datenstrukturen (_key_ / _value_ Prinzip)

  **Ziel:** Daten mit Objekten strukturieren
</Callout>

Viele denken bei dem Begriff „Objekt“ an 
objektorientierte Programmierung, wie sie z.B. in 
Java umgesetzt ist. In JavaScript gibt es zwar auch 
objektorientierte Programmierung (siehe später), aber 
in JavaScript stellen Objekte lediglich eine Datenstruktur dar. Mit Objektorientierung haben 
Objekte in JavaScript zunächst einmal nichts zu tun.

In JavaScript gibt es den Datentyp `object`, der 
Arrays und Objekte umfasst (und eigentlich auch 
Funktionen, aber siehe dazu `typeof`). Es gibt in 
JavaScript auch Klassen, mit denen (Objekt-)Instanzen 
erzeugt werden können (siehe später).

## Objekte in JavaScript

In JavaScript ist „Objekt“ eine Datenstruktur, 
die aus Eigenschaften mit eindeutigen Namen 
bestehen, denen bestimmte Werte zugeordnet sind
(Zahlen, Strings, Arrays, Objekte, Funktionen, usw.).

Objekte sind also Sammlungen von sogenannten 
Schlüssel/Wert-Paaren (_key / value pairs_).

Damit entsprechen Objekte in JavaScript den 
Dictionaries in Python, Structs in C, Hashes in 
Ruby, und stückweise auch HashMaps in Java (oder
Records ab Java 15 — die es auch in anderen 
Sprachen gibt). 

Schlüssel sind meistens Strings oder gewöhnliche 
Bezeichner, und die Werte können von beliebigen 
Datentypen sein. 

**Erinnerung: Arrays**

Wenn der Umgang mit Arrays bekannt ist, dann ist 
der Schritt zu Objekten nicht sehr groß — 
tatsächlich sind Arrays in JavaScript bereits 
Objekte. Die Positionen oder Indexe der Einträge 
eines Arrays könnten als „durchnummerierte 
Eigenschaften“ aufgefasst werden: 

```js
let myList = [8, "Hallo", [4,5,6]];
// myList hat an der Position 0 den Wert 8:
// oder myList hat an der "Eigenschaft" 0 den Wert 8:
myList[0]; // 0 --> 8

// myList hat an der "Eigenschaft" 1 den Wert "Hallo":
myList[1]; // 1 --> "Hallo"

// myList soll an der "Eigenschaft" 3 das Array [40,50,60] erhalten:
myList[2] = [40,50,60]; // --> [8,"Hallo",[40,50,60]]
```

Der Umgang mit Arrays erfolgt in JavaScript durch 
eckige Klammern `[ ]`.

Bei der Deklaration steht die Position eines Eintrags 
bzw. Elements durch die Reihenfolge in der Aufzählung 
fest.

Deklaration: 

```js
let l = [elem1, elem2, elem3, …, elemN];
```

Zugriff auf ein Element bzw. Zuweisung eines 
Eintrags durch Angabe der Position:

lesender Zugriff auf einen Eintrag: `l[posX]`;

Zuweisung eines Eintrags: `l[posX] = newValue`;

&xrarr; Bei Objekten gibt es anstatt der Position 
benannte Eigenschaften und statt geschweifte 
statt eckige Klammern — ansonsten bleibt vieles 
gleich! 

Beispiel Array:

```js
let myList = [8, "Hallo", [4,5,6]];
// myList hat an der "Eigenschaft" 0 den Wert 8:
myList[0]; // 0 --> 8

// myList soll an der "Eigenschaft" 3 das Array [40,50,60] erhalten:
myList[2] = [40,50,60]; // --> [8,"Hallo",[40,50,60]]
```

Gleiches Beispiel als Objekt:

```js	
let myObject = {0: 8, 1: "Hallo", 2: [4,5,6]};
// myObject hat an der "Eigenschaft" 0 den Wert 8:
myObject['0']; // 0 --> 8  Achtung: String für Eigenschaftsname
	
// myObject soll an "Eigenschaft" 3 das Array [40,50,60] erhalten:
myObject['2'] = [40,50,60]; // --> {0: 8,1: "Hallo",2: [40,50,60]}
```

&xrarr; Bei Objekten gibt es anstatt der Position 
benannte Eigenschaften und statt geschweifte eckige 
Klammern — ansonsten bleibt vieles gleich!

Die Eigenschaften eines Objekts müssen also bei der 
Deklaration ausdrücklich angegeben werden.

Objekte bestehen also aus Aufzählungen von 
Eigenschaften, gefolgt von einem Doppelpunkt und 
dem gewünschten Wert für die Eigenschaft.

Dabei werden die Eigenschaften natürlich meistens 
nicht als Zahlen sondern als beliebige Namen angegeben.

Auflistung der Eigenschaften (properties) und Werte 
oft auf mehreren Zeilen (Komma getrennt!): 

```js
let myObject = {
  prop1: value1,
  prop2: value2,
  // ... evtl. weitere props: values, <-- mit Komma am Ende!
  propN: valueN
};
```

### Zugriff auf Objekteigenschaften

Der Zugriff (lesend und schreibend) auf die
Eigenschaften eines Objekts erfolgt mit Strings, 
die den Namen der betroffenen Eigenschaft enthalten:

```js
let person = {firstName: 'Jane', lastName: 'Smith'};
person['firstName']; // --> 'Jane'
person['firstName'] = 'Jean';
```

Der Zugriff auf die Eigenschaften kann alternativ 
zu `obj['name']` auch mit der sogenannten 
„Punktnotation“ erfolgen durch `obj.name`:

```js
person.firstName; // --> 'Jean'
person.firstName = 'Jill';
```

In der Punktnotation wird der Eigenschaftsname 
„direkt hingeschrieben“ und nicht als String 
angegeben. (Bei Arrays gibt es keine Punktnotation 
für den Elementzugriff). 

### Eigenschaften hinzufügen und entfernen

Das leere Objekt wird mit `{}` angegeben — 
ähnlich wie das leere Array mit `[]`

Objekte können zu späteren Zeitpunkten um neue 
Eigenschaften/Werte erweitert werden (mit 
`obj['newProp'] = ...` oder `obj.newProp = ...`).

Eigenschaften aus Objekten mit `delete` entfernen: 
`delete obj.newProp`

Zugriff auf nicht vorhandene Eigenschaften ergibt `undefined`

```js
let obj = {}; // --> leeres Objekt
// Eigenschaften hinzufügen - egal ob mit [] oder .
obj['prop1'] = 'Hello!';
obj.prop2 = 123456;
	
// Eigenschaften entfernen
console.log(obj.prop2); // --> 123456
delete obj.prop2
console.log(obj.prop2); // --> undefined
```

Beispiel:

```js	
let elsa = {	
  firstName: 'Elsa',
  lastName: 'Frozen',	
  age: 26,	
  hobbies: ['Ice Skating','Programming','Travel'],	
  address: { zip: 12345, city: 'Arendelle'},	
  fullName: function() { return 'FULLNAME TEST AND TODO!'; }	
}
```

Objekte können auf ganz natürliche Weise auf Arrays 
und andere Objekte als Werte enthalten — und auch 
Funktionen, da diese auch wie „gewöhnliche“ Werte 
aufgefasst werden können.

Hierbei hat die Funktion selbst keinen Namen, siehe 
`function()` — der Funktionsname wird sozusagen durch 
die Eigenschaft festgelegt (oben `fullName`). 

```js
elsa['firstName']; // --> Zugriff mit []
elsa.lastName; // --> Zugriff mit Punktnotation
elsa.hobbies[0]; // --> Zugriff ein Element im Array
```

Funktionen als Werte von Objekteigenschaften können 
„ganz normal“ mit Punktnotation, dem Namen der 
Eigenschaft als Funktionsname und runden Klammern 
aufgerufen werden.

```js
elsa.fullName(); // --> 'FULLNAME TEST AND TODO!'
```

Bei „geschachtelten“ Objekten ist insbesondere die 
Punktnotation für den Zugriff auf die Eigenschaften 
viel einfacher als mit eckigen Klammen:

```js
elsa['address']['zip']; // --> 12345, umständlicher Zugriff
elsa.address.city; // --> Arendelle, viel einfacher mit Punktnotation
```

## `this`

In Funktionen als Werte von Objekteigenschaften 
kann durch Voranstellen von this auf die Werte 
anderer Eigenschaften in dem Objekt zugegriffen 
werden. 

```js
let elsa2 = {
  firstName: 'Elsa',
  lastName: 'Frozen',	
  address: { zip: 12345, city: 'Arendelle'},	
  fullName: function() {	
    return `${this.firstName} ${this.lastName};`	
  }
}
```

Achtung: `this` hat in JavaScript grundsätzlich eine 
andere Bedeutung/Semantik als in Java und anderen 
Programmiersprachen!

Grobe Erklärung: `this` in JavaScript bezieht sich 
auf den Kontext, in dem eine Funktion aufgerufen 
wird (oben ist dies das Objekt `elsa2`). 

## JSON

Das im Web sehr wichtige Datenaustauschformat JSON 
(**J**ava**S**cript**O**bject**N**otation) hat 
starke Ähnlichkeit zu JavaScript-Objekten.

Für die Arbeit mit JSON verfügt JavaScript über eine eigene, fest integrierte JSON-API (application programming interface), Programmierschnittstelle).

Dies lässt sich leicht mit `JSON.stringify` zur 
Erstellung von JSON-Strings und umgekehrt durch 
`JSON.parse` für die Erzeugung von 
JavaScript-Objekten aus JSON-Strings nachvollziehen: 
	
```js
let testObject = {name: 'Foo', value: 32, list: [1,2,3]};
let jsonString = JSON.stringify(testObject);	
// --> "{"name":"Foo","value":32,"list":[1,2,3]}"	
let newObject = JSON.parse(jsonString);	
// --> {name: 'Foo', value: 32, list: [1,2,3]};
```
	
## Bemerkungen

**Eigenschaften mit Leerzeichen**

Eigenschaften können auch als Strings mit 
Anführungszeichen deklariert werden.

Dies wird auf jeden Fall dann gebraucht, wenn eine 
Eigenschaft aus mehreren Wörtern besteht bzw. 
Leerzeichen enthält: 

```js
let anotherObject = {
  property1: 12345,
  'another property': 'whatever'
}
```

Für solche Eigenschaften mit Leerzeichen **muss** 
der Zugriff durch eckige Klammern mit der Eigenschaft 
als String erfolgen. Punktnotation ist nicht möglich: 

```js
anotherObject['another property']; // --> 'whatever'
// anders geht es nicht, denn dies kann nicht funktionieren:
// anotherObject.another property   --> SyntaxError!
// anotherObject.'another property' --> SyntaxError!
```

**Objekte „kopieren“**

Manchmal sollen die Eigenschaften eines Objekts in 
ein anderes Objekt kopiert werden. Dies kann durch 
`Object.assign` erreicht werden: 

```js
const target = { a: 1, b: 2 };	
const source = { b: 4, c: 5 };
	
const returnedTarget = Object.assign(target, source);

console.log(target);	
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);	
// expected output: Object { a: 1, b: 4, c: 5 }
```

(Dies erinnert an die Methode `clone()` in Java.) 

Quelle des Beispiels:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign 

