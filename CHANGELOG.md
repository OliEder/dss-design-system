# Changelog

Alle nennenswerten Änderungen an diesem Design System werden hier dokumentiert.
Versionierung folgt [Semantic Versioning](https://semver.org/).

## [Unveröffentlicht] — Marken-Rollen und DBB-Marke

### Neu
- **DBB-Marke** (nach basketball-bund.de: Schwarz · Weiß · Anthrazit `#191919` · Gold `#c9ae64` · Orange `#ff9900`) als
  zweite Farbwelt neben BBV (Ink · Amber · Sky). Aktivierung mit `<html data-brand="dbb">`; Skalen `--gold-*` und
  `--orange-*` in `tokens/tokens.css`. Die DBB-Marke hat kein Blau.
- **Rollen-Tokens** `--base-*`, `--signal-*`, `--cool-*`, `--action-bg*` und `--indicator` als Schicht zwischen
  Marken-Skalen und Komponenten. Hue-Variablen `--h-cool` und `--h-signal` für Chips und Fokus-Ring, `--c-cool` für
  die Chroma der cool-Chips im Dark Mode.
- CourtLines: Token `--dss-court-color`; in BBV schwaches Amber (hell `amber-200`, dunkel `amber-700`), in der DBB-Marke golden (hell `gold-200`, dunkel `gold-700`,
  gedämpfter Text darüber bleibt ≥ 7:1).
- **Schrift-Achse** `data-type="dbb"`, unabhängig von `data-brand`: Rubik (Body) und Sucrose (Display) wie auf
  basketball-bund.de. Sucrose ist lizenzpflichtig und nicht im Paket; Fallback ist Barlow Condensed.
- **Type scale** als CSS-Variablen und Klassen: `--fs-*`, `--lh-*`, `--ls-*`, `--fw-*`, `.dss-t-*`, `.dss-tnum`,
  `.dss-measure`. Neu gegenüber `tokens.json` bisher: `body-md` (14 px, kompakte UI), `caption` (11 px, Mono),
  `stat` (22 px, Kennzahlen) und `hero` (32 px, Name in Hero-Karten); Handy-Größen `--fs-*-sm` (≤ 640 px).
- Storybook: `Foundation/Typography` (Skala, Familien und Gewichte, Zahlen und Mono, Im Einsatz, Audit).
- README: Anleitung, eine eigene Marke für einen anderen Verein anzulegen.
- Storybook: Toolbar-Umschalter für Marke und Schrift; Schriften werden über `.storybook/preview-head.html` geladen.

### Geändert
- **Svelte nutzt wie React und Vanilla nur noch `css/components.css`:** `Button`, `Card`, `Modal`, `Tabs`, `TextInput` und `Icon`
  hatten eigene Scoped-Styles, die von der gemeinsamen CSS abwichen (kein Dark Mode: Text blieb dunkel auf dunkler Fläche;
  Primärbutton eine Stufe dunkler). Die Blöcke sind gelöscht; ein Test sorgt dafür, dass keine neue Svelte-Komponente einen
  `<style>`-Block bekommt. `TextInput` verwendet jetzt die `dss-*`-Klassen und die Struktur der React-Fassung und hat neue
  Props `density` (touch · default · compact), `id` und `name`; das Label ist mit dem Feld verknüpft (`for`), `required` und
  `aria-invalid`/`aria-describedby` werden gesetzt.
- **Alle Schriftgrößen** in `css/components.css` und `svelte/` laufen über `--fs-*` (108 Angaben). Abweichungen zur Skala wurden
  gerundet: 10 und 10,5 → 11; 12,5 → 13; 13,5 → 14; 14,5 und 16 → 15; 17 und 19 → 18; 26 → 28; 48 → 44.
- `css/components.css`, alle Svelte-Komponenten und Stories nutzen die Rollen-Tokens statt `ink-*`, `amber-*`, `sky-*`.
  Aktive Tab-/Nav-Unterstriche laufen über `--indicator` (DBB: `orange-600` auf hell, `orange-500` auf dunkel). BBV sieht unverändert aus (visueller Vergleich aller Stories:
  keine Abweichungen).
- Das alte "DBB-Compat-Preset" (Schwarz/Weiß/Gold/Hellblau per Hue-Werte) entfällt.

## [0.9.0] — BottomNav, Breadcrumbs, Skeleton, MatchCard, PlayerCard, PlayByPlay

Die letzten sechs Svelte-Komponenten gibt es jetzt auch als React-Version; alle Svelte-Komponenten haben
Svelte-, Vanilla-CSS- und React-Fassung (die Paritätsliste `PENDING_REACT` ist entfallen). Das Scoped-CSS liegt in
`css/components.css`, die Svelte-Dateien nutzen nur noch `dss-*`-Klassen.

### Neu
- **React:** `BottomNav` (Buttons oder Links, FAB, Badge, kontrolliert/unkontrolliert), `Breadcrumbs`
  (plain · tagged · chip, `aria-current="page"`), `Skeleton` (line · block · circle · row · match, Status-Text für
  Screenreader), `MatchCard` (Link, Button oder div), `PlayerCard` (compact · standard · hero), `PlayByPlay`
  (`role="log"`, per Tastatur scrollbar, Mannschaft und Spielstand für Screenreader).
- **CourtLines** (Svelte, Vanilla-CSS, React): Spielfeldlinien (FIBA 28 × 15 m) als dezenter Seitenhintergrund, aus dem
  Vereinsregister übernommen. SVG-Maske über `--dss-line` (dark-sicher), Hochformat-Variante auf dem Handy, SVGs
  unter `css/courtlines/`. Seiteninhalt braucht `position: relative; z-index: 1`.
- `TopBar` und `AppNav`: Prop `contained` begrenzt den Inhalt auf `--dss-shell-max` (Standard `64rem`), die Leiste
  bleibt voll breit.
- AppNav: offenes Dropdown schließt, wenn der Fokus auf ein Ziel außerhalb der Navigation wechselt (React, Svelte,
  Vanilla; bei `relatedTarget` null bleibt es offen, wegen Safari); Panel-IDs werden auch bei Sonderzeichen in der
  Gruppen-ID gültig gebildet.

### Geändert
- `.dss-tn` und `.dss-pos` gehören jetzt Table UND PlayerCard gemeinsam (eine Definition in `components.css`):
  `.dss-tn` hat `flex-shrink: 0` und die Größen `large`/`hero`; `.dss-pos` hat `min-width` + Padding statt fester
  Breite, `.dss-pos.sf` ist Amber (Table-Farbe; PlayerCard zeigte vorher Grün).
- `.dss-pos` hat `box-sizing: border-box` und `min-width: 22px` mit Padding (statt fester Breite); die PlayerCard
  behält über einen Override die etwas größere Marke (26 px, 10,5 px Schrift).
- MatchCard/PlayerCard-Zeile (div/a) haben `box-sizing: border-box`.
- Svelte `BottomNav`: eigene Klassen `dss-bnav-*` für Innenelemente, Einträge mit `href` werden Links, neue Prop
  `ariaLabel`, Badge nutzt `--err-button` (AAA mit weißem Text).
- Svelte `Breadcrumbs`: `aria-current="page"` am letzten Element, Einträge ohne `href` sind Text (statt Link `#`),
  Innenklassen `dss-crumbs-*`.
- Svelte `Skeleton`: Platzhalter `aria-hidden`, ein Status-Text (`label`) meldet das Laden.
- Svelte `MatchCard`/`PlayerCard` (compact): Link, Button oder div statt immer Button; innen nur `span`.
- Svelte `PlayByPlay`: Feed ist `role="log"` und fokussierbar, Innenklassen `dss-pbp-*` vollständig präfixiert,
  `PbpEvent` wird aus dem `module`-Skript exportiert.
- `Table`: `columns` hat Vorrang vor `head` (kein doppeltes `<thead>`).
- BottomNav: Der FAB ändert die Auswahl nicht mehr, er meldet sich über das neue `onAction` (React) bzw. `onaction` (Svelte).
- PlayByPlay: Spielstand wird für Screenreader als „Spielstand 87 zu 64“ vorgelesen; PlayerCard (compact): Positionsmarke `aria-hidden`.

### Hinweise
- React `PlayerCard`: Props heißen `heightCm` und `playerRole` (Svelte: `height_cm`, `role`).
- Svelte-Komponenten haben weiterhin keine Unit-Tests; abgesichert sind sie durch den Screenshot-Vergleich
  (`npm run visual:before|after|compare`).
- Skeleton: Mehrere Skeletons auf einer Seite erzeugen mehrere Status-Texte; bei Bedarf `label=""` übergeben (lässt den Status-Text weg) und den Container mit `aria-busy` kennzeichnen.

## [0.8.0] — Table, TopBar, EmptyState, Stepper, AppNav, Checkbox

Sechs weitere Komponenten in allen drei Varianten (Svelte, Vanilla-CSS, React). Das Scoped-CSS von
Table, TopBar, EmptyState und Stepper liegt jetzt in `css/components.css`; die Svelte-Dateien nutzen nur
noch `dss-*`-Klassen. Bereits vom Vereinsregister genutzte Klassen (`.dss-tbl`, `.dss-frame`,
`.dss-topbar`, `.dss-empty`) wurden nur ergänzt, nicht verändert.

### Neu
- **AppNav** (`svelte/AppNav.svelte`, `react/AppNav.tsx`, `js/appnav.js`): Hauptnavigation mit
  Gruppen-Dropdowns (Disclosure), gesperrten Einträgen (nicht fokussierbar, mit Hinweis), `aria-current`,
  Esc/Klick-außerhalb, Hamburger-Menü unter 720 px, Tonalität hell/dunkel, Kontext-Slot, `renderLink` für
  Router-Links (React). Export `@bbv/dss-design-system/appnav.js`.
- **Checkbox** (`dss-check*`): natives Kontrollkästchen, ganze Label-Fläche klickbar (44 px, kompakt 36 px),
  Hinweistext per `aria-describedby`.
- **Table** (React): Rahmenkopf mit Titel/Meta/Live, Dichten, Sortier-Pfeil mit `aria-sort`, Footer,
  dunkle Fläche, `caption` für Screenreader.
- **TopBar** (React): dunkle App-Leiste (`dss-topbar--dark`), Kontexte default/live/admin, Slots, optional
  als `header`-Landmark.
- **EmptyState** (React): Tonalitäten neutral/action/error, CTA oder freie `actions`, Überschriftenebene
  wählbar.
- **Stepper** (React): horizontal/kompakt/vertikal, `aria-current="step"`, Zustand per Screenreader-Text.
- Storybook: Stories für EmptyState, Checkbox, AppNav; `npm run visual:before|after|compare` für den
  Screenshot-Vergleich der Svelte-Stories.
- Hinweis: Table-Frame, -Kopf, -Footer und Striping nutzen jetzt die `--dss-*`-Aliase (leichte
  Farbnuance gegenüber den Roh-Tokens, dafür dark-sicher).

### Hinweise
- Svelte `AppNav` hat `context` (Snippet), aber kein `renderLink`-Pendant (Svelte-Nutzer verwenden normale Links).
- React `Checkbox`: `className` geht an das `input`, nicht an den Wrapper.
- `Table`: sortierbare Spaltenköpfe sind nur gestaltet und per `aria-sort` ausgezeichnet; die Sortier-Interaktion liefert die Anwendung.

### Geändert
- Svelte `EmptyState`: CTA nutzt `dss-btn`, Titel standardmäßig `h3` (vorher `h4`, per `titleAs`),
  neue Props `titleAs` und `actions`.
- Svelte `Stepper`: der Schritt-Punkt ist nur noch ein Button, wenn `onstep` gesetzt ist und der Schritt
  nicht `pending` ist; Zustand wird per Screenreader-Text angesagt, neue Prop `ariaLabel`.
- Svelte `Stepper`: die grüne Verbindungslinie hinter dem aktuellen Schritt entfällt (war ein Fehler der
  alten Selektorregel `.state-done + .step .line`).
- Svelte `Table`/`TopBar`: Innen-Klassen heißen jetzt `dss-frame-*` bzw. `dss-topbar-*`.

## [0.7.0] — React-Paket + Vanilla-CSS

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
- **React-Paket** (`@bbv/dss-design-system/react`): `Button`, `TextInput`, `Select` (nativ), `Modal` (Radix Dialog),
  `Banner`, `Card`, `Tabs`, `Icon`. Rendert nur `dss-*`-Klassen aus `css/components.css`
  (`@bbv/dss-design-system/components.css`). `react`, `react-dom` und `@radix-ui/react-dialog` sind optionale
  `peerDependencies`; das Paket baut sich per `prepare` (tsup) selbst, auch als Git-Dependency.
- `Modal`: Prop `dismissOnBackdrop` (Standard `true`) für Dialoge, die nicht per Klick außerhalb schließen sollen.
- Gemeinsamer Icon-Sprite (`icons/sprite.ts`) für Svelte und React.
- Paritäts-Test (`parity.manifest.json`, `tests/parity.test.ts`): neue Komponenten brauchen Svelte + CSS + React.
- Tests: Vitest + Testing Library + axe-core für alle React-Komponenten.

### Geprüft
- Im Vereinsregister läuft ein axe-core-Test (WCAG 2.2 AA als Gate, AAA-Kontrast 7:1 und 44-px-Ziele
  als Ratchet): alle Seiten bestehen in Light und Dark ohne offene AAA-Verstöße.

### Bekannt / Follow-up
- `Tabs` (React) lässt im Multi-Modus alle Buttons per Tab erreichbar; `svelte/Tabs.svelte` setzt dort noch
  `tabindex="-1"` auf inaktive Einträge.
- Die Svelte-Komponenten Button, TextInput, Modal, Card und Tabs enthalten weiterhin eigene Scoped-Styles, die
  `css/components.css` doppeln.
- `css/`, `icons/` und `dist/` sind jetzt in `files` des Pakets (zuvor fehlte `css/`).
- `Card` (React) fängt Enter/Space nicht mehr von interaktiven Kindern ab; `svelte/Card.svelte` setzt bei
  klickbarem `div` zwar `role="button"` und `tabindex="0"`, hat aber keinen Tastatur-Handler.

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
