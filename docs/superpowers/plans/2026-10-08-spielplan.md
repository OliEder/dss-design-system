# Spielplan-Tabelle (ScheduleTable und ScheduleGrid) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das DSS bekommt zwei Spielplan-Bausteine, `ScheduleTable` (Tabelle) und `ScheduleGrid` (Zeitraster), als Vanilla-CSS, Svelte und React mit einem gemeinsamen Datenmodell.

**Architecture:** Gemeinsame reine Logik in `js/schedule.js` (mit Typen in `js/schedule.d.ts`, beides im veröffentlichten Paket), die Svelte und React importieren. Das Aussehen liegt ausschließlich in `css/components.css` (Klassen `dss-sch-*`, `dss-sg-*`, Modifier `dss-tbl--schedule`, `dss-sgrid`); die Komponenten erzeugen nur Markup. Wiederverwendet werden `dss-frame`, `dss-tbl`, `dss-chip`, `dss-link`, `dss-match-live`.

**Tech Stack:** Svelte 5, React 18 mit Vitest und Testing Library (jsdom), axe-core, Storybook 10, CSS Custom Properties aus `tokens/tokens.css`.

**Spezifikation:** `docs/superpowers/specs/2026-10-08-spielplan-design.md`

## Abweichungen von der Spezifikation (werden in Task 10 in die Spezifikation übernommen)

1. **Zeilenhöhen** sind in `components.css` Touch 60, Default 48, Compact 40 px (nicht 44 und 36).
2. **Ergebnis für Screenreader:** nicht `aria-label` auf einem `span` (axe: unzulässig), sondern ein unsichtbares `dss-sr-only`-Element neben dem sichtbaren `aria-hidden`-Ergebnis. Gleicher Text.
3. **`ScheduleGrid` nutzt nur die Gegenüberstellung** (`heim` und `gast`), nicht die Perspektive (`opponent`).
4. **Spiele mit unbekannter `column`** erscheinen im Raster nicht. Die Doku sagt, dass `column` zu einer Spalten-`id` passen muss.

## Stand der Umsetzung (Abweichungen während der Ausführung)

- `hasScore(game, layout?)` ist layout-fähig (Review-Ergebnis zu Task 4): Die Perspektive (`ownScore`, `opponent.score`) zählt nur bei `layout === 'opponent'`
  und vorhandenem `opponent`, sonst heim/gast. Maßgeblich ist der Code in `js/schedule.js`; die Snippets in Task 1 zeigen noch die erste Fassung.
  Die Tabelle ruft `hasScore(game, mode)`, das Raster `hasScore(game, 'versus')`.
- Die CSS-Fassung von Task 3 wurde nach dem Review erweitert (explizite `grid-template-areas` je Layout, Hervorhebung auf Zeilenebene, abgedunkeltes Datum
  in abgesagten Zeilen); maßgeblich ist `css/components.css`.
- Entscheidung: Die Spielplan-Komponenten unterstützen keinen dunklen Rahmen (`dss-frame--dark`); der seitenweite Dark Mode wirkt über die `--dss-*`-Variablen.

## Dateistruktur

| Datei | Aufgabe |
|---|---|
| `js/schedule.js` | reine Funktionen: `outcome`, `resolveOutcome`, `winnerSide`, `hasScore`, `layoutFor`, `densityFor`, `columnsFor`, `startMinutes`, `slotsFromGames`, `groupBySection`, `initials`, `ariaForResult`, `buildGrid` |
| `js/schedule.d.ts` | alle Typen (`ScheduleGame` und so weiter) und die Signaturen der Funktionen |
| `tests/schedule.test.ts` | Unit-Tests für `js/schedule.js` |
| `react/schedule-types.ts` | Re-Export der Typen aus `js/schedule.d.ts` |
| `react/ScheduleParts.tsx` | interne React-Teile (`TeamName`, `ResultText`, `LiveTag`), nicht aus `index.ts` exportiert |
| `react/ScheduleTable.tsx`, `react/ScheduleTable.test.tsx` | Variante A |
| `react/ScheduleGrid.tsx`, `react/ScheduleGrid.test.tsx` | Variante B |
| `svelte/ScheduleTable.svelte`, `svelte/ScheduleGrid.svelte` | gleiche Markup-Struktur, kein `<style>` |
| `css/components.css` | Klassen für A und B |
| `tests/components-css.test.ts` | Pflichtklassen und Verhalten im CSS |
| `parity.manifest.json`, `package.json`, `react/index.ts` | Manifest, Exporte |
| `stories/components/ScheduleDemo.svelte`, `stories/ScheduleTable.stories.ts`, `stories/ScheduleGrid.stories.ts` | Demos und Stories |
| `stories/docs/TablesDoc.svelte` | Abschnitt „Spielpläne“ |
| `scripts/visual-compare.mjs`, `README.md`, `CHANGELOG.md` | Vergleich, Doku |

## Gemeinsames Markup (Referenz für alle Tasks)

Variante A (`ScheduleTable`):

```html
<div class="dss-frame">
  <div class="dss-frame-head">…</div>            <!-- nur bei title/meta -->
  <div class="dss-table-scroll">
    <table class="dss-tbl dss-tbl--schedule dss-tbl--{density} dss-sch--{layout}" role="table">
      <thead class="dss-sr-only|(leer bei columns)" role="rowgroup"><tr role="row"><th scope="col" role="columnheader">…</th></tr></thead>
      <tbody role="rowgroup">
        <tr class="dss-sch-group" role="row"><th colspan="N" scope="colgroup">Spieltag 5</th></tr>
        <tr class="dss-sch-row is-own is-live" role="row"><td class="dss-sch-when" role="cell">…</td>…</tr>
      </tbody>
    </table>
  </div>
</div>
```

Zellen je Spalten-`key` (aus `columnsFor`): `nr`, `when`, `ha`, `match`, `heim`, `gast`, `field`, `venue`, `res`, `notice`. Zustände als Klassen an `tr`: `is-own`, `is-live`, `is-cancelled`, `is-postponed`, `is-bye`.

Variante B (`ScheduleGrid`): `table.dss-tbl.dss-sgrid.dss-tbl--{density}`, Kopf `th.dss-sg-time` plus je Spalte `th`; Zeilen `tr` mit `th.dss-sg-time[scope=row]` und `td.dss-sg-cell[data-label]`; Pause `tr.dss-sg-break`, Freilos `tr.dss-sg-bye`.

---

### Task 1: Gemeinsame Logik `js/schedule.js`

**Files:**
- Create: `js/schedule.js`
- Create: `js/schedule.d.ts`
- Create: `tests/schedule.test.ts`
- Modify: `package.json` (Export `./schedule.js`)

- [ ] **Step 1: Failing test schreiben**

Create `tests/schedule.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  ariaForResult,
  buildGrid,
  columnsFor,
  densityFor,
  groupBySection,
  hasScore,
  initials,
  layoutFor,
  outcome,
  resolveOutcome,
  slotsFromGames,
  startMinutes,
  winnerSide,
} from '../js/schedule.js';
import type { ScheduleGame } from '../js/schedule.js';

const versus = (over: Partial<ScheduleGame> = {}): ScheduleGame => ({
  id: 'g1',
  state: 'finished',
  heim: { name: 'TSV Tröster', score: 87 },
  gast: { name: 'USC Heidelberg', score: 64 },
  ...over,
});

const persp = (over: Partial<ScheduleGame> = {}): ScheduleGame => ({
  id: 'p1',
  state: 'finished',
  at: 'heim',
  opponent: { name: 'TSV Jahn Freising', score: 108 },
  ownScore: 65,
  ...over,
});

describe('outcome', () => {
  it('bewertet Sieg, Niederlage und Unentschieden', () => {
    expect(outcome(70, 60)).toBe('S');
    expect(outcome(60, 70)).toBe('N');
    expect(outcome(60, 60)).toBe('U');
  });
  it('liefert undefined, wenn ein Stand fehlt', () => {
    expect(outcome(undefined, 60)).toBeUndefined();
    expect(outcome(60, undefined)).toBeUndefined();
    expect(outcome(NaN, 1)).toBeUndefined();
  });
});

describe('resolveOutcome', () => {
  it('berechnet nur bei beendeten Perspektive-Spielen', () => {
    expect(resolveOutcome(persp())).toBe('N');
    expect(resolveOutcome(persp({ state: 'live' }))).toBeUndefined();
    expect(resolveOutcome(persp({ state: 'scheduled', ownScore: undefined, opponent: { name: 'X' } }))).toBeUndefined();
    expect(resolveOutcome(versus())).toBeUndefined();
  });
  it('lässt einen gesetzten outcome gewinnen (Forfait)', () => {
    expect(resolveOutcome(persp({ ownScore: 0, opponent: { name: 'X', score: 20 }, outcome: 'S' }))).toBe('S');
  });
});

describe('winnerSide', () => {
  it('nennt den Sieger bei beendeten Spielen', () => {
    expect(winnerSide(versus())).toBe('heim');
    expect(winnerSide(versus({ heim: { name: 'A', score: 1 }, gast: { name: 'B', score: 2 } }))).toBe('gast');
  });
  it('liefert null bei Gleichstand, ohne Stand und bei laufenden Spielen', () => {
    expect(winnerSide(versus({ heim: { name: 'A', score: 2 }, gast: { name: 'B', score: 2 } }))).toBeNull();
    expect(winnerSide(versus({ heim: { name: 'A' }, gast: { name: 'B' } }))).toBeNull();
    expect(winnerSide(versus({ state: 'live' }))).toBeNull();
  });
});

describe('hasScore', () => {
  it('prüft beide Stände je nach Art', () => {
    expect(hasScore(versus())).toBe(true);
    expect(hasScore(versus({ heim: { name: 'A', score: 1 }, gast: { name: 'B' } }))).toBe(false);
    expect(hasScore(persp())).toBe(true);
    expect(hasScore(persp({ ownScore: undefined }))).toBe(false);
  });
});

describe('layoutFor und densityFor', () => {
  it('wählt opponent, sobald ein Spiel einen Gegner hat', () => {
    expect(layoutFor([versus()])).toBe('versus');
    expect(layoutFor([versus(), persp()])).toBe('opponent');
  });
  it('wählt touch bei opponent oder Liga-Unterzeile, sonst default', () => {
    expect(densityFor([versus()], 'versus')).toBe('default');
    expect(densityFor([persp()], 'opponent')).toBe('touch');
    expect(densityFor([versus({ league: { name: 'Bayernliga' } })], 'versus')).toBe('touch');
  });
});

describe('columnsFor', () => {
  it('liefert feste Spalten für versus und opponent', () => {
    expect(columnsFor('versus', []).map((c) => c.key)).toEqual(['when', 'match', 'res']);
    expect(columnsFor('opponent', []).map((c) => c.key)).toEqual(['when', 'ha', 'match', 'res']);
  });
  it('blendet bei columns Spalten ohne Daten aus', () => {
    expect(columnsFor('columns', [versus()]).map((c) => c.key)).toEqual(['when', 'heim', 'res', 'gast']);
    const full = [versus({ nr: '#1', field: 'F1', venue: 'Halle A' })];
    expect(columnsFor('columns', full, true).map((c) => c.key)).toEqual([
      'nr', 'when', 'field', 'venue', 'heim', 'res', 'gast', 'notice',
    ]);
  });
});

describe('startMinutes und slotsFromGames', () => {
  it('liest die Startzeit aus Zeiten und Zeitspannen', () => {
    expect(startMinutes('09:30')).toBe(570);
    expect(startMinutes('09:30–09:50')).toBe(570);
    expect(startMinutes('später')).toBe(Infinity);
    expect(startMinutes(undefined)).toBe(Infinity);
  });
  it('leitet eindeutige, sortierte Zeitzeilen ab und ignoriert Freilose', () => {
    const games = [
      versus({ id: 'a', time: '10:00' }),
      versus({ id: 'b', time: '09:00' }),
      versus({ id: 'c', time: '10:00' }),
      versus({ id: 'd', time: '09:30', state: 'bye' }),
    ];
    expect(slotsFromGames(games)).toEqual(['09:00', '10:00']);
  });
});

describe('groupBySection', () => {
  it('beginnt eine Gruppe, sobald sich section ändert', () => {
    const g = groupBySection([
      versus({ id: '1', section: 'Runde 1' }),
      versus({ id: '2', section: 'Runde 1' }),
      versus({ id: '3', section: 'Runde 2' }),
      versus({ id: '4' }),
    ]);
    expect(g.map((x) => [x.section, x.games.map((y) => y.id)])).toEqual([
      ['Runde 1', ['1', '2']],
      ['Runde 2', ['3']],
      [undefined, ['4']],
    ]);
  });
});

describe('initials', () => {
  it('nimmt bis zu drei Anfangsbuchstaben in Großbuchstaben', () => {
    expect(initials('TSV Jahn Freising')).toBe('TJF');
    expect(initials('Nürnberger Basketball Club Bayern')).toBe('NBC');
    expect(initials('Dukes')).toBe('D');
    expect(initials('')).toBe('');
  });
});

describe('ariaForResult', () => {
  it('beschreibt die Gegenüberstellung', () => {
    expect(ariaForResult(versus(), 'versus')).toBe('Heim 87, Gast 64');
  });
  it('beschreibt die Perspektive mit Bewertung', () => {
    expect(ariaForResult(persp(), 'opponent')).toBe('Eigene 65, Gegner 108, Niederlage');
    expect(ariaForResult(persp({ outcome: 'U', ownScore: 80, opponent: { name: 'X', score: 80 } }), 'opponent')).toBe(
      'Eigene 80, Gegner 80, Unentschieden',
    );
  });
  it('ergänzt vorläufig und läuft', () => {
    expect(ariaForResult(persp({ provisional: true }), 'opponent')).toBe('Eigene 65, Gegner 108, Niederlage, vorläufig');
    expect(ariaForResult(versus({ state: 'live' }), 'versus')).toBe('Heim 87, Gast 64, läuft');
  });
});

describe('buildGrid', () => {
  const columns = [
    { id: 'f1', label: 'Feld 1' },
    { id: 'f2', label: 'Feld 2' },
  ];
  const games = [
    versus({ id: 'a', time: '09:30', column: 'f1' }),
    versus({ id: 'b', time: '09:00', column: 'f2' }),
    versus({ id: 'c', time: '09:00', column: 'f1' }),
    versus({ id: 'bye', time: '09:30', state: 'bye', heim: { name: 'BG Zirndorf' }, gast: undefined }),
    versus({ id: 'x', time: '09:00', column: 'unbekannt' }),
  ];

  it('ordnet Spiele nach Zeit und Spalte und lässt Lücken leer', () => {
    const rows = buildGrid({ games, columns });
    const slots = rows.filter((r) => r.kind === 'slot');
    expect(slots.map((r) => r.time)).toEqual(['09:00', '09:30']);
    expect(slots[0].cells.map((c) => c.map((g) => g.id))).toEqual([['c'], ['b']]);
    expect(slots[1].cells.map((c) => c.map((g) => g.id))).toEqual([['a'], []]);
  });

  it('zeigt Spiele mit unbekannter Spalte nicht an', () => {
    const ids = buildGrid({ games, columns })
      .filter((r) => r.kind === 'slot')
      .flatMap((r) => r.cells.flat())
      .map((g) => g.id);
    expect(ids).not.toContain('x');
  });

  it('fügt Pausen und Freilose in Zeitreihenfolge ein', () => {
    const rows = buildGrid({ games, columns, breaks: [{ time: '09:15', label: 'Pause' }] });
    expect(rows.map((r) => `${r.kind}@${r.time}`)).toEqual(['slot@09:00', 'break@09:15', 'slot@09:30', 'bye@09:30']);
  });

  it('nutzt vorgegebene slots, auch ohne Spiele', () => {
    const rows = buildGrid({ games, columns, slots: ['09:00', '10:00'] });
    const slots = rows.filter((r) => r.kind === 'slot');
    expect(slots.map((r) => r.time)).toEqual(['09:00', '10:00']);
    expect(slots[1].cells.map((c) => c.length)).toEqual([0, 0]);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run tests/schedule.test.ts`
