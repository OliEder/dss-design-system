# Design: Dos und Don'ts auf den Spezifikations-Seiten (Pilot)

Stand: 2026-10-08

## Ziel

Die manuell gepflegten Spezifikations-Seiten in Storybook (`Docs/*`) bekommen **Dos und Don'ts** als Beispielpaare: Pro Regel
ein richtiges und ein falsches Beispiel nebeneinander, mit den echten Komponenten gerendert und mit Kurzbegründung.
Pilot: die Seiten **Button** und **Tabellen** (inklusive Spielplan). Danach können die Seiten Cards, Forms und Navigation
nachziehen.

## Ausgangslage und Entscheidung

- Es gibt fünf manuelle Seiten (`stories/docs/ButtonDoc`, `CardsDoc`, `FormsDoc`, `NavigationDoc`, `TablesDoc`) auf der Basis von
  `stories/docs/_SpecPage.svelte`. Dos und Don'ts gibt es dort nirgends.
- Storybook wurde auf 10.6 aktualisiert; dabei sind die automatischen Doku-Seiten (`tags: ['autodocs']`) entfallen, weil
  `@storybook/addon-docs` nicht installiert ist. **Entscheidung:** Das Addon wird nicht installiert. Die manuellen Seiten sind
  die Dokumentation; alle wichtigen Informationen gehören dorthin.
- Folge (nicht Teil dieses Piloten): Die Beschreibungstexte in `parameters.docs.description` und die Tags `autodocs` sind
  wirkungslos. Sie sollen später in die manuellen Seiten wandern oder entfernt werden.

## Bausteine

### `stories/docs/_DosDonts.svelte` (neu, nur Storybook-Doku)

Nicht im Paket und nicht im Paritäts-Manifest (liegt unter `stories/`).

Props:

| Prop | Typ | Beschreibung |
|---|---|---|
| `pairs` | `{ title: string; doText: string; dontText: string; good: Snippet; bad: Snippet }[]` | Die Paare; `title` ist die Regel als Satz |

Aufbau pro Paar:
- Überschrift mit der Regel (`h3`), darunter zwei Rahmen nebeneinander.
- Links „✓ Do“, rechts „✗ Don't“; die Bedeutung steht in **Symbol und Wort**, nicht nur in Farbe. Farben aus den semantischen
  Tokens (`--ok-*`, `--err-*`, `--dss-*`), damit Hell, Dunkel und die DBB-Marke funktionieren.
- Unter jedem Rahmen ein Satz Begründung (`doText`, `dontText`).
- Unter 640 px stehen die Rahmen untereinander.
- Falsche Beispiele sind nur Anschauung: Das Element hat `inert` (nicht fokussierbar, nicht klickbar) und eine für Screenreader
  lesbare Beschriftung „Beispiel für falsche Verwendung“; richtige Beispiele sind normal nutzbar.

Einbindung: Jede Seite bekommt als letzten Abschnitt `<section class="spec-s">` mit der Überschrift „06 — Dos & Don'ts“
(auf der Tabellen-Seite ohne Nummer wie „Spielpläne“) und dem Baustein.

## Inhalte (Entwurf, vom Auftraggeber geprüft)

Alle Texte auf Deutsch im Ton der bestehenden Seiten.

**Button (5 Paare)**
1. Eine Haupt-Aktion pro Ansicht. Do: ein amber Button plus Secondary. Don't: zwei amber Buttons nebeneinander.
2. Label als Verb. Do: „Spielbericht freigeben“. Don't: „OK“.
3. Zerstörerisches in Rot. Do: „Spiel verwerfen“ als `danger`. Don't: dieselbe Aktion im schwarzen Primary-Stil.
4. Touch-Größe am Kampfgericht-Tisch. Do: `touch` (64 px). Don't: `sm` für Bedienung in der Halle.
5. Gesperrt mit Grund. Do: deaktivierter Button mit Hinweistext darunter. Don't: grauer Button ohne Erklärung.

**Tabellen und Spielplan (5 Paare)**
1. Zahlen in Spalten. Do: rechtsbündig in Mono mit gleich breiten Ziffern. Don't: linksbündig in der Proportionalschrift.
2. Dichte nach Gerät. Do: `touch` auf dem iPad am Tisch. Don't: `dense` für Bedienung mit dem Finger.
3. Abgesagt und verlegt nicht nur über Farbe. Do: durchgestrichen mit dem Text „Abgesagt: Halle gesperrt“. Don't: nur grau und
   durchgestrichen, ohne Grund.
4. Höchstens drei Hallen im Zeitraster. Do: drei Spalten. Don't: sechs Spalten gequetscht.
5. Eigene Mannschaft dezent hervorheben. Do: Balken links und leichter Hintergrund (`is-own`). Don't: ganze Zeile in der
   Signalfarbe.

Die Beispiele nutzen die echten Komponenten (`Button`, `ScheduleTable`, `ScheduleGrid`, `Table`); wo ein falsches Beispiel mit den
Komponenten nicht darstellbar ist (zum Beispiel die Proportionalschrift in Zahlenspalten), wird es mit Inline-Stilen
nachgestellt und nur dort.

## Prüfung

- Storybook-Build erfolgreich; die Seiten in beiden Marken, Hell und Dunkel und bei 420 px im Browser ansehen (keine Fehler,
  kein seitliches Scrollen, Lesbarkeit).
- A11y-Reiter und ein axe-Lauf auf den beiden Seiten: keine Verstöße, `inert`-Beispiele erzeugen keine Fokusfallen.
- Keine neuen Abhängigkeiten.

## Bewusst nicht Teil dieses Piloten

- Die Seiten Cards, Forms, Navigation.
- Neue Spezifikations-Seiten für Modal, Banner, Checkbox, Icon und weitere Komponenten (eigenes Teilprojekt).
- Das Docs-Addon und die Umstellung der Beschreibungstexte aus `parameters.docs.description`.
