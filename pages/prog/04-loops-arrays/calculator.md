import Callout from 'nextra-theme-docs/callout'

# Übung (Taschenrechner)

<Callout>
  **Dauer:** 90 Minuten \
  davon 20 Minuten Besprechung/Diskussion

  **Ziel:** Übung (fast) aller bisherigen Konzepte
</Callout>

<Callout type="warning">
Kurz zeigen, wie Zahlen mit `prompt` eingelesen werden. 
Dazu sind die JavaScript-Funktionen `parseInt` und
`isNaN` nützlich.

```js
const numberInput = prompt("Bitte Zahl eingeben");
const tmpNumber = parseInt(numberInput);
if(isNaN(tmpNumber)) {
  console.log("Bitte Zahl eingeben!");
} else {
  console.log("Ok, Zahl eingelesen.");
}
```
</Callout>


Implementieren Sie in [replit.com](https://replit.com) eine Art 
Taschenrechner. Dadurch sollen die bisher besprochenen Konzepte 
wie Variablen, Datentypen (`number`, `string`), Operatoren, 
Funktionen und `if/else if/else` geübt werden.

Folgendes ist umzusetzen:

- Eingabe von zwei Zahlen durch Eingabeaufforderung (prompt)
- Überprüfung, dass die Zahlen gültig sind (z.B. mit `parseInt` und `isNaN`) und passende Fehlermeldung falls nicht
- Eingabe der gewünschten Rechenoperation (`+`,`-`,`*`,`/`,`%`)
- Überprüfung, dass die Rechenoperation gültig ist (`+`,`-`,`*`,`/`,`%`) und passende Fehlermeldung falls nicht
- Berechnung und Ausgabe des Ergebnis
- Code ggf. mit Funktionen strukturieren

Zunächst genügt es, wenn der Taschenrechner mit ganzen
Zahlen umgehen kann.

**Mögliche Zusatzaufgaben:**

- weitere Rechenoperationen (Exponent, Wurzel, usw.)
- Umgang mit Gleitkommazahlen ermöglichen
- wer Schleifen kennt: eine Abbruchbedingung für das Programm einbauen, z.B. eine Frage am Ende: "Soll noch etwas berechnet werden?"
- Es gibt zahlreiche denkbare Erweiterungen: mehrere Zahlen, formatierte Ausgabe, usw.