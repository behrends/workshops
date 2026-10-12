# Android-Crashkurs: Schrittplan

Internes Dokument für die unterrichtende Person, nicht Teil der Website.

**Status:** Entwurf vor der Generalprobe (Oktober 2026). Nach der Generalprobe
um echte Zeiten, Stolperstellen und Live-Coding-Karten ergänzen.

## Ziel

Crashkurs in moderner Android-Entwicklung anhand einer **Wetter-App**,
vorgeführt in **120 Minuten**:

- Städteliste → aktuelles Wetter einer Stadt (keine Vorhersage, die ist eine Erweiterung)
- Schritte 0–9 mit Fake-Daten, teils live, teils als Walkthrough; ein Commit und Tag pro Schritt
- Schritt 10 mit einem Coding Agent live: API-Anbindung (Open-Meteo)
- Schritte 11–12 als Ausblick und Übung

Kernmoment: In Schritt 10 wird nur das Repository ausgetauscht, von Fake zu API,
und die UI bleibt unverändert. Erst hier zeigt sich der Nutzen von MVVM.

Die 120 Minuten sind eine Vorführung, kein Kurs zum Mitcoden. Die Lernarbeit passiert
danach mit dem Repo (Tags pro Schritt), den MDX-Seiten und den Übungen.

Voraussetzungen aus `content/mobile/01-intro/`: Setup, Projekt erstellen,
Aufbau von Android-Projekten, Kotlin-Grundlagen.

## Vor der Generalprobe entscheiden

- [x] **Navigation:** Navigation 3 (Doku geprüft Okt. 2026, siehe Schritt 9)
- [x] **HTTP-Client:** Ktor Client mit kotlinx.serialization
      (Kotlin-first, Coroutines, multiplatformfähig, also weiterverwendbar in `03-android-kmp`;
      der Request steht explizit im Code, das hilft beim Lesen der Agent-Diffs).
      Retrofit nur als Hinweis: verbreitet in Googles Codelabs und in bestehenden Projekten.
- [ ] **Wettersymbole:** Emojis als `Text` (keine Abhängigkeit, Vorschlag)
      oder Vektor-Icons (Material Symbols)
- [ ] **Repo-Name:** passend zum Framework/Kurs, z. B. `wetter-app-android-tif24`, Tags `schritt-00` … `schritt-12`

## Datenmodell (ab Schritt 3, bleibt danach stabil)

Bewusst so geschnitten, dass es später zur Open-Meteo-API passt
(die Koordinaten braucht die API in Schritt 10):

```kotlin
enum class WeatherCondition { CLEAR, PARTLY_CLOUDY, CLOUDY, FOG, RAIN, SNOW, THUNDERSTORM }

data class City(
    val name: String,
    val latitude: Double,
    val longitude: Double,
)

data class CurrentWeather(
    val temperature: Double,
    val windSpeed: Double,
    val condition: WeatherCondition,
)
```

In Schritt 9 bekommt `City` zusätzlich `@Serializable`, weil sie Argument einer Route wird.

Fake-Daten: Lörrach, Freiburg, Basel (Vorlage `leitfaden/vorlagen/FakeData.kt`).

## Ablauf in 120 Minuten

Modi:
- **Live:** tippen und erklären. Nur für die Kernkonzepte.
- **Walkthrough:** `git checkout schritt-XX`, Diff und laufende App zeigen, wichtige Zeilen erklären.
- **Ausblick:** nur erwähnen, als Übung mitgeben.

| Min | # | Konzept | Ergebnis im Code | Modus |
|---|---|---|---|---|
| 5 | – | Überblick | fertige App zeigen, Architektur-Diagramm | Demo |
| 15 | 0–2 | Composable, Preview, Layouts, Modifier | `WeatherScreen`, `CurrentWeatherCard` | Live |
| 10 | 3–5 | `data class`, Material 3, Listen | Datenmodell, Scaffold/Card, `CityListScreen` mit `LazyColumn` | Walkthrough |
| 15 | 6 | State | Umschalter °C/°F, State Hoisting | Live |
| 15 | 7 | ViewModel, UiState | `WeatherViewModel` mit `StateFlow` | Live |
| 5 | 8 | Repository, Loading/Error | `FakeWeatherRepository` mit `delay()` | Walkthrough |
| 10 | 9 | Navigation 3 | Städteliste → Wetter der Stadt | Walkthrough |
| 25 | 10 | API mit Agent | `ApiWeatherRepository` mit Open-Meteo | Agent live |
| 5 | 11–12 | Erweiterungen | Stadtsuche, Vorhersage, Favoriten … | Ausblick |
| 15 | – | Puffer | Fragen, Pannen (Gradle, Emulator, WLAN) | |

