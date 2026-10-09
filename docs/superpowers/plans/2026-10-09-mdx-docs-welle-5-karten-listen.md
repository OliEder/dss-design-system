# MDX-Doku Welle 5: Karten und Listen

Folgt `2026-10-09-mdx-wellen-2-bis-7-brief.md`. Ersetzt die automatischen Doku-Seiten von `Components/Card`, `Components/Card Library`, `Components/EmptyState` und die manuelle Seite `Docs/Cards & Lists`.

## Dateien

| Datei | Zweck |
| --- | --- |
| `stories/Card.mdx`, `Card.stories.ts`, `Card.code.ts`, `components/CardExamples.svelte` | Card: Varianten, Kopf und Fuß, Abstand, klickbare Karten, Zustände, Dos und Don'ts |
| `stories/CardLibrary.mdx`, `CardLibrary.stories.ts`, `CardLibrary.code.ts`, `components/CardLibraryExamples.svelte`, `components/CardLibraryPlayground.svelte` | MatchCard, PlayerCard, Skeleton (Beispiele, Spielwiese für Controls, Zustände) |
| `stories/EmptyState.mdx`, `EmptyState.stories.ts`, `EmptyState.code.ts`, `components/EmptyStateExamples.svelte` | EmptyState: Tonalitäten, nächster Schritt, Liste in vier Zuständen, Zustände des CTA |
| `css/components.css` | Fokus-Ring für klickbare Karten (`.dss-card` als Link, Button oder `role=button`), ggf. Dunkelmodus-Korrekturen nach Messung |
| `stories/docs/CardsDoc.svelte`, `Cards.spec.stories.ts` | entfallen |
| `.storybook/preview.ts` | storySort: `Docs` nur noch `Tables & Live-Scoring` |

## Verteilung der alten Seite „Cards & Lists“

- 01 Anatomy (vier Karten-Varianten) -> Card, Abschnitt Varianten
- 02 Match Cards -> CardLibrary, Spielkarte
- 03 Player Cards (compact, standard, hero) -> CardLibrary, Spielerkarte
- 04 Empty States -> EmptyState, Tonalitäten
- 05 Skeletons -> CardLibrary, Ladezustand

## Dos und Don'ts (Fakten aus dem CSS)

Card: ganze Karte klickbar nur ohne Bedienelemente darin (`:focus-within` hebt die Karte, ein Ziel je Karte); `hoverable` nur mit Ziel (Zeiger und Lift ohne Wirkung); Karten in Grid-Listen gleich hoch (`.dss-card` ist Flex-Spalte, `.dss-card-body` hat `flex: 1`); `flat` nicht auf `--dss-surface-2` (keine Border, kein Schatten).

CardLibrary: Skeleton mit der Struktur der Zielkarte; Platzhalter `–` statt leerem Kennzahlwert; `live` nur für laufende Spiele (Puls, grüner Balken); kompakte Zeile statt Standardkarte in langen Listen.

EmptyState: nächster Schritt statt nur „Keine Daten“; Rot nur bei Fehlern; Ladefehler als `error` mit Wiederholen statt als leere Liste.

## Prüfpunkte

- Test: klickbare Karte hat gestrichelten Ring; Karten, Match, Spielerkarte, EmptyState und Skeleton koppeln kein nacktes `--*-text` (ohne Dunkelmodus) mit Flächen.
- Kontrast des Rings auf Kartenflächen und getönten EmptyState-Flächen, hell und dunkel, beide Marken.
- Dunkelmodus der Positionsmarken, Status- und Kapitän-Chips messen.
- Skeleton: Animation `dss-skel-shimmer` (1,4 s), `prefers-reduced-motion: reduce` stoppt sie.
