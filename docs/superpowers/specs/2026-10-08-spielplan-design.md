# Design: Spielplan-Tabelle (ScheduleTable und ScheduleGrid)

Stand: 2026-10-08 · Teil 1 von 2 (Teil 2: PDF-Baukasten und Print-Notbremse, eigener Entwurf)

## Ziel

Das DSS bekommt zwei Bausteine für Spielpläne, die im Vereinsregister und im Turnier-Manager
(und weiteren Apps anderer Vereine) oft gebraucht werden:

- **`ScheduleTable` (Variante A):** eine Tabelle mit einer Zeile pro Spiel, nach Spieltag oder Runde
  gruppiert. Standard im Vereinsregister.
- **`ScheduleGrid` (Variante B):** ein Zeitraster (Anwurfzeiten als Zeilen, Hallen oder Felder als
  Spalten) für Turnier-Tagespläne und Hallenbelegung.

Beide gibt es als Vanilla-CSS (Klassen), Svelte und React mit **einem gemeinsamen Datenmodell**.
Auf dem Handy (unter 640 px) werden beide kartenartig (A: Karten pro Zeile, B: ein Block pro Anwurfzeit).

## Ausgangslage

- Vereinsregister zeigt Spielpläne als Spiel-Liste ohne Kopfzeile: Datum und Zeit zweizeilig, Gegner mit
  Logo und Link, Chip „vs.“ (Heim) oder „@“ (auswärts), Ergebnis rechts groß in Mono, Chip S oder N,
  Hinweis „vorläufig“; auf Halle- und Liga-Seiten „Heim – Gast“ in einer Zelle mit Liga als Unterzeile.
- Turnier-Manager zeigt Spiele als Flex-Zeilen (Nr, Feld, Zeit, „Heim vs Gast“), mit Platzhaltern
  („Erster Gruppe A“), Freilosen, abgesagten Spielen (Rückzug), Konflikt-Badge (Sperrzeit) und
  bearbeitbarer Startzeit.
- Das DSS hat `Table` (Dichten 60, 48, 40, 32 px), `MatchCard` (Zustände scheduled, live, finished),
  Chips, Tabs, `is-own`-Zeilenhervorhebung und eine Typo-Skala mit `stat` (22 px).

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Welche Spielplan-Arten | Alle vier: Liga, Mannschaft, Turnier-Tagesplan, Hallenbelegung |
| Varianten | A (Tabelle), B (Zeitraster), Handy-Karten für beide |
| Standard | A im Vereinsregister-Stil (Spiel-Liste), B für Turnier-Tag und Halle |
| Treue zum DSS | Strikt nach DSS: vorhandene Dichten, Chips, Typo-Stufen, Live-Grün. Das Vereinsregister wird dichter (60 statt etwa 122 px) |
| Viele Hallen in B | Höchstens drei Spalten je Raster empfohlen; die App teilt auf. Code erzwingt es nicht, Sicherung: seitliches Scrollen mit fester Zeitspalte |
| Zustände | geplant, live, beendet, abgesagt, verlegt, Freilos; Konflikt-Hinweis und bearbeitbare Zeit nur über Slots (Svelte: Snippets) |
| Ergebnis in Perspektive | immer **eigene : Gegner**, auch bei „@“ |
| Zuständigkeit der App | Filter-Tabs, Datumsformatierung, Sortierung, Konflikterkennung, Bearbeitungslogik |

## Datenmodell

Gemeinsam für beide Komponenten, in `react/` als Typen exportiert und in Svelte per Typimport genutzt.
Alle Texte kommen fertig formatiert von der App; das DSS rechnet nichts mit Datum oder Zeit.

