# Design: Spielplan-Korrekturen, durchgängiger Live-Stil, Karten, Namensvarianten und Logos

Stand: 2026-10-10 · Auslöser: Rückmeldung nach Abschluss der MDX-Doku (Wellen 0 bis 7).

## Entscheidungen des Auftraggebers

| Frage | Entscheidung |
|---|---|
| Roter Text im Dunkelmodus | Erledigt: war kein Problem mehr (Tonwechsel auf die Chip-Tokens), entfällt |
| Live-Ergebnis | Grün, **sanftes Pulsieren** (Helligkeit, nie unter 0,35, bei „Bewegung reduzieren“ aus); WCAG 2.2.2 bleibt erfüllt (kein hartes Blinken, kein Flackern) |
| „vorläufig“ im Spielplan | **Darunter**, als kleines Tag (Ergebnisspalte springt nicht) |
| Team Card | Logo, Name, Kurzname, Liga · Bilanz und Tabellenplatz · nächstes und letztes Spiel · Kader-Kurzliste · optional Saison-Stats (2PP %, 3PP, TRB, TO), nur wenn vorhanden |

## Pakete (in dieser Reihenfolge, je Paket Worktree, Umsetzung, unabhängiger Review, Merge, Push)

### Paket 1: Spielplan-Korrekturen
1. **„vorläufig“** steht in `ScheduleTable` (alle Layouts) und `ScheduleGrid` nicht mehr hinter dem Ergebnis, sondern als kleines Tag **unter** der Ergebniszahl. Die Ergebniszelle behält ihre Breite und Ausrichtung; nur Zeilen mit vorläufigem Ergebnis werden etwas höher. Screenreader-Text bleibt („vorläufig“ hinter dem Ergebnis).
2. **Zeitraster, Live:** Das Live-Kennzeichen steht **neben** der Paarung bzw. dem Ergebnis, nicht darunter.
3. **Feld-Chip** (z. B. „F1“) im Spielplan: Text vertikal mittig (er sitzt leicht zu hoch).
4. **Mobil, Layout `opponent` (vs./@):** Die Uhrzeit rückt in die **erste Zeile** der Karte; „vs.“/„@“ steht **vor** dem Gegner.
5. Doku (`Spielplan.mdx`, Zustände „Vorläufig“ und „Live“, Handy-Abschnitt, Dichten) und Dos/Don'ts nachziehen; Messwerte gegen das CSS prüfen.

### Paket 2: Live-Stil durchgängig
Gemeinsame Bausteine: Token `--live-fill` (Fläche/Punkt, `--ok-fill`-nah), `--dss-live-fg` (Text, hell und dunkel ≥ 7:1), eine Keyframe-Animation `dss-live-pulse` (1,6 s, 1 → 0,35 → 1), ein Hilfsklasse für das Live-Wort-Tag. Anwendung überall, wo „live“ gezeigt wird:
- `ScheduleTable`, `ScheduleGrid`: Ergebnis **grün** und pulsierend, Live-Tag mit Punkt.
- `MatchCard` (Zustand `live`), `PlayByPlay` (Live-Punkt, Kopf), `TopBar` (`dss-topbar-live`, bisher rot): vereinheitlichen auf dieselbe grüne Live-Sprache; Puls nur mit `prefers-reduced-motion: no-preference`.
- Nie nur Farbe: Das Wort „Live“ bzw. der Screenreader-Text „läuft“ bleibt.
- Kontraste Hell/Dunkel, beide Marken, messen (Text ≥ 7:1, Punkt ≥ 3:1); Tests (Token-Regeln, reduced-motion).
- Doku: ein Abschnitt „Live“ in der Foundation-Seite (neue Seite `Foundation/Live` oder Abschnitt in Focus & Hover, Entscheidung beim Bau) und Verweise von Spielplan, Card Library, PlayByPlay, Navigation (TopBar).
- Folge: `TopBar`-Live wird von Rot auf Grün umgestellt (eine bewusste Änderung der Live-Farbe, im CHANGELOG nennen).

### Paket 3: Namensvarianten und Logos (Spielplan und Karten)
- Datenmodell: `ScheduleTeam.short?: string` (Kurzname); `logo?: string` besteht schon. `MatchCard`-`Team` hat `short?` schon.
- Darstellung: Prop `names?: 'full' | 'short'` (Standard `full`) und `logos?: boolean` (Standard `false`; mit `logo` die URL, sonst Initialen) an `ScheduleTable`/`ScheduleGrid`/`MatchCard`. Unter 640 px nutzt die Anzeige automatisch `short`, wenn vorhanden (CSS, beide Texte im Markup; ohne JavaScript).
- Kein Platzhalter-Logo für Fremdteams ohne Daten: Initialen-Kreis wie im Layout `opponent`.
- Doku: Varianten auf den Seiten Spielplan und Card Library, Dos/Don'ts (Kurzname nur mit eindeutiger Zuordnung, Logos mit Alternativtext leer, weil Name daneben steht).

