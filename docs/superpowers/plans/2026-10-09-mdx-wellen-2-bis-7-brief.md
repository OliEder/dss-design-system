# MDX-Doku Wellen 2 bis 7: gemeinsame Arbeitsanleitung

Gilt für jede Welle, die ein „Wellen-Agent“ vom Anfang bis zum Bericht allein umsetzt. Vorbilder in `main`: Welle 0 (`stories/Button.mdx`, `Button.stories.ts`, `components/ButtonExamples.svelte`, `Button.code.ts`, `docs/blocks/*`, `.storybook/state-switch.ts`) und Welle 1 (`stories/Spielplan.mdx`, `Spielplan.examples.stories.ts`, `components/SpielplanExamples.svelte`, `Spielplan.code.ts`, `DocTable`). Spec: `docs/superpowers/specs/2026-10-09-mdx-docs-design.md`. Plan Welle 0/1: `docs/superpowers/plans/2026-10-09-mdx-docs-welle-0.md`, `…welle-1-spielplan.md`. **Lies Button.mdx, Button.stories.ts, ButtonExamples.svelte und Spielplan.mdx als Vorlage, bevor du anfängst.**

## Ziel pro Komponente
Eine MDX-Seite je Komponente (oder je Komponentengruppe, wo die alte Doku eine gemeinsame Seite hatte), die die automatische Doku-Seite (`tags: ['autodocs']`) und die alte manuelle Seite (`stories/docs/*Doc.svelte`) ersetzt. Nichts aus der alten Doku darf ungewollt verloren gehen (Texte, Beispiele, Tabellen, Code-Beispiele, `parameters.docs.description`-Texte).

## Seitenvorlage (Reihenfolge)
1. Titel + Einleitung (aus alter Seite/Description, wörtlich; Typografie: Gedankenstriche durch Kommas/Doppelpunkte/Punkte, Abschnittsnummern entfallen).
2. Abschnitte der alten Seite als `##`-Überschriften mit `<Canvas of={…} />`; alle Demos sind Stories (MDX kann nur Stories einbetten, keine Svelte-Komponenten).
3. **Zustände** (Pflicht für jede Komponente mit bedienbaren Elementen): Story `Zustaende` mit Standard, Hover (`pseudo-hover`), Fokus (`pseudo-focus-visible`), Aktiv (`pseudo-hover pseudo-active`), Gesperrt; bei Eingabefeldern zusätzlich Fehler/OK/Warnung. Die Matrix steht in einem Wrapper mit `data-fixed-states`, folgt dem Seiten-Theme (keine festen hellen/dunklen Karten, Tokens folgen dem globalen Theme), Fokus über `pseudo-focus-visible` (bei Gruppen wie der Eingabefeld-Gruppe auch `pseudo-focus-within` am Elternelement, siehe `.dss-input-group:focus-within`). Fehlt einer Komponente eine `:focus-visible`-Regel, wird sie im CSS ergänzt (Ring: `outline: var(--ring-w) var(--ring-style) var(--ring-color); outline-offset: 2px`), mit Test.
4. Verwendung: Props-Tabelle über `<Controls of={…} />` (argTypes mit `description`, `table.defaultValue`, `table.type.summary` für Unions, interne Demo-Props mit `table: { disable: true }`) oder `DocTable`; Code-Beispiele über `<FrameworkCode>` (Vanilla, Svelte, React; Codestrings in `<Name>.code.ts`, wörtlich aus der alten Seite, sonst gegen die echten Komponenten prüfen).
5. **Dos und Don'ts** über `<DosDonts>` mit versteckten Stories, 3 bis 5 Paare je Seite. Jede Aussage gegen das echte CSS/Verhalten prüfen (kein erfundener Wert; in Welle 0 waren Button-Höhen in der Doku falsch). Falsche Beispiele sind `inert` (der Baustein macht das). Wo die Komponente ein falsches Beispiel nicht darstellen kann, mit lokalem CSS nachstellen und im Code kommentieren.

