// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const css = readFileSync(new URL('../css/components.css', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../svelte/Modal.svelte', import.meta.url), 'utf8');

function block(start: RegExp, end: RegExp): string {
  const from = css.search(start);
  const rest = css.slice(from);
  const to = rest.slice(1).search(end);
  return rest.slice(0, to + 1);
}

describe('Banner und Modal: Farben mit Dunkelmodus', () => {
  const area = block(/\/\* ── Banner/, /\/\* ── Tabs/);
  it('Regeln im Banner- und Modal-Block nutzen nicht die nackten --*-text-Tokens (ohne Dunkelmodus)', () => {
    expect(area).toContain('.dss-banner--danger');
    expect(area).not.toMatch(/var\(--(err|ok|warn|info)-text\)/);
  });
});

describe('Svelte-Modal: eindeutige Titel-id', () => {
  it('leitet die id aus $props.id() ab statt einer festen id', () => {
    expect(modal).toContain('$props.id()');
    expect(modal).not.toMatch(/id="dss-modal-title"/);
    expect(modal).toMatch(/aria-labelledby=\{titleId\}/);
  });
});
