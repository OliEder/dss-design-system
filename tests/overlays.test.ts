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

  it('Titel ist eine h2 wie in der React-Fassung (h4 sprang in der Gliederung)', () => {
    expect(modal).toMatch(/<h2 class="dss-m-title"/);
  });
});

describe('Banner-Link im Dunkelmodus', () => {
  it('Fokus-Ring nimmt die Textfarbe (der dezente Dunkel-Ring hat auf dem Banner unter 3:1)', () => {
    expect(css).toMatch(/:root\[data-theme="dark"\] \.dss-banner a:focus-visible\s*\{\s*outline-color:\s*currentColor/);
    expect(css).toMatch(/:root:not\(\[data-theme="light"\]\) \.dss-banner a:focus-visible\s*\{\s*outline-color:\s*currentColor/);
  });
});
