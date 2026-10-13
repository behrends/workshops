# KMP-Crashkurs: Schrittplan

Internes Dokument für die unterrichtende Person, nicht Teil der Website.

**Status:** Referenz-Repo gebaut (Oktober 2026), Generalprobe steht aus.

## Ziel

Einstieg in Kotlin Multiplatform in **60 Minuten** (höchstens 90):
Die Wetter-App aus dem Android-Crashkurs (Tag `schritt-10`) läuft
mit fast unverändertem Code auch auf iOS.

Kernmoment: Von gut 600 Zeilen Kotlin ändern sich 6 Dateien mit rund 40 Zeilen.
Fast jede Änderung hat denselben Grund: Android-APIs und Reflection gibt es auf iOS nicht.

## Entscheidungen

- [x] **Nur Smartphone:** Android und iOS, kein Desktop/Web/Server
- [x] **Wizard-Optionen:** Gradle, Share UI (Compose Multiplatform), Tests abgewählt
- [x] **Code kopieren** statt neu schreiben; Paket per *Replace in Files* umbenennen
- [x] **Theme-Name** `WeatherAndroidTIF24Theme` bleibt (kleinere Diffs)
- [x] **Room** nur als Satz im Ausblick (wie im Android-Teil gestrichen)
- [x] **iOS nur am Mac:** Vorführung am Mac; Windows/Linux sehen nur Android

## Vorbereitung (Studierende, vor der Vorlesung)

- Plugin „Kotlin Multiplatform“ installieren (Willkommensbildschirm → *Plugins*)
- macOS: Xcode installieren und einmal starten
- Projekt einmal bauen: Der erste iOS-Build lädt die Kotlin/Native-Werkzeuge
  (LLVM) herunter, das dauert und gehört nicht ins Hörsaal-WLAN

## Ablauf in 60 Minuten

| Min | Tag | Inhalt | Modus | Seite |
|---|---|---|---|---|
| 10 | `kmp-00` | KMP/CMP, Wizard, Projektstruktur | Live | `01-einrichtung` |
| 5 | `kmp-01` | Abhängigkeiten | Snippets einfügen | `02-code-uebernehmen` |
| 10 | `kmp-02` | Code kopieren, Compile-Fehler zeigen | Live | `02-code-uebernehmen` |
| 10 | `kmp-03` | Fehler beheben (Tabelle auf der Folie) | Walkthrough | `02-code-uebernehmen` |
| 10 | `kmp-04` | Absturz unter iOS, `viewModel { }`, App auf beiden Plattformen | Live | `02-code-uebernehmen` |
| 5 | – | `expect`/`actual`, Ressourcen, Bibliotheken | Ausblick | `03-ausblick` |
| 10 | – | Puffer (Gradle, Xcode) | | |

### Vor der Vorlesung

- [ ] Xcode einmal gestartet (nach jedem Xcode-Update nötig)
- [ ] iOS-Simulator einmal mit `kmp-02` → `kmp-04` gebaut, damit die
      Kotlin/Native-Downloads (LLVM) schon da sind
- [ ] Projekt danach auf `kmp-02` ausgecheckt, Gradle-Sync durch
- [ ] `kmp-00` und `kmp-04` je einmal komplett gestartet (Android und iOS-Simulator,
      nicht nur kompiliert: Linking, Xcode-Build, Start, Wetter laden)
- [ ] In Android Studio einen Simulator als iOS-Ziel ausgewählt (kein Gerät, kein Signing)
- [ ] Emulator und iOS-Simulator gestartet
- [ ] alle Tags lokal (`git fetch --tags`)

## Live-Karten

**`kmp-00`: Projekt erstellen** (10 Min)

1. Willkommensbildschirm → *Plugins* → „Kotlin Multiplatform“ (schon installiert, nur zeigen)
2. *New Project* → *Generic* → *Kotlin Multiplatform*; Gradle; Android + iOS
   mit *Share UI*; Desktop, Web, Server, Tests abwählen
3. Struktur zeigen: `shared/src/commonMain/…/App.kt`, `androidApp/…/MainActivity.kt`,
   `iosApp/iosApp/ContentView.swift` → alle zeigen `App()`
4. Für die weitere Vorführung auf das vorbereitete Repo wechseln

**`kmp-02`: Code kopieren** (10 Min)

1. `git checkout kmp-01`; `model/`, `data/`, `ui/` aus der Android-App
   (`schritt-10`) nach `shared/src/commonMain/kotlin/com/example/weatherkmptif24/` ziehen
