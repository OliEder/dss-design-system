# MDX-Doku Welle 1 (Spielplan) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die manuelle Seite `Docs/Spielplan` (`SpielplanDoc.svelte`, 671 Zeilen) wird eine MDX-Seite `Components/Spielplan` mit allen Varianten, 15 Zuständen, Handy-Vorschauen, Datenmodell-Tabellen, Code-Beispielen je Fassung, Barrierefreiheit und 4 Dos und Don'ts. Die Spielwiese bleibt unverändert.

**Architecture:** Alle Demos werden Stories in einer eigenen, in der Seitenleiste versteckten CSF-Datei `stories/Spielplan.examples.stories.ts` (`title: 'Components/Spielplan'`, `tags: ['!dev']` auf Meta-Ebene). `stories/Spielplan.mdx` hängt per `<Meta of>` an dieser Datei und bettet die Stories per `<Canvas of>` ein. Die Svelte-Komponente `SpielplanExamples.svelte` rendert je nach Prop `example` das passende Beispiel (Daten 1:1 aus `SpielplanDoc.svelte`). Die Code-Strings wandern nach `stories/Spielplan.code.ts`. Neuer React-Baustein `DocTable` für die Datentabellen.

**Tech Stack:** Storybook 10.6.1 (`@storybook/svelte-vite`, addon-docs, MDX), React 18 nur für Doku-Bausteine, Svelte 5, Vitest + jsdom.

**Vorarbeit (Welle 0, in `main`):** MDX-Glob und JSX-Transform in `.storybook/main.ts`; Bausteine `stories/docs/blocks/{DosDonts,FrameworkCode}.tsx` und `blocks.css`; Werkzeugleiste „Zustand“; Muster `stories/Button.mdx`, `Button.stories.ts`, `components/ButtonExamples.svelte`, `Button.code.ts`. Lies diese Dateien als Vorlage. Erkenntnisse aus Welle 0, die hier gelten: (1) `tags: ['!dev']` muss als Literal im Objekt stehen, auf Meta-Ebene reicht es für alle Stories der Datei; (2) `remark-gfm` ist nicht installiert, Tabellen in MDX also als React-Baustein oder HTML; (3) Vorschauen mit `position: fixed` brauchen Höhe + Bezugsrahmen (hier nicht relevant); (4) Marken-/Theme-Umschalter funktionieren nur bei Inline-Stories, nicht in iframes; (5) Zahlen in Doku immer gegen das CSS prüfen (in Welle 0 waren Button-Höhen falsch); (6) Tokens folgen dem globalen Theme, nicht festen Karten (keine festen hellen/dunklen Flächen).

**Spec:** `docs/superpowers/specs/2026-10-09-mdx-docs-design.md`, `2026-10-08-spielplan-doku-design.md` (Inhalt der Seite), `2026-10-08-dos-donts-design.md` (Paare 2 bis 5 für den Spielplan; Paar 1 „Zahlen in Spalten“ gehört zu den Tabellen, Welle 6).

