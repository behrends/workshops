import Callout from 'nextra-theme-docs/callout'

# Plattformen und Frameworks

<Callout>
  **Dauer:** höchstens 30 Minuten

  - Plattformen für native Apps
  - Frameworks für plattformübergreifende Apps

  **Ziel:** Überblick verschiedener Ansätze zur App-Entwicklung
</Callout>

 Auf dem Whiteboard oder in [Excalidraw](https://excalidraw.com) 
 wird skizziert, welche verschiedenen Ansätze es gibt, Apps für Android und iOS zu entwickeln.

## Plattformen

Es gibt mit Android und iOS nur noch zwei relevante Plattformen,
um Apps für Smartphones zu entwickeln. Die Hersteller beider
Plattformen stellen „offizielle“ Ansätze bereit, um **native**
Apps zu entwickeln.

### Native Apps

Android-Geräte werden von vielen verschiedenen Herstellern auf 
den Markt gebracht. 
Das Android-Betriebssystem wird von Google entwickelt. 

iPhones haben iOS als Betriebssystem und werden ausschließlich
von Apple angefertigt.

Hier verwenden wir Android und iOS als Bezeichnungen für 
die nativen Plattformen zur App-Entwicklung für Android-Geräte
bzw. iPhones. 

Plattform | Hersteller | Programmiersprache | Entwicklungsumgebung |
--- | --- | --- | --- |
Android | Google | Kotlin (Java) | Android Studio mit Windows, macOS oder Linux | 
iOS | Apple | Swift (ObjectiveC) | XCode nur auf macOS | 

Native Apps werden für Android in Googles _PlayStore_ und für
iPhones in Apples _AppStore_ veröffentlicht.

### Webanwendungen

Mit mobilen Webanwendungen, die im Browser ausgeführt werden,
können ebenfalls Apps für Smartphones entwickelt werden. Hierzu
gibt es neben den herkömmlichen Frontend-Technologien HTML, CSS
und JavaScript spezielle Techniken für mobile Geräte wie 
das _responsive Design_ und _Service Workers_ u.a. für Offline-
Funktionalität. Unter dem Begriff _Progressive Web Apps_ (_PWA_) 
werden diese Techniken zusammengefasst. 

TODO: zwei mal 4 Stunden zu PWAs?

Ein paar nützliche Links zu PWAs:

- [Infos über PWAs bei web.dev (Google)](https://web.dev/progressive-web-apps/)
- [Kurs zu PWAs bei web.dev (Google)](https://web.dev/learn/pwa/)
- [Infos über PWAs im Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

Solche PWAs sind durch URLs im Browser erreichbar und werden
in der Regel nicht zur Installation im AppStore bzw. PlayStore 
bereitgestellt.

Insbesondere sind PWAs natürlicherweise plattformübergreifend und
funktionieren gleichermaßen auf Android-Geräten und iPhones.

## Frameworks

Es gibt mehrere Frameworks mit denen plattformübergreifende Apps entwickelt werden können:

Framework | Ursprung | Programmiersprache | Entwicklungsumgebung | Webseite |
--- | --- | --- | --- | --- |
React Native | Facebook | JavaScript (und TypeScript) | Texteditor, empfohlen wird VS Code | [reactnative.deb](https://reactnative.dev)
Flutter | Google | Dart | Texteditor, empfohlen wird Android Studio oder VS Code | [flutter.dev](https://flutter.dev/) |
.NET MAUI / Xamarin | Microsoft | C# | Visual Studio ? | [github.com/dotnet/maui](https://github.com/dotnet/maui) |
ionic | Ionic | JavaScript | Texteditor, empfohlem wird VS Code | [ionicframework.com](https://ionicframework.com/) |
weitere? |  |  |  | |

Alle diese Frameworks sind Open Source Projekte.

Mit diesen Frameworks (und auch mit PWAs) ist es möglich, Apps mit
nur einer Codebasis sowohl für Android-Geräte als auch für iPhones 
zu entwickeln (und in manchen Fällen auch für weitere Plattformen 
wie Windows, macOS, u.a.).