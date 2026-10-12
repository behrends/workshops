# Android-Crashkurs: Schrittplan

Internes Dokument für die unterrichtende Person, nicht Teil der Website.

**Status:** Entwurf vor der Generalprobe (Oktober 2026). Nach der Generalprobe
um echte Zeiten, Stolperstellen und Live-Coding-Karten ergänzen.

## Ziel

Crashkurs in moderner Android-Entwicklung anhand einer **Wetter-App**:

- Schritte 0–9 von Hand im Live-Coding mit Fake-Daten, ein Commit und Tag pro Schritt
- Schritte 10–12 mit Coding Agents, einschließlich API-Anbindung (Open-Meteo)

Kernmoment des Kurses: In Schritt 10 wird nur das Repository ausgetauscht,
von Fake zu API, und die UI bleibt unverändert. Erst hier zeigt sich der Nutzen von MVVM.

Voraussetzungen aus `content/mobile/01-intro/`: Setup, Projekt erstellen,
Aufbau von Android-Projekten, Kotlin-Grundlagen.

## Vor der Generalprobe entscheiden

- [x] **Navigation:** Navigation 3 (neueste Version; vor der Generalprobe Release Notes prüfen)
- [x] **HTTP-Client:** Ktor Client mit kotlinx.serialization
      (Kotlin-first, Coroutines, multiplatformfähig, also weiterverwendbar in `03-android-kmp`;
      der Request steht explizit im Code, das hilft beim Lesen der Agent-Diffs).
      Retrofit nur als Hinweis: verbreitet in Googles Codelabs und in bestehenden Projekten.
- [ ] **Wettersymbole:** Emojis als `Text` (keine Abhängigkeit, Vorschlag)
      oder Vektor-Icons (Material Symbols)
- [ ] **Repo-Name:** passend zum Framework/Kurs, z. B. `wetter-app-android-tif24`, Tags `schritt-00` … `schritt-12`

## Datenmodell (ab Schritt 3, bleibt danach stabil)

Bewusst so geschnitten, dass es später zur Open-Meteo-API passt:

```kotlin
enum class WeatherCondition { CLEAR, PARTLY_CLOUDY, CLOUDY, FOG, RAIN, SNOW, THUNDERSTORM }

data class CurrentWeather(
    val temperature: Double,
    val windSpeed: Double,
    val condition: WeatherCondition,
)

data class DailyForecast(
    val date: LocalDate,
    val minTemp: Double,
    val maxTemp: Double,
    val precipitation: Double,
    val condition: WeatherCondition,
)

data class Weather(
    val city: String,
    val current: CurrentWeather,
    val daily: List<DailyForecast>,
)
```

Fake-Daten für drei Städte: Lörrach, Freiburg, Basel.

## Übersicht

| # | Konzept | Ergebnis im Code | Zeit (geschätzt) |
|---|---|---|---|
| 0 | Projekt, Aufbau | leeres Projekt, `MainActivity` minimal | 10 min |
| 1 | Composable, Preview | `WeatherScreen` mit Text | 15 min |
| 2 | Layouts, Modifier | `CurrentWeatherCard` mit Column/Row/Box/Spacer | 30 min |
| 3 | `data class`, Parameter | Datenmodell, Fake-Daten, stateless Composables | 25 min |
| 4 | Material 3 | Scaffold, TopAppBar, Card, Theme, Dark Mode | 25 min |
| 5 | Listen | 7-Tage-Vorhersage mit `LazyColumn` | 20 min |
| 6 | State | Umschalter °C/°F, State Hoisting | 30 min |
| 7 | ViewModel, UiState | `WeatherViewModel` mit `StateFlow` | 30 min |
| 8 | Repository, Loading/Error | `FakeWeatherRepository` mit `delay()`, Stadtauswahl | 30 min |
| 9 | Navigation | Detailansicht eines Tages | 30 min |
| 10 | API (Agent) | `ApiWeatherRepository` mit Open-Meteo | 45 min |
| 11 | Suche (Agent) | Stadtsuche über die Geocoding-API | 30 min |
| 12 | Erweiterungen (Agent) | Auswahl, siehe unten | offen |

Summe Schritte 0–9: ca. 4 h inklusive Folien. Nach der Generalprobe korrigieren.

---

