// @vitest-environment node
// Karten (Paket 4): PlayerCard mit Foto, Spielabschnitte, TeamCard. CSS-Regeln, Markup-Quelltext, Standardwerte.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { blockOf, color, hex, over, ratio } from './helpers/color';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');
const css = read('css/components.css');
const tokens = read('tokens/tokens.css');
const rule = (selector: string) => {
  const found = css.indexOf(`\n${selector} {`);
  return found < 0 ? '' : css.slice(found + 1, css.indexOf('}', found + 1));
};
const px = (text: string, prop: string) => Number(text.match(new RegExp(`${prop}:\\s*(\\d+)px`))![1]);

describe('PlayerCard mit Foto: CSS', () => {
  it('Avatar 32 px (compact) = Trikotmarke 32 px: die Zeilenhöhe wächst nicht; standard 64 px', () => {
    expect(px(rule('.dss-pc-av'), 'width')).toBe(px(rule('.dss-tn.small'), 'width'));
    expect(px(rule('.dss-pc-av'), 'height')).toBe(px(rule('.dss-tn.small'), 'height'));
    expect(px(rule('.dss-pc-av--lg'), 'width')).toBe(px(rule('.dss-tn.large'), 'width'));
    expect(px(rule('.dss-pc-av--lg'), 'height')).toBe(64);
  });

  it('Foto: cover, oben ausgerichtet (Gesicht), compact rund, standard abgerundet wie die Trikotmarke', () => {
    expect(rule('.dss-pc-img')).toMatch(/object-fit:\s*cover/);
    expect(rule('.dss-pc-img')).toMatch(/object-position:\s*center top/);
    expect(rule('.dss-pc-av .dss-pc-img')).toMatch(/border-radius:\s*50%/);
    expect(rule('.dss-pc-av--lg .dss-pc-img')).toMatch(/border-radius:\s*14px/);
  });

  it('die Trikotnummer ist ein Badge an der Ecke und behält die Teamfarbe (weiß auf Teamfarbe, ≥ 7:1)', () => {
    const badge = rule('.dss-tn.dss-tn--badge');
    expect(badge).toMatch(/position:\s*absolute/);
    expect(badge).toMatch(/bottom:\s*-\d+px/);
    expect(rule('.dss-tn.heim')).toMatch(/color:\s*white/);
    expect(rule('.dss-tn.gast')).toMatch(/color:\s*white/);
  });

  it('hero mit Foto: Porträtfläche mit Verlauf nach --base-1000; unter 560 px Banner oben', () => {
    expect(rule('.dss-pc-hero--photo')).toMatch(/padding:\s*0/);
    expect(rule('.dss-pc-hero--photo .dss-pc-hero-left::after')).toMatch(/linear-gradient\(90deg, transparent \d+%, var\(--base-1000\)/);
    expect(rule('.dss-pc-hero--photo .dss-pc-img')).toMatch(/position:\s*absolute/);
    const mobile = css.slice(css.indexOf('@media (max-width: 560px)', css.indexOf('.dss-pc-hero--photo')));
    expect(mobile).toMatch(/\.dss-pc-hero--photo \.dss-pc-hero-left::after \{ background: linear-gradient\(180deg/);
    expect(mobile).toMatch(/\.dss-pc-hero--photo \.dss-pc-hero-right \{ margin-top: -48px/);
  });

  it('weißer Name über dem Bild: auch bei einem weißen Foto unter dem Verlauf (92 % Deckkraft) ≥ 7:1, beide Marken', () => {
    const white = hex('#ffffff');
    const dbb = blockOf(tokens, ':root[data-brand="dbb"] {');
    for (const scope of [tokens, `${dbb}\n${tokens}`]) {
      const base = color('var(--base-1000)', scope);
      expect(ratio(white, over(white, base, 0.08))).toBeGreaterThanOrEqual(7);
    }
    expect(css).toMatch(/color-mix\(in srgb, var\(--base-1000\) 92%, transparent\)/);
  });
});

describe('PlayerCard mit Foto: Quelltext', () => {
  const sources = ['svelte/PlayerCard.svelte', 'react/PlayerCard.tsx'];

  it.each(sources)('%s: Standard photo und photoAlt leer', (path) => {
    expect(read(path)).toMatch(/photo = '',\s*photoAlt = '',/);
  });

  it.each(sources)('%s: Bild dekorativ per photoAlt, lazy, async, mit Maßen', (path) => {
    const source = read(path);
    expect(source).toMatch(/alt=\{photoAlt\}/);
    expect(source).toContain('loading="lazy"');
    expect(source).toContain('decoding="async"');
    expect(source).toMatch(/width=\{imgSize\}\s+height=\{imgSize\}/);
  });

  it.each(sources)('%s: Ladefehler-Rückfall (onerror) und Prüfung auf leeres photo', (path) => {
    const source = read(path);
    expect(source).toMatch(/Boolean\(photo\) && photo !== failedUrl/);
    expect(source).toMatch(/onerror=\{\(\) => \(failedUrl = photo\)\}|onError=\{\(\) => setFailedUrl\(photo\)\}/);
  });

  it('Svelte-Datei hat kein <style>', () => {
    expect(read('svelte/PlayerCard.svelte')).not.toContain('<style');
  });
});

describe('Demo-Fotos', () => {
  const dir = new URL('stories/assets/players/', root);
  const files = readdirSync(dir).filter((name) => name.endsWith('.jpg'));

  it('6 bis 10 Fotos, je unter 60 KB, mit Credits', () => {
    expect(files.length).toBeGreaterThanOrEqual(6);
    expect(files.length).toBeLessThanOrEqual(10);
    for (const name of files) expect(statSync(new URL(name, dir)).size, name).toBeLessThan(60 * 1024);
    const credits = read('stories/assets/players/CREDITS.md');
    expect(credits).toContain('https://unsplash.com/license');
    for (const name of files) expect(credits, name).toContain(name);
  });

  it('quadratisch, höchstens 480 px (JPEG-Kopf)', () => {
    for (const name of files) {
      const data = readFileSync(new URL(name, dir));
      let offset = 2;
      let size: [number, number] | undefined;
      while (offset < data.length) {
        const marker = data[offset + 1];
        if (marker >= 0xc0 && marker <= 0xc3) {
          size = [data.readUInt16BE(offset + 7), data.readUInt16BE(offset + 5)];
          break;
        }
        offset += 2 + data.readUInt16BE(offset + 2);
      }
      expect(size?.[0], name).toBe(size?.[1]);
      expect(size![0], name).toBeLessThanOrEqual(480);
    }
  });

  it('das lokale Ordner images/ wird nirgends referenziert und das Paket veröffentlicht stories/ nicht', () => {
    const pkg = JSON.parse(read('package.json')) as { files: string[] };
    expect(pkg.files.some((entry) => entry.startsWith('stories'))).toBe(false);
    for (const path of ['stories/components/CardLibraryExamples.svelte', 'stories/components/CardLibraryPlayground.svelte', 'stories/CardLibrary.code.ts']) {
      expect(read(path)).not.toMatch(/\.\.\/images\/|['"]images\//);
    }
  });
});

describe('Spielabschnitte: Paket, Quelltext, Demo-Daten', () => {
  it('package.json exportiert ./periods.js mit Typen wie ./schedule.js', () => {
    const pkg = JSON.parse(read('package.json')) as { exports: Record<string, unknown>; files: string[] };
    expect(pkg.exports['./periods.js']).toEqual({ types: './js/periods.d.ts', import: './js/periods.js' });
    expect(pkg.files).toContain('js/');
    expect(read('js/periods.d.ts')).toContain('export function resolvePeriod');
  });

  it.each(['svelte/MatchCard.svelte', 'react/MatchCard.tsx', 'svelte/PlayByPlay.svelte', 'react/PlayByPlay.tsx'])('%s nutzt die gemeinsame Funktion und kennt periods (Standard 4)', (path) => {
    const source = read(path);
    expect(source).toContain("from '../js/periods.js'");
    expect(source).toContain('resolvePeriod(');
    expect(source).toMatch(/periods = 4/);
    expect(source).toContain('@deprecated');
  });

  it('der Alias quarter bleibt in beiden MatchCard-Fassungen', () => {
    expect(read('svelte/MatchCard.svelte')).toMatch(/quarter = '',/);
    expect(read('react/MatchCard.tsx')).toMatch(/quarter = '',/);
  });

  it('Demo-Daten, Beispiele und Code-Beispiele nutzen period statt quarter (außer der Beschreibung des Alias)', () => {
    const files = [
      'stories/components/CardLibraryExamples.svelte', 'stories/components/CardLibraryDemo.svelte', 'stories/components/pbpData.ts',
      'stories/components/PlayByPlayExamples.svelte', 'stories/PlayByPlay.code.ts', 'stories/CardLibrary.code.ts', 'stories/Foundation/Live.svelte',
    ];
    for (const path of files) expect(read(path), path).not.toMatch(/quarter(=|:\s*['"])/);
  });

  it('Doku nennt quarter als veraltet', () => {
    expect(read('stories/CardLibrary.mdx')).toMatch(/`quarter` ist veraltet/);
    expect(read('stories/PlayByPlay.mdx')).toMatch(/Veraltet, Alias/);
    expect(read('stories/CardLibrary.stories.ts')).toMatch(/Veraltet, nur bei `live`/);
  });
});
