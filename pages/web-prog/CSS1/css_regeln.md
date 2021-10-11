import Callout from 'nextra-theme-docs/callout'

# Aufbau von CSS-Regeln

<Callout>
  **Dauer:** 30 Minuten

  **Themen:**
  - CSS ist regelbasiert
  - CSS-Regeln bestehen aus Selektoren und Deklarationen
  - Kommentare in CSS

  **Ziele:** Aufbau von CSS-Regeln verstehen
</Callout>

Betrachten wir nochmals das bisherige Beispiel:

```css
h1 {
  color: red;
  text-decoration: underline;
}
```

Dieses Beispiel stellt eine von uns definierte CSS-Regel dar. Mit CSS werden 
beliebig viele **Regeln** definiert. Eine Regel beginnt mit einem **Selektor**
gefolgt von geschweiften Klammern, welche die gewünschten **Deklarationen**
dieser Regel enthalten:

```
selector {
  declaration1;
  declaration2;
  declaration3;
  ... usw. ...
}
```

## Deklarationen

Ein Block bestehend aus `{ ... }` beschreibt eine Regel, welche 
wiederum aus einzelnen Deklarationen besteht, die durch `;` 
voneinander getrennt werden.

Eine Deklaration wiederum hat folgende Form:

```
property: value;
```

Bestimmten Eigenschaften (`property` ) der Darstellung 
(z.B. die Schriftfarbe, `color`) werden gewünschte Werte 
(`value`) nach einem Doppelpunkt zugeordnet (z.B. die 
Farbe Rot bzw. `red`):

```
color: red;
```

<Callout type="warning">
Wir besprechen nur einige beispielhafte CSS-Eigenschaften.
Ähnlich wie bei HTML mit seinen Elementen und Attributen
ist in CSS ein gewisses „Vokabular“ an Eigenschaften und 
zugehörigen Werten zu lernen. Referenzen, Cheat Sheets und 
Suchmaschinen helfen, die passenden Eigenschaften zu finden.
</Callout>

## Selektoren

In einer Regel steht vor dem Block `{ ... }` ein Selektor,
der festlegt, welche Elemente im HTML-Dokuments durch diese Regel 
gestaltet werden sollen. 

In unserem Beispiel haben wir einen Elementselektor verwendet,
der lediglich aus dem Tagnamen `h1` besteht:

```css
h1 {
  color: red;
  text-decoration: underline;
}
```

Dadurch werden alle `h1`-Elemente (Überschriften erster Ordnung)
in roter Schriftfarbe und unterstrichen dargestellt.

```
In Codepen ein paar verschiedene Selektoren zeigen.
```

<Callout type="warning">
Wir werden heute noch in einer [späteren Lektion](selektoren) 
genauer auf Selektoren eingehen.
</Callout>

```
Aufbau von Regeln am Whiteboard festhalten:
```

![CSS Regel](/images/web-prog/regel.png)


## Kommentare in CSS

Kommentare in CSS werden von /* und */ umgeben:

```
/* einzeiliger Kommentar */
/* oder über
  mehrere
  Zeilen
  hinweg
*/
```

[Mehr zu CSS-Regeln bei Prog Content](https://www.progcontent.com/css-kompakt/regeln).
