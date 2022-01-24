import Callout from 'nextra-theme-docs/callout'

# Navigation (Umsetzung)

<Callout>
  **Dauer:** 45 Minuten

  - Activities mit Navigationskomponente ersetzen

  **Ziel:** Nachvoll
</Callout>

Die nachfolgenden Schritte beschreiben, wie unsere Beispiel-App
in eine 

Dabei bleibt nur eine Activity übrig, in der mittels `NavHost`
und `NavHostFragment` die verschiedenen Fragmente einzelner
Navigationsziele bzw. Screens dynamisch bei der Navigation 
angezeigt werden.

## Navigationsgraph erstellen

In der Projektansicht (linke Seitenleiste) einen Rechtsklick
auf dem `res`-Ordner ausführen und dann 
`New > Android Resource File` wählen. 

Im daraufhin erscheinenden Dialog den Dateinamen (_File name_)
`navigation` eintragen und bei _Resource type_ `Navigation`
auswählen und dann mit `OK` bestätigen.

![Dialog für Navigationsgraph](/images/mobile/nav_graph_dialog.png)

Daraufhin erscheint ein Dialog mit dem die benötigten 
Abhängigkeiten in `app/build.gradle` automatisch eingetragen 
und heruntergeladen werden. Diesen mit `OK` bestätigen:

![Dialog für Äbhängigkeiten](/images/mobile/nav_graph_deps.png)

Nun können wir die Datei `res/navigation/navigation.xml` öffnen
und im Navigationseditor betrachten.

## `activity_main.xml` kopieren

Die `MainActivity` werden wir als einzige Activity im
Navigationsgraph verwenden. Sie soll als „Container“ bzw.
`NavHost` agieren. Dazu erstellen wir vorübergehend eine
Kopie des XML-Layouts `activity_main.xml`, um dies später
als Fragment zu verwenden. 

&xrarr; Wir kopieren `activity_main.xml` z.B. als 
`activity_mainORIG.xml`.

&xrarr; Fehlermeldungen können zunächst ignoriert werden

## `NavHostFragment` erstellen

Nun ändern wir `activity_main.xml` wie folgt:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical">

    <fragment
        android:id="@+id/navHostFragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:navGraph="@navigation/navigation"
        app:defaultNavHost="true" />

</LinearLayout>
```

Hier ist zu sehen, wie das `NavHostFragment` durch das
Attribut `android:name` zum Einsatz kommt 
(`androidx.navigation.fragment.NavHostFragment`).

Durch `app:navGraph="@navigation/navigation"` wird eine
„Verknüpfung“ mit unserem Navigationsgraphen in
`navigation.xml` hergestellt.

## Fragmente für Screens (_destinations_)

In unserer App wird es mit `MainActivity` nur noch eine
Activity geben. Bei der Navigation zwischen verschiedenen
Screens (_destinations_ im Navigationsgraphen) sollen in
der `MainActivity` durch die Verwendung des `NavHostFragments`
lediglich die aktuell benötigten Fragmente angezeigt werden.
Dazu überführen wir die beiden bisherigen Screens unserer
App in Fragmente.

### `HomeFragment`

`HomeFragment` soll den „Einstiegsscreen“ der App darstellen, 
d.h. im Prinzip das vorige UI der `MainActivity` 
(`TextInput` und `Button`) ergeben. 

Zunächst ändern wir den Namen des zuvor kopierten XML-Layouts 
`activity_mainORIG.xml` (siehe oben) in `fragment_home.xml`
um. Eventuell sind ein paar Anpassungen in `fragment_home.xml` 
nötig, sodass die Verbindung zur `MainActivity` aufgelöst wird
(z.B. `tools:context=".MainActivity"` entfernen):

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical">

    <!-- usw.  -->
    <!-- der Rest bleibt gleich  -->
```

Durch Rechtsklick auf dem Package-Namen `com.example.MyNotes`
wählen wir `New > Kotlin Class/File` aus und erstellen
dazu das `HomeFragment` wie folgt:

```kotlin
package com.example.mynotes

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.Fragment

class HomeFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)
        val editText = view.findViewById<EditText>(R.id.editNoteTitle)
        view.findViewById<Button>(R.id.button).setOnClickListener {
            val noteTitle = editText.text.toString()
            if(noteTitle.trim().isEmpty()) {
                editText.error = "Titel darf nicht leer sein."
            } else {
                Toast.makeText(context, "BUTTON CLICKED!", Toast.LENGTH_LONG).show()
            }
        }
        return view;
    }
}
```

