import Callout from 'nextra-theme-docs/callout'

# HTML und CSS

<Callout>
  **Dauer:** 30 Minuten

  **Themen:**
  - HTML-Elemente und inline-Styles (_quick and dirty_)
  - Stylesheets in HTML-Dokumente einbinden

  **Ziele:** HTML-Dokumente mit einfachem CSS gestalten
</Callout>

## Live Coding: Wetter-App

Nun können wir unsere Wetter-App schrittweise mit CSS stylen.
Dadurch vertiefen wir HTML-Elemente und lernen CSS durch das 
Zusammenspiel mit HTML kennen.

Am Whiteboard oder online mit [Excalidraw](https://excalidraw.com)
die Darstellung eines Ortes mit seinen Wetterdaten als eine
Box mit runden Ecken und unterschiedlichen Schriften skizzieren.

<Callout type="warning">
Abstände und Layout lernen wir erst in CSS Teil 2 kennen.
</Callout>

```
Ausgangscode vom letzten Mal vorgeben oder zur Übung neues 
Projekt in VS Code mit HTML anfangen?
```

```
Tipps für neues Projekt und VS Code mit Live Server:
- Rechtsklick auf HTML-Datei falls "Go Live" nicht erscheint
- html/head/body werden für live reload benötigt
```

## Inline-Styles

```
Überführung der Elemente in `div`-Elemente mit inline-Styles als erster Schritt.
```

Jedes HTML-Element kann mit dem `style`-Attribut eigene
CSS-Regeln erhalten:

```html
<div style="border: 2px solid silver;border-radius: 4px;">
  Berlin 19 sonnig
</div>
```

Dadurch erhält das Element einen silbernen Rahmen mit runden
Ecken.

<Callout type="warning">
Inline-Styles mit `style="..."` direkt im HTML-Element sind
nur für schnelles Ausprobieren gedacht. Empfohlen wird das
Einbinden von separaten Stylesheet-Dateien in HTML-Dokumente.
</Callout>


## Stylesheets einbinden

Stylesheet-Dateien werden mit der Endung `.css` gespeichert
und können durch `link`-Elemente mit Attributen `rel="stylesheet"` 
und `href="DATEIPFAD"` im `head` des HTML-Dokuments eingebunden 
werden:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <!-- hier stehen mehr Elemente im head wie meta, title, usw.  -->
    <link rel="stylesheet" href="styles.css" />
  </head>
  <!-- hier folgt der body -->
</html>
```

```
Wir überführen in unserem Projekt die inline-Styles in
eine neue Stylesheet-Datei styles.css, nachdem
wir in der folgenden Lektion ein paar Selektoren
kennengelernt haben.
```

<Callout type="warning">
Für unser kleines Projekt genügt wahrscheinlich ein
Stylesheet. Komplexere Webanwendungen setzen häufig
mehrere Stylesheets ein.
</Callout>

[Mehr dazu bei Prog Content](https://www.progcontent.com/css-kompakt/html-und-css)