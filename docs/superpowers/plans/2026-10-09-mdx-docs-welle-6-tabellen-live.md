# MDX-Doku Welle 6: Tabellen und Live-Scoring

Folgt `2026-10-09-mdx-wellen-2-bis-7-brief.md`. Ersetzt die automatischen Doku-Seiten von `Components/Table` und `Components/PlayByPlay` und die manuelle Seite `Docs/Tables & Live-Scoring`.

## Dateien

| Datei | Zweck |
| --- | --- |
| `stories/Table.mdx`, `Table.stories.ts`, `Table.code.ts`, `components/TableExamples.svelte`, `components/tableData.ts` | Table: Dichten, Zellbausteine, Boxscore, Dunkel, Zustände, Dos und Don'ts |
| `stories/PlayByPlay.mdx`, `PlayByPlay.stories.ts`, `PlayByPlay.code.ts`, `components/PlayByPlayExamples.svelte`, `components/pbpData.ts` | PlayByPlay: Eintrag, Ereignisarten, Live-Betrieb, Zustände, Dos und Don'ts |
| `svelte/Table.svelte`, `react/Table.tsx` | Scrollbereich als `region` mit Name und Tastaturzugang; Svelte: `caption` und `titleAs` wie React |
| `css/components.css` | Fokus-Ring für Scrollbereich und Tabellen-Bedienelemente; Positionsmarken und Status-Pillen auf Chip-Tokens (Dunkelmodus); Plus/Minus-Klassen |
| `tests/tables.test.ts` | Fokus-Ring, Dunkelmodus-Kopplung, alte Seite entfernt |
| `.storybook/storybook.css` | Überschriften in Stories (`h1` bis `h3` des Doku-Containers) nicht mehr überschreiben |
| `.storybook/preview.ts` | storySort: Gruppe `Docs` entfällt |
| `stories/docs/TablesDoc.svelte`, `Tables.spec.stories.ts`, `_SpecPage.svelte` | entfallen |

## Verteilung der alten Seite

- 01 Density (Tabelle) -> Table, Abschnitt Dichten
- 02 Boxscore -> Table, Boxscore
- 03 Kampfgericht Dark -> Table, Dunkle Fläche
- 04 Play-by-Play -> PlayByPlay, Aufbau und Ereignisarten
- Spielpläne (Verweis) -> Table, Abschnitt Spielpläne

## Dos und Don'ts (Fakten aus dem CSS)

Table: Zahlen rechtsbündig in Mono (`td.num`: `text-align: right`, `--font-mono`, `tabular-nums`; `.dss-tn` ist dagegen die Trikot-Marke); Dichte nach Gerät (Zellhöhe touch 60, default 48, compact 40, dense 32 px, dazu 1 px Linie); wichtige Spalten zuerst (`white-space: nowrap`, Scrollbereich); Tabelle benennen (`title` / `caption` benennt den Scrollbereich); Farbe nie allein (Pille mit Text).

PlayByPlay: Titel und Reihenfolge stimmen überein (Baustein sortiert nicht); Team im Text, Streifen ist `aria-hidden`; Zeit als M:SS (Spalte 70 px, nowrap fehlt, Umbruch); `live` nur für laufende Spiele.

## Prüfpunkte

- Dunkelmodus der Positionsmarken, Pillen und Plus/Minus messen (beide Marken); Hellmodus unverändert.
- Ring-Kontrast >= 3:1 auf Zeilenflächen (hell, dunkel, beide Marken).
- PlayByPlay: Verhalten nur nach Code und Browser (`role="log"`, kein Auto-Scroll, Reduced Motion).