Für die Generalprobe gilt: **alle** Schritte von Hand bauen und taggen, auch die Walkthrough-Schritte.

### Vor der Vorlesung

- [ ] Projekt auf `schritt-00` ausgecheckt, Gradle-Sync durch, App einmal gebaut
- [ ] Emulator gestartet, App einmal darauf ausgeführt
- [ ] Open-Meteo im Hörsaal-WLAN erreichbar (Endpunkt im Browser aufrufen)
- [ ] Agent eingeloggt und kurz getestet
- [ ] Folien im Browser offen, Schriftgröße in Android Studio für den Beamer erhöht
- [ ] Fallback: alle Tags lokal vorhanden (`git fetch --tags`)

---

## Teil 1: Mit Fake-Daten

### Schritt 0: Ausgangslage

- **Modus:** vorbereitet, nur kurz zeigen
- **Konzept:** Wiederholung Projektaufbau (Gradle, `MainActivity`, `ui/theme`)
- **Code:** neues Projekt „Wetter“ mit der Vorlage *Empty Activity*;
  `MainActivity` auf `setContent { WetterTheme { … } }` reduzieren, Greeting entfernen;
  `AGENTS.md` aus `leitfaden/vorlagen/wetter-app-AGENTS.md`
- **Folien:** keine neuen, Verweis auf die Einleitung
- **Tag:** `schritt-00`

### Schritt 1: Composables und Preview

- **Modus:** Live
- **Konzept:** Composable = Funktion, die UI beschreibt; deklarativ vs. imperativ;
  `@Preview` vs. Emulator
- **Code:** neue Datei `ui/WeatherScreen.kt` (Paket `ui` gibt es schon wegen `ui/theme`), `WeatherScreen()` mit zwei `Text`s (Stadt, Temperatur, fest codiert);
  `@Preview` mit `showBackground = true`; in `MainActivity` mit `Modifier.safeDrawingPadding()`
  (wegen Edge-to-Edge)
- **Didaktischer Moment:** Die beiden Texte überlappen sich, weil ein Layout fehlt. Überleitung zu Schritt 2
- **Folien:** „Was ist ein Composable?“, „Deklarativ vs. imperativ“ (Diagramm)
- **Tag:** `schritt-01`

### Schritt 2: Layouts und Modifier

- **Modus:** Live
- **Konzept:** Column, Row, Box, Spacer; Modifier-Kette, Reihenfolge ist wichtig
- **Code:** `CurrentWeatherCard()`:
  - Column: Stadt, großes Emoji, Temperatur
  - Row: Wind | Zustand, mit `Spacer(Modifier.weight(1f))`
  - Box: Hintergrund mit zentriertem Inhalt
  - Modifier: `padding`, `fillMaxWidth`, `background`, `size`
- **Didaktischer Moment:** `padding` vor und nach `background` vertauschen, Unterschied in der Preview zeigen
- **Folien:** „Layout-Boxen“ (Diagramm Column/Row/Box), „Modifier-Kette“
- **Tag:** `schritt-02`

### Schritt 3: Datenmodell und Fake-Daten

- **Modus:** Walkthrough
- **Konzept:** `data class`, `enum class`, `when`; Daten als Parameter (stateless Composables)
- **Code:**
  - `model/City.kt`, `model/CurrentWeather.kt` (siehe Datenmodell)
  - `data/FakeData.kt` aus der Vorlage einfügen (`fakeCities`, `fakeCurrentWeather`)
  - `ui/WeatherConditionUi.kt`: `WeatherCondition.emoji()` und `.label()` per `when`
    (Anzeige gehört zur UI, nicht ins Datenmodell)
  - `CurrentWeatherCard(city: City, weather: CurrentWeather)`; Preview mit Fake-Daten
- **Folien:** „data class“, „Composables bekommen Daten, sie holen sie nicht“
- **Tag:** `schritt-03`

### Schritt 4: Material 3