**Arbeitsweise:** Texte Deutsch. Commits mit Fuß `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Wegwerf-Skripte und Screenshots nach `$TMPDIR` bzw. `.playwright-mcp/` (untracked). `package-lock.json` nie committen (`git checkout package-lock.json`). Nicht pushen. Fließtext aus `SpielplanDoc.svelte` wird wörtlich übernommen; nur Typografie wie bei Button: Gedankenstriche durch Kommas, Doppelpunkte oder Punkte ersetzen, Abschnittsnummern („01 —“) entfallen.

---

## Dateiübersicht

| Datei | Aktion | Zweck |
|---|---|---|
| `stories/components/SpielplanExamples.svelte` | neu | rendert Beispiel nach `example`-Prop; Daten aus `SpielplanDoc.svelte` |
| `stories/Spielplan.examples.stories.ts` | neu | versteckte CSF-Datei, ~35 Stories |
| `stories/Spielplan.code.ts` | neu | Code-Strings (Tabelle, Gegenüberstellung, Raster, Ein Spiel) |
| `stories/Spielplan.mdx` | neu | die Seite |
| `stories/docs/blocks/DocTable.tsx` | neu | Datentabelle (scrollbar, fokussierbar) |
| `stories/docs/blocks/blocks.css` | ändern | Tabellen, Handy-Vorschau, Hör-Liste, Variantenkarten |
| `tests/doc-blocks.test.tsx` | ändern | Tests für `DocTable` |
| `stories/ScheduleTable.stories.ts`, `stories/ScheduleGrid.stories.ts` | ändern | `autodocs` entfernen, Texte in MDX |
| `.storybook/preview.ts` | ändern | storySort |
| `stories/docs/SpielplanDoc.svelte`, `Spielplan.spec.stories.ts` | löschen | alte Seite |
| `stories/docs/_CodeSwitch.svelte` | löschen, falls unbenutzt | ersetzt durch `FrameworkCode` |

---

### Task 0: Worktree und Basis

- [ ] **Step 1:**

```bash
cd /Users/oliver-marcuseder/01-vibe-coding/00-Basektball/dss-design-system
git status --short   # nur .playwright-mcp/ erlaubt
git worktree add .worktrees/mdx-welle-1 -b feat/mdx-docs-welle-1
cd .worktrees/mdx-welle-1 && npm install --silent
npm test && npm run typecheck
```

Expected: alle Tests grün (720), Typecheck sauber. Sonst melden und anhalten. Alle weiteren Befehle laufen im Worktree.

---

### Task 1: Spike (versteckte Beispiel-Datei + minimale MDX)

Ziel: belegen, dass eine CSF-Datei mit `tags: ['!dev']` auf Meta-Ebene alle Stories aus der Seitenleiste nimmt, aber `<Meta of>` + `<Canvas of>` im MDX funktionieren, und dass `Components/Spielplan` neben `Components/ScheduleTable` nicht kollidiert.

**Files:** Create `stories/components/SpielplanExamples.svelte` (Skelett), `stories/Spielplan.examples.stories.ts` (1 Story), `stories/Spielplan.mdx` (minimal).

- [ ] **Step 1: Skelett `SpielplanExamples.svelte`**

```svelte
<script lang="ts">
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';
  import type { ScheduleGame } from '../../js/schedule.js';

  let { example }: { example: string } = $props();

  const D = 'Sa, 10.10.2026';
  const miniLiga: ScheduleGame[] = [
    { id: 'a1', state: 'scheduled', date: D, time: '15:00', heim: { name: 'Fibalon Baskets Neumarkt', href: '#' }, gast: { name: 'FC Tegernheim', href: '#' }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Halle am Stadtpark' },
  ];
</script>

{#if example === 'mini-liga'}
  <ScheduleTable games={miniLiga} layout="versus" caption="Beispiel Liga" />
{/if}
```

- [ ] **Step 2: Skelett `Spielplan.examples.stories.ts`**

```ts
import SpielplanExamples from './components/SpielplanExamples.svelte';

// Beispiele für die Doku-Seite (Spielplan.mdx). Nicht in der Seitenleiste: tags auf Meta-Ebene gelten für alle Stories.
export default {
  title: 'Components/Spielplan',
  component: SpielplanExamples,
  tags: ['!dev'],
  parameters: { controls: { disable: true }, layout: 'padded' },
};

const example = (name: string) => ({ render: () => ({ Component: SpielplanExamples, props: { example: name } }) });

export const MiniLiga = example('mini-liga');
```

- [ ] **Step 3: Minimale `Spielplan.mdx`**

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as SpielplanStories from './Spielplan.examples.stories';

<Meta of={SpielplanStories} />

# Spielplan

<Canvas of={SpielplanStories.MiniLiga} />
```

- [ ] **Step 4: Bauen, Index prüfen**

```bash
npx storybook build -o "$TMPDIR/sb-w1" --quiet 2>&1 | tail -10
node -e "const i=require(process.env.TMPDIR+'/sb-w1/index.json').entries;for(const [k,v] of Object.entries(i)) if(/components-spielplan|components-scheduletable|components-schedulegrid/.test(k)) console.log(k,v.type,v.importPath,v.tags.join(','))"
```

Expected: `components-spielplan--docs` (type docs, `./stories/Spielplan.mdx`); `components-spielplan--mini-liga` ohne Tag `dev`; die ScheduleTable-/ScheduleGrid-Einträge unverändert (noch mit eigenem Docs-Eintrag, bis Task 7). Kein Fehler wegen doppelter Titel.

- [ ] **Step 5: Browser**

Statisch ausliefern (`python3 -m http.server 6210` in `$TMPDIR/sb-w1`), Playwright-MCP-Tools per ToolSearch laden. `iframe.html?id=components-spielplan--docs&viewMode=docs`: Überschrift, eine gerenderte Tabelle inline, keine Konsolenfehler; in der Seitenleiste (`/`) kein `Mini Liga`, aber der Docs-Eintrag „Spielplan“ unter Components. Server beenden. Bei Abweichung (z.B. Stories doch in der Seitenleiste): `tags: ['!dev']` zusätzlich als Literal an jeder Story ergänzen und im Bericht nennen.

- [ ] **Step 6: Commit**

```bash
git add stories/components/SpielplanExamples.svelte stories/Spielplan.examples.stories.ts stories/Spielplan.mdx
git commit -m "feat(docs): spike Spielplan.mdx with hidden examples file

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Baustein `DocTable` (TDD)

**Files:** Create `stories/docs/blocks/DocTable.tsx`; modify `tests/doc-blocks.test.tsx`, `stories/docs/blocks/blocks.css`.

- [ ] **Step 1: Failing Tests** an `tests/doc-blocks.test.tsx` anhängen (Import `DocTable` oben ergänzen: `import { DocTable } from '../stories/docs/blocks/DocTable';`)

```tsx
describe('DocTable', () => {
  const props = {
    label: 'ScheduleGame',
    head: ['Feld', 'Typ', 'Beschreibung'],
    rows: [
      ['id', 'string', 'Eindeutige Kennung (Pflicht).'],
      ['state', "'scheduled' | 'live'", <>Zustand mit <code>bye</code>.</>],
    ],
  };

  it('rendert eine echte Tabelle mit Kopf, Zeilen und Beschriftung', () => {
    render(<DocTable {...props} />);
    expect(screen.getByRole('table', { name: 'ScheduleGame' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader').map((c) => c.textContent)).toEqual(['Feld', 'Typ', 'Beschreibung']);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('bye').tagName).toBe('CODE');
  });

  it('der Scrollbereich ist per Tastatur erreichbar und benannt', () => {
    render(<DocTable {...props} />);
    const region = screen.getByRole('region', { name: 'ScheduleGame, seitlich scrollbar' });
    expect(region).toHaveAttribute('tabindex', '0');
  });

  it('erste Spalte ist Zeilenkopf', () => {
    render(<DocTable {...props} />);
    expect(screen.getAllByRole('rowheader').map((c) => c.textContent)).toEqual(['id', 'state']);
  });
});
```

Run: `npx vitest run tests/doc-blocks.test.tsx` — Expected: FAIL (Modul fehlt).

- [ ] **Step 2: `DocTable.tsx`**

```tsx
import type { ReactNode } from 'react';

/** Datentabelle für die Doku (Felder, Props). Der Scrollbereich ist fokussierbar. Nur Storybook-Doku. */
export function DocTable({ label, head, rows }: { label: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="dss-doc-table-wrap" tabIndex={0} role="region" aria-label={`${label}, seitlich scrollbar`}>
      <table className="dss-doc-table" aria-label={label}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i}>
              {cells.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="dss-doc-k">{c}</th>
                ) : (
                  <td key={j} className={j === 1 ? 'dss-doc-v' : undefined}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 3: CSS** an `blocks.css` anhängen (Tokens vorher per `grep -n "<name>:" tokens/tokens.css` prüfen, Ersatz aus Welle 0 übernehmen)

```css
.dss-doc-table-wrap { overflow-x: auto; margin: 0 0 24px; }
.dss-doc-table { width: 100%; min-width: 560px; border-collapse: collapse; font-size: var(--fs-body-sm); }
.dss-doc-table th, .dss-doc-table td { text-align: left; vertical-align: top; padding: 10px 12px; border-bottom: 1px solid var(--page-line); background: transparent; color: var(--page-fg); }
.dss-doc-table thead th { font-family: var(--font-mono); font-size: var(--fs-caption); text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-mute); }
.dss-doc-k { font-family: var(--font-mono); font-weight: 600; white-space: nowrap; }
.dss-doc-v { font-family: var(--font-mono); font-size: 12.5px; }

/* Handy-Vorschauen (eingebettete Seiten mit fester Breite) */
.dss-phones { display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-start; margin: 16px 0 24px; }
.dss-phone { max-width: 100%; min-width: 0; }
.dss-phone-scroll { max-width: 100%; overflow-x: auto; padding-bottom: 4px; }
.dss-phone iframe { display: block; width: 390px; height: 560px; max-width: none; border: 1px solid var(--page-line); border-radius: 18px; background: var(--n-0); }

/* Variantenkarten (Abschnitt Auswahl) und Hör-Liste (Barrierefreiheit) */
.dss-var-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
.dss-var-card { min-width: 0; }
.dss-hear { margin: 0 0 24px; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 24px; }
.dss-hear li { font-size: var(--fs-body-sm); line-height: 1.5; border-left: 3px solid var(--page-line); padding-left: 12px; }
@media (max-width: 760px) { .dss-hear { grid-template-columns: minmax(0, 1fr); } }
```

- [ ] **Step 4: Tests grün, Typecheck, Mutation**

Run: `npx vitest run tests/doc-blocks.test.tsx && npm run typecheck`. Expected: PASS. Mutation: `tabIndex={0}` entfernen, der Tastatur-Test muss rot werden; zurücknehmen.

- [ ] **Step 5: Commit**

```bash
git add stories/docs/blocks tests/doc-blocks.test.tsx
git commit -m "feat(docs): DocTable block for field and props tables

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Alle Beispiele als Stories

**Files:** Replace `stories/components/SpielplanExamples.svelte`, replace `stories/Spielplan.examples.stories.ts`.

Quelle der Daten: `stories/docs/SpielplanDoc.svelte`, `<script>`-Block: die `const`-Daten `D`, `miniLiga`, `miniMannschaft`, `miniTurnier`, `miniRaster`, `miniHallen`, `mannschaft`, `liga`, `turnier`, `raster`, `hallen`, `hallen5`, `raster5`, `ft`, `opp`, die Liste `states` samt Typ `StateEx` (ohne die Textfelder `text`, sie wandern in die MDX in Task 5) und `inputStyle`. Übernimm sie **wörtlich** (nicht neu tippen: Datei öffnen, Blöcke kopieren).

- [ ] **Step 1: `SpielplanExamples.svelte`**

Aufbau (Imports `ScheduleTable`, `ScheduleGrid`, Typ `ScheduleGame`; Prop `example: string`; Daten wie oben; dann ein `{#if}`-Zweig je Beispielname). Beispielnamen und Inhalt:

| `example` | Inhalt (wie in `SpielplanDoc.svelte`) |
|---|---|
| `mini-liga` | `<ScheduleTable games={miniLiga} layout="versus" caption="Beispiel Liga" />` |
| `mini-mannschaft` | `games={miniMannschaft} layout="opponent" caption="Beispiel Mannschaft"` |
| `mini-turnier` | `games={miniTurnier} layout="columns" caption="Beispiel Turnier-Liste"` |
| `mini-raster` | `<ScheduleGrid games={miniRaster} columns={miniHallen} caption="Beispiel Tagesplan" />` |
| `layout-opponent` | aus Abschnitt „02 — Tabelle“ das erste Beispiel (Mannschaftsplan), Attribute wörtlich übernehmen |
| `layout-versus` | zweites Beispiel (Liga und Halle) |
| `layout-columns` | drittes Beispiel (Turnier), inkl. der Snippets `time`/`notice`, falls dort vorhanden |
| `raster-3` | Abschnitt „03 — Zeitraster“, erstes Beispiel (drei Hallen, Pause, Freilos, leere Zelle) |
| `raster-5` | Gegenbeispiel mit fünf Spalten (`raster5`, `hallen5`) |
| `zustand-<key>` | je Eintrag der Liste `states` (`key` = `scheduled`, `live`, `finished`, `provisional`, `cancelled`, `postponed`, `bye`, `own`, `placeholder`, `win`, `loss`, `draw`, `forfeit`, `notice`, `time`): `ScheduleTable` mit `games={s.games}`, `layout`, `caption={s.label}` und den Snippets `notice`/`time` bei `extra`; Logik aus dem `{#each states}`-Block von „04 — Zustände“ übernehmen. Umsetzung: ein `{#each states as s}{#if example === 'zustand-' + s.key}…{/if}{/each}` |
| `dichte-touch`, `dichte-default`, `dichte-compact` | Abschnitt „05“: `ScheduleTable games={turnier.slice(0, 2)} layout="columns" density={…} caption="Dichte …"` |
| `do-dichte`, `dont-dichte` | siehe Task 6 |
| `do-absage`, `dont-absage` | siehe Task 6 |
| `do-hallen`, `dont-hallen` | siehe Task 6 |
| `do-eigene`, `dont-eigene` | siehe Task 6 |

In diesem Task nur die Beispiele bis `dichte-*` umsetzen; die `do-*`/`dont-*`-Zweige kommen in Task 6. Das `<style>` am Ende nur, wenn ein Beispiel es braucht (Svelte-Stories dürfen `<style>` haben, Pakete nicht: `stories/` liegt außerhalb von `parity.manifest.json`). Die Snippets `time`/`notice` für die Zustände `notice` und `time` aus der alten Seite wörtlich übernehmen (Warn-Chip „Sperrzeit“, Eingabefeld mit `aria-label="Anwurfzeit Spiel #9"` und `inputStyle`).

- [ ] **Step 2: `Spielplan.examples.stories.ts`**

Kopf wie im Spike (ersetzt dessen Inhalt), dann ein Export je Beispiel:

```ts
export const MiniLiga = example('mini-liga');
export const MiniMannschaft = example('mini-mannschaft');
export const MiniTurnier = example('mini-turnier');
export const MiniRaster = example('mini-raster');

export const LayoutOpponent = example('layout-opponent');
export const LayoutVersus = example('layout-versus');
export const LayoutColumns = example('layout-columns');

export const Raster3 = example('raster-3');
export const Raster5 = example('raster-5');

export const ZustandScheduled = example('zustand-scheduled');
export const ZustandLive = example('zustand-live');
export const ZustandFinished = example('zustand-finished');
export const ZustandProvisional = example('zustand-provisional');
export const ZustandCancelled = example('zustand-cancelled');
export const ZustandPostponed = example('zustand-postponed');
export const ZustandBye = example('zustand-bye');
export const ZustandOwn = example('zustand-own');
export const ZustandPlaceholder = example('zustand-placeholder');
export const ZustandWin = example('zustand-win');
export const ZustandLoss = example('zustand-loss');
export const ZustandDraw = example('zustand-draw');
export const ZustandForfeit = example('zustand-forfeit');
export const ZustandNotice = example('zustand-notice');
export const ZustandTime = example('zustand-time');

export const DichteTouch = example('dichte-touch');
export const DichteDefault = example('dichte-default');
export const DichteCompact = example('dichte-compact');
```

- [ ] **Step 3: Prüfen**

Dev-Server `npx storybook dev -p 6211 --ci --no-open` (Hintergrund, am Ende beenden). Jede der 28 Stories als `iframe.html?id=components-spielplan--<kebab-name>&viewMode=story` laden (IDs aus `index.json` bzw. Dev-`/index.json`); Skript in `$TMPDIR` darf alle in einem Lauf durchgehen. Erwartet je Story: rendert (mindestens eine `table`), keine Konsolenfehler, keine Svelte-Warnungen. Vergleiche stichprobenartig mit der alten Seite (`docs-spielplan--spec`, im Worktree noch vorhanden): drei Layouts, Raster 3/5, vier Zustände (live, abgesagt, Freilos, Konflikt-Hinweis) sehen gleich aus. Zustand `notice` zeigt Spalte „Hinweis“ mit Chip „Sperrzeit“; `time` zeigt das Eingabefeld.

- [ ] **Step 4: Commit**

```bash
git add stories/components/SpielplanExamples.svelte stories/Spielplan.examples.stories.ts
git commit -m "feat(docs): Spielplan demos as stories

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Code-Beispiele

**Files:** Create `stories/Spielplan.code.ts`.

- [ ] **Step 1:** Aus `SpielplanDoc.svelte` die Code-Strings übernehmen, **wörtlich**: `imports`, `tableVanilla`, `tableSvelte`, `tableReact`, `versusVanilla`, `versusSvelte`, `versusReact`, `gridVanilla`, `gridSvelte`, `gridReact`, `codeGame`. Als `export const …` in die neue Datei, mit `imports` als nicht exportierter Konstante. Eine Änderung: in der `.svelte`-Quelle steht `<\/script>` (Escape wegen des Svelte-Parsers); in der `.ts`-Datei wird daraus `</script>`. Danach prüfen, dass die Literalteile der Strings identisch zu den alten sind (Skript im Scratchpad, nicht im Repo; vergleiche den Text zwischen den Backticks jeder Konstante nach `replaceAll('<\\/script>', '</script>')` der alten Datei; Ausgabe je Name „identisch“ oder „ABWEICHUNG“). Bei Strings der Form `imports + \`…\`` zählt der Literalteil.

Expected: alle `identisch`.

- [ ] **Step 2: Commit**

```bash
git add stories/Spielplan.code.ts
git commit -m "feat(docs): Spielplan code samples

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: `Spielplan.mdx` (Text, Abschnitte, Tabellen, Code)

**Files:** Replace `stories/Spielplan.mdx`.

Struktur (Reihenfolge und Überschriften; Fließtext je Abschnitt wörtlich aus dem Kopf des jeweiligen Abschnitts in `SpielplanDoc.svelte`, siehe Spalte „Quelle“):

| Überschrift | Quelle in `SpielplanDoc.svelte` | Inhalt |
|---|---|---|
| `# Spielplan` + Einleitung | `<SpecPage intro=…>` | Einleitungssatz |
| `## Wann welche Variante` | Abschnitt 01 | Text; dann `<div className="dss-var-grid">` mit 4 `<div className="dss-var-card">`: je Beschriftung (`<h3>`), Satz mit `<code>layout="…"</code>`/`<b>ScheduleGrid</b>` (wörtlich aus den `.use`-Absätzen) und `<Canvas of={…MiniLiga} />` usw. |
| `## Tabelle: drei Layouts, eine Zeile pro Spiel` | Abschnitt 02 | Text; je Layout `###` mit Dichte-Hinweis aus der Beschriftung („Touch 60 px“ usw.) + `<Canvas of>` (`LayoutOpponent`, `LayoutVersus`, `LayoutColumns`); dahinter die Aufzählung/Hinweise, die im Abschnitt stehen |
| `## Zeitraster: parallele Spiele nebeneinander` | Abschnitt 03 | Text; `<Canvas of={Raster3} />`; Gegenbeispiel `<Canvas of={Raster5} />` mit seinem Hinweis |
| `## Zustände: jeder Zustand einzeln` | Abschnitt 04 | Einleitungstext; dann je Zustand `### <label>` + Text aus `states[i].text` (wörtlich) + `<Canvas of={Zustand…} />`, in der Reihenfolge der Liste |
| `## Dichte und Handy` | Abschnitt 05 | Text; drei `###` (Touch · 60 px, Standard · 48 px, Kompakt · 40 px) mit `<Canvas of={Dichte…} />`; dann die Handy-Vorschau als JSX: Absatz („Unter 640 px Breite…“ wörtlich), darunter `<div className="dss-phones">` mit drei `<div className="dss-phone">`, je `<h3>` (die Beschriftung `p.cap`), `<div className="dss-phone-scroll" tabIndex={0} role="region" aria-label="Scrollbereich: …">` und `<iframe title="…" src="iframe.html?viewMode=story&globals=brand:bbv&id=…" loading="lazy" />`. IDs: bisherige `previews`-Liste (`components-scheduletable--mannschaft`, `components-scheduletable--turnier`, `components-schedulegrid--zeitraster`); diese Stories bleiben in den Dateien `ScheduleTable.stories.ts`/`ScheduleGrid.stories.ts` bestehen |
| `## Daten und Snippets` | Abschnitt 06 | Einleitungstext; `<DocTable label="ScheduleGame" …>`, `<DocTable label="ScheduleTeam" …>`, `<DocTable label="Props, ScheduleTable und ScheduleGrid" …>` mit **allen** Zeilen aus den drei alten Tabellen (Spalten: Feld/Typ/Beschreibung bzw. Prop/Für/Beschreibung); Zelltexte mit `<code>` als JSX; dann vier `<FrameworkCode>`: „ScheduleTable, Mannschaftssicht“ (`tableVanilla`, `tableSvelte`, `tableReact`), „ScheduleTable, Gegenüberstellung“ (`versus…`), „ScheduleGrid, Zeitraster“ (`grid…`), „Ein Spiel (Mannschaftssicht), für alle Fassungen gleich“ (`codeGame` in allen drei Props) |
| `## Barrierefreiheit: was Screenreader hören` | Abschnitt 07 | Text; `<ul className="dss-hear">` mit allen sechs `<li>` (mit `<q>`); dann `<DocTable label="Barrierefreiheit" head={['Thema','Umsetzung']} rows={…}>` mit allen fünf Zeilen |
| `## Dos und Don'ts` | Task 6 | |
| `## Spielwiese` | neu, 1 Satz | „Alle Werte lassen sich in der [Spielwiese](?path=/story/components-spielplan-spielwiese--tabelle) einstellen.“ (Link-ID im Dev-Server prüfen und anpassen) |

Imports oben: `Meta, Canvas` (und `Story` ab Task 6) aus `@storybook/addon-docs/blocks`, `* as SpielplanStories`, `DosDonts`, `FrameworkCode`, `DocTable`, `./docs/blocks/blocks.css`, die Code-Strings aus `./Spielplan.code`.

- [ ] **Step 1: Schreiben.** Die Typografie-Regel (Gedankenstriche) und die Wörtlichkeit beachten. `<code>`-Elemente in Fließtext als Backticks, in JSX-Tabellenzellen als `<code>`. Geschweifte Klammern in Text (`{ name, href? }`) in MDX/JSX als `{'{ name, href? }'}` schreiben (wie in der alten Seite).

- [ ] **Step 2: Bauen und im Browser prüfen**

```bash
npx storybook build -o "$TMPDIR/sb-w1" --quiet 2>&1 | tail -10
```

Statisch ausliefern (Port 6212), `iframe.html?id=components-spielplan--docs&viewMode=docs`. Erwartet: alle 9 Abschnitte, 28 `.docs-story`-Canvas (zählen), 3 Handy-iframes mit Titel, 4 DocTable (3 Daten, 1 Barrierefreiheit), 4 `FrameworkCode`-Blöcke, `scrollWidth` der Seite gleich Viewportbreite bei 1280 und 420 px, keine Konsolenfehler. Marken-/Theme-Wechsel (`globals=brand:dbb;theme:Dark`) wirkt auf die Beispiele. Der Umschalter „Fassung“ wirkt auf die Code-Blöcke. In den iframes lädt je die Handy-Story (Karten statt Tabellen bei 390 px).

- [ ] **Step 3: Commit**

```bash
git add stories/Spielplan.mdx
git commit -m "feat(docs): Spielplan page as MDX

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Dos und Don'ts (4 Paare)

**Files:** Modify `stories/components/SpielplanExamples.svelte`, `stories/Spielplan.examples.stories.ts`, `stories/Spielplan.mdx`.

- [ ] **Step 1: Beispiele** (in `SpielplanExamples.svelte`, Daten ggf. vorhandene wiederverwenden)

| `example` | Inhalt |
|---|---|
| `do-dichte` | `ScheduleTable` `layout="columns"`, `density="touch"`, `games={turnier.slice(0, 2)}`, `caption="Touch-Dichte"` |
| `dont-dichte` | dasselbe mit `density="compact"`, `caption="Kompakte Dichte"` |
| `do-absage` | ein abgesagtes Spiel mit `note: 'Abgesagt: Halle gesperrt'` (`ft('d1', { state: 'cancelled', note: … })`), `caption="Abgesagt mit Grund"` |
| `dont-absage` | dasselbe ohne `note`, `caption="Abgesagt ohne Grund"` |
| `do-hallen` | `ScheduleGrid` mit den Daten des Zeitrasters mit drei Hallen (`raster`, `hallen`, `caption="Drei Hallen"`) |
| `dont-hallen` | `ScheduleGrid games={raster5} columns={hallen5} caption="Fünf Hallen"` |
| `do-eigene` | zwei Spiele, eines mit `own: true` an `heim` (`ft('e1', { heim: { name: 'Fibalon Baskets Neumarkt', own: true } })`), `layout="versus"`, `caption="Eigene Mannschaft dezent"` |
| `dont-eigene` | dasselbe, in einem Wrapper `<div class="shout">` mit `<style>`: `.shout :global(.dss-tbl tbody tr:not(.dss-sch-group)) { background: var(--signal-400); }` (nachgestellt, weil die Komponente das nicht kann; Kommentar im Code) |

- [ ] **Step 2: Stories** ans Dateiende von `Spielplan.examples.stories.ts`:

```ts
export const DoDichte = example('do-dichte');
export const DontDichte = example('dont-dichte');
export const DoAbsage = example('do-absage');
export const DontAbsage = example('dont-absage');
export const DoHallen = example('do-hallen');
export const DontHallen = example('dont-hallen');
export const DoEigene = example('do-eigene');
export const DontEigene = example('dont-eigene');
```

- [ ] **Step 3: MDX-Abschnitt** `## Dos und Don'ts` mit `<DosDonts pairs={[…]} />` und `<Story of={SpielplanStories.Do…} inline />` wie in `Button.mdx` (Import `Story` ergänzen). Texte:

1. `title: 'Dichte nach Gerät'`, `doText: 'Touch (60 px) für das iPad am Kampfgericht-Tisch.'`, `dontText: 'Kompakt (40 px) ist für Bedienung mit dem Finger zu eng.'`
2. `title: 'Abgesagt und verlegt nicht nur über Farbe'`, `doText: 'Durchgestrichen und mit Grund: „Abgesagt: Halle gesperrt“.'`, `dontText: 'Nur grau und durchgestrichen: niemand erfährt, warum.'`
3. `title: 'Höchstens drei Hallen im Zeitraster'`, `doText: 'Drei Spalten bleiben lesbar.'`, `dontText: 'Fünf Spalten werden gequetscht und scrollen seitlich.'`
4. `title: 'Eigene Mannschaft dezent hervorheben'`, `doText: 'Balken links und leichter Hintergrund (own).'`, `dontText: 'Eine ganze Zeile in der Signalfarbe erschlägt den Inhalt.'`

Die Zahlen „60 px“ und „40 px“ vor dem Schreiben gegen das CSS prüfen (`.dss-tbl--schedule` Zeilenhöhen für touch und compact; `grep -n "touch\|compact" css/components.css` und die Schedule-Blöcke lesen); bei Abweichung die Doku an das CSS anpassen und im Bericht nennen.

- [ ] **Step 4: Prüfen:** Build + Index (`do-*`/`dont-*` ohne Tag `dev`: durch Meta-Tag ohnehin versteckt); Docs-Seite: 4 Paare, je zwei Beispiele inline, Don't-Stages `inert`; `dont-eigene` zeigt die laute Zeile sichtbar; axe-Lauf (siehe Task 8) ohne neue Verstöße.

- [ ] **Step 5: Commit**

```bash
git add stories/components/SpielplanExamples.svelte stories/Spielplan.examples.stories.ts stories/Spielplan.mdx
git commit -m "feat(docs): Spielplan Dos and Don'ts

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Auto-Docs und alte Seite entfernen

**Files:** Modify `stories/ScheduleTable.stories.ts`, `stories/ScheduleGrid.stories.ts`, `.storybook/preview.ts`; delete `stories/docs/SpielplanDoc.svelte`, `stories/docs/Spielplan.spec.stories.ts`, ggf. `stories/docs/_CodeSwitch.svelte`.

- [ ] **Step 1: Verweise suchen**

Run (zsh, Globs vermeiden): `grep -rn "docs-spielplan\|Docs/Spielplan\|SpielplanDoc\|Spielplan.spec\|_CodeSwitch" . --exclude-dir=node_modules --exclude-dir=storybook-static --exclude-dir=dist --exclude-dir=.worktrees --exclude-dir=docs | head -20`
Treffer in `TablesDoc.svelte` (Verweis auf die Spielplan-Seite) auf den neuen Link `?path=/docs/components-spielplan--docs` umstellen; Treffer in `README.md`/`CHANGELOG.md` ebenso (CHANGELOG-Altbeschreibungen nur dann ändern, wenn sie auf `Docs/Spielplan` als bestehende Seite verweisen).

- [ ] **Step 2:** In `ScheduleTable.stories.ts` und `ScheduleGrid.stories.ts` die Zeile `tags: ['autodocs'],` und den `parameters.docs.description`-Block entfernen (Inhalt steht jetzt in der MDX; prüfe, dass jede der dort genannten Aussagen in `Spielplan.mdx` vorkommt, insbesondere „höchstens drei Spalten“, `column` muss zu einer Spalten-`id` passen, `breaks`, Freilos, Handy-Karten unter 640 px; fehlende Aussagen in die MDX ergänzen). `layout: 'fullscreen'` und `argTypes` bleiben.

- [ ] **Step 3: `preview.ts`:** `'Docs', ['Forms', 'Cards & Lists', 'Navigation', 'Tables & Live-Scoring', 'Spielplan']` wird `… 'Tables & Live-Scoring']`; in `Components` die Liste um `'Spielplan'` vor `'ScheduleTable'` ergänzen.

- [ ] **Step 4: Löschen**

```bash
git rm stories/docs/SpielplanDoc.svelte stories/docs/Spielplan.spec.stories.ts
# _CodeSwitch.svelte nur löschen, wenn der grep aus Step 1 keinen weiteren Nutzer zeigt:
git rm stories/docs/_CodeSwitch.svelte
```

Falls `_CodeSwitch.svelte` noch von anderen Seiten genutzt wird (zum Beispiel `TablesDoc`, `FormsDoc`), behalten und im Bericht nennen.

- [ ] **Step 5: Build, Tests, Typecheck**

Run: `npm test && npm run typecheck && npx storybook build -o "$TMPDIR/sb-w1" --quiet`. Index: kein `docs-spielplan--spec`, genau ein `components-spielplan--docs`, `components-scheduletable--docs`/`components-schedulegrid--docs` verschwunden (kein `autodocs` mehr), Stories `components-scheduletable--mannschaft` usw. bleiben, Spielwiese (`components-spielplan-spielwiese--tabelle`) bleibt.

- [ ] **Step 6: CHANGELOG** unter `[Unveröffentlicht]` → Neu eine Zeile ergänzen: Spielplan-Doku als MDX-Seite `Components/Spielplan`; die Seite `Docs/Spielplan` entfällt.

- [ ] **Step 7: Commit**

```bash
git add -A . && git reset -q package-lock.json
git commit -m "chore(docs): remove old Docs/Spielplan page and auto-docs of schedule stories

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Gesamtprüfung (unabhängiger Reviewer)

- [ ] **Step 1:** Frischer Reviewer-Subagent (Aufgabentext analog zu Welle 0 Task 9), ändert nichts, prüft:
1. `npm test`, `npm run typecheck`, `storybook build`; Index (ein Docs-Eintrag `components-spielplan--docs`; kein `docs-spielplan--spec`; keine `components-spielplan--*`-Story in der Seitenleiste `index.html`; alle anderen Docs-Seiten noch da).
2. Browser auf `components-spielplan--docs`: BBV/DBB × Hell/Dunkel × 420 px: kein seitliches Scrollen der Seite; Screenshots ansehen. 28 + 8 Canvas, 3 Handy-iframes laden mit Karten, 4 `DocTable`, `FrameworkCode`-Umschalter, Marke/Theme-Wirkung, „Zustand“-Schalter wirkt auf Beispiele (Befund notieren, auch wo er nicht greift).
3. axe-core auf der Docs-Seite (Hell und Dunkel): eigene Verstöße (nicht `.sbdocs*`) auflisten.
4. Inhaltsvergleich alt/neu: `git show main:stories/docs/SpielplanDoc.svelte` gegen `Spielplan.mdx`, `Spielplan.code.ts`, `SpielplanExamples.svelte`: Übernommen/Geändert/Entfallen/Fehlt; besonders alle 15 Zustandstexte, alle Zeilen der drei Datentabellen, alle 6 Hör-Einträge, alle 5 Barrierefreiheits-Zeilen, Code-Strings identisch, die beschriebenen Zahlen (60/48/40 px) gegen das CSS.
5. Regressionen: `components-scheduletable--mannschaft` (Canvas), Spielwiese `components-spielplan-spielwiese--tabelle`, `docs-tables…--spec`, Button-Seite.
6. Code-Review der Diff-Dateien; `git status` sauber, `package-lock.json` unverändert.

- [ ] **Step 2:** Befunde „muss behoben werden“ beheben (kleine Fixes selbst, größere per Subagent), danach `superpowers:finishing-a-development-branch` (Merge nach Freigabe des Auftraggebers; nicht pushen).

---

## Selbstprüfung gegen die Spec

- Alle Abschnitte der alten Seite (01 bis 07) → Task 5; 15 Zustände einzeln mit Text → Tasks 3 und 5; Handy-Vorschau als iframe → Task 5; Spielwiese unverändert, Verweis → Task 5.
- Dos und Don'ts Spielplan (Paare 2 bis 5) → Task 6; Paar 1 (Zahlen in Spalten) bewusst nach Welle 6.
- Code-Umschalter (`FrameworkCode`) → Tasks 4 und 5; Datentabellen (`DocTable`) → Task 2.
- Auto-Docs von ScheduleTable/ScheduleGrid entfallen, Beschreibungstexte in MDX → Task 7. Alte Seite weg → Task 7.
- Prüfung in Hell/Dunkel/Marken/420 px, axe, Inhaltsvergleich → Task 8.
- Kein Platzhalter; wo Text oder Daten aus der alten Seite übernommen werden, steht Quelle und Regel (wörtlich) fest.
