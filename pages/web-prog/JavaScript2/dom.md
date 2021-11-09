import Callout from 'nextra-theme-docs/callout'

# Document Object Model

<Callout>
  **Dauer:** 30 Minuten

  **Themen:**
  - `script`-Tag
  - DOM &mdash; _document object model_

  **Ziel:** Mit JavaScript im Browser programmieren
</Callout>

<Callout type="warning">
Die meisten Konzepte werden in Form von Live-Coding gezeigt.

Hierzu wird die Beispiel-App im aktuellen Stand ohne JavaScript
so weiterentwickelt, dass die App mit JavaScript dynamisch wird
(Elemente hinzufügen, evtl. auch Daten mit `fetch` laden)
</Callout>

Verwendete Methoden der DOM-API:

- `document.getElementById()` (bestimmte Elemente finden und einer Variablen zuweisen)
- `document.createElement()` (neue Elemente erzeugen, diese sind dann noch nicht sichtbar)
- `element.appendChild()` (neues Element, das durch `createElement` erzeugt wurde, dem DOM/HTML hinzufügen)
- `element.innerHTML = ...` (HTML-Inhalt eines Elements festlegen)
- `element.classList.add()` (einem Element eine (CSS-)Klasse hinzufügen)
- `element.value` (auf den Wert einer Eingaben oder Auswahl im Formularelementen zugreifen)
- `element.setAttribute()` (Wert für ein Attribut eines Elementes setzen)

Eventuell separate, kurze Einleitung zum `script`-Tag?