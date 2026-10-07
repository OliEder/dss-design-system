// @vitest-environment node
// (unter jsdom liefert das globale URL-Objekt eine Variante, die readFileSync(new URL(...)) ablehnt)
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

type Entry = { svelte: string; react: string; css: string[] };

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('parity.manifest.json', root), 'utf8')) as Record<string, Entry>;
const css = readFileSync(new URL('css/components.css', root), 'utf8');
const indexTs = readFileSync(new URL('react/index.ts', root), 'utf8');

// Bestehende Svelte-Komponenten ohne React-Version. Diese Liste darf nur kürzer werden:
// Jede NEUE Komponente muss ins Manifest (Svelte + CSS + React) — sonst schlägt der Test fehl.
const PENDING_REACT = [
  'PlayByPlay',
  'PlayerCard',
];

describe.each(Object.entries(manifest))('Parität: %s', (name, entry) => {
  it('hat eine Svelte-Version', () => {
    expect(existsSync(new URL(entry.svelte, root))).toBe(true);
  });

  it('hat eine React-Version, die aus react/index.ts exportiert wird', () => {
    expect(existsSync(new URL(entry.react, root))).toBe(true);
    expect(indexTs).toMatch(new RegExp(`\\b${name}\\b[^;]*from '\\./${name}'`));
  });

  it.each(entry.css)('definiert die CSS-Klasse .%s', (cls) => {
    expect(new RegExp(`\\.${cls}(?![\\w-])`).test(css)).toBe(true);
  });
});

describe('Parität: Vollständigkeit', () => {
  it('jede Svelte-Komponente steht im Manifest oder ist als PENDING_REACT vermerkt', () => {
    const svelteComponents = readdirSync(new URL('svelte/', root))
      .filter((file) => file.endsWith('.svelte'))
      .map((file) => file.replace('.svelte', ''));
    const known = new Set([...Object.keys(manifest), ...PENDING_REACT]);
    expect(svelteComponents.filter((name) => !known.has(name))).toEqual([]);
  });

  it('PENDING_REACT enthält nichts, was bereits im Manifest steht', () => {
    expect(PENDING_REACT.filter((name) => name in manifest)).toEqual([]);
  });
});
