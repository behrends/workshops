import Callout from 'nextra-theme-docs/callout'

# Reguläre Ausdrücke (in JavaScript)

<Callout>  
  Dauer: 20 Minuten

  - Reguläre Ausdrücke können Textmuster überprüfen
  - Reguläre Ausdrücke gibt es in fast allen Programmiersprachen

  **Ziel:** Textstrukturen mit regulären Ausdrücken erkennen
</Callout>

In der Programmierung kommt es häufig vor,
dass Text (d.h. Strings) auf bestimmte 
Strukturen oder Muster überprüft werden muss.
Denkbar sind verschiedene Situationen:

- Text darf nur Buchstaben des lateinischen Alphabets und/oder Ziffern enthalten
- E-Mail-Adressen haben ein bestimmtes Format
- Passwörter bestimmter Länge sollen aus Ziffern, Sonderzeichen und aus Groß- und Kleinschreibung bestehen
- usw.

Anstatt einen String mit komplexen 
`if`-Anweisungen auf ein bestimmtes Muster
zu testen, ist es oft praktischer, sogenannte
_reguläre Ausdrücke_ (_regular expressions_)
zu verwenden.

Reguläre Ausdrücke haben eine eigene Grammatik
und sind ein Konzept, das unabhängig von einer
Programmiersprache existiert. JavaScript hat 
wie einige andere Sprachen eine fest integrierte 
Unterstützung für reguläre Ausdrücke.

Wir betrachten hier nur ein paar Beispiele für
reguläre Ausdrücke in JavaScript, um einen
ersten Eindruck zu geben.

In JavaScript wird ein regulärer Ausdruck
zwischen Schrägstrichen definiert:

```
/ regulärer Ausdruck /;
```

Folgender regulärer Ausdruck beschreibt
Text, der mindestens eine Ziffer enthält:

```js
const oneDigit = /[0-9]/;
```

Reguläre Ausdrücke haben eine Funktion `test()`,
mit der Strings überprüft werden können, ob sie
zum regulären Ausdruck passen. `test()` liefert
`true` für passende Strings und ansonsten `false`:

```js
const oneDigit = /[0-9]/;
oneDigit.test('keine Ziffer...'); // false
oneDigit.test('Eine Ziffer 1'); // true
```

Der reguläre Ausdruck `[0-9]` bedeutet hier,
dass ein passender String mindestens eine Ziffer
zwischen `0` und `9` enthalten muss.

Reguläre Ausdrücke bieten viele Möglichkeiten,
passende Muster für Textwerte zu definieren.
Ein weiteres Beispiel eines regulären Ausdrucks,
der zu Strings passt, die nur aus Buchstaben
von A-Z in Groß- und Kleinschreibung und Ziffern
bestehen:

```js
const onlyCharsAndDigits = /^[A-Za-z0-9]+$/;
// passende Strings
onlyCharsAndDigits.test('111'); // true
onlyCharsAndDigits.test('passt'); // true
onlyCharsAndDigits.test('Hallo123passt'); // true

// Strings die nicht passen
onlyCharsAndDigits.test('passt nicht!'); // false
onlyCharsAndDigits.test('Hallo123passt nicht '); // false
```

Kommen im String Leerzeichen oder Sonderzeichen 
vor, dann passt der String also nicht zu diesem
regulären Ausdruck.

Erklärung von `/^[A-Za-z0-9]+$/`:

- `^` &xrarr; Anfang des Strings
- `[A-Za-z0-9]` &xrarr; kleine _oder_ große Buchstaben _oder_ Ziffern <br/> (`[ ]` beschreibt passende Zeichengruppen (_character class/set_))
- `+` &xrarr; ein oder mehrere Zeichen des vor dem `+` angegebenen Musters
- `$` &xrarr; Ende des Strings

Reguläre Ausdrücke stellen ein vielseitiges
und ausdruckstarkes Konzept dar. Zum Erlernen
und Ausprobieren sind die u.a. Links hilfreich.

<Callout type="warning">
**Vertiefende Ressourcen**

- [Abschnitt bei javascript.info](https://javascript.info/regular-expressions)
- [Reguläre Ausdrücke lernen: regexlearn.com](https://regexlearn.com/)
  - [Playground / Spielplatz](https://regexlearn.com/playground)
  - [Cheatsheet / Spickzettel](https://regexlearn.com/cheatsheet)
</Callout>

