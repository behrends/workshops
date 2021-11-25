import Callout from 'nextra-theme-docs/callout'

# Ausblick

<Callout>
  **Dauer:** max. 30 Minuten

  **Themen:**
  - Kurzer Einblick in weiterführende Technologien:
    - lokale Datenbank mit `localStorage`
    - Cloud-Datenbanken
    - TypeScript für statische Typisierung in JavaScript
    - Frameworks wie z.B. React

  **Ziel:** Weitere Aspekte der Webprogrammierung
</Callout>

Bei Interesse können `localStorage` und Beispiele 
weiterführender Themen besprochen werden.

### `localStorage`

Jeder Browser bietet die Möglichkeit, kleinere Datenmengen
lokal bzw. clientseitig in einem Objekt namens 
`localStorage` zu speichern:

Mit `localStorage.setItem(key,value)` kann einem Eintrag 
mit Namen `key` ein String-Wert `value` zugewiesen werden.

Durch `localStorage.getItem(key)` wird der Wert des Eintrags
mit Namen `key` ausgelesen.

`localStorage.clear()` löscht die Daten.

Es besteht die Möglichkeit, JSON-Daten im `localStorage` 
als String zu speichern:

```javascript
let myData = [
  {id: 1, country: 'D'}, 
  {id: 2, country: 'CH'}, 
  {id: 3, country: 'F'}
];
// Daten als JSON-String speichern:
const jsonString = JSON.stringify(myData);
localStorage.setItem('countries', jsonString);

// Daten als String auslesen
const stringData = localStorage.getItem('countries');
// Daten als JSON verarbeiten und Objekt zuweisen
myData = JSON.parse(stringData);

// Daten im Objekt ändern (neues Land eintragen)
myData.push({id: 4, country:'I'});

// Daten erneut in localStorage speichern 
// (hier in einem kombinierten Aufruf)
localStorage.setItem('countries', JSON.stringify(myData));
```

Die Daten stehen der Webanwendung auch erneutem Laden
im `localStorage` zur Verfügung. Jeder Browser hat sein
eigenes `localStorage`-Objekt (clientseitig).

### Daten in der Cloud

Es gibt einige Beispiele von Datenbanken in der Cloud:

- [Firebase von Google](https://firebase.google.com)
- [Supabase](https://supabase.io)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Airtable](https://www.airtable.com/)
- u.v.a.m.

### TypeScript

Viele Teams, die mit JavaScript arbeiten, verwenden
[TypeScript](https://www.typescriptlang.org/). Durch
TypeScript erhält JavaScript eine statische Typisierung,
wodurch der Code stabiler und wartbarer werden kann.

TypeScript ist eine Erweiterung von JavaScript. Somit
ist JavaScript-Code bereits gültiges TypeScript (allerdings
ohne Typisierung) und dies bedeutet, dass TypeScript
nahtlos in bestehenden Projekte eingesetzt werden kann.

### Frameworks

In komplexeren Webanwendungen in der Regel eines 
der vielen Web-Frameworks genutzt, u.a. um den Code besser
zu strukturieren und um die Zusammenarbeit in größeren
Teams besser zu koordinieren:

- [React](https://reactjs.org)
- [Vue](https://vuejs.org/)
- [Svelte](https://svelte.dev/)
- [Angular](https://angular.io/)
- u.v.a.m.

<Callout type="warning">
Relevante Trends im Bereich der Webentwicklung werden 
jedes Jahr in einer Umfrage ermittelt, siehe 
[StateOfJS](https://stateofjs.com)
</Callout>