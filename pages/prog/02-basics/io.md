import Callout from 'nextra-theme-docs/callout'

# Ein- und Ausgabe

<Callout>
  **Dauer:** 20 Minuten

  - Ausgaben erzeugen
  - Eingaben für Programme

  **Ziel:** Programme für Berechnungen schreiben
</Callout>

Am Anfang schreiben wir zunächst nur kleinere Programme. Damit 
aber etwas Sinnvolles oder Interessantes berechnet werden kann, 
benötigen wir Mechanismen, um vom Benutzer etwas zu erfragen 
(Zahlen oder Texte) und die berechneten Werte auszugeben. 

## Ausgaben

Um in JavaScript etwas auszugeben (als Text auf dem Bildschirm), 
verwenden wir meistens eine Hilfsmethode:

```js
console.log
```

`console.log` ergänzt die Ausgabe um einen Zeilenumbruch, d.h. 
die nachfolgende Ausgabe erscheint auf der nächsten Zeile.

Mit dieser Methode kann im Prinzip „alles“ ausgeben werden 
(Text bzw. Strings, Zahlen, Ausdrücke, Variableninhalte, 
Rückgabewerte von Funktionen, usw.).

Bemerkung: Zur console-API gibt es einen „living standard“, der 
noch viel mehr Möglichkeiten mit console beschreibt, sodass viele 
Browser und auch NodeJS diese implementieren können (siehe 
[console.spec.whatwg.org](https://console.spec.whatwg.org))

Beispiel:

```js
let x = 123;	
console.log(x);
console.log(456);
console.log(456 + 777);
	
console.log("Hallo, wie geht es Dir?");	
console.log("Gut, danke!");
```

###  Ausgabe formatieren

Mit speziellen „ANSI escape codes“ kann die Ausgabe u.a. farbig 
gestaltet werden.

Mit `\033` (oder hexadezimal `\x1b`) wird eine „Escape-Sequenz“ 
eingeleitet, auf die dann nach `[` verschiedene „Anweisungen“ zur 
Formatierung folgen.

```js	
const orange = "33";	
const underline = "4";
const format = "\033[" + orange + ";" + underline + "m";	
console.log(format + "Hello orange underline!" + "\033[0m");
 
console.log("wieder ohne Formatierung");
```

Dies ist ein überraschend mächtiges Konzept, mit dem sich nicht 
nur optische Formatierungen von Text darstellen lassen, sondern 
das auch weitere Möglichkeiten bietet wie z.B. die Cursor-Position 
zur Ausgabe zu setzen.

Dadurch werden rein textbasierte Anwendungen komplexer und 
interessanter. Mehr dazu auf folgenden Webseiten:

Allgemeine Erläuterung und Funktionsweise: \
[notes.burke.libbey.me/ansi-escape-codes/](https://notes.burke.libbey.me/ansi-escape-codes/)

Farbsteuerung: \
[stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences](https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences)

Liste der escape codes: \
[gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797)

Hilfsbibliothek für farbige Ausgabe im Terminal:
[github.com/alexeyraspopov/picocolors](https://github.com/alexeyraspopov/picocolors)

## Eingabe mit `prompt`

Mit `prompt` steht in JavaScript im Browser und in 
[replit.com](https://replit.com) (leider nur in `index.js`) 
eine Methode zur Verfügung, die Text von der Tastatur einliest.

```js
let name = prompt("Name eingeben");
```

`Name eingeben` erscheint und es kann etwas per Tastatur 
eingegeben werden.

Die Ausführung des Programms hält an, Text kann eingegeben werden 
und nach Drücken von Enter/Return wird der Text der Variablen 
zugewiesen (im Beispiel oben `name`).

Dies funktioniert leider nicht in NodeJS — aber es gibt z.B. 
`readline-sync`, siehe unten.

Wie kann der Text in eine ganze Zahl für Berechnungen 
umgewandelt werden?

```js
let num = prompt("Bitte eine Zahl eingeben");
num = parseInt(num); // wandelt Text in Zahl um
```

Achtung: wird keine Zahl eingegeben, dann muss dies evtl. mit 
`if`  oder `try...catch` abgefangen werden (später), sonst 
ergibt `parseInt` den Wert `NaN`. Es gibt auch `parseFloat` 
für Gleitkommazahlen. 


## Eingabe in NodeJS

In NodeJS funktioniert `prompt` leider nicht. 

Die Eingabe lässt sich sicherlich auch mit der API von NodeJS 
umsetzen. Bequemer lässt sich die Eingabe jedoch durch eine 
Hilfsbibliothek wie z.B. `readline-sync` in NodeJS realisieren.

`readline-sync` kann auch in [replit.com](https://replit.com) 
eingebunden werden, damit die Eingabe außerhalb von `index.js` 
funktioniert.

Alle Infos zu `readline-sync`: 
[github.com/anseki/readline-sync](https://github.com/anseki/readline-sync)

