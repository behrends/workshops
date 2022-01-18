import Callout from 'nextra-theme-docs/callout'

# Übungen

<Callout>
  **Dauer:** 60 bzw. restliche Zeit Minuten \
  40 Minuten inklusive Pause \
  20 Minuten Besprechung \
  (evtl. Besprechung beim nächsten Termin)

  **Ziel:** Variablen, Berechnungen, Ein- und Ausgabe
</Callout>

<Callout type="warning">
Auch in Moodle stellen (evtl. inklusive Abgabe).
</Callout>

Setzen Sie die Programmieraufgaben dieses Blatts z.B. online auf 
[replit.com](https://replit.com) um. Bei Fragen können Sie 
dem Dozenten den Code zu der betroffenen Aufgabe auf 
[replit.com](https://replit.com) zeigen.


## 1) Jahre in Tage umrechnen
Schreiben Sie ein Programm, das dazu auffordert, den Namen 
und das Alter in Jahren einzugeben. Das Programm soll das
Alter von Jahren in die entsprechende Anzahl von Tagen umrechnen. Schaltjahre können hierbei ignoriert werden.
Danach soll das Alter in Tagen ausgegeben werden.

**Ein beispielhafter Programmablauf**

```
Gib Deinen Namen ein: Jack Jones
Gib Dein Alter ein: 23
Hallo Jack Jones, Du bist mehr als 8395 Tage alt.
```

Führen Sie im Code die Eingabe, die Berechnung und die Ausgabe 
des Ergebnisses getrennt voneinander durch.
Verwenden Sie für die letzte Ausgabe Template-Strings.

**Zusatzaufgaben:**

Fragen Sie statt des Alters das Geburtsdatum ab und berechnen Sie 
die exakte Anzahl an Tagen. Werden bei Ihrer Lösung auch 
Schaltjahre berücksichtigt?

Hierzu dürfen Sie auch Hilfsbibliotheken verwenden und im 
Internet recherchieren.
Die Berücksichtigung von Schaltjahren kann z.B. durch Eingabe der 
Tage `01.03.2008` und `28.02.2008` überprüft werden.
Hierbei muss die Differenz des Ergebnisses 2 Tage betragen 
(da 2008 ein Schaltjahr war und es einen 29.02. gab).

## 2) Sekunden umrechnen
Schreiben Sie ein Programm, für das ein Sekunden-Wert eingegeben 
werden soll und das diesen Wert in Jahre, Tage, Stunden, Minuten 
und Sekunden zerlegt.

**Ein beispielhafter Programmablauf:**

```
  Bitte Anzahl der Sekunden eingeben: 158036521
  158036521 Sekunden entsprechen:
  5 Jahren,
  4 Tagen,
  3 Stunden,
  2 Minuten und
  1 Sekunden.
```