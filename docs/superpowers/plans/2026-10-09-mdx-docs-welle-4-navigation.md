# MDX-Doku Welle 4: Navigation (Tabs, Navigation, AppNav)

Arbeitsanleitung: `2026-10-09-mdx-wellen-2-bis-7-brief.md`. Alte Seite: `Docs/Navigation` (`stories/docs/NavigationDoc.svelte`, 205 Zeilen, ohne Code-Beispiele).

## Inhalte der Quellen
- NavigationDoc: Einleitung (vier Familien), 01 Top-Bar (Live, Admin, Default), 02 Tabs (Underline, Segmented, Pills), 03 Bottom-Nav (Schiri-App mit FAB und Badge, 64 px), 04 Breadcrumbs (Plain, Tagged, Chip), 05 Stepper (Horizontal, Compact, Vertikal).
- `Navigation.stories.ts`: Description (TopBar, BottomNav, Breadcrumbs, Stepper, Verweis auf Tabs); Stories pro `view`.
- `AppNav.stories.ts`: Description (currentHref, gesperrte Einträge, Esc und Klick außerhalb, Vanilla-Vertrag); Stories Hell, Dunkel.
- `Tabs.stories.ts`: keine Description; fünf Stories.

## Dateien
- Neu: `stories/Tabs.mdx`, `Navigation.mdx`, `AppNav.mdx`, `*.code.ts`, `stories/components/{Tabs,Navigation,AppNav}Examples.svelte`.
- Geändert: die drei `*.stories.ts` (autodocs-Tag raus, argTypes beschrieben, Beispiel-Stories mit `!dev`), `.storybook/preview.ts` (storySort), `CHANGELOG.md`, Tests, ggf. `css/components.css`.
- Entfernt: `stories/docs/NavigationDoc.svelte`, `stories/docs/Navigation.spec.stories.ts`; Verweis in `docs/superpowers/specs/2026-10-08-dos-donts-design.md` bleibt als Historie.

## Geprüfte Fakten (aus dem Code)
- Tabs: Pfeiltasten (links/rechts, vertikal oben/unten) wählen und fokussieren, überspringen gesperrte, springen am Rand um; kein Home/End. Aktiver Tab hat `tabindex=0`. Keine `id`/`aria-controls` an den Tabs, das Panel verbindest du selbst. Mehrfachauswahl: `role=group` mit `aria-pressed`.
- AppNav: nur Escape ist belegt (keine Pfeiltasten); gesperrter Link ist ein `span role=link aria-disabled` (nicht fokussierbar), gesperrte Gruppe ein `disabled`-Button; eine Gruppe offen, Wechsel schließt die andere; Fokus verlassen und Klick außerhalb schließen; Escape gibt den Fokus an den Auslöser zurück; Mobil unter 720 px mit `dss-appnav-toggle`.
- BottomNav: FAB ändert die Auswahl nicht (`onaction`); Stepper-Punkt nur Button mit `onstep` und nicht pending.

## Seiten und Stories
Je Seite: Einleitung, Abschnitte als Canvas, Zustaende (fest), Verwendung (FrameworkCode, Controls bzw. DocTable), Dos und Don'ts. AppNav zusätzlich eine Mobil-Vorschau (iframe, 390 px).

## Prüfungen
Fokus-Regeln aller bedienbaren Teile (Test), Ring-Kontrast auf Tab-, BottomNav- und dunkler AppNav-Fläche messen, Dunkelmodus (`--*-text` im Nav-Block), Build, index.json, Browser, axe.
