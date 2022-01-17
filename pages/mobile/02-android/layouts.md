import Callout from 'nextra-theme-docs/callout'

# UI-Layouts

<Callout>
  **Dauer:** 45 Minuten

  - Layouts als XML und im Editor

  **Ziel:** Layouts im Editor und XML bearbeiten
</Callout>

<Callout type="error" emoji="‼️">
**Disclaimer**
Android Studio und die verschiedenen Aspekte der 
Android-Entwicklung ändern sich manchmal mehrmals im Jahr.
Der Dozent wird in der Vorbereitung nicht alle neuen
oder geänderten Aspekte berücksichtigen können.

&xrarr; Es kann immer wieder passieren, dass etwas im
Live Coding nicht klappt oder hier nicht ganz korrekt ist
😏
</Callout>

Die Datei `activity_main.xml` im Verzeichnis 
`res/layout` beschreibt ein UI-Layout, das z.B. von 
einer `Activity` verwendet werden kann (bei uns 
im Projekt `MainActivity.kt`).

Dort ist die Verwendung eines `Constraint-Layouts`
zu sehen. Dieses Layout wird häufig in Android-Projekten
verwendet, u.a. da es sehr flexibel ist und gut für
verschiedene Display-Größen funktioniert.

Hier im „Crashkurs“ werden wir aufgrund der knappen
Zeit das `Linear-Layout` verwenden, welches deutlich
einfacher zu verwenden ist (auch wenn es nicht sehr
flexibel ist).

<Callout type="warning">
Es gibt einige verschiedene Layout-Arten. 

Das `Constraint-Layout` wird ausführlich in
Abschnitt 3 des Videokurses zu Android beschrieben.

**&xrarr; Für „echte“ Projekte lohnt es sich, das Constraint-
Layout einzusetzen.**

Weitere Ressourcen siehe ganz unten.
</Callout>

Ein UI-Layout wird in Android-Projekten als XML-Datei
definiert. Diese „gewöhnliche“ Textdatei im XML-Format
kann in Android Studio durch grafische Werkzeuge 
auch im Layout-Editor bearbeitet werden. Die 
Veränderungen im Layout-Editor werden durch Android
Studio automatisch in der zugehörigen XML-Datei 
gespeichert. Dies wird durch Live-Coding vorgeführt.

**Hinweis:** Seit 2021 gibt es mit [Jetpack Compose](https://developer.android.com/jetpack/compose) 
einen neuartigen Ansatz, in Android-Apps UIs ohne
XML-Layouts zu erstellen.

Wir öffnen in `activity_layout.xml` als XML-Datei im Text-Editor 
(d.h. in der „_Code_“-Ansicht) und ersetzen das `Constraint-Layout`
mit einem `Linear-Layout`:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">
</LinearLayout>
```

Als nächstes kommt ein `EditText`-Element zur Eingabe eines 
Titels für die Notiz hinzu:

```xml
<EditText
    android:id="@+id/editNoteTitle"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Titel der Notiz" />
```

<Callout type="warning">
Wir können versuchen, im grafischen Layout-Editor (die „Design“-Ansicht),
aus der _Palette_ in der Kategorie `Text` ein `Plain Text`-Element per
„Drag-and-Drop“ in das `Linear-Layout` zu ziehen. Allerdings werden
dann verschiedene Attribute automatisch gesetzt, die wir evtl. nicht 
benötigen (wie z.B. `android:inputType="textPersonName"`).

&xrarr; Wir können in der Design- oder Code-Ansicht die gewünschten
Anpassungen vornehmen.
</Callout>

Wenn im Layout-Editor eine Warnung erscheint, dass 
der `input type` fehlt, dann folgendes hinzugefügt
werden:

```
android:inputType="textAutoCorrect"
```

Außerdem können wir noch kurz darüber sprechen, dass
Texte bzw. Stings, die im UI angezeigt werden, in die
Datei `res/values/strings.xml` ausgelagert werden sollten
(u.a. wenn die App mehrsprachig werden soll).

<Callout type="warning">
**Vertiefendes Material**

[Codelab zu Linear Layouts](https://codelabs.developers.google.com/codelabs/kotlin-android-training-linear-layout)

**Constraint Layout** (empfohlen):

- Abschnitt 3 im Videokurs zu Android erläutert das `Constraint-Layout`
- [Android Developer Guides](https://developer.android.com/training/constraint-layout)
</Callout>

**PAUSE**