/** Ebene einer Komponentenüberschrift: 2 bis 6 (die h1 gehört der Seite der App). */
export type HeadingLevelValue = 2 | 3 | 4 | 5 | 6;
/** Elementname einer Komponentenüberschrift: `h2` bis `h6`. */
export type HeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** Ebene 2 bis 6: kleinere und größere Werte werden begrenzt; keine Ganzzahl (`NaN`, `3.5`, `null`, `undefined`) ergibt 3. Zeichenketten aus Ziffern (`'4'`) gelten wie Zahlen. */
export function headingLevel(level: unknown): HeadingLevelValue;
/** `headingTag(4)` ergibt `'h4'`; Begrenzung und Standard wie bei `headingLevel`. */
export function headingTag(level: unknown): HeadingTag;
/**
 * Ebene für den Inhalt unter einer Ebene: `nextLevel(2)` ergibt 3, `nextLevel(3, 2)` ergibt 5 (begrenzt auf 2 bis 6).
 * Ohne gültigen Vorfahren zählt die Ausgangsebene 2; ein ungültiges `by` zählt als 1.
 */
export function nextLevel(current: unknown, by?: number): HeadingLevelValue;
/** Rangfolge: gültiges `titleAs` (h2 bis h6) vor der Ebene aus `HeadingLevel` vor dem Standard h3. */
export function resolveHeading(titleAs: unknown, contextLevel?: unknown): HeadingTag;
/** Ebene eines Elementnamens: `levelOfTag('h4')` ergibt 4; alles außer h2 bis h6 ergibt 3. */
export function levelOfTag(tag: unknown): HeadingLevelValue;
