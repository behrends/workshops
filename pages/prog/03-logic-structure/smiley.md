import Callout from 'nextra-theme-docs/callout'

# Übung (Smiley/Sadley in p5js)

<Callout>
  **Dauer:** restliche Zeit

  **Ziel:** Übung hauptsächlich von Funktionen
</Callout>

## Vorbemerkungen

Im [p5js-Editor](https://editor.p5js.org) 
werden zwei Funktionen deklariert (`setup` und
`draw`). In den beiden Funktionen werden jeweils 
im Funktionsrumpf andere Funktionen aus dem 
Framework p5js aufgerufen (`createCanvas()` mit 
zwei Parametern und `background()` mit einem 
Parameter).

```js	
function setup() {	
  createCanvas(400, 400);	
}
	
function draw() {
  background(220);	
}
```

<Callout type="warning">
Hierzu eine kleine Vorführung z.B. mit Kreisen
in p5js. Link auf die Referenz mit Suchfunktion
zum Nachschlagen von Konzepten: 
[p5js Referenz](https://p5js.org/reference/)
</Callout>

## Aufgabe
Bauen Sie in editor.p5js.org einen interaktiven Smiley bzw. Sadly.

Der Smiley soll aus verschiedenen Kreiseln (`circle`) 
für den Kopf, die Augen und den lächelnden Mund 
bestehen. Wenn der Mauszeiger in der oberen Hälfte 
der Leinwand (`canvas`) ist, soll der Smiley zu sehen 
sein. Bewegt sich der Mauszeiger in die untere 
Hälfte, dann wird der Smiley zu einem Sadly, d.h. die 
Mundwinkel zeigen nach unten. Die Mausposition kann 
jederzeit mit `mouseX` und `mouseY` abgefragt werden.

Versuchen Sie mindestens den Smiley in p5js zu
bauen:

![Smiley](/images/prog/smiley.png)

Der Sadley sieht dann so aus und sollte erscheinen,
wenn der Mauszeiger in die untere Hälfte der `canvas`
bewegt wird:

![Sadley](/images/prog/sadley.png)

**Mögliche Zusatzaufgaben:**

Gestalten Sie den Smiley nach eigenen Ideen: 
Pupillen, Augenbrauen, Brille, Hut, Zähne, usw. 
oder bauen Sie mehrere Smileys ein.