```ts
export type ScheduleState = 'scheduled' | 'live' | 'finished' | 'cancelled' | 'postponed' | 'bye';

export interface ScheduleTeam {
  name: string;
  href?: string;         // Teamname als Link
  logo?: string;         // URL; ohne Logo erscheinen die Initialen
  score?: number;
  placeholder?: boolean; // Platzhalter wie "Erster Gruppe A": kursiv, gedämpft
  own?: boolean;         // eigene Mannschaft: Hervorhebung (is-own)
}

export interface ScheduleGame {
  id: string;
  nr?: string;           // "#3"
  section?: string;      // Gruppenzeile: "Spieltag 5", "Runde 2 · Gruppe A", "Halbfinale"
  date?: string;         // "Sa, 26.09.2026"
  time?: string;         // "17:30" oder "09:30–09:50"
  venue?: string;        // Halle, freier Text
  field?: string;        // Feld in der Halle, freier Text ("F1" oder ein Name)
  column?: string;       // nur ScheduleGrid: Kennung der Spalte (Halle oder Feld)
  state: ScheduleState;

  // a) Gegenüberstellung (Liga, Halle, Turnier)
  heim?: ScheduleTeam;
  gast?: ScheduleTeam;

  // b) Perspektive einer Mannschaft (Mannschafts-Spielplan)
  opponent?: ScheduleTeam;   // opponent.score = Punkte des Gegners
  at?: 'heim' | 'gast';      // 'heim' zeigt "vs.", 'gast' zeigt "@"
  ownScore?: number;         // Punkte der eigenen Mannschaft
  outcome?: 'S' | 'N' | 'U'; // überschreibt die berechnete Bewertung (z. B. Forfait, Wertung am grünen Tisch)

  league?: { name: string; href?: string };  // Unterzeile (Halle, Liga)
  provisional?: boolean;     // Ergebnis ist vorläufig
  note?: string;             // Grund bei abgesagt/verlegt, Hinweis bei Freilos
}
```

Regeln:
- Entweder `heim` und `gast` **oder** `opponent` und `at` sind gesetzt. Beides gleichzeitig ist ein Fehler
  der App; das DSS zeigt dann die Gegenüberstellung (`heim`/`gast`).
- `state: 'bye'`: `heim.name` nennt die spielfreie Mannschaft (Anzeige „{name} hat Freilos“); ohne `heim`
  wird `note` gezeigt. Kein Gegner, kein Ergebnis.
- Sieg, Niederlage oder Unentschieden berechnet das DSS nur bei `state: 'finished'` in der Perspektive aus
  `ownScore` und `opponent.score`. Ist `outcome` gesetzt, gilt dieser Wert (z. B. Forfait 20:0, das als
  Niederlage gewertet wird). Bei Gegenüberstellung gibt es keine Bewertung.
- Ob ein Ergebnis angezeigt wird (`hasScore`), hängt vom Layout ab: Die Perspektive (`ownScore`, `opponent.score`)
  zählt nur im Layout `opponent`, sonst `heim.score` und `gast.score`.
- `column` gilt nur für `ScheduleGrid` und ist dort Pflicht (außer bei `state: 'bye'`). `ScheduleGrid` ignoriert
  `field` und `venue`; `ScheduleTable` ignoriert `column`.

## Variante A: `ScheduleTable`

### Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `games` | `ScheduleGame[]` | | die Spiele; Reihenfolge und Gruppierung bestimmt `section` in der gegebenen Reihenfolge |
| `layout` | `'versus' \| 'opponent' \| 'columns'` | aus Daten (siehe unten) | Art der Spiel-Zelle |
| `density` | `'touch' \| 'default' \| 'compact'` | siehe unten | Zeilenhöhe nach DSS (60, 48, 40 px) |
| `title`, `meta` | `string` | | optional Kopf im `dss-frame-head` |
| `renderLink` (React) | Funktion | | Router-Links, wie bei `AppNav`; in Svelte gibt es weder `renderLink` noch `titleAs`, `title` und `meta` sind dort reine Strings |
| Snippet `time` (Svelte) / `renderTime` (React) | pro Spiel | | ersetzt die Zeit-Zelle, z. B. bearbeitbare Startzeit |
| Snippet `notice` (Svelte) / `renderNotice` (React) | pro Spiel | | zusätzliche Zelle am Zeilenende, z. B. Konflikt-Badge |

**Standard für `layout`:** `opponent`, sobald mindestens ein Spiel `opponent` hat; sonst `versus`.
`columns` wird nur ausdrücklich gewählt. **Standard für `density`:** `touch` (60 px) bei `opponent` oder
wenn irgendein Spiel `league` hat; sonst `default` (48 px).

### Darstellungsarten

