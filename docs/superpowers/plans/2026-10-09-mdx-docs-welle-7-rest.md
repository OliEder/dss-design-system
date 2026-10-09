# Welle 7 (Rest): Icon, CourtLines, Foundation, Introduction, Abschluss-Sweep

Arbeitsanleitung: `2026-10-09-mdx-wellen-2-bis-7-brief.md`.

## Seiten
| MDX | hängt an | Inhalt |
|---|---|---|
| `Icon.mdx` | `Icon.stories.ts` | Sprite-Konzept, Größen, `currentColor`, Barrierefreiheit, Galerie (67 IDs mit Namen), Code, Props, Dos und Don'ts |
| `CourtLines.mdx` | `CourtLines.stories.ts` | Konzept, Einbau (fixed/absolute), Markenfarben und Deckkraft aus CSS, Kontrast, Code, Props, Dos und Don'ts |
| `Foundation/Colors.mdx` | `Colors.stories.ts` | Hue-Rampen, semantische Tokens |
| `Foundation/Typography.mdx` | `Typography.stories.ts` | Skala, Familien, Zahlen, Einsatz, Audit |
| `Foundation/FocusHover.mdx` | `FocusHover.stories.ts` | Ring und Hover, Links auf Komponentenseiten |
| `Introduction.mdx` | `Introduction.stories.ts` | Einstieg, Inhaltsverzeichnis, Werkzeugleiste |

## Dateien
- `components/IconDemo.svelte` (nur Einzel-Icon für Controls), `components/IconExamples.svelte` (Größen, Farbe, Barrierefreiheit, Galerie, Dos/Don'ts), `Icon.code.ts`
- `components/CourtLinesDemo.svelte` bleibt Demo für Controls, `components/CourtLinesExamples.svelte`, `CourtLines.code.ts`
- Foundation-Svelte-Dateien verlieren Überschrift und Einleitung (steht in der MDX), werden schmal lesbar (420 px)
- `.storybook/storybook.css` und `blocks.css`: Bezugsrahmen für `.dss-courtbg` (fixed)

## Dos und Don'ts (belegt)
Icon: `title` setzt `role="img"` und `aria-label`, ohne `title` ist es `aria-hidden` (Icon.svelte); `.dss-icon` erbt `currentColor`; Größe wie Schrift; Farbe nie allein.
CourtLines: Linienfarbe/Deckkraft aus `--dss-court-*` (CSS); Text darüber messen (7:1); `aria-hidden`; Inhalt braucht `position: relative; z-index: 1`; `absolute` braucht Bezugsrahmen.

## Abschluss-Sweep
Link-Check gegen `index.json`, kein `autodocs`, `stories/docs/` nur `blocks/`, ungenutzte Demos, README, CHANGELOG, Vollständigkeitsliste.
