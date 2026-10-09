// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

// Kontrast-Untergrenzen (WCAG 2.1 AAA, Text ≥ 7:1) für Farbpaare, die per axe
// (color-contrast-enhanced) aufgefallen waren. Die Farben werden aus dem CSS gelesen.
const css = readFileSync(new URL('../css/components.css', import.meta.url), 'utf8');
const tokens = readFileSync(new URL('../tokens/tokens.css', import.meta.url), 'utf8');

type Rgb = [number, number, number];

// Löst eine Token-Definition in einem Block (z. B. `:root {`) zu einem Farbwert auf.
const blockOf = (src: string, head: string): string => {
  const start = src.indexOf(head);
  if (start < 0) throw new Error(`Block nicht gefunden: ${head}`);
  const open = src.indexOf('{', start);
  return src.slice(open + 1, src.indexOf('}', open));
};

const defOf = (src: string, name: string): string => {
  const m = src.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
  if (!m) throw new Error(`Token nicht gefunden: ${name}`);
  return m[1].trim();
};

const num = (expr: string, scope: string): number => {
  let e = expr.trim();
  const v = e.match(/^var\((--[\w-]+)\)$/);
  if (v) return num(defOf(scope, v[1]), scope);
  const c = e.match(/^calc\(\s*(.+?)\s*([+-])\s*([\d.]+)\s*\)$/);
  if (c) return num(c[1], scope) + (c[2] === '+' ? 1 : -1) * Number(c[3]);
  return Number(e);
};

const clamp = (x: number) => Math.min(1, Math.max(0, x));

const oklch = (L: number, C: number, h: number): Rgb => {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
};

// Löst `oklch(L C H)` (auch mit var()/calc() im Farbton) und `var(--token)` auf.
const color = (expr: string, scope: string): Rgb => {
  const e = expr.trim();
  const v = e.match(/^var\((--[\w-]+)\)$/);
  if (v) return color(defOf(scope, v[1]), scope);
  const o = e.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+(.+)\)$/);
  if (!o) throw new Error(`Keine oklch-Farbe: ${expr}`);
  return oklch(Number(o[1]), Number(o[2]), num(o[3], scope));
};

const lum = (c: Rgb) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
const ratio = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const hex = (h: string): Rgb =>
  [1, 3, 5].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  }) as Rgb;

const AAA = 7;
const root = tokens + '\n' + blockOf(css, ':root {');
const dbbScope = blockOf(tokens, ':root[data-brand="dbb"] {') + '\n' + tokens;