## Teil 1: Von Hand mit Fake-Daten

### Schritt 0: Ausgangslage

- **Konzept:** Wiederholung Projektaufbau (Gradle, `MainActivity`, `ui/theme`)
- **Code:** neues Projekt „Wetter“ mit der Vorlage *Empty Activity*;
  `MainActivity` auf `setContent { WetterTheme { … } }` reduzieren, Greeting entfernen
- **Folien:** keine neuen, Verweis auf die Einleitung
- **Tag:** `schritt-00`

### Schritt 1: Composables und Preview

- **Konzept:** Composable = Funktion, die UI beschreibt; deklarativ vs. imperativ;
  `@Preview` vs. Emulator
- **Code:** Paket `ui/`, `WeatherScreen()` mit zwei `Text`s (Stadt, Temperatur, fest codiert);
  `@Preview` mit `showBackground = true`
- **Folien:** „Was ist ein Composable?“, „Deklarativ vs. imperativ“ (Diagramm)
- **Tag:** `schritt-01`

### Schritt 2: Layouts und Modifier

- **Konzept:** Column, Row, Box, Spacer; Modifier-Kette, Reihenfolge ist wichtig
- **Code:** `CurrentWeatherCard()`:
  - Column: Stadt, großes Emoji, Temperatur
  - Row: Wind | Min/Max, mit `Spacer(Modifier.weight(1f))`
  - Box: Hintergrund mit zentriertem Inhalt
  - Modifier: `padding`, `fillMaxWidth`, `background`, `size`
- **Didaktischer Moment:** `padding` vor und nach `background` vertauschen, Unterschied in der Preview zeigen
- **Folien:** „Layout-Boxen“ (Diagramm Column/Row/Box), „Modifier-Kette“
- **Tag:** `schritt-02`

### Schritt 3: Datenmodell und Fake-Daten

- **Konzept:** `data class`, `enum class`, `when`; Daten als Parameter (stateless Composables)
- **Code:**
  - `model/Weather.kt` (siehe Datenmodell)
  - `data/FakeData.kt` mit `fakeWeather` (Lörrach), 7 Tage
  - `WeatherCondition.emoji()` per `when`
  - `CurrentWeatherCard(current: CurrentWeather, city: String)`; Preview mit Fake-Daten
- **Falle:** `java.time.LocalDate` braucht minSdk 26 (sonst Core Library Desugaring);
  minSdk in der Projektvorlage prüfen, ggf. schon in Schritt 0 anpassen
- **Folien:** „data class“, „Composables bekommen Daten, sie holen sie nicht“
- **Tag:** `schritt-03`

### Schritt 4: Material 3

- **Konzept:** Material-Bausteine; Theme-Tokens statt fest codierter Farben und Größen
- **Code:**
  - `Scaffold` mit `TopAppBar` (Titel = Stadt)
  - `CurrentWeatherCard` in einer `Card`
  - `MaterialTheme.typography` (z. B. `displayLarge` für die Temperatur), `MaterialTheme.colorScheme`
  - Preview mit Dark Mode (`uiMode`); Dynamic Color erwähnen
- **Folien:** „Material 3: Komponenten, Farben, Typografie“
- **Tag:** `schritt-04`

### Schritt 5: Listen

- **Konzept:** `LazyColumn` vs. `Column`; `items(…, key = …)`
- **Code:**
  - `DailyForecastRow(day: DailyForecast)`: Wochentag, Emoji, Min/Max
  - `WeatherScreen`: `LazyColumn` mit Karte als erstem `item` und danach `items(weather.daily)`
- **Folien:** „Warum Lazy?“ (Diagramm: nur sichtbare Elemente werden komponiert)
- **Tag:** `schritt-05`

### Schritt 6: State

- **Konzept:** Recomposition, `remember`, `mutableStateOf`, `rememberSaveable`;
  State Hoisting: State nach unten, Events nach oben
- **Code:**
  - Umschalter °C/°F (z. B. `FilterChip` oder `Switch` in der TopAppBar)
  - zuerst ohne `remember`: funktioniert nicht, das bewusst zeigen
  - dann `remember`, dann `rememberSaveable` (Bildschirm drehen)
  - State Hoisting: `useCelsius` und `onToggle` als Parameter, Anzeige aller Temperaturen über eine Hilfsfunktion
