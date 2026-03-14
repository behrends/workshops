# Geschärfter v1-Plan für generierte Reveal-React-Folien aus `content`

## Zusammenfassung

Die Vorlesungsnotizen unter `content/` bleiben die Single Source of Truth.
Neue Folien für `prog`, `web-prog` und `mobile` werden nicht als statische
HTML-Dateien unter `public/decks` erzeugt, sondern als eigene App-Route mit
Reveal React direkt aus einzelnen MDX-Seiten gerendert.

Die bestehenden handgebauten Decks unter `public/decks/` bleiben unverändert
bestehen.

In v1 ist die Deck-Einheit genau eine MDX-Seite. Die Slides-URL folgt 1:1 dem
bestehenden Docs-Pfad. Die Projektion wird AST-basiert aus der Roh-MDX-Datei
erstellt, nicht aus dem kompilierten React-Baum. Speaker Notes, Kapitel-Decks,
Fragmente, vertikale Slides und PDF-spezifische Features sind bewusst nicht
Teil von v1.

## Öffentliche Autoren-Schnittstelle

### URL-Modell

- Aus `content/prog/03-type-op-func/01-typen.mdx` wird
  `/slides/prog/03-type-op-func/01-typen`.
- V1 unterstützt nur Decks pro einzelner MDX-Seite.
- Kapitelordner oder mehrere Unterseiten werden in v1 nicht zu einem Deck
  zusammengeführt.

### Frontmatter für Decks

Eine Seite erzeugt nur dann Folien, wenn im Frontmatter `slides: true` gesetzt
ist.

Zulässige v1-Felder:

- `slides: true`
- `titleSlide: true`
- `slideTitle: "..."` optional
- `slideDuration: "..."` optional
- `slideGoal: "..."` optional
- `slideTopics: ["...", "..."]` optional
- `slideTheme: "..."` optional, nur reserviert

Regeln:

- `titleSlide: true` erzeugt eine Titelfolie.
- Der Titel der Titelfolie kommt aus `slideTitle`, sonst aus dem H1.
- Meta-Chips auf der Titelfolie kommen ausschließlich aus `slideDuration` und
  `slideGoal`.
- `slideDuration`, `slideGoal` und `slideTopics` sind die einzige Quelle für
  diese Meta-Infos auf `slides: true`-Seiten.
- Manuell gepflegte Intro-Callouts mit `Dauer:` oder `Ziel:` vor dem ersten
  `##` sind auf `slides: true`-Seiten unzulässig.
- Manuell gepflegte Intro-Callouts mit Themen- oder Inhaltslisten vor dem ersten
  `##` sind auf `slides: true`-Seiten ebenfalls unzulässig.
- Wenn auf `slides: true`-Seiten vor dem ersten `##` einleitender Doku-Text
  nötig ist, muss er in `DocsOnly` stehen.

### Marker im MDX

Zulässige Marker:

- `<DocsOnly>...</DocsOnly>`
- `<SlideOnly>...</SlideOnly>`
- `<SlideLead>...</SlideLead>`
- `<SlideBreak />`

Semantik:

- `DocsOnly` ist überall im Seiten-Body erlaubt und rendert nur in der normalen
  Inhaltsseite.
- `SlideOnly`, `SlideLead` und `SlideBreak` sind nur innerhalb eines
  `##`-Abschnitts erlaubt.
- Jeder `##`-Abschnitt besteht aus einem oder mehreren Segmenten.
  Ein Segment beginnt am `##` oder direkt nach einem `SlideBreak` und endet am
  nächsten `SlideBreak` oder am nächsten `##`.
- Jedes Segment wird zu genau einer erzeugten Folie.
- `SlideBreak` startet ein neues Segment mit demselben `##`-Titel.
- Alle Auto-Regeln und Größenlimits gelten pro Segment neu.
- `SlideLead` ist höchstens einmal pro Segment erlaubt und muss vor dem ersten
  normalen sichtbaren Block dieses Segments stehen.
- Marker dürfen nicht ineinander verschachtelt werden.

Verhalten in der normalen Inhaltsseite:

