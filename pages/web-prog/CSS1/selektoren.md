import Callout from 'nextra-theme-docs/callout'

# Selektoren

<Callout>
  **Dauer:** 30 Minuten

  **Themen:**
  - Elementselektoren
  - Mehrerer Selektoren in einer Regel
  - `id`- und `class`-Selektoren
  - Kombination von Selektoren

  **Ziele:** Beispielhafte Selektoren kennenlernen
</Callout>

CSS-Regeln haben grundlegend diesen Aufbau:

```css
selector {
  /* hier stehen die Deklarationen der Regel */
  declaration1;
  declaration2;
  /* usw. */
}
```

## Elementtyp bzw. Tagname

Wie bereits im Beispiel gesehen, kann der Name des
Elements bzw. Tags direkt als Selektor verwendet werden:

```css
h1 {
  color: red;
  text-decoration: underline;
}
```

Dadurch wird auf **alle** `h1`-Elemente diese Regel 
angewendet.

Allgemeine Form:

```css 
elementname { 
  /* Deklarationen dieser Regel */
}
```

## Mehrere Selektoren anwenden

Mehrere Selektoren werden durch eine Art „Aufzählung“ 
(durch Komma getrennt) angewendet:

```css
selector1, selector2 /* , usw. ... */ {
  /* Deklarationen dieser Regel */
}
```

Diese Regel betrifft dann **alle* aufgezählten Elemente,
z.B. alle Überschriften der Art `h1`, `h2` und `h3`:

```css
h1, h2, h3 {
  color: red;
}
```

## id-Attribute

In einem HTML-Dokument sollten id-Attributwerte eines 
Elements eindeutig sein. Um genau dieses Element für eine 
CSS-Regel zu selektieren, kann ein id-Selektor eingesetzt 
werden:

```css
#idval {
  /* Deklarationen dieser Regel */
}
```

Haben wir also ein z.B. `button`-Element mit einem 
`id`-Attribut:

```html
<button id="my_button">Suche</button>
```

Dann dieser Button (und zwar nur genau dieser Button) 
z.B. so eine blaue Hintergrundfarbe erhalten:

```css
#my_button {
  background-color: blue;
}
```

## class-Attribute

Ähnlich wie `id`-Attribute gibt es für `class`-Attribute
die Möglichkeit, alle HTML-Elemente mit dem gleichen Wert
im `class`-Attribut zu stylen:

```css
.classval {
  /* Deklarationen dieser Regel */
}
```

```
Beispiel in der Wetter-App: 
Rahmen bzw. border für mehrere Orte mit class
```

```html
<div class="weather_location">
  ...
</div>
<div class="weather_location">
  ...
</div>
<!-- usw. >
```

Hierfür würde sich folgende CSS-Regel eignen:

```css
.weather_location {
  border: 1px solid silver;
}
```

## Kombination von Selektoren

CSS stellt eine Art „Grammatik“ dar, sodass verschiedene
Selektoren durch die gegebene Syntax miteinander
verknüpft werden können.

So könnten beispielsweise alle `p`-Elemente mit einem 
class-Attributwert `note` ausgewählt werden:

```css
p.note {
  /* Deklarationen dieser Regel */
}
```

<Callout type="warning">
Auch bei Selektoren gilt, dass wir in diesem
Workshop nur einige Beispiele besprechen. 
Im Laufe des Projekts wird ggf. die Anwendung 
weiterer Selektoren erlernt.
</Callout>

[Mehr zu Selektoren auf Prog Content](https://www.progcontent.com/css-kompakt/selektoren)