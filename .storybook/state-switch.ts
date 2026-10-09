/**
 * Erzwingt Hover, Fokus oder Aktiv auf allen bedienbaren Elementen der gezeigten Stories
 * (Werkzeugleiste "Zustand"). Nutzt die Klassen aus ./pseudo-states.ts. Nur Storybook, nicht Teil des Pakets.
 *
 * Bereiche mit [data-fixed-states] (Zustands-Matrix) bleiben unberührt, ebenso gesperrte Elemente.
 */
export type ForcedState = 'normal' | 'hover' | 'focus' | 'active';

export const INTERACTIVE = 'button, a[href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';
const ROOTS = '#storybook-root, .docs-story';
const OWN = 'data-forced-by-toolbar';
// Fokus-Ringe wie beim Eingabefeld liegen auf dem Elternteil (:focus-within), daher bekommen die Vorfahren
// eines erzwungenen Fokus-Elements .pseudo-focus-within (wie im echten Browser).
const WITHIN = 'data-forced-within';

const CLASSES: Record<ForcedState, string[]> = {
  normal: [],
  hover: ['pseudo-hover'],
  focus: ['pseudo-focus-visible'],
  active: ['pseudo-hover', 'pseudo-active'],
};

export function applyState(root: ParentNode, state: ForcedState): void {
  for (const el of Array.from(root.querySelectorAll<HTMLElement>(`[${WITHIN}]`))) {
    el.classList.remove('pseudo-focus-within');
    el.removeAttribute(WITHIN);
  }
  for (const el of Array.from(root.querySelectorAll<HTMLElement>(INTERACTIVE))) {
    const added = (el.getAttribute(OWN) ?? '').split(' ').filter(Boolean);
    if (added.length) el.classList.remove(...added);
    el.removeAttribute(OWN);
    if (state === 'normal') continue;
    if (el.closest('[data-fixed-states]')) continue;
    if (el.matches(':disabled, [aria-disabled="true"]')) continue;
    const wanted = CLASSES[state].filter((c) => !el.classList.contains(c));
    if (!wanted.length) continue;
    el.classList.add(...wanted);
    el.setAttribute(OWN, wanted.join(' '));
    if (state === 'focus') {
      for (let p = el.parentElement; p && p !== root; p = p.parentElement) {
        if (p.classList.contains('pseudo-focus-within')) continue;
        p.classList.add('pseudo-focus-within');
        p.setAttribute(WITHIN, '');
      }
    }
  }
}

let current: ForcedState = 'normal';
let pending = false;
let observer: MutationObserver | undefined;

function applyAll() {
  pending = false;
  // Nichts erzwungen und nichts zurückzunehmen: spart den Lauf über alle Elemente bei jeder DOM-Änderung
  if (current === 'normal' && !document.querySelector(`[${OWN}], [${WITHIN}]`)) return;
  document.querySelectorAll(ROOTS).forEach((root) => applyState(root, current));
}

// Nur childList: applyState ändert Klassen, das löst keine neue Runde aus.
function schedule() {
  if (pending) return;
  pending = true;
  setTimeout(applyAll, 16);
}

export function setForcedState(state: ForcedState): void {
  current = state;
  applyAll();
  if (!observer && typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
  }
}