- **`versus`** (Halle, Liga): Spalten Zeit, Spiel, Ergebnis. Spiel-Zelle: „Heim – Gast“, beide als
  `.dss-link`, optional Unterzeile `league` (klein, als Link). Ergebnis rechts in Mono (`stat`).
- **`opponent`** (Mannschaft): Zeit, Chip, Gegner (Logo, Name als Link), Ergebnis. Chip: `vs.` mit
  `.dss-chip--sky .dss-chip--mono`, `@` mit `.dss-chip--amber .dss-chip--mono`. Ergebnis eigene : Gegner,
  davor der Chip S (`--ok`) oder N (`--err`), bei Unentschieden ein neutraler Chip „U“.
- **`columns`** (Turnier-Manager): getrennte Spalten Nr, Zeit, Feld, Heim, Ergebnis, Gast. Ergebnis
  zentriert. Eine Spalte erscheint nur, wenn mindestens ein Spiel den Wert hat (`nr`, `field`, `venue`).
  Eine Spalte am Ende kommt, wenn das Snippet `notice` (bzw. `renderNotice`) gesetzt ist. `columns` (und `versus`)
  setzen `heim` und `gast` voraus; ein Spiel nur mit `opponent` zeigt in diesen Layouts „?“ für die fehlenden
  Mannschaften und kein Ergebnis, die Doku rät davon ab.

### Zeile

- **Zeit:** in `touch` zweizeilig (Datum fett, Zeit darunter, Mono), in `default` und `compact` auf einer Zeile
  („Sa, 26.09.2026 · 17:30“). Die Zeit steht immer in zwei getrennten Elementen, nie als ein String mit
  Punkt am Zeilenende.
- **Gruppenzeile:** `tr.dss-sch-group > th[colspan][scope="colgroup"]` mit dem Text aus `section`. Eine
  neue Gruppe beginnt, sobald sich `section` ändert.
- **Eigene Mannschaft:** `tr.is-own` (vorhandener Hintergrund und Fett) plus Balken links in `--indicator`.
- **Hover:** vorhandener `--dss-hover-bg`.
- **Feld und Halle:** `field` als `.dss-chip` mit Ellipsis ab etwa 14 Zeichen und vollem `title`; `venue` als
  Text in der Zeit-Zelle oder Unterzeile. Beide sind freie Texte.
- **Tabellenkopf:** `<thead>` ist vorhanden, aber visuell versteckt (nur Screenreader), außer bei `columns`,
  wo er sichtbar bleibt (Standard der DSS-Tabelle).

### Zustände

| Zustand | Darstellung |
|---|---|
| `scheduled` | Ergebnis „–“ (gedämpft, Mono) |
| `live` | grüner Puls mit „Live“ **hinter der Uhrzeit** (`dss-match-live`, `dss-match-pulse`); Ergebnis läuft, normal gefärbt |
| `finished` | Ergebnis fett. In `versus`: Verlierer abgeblendet (wie `MatchCard` `is-loser`); in `opponent`: Chip S, N oder U |
| `provisional` | kleiner Text „vorläufig“ neben dem Ergebnis |
| `cancelled` | Zeile durchgestrichen und gedämpft, `note` in Warnfarbe ohne Durchstreichung |
| `postponed` | gedämpft, `note` nennt den neuen Termin |
| `bye` | „{Team} hat Freilos“ über die Spiel-Spalten, ohne Ergebnis |

Live wird nie nur über Farbe gezeigt (Text „Live“), S und N tragen den Buchstaben. Abgeblendet ist
nur ein Zusatz zum fetten Sieger-Ergebnis.

### Handy (unter 640 px)

Die Tabelle wird zur Kartenliste (`display: grid` je Zeile; Kopf bleibt für Screenreader, die Tabellensemantik
bleibt über `role`-Attribute an `table`, `tr`, `td` und `th` erhalten, weil `display` sie sonst in Chrome und
Safari entfernt):
Zeile 1 Zeit (und Live), darunter das Spiel links und das Ergebnis rechts; der Heim/Auswärts-Chip steht
rechts in Zeile 1. Gruppenzeilen bleiben als Überschrift. Der Umbruch hängt an `@media (max-width: 640px)`,
wie bei den anderen Komponenten.

### Barrierefreiheit

