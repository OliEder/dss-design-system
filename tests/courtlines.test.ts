// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const root = new URL('../', import.meta.url);
const css = readFileSync(new URL('css/components.css', root), 'utf8');

describe('CourtLines-Assets', () => {
  it.each(['court.svg', 'court-portrait.svg'])('%s liegt neben components.css und wird per url() referenziert', (file) => {
    expect(existsSync(new URL(`css/courtlines/${file}`, root))).toBe(true);
    expect(css).toContain(`url("courtlines/${file}")`);
  });

  it('beide SVGs sind reine Linienzeichnungen (Maske), ohne Füllfarbe', () => {
    for (const file of ['court.svg', 'court-portrait.svg']) {
      const svg = readFileSync(new URL(`css/courtlines/${file}`, root), 'utf8');
      expect(svg).toContain('fill="none"');
      expect(svg).toContain('stroke');
    }
  });
});
