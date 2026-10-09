# MDX-Doku Welle 0 (Grundlage, Zustands-Schalter, Button-Pilot) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Button-Doku läuft als MDX-Seite in den Auto-Docs (mit Dos und Don'ts, Code-Umschalter, Zustands-Matrix), und die Werkzeugleiste „Zustand“ schaltet Hover/Fokus/Aktiv für alle Stories.

**Architecture:** `.storybook/main.ts` lädt `stories/**/*.mdx`. `stories/Button.mdx` hängt per `<Meta of>` an `Button.stories.ts`; alle Demos der alten Seite werden Stories (Svelte-Komponente `ButtonExamples.svelte`, ausgewählt über ein `example`-Prop). Zwei React-Bausteine (`DosDonts`, `FrameworkCode`) liegen in `stories/docs/blocks/`. Der Zustands-Schalter ist eine reine DOM-Funktion (`.storybook/state-switch.ts`), die die vorhandenen `pseudo-*`-Klassen setzt.

**Tech Stack:** Storybook 10.6.1 (`@storybook/svelte-vite`, `@storybook/addon-docs`), MDX, React 18 (nur für Doku-Bausteine), Svelte 5, Vitest + jsdom + Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-09-mdx-docs-design.md`. Abweichung von der Spec: Die Beschriftung „Beispiel für falsche Verwendung“ steht nicht am `inert`-Element (das Element ist für Hilfstechnik ohnehin unsichtbar), sondern als nur für Screenreader sichtbarer Text in der Beschriftung „Don't“.

**Arbeitsweise:** Texte auf Deutsch, Code-Kommentare deutsch wie im Bestand. Commits mit dem Fuß `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Wegwerf-Skripte gehören in den Scratchpad, nicht ins Repo. Nicht pushen.

---

## Dateiübersicht

| Datei | Aktion | Zweck |
|---|---|---|
| `.storybook/main.ts` | ändern | MDX-Glob, JSX-Transform für `.tsx` |
| `.storybook/state-switch.ts` | neu | `applyState`, `setForcedState` (Hover/Fokus/Aktiv erzwingen) |
| `tests/storybook-state.test.ts` | neu | Tests dazu |
| `.storybook/preview.ts` | ändern | Global `state`, Decorator, storySort ohne `Docs/Button` |
| `stories/docs/blocks/useActiveFramework.ts` | neu | liest `html[data-framework]` reaktiv |
| `stories/docs/blocks/FrameworkCode.tsx` | neu | Code-Block der aktiven Fassung |
| `stories/docs/blocks/DosDonts.tsx` | neu | Beispielpaare |
| `stories/docs/blocks/blocks.css` | neu | Optik der Bausteine |
| `tests/doc-blocks.test.tsx` | neu | Tests der Bausteine |
| `vitest.config.ts` | ändern | `tests/**/*.test.tsx` einschließen |
| `stories/components/ButtonExamples.svelte` | neu | Demos der alten Seite + Dos/Don'ts |
| `stories/Button.stories.ts` | ändern | argTypes mit Beschreibung, neue Stories, `autodocs` entfernt |
| `stories/Button.code.ts` | neu | Code-Beispiele (Vanilla/Svelte/React) |
| `stories/Button.mdx` | neu | die Seite |
| `.storybook/storybook.css` | ändern | DSS-Optik im Doku-Container |
| `stories/docs/ButtonDoc.svelte`, `stories/docs/Button.spec.stories.ts` | löschen | alte Seite |

---

### Task 0: Worktree und Basis

**Files:** keine Änderung

- [ ] **Step 1: Worktree anlegen** (`.worktrees/` ist ignoriert, geprüft)

```bash
cd /Users/oliver-marcuseder/01-vibe-coding/00-Basektball/dss-design-system
git worktree add .worktrees/mdx-welle-0 -b feat/mdx-docs-welle-0
cd .worktrees/mdx-welle-0 && npm install
```

- [ ] **Step 2: Baseline**

Run: `npm test && npm run typecheck`
Expected: alle Tests grün (700), Typecheck ohne Fehler. Bei Fehlschlag: melden und anhalten.

Alle folgenden Befehle laufen im Worktree `.worktrees/mdx-welle-0`.

---

### Task 1: MDX-Grundlage (Spike mit Mini-Seite)

Ziel: Belegen, dass MDX, React-JSX in `.tsx` und versteckte Stories (`!dev`) im Svelte-Storybook funktionieren, bevor Inhalte migriert werden.

**Files:**
- Modify: `.storybook/main.ts`
- Create: `stories/Button.mdx` (vorläufig, wird in Task 7 ersetzt)
- Modify: `stories/Button.stories.ts` (Tag entfernen, eine versteckte Probe-Story)

- [ ] **Step 1: `main.ts` erweitern**

`stories` bekommt den MDX-Eintrag, `viteFinal` den JSX-Transform (es gibt kein Root-`tsconfig.json`, ohne diese Zeile gilt der klassische Transform und `.tsx`-Bausteine scheitern mit „React is not defined“):

```ts
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|ts|svelte)',
    '../stories/**/*.spec.stories.ts',
  ],
```

```ts
    return mergeConfig(viteConfig, {
      plugins: [svelte()],
      esbuild: { jsx: 'automatic' },
    });
```

- [ ] **Step 2: Vorläufige MDX**

`stories/Button.mdx`:

```mdx
import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

<Canvas of={ButtonStories.Primary} />

<Canvas of={ButtonStories.Probe} />

<Controls of={ButtonStories.Primary} />
```

- [ ] **Step 3: `Button.stories.ts` anpassen**

In `export default` die Zeile `tags: ['autodocs'],` löschen. Ans Dateiende:

```ts
// Probe für Task 1, wird in Task 5 entfernt
export const Probe = { tags: ['!dev'], args: { variant: 'amber', label: 'Versteckte Probe' } };
```

- [ ] **Step 4: Bauen und Index prüfen**

