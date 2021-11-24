import Callout from 'nextra-theme-docs/callout'

# Document Object Model

<Callout>
  **Dauer:** 30 Minuten

  **Themen:**
  - DOM &mdash; _document object model_

  **Ziel:** Grundverständnis vom DOM erhalten
</Callout>

Verwendete Methoden der DOM-API:

- `document.getElementById()` (bestimmte Elemente finden und einer Variablen zuweisen)
- `document.createElement()` (neue Elemente erzeugen, diese sind dann noch nicht sichtbar)
- `element.appendChild()` (neues Element, das durch `createElement` erzeugt wurde, dem DOM/HTML hinzufügen)
- `element.innerHTML = ...` (HTML-Inhalt eines Elements festlegen)
- `element.classList.add()` (einem Element eine (CSS-)Klasse hinzufügen)
- `element.value` (auf den Wert einer Eingaben oder Auswahl im Formularelementen zugreifen)
- `element.setAttribute()` (Wert für ein Attribut eines Elementes setzen)
- `element.addEventListener('click', function)` (Mit einer Funktion das Verhalten beim Klicken eines Element definieren)
