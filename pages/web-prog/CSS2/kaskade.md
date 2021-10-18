import Callout from 'nextra-theme-docs/callout'

# Kaskade und Spezifizität

<Callout>
  **Dauer:** 30 Minuten

  **Themen:**
  - Todo

  **Ziele:** Einstieg ins Thema
</Callout>

Oft werden mehrere Stylesheets verwendet und es kann auch sein, dass die 
Selektoren verschiedener Regeln die gleichen Elemente auswählen. 
In diesen Fällen stellt sich die Frage, welche CSS-Regeln auf die 
betroffenen HTML-Elemente angewendet werden.

## Kaskade

Mit Kaskade (_cascading_, das „C“ in CSS) ist gemeint, dass die CSS-Regeln 
nacheinander angewendet werden, so wie sie in den eingebunden Stylesheets 
auftreten.

Dazu ein vereinfachter Merksatz:

> Bei gleichstarken Selektoren hat die Regel Vorrang, die als letztes in der 
> Reihenfolge der Anwendung ist.

Mit „gleichstark“ ist hier die _Spezifizität_ gemeint (mehr dazu unten). 
Die Reihenfolge der Anwendung wird durch die Anordnung der Regeln in 
CSS-Dateien oder Einbindung von Stylesheets durch link-Elemente im 
HTML-Dokument bestimmt.

<Callout type="warning">
Einfaches Beispiel siehe 
[ProgContent zu Kaskade](https://www.progcontent.com/css-kompakt/kaskade) 
oder Codepen.
</Callout>