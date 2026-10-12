# Live-Coding-Karten Android-Crashkurs

Nur für die Live-Schritte 1, 2, 6 und 7. Abgeleitet aus den Diffs im Referenz-Repo
(github.com/behrends/WeatherAndroidTIF24); Stolperstellen und echte Zeiten nach der
Generalprobe ergänzen. Notfall immer: `git stash -u && git checkout schritt-XX`
(`-u` sichert auch live neu angelegte Dateien, sonst blockieren sie den Checkout).

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
**Moment:** Texte überlappen → Überleitung zu Layouts. Erklärung: Compose hat
keinen Textfluss wie HTML; ohne Layout liegen alle Kinder oben links übereinander.
Beide `Text`s bekommen den `modifier`, weil es noch kein äußerstes Element gibt.
**Stolperstellen:** Alt+Enter bei `Modifier` → `androidx.compose.ui.Modifier`,
nicht `java.lang.reflect.Modifier`; erste Preview braucht einen Build
(„Build & Refresh“), vorher schon einmal gebaut haben

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
`sp`/`dp` (`androidx.compose.ui.unit`); `Color` → `androidx.compose.ui.graphics.Color`,
nicht `android.graphics.Color`

---

## Schritt 6: State

**Start:** `schritt-05` · **Ziel:** `schritt-06` · **Zeit:** 15 Min

1. `MainActivity`: wieder `WeatherScreen` statt `CityListScreen`
   (`val city = fakeCities.first()`, Wetter per `fakeCurrentWeather.getValue(city.name)`)
2. In `WeatherScreen`: `var useCelsius = true`, `TextButton` in `actions` der
   `TopAppBar` → antippen, nichts passiert. Erklären: Recomposition
3. `var useCelsius by remember { mutableStateOf(true) }` → Text wechselt;
   **App neu starten**, auf °F, Gerät drehen → zurück auf °C
4. `rememberSaveable` → **App neu starten**, auf °F, drehen → bleibt
   (ohne Neustart kann Live Edit den State verfälschen)
5. Button auslagern: `UnitToggle(useCelsius, onToggle, modifier)`, stateless
6. `formatTemperature(celsius, useCelsius)` in `ui/WeatherConditionUi.kt`;
   `CurrentWeatherCard` bekommt Parameter `useCelsius`
7. Folie mit Diagramm: State nach unten, Events nach oben

**Erklären:** State liegt in `WeatherScreen`, weil Toggle und Karte ihn brauchen
**Stolperstellen:** Imports `getValue`/`setValue` für `by` (Alt+Enter schlägt sie
nicht immer vor), `roundToInt` in `WeatherConditionUi.kt`; Drehen im Emulator:
Auto-Rotate muss an sein (Checkliste); Karte im Querformat evtl. abgeschnitten
(in der Generalprobe prüfen)

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
4. Bisheriges `WeatherScreen` umbenennen in `WeatherContent` (Shift+F6).
   **Ankündigen:** Jetzt ist kurz alles rot, Aufrufe passen nicht mehr.
   Parameter auf `uiState: WeatherUiState` umstellen, Titel und Inhalt
   per Snippet (unten)
5. Neues stateful `WeatherScreen(modifier, viewModel = viewModel())` mit
   `collectAsStateWithLifecycle()`
6. `CenteredBox` und Previews per Snippet
7. `MainActivity`: nur noch `WeatherScreen()`

**Snippets für den Umbau:**

```kotlin
// in WeatherContent, vor dem Scaffold
val title = when (uiState) {
    is WeatherUiState.Success -> uiState.city.name
    WeatherUiState.Loading, is WeatherUiState.Error -> "Wetter"
}

// im Scaffold statt CurrentWeatherCard(...)
when (uiState) {
    WeatherUiState.Loading -> CenteredBox(Modifier.padding(innerPadding)) {
        CircularProgressIndicator()
    }
    is WeatherUiState.Success -> CurrentWeatherCard(
        city = uiState.city,
        weather = uiState.weather,
        useCelsius = useCelsius,
        modifier = Modifier.padding(innerPadding),
    )
    is WeatherUiState.Error -> CenteredBox(Modifier.padding(innerPadding)) {
        Text(text = uiState.message)
    }
}
```

```kotlin
@Composable
fun CenteredBox(modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Box(modifier = modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        content()
    }
}

@Preview(showBackground = true)
@Preview(showBackground = true, uiMode = Configuration.UI_MODE_NIGHT_YES, name = "Dark Mode")
@Composable
fun WeatherContentPreview() {
    val city = fakeCities.first()
    WeatherAndroidTIF24Theme {
        WeatherContent(
            uiState = WeatherUiState.Success(city, fakeCurrentWeather.getValue(city.name)),
        )
    }
}

@Preview(showBackground = true, name = "Loading")
@Composable
fun WeatherContentLoadingPreview() {
    WeatherAndroidTIF24Theme {
        WeatherContent(uiState = WeatherUiState.Loading)
    }
}
```

**Erklären:** Preview kann kein ViewModel erzeugen → stateful/stateless;
`is` bei Klassen, ohne `is` bei `Loading`
**Diskussion:** Gehört °C/°F ins ViewModel? (Nein: UI-Element-State)
**Stolperstellen:** vor dem Einfügen in `libs.versions.toml` prüfen, ob der
Versionseintrag `lifecycleRuntimeKtx` so heißt; Gradle Sync abwarten, sonst findet
Alt+Enter `viewModel()` nicht; `by` braucht wieder `getValue`;
Shift+F6 benennt auch Previews und den Aufruf in `MainActivity` um, der passt dann
nicht mehr → `MainActivity` gleich auf `WeatherScreen()` umstellen

---

## Walkthroughs und Schritt 10

- Nach `git checkout schritt-07`, `-09`, `-10`: Gradle-Dateien geändert →
  „Sync Now“ abwarten, sonst rote Fehler. Hinweis „detached HEAD“ ist normal.
- Schritt 8: Ladezustand ist nach 1,5 s vorbei → Loading-Preview zeigen oder für
  die Demo kurz `delay(3000)`. Fehlerdemo mit `FakeWeatherRepository(shouldFail = true)`:
  App neu starten (das ViewModel behält sein Repository), danach zurücknehmen.
- Schritt 9: Zurück über den Back-Button in der Emulator-Toolbar, die Wischgeste
  mit der Maus ist fummelig.
- Schritt 10: Vergisst der Agent die `INTERNET`-Permission, zeigt die App den
  Zustand `Error` mit einer Permission-Meldung → als Review-Moment nutzen.
- Schritt 10: Abhängigkeiten (Ktor) schon beim Plan bestätigen. **Spätestens nach
  15 Minuten** auf `git stash -u && git checkout schritt-10` wechseln und den
  fertigen Diff (`git diff schritt-09 schritt-10`) erklären.
