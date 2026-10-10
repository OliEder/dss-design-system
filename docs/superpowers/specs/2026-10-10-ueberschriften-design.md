# Design: Überschriftenebenen (HeadingLevel) und Überschriftengröße über Tokens

Stand: 2026-10-10 · Auftraggeber: „bau 1 und 3“ (Größe über Tokens, Ebene vom Abschnitt vorgeben).

## Ausgangslage
- Keine Komponente gibt eine `h1` aus (die gehört der App). Alle Komponenten mit Überschrift haben `titleAs: 'h2' | 'h3' | 'h4'` (Standard `h3`): ScheduleTable, ScheduleGrid, Table, PlayerCard, EmptyState, PlayByPlay, TeamCard (neu in Paket 4). Das Modal hat eine feste `h2`.
- Ein Token kann die **Ebene** nicht ändern (das ist das HTML-Element), nur das **Aussehen**. Ziel ist, Ebene und Aussehen zu trennen und die Ebene abschnittsweise vorzugeben.

## Teil 1: Aussehen über Tokens, unabhängig von der Ebene
- Die sichtbare Größe jeder Komponentenüberschrift hängt an einer **Klasse**, nie am Elementnamen (`h2`/`h3`/`h4` sehen gleich aus). Das wird getestet (kein Selektor `h2`, `h3`, `h4` für Größen in `css/components.css`; Browser-Messung: gleiche Größe bei `titleAs` h2 und h4).
- Neue Tokens mit der heutigen Größe als Vorgabe, überschreibbar in jedem Bereich:
  - `--dss-title-size` (Schriftgröße), `--dss-title-weight`, `--dss-title-leading` (Zeilenhöhe), global für alle Komponentenüberschriften.
  - Komponentenspezifisch mit Rückfall auf das globale Token: `--dss-frame-title-size` (Table, ScheduleTable, ScheduleGrid, PlayByPlay-Rahmen), `--dss-card-title-size` (PlayerCard, TeamCard, EmptyState).
  - Vorgabewerte = die heutigen Werte (`--fs-h3` usw.), damit sich ohne Eingriff nichts ändert (Messung vorher/nachher).
- Doku: Token-Tabelle auf der neuen Foundation-Seite „Überschriften“ mit Beispiel: dieselbe Karte als `h2` mit kleiner Schrift (`--dss-title-size`) und als `h4` mit großer.

## Teil 3: Ebene vom Abschnitt vorgeben (`HeadingLevel`)
- Reine Funktion `js/heading.js` (+ `.d.ts`, Export `./heading.js`): `headingTag(level)` → `'h2'..'h6'` (Ebenen unter 2 und über 6 werden begrenzt, weil eine Komponente nie die `h1` der Seite sein soll; keine Ganzzahl → Standard 3) und `nextLevel(current, by = 1)`.
- **React:** `HeadingLevel` (Komponente, `react/HeadingLevel.tsx`) mit Props `level?: 2|3|4|5|6` (absolut) oder `by?: number` (relativ zum übergeordneten `HeadingLevel`, Standard 1; ohne Vorfahr zählt die Ausgangsebene 2) und Hook `useHeadingLevel()`. Alle Titelkomponenten lesen die Ebene in dieser Reihenfolge: `titleAs` (Prop gewinnt) > Ebene aus `HeadingLevel` > Standard `h3`. Der Typ von `titleAs` wird zu `'h2'|'h3'|'h4'|'h5'|'h6'`.
- **Svelte:** `svelte/HeadingLevel.svelte` (Props `level`, `by`, Snippet `children`; `setContext`) und gemeinsame Hilfe zum Lesen; dieselbe Rangfolge; Typ von `titleAs` ebenso erweitert. Kein `<style>` (Paritätsregel).
- Die Ebene wirkt auf die **Komponentenüberschriften**, nicht auf Text der App. Verschachtelung: Eine Komponente, die selbst Inhalt mit Titelkomponenten enthält (z. B. das Modal mit einer Tabelle darin), erhöht die Ebene für ihren Inhalt um 1 (Modal: Titel `h2`, Inhalt Ebene 3). Das wird dokumentiert und getestet.
- Vanilla-HTML: kein Provider; es bleibt beim Standard `h3`, die Ebene wählt man im Markup. Die Doku sagt das ausdrücklich.
- Das Modal bekommt `titleAs` (Standard `h2`) und gibt seinen Kindern die Ebene `titleAs + 1`.
- Sichtbarer Schutz: Die Docs-Seiten bekommen vor dem ersten Beispiel jeweils eine `##`-Überschrift (heading-order bleibt in allen Docs-Seiten frei von axe-Verstößen).

## Doku
- Neue Foundation-Seite `Foundation/Überschriften` (Datei `Headings.mdx`/`Headings.stories.ts`/`Headings.svelte`): Ebene ≠ Größe, Rangfolge (`titleAs` > `HeadingLevel` > `h3`), Tokens, `HeadingLevel` (React und Svelte, Code-Beispiele je Fassung, typ- bzw. kompilierge­prüft), Beispiel mit zwei Abschnitten (Seite h1 → Abschnitt h2 mit `HeadingLevel level={3}`), Dos/Don'ts: Ebenen nicht überspringen; Ebene nach Gliederung, nicht nach Größe wählen (Größe per Token); pro Seite genau eine `h1` (gehört der App). axe `heading-order` im Beispiel.
- Inhaltsverzeichnis in `Introduction.mdx`, `storySort`, CHANGELOG, README (Hinweis zu `titleAs`/`HeadingLevel`), `package.json` exports (`./svelte/HeadingLevel`, `./heading.js`), `react/index.ts`, `parity.manifest.json`.
- Alle Komponentenseiten: `titleAs`-Zeilen in den Props-Tabellen aktualisieren (Rangfolge, h2–h6, `HeadingLevel`).

## Prüfung
- Tests: `headingTag`/`nextLevel` (Tabellentests), React-Tests (Rangfolge, Verschachtelung, Modal-Kinder, Prop gewinnt), SSR-Parität Svelte↔React für alle Titelkomponenten mit `HeadingLevel`, CSS-Test „Größe nie am Elementnamen“, Token-Vorgaben = heutige Werte.
- Browser: axe `heading-order` auf allen Docs-Seiten und im Beispiel; gleiche Größe bei h2/h4 (Messung); Token-Überschreibung wirkt (Messung); Regression der übrigen Seiten bei 420 px.
- Reihenfolge: nach Paket 4 (gleiche Dateien), danach Review und Merge wie bisher.
