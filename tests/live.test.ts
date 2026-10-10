// @vitest-environment node
// Live-Stil (Paket 2): Tokens, Kontraste, eine Animation, reduced-motion, kein Rot für Live.
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { blockOf, color, hex, ratio } from './helpers/color';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('css/components.css');
const tokens = read('tokens/tokens.css');

const AAA = 7;
const NON_TEXT = 3;

// Die drei Token-Blöcke (Hell, Dunkel per Media-Query, Dunkel per data-theme)
const blocks = {
  Hell: blockOf(css, '/* ── Semantische Aliase · Light'),
  'Dunkel (Media-Query)': blockOf(css, ':root:not([data-theme="light"]) {\n    --dss-fg'),
  'Dunkel (data-theme)': blockOf(css, ':root[data-theme="dark"] {\n  --dss-fg'),
};
const dbb = blockOf(tokens, ':root[data-brand="dbb"] {');

describe('Live-Tokens stehen in allen drei Blöcken', () => {
  it.each(Object.entries(blocks))('%s definiert --live-fill, --dss-live-fg und --dss-live-fg-on-dark', (_name, block) => {
    for (const name of ['--live-fill', '--dss-live-fg', '--dss-live-fg-on-dark']) {
      expect(block).toMatch(new RegExp(`${name}\\s*:`));
    }
  });
});

describe('Live-Kontraste (Text ≥ 7:1, Punkt/Fläche ≥ 3:1)', () => {
  // Flächen je Theme und Marke: Seite, flache Fläche, Hover, Auswahl
  const scopes = (block: string) => ({ BBV: `${block}\n${tokens}`, DBB: `${block}\n${dbb}\n${tokens}` });
  const surfaces = ['--dss-surface', '--dss-surface-2', '--dss-hover-bg', '--dss-selected-bg'];
  // Hinweis: der Dunkel-Block setzt --h-signal nicht selbst, die Marke liefert ihn (tokens.css)
  const withHue = (scope: string, brand: 'BBV' | 'DBB') => `--h-signal: var(${brand === 'BBV' ? '--h-amber' : '--h-gold'});\n${scope}`;

  for (const [name, block] of Object.entries(blocks)) {
    for (const [brand, scope0] of Object.entries(scopes(block)) as ['BBV' | 'DBB', string][]) {
      const scope = withHue(scope0, brand);
      it(`${name}, ${brand}: --dss-live-fg ≥ 7:1 und --live-fill ≥ 3:1 auf allen Seitenflächen`, () => {
        const fg = color('var(--dss-live-fg)', scope);
        const fill = color('var(--live-fill)', scope);
        for (const surface of surfaces) {
          const bg = color(`var(${surface})`, scope);
          expect(ratio(fg, bg), `${surface} Text`).toBeGreaterThanOrEqual(AAA);
          expect(ratio(fill, bg), `${surface} Punkt`).toBeGreaterThanOrEqual(NON_TEXT);
        }
      });

      it(`${name}, ${brand}: --dss-live-fg-on-dark ≥ 7:1 und --live-fill ≥ 3:1 auf Schwarz, Anthrazit #191919 und Frame dunkel`, () => {
        const onDark = color('var(--dss-live-fg-on-dark)', scope);
        const fill = color('var(--live-fill)', scope);
        const darks = [color('var(--base-1000)', scope), hex('#191919'), color('var(--n-1000)', scope), color('var(--n-950)', scope)];
        for (const bg of darks) {
          expect(ratio(onDark, bg)).toBeGreaterThanOrEqual(AAA);
          expect(ratio(fill, bg)).toBeGreaterThanOrEqual(NON_TEXT);
        }
      });
    }
  }

  it('Grün bleibt Grün: Farbton 150 wie --ok-fill', () => {
    for (const block of Object.values(blocks)) {
      for (const name of ['--live-fill', '--dss-live-fg-on-dark']) {
        expect(block).toMatch(new RegExp(`${name}:\\s*oklch\\([\\d.]+ [\\d.]+ 150\\)`));
      }
    }
    expect(blocks.Hell).toMatch(/--dss-live-fg:\s*var\(--ok-text\)/);
  });
});

const ruleBody = (selector: string) => {
  const found = css.indexOf(`\n${selector} {`);
  expect(found, selector).toBeGreaterThan(-1);
  return css.slice(found, css.indexOf('}', found));
};

