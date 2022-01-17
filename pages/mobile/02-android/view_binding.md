import Callout from 'nextra-theme-docs/callout'

# View Binding

<Callout>
  **Dauer:** 30 Minuten

  - `View Binding` ist „direkter“ als `findViewById` 

  **Ziel:** Alternative für `findViewById` kennenlernen
</Callout>

**Live-Coding**
- `onClick` mit `setOnClickListener` ersetzen
- Problem: `findViewById` häufig im Code umständlich, Vereinfachung mit View Binding
- `View Binding` in Datei `build.gradle` aktivieren
- automatisch generierte Klasse `ActivityMainBinding` mit `binding.view…` statt `findViewById` verwenden

<Callout type="warning">
**Vertiefendes Material**

`View Binding` in den [Android Dev Docs](https://developer.android.com/topic/libraries/view-binding)

`View Binding` ist (noch) nicht im Videokurs zu Android
enthalten. Statt dessen stellt Abschnitt 5 im Videokurs 
weiterführende Themen wie z.B. `Data Binding`, 
`ViewModel` und `LiveData` vor, welche für App-Projekte
interessant sein könnten.
</Callout>

TODO: Übung und Pause/Ende?