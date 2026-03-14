# Plan: Reveal-React-Folien aus MDX-Vorlesungsnotizen

## Zusammenfassung

Die Vorlesungsnotizen unter `content/` bleiben die Single Source of Truth.
Neue Folien fuer `prog`, `web-prog` und `mobile` werden nicht als statische
HTML-Artefakte unter `public/decks` generiert und versioniert, sondern als
eigene App-Route mit Reveal React aus denselben MDX-Inhalten gerendert.

Die bestehenden handgebauten Decks unter `public/decks/` bleiben als
eigenstaendige, versionierte Sonderfaelle bestehen.

## Architekturentscheidung

- Reveal bleibt die Praesentations-Engine.
- Fuer neue, aus `content/` abgeleitete Folien ist die Standard-Auslieferung
  eine App-Route, nicht `public/decks`.
- `content/` bleibt die einzige fachliche Quelle.
- Generierte Deck-Dateien werden nicht in Git versioniert.
- Bestehende statische Reveal-Decks werden nicht migriert, solange kein
  konkreter Nutzen entsteht.

## Zielbild

- Normale Inhaltsseite und Folienansicht greifen auf dieselbe MDX-Datei zu.
- Die Folienansicht lebt in einer separaten Slides-Route.
- Reveal wird nur im Slides-Pfad geladen.
- Die normale Nextra-Seite bleibt ohne Reveal-Ballast nutzbar.
- Es gibt einen einfachen Komfort-Workflow:
  - Inhaltsseite zum Nachlesen
  - Deck-Ansicht zum Vortragen
  - beides aus derselben Quelle

## MDX-Markierung

### Grundprinzip

Die Markierung soll leichtgewichtig sein. Der Standardfall wird ueber Regeln
abgedeckt, nur Ausnahmen werden explizit markiert.

### Frontmatter

Pro MDX-Seite gibt es optionales Deck-Frontmatter:

- `slides: true`
- `slideTitle: ...`
- `slideTheme: ...`
- `titleSlide: true`

Bedeutung:

- `slides: true` aktiviert die Seite als Deck-Quelle.
- `slideTitle` setzt optional einen vom H1 abweichenden Deck-Titel.
- `slideTheme` ist fuer spaetere Layout-Varianten reserviert.
- `titleSlide: true` erzeugt bewusst eine Titelfolie.

### Standard-Aufteilung

- `#` bleibt der Titel der Inhaltsseite.
- `##` startet standardmaessig eine neue Folie.
- `###` bleibt innerhalb der aktuellen Folie.

### Zusaetzliche Marker

Nur fuer Ausnahmen:

- `<SlideOnly>...</SlideOnly>`
- `<DocsOnly>...</DocsOnly>`
- `<SlideLead>...</SlideLead>`
- `<SlideBreak />`

Bedeutung:

- `SlideOnly` erscheint nur im Deck.
- `DocsOnly` erscheint nur auf der normalen Inhaltsseite.
- `SlideLead` markiert einen bewusst hervorgehobenen Lead-Satz auf einer Folie.
- `SlideBreak` erzwingt innerhalb eines `##`-Abschnitts eine weitere Folie.

### Kein Speaker-Notes-Modell in v1

Speaker Notes werden in der ersten Ausbaustufe nicht eingefuehrt. Der Fokus
liegt zunaechst auf sichtbaren Folien und sauberer Inhaltsprojektion.

## Projektion von MDX nach Folien

### Automatisch sichtbar

Folgende Inhalte duerfen standardmaessig sichtbar auf Folien landen:

- `##`-Ueberschrift als Folientitel
- kurze Listen
- kurze Codebloecke
- kompakte Tabellen
- `SlideOnly`
- `SlideLead`

### Standardmaessig nicht sichtbar

Folgende Inhalte sollen nicht ungefiltert auf Folien erscheinen:

- laengere Fliesstext-Abschnitte
- ausfuehrliche didaktische Erklaerungen
- laengere Beispieltexte
- Inhalte in `DocsOnly`