```bash
npx storybook build -o "$TMPDIR/sb-w0" --quiet 2>&1 | tail -15
node -e "const i=require(process.env.TMPDIR+'/sb-w0/index.json').entries;for(const [k,v] of Object.entries(i)) if(k.startsWith('components-button')) console.log(k,v.type,v.importPath,v.tags.join(','))"
```

Expected: Build ohne Fehler. Genau **ein** `components-button--docs` mit `type docs` und `importPath ./stories/Button.mdx`; `components-button--probe` ist vorhanden, aber ohne Tag `dev`. Kein zweiter Docs-Eintrag aus `Button.stories.ts`.

- [ ] **Step 5: Im Browser prüfen**

Statisch ausliefern (`cd "$TMPDIR/sb-w0" && python3 -m http.server 6200`) und mit dem Playwright-MCP `http://localhost:6200/iframe.html?id=components-button--docs&viewMode=docs` öffnen. Erwartet: Überschrift „Button“, zwei gerenderte Buttons (Primary und „Versteckte Probe“ in Amber), Steuerelement-Tabelle, keine Konsolenfehler. Prüfen, dass „Probe“ nicht in der Seitenleiste (`/`) erscheint. Notieren, welche CSS-Klasse der Container einer eingebetteten Story hat (erwartet `.docs-story`); der Wert wird in Task 2 gebraucht.

Falls die versteckte Story **nicht** in der Doku erscheint: statt `!dev` das Tag `['!autodocs', 'docs-only']` testen oder die Story in eine eigene Datei `stories/Button.examples.stories.ts` mit `title: 'Components/Button/Beispiele'` auslagern und den Befund im Bericht nennen. Plan an dieser Stelle nicht stillschweigend ändern.

- [ ] **Step 6: Commit**

```bash
git add .storybook/main.ts stories/Button.mdx stories/Button.stories.ts
git commit -m "feat(docs): load MDX stories, JSX transform, spike Button.mdx

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Zustands-Schalter (Funktion + Tests)

**Files:**
- Create: `.storybook/state-switch.ts`
- Create: `tests/storybook-state.test.ts`

- [ ] **Step 1: Failing Tests schreiben** (`tests/storybook-state.test.ts`)

Die Hilfsfunktion baut das DOM über `createContextualFragment` (kein `innerHTML`).

```ts
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { applyState, setForcedState } from '../.storybook/state-switch';

function mount(html: string, rootAttrs: { id?: string; class?: string } = { id: 'storybook-root' }) {
  const root = document.createElement('div');
  if (rootAttrs.id) root.id = rootAttrs.id;
  if (rootAttrs.class) root.className = rootAttrs.class;
  root.append(document.createRange().createContextualFragment(html));
  document.body.replaceChildren(root);
  return root;
}

describe('applyState', () => {
  it('setzt Hover, Fokus und Aktiv als pseudo-Klassen', () => {
    const root = mount('<button id="b">x</button>');
    const b = root.querySelector('#b')!;
    applyState(root, 'hover');
    expect(b.className).toBe('pseudo-hover');
    applyState(root, 'focus');
    expect(b.className).toBe('pseudo-focus-visible');
    applyState(root, 'active');
    expect([...b.classList].sort()).toEqual(['pseudo-active', 'pseudo-hover']);
  });

  it('normal entfernt nur die gesetzten Klassen und lässt eigene stehen', () => {
    const root = mount('<button id="a" class="dss-btn">x</button><button id="f" class="pseudo-focus-visible">y</button>');
    applyState(root, 'hover');
    applyState(root, 'normal');
    expect(root.querySelector('#a')!.className).toBe('dss-btn');
    expect(root.querySelector('#f')!.className).toBe('pseudo-focus-visible');
  });

  it('übergeht gesperrte Elemente und feste Zustandsbereiche', () => {
    const root = mount(
      '<button id="d" disabled>x</button><button id="aria" aria-disabled="true">x</button>' +
        '<div data-fixed-states><button id="fixed">y</button></div>',
    );
    applyState(root, 'focus');
    for (const id of ['d', 'aria', 'fixed']) expect(root.querySelector('#' + id)!.className).toBe('');
  });

  it('erfasst Links, Eingabefelder, summary und tabindex, aber nicht tabindex=-1', () => {
    const root = mount('<a id="l" href="#">l</a><input id="i"><summary id="s">s</summary><div id="t" tabindex="0"></div><div id="n" tabindex="-1"></div>');
    applyState(root, 'hover');
    for (const id of ['l', 'i', 's', 't']) expect(root.querySelector('#' + id)!.classList.contains('pseudo-hover')).toBe(true);
    expect(root.querySelector('#n')!.className).toBe('');
  });
});

describe('setForcedState', () => {
  beforeEach(() => mount('<button id="b">x</button>'));
  afterEach(() => setForcedState('normal'));

  it('wirkt sofort auf #storybook-root', () => {
    setForcedState('focus');
    expect(document.getElementById('b')!.classList.contains('pseudo-focus-visible')).toBe(true);
  });

  it('erfasst später eingefügte Elemente (MutationObserver)', async () => {
    setForcedState('hover');
    const late = document.createElement('button');
    late.id = 'late';
    document.getElementById('storybook-root')!.append(late);
    await new Promise((r) => setTimeout(r, 80));
    expect(late.classList.contains('pseudo-hover')).toBe(true);
  });

  it('wirkt auch in Doku-Stories (.docs-story)', () => {
    mount('<button id="d">x</button>', { class: 'docs-story' });
    setForcedState('hover');
    expect(document.getElementById('d')!.classList.contains('pseudo-hover')).toBe(true);
  });
});
```

(Falls Task 1 Step 5 eine andere Klasse als `.docs-story` ergab, im letzten Test und in `ROOTS` unten diese verwenden.)

Run: `npx vitest run tests/storybook-state.test.ts`
Expected: FAIL (Modul fehlt).

- [ ] **Step 2: Implementieren** (`.storybook/state-switch.ts`)

```ts
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

const CLASSES: Record<ForcedState, string[]> = {
  normal: [],
  hover: ['pseudo-hover'],
  focus: ['pseudo-focus-visible'],
  active: ['pseudo-hover', 'pseudo-active'],
};

