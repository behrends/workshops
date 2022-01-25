import Callout from 'nextra-theme-docs/callout'

# Fallunterscheidungen (`switch`)

<Callout>
  **Dauer:** 20 Minuten

  - `switch` als Alternative zu `if/else if/else`

  **Ziel:** Es gibt oft mehrere Konzepte der Programmierung, die für eine Lösung geeignet sind
</Callout>

Es gibt Situationen, in denen mehrere Fälle unterschieden werden 
müssen. Mit `if … else if … else …` kann dies recht 
unübersichtlich werden:

```js
let a = 13, b = 4;	
let op = prompt("Welche Rechenoperation?");
if(op === "+") {
    console.log(a + b);
} else if(op === "-") {
  console.log(a - b);
} else if(op === "*") {
  console.log(a * b);
} else if(op === "/") {
  console.log(a / b);
} else if(op === "%") {
  console.log(a % b);
} else {
  console.log(`Operator ${op} nicht unterstützt`);
}
```

In solchen Situation stellt `switch` gelegentlich eine besser 
lesbare Alternative dar:

```javascript
let a = 13, b = 4;	
let op = prompt("Welche Rechenoperation?");
switch(op) {
  case "+":
    console.log(a + b);
    break;
  case "-":
    console.log(a - b);
    break;
  case "*":
    console.log(a * b);
    break;
  case "/":
    console.log(a / b);
    break;
  case "%":
    console.log(a % b);
    break;
  default:
    console.log(`Operator ${op} nicht unterstützt`);
}
```

Der Code ist insgesamt etwa gleich lang und ergibt hier in 
beiden Beispiel dasselbe Ergebnis. Dennoch finden manche,
dass `switch` oft klarer strukturiert ist als verschachtelte
`if/else if/else`-Ausdrücke. Dadurch entsteht durch `switch`
gelegentlich Code, der einfacher zu lesen ist als ein Ansatz
mit `if/else if/else`. 

<Callout type="warning">
**Bemerkungen**

Grundsätzlich lassen sich alle Verzweigungen und 
Fallunterscheidungen mit `if/else if/else` ausdrücken.  
`switch` stellt lediglich eine Alternative dar, die in
manchen Situationen nützlich sein kann.

Ein `switch` funktioniert nur in bestimmten 
Situationen, nämlich wenn für einen Ausdruck bzw.
eine Variable nur die Gleichheit überprüft wird.

`switch` gibt es in einigen Programmiersprachen.

Mit `switch` sehen wir ein Beispiel dafür, dass es in
Programmiersprachen oftmals mehrere Möglichkeiten gibt,
etwas in Code auszudrücken.
</Callout>


Allerdings funktioniert `switch` nur in bestimmten Situationen, 
nämlich wenn für einen Ausdruck bzw. eine Variable nur die 
Gleichheit mit verschiedenen Werten überprüft wird. 

Die Syntax eines `switch`-Ausdrucks sieht im Allgemeinen so aus:

```javascript
switch( ...Auswahlausdruck... ) {
  case Auswahlkonstante:
    // Anweisung
    // ⋮
    // Anweisung
    break;
  case Auswahlkonstante:
    // Anweisung
    // ⋮
    // Anweisung
    break;
  // ⋮
  default:
    // Anweisung
    // ⋮
    // Anweisung
    break;
}
```

Der `Auswahlausdruck` zu Beginn des `switch` wird oft durch 
den Inhalt einer Variablen vorgegeben.

Für die `Auswahlkonstanten` in den `case`-Teilen 
wird dann ein konkreter Wert für die im `switch`
angegebene Variable abgefragt. Hier wird ein Test 
auf Gleichheit durchgeführt, allerdings ohne den 
Vergleich hinzuschreiben.

Der `Auswahlausdruck` wird ausgewertet, sein Wert 
wird unter den vorhandenen `Auswahlkonstanten`
gesucht. Die Anweisungen unmittelbar nach der 
entsprechenden Auswahlkonstante werden bis zum 
nächsten `break` ausgeführt.

Die Anweisungen werden fortlaufend ausgewertet 
(„_fall-through“_)!
    
Daher Vorsicht: `break` nicht vergessen!

Es können ein oder mehrere `case`-Blöcke angegeben 
werden. Es kann höchstens einen `default` Block 
geben (analog zu else in Verzweigungen), der aktiv
wird, wenn keine der `Auswahlkonstanten` dem
`Auswahlausdruck` gleicht.

Ein `switch` funktioniert nur in bestimmten 
Situationen, nämlich wenn für einen Ausdruck bzw.
eine Variable nur die Gleichheit überprüft wird.

Jedes `switch` kann auch durch `if/else if/else`
ersetzt werden — aber nicht umgekehrt.

`switch` ist also sozusagen „schwächer“ oder
spezieller als `if/else if/else`. 

<Callout type="warning">
Beispiele in replit.com zeigen, damit `switch`
in verschiedenen Situation nachvollzogen werden 
kann (`case` zusammenfassen, `break`, 
„_fall-through_“, usw.).
</Callout>