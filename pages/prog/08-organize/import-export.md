import Callout from 'nextra-theme-docs/callout'

# exports und imports in JavaScript

<Callout>
  **Dauer:** 30 Minuten
  
  **Ziel:** import und export für Code-Organisation
</Callout>

**Vorbemerkung:** Funktioniert (noch) nicht in
replit.com, das im Februar 2022 noch NodeJS Version
12 verwenden. Unterstützt wird dies erst seit NodeJS 
Version 14.

JavaScript hat seit ECMAScript 2015 eine eigene 
Syntax für import- und export-Anweisungen, die 
etwas leichter als CommonJS mit `require` zu verwenden 
ist. Sie ist außerdem der offizielle in Standard in
JavaScript wohingegen CommonJS (`require`) nur 
in NodeJS unterstützt wird.

Die Syntax von import und export in JavaScript
sieht ähnlich aus wie die von CommonJS, hat aber 
auch Ergänzungen wie z.B. `export default`.

Um import/export in NodeJS verwenden zu können,
muss in `package.json` folgendes eingetragen werden:

```
// in package.json hinzufügen:
"type": "module"
```

(Es gibt auch andere Wege, import/export in NodeJS
einzusetzen, wie [in der NodeJS-Dokumentation beschrieben](https://nodejs.org/api/esm.html#enabling).)

Nun kann z.B. in einer Datei `util/computations.js`
etwas exportiert werden:

```js
// in util/computations.js
export function test1() { return 'TEST1'; };
export function test2() { return 'TEST2'; };
export default function test() { return 'TEST'; };

const myConstant = 1234;
export { myConstant };
```

Bei Funktionen kann also direkt vor `function`
mit `export` angezeigt werden, dass diese Funktion
exportiert werden soll. Pro Datei (bzw. Modul) kann
es höchstens eine `export default`-Anweisung geben. 

Im obigen Beispiel werden drei Funktionen exportiert.
Dies ist auch mit Klassen oder Konstanten möglich,
wobei die Konstanten zunächst initialisiert und 
dann exportiert werden müssen, wo oben in den
letzten zwei Zeilen zu sehen.

Importiert werden die „normalen“ Exports durch
Angabe der Namen in geschweiften Klammen (hier
`test2` und `test3`). Der „Default“-Export kann 
ohne geschweifte Klammern angegeben werden 
(hier ist dies `test`):

```js
// z.B in index.js importieren:
import test, { test1, test2, myConstant } from './util/computations.js';

console.log(test());
console.log(test1());
console.log(test2());
console.log(myConstant);
```

<Callout type="error">
In React mit NextJS und in React Native werden 
bei `import`-Anweisungen die Dateiendungen `.js` 
weggelassen. In NodeJS hingegen müssen diese 
normalerweise angegeben werden.

Mit dem Zusatz 
`--experimental-specifier-resolution=node` kann 
NodeJS so gestartet werden, dass Dateiendungen bei 
`import`s automatisch hinzugefügt werden:

```
node --experimental-specifier-resolution=node index
```

Mehr dazu [in der Dokumentation zu NodeJS](https://nodejs.org/api/esm.html#esm_customizing_esm_specifier_resolution_algorithm).
</Callout>





<Callout type="warning">
**Vertiefendes Material**

- [Import/Export bei javascript.info](https://javascript.info/import-export)
- [Modules bei MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
</Callout>