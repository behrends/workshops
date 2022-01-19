import Callout from 'nextra-theme-docs/callout'

# Activities mit Intents verknüpfen (Teil 1)

<Callout>
  **Dauer:** bis zu 90 Minuten \
  inklusive Übung, Pause und Besprechung

  - Activies erstellen und ansteuern

  **Ziel:** Grundlegendes Verständnis von Activities
</Callout>

Activities bilden grundlegende Bestandteile 
einer Android-App. So hat jede App mindestens
eine Activity, die via `AndroidManifest.xml` als
die Activity festgelegt wird, welche beim 
Start der App ausgeführt werden soll 
(bei uns `MainActivity.kt`). 

Activities stellen via XML-Layout ein UI
zur Interaktion mit der App bereit. Hat eine
App mehrere Activities, dann können diese ebenfalls
ein eigenes XML-Layout haben. Jede Activity muss
im `AndroidManifest.xml` eingetragen werden.

Mit **Intents** ist es möglich, von einer
Activity zu einer anderen Activity zu navigieren.

<Callout type="warning">
Das Thema „Activities mit Intents“ ist seit
Beginn der Android-Entwicklung ein zentrales
Thema.

Es ist aber durchaus möglich, dass dieses Thema
durch neue Entwicklungen wie des „Navigationsgraphens“
und Jetpack Compose zunehmend in den Hintergrund
gerät.
</Callout>

## Activity erstellen

In Android Studio: 
`File > New > Activity > Empty Activity`

Es öffnet sich dadurch ein Dialog. Die neue 
Activity kann nun passend benannt werden
(z.B. bei uns `EditActivity`). Es ist eine
Konvention, dass das zugehörige XML-Layout
beginnend mit `activity_` benannt wird 
(bei uns `activitiy_edit.xml`).

Dadurch werden folgende Dateien erzeugt:

- `EditActivity.kt` innerhalb des Ordners `java`
- `activity_edit.xml` in `res/layout`

Zusätzlich wurde für die neue Activity ein 
Eintrag in `AndroidManifest.xml` erstellt.

**LinearLayout verwenden**

Um die Änderungen einfach zu halten, ändern
wir das XML-Layout in `activity_edit.xml` so,
dass ein _LinearLayout_ verwendet wird. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    tools:context=".EditActivity">
    
</LinearLayout>
```

Für umfangreichere Apps und die langfristige
Android-Entwicklung wird _ConstraintLayout_
empfohlen.

## Mit Intent zur Activity navigieren

Ein `Intent` (deutsch „Absicht“) ist ein Objekt,
mit wir u.a. von einer Activity zu einer anderen
navigieren können.

Der Konstruktur der `Intent`-Klasse kann hierfür
mit zwei Argumenten aufgerufen werden:

- „Start“: der Kontext (z.B. die Activity) in dem der `Intent` verwendet wird 
- „Ziel“: die Activity zu der navigiert werden soll

<Callout type="warning">
Am Whiteboard bzw. in [Excalidraw](https://excalidraw.com)
zwei Activities mit Pfeilen skizzieren.
</Callout>

In unserem Fall wird der Kontext `this` sein, d.h. die
`MainActivity` von der aus navigiert wird und die Ziel-Activity
wird mit Hilfe der zugrundeliegenden Java-Klasse angegeben
(hier `EditActivity::class.java`):

```kotlin
val intent = Intent(this, EditActivity::class.java)
```

In unserer Activity steht eine geerbte Hilfsfunktion 
`startActivity()` bereit, der ein `Intent`-Objekt
als Parameter übergeben wird.

Somit ist folgende Änderung in `MainActivity` durchzuführen,
damit durch Antippen des `Buttons` durch `startActivity()`
und dem `Intent`-Objekt zur `EditActivity` navigiert wird:

```kotlin
binding.button.setOnClickListener {
    val noteTitle = binding.editNoteTitle.text.toString()
    if(noteTitle.trim().isEmpty()) {
        binding.editNoteTitle.error = "Titel darf nicht leer sein."
    } else {
        val intent = Intent(this, EditActivity::class.java)
        startActivity(intent)
    }
}
```

## Daten mit Extra übergeben und anzeigen.

Zunächst erweitern wir das XML-Layout `activity_edit.xml`
der `EditActivity` mit einer `TextView` zur Anzeige
des Notiztitels:

```xml
<TextView
    android:id="@+id/noteTitle"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Hier erscheint der Titel"/>
```

Mit `putExtra()` können Daten bzw. `key/value`-basierte
Informationen einem `Intent`-Objekt hinzugefügt werden:

```kotlin
binding.button.setOnClickListener {
    val noteTitle = binding.editNoteTitle.text.toString()
    if(noteTitle.trim().isEmpty()) {
        binding.editNoteTitle.error = "Titel darf nicht leer sein."
    } else {
        val intent = Intent(this, EditActivity::class.java)
        // Daten mit putExtra dem Intent hinzufügen
        intent.putExtra("NOTE_TITLE", noteTitle)
        startActivity(intent)
    }
}
```

In der `EditActivity` können wir aus einem `intent`-Objekt
in `onCreate` die enthaltenen bzw. „übergebenen“ Daten
auslesen und anzeigen:

```kotlin
class EditActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit)
        val noteTitle = intent.getStringExtra("NOTE_TITLE")
        findViewById<TextView>(R.id.noteTitle).text = noteTitle
    }
}
```

## Zusammenfassung

Bei einfachen Apps mit wenigen Activities bzw.
Screen ist eine Navigation so möglich. 

Intents werden auch dafür verwendet aus einer
App heraus eine andere App zu starten, z.B. um
mit der Kamera-App ein Foto aufzunehmen und
weiterzuverwenden oder um in Google Maps eine
einen Standort oder Wegbeschreibung anzuzeigen.

<Callout type="warning" emoji="👨🏻‍💻">
Übung: Eine weitere Activity hinzufügen und mit 
einem weiteren Button ansteuern (falls Zeit ist,
dann mit Datenübergabe).

Stellen Sie `EditActivity` auf `ViewBinding` um
(siehe [vorigen Abschnitt](/mobile/02-android/view_binding)).

Diese weitere Activity kann danach wieder gelöscht werden.
</Callout>

<Callout type="warning">
**Vertiefendes Material**

Guides in den Android Developer Docs: 
- https://developer.android.com/training/basics/firstapp/starting-activity
- https://developer.android.com/guide/components/activities/intro-activities 

Dieses Material ist nicht im Videokurs 
zu Android enthalten.
</Callout>


