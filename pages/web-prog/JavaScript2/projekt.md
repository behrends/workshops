import Callout from 'nextra-theme-docs/callout'

# Projekt

<Callout>
  **Dauer:** 45-60 Minuten bzw. restliche Zeit

  **Ziel:** 
  - Gruppen arbeiten am Projekt
  - Zeit für Fragen oder Hilfe
  - Anforderungen klären
</Callout>

Die restliche Zeit an diesem Termin wird für Gruppenarbeit genutzt. 

Falls Fragen auftauchen oder Hilfe benötigt wird, bitte beim Dozenten melden. 

Bei Bedarf können die MUST-HAVE-Anforderungen
der Projekte besprochen werden.

Nützliche Links:

- [Vanilla Web Projects - Quellcode für mehrere, kleine Webanwendungen ohne Frameworks](https://github.com/bradtraversy/vanillawebprojects)
- [htmldom.dev - Beispiele für verschiedene Use Cases mit der DOM-API](https://htmldom.dev/)

### Struktur in script.js

Am Anfang der Datei `script.js` werden für alle benötigten Elemente 
Konstanten initialisiert, denen mit `document.getElementById` die 
entsprechenden DOM-Elemente zugewiesen werden.

In Funktionen wird das Verhalten der Klick-Eventhandler definiert und
mit weiteren Funktionen können z.B. passende Template-Strings für 
neue HTML-/DOM-Elemente erzeugt werden. Durch diese Funktionen bleibt
der Code einigermaßen übersichtlich.

Für komplexere Anforderungen bzw. Code-Strukturen können in
JavaScript Klassen und Module mit weiteren Dateien verwendet werden.
