import Callout from 'nextra-theme-docs/callout'

# Zugriff auf Datenquellen

<Callout>
  **Dauer:** 10 Minuten

  **Themen:**
  - statisches Array als „lokale Datenquelle“

  **Ziel:** Schrittweise Datenquellen einbinden
</Callout>

In einer Webanwendung werden häufig Daten von externen Quellen
wie z.B. andere Webservices oder Cloud-Datenbanken angefragt und
eingebunden. 

Zur Vorbereitung kann es 

### Lokale Daten als Objekte in einem Array

Zunächst erstellen wir eine „lokale Datenquelle“, indem
wir ein Array mit Beispiel-Daten deklarieren, z.B. Objekte 
für Orte, die aus einem Namen und der Temperatur bestehen:

```javascript
// Array mit Temperaturwerten für die Orte im select-Element
const temperatures = [
  { name: 'Hamburg', temp: 2 },
  { name: 'Paris', temp: 4 },
  { name: 'New York', temp: -1 },
  { name: 'Sydney', temp: 20 },
];
```

<Callout type="warning" emoji="👨🏻‍💻">
In der Wetteranwendung wird das Array `temperatures` benutzt,
um bei Auswahl eines Ortes in der Dropdown-Liste (`select`-Element) 
die Daten aus dem Array zu lesen.
</Callout>

Wenn eine solche „lokale Datenquelle“ im Code genutzt wird, dann
ist der Code bereits so strukturiert, dass kann diese schrittweise 
durch eine „echte“ Datenquelle (z.B. Webservice) ersetzt werden kann.