Expected: FAIL (`Failed to resolve import "../js/schedule.js"`)

- [ ] **Step 3: Typen schreiben**

Create `js/schedule.d.ts`:

```ts
export type ScheduleState = 'scheduled' | 'live' | 'finished' | 'cancelled' | 'postponed' | 'bye';
export type ScheduleLayout = 'versus' | 'opponent' | 'columns';
export type ScheduleDensity = 'touch' | 'default' | 'compact';
export type ScheduleOutcome = 'S' | 'N' | 'U';

export interface ScheduleTeam {
  name: string;
  /** Teamname als Link. */
  href?: string;
  /** Logo-URL; ohne Logo erscheinen die Initialen. */
  logo?: string;
  score?: number;
  /** Platzhalter wie "Erster Gruppe A": kursiv und gedämpft. */
  placeholder?: boolean;
  /** Eigene Mannschaft (Hervorhebung). */
  own?: boolean;
}

export interface ScheduleGame {
  id: string;
  /** "#3" */
  nr?: string;
  /** Gruppenzeile: "Spieltag 5", "Runde 2 · Gruppe A", "Halbfinale". */
  section?: string;
  /** Fertig formatiert, z. B. "Sa, 26.09.2026". */
  date?: string;
  /** "17:30" oder "09:30–09:50". */
  time?: string;
  /** Halle, freier Text. */
  venue?: string;
  /** Feld in der Halle, freier Text. */
  field?: string;
  /** Nur ScheduleGrid: Kennung der Spalte (passt zu einer `columns[].id`). */
  column?: string;
  state: ScheduleState;

  /** Gegenüberstellung (Liga, Halle, Turnier). */
  heim?: ScheduleTeam;
  gast?: ScheduleTeam;

  /** Perspektive einer Mannschaft; `opponent.score` sind die Punkte des Gegners. */
  opponent?: ScheduleTeam;
  /** `heim` zeigt "vs.", `gast` zeigt "@". */
  at?: 'heim' | 'gast';
  /** Punkte der eigenen Mannschaft. */
  ownScore?: number;
  /** Überschreibt die berechnete Bewertung (z. B. Forfait). */
  outcome?: ScheduleOutcome;

  league?: { name: string; href?: string };
  provisional?: boolean;
  note?: string;
}

export interface ScheduleColumn {
  key: string;
  label: string;
}

export interface ScheduleGridColumn {
  id: string;
  label: string;
}

export interface ScheduleBreak {
  time: string;
  label: string;
}

export interface ScheduleGroup {
  section: string | undefined;
  games: ScheduleGame[];
}

export type ScheduleGridRow =
  | { kind: 'slot'; time: string; cells: ScheduleGame[][] }
  | { kind: 'break'; time: string; label: string }
  | { kind: 'bye'; time: string | undefined; game: ScheduleGame };

export function outcome(own: number | undefined, opp: number | undefined): ScheduleOutcome | undefined;
export function resolveOutcome(game: ScheduleGame): ScheduleOutcome | undefined;
export function winnerSide(game: ScheduleGame): 'heim' | 'gast' | null;
export function hasScore(game: ScheduleGame): boolean;
export function layoutFor(games: ScheduleGame[]): ScheduleLayout;
export function densityFor(games: ScheduleGame[], layout: ScheduleLayout): ScheduleDensity;
export function columnsFor(layout: ScheduleLayout, games: ScheduleGame[], hasNotice?: boolean): ScheduleColumn[];
export function startMinutes(time: string | undefined): number;
export function slotsFromGames(games: ScheduleGame[]): string[];
export function groupBySection(games: ScheduleGame[]): ScheduleGroup[];
export function initials(name: string): string;
export function ariaForResult(game: ScheduleGame, layout: ScheduleLayout): string;
export function buildGrid(input: {
  games: ScheduleGame[];
  columns: ScheduleGridColumn[];
  slots?: string[];
  breaks?: ScheduleBreak[];
}): ScheduleGridRow[];
```

- [ ] **Step 4: Minimale Implementierung schreiben**

Create `js/schedule.js`:

```js
/**
 * DSS Schedule · Hilfsfunktionen für ScheduleTable und ScheduleGrid
 * --------------------------------------------------------------
 * Reine Funktionen ohne DOM. Svelte und React nutzen dieselbe Logik,
 * damit beide Fassungen gleich entscheiden. Typen: js/schedule.d.ts.
 */
const START = /(\d{1,2}):(\d{2})/;
const OUTCOME_TEXT = { S: 'Sieg', N: 'Niederlage', U: 'Unentschieden' };

const isNum = (value) => typeof value === 'number' && Number.isFinite(value);

/** Sieg, Niederlage oder Unentschieden aus Sicht der eigenen Mannschaft. */
export function outcome(own, opp) {
  if (!isNum(own) || !isNum(opp)) return undefined;
  if (own > opp) return 'S';
  if (own < opp) return 'N';
  return 'U';
}

/** Bewertung eines Perspektive-Spiels; nur bei beendeten Spielen, ein gesetzter outcome gewinnt. */
export function resolveOutcome(game) {
  if (!game.opponent || game.state !== 'finished') return undefined;
  return game.outcome ?? outcome(game.ownScore, game.opponent.score);
}

/** Sieger einer beendeten Gegenüberstellung, sonst null. */
export function winnerSide(game) {
  if (game.state !== 'finished' || !isNum(game.heim?.score) || !isNum(game.gast?.score)) return null;
  if (game.heim.score > game.gast.score) return 'heim';
  if (game.gast.score > game.heim.score) return 'gast';
  return null;
}

/** Gibt es einen vollständigen Stand (beide Seiten)? */
export function hasScore(game) {
  if (game.opponent) return isNum(game.ownScore) && isNum(game.opponent.score);
  return isNum(game.heim?.score) && isNum(game.gast?.score);
}

export function layoutFor(games) {
  return games.some((game) => game.opponent) ? 'opponent' : 'versus';
}

export function densityFor(games, layout) {
  return layout === 'opponent' || games.some((game) => game.league) ? 'touch' : 'default';
}

/** Spalten der Tabelle (Variante A) je Layout; bei `columns` nur Spalten, für die Daten vorliegen. */
export function columnsFor(layout, games, hasNotice = false) {
  if (layout === 'versus') {
    return [
      { key: 'when', label: 'Zeit' },
      { key: 'match', label: 'Spiel' },
      { key: 'res', label: 'Ergebnis' },
    ];
  }
  if (layout === 'opponent') {
    return [
      { key: 'when', label: 'Zeit' },
      { key: 'ha', label: 'Heim oder Auswärts' },
      { key: 'match', label: 'Gegner' },
      { key: 'res', label: 'Ergebnis' },
    ];
  }
  const cols = [];
  if (games.some((game) => game.nr)) cols.push({ key: 'nr', label: 'Nr' });
  cols.push({ key: 'when', label: 'Zeit' });
  if (games.some((game) => game.field)) cols.push({ key: 'field', label: 'Feld' });
  if (games.some((game) => game.venue)) cols.push({ key: 'venue', label: 'Halle' });
  cols.push({ key: 'heim', label: 'Heim' }, { key: 'res', label: 'Ergebnis' }, { key: 'gast', label: 'Gast' });
  if (hasNotice) cols.push({ key: 'notice', label: 'Hinweis' });
  return cols;
}

/** Startzeit in Minuten aus "09:30" oder "09:30–09:50"; ohne erkennbare Zeit Infinity. */
export function startMinutes(time) {
  const found = (time ?? '').match(START);
  return found ? Number(found[1]) * 60 + Number(found[2]) : Infinity;
}

const byStart = (a, b) => {
  const sa = startMinutes(a);
  const sb = startMinutes(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
};

/** Eindeutige, nach Startzeit sortierte Zeitzeilen; Freilose zählen nicht. */
export function slotsFromGames(games) {
  const times = [];
  for (const game of games) {
    if (game.state !== 'bye' && game.time && !times.includes(game.time)) times.push(game.time);
  }
  return times.sort(byStart);
}

/** Aufeinanderfolgende Spiele mit gleichem `section` bilden eine Gruppe. */
export function groupBySection(games) {
  const groups = [];
  for (const game of games) {
    const last = groups[groups.length - 1];
    if (last && last.section === game.section) last.games.push(game);
    else groups.push({ section: game.section, games: [game] });
  }
  return groups;
}

/** Bis zu drei Anfangsbuchstaben in Großbuchstaben (Platzhalter für fehlende Logos). */
export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join('');
}

/** Text des Ergebnisses für Screenreader; nur sinnvoll, wenn hasScore(game, layout) gilt. */
export function ariaForResult(game, layout) {
  const parts = [];
  if (layout === 'opponent' && game.opponent) {
    parts.push(`Eigene ${game.ownScore}`, `Gegner ${game.opponent.score}`);
    const result = resolveOutcome(game);
    if (result) parts.push(OUTCOME_TEXT[result]);
  } else {
    parts.push(`Heim ${game.heim?.score}`, `Gast ${game.gast?.score}`);
  }
  if (game.provisional) parts.push('vorläufig');
  if (game.state === 'live') parts.push('läuft');
  return parts.join(', ');
}

/** Zeilen des Zeitrasters: Zeitzeilen mit Zellen je Spalte, Pausen und Freilose in Zeitreihenfolge. */
export function buildGrid({ games, columns, slots, breaks = [] }) {
  const times = slots ?? slotsFromGames(games);
  const rows = [];
  for (const time of times) {
    rows.push({
      kind: 'slot',
      time,
      cells: columns.map((column) =>
        games.filter((game) => game.state !== 'bye' && game.time === time && game.column === column.id),
      ),
    });
  }
  for (const item of breaks) rows.push({ kind: 'break', time: item.time, label: item.label });
  for (const game of games) {
    if (game.state === 'bye') rows.push({ kind: 'bye', time: game.time, game });
  }
  // Array.prototype.sort ist stabil: gleiche Startzeit behält die Reihenfolge Zeitzeile, Pause, Freilos.
  return rows.sort((a, b) => byStart(a.time, b.time));
}
```

- [ ] **Step 5: Export im Paket ergänzen**

In `package.json` in `exports` nach `"./appnav.js": "./js/appnav.js"` ergänzen (mit Komma nach der bisherigen Zeile):

```json
    "./appnav.js": "./js/appnav.js",
    "./schedule.js": { "types": "./js/schedule.d.ts", "import": "./js/schedule.js" }
```

- [ ] **Step 6: Tests laufen lassen**

Run: `npx vitest run tests/schedule.test.ts`
Expected: PASS (alle Tests grün)

Run: `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"`
Expected: keine Ausgabe (gültiges JSON)

- [ ] **Step 7: Commit**

```bash
git add js/schedule.js js/schedule.d.ts tests/schedule.test.ts package.json
git commit -m "feat(schedule): shared pure helpers and types for schedule components

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: React-Typen und interne Teile

**Files:**
- Create: `react/schedule-types.ts`
- Create: `react/ScheduleParts.tsx`

- [ ] **Step 1: Typen re-exportieren**

Create `react/schedule-types.ts`:

```ts
export type {
  ScheduleBreak,
  ScheduleColumn,
  ScheduleDensity,
  ScheduleGame,
  ScheduleGridColumn,
  ScheduleLayout,
  ScheduleOutcome,
  ScheduleState,
  ScheduleTeam,
} from '../js/schedule.js';
```

- [ ] **Step 2: Interne Teile schreiben**

Create `react/ScheduleParts.tsx`:

```tsx
import type { ReactNode } from 'react';
import { cn } from './cn';
import type { ScheduleTeam } from './schedule-types';

export interface ScheduleLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

export type ScheduleRenderLink = (props: ScheduleLinkProps) => ReactNode;

interface TeamNameProps {
  team: ScheduleTeam | undefined;
  loser?: boolean;
  renderLink?: ScheduleRenderLink;
}

