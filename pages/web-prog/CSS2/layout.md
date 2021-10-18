import Callout from 'nextra-theme-docs/callout'

# Layout mit FlexBox

<Callout>
  **Dauer:** 45 Minuten

  **Thema:** FlexBox: Ausrichtung und Anordnung

  **Ziel:** Seitenlayouts mit FlexBox gestalten
</Callout>

Mit dem sogenannten FlexBox-Layout kann für verschiedene Display-Größen (Laptop, 
Smartphone, usw.) eine automatisch passende Anordnung der HTML-Elemente erreicht 
werden.

Das FlexBox-Layout wird in einem HTML-Element mit dieser Eigenschaft aktiviert:

```css
display: flex;
```

Dies geschieht oft im einem `div`-Element, welches andere Elemente enthält 
und somit als „_Container_“-Element aufgefasst werden kann.

<Callout type="warning" emoji="👨🏻‍💻">
Interaktive Beispiele und Erläuterungen auf 
[ProgContent](https://www.progcontent.com/css-kompakt/layout)

&xrarr; Zusammen ein Beispiel mit drei unterschiedlich gefärbten Boxen
auf [Codepen](https://codepen.io/pen) entwickeln.
</Callout>

## Hauptachse mit `flex-direction` bestimmen

Die Anordnung der Elemente innerhalb des FlexBox-Layouts orientiert sich 
an der Ausrichtung der sogenannten **Hauptachse**. Diese verläuft 
standardmäßig horizontal von links nach rechts (`row` steht für Zeile). 

Die CSS-Eigenschaft `flex-direction` legt also in einer FlexBox durch 
den Wert `row` den Verlauf der Hauptachse von links nach rechts (zeilenartig).
Mit dem Wert `column` (d.h. mit `flex-direction: column;` wird ein 
vertikales Layout von oben nach unten bestimmt (`column` steht für Spalte).

<Callout type="warning">
Verlauf der Haupt- und Querachse mit `flex-direction`, `justify-content` 
und `align-items` am Whiteboard darstellen.
</Callout> 

## Anordnung mit `justify-content` und `align-items`

Mit den Eigenschaften `justify-content` und `align-items` kann die 
konkrete Anordnung der Elemente bestimmt werden für 

- die Hauptachse (`justify-content`) und 
- die Querachse (`align-item`)

Zentriert werden Elemente jeweils mit dem Wert `center`.

Weitere mögliche, relevante Werte:

- Hauptachse: `justify-content: center | space-between | space-around | space-evenly | flex-start | flex-end | …`
Querachse: `align-items: center | flex-start | flex-end | …`

<Callout type="warning">
Die verschiedenen Werte können z.B. direkt hier im Browser 
ausprobiert werden: [flexbox.tech](https://flexbox.tech/).
</Callout> 

## Umbrüche mit `flex-wrap`

Mit `flex-wrap` kann ein automatischer Umbruch der enthaltenen Elemente auf 
die nächste Zeile bzw. Spalte erreicht werden:

```css
flex-wrap: wrap;
```

## Weiteres zu FlexBox 

Wir haben oben die wichtigsten Eigenschaften des FlexBox-Layouts besprochen:

- Aktivierung mit `display: flex;`
- Ausrichtung der Hauptachse mit `flex-direction: …;`
- Anordnung auf der Hauptachse mit `justify-content: …;`
- Anordnung auf der Querachse mit `align-items: …;`
- Umbrüche mit `flex-wrap: wrap;`

Mehr zu FlexBox im Mozilla Developer Network (MDN) 
[hier](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) und 
[hier](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout).
