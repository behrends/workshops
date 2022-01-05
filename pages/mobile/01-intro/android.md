import Callout from 'nextra-theme-docs/callout'

# Android

<Callout>
  **Dauer:** 30-45 Minuten \
  Restliche Zeit steht für Fragen, Diskussion und Hilfe bei Problemen
  mit Android Studio zur Verfügung.

  - Android Studio: Projekte erstellen und ausführen
  - Zugang zum Videokurs

  **Ziel:** Alle haben Android Studio eingerichtet. Neue Projekte 
  können erstellt und auf dem Emulator ausgeführt werden.
</Callout>


## Native App-Entwicklung für Android

Wir betrachten zunächst die native App-Entwicklung für 
Android-Geräte. Dazu ist Android Studio als Entwicklungsumgebung
zu installieren, was für Windows, macOS und Linux möglich ist
und idealerweise bereits von den Studierenden durchgeführt 
wurde (siehe [Vorbereitung](/mobile/setup)). Im Gegensatz dazu
kann die native iOS/iPhone-App-Entwicklung nur auf macOS
mit XCode durchgeführt werden. Android Studio stellt außerdem
einen Emulator bereit, sodass kein Android-Handy vorhanden sein muss.

Seit einigen Jahren empfiehlt Google für die native 
Android-App-Entwicklung die Programmiersprache Kotlin &mdash;
insbesondere dann, wenn neue App-Projekte gestartet werden.
Obwohl Java weiterhin unterstützt wird, werden hier nur Beispiele
mit Kotlin gezeigt. Für die App-Projekte ist Java dennoch erlaubt.

## Projekt in Android Studio erstellen und ausführen

Projekt gemeinsam erstellen

Verschiedene Einstellung werden besprochen (z.B. der API-Level).

Das Projekt basiert auf der _Empty Activity_, damit das neue
Projekt nur minimal vorkonfiguriert ist.

App auf Emulator ausführen. Tipp: Zeigen wie der Emulator
in Android Studio eingebettet werden kann 
(_Preferences - Tools - Emulator - Launch in a Tool Window_)

<Callout type="warning">
Falls es hier Fragen oder Probleme zu Android Studio gibt,
so können diese besprochen bzw. diskutiert werden.

Insbesondere gibt es immer wieder unter Windows besondere
Situationen, die zu Fehler führen können. Hier können sich die 
Studierenden idealerweise gegenseitig mit Tipps helfen.

Eventuell können Infos zu Problemen unter Windows hier auf
einer eigenen Seite gesammelt werden.
</Callout>

## App auf eigenem Handy ausführen
Ist ein Android-Handy vorhanden, so kann dies via USB-Kabel
mit dem Laptop verbunden werden. In Android Studio kann die
App dann auf dem Handy ausgeführt werden. Dazu einige Bemerkungen

- In den Einstellungen des Handies müssen die Entwickleroptionen freigeschaltet werden (siehe Hinweis unten).
- Für Windows müssen eventuell Treiber heruntergeladen werden
- Etwas anders auf jedem Gerät bzw. bei jedem Hersteller
- &xrarr; evtl. eigene Recherchen notwendig

Studierende erhalten Zugang zu einem Android-Videokurs (siehe 
folgender Abschnitt). Im Videokurs wird in Abschnitt 1, Video 7
gezeigt, wie auf einem Android-Handy die Entwickleroptionen
freigeschaltet werden.

**Zugang zum Android-Videokurs: Link ist in Moodle zu finden.**

## Optional: Genymotion

Genymotion ist ein alternativer Android-Emulator, mit dem sich 
viele verschiedene Geräte unterschiedlicher Hersteller simulieren 
lassen (u.a. von Samsung).

Benötigt allerdings eine Installation von VirtualBox.

Hier gibt es eine kostenlose Version für den persönlichen 
Gebrauch: [www.genymotion.com/download/](https://www.genymotion.com/download/)

## Hausaufgabe

Falls noch nicht erfolgt, dann Android Studio installieren,
neues Projekt erstellen und App auf Emulator oder Handy ausführen
(siehe [Vorbereitung](/mobile/setup)).

Abschnitt 2 im Videokurs durcharbeiten (_Aufbau von Projekten für Android-Apps verstehen_).