- `DocsOnly` rendert normal.
- `SlideOnly` rendert nichts.
- `SlideLead` rendert wie ein normaler Absatz.
- `SlideBreak` hat keinen Effekt.

## Parsing-, Build- und Routenmodell

- Die Slides-Ansicht lebt in einer separaten Route
  `app/slides/[...slidePath]/page.jsx`.
- Die Route setzt `dynamicParams = false`, damit nur vorab validierte
  Slides-Routen erreichbar sind.
- Kandidaten für Slides-Routen kommen aus
  `generateStaticParamsFor('slidePath')`.
- Für jeden Kandidaten werden zwei Datenquellen verwendet:
  - `importPage(params.slidePath)` für Metadaten und das reguläre MDX-Modul
  - `getRouteToFilepath()` plus `fs.readFile(...)`, um die rohe MDX-Datei aus
    `content/` einzulesen
- Die Rohdatei wird AST-basiert geparst. V1 verwendet dafür direkt eine
  Parser-Pipeline auf MDX-Ebene, nicht die Traversierung des kompilierten
  React-Baums.
- Geplante direkte Abhängigkeiten für die Implementierung:
  - `unified`
  - `remark-parse`
  - `remark-mdx`
  - `remark-gfm`
  - `unist-util-visit`
  - `mdast-util-to-string`
- Eine gemeinsame Funktion `validateAndBuildSlides(...)` erhält:
  - Frontmatter/Metadaten
  - Content-Pfad
  - den geparsten MDX-AST
  und liefert:
  - `slides`
  - `warnings`
  - `errors`
  - `status: ok | warning | error`
- `generateStaticParams` nimmt nur Seiten mit `slides: true` und
  `status !== error` auf.
- Eine Seite ohne `slides: true` liefert unter `/slides/...` immer `404`.
- Eine Seite mit `slides: true`, aber `status === error`, wird nicht als
  Slides-Route erzeugt und erscheint in der Build-Ausgabe als Fehlerfall.

### Build- und Prüfverhalten

- Das Repo erhält drei klar getrennte Skripte:
  - `scripts/slides-check.mjs`
  - `npm run slides:check`
  - `npm run build:site`
  - `npm run build`
- `slides:check` läuft über alle `slides: true`-Seiten und bricht hart bei
  jedem `status === error` ab.
- `build:site` führt ausschließlich `next build` aus und dient als lokaler
  Docs-Only-Build ohne harten Slides-Gate.
- `build` wird zum verbindlichen Projekt-Build für CI und Vercel und führt
  `npm run slides:check && npm run build:site` aus.
- Vercel bleibt bei seinem Standard-Buildbefehl `npm run build`; es ist keine
  zusätzliche Dashboard- oder `vercel.json`-Sonderkonfiguration nötig.

## Projektions- und Validierungsregeln

### Automatisch sichtbare Inhalte

Ohne zusätzliche Marker dürfen in einem Segment automatisch auf die Folie:

- der `##`-Titel
- genau ein Lead-Absatz direkt am Segmentanfang, wenn er höchstens 220
  sichtbare Zeichen und höchstens 2 Sätze enthält
- Listen mit höchstens 6 Punkten, wenn jeder Punkt höchstens 140 sichtbare
  Zeichen enthält
- Codeblöcke mit höchstens 12 nichtleeren Zeilen
- Tabellen mit höchstens 4 Spalten und höchstens 5 Body-Zeilen
- genau ein Markdown-Bild pro Segment
- kurze `Callout`-Blöcke innerhalb eines Segments, wenn ihr sichtbarer Text
  höchstens 220 Zeichen umfasst oder wenn sie nur eine Liste mit höchstens
  4 kurzen Punkten enthalten
- Inline-Formatierung wie `strong`, `em`, Inline-Code, Links, `mark` und `br`

### Explizit sichtbare Inhalte

- Inhalte in `SlideOnly` erscheinen immer im aktuellen Segment, auch wenn sie
  die Auto-Grenzen überschreiten.
- Für `SlideOnly` gelten weiterhin:
  - nur unterstützte Knotentypen
  - keine verschachtelten Marker
  - Warnungen bei sehr großen Blöcken