- **Modus:** Walkthrough
- **Konzept:** Material-Bausteine; Theme-Tokens statt fest codierter Farben und Größen
- **Code:**
  - `Scaffold` mit `TopAppBar` (Titel = Stadt)
  - `CurrentWeatherCard` in einer `Card`
  - `MaterialTheme.typography` (z. B. `displayLarge` für die Temperatur), `MaterialTheme.colorScheme`
  - Preview mit Dark Mode (`uiMode`); Dynamic Color erwähnen
- **Folien:** „Material 3: Komponenten, Farben, Typografie“
- **Tag:** `schritt-04`

### Schritt 5: Listen

- **Modus:** Walkthrough
- **Konzept:** `LazyColumn` vs. `Column`; `items(…, key = …)`
- **Code:**
  - `CityListScreen(cities: List<City>, onCityClick: (City) -> Unit)` mit `LazyColumn`
    und `ListItem` pro Stadt; `Scaffold` mit Titel „Städte“
  - `MainActivity` zeigt vorerst die Städteliste; `WeatherScreen` nur in der Preview
    (verbunden werden beide erst in Schritt 9)
- **Folien:** „Warum Lazy?“ (Diagramm: nur sichtbare Elemente werden komponiert)
- **Tag:** `schritt-05`

### Schritt 6: State

- **Modus:** Live
- **Konzept:** Recomposition, `remember`, `mutableStateOf`, `rememberSaveable`;
  State Hoisting (State liegt oben), Unidirectional Data Flow (State nach unten, Events nach oben)
- **Code:**
  - Umschalter °C/°F im `WeatherScreen` als `UnitToggle` (`TextButton` in den `actions` der TopAppBar)
  - zuerst ohne `remember`: funktioniert nicht, das bewusst zeigen
  - dann `remember`, dann `rememberSaveable` (Bildschirm drehen)
  - State Hoisting: `useCelsius` und `onToggle` als Parameter; Anzeige über eine Hilfsfunktion
  - `MainActivity` zeigt ab hier `WeatherScreen` (für das Drehen im Emulator), bis Schritt 9
  - `formatTemperature(celsius, useCelsius)` in `ui/WeatherConditionUi.kt`
- **Fallen:** Imports für `by` (`getValue`/`setValue`)
- **Folien:** „State und Recomposition“, „Unidirectional Data Flow“ (Diagramm)
- **Tag:** `schritt-06`

### Schritt 7: ViewModel und UiState

- **Modus:** Live
- **Konzept:** Warum ViewModel (überlebt Konfigurationsänderungen, trennt Logik von UI);
  `StateFlow`; UI-Zustand als `sealed interface`
- **Code:**
  - Abhängigkeiten: `lifecycle-viewmodel-compose`, `lifecycle-runtime-compose` (als Snippet einfügen)
  - `WeatherUiState`: `Loading`, `Success(city, weather)`, `Error(message)`
  - `WeatherViewModel` mit `MutableStateFlow`, zunächst direkt mit Fake-Daten für Lörrach befüllt
  - Aufteilung in **stateful** `WeatherScreen(viewModel)` (holt `uiState` per `collectAsStateWithLifecycle()`)
    und **stateless** `WeatherContent(uiState)` mit `when (uiState)`. Nur so funktionieren die Previews
    weiter, denn eine Preview kann kein ViewModel erzeugen. Wichtiger Punkt für die Live-Erklärung!
  - Previews für Success und Loading
- **Diskussionspunkt:** Bleibt °C/°F im UI-State (`rememberSaveable`) oder kommt es ins ViewModel?
  (UI-Element-State vs. Screen-State)
- **Folien:** „MVVM-Schichten“ (Diagramm), „UiState als sealed interface“
- **Tag:** `schritt-07`

### Schritt 8: Repository, Loading und Error

- **Modus:** Walkthrough
- **Konzept:** Repository als Datenquelle hinter einem Interface; Coroutines (`suspend`, `viewModelScope`)
- **Code:**
  - `interface WeatherRepository { suspend fun getCurrentWeather(city: City): CurrentWeather }`
  - `FakeWeatherRepository(private val shouldFail: Boolean = false)`: `delay(1500)`,
    liefert aus `fakeCurrentWeather`, bei `shouldFail` oder unbekannter Stadt → Exception
  - ViewModel: `class WeatherViewModel(private val repository: WeatherRepository = FakeWeatherRepository())`,
    `loadWeather(city)` mit `try`/`catch` → Loading/Success/Error; vorerst im `init` für Lörrach aufgerufen
  - `catch (e: CancellationException) { throw e }` vor `catch (e: Exception)`: Abbruch einer Coroutine
    ist kein Fehler. Kurz erwähnen, nicht vertiefen.
  - UI: `CircularProgressIndicator`, Fehlermeldung als Text; Previews für Loading und Error
  - Bewusst weggelassen: Button „Erneut versuchen“ (Übung, siehe Schritt 12)
