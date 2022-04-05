import Callout from 'nextra-theme-docs/callout'

# Methoden der DOM-API

<Callout>
  **Dauer:** max. 30 Minuten

  **Themen:**
  - Elemente im DOM finden
  - HTML im DOM mit JavaScript erzeugen

  **Ziel:** Wichtige Methoden der DOM-API kennenlernen
</Callout>

![DOM](/images/web-prog/dom.png)

### Auf Elemente zugreifen

Die einfachste Art, um auf bestimmte Elemente im DOM
zuzugreifen, wird durch die Methode `document.getElementById`
ermöglicht. So weist folgender JavaScript-Code der Konstanten
`listElement` eine Referenz auf das Element mit dem `id`-Attribut
zu, das den Wert `list` hat (im DOM-Beispiel ist dies das `div`-Element,
welches die `div`s mit den Orten enthält):

```javascript
const listElement = document.getElementById('list');
```

Als Parameter wird der Methode `getElementById` beim Aufruf demnach 
der Wert des `id`-Attributs des gewünschten Elements übergeben und
die Methode liefert eine Referenz auf das entsprechende Element zurück.

Weitere nützlich Methode für den Zugriff auf beliebige Elemente
in der DOM-Struktur sind die Methoden [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) (liefert
das erste passende Element) und [`document.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) 
(liefert alle passenden Elemente), die jeweils mit flexiblen 
Abfrageausdrücken aufgerufen werden können (siehe verlinkte Dokumentation 
in MDN).

### Elemente erstellen

Mit `document.createElement` können neue Elemente erstellt werden:

```javascript
const newDiv = document.createElement('div');
```

Der Parameter für `createElement` ist der gewünschte Tag-Name und
der Rückgabewert ist ein neues Element.
Ein mit `createElement` erzeugtes Element ist noch nicht Teil
des DOM bzw. noch nicht im HTML des Browsers sichtbar. Um das Element
an eine gewünschte Position in die DOM-Datenstruktur einzufügen, 
bietet sich die Verwendung der Methode `appendChild` an. 

`appendChild` wird in Bezug auf ein bestimmtes Element aufgerufen, an 
das das neue Element als Kindelement angehängt werden soll (daher nicht mit `document`):

```javascript
// wir verwenden das Element in listElement (siehe oben)
listElement.appendChild(newDiv);
```

Folgende Funktion fügt für unser Beispiel einen neuen Ort mit dem
Text „Hamburg“ in das DOM ein:

```javascript
function createNewLocation(name) {
  // dem neuen Element eine (CSS-)Klasse hinzufügen
  listElement.classList.add('location');
  // HTML- bzw. Textinhalt des Elements setzen:
  listElement.innerHTML = name;
  listElement.appendChild(newDiv);
}

createNewLocation('Hamburg');
```

Hierdurch erscheint im Beispiel neben den `div`-Elementen für 
Basel, Freiburg und Lörrach auch ein neues Element für Hamburg,
das wir zusätzlich mit der CSS-Klasse `location` ausstatten (siehe
`classList.add`) und das mit `innerHTML` einen Inhalt bekommt (hier 
zunächst nur Inhalt des Funktionsparameters `name`).

Somit lassen sich dynamisch neue HTML- bzw. DOM-Element erstellen.
Die API des DOM stellt hierfür viele weitere Methoden bereit.

### HTML mit Template-Strings erstellen

Mit Template-Strings lassen sich dynamisch die HTML-Inhalte von
Elementen deklarieren, sodass der Code einigermaßen lesbar bleibt:

```javascript
location_element.innerHTML = `
    <div class="location">${name}</div>
      <div class="weather_info">
        <span>
          <span class="temperature">${temp}°C</span>
        </span>
    </div>
  `;
```

`name` und `temp` könnten hier Variablen oder Funktionsparameter
sein, die zur Laufzeit unterschiedliche Werte enthalten. Dieses
Beispiel zeigt, wie geschachtelte HTML-Fragmente mit Hilfe von
Template-Strings im Code erstellt werden können. 

<Callout type="warning">
Im LiveCoding werden diese Methoden eingebaut, um einen neuen Eintrag
für einen beliebigen Ort mit willkürlichen Wetterdaten einzufügen:

- `getElementById` um das „Container“-Element (`div`) für die Liste der Wetter-Orte einer Konstanten zuzuweisen.
- Funktion `addWeatherLocation` erstellen, die folgende Methoden der DOM-API verwendet:
  - `document.createElement` erzeugt neues Element für Ort
  - `element.classList.add` setzt CSS-Klasse
  - `element.innerHTML` erstellt HTML-Inhalt mit Template-String
  - `element.appendChild` fügt neuen Ort in Listenelement ein
- Aufruf der Funktion `addWeatherLocation`
</Callout>
