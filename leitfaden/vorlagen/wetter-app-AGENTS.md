# Wetter-App

Lern-Projekt aus einem Android-Crashkurs. Die App zeigt eine Liste von Städten;
nach Antippen einer Stadt wird deren aktuelles Wetter angezeigt. Die Personen, die hier arbeiten, lernen gerade
Android-Entwicklung: Erkläre deine Änderungen so, dass sie nachvollziehbar sind.

## Tech-Stack

- Kotlin, Jetpack Compose, Material 3
- Navigation 3 (`NavDisplay`, Routen als `@Serializable` Typen mit `NavKey`)
- ViewModel mit `StateFlow`, im UI mit `collectAsStateWithLifecycle()` gelesen
- Ktor Client (Engine OkHttp) mit kotlinx.serialization für HTTP
- Wetterdaten: Open-Meteo (https://open-meteo.com), kein API-Key nötig

Keine weiteren Libraries hinzufügen, ohne vorher zu begründen, warum sie nötig sind,
und nachzufragen. Insbesondere kein Retrofit, kein Gson/Moshi, kein Hilt/Koin.

## Architektur

```
UI (Composables) → ViewModel → Repository → Datenquelle (Fake oder API)
```

- **UI:** Composables sind möglichst stateless: Daten kommen als Parameter rein,
  Events gehen als Lambdas raus (State Hoisting).
- **ViewModel:** hält den Screen-Zustand als `StateFlow<WeatherUiState>`.
  `WeatherUiState` ist ein `sealed interface` mit `Loading`, `Success`, `Error`.
- **Repository:** `interface WeatherRepository` mit `suspend fun getCurrentWeather(city: City)`; Implementierungen sind
  `FakeWeatherRepository` (Fake-Daten) und `ApiWeatherRepository` (Open-Meteo).
  Das ViewModel bekommt das Repository als Default-Parameter im Konstruktor.
- **Datenmodell** (`model/`): `City` (Name und Koordinaten), `CurrentWeather`, `WeatherCondition`.
  API-Antworten werden als eigene DTO-Klassen abgebildet und auf das Datenmodell gemappt.
  Das Datenmodell nicht an die API anpassen.

Änderungen an der Datenschicht dürfen die UI nicht verändern. Wenn das doch nötig
scheint, vorher nachfragen.

## Konventionen

- Paketstruktur: `ui/` (Screens und Composables), `ui/theme/`, `model/`, `data/`
- Farben, Schriften und Abstände über `MaterialTheme` statt fest codierter Werte
- Zu jedem neuen Composable eine `@Preview` mit Fake-Daten
- Texte in der App auf Deutsch

## Arbeitsweise

- Vor größeren Änderungen einen kurzen Plan vorlegen und auf Bestätigung warten.
- In kleinen Schritten arbeiten; nach jedem Schritt bauen: `./gradlew assembleDebug`
- Tests ausführen, falls vorhanden: `./gradlew test`
- Nicht selbst committen; die Person prüft den Diff und committet.
- Am Ende kurz zusammenfassen: welche Dateien geändert wurden und warum.
