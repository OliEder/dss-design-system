# Design: Manuelle Doku wird MDX in den Auto-Docs

Stand: 2026-10-09 · Welle 0 (Grundlage und Button-Pilot) ist detailliert, die weiteren Wellen sind nur grob geplant.

## Ziel

Die manuell gepflegten Svelte-Seiten (`stories/docs/*Doc.svelte`, im Storybook unter `Docs/*`) gehen schrittweise in die Auto-Docs über. Zu
**jeder Komponente** gibt es eine MDX-Seite, die die automatische Doku-Seite ersetzt: Text, Abschnitte, die echten Beispiele als
Stories (`<Canvas>`), die Props-Tabelle (`<Controls>`) und Dos und Don'ts. Eine Quelle je Komponente; die alte `Docs/*`-Seite
entfällt, sobald ihr Inhalt migriert ist.

## Entscheidungen (vom Auftraggeber)

| Frage | Entscheidung |
|---|---|
| Seitenmodell | Eine MDX-Seite je Komponente, ersetzt die Auto-Seite (`<Meta of={…Stories} />`) |
| Umfang | **Alle** Komponenten, nach und nach in Wellen |
| Pilot und Reihenfolge | Welle 0: Grundlage + Button. Welle 1: Spielplan. Welle 2: Eingaben. Welle 3: Overlays. Welle 4: Navigation. Welle 5: Karten und Listen. Welle 6: Tabellen und Live. Welle 7: Rest (Icon, CourtLines, Foundation) |
| Optik | Storybook-Standardstruktur mit DSS-Schrift und -Farben (über CSS); die Hero-Optik und großen Abschnittsnummern der alten Seiten entfallen |
| Responsive Ansichten | Stories prüft man im Canvas mit der Werkzeugleiste „Viewport size“ (nur dort verfügbar, nicht auf Doku-Seiten). Eingebettete Handy-Vorschauen bleiben nur, wo ein Text das Handyverhalten erklärt (Spielplan, Welle 1) |
| Code-Beispiele | Der Umschalter „Fassung“ (Vanilla, Svelte, React) bleibt; ein React-Baustein für MDX folgt ihm |
| Dos und Don'ts | Als React-Baustein für MDX; Beispiele sind versteckte Stories |

## Technische Grundlage (Welle 0)

- `.storybook/main.ts`: `stories` bekommt `'../stories/**/*.mdx'`. `@storybook/addon-docs` ist installiert (10.6.1, enthält den MDX-Loader);
  React 18 und `@mdx-js/react` sind vorhanden.
- **Nur Stories sind einbettbar:** In MDX lassen sich keine Svelte-Komponenten direkt rendern. Jede Demo der alten Seite wird eine eigene Story
  (zum Beispiel `Anatomie`, `Hierarchie`, `Groessen`, `Zustaende`) und erscheint in der MDX über `<Canvas of={…} />`.
- **Anbindung:** `stories/Button.mdx` mit `<Meta of={ButtonStories} />` (Import der Story-Datei). Die Story-Datei verliert `tags: ['autodocs']`;
  dadurch gibt es keine doppelte Doku-Seite. Die Beschreibungstexte aus `parameters.docs.description` wandern in den MDX-Text.