- **Fallen:** Imports für `by` (`getValue`/`setValue`)
- **Folien:** „State und Recomposition“, „Unidirectional Data Flow“ (Diagramm)
- **Tag:** `schritt-06`

### Schritt 7: ViewModel und UiState

- **Konzept:** Warum ViewModel (überlebt Konfigurationsänderungen, trennt Logik von UI);
  `StateFlow`; UI-Zustand als `sealed interface`
- **Code:**
  - Abhängigkeiten: `lifecycle-viewmodel-compose`, `lifecycle-runtime-compose`
  - `WeatherUiState`: `Loading`, `Success(weather)`, `Error(message)`
  - `WeatherViewModel` mit `MutableStateFlow`, zunächst direkt mit `fakeWeather` befüllt
  - Screen: `viewModel()` und `collectAsStateWithLifecycle()`, `when (uiState)`
- **Diskussionspunkt:** Bleibt °C/°F im UI-State (`rememberSaveable`) oder kommt es ins ViewModel?
  (UI-Element-State vs. Screen-State)
- **Folien:** „MVVM-Schichten“ (Diagramm), „UiState als sealed interface“
- **Tag:** `schritt-07`

### Schritt 8: Repository, Loading und Error

- **Konzept:** Repository als Datenquelle hinter einem Interface; Coroutines (`suspend`, `viewModelScope`)
- **Code:**
  - `interface WeatherRepository { suspend fun getWeather(city: String): Weather }`
  - `FakeWeatherRepository`: `delay(1500)`, drei Städte, unbekannte Stadt → Exception
  - ViewModel: `class WeatherViewModel(private val repository: WeatherRepository = FakeWeatherRepository())`,
    `loadWeather(city)` mit `try`/`catch` → Loading/Success/Error
  - UI: `CircularProgressIndicator`, Fehleranzeige mit „Erneut versuchen“, Stadtauswahl per Chips
- **Hinweis:** Der Default-Parameter ersetzt bewusst eine ViewModel-Factory bzw. Dependency Injection.
  Hilt/Koin nur als Ausblick.
- **Folien:** „Repository-Pattern“, „Coroutines in 5 Minuten“
- **Tag:** `schritt-08`

### Schritt 9: Navigation

- **Konzept:** Screens, Routen als Typen, Back Stack, Argumente übergeben.
  Navigation 3: Der Back Stack ist eine Liste, die die App selbst als State hält
  (Anschluss an Schritt 6: Navigieren = Element hinzufügen/entfernen).
- **Code:**
  - Abhängigkeiten: `navigation3-runtime`, `navigation3-ui`; Kotlin-Serialization-Plugin
  - Routen als `@Serializable` Typen, die `NavKey` implementieren:
    `data object Home : NavKey`, `data class DayDetail(val index: Int) : NavKey`
  - `val backStack = rememberNavBackStack(Home)`
  - `NavDisplay(backStack, onBack = { backStack.removeLastOrNull() }, entryProvider = entryProvider { entry<Home> { … }; entry<DayDetail> { key -> … } })`
  - `DayDetailScreen`: Datum, Emoji, Min/Max, Niederschlag
  - Klick auf `DailyForecastRow` → `backStack.add(DayDetail(index))`; Zurück-Pfeil in der TopAppBar
  - Daten über das gemeinsame ViewModel: ViewModel oberhalb von `NavDisplay` holen und
    an beide Screens übergeben (kein ViewModel pro Eintrag)
- **Fallen (in der Generalprobe prüfen):** genaue Artefakt-Namen und Versionen; Serialization-Plugin
  in beiden Gradle-Dateien; Import von `NavKey`
- **Folien:** „Back Stack als Liste“ (Diagramm), „Routen als Typen, Argumente als Properties“
- **Tag:** `schritt-09`

---

## Teil 2: Mit Coding Agents

### Vorbereitung

- `AGENTS.md` im App-Repo (schon ab `schritt-00` mitliefern):
  - Architektur: UI → ViewModel → Repository; UiState als sealed interface
  - keine neuen Libraries ohne Begründung; Compose und Material 3
  - kleine Schritte, nach jedem Schritt bauen
