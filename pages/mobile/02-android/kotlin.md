import Callout from 'nextra-theme-docs/callout'

# Kotlin lernen

<Callout>
  **Dauer:** 15 Minuten

  - Kotlin kennenlernen

  **Ziel:** Zugang zu Kotlin erleichtern
</Callout>

Google empfiehlt seit ein paar Jahren, dass neue
Android-Projekte mit Kotlin anstatt Java umgesetzt
werden sollten. 

<Callout type="warning" emoji="👨🏻‍💻">
Anhand der `MainActivity` können wir zum Kotlin-Code
kurz den entsprechenden Java-Code andeuten (siehe unten).

Somit wird hoffentlich einigermaßen deutlich, wie 
Kolin-Code aus Java-Sicht zu verstehen ist. Außerdem
sollte dadurch Kotlin attraktiver wirken.
</Callout>

```kotlin
// MainActivity in Kotlin
// Dateiname MainActivity.kt
package com.example.mynotes

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

```java
// MainActivity in Java
// Dateiname MainActivity.java
package com.example.mynotes;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    @override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

Am Anfang wirkt Kotlin vielleicht etwas ungewöhnlich
aber viele Java-Entwickler sind inzwischen auf Kotlin
mit seinen modernen und eleganten Spracheigenschaften
umgestiegen. Wer sich mit Java auskennt, wird 
erfahrungsgemäß in relativ kurzer Zeit mit Kotlin 
zurechtkommen. 

Wir werden im Laufe der Vorführungen (auch und im
Video-Kurs) mehrere Kotlin-Beispiele sehen.

**Tipp:** In Android-Studio kann Java-Code
automatisch in Kotlin-Code umgewandelt werden.

<Callout type="warning">
**Vertiefendes Material**

- [Kotlin-Kurs von Google](https://developer.android.com/courses/kotlin-bootcamp/overview) mit mehreren Lektionen und interaktiven Codelabs.
- Dokumentation und weitere Kurse zu Kotlin gibt es auf der offiziellen Webseite unter [https://kotlinlang.org](https://kotlinlang.org).
</Callout>

<Callout type="warning">
Auch wenn Google es nicht mehr empfiehlt, ist es dennoch
möglich, Android-Apps mit Java zu entwickeln.

Dazu findet sich eine (vielleicht etwas veraltete)
Materialsammlung von Google 
[hier](https://developer.android.com/courses/fundamentals-training/overview-v2).
</Callout>
