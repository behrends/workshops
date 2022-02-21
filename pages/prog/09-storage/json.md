import Callout from 'nextra-theme-docs/callout'

# JSON

<Callout>
  **Dauer:** 10 Minuten
  
  **Ziel:** JSON-Format verstehen
</Callout>

JSON ist ein wichtiges Datenaustauschformat
und eine eine Abkürzung für die Bezeichung
„**J**ava**S**cript**O**bject**N**otation“.
Mit Hilfe von JSON werden häufig Daten zwischen
verschiedenen Webanwendungen ausgetauscht. 

Daten werden in JSON in der Regel als Objekte mit 
Schlüssel-/Wert-Paaren und Arrays dargestellt.
Im Prinzip basiert JSON auf einem Teil der
JavaScript-Syntax:

```json
{
  "people": [
    {
      "id": 1,
      "name": "Alice"
    },
    {
      "id": 2,
      "name": "Bob"
    }
  ],
  "cities": [
    {
      "code": "FR",
      "name": "Freiburg"
    },
    {
      "code": "KA",
      "name": "Karlsruhe"
    },
    {
      "code": "OG",
      "name": "Offenburg"
    }
  ]
}
```

Im Beispiel sind Daten für Personen und Städte
zu sehen, die als ein JSON-Objekt zusammengefasst
sind. Die Ähnlichkeit zu JavaScript-Objekten
ist offensichtlich. Allerdings müssen die Bezeichner
der einzelnen Schlüssel (`people`, `id`, `name`, usw.)
als Strings angegeben werden.

Im Rahmen des Programmierprojekts kann JSON genutzt
werden, um Daten, die aus JavaScript-Objekten oder
-Arrays bestehen, zur späteren Verwendung 
abzuspeichern. Hierfür steht direkt in JavaScript
ein Objekt namens `JSON` bereit, das nützliche
Hilfsmethoden enthält.

Dazu ein Beispiel mit einem Array bestehend
aus Objekten, die Personendaten enthalten:

```js
const myContacts = [
    {
      id: 1,
      name: "Alice"
    },
    {
      id: 2,
      name: "Bob"
    }
];
```

Dieses Array lässt sich mit der Methode
`JSON.stringify()` in einen String umwandeln,
der im JSON-Format ist:

```js
// JSON ist in JavaScript enthalten 
// --> kein import oder require für JSON nötig
const jsonString = JSON.stringify(myContacts);

console.log(jsonString);
// --> ergibt das Array als JSON-String:
// [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
```

Dieser JSON-String (im Beispiel `jsonString`) ist
also im JSON-Format und kann nun z.B. in 
Datenübertragungen im Web oder zur Speicherung 
in einer Datei oder Datenbank verwendet werden
&mdash; denn letztendlich ist dies ein 
gewöhnlicher String bzw. Text.

Umgekehrt kann aus einem JSON-String wieder
das entsprechende JavaScript-Objekt oder -Array
hergestellt werden. Dazu wird ein JSON-String
an die Methode `JSON.parse` übergeben, die ein
JavaScript-Objekt bzw. -Array erzeugt:

```js
const jsObject = JSON.parse(jsonString);
console.log(jsObject);
// --> ergibt ein Array, das die gleichen
// Elemente wie myContacts enthält
```

Somit kann für ein JavaScript-Objekt durch 
`JSON.stringify` ein JSON-String erstellt werden, 
der wiederum mit `JSON.parse` in ein 
JavaScript-Objekt umgewandelt werden kann, das 
dem ursprünglichen Objekt entspricht:

```
JSON.parse(JSON.stringify(myContacts))
   ergibt
myContacts
```

![JSON-String-Objekt](/images/prog/json_string_objekt.png)