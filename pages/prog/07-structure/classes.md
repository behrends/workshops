import Callout from 'nextra-theme-docs/callout'

# Klassen (ohne Objektorientierung)

<Callout>
  **Dauer:** 45-60 Minuten
  
  - Klassen sind „Baupläne“ für Objekte
  - Klassen werden deklariert und erzeugen Objekte
  - Sie haben Instanzvariablen und Methoden
  - Konstruktoren legen bei der Erzeugung Werte für Eigenschaften fest

  **Ziel:** Klassen können Objekterzeugung strukturieren
</Callout>

**Vorbemerkung:** \
Hier werden wir Klassen noch nicht aus 
objektorientierter Sicht betrachten. 

Oft werden mehrere Objekte gleicher Art benötigt 
(z.B. mehrere Objekte für verschiedene Personen).
Diese Objekte stets „wörtlich“ anzugeben (also 
als konkrete Objekte bzw. Objekt-Literale zu 
definieren), ist umständlich und könnte auch 
fehleranfällig sein (wenn z.B. Eigenschaften nicht 
angegeben werden).

Klassen bieten in JavaScript die Möglichkeit, für 
gleichartige Objekte einen „Bauplan“ („Blaupause“) 
oder eine „Mustervorlage“ („Template“) zu definieren.
Mit Hilfe der Klasse können somit Objekte gleicher Art 
mit einem bestimmten Aufbau erstellt werden.
Eine Klasse definiert also die Struktur bzw. die 
gewünschten Eigenschaften und Funktionene für Objekte, 
die anhand dieser Klasse erzeugt werden.

Eine Klasse Person könnte vorgeben, dass durch diese 
Klasse erzeugte Objekte bestimmte Eigenschaften wie 
z.B. Vornamen, Nachnamen, Wohnort, usw. haben (und 
somit konkrete Personen repräsentieren).

## Klassen deklarieren

Klassen werden mit class gefolgt vom Klassennamen 
definiert (meistens mit Großbuchstaben beginnend). 
Hier zunächst ohne Eigenschaften in den geschweiften 
Klammern:

```js
class Person {};
```

## Objekte anhand einer Klasse erzeugen

Die Objekterzeugung (bzw. Instanziierung), welche 
durch `new ClassName()` erfolgt, kann direkt für 
Variablenzuweisungen verwendet werden:

```js
let joe = new Person();   // Objekterzeugung und Zuweisung
```

`new` und `class` sind reservierte Schlüsselwörter 
in JavaScript, d.h. sie dürfen nicht als Bezeichner
für Variablen usw. eingesetzt werden.

## Eigenschaften für eine Klasse festlegen

Zunächst haben wir noch keine Eigenschaften in der 
Klasse `Person` definiert.

```js
class Person { 
  /* hier stehen noch keine Eigenschaften */ 
};
```

Gewünschte Eigenschaften werden innerhalb 
`{ ... }` für die Klasse angeben. Die Eigenschaften 
werden durch Zuweisungen angegeben 
(mit `=` und `;`) und nicht wie bei Objekten mit 
Doppelpunkt und Komma: 

```js
class Person {
  firstName = null;
  lastName = 'Anonymous';
}
let john = new Person();
let jane = new Person();
```

## Zugriff auf Eigenschaften in Objekten

Wenn Objekte mittels Klassen erzeugt werden,
dann erhalten sie Eigenschaften als 
**Instanzvariablen**, auf die wie bei „normalen“
Objekten gewohnt zugegriffen werden kann: 

```js
john['firstName']; // --> null
jane.lastName; // --> Anonymous
```

## Konstruktoren

Im obigen Beispiel ist es umständlich, die 
unterschiedlichen Eigenschaften für verschiedene 
Person-Objekte zu setzen: 

```js
john.firstName = 'John';
john.lastName = 'Smith';
```

Dies kann dadurch vereinfacht werden, dass 
bestimmte Eigenschaften und Werte direkt bei 
Erzeugung eines Objekts durch eine Klasse 
angegeben werden. Hierzu wird in der Klasse ein 
**Konstruktor** (bzw. eine Konstruktormethode) 
mit `constructor(...)` definiert:

