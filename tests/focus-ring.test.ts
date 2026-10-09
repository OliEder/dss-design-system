// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const tokens = readFileSync(new URL('../tokens/tokens.css', import.meta.url), 'utf8');
const css = readFileSync(new URL('../css/components.css', import.meta.url), 'utf8');

describe('Fokus-Ring: gestrichelt, Gold/Amber', () => {
  it('tokens.css definiert --ring-style: dashed und --ring-color-on-dark', () => {
    expect(tokens).toMatch(/--ring-style:\s*dashed;/);
    expect(tokens).toMatch(/--ring-color-on-dark:/);
  });

  it('components.css hat keinen durchgezogenen Ring mehr', () => {
    expect(css).not.toMatch(/solid\s+var\(--ring-color\)/);
  });

  it('kein Ring über box-shadow (kann nicht gestrichelt sein)', () => {
    expect(css).not.toMatch(/box-shadow:[^;]*var\(--ring-w\)\s+var\(--ring-color\)/);
  });

  it('jede outline-Deklaration mit --ring-w nutzt auch --ring-style', () => {
    const decls = css.match(/outline:[^;}]*;?/g) ?? [];
    const rings = decls.filter((d) => d.includes('--ring-w'));
    expect(rings.length).toBeGreaterThan(10);
    for (const d of rings) expect(d).toContain('var(--ring-style)');
  });

  it('dunkle Flächen nutzen --ring-color-on-dark', () => {
    expect(css).toMatch(/\.dss-appnav--dark[^{]*:focus-visible[^{]*\{\s*outline-color:\s*var\(--ring-color-on-dark\)/);
  });

  it('Eingabegruppe, Select und Checkbox haben einen gestrichelten Fokus-Ring', () => {
    const ring = 'outline:\\s*var\\(--ring-w\\)\\s+var\\(--ring-style\\)\\s+var\\(--ring-color\\)';
    expect(css).toMatch(new RegExp('\\.dss-input-group:focus-within\\s*\\{[^}]*' + ring));
    expect(css).toMatch(new RegExp('\\.dss-select:focus-visible[^{]*\\{[^}]*' + ring));
    expect(css).toMatch(new RegExp('\\.dss-check-input:focus-visible\\s*\\{[^}]*' + ring));
  });
});