- **Im Walkthrough zeigen:** einmal mit `shouldFail = true` starten → Fehleranzeige
- **Hinweis:** Der Default-Parameter ersetzt bewusst eine ViewModel-Factory bzw. Dependency Injection.
  Hilt/Koin nur als Ausblick.
- **Folien:** „Repository-Pattern“, „Coroutines in 5 Minuten“
- **Tag:** `schritt-08`

### Schritt 9: Navigation

- **Modus:** Walkthrough
- **Konzept:** Screens, Routen als Typen, Back Stack, Argumente übergeben.
  Navigation 3: Der Back Stack ist eine Liste, die die App selbst als State hält
  (Anschluss an Schritt 6: Navigieren = Element hinzufügen/entfernen).
- **Code:**
  - Abhängigkeiten: `androidx.navigation3:navigation3-runtime`, `androidx.navigation3:navigation3-ui`,
    `org.jetbrains.kotlinx:kotlinx-serialization-core`; Plugin `org.jetbrains.kotlin.plugin.serialization`
    (laut Doku Okt. 2026: Navigation 3 Version 1.2.0; Version bei der Generalprobe aus der Doku übernehmen)
  - `NavKey` + `@Serializable` sind für `rememberNavBackStack` Pflicht (Back Stack übersteht Drehen und Prozessende)
  - `City` bekommt `@Serializable`
  - Routen: `@Serializable data object CityList : NavKey`,
    `@Serializable data class CityWeather(val city: City) : NavKey`
  - `val backStack = rememberNavBackStack(CityList)`
  - `NavDisplay(backStack, onBack = { backStack.removeLastOrNull() }, entryProvider = entryProvider { entry<CityList> { … }; entry<CityWeather> { key -> … } })`
  - Neue Datei `ui/WeatherApp.kt` mit Routen und `NavDisplay`; `MainActivity` zeigt `WeatherApp()`
  - Klick auf eine Stadt → `viewModel.loadWeather(city)` und `backStack.add(CityWeather(city))`;
    `init`-Aufruf im ViewModel entfällt; `WeatherScreen(city, viewModel)`, Titel aus der Route
  - Bewusst weggelassen: Zurück-Pfeil in der TopAppBar. Die System-Zurück-Geste reicht und läuft
    über `onBack` im `NavDisplay`. (Pfeil als Übung: Material 3 bringt keine Icons mehr mit, also
    Vektor-Drawable per *New → Vector Asset*; Vorsicht bei `android:tint="?attr/colorControlNormal"`,
    das ohne AppCompat einen Build-Fehler gibt.)
  - ViewModel oberhalb von `NavDisplay` holen und an den Wetter-Screen übergeben.
    Ohne Decorator ist `viewModel()` an die Activity gebunden.
    `lifecycle-viewmodel-navigation3` (ViewModel pro Eintrag) wird nicht gebraucht, nur als Ausblick.
- **Bewusste Vereinfachung:** Laden beim Klick statt beim Öffnen des Screens. Nach einem Prozessende
  stellt der Back Stack den Wetter-Screen wieder her, das ViewModel hat aber keine Daten.
  Sauberer wäre `LaunchedEffect(city)` oder ein ViewModel pro Eintrag; als Ausblick nennen.
- **Fallen:**
  - Serialization-Plugin an drei Stellen: `libs.versions.toml` (Version = Kotlin-Version),
    Root-`build.gradle.kts` (`apply false`), `app/build.gradle.kts`
  - Import von `NavKey`; `onBack` nicht vergessen
- **Folien:** „Back Stack als Liste“ (Diagramm), „Routen als Typen, Argumente als Properties“
- **Tag:** `schritt-09`

---

## Teil 2: Mit Coding Agents

### Vorbereitung

