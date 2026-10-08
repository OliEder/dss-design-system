# Design: Spielplan-Dokumentation und Spielwiese

Stand: 2026-10-08 · Ergänzt `2026-10-08-spielplan-design.md` (Komponenten) um eine vollständige Doku.

## Ziel

Die Spielplan-Komponenten (`ScheduleTable`, `ScheduleGrid`) haben bisher nur einen Beispielabschnitt auf der Tabellen-Seite und Stories mit
festen Daten. Es fehlen alle Varianten und Zustände, und nichts davon lässt sich schalten (zum Beispiel „live“). Neu:

1. Eine eigene manuelle Seite **`Docs/Spielplan`** mit allen Varianten, Zuständen, der Handy-Ansicht, der API und den Hinweisen.
2. Eine Story **`Components/Spielplan Spielwiese`**, in der sich alles per Steuerelement einstellen lässt.

Die manuellen Seiten sind die Dokumentation (Entscheidung: kein `@storybook/addon-docs`).

## Seite `Docs/Spielplan`

Basis: `stories/docs/_SpecPage.svelte` und die Konventionen der vorhandenen Seiten (`stories/docs/TablesDoc.svelte`, `*.spec.stories.ts`);
der Abschnitt „Spielpläne“ wird aus `TablesDoc.svelte` herausgelöst (dort bleibt ein Verweis auf die neue Seite). Neue Datei
`stories/docs/SpielplanDoc.svelte` plus `stories/docs/Spielplan.spec.stories.ts`; der Titel erscheint in der Seitenreihenfolge
(`storySort` in `.storybook/preview.ts`) unter `Docs`.

