import Callout from 'nextra-theme-docs/callout'

# fetch mit async/await

<Callout>
  **Dauer:** 20 Minuten

  **Themen:**
  - fetch für den Zugriff auf Webservices
  - async/await ermöglichen asynchrone Abläufe

  **Ziel:** Eigene Zugriffe auf Webservices erstellen
</Callout>

### fetch

Im Browser steht JavaScript-Code die Funktion `fetch` zur 
Verfügung. Mit einer URL als Parameter wird `fetch` aufgerufen,
um z.B. Daten von einem Webservice zu laden. Als Beispiel
verwenden wir `my-json-server` mit den statischen JSON-Daten wie
auf der [vorigen Seite](/web-prog/JavaScript3/json) beschrieben:

```javascript
const myUrl =
  'https://my-json-server.typicode.com/behrends/workshops/locations/3';
```

Mit der URL in der Konstanten `myUrl` kann `fetch` aufgerufen 
werden:

```javascript
fetch(myUrl);
```

Das Ergebnis dieses Aufrufs ist ein sogenanntes „Promise“-Objekt.
Mit Promises werden in JavaScript die Ergebnisse asynchroner Abläufe 
umgesetzt. Das Thema Promises ist ziemlich komplex. Wir werden hier
nur betrachten, wie sich dieses Thema im Zusammenhang mit `fetch`
darstellt.

Ein Aufruf von `fetch` führt dazu, dass eine „Internet-Anfrage“ an
einen anderen Server im Web gestellt wird. Je nach Verbindungsqualität
und Verfügbarkeit des Servers kann solch ein Aufruf eine gewisse Zeit 
dauern (wenige Millisekunden oder deutlich länger). Damit der 
JavaScript-Code durch solch einen Aufruf nicht blockiert wird, erfolgt 
der Aufruf asynchron mit Hilfe von Promises. 

Für die obige Verwendung von `fetch` kann das Promise-Objekt mit 
aufeinanderfolgenden Aufrufen der `then`-Methode aufgelöst werden:

```javascript
fetch(myUrl)
  .then(response => response.json())
  .then(data => console.log(data.name));
```

Dieser Code führt dazu, dass mit zwei Callback-Funktionen zunächst
die Antwort des `fetch`-Aufrufs als `response` verarbeitet wird und
durch `response.json()` ein weiteres Promise-Objekt für das Auslesen
der JSON-Daten erhalten wird, das wiederum mit `then` aufgelöst wird,
sodass schließlich die gewünschten Daten mit `console.log` ausgegeben
werden.

<Callout type="warning">
Eventuell ist es hilfreich, den Ablauf interaktiv in einem
Diagramm am Whiteboard oder in Excalidraw zu visualisieren.
</Callout>

Der Umgang mit Promises und Callback-Funktionen in verketteten
`then`-Aufrufen ist umständlich und relativ schwer nachzuvollziehen.
Mit `async/await` wird dies deutlich vereinfacht.

### async/await

Der Umgang mit Promises wird durch `async/await` viel zugänglicher.
Insbesondere wird es damit einfacher, `fetch` zu verwenden.
So kann das Code-Beispiel

```javascript
fetch(myUrl)
  .then(response => response.json())
  .then(data => console.log(data.name))
```

auf folgende Weise mit `async/await` umgesetzt werden:

```javascript
// WICHTIG: await darf nur in asynchronen Funktionen vorkommen!
// --> async function ... deklariert eine asynchrone Funktion
async function getData() {
  // fetch asynchron mit await ausführen
  const response = await fetch(myUrl);
  // JSON-Daten mit await aus response laden
  const data = await response.json()
  // gewünschte Daten ausgeben
  console.log(data.name);
}

// Aufruf der (asynchronen) Funktion
getData();
```

Der Zusatz von `await` vor dem `fetch` führt dazu, dass das 
Promise-Objekt der Anfrage direkt aufgelöst wird. Gleiches 
gilt für die nächste Zeile, in der die JSON-Daten mit 
`await response.json()` verarbeitet und direkt der Konstanten
`data` zugewiesen werden.

**Wichtig:** `await` darf nur in Funktionen verwendet werden, 
die mit dem Zusatz `async` deklariert werden &mdash; daher
die Bezeichnung `async/await` für dieses Konzept.

Noch ein weiteres Beispiel für den Umgang mit `fetch` und
`async/await`:

```javascript
const json_url =
  'https://my-json-server.typicode.com/behrends/workshops/locations/';
async function loadData() {
  // alternativ: id aus Dropdown-Liste mit select_locations.value;
  const location_id = 3;
  // URL zusammensetzen und Daten laden
  const response = await fetch(json_url + location_id);
  // JSON-Daten auslesen
  const data = await response.json();
  // Ausgabe des Namen und der Temperatur
  console.log(`Temperatur in ${data.name}: ${data.temp}`);
}
```
