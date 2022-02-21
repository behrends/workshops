import Callout from 'nextra-theme-docs/callout'

# Funktionen (Teil 2)

<Callout>
  **Dauer:** 30 Minuten

  - Kombinierte Funktionsaufrufe
  - Default-Werte bei Parametern
  - Flexible Argumentliste
  - Funktionen als Objekte
  
  **Ziel:** Weitere Aspekte von Funktionen kennen lernen
</Callout>

## Kombinierte Funktionsaufrufe

Im folgenden Beispiel werden Funktionen
nacheinander aufgerufen. Bei zwei Funktionen
werden die Ergebnisse bzw. Rückgabewerte
voriger Funktionsaufrufe verwendet (in `multiply` 
und `substract`).

```js
function add(a,b) {
  return a + b;
};

function substract(a,b) {
  return a - b;
};

function multiply(a,b) {
  return a * b;
};

const sum = add(6,3);
const product = multiply(sum,2);
const diff = substract(product,4);
console.log(diff); // 14 ( = (6+3)*2-4 )
```

Der Rückgabewert eines Funktionsaufrufs kann 
direkt als Argument im Aufruf einer anderen 
Funktion eingesetzt werden. Hier wird das Ergebnis 
einer Funktion als Parameter in nächsten 
Funktionsaufruf verwendet &mdash; das Ergebnis ist 
dasselbe wie oben:

```js
function add(a,b) {	
  return a + b;	
};

function substract(a,b) {	
  return a - b;	
};

function multiply(a,b) {	
  return a * b;
};
	
console.log(substract(multiply(add(6,3),2),4));
// --> 14 ( = (6+3)*2-4 )
```

## Default-Werte bei Funktionsparametern

JavaScript erlaubt, dass Funktionen mit „unpassenden“ 
Parametern aufgerufen werden (mehr oder weniger 
Parameter als deklariert, verschiedene Datentypen 
usw.).

Mit Default-Werten kann sichergestellt werden, dass 
Funktionsparameter einen Wert erhalten, wenn diese 
beim Aufruf der Funktion nicht angegeben werden:

```js
// Parameter b hat einen Default-Wert von 1000	
function myFunction(a, b = 1000) {
  console.log(a + b)
}
	
// b erhält in der Funktion den Default-Wert 1000
console.log(myFunction(1)); // --> 1001
 
// b erhält in der Funktion den Wert 12	
console.log(myFunction(1, 12)); // --> 13
```

## Flexible Argumentliste

Jeder Funktion in JavaScript steht bei ihrer 
Ausführung im Funktionsrumpf implizit (d.h. 
automatisch) ein Parameter namens `arguments` zur 
Verfügung. `arguments` muss also nicht explizit 
(d.h. ausdrücklich) angegeben werden.

`arguments` ist ein Array, das alle beim Aufruf übergebenen Parameter enthält.

Funktionen können somit mit beliebig vielen 
Parametern umgehen: 

```js
function sum() {
  let result = 0;	
  for(let i = 0; i < arguments.length; i++)
    result = result + arguments[i];
  return result;
}

// sum kann mit beliebig vielen Argumenten umgehen
console.log(sum()); // 0	
console.log(sum(3)); // 3
console.log(sum(5,8,1,2)); // 16
```

In diesem Zusammenhang ist manchmal die 
sogenannte „Spread“-Syntax nützlich (_spread_ 
bedeutet „ausbreiten“):

```js
function plusRest(a,...args) {	
  let result = a;	
  for(let i = 0; i < args.length; i++) {
    result += args[i];	
  }
  return result;	
}
	
console.log(plusRest(2)); // 2	
console.log(plusRest(2,6,7,3)); // 18 = 2 + 6 + 7 + 3
```

## Funktionen als Objekte

Funktionen sind Objekte. Daher können sie auch 
direkt einer Variablen oder Konstanten 
zugewiesen werden.

Dies wird tatsächlich häufiger verwendet. 
Zu beachten ist, dass hinter `function` kein Name 
angegeben wird &mdash; es sind also eigentlich 
anonyme Funktionen.

Der Aufruf erfolgt über den Namen der 
Konstanten/Variablen und sieht aus wie zuvor &mdash;
das Ergebnis ist dasselbe wie auf im Beispiel zu
kombinierten Funktionsaufrufen oben:

```js
// aus Platzgründen stehen die Funktionen 
// hier auf einer Zeile	
const add = function(a,b) { 
  return a + b; 
};
	
const substract = function(a,b) { 
  return a - b; 
};
		
const multiply = function(a,b) { 
  return a * b; 
};
	
console.log(substract(multiply(add(6,3),2),4));
// --> 14 ( = (6+3)*2-4 )
```

Die Tatsache, dass Funktionen auch Objekte 
sind und insbesondere als anonyme Funktionen
verwendet werden können, ist hilfreich für
das Verständnis von Pfeilfunktionen (nächste Seite).

<Callout type="warning">
Es gibt weitere Aspekte zu Funktionen, siehe
dazu z.B. hier: 
https://javascript.info/advanced-functions
</Callout>