2. *Edit → Find → Replace in Files*: `weatherandroidtif24` → `weatherkmptif24`
3. `App()` auf `WeatherAndroidTIF24Theme { WeatherApp() }` umstellen
4. Fehlerliste zeigen (Notfall: `git stash -u && git checkout kmp-02`, `-u` wegen
   der kopierten, noch unversionierten Dateien):
   `./gradlew :shared:compileCommonMainKotlinMetadata --continue`
5. Fehler der Folientabelle zuordnen (Fehler in `WeatherApp.kt` bei
   `rememberNavBackStack` → nächste Folie „Navigation 3“), dann
   `git checkout kmp-03` (Walkthrough)

**`kmp-04`: Absturz unter iOS** (10 Min)

1. Auf `kmp-03` die iOS-App über die Run-Konfiguration **neu bauen und starten**.
   Im Simulator liegt sonst noch die funktionierende App von `kmp-04`: nicht das
   App-Icon antippen, auch nicht nach einem fehlgeschlagenen Build.
   → Absturz, Fehlermeldung in der Konsole zeigen
2. Android-App starten → läuft
3. `viewModel()` → `viewModel { WeatherViewModel() }` in `WeatherApp` und `WeatherScreen`
4. Beide Apps starten, Stadt antippen, unter iOS vom linken Rand zurückwischen

**Ausblick `expect`/`actual`:** Die Dateien `Platform*.kt` gibt es nur in `kmp-00`
(beim Übernehmen gelöscht). Auf GitHub im Tag `kmp-00` öffnen oder die Folie nehmen.

## Stolperstellen

- `kmp-02` kompiliert absichtlich nicht für iOS (der Android-Teil kompiliert
  noch). Fehlerliste per
  `./gradlew :shared:compileCommonMainKotlinMetadata --continue` zeigen
- `kmp-03` → Absturz nur unter iOS sichtbar, unter Android läuft alles.
  Fehlermeldung: `UnsupportedOperationException: Factory.create(String, CreationExtras) is not implemented`
- `String.format` fehlt in Common Kotlin: Koordinaten ungerundet (Übung)
- Zurück unter iOS: Wischen vom linken Rand (kein Pfeil nötig, `NavDisplay` reagiert darauf)
- Xcode schreibt beim Öffnen `iosApp.xcodeproj/project.pbxproj` um (neue IDs, keine
  inhaltliche Änderung). Vor dem Wechsel zwischen Tags `git checkout -- iosApp` oder `git stash`
- Navigation 3 und Lifecycle kommen von JetBrains (`org.jetbrains.androidx…`),
  Versionen können hinter Android liegen

## Notizen aus der Generalprobe

| Tag | Modus | Zeit real | Stolperstellen |
|---|---|---|---|
| – | erster iOS-Build (mit Downloads) | | |
| `kmp-00` | Live | | |
| `kmp-01` | Snippets | | |
| `kmp-02` | Live | | |
| `kmp-03` | Walkthrough | | |
| `kmp-04` | Live | | |

## Referenz-Repo

[github.com/behrends/WeatherKMPTIF24](https://github.com/behrends/WeatherKMPTIF24) (öffentlich; lokal unter `~/tmp/WeatherKMPTIF24`), Tags `kmp-00` … `kmp-04`.
`kmp-00` = Wizard-Projekt, `kmp-01` bis `kmp-04` von Claude Code gebaut;
Android und iOS gebaut, im Simulator und Emulator durchgeklickt.

Versionen (Okt. 2026): Android Studio Rabbit 2026.2.1, KMP-Plugin 262.9437.133-AS,
Xcode 27.0, AGP 9.1.1, Kotlin 2.4.20, Compose Multiplatform 1.12.1,
Material 3 1.12.0-alpha03, Lifecycle 2.11.0, Navigation 3 (JetBrains) 1.1.2,
kotlinx-serialization 1.11.0, Ktor 3.6.0, Gradle 9.5.1, JDK 21.

## Jährliches Update

1. Plugin und Wizard prüfen (Optionen ändern sich); Setup-Abschnitt in `01-einrichtung` anpassen
2. Neues Wizard-Projekt, Code vom neuen Android-Tag kopieren, Schritte neu bauen
3. Prüfen, ob die Anpassungen noch nötig sind (z. B. `viewModel()` ohne Initializer)
4. Versionen und Stolperstellen hier aktualisieren
