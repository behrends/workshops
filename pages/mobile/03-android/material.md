import Callout from 'nextra-theme-docs/callout'

# Material Design in Android

<Callout>
  **Dauer:** 25 Minuten

  - Eingabefeld aus Material Design

  **Ziel:** Apps einheitlich und ansehnlich gestalten
</Callout>

Mit dem Material Design (https://material.io) 
hat Google eine „Designsprache“ für Apps auf 
verschiedenen Plattformen definiert 
(Web, Android, usw.).

**Hinweis**: Für die beliebten 
[_floating action buttons_](https://developer.android.com/guide/topics/ui/floating-action-button) sollte 
das Constraint Layout verwendet werden, damit
diese Buttons z.B. unten rechts positioniert werden
können.

## Input-Element ersetzen

Wir ersetzen das `EditText`-Element im XML-Layout
mit einem [Eingabefeld](https://material.io/components/text-fields) aus dem Material Design.

Dazu folgende Änderung im XML-Layout durchführen: 
`TextInputLayout` und `TextInputEditText` einfügen
und `EditText` entfernen.
(sollte auch durch Hinzufügen von `TextInputLayout`
im visuellen Layout-Editor klappen).

```xml
<com.google.android.material.textfield.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <com.google.android.material.textfield.TextInputEditText
        android:id="@+id/editNoteTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Titel der Notiz"
        android:minHeight="48dp"/>
</com.google.android.material.textfield.TextInputLayout>
```

Durch die Verwendung des gleichen 
`android:id`-Attributs sollte die App immer noch 
wie zuvor funktionieren.


## Einfache Validierung

Mit dem zusätzlichen Attribut 
`app:errorEnabled="true"` im 
`TextInputEditText`-Element können 
Fehlermeldungen in Bezug auf die Validierung 
der eingegebenen Werte angezeigt werden:

```xml
<com.google.android.material.textfield.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <com.google.android.material.textfield.TextInputEditText
        android:id="@+id/editNoteTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Titel der Notiz"
        app:errorEnabled="true"
        android:minHeight="48dp"/>
</com.google.android.material.textfield.TextInputLayout>
```

In der `MainActivity` wird im Click-Handler
folgendes geändert:

```kotlin
binding.button.setOnClickListener {
    val noteTitle = binding.editNoteTitle.text.toString()
    if(noteTitle.trim().isEmpty()) {
        binding.editNoteTitle.error = "Titel darf nicht leer sein."
    } else {
        Toast.makeText(this, noteTitle, Toast.LENGTH_LONG).show()
    }
}
```

<Callout type="warning">
**Vertiefendes Material**

Guide in den Android Developer Docs: 
https://developer.android.com/guide/topics/ui/look-and-feel \
(siehe dort auch die nachfolgenden Abschnitte wie
z.B. „_Styles and themes_“ usw.)

Tutorials auf der Webseite zum Material Design:
https://material.io/resources/tutorials

Material Design ist (noch) nicht im Videokurs 
zu Android enthalten.
</Callout>