import Callout from 'nextra-theme-docs/callout'

# Nützliche und interessante Bibliotheken

<Callout>
  **Dauer:** 30 Minuten
  
  **Ziel:** Vorstellung einiger Bibliotheken, die 
  weitere Möglichkeiten aufzeigen
</Callout>

Die hier vorgestellten Bibliotheken könnten für das 
Projekt nützlich sein und dürfen verwendet werden.

<Callout type="warning">
In replit.com können Bibliotheken im Bereich
_Packages_ (das Würfel-Symbol) gesucht und 
dem Projekt hinzugefügt werden.

In NodeJS werden Bibliotheken mit dem 
Terminal-Befehl `npm install` für das Projekt 
installiert. Hierbei muss der Name der Bibliothek 
angegeben werden, z.B. `node-localstorage` für 
`localStorage`:

```
npm install node-localstorage
```
</Callout>

## Ausgabe im Terminal

In der textbasierten Ausgabe im Terminal
lassen sich auch Farben definieren, siehe
auch die [Lektion zur Ausgabe](/prog/02-basics/io#ausgabe-formatieren).

Mit einer Hilfsbibliothek wie z.B. 
[PicoColors](https://github.com/alexeyraspopov/picocolors)
können Farben relativ leicht in der Textausgabe
gesetzt werden. Dazu ein Beispiel (zuvor muss
natürlich PicoColors installiert werden):

```js
const pc = require('picocolors');

console.log(`${pc.red("Hallo")} und ${pc.green("Willkommen!")}`);
```

Dies ergibt die folgende Ausgabe:

![Pico Colors Beispiel](/images/prog/pico_colors.png)

Infos zur Verwendung: https://github.com/alexeyraspopov/picocolors

Alternativen:

- https://github.com/chalk/chalk
- https://github.com/lukeed/kleur
- https://github.com/Marak/colors.js
- https://github.com/jorgebucaran/colorette
- und bestimmt gibt es noch weitere…

## Eingabe im Terminal

Die Eingabe mit `prompt` funktioniert nur 
in replit.com und nicht in Projekten, die auf
dem eigenen Rechner mit NodeJS umgesetzt werden.
Außerdem ist `prompt` auf die Eingabe von 
Text beschränkt. 

Um für die Eingabe mehr Möglichkeiten zu erhalten,
kann dem Projekt eine zusätzliche Bibliothek 
als Abhängigkeit hinzugefügt werden.

### readline-sync

Die Bibliothek `readline-sync` bietet nützliche
Erweiterungen zur Eingabe wie z.B. die Auswahl von
Menüpunkten und Default-Werte. 

**Außerdem kann `readline-sync` besser mit
der Eingabe von Umlauten und anderen Sonderzeichen
umgehen als `prompt`.**

Infos zur Verwendung: https://github.com/anseki/readline-sync


### prompts

Mit `prompts` gibt es noch mehr Möglichkeiten
als mit `readline-sync`. Im Gegensatz zu 
`readline-sync` ist der Umgang mit `prompts` 
im Programmcode asynchron, sodass Promises bzw.
`async/await` zum Einsatz kommen. Hierdurch
ist die Verwendung von `prompts` eventuell 
komplexer und schwerer zugänglich als 
`readline-sync`.

Infos zur Verwendung: https://github.com/terkelg/prompts

Eine Alternative zu `prompts` ist 
`inquirer`: https://github.com/SBoudrias/Inquirer.js 
(Verwendung ist auch asynchron).

## Weitere Möglichkeiten im Terminal  

Im Terminal sind viele weitere Dinge sind möglich,
wie diese Bibliotheken veranschaulichen:

- https://github.com/cronvel/terminal-kit
- https://github.com/vadimdemedes/ink
- https://github.com/Yomguithereal/react-blessed

## Hilfsbibliotheken in JavaScript

In JavaScript-Projekten wird sowohl in 
Webanwendungen für den Browser als auch in
NodeJS häufig die Hilfsbibliothek 
[Lodash](https://lodash.com) eingesetzt. 
Mit Lodash stehen einige nützliche Funktionen
bereit, z.B. `sample` um zufällige Elemente
eines Arrays zu erhalten:

```js
const _ = require("lodash");

let names = ['Alice', 'Bob', 'Charlie', 'Donna',
  'Eva', 'Frank', 'Geri', 'Harry', 'John'];

let randomName = _.sample(names);

console.log(randomName);

// --> zufälliger Name wird ausgegeben 
```

Infos zu Lodash: https://lodash.com

Es finden sich viele weitere Hilfsbibliotheken
im Umfeld von JavaScript, z.B. für den Umgang
mit Datumswerten:

- https://date-fns.org/
- https://momentjs.com/ oder https://day.js.org (gleiche API wie momentjs aber kompakter)
- https://moment.github.io/luxon/

Link-Sammlung zu JavaScript („Awesome List“): 
https://github.com/sorrycc/awesome-javascript