| Abschnitt | Inhalt |
|---|---|
| 01 Wann welche Variante | Entscheidungshilfe mit je einem kleinen Beispiel: Liga/Halle (`versus`), Mannschaft (`opponent`), Turnier-Liste (`columns`), Tagesplan (Zeitraster) |
| 02 Tabelle | Alle drei Layouts mit voller Beispieldatei (Vereinsregister-Stil mit Logo, vs./@, S/N-Chip; Liga mit Liga-Unterzeile und Halle; Turnier mit Nr, Feld, Halle) |
| 03 Zeitraster | Raster mit drei Hallen, Pause, Freilos, leerer Zelle; Hinweis „höchstens drei Spalten“ mit einem Gegenbeispiel mit fünf Spalten (seitliches Scrollen mit fester Zeitspalte) |
| 04 Zustände | Jeder Zustand einzeln als Mini-Tabelle: geplant, **live**, beendet, vorläufig, abgesagt, verlegt, Freilos, eigene Mannschaft, Platzhalter, Sieg/Niederlage/Unentschieden (Chip), Konflikt-Hinweis |
| 05 Dichte und Handy | Touch, Standard, Kompakt im Vergleich; **Handy-Ansicht** als eingebettete Vorschau in 390 px Breite (siehe unten) |
| 06 Daten und Snippets | Felder von `ScheduleGame` und `ScheduleTeam` als Tabelle, Props beider Komponenten, React `render*` gegenüber Svelte-Snippets, Code-Beispiele |
| 07 Barrierefreiheit | Was Screenreader hören (Ergebnis als Text, „abgesagt“/„verschoben“, Freilos, „Zeit offen“), Tabellensemantik, Fokus, kein Zustand nur über Farbe |
| (08 Dos und Don'ts) | **Nicht Teil dieses Vorhabens.** Kommt mit dem Baustein `_DosDonts.svelte` aus `2026-10-08-dos-donts-design.md` (Tabellen-/Spielplan-Regeln 3 bis 5 dort) |

**Handy-Vorschau:** Die Handy-Regeln hängen an `@media (max-width: 640px)`, ein schmaler Rahmen allein löst sie nicht aus. Die Vorschau
ist deshalb ein `<iframe src="iframe.html?id=<Story-ID>&viewMode=story&globals=brand:...">` (relative URL, funktioniert lokal und auf GitHub
Pages) mit fester Breite 390 px und Titel (`title`) für Screenreader. Gezeigt werden die Stories Mannschaft, Turnier und Zeitraster.
Die Marke der Vorschau folgt der aktuellen Auswahl nicht automatisch (feste Marke BBV genügt).

## Spielwiese `Components/Spielplan Spielwiese`

Zwei Stories, neue Datei(en) unter `stories/` (zum Beispiel `stories/Spielplan.playground.stories.ts` und eine Demo-Komponente
`stories/components/SpielplanPlayground.svelte`):

**Tabelle (`ScheduleTable`)**
- Globale Controls: `layout` (`versus`, `opponent`, `columns`), `density` (`auto`, `touch`, `default`, `compact`; `auto` wird zu `undefined`).
- Eine kleine Tabelle mit vier Spielen. Das **erste ist das Testspiel**, das über Controls komplett einstellbar ist; die drei anderen
  zeigen Kontext (je ein anderer Zustand).
- Controls des Testspiels: `state` (scheduled, live, finished, cancelled, postponed, bye), `provisional`, Ergebnis Heim und Gast
  (Zahlen), `note` (Text), Liga-Zeile an/aus, Halle an/aus, Feld an/aus, eigene Mannschaft an/aus, Platzhalter an/aus, `outcome`
  (`auto`, `S`, `N`, `U`; nur wirksam im Layout `opponent` bei beendetem Spiel), Konflikt-Hinweis an/aus (Snippet `notice`), bearbeitbare Zeit
  an/aus (Snippet `time`).
- Das Layout `opponent` bekommt Gegner mit Logo-Initialen, `columns` bekommt Nr/Feld/Halle nach den Schaltern.

**Zeitraster (`ScheduleGrid`)**
- Controls: Anzahl Hallen (1 bis 5), Pause an/aus, Freilos an/aus, leere Zelle an/aus, `density` (`default`, `compact`, `touch`), plus dasselbe Testspiel
  (Zustand, live, vorläufig, Ergebnis, Notiz, eigene Mannschaft, Platzhalter) in der ersten Zelle.

Beide Spielwiesen zeigen die echten Svelte-Komponenten; Marke und Hell/Dunkel schaltet die Werkzeugleiste. Die Argumente sind in den Controls
geordnet (Kategorien „Layout“, „Testspiel“, „Optionen“ über `table.category` in `argTypes`).

## Bestehende Stories

Die Stories mit festen Daten (`ScheduleTable`: Mannschaft, Liga und Halle, Turnier; `ScheduleGrid`: Zeitraster, Kompakt) bleiben als Schnappschüsse.
Ihre Beschreibungstexte (`parameters.docs.description`) sind wirkungslos (kein Docs-Addon); ihr Inhalt steht künftig auf der neuen Seite.

## Prüfung

- Storybook-Build erfolgreich; alle neuen Seiten und Stories in beiden Marken, Hell und Dunkel und bei 420 px im Browser ansehen
  (keine Fehler, kein seitliches Scrollen der Seite, Lesbarkeit, Handy-Vorschau lädt).
- Spielwiese im Browser durchschalten: jeder Zustand und jeder Schalter ändert die Vorschau sichtbar und ohne Fehler; besonders live,
  vorläufig, abgesagt, verlegt, Freilos, `outcome`, Notiz, Platzhalter, Snippets.
- A11y-Reiter bzw. axe-Lauf auf der Seite: keine Verstöße (`iframe` mit `title`).
- Keine neuen Abhängigkeiten.

## Bewusst nicht Teil

- Spielwiesen und Seiten für andere Komponenten; die Dos-und-Don'ts-Bausteine (eigener Entwurf, folgt danach).
- Das Docs-Addon und die Umstellung aller Beschreibungstexte.