### Regel fuer Fliesstext

- Ein kurzer Absatz direkt unter `##` darf als Lead uebernommen werden, wenn er
  kurz genug ist.
- Weitere Fliesstext-Abschnitte bleiben standardmaessig nur in der Doku, sofern
  sie nicht explizit fuer Slides markiert werden.

### Regel fuer Callouts

- Meta-Callouts wie `Dauer` und `Ziel` werden nicht 1:1 als Folieninhalt
  gerendert.
- Aus solchen Callouts darf optional kompakte Meta-Information fuer die
  Titelfolie oder eine Agenda-Folie abgeleitet werden.
- Kurze fachliche Warn- oder Info-Callouts duerfen sichtbar werden, wenn sie
  kompakt sind.
- Lange Callouts bleiben nur in der Doku.

### Regel fuer Titelfolie

- Eine Titelfolie wird nur erzeugt, wenn `titleSlide: true` gesetzt ist.
- Ohne diesen Marker startet das Deck direkt mit der ersten `##`-Folie.

## Routen- und Komponentenmodell

- Die Slides-Ansicht lebt in einer eigenen App-Route, z. B. unter
  `/slides/[...path]`.
- Die Route rendert Reveal React und ein eigenes Slides-Layout ohne
  Website-Navigation.
- Die normale Nextra-Seite behaelt ihr bestehendes Layout.
- Reveal-spezifische Komponenten und Styles werden nur in der Slides-Route
  geladen.

## Autoren-Workflow

Beispiel fuer den gewuenschten Ablauf bei einer Vorlesung:

1. Die fachlichen Inhalte werden in `content/.../*.mdx` gepflegt.
2. Die Seite bekommt bei Bedarf Deck-Frontmatter wie `slides: true`.
3. `##`-Ueberschriften strukturieren die spaeteren Folien.
4. Nur bei Bedarf werden `SlideOnly`, `DocsOnly`, `SlideLead` oder
   `SlideBreak` eingesetzt.
5. Die Folien werden ueber die Slides-Route im Browser geoeffnet.
6. Aenderungen im Content sind sofort auch in der Folienansicht sichtbar.

## Pilot und Tests

Als erste Pilotseite eignet sich:

- `content/prog/03-type-op-func/01-typen.mdx`

Zu pruefen:

- `slides: true` aktiviert die Deck-Erzeugung.
- `##`-Abschnitte werden zu einzelnen Folien.
- Lange Abschnitte werden nicht ungefiltert uebernommen.
- `SlideOnly` und `DocsOnly` landen nur in der jeweils vorgesehenen Ansicht.
- Meta-Callouts mit `Dauer` und `Ziel` erscheinen nicht als textlastige Folien.
- Die normale Nextra-Seite bleibt vollstaendig lesbar.

## Bewusst festgelegte Defaults

- Reveal bleibt die Engine.
- App-Route ist der neue Standard fuer generierte Folien.
- `content/` bleibt die einzige fachliche Quelle.
- Generierte Folienartefakte werden nicht versioniert.
- Handgebaute Decks unter `public/decks/` bleiben bestehen.
- Die MDX-Markierung ist leichtgewichtig.
- `##` startet standardmaessig eine neue Folie.
- Speaker Notes sind in v1 nicht Teil des Modells.
- Titelfolie nur mit explizitem Marker.
- Sichtbare Folieninhalte werden kuratiert statt blind uebernommen.

## Noch offen fuer die naechste Planungsrunde

- exakte URL-Struktur der Slides-Route
- konkrete Namensgebung und Implementierung der Slide-Hilfskomponenten
- Verhalten fuer Seiten mit mehreren Unterdateien oder ganzen Kapitel-Decks
- genaue Darstellung von Meta-Infos wie Dauer, Ziel und Agenda
- ob spaeter Speaker Notes doch als zweiter Ausbauschritt ergaenzt werden