- **Versteckte Stories:** Beispiele, die nur in der Doku erscheinen (zum Beispiel die Dos und Don'ts), tragen `tags: ['!dev']`. Sie sind nicht in der
  Seitenleiste, aber über `<Story of=…>` und `<Canvas of=…>` einbettbar.
- **Optik:** Standard-Doku-Struktur; CSS für DSS-Schrift, -Farben und -Abstände im Doku-Container (`.sbdocs`) in `.storybook/storybook.css` bzw. über
  `parameters.docs.theme`. Marke und Hell/Dunkel folgen der Werkzeugleiste, soweit der Doku-Container das zulässt (zu prüfen).

### React-Bausteine für MDX (`stories/docs/blocks/`)

1. **`DosDonts`**: Props `pairs: { title: string; doText: string; dontText: string; good: ReactNode; bad: ReactNode }[]`, in MDX gefüllt mit
   `<Story of={…} />`. Aufbau pro Paar: Überschrift (die Regel, `h3`), zwei Rahmen nebeneinander „✓ Do“ und „✗ Don't“, darunter je ein Begründungssatz.
   Bedeutung in Symbol und Wort, nicht nur in Farbe; Farben aus den semantischen Tokens. Falsche Beispiele sind `inert` und tragen eine für
   Screenreader lesbare Beschriftung „Beispiel für falsche Verwendung“. Unter 640 px stehen die Rahmen untereinander.
2. **`FrameworkCode`**: Props `vanilla?`, `svelte?`, `react?` (Strings), optional `label`. Zeigt nur den Block der aktiven Fassung, Standard Svelte;
   fehlt der Code, steht „Für diese Fassung gibt es hier kein Beispiel.“ Die aktive Fassung kommt aus dem globalen Umschalter „Fassung“
   (`html[data-framework]`, im Preview-Dekorator gesetzt; auf Doku-Seiten ohne gerenderte Story muss das Attribut ebenfalls gesetzt sein, zum Beispiel
   über das Channel-Ereignis `globalsUpdated`). Codeblöcke: Mono-Schrift ohne Ligaturen, fokussierbarer Scrollbereich mit Namen.

Der Svelte-Baustein `stories/docs/_CodeSwitch.svelte` bleibt bis zur Migration der Spielplan- und Button-Seite bestehen und entfällt danach.

## Button-Pilot

Quelle: `stories/docs/ButtonDoc.svelte` (Abschnitte Anatomy, Hierarchy, Sizes, States, Usage) und `stories/Button.stories.ts`.

Neue Dateien/Änderungen:
- `stories/Button.mdx`: Titel, Einleitungstext der alten Seite, Abschnitte als Überschriften mit `<Canvas of={…} />`, `<Controls of={…} />` für die Props,
  `FrameworkCode` für die Verwendung (Vanilla, Svelte, React wie auf der alten Seite), `DosDonts` mit den fünf Regeln.
- `stories/Button.stories.ts`: `tags: ['autodocs']` entfällt; neue Stories für die Demos der alten Seite: `Anatomie`, `Hierarchie`, `Groessen`,
  `Zustaende` (Matrix Variante × Zustand mit den festgesetzten Zuständen `pseudo-hover` und anderen, wie auf der alten Seite) und die versteckten
  Beispiele für die Dos und Don'ts. Die vorhandenen Stories (`Primary`, `Amber`, … `Disabled`) bleiben.
- Entfernt nach der Migration: `stories/docs/ButtonDoc.svelte`, `stories/docs/Button.spec.stories.ts`, der Eintrag „Button“ in `storySort`.

**Inhalte der fünf Dos und Don'ts (Button):**
1. Eine Haupt-Aktion pro Ansicht. Do: ein amber Button plus Secondary. Don't: zwei amber Buttons nebeneinander.
2. Label als Verb. Do: „Spielbericht freigeben“. Don't: „OK“.
3. Zerstörerisches in Rot. Do: „Spiel verwerfen“ als `danger`. Don't: dieselbe Aktion im schwarzen Primary-Stil.
4. Touch-Größe am Kampfgericht-Tisch. Do: `touch` (64 px). Don't: `sm` für Bedienung in der Halle.
5. Gesperrt mit Grund. Do: deaktivierter Button mit Hinweistext. Don't: grauer Button ohne Erklärung.

## Zustände einschließlich Fokus (Vorlage für alle Komponenten)

Bisher zeigt nur die Button-Seite die Zustände Hover, Fokus, Aktiv und Gesperrt (feste Klassen `pseudo-*`). Bei allen anderen Komponenten fehlt
besonders der Fokus-Zustand. Ab Welle 0 gehört in jede MDX-Seite ein Abschnitt **Zustände** als Story `Zustaende`:
Standard, Hover, Fokus (`pseudo-focus-visible`), Aktiv, Gesperrt, jeweils auf hellem und dunklem Grund; bei Eingabefeldern zusätzlich Fehler.
Welche Zustände eine Komponente hat, richtet sich nach ihren CSS-Regeln; fehlende Fokus-Regeln werden in der jeweiligen Welle ergänzt und nicht
nur dokumentiert. Beim Button kommt dazu der Abgleich, ob Fokus-Ring (Farbe, Abstand, Kontrast auf Hell und Dunkel, beide Marken) auf der neuen Seite
sichtbar und konsistent ist; Abweichungen werden in Welle 0 behoben.

## Prüfung (Welle 0)

- Storybook-Build erfolgreich **und** `npm run storybook` startet ohne Fehler; `components-button--docs` rendert die neue MDX-Seite (keine doppelte
  Auto-Seite, keine Konsolenfehler).
- Inhaltsvergleich: Jeder Abschnitt, jedes Beispiel und jeder Text der alten Seite ist in der MDX oder bewusst entfallen (Liste im Bericht).
- Umschalter „Fassung“ wirkt auf der neuen Seite; Marke und Hell/Dunkel; 420 px; A11y (axe) ohne Verstöße; `inert` an den Don't-Beispielen.
- Alle Tests und der Typecheck bleiben grün; der Link-/Sortierungs-Check: die Seitenleiste enthält `Docs/Button` nicht mehr.

## Spätere Wellen (grob)

Pro Welle dieselbe Vorlage: Stories für die Demos, MDX mit Text/Canvas/Controls/Dos und Don'ts, Auto-Tag entfernen, alte Svelte-Seite löschen.
Welle 1 (Spielplan) zieht `SpielplanDoc.svelte` (15 Zustände, Handy-Vorschauen, Spielwiese, Code-Umschalter) um; die Spielwiese bleibt eine eigene Story.
Foundation-Seiten (Farben, Typografie, Fokus und Hover) und die Einführungsseite folgen in Welle 7.

## Bewusst nicht Teil von Welle 0

- Alle anderen Komponenten.
- Änderungen an den Komponenten selbst.
- Neue Abhängigkeiten außer dem bereits installierten Docs-Addon.