- Ablauf pro Aufgabe: **Plan anfordern → Plan prüfen → umsetzen lassen → Diff lesen und erklären → committen**
- Lernziel: Agent-Output beurteilen und erklären können, nicht nur Code erzeugen lassen
- Tools: Gemini in Android Studio (bei allen schon installiert) oder andere Agents

### Schritt 10: API-Anbindung

- **Aufgabe:** `ApiWeatherRepository` für Open-Meteo bauen und den Default-Parameter im ViewModel umstellen
- **Endpunkt:**
  `https://api.open-meteo.com/v1/forecast?latitude=47.61&longitude=7.66&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
- **Was dazukommt:**
  - INTERNET-Permission im Manifest
  - Ktor: `ktor-client-core`, eine Engine (z. B. `ktor-client-okhttp`), `ktor-client-content-negotiation`,
    `ktor-serialization-kotlinx-json`
  - ein `HttpClient` mit `ContentNegotiation { json(Json { ignoreUnknownKeys = true }) }`
  - DTOs mit `@Serializable` und `@SerialName("temperature_2m")` usw., Mapping DTO → Datenmodell
  - WMO-Wettercodes auf `WeatherCondition` abbilden
- **Kernmoment:** Diff zeigen. UI-Dateien unverändert!
- **Beim Lesen des Diffs:** DTO vs. Datenmodell (warum zwei Klassen?), wo Fehler (kein Netz)
  im UiState landen, `client.get(…) { parameter(…) }.body()` erklären
- **Vergleichsaufgabe:** Agent zeigen lassen, wie dasselbe mit Retrofit aussähe
- Koordinaten der drei Städte vorerst fest im Code
- **Tag:** `schritt-10`

### Schritt 11: Stadtsuche

- **Aufgabe:** Suche per `TextField` über die Geocoding-API
  (`https://geocoding-api.open-meteo.com/v1/search?name=…&count=5&language=de`),
  Ergebnisliste, Auswahl lädt das Wetter
- Wiederholt State Hoisting und Events (Suchtext, Auswahl)
- **Tag:** `schritt-11`

### Schritt 12: Erweiterungen (Auswahl, auch als Übung)

- Favoriten dauerhaft speichern (DataStore oder Room). Ersetzt die bisherigen Room-Lektionen als Vertiefung.
- aktueller Standort (Runtime-Permission)
- Pull-to-Refresh
- Unit-Tests für das ViewModel mit `FakeWeatherRepository`
- stündliche Vorhersage mit `LazyRow`
- adaptives Layout für Tablets

---

## Zuordnung zu den MDX-Seiten (neues `content/mobile/02-android/`)

Seiten nach Konzept benannt, jede mit `slides: true` und Diff-Link auf ihren Schritt:

| Seite | Schritte |
|---|---|
| `01-compose` | 0, 1 |
| `02-layouts` | 2 |
| `03-daten` | 3 |
| `04-material` | 4 |
| `05-listen` | 5 |
| `06-state` | 6 |
| `07-viewmodel` | 7, 8 |
| `08-navigation` | 9 |
| `09-agents-api` | 10–12 |

Bisherige Todo-Lektionen ersetzen; Room (`03-android-kmp/01-room`, `02-room2`) als Vertiefung auf die Wetter-App umschreiben oder entfallen lassen.

## Notizen aus der Generalprobe

Pro Schritt nachtragen: echte Zeit, Stolperstellen, Snippets zum Einfügen statt Tippen.
Daraus entstehen anschließend die Live-Coding-Karten.

| # | Zeit real | Stolperstellen | Snippets vorbereiten |
|---|---|---|---|
| 0 | | | |
| 1 | | | |
| 2 | | | |
| 3 | | | Fake-Daten |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | Gradle-Abhängigkeiten |
| 8 | | | |
| 9 | | | Gradle-Abhängigkeiten, Navigation-Setup |

## Jährliches Update

1. Android-Studio-Version festlegen; die Entscheidungen oben neu prüfen
2. Neues Repo `wetter-app-<Jahr>` als Generalprobe bauen; Versionen in die README
3. MDX-Seiten mit den Tags abgleichen (Agent: Codebeispiele vs. Repo vergleichen)
4. Dieses Dokument aktualisieren: Zeiten, Stolperstellen, Karten
5. Repo-URL zentral ändern, deployen, Folien durchklicken
6. Altes Repo auf GitHub archivieren