/** Teamname: Platzhalter kursiv, mit `href` als Link, Verlierer abgeblendet. */
export function TeamName({ team, loser = false, renderLink }: TeamNameProps) {
  const current = team ?? { name: '?' };
  const label = current.placeholder ? <span className="dss-sch-ph">{current.name}</span> : current.name;
  let node: ReactNode = label;
  if (current.href && !current.placeholder) {
    node = renderLink ? (
      renderLink({ href: current.href, className: 'dss-link', children: label })
    ) : (
      <a className="dss-link" href={current.href}>
        {label}
      </a>
    );
  }
  return <span className={cn('dss-sch-team', loser && 'is-loser')}>{node}</span>;
}

/** Grüner Live-Hinweis (wie MatchCard), steht hinter der Uhrzeit. */
export function LiveTag() {
  return (
    <span className="dss-match-live dss-sch-live">
      <span className="dss-match-pulse" aria-hidden="true" /> Live
    </span>
  );
}

interface ResultTextProps {
  visible: string;
  spoken: string;
  provisional?: boolean;
}

/** Sichtbares Ergebnis (für Screenreader versteckt) plus gesprochener Text. */
export function ResultText({ visible, spoken, provisional = false }: ResultTextProps) {
  return (
    <>
      <span className="dss-sch-score" aria-hidden="true">
        {visible}
      </span>
      <span className="dss-sr-only">{spoken}</span>
      {provisional ? <small aria-hidden="true">vorläufig</small> : null}
    </>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: Exit 0 (keine Fehler)

- [ ] **Step 4: Commit**

```bash
git add react/schedule-types.ts react/ScheduleParts.tsx
git commit -m "feat(schedule): React types and internal parts

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: CSS für Variante A

**Files:**
- Modify: `css/components.css` (am Dateiende anhängen)
- Modify: `tests/components-css.test.ts` (am Dateiende anhängen)

- [ ] **Step 1: Failing CSS-Test schreiben**

Am Ende von `tests/components-css.test.ts` anhängen:

```ts
describe('Spielplan · ScheduleTable (Variante A)', () => {
  const CLASSES = [
    'dss-tbl--schedule', 'dss-sch-group', 'dss-sch-nr', 'dss-sch-when', 'dss-sch-date', 'dss-sch-time', 'dss-sch-live',
    'dss-sch-venue', 'dss-sch-ha', 'dss-sch-match', 'dss-sch-opp', 'dss-sch-logo', 'dss-sch-sub', 'dss-sch-team',
    'dss-sch-ph', 'dss-sch-sep', 'dss-sch-note', 'dss-sch-res', 'dss-sch-score', 'dss-sch-none', 'dss-sch-field',
    'dss-sch-bye', 'dss-sch-notice', 'dss-sch--columns',
  ];
  it.each(CLASSES)('definiert .%s', (name) => {
    expect(hasClass(name)).toBe(true);
  });

  it('Gruppenzeilen heben das Sticky-Verhalten der Kopfzellen auf', () => {
    const rule = css.match(/\.dss-tbl--schedule tr\.dss-sch-group th \{([^}]*)\}/)?.[1] ?? '';
    expect(rule).toContain('position: static');
  });

  it('Handy: Zeilen werden zu Karten', () => {
    expect(css).toMatch(/@media \(max-width: 640px\) \{[^@]*\.dss-tbl--schedule tr\.dss-sch-row[^{]*\{[^}]*display: grid/);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run tests/components-css.test.ts`
Expected: FAIL (`.dss-tbl--schedule` nicht definiert)

- [ ] **Step 3: CSS ergänzen**

Am Ende von `css/components.css` anhängen:

```css

/* ── Spielplan · ScheduleTable (Variante A) ─────────────────── */
.dss-tbl--schedule td { white-space: normal; }
.dss-tbl--schedule tr.dss-sch-group th {
  position: static; text-align: left; height: 32px; padding: 0 14px;
  background: var(--dss-surface-2); color: var(--dss-fg-soft); border-bottom: 1px solid var(--dss-line);
}
.dss-tbl--schedule td.dss-sch-nr { width: 48px; color: var(--dss-mute); font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.dss-tbl--schedule td.dss-sch-when { color: var(--dss-fg); font-family: var(--font-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }
.dss-sch-date { color: var(--dss-fg-soft); }
.dss-sch-date + .dss-sch-time::before { content: " · "; color: var(--dss-mute); }
.dss-sch-live { margin-left: 8px; font-size: var(--fs-caption); font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.dss-sch-venue { display: block; margin-top: 2px; font-size: var(--fs-body-sm); color: var(--dss-mute); }
.dss-tbl--schedule.dss-tbl--touch .dss-sch-date { display: block; color: var(--dss-fg); font-weight: 600; font-size: var(--fs-body-md); }
.dss-tbl--schedule.dss-tbl--touch .dss-sch-date + .dss-sch-time::before { content: none; }
.dss-tbl--schedule.dss-tbl--touch .dss-sch-time { font-size: var(--fs-body-sm); color: var(--dss-fg-soft); }
.dss-tbl--schedule td.dss-sch-ha { width: 64px; padding-right: 0; }
.dss-tbl--schedule td.dss-sch-match { color: var(--dss-fg); }
.dss-sch-sub { display: block; margin-top: 2px; font-size: var(--fs-body-sm); }
.dss-sch-sep { color: var(--dss-mute); }
.dss-sch-team.is-loser, .dss-sch-team.is-loser .dss-link { color: var(--dss-mute); }
.dss-sch-ph { color: var(--dss-mute); font-style: italic; }
.dss-sch-note { display: block; margin-top: 2px; font-size: var(--fs-body-sm); font-weight: 600; color: var(--warn-text); }
.dss-sch-opp { display: flex; align-items: center; gap: 12px; }
.dss-sch-logo {
  flex: none; display: grid; place-items: center; width: 36px; height: 36px; overflow: hidden;
  border: 1px solid var(--dss-line); border-radius: var(--radius-md); background: var(--dss-surface);
  font-family: var(--font-display); font-weight: 800; font-size: var(--fs-caption); color: var(--dss-fg-soft);
}
.dss-sch-logo img { width: 100%; height: 100%; object-fit: contain; }
.dss-tbl--schedule td.dss-sch-res { width: 1%; text-align: right; white-space: nowrap; }
.dss-sch--columns td.dss-sch-res { text-align: center; }
.dss-sch-res .dss-chip { margin-right: 10px; vertical-align: middle; }
.dss-sch-score {
  font-family: var(--font-mono); font-weight: 700; font-size: var(--fs-stat); line-height: 1;
  letter-spacing: -0.02em; font-variant-numeric: tabular-nums; color: var(--dss-fg);
}
.dss-sch-none { font-family: var(--font-mono); color: var(--dss-mute); }
.dss-sch-res small { margin-left: 8px; font-size: var(--fs-body-sm); color: var(--dss-mute); }
.dss-sch-field { max-width: 14ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; vertical-align: middle; }
.dss-tbl--schedule td.dss-sch-notice { width: 1%; white-space: nowrap; }
.dss-tbl--schedule tr.is-own td:first-child { box-shadow: inset 3px 0 0 var(--indicator); }
.dss-tbl--schedule tr.is-cancelled td { color: var(--dss-mute); }
.dss-tbl--schedule tr.is-cancelled .dss-sch-team,
.dss-tbl--schedule tr.is-cancelled .dss-sch-date,
.dss-tbl--schedule tr.is-cancelled .dss-sch-time { text-decoration: line-through; }
.dss-tbl--schedule tr.is-postponed td { color: var(--dss-mute); }
.dss-tbl--schedule tr.is-bye td, .dss-tbl--schedule td.dss-sch-bye { color: var(--dss-mute); font-style: italic; }

/* Handy: jede Zeile wird zur Karte (Tabellensemantik über role-Attribute im Markup) */
@media (max-width: 640px) {
  .dss-tbl--schedule, .dss-tbl--schedule tbody { display: block; }
  .dss-sch--columns thead {
    position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }
  .dss-tbl--schedule tr.dss-sch-group, .dss-tbl--schedule tr.dss-sch-group th { display: block; }
  .dss-tbl--schedule tr.dss-sch-row {
    display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; padding: 12px 14px;
    border-bottom: 1px solid var(--dss-line);
  }
  .dss-tbl--schedule tr.dss-sch-row td { display: block; height: auto; padding: 0; border: 0; width: auto; }
  .dss-tbl--schedule td.dss-sch-nr, .dss-tbl--schedule td.dss-sch-when { grid-column: 1; width: auto; }
  .dss-tbl--schedule td.dss-sch-ha, .dss-tbl--schedule td.dss-sch-field-cell, .dss-tbl--schedule td.dss-sch-venue-cell { grid-column: 2; text-align: right; width: auto; padding: 0; }
  .dss-tbl--schedule td.dss-sch-match, .dss-tbl--schedule td.dss-sch-heim, .dss-tbl--schedule td.dss-sch-gast { grid-column: 1; }
  .dss-tbl--schedule td.dss-sch-res { grid-column: 2; grid-row: 2 / span 2; align-self: center; width: auto; text-align: right; }
  .dss-tbl--schedule td.dss-sch-notice, .dss-tbl--schedule td.dss-sch-bye { grid-column: 1 / -1; width: auto; }
}
```

- [ ] **Step 4: Test laufen lassen**

Run: `npx vitest run tests/components-css.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add css/components.css tests/components-css.test.ts
git commit -m "feat(schedule): CSS for the schedule table (variant A)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: React `ScheduleTable`

**Files:**
- Create: `react/ScheduleTable.tsx`
- Create: `react/ScheduleTable.test.tsx`
- Modify: `react/index.ts`

- [ ] **Step 1: Failing Tests schreiben**

Create `react/ScheduleTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ScheduleTable } from './ScheduleTable';
import type { ScheduleGame } from './schedule-types';
import { expectNoA11yViolations } from './test-utils';

const VERSUS: ScheduleGame[] = [
  {
    id: 'v1', state: 'finished', section: 'Spieltag 5', date: 'Sa, 11.10.2026', time: '18:00',
    heim: { name: 'TSV Tröster', href: '/teams/troester', score: 87, own: true },
    gast: { name: 'USC Heidelberg', score: 64 },
    league: { name: 'Bayernliga Süd', href: '/ligen/by' },
  },
  {
    id: 'v2', state: 'scheduled', section: 'Spieltag 6', date: 'Sa, 18.10.2026', time: '18:00',
    heim: { name: 'TV Lich' }, gast: { name: 'TSV Tröster', own: true },
  },
];

const PERSPECTIVE: ScheduleGame[] = [
  {
    id: 'p1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim',
    opponent: { name: 'TSV Jahn Freising', href: '/teams/freising', score: 108 }, ownScore: 65,
  },
  {
    id: 'p2', state: 'finished', date: 'Sa, 03.10.2026', time: '17:30', at: 'heim', provisional: true,
    opponent: { name: 'Dukes Dingolfing', score: 0 }, ownScore: 20,
  },
  {
    id: 'p3', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast',
    opponent: { name: 'Nürnberger Basketball Club', logo: '/logos/nbc.png' },
  },
];

const TOURNAMENT: ScheduleGame[] = [
  {
    id: 't1', state: 'live', nr: '#3', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F1',
    heim: { name: 'TSV Tröster', score: 18, own: true }, gast: { name: 'TV Lich', score: 20 },
  },
  {
    id: 't2', state: 'cancelled', nr: '#4', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F2',
    heim: { name: 'USC Heidelberg' }, gast: { name: 'SV Aschaffenburg' }, note: 'Rückzug SV Aschaffenburg',
  },
  {
    id: 't3', state: 'bye', nr: '#5', section: 'Runde 2 · Gruppe A', time: '09:30–09:50',
    heim: { name: 'BG Zirndorf' },
  },
  {
    id: 't4', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00–11:20', field: 'F1',
    heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true },
  },
];

describe('ScheduleTable · versus', () => {
  it('zeigt Gruppenzeilen, Teams als Links und die Liga als Unterzeile', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    const groups = container.querySelectorAll('tr.dss-sch-group th');
    expect([...groups].map((g) => g.textContent)).toEqual(['Spieltag 5', 'Spieltag 6']);
    expect(groups[0]).toHaveAttribute('colspan', '3');
    expect(groups[0]).toHaveAttribute('scope', 'colgroup');
    expect(screen.getByRole('link', { name: 'TSV Tröster' })).toHaveAttribute('href', '/teams/troester');
    expect(screen.getByRole('link', { name: 'Bayernliga Süd' })).toHaveAttribute('href', '/ligen/by');
  });

  it('spricht das Ergebnis aus und blendet den Verlierer ab', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    expect(screen.getByText('Heim 87, Gast 64')).toHaveClass('dss-sr-only');
    const teams = container.querySelectorAll('tr.dss-sch-row')[0].querySelectorAll('.dss-sch-team');
    expect(teams[0]).not.toHaveClass('is-loser');
    expect(teams[1]).toHaveClass('is-loser');
  });

  it('zeigt "–" ohne Ergebnis und markiert die eigene Mannschaft', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    const rows = container.querySelectorAll('tr.dss-sch-row');
    expect(rows[0]).toHaveClass('is-own');
    expect(rows[1].querySelector('.dss-sch-none')).toHaveTextContent('–');
  });

  it('wählt touch bei Liga-Unterzeile und default sonst', () => {
    const { container, rerender } = render(<ScheduleTable games={VERSUS} />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--touch');
    rerender(<ScheduleTable games={[VERSUS[1]]} />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--default');
    rerender(<ScheduleTable games={[VERSUS[1]]} density="compact" />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--compact');
  });

  it('versteckt den Tabellenkopf visuell, behält ihn aber für Screenreader', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('dss-sr-only');
    expect([...container.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual(['Zeit', 'Spiel', 'Ergebnis']);
  });

  it('trägt Tabellen-Rollen für die Handy-Ansicht', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    expect(container.querySelector('table')).toHaveAttribute('role', 'table');
    expect(container.querySelector('tbody')).toHaveAttribute('role', 'rowgroup');
    expect(container.querySelector('tr.dss-sch-row')).toHaveAttribute('role', 'row');
    expect(container.querySelector('td')).toHaveAttribute('role', 'cell');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleTable games={VERSUS} title="Bayernliga" caption="Spielplan" />);
    await expectNoA11yViolations(container);
  });
});

describe('ScheduleTable · opponent', () => {
  it('zeigt Chip vs. oder @, Logo oder Initialen und die Bewertung', () => {
    const { container } = render(<ScheduleTable games={PERSPECTIVE} />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--touch');
    const chips = [...container.querySelectorAll('.dss-sch-ha .dss-chip')].map((c) => c.textContent);
    expect(chips).toEqual(['vs.', 'vs.', '@']);
    const logos = container.querySelectorAll('.dss-sch-logo');
    expect(logos[0]).toHaveTextContent('TJF');
    expect(logos[2].querySelector('img')).toHaveAttribute('src', '/logos/nbc.png');
    expect(screen.getByText('Eigene 65, Gegner 108, Niederlage')).toBeInTheDocument();
    expect(container.querySelector('.dss-chip--err')).toHaveTextContent('N');
  });

  it('zeigt vorläufig und Sieg-Chip, bei offenem Spiel nur "–"', () => {
    const { container } = render(<ScheduleTable games={PERSPECTIVE} />);
    expect(screen.getByText('Eigene 20, Gegner 0, Sieg, vorläufig')).toBeInTheDocument();
    expect(container.querySelector('.dss-chip--ok')).toHaveTextContent('S');
    const rows = container.querySelectorAll('tr.dss-sch-row');
    expect(within(rows[2] as HTMLElement).getByText('–')).toBeInTheDocument();
    expect(within(rows[2] as HTMLElement).queryByText(/Eigene/)).toBeNull();
  });

  it('nimmt einen gesetzten outcome statt der Rechnung (Forfait)', () => {
    const forfeit: ScheduleGame = { ...PERSPECTIVE[0], id: 'f', ownScore: 0, opponent: { name: 'X', score: 20 }, outcome: 'S' };
    const { container } = render(<ScheduleTable games={[forfeit]} />);
    expect(container.querySelector('.dss-chip--ok')).toHaveTextContent('S');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleTable games={PERSPECTIVE} caption="Spielplan" />);
    await expectNoA11yViolations(container);
  });
});

describe('ScheduleTable · columns (Turnier)', () => {
  it('zeigt sichtbaren Kopf nur mit Spalten, für die Daten vorliegen', () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" />);
    expect(container.querySelector('thead')).not.toHaveClass('dss-sr-only');
    expect([...container.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual([
      'Nr', 'Zeit', 'Feld', 'Heim', 'Ergebnis', 'Gast',
    ]);
  });

  it('zeigt Live hinter der Uhrzeit, durchgestrichen bei abgesagt und den Grund', () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" />);
    const rows = container.querySelectorAll('tr.dss-sch-row');
    expect(rows[0]).toHaveClass('is-live');
    const when = rows[0].querySelector('.dss-sch-when') as HTMLElement;
    expect(when.querySelector('.dss-sch-time')).toHaveTextContent('09:30–09:50');
    expect(when.querySelector('.dss-match-live')).toHaveTextContent('Live');
    expect(screen.getByText('Heim 18, Gast 20, läuft')).toHaveClass('dss-sr-only');
    expect(rows[1]).toHaveClass('is-cancelled');
    expect(screen.getByText('Rückzug SV Aschaffenburg')).toHaveClass('dss-sch-note');
  });

  it('zeigt Freilos als Zeile über alle Spalten und Platzhalter kursiv', () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" />);
    const bye = container.querySelector('tr.is-bye td') as HTMLElement;
    expect(bye).toHaveAttribute('colspan', '6');
    expect(bye).toHaveTextContent('BG Zirndorf hat Freilos');
    expect(screen.getByText('Erster Gruppe A')).toHaveClass('dss-sch-ph');
  });

  it('rendert Slots für Zeit, Hinweis und Router-Links', () => {
    const games: ScheduleGame[] = [{ ...TOURNAMENT[0], heim: { name: 'TSV Tröster', href: '/t/1' } }];
    const { container } = render(
      <ScheduleTable
        games={games}
        layout="columns"
        renderTime={(g) => <input aria-label={`Start ${g.nr}`} defaultValue={g.time} />}
        renderNotice={() => <span className="dss-chip dss-chip--warn">Sperrzeit</span>}
        renderLink={({ href, className, children }) => (
          <a data-router className={className} href={href}>
            {children}
          </a>
        )}
      />,
    );
    expect(screen.getByLabelText('Start #3')).toHaveValue('09:30–09:50');
    expect(screen.getByText('Sperrzeit')).toBeInTheDocument();
    expect(container.querySelector('a[data-router]')).toHaveAttribute('href', '/t/1');
    expect([...container.querySelectorAll('thead th')].at(-1)).toHaveTextContent('Hinweis');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" caption="Spielplan" />);
    await expectNoA11yViolations(container);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run react/ScheduleTable.test.tsx`
Expected: FAIL (`Failed to resolve import "./ScheduleTable"`)

- [ ] **Step 3: Komponente schreiben**

Create `react/ScheduleTable.tsx`:

```tsx
import { Fragment, type ReactNode } from 'react';
import { cn } from './cn';
import {
  ariaForResult,
  columnsFor,
  densityFor,
  groupBySection,
  hasScore,
  initials,
  layoutFor,
  resolveOutcome,
  winnerSide,
} from '../js/schedule.js';
import { LiveTag, ResultText, TeamName, type ScheduleRenderLink } from './ScheduleParts';
import type { ScheduleDensity, ScheduleGame, ScheduleLayout } from './schedule-types';

export type { ScheduleLinkProps } from './ScheduleParts';

export interface ScheduleTableProps {
  games: ScheduleGame[];
  /** Art der Spiel-Zelle; Standard: `opponent`, sobald ein Spiel `opponent` hat, sonst `versus`. */
  layout?: ScheduleLayout;
  /** Zeilenhöhe; Standard: `touch` bei `opponent` oder Liga-Unterzeile, sonst `default`. */
  density?: ScheduleDensity;
  title?: ReactNode;
  titleAs?: 'h2' | 'h3' | 'h4';
  meta?: ReactNode;
  /** Unsichtbare Tabellenbeschriftung für Screenreader. */
  caption?: string;
  className?: string;
  /** Router-Links für Teamnamen und Liga. */
  renderLink?: ScheduleRenderLink;
  /** Ersetzt die Uhrzeit, z. B. durch eine bearbeitbare Startzeit. */
  renderTime?: (game: ScheduleGame) => ReactNode;
  /** Zusätzliche Zelle am Zeilenende, z. B. Konflikt-Badge. */
  renderNotice?: (game: ScheduleGame) => ReactNode;
}

const OUTCOME_CHIP = { S: 'dss-chip--ok', N: 'dss-chip--err', U: '' } as const;

/** Spielplan als Tabelle: Gegenüberstellung, Perspektive einer Mannschaft oder Turnier-Spalten. */
export function ScheduleTable({
  games,
  layout,
  density,
  title,
  titleAs: Heading = 'h3',
  meta,
  caption,
  className,
  renderLink,
  renderTime,
  renderNotice,
}: ScheduleTableProps) {
  const mode: ScheduleLayout = layout ?? layoutFor(games);
  const dens: ScheduleDensity = density ?? densityFor(games, mode);
  const cols = columnsFor(mode, games, Boolean(renderNotice));
  const groups = groupBySection(games);
  const hasHead = Boolean(title || meta);

  const league = (game: ScheduleGame) =>
    game.league ? (
      <span className="dss-sch-sub">
        {game.league.href ? (
          renderLink ? (
            renderLink({ href: game.league.href, className: 'dss-link', children: game.league.name })
          ) : (
            <a className="dss-link" href={game.league.href}>
              {game.league.name}
            </a>
          )
        ) : (
          game.league.name
        )}
      </span>
    ) : null;

  const note = (game: ScheduleGame) => (game.note ? <span className="dss-sch-note">{game.note}</span> : null);

  const cell = (key: string, game: ScheduleGame): ReactNode => {
    const winner = winnerSide(game);
    switch (key) {
      case 'nr':
        return (
          <td key={key} role="cell" className="dss-sch-nr">
            {game.nr}
          </td>
        );
      case 'when':
        return (
          <td key={key} role="cell" className="dss-sch-when">
            {game.date ? <span className="dss-sch-date">{game.date}</span> : null}
            {renderTime || game.time ? <span className="dss-sch-time">{renderTime ? renderTime(game) : game.time}</span> : null}
            {game.state === 'live' ? <LiveTag /> : null}
            {mode !== 'columns' && game.venue ? <span className="dss-sch-venue">{game.venue}</span> : null}
          </td>
        );
      case 'ha':
        return (
          <td key={key} role="cell" className="dss-sch-ha">
            <span className={cn('dss-chip dss-chip--mono', game.at === 'gast' ? 'dss-chip--amber' : 'dss-chip--sky')}>
              {game.at === 'gast' ? '@' : 'vs.'}
            </span>
          </td>
        );
      case 'match':
        return (
          <td key={key} role="cell" className="dss-sch-match">
            {mode === 'opponent' && game.opponent ? (
              <span className="dss-sch-opp">
                <span className="dss-sch-logo" aria-hidden="true">
                  {game.opponent.logo ? <img src={game.opponent.logo} alt="" /> : initials(game.opponent.name)}
                </span>
                <TeamName team={game.opponent} renderLink={renderLink} />
              </span>
            ) : (
              <>
                <TeamName team={game.heim} loser={winner === 'gast'} renderLink={renderLink} />
                <span className="dss-sch-sep" aria-hidden="true">
                  {' – '}
                </span>
                <span className="dss-sr-only"> gegen </span>
                <TeamName team={game.gast} loser={winner === 'heim'} renderLink={renderLink} />
              </>
            )}
            {league(game)}
            {note(game)}
          </td>
        );
      case 'heim':
        return (
          <td key={key} role="cell" className="dss-sch-heim">
            <TeamName team={game.heim} loser={winner === 'gast'} renderLink={renderLink} />
          </td>
        );
      case 'gast':
        return (
          <td key={key} role="cell" className="dss-sch-gast">
            <TeamName team={game.gast} loser={winner === 'heim'} renderLink={renderLink} />
            {note(game)}
          </td>
        );
      case 'field':
        return (
          <td key={key} role="cell" className="dss-sch-field-cell">
            {game.field ? (
              <span className="dss-chip dss-chip--mono dss-sch-field" title={game.field}>
                {game.field}
              </span>
            ) : null}
          </td>
        );
      case 'venue':
        return (
          <td key={key} role="cell" className="dss-sch-venue-cell">
            {game.venue}
          </td>
        );
      case 'res': {
        const scored = (game.state === 'finished' || game.state === 'live') && hasScore(game, mode);
        if (!scored) {
          return (
            <td key={key} role="cell" className="dss-sch-res">
              <span className="dss-sch-none">–</span>
            </td>
          );
        }
        const result = mode === 'opponent' ? resolveOutcome(game) : undefined;
        const visible =
          mode === 'opponent' && game.opponent
            ? `${game.ownScore} : ${game.opponent.score}`
            : `${game.heim?.score} : ${game.gast?.score}`;
        return (
          <td key={key} role="cell" className="dss-sch-res">
            {result ? (
              <span className={cn('dss-chip dss-chip--mono', OUTCOME_CHIP[result])} aria-hidden="true">
                {result}
              </span>
            ) : null}
            <ResultText visible={visible} spoken={ariaForResult(game, mode)} provisional={game.provisional} />
          </td>
        );
      }
      case 'notice':
        return (
          <td key={key} role="cell" className="dss-sch-notice">
            {renderNotice ? renderNotice(game) : null}
          </td>
        );
      default:
        return null;
    }
  };

  const row = (game: ScheduleGame): ReactNode => {
    const own = game.heim?.own || game.gast?.own;
    const classes = cn(
      'dss-sch-row',
      own && mode !== 'opponent' && 'is-own',
      game.state === 'live' && 'is-live',
      game.state === 'cancelled' && 'is-cancelled',
      game.state === 'postponed' && 'is-postponed',
      game.state === 'bye' && 'is-bye',
    );
    if (game.state === 'bye') {
      return (
        <tr key={game.id} role="row" className={classes}>
          <td role="cell" className="dss-sch-bye" colSpan={cols.length}>
            {game.time ? <span className="dss-sch-time">{game.time} · </span> : null}
            {game.heim ? `${game.heim.name} hat Freilos` : (game.note ?? 'Spielfrei')}
          </td>
        </tr>
      );
    }
    return (
      <tr key={game.id} role="row" className={classes}>
        {cols.map((col) => cell(col.key, game))}
      </tr>
    );
  };

  return (
    <div className={cn('dss-frame', className)}>
      {hasHead ? (
        <div className="dss-frame-head">
          {title ? <Heading className="dss-frame-title">{title}</Heading> : <span />}
          <div className="dss-frame-meta">{meta ? <span>{meta}</span> : null}</div>
        </div>
      ) : null}
      <div className="dss-table-scroll">
        <table role="table" className={cn('dss-tbl dss-tbl--schedule', `dss-tbl--${dens}`, `dss-sch--${mode}`)}>
          {caption ? <caption className="dss-sr-only">{caption}</caption> : null}
          <thead role="rowgroup" className={mode === 'columns' ? undefined : 'dss-sr-only'}>
            <tr role="row">
              {cols.map((col) => (
                <th key={col.key} scope="col" role="columnheader">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup">
            {groups.map((group, index) => (
              <Fragment key={`${group.section ?? 'ohne'}-${index}`}>
                {group.section ? (
                  <tr role="row" className="dss-sch-group">
                    <th scope="colgroup" colSpan={cols.length}>
                      {group.section}
                    </th>
                  </tr>
                ) : null}
                {group.games.map(row)}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Export ergänzen**

In `react/index.ts` nach der `Table`-Zeile ergänzen:

```ts
export { ScheduleTable, type ScheduleTableProps, type ScheduleLinkProps } from './ScheduleTable';
export type {
  ScheduleBreak,
  ScheduleDensity,
  ScheduleGame,
  ScheduleGridColumn,
  ScheduleLayout,
  ScheduleOutcome,
  ScheduleState,
  ScheduleTeam,
} from './schedule-types';
```

- [ ] **Step 5: Tests laufen lassen**

Run: `npx vitest run react/ScheduleTable.test.tsx`
Expected: PASS

Run: `npm run typecheck`
Expected: Exit 0

> Schlägt ein axe-Test wegen der `role`-Attribute fehl (`aria-allowed-role`), entferne nur die betroffene Rolle aus dem Markup **und** aus dem Rollen-Test und notiere es in der Commit-Nachricht. Die Handy-Semantik ist dann im Browser (Task 10) zu prüfen.

- [ ] **Step 6: Commit**

```bash
git add react/ScheduleTable.tsx react/ScheduleTable.test.tsx react/index.ts
git commit -m "feat(schedule): React ScheduleTable (versus, opponent, columns)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Svelte `ScheduleTable`, Manifest, Export

**Files:**
- Create: `svelte/ScheduleTable.svelte`
- Modify: `parity.manifest.json`
- Modify: `package.json`

- [ ] **Step 1: Komponente schreiben**

Create `svelte/ScheduleTable.svelte`:

```svelte
<script lang="ts">
  /**
   * DSS ScheduleTable · Svelte 5
   * --------------------------------------------------------------
   * Spielplan als Tabelle: Gegenüberstellung (versus), Perspektive einer
   * Mannschaft (opponent) oder Turnier-Spalten (columns). Nutzt
   * ausschließlich die Klassen aus css/components.css (kein eigener
   * Scoped-Style); gleiche Struktur wie die React-Fassung.
   *
   * Slots: `time` (ersetzt die Uhrzeit) und `notice` (zusätzliche Zelle am
   * Zeilenende), jeweils mit dem Spiel als Argument.
   */
  import type { Snippet } from 'svelte';
  import {
    ariaForResult,
    columnsFor,
    densityFor,
    groupBySection,
    hasScore,
    initials,
    layoutFor,
    resolveOutcome,
    winnerSide,
  } from '../js/schedule.js';
  import type { ScheduleDensity, ScheduleGame, ScheduleLayout, ScheduleTeam } from '../js/schedule.js';

  let {
    games,
    layout = undefined,
    density = undefined,
    title = '',
    meta = '',
    caption = '',
    class: klass = '',
    time = undefined,
    notice = undefined,
  }: {
    games: ScheduleGame[];
    layout?: ScheduleLayout;
    density?: ScheduleDensity;
    title?: string;
    meta?: string;
    caption?: string;
    class?: string;
    time?: Snippet<[ScheduleGame]>;
    notice?: Snippet<[ScheduleGame]>;
  } = $props();

  const mode = $derived<ScheduleLayout>(layout ?? layoutFor(games));
  const dens = $derived<ScheduleDensity>(density ?? densityFor(games, mode));
  const cols = $derived(columnsFor(mode, games, Boolean(notice)));
  const groups = $derived(groupBySection(games));
  const OUTCOME_CHIP = { S: 'dss-chip--ok', N: 'dss-chip--err', U: '' } as const;
</script>

{#snippet team(t: ScheduleTeam | undefined, loser: boolean)}
  {@const current = t ?? { name: '?' }}
  <span class="dss-sch-team" class:is-loser={loser}>
    {#if current.href && !current.placeholder}
      <a class="dss-link" href={current.href}>{current.name}</a>
    {:else if current.placeholder}
      <span class="dss-sch-ph">{current.name}</span>
    {:else}
      {current.name}
    {/if}
  </span>
{/snippet}

{#snippet noteText(game: ScheduleGame)}
  {#if game.note}<span class="dss-sch-note">{game.note}</span>{/if}
{/snippet}

{#snippet row(game: ScheduleGame)}
  {@const own = game.heim?.own || game.gast?.own}
  {@const winner = winnerSide(game)}
  {#if game.state === 'bye'}
    <tr role="row" class="dss-sch-row is-bye">
      <td role="cell" class="dss-sch-bye" colspan={cols.length}>
        {#if game.time}<span class="dss-sch-time">{game.time} · </span>{/if}
        {game.heim ? `${game.heim.name} hat Freilos` : (game.note ?? 'Spielfrei')}
      </td>
    </tr>
  {:else}
    <tr
      role="row"
      class="dss-sch-row"
      class:is-own={own && mode !== 'opponent'}
      class:is-live={game.state === 'live'}
      class:is-cancelled={game.state === 'cancelled'}
      class:is-postponed={game.state === 'postponed'}
    >
      {#each cols as col (col.key)}
        {#if col.key === 'nr'}
          <td role="cell" class="dss-sch-nr">{game.nr}</td>
        {:else if col.key === 'when'}
          <td role="cell" class="dss-sch-when">
            {#if game.date}<span class="dss-sch-date">{game.date}</span>{/if}
            {#if time || game.time}<span class="dss-sch-time">{#if time}{@render time(game)}{:else}{game.time}{/if}</span>{/if}
            {#if game.state === 'live'}
              <span class="dss-match-live dss-sch-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live</span>
            {/if}
            {#if mode !== 'columns' && game.venue}<span class="dss-sch-venue">{game.venue}</span>{/if}
          </td>
        {:else if col.key === 'ha'}
          <td role="cell" class="dss-sch-ha">
            <span class="dss-chip dss-chip--mono {game.at === 'gast' ? 'dss-chip--amber' : 'dss-chip--sky'}">{game.at === 'gast' ? '@' : 'vs.'}</span>
          </td>
        {:else if col.key === 'match'}
          <td role="cell" class="dss-sch-match">
            {#if mode === 'opponent' && game.opponent}
              <span class="dss-sch-opp">
                <span class="dss-sch-logo" aria-hidden="true">
                  {#if game.opponent.logo}<img src={game.opponent.logo} alt="" />{:else}{initials(game.opponent.name)}{/if}
                </span>
                {@render team(game.opponent, false)}
              </span>
            {:else}
              {@render team(game.heim, winner === 'gast')}
              <span class="dss-sch-sep" aria-hidden="true"> – </span>
              <span class="dss-sr-only"> gegen </span>
              {@render team(game.gast, winner === 'heim')}
            {/if}
            {#if game.league}
              <span class="dss-sch-sub">
                {#if game.league.href}<a class="dss-link" href={game.league.href}>{game.league.name}</a>{:else}{game.league.name}{/if}
              </span>
            {/if}
            {@render noteText(game)}
          </td>
        {:else if col.key === 'heim'}
          <td role="cell" class="dss-sch-heim">{@render team(game.heim, winner === 'gast')}</td>
        {:else if col.key === 'gast'}
          <td role="cell" class="dss-sch-gast">{@render team(game.gast, winner === 'heim')}{@render noteText(game)}</td>
        {:else if col.key === 'field'}
          <td role="cell" class="dss-sch-field-cell">
            {#if game.field}<span class="dss-chip dss-chip--mono dss-sch-field" title={game.field}>{game.field}</span>{/if}
          </td>
        {:else if col.key === 'venue'}
          <td role="cell" class="dss-sch-venue-cell">{game.venue}</td>
        {:else if col.key === 'res'}
          {@const scored = (game.state === 'finished' || game.state === 'live') && hasScore(game, mode)}
          {@const result = mode === 'opponent' ? resolveOutcome(game) : undefined}
          <td role="cell" class="dss-sch-res">
            {#if !scored}
              <span class="dss-sch-none">–</span>
            {:else}
              {#if result}<span class="dss-chip dss-chip--mono {OUTCOME_CHIP[result]}" aria-hidden="true">{result}</span>{/if}
              <span class="dss-sch-score" aria-hidden="true">{mode === 'opponent' && game.opponent ? `${game.ownScore} : ${game.opponent.score}` : `${game.heim?.score} : ${game.gast?.score}`}</span>
              <span class="dss-sr-only">{ariaForResult(game, mode)}</span>
              {#if game.provisional}<small aria-hidden="true">vorläufig</small>{/if}
            {/if}
          </td>
        {:else if col.key === 'notice'}
          <td role="cell" class="dss-sch-notice">{#if notice}{@render notice(game)}{/if}</td>
        {/if}
      {/each}
    </tr>
  {/if}
{/snippet}

<div class="dss-frame {klass}">
  {#if title || meta}
    <div class="dss-frame-head">
      {#if title}<h3 class="dss-frame-title">{title}</h3>{:else}<span></span>{/if}
      <div class="dss-frame-meta">{#if meta}<span>{meta}</span>{/if}</div>
    </div>
  {/if}
  <div class="dss-table-scroll">
    <table role="table" class="dss-tbl dss-tbl--schedule dss-tbl--{dens} dss-sch--{mode}">
      {#if caption}<caption class="dss-sr-only">{caption}</caption>{/if}
      <thead role="rowgroup" class:dss-sr-only={mode !== 'columns'}>
        <tr role="row">
          {#each cols as col (col.key)}
            <th scope="col" role="columnheader">{col.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {#each groups as group, index (`${group.section ?? 'ohne'}-${index}`)}
          {#if group.section}
            <tr role="row" class="dss-sch-group"><th scope="colgroup" colspan={cols.length}>{group.section}</th></tr>
          {/if}
          {#each group.games as game (game.id)}
            {@render row(game)}
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 2: Manifest und Export ergänzen**

In `parity.manifest.json` nach dem Eintrag `"Table"` ergänzen:

```json
  "ScheduleTable": {
    "svelte": "svelte/ScheduleTable.svelte",
    "react": "react/ScheduleTable.tsx",
    "css": ["dss-tbl--schedule", "dss-sch-group", "dss-sch-when", "dss-sch-match", "dss-sch-res", "dss-sch-score"]
  },
```

In `package.json` nach `"./svelte/Table": "./svelte/Table.svelte",` ergänzen:

```json
    "./svelte/ScheduleTable": "./svelte/ScheduleTable.svelte",
```

- [ ] **Step 3: Tests und Build prüfen**

Run: `npx vitest run tests/parity.test.ts`
Expected: PASS (`ScheduleTable` im Manifest, kein `<style>`-Block, React-Export vorhanden)

Run: `npx storybook build -o storybook-static --quiet 2>&1 | tail -3`
Expected: `Storybook build completed successfully`

- [ ] **Step 4: Commit**

```bash
git add svelte/ScheduleTable.svelte parity.manifest.json package.json
git commit -m "feat(schedule): Svelte ScheduleTable with manifest entry

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: CSS für Variante B

**Files:**
- Modify: `css/components.css` (am Dateiende anhängen)
- Modify: `tests/components-css.test.ts` (am Dateiende anhängen)

- [ ] **Step 1: Failing CSS-Test schreiben**

Am Ende von `tests/components-css.test.ts` anhängen:

```ts
describe('Spielplan · ScheduleGrid (Variante B)', () => {
  const CLASSES = [
    'dss-sgrid', 'dss-sg-time', 'dss-sg-cell', 'dss-sg-game', 'dss-sg-teams', 'dss-sg-result', 'dss-sg-meta',
    'dss-sg-empty', 'dss-sg-break', 'dss-sg-bye',
  ];
  it.each(CLASSES)('definiert .%s', (name) => {
    expect(hasClass(name)).toBe(true);
  });

  it('die Zeitspalte bleibt beim seitlichen Scrollen stehen', () => {
    const rule = css.match(/\.dss-sgrid tbody th\.dss-sg-time \{([^}]*)\}/)?.[1] ?? '';
    expect(rule).toContain('position: sticky');
    expect(rule).toContain('left: 0');
  });

  it('Handy: jede Zeitzeile wird ein Block mit Spalten-Beschriftung', () => {
    expect(css).toMatch(/@media \(max-width: 640px\) \{[^@]*\.dss-sgrid td\.dss-sg-cell::before[^{]*\{[^}]*attr\(data-label\)/);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run tests/components-css.test.ts`
Expected: FAIL (`.dss-sgrid` nicht definiert)

- [ ] **Step 3: CSS ergänzen**

Am Ende von `css/components.css` anhängen:

```css

/* ── Spielplan · ScheduleGrid (Variante B, Zeitraster) ─────── */
.dss-sgrid th, .dss-sgrid td { white-space: normal; vertical-align: top; }
.dss-sgrid thead th { text-align: left; }
.dss-sgrid td.dss-sg-cell { height: auto; padding: 8px 10px; min-width: 180px; }
.dss-sgrid th.dss-sg-time {
  position: static; width: 96px; min-width: 96px; text-transform: none; letter-spacing: 0;
  font-family: var(--font-mono); font-size: var(--fs-body-md); font-weight: 600; color: var(--dss-fg);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.dss-sgrid tbody th.dss-sg-time {
  position: sticky; left: 0; top: auto; z-index: 1; height: auto; padding: 12px 14px;
  background: var(--dss-surface); border-bottom: 1px solid var(--dss-line);
}
.dss-sg-game {
  display: flex; flex-direction: column; gap: 4px; padding: 8px 10px; min-height: 56px;
  border: 1px solid var(--dss-line); border-radius: var(--radius-md); background: var(--dss-surface);
  font-size: var(--fs-body-md); color: var(--dss-fg);
}
.dss-sg-game.is-own { background: var(--dss-selected-bg); box-shadow: inset 3px 0 0 var(--indicator); font-weight: 600; }
.dss-sg-game.is-cancelled { color: var(--dss-mute); }
.dss-sg-game.is-cancelled .dss-sch-team { text-decoration: line-through; }
.dss-sg-game.is-postponed { color: var(--dss-mute); }
.dss-sg-teams { line-height: 1.35; }
.dss-sg-result { display: flex; align-items: baseline; gap: 6px; }
.dss-sg-result .dss-sch-score { font-size: var(--fs-body); }
.dss-sg-meta { font-family: var(--font-mono); font-size: var(--fs-caption); color: var(--dss-mute); }
.dss-sg-empty { display: block; padding: 8px 0; color: var(--dss-mute); font-style: italic; }
.dss-sgrid tr.dss-sg-break td, .dss-sgrid tr.dss-sg-bye td { height: auto; padding: 10px 14px; color: var(--dss-mute); font-style: italic; background: var(--dss-surface-2); }

@media (max-width: 640px) {
  .dss-sgrid, .dss-sgrid tbody { display: block; }
  .dss-sgrid thead {
    position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }
  .dss-sgrid tr { display: block; border-bottom: 1px solid var(--dss-line); padding-bottom: 8px; }
  .dss-sgrid tbody th.dss-sg-time { position: static; display: block; width: auto; padding: 12px 14px 4px; border: 0; background: none; }
  .dss-sgrid td.dss-sg-cell { display: block; min-width: 0; padding: 4px 14px; border: 0; }
  .dss-sgrid td.dss-sg-cell.is-empty { display: none; }
  .dss-sgrid td.dss-sg-cell::before {
    content: attr(data-label); display: block; margin-bottom: 4px; font-family: var(--font-mono);
    font-size: var(--fs-caption); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dss-mute);
  }
  .dss-sgrid tr.dss-sg-break td, .dss-sgrid tr.dss-sg-bye td { display: block; }
}
```

- [ ] **Step 4: Test laufen lassen**

Run: `npx vitest run tests/components-css.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add css/components.css tests/components-css.test.ts
git commit -m "feat(schedule): CSS for the schedule grid (variant B)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: React `ScheduleGrid`

**Files:**
- Create: `react/ScheduleGrid.tsx`
- Create: `react/ScheduleGrid.test.tsx`
- Modify: `react/index.ts`

- [ ] **Step 1: Failing Tests schreiben**

Create `react/ScheduleGrid.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ScheduleGrid } from './ScheduleGrid';
import type { ScheduleGame, ScheduleGridColumn } from './schedule-types';
import { expectNoA11yViolations } from './test-utils';

const COLUMNS: ScheduleGridColumn[] = [
  { id: 'f1', label: 'Sporthalle Breitengüßbach' },
  { id: 'f2', label: 'Feld 2' },
];

const GAMES: ScheduleGame[] = [
  {
    id: 'a', state: 'finished', nr: '#1', section: 'Gruppe A', time: '09:00', column: 'f1',
    heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 },
  },
  {
    id: 'b', state: 'live', nr: '#2', section: 'Gruppe A', time: '09:00', column: 'f2',
    heim: { name: 'BG Zirndorf', score: 12 }, gast: { name: 'TV Lich', score: 10 },
  },
  {
    id: 'c', state: 'cancelled', nr: '#3', time: '09:30', column: 'f1', note: 'Rückzug TV Lich',
    heim: { name: 'TSV Tröster' }, gast: { name: 'TV Lich' },
  },
  {
    id: 'd', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00', column: 'f1',
    heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true },
  },
  { id: 'e', state: 'bye', time: '09:30', heim: { name: 'MTV Ansbach' } },
];

describe('ScheduleGrid', () => {
  it('zeigt Zeit als Zeilenkopf und freie Hallennamen als Spaltenköpfe', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    expect([...container.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual([
      'Zeit', 'Sporthalle Breitengüßbach', 'Feld 2',
    ]);
    const rowHeads = [...container.querySelectorAll('tbody th[scope="row"]')].map((th) => th.textContent);
    expect(rowHeads).toEqual(['09:00', '09:30', '09:30', '11:00']);
  });

  it('setzt die Spiele in die richtige Spalte und zeigt leere Zellen als "frei"', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    const firstRow = container.querySelector('tbody tr') as HTMLElement;
    const cells = firstRow.querySelectorAll('td.dss-sg-cell');
    expect(within(cells[0] as HTMLElement).getByText('TSV Tröster')).toBeInTheDocument();
    expect(within(cells[1] as HTMLElement).getByText('BG Zirndorf')).toBeInTheDocument();
    const emptyCells = container.querySelectorAll('td.dss-sg-cell.is-empty');
    expect(emptyCells.length).toBeGreaterThan(0);
    expect(within(emptyCells[0] as HTMLElement).getByText('frei')).toHaveClass('dss-sg-empty');
  });

  it('trägt den Spaltennamen als data-label für die Handy-Ansicht', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    const cells = container.querySelectorAll('tbody tr:first-child td.dss-sg-cell');
    expect(cells[0]).toHaveAttribute('data-label', 'Sporthalle Breitengüßbach');
    expect(cells[1]).toHaveAttribute('data-label', 'Feld 2');
  });

  it('zeigt Zustände in der Zelle: live, Ergebnis, abgesagt, Platzhalter, Meta', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    expect(container.querySelector('.dss-sg-game.is-own')).toBeInTheDocument();
    expect(container.querySelector('.dss-sg-game.is-live .dss-match-live')).toHaveTextContent('Live');
    expect(screen.getByText('Heim 42, Gast 31')).toHaveClass('dss-sr-only');
    expect(screen.getByText('Heim 12, Gast 10, läuft')).toBeInTheDocument();
    expect(container.querySelector('.dss-sg-game.is-cancelled')).toBeInTheDocument();
    expect(screen.getByText('Rückzug TV Lich')).toHaveClass('dss-sch-note');
    expect(screen.getByText('Erster Gruppe A')).toHaveClass('dss-sch-ph');
    expect(screen.getByText('#1 · Gruppe A')).toHaveClass('dss-sg-meta');
  });

  it('zeigt Pausen und Freilose als Zeile über alle Spalten', () => {
    const { container } = render(
      <ScheduleGrid games={GAMES} columns={COLUMNS} breaks={[{ time: '10:00', label: 'Mittagspause' }]} />,
    );
    const pause = container.querySelector('tr.dss-sg-break td') as HTMLElement;
    expect(pause).toHaveAttribute('colspan', '2');
    expect(pause).toHaveTextContent('Mittagspause');
    const bye = container.querySelector('tr.dss-sg-bye td') as HTMLElement;
    expect(bye).toHaveTextContent('MTV Ansbach hat Freilos');
    const order = [...container.querySelectorAll('tbody tr')].map((tr) => tr.className || 'slot');
    expect(order).toEqual(['slot', 'slot', 'dss-sg-bye', 'dss-sg-break', 'slot']);
  });

  it('nutzt eigenen Text für leere Zellen und rendert den Slot notice', () => {
    const { container } = render(
      <ScheduleGrid
        games={GAMES}
        columns={COLUMNS}
        emptyLabel="–"
        renderNotice={(g) => (g.id === 'a' ? <span className="dss-chip dss-chip--warn">Sperrzeit</span> : null)}
      />,
    );
    expect(screen.getByText('Sperrzeit')).toBeInTheDocument();
    expect(container.querySelector('.dss-sg-empty')).toHaveTextContent('–');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} caption="Zeitraster" />);
    await expectNoA11yViolations(container);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run react/ScheduleGrid.test.tsx`
Expected: FAIL (`Failed to resolve import "./ScheduleGrid"`)

- [ ] **Step 3: Komponente schreiben**

Create `react/ScheduleGrid.tsx`:

```tsx
import type { ReactNode } from 'react';
import { cn } from './cn';
import { ariaForResult, buildGrid, hasScore, winnerSide } from '../js/schedule.js';
import { LiveTag, ResultText, TeamName, type ScheduleRenderLink } from './ScheduleParts';
import type { ScheduleBreak, ScheduleDensity, ScheduleGame, ScheduleGridColumn } from './schedule-types';

export interface ScheduleGridProps {
  /** Jedes Spiel braucht `time` und `column` (passt zu einer `columns[].id`). */
  games: ScheduleGame[];
  /** Spalten (Hallen oder Felder) in Anzeige-Reihenfolge; `label` ist freier Text. */
  columns: ScheduleGridColumn[];
  /** Anwurfzeiten als Zeilen; ohne Angabe aus `games` abgeleitet. */
  slots?: string[];
  /** Pausen und Sperrzeiten als Zeile über alle Spalten. */
  breaks?: ScheduleBreak[];
  emptyLabel?: string;
  density?: ScheduleDensity;
  title?: ReactNode;
  titleAs?: 'h2' | 'h3' | 'h4';
  meta?: ReactNode;
  caption?: string;
  className?: string;
  renderLink?: ScheduleRenderLink;
  /** Zusätzlicher Inhalt in der Spielzelle, z. B. Konflikt-Badge. */
  renderNotice?: (game: ScheduleGame) => ReactNode;
}

/** Zeitraster: Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten (empfohlen: höchstens drei). */
export function ScheduleGrid({
  games,
  columns,
  slots,
  breaks,
  emptyLabel = 'frei',
  density = 'default',
  title,
  titleAs: Heading = 'h3',
  meta,
  caption,
  className,
  renderLink,
  renderNotice,
}: ScheduleGridProps) {
  const rows = buildGrid({ games, columns, slots, breaks });
  const hasHead = Boolean(title || meta);

  const gameBlock = (game: ScheduleGame): ReactNode => {
    const winner = winnerSide(game);
    const own = game.heim?.own || game.gast?.own;
    const metaText = [game.nr, game.section].filter(Boolean).join(' · ');
    return (
      <div
        key={game.id}
        className={cn(
          'dss-sg-game',
          own && 'is-own',
          game.state === 'live' && 'is-live',
          game.state === 'cancelled' && 'is-cancelled',
          game.state === 'postponed' && 'is-postponed',
        )}
      >
        <div className="dss-sg-teams">
          <TeamName team={game.heim} loser={winner === 'gast'} renderLink={renderLink} />
          <span className="dss-sch-sep" aria-hidden="true">
            {' – '}
          </span>
          <span className="dss-sr-only"> gegen </span>
          <TeamName team={game.gast} loser={winner === 'heim'} renderLink={renderLink} />
        </div>
        {game.state === 'live' ? <LiveTag /> : null}
        {(game.state === 'finished' || game.state === 'live') && hasScore(game, 'versus') ? (
          <div className="dss-sg-result">
            <ResultText
              visible={`${game.heim?.score} : ${game.gast?.score}`}
              spoken={ariaForResult(game, 'versus')}
              provisional={game.provisional}
            />
          </div>
        ) : null}
        {metaText ? <div className="dss-sg-meta">{metaText}</div> : null}
        {game.note ? <div className="dss-sch-note">{game.note}</div> : null}
        {renderNotice ? renderNotice(game) : null}
      </div>
    );
  };

  return (
    <div className={cn('dss-frame', className)}>
      {hasHead ? (
        <div className="dss-frame-head">
          {title ? <Heading className="dss-frame-title">{title}</Heading> : <span />}
          <div className="dss-frame-meta">{meta ? <span>{meta}</span> : null}</div>
        </div>
      ) : null}
      <div className="dss-table-scroll">
        <table role="table" className={cn('dss-tbl dss-sgrid', `dss-tbl--${density}`)}>
          {caption ? <caption className="dss-sr-only">{caption}</caption> : null}
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader" className="dss-sg-time">
                Zeit
              </th>
              {columns.map((column) => (
                <th key={column.id} scope="col" role="columnheader">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup">
            {rows.map((row, index) => {
              if (row.kind === 'break') {
                return (
                  <tr key={`b-${index}`} role="row" className="dss-sg-break">
                    <th scope="row" role="rowheader" className="dss-sg-time">
                      {row.time}
                    </th>
                    <td role="cell" colSpan={columns.length}>
                      {row.label}
                    </td>
                  </tr>
                );
              }
              if (row.kind === 'bye') {
                return (
                  <tr key={`y-${index}`} role="row" className="dss-sg-bye">
                    <th scope="row" role="rowheader" className="dss-sg-time">
                      {row.time ?? ''}
                    </th>
                    <td role="cell" colSpan={columns.length}>
                      {row.game.heim ? `${row.game.heim.name} hat Freilos` : (row.game.note ?? 'Spielfrei')}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={`s-${row.time}-${index}`} role="row">
                  <th scope="row" role="rowheader" className="dss-sg-time">
                    {row.time}
                  </th>
                  {row.cells.map((cell, columnIndex) => (
                    <td
                      key={columns[columnIndex].id}
                      role="cell"
                      className={cn('dss-sg-cell', cell.length === 0 && 'is-empty')}
                      data-label={columns[columnIndex].label}
                    >
                      {cell.length === 0 ? <span className="dss-sg-empty">{emptyLabel}</span> : cell.map(gameBlock)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Export ergänzen**

In `react/index.ts` nach der `ScheduleTable`-Zeile ergänzen:

```ts
export { ScheduleGrid, type ScheduleGridProps } from './ScheduleGrid';
```

- [ ] **Step 5: Tests laufen lassen**

Run: `npx vitest run react/ScheduleGrid.test.tsx`
Expected: PASS

Run: `npm run typecheck`
Expected: Exit 0

- [ ] **Step 6: Commit**

```bash
git add react/ScheduleGrid.tsx react/ScheduleGrid.test.tsx react/index.ts
git commit -m "feat(schedule): React ScheduleGrid

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Svelte `ScheduleGrid`, Manifest, Export

**Files:**
- Create: `svelte/ScheduleGrid.svelte`
- Modify: `parity.manifest.json`
- Modify: `package.json`

- [ ] **Step 1: Komponente schreiben**

Create `svelte/ScheduleGrid.svelte`:

```svelte
<script lang="ts">
  /**
   * DSS ScheduleGrid · Svelte 5
   * --------------------------------------------------------------
   * Zeitraster: Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten
   * (empfohlen: höchstens drei). Nutzt ausschließlich die Klassen aus
   * css/components.css (kein eigener Scoped-Style); gleiche Struktur wie
   * die React-Fassung. Slot `notice`: zusätzlicher Inhalt in der Spielzelle.
   */
  import type { Snippet } from 'svelte';
  import { ariaForResult, buildGrid, hasScore, winnerSide } from '../js/schedule.js';
  import type { ScheduleBreak, ScheduleDensity, ScheduleGame, ScheduleGridColumn, ScheduleTeam } from '../js/schedule.js';

  let {
    games,
    columns,
    slots = undefined,
    breaks = undefined,
    emptyLabel = 'frei',
    density = 'default',
    title = '',
    meta = '',
    caption = '',
    class: klass = '',
    notice = undefined,
  }: {
    games: ScheduleGame[];
    columns: ScheduleGridColumn[];
    slots?: string[];
    breaks?: ScheduleBreak[];
    emptyLabel?: string;
    density?: ScheduleDensity;
    title?: string;
    meta?: string;
    caption?: string;
    class?: string;
    notice?: Snippet<[ScheduleGame]>;
  } = $props();

  const rows = $derived(buildGrid({ games, columns, slots, breaks }));
</script>

{#snippet team(t: ScheduleTeam | undefined, loser: boolean)}
  {@const current = t ?? { name: '?' }}
  <span class="dss-sch-team" class:is-loser={loser}>
    {#if current.href && !current.placeholder}
      <a class="dss-link" href={current.href}>{current.name}</a>
    {:else if current.placeholder}
      <span class="dss-sch-ph">{current.name}</span>
    {:else}
      {current.name}
    {/if}
  </span>
{/snippet}

{#snippet gameBlock(game: ScheduleGame)}
  {@const winner = winnerSide(game)}
  {@const own = game.heim?.own || game.gast?.own}
  {@const metaText = [game.nr, game.section].filter(Boolean).join(' · ')}
  <div
    class="dss-sg-game"
    class:is-own={own}
    class:is-live={game.state === 'live'}
    class:is-cancelled={game.state === 'cancelled'}
    class:is-postponed={game.state === 'postponed'}
  >
    <div class="dss-sg-teams">
      {@render team(game.heim, winner === 'gast')}
      <span class="dss-sch-sep" aria-hidden="true"> – </span>
      <span class="dss-sr-only"> gegen </span>
      {@render team(game.gast, winner === 'heim')}
    </div>
    {#if game.state === 'live'}
      <span class="dss-match-live dss-sch-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live</span>
    {/if}
    {#if (game.state === 'finished' || game.state === 'live') && hasScore(game, 'versus')}
      <div class="dss-sg-result">
        <span class="dss-sch-score" aria-hidden="true">{game.heim?.score} : {game.gast?.score}</span>
        <span class="dss-sr-only">{ariaForResult(game, 'versus')}</span>
        {#if game.provisional}<small aria-hidden="true">vorläufig</small>{/if}
      </div>
    {/if}
    {#if metaText}<div class="dss-sg-meta">{metaText}</div>{/if}
    {#if game.note}<div class="dss-sch-note">{game.note}</div>{/if}
    {#if notice}{@render notice(game)}{/if}
  </div>
{/snippet}

<div class="dss-frame {klass}">
  {#if title || meta}
    <div class="dss-frame-head">
      {#if title}<h3 class="dss-frame-title">{title}</h3>{:else}<span></span>{/if}
      <div class="dss-frame-meta">{#if meta}<span>{meta}</span>{/if}</div>
    </div>
  {/if}
  <div class="dss-table-scroll">
    <table role="table" class="dss-tbl dss-sgrid dss-tbl--{density}">
      {#if caption}<caption class="dss-sr-only">{caption}</caption>{/if}
      <thead role="rowgroup">
        <tr role="row">
          <th scope="col" role="columnheader" class="dss-sg-time">Zeit</th>
          {#each columns as column (column.id)}
            <th scope="col" role="columnheader">{column.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {#each rows as row, index (`${row.kind}-${row.time ?? ''}-${index}`)}
          {#if row.kind === 'break'}
            <tr role="row" class="dss-sg-break">
              <th scope="row" role="rowheader" class="dss-sg-time">{row.time}</th>
              <td role="cell" colspan={columns.length}>{row.label}</td>
            </tr>
          {:else if row.kind === 'bye'}
            <tr role="row" class="dss-sg-bye">
              <th scope="row" role="rowheader" class="dss-sg-time">{row.time ?? ''}</th>
              <td role="cell" colspan={columns.length}>{row.game.heim ? `${row.game.heim.name} hat Freilos` : (row.game.note ?? 'Spielfrei')}</td>
            </tr>
          {:else}
            <tr role="row">
              <th scope="row" role="rowheader" class="dss-sg-time">{row.time}</th>
              {#each row.cells as cell, columnIndex (columns[columnIndex].id)}
                <td role="cell" class="dss-sg-cell" class:is-empty={cell.length === 0} data-label={columns[columnIndex].label}>
                  {#if cell.length === 0}
                    <span class="dss-sg-empty">{emptyLabel}</span>
                  {:else}
                    {#each cell as game (game.id)}{@render gameBlock(game)}{/each}
                  {/if}
                </td>
              {/each}
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 2: Manifest und Export ergänzen**

In `parity.manifest.json` nach `"ScheduleTable"` ergänzen:

```json
  "ScheduleGrid": {
    "svelte": "svelte/ScheduleGrid.svelte",
    "react": "react/ScheduleGrid.tsx",
    "css": ["dss-sgrid", "dss-sg-time", "dss-sg-cell", "dss-sg-game", "dss-sg-empty"]
  },
```

In `package.json` nach `"./svelte/ScheduleTable": …` ergänzen:

```json
    "./svelte/ScheduleGrid": "./svelte/ScheduleGrid.svelte",
```

- [ ] **Step 3: Tests und Build prüfen**

Run: `npx vitest run tests/parity.test.ts`
Expected: PASS

Run: `npx storybook build -o storybook-static --quiet 2>&1 | tail -3`
Expected: `Storybook build completed successfully`

- [ ] **Step 4: Commit**

```bash
git add svelte/ScheduleGrid.svelte parity.manifest.json package.json
git commit -m "feat(schedule): Svelte ScheduleGrid with manifest entry

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Demos, Stories und Doku-Abschnitt

**Files:**
- Create: `stories/components/ScheduleDemo.svelte`
- Create: `stories/ScheduleTable.stories.ts`
- Create: `stories/ScheduleGrid.stories.ts`
- Modify: `stories/docs/TablesDoc.svelte`
- Modify: `scripts/visual-compare.mjs`

- [ ] **Step 1: Demo mit Beispieldaten schreiben**

Create `stories/components/ScheduleDemo.svelte`:

```svelte
<script lang="ts">
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';
  import ScheduleGrid from '../../svelte/ScheduleGrid.svelte';
  import type { ScheduleGame } from '../../js/schedule.js';

  let { preset = 'mannschaft', density = undefined }: { preset?: string; density?: 'touch' | 'default' | 'compact' } = $props();

  const mannschaft: ScheduleGame[] = [
    { id: 'm1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV Jahn Freising', href: '#', score: 108 }, ownScore: 65 },
    { id: 'm2', state: 'finished', date: 'Sa, 03.10.2026', time: '17:30', at: 'heim', provisional: true, opponent: { name: 'Dukes Dingolfing', href: '#', score: 0 }, ownScore: 20, outcome: 'S' },
    { id: 'm3', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast', opponent: { name: 'Nürnberger Basketball Club', href: '#' } },
    { id: 'm4', state: 'scheduled', date: 'Sa, 17.10.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV 1884 Wolnzach', href: '#' } },
    { id: 'm5', state: 'postponed', date: 'So, 25.10.2026', time: '17:00', at: 'gast', opponent: { name: 'TV 1881 Altdorf', href: '#' }, note: 'Verlegt auf Sa, 14.11.2026, 19:00' },
  ];

  const liga: ScheduleGame[] = [
    { id: 'l1', state: 'finished', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '17:00', heim: { name: 'TuSpo Heroldsberg', href: '#', score: 64 }, gast: { name: 'TSV Breitengüßbach 2', href: '#', score: 90 }, league: { name: 'Bayernliga Herren Mitte', href: '#' } },
    { id: 'l2', state: 'live', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '15:45', heim: { name: 'TG 48 Würzburg 2', href: '#', score: 52 }, gast: { name: 'CVJM Erlangen', href: '#', score: 48 }, league: { name: 'Bayernliga Herren Mitte', href: '#' } },
    { id: 'l3', state: 'scheduled', section: 'Spieltag 6', date: 'Sa, 10.10.2026', time: '15:00', heim: { name: 'Fibalon Baskets Neumarkt', href: '#', own: true }, gast: { name: 'FC Tegernheim', href: '#' }, league: { name: 'U18 männlich Bezirksoberliga', href: '#' } },
    { id: 'l4', state: 'cancelled', section: 'Spieltag 6', date: 'Sa, 10.10.2026', time: '17:30', heim: { name: 'TB Weiden', href: '#' }, gast: { name: 'SV Oberdürrbach 1959', href: '#' }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, note: 'Abgesagt: Halle gesperrt' },
  ];

  const turnier: ScheduleGame[] = [
    { id: 't1', state: 'finished', nr: '#1', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F1', heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 } },
    { id: 't2', state: 'finished', nr: '#2', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F2', heim: { name: 'BG Zirndorf', score: 28 }, gast: { name: 'TV Lich', score: 35 } },
    { id: 't3', state: 'live', nr: '#3', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F1', heim: { name: 'TSV Tröster', score: 18, own: true }, gast: { name: 'TV Lich', score: 20 } },
    { id: 't4', state: 'cancelled', nr: '#4', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F2', heim: { name: 'USC Heidelberg' }, gast: { name: 'SV Aschaffenburg' }, note: 'Rückzug SV Aschaffenburg' },
    { id: 't5', state: 'bye', nr: '#5', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', heim: { name: 'BG Zirndorf' } },
    { id: 't6', state: 'scheduled', nr: '#6', section: 'Runde 3 · Gruppe A', time: '10:00–10:20', field: 'F1', heim: { name: 'BG Zirndorf' }, gast: { name: 'TSV Tröster', own: true } },
    { id: 't9', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00–11:20', field: 'F1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
  ];

  const rasterGames: ScheduleGame[] = [
    { id: 'r1', state: 'finished', nr: '#1', section: 'Gruppe A', time: '09:00', column: 'h1', heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 } },
    { id: 'r2', state: 'finished', nr: '#2', section: 'Gruppe A', time: '09:00', column: 'h2', heim: { name: 'BG Zirndorf', score: 28 }, gast: { name: 'TV Lich', score: 35 } },
    { id: 'r3', state: 'live', nr: '#3', section: 'Gruppe B', time: '09:00', column: 'h3', heim: { name: 'SV Aschaffenburg', score: 12 }, gast: { name: 'MTV Ansbach', score: 10 } },
    { id: 'r4', state: 'scheduled', nr: '#4', section: 'Gruppe A', time: '09:30', column: 'h1', heim: { name: 'TSV Tröster', own: true }, gast: { name: 'TV Lich' } },
    { id: 'r5', state: 'cancelled', nr: '#5', section: 'Gruppe A', time: '09:30', column: 'h2', heim: { name: 'USC Heidelberg' }, gast: { name: 'BG Zirndorf' }, note: 'Halle gesperrt' },
    { id: 'r6', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00', column: 'h1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
    { id: 'r7', state: 'bye', time: '09:30', heim: { name: 'SV Aschaffenburg' } },
  ];
  const hallen = [
    { id: 'h1', label: 'Sporthalle Breitengüßbach' },
    { id: 'h2', label: 'Frankenhalle Zirndorf' },
    { id: 'h3', label: 'Feld 3' },
  ];
</script>

<div style="padding: 24px; max-width: 1100px;">
  {#if preset === 'mannschaft'}
    <ScheduleTable games={mannschaft} {density} title="Spielplan" meta="5 Spiele" caption="Spielplan der Mannschaft" />
  {:else if preset === 'liga'}
    <ScheduleTable games={liga} {density} caption="Spielplan der Liga" />
  {:else if preset === 'turnier'}
    <ScheduleTable games={turnier} layout="columns" {density} title="Spielplan" meta="7 Spiele · Ende ca. 12:10" caption="Turnier-Spielplan">
      {#snippet notice(game)}
        {#if game.id === 't6'}<span class="dss-chip dss-chip--warn">Sperrzeit</span>{/if}
      {/snippet}
    </ScheduleTable>
  {:else}
    <ScheduleGrid
      games={rasterGames}
      columns={hallen}
      breaks={[{ time: '10:15', label: 'Mittagspause' }]}
      {density}
      title="Zeitraster"
      meta="Samstag, 10.10.2026"
      caption="Turnier-Tagesplan"
    />
  {/if}
</div>
```

- [ ] **Step 2: Stories schreiben**

Create `stories/ScheduleTable.stories.ts`:

```ts
import ScheduleDemo from './components/ScheduleDemo.svelte';

export default {
  title: 'Components/ScheduleTable',
  component: ScheduleDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Spielplan als Tabelle.** Eine Zeile pro Spiel, nach Spieltag oder Runde gruppiert.

- \`layout="versus"\` (Standard): „Heim – Gast“ in einer Zelle, Liga als Unterzeile, Ergebnis rechts.
- \`layout="opponent"\`: Perspektive einer Mannschaft mit Chip **vs.**/**@**, Logo, Gegner, S/N-Chip, Ergebnis *eigene : Gegner*.
- \`layout="columns"\`: Turnier-Ansicht mit Nr, Zeit, Feld, Heim, Ergebnis, Gast; Slots \`time\` und \`notice\`.
- Zustände: geplant, live (grüner Puls hinter der Uhrzeit), beendet, abgesagt, verlegt, Freilos; vorläufige Ergebnisse.
- Unter 640 px wird jede Zeile zur Karte.
        `.trim(),
      },
    },
  },
  argTypes: {
    preset: { control: 'inline-radio', options: ['mannschaft', 'liga', 'turnier'] },
    density: { control: 'inline-radio', options: [undefined, 'touch', 'default', 'compact'] },
  },
  args: { preset: 'mannschaft' },
};

export const Mannschaft = { args: { preset: 'mannschaft' } };
export const LigaUndHalle = { args: { preset: 'liga' } };
export const Turnier = { args: { preset: 'turnier' } };
```

Create `stories/ScheduleGrid.stories.ts`:

```ts
import ScheduleDemo from './components/ScheduleDemo.svelte';

export default {
  title: 'Components/ScheduleGrid',
  component: ScheduleDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Zeitraster** für Turnier-Tagespläne und Hallenbelegung: Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten.

- Empfohlen: **höchstens drei Spalten** je Raster; darüber teilt die Anwendung auf (ein Raster je Hallen-Gruppe). Als Sicherung scrollt der Rahmen seitlich, die Zeitspalte bleibt stehen.
- \`column\` jedes Spiels muss zu einer Spalten-\`id\` passen, sonst erscheint das Spiel nicht.
- Pausen und Sperrzeiten über \`breaks\`, Freilos über ein Spiel mit \`state: 'bye'\`.
- Unter 640 px wird jede Anwurfzeit ein Block mit der Spalten-Beschriftung als Überschrift.
        `.trim(),
      },
    },
  },
  args: { preset: 'raster' },
};

export const Zeitraster = { args: { preset: 'raster' } };
export const Kompakt = { args: { preset: 'raster', density: 'compact' } };
```

- [ ] **Step 3: Abschnitt „Spielpläne“ in der Tabellen-Doku ergänzen**

Öffne `stories/docs/TablesDoc.svelte`, ergänze im bestehenden `<script>`-Block den Import `import ScheduleTable from '../../svelte/ScheduleTable.svelte';` und füge als **letzten** `<section class="spec-s">` vor `</SpecPage>` ein:

```svelte
  <!-- Spielpläne -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">Spielpläne</div>
      <div class="spec-title">
        <h2>Eine Zeile pro Spiel.</h2>
        <p>
          <b>ScheduleTable</b> setzt Spielpläne aus den vorhandenen Bausteinen zusammen: Dichte aus der Tabelle,
          Chips, Live-Grün und Ergebnis in Mono. Drei Spiel-Zellen: <code>versus</code> (Liga, Halle),
          <code>opponent</code> (Mannschaft mit vs./@) und <code>columns</code> (Turnier). Das Zeitraster
          <b>ScheduleGrid</b> zeigt parallele Spiele auf mehreren Hallen oder Feldern.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Mannschafts-Spielplan · opponent</div>
        <ScheduleTable
          caption="Beispiel Mannschafts-Spielplan"
          games={[
            { id: 'd1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV Jahn Freising', href: '#', score: 108 }, ownScore: 65 },
            { id: 'd2', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast', opponent: { name: 'Nürnberger Basketball Club', href: '#' } },
          ]}
        />
      </div>
    </div>
  </section>
```

- [ ] **Step 4: Vergleichsskript erweitern**

In `scripts/visual-compare.mjs` in der Konstante `TITLES` am Anfang des Arrays `'Components/ScheduleTable', 'Components/ScheduleGrid', ` ergänzen.

- [ ] **Step 5: Build und Stories prüfen**

Run: `npx storybook build -o storybook-static --quiet 2>&1 | tail -3`
Expected: `Storybook build completed successfully`

Run: `node -e "const i=require('./storybook-static/index.json');console.log(Object.values(i.entries).filter(e=>/schedule/i.test(e.id)).map(e=>e.id).join('\n'))"`
Expected: Zeilen mit `components-scheduletable--mannschaft`, `components-scheduletable--liga-und-halle`, `components-scheduletable--turnier`, `components-schedulegrid--zeitraster`, `components-schedulegrid--kompakt` (und die `--docs`-Einträge)

- [ ] **Step 6: Commit**

```bash
git add stories scripts/visual-compare.mjs
git commit -m "docs(schedule): stories, demo data and spec section

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Browserprüfung, README, Changelog, Spezifikation, Abschluss

**Files:**
- Modify: `README.md`, `CHANGELOG.md`
- Modify: `docs/superpowers/specs/2026-10-08-spielplan-design.md`

- [ ] **Step 1: Im Browser prüfen (beide Marken, Hell/Dunkel, Handy)**

Lege das Skript im Projektstamm als `.chk.mjs` an, führe es aus und lösche es danach:

```js
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const root=join(process.cwd(),'storybook-static');
const srv=createServer(async(q,r)=>{const u=new URL(q.url,'http://x').pathname;const f=join(root,u==='/'?'index.html':u);if(!existsSync(f)){r.writeHead(404).end();return}r.writeHead(200,{'content-type':T[extname(f)]??'application/octet-stream'});r.end(await readFile(f))});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));const port=srv.address().port;
const b=await chromium.launch();
const stories=['components-scheduletable--mannschaft','components-scheduletable--liga-und-halle','components-scheduletable--turnier','components-schedulegrid--zeitraster'];
for(const id of stories) for(const [w,brand,theme] of [[1100,'bbv','light'],[1100,'dbb','dark'],[420,'bbv','light']]){
  const p=await b.newPage({viewport:{width:w,height:900}});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:${port}/iframe.html?id=${id}&viewMode=story&globals=brand:${brand}`,{waitUntil:'networkidle'});
  await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
  await p.waitForTimeout(300);
  const info=await p.evaluate(()=>{const frame=document.querySelector('.dss-frame');return {rows:document.querySelectorAll('tbody tr').length,overflowX:frame.scrollWidth>frame.clientWidth+1,live:document.querySelectorAll('.dss-match-live').length}});
  console.log(id,w,brand,theme,JSON.stringify(info),errors.length?('FEHLER '+errors[0]):'');
  await p.screenshot({path:`.visual-${id}-${w}-${brand}.png`,fullPage:true});
  await p.close();
}
await b.close();srv.close();
```

Run: `node .chk.mjs`
Expected: keine `FEHLER`-Zeilen; `overflowX` ist bei 1100 px `false`, bei 420 px für die Tabellen ebenfalls `false` (das Raster darf bei 420 px nicht überlaufen, weil es zu Blöcken wird); `live` ist größer als 0 bei Liga, Turnier und Raster.

Sieh dir die Screenshots für Handy (420) und die DBB-Marke an und prüfe: Live-Hinweis hinter der Uhrzeit, Ergebnisspalte ohne Versatz, Gruppenzeilen nicht überlagert, Zeitspalte im Raster lesbar. Danach: `rm -f .chk.mjs .visual-*.png`

- [ ] **Step 2: README ergänzen**

In `README.md` direkt vor dem Abschnitt `## Accessibility` einen Abschnitt `## Spielplan` einfügen:

````markdown
## Spielplan

Zwei Bausteine für Spielpläne (Vanilla-Klassen, Svelte, React), gemeinsames Datenmodell `ScheduleGame`
(Typen in `js/schedule.d.ts`, Hilfsfunktionen in `js/schedule.js`, Export `@bbv/dss-design-system/schedule.js`).

- **`ScheduleTable`:** Tabelle, eine Zeile pro Spiel, nach `section` gruppiert. Layouts: `versus` (Heim – Gast, Liga,
  Halle), `opponent` (Perspektive einer Mannschaft mit Chip vs./@, Logo, S/N-Chip, Ergebnis *eigene : Gegner*),
  `columns` (Turnier mit Nr, Zeit, Feld, Heim, Ergebnis, Gast). Slots `time` und `notice`.
- **`ScheduleGrid`:** Zeitraster, Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten; empfohlen höchstens drei
  Spalten je Raster, `column` eines Spiels muss zu einer `columns[].id` passen. `breaks` für Pausen.
- Zustände: `scheduled`, `live` (grüner Puls hinter der Uhrzeit), `finished`, `cancelled`, `postponed`, `bye`;
  `provisional` für vorläufige Ergebnisse. Texte (Datum, Zeit) kommen fertig formatiert von der App.
- Unter 640 px werden Zeilen zu Karten (Tabelle) bzw. Anwurfzeiten zu Blöcken (Raster).

```tsx
<ScheduleTable
  games={[{ id: '1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim',
            opponent: { name: 'TSV Jahn Freising', href: '/teams/freising', score: 108 }, ownScore: 65 }]}
/>
```

Zuordnung Turnier-Manager: `Game` wird zu `ScheduleGame` mit `nr: '#' + gameNumber`, `time: scheduledStart + '–' + scheduledEnd`,
`field: 'F' + field`, `heim`/`gast` aus den Teams (Platzhalter über `homeLabel`/`awayLabel` mit `placeholder: true`),
`state: 'bye'` bei `byeTeamId`, `state: 'cancelled'` bei `cancelledReason`.
````

- [ ] **Step 3: Changelog ergänzen**

In `CHANGELOG.md` im Block `## [Unveröffentlicht]` unter `### Neu` ergänzen:

```markdown
- **Spielplan:** `ScheduleTable` (Tabelle mit den Layouts `versus`, `opponent`, `columns`) und `ScheduleGrid` (Zeitraster) in
  Vanilla-CSS, Svelte und React, mit gemeinsamem Datenmodell `ScheduleGame` und Hilfsfunktionen in `js/schedule.js`.
  Zustände geplant, live, beendet, abgesagt, verlegt, Freilos; Handy-Karten; Slots für bearbeitbare Zeit und
  Konflikt-Hinweis. Stories unter `Components/ScheduleTable` und `Components/ScheduleGrid`.
```

- [ ] **Step 4: Spezifikation an die Umsetzung angleichen**

In `docs/superpowers/specs/2026-10-08-spielplan-design.md`:
1. Alle Angaben „44 px“ und „36 px“ zu den Zeilenhöhen durch „48 px“ und „40 px“ ersetzen (`touch` 60, `default` 48, `compact` 40).
2. Bei „Barrierefreiheit“ von Variante A den Satz „Das Ergebnis trägt ein `aria-label`: …“ ersetzen durch: „Das Ergebnis wird als unsichtbarer Text (`dss-sr-only`) gesprochen, das sichtbare Ergebnis ist `aria-hidden`:“ (die Beispieltexte bleiben).
3. Bei Variante B ergänzen: „`ScheduleGrid` nutzt nur die Gegenüberstellung (`heim`, `gast`), nicht die Perspektive.“ und „Spiele, deren `column` zu keiner Spalte passt, erscheinen nicht.“

- [ ] **Step 5: Gesamtprüfung**

Run: `npx vitest run`
Expected: alle Tests grün

Run: `npm run typecheck && npm run build:react`
Expected: Exit 0, `DTS Build success`

Run: `npm run visual:after && npm run visual:compare`
Expected: Es gibt kein vorheriges „before“ für die neuen Stories, sie erscheinen nicht im Vergleich; die übrigen Stories sind `gleich` (Das Skript meldet „Keine Abweichungen“ oder nur die neuen Dateien). Wenn der Ordner `.visual/before` fehlt, zuerst `git stash -u && npm run visual:before && git stash pop` ausführen und danach `visual:after` und `visual:compare`.

- [ ] **Step 6: Commit und Push**

```bash
git add README.md CHANGELOG.md docs/superpowers/specs/2026-10-08-spielplan-design.md
git commit -m "docs(schedule): README, changelog and spec aligned with implementation

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git push origin main
```

Expected: Push erfolgreich; das Workflow „Deploy Storybook to GitHub Pages“ läuft grün.

---

## Selbstprüfung (gegen die Spezifikation)

| Anforderung der Spezifikation | Task |
|---|---|
| Datenmodell `ScheduleGame`, Regeln (`opponent`/`at`, `bye`, `outcome`, `column`) | 1 |
| A: drei Layouts, Standard-Ableitung (`layoutFor`, `densityFor`) | 1, 4, 5 |
| A: Spalten je Layout, Datenspalten nur bei Daten | 1 (`columnsFor`), 4, 5 |
| A: Zeit ein- und zweizeilig, Gruppenzeilen, `is-own`, Hover, Feld-Chip mit Ellipsis | 3, 4, 5 |
| A: Zustände live (grün, hinter Uhrzeit), finished, provisional, cancelled, postponed, bye | 3, 4, 5 |
| A: Handy-Karten mit `role`-Attributen | 3, 4, 5, 10 (Browserprüfung) |
| A: Barrierefreiheit (Tabelle, Ergebnis-Text, Fokus) | 4 (axe), 5 |
| A: Slots `time`, `notice`, `renderLink` | 4, 5 (Svelte hat keinen `renderLink`, wie `AppNav`) |
| B: Spalten, Zeitzeilen aus Daten, `slots`, `breaks`, Freilos, leere Zellen | 1 (`buildGrid`), 7, 8 |
| B: freie Hallen- und Feldnamen, Umbruch in Köpfen und Handy-Chip | 6, 7 |
| B: seitliches Scrollen mit fester Zeitspalte, Handy-Blöcke | 6, 10 |
| Struktur: Dateien, Exporte, Manifest | 1, 2, 4, 5, 7, 8 |
| Tests: Unit, React, CSS, Parität, visuell | 1, 3, 4, 6, 7, 5/8, 10 |
| Doku: `Docs/Tables`, Stories, README (inkl. Zuordnung Turnier-Manager), Changelog | 9, 10 |
| Bewusst nicht dabei (Druck, Filter-Tabs, Logo-Laden, Datumsformat) | nicht enthalten, wie vorgesehen |

**Typkonsistenz:** `ScheduleGame`, `ScheduleTeam`, `ScheduleLayout`, `ScheduleDensity`, `ScheduleGridColumn`, `ScheduleBreak` und alle Funktionen (`outcome`, `resolveOutcome`, `winnerSide`, `hasScore`, `layoutFor`, `densityFor`, `columnsFor`, `startMinutes`, `slotsFromGames`, `groupBySection`, `initials`, `ariaForResult`, `buildGrid`) sind in Task 1 definiert und werden in den Tasks 2 bis 9 unter denselben Namen verwendet. CSS-Klassen stimmen zwischen Markup (Tasks 4, 5, 7, 8) und CSS (Tasks 3, 6) überein: `dss-sch-*` (A) und `dss-sg-*`, `dss-sgrid` (B).

**Bekannter Prüfpunkt während der Umsetzung:** Die `role`-Attribute können unter axe einen `aria-allowed-role`-Verstoß auslösen. Vorgehen steht in Task 4, Step 5.