Dies entspricht im Prinzip dem bisherigen Code der `MainActivity`,
jedoch mit einem `Toast` anstelle des Startens der `EditActivity`
mit `Intent` &mdash; dies wird nicht mehr benötigt, da wir
gleich den Navigationsgraphen verwenden werden. Zu beachten ist,
dass in einem Fragment die Funktion `onCreateView` überschrieben 
werden muss (anstatt wie in einer Activity `onCreate`). 
Außerdem hat die Funktionen einen Rückgabewert (das 
darzustellende `View`-Objekt) und `findViewById` wird auf
diesem `View`-Objekt aufgerufen.

In Fragment kann natürlich auch ViewBinding zum Einsatz kommen,
wie in den [Android Developer Docs](https://developer.android.com/topic/libraries/view-binding#fragments) 
beschrieben.

<Callout type="warning">
Anders als zuvor bei Activities verwenden wir für die Erzeugung
eines neuen Fragments mit XML-Layout hier **nicht** die 
Werkzeuge in Android Studio, weil das Fragment ansonsten weiteren
Code enthält, den wir nicht benötigen.
</Callout>

In der `MainActivity` sollte nun einiges an Code gelöscht 
werden, sodass diese wie folgt aussieht:

```kotlin
package com.example.mynotes

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.mynotes.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}
```


## HomeFragment im Navigationsgraph

Nun können wir mit „_New Destination_“ im Navigationseditor
das `HomeFragment` hinzufügen, wodurch dieses zum 
„Einstiegspunkt“ unserer App wird. Dazu muss nichts in
`AndroidManifest.xml` eingetragen werden, da die 
Navigationskomponente nun verantwortlich ist.

Die Datei `res/navigation/navigation.xml` sollte danach 
so aussehen:

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/navigation"
    app:startDestination="@id/homeFragment">

    <fragment
        android:id="@+id/homeFragment"
        android:name="com.example.mynotes.HomeFragment"
        android:label="HomeFragment"
        tools:layout="@layout/fragment_home"/>
</navigation>
```

Erst wenn das Attribut `tools:layout="@layout/fragment_home"` 
vorhanden ist, wird im Navigationseditor eine Vorschau
des UIs des `HomeFragments` im Graphen angezeigt.

Wir können die App starten und den Button testen 
(Toast bzw. Hinweis bei leerer Eingabe).

<Callout type="warning" emoji="👨🏻‍💻">
Aufgabe: `EditActivity` in `EditFragment` überführen und
als weiteres Ziel im Navigationsgraphen eintragen. Dazu
können Sie sich an `HomeFragment.kt` und `fragment_home.xml`
orientieren.

Achtung: `EditActivity` und der Eintrag für die `EditActivity` 
in `AndroidManifest.xml` sollte danach entfernt werden.

In `navigation.xml` an `tools:layout="@layout/fragment_edit"` 
für die Vorschau des UIs denken.
</Callout>

## Navigation im Graphen

Im Navigationseditor das `HomeFragment` vom runden Kreis
mit `EditFragment` verbinden:

![Fragments verbinden](/images/mobile/nav_graph_connect.png)

Dies ergibt ein `action`-Element in `navigation.xml` 
(siehe Code- bzw. XML-Ansicht).

Zusätzlich muss die eigentliche Navigation mit Hilfe
des `NavControllers` erfolgen. Dazu ersetzen wir in
`HomeFragment.kt` das Verhalten des Buttons wie folgt
(wo zuvor der `Toast` angezeigt wurde):

```kotlin
view.findViewById<Button>(R.id.button).setOnClickListener {
    val noteTitle = editText.text.toString()
    if(noteTitle.trim().isEmpty()) {
        editText.error = "Titel darf nicht leer sein."
    } else {
        // diese Zeile wird geändert!
        // hier findet die eigentliche Navigation statt
        view.findNavController().navigate(R.id.action_homeFragment_to_editFragment)
    }
}
```

&xrarr; Auf die benötigten Import-Anweisungen achten.

Die Navigation mit `NavController` nutzt die `Id` einer
`action` im Navigationsgraphen bzw. in `navigation.xml`.

## Ausblick 

- Navigation mit Argumenten: https://developer.android.com/guide/navigation/navigation-pass-data (insbesondere für Datenübergabe mit „_Safe Args_”)
- Besonderheiten mit _Back Button_ und „_Up-Navigation_“: https://developer.android.com/guide/navigation/navigation-navigate#back-stack 
- Material Design in der Navigation (z.B. `Navigation Drawer` oder `BottomTabNavigation`): https://developer.android.com/guide/navigation/navigation-ui
- siehe auch „Vertiefendes Material“ ganz unten auf der [vorigen Seite](/mobile/04-android/navigation2)

