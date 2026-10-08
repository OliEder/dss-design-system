/**
 * Zeigt Zustände (Hover, Fokus, Active) fest an, ohne Maus oder Tastatur.
 *
 * Für jede CSS-Regel mit :hover, :focus-visible, :focus-within oder :active
 * wird direkt dahinter eine Kopie mit den Klassen .pseudo-hover,
 * .pseudo-focus-visible, .pseudo-focus-within bzw. .pseudo-active angelegt.
 * Stories setzen diese Klassen auf das Element. Nur Storybook, nicht Teil des Pakets.
 */
const PSEUDOS: Array<[RegExp, string]> = [
  [/:hover/g, '.pseudo-hover'],
  [/:focus-visible/g, '.pseudo-focus-visible'],
  [/:focus-within/g, '.pseudo-focus-within'],
  [/:active/g, '.pseudo-active'],
];

function splitSelectors(text: string): string[] {
  // Kommas innerhalb von Klammern (:not(a, b)) trennen nicht
  return text.split(/,(?![^(]*\))/).map((s) => s.trim());
}

function duplicate(rules: CSSRuleList | undefined, insert: (css: string, index: number) => void) {
  if (!rules) return;
  for (let i = rules.length - 1; i >= 0; i--) {
    const rule = rules[i] as CSSStyleRule & CSSGroupingRule;
    if (rule.selectorText !== undefined) {
      const picked = splitSelectors(rule.selectorText).filter((s) => PSEUDOS.some(([re]) => new RegExp(re.source).test(s)));
      if (!picked.length) continue;
      const selector = picked.map((s) => PSEUDOS.reduce((acc, [re, cls]) => acc.replace(re, cls), s)).join(', ');
      insert(`${selector} { ${rule.style.cssText} }`, i + 1);
    } else if (rule.cssRules) {
      duplicate(rule.cssRules, (css, index) => {
        try { rule.insertRule(css, index); } catch { /* nicht unterstützte Regel überspringen */ }
      });
    }
  }
}

export function installPseudoStates() {
  if (typeof document === 'undefined' || (document as unknown as { __pseudo?: boolean }).__pseudo) return;
  (document as unknown as { __pseudo?: boolean }).__pseudo = true;
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try { rules = sheet.cssRules; } catch { continue; } // fremde Stylesheets
    duplicate(rules, (css, index) => {
      try { sheet.insertRule(css, index); } catch { /* überspringen */ }
    });
  }
}
