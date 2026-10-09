# MDX-Doku Welle 3: Overlays (Modal, Banner)

Arbeitsanleitung: `2026-10-09-mdx-wellen-2-bis-7-brief.md`. Es gibt keine alte manuelle Docs-Seite; Quelle für Inhalte ist die Spec `DSS Design System - Modals.html` (nur gelesen) und die Auto-Docs der Stories.

## Dateien
- Neu: `stories/Modal.mdx`, `stories/Banner.mdx`, `stories/Modal.code.ts`, `stories/Banner.code.ts`, `stories/components/ModalExamples.svelte`, `stories/components/BannerExamples.svelte`.
- Geändert: `stories/Modal.stories.ts`, `stories/Banner.stories.ts` (autodocs-Tag raus, argTypes beschrieben, Beispiel-Stories mit `!dev`), `*Demo.svelte`, `svelte/Modal.svelte` (eindeutige Titel-id), `css/components.css`, `.storybook/storybook.css`, `stories/docs/blocks/blocks.css`, Tests, `CHANGELOG.md`.

## Inhalte der Quellen
- Auto-Docs: keine `parameters.docs.description`; nur die Stories (Modal: Standard, Danger, Warn, Ok, Info; Banner: Info, Erfolg, Warnung, Fehler, OhneIcon).
- Modal-Spec: Anatomie (Backdrop 4 px Blur, Surface mit Radius und XL-Schatten, Icon-Slot nach Severity, Titel/Untertitel, Body scrollt, Footer rechts, Danger-Button bei Lösch-Modals), Confirm-Dialoge (Senden, Danger, Info, drei Optionen), Größen, Vanilla-Code, React mit Radix (Fokusfalle, Escape, `dismissOnBackdrop`). Bottom-Sheet, Drawer, Toast, Popover und Endbericht sind keine Komponenten des Pakets und entfallen.

## Seiten und Stories
- Modal: Anatomie, Schweregrade (5), Größen (4), Interaktiv (Button öffnet, Escape, Hintergrund, Schließen), Zustaende, Code, Controls, Dos und Don'ts.
- Banner: Schweregrade, Titel/Icon/Link, Rollen (alert/status), Zustaende (Link), Code, Controls, Dos und Don'ts.

## Geprüfte Fakten
- Svelte-Modal: Escape und Hintergrund-Klick schließen nur mit `closable`; keine Fokusfalle, kein Fokus beim Öffnen, keine Fokus-Rückgabe. React (Radix, per jsdom-Test geprüft): Fokus ins Modal, Fokusfalle, Escape; keine Fokus-Rückgabe (kein Radix-Trigger, Fokus fällt auf body).
- Größen: 380 / 480 / 560 / 720 px (`max-width: 100%`).
- Banner: kein Schließen-Button; Link über Inhalt (`.dss-banner a`).
- Fokus-Ring: `.dss-m-close` hat ihn, Banner-Link nicht (ergänzen, Test).
- Svelte-Modal vergibt eine feste id `dss-modal-title` (doppelt bei mehreren Modals): auf `$props.id()` umstellen, Test.
- Dunkelmodus: Banner und Modal-Icons nutzen bereits die `--dss-chip-*`-Tokens; messen.

## Tests
Fokus-Regel Banner-Link, eindeutige Modal-id, Kontrast-Regeln ohne nackte `--*-text`; danach Build, index.json, Browser, axe.
