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