- Echte `<table>`, Gruppenzeilen mit `scope="colgroup"`.
- Das Ergebnis wird als unsichtbarer Text (`dss-sr-only`) gesprochen, das sichtbare Ergebnis ist `aria-hidden`:
  „Heim 87, Gast 64“ bzw. „Eigene 65, Gegner 108, Niederlage“, mit Zusatz „vorläufig“ und bei Live „läuft“.
- Abgesagte und verschobene Spiele tragen zusätzlich den unsichtbaren Text „abgesagt“ bzw. „verschoben“ in der
  Zeit-Zelle, damit der Zustand nicht nur über Farbe und Durchstreichung erkennbar ist (WCAG 1.4.1).
- Eigene Mannschaft: auch ohne Farbe erkennbar (Fett und Balken); Teamlinks sind echte Links.
- Fokus-Ring wie überall (`--ring-color`, mindestens 3:1).

## Variante B: `ScheduleGrid`

### Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `games` | `ScheduleGame[]` | | jedes Spiel hat `time` und `column` |
| `columns` | `{ id: string; label: string }[]` | | Spalten in der gewünschten Reihenfolge; `label` ist freier Text (auch echter Hallen- oder Feldname) |
| `slots` | `string[]` | aus `games` | Anwurfzeiten als Zeilen, sortiert; ohne Angabe aus `games.time` abgeleitet |
| `breaks` | `{ time: string; label: string }[]` | | Pausen und Sperrzeiten als Zeile über alle Spalten |
| `emptyLabel` | `string` | `frei` | Text für leere Zellen |
| `density` | wie A | `default` | |
| Snippet `notice` (Svelte) / `renderNotice` (React) | pro Spiel | | z. B. Konflikt-Badge in der Zelle |

### Aufbau

- Erste Spalte: Zeit in Mono (Zeilenkopf `th scope="row"`), danach je Halle oder Feld eine Spalte
  (Spaltenkopf `th scope="col"`). Spaltenköpfe dürfen auf zwei Zeilen umbrechen.
- **Zelle:** „Heim – Gast“ (lange Namen brechen um), darunter Mono-Klein `{nr} · {section}`. Platzhalter
  kursiv und gedämpft, eigene Mannschaft mit `is-own`-Hintergrund und Balken.
- **Leere Zelle:** gedämpfter Text `emptyLabel`.
- **Pause und Sperrzeit:** Zeile über alle Spalten (`colspan`), gedämpft, mit Zeit und Text.
- **Freilos:** Zeile über alle Spalten („{Team} hat Freilos“), gesetzt über ein Spiel mit `state: 'bye'`
  ohne `column`.
- **Zustände in der Zelle:** live (Puls, Stand), finished (Ergebnis in Mono unter den Namen, Verlierer
  abgeblendet), cancelled (durchgestrichen mit `note`), postponed, provisional wie bei A.
- **Nur Gegenüberstellung:** `ScheduleGrid` nutzt nur `heim` und `gast`, nicht die Perspektive (`opponent`).
  Spiele, deren `column` zu keiner Spalte passt, oder ohne `time` erscheinen nicht (außer Freilos).
- **Viele Spalten:** Die Doku empfiehlt höchstens drei Spalten je Raster. Als Sicherung scrollt der Rahmen
  seitlich (`overflow-x: auto`) und die Zeitspalte bleibt per `position: sticky` links stehen.

### Handy (unter 640 px)

Jede Anwurfzeit wird ein Block mit der Zeit als Überschrift; darunter stehen die Spiele untereinander, jedes
mit der Spalten-Beschriftung als kleiner Chip (bricht bei langen Namen um). Leere Zellen entfallen auf dem
Handy.

### Barrierefreiheit

Echte `<table>`, Zeit als Zeilenkopf, Spalten als Spaltenköpfe, leere Zellen mit lesbarem Text,
Zustände nicht nur über Farbe: Das Ergebnis ist unsichtbarer Text neben dem `aria-hidden`-Ergebnis, abgesagte und
verschobene Spiele tragen im Spielblock den unsichtbaren Text „abgesagt“ bzw. „verschoben“, die Freilos-Zeile ohne Zeit
den unsichtbaren Text „Zeit offen“. Auf dem Handy bleibt die Tabellensemantik wie bei A durch `role`-Attribute erhalten.