describe('AAA-Kontrast (≥ 7:1) der nachgezogenen Farbpaare', () => {
  it('Topbar „Live“-Text: ≥ 7:1 auf Schwarz und auf DBB-Anthrazit #191919', () => {
    const rule = css.match(/\.dss-topbar-live\s*\{[^}]*?color:\s*(oklch\([^)]+\))/);
    expect(rule).not.toBeNull();
    const fg = color(rule![1], root);
    expect(ratio(fg, color(defOf(tokens, '--ink-1000'), tokens))).toBeGreaterThanOrEqual(AAA);
    expect(ratio(fg, hex('#191919'))).toBeGreaterThanOrEqual(AAA);
  });

  it('Topbar-Lampe behält ihre Farbe (--err-fill)', () => {
    expect(css).toMatch(/\.dss-topbar-live::before\s*\{[^}]*background:\s*var\(--err-fill\)/);
  });

  it('Topbar-Avatar: weiß auf --cool-700 ≥ 7:1', () => {
    expect(css).toMatch(/\.dss-topbar-av\s*\{[^}]*background:\s*var\(--cool-700\)/);
    expect(ratio([1, 1, 1], color('var(--cool-700)', tokens))).toBeGreaterThanOrEqual(AAA);
  });

  it('Amber-Button: Hover-Hintergrund bleibt dunkler als normal, Text ≥ 7:1 (DBB Schwarz)', () => {
    expect(css).toMatch(/\.dss-btn--amber:hover:not\(:disabled\)\s*\{[^}]*background:\s*var\(--dss-cta-bg-hover\)[^}]*color:\s*var\(--dss-cta-fg-hover\)/);
    expect(css).toMatch(/:root\[data-brand="dbb"\]\s*\{\s*--dss-cta-fg-hover:\s*oklch\(0 0 0\)/);
    const normal = color('var(--gold-400)', dbbScope);
    const hover = color('var(--gold-500)', dbbScope);
    expect(lum(hover)).toBeLessThan(lum(normal));
    expect(ratio([0, 0, 0], hover)).toBeGreaterThanOrEqual(AAA);
    expect(ratio([0, 0, 0], normal)).toBeGreaterThanOrEqual(AAA);
    // BBV: Hover-Text bleibt --dss-cta-fg
    expect(css).toMatch(/--dss-cta-fg-hover:\s*var\(--dss-cta-fg\)/);
    expect(ratio(color('var(--base-1000)', tokens), color('var(--amber-500)', tokens))).toBeGreaterThanOrEqual(AAA);
  });

  it('Eigene Spielplan-Zeile im Dunkelmodus: gedämpfter Text ≥ 7:1 auf --dss-selected-bg', () => {
    expect(css).toMatch(/\.dss-tbl--schedule tr\.is-own,\s*\.dss-sg-game\.is-own\s*\{\s*--dss-mute:\s*var\(--dss-mute-on-selected\)/);
    // Dunkelmodus-Blöcke (Media-Query und data-theme) setzen das Token auf --n-300
    const dunkel = css.match(/--dss-mute-on-selected:\s*var\(--n-300\)/g) ?? [];
    expect(dunkel).toHaveLength(2);
    // Hell: Token folgt --dss-mute
    expect(css).toMatch(/--dss-mute-on-selected:\s*var\(--dss-mute\);/);
    for (const hue of ['--h-amber', '--h-gold']) {
      const scope = `--h-signal: var(${hue});\n` + tokens;
      const bg = color(`oklch(0.28 0.05 var(--h-signal))`, scope);
      expect(ratio(color('var(--n-300)', tokens), bg)).toBeGreaterThanOrEqual(AAA);
      expect(ratio(color('var(--n-300)', dbbScope), bg)).toBeGreaterThanOrEqual(AAA);
    }
  });

  it('Gast-Trikotmarke: weiß auf abgedunkeltem Rot ≥ 7:1', () => {
    expect(css).toMatch(/\.dss-tn\.gast\s*\{[^}]*color-mix\(in oklab, var\(--team-gast[^}]*90%, black\)/);
    // Näherung: 10 % Schwarz im Oklab-Raum entspricht L × 0,9
    const [, c, h] = defOf(tokens, '--team-gast').match(/oklch\(\s*[\d.]+\s+([\d.]+)\s+([\d.]+)\s*\)/)!.slice(0, 3);
    const l = Number(defOf(tokens, '--team-gast').match(/oklch\(\s*([\d.]+)/)![1]) * 0.9;
    const bg = oklch(l, Number(c) * 0.9, Number(h));
    expect(ratio([1, 1, 1], bg)).toBeGreaterThanOrEqual(AAA);
    // Unbeimischt wäre es zu wenig (Regression gegen das Zurücknehmen)
    expect(ratio([1, 1, 1], color(defOf(tokens, '--team-gast'), tokens))).toBeLessThan(AAA);
  });

  it('Kapitän-Chip: Text und Grund im Dunkelmodus ≥ 7:1', () => {
    const scope = '--h-signal: var(--h-amber);\n' + tokens;
    const bg = color('oklch(0.30 0.06 var(--h-signal))', scope);
    expect(ratio(color('var(--signal-300)', scope), bg)).toBeGreaterThanOrEqual(AAA);
    expect(css).toMatch(/\.dss-pill-s\.cap\s*\{[^}]*color:\s*var\(--dss-accent-text\)/);
  });

  it('Hilfsfunktion: bekannte Werte', () => {
    expect(ratio([1, 1, 1], [0, 0, 0])).toBeCloseTo(21, 5);
    expect(ratio(hex('#191919'), hex('#b3994d'))).toBeCloseTo(6.34, 1);
  });
});
