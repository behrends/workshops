import Callout from 'nextra-theme-docs/callout'

# View Binding

<Callout>
  **Dauer:** 20 Minuten

  - `View Binding` ist „direkter“ als `findViewById` 

  **Ziel:** Alternative für `findViewById` kennenlernen
</Callout>

Mit [`ViewBinding`](https://developer.android.com/topic/libraries/view-binding) wird für ein XML-Layout automatisch
ein „`binding`“-Objekt erzeugt, mit via `id`-Namen direkt
auf die View-Elemente zugegriffen werden kann. Somit sind
`findViewById`-Aufrufe mit `R.id.…` nicht mehr nötig und
der Code in einer `Activity` wird etwas kompakter.

## `ViewBinding` in `build.gradle` aktivieren

Diese Änderung in `build.gradle` am Ende des
`android`-Blocks eintragen:

```groovy
buildFeatures {
    viewBinding true
}
```

## `Binding`-Klasse verwenden

Aus `activity_main.xml` wird nun automatisch die Klasse 
`ActivityMainBinding` generiert, d.h. der Name der 
Layout-Datei ergibt den Namen der Klasse.

In `MainActivity.kt` kann nun `onCreate()` so umgeschrieben
werden:

```kotlin
import com.example.mynotes.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.button.setOnClickListener {
            val title = binding.editNoteTitle.text.toString()
            Toast.makeText(this, title, Toast.LENGTH_LONG).show()
        }
    }
}
```


<Callout type="warning">
**Vertiefendes Material**

`View Binding` in den [Android Dev Docs](https://developer.android.com/topic/libraries/view-binding)

`View Binding` ist (noch) nicht im Videokurs zu Android
enthalten. Statt dessen stellt Abschnitt 5 im Videokurs 
weiterführende Themen wie z.B. `Data Binding`, 
`ViewModel` und `LiveData` vor, welche für App-Projekte
interessant sein könnten.
</Callout>

<Callout type="warning">
Falls am Ende noch Zeit übrig ist, könnte über `strings.xml` gesprochen werden 
(siehe [nächste Seite](/mobile/03-android/misc))
</Callout>