- `AGENTS.md` im App-Repo (schon ab `schritt-00`), Vorlage `leitfaden/vorlagen/wetter-app-AGENTS.md`:
  - nur Regeln, die nicht im Code stehen: Ktor statt Retrofit, keine neuen
    Libraries ohne Rückfrage, DTOs, UI nicht anfassen, Plan zuerst, bauen,
    nicht committen
  - keine Projekt- oder Architekturbeschreibung: hilft laut Studien kaum
    und kostet Tokens (Gloaguen et al., arXiv 2602.11988)
  - wird automatisch gelesen (Gemini in Android Studio, Codex, Cursor,
    Copilot; Claude Code nur ohne `CLAUDE.md`), im Prompt nicht erwähnen
- Ablauf pro Aufgabe: **Plan anfordern → Plan prüfen → umsetzen lassen → Diff lesen und erklären → committen**
- Lernziel: Agent-Output beurteilen und erklären können, nicht nur Code erzeugen lassen
- Tools: Gemini in Android Studio (bei allen schon installiert) oder andere Agents

### Schritt 10: API-Anbindung

- **Modus:** Agent live (25 min). Wartezeit nutzen, um den Plan des Agents zu erklären.
  Fallback: `git checkout schritt-10`
- **Aufgabe:** `ApiWeatherRepository` für Open-Meteo bauen und den Default-Parameter im ViewModel umstellen
- **Endpunkt** (Koordinaten aus `City`):
  `https://api.open-meteo.com/v1/forecast?latitude=47.61&longitude=7.66&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
- **Was dazukommt:**
  - INTERNET-Permission im Manifest
  - Ktor (laut Doku Okt. 2026: Version 3.6.0): `io.ktor:ktor-client-core`, `io.ktor:ktor-client-okhttp`,
    `io.ktor:ktor-client-content-negotiation`, `io.ktor:ktor-serialization-kotlinx-json`.
    Engine OkHttp: in Ktors eigenen Beispielen für Android verwendet, unterstützt HTTP/2.
  - ein `HttpClient` mit `ContentNegotiation { json(Json { ignoreUnknownKeys = true }) }`
  - DTOs mit `@Serializable` und `@SerialName("temperature_2m")` usw., Mapping DTO → `CurrentWeather`
  - WMO-Wettercodes auf `WeatherCondition` abbilden
- **Kernmoment:** Diff zeigen. Kein Composable geändert, im ViewModel nur der Default-Parameter
  (`git diff --stat schritt-09 schritt-10`: 7 Dateien, alle in `data/`, Gradle, Manifest und eine Zeile im ViewModel)
- **Beim Lesen des Diffs:** DTO vs. Datenmodell (warum zwei Klassen?), wo Fehler (kein Netz)
  im UiState landen, `client.get(…) { parameter(…) }.body()` erklären
- **Vergleichsaufgabe (Übung):** Agent zeigen lassen, wie dasselbe mit Retrofit aussähe
- **Tag:** `schritt-10`

### Schritt 11: Stadtsuche (Ausblick, Übung)

- **Aufgabe:** Suche per `TextField` über die Geocoding-API
  (`https://geocoding-api.open-meteo.com/v1/search?name=…&count=5&language=de`),
  gefundene Stadt zur Liste hinzufügen
- Referenzlösung: `CityRepository`/`ApiCityRepository`, `CityListViewModel` mit `CityListUiState`
  (Städte, Suchergebnisse, `isSearching`, Fehlermeldung); Suchtext als `rememberSaveable` im Composable;
  Antippen eines Ergebnisses fügt die Stadt hinzu und öffnet das Wetter
- **Falle:** Mehrere Städte heißen gleich (z. B. 4× Hamburg) → `key = { it.name }` in `LazyColumn`
  stürzt ab. Koordinaten als Key verwenden.
- **Verbesserung (Übung):** Land/Region im Suchergebnis anzeigen, sonst sind gleichnamige Städte nicht unterscheidbar
- Wiederholt State Hoisting und Events (Suchtext, Auswahl)
- **Tag:** `schritt-11` (in der Generalprobe bauen, als Referenz)

### Schritt 12: Erweiterungen (Auswahl, Übung)

- 7-Tage-Vorhersage: `daily=…` in der API, neues Datenmodell `DailyForecast`, Liste im Wetter-Screen.
  Zeigt, wie man mit einer stabilen Architektur ein Feature ergänzt.
