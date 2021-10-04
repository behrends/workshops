import Callout from 'nextra-theme-docs/callout'

# Elemente

<Callout>
  **Dauer:** 30 Minuten \
  Vorführung / Live Coding: 30 Minuten

  **Themen:**

  - Überschriften
  - Paragraphen
  - Textformatierung
  - Block- und Inline-Elemente

  **Ziel:** erste Elemente für Text kennenlernen
</Callout>

## Erste grobe App-Idee

```
Live-Coding beginnt!
```

Gemeinsam entwickeln wir die Wetter-App. Eine einfache Skizze
der App-Idee wird auf dem Whiteboard oder Excalidraw entworfen:

- Überschrift
- Erklärung in Text
- zweiteilige Liste:
  - Stadtname
     - Temperatur
     - Wetterlage (z.B. „sonnig“)
     - Wind (z.B. „leichte Böen“)
- kleines Bild/Icon für das Wetter

Dabei kann zunächst mit `h1`, `p`, `ul`, `li`, `img` in Codepen gearbeitet 
werden (Komponente). Wir starten in VS Code (alternativ in Codepen/Glitch)
und übernehmen ggf. das HTML-Grundgerüst von 
[glitch.new/blank](https://www.glitch.new/blank).

## Überschriften

Mit `h1` bis `h6` gibt es Überschriften verschiedener Ebenen. Die
Hauptüberschrift dabei ist `h1`.

<Callout type="warning">
Überschriften werden von Browsern unterschiedlich groß und in Fettdruck
dargestellt. Allerdings werden wir erst mit CSS die Möglichkeit erhalten,
die Erscheinung von HTML-Elementen beliebig zu gestalten.
</Callout>

[Überschriften auf Prog Content](https://www.progcontent.com/html-kompakt/ueberschriften)

## Texte in Paragraphen

Bei Text ist insbesondere zu beachten, dass Leerzeichen ignoriert werden.
Zusammengehörende Texte werden meistens mit dem `p`-Element umgeben
(`p` steht für _paragraph_).

[Text in Paragraphen auf Prog Content](https://www.progcontent.com/html-kompakt/paragraphen)

## Textformatierung

Mit den Elementen `b` und `i` lassen sich Texte in **Fettdruck** (`b`) und
in _kursiv_ (schräg) darstellen. 

<Callout type="warning">
Nochmals: die eigentliche Gestaltung (Schriftgrößen, Farben, usw.)
werden wir mit CSS definieren.
</Callout>

Dies dient hier in erster Linie nur zur Veranschaulichung von
Block- und inline-Elementen (siehe folgenden Abschnitt)

[Textformatierung auf Prog Content](https://www.progcontent.com/html-kompakt/textformatierung)

## Block- und inline

Vergleichen wir den `p`-Tag mit den Elementen `b` und `i`. Was fällt auf? 
Nach dem `p`-Element erhalten wir einen Zeilenumbruch bzw. das nächste Element
fängt auf einer neuen Zeile an. Bei `b` und `i` hingegen findet kein 
Zeilenumbruch statt. `p` ist eine Beispiel eines **Blockelements**. `b` und `i`
sind hingegen **inline-Elemente**.

Mit `div` und `span` stehen uns Blockelemente (`div`) und inline-Elemente
(`span`) zur Verfügung, die ganz allgemein und vielseitig eingesetzt werden
können. Diese werden häufig mit CSS-Styles zur flexiblen Gestaltung 
ausgestattet. Wir werden diese noch im Detail kennenlernen und einsetzen.

[Mehr zu Block- und inline-Elemente auf Prog Content](https://www.progcontent.com/html-kompakt/block-inline)



- [Bilder auf Prog Content](https://www.progcontent.com/html-kompakt/bilder)

Icons z.B. von [RemixIcon.com](https://remixicon.com/)