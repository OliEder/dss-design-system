# Changelog

Alle nennenswerten Änderungen an diesem Design System werden hier dokumentiert.
Versionierung folgt [Semantic Versioning](https://semver.org/).

## [Unreleased] — Vanilla-CSS-Komponenten

Framework-freie Umsetzung der Komponenten (`css/components.css`), entstanden im Vereinsregister
(Basketball Vereinsregister Deutschland), das das DSS ohne Svelte und ohne Build-Schritt nutzt.

### Neu
- `css/components.css` mit denselben Klassennamen wie die Svelte-Komponenten: `dss-btn` (primary · amber ·
  secondary · ghost, Größen sm/md/lg, Icon), `dss-card` (default · elevated · flat · hoverable),
  `dss-tabs` (underline · segmented · pills, auch per `aria-pressed`/`aria-selected`), `dss-frame` +
  `dss-tbl` (Tabelle mit `num`/`lead`-Spalten, `is-own`-Zeile, compact), Eingabe (`dss-input-group`,
  `dss-input`, `dss-select`).
- Neue Bausteine: `dss-chip` (neutral · sky · amber · ok · warn · err · mono · link), `dss-stat`
  (Kennzahl-Kachel), `dss-rows`/`dss-row` (Listenzeile für Spielpläne), `dss-topbar`, `dss-empty`,
  `dss-eyebrow`, `dss-link`, `dss-sr-only`.
- Semantische Aliase `--dss-*` (Text, Linien, Flächen, Link, Akzent, Button, Chips) mit Light- und
  Dark-Werten. Komponenten verwenden nur diese Aliase, daher funktioniert Dark ohne Overrides.
- Dark-Theme: Primär-Button wechselt auf helle Fläche mit dunklem Text (ink-900 wäre auf dunklem
  Hintergrund unsichtbar).
- `dss-btn--danger`, `dss-btn.is-touch`; Feld-Bausteine `dss-field-help*`, Zustände `is-error|ok|warn`,
  Dichte `dss-input--default|compact`, `dss-select--compact`, `dss-addon--right`.
- `dss-banner*` (info · ok · warn · danger) und `dss-modal*` (aus `svelte/Modal.svelte` extrahiert,
  dark-sicher über die `--dss-*`-Aliase).
- Tabs: Größen `sm|lg`, Variante `vertical`, `dss-tab-count`, `dss-tab-ic`; `dss-icon`.
- Svelte: neue Komponenten `Select` (natives `<select>`) und `Banner`, beide nur mit `dss-*`-Klassen.
- Storybook lädt jetzt `css/components.css`; Stories für Select und Banner.
- Tests: `tests/components-css.test.ts` (Vitest) prüft die benötigten Klassen.

### Geprüft
- Im Vereinsregister läuft ein axe-core-Test (WCAG 2.2 AA als Gate, AAA-Kontrast 7:1 und 44-px-Ziele
  als Ratchet): alle Seiten bestehen in Light und Dark ohne offene AAA-Verstöße.

## [0.6.0] — 2026-05 · App-Shell-Pack

Drei Komponenten-Specs, die das Foundation-Set zu einem produktionstauglichen App-Shell-Pack
ausbauen. Ergänzt bestehende Tokens, ohne Breaking Changes.

### Neue Svelte-Komponenten
- **Card** (`svelte/Card.svelte`) — Default · Elevated · Flat · Hoverable, mit Header/Footer-Slots.
- **Tabs** (`svelte/Tabs.svelte`) — alle 4 Varianten der Navigation-Spec (Underline · Segmented ·
  Pills mit Multi-Select · Vertical), Tastatur-Navigation, optionale Icons & Counts.
- **Icon** (`svelte/Icon.svelte`) — zentraler Sprite-Renderer für die 54 Glyphen, lazy-injizierter
  Sprite, currentColor, `IconName`-Typ für Autocomplete.

### Storybook
- Erstes lauffähiges Storybook-Setup (`.storybook/` + `stories/`).
- Light/Dark-Toggle via `addon-themes` (schreibt `data-theme` auf `<html>`).
- A11y-Addon aktiv (Kontrast-Checks gegen WCAG AAA).
- Stories für alle 6 Komponenten + Foundation/Colors mit allen Hue-Ramps.
- Scripts `npm run storybook` / `npm run build-storybook`.

### Neue Spec-Dokumente
- **Navigation** (`DSS Design System - Navigation.html`)
  App-Shell, Top-Bar (3 Varianten: Web · Live-Scoring · Admin), Sidebar (collapsed + expanded),
  Tabs (Underline · Segmented · Pills · Vertical), Breadcrumbs (Standard · Tagged · Invert),
  Bottom-Nav (5-Item · mit zentralem FAB), Stepper (Horizontal · Vertical · Dots),
  Sub-Nav / Filter-Strip.
- **Cards & Lists** (`DSS Design System - Cards & Lists.html`)
  Card-Anatomie (Default · Elevated · Flat · Hoverable), Match-Cards (Scheduled · Live · Finished
  + Compact List-Row), Player-Cards (Compact · Standard · Hero), Standings mit Form-Sequenz und
  Movement-Pfeil, Crew &amp; Team-People, Empty / Skeleton / Error-States.
- **Icons** (`DSS Design System - Icons.html`)
  Basketball-Icon-Set in 7 Familien: 13 Spielaktionen (2P · 3P · Freiwurf · Foul P/T/U/D ·
  Rebound · Assist · Steal · Block · Turnover · Wechsel), 6 Court-Elemente, 5 Rollen
  (Schiri · Anschreiber · Coach · Captain · DNP), 6 Status-Marker, 7 System-Glyphen plus
  30 UI-Core-Icons. Alle 24×24, Stroke 1.75, `currentColor`. Live-Suche &amp; Click-to-Copy
  im Dokument.

### Tokens / Foundation
- Keine Änderungen — Pack baut konsequent auf v0.5 Tokens auf.
- Token-Sync-Slider in jedem Tweaks-Panel (Ink · Amber · Sky Hue).

### Cross-File-Konsistenz
- Topstrip, Hero, Section-Header und Frame-Anatomie sind 1:1 mit Tables / Forms / Modals.
- Light + Dark in jedem relevanten Pattern.
- Touch-Targets respektieren weiterhin die 44 / 56 / 64-Stufung.

---

## [0.5.0] — 2026-05 · Pre-release

Foundation steht. Wird im Feldeinsatz mit den ersten Apps gehärtet, bevor v1.0 deklariert wird.

### Foundation
- **Color System:** Drei-Achsen-Identität (Ink · Amber · Sky) mit je 10–13 Stufen, oklch-basiert
- **AAA-konform:** Alle Text-Token-Paare validiert gegen WCAG 2.1 AAA (≥ 7:1 für Body, ≥ 4.5:1 für Large Text)
- **DBB-Compat-Preset:** 1-Hue-Swap umschaltbar auf DBB-Branding (Schwarz · Weiß · Gold · Hellblau)
- **Typografie:** Sora + Manrope + JetBrains Mono (alle Google Fonts, frei nutzbar)
- **Spacing:** 4 px Basis-Grid
- **Themes:** Light + Dark (auto via `prefers-color-scheme` oder explizit via `data-theme`)

### Komponenten
- **Buttons:** Primary · Amber · Secondary · Danger · Ghost · in 3 Größen
- **Forms:** Text · Number · Stepper · Select · Combobox · Date · Time · Textarea · Upload · Checkbox · Radio · Toggle · Segmented
- **Tables:** 4 Density-Stufen · Roster · Boxscore · Play-by-Play · Comparison · Crew
- **Modals:** Confirm-Dialog · Bottom-Sheet · Drawer · Toast · Banner · Popover
- **Live Scoring:** Split-Screen-UI mit Team-Config (Trikotfarbe, Logo) + Spielrichtungspfeil

### Touch Targets
- 44 px (WCAG-Min) · 56 px (Default) · 64 px (Hallen-Tisch)

### Validation
- **FIBA-Trikotnummer-Regex** als shared Token: `^(0|00|0?[1-9]|[1-9][0-9])$`
- 0, 00, 1–9, 01–09, 10–99 als unterschiedliche, eindeutige Nummern

### Distribution
- `tokens.css` (Drop-in)
- `tokens.json` (Design Tokens CG Format)
- `tailwind.preset.js` (Tailwind v3/v4)
- Svelte 5 Referenz-Komponenten (Button · TextInput · Modal)

---

## [Roadmap]

### v0.6 — v0.9 (Feldhärtung)
- Erste produktive Integration im Spielbericht (Tauri + Svelte 5)
- Token-Feinjustierung basierend auf Hallen-Tests
- Fixes aus Live-Einsatz

### v1.0 (Produktiv-Freigabe)
- Stabil im Feldeinsatz validiert
- ~~Navigation-Komponenten (Top-Bar · Tabs · Bottom-Nav)~~ ✅ v0.6
- ~~Cards & Lists~~ ✅ v0.6
- ~~Icon-Library~~ ✅ v0.6 (54 Glyphen, basketball-spezifisch)
- ~~Storybook~~ ✅ v0.6

### v1.x (Content-Komponenten)
Damit das System auch für Verbands-Website, Vereins-Portale und News-Bereiche taugt:
- **Images** — responsive `<picture>`-Wrapper mit Aspect-Ratio-Tokens, Lazy-Loading-Patterns, Fallback-Placeholder
- **Hero-Teaser** — drei Varianten: Image-Background (Bundesliga-Highlights), Split-Layout (Mannschafts-Portrait), Text-Only (Ankündigungen)
- **Artikel-Formate** — Standard-Artikel, Match-Report (mit eingebettetem Endbericht), Spieler-Porträt, Interview, Liveticker-Archiv
- **Foto-Galerien** — Masonry-Grid, Lightbox-Overlay, Karussell, Mannschafts-Porträt-Grid
- **Video-Embed** — Highlights, Pressekonferenzen, Schiedsrichter-Schulungen
- **Quotes & Pull-Quotes** — Trainer-Zitate, Spieler-Statements
- **Sponsoren-Logos** — Logo-Wand, Carousel
- **Newsletter-Modul** — Sign-up, Archive

### v1.x (Domain-spezifische Module)
Spezialisierte Komponenten für basketball-typische Daten und Strukturen:
- **Icon-Library** — basketball-spezifisches Icon-Set als zentrales Sub-Modul:
  - Game-Aktionen: 2P · 3P · Freiwurf · Foul (P/T/U/D) · Rebound · Assist · Steal · Block · Turnover
  - Spielfeld-Elemente: Korb · Backboard · Zone · 3-Punkte-Linie · Mittellinie · Shot Clock
  - Rollen: Schiedsrichter (Pfeife) · Anschreiber · Trainer (Clipboard) · Captain · DNP
  - Status: Live · Auszeit · Halbzeit · Disqualifikation · Foul-Out · Bonus
  - System: Sync · Offline · Validiert · Druck · Signatur
  - Format: 24×24 outlined (default), 16×16 (inline), 32×32 (touch); SVG mit `currentColor`
  - Stroke-Width tokenisiert; passt zu Sora-Headlines visuell
- **Map-Integration** — Hallen-Standorte fürs Vereinsarchiv: Marker-Cluster, Custom-Pin-Design in Team-Farben, Halle-Detail-Popover, Anreise-Button. Provider-agnostisch (Leaflet / MapLibre / Mapbox-kompatibel) — Token-basiertes Custom-Styling für Karten-Tiles in Ink/Sky-Tonalität.
- **Tournament Brackets** — K.O.-Spielbäume für Playoffs, Pokal, Turniere:
  - Single-Elimination (klassischer Cup-Tree)
  - Double-Elimination (Winner- + Loser-Bracket)
  - Round-Robin → K.O. (Gruppenphase + Playoffs)
  - Match-Knoten mit Team-Kacheln, Score, Live-Status, Sieger-Markierung
  - Horizontale (Desktop) und vertikale (Mobile) Darstellung
  - Tabellen-Cross-References zu Spielbericht/Endbericht-Modal

### v2.0 (mittelfristig)
- DBB-Compat als getrennter Preset-Build
- React-Komponenten parallel zu Svelte
- Animations-Tokens (Spring-Konfigurationen für Live-Scoring-Interaktionen)