- „Erneut versuchen“-Button bei Fehlern (braucht die Stadt im Error-Zustand)
- Zurück-Pfeil in der TopAppBar (siehe Schritt 9)
- Favoriten dauerhaft speichern (DataStore oder Room)
- aktueller Standort (Runtime-Permission)
- Laden beim Öffnen des Screens (`LaunchedEffect`) bzw. ViewModel pro Eintrag, siehe Schritt 9
- Pull-to-Refresh
- Unit-Tests für das ViewModel mit `FakeWeatherRepository`
- adaptives Layout für Tablets (Liste und Wetter nebeneinander)

---

## Zuordnung zu den MDX-Seiten (`content/mobile/02-android-wetter/`)

Vorerst in der Navigation versteckt (`display: 'hidden'` in `content/mobile/_meta.js`).
Umschalten: alten Ordner `02-android` entfernen bzw. umbenennen und den Eintrag sichtbar machen.
Die Links zeigen auf `github.com/behrends/WeatherAndroidTIF24`; Repo vorher dort veröffentlichen.

Vier Seiten, jede mit `slides: true`. Pro Seite: kurze Erklärungen in `DocsOnly`, wenige Folien,
normale Markdown-Links auf die Tags im Repo (keine eigene Komponente; die Repo-URL wird jährlich
per Suchen und Ersetzen getauscht). Die Walkthrough-Schritte brauchen die besseren Erklärungen,
weil sie in der Vorführung nur kurz gezeigt werden.

| Seite | Schritte | Diagramme |
|---|---|---|
| `01-compose` | 0–5: Composables, Layouts, Modifier, `data class`, Material 3, Listen | – (live in Android Studio) |
| `02-state` | 6: State, Recomposition, State Hoisting | Unidirectional Data Flow |
| `03-architektur` | 7–8: ViewModel, UiState, Repository | MVVM-Schichten |
| `04-navigation-api` | 9–10: Navigation 3, API mit Agent; 11–12 als Übungen | – |

Bisherige Todo-Seiten bleiben, bis die neuen fertig sind, und werden dann ersetzt.
Vorerst gestrichen: Room-Vertiefung, Speaker Notes, Seite zur Stadtsuche.

## Referenz-Repo

`~/tmp/WeatherAndroidTIF24` (lokal, noch nicht auf GitHub), Tags `schritt-00` … `schritt-11`.
Schritte 1–11 von Claude Code gebaut; jeder Schritt mit `./gradlew assembleDebug` gebaut,
API-Aufrufe (Schritt 10, 11) einmal per Unit-Test gegen Open-Meteo geprüft.
**Nicht geprüft:** Previews und App im Emulator; das ist das Durchklicken der Tags.

Versionen (Okt. 2026): Android Studio mit AGP 9.4.1 (Kotlin eingebaut, kein `kotlin-android`-Plugin),
Kotlin 2.2.10, Compose BOM 2026.02.01, compileSdk/targetSdk 37, minSdk 24,
Lifecycle 2.11.0, Navigation 3 1.2.0, kotlinx-serialization-core 1.9.0, Ktor 3.6.0.

## Notizen aus der Generalprobe

Pro Schritt nachtragen: echte Zeit, Stolperstellen, Snippets zum Einfügen statt Tippen.
Daraus entstehen anschließend Live-Coding-Karten, nur für die Live-Schritte 1, 2, 6 und 7.
Für Walkthrough-Schritte genügt der Diff des Tags.

| # | Modus | Zeit real | Stolperstellen | Snippets vorbereiten |
|---|---|---|---|---|
| 0 | vorbereitet | | | |
| 1 | Live | | | |
| 2 | Live | | | |
| 3 | Walkthrough | | | Fake-Daten |
| 4 | Walkthrough | | | |
| 5 | Walkthrough | | | |
| 6 | Live | | | |
| 7 | Live | | | Gradle-Abhängigkeiten |
| 8 | Walkthrough | | | |
| 9 | Walkthrough | | | Gradle-Abhängigkeiten, Navigation-Setup |
| 10 | Agent live | | | Prompt für den Agent |

## Jährliches Update

1. Aktuellste Android-Studio-Version installieren; die Entscheidungen oben neu prüfen
2. Neues Repo (Name siehe oben) als Generalprobe bauen; Versionen in die README
3. MDX-Seiten mit den Tags abgleichen (Agent: Codebeispiele vs. Repo vergleichen)
4. Dieses Dokument aktualisieren: Zeiten, Stolperstellen, Karten
5. Repo-URL zentral ändern, deployen, Folien durchklicken
6. Altes Repo auf GitHub archivieren
