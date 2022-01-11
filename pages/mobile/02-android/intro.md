import Callout from 'nextra-theme-docs/callout'

# Einstieg

<Callout>
  **Dauer:** höchstens 20 Minuten

  - Verschiedenes Lernmaterial vorstellen

  **Ziel:** Übersicht der Lernressourcen zu Android geben
</Callout>

## Learning by doing

Einerseits ist die Android-Programmierung sehr umfangreich
und befindet sich in ständiger Weiterentwicklung.
Andererseits haben wir in der Vorlesung relativ wenig Zeit,
um Android kennenzulernen. Daher werden grundlegende 
Themen schrittweise und kompakt vorgeführt, indem wir 
zusammen eine kleine Android-App programmieren werden.

Zur Vertiefung der besprochenen Themen wird auf passende 
Abschnitte im Videokurs oder in der Android-Dokumentation 
verwiesen.

<Callout type="warning" emoji="‼️">
Im Web sind einige veraltete Informationen zur Android-
Programmierung zu finden. Daher sollte bei eigenen 
Recherchen z.B. auf das Erstellungsdatum der gefundenen
Artikel geachtet werden (&xrarr; nicht älter als 2 Jahre).
</Callout>

<Callout type="error">
Jedes Jahr vor Beginn der Vorlesung sollten die folgenden 
Links überprüft und ggf. angepasst bzw. erweitert werden.
</Callout>

## Lernressourcen von Google

Zunächst werden nützliche Bestandteile der „offiziellen“ 
Android-Dokumentation von Google vorgestellt.

### Dokumentation

In der offiziellen Entwickler-Dokumentation zu Android unter
[developer.android.com](https://developer.android.com) sind
im Prinzip alle nützliche Informationen zur native Entwicklung
von Android-Apps zu finden &mdash; allerdings ist diese
Webseite auch ziemlich unübersichtlich. Es folgen ein paar
Hinweise, die die Verwendung der Dokumentation erleichtern
sollen.

<Callout type="warning">
In der offiziellen Dokumentation werden Code-Beispiele
in Kotlin und Java angezeigt. Google empfiehlt für neue
Projekte den Einsatz von Kotlin.
</Callout>

<Callout type="warning">
Viele Android-APIs werden unter dem Namen „_AndroidX_“
weiterentwickelt, was im Code durch den Bestandteil 
`androidx` im Paketnamen der APIs erkennbar ist. Hierbei
handelt es sich APIs, die nicht mehr fest mit dem 
Android-Betriebssystem gekoppelt sind und somit unabhängig
von den Android-Versionen in einer App aktualisiert werden 
können. Es wird empfohlen, wo immer es möglich ist, diese 
AndroidX-APIs zu verwenden.
</Callout>

### Guides

Die Android-Dokumentation enthält unter 
[developer.android.com/guide](developer.android.com/guide) 
eine sehr umfangreiche und stufenweise Anleitung für
den Einstieg in die native Android-App-Entwicklung.

<Callout emoji="✅">
Die Guides eignen sich gut dazu, um zu bestimmten
Themen der Android-Entwicklung einen tieferen Einblick 
zu bekommen.
</Callout>

<Callout type="warning" emoji="‼️">
Teilweise sind diese Beschreibungen etwas veraltet und
enthalten nur teilweise die modernen Ansätze wie AndroidX
bzw. Android Jetpack oder Jetpack Compose.
</Callout>

### Beispiel-Apps (Samples)

Google stellt einige Beispiel-Apps inklusive Quellcode
bereit. Die zugehörigen Android-Studio-Projekten können
von GitHub heruntergeladen bzw. geklont werden.

- Jedes Jahr wird für Googles Konferenz I/O eine Android-App veröffentlicht: https://github.com/google/iosched
- Liste mit mehreren Apps in der Android-Dokumentation: https://developer.android.com/samples
- Weitere Android-Projekte auf GitHub: https://github.com/android
- Noch mehre Projekte von Google auf GitHub: https://github.com/googlesamples (evtl. nach _Kotlin_ filtern)


<Callout emoji="✅">
Komplette Android-Studio-Projekte Beispiel-Apps zeigen 
konkret im Code, wie bestimmte Aspekte umgesetzt werden,
sodass diese im eigenen Projekt übernommen werden können.
</Callout>

<Callout type="warning" emoji="‼️">
Auch bei den Samples ist natürlich auf Aktualität zu
achten.
</Callout>

### Kurse und Codelabs

Google stellt auch ganze Online-Kurse und Lernpfade
für die Android-Programmierung bereit:

- Ein Einsteigerkurs: https://developer.android.com/courses/android-basics-kotlin/course
- Weitere Kurse: https://developer.android.com/courses
- Lernpfade mit weiterführendem Material: https://developers.google.com/learn/pathways (nach _Mobile_ filtern)

Codelabs sind kurze Tutorials zu bestimmten Themen: 
https://codelabs.developers.google.com/ (z.B. nach _Android_ filtern)

<Callout emoji="✅">
Kurse benötigen natürlich mehr Zeit als die kompakten
Codelabs. Beide bieten sowohl einführendes als auch
weiterführendes Lernmaterial.
</Callout>

<Callout type="warning">
**Guides, Codelabs und Samples in Release Notes**

Zu den verschiedenen Jetpack-bzw. AndroidX-Bibliotheken
gibt es in den Release-Notes Links auf Guides, Codelabs
und Samples. 

Siehe z.B. _Room_ für den Datenbankzugriff unter
[developer.android.com/jetpack/androidx/releases/room](https://developer.android.com/jetpack/androidx/releases/room)
</Callout>

### Referenzen der APIs

Die technische API-Dokumentation liegt unter
[developer.android.com/reference](https://developer.android.com/reference). Hier können Details zur konkreten 
Verwendung bestimmter Klassen und Methoden im Code gefunden
werden. Diese Webseite ist mehrere Bereiche unterteilt, wobei
insbesondere die Referenzen für die Pakete `android` 
und `androidx` relevant sind:

- `android`: [developer.android.com/reference/packages](https://developer.android.com/reference/packages)
- `androix`: [developer.android.com/reference/androidx/packages](https://developer.android.com/reference/androidx/packages)

<Callout emoji="✅">
Die Referenzen sind hauptsächlich dann nützlich, wenn
bei der Programmierung mit bestimmten APIs deren
korrekte Verwendung sichergestellt werden soll.
</Callout>

## Weiteres Lernamterial

Im Web gibt es jede Menge Material unterschiedlichster
Art. Ein paar weitere Empfehlungen:

- Eine Art Android-Glossar zum Nachschlagen einzelne Begriffe oder Konzepte: https://developers.google.com/android/for-all/vocab-words/
- Offizieller YouTube-Channel: https://www.youtube.com/user/androiddevelopers
- Android Dev Blog: https://android-developers.googleblog.com
- Es gibt viele Online-Kurse, z.B. bei [Udacity](https://www.udacity.com/)

<Callout type="warning" emoji="‼️">
Nochmals sei erwähnt, dass hierbei auf Aktualität zu
achten ist.
</Callout>