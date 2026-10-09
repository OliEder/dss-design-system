# MDX-Doku Welle 2: Eingaben (TextInput, Select, Checkbox)

Arbeitsanleitung: `2026-10-09-mdx-wellen-2-bis-7-brief.md`. Die alte Seite `Docs/Forms` (`FormsDoc.svelte`, `Forms.spec.stories.ts`) entfällt; ihre Inhalte gehen in die TextInput-Seite.

## Dateien
- Neu: `stories/TextInput.mdx`, `Select.mdx`, `Checkbox.mdx`; `stories/TextInput.code.ts`, `Select.code.ts`, `Checkbox.code.ts`; `stories/components/TextInputExamples.svelte`, `SelectExamples.svelte`, `CheckboxExamples.svelte`.
- Geändert: `stories/{TextInput,Select,Checkbox}.stories.ts` (autodocs-Tag raus, argTypes beschrieben, Beispiel-Stories mit Tag `!dev`), `*Demo.svelte` (Dichte), `.storybook/preview.ts` (storySort), `tests/focus-ring.test.ts`, `CHANGELOG.md`.
- Gelöscht: `stories/docs/FormsDoc.svelte`, `stories/docs/Forms.spec.stories.ts`.

## Inhalte der alten Seite (FormsDoc)
Intro; 01 Anatomie (Label, Input, Hilfetext, Sternchen, Optional-Tag; zwei Beispiele); 02 Zustände (Default, Erfolg, Warnung, Fehler); 03 Disabled (zwei Beispiele). Keine Code-Beispiele. Dazu Description der Checkbox-Stories.

## Seiten und Stories
- TextInput: Anatomie, Tonalitaeten, Gesperrt, Dichten (neu, aus Svelte/CSS abgeleitet), Zustaende, Code (Vanilla/Svelte/React), Controls, Dos und Don'ts.
- Select: Varianten (Standard, Zustände, Kompakt), Zustaende, Code, Controls, Dos und Don'ts.
- Checkbox: Anatomie (mit Hinweistext), Dichten, Zustaende, Code, Controls, Dos und Don'ts.

## Geprüfte Fakten (css/components.css, tokens)
- Feldhöhen: touch 56 px (Basis `.dss-input`), default 44 px, compact 36 px (`--fld-h-*`). Select default 44, compact 36. Checkbox: min-height 44 / compact 36, Box 22 px.
- Fokus: `.dss-input-group:focus-within`, `.dss-select:focus-visible`, `.dss-check-input:focus-visible`, alle mit `--ring-w --ring-style --ring-color`, Offset 2 px. Keine Lücke, kein CSS-Eingriff nötig; Test sichert es ab.
- Hover/Aktiv: keine eigenen Regeln für Eingabe, Select, Checkbox; die Matrix zeigt Standard, Fokus, Gesperrt.
- Gesperrt: Eingabe und Select dämpfen nur die Textfarbe (`--dss-mute`) und setzen `cursor: not-allowed`; Checkbox 50 % Opacity. (Die alte Doku behauptete einen gedimmten Hintergrund: stimmt nicht.)
- Status: Rahmen `--err-fill/--ok-fill/--warn-fill`, Hilfetext `--*-text`, `aria-invalid` nur bei Fehler.

## Dos und Don'ts
- TextInput: Label sichtbar mit `for`; Fehlertext nennt den Weg (nicht nur Farbe); Format vorab im Hilfetext; Rot nur für ungültig, Amber für grenzwertig; gesperrt mit Erklärung.
- Select: Label sichtbar; Fehlertext; Standardhöhe 44 px statt kompakt in Touch-Formularen; gesperrt mit Erklärung.
- Checkbox: ganze Label-Fläche klickbar; Hinweis als `hint`; Standard 44 px, kompakt nur in dichten Ansichten; gesperrt mit Erklärung.

## Tests
`tests/focus-ring.test.ts`: Fokus-Regeln für Eingabegruppe, Select, Checkbox vorhanden und gestrichelt. Danach Build, index.json, Browser, axe.
