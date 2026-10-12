# Live-Coding-Karten Android-Crashkurs

Nur für die Live-Schritte 1, 2, 6 und 7. Abgeleitet aus den Diffs im Referenz-Repo
(github.com/behrends/WeatherAndroidTIF24); Stolperstellen und echte Zeiten nach der
Generalprobe ergänzen. Notfall immer: `git stash && git checkout schritt-XX`.

---

## Schritt 1: Composables und Preview

**Start:** `schritt-00` · **Ziel:** `schritt-01` · **Zeit:** ca. 5 Min (mit 0 und 2: 15 Min)

1. Rechtsklick auf Paket `ui` → *New → Kotlin Class/File* → *File* `WeatherScreen`
2. `@Composable fun WeatherScreen(modifier: Modifier = Modifier)` mit
   `Text("Lörrach")` und `Text("14 °C")`, beide mit `modifier = modifier`
3. `@Preview(showBackground = true)` mit `WeatherScreenPreview()` → Split-Ansicht zeigen
4. `MainActivity`: `WeatherScreen(modifier = Modifier.safeDrawingPadding())`
   im Theme-Block; kurz Edge-to-Edge erklären
5. App starten

**Erklären:** Funktion statt Klasse, deklarativ, `modifier`-Konvention
**Moment:** Texte überlappen → Überleitung zu Layouts
**Stolperstellen:** –

---

## Schritt 2: Layouts und Modifier

**Start:** `schritt-01` · **Ziel:** `schritt-02`

1. Neues Composable `CurrentWeatherCard(modifier: Modifier = Modifier)`,
   `WeatherScreen` ruft es nur noch mit `modifier = modifier` auf
2. `Column(horizontalAlignment = Alignment.CenterHorizontally)`:
   Stadt (28.sp), „⛅“ (72.sp), „14 °C“ (48.sp)
3. `Spacer(Modifier.height(16.dp))`, dann `Row(Modifier.fillMaxWidth())`:
   „Wind: 8 km/h“, `Spacer(Modifier.weight(1f))`, „Teilweise bewölkt“
4. `Box` um die Column, `contentAlignment = Alignment.Center`, Modifier-Kette:
   `modifier.fillMaxWidth().padding(16.dp).background(Color(0xFFBBDEFB), RoundedCornerShape(24.dp)).padding(24.dp)`

**Erklären:** Kette beginnt mit `modifier` (Aufrufer-Modifier kommt an)
**Moment:** in der Preview `padding` vor/nach `background` vertauschen
**Stolperstellen:** `weight` gibt es nur im `RowScope`/`ColumnScope`; Imports
`sp`/`dp` (`androidx.compose.ui.unit`)

---

## Schritt 6: State

**Start:** `schritt-05` · **Ziel:** `schritt-06` · **Zeit:** 15 Min

1. `MainActivity`: wieder `WeatherScreen` statt `CityListScreen`
   (`val city = fakeCities.first()`, Wetter per `fakeCurrentWeather.getValue(city.name)`)
2. In `WeatherScreen`: `var useCelsius = true`, `TextButton` in `actions` der
   `TopAppBar` → antippen, nichts passiert. Erklären: Recomposition
3. `var useCelsius by remember { mutableStateOf(true) }` → Text wechselt;
   Gerät drehen → zurück auf °C
4. `rememberSaveable` → bleibt beim Drehen
5. Button auslagern: `UnitToggle(useCelsius, onToggle, modifier)`, stateless
6. `formatTemperature(celsius, useCelsius)` in `ui/WeatherConditionUi.kt`;
   `CurrentWeatherCard` bekommt Parameter `useCelsius`
7. Folie mit Diagramm: State nach unten, Events nach oben

**Erklären:** State liegt in `WeatherScreen`, weil Toggle und Karte ihn brauchen
**Stolperstellen:** Imports `getValue`/`setValue` für `by` (Alt+Enter schlägt sie
nicht immer vor); Drehen im Emulator: Auto-Rotate einschalten

---

## Schritt 7: ViewModel und UiState

**Start:** `schritt-06` · **Ziel:** `schritt-07` · **Zeit:** 15 Min

**Snippets vorbereiten (einfügen statt tippen):**

```toml
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }
androidx-lifecycle-runtime-compose = { group = "androidx.lifecycle", name = "lifecycle-runtime-compose", version.ref = "lifecycleRuntimeKtx" }
```

```kotlin
implementation(libs.androidx.lifecycle.viewmodel.compose)
implementation(libs.androidx.lifecycle.runtime.compose)
```

1. Snippets einfügen, Gradle Sync
2. `ui/WeatherUiState.kt`: `sealed interface` mit `Loading` (data object),
   `Success(city, weather)`, `Error(message)`
3. `ui/WeatherViewModel.kt`: `MutableStateFlow` mit `Success` für Lörrach,
   nach außen `uiState: StateFlow` per `asStateFlow()`
4. Bisheriges `WeatherScreen` umbenennen in `WeatherContent(uiState, modifier)`
   (Shift+F6), Titel per `when`, Inhalt per `when (uiState)`
5. Neues stateful `WeatherScreen(modifier, viewModel = viewModel())` mit
   `collectAsStateWithLifecycle()`
6. `CenteredBox` für Loading/Error; Preview auf `WeatherContent` umstellen,
   Loading-Preview dazu
7. `MainActivity`: nur noch `WeatherScreen()`

**Erklären:** Preview kann kein ViewModel erzeugen → stateful/stateless;
`is` bei Klassen, ohne `is` bei `Loading`
**Diskussion:** Gehört °C/°F ins ViewModel? (Nein: UI-Element-State)
**Stolperstellen:** Gradle Sync dauert; `by` braucht wieder `getValue`;
Shift+F6 benennt auch die Preview-Aufrufe um
