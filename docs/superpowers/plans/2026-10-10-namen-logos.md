# Plan: Namensvarianten und Logos (Paket 3)

Spec: `docs/superpowers/specs/2026-10-10-live-karten-namen-design.md`. Branch `feat/namen-logos`.

## Entscheidungen
- Daten: `ScheduleTeam.short?`; `MatchCard`-Team: `name`, `short?`, `logo?` (Svelte und React gleich).
- Props `names?: 'full' | 'short'` (Standard `full`) und `logos?: boolean` an `ScheduleTable`, `ScheduleGrid`, `MatchCard`.
- Logos: Standard aus. Ausnahme Layout `opponent` (zeigt Logo/Initialen schon immer): bleibt an, solange `logos` nicht explizit `false` ist.
- Namen: Markup mit beiden Texten (`dss-name-full`, `dss-name-short` mit `aria-hidden`). Der volle Name gilt für Hilfstechnik: wo der Kurzname sichtbar ist, wird der volle Name per `dss-sr-only`-Muster versteckt, bleibt aber lesbar. Regel unter 640 px per CSS, ohne JavaScript.
- Platzhalter: kein Logo. Initialen aus dem vollen Namen (max. 2 Buchstaben), Kreis; Bild: Kachel `--dss-surface-2`.
- Größen: 28 px (touch/default, MatchCard), 20 px (compact); Zeilenhöhen 60/48/40 unverändert (messen).

## Dateien
`js/schedule.js`/`.d.ts` (short-Hilfe), `css/components.css`, `svelte/{ScheduleTable,ScheduleGrid,MatchCard}.svelte`, `react/{ScheduleParts,ScheduleTable,ScheduleGrid,MatchCard}.tsx`, Tests (`tests/names-logos.test.ts`, React-Tests, SSR-Parität), Doku (`Spielplan.mdx` + Examples/Playground/Code, `CardLibrary.mdx` + Examples/Playground/Code), `stories/assets/logos/*.svg`, CHANGELOG, README.

## Prüfung
Tests (3x), Typecheck, Storybook-Build, Index, Browser (Marken, Hell/Dunkel, 1280/420), axe auf 22 Seiten, Zugänglichkeitsbaum, SSR-Vergleich, Mutationstests.