### Paket 4: Karten
- **PlayerCard mit Bild:** Prop `photo?: string` (URL) und `photoAlt?` (Standard leer, dekorativ, weil der Name danebensteht); Fallback bleibt Trikotnummer/Initialen; alle drei Größen (compact: kleiner runder Avatar; standard: Kopfbild; hero: Hintergrund/Porträt). Hinweis in der Doku: Fotos von Minderjährigen nur mit Einwilligung.
- **MatchCard Spielabschnitte:** Statt freiem `quarter` die Props `period?: number` und `periods?: 4 | 8` (Standard 4) mit festen Beschriftungen („3. Viertel“ / „5. Achtel“), dazu `clock`; `quarter` bleibt als Alias (veraltet) für bestehenden Code. Mini-Basketball: `periods={8}` zeigt Achtel. Auch in `PlayByPlay` die Beschriftung `Q4` bzw. „4. Viertel“/„Achtel“ prüfen und gleich behandeln.
- **TeamCard (neu)**, Svelte + React + Vanilla-CSS (`dss-team*`), Parität im Manifest, Tests, MDX-Seite `Components/TeamCard` (oder Abschnitt in Card Library): Kopf mit Logo (Initialen-Fallback), Name, Kurzname, Liga; Bilanz (S–N) und Tabellenplatz; zwei Zeilen „Nächstes Spiel“ und „Letztes Spiel“ im Stil der Spielkarte (Ergebnis S/N-Chip); Kader-Kurzliste (Anzahl Spieler und Trainer); optional Saison-Stats (2PP %, 3PP, TRB, TO) nur wenn übergeben; Größen `compact` (Listenzeile) und `standard`; klickbar (`href`/`onclick`) wie MatchCard; Zustände (Hover/Fokus), Dunkelmodus, 420 px.

## Qualitätsregeln für alle Pakete
- Gleiche Prüfung wie in den MDX-Wellen: Tests (mehrfach), Typecheck, Storybook-Build, Browser (BBV/DBB × Hell/Dunkel × 1280/420 px), axe (inkl. `color-contrast-enhanced`), Inhaltsvergleich, unabhängiger Review, Mutationstests für neue Regeln.
- CSS, Svelte und React bleiben in Parität (`parity.manifest.json`, SSR-Vergleich).
- Fakten in der Doku gegen CSS/Code messen; kein erfundener Wert.
- Keine neuen Abhängigkeiten.

## Bestätigt am 2026-10-10
- Prop-Namen: `names="full" | "short"` und `logos` (Spielplan, Karten); `period` und `periods={4 | 8}` (MatchCard, PlayByPlay).
- Offen bleibt nur: Wo die Live-Foundation-Doku steht (entscheidet die Umsetzung von Paket 2) und ob Team Card und Spielplan das Datenmodell `ScheduleTeam` teilen (Vorschlag: ja, `name`, `short`, `logo`).
- Reihenfolge: Pakete 1 und 2 zuerst (laufen gemeinsam), danach 3, danach 4, weil sich die Pakete dieselben Dateien teilen.

## Spielerfotos für die Demos (Paket 4)
- Quelle: die Unsplash-Fotos im lokalen Ordner `images/` (ignoriert, 110 MB, 39 Dateien). Der Ordner bleibt ignoriert und wird nie referenziert, weil er auf GitHub Pages und im CI fehlt.
- Vorgehen: Eine kleine Auswahl (etwa 6 bis 10 Fotos mit gut erkennbaren Gesichtern/Porträts) wird mit `sips` auf quadratische Ausschnitte von höchstens 480 px verkleinert (JPEG, Ziel unter 60 KB je Datei) und unter `stories/assets/players/` abgelegt (nur Storybook, nicht im npm-Paket: `package.json` `files` prüfen). Dazu `stories/assets/players/CREDITS.md` mit Fotograf und Link zur Unsplash-Lizenz (Namen aus den Dateinamen).
- Die Bilder zeigen echte Personen, die Demo-Namen sind erfunden: Das wird in der Doku nicht als „echter Spieler“ ausgegeben; keine Zuordnung zu realen Vereinen.
- Die Auswahl und der Zuschnitt werden vor dem Merge im Screenshot geprüft (Gesicht im Ausschnitt, kein Text/Logo im Bild).
