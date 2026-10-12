# AGENTS.md

Lern-Projekt: Die Personen hier lernen gerade Android-Entwicklung.
Erkläre deine Änderungen so, dass sie nachvollziehbar sind.

## Regeln

- HTTP mit Ktor (Engine OkHttp) und kotlinx.serialization.
  Kein Retrofit, kein Gson/Moshi, kein Hilt/Koin.
- Keine weiteren Libraries, ohne zu begründen, warum, und nachzufragen.
- API-Antworten als eigene DTO-Klassen abbilden und auf `model/` mappen.
  Das Datenmodell nicht an die API anpassen.
- Änderungen an der Datenschicht (`data/`) dürfen die UI (`ui/`) nicht
  verändern. Wenn das doch nötig scheint, vorher nachfragen.
- Zu jedem neuen Composable eine `@Preview` mit Fake-Daten.
- Texte in der App auf Deutsch.

## Arbeitsweise

- Vor größeren Änderungen einen kurzen Plan vorlegen und auf Bestätigung warten.
- Nach jeder Änderung bauen: `./gradlew assembleDebug`
- Nicht selbst committen; die Person prüft den Diff und committet.