describe('Live-Stellen sprechen Grün, Rot bleibt Fehlern vorbehalten', () => {
  const LIVE_RULES = [
    '.dss-live', '.dss-live-dot', '.dss-match-live', '.dss-match-pulse', '.dss-match--live', '.dss-match--live::before',
    '.dss-pbp-live', '.dss-pbp-dot', '.dss-topbar-live', '.dss-topbar-live::before', '.dss-crumb-dot', '.dss-sch-live',
  ];
  it.each(LIVE_RULES)('%s nutzt weder --err-fill noch --err-text noch Chip-Rot', (selector) => {
    expect(ruleBody(selector)).not.toMatch(/--err-|--dss-chip-err|oklch\([\d.]+ [\d.]+ 27\)/);
  });

  it('Text nutzt --dss-live-fg (auf immer dunklen Flächen --dss-live-fg-on-dark), Punkte --live-fill', () => {
    expect(ruleBody('.dss-match-live')).toMatch(/color:\s*var\(--dss-live-fg\)/);
    expect(ruleBody('.dss-pbp-live')).toMatch(/color:\s*var\(--dss-live-fg\)/);
    expect(ruleBody('.dss-pbp-frame--dark .dss-pbp-live')).toMatch(/color:\s*var\(--dss-live-fg-on-dark\)/);
    expect(ruleBody('.dss-topbar-live')).toMatch(/color:\s*var\(--dss-live-fg-on-dark\)/);
    for (const dot of ['.dss-match-pulse', '.dss-pbp-dot', '.dss-topbar-live::before', '.dss-crumb-dot', '.dss-live-dot']) {
      expect(ruleBody(dot)).toMatch(/background:\s*var\(--live-fill\)/);
    }
  });

  it('laufende Ergebniszahlen sind grün (Spielplan-Zeile, Raster-Zelle, Spielkarte)', () => {
    const rule = css.match(/\.dss-sch-row\.is-live \.dss-sch-score,\s*\.dss-sg-game\.is-live \.dss-sch-score,\s*\.dss-match--live \.dss-match-score\s*\{\s*color:\s*var\(--dss-live-fg\)/);
    expect(rule).not.toBeNull();
  });

  it('Rahmen und Balken der Live-Spielkarte nutzen --live-fill', () => {
    expect(ruleBody('.dss-match--live')).toMatch(/border-color:\s*var\(--live-fill\)/);
    expect(ruleBody('.dss-match--live::before')).toMatch(/background:\s*var\(--live-fill\)/);
  });
});

describe('Eine Animation für alles Live', () => {
  const keyframes = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
  const pulsing = css.match(/\n((?:[^{}\n]*,\n)*[^{}\n]*)\{\s*animation:\s*dss-live-pulse 1\.6s ease-in-out infinite;\s*\}/);

  it('dss-live-pulse gibt es genau einmal, die alten Einzel-Animationen sind weg', () => {
    expect(keyframes.filter((name) => name === 'dss-live-pulse')).toHaveLength(1);
    for (const old of ['dss-mc-pulse', 'dss-pbp-pulse', 'dss-tb-pulse', 'dss-pulse']) {
      expect(keyframes).not.toContain(old);
      expect(css).not.toContain(old);
    }
  });

  it('nur die Deckkraft ändert sich: 1 → 0,35 → 1, nie darunter', () => {
    const body = css.match(/@keyframes dss-live-pulse\s*\{([^@]*?\}\s*)\}/)![1];
    expect(body).toMatch(/0%,\s*100%\s*\{\s*opacity:\s*1;\s*\}/);
    expect(body).toMatch(/50%\s*\{\s*opacity:\s*0\.35;\s*\}/);
    expect(body).not.toMatch(/transform|box-shadow|scale|translate|color|background/);
    const values = [...body.matchAll(/opacity:\s*([\d.]+)/g)].map((m) => Number(m[1]));
    expect(Math.min(...values)).toBeGreaterThanOrEqual(0.35);
  });

  it('1,6 s je Durchlauf: unter 1 Hz (WCAG 2.3.1) und kein harter Wechsel (ease-in-out)', () => {
    expect(pulsing).not.toBeNull();
    expect(1 / 1.6).toBeLessThan(1);
  });

  const selectorList = (text: string) => text.split(',').map((x) => x.trim()).filter(Boolean).sort();

  it('jede Live-Animation (Punkte, Ergebniszahlen, Utility) steht in der gemeinsamen Regel', () => {
    const list = selectorList(pulsing![1]);
    for (const selector of [
      '.dss-live-pulse', '.dss-live-dot', '.dss-match-pulse', '.dss-pbp-dot', '.dss-crumb-dot', '.dss-topbar-live::before',
      '.dss-sch-row.is-live .dss-sch-score', '.dss-sg-game.is-live .dss-sch-score', '.dss-match--live .dss-match-score',
    ]) {
      expect(list).toContain(selector);
    }
  });

  it('bei prefers-reduced-motion: reduce setzt dieselbe Liste animation: none', () => {
    const media = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{\s*\n((?:[^{}\n]*,\n)*[^{}\n]*)\{\s*animation:\s*none;\s*\}\s*\}/);
    expect(media).not.toBeNull();
    expect(selectorList(media![1])).toEqual(selectorList(pulsing![1]));
  });

  it('keine andere Regel gibt Live-Elementen eine eigene Animation', () => {
    const decls = [...css.matchAll(/animation:\s*([^;}]+)/g)].map((m) => m[1].trim());
    const live = decls.filter((d) => /pulse/.test(d));
    expect(live).toEqual(['dss-live-pulse 1.6s ease-in-out infinite']);
  });
});

describe('Nie nur Farbe: das Wort „Live“ bzw. „läuft“ bleibt', () => {
  it.each([
    ['svelte/TopBar.svelte', />Live</],
    ['react/TopBar.tsx', />Live</],
    ['svelte/MatchCard.svelte', /Live · /],
    ['react/MatchCard.tsx', /Live · /],
    ['svelte/PlayByPlay.svelte', /<\/span> Live</],
    ['react/PlayByPlay.tsx', /Live\s*<\/span>/],
    ['svelte/Table.svelte', /<\/span> Live</],
    ['react/Table.tsx', /Live\s*<\/span>|\/> Live/],
    ['svelte/ScheduleTable.svelte', /<\/span> Live</],
    ['react/ScheduleParts.tsx', /\/> Live/],
  ])('%s zeigt das Wort', (path, pattern) => {
    expect(read(path)).toMatch(pattern);
  });

  it('Screenreader-Ergebnis sagt „läuft“', () => {
    expect(read('js/schedule.js')).toContain("'läuft'");
  });
});