export function applyState(root: ParentNode, state: ForcedState): void {
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
  }
}

let current: ForcedState = 'normal';
let pending = false;
let observer: MutationObserver | undefined;

function applyAll() {
  pending = false;
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
```

- [ ] **Step 3: Tests grün**

Run: `npx vitest run tests/storybook-state.test.ts`
Expected: PASS (7 Tests). Danach eine Mutation prüfen: in `applyState` die Zeile mit `data-fixed-states` auskommentieren, der Test „übergeht gesperrte Elemente…“ muss rot werden; zurücknehmen.

- [ ] **Step 4: Commit**

```bash
git add .storybook/state-switch.ts tests/storybook-state.test.ts
git commit -m "feat(storybook): force hover/focus/active on all interactive story elements

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Schalter in die Werkzeugleiste

**Files:**
- Modify: `.storybook/preview.ts`

- [ ] **Step 1: Import, Global, Decorator**

Import ergänzen: `import { setForcedState, type ForcedState } from './state-switch';`

In `globalTypes` nach `framework`:

```ts
    state: {
      description: 'Zustand erzwingen (Hover, Fokus, Aktiv)',
      toolbar: {
        title: 'Zustand',
        icon: 'lightning',
        items: [
          { value: 'normal', title: 'Normal' },
          { value: 'hover', title: 'Hover' },
          { value: 'focus', title: 'Fokus' },
          { value: 'active', title: 'Aktiv' },
        ],
        dynamicTitle: true,
      },
    },
```

In `initialGlobals`: `state: 'normal',`. Im ersten Decorator vor `return story();`:

```ts
      setForcedState((context.globals.state ?? 'normal') as ForcedState);
```

- [ ] **Step 2: storySort ohne `Docs/Button`**

`'Docs', ['Button', 'Forms', ...]` wird `'Docs', ['Forms', 'Cards & Lists', 'Navigation', 'Tables & Live-Scoring', 'Spielplan']`. (Die Dateien der alten Seite werden erst in Task 8 gelöscht.)

- [ ] **Step 3: Im Browser prüfen** (Dev-Server `npx storybook dev -p 6201 --ci --no-open`)

1. Canvas `components-button--primary`: Werkzeugleiste „Zustand“ → Hover: Button zeigt Hover-Optik; Fokus: Fokus-Ring sichtbar; Aktiv: gedrückte Optik; Normal: wieder normal.
2. Gleiches auf der Docs-Seite (`viewMode=docs`) für die eingebetteten Buttons.
3. Eine andere Komponente (`components-textinput--…`, `components-tabs--…`): Fokus erscheint am Eingabefeld bzw. am Tab.
4. Overlay prüfen (`components-modal--…` im Canvas, Modal öffnen): Notieren, ob die Buttons im geöffneten Modal die Klasse erhalten. Wenn nicht, `ROOTS` um den Container erweitern (zum Beispiel `[role="dialog"]`), Test ergänzen, und im Bericht vermerken.

Keine Konsolenfehler.

- [ ] **Step 4: Commit**

```bash
git add .storybook/preview.ts
git commit -m "feat(storybook): toolbar 'Zustand' (normal/hover/focus/active)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: React-Bausteine für MDX

**Files:**
- Create: `stories/docs/blocks/useActiveFramework.ts`, `FrameworkCode.tsx`, `DosDonts.tsx`, `blocks.css`
- Create: `tests/doc-blocks.test.tsx`
- Modify: `vitest.config.ts` (`include` um `'tests/**/*.test.tsx'` ergänzen)

- [ ] **Step 1: Failing Tests** (`tests/doc-blocks.test.tsx`)

```tsx
// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DosDonts } from '../stories/docs/blocks/DosDonts';
import { FrameworkCode } from '../stories/docs/blocks/FrameworkCode';

afterEach(() => document.documentElement.removeAttribute('data-framework'));

describe('FrameworkCode', () => {
  const props = { vanilla: '<button>v</button>', svelte: '<Button>s</Button>', react: '<Button>r</Button>' };

  it('zeigt standardmäßig Svelte', () => {
    render(<FrameworkCode {...props} />);
    expect(screen.getByText('<Button>s</Button>')).toBeInTheDocument();
    expect(screen.queryByText('<Button>r</Button>')).toBeNull();
  });

  it('folgt html[data-framework] auch nach dem Rendern', async () => {
    render(<FrameworkCode {...props} />);
    await act(async () => {
      document.documentElement.dataset.framework = 'react';
      await new Promise((r) => setTimeout(r, 20));
    });
    expect(screen.getByText('<Button>r</Button>')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Code-Beispiel React' })).toHaveAttribute('tabindex', '0');
  });

  it('meldet fehlenden Code', () => {
    document.documentElement.dataset.framework = 'vanilla';
    render(<FrameworkCode svelte="x" />);
    expect(screen.getByText('Für diese Fassung gibt es hier kein Beispiel.')).toBeInTheDocument();
  });
});

describe('DosDonts', () => {
  const pairs = [
    {
      title: 'Eine Haupt-Aktion pro Ansicht',
      doText: 'Ein amber Button, daneben Secondary.',
      dontText: 'Zwei amber Buttons konkurrieren.',
      good: <button>gut</button>,
      bad: <button>schlecht</button>,
    },
  ];

  it('zeigt Regel, beide Beispiele und Begründungen', () => {
    const { container } = render(<DosDonts pairs={pairs} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Eine Haupt-Aktion pro Ansicht' })).toBeInTheDocument();
    expect(screen.getByText('Ein amber Button, daneben Secondary.', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Zwei amber Buttons konkurrieren.', { exact: false })).toBeInTheDocument();
    expect(container.querySelector('.dss-dd-do .dss-dd-badge')?.textContent).toBe('✓ Do');
    expect(container.querySelector('.dss-dd-dont .dss-dd-badge')?.textContent).toContain("✗ Don't");
  });

  it('macht das falsche Beispiel inert, das richtige nicht', () => {
    const { container } = render(<DosDonts pairs={pairs} />);
    const stages = container.querySelectorAll('.dss-dd-stage');
    expect(stages[0]).not.toHaveAttribute('inert');
    expect(stages[1]).toHaveAttribute('inert');
  });

  it('benennt das falsche Beispiel für Screenreader', () => {
    render(<DosDonts pairs={pairs} />);
    expect(screen.getByText('Beispiel für falsche Verwendung')).toHaveClass('dss-sr-only');
  });
});
```

Run (zuerst `vitest.config.ts` `include` ergänzen): `npx vitest run tests/doc-blocks.test.tsx`
Expected: FAIL (Module fehlen).

- [ ] **Step 2: `useActiveFramework.ts`**

```ts
import { useEffect, useState } from 'react';

export type Framework = 'vanilla' | 'svelte' | 'react';

// Ohne Attribut oder mit unbekanntem Wert gilt Svelte (wie in stories/docs/_CodeSwitch.svelte).
function read(): Framework {
  const v = document.documentElement.dataset.framework;
  return v === 'vanilla' || v === 'react' ? v : 'svelte';
}

/** Aktive Fassung aus html[data-framework], gesetzt vom Decorator (Werkzeugleiste "Fassung"). */
export function useActiveFramework(): Framework {
  const [fw, setFw] = useState<Framework>(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setFw(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-framework'] });
    setFw(read());
    return () => obs.disconnect();
  }, []);
  return fw;
}
```

- [ ] **Step 3: `FrameworkCode.tsx`**

```tsx
import { useActiveFramework, type Framework } from './useActiveFramework';

const NAMES: Record<Framework, string> = { vanilla: 'Vanilla HTML', svelte: 'Svelte', react: 'React' };

/** Code-Beispiel in drei Fassungen; sichtbar ist die Fassung der Werkzeugleiste. Nur Storybook-Doku. */
export function FrameworkCode({ vanilla, svelte, react, label }: { vanilla?: string; svelte?: string; react?: string; label?: string }) {
  const fw = useActiveFramework();
  const code = { vanilla, svelte, react }[fw];
  const name = NAMES[fw];
  return (
    <div className="dss-doc-code-wrap">
      {label && <div className="dss-doc-cap">{label}</div>}
      <div className="dss-doc-code" tabIndex={0} role="region" aria-label={label ? `${label}, ${name}` : `Code-Beispiel ${name}`}>
        <span className="dss-doc-chip">{name}</span>
        {code ? <pre>{code}</pre> : <p>Für diese Fassung gibt es hier kein Beispiel.</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: `DosDonts.tsx`**

React 18 kennt `inert` nicht als Prop, ein leerer String reicht als Attribut.

```tsx
import type { ReactNode } from 'react';

export type DosDontsPair = { title: string; doText: string; dontText: string; good: ReactNode; bad: ReactNode };

const INERT = { inert: '' } as Record<string, string>;

/** Beispielpaare "richtig / falsch". Falsche Beispiele sind nur Anschauung (inert). Nur Storybook-Doku. */
export function DosDonts({ pairs }: { pairs: DosDontsPair[] }) {
  return (
    <div className="dss-dd">
      {pairs.map((p) => (
        <section key={p.title} className="dss-dd-pair">
          <h3 className="dss-dd-title">{p.title}</h3>
          <div className="dss-dd-cols">
            <figure className="dss-dd-col dss-dd-do">
              <div className="dss-dd-stage">{p.good}</div>
              <figcaption>
                <span className="dss-dd-badge">✓ Do</span> {p.doText}
              </figcaption>
            </figure>
            <figure className="dss-dd-col dss-dd-dont">
              <div className="dss-dd-stage" {...INERT}>
                {p.bad}
              </div>
              <figcaption>
                <span className="dss-dd-badge">
                  ✗ Don't<span className="dss-sr-only">: Beispiel für falsche Verwendung</span>
                </span>{' '}
                {p.dontText}
              </figcaption>
            </figure>
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: `blocks.css`**

```css
/* Optik der MDX-Doku-Bausteine (nur Storybook). Farben über Tokens, damit Marke und Hell/Dunkel greifen. */
.dss-doc-cap { font-family: var(--font-mono); font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-mute); margin: 0 0 8px; }
.dss-doc-code { border: 1px solid var(--page-line); border-radius: 14px; background: var(--base-1000); color: var(--n-100); padding: 16px 24px 22px; overflow-x: auto; margin: 0 0 16px; }
.dss-doc-code pre { margin: 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; font-variant-ligatures: none; white-space: pre; background: none; border: 0; padding: 0; color: inherit; }
.dss-doc-chip { display: inline-block; margin-bottom: 12px; padding: 2px 8px; border-radius: 4px; background: var(--amber-800); color: var(--n-0); font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.04em; }
.dss-doc-code p { margin: 0; color: var(--n-400); }

.dss-dd { display: flex; flex-direction: column; gap: 32px; }
.dss-dd-title { margin: 0 0 12px; font-size: 1.1rem; }
.dss-dd-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.dss-dd-col { margin: 0; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.dss-dd-stage { border: 2px solid var(--page-line); border-radius: var(--radius-lg); padding: 24px; background: var(--surface-0); min-height: 96px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.dss-dd-do .dss-dd-stage { border-color: var(--ok-fill); }
.dss-dd-dont .dss-dd-stage { border-color: var(--err-fill); }
.dss-dd figcaption { font-size: var(--fs-body-sm); color: var(--page-fg); }
.dss-dd-badge { display: inline-block; font-weight: 700; margin-right: 4px; }
.dss-dd-do .dss-dd-badge { color: var(--ok-text); }
.dss-dd-dont .dss-dd-badge { color: var(--err-text); }
@media (max-width: 640px) { .dss-dd-cols { grid-template-columns: 1fr; } }
```

(Tokens `--amber-800`, `--fs-caption`, `--fs-body-sm`, `--radius-lg`, `--font-mono` vor Verwendung per `grep -n "<name>:" tokens/tokens.css` prüfen; wo ein Name fehlt, den im Repo üblichen Ersatz aus `stories/docs/_CodeSwitch.svelte` und `_SpecPage.svelte` nehmen. `.dss-sr-only` kommt aus `css/components.css`, die Storybook global lädt.)

- [ ] **Step 6: Tests grün, Typecheck, Mutation**

Run: `npx vitest run tests/doc-blocks.test.tsx && npm run typecheck`
Expected: PASS. Mutation: `{...INERT}` aus `DosDonts` entfernen, der inert-Test muss rot werden; zurücknehmen.

- [ ] **Step 7: Commit**

```bash
git add stories/docs/blocks tests/doc-blocks.test.tsx vitest.config.ts
git commit -m "feat(docs): React doc blocks DosDonts and FrameworkCode

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Button-Demos als Stories

**Files:**
- Create: `stories/components/ButtonExamples.svelte`
- Modify: `stories/Button.stories.ts`

- [ ] **Step 1: `ButtonExamples.svelte`**

```svelte
<script>
  import Button from '../../svelte/Button.svelte';

  /** @type {{ example: string }} */
  let { example } = $props();
  const variants = ['primary', 'amber', 'secondary', 'danger', 'ghost'];
  const stateNames = ['Standard', 'Hover', 'Fokus', 'Aktiv', 'Gesperrt'];
</script>

{#if example === 'anatomie'}
  <div class="row">
    <Button variant="primary">Primary</Button>
    <Button variant="amber">Amber</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
{:else if example === 'hierarchie'}
  <div class="grid2">
    <div>
      <div class="cap">Modal-Footer · Standard</div>
      <div class="row end"><Button variant="secondary">Abbrechen</Button><Button variant="primary">Freigeben</Button></div>
    </div>
    <div>
      <div class="cap">Modal-Footer · Destruktiv</div>
      <div class="row end"><Button variant="secondary">Behalten</Button><Button variant="danger">Verwerfen</Button></div>
    </div>
    <div>
      <div class="cap">Live-Scoring-Trigger · Touch</div>
      <Button variant="amber" touch>Live-Scoring starten</Button>
    </div>
    <div>
      <div class="cap">Toolbar · Quiet</div>
      <div class="row"><Button variant="ghost">Filter</Button><Button variant="ghost">Export</Button><Button variant="ghost">Mehr…</Button></div>
    </div>
  </div>
{:else if example === 'groessen'}
  <div class="row">
    <Button size="sm">Small · 36 px</Button>
    <Button size="md">Medium · 44 px</Button>
    <Button size="lg">Large · 52 px</Button>
    <Button touch>Touch · 64 px</Button>
  </div>
{:else if example === 'zustaende'}
  <!-- data-fixed-states: die Werkzeugleiste "Zustand" lässt diese Matrix in Ruhe -->
  <div class="matrix" data-fixed-states>
    <div class="surface light">
      <div class="states">
        <div class="head"></div>
        {#each stateNames as s}<div class="head">{s}</div>{/each}
        {#each variants as v}
          <div class="rowlabel">{v}</div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md pseudo-hover">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md pseudo-focus-visible">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md pseudo-hover pseudo-active">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md" disabled>{v}</button></div>
        {/each}
      </div>
    </div>
    <div class="surface dark">
      <div class="states">
        <div class="head dark-head">Auf dunklem Grund</div>
        {#each stateNames as s}<div class="head dark-head">{s}</div>{/each}
        {#each ['secondary', 'ghost'] as v}
          <div class="rowlabel dark-head">{v}</div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md pseudo-hover">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md pseudo-focus-visible">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md pseudo-hover pseudo-active">{v}</button></div>
          <div><button type="button" class="dss-btn dss-btn--{v} dss-btn--md" disabled>{v}</button></div>
        {/each}
      </div>
    </div>
  </div>

<!-- Dos und Don'ts -->
{:else if example === 'do-haupt'}
  <Button variant="amber">Spielbericht freigeben</Button><Button variant="secondary">Abbrechen</Button>
{:else if example === 'dont-haupt'}
  <Button variant="amber">Spielbericht freigeben</Button><Button variant="amber">Live-Scoring starten</Button>
{:else if example === 'do-verb'}
  <Button>Spielbericht freigeben</Button>
{:else if example === 'dont-verb'}
  <Button>OK</Button>
{:else if example === 'do-danger'}
  <Button variant="danger">Spiel verwerfen</Button>
{:else if example === 'dont-danger'}
  <Button variant="primary">Spiel verwerfen</Button>
{:else if example === 'do-touch'}
  <Button variant="amber" touch>2-Punkte buchen</Button>
{:else if example === 'dont-touch'}
  <Button variant="amber" size="sm">2-Punkte buchen</Button>
{:else if example === 'do-grund'}
  <div class="reason">
    <button type="button" class="dss-btn dss-btn--primary dss-btn--md" disabled aria-describedby="btn-grund">Freigeben</button>
    <p id="btn-grund" class="hint">Freigabe erst, wenn beide Teams unterschrieben haben.</p>
  </div>
{:else if example === 'dont-grund'}
  <button type="button" class="dss-btn dss-btn--primary dss-btn--md" disabled>Freigeben</button>
{/if}

<style>
  .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  .row.end { justify-content: flex-end; }
  .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
  .cap, .head, .rowlabel { font-family: var(--font-mono); font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-mute); }
  .cap { margin-bottom: 8px; }
  .matrix { display: flex; flex-direction: column; gap: 16px; }
  .surface { border: 1px solid var(--page-line); border-radius: var(--radius-lg); padding: 22px 24px; overflow-x: auto; }
  .light { background: var(--n-0); }
  .dark { background: var(--base-1000); }
  .dark-head { color: var(--n-400); }
  .states { display: grid; grid-template-columns: 110px repeat(5, max-content); gap: 14px 24px; align-items: center; }
  .reason { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
  .hint { margin: 0; font-size: var(--fs-body-sm); color: var(--page-mute); }
</style>
```

Die alte Seite zeigte zusätzlich „Fokus-Ring auf hellem und dunklem Grund“ mit `secondary`; das deckt jetzt die helle Matrix (alle Varianten) plus die dunkle Matrix (`secondary`, `ghost`) ab. Nichts weglassen, was die alte Seite zeigte.

- [ ] **Step 2: `Button.stories.ts` umbauen**

Datei komplett:

```ts
import ButtonDemo from './components/ButtonDemo.svelte';
import ButtonExamples from './components/ButtonExamples.svelte';

export default {
  title: 'Components/Button',
  component: ButtonDemo,
  argTypes: {
    view:    { control: 'inline-radio', options: ['single', 'variants', 'sizes', 'disabled'], description: 'Demo-Ansicht (nur Storybook)', table: { disable: true } },
    variant: { control: 'select', options: ['primary', 'amber', 'secondary', 'danger', 'ghost'], description: 'Visueller Ton', table: { defaultValue: { summary: "'primary'" } } },
    size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Höhenstufe', table: { defaultValue: { summary: "'md'" } } },
    touch:   { control: 'boolean', description: 'Erzwingt 64 px Hallen-Touch-Modus', table: { defaultValue: { summary: 'false' } } },
    disabled:{ control: 'boolean', description: 'Schaltet die Interaktion ab', table: { defaultValue: { summary: 'false' } } },
    label:   { control: 'text', description: 'Beschriftung (nur Storybook, in der App ist es der Inhalt)', table: { disable: true } },
  },
  args: { view: 'single', variant: 'primary', size: 'md', touch: false, disabled: false, label: 'Spielbericht freigeben' },
};

export const Primary       = { args: { variant: 'primary',   label: 'Spielbericht freigeben' } };
export const Amber         = { args: { variant: 'amber',     label: 'Live-Scoring starten' } };
export const Secondary     = { args: { variant: 'secondary', label: 'Abbrechen' } };
export const Danger        = { args: { variant: 'danger',    label: 'Spiel verwerfen' } };
export const Ghost         = { args: { variant: 'ghost',     label: 'Mehr Optionen' } };
export const HallenTouch   = { args: { variant: 'amber', touch: true, label: '2-Punkte buchen' } };
export const AlleVarianten = { args: { view: 'variants' } };
export const AlleGroessen  = { args: { view: 'sizes' } };
export const Disabled      = { args: { view: 'disabled' } };

// Beispiele für die Doku-Seite (Button.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string, extra: Record<string, unknown> = {}) => ({
  ...extra,
  render: () => ({ Component: ButtonExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Anatomie   = example('anatomie');
export const Hierarchie = example('hierarchie');
export const Groessen   = example('groessen');
export const Zustaende  = example('zustaende');

// Dos und Don'ts: nur in der Doku, nicht in der Seitenleiste
const hidden = (name: string) => example(name, { tags: ['!dev'] });
export const DoHaupt    = hidden('do-haupt');
export const DontHaupt  = hidden('dont-haupt');
export const DoVerb     = hidden('do-verb');
export const DontVerb   = hidden('dont-verb');
export const DoDanger   = hidden('do-danger');
export const DontDanger = hidden('dont-danger');
export const DoTouch    = hidden('do-touch');
export const DontTouch  = hidden('dont-touch');
export const DoGrund    = hidden('do-grund');
export const DontGrund  = hidden('dont-grund');
```

Die `Probe`-Story aus Task 1 entfällt. In der vorläufigen `Button.mdx` `ButtonStories.Probe` durch `ButtonStories.Anatomie` ersetzen, damit der Build läuft.

- [ ] **Step 3: Prüfen**

Dev-Server starten. Im Canvas `components-button--anatomie`, `--hierarchie`, `--groessen`, `--zustaende` öffnen und mit der alten Seite (`docs-button--spec`, auf `main`) vergleichen: gleiche Beispiele, gleiche Zustände. Die Werkzeugleiste „Zustand“ darf die Matrix nicht verändern, die Story `--primary` aber schon. Keine Konsolenfehler.

- [ ] **Step 4: Commit**

```bash
git add stories/components/ButtonExamples.svelte stories/Button.stories.ts stories/Button.mdx
git commit -m "feat(docs): Button demos, states matrix and Dos/Don'ts as stories

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Optik des Doku-Containers

**Files:**
- Modify: `.storybook/storybook.css`

- [ ] **Step 1: CSS anhängen**

```css
/* MDX-Doku-Seiten: DSS-Schrift und -Farben im Standard-Container */
.sbdocs.sbdocs-wrapper { background: var(--page-bg); }
.sbdocs-content { font-family: var(--font-body); color: var(--page-fg); }
.sbdocs-content h1, .sbdocs-content h2, .sbdocs-content h3 { font-family: var(--font-display); color: var(--page-fg); }
.sbdocs-content p, .sbdocs-content li { color: var(--page-fg); }
.sbdocs-content code:not(pre code) { font-family: var(--font-mono); }
```

Die Selektoren sind aus Storybooks Doku-Container abgeleitet; im Browser mit DevTools gegenprüfen (Klassen `sbdocs`, `sbdocs-content`) und anpassen, falls sie nicht greifen. Hell/Dunkel und Marke müssen sichtbar mitgehen (Seitenhintergrund und Fließtext). Soweit der Container beim Wechsel Hell/Dunkel nicht mitzieht, im Bericht nennen und nicht mit Hacks erzwingen.

- [ ] **Step 2: Sichtprüfung**

`components-button--docs` in BBV/DBB × Hell/Dunkel: Schrift, Seitenhintergrund, Lesbarkeit. Screenshots im Scratchpad.

- [ ] **Step 3: Commit**

```bash
git add .storybook/storybook.css
git commit -m "style(docs): DSS fonts and colours in the docs container

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: `Button.mdx` und Code-Beispiele

**Files:**
- Create: `stories/Button.code.ts`
- Replace: `stories/Button.mdx`

- [ ] **Step 1: `Button.code.ts`** (Texte unverändert aus `ButtonDoc.svelte` Zeilen 7 bis 32)

```ts
export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<button type="button" class="dss-btn dss-btn--primary dss-btn--md">Spielbericht freigeben</button>
<button type="button" class="dss-btn dss-btn--amber dss-btn--md is-touch">Live-Scoring starten</button>
<button type="button" class="dss-btn dss-btn--danger dss-btn--md">Verwerfen</button>
<button type="button" class="dss-btn dss-btn--ghost dss-btn--sm">Mehr…</button>
<button type="button" class="dss-btn dss-btn--primary dss-btn--md" disabled>Gesperrt</button>`;

export const svelte = `import Button from '@bbv/dss-design-system/svelte/Button';

<Button>Spielbericht freigeben</Button>
<Button variant="amber" touch>Live-Scoring starten</Button>
<Button variant="danger">Verwerfen</Button>
<Button variant="ghost" size="sm">Mehr…</Button>
<Button disabled>Gesperrt</Button>`;

export const react = `import { Button } from '@bbv/dss-design-system/react';

<Button>Spielbericht freigeben</Button>
<Button variant="amber" touch>Live-Scoring starten</Button>
<Button variant="danger">Verwerfen</Button>
<Button variant="ghost" size="sm">Mehr…</Button>
<Button disabled>Gesperrt</Button>`;
```

- [ ] **Step 2: `Button.mdx`** (Texte aus `ButtonDoc.svelte`; Abschnittsnummern entfallen)

```mdx
import { Meta, Canvas, Controls, Story } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';
import { DosDonts } from './docs/blocks/DosDonts';
import { FrameworkCode } from './docs/blocks/FrameworkCode';
import './docs/blocks/blocks.css';
import { vanilla, svelte, react } from './Button.code';

<Meta of={ButtonStories} />

# Button

Die meistgenutzte Aktion im Spielbericht. Fünf Varianten decken alle Hierarchien ab, vom Live-Scoring-Trigger bis zum unauffälligen Ghost-Link. Drei Größen plus ein Hallen-Touch-Modus für den Kampfgerichts-Tisch.

## Anatomie: eine Form, fünf Stimmen

Buttons haben eine einheitliche Höhe je Größe, gleiche Padding-Geometrie und dieselbe Radius-Skala. Die **Variante** wechselt nur Farbe und Border, die Anatomie bleibt konstant. So bleibt das Vokabular klein, aber jedes Wort hat einen klaren Ton.

<Canvas of={ButtonStories.Anatomie} />

## Hierarchie: wann was

**Primary** für die Hauptaktion einer Ansicht, **genau eine pro Screen**. **Amber** markiert Spielbericht-Aktionen mit Konsequenz (Live-Scoring starten, Aktionen abschließen). **Secondary** ist der Begleiter: Abbrechen, Zurück. **Danger** ist destruktiv und unwiderruflich. **Ghost** verschwindet fast und eignet sich für Toolbar-Aktionen.

<Canvas of={ButtonStories.Hierarchie} />

## Größen: drei Stufen plus Hallen-Touch

`sm · md · lg` decken alle Screen-Kontexte ab. Der zusätzliche `touch`-Modus erzwingt **64 px Höhe** für den Kampfgerichts-Tisch, getestet bis Wollhandschuh-Bedienung.

<Canvas of={ButtonStories.Groessen} />

| Größe | Höhe | Padding-X | Einsatz |
|---|---|---|---|
| `sm` | 36 px | 14 px | Inline, Toolbar, kompakte Listen |
| `md` | 44 px | 18 px | Standard, alle Screens |
| `lg` | 52 px | 22 px | Hero-CTA, Modal-Primary |
| `touch` | 64 px | 28 px | Kampfgericht, Halle, Tisch |

## Zustände: Hover, Fokus, Aktiv, Gesperrt

Jede Variante hat einen Hover-Zustand (eine Stufe dunkler bzw. heller), einen Fokus-Ring mit mindestens **3:1** Kontrast auf hellem und dunklem Grund und einen Aktiv-Zustand (leicht verkleinert). „Gesperrt“ reduziert auf 50 % Opacity und schaltet den Pointer ab.

<Canvas of={ButtonStories.Zustaende} />

Die Matrix ist fest gesetzt. Jede andere Story lässt sich über die Werkzeugleiste **Zustand** auf Hover, Fokus oder Aktiv schalten; „Gesperrt“ steht als Steuerelement bereit. Live: mit der Maus darüberfahren, mit Tab hineinspringen. Marke und Hell/Dunkel in der Werkzeugleiste umschalten.

## Verwendung: Import und Props

Importiere den Button über den Path-Export und reiche bei Bedarf `variant`, `size` oder `touch` hinein. Die Code-Beispiele folgen dem Umschalter „Fassung“ in der Werkzeugleiste.

<FrameworkCode vanilla={vanilla} svelte={svelte} react={react} />

<Controls of={ButtonStories.Primary} />

## Dos und Don'ts

<DosDonts
  pairs={[
    {
      title: 'Eine Haupt-Aktion pro Ansicht',
      doText: 'Ein amber Button als Hauptaktion, daneben Secondary.',
      dontText: 'Zwei amber Buttons konkurrieren, niemand weiß, was gemeint ist.',
      good: <Story of={ButtonStories.DoHaupt} inline />,
      bad: <Story of={ButtonStories.DontHaupt} inline />,
    },
    {
      title: 'Label als Verb',
      doText: 'Das Verb sagt, was passiert: „Spielbericht freigeben“.',
      dontText: '„OK“ sagt nichts über die Folge.',
      good: <Story of={ButtonStories.DoVerb} inline />,
      bad: <Story of={ButtonStories.DontVerb} inline />,
    },
    {
      title: 'Zerstörerisches in Rot',
      doText: '„Spiel verwerfen“ als Danger-Variante.',
      dontText: 'Dieselbe Aktion im schwarzen Primary-Stil sieht harmlos aus.',
      good: <Story of={ButtonStories.DoDanger} inline />,
      bad: <Story of={ButtonStories.DontDanger} inline />,
    },
    {
      title: 'Touch-Größe am Kampfgericht-Tisch',
      doText: 'Die Größe touch (64 px) für die Bedienung in der Halle.',
      dontText: 'Die Größe sm ist für Finger und Handschuhe zu klein.',
      good: <Story of={ButtonStories.DoTouch} inline />,
      bad: <Story of={ButtonStories.DontTouch} inline />,
    },
    {
      title: 'Gesperrt mit Grund',
      doText: 'Der Hinweis darunter erklärt, was fehlt.',
      dontText: 'Ein grauer Button ohne Erklärung lässt Nutzer raten.',
      good: <Story of={ButtonStories.DoGrund} inline />,
      bad: <Story of={ButtonStories.DontGrund} inline />,
    },
  ]}
/>
```

Falls `<Story … inline />` im Svelte-Storybook nicht rendert (nur ein Platzhalter oder ein iframe erscheint), `parameters: { docs: { story: { inline: true } } }` im `export default` von `Button.stories.ts` setzen und das Prop `inline` entfernen. Im Browser prüfen und im Bericht nennen.

- [ ] **Step 3: Bauen und im Browser prüfen**

```bash
npx storybook build -o "$TMPDIR/sb-w0" --quiet 2>&1 | tail -15
```

Seite `components-button--docs` über statischen Server: alle sechs Abschnitte, vier Canvas, Tabelle, Code-Block, Controls (nur `variant`, `size`, `touch`, `disabled` mit Beschreibung und Default), fünf Paare mit je zwei gerenderten Beispielen. Umschalter „Fassung“ ändert den Code-Block auf der Seite. Konsole ohne Fehler. Falls der Umschalter auf der Seite nicht reagiert, weil kein Decorator läuft: in `.storybook/preview.ts` im Modul-Scope `addons.getChannel().on('globalsUpdated', ({ globals }) => { document.documentElement.dataset.framework = globals.framework ?? 'svelte'; })` ergänzen (Import `import { addons } from 'storybook/preview-api'`).

- [ ] **Step 4: Commit**

```bash
git add stories/Button.mdx stories/Button.code.ts
git commit -m "feat(docs): Button page as MDX with Dos/Don'ts and code switch

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Alte Seite entfernen

**Files:**
- Delete: `stories/docs/ButtonDoc.svelte`, `stories/docs/Button.spec.stories.ts`

- [ ] **Step 1: Verweise suchen**

Run: `grep -rn "docs-button\|ButtonDoc\|Button.spec\|Docs/Button" --exclude-dir=node_modules --exclude-dir=storybook-static --exclude-dir=.worktrees --exclude-dir=docs . | head`
Expected: keine Treffer außer den beiden Dateien selbst. Treffer anderswo (zum Beispiel Links in `README.md`, `Introduction.svelte`) auf `?path=/docs/components-button--docs` umstellen.

- [ ] **Step 2: Löschen und committen**

```bash
git rm stories/docs/ButtonDoc.svelte stories/docs/Button.spec.stories.ts
git commit -m "chore(docs): remove old Docs/Button page (replaced by Button.mdx)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Gesamtprüfung

- [ ] **Step 1: Automatisch**

Run: `npm test && npm run typecheck && npx storybook build -o "$TMPDIR/sb-w0" --quiet`
Expected: alle Tests grün (700 + neue), Typecheck sauber, Build ohne Fehler und ohne Warnungen zu `Button.mdx`. Index prüfen: kein Eintrag `docs-button--spec`; genau ein `components-button--docs`; `components-button--do-*` und `--dont-*` ohne Tag `dev` (versteckt).

- [ ] **Step 2: Im Browser** (statischer Build, Playwright-MCP; Ergebnisse tabellarisch im Bericht)

1. `components-button--docs` in BBV/DBB × Hell/Dunkel × 420 px: kein seitliches Scrollen der Seite, Lesbarkeit, Dos und Don'ts untereinander unter 640 px.
2. Werkzeugleiste „Zustand“ auf der Docs-Seite und im Canvas (Primary, Disabled, TextInput, Tabs): Hover, Fokus, Aktiv sichtbar; „Normal“ stellt zurück; Zustands-Matrix bleibt fest.
3. Werkzeugleiste „Fassung“: Code-Block auf der Docs-Seite wechselt Vanilla, Svelte, React.
4. Don't-Beispiele: per Tab nicht erreichbar (`inert`), Do-Beispiele erreichbar; Tab-Reihenfolge ohne Fokusfallen.
5. axe auf der Docs-Seite (`node_modules/axe-core/axe.min.js` einspielen, `axe.run()`): keine Verstöße. Befunde, die vom Storybook-Container selbst stammen, getrennt ausweisen.
6. Inhaltsvergleich mit `git show main:stories/docs/ButtonDoc.svelte`: Liste, was 1:1 übernommen wurde und was bewusst entfiel (Hero-Optik, Abschnittsnummern).
7. Eine Auto-Docs-Seite einer anderen Komponente (zum Beispiel `components-card--docs`) rendert unverändert, ebenso `docs-forms--spec`.

- [ ] **Step 3: Bericht**

Offene Befunde (Overlay-Wurzel, Container-Theming, Inline-Stories) mit Entscheidung nennen. Danach `superpowers:finishing-a-development-branch` (lokal in `main` mergen, Worktree entfernen); nicht pushen ohne Freigabe.

---

## Selbstprüfung gegen die Spec

- MDX-Glob, `<Meta of>`, `autodocs` entfernt, Beschreibungstexte in MDX: Tasks 1, 5, 7.
- Demos als Stories, versteckte Dos/Don'ts: Tasks 1, 5.
- `DosDonts` (inert, Screenreader-Text, Tokens, 640 px): Task 4. `FrameworkCode` (Standard Svelte, Fehltext, fokussierbarer Bereich): Task 4.
- Werkzeugleiste „Zustand“, `Zustaende`-Story, Gesperrt als Control: Tasks 2, 3, 5. Overlay-Frage: Task 3 Schritt 3.
- Optik (DSS-Schrift und Farben): Task 6. Alte Seite und `storySort`: Tasks 3, 8.
- Prüfung (Build, Inhaltsvergleich, Fassung, Marke/Hell/Dunkel, 420 px, axe, `inert`, Tests): Task 9.
- Kein Platzhalter; offene Punkte sind als Prüfschritte mit festem Vorgehen formuliert.