### Standardmäßig nicht sichtbare Inhalte

Ohne explizite Markierung bleiben in der Doku:

- zusätzliche Absätze nach dem Lead-Absatz
- Listen, Tabellen oder Codeblöcke oberhalb der v1-Grenzen
- zusätzliche Bilder nach dem ersten automatisch übernommenen Bild
- Callouts vor dem ersten `##`
- lange fachliche Callouts innerhalb eines Segments
- `details` / `summary`
- Inhalte in `DocsOnly`

### Unterstützte und nicht unterstützte Komponenten

In v1 sind für sichtbare Slide-Inhalte nur folgende nichttriviale
Komponentenformen erlaubt:

- Standard-Markdown-Knoten
- `Callout` aus `nextra/components`
- die vier Slide-Marker

Nicht unterstützt in sichtbaren Slides sind:

- importierte benutzerdefinierte MDX- oder React-Komponenten wie `MyIntro`
- Navigationskomponenten wie `SectionLinks`
- rohe HTML-Blockstrukturen außer einfachem Inline-`br` und `mark`
- `details`, `summary`, `script`, `iframe`, `video`

Regel:

- Wenn ein nicht unterstützter Knoten in sichtbar zu renderndem Slide-Inhalt
  vorkommt, schlägt die Slides-Validierung fehl.
- Wenn derselbe Knoten innerhalb von `DocsOnly` steht, ist er für die
  Slides-Route unproblematisch.

### Fehler und Warnungen

Die Slides-Validierung erzeugt harte Fehler bei:

- `SlideOnly`, `SlideLead` oder `SlideBreak` außerhalb eines `##`-Abschnitts
- verschachtelten Markern
- mehr als einem `SlideLead` in demselben Segment
- einem nicht unterstützten Knoten in sichtbarem Slide-Inhalt
- einer `slides: true`-Seite ohne `##`-Abschnitt
- einem manuellen `Dauer:`- oder `Ziel:`-Callout vor dem ersten `##`
- einem Segment, das nach Projektion nur noch aus dem Titel besteht
- einer `slides: true`-Seite, aus der keine einzige fachliche Folie entsteht

Warnungen entstehen bei:

- automatisch ausgeblendeten Absätzen, Listen, Tabellen, Bildern oder Callouts
- `SlideOnly`-Blöcken, die die empfohlenen Größenlimits deutlich überschreiten
- mehreren übergroßen Inhaltsblöcken innerhalb desselben Segments

Jede Warnung und jeder Fehler enthält mindestens:

- Content-Pfad der betroffenen MDX-Datei
- `##`-Titel des betroffenen Segments
- Segmentindex innerhalb des `##`-Abschnitts
- Art des Problems

## Layout und Verhalten des Decks

- Reveal bleibt die Präsentations-Engine, aber nur als Render-Layer in der
  separaten Slides-Route.
- Die normale Nextra-Seite und die Slides-Ansicht greifen auf dieselbe
  MDX-Datei zu, aber mit getrennten Komponenten- und Renderpfaden.
- Reveal-spezifische Styles und Laufzeitlogik werden nur in der Slides-Route
  geladen, nicht im normalen Docs-Pfad.
- Die standardisierte Doku-Meta-Infobox wird als eigene Komponente
  `components/content/SlideMetaBox.jsx` umgesetzt.
- Für `slides: true`-Seiten rendert die normale Inhaltsseite oberhalb des
  eigentlichen Inhalts diese Meta-Infobox aus `slideDuration`, `slideGoal` und
  `slideTopics`, falls mindestens eines dieser Felder gesetzt ist.
- Integrationspunkt ist die bestehende Route
  `app/[[...mdxPath]]/page.jsx`: Die Meta-Infobox wird innerhalb des bestehenden
  `Wrapper` direkt vor `<MDXContent />` gerendert.
- Die Titelfolie zeigt in v1 nur:
  - Titel
  - optional `slideDuration`
  - optional `slideGoal`
- `slideTopics` werden in v1 nicht automatisch auf der Titelfolie gezeigt, um
  die Einstiegsfolie kompakt zu halten.