## Technische Regeln (aus Welle 0 und 1)
- Demo-Stories in eigener CSF-Datei oder in der Komponenten-Stories-Datei; Beispiel-Stories, die nur der Doku dienen, sind in der Seitenleiste versteckt: `tags: ['!dev']` **als Literal** am Story-Objekt oder auf Meta-Ebene einer eigenen Datei (der Indexer liest Tags nicht aus Funktionsrückgaben). Prüfen per `index.json` (Story-Einträge ohne Tag `dev`).
- `<Meta of={…Stories} />` hängt die MDX an die CSF-Datei; dann `tags: ['autodocs']` dort entfernen (sonst doppelte Docs-Seite) und `parameters.docs.description` in die MDX übernehmen.
- Tabellen in MDX: `remark-gfm` ist nicht installiert, also `DocTable` (React-Baustein) oder HTML-`<table>`; keine neuen Abhängigkeiten.
- Marken-/Theme-Umschalter wirken nur bei Inline-Stories (nicht in iframes). `position: fixed`-Vorschauen (Modal-artig) bekommen `parameters.docs.story.height` plus CSS `.docs-story:has(…) { transform: translateZ(0); overflow: hidden; }` (siehe `.storybook/storybook.css`, Modal-Fix).
- Werkzeugleiste „Zustand“ (`.storybook/state-switch.ts`) erzwingt Hover/Fokus/Aktiv auf Stories; Overlays, die per Portal an `body` hängen, werden nicht erfasst (Modal rendert inline und ist erfasst).
- Zahlen/Maße in der Doku immer gegen `css/components.css` und `tokens/tokens.css` prüfen und Tokens benennen. Button `sm` ist 44 px (bewusste Entscheidung, WCAG 2.5.5).
- Fokus-Ring ist Gold/Amber, gestrichelt, 3 px (`--ring-style`, `--ring-color`, `--ring-color-on-dark`); Texte, die den Ring beschreiben, entsprechend.
- Texte Deutsch. Svelte-Dateien unter `stories/` dürfen `<style>` haben (nur `svelte/*.svelte` im Paket nicht; `parity.manifest.json`/`tests/parity.test.ts` unberührt lassen). Kein Kommentar-Rauschen; Code-Kommentare deutsch, knapp.
- Svelte-Stories brauchen `render: () => ({ Component: X, props: {…} })` für Beispiel-Stories (so in Button/Spielplan).
- `package-lock.json` nie committen (`git checkout package-lock.json`). Wegwerf-Skripte/Screenshots nach `$TMPDIR` bzw. `.playwright-mcp/` (untracked, nicht committen). `sed -i` auf macOS nur mit `''`. Der Sicherheits-Hook des Editors meldet Fehlalarme bei bestimmten Schreibweisen (Zuweisung von HTML-Strings an Elemente, Ausführen von Shell-Befehlen aus Node); in Tests und Skripten stattdessen `createContextualFragment` bzw. `String.match` nutzen.

## Ablauf pro Welle
1. Worktree: `git worktree add .worktrees/mdx-welle-N -b feat/mdx-docs-welle-N` (von `main`), `npm install --silent`, Baseline `npm test && npm run typecheck`.
2. Inventur: Stories-Dateien, alte Doku-Seiten, Svelte-/React-Komponenten und die CSS-Blöcke der Komponenten lesen. Notiere, was die alte Doku enthält (Abschnitte, Texte, Tabellen, Code), damit nichts verloren geht.
3. Kurzer Plan als Datei `docs/superpowers/plans/2026-10-09-mdx-docs-welle-N-<name>.md` (Dateiübersicht, Seiten, Story-Liste, Dos/Don'ts-Paare mit geprüften Fakten, Tests). Kein Wortlaut-Plan nötig; er dient der Nachvollziehbarkeit. Commit.
4. Umsetzen (TDD, wo Logik/CSS neu ist: z.B. fehlende Fokus-Regeln, neue Bausteine), kleine Commits.
5. Prüfen (Pflicht, ausführen, nicht annehmen): `npm test`, `npm run typecheck`, `npx storybook build -o "$TMPDIR/sb-wN" --quiet`; `index.json`: je Seite genau ein `components-<x>--docs`, alte `docs-*--spec` weg, Beispiel-Stories ohne `dev`; Browser (Playwright, statischer Build per `python3 -m http.server`) je Seite in BBV/DBB × Hell/Dunkel (`globals=brand:dbb;theme:Dark`, Wert `Dark` mit Großbuchstabe) und bei 420 px: kein seitliches Scrollen der Seite, Konsole fehlerfrei, Screenshots **ansehen**; axe-core (`node_modules/axe-core/axe.min.js`) auf jeder Seite, eigene Verstöße (nicht `.sbdocs*`) beheben (Kontrast der Doku-Bausteine im Dunkelmodus beachten); Werkzeugleiste „Zustand“ und „Fassung“ wirken; Regression: eine Auto-Docs-Seite und eine andere MDX-Seite rendern unverändert.
6. Inhaltsvergleich alt/neu schriftlich im Bericht (Übernommen/Geändert/Entfallen/Fehlt).
7. Unabhängiger Review erfolgt durch einen separaten Agenten nach deinem Bericht (du wirst ggf. mit Befunden weiterbeauftragt).
8. Gemergt und gepusht wird vom koordinierenden Agenten nach grünem Review: Merge nach `main` (`--no-ff`), Tests, `git push origin main`, Worktree und Branch entfernen. Du mergst und pushst nicht, außer du wirst ausdrücklich beauftragt.

## Bericht
Status; Liste der Seiten/Stories/Dateien; Prüfergebnisse je Punkt aus Schritt 5 (kurz, mit Zahlen); Inhaltsvergleich; CSS-/Komponentenänderungen mit Begründung (insbesondere ergänzte Fokus-Regeln); offene Punkte; Commit-SHAs.