## Struktur

| Datei | Inhalt |
|---|---|
| `css/components.css` | Klassen für A und B: `dss-tbl--schedule`, `dss-sch-*` (Zellen, Gruppenzeile, Zustände), `dss-sgrid*`. Neue Klassen nur dort, wo es keinen Baustein gibt; Chips, `is-own`, `dss-match-live`, `dss-link` werden wiederverwendet |
| `js/schedule.js` | reine Funktionen für Svelte und React: `outcome`, `resolveOutcome`, `hasScore`, `layoutFor`, `densityFor`, `columnsFor`, `slotsFromGames`, `buildGrid`, `ariaForResult` u. a. |
| `svelte/ScheduleTable.svelte`, `svelte/ScheduleGrid.svelte` | ohne eigenen `<style>`-Block, nur Klassen aus `components.css` |
| `react/ScheduleTable.tsx`, `react/ScheduleGrid.tsx` | gleiche Struktur und Klassen; Typen aus `react/schedule-types.ts`, exportiert aus `react/index.ts` |
| `package.json`, `parity.manifest.json` | Exporte `./svelte/ScheduleTable`, `./svelte/ScheduleGrid`, `./schedule.js`; Manifest-Einträge |
| `stories/` | `Components/ScheduleTable`, `Components/ScheduleGrid`; Abschnitt „Spielpläne“ in `Docs/Tables` |
| `README.md`, `CHANGELOG.md` | Datenmodell, Zuordnung für Turnier-Manager (`Game` auf `ScheduleGame`) und Vereinsregister |

## Tests

- **Unit** (`js/schedule.js`): Sieg, Niederlage, Unentschieden, fehlende Stände; Slots aus Spielen,
  sortiert und ohne Duplikate; Layout-Wahl; Texte für Screenreader (`ariaForResult`).
- **React** je Komponente: alle drei Layouts (A), jeder Zustand, unsichtbarer Ergebnis-Text, Slots bzw.
  Snippets `time` und `notice`, Gruppenzeilen, Pausen und leere Zellen (B), Freilos, `renderLink`, Verhalten bei
  fehlenden optionalen Feldern.
- **CSS** (`components-css.test.ts`): Pflichtklassen; Tabellenzellen mit Breite und Padding haben
  `box-sizing: border-box`.
- **Parität:** neue Komponenten im Manifest, kein `<style>` in Svelte.
- **Visuell:** neue Stories im Vergleichsskript (`scripts/visual-compare.mjs`); beide Marken und Hell/Dunkel
  rendern, Handy-Breite 420 px prüfen.

## Bewusst nicht Teil dieses Entwurfs

- **Druck und PDF:** Teil 2. Der Turnier-Manager exportiert PDFs über `@react-pdf/renderer` mit eigenem
  Theme; das DSS soll dafür einen Baukasten bekommen, der dasselbe Datenmodell nutzt.
- Filter-Tabs (Alle, Heim, Auswärts): App-Sache; die Doku zeigt die Kombination mit `Tabs`.
- Datumsformatierung, Sortierung, Konflikterkennung, Bearbeitungslogik der Startzeit, Logo-Laden,
  Paginierung.
- Dunkler Rahmen (`dss-frame--dark`) für die Spielplan-Komponenten; der seitenweite Dark Mode wirkt über die
  `--dss-*`-Variablen.
- Weitere Dichte „komfortabel“ (größere Zeilen für öffentliche Seiten): bewusst nicht aufgenommen.

## Annahmen und Risiken

- Die Handy-Umschaltung folgt der Viewport-Breite. In einer schmalen Spalte auf großem Bildschirm
  bleibt es bei der Tabelle. Falls das stört, lässt sich später auf Container-Größe umstellen.
- Logos werden als URL übergeben und nicht vom DSS geladen oder zugeschnitten; fehlende Logos ersetzen
  Initialen.
- Der Zustand `postponed` wird nur gedämpft und mit Notiz dargestellt; ein neuer Termin ist Text in `note`.
- Die Dichte `compact` (40 px) gilt nur für einzeilige Zeiten ohne Logo; mit Logo ist `touch` Pflicht.