- Bestehende statische Decks werden nicht migriert und nicht in diese Logik
  einbezogen.

## Tests und Abnahmeszenarien

### Positiver Pilot

- `content/prog/03-type-op-func/01-typen.mdx`
- Erwartung:
  - nach Migration von `Dauer`, `Ziel` und Themenliste ins Frontmatter ist die
    Seite mit
    `slides: true` über `/slides/prog/03-type-op-func/01-typen` erreichbar
  - `## Übersicht`, `## number`, `## boolean`, `## string`, `## undefined`,
    `## typeof` werden zu einzelnen Folien
  - die normale Doku zeigt die Meta-Infobox aus `slideDuration`, `slideGoal`
    und `slideTopics`
  - eine Titelfolie erscheint nur bei `titleSlide: true`
  - Meta-Chips erscheinen nur, wenn `slideDuration` oder `slideGoal` im
    Frontmatter stehen

### Validierungsfälle

- `content/web-prog/01-HTML/01-intro.mdx`
  - falls `slides: true` gesetzt wird und `MyIntro` in sichtbarem Slide-Inhalt
    bleibt, muss die Slides-Validierung mit klarer Fehlermeldung abbrechen
- `content/mobile/05-react-native/06-state.mdx`
  - `details` / `summary` in sichtbar erzeugtem Slide-Inhalt müssen
    validierungsseitig abgelehnt werden
- eine `slides: true`-Seite mit manuellem `Dauer:`-Callout vor dem ersten `##`
  muss validierungsseitig fehlschlagen
- eine `slides: true`-Seite mit manueller Themenliste im Intro-Callout vor dem
  ersten `##` muss validierungsseitig fehlschlagen
- ein Segment mit nur verborgenem oder ausgefiltertem Inhalt darf keine
  titellose oder titel-only Folie ergeben, sondern muss als Fehler enden
- eine Seite ohne `slides: true` darf unter `/slides/...` nur `404` liefern

### Warnungsfälle

- ein `##`-Abschnitt mit zusätzlichem zweiten Bild erzeugt eine Warnung und
  übernimmt ohne Marker nur das erste Bild
- ein zu langer zusätzlicher Absatz nach dem Lead bleibt Doku-Inhalt und
  erzeugt eine Warnung
- ein übergroßer `SlideOnly`-Block erzeugt eine Warnung, bleibt aber sichtbar

### Regressionsschutz

- normale Nextra-Inhaltsseiten bleiben vollständig lesbar
- bestehende statische Decks unter `public/decks` bleiben unverändert
  erreichbar
- `npm run build:site` bleibt für die Doku lauffähig, auch wenn einzelne
  `slides: true`-Seiten Validierungsfehler haben
- `npm run build` und `npm run slides:check` erkennen dieselben Slides-Fehler
  reproduzierbar und brechen hart ab

## Annahmen und bewusst gewählte Defaults

- App-Route ist der Standard für neue generierte Folien.
- Generierte Deck-Dateien werden nicht versioniert.
- Eine MDX-Seite ist die einzige Deck-Einheit in v1.
- Slides-URLs folgen 1:1 dem bestehenden Docs-Pfad.
- Die Projektion wird AST-basiert aus der Roh-MDX-Datei erstellt.
- Die AST-Pipeline verwendet `remark-gfm`, damit vorhandene Markdown-Tabellen
  im Content konsistent unterstützt werden.
- `##` ist die Standard-Slide-Grenze.
- Segmentgrenzen innerhalb eines `##`-Abschnitts entstehen nur durch
  `SlideBreak`.
- Meta-Informationen für die Titelfolie und die Doku-Meta-Infobox kommen
  ausschließlich aus Frontmatter, einschließlich `slideTopics`.
- Bilder werden automatisch übernommen, aber nur eines pro Segment.
- Speaker Notes sind nicht Teil von v1.
- Kapitel-Decks, Fragmente, vertikale Slides, Agenda-Automatik und PDF- oder
  Print-spezifische Funktionen sind nicht Teil von v1.
- `slideTheme` wird als zukunftssichere Metadatenoption vorgesehen, aber in v1
  nicht ausgebaut.
