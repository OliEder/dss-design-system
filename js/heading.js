// Überschriftenebenen der Komponenten: reine Funktionen ohne Framework-Bezug (React und Svelte nutzen dieselben).
// Eine Komponente gibt nie eine h1 aus (sie gehört der Seite der App): erlaubt sind h2 bis h6.

const MIN = 2;
const MAX = 6;
const DEFAULT_LEVEL = 3;

const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

/** Ganze Zahl oder Zeichenkette aus Ziffern ("3"), sonst `undefined`. */
function toInteger(value) {
  if (typeof value === 'number') return Number.isInteger(value) || value === Infinity || value === -Infinity ? value : undefined;
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) return Number(value.trim());
  return undefined;
}

/** Ebene 2 bis 6: kleinere und größere Werte werden begrenzt, alles andere (keine Ganzzahl) ergibt 3. */
export function headingLevel(level) {
  const n = toInteger(level);
  return n === undefined ? DEFAULT_LEVEL : clamp(n);
}

/** Elementname zur Ebene: `headingTag(4)` ergibt `'h4'` (siehe `headingLevel` für Begrenzung und Standard). */
export function headingTag(level) {
  return `h${headingLevel(level)}`;
}

/**
 * Ebene für den Inhalt unter einer Ebene: `nextLevel(2)` ergibt 3, `nextLevel(3, 2)` ergibt 5 (begrenzt auf 2 bis 6).
 * Ohne gültigen Vorfahren (`current` fehlt oder ist keine Ganzzahl) zählt die Ausgangsebene 2; ein ungültiges `by` zählt als 1.
 */
export function nextLevel(current, by = 1) {
  const base = toInteger(current);
  const step = typeof by === 'number' && Number.isInteger(by) ? by : 1;
  return clamp((base === undefined ? MIN : clamp(base)) + step);
}

const TAGS = ['h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Elementname einer Komponentenüberschrift. Rangfolge: gültiges `titleAs` (h2 bis h6) vor der Ebene aus
 * `HeadingLevel` (`contextLevel`) vor dem Standard h3.
 */
export function resolveHeading(titleAs, contextLevel) {
  if (typeof titleAs === 'string' && TAGS.includes(titleAs)) return titleAs;
  return headingTag(contextLevel);
}

/** Ebene eines Elementnamens: `levelOfTag('h4')` ergibt 4; alles außer h2 bis h6 ergibt 3. */
export function levelOfTag(tag) {
  return typeof tag === 'string' && TAGS.includes(tag) ? Number(tag.slice(1)) : DEFAULT_LEVEL;
}
