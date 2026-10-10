// Überschriftenebene im Svelte-Kontext (gemeinsame Hilfe für HeadingLevel, Modal und die Titelkomponenten).
// Rein JavaScript, damit die Komponenten ohne Zusatzschritt ausgeliefert werden; die Regeln liegen in js/heading.js.
import { getContext, setContext } from 'svelte';
import { resolveHeading } from '../js/heading.js';

const KEY = Symbol.for('dss.headingLevel');

/**
 * Gibt dem Teilbaum eine Ebene vor. `getLevel` wird bei jedem Lesen aufgerufen, so bleibt die Ebene
 * reaktiv, wenn sich `level` oder `by` ändern. Nur beim Initialisieren einer Komponente aufrufen.
 * @param {() => number} getLevel
 */
export function provideHeadingLevel(getLevel) {
  setContext(KEY, {
    get level() {
      return getLevel();
    },
  });
}

/**
 * Ebene des übergeordneten `HeadingLevel` (oder `undefined`). Nur beim Initialisieren einer Komponente aufrufen.
 * @returns {number | undefined}
 */
export function parentHeadingLevel() {
  return /** @type {{ level: number } | undefined} */ (getContext(KEY))?.level;
}

/**
 * Für die Titelkomponenten: `titleAs` gewinnt vor der Ebene aus `HeadingLevel` vor dem Standard h3.
 * Die Rückgabe wird im Template als `heading.tag` gelesen. Nur beim Initialisieren einer Komponente aufrufen.
 * @param {() => unknown} getTitleAs
 * @returns {{ readonly tag: import('../js/heading.js').HeadingTag }}
 */
export function useHeadingTag(getTitleAs) {
  const context = /** @type {{ level: number } | undefined} */ (getContext(KEY));
  return {
    get tag() {
      return resolveHeading(getTitleAs(), context?.level);
    },
  };
}