```js
class Person {
  // Instanzvariablen wurden hier weggelassen, 
  // weil es jetzt einen Konstruktor gibt!
	
  // Instanzvariablen werden nun 
  // im Konstruktor initialisiert:
  constructor(firstName, lastName) {	
    this.firstName = firstName;	
    this.lastName = lastName;	
  }
}
```

Hat eine Klasse einen Konstruktor, dann wird dieser 
aufgerufen, wenn ein Objekt mit `new` erzeugt wird.

Dabei sind passende Parameter für die Eigenschaften 
bei Verwendung von `new` im Konstruktoraufruf 
anzugeben.

Der Konstruktor in der Person-Klasse erwartet zwei 
Parameter, daher wird ein Person-Objekt nun so 
erzeugt: 

```js
let jim = new Person('Jim', 'Wilkens');
let joan = new Person('Joan', 'Milner');
```

Im Konstruktor werden die 
Eigenschaften/Instanzvariablen mit

```js
this.firstName=firstName;
``` 

usw. erzeugt und initialisiert (diese müssen nicht 
vorher deklariert werden). 

## Funktionen / Methoden in Klassen

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;	
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
	
  greeting() {
    console.log(this.fullName());
  }
}
```

&xrarr; Kein `function`-Schlüsselwort, kein Komma zwischen den Funktionen. 

## Bemerkungen

- JavaScript erlaubt nur einen Konstruktor pro Klasse (anders als Java u.a.).
- Objekte, die mit einer Klasse erzeugt werden, heißen **Instanzen** dieser Klasse.
- Die Eigenschaften eines Objektes (wie z.B. `firstName`) heißen daher auch **Instanzvariablen** — aber dies betrifft meistens nicht die Funktionen einer Klasse.
- Funktionen in Objekteigenschaften werden oft **Methoden** genannt.
- Mit dem Operator `instanceof` kann in JavaScript festgestellt werden, ob ein Objekt die Instanz einer bestimmten Klasse ist: 

```js
class Person{ 
  /* ... Eigenschaften und Methoden ... */ 
};
let personObject = new Person();

personObject instanceof Person; // --> true
// (ein Person-Objekt ist eine Instanz der Klasse Person)
```

### Klassen und JSON

Aus JSON-Daten können JavaScript-Objekte direkt 
erzeugt werden.

Aber wie können Objekte als Instanzen von Klassen 
aus JSON erstellt werden?

Hierzu kann `Object.assign` genutzt werden, wodurch
die Eigenschaften eines Objektes in ein anderes 
„kopiert“ werden: 

```js
// für das Beispiel erstellen wir ein Objekt
// aber dieses Objekt könnte genauso gut aus JSON-Daten stammen	
const jsonObject = {firstName: 'Jane', lastName: 'Smith'};

class Person { /* komplexere Person-Klasse */};	
let jane = new Person();	
jane = Object.assign(jane, jsonObject);
```

Dies kann als Methode der Klasse oder im 
Konstruktor erreicht werden, siehe dazu
https://stackoverflow.com/questions/52315147/json-to-javascript-class.

### Weitere Themen bzgl. Klassen

`static` für statische Instanzvariablen und -Methoden 
&mdash; siehe [javascript.info](https://javascript.info/static-properties-methods)

Objektorientierung (u.a. Vererbung) werden wir später 
besprechen, u.a. mit folgenden Themen in Bezug auf 
Klassen:

- `private` — siehe [javascript.info](https://javascript.info/private-protected-properties-methods#private-waterlimit) (wird in Zukunft in JavaScript unterstützt)

- `getter/setter` — siehe [javascript.info](https://javascript.info/class#getters-setters) (getter und setter gibt es auch bei Objekten, siehe siehe [javascript.info](https://javascript.info/property-accessors))


<Callout type="warning">
**Vertiefendes Material**

- [Klassen bei javascript.info](https://javascript.info/classes)
- [Klassen im MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
</Callout>


