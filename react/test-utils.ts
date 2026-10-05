import axe from 'axe-core';
import { expect } from 'vitest';

/** axe-Lauf ohne Kontrast (jsdom hat kein Layout) und ohne Landmark-Regel (Komponenten-Ausschnitt). */
export async function expectNoA11yViolations(root: Element = document.body): Promise<void> {
  const results = await axe.run(root, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
  });
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
}
