# Changelog

Alle nennenswerten Änderungen an diesem Design System werden hier dokumentiert.
Versionierung folgt [Semantic Versioning](https://semver.org/).

## [Unveröffentlicht] — Marken-Rollen und DBB-Marke

### Geändert
- **Storybook-Seitenleiste: eine Gruppe `Components/Spielplan`** mit der Docs-Seite und den Untergruppen `Tabelle` (vorher `ScheduleTable`), `Zeitraster` (vorher `ScheduleGrid`) und `Spielwiese` (vorher `Spielplan Spielwiese`). Die Story-IDs ändern sich (`components-spielplan-tabelle--…`, `…-zeitraster--…`, `…-spielwiese--…`); Verweise in Handy-Vorschauen, Einführung und `scripts/visual-compare.mjs` sind angepasst.
- **Spielplan-Seite:** `Components/Spielplan` zeigt die Tabellen jetzt mit den echten DSS-Abständen (die Doku-CSS überschrieb zuvor Padding und Kopfhöhe von `dss-tbl--schedule` und `dss-sgrid`); die Seite ist dadurch etwa 300 px kürzer.
- **Table: Scrollbereich ist eine benannte, fokussierbare Region** (`role="region"`, `tabindex="0"`, Name aus `caption`, sonst `title`, sonst „Tabelle“), mit gestricheltem Fokus-Ring innen (`.dss-table-scroll:focus-visible`, auch für ScheduleTable und ScheduleGrid; vorher Browser-Standard-Ring). Svelte-Table bekommt `caption` und `titleAs` wie React.
- **Table: Fokus-Ring für Link, Schalter und Eingaben in Zellen** sowie für fokussierbare Zeilen (gestrichelt, Gold/Amber); im Dunkelmodus auf der eigenen Zeile (`is-own`) in Chip-Textfarbe (vorher 2,5 bis 2,8:1).
- **Positionsmarken (`.dss-pos`) und Status-Pillen (`.dss-pill-s`) im Dunkelmodus:** nutzen die Chip-Tokens statt `--ok/err/warn/info-text` mit `-soft` (Dunkelmodus 8,1 bis 14:1, Hellmodus Pixel für Pixel unverändert). Neue Tokens `--dss-chip-info-*` und `--dss-chip-neutral-*`.
- **Table: Plus/Minus-Spalten** über `td.num.plus` und `td.num.minus` (Chip-Farben, auf `dss-frame--dark` helle Töne) statt Inline-Farbe mit `--ok-text`/`--err-text` (2,3 bis 2,5:1 auf dunklen Flächen).
- **Table `striped` mit `is-own`:** die eigene Zeile bleibt auf geraden Zeilen markiert (der Streifen überdeckte sie vorher).
- **Storybook:** Fließtext-Tabellen-Regeln der Doku-Seiten (`blocks.css`) und Überschriften-Farbe überschreiben keine DSS-Tabellen und Rahmentitel in Stories mehr.

- **Klickbare Karte hat einen Fokus-Ring** (gestrichelt, Gold/Amber): `.dss-card` als Link, `button` oder `role="button"` (vorher der Browser-Standard-Ring).
- **Svelte-Card:** ein `div` mit `onclick` löst auch bei Enter und Leertaste aus (wie die React-Fassung; vorher nur per Maus).
- **Spielkarte:** Zusatztext (Spieltag) ohne `opacity` (vorher 3,0:1), Liga in Textfarbe; **Skeleton-Spielkarte** und **Hero-Spielerkarte** laufen auf schmalen Bildschirmen nicht mehr über (Skeleton `min-width: min(320px, 100%)`, Hero in einer Spalte unter 560 px mit kleineren Kennzahlen).
- **EmptyState `action`/`error` im Dunkelmodus:** Fokus-Ring des Buttons in der Chip-Textfarbe (vorher 2,4 bis 2,7:1 auf der getönten Fläche).
- **Svelte-Tabs mit `multi` wie in React:** alle Schalter sind per Tab erreichbar (vorher war nur ein gewählter Schalter erreichbar, ohne Auswahl keiner), die Pfeiltasten tun bei `multi` nichts, und `aria-orientation` steht nicht mehr an der Gruppe.
- **Stepper-Schaltfläche** (mit `onstep`/`onStep`) trägt die sichtbare Nummer im Namen („3. Kampfgericht“, WCAG 2.5.3); vorher las sie nur das Label.
- **AAA-Kontrast (7:1) für Text nachgezogen** (axe `color-contrast-enhanced` auf allen Docs-Seiten): **TopBar „Live“** `oklch(0.80 0.19 27)` (8,9:1 auf Schwarz, 7,5:1 auf Anthrazit `#191919`; vorher `--err-fill` 4,4:1 bzw. 3,7:1, dann 6,2:1 bzw. 5,2:1; der Puls-Punkt bleibt unverändert); **TopBar-Avatar** (BBV) `--cool-700` (7,5:1, vorher `--cool-600` 4,6:1); **Amber-Button im Hover** (DBB) mit schwarzem Text (7,6:1, vorher 6,3:1; neues Token `--dss-cta-fg-hover`, BBV unverändert); **eigene Spielplan-Zeile im Dunkelmodus** mit gedämpftem Text in `--n-300` (9,6:1, vorher 5,5:1; neues Token `--dss-mute-on-selected`, Hellmodus unverändert); **Gast-Trikotmarke** `.dss-tn.gast` mit 10 % Schwarz im Hintergrund (7,5:1, vorher 6,0:1; bleibt rot); Doku: Kapitän-Chip in der Tabellen-Seite (die Story-Klasse `.cap` überschrieb die Chip-Farbe, 5,1:1 → 7:1 und mehr) und Beschriftung auf dunkler Fläche in „Focus & Hover“ (`--n-300`).
- Beispiel-Icon `i-board` (gibt es im Sprite nicht) in Demo und Kommentar durch `i-edit`/`i-calendar` ersetzt.
- **Modal-Fuß** (`.dss-m-footer`) bricht auf schmalen Bildschirmen um, statt Buttons abzuschneiden. Peer-Abhängigkeit `svelte` auf `^5.20.0` (das Svelte-Modal nutzt `$props.id()`).
- **Fokus-Ring jetzt Gold/Amber und gestrichelt, im Dunkelmodus dezenter** (BBV Amber 600 → 700, DBB Gold 600 → 700). Neue Tokens
  `--ring-style` (`dashed`) und `--ring-color-on-dark` (für immer dunkle Flächen wie AppNav dunkel, Frame dunkel, TopBar dunkel).
  Die Eingabegruppe malt den Ring jetzt als Outline statt als `box-shadow`, damit er gestrichelt sein kann.
- **Hilfetext und Pflicht-Sternchen der Eingabefelder im Dunkelmodus lesbar** (vorher 2,3:1 auf Schwarz): `.dss-field-help--err/--ok/--warn` und `.req` nutzen jetzt die Chip-Tokens `--dss-chip-*-fg`, die einen Dunkelmodus haben; im Hellmodus unverändert.
- **Spielplan-Tabelle:** Dichte compact misst jetzt wirklich 40 px (vorher 45 px).
- **Banner-Link: Fokus-Ring ergänzt** (gestrichelt, Gold/Amber); im Dunkelmodus in Textfarbe, weil der dezente Dunkel-Ring auf dem getönten Banner nur 2,2 bis 2,7:1 hatte.
- **Svelte-Modal:** eindeutige Titel-id je Modal (vorher überall `dss-modal-title`, doppelt bei mehreren Modals) und der Titel ist eine `h2` (wie in der React-Fassung, vorher `h4`).

### Neu
- **Dokumentation: alle Komponenten als MDX-Seiten** (neu in diesem Schritt: `Components/Icon` mit Sprite, Größen, Farbe, Barrierefreiheit und Galerie aller 67 Symbole, `Components/CourtLines` mit Einbau, Markenfarben und gemessenem Kontrast, `Foundation/Colors` (neu mit Rollen-Tokens), `Foundation/Typography`, `Foundation/Focus & Hover` und die Einstiegsseite `Introduction` mit Inhaltsverzeichnis); die manuellen `Docs/*`-Seiten und `_SpecPage`/`_CodeSwitch` entfallen, ebenso alle automatischen Doku-Seiten (`autodocs`). Die README beschreibt die Konventionen für neue Komponentenseiten.
- **Tabellen-Doku als MDX-Seiten** `Components/Table` (Dichten mit gemessenen Höhen, Boxscore, dunkle Fläche, Zellbausteine, Zahlen, Sortierung, Streifen, Zustands-Matrix, Props, Dos und Don'ts) und `Components/PlayByPlay` (Eintrag, Ereignisarten, Live-Betrieb nach Code- und Browser-Beleg, Zustände, Dos und Don'ts) mit Code-Beispielen je Fassung; die Seite `Docs/Tables & Live-Scoring` und die automatischen Doku-Seiten entfallen (Gruppe `Docs` ist leer und aus der Sortierung entfernt).
- **Karten-Doku als MDX-Seiten** `Components/Card`, `Components/Card Library` (Spielkarte, Spielerkarte, Ladezustand) und `Components/EmptyState` mit Zustands-Matrizen, Spielwiesen für die Props, Code-Beispielen je Fassung und Dos und Don'ts; die Seite `Docs/Cards & Lists` und die automatischen Doku-Seiten der drei Komponenten entfallen.
- **Navigations-Doku als MDX-Seiten** `Components/Tabs`, `Components/Navigation` (TopBar, BottomNav, Breadcrumbs, Stepper) und `Components/AppNav` mit Zustands-Matrizen, bedienbaren Beispielen, Tastatur-Tabellen (gegen den Code belegt), Mobil-Vorschau der AppNav, Code-Beispielen je Fassung und Dos und Don'ts; die Seite `Docs/Navigation` und die automatischen Doku-Seiten der drei Komponenten entfallen.
- **Overlay-Doku als MDX-Seiten** `Components/Modal` und `Components/Banner` mit Anatomie, Schweregraden, Größen, bedienbarem Beispiel, Zustands-Matrix, Code-Beispielen je Fassung (Fokusverhalten von Svelte und React gegen den Code belegt) und Dos und Don'ts; die automatischen Doku-Seiten dieser beiden Komponenten entfallen.
- **Eingabe-Doku als MDX-Seiten** `Components/TextInput`, `Components/Select` und `Components/Checkbox` mit Zustands-Matrix, Code-Beispielen je Fassung und Dos und Don'ts; die Seite `Docs/Forms` und die automatischen Doku-Seiten dieser drei Komponenten entfallen.
- **Spielplan-Doku als MDX-Seite** `Components/Spielplan` (mit Auto-Docs-Texten von ScheduleTable/ScheduleGrid); die Seite `Docs/Spielplan` entfällt.
- **Storybook: Werkzeugleiste „Zustand“** (Normal, Hover, Fokus, Aktiv) erzwingt den Zustand auf allen bedienbaren Elementen der gezeigten Stories. **Button-Doku als MDX-Seite** (`Components/Button`) mit Zustands-Matrix, Code-Beispielen je Fassung und Dos und Don'ts; die alte Seite `Docs/Button` entfällt.
- **Spielplan:** `ScheduleTable` (Tabelle mit den Layouts `versus`, `opponent`, `columns`) und `ScheduleGrid` (Zeitraster) in
  Vanilla-CSS, Svelte und React, mit gemeinsamem Datenmodell `ScheduleGame` und Hilfsfunktionen in `js/schedule.js`.
  Zustände geplant, live, beendet, abgesagt, verlegt, Freilos; Handy-Karten; Ergebnis für Screenreader als unsichtbarer
  Text, abgesagte und verschobene Spiele mit zusätzlichem Text „abgesagt“/„verschoben“. Erweiterung für bearbeitbare Zeit
  und Konflikt-Hinweis: Svelte über die Snippets `time` und `notice`, React über `renderTime`, `renderNotice`, `renderLink`.
  Stories unter `Components/ScheduleTable` und `Components/ScheduleGrid`.
- **Storybook: Zustände fest sichtbar.** Die Button-Seite (`Components/Button`, Abschnitt *Zustände*) zeigt eine Matrix Variante × Zustand (Default, Hover, Focus,
  Active, Disabled) und den Fokus-Ring auf hellem und dunklem Grund. Neue Story `Foundation/Focus & Hover` mit Button, Link,
  Eingabefeld, Select, Tabs, Karte und Checkbox. Dafür legt `.storybook/pseudo-states.ts` Kopien aller `:hover`-,
  `:focus-visible`-, `:focus-within`- und `:active`-Regeln als Klassen `.pseudo-*` an (nur Storybook, nicht im Paket).
- **Schriften selbst gehostet:** `fonts/fonts.css` (Export `@bbv/dss-design-system/fonts.css`) mit Sora, Manrope, JetBrains Mono,
  Rubik und Barlow Condensed als woff2 (latin, latin-ext, SIL OFL, Lizenztexte in `fonts/licenses/`). Das Storybook lädt sie
  daraus und nichts mehr von Google; ein Test prüft Dateien, Lizenzen und Export.
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
- **AppNav: gesperrter Zustand sichtbar.** Gesperrte Einträge waren kaum von normalen zu unterscheiden (nur ein etwas helleres
  Grau). Jetzt sind sie abgedunkelt (55 %), tragen ein Schloss-Symbol und reagieren nicht auf Hover; im dunklen Ton ebenso.
  Neu: auch eine ganze Gruppe lässt sich sperren (`disabled` und `hint` an der Gruppe, Svelte und React); sie erscheint als
  deaktivierter Button ohne Dropdown. Vanilla: `is-disabled` auf Link oder Gruppen-Button.
- **AppNav-Bugfix:** Die Links im Dropdown-Panel und in der mobilen Navigation waren mit `width: 100%` plus Padding 24 px zu
  breit (ohne `box-sizing: border-box`) und ragten bei Hover und aktivem Zustand über das Panel hinaus. Ein Test sichert das ab.
- **Fokus-Ring** erreicht jetzt 3:1 (vorher 1.7:1 auf Weiß): `--ring-color` ist ein mittlerer Ton (BBV `oklch(0.62 0.15 244)`,
  DBB dunkles Orange), gemessen mindestens 3.3:1 auf Weiß, Grau, Anthrazit und Schwarz in Hell und Dunkel.
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
