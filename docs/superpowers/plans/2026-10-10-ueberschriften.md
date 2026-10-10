# Plan: Überschriften (HeadingLevel und Größen-Tokens)

Spec: `docs/superpowers/specs/2026-10-10-ueberschriften-design.md`. Branch `feat/ueberschriften`.

## Teil 1: Größe über Tokens
- Titelklassen: `.dss-frame-title`, `.dss-pbp-title` (Rahmen), `.dss-pc-nm`, `.dss-team-nm`, `.dss-empty-title` (Karten), `.dss-m-title` (Modal). Elementselektoren `h1` bis `h6` setzen in `css/components.css` keine Größen (Test).
- Tokens werden nicht auf `:root` festgelegt, sondern nur mit Rückfall gelesen: `font-size: var(--dss-frame-title-size, var(--dss-title-size, <heutiger Wert>))`; so bleibt jeder heutige Wert pro Klasse erhalten, und ein Überschreiben in einem Container wirkt auf alle Titel darin. Gleiches für `--dss-title-weight` und `--dss-title-leading`.
- Messung vorher/nachher aller Titelgrößen (Browser, BBV/DBB, Schrift standard/dbb, 1280/420 px).

## Teil 3: HeadingLevel
- `js/heading.js` (+ `.d.ts`): `headingTag`, `nextLevel`. String-Ebenen wie '3' sind ungültig (Standard h3), dokumentiert und getestet.
- React `HeadingLevel` + `useHeadingLevel`, Svelte `HeadingLevel.svelte` + gemeinsame Lesehilfe `svelte/heading-context.js`? (Entscheidung beim Umsetzen), alle sieben Titelkomponenten und das Modal (`titleAs`, Standard h2, Kinder auf `titleAs + 1`).
- Rangfolge: `titleAs` > `HeadingLevel` > `h3`.

## Doku
`stories/Foundation/Headings.{mdx,stories.ts,svelte}`, Code-Beispiele (`Headings.code.ts`), Inhaltsverzeichnis, `storySort`, README, CHANGELOG, `titleAs`-Zeilen aller Komponentenseiten, `##`-Überschrift vor dem ersten Beispiel jeder Docs-Seite.

## Tests
Tabellentests `headingTag`/`nextLevel`, React-Tests, SSR-Parität (sieben Komponenten + Modal), CSS-Tests, Quelltest ohne h1, Doku-Beispiele, Mutationstests.

## Prüfung
Tests (3x), Typecheck, Storybook-Build, Index, Link-Check, Browser (Marken, Hell/Dunkel, 1280/420, axe `heading-order`), Messungen, Zugänglichkeitsbaum.
