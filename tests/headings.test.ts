// @vitest-environment node
import { readFileSync, readdirSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const read = (p: string) => readFileSync(new URL(p, import.meta.url), 'utf8');

// Komponenten mit Überschrift: Ebene wählbar (h2 | h3 | h4), Standard h3 (gedacht für einen Abschnitt unter einer h2).
const MIT_TITEL = ['ScheduleTable', 'ScheduleGrid', 'Table', 'PlayerCard', 'EmptyState', 'PlayByPlay'];

describe('Überschriftenebenen der Komponenten', () => {
  it('keine Komponente gibt eine h1 aus (die gehört der App)', () => {
    for (const dir of ['../svelte', '../react']) {
      const files = readdirSync(new URL(dir, import.meta.url)).filter((f) => /\.(svelte|tsx)$/.test(f) && !/\.test\./.test(f));
      for (const f of files) {
        const src = read(`${dir}/${f}`);
        expect(src, `${dir}/${f}`).not.toMatch(/<h1[\s>]|'h1'|"h1"/);
      }
    }
  });

  for (const name of MIT_TITEL) {
    it(`${name}: Svelte und React haben titleAs mit Standard h3`, () => {
      expect(read(`../svelte/${name}.svelte`)).toMatch(/titleAs = 'h3'/);
      expect(read(`../svelte/${name}.svelte`)).toMatch(/titleAs\?: 'h2' \| 'h3' \| 'h4'/);
      expect(read(`../react/${name}.tsx`)).toMatch(/titleAs: Heading = 'h3'/);
    });
  }

  it('Svelte ScheduleTable und ScheduleGrid setzen die Ebene über titleAs (keine feste h3)', () => {
    for (const name of ['ScheduleTable', 'ScheduleGrid']) {
      const src = read(`../svelte/${name}.svelte`);
      expect(src).toMatch(/<svelte:element this=\{titleAs\} class="dss-frame-title">/);
      expect(src).not.toMatch(/<h3 class="dss-frame-title">/);
    }
  });
});
