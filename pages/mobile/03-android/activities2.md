import Callout from 'nextra-theme-docs/callout'

# Activities mit Intents verknüpfen (Teil 2)

<Callout>
  **Dauer:** bis zu 45 Minuten
  kann auch abgekürzt werden

  **Ziel:** Umgang mit Activities/Intents vertiefen
</Callout>

Es ist auch möglich, andere Activities mit einem Intent
zu starten und dabei ein Ergebnis zu erwarten. In unserem
Beispiel werden wir in der `EditActivity` einen `Button`
zum Löschen des eingegebenen Texts hinzufügen. Wird
der Button gedrückt, kehren wir zur `MainActivity` zurück
und der Inhalt des `EditTexts`-Elements wird entfernt.
Wird hingegen per _Back Button_ zur vorigen Activity 
navigiert (bei uns `MainActivity`), dann soll nichts
geändert werden.

<Callout type="warning">
Zur Veranschaulichung am Whiteboard oder Excalidraw skizzieren.
</Callout>

## Button in EditActivity 

In `activity_edit.xml` eintragen:

```xml
<Button
    android:id="@+id/button2"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Löschen" />
```

Dies sollte auch im Layout-Editor möglich sein.

## Activity starten mit Callback

Um eine andere Activity so zu starten, dass wir ein Ergebnis
zurückerhalten, müssen wir in unserem Beispiel in `MainActivity`
mit `registerForActivityResult` eine Callback-Funktion 
definieren:

```kotlin
private val startForResult =
    registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
        if (result.resultCode == Activity.RESULT_OK) {
            val intent = result.data
            // Alternativ in Kotlin: intent?.getBooleanExtra(...)!!
            if(intent != null && intent.getBooleanExtra("DELETE_NOTE", false)) {
                binding.editNoteTitle.setText("")
            }
        }
    }
```

**&xrarr; Wie immer an die Imports denken!**

Im obigen Code ist zu sehen, wie von der „anderen“ Activity
ein `Intent`-Objekt ausgelesen wird. In unserem Beispiel
„erwarten“ wir einen Eintrag (`Extra`) im `Intent`-Objekt
vom Typ `boolean` mit dem Schlüssel `DELETE_NOTE`. Falls
dessen Wert `true` ist, wird dem Textinhalt im 
`EditText`-Element ein leerer String zugewiesen, sodass
der zuvor eingegebene Textinhalt entfernt wird.

Zur Vorbereitung des nächsten Schrittes muss die 
in `onCreate` deklarierte lokale Variable `binding` in eine
Instanzvariable umgewandelt werden:

```kotlin
class MainActivity : AppCompatActivity() {

    // Instanzvariable für view binding
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        // usw... der Rest bleibt gleich ...
```

<Callout type="warning">
`lateinit` signalisiert für Kotlin, dass die Variable 
`binding` erst später initialisiert wird (hier in`onCreate`).
</Callout>

In `MainActivity` muss schließlich noch das Verhalten
des „Speichern“-Buttons so angepasst werden, dass die 
eben definierte Funktion `startForResult` anstatt 
`startActivity` verwendet wird:

```kotlin
binding.button.setOnClickListener {
    val noteTitle = binding.editNoteTitle.text.toString()
    if(noteTitle.trim().isEmpty()) {
        binding.editNoteTitle.error = "Titel darf nicht leer sein."
    } else {
        val intent = Intent(this, EditActivity::class.java)
        intent.putExtra("NOTE_TITLE", noteTitle)
        startForResult.launch(intent)
    }
}
```

<Callout type="warning">
Zur Veranschaulichung am Whiteboard oder Excalidraw skizzieren.
</Callout>


## Activity mit Ergebnis beenden

In `EditActivity` definieren wir das Verhalten des
„Löschen“-Buttons in `onCreate` wie folgt:

``` kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_edit)
    val noteTitle = intent.getStringExtra("NOTE_TITLE")
    findViewById<TextView>(R.id.noteTitle).text = noteTitle
    findViewById<Button>(R.id.button2).setOnClickListener {
        val data = Intent()
        data.putExtra("DELETE_NOTE", true)
        setResult(RESULT_OK, data)
        finish()
    }
}
```

Mit `setResult(RESULT_OK, data)` wird ein zuvor erstelltes
`Intent`-Objekt als „Ergebnis“ der Activity festgelegt.
Im `Intent`-Objekt haben wir zuvor für den Schlüssel 
`"DELETE_NOTE"` den Wert `true` eingetragen. Der Aufruf
von `finish()` beendet diese Activity. 

In unserem Beispiel wird dadurch in `MainActivity` 
der Callback aktiv, der in `startForResult` registriert
wurde.

<Callout type="warning">
**Vertiefendes Material**

Guide in Android Developer docs https://developer.android.com/training/basics/intents/result
</Callout>
