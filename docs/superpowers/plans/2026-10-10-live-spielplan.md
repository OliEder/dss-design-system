# Plan: Spielplan-Korrekturen und durchgängiger Live-Stil (Pakete 1 und 2)

Spec: `docs/superpowers/specs/2026-10-10-live-karten-namen-design.md`. Branch `feat/live-spielplan`.

## Paket 1: Spielplan-Korrekturen
1. "vorläufig" unter der Ergebniszahl (ScheduleTable alle Layouts und Handy-Karte, ScheduleGrid). Zahl in fester Ausrichtung, Tag klein darunter. Dateien: `svelte/ScheduleTable.svelte`, `svelte/ScheduleGrid.svelte`, `react/ScheduleParts.tsx`, `react/ScheduleTable.tsx`, `react/ScheduleGrid.tsx`, `css/components.css`. Messen: Zeilenhöhen (60/48/40), `left`/`right` der Zahl.
2. Zeitraster: Live-Kennzeichen neben Paarung bzw. Ergebnis (Flex-Zeile, umbricht erst bei Bedarf).
3. Feld-Chip: vertikale Zentrierung des Chip-Textes messen und korrigieren (`.dss-chip`, `.dss-chip--mono`).
4. Handy `opponent`: Uhrzeit in die erste Zeile, "vs."/"@" vor den Gegner (Markup und Handy-CSS beider Fassungen).
5. Doku: `Spielplan.mdx`, Examples, Spielwiese, `Spielplan.code.ts` (Vanilla-Markup), Dos/Don'ts.

## Paket 2: Live-Stil
- Tokens `--live-fill`, `--dss-live-fg`, `--dss-live-fg-on-dark` in allen drei Blöcken.
- Eine Animation `dss-live-pulse` (nur Deckkraft, 1 -> 0,35 -> 1, 1,6 s), reduced-motion aus.
- Anwendung: Spielplan (Zeile, Raster), MatchCard, PlayByPlay, TopBar (von Rot auf Grün), Crumb-Punkt.
- Tests: Tokens, Kontrast, keine `--err-*` bei Live, reduced-motion, alte Keyframes weg.
- Doku: neue Foundation-Seite `Foundation/Live` (mehr als ein Absatz), Verweise, CHANGELOG.
