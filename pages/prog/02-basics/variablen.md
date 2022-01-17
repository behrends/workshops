import Callout from 'nextra-theme-docs/callout'

# Variablen und Konstanten

<Callout>
  **Dauer:** 25 Minuten

  - Variablen
  - Konstanten

  **Ziel:** Werte mit Namen versehen und verwenden
</Callout>

## Variablen

Variablen helfen, in Programmen relevante „Werte“ wie z.B.
bestimmte Zahlen oder „Zwischenergebnisse“ (z.B. von 
Berechnungen) mit Namen bzw. Bezeichnern auszustatten, sodass
diese leicht wiederverwendet werden können.

Variablen haben einen Namen/Bezeichner, der nur einmal im 
Gültigkeitsbereich der Variablen vergeben werden darf — begrenzt 
durch `{ ... }`.

Für lokale Variablen ist der Gültigkeitsbereich oft die umgebende 
Funktion — könnte aber auch eine Schleife oder Verzweigung sein 
(siehe später). Variablen dürfen in ihrem Gültigkeitsbereich nur 
einmal deklariert werden.

Variablen werden mit dem Schlüsselwort `let` gefolgt von einem 
Name/Bezeichner **deklariert**:

```js
// Deklaration von Variablen (noch ohne Wert/„Inhalt“)
let myVariable;
let variable2;
```

Mit einer **Zuweisung** erhält die Variable einen Wert. 
Nachfolgende Zuweisungen ändern den aktuellen Wert in der 
Variablen.

```js
// myVariable ist der Name/Bezeichner der Variablen	
let myVariable; 
// es folgt eine erste Zuweisung
myVariable = 1;
	
// hier steht vielleicht eine ganz andere Berechnung...
	
// der Variablen wird ein neuer Wert zugewiesen
myVariable = 24;
```

**Reservierte Schlüsselwörter** sind das „Vokabular“ 
einer Programmiersprache, die nicht für Bezeichner 
verwendet werden dürfen (`let`, `function`, `class`, etc.).

```js
let class = "Schulkasse 8a"; // Fehler!
// SyntaxError bei der Ausführung (zur Laufzeit)

// --> Uncaught SyntaxError: unexpected token: keyword 'class'
```

Mehr zu möglichen Bezeichnern folgt später. 

Die beiden Anweisungen zur Deklaration und der ersten Zuweisung
eines Wertes an die Variablen lassen sich in eine Anweisung 
zusammenfassen. Dann sprechen wir von einer **Initialisierung**:

```js
// Initialisierung: Deklaration und erste Zuweisung kombiniert
let myVariable = 1; 
	
// hier steht vielleicht eine ganz andere Berechnung...
	
// neuer Wert wird zugewiesen
myVariable = 24;
	
// FEHLER! 
// Variable darf nur einmal im 
// Gültigkeitsbereich deklariert werden!
let myVariable = 25;
```

Die Werte von Variablen sind ja sozusagen „zwischengespeichert“ 
und deshalb werden sie meistens mehrmals verwendet.

Zum Beispiel kann der aktuelle Variablenwert auch in einer 
erneuten Zuweisung an dieselbe Variable genutzt werden. 

```js
let luckyNumber = 108; // Initialisierung

console.log(luckyNumber);
		
// Variablen können sich ändern - daher ihr Name
luckyNumber = 123; // neue Zuweisung	
luckyNumber = luckyNumber + 7; // neue Zuweisung mit vorigem Wert
	
console.log(luckyNumber);

// Fehler zur Laufzeit, wenn nicht bekannte Variablen 
// verwendet werden	
console.log(thisVariableDoesNotExist); // ReferenceError
```

## Konstanten

 Konstanten sind vereinfacht gesagt „Variablen, die sich nicht 
 ändern können“ &mdash; es darf also später keine neue Zuweisung 
 erfolgen.

Konstanten werden mit dem Schlüsselwort `const` deklariert.

Konstanten müssen direkt mit einem Wert initialisiert werden, der 
unveränderlich (konstant) ist. 

```js
const answer = 42;
const unknownName = "John Doe";

// Fehler: Konstanten können nicht geändert werden!
answer = 23; --> würde Fehler ergeben
	
// Fehler: Konstanten ohne Wert deklarieren
const notAllowed;
```

## Bezeichner und Namen

Neben Variablen erstellen wir in JavaScript u.a. auch eigene 
Funktionen und Klassen, denen wir passende Namen geben.

Solche Namen werden auch Bezeichner genannt. Sie enthalten keine 
Leerzeichen.

Bezeichner können aus folgenden Elementen bestehen (d.h. mit 
diesen können wir passende Namen zusammensetzen):

- `a,b,c, …,x,y,z,A,B,C, …,X,Y,Z` (alle Buchstaben des Alphabets)
- `0,1,2,3, …,9` (Ziffern von 0 bis 9) 
- `_` (Unterstrich)
- `$` (Dollarzeichen) 

Bezeichner dürfen nicht mit einer Ziffer beginnen.

Zwischen Groß- und Kleinschreibung wird unterschieden (JavaScript 
ist also _case sensitive_). Also sind die Bezeichner `Hallo` 
und `hallo` verschieden und können für zwei unterschiedliche 
Variablen verwendet werden.

Schlüsselwörter dürfen nicht als Bezeichner verwendet werden.

Beispiele gültiger Bezeichner:

- `Mein_Name`
- `_ein_Bezeichner`
- `Name_$123`

Beispiele nicht zulässiger Bezeichner:

- `1Name`
- `Gibt's-nicht`
- `class`

## Schlüsselwörter

In Programmiersprachen haben bestimmte „Vokabeln“ eine 
vordefinierte Bedeutung und dürfen nicht als Bezeichner 
verwendet werden. Deshalb nennt man diese (reservierte) 
Schlüsselwörter.

In JavaScript sind dies u.a. die folgenden:

```
break case catch class continue default do
else export extends for function if new
return static super switch this try while
…
```

Wir lernen deren Bedeutung zum Teil später kennen.

## Ausdrücke

Auf der „rechten Seite“ einer Zuweisung steht ein gültiger
JavaScript-**Ausdruck** (_expression_). 

Ausdrücke können einfache Werte der Variablen/Konstanten sein 
wie z.B. Zahlen (`123`) oder Strings (`"Hello, World!"`). 
Solche Werte, die direkt „hingeschrieben“ werden, werden 
manchmal „Literale“ genannt (von engl. _literal_ &mdash; wörtlich). 

Ausdrücke können aber auch durch komplexere Operatoren oder 
Rückgabewerte von Funktionsaufrufen hervorgehen (siehe später). 

```js
let x = 123.4;
let y = (2 + 5) * 12;
let z = "example";
	
// Hier verwenden wir die Methode Math.random()	
// JavaScript enthält viele Hilfsklassen und Methoden,
// mit denen wir viele Aufgaben direkt lösen können	
let number = Math.random();
```

Ausdrücken begegnen wir auch später im Zusammenhang mit 
Bedingungen in Fallunterscheidungen und Schleifen wieder. 

Einerseits ist ein Ausdruck z.B. etwas „kleines“ oder 
atomares wie die Zahl `8` und andererseits können mehrere
Ausdrücke miteinander kombiniert komplexere Ausdrücke 
ergeben wie z.B. `8 + 9` oder `(Math.random() + 8 - 4)` usw.
Dies alles wird durch die formale Grammatik einer
Programmiersprache festgelegt. In der praktischen 
Programmierung wird die Grammatik im Prinzip durch die
konkrete Erfahrung und Übung erlernt.
