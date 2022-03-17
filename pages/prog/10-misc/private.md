import Callout from 'nextra-theme-docs/callout'

# Private Eigenschaften mit `get` und `set`

<Callout>  
  **Dauer:** 25 Minuten

  - Private Eigenschaften in Klassen verhindern den Zugriff von „außen“
  - `get` und `set` ermöglichen kontrollierten Zugriff

  **Ziel:** Kapselung bzw. _data hiding_ für den Zustand für Objekte einer Klasse
</Callout>

Manchmal sollen bestimmte Eigenschaften eines 
Objekts nicht direkt von außen sichtbar bzw.
veränderbar sein. Dadurch soll z.B. das Setzen 
ungültiger Zustände von Objekten verhindert werden:

```js
class Person {
  age = 0; 
  // age (das Alter einer Person) kann von 
  // anderem Code willkürlich geändert werden	
}
	
let john = new Person();
	
// Alter wird auf eine unzulässige Zahl gesetzt
// dies wollen wir vielleicht verhindern!!!
john.age = -1424;
```

Idealerweise wird hier das direkte Ändern der 
Werte von Objekteigenschaften verhindert. 

Mit dem Zusatz `#` vor ihrem Namen kann eine 
Instanzvariable oder Methode für den Zugriff von 
außen verborgen werden. Dadurch steht die 
Instanzvariable bzw. Methode nur dem Code 
innerhalb der Klasse zur Verfügung.

Durch den Zusatz `#` vor dem Namen gekennzeichnete 
Variablen bzw. Methoden werden als „privat“ 
bezeichnet, denn von außen dürfen diese nicht 
verwendet werden. Siehe dazu folgendes Beispiel:
	
```js
class Person {	
  #age; // #age ist privat, wird durch Konstruktor gesetzt
	
  constructor(age) {	
    this.#age = age;	
  }	
}

let jane = new Person(23);
		
// Auf #age darf außerhalb der Klasse gar nicht zugegriffen werden	
jane.#age = -1424; // ---> SyntaxError
jane.#age = 24;  // ---> SyntaxError
```

Oben ist zu sehen, wie `age` durch `#age` als
private Eigenschaft markiert wird. Beim Versuch
auf diese Eigenschaft „von außen“ zuzugreifen 
entsteht ein Syntax-Fehler.

<Callout type="warning">
Der Vorgang des „Verbergens“ von Eigenschaften
wird in der objektorientierten Programmierung
„Kapselung“ oder auch _information/data hiding_ 
genannt.

In anderen Sprachen gibt es noch weitere Konzepte 
wie z.B. `protected`, d.h. weitere Arten der 
Zugriffsmodifikatoren. 
</Callout>

Mit dem Konstruktor wird `#age` nun bei der 
Objekterzeugung initialisiert. 

Aber wie können wir nun das Alter von Personen 
abfragen und ändern? 

## getter- und setter-Methoden

Durch sogenannte getter- und setter-Methoden
können private Eigenschaften von Objekten für den 
lesenden (getter) und den schreibenden (setter)
Zugriff „von außerhalb“ bei Verwendung eines 
Objekts zugänglich gemacht werden. 

In JavaScript stehen hierzu die Schlüsselwörter
`get` für getter- und `set` für setter-Methoden 
bereit. Für eine private Eigenschaft `#prop` 
werden getter/setter durch Voranstellen von 
`get` und `set` vor dem Methodennamen definiert.
Die Methode muss dabei den Namen der privaten 
Eigenschaft ohne den Zusatz `#` haben:

```js
class ExampleClass { 
  #prop

  // getter für #prop
  get prop() { 
    return this.#prop;
  }

  // setter für #prop
  set prop(prop) { 
    this.#prop = prop;
  }
```

Der getter liefert also den Wert der Eigenschaft
als Rückgabewert und der setter hat einen
Parameter für die Zuweisung eines neuen Wertes.
Neben der Rückgabe im getter und der Zuweisung im 
setter sind weitere Anweisungen in den Methoden
möglich.

In unserem Beispiel mit `Person` und `#age`
könnten wir passende getter und setter 
folgendermaßen umsetzen, sodass der Parameter 
im setter auf Gültigkeit überprüft wird:

```js
class Person {
  #age; // #age privat, wird durch Konstruktor und getter gesetzt
	
  constructor(age) {
    this.#age = age;
  }
	
  // getter-Methode für age
  // #age wird zurückgeliefert
  get age() { 
    return this.#age; 
  }
	
  // setter-Methode für age mit Parameter
  // nur sinnvolle Werte werden zugelassen
  set age(age) {	
    if(age<0 || age>120) {
      throw new Error('invalid age!');
      // Fehler --> Alter wird nicht geändert
    }

    // private Instanzvariable ändern	
    this.#age = age; 
  }	
}
```

<Callout type="error" emoji="‼️">
**&xrarr; Zu beachten ist das Leerzeichen jeweils 
nach `get` und `set`!** 
</Callout>

Wenn getter- bzw. setter-Methoden mit `get`
bzw. `set` vorhanden sind, dann kann wieder
direkt auf die Eigenschaften mit der
gewohnten Punktnotation (`object.prop`) 
zugegriffen werden (ohne `#`):

```js
const alice = new Person(23);
console.log(alice.age); // 23

try {    
  alice.age = 32;
  console.log(alice.age); // 32
  alice.age = -1234; // erzeugt Laufzeitfehler!
} catch(error) {
  // Error: invalid age!
  console.error(error);
} finally {
  console.log("Alter am Ende: " + alice.age); // 32
}
```

## Private Methoden

Auch Methoden können durch das Voranstellen
von `#` am Methodennamen als privat markiert
werden. Diese dürfen dann nur innerhalb der
Klasse mit `this` aufgerufen werden:

```js
class Example {
  #secretMethod() {
    return "pssst!";
  }

  revealSecret() {
    return this.#secretMethod();
  }
}

const tmp = new Example();
tmp.secretMethod(); // --> TypeError
tmp.#secretMethod(); // --> SyntaxError
tmp.revealSecret(); // --> "pssst!"
```

<Callout type="warning">
**Vertiefendes Material**

- `private` — siehe [javascript.info](https://javascript.info/private-protected-properties-methods#private-waterlimit) (wird in Zukunft in JavaScript unterstützt)

- `getter/setter` — siehe [javascript.info](https://javascript.info/class#getters-setters) (getter und setter gibt es auch bei Objekten, siehe siehe [javascript.info](https://javascript.info/property-accessors))
</Callout>