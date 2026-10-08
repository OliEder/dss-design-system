<script lang="ts">
  import SpecPage from './_SpecPage.svelte';
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';
  import ScheduleGrid from '../../svelte/ScheduleGrid.svelte';
  import CodeSwitch from './_CodeSwitch.svelte';
  import type { ScheduleGame } from '../../js/schedule.js';

  const D = 'Sa, 10.10.2026';

  // 01 · kleine Beispiele
  const miniLiga: ScheduleGame[] = [
    { id: 'a1', state: 'scheduled', date: D, time: '15:00', heim: { name: 'Fibalon Baskets Neumarkt', href: '#' }, gast: { name: 'FC Tegernheim', href: '#' }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Halle am Stadtpark' },
  ];
  const miniMannschaft: ScheduleGame[] = [
    { id: 'a2', state: 'scheduled', date: D, time: '19:30', at: 'gast', opponent: { name: 'Nürnberger Basketball Club', href: '#' } },
  ];
  const miniTurnier: ScheduleGame[] = [
    { id: 'a3', state: 'scheduled', nr: '#6', time: '10:00–10:20', field: 'F1', heim: { name: 'BG Zirndorf' }, gast: { name: 'TSV Tröster', own: true } },
  ];
  const miniRaster: ScheduleGame[] = [
    { id: 'a4', state: 'scheduled', time: '09:00', column: 'h1', heim: { name: 'TSV Tröster', own: true }, gast: { name: 'USC Heidelberg' } },
    { id: 'a5', state: 'scheduled', time: '09:00', column: 'h2', heim: { name: 'BG Zirndorf' }, gast: { name: 'TV Lich' } },
  ];
  const miniHallen = [{ id: 'h1', label: 'Halle 1' }, { id: 'h2', label: 'Halle 2' }];

  // 02 · Layouts
  const mannschaft: ScheduleGame[] = [
    { id: 'm1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV Jahn Freising', href: '#', score: 108 }, ownScore: 65 },
    { id: 'm2', state: 'finished', date: 'Sa, 03.10.2026', time: '17:30', at: 'heim', provisional: true, opponent: { name: 'Dukes Dingolfing', href: '#', score: 0 }, ownScore: 20, outcome: 'S' },
    { id: 'm3', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast', opponent: { name: 'Nürnberger Basketball Club', href: '#' } },
    { id: 'm4', state: 'postponed', date: 'So, 25.10.2026', time: '17:00', at: 'gast', opponent: { name: 'TV 1881 Altdorf', href: '#' }, note: 'Verlegt auf Sa, 14.11.2026, 19:00' },
  ];
  const liga: ScheduleGame[] = [
    { id: 'l1', state: 'finished', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '17:00', heim: { name: 'TuSpo Heroldsberg', href: '#', score: 64 }, gast: { name: 'TSV Breitengüßbach 2', href: '#', score: 90 }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Sporthalle Heroldsberg' },
    { id: 'l2', state: 'live', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '15:45', heim: { name: 'TG 48 Würzburg 2', href: '#', score: 52 }, gast: { name: 'CVJM Erlangen', href: '#', score: 48 }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Mainfranken-Halle Würzburg' },
    { id: 'l3', state: 'scheduled', section: 'Spieltag 6', date: D, time: '15:00', heim: { name: 'Fibalon Baskets Neumarkt', href: '#', own: true }, gast: { name: 'FC Tegernheim', href: '#' }, league: { name: 'U18 männlich Bezirksoberliga', href: '#' }, venue: 'Halle am Stadtpark Neumarkt' },
  ];
  const turnier: ScheduleGame[] = [
    { id: 't1', state: 'finished', nr: '#1', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F1', venue: 'Halle 1', heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 } },
    { id: 't2', state: 'live', nr: '#2', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F2', venue: 'Halle 1', heim: { name: 'BG Zirndorf', score: 28 }, gast: { name: 'TV Lich', score: 26 } },
    { id: 't3', state: 'scheduled', nr: '#3', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F1', venue: 'Halle 2', heim: { name: 'TSV Tröster', own: true }, gast: { name: 'TV Lich' } },
    { id: 't9', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00–11:20', field: 'F1', venue: 'Halle 1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
  ];

  // 03 · Raster
  const raster: ScheduleGame[] = [
    { id: 'r1', state: 'finished', nr: '#1', section: 'Gruppe A', time: '09:00', column: 'h1', heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 } },
    { id: 'r2', state: 'finished', nr: '#2', section: 'Gruppe A', time: '09:00', column: 'h2', heim: { name: 'BG Zirndorf', score: 28 }, gast: { name: 'TV Lich', score: 35 } },
    { id: 'r3', state: 'live', nr: '#3', section: 'Gruppe B', time: '09:00', column: 'h3', heim: { name: 'SV Aschaffenburg', score: 12 }, gast: { name: 'MTV Ansbach', score: 10 } },
    { id: 'r4', state: 'scheduled', nr: '#4', section: 'Gruppe A', time: '09:30', column: 'h1', heim: { name: 'TSV Tröster', own: true }, gast: { name: 'TV Lich' } },
    { id: 'r5', state: 'cancelled', nr: '#5', section: 'Gruppe A', time: '09:30', column: 'h2', heim: { name: 'USC Heidelberg' }, gast: { name: 'BG Zirndorf' }, note: 'Halle gesperrt' },
    { id: 'r6', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00', column: 'h1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
    { id: 'r7', state: 'bye', time: '09:30', heim: { name: 'SV Aschaffenburg' } },
  ];
  const hallen = [
    { id: 'h1', label: 'Sporthalle Breitengüßbach' },
    { id: 'h2', label: 'Frankenhalle Zirndorf' },
    { id: 'h3', label: 'Feld 3' },
  ];
  const hallen5 = [
    { id: 'h1', label: 'Halle 1' }, { id: 'h2', label: 'Halle 2' }, { id: 'h3', label: 'Halle 3' },
    { id: 'h4', label: 'Halle 4' }, { id: 'h5', label: 'Halle 5' },
  ];
  const raster5: ScheduleGame[] = [
    { id: 'f1', state: 'scheduled', time: '09:00', column: 'h1', heim: { name: 'TSV Tröster', own: true }, gast: { name: 'USC Heidelberg' } },
    { id: 'f2', state: 'live', time: '09:00', column: 'h2', heim: { name: 'BG Zirndorf', score: 8 }, gast: { name: 'TV Lich', score: 6 } },
    { id: 'f3', state: 'scheduled', time: '09:00', column: 'h3', heim: { name: 'SV Aschaffenburg' }, gast: { name: 'MTV Ansbach' } },
    { id: 'f4', state: 'scheduled', time: '09:00', column: 'h4', heim: { name: 'TB Weiden' }, gast: { name: 'TG 48 Würzburg' } },
    { id: 'f5', state: 'scheduled', time: '09:00', column: 'h5', heim: { name: 'CVJM Erlangen' }, gast: { name: 'FC Tegernheim' } },
    { id: 'f6', state: 'scheduled', time: '09:30', column: 'h1', heim: { name: 'TV Lich' }, gast: { name: 'BG Zirndorf' } },
  ];

  // 04 · Zustände (je ein Spiel)
  const ft = (id: string, extra: Partial<ScheduleGame>): ScheduleGame => ({
    id, state: 'scheduled', date: D, time: '15:00',
    heim: { name: 'TuSpo Heroldsberg' }, gast: { name: 'TSV Breitengüßbach 2' }, ...extra,
  });
  const opp = (id: string, extra: Partial<ScheduleGame>): ScheduleGame => ({
    id, state: 'finished', date: D, time: '17:30', at: 'heim',
    opponent: { name: 'TSV Jahn Freising', score: 70 }, ownScore: 80, ...extra,
  });

  type StateEx = { key: string; label: string; text: string; games: ScheduleGame[]; layout?: 'versus' | 'opponent' | 'columns'; extra?: 'notice' | 'time' };
  const states: StateEx[] = [
    { key: 'scheduled', label: 'Geplant', games: [ft('s1', {})], text: 'Datum und Zeit, das Ergebnis zeigt einen Strich. Der Screenreader liest nur die Zellen, ein Ergebnis gibt es nicht.' },
    { key: 'live', label: 'Live', games: [ft('s2', { state: 'live', heim: { name: 'TuSpo Heroldsberg', score: 52 }, gast: { name: 'TSV Breitengüßbach 2', score: 48 } })], text: 'Ein grünes „Live“-Tag mit Puls hinter der Zeit; das Ergebnis steht schon. Zusätzlich sprechen Screenreader „läuft“ hinter dem Ergebnis.' },
    { key: 'finished', label: 'Beendet', games: [ft('s3', { state: 'finished', heim: { name: 'TuSpo Heroldsberg', score: 64 }, gast: { name: 'TSV Breitengüßbach 2', score: 90 } })], text: 'Ergebnis in Mono, der Verlierer ist abgeblendet. Gelesen wird „Heim 64, Gast 90“.' },
    { key: 'provisional', label: 'Vorläufig', games: [ft('s4', { state: 'finished', provisional: true, heim: { name: 'TuSpo Heroldsberg', score: 64 }, gast: { name: 'TSV Breitengüßbach 2', score: 90 } })], text: 'Beendet mit Kennzeichen „provisional“: unter dem Ergebnis steht „vorläufig“, gelesen wird es hinter dem Ergebnis mit.' },
    { key: 'cancelled', label: 'Abgesagt', games: [ft('s5', { state: 'cancelled', note: 'Abgesagt: Halle gesperrt' })], text: 'Zeile abgeblendet, Teams, Datum und Zeit durchgestrichen; die Notiz steht unter dem Spiel. Der Screenreader hört zusätzlich „abgesagt“.' },
    { key: 'postponed', label: 'Verlegt', games: [ft('s6', { state: 'postponed', note: 'Verlegt auf Sa, 14.11.2026, 19:00' })], text: 'Wie abgesagt gedämpft, aber ohne Durchstreichung. Der Screenreader hört „verschoben“.' },
    { key: 'bye', label: 'Freilos', games: [{ id: 's7', state: 'bye', time: '09:30', heim: { name: 'TSV Tröster' } }], layout: 'columns', text: 'Eine einzige, gedämpfte Zeile über alle Spalten: „TSV Tröster hat Freilos“. Ohne Mannschaft steht dort die Notiz oder „Spielfrei“.' },
    { key: 'own', label: 'Eigene Mannschaft', games: [ft('s8', { heim: { name: 'Fibalon Baskets Neumarkt', own: true }, gast: { name: 'FC Tegernheim' } })], layout: 'versus', text: 'Mit „own“ erhält die Zeile eine Hervorhebung (versus und columns). Im Layout opponent entfällt sie, dort ist die Perspektive ohnehin die eigene.' },
    { key: 'placeholder', label: 'Platzhalter', games: [ft('s9', { heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } })], text: 'Kursiv und gedämpft, nie als Link. Gedacht für noch offene Paarungen im Turnier.' },
    { key: 'win', label: 'Sieg (S)', games: [opp('s10', {})], layout: 'opponent', text: 'Grüner Chip „S“, Ergebnis eigene : Gegner. Der Chip ist für Screenreader verborgen, gelesen wird „Eigene 80, Gegner 70, Sieg“.' },
    { key: 'loss', label: 'Niederlage (N)', games: [opp('s11', { opponent: { name: 'TSV Jahn Freising', score: 108 }, ownScore: 65 })], layout: 'opponent', text: 'Roter Chip „N“. Gelesen wird „Eigene 65, Gegner 108, Niederlage“.' },
    { key: 'draw', label: 'Unentschieden (U)', games: [opp('s12', { opponent: { name: 'TSV Jahn Freising', score: 70 }, ownScore: 70 })], layout: 'opponent', text: 'Neutraler Chip „U“. Gelesen wird „Eigene 70, Gegner 70, Unentschieden“.' },
    { key: 'forfeit', label: 'Forfait über outcome', games: [opp('s13', { opponent: { name: 'Dukes Dingolfing', score: 0 }, ownScore: 20, outcome: 'S' })], layout: 'opponent', text: 'Mit „outcome“ wird die Bewertung gesetzt, statt aus den Punkten berechnet zu werden (hier zum Beispiel ein Forfait mit 20 : 0). Wirkt nur im Layout opponent bei beendeten Spielen.' },
    { key: 'notice', label: 'Konflikt-Hinweis', games: [{ id: 's14', state: 'scheduled', nr: '#6', time: '10:00–10:20', field: 'F1', heim: { name: 'BG Zirndorf' }, gast: { name: 'TSV Tröster', own: true } }], layout: 'columns', extra: 'notice', text: 'Das Snippet „notice“ liefert eine zusätzliche Spalte „Hinweis“ am Zeilenende, hier ein Warn-Chip „Sperrzeit“. Die Spalte gibt es nur, wenn das Snippet übergeben wird.' },
    { key: 'time', label: 'Bearbeitbare Zeit', games: [{ id: 's15', state: 'scheduled', nr: '#9', time: '11:00', field: 'F1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } }], layout: 'columns', extra: 'time', text: 'Das Snippet „time“ ersetzt die Uhrzeit, hier durch ein Eingabefeld mit eigener Beschriftung („Anwurfzeit Spiel #9“), damit Screenreader das Feld benennen können.' },
  ];

  const inputStyle = 'width: 7ch; font: inherit; padding: 2px 6px; border: 1px solid var(--dss-line); border-radius: 6px; background: var(--dss-surface); color: var(--dss-fg);';

  const mobileBase = 'iframe.html?viewMode=story&globals=brand:bbv&id=';
  const previews = [
    { id: 'components-scheduletable--mannschaft', title: 'Handy-Vorschau: Mannschafts-Spielplan in 390 Pixel Breite', cap: 'Mannschaft · opponent' },
    { id: 'components-scheduletable--turnier', title: 'Handy-Vorschau: Turnier-Spielplan in 390 Pixel Breite', cap: 'Turnier · columns' },
    { id: 'components-schedulegrid--zeitraster', title: 'Handy-Vorschau: Zeitraster in 390 Pixel Breite', cap: 'Zeitraster · ScheduleGrid' },
  ];

  const imports = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->
`;

  // Mannschaftssicht (layout opponent), mit eigener Uhrzeit
  const tableVanilla = imports + `
<div class="dss-frame">
  <div class="dss-frame-head">
    <h3 class="dss-frame-title">Spielplan</h3>
    <div class="dss-frame-meta"><span>Saison 2026/27</span></div>
  </div>
  <div class="dss-table-scroll">
    <table role="table" class="dss-tbl dss-tbl--schedule dss-tbl--touch dss-sch--opponent">
      <caption class="dss-sr-only">Spielplan der Mannschaft</caption>
      <thead role="rowgroup" class="dss-sr-only">
        <tr role="row">
          <th scope="col" role="columnheader">Zeit</th>
          <th scope="col" role="columnheader">Heim oder Auswärts</th>
          <th scope="col" role="columnheader">Gegner</th>
          <th scope="col" role="columnheader">Ergebnis</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <tr role="row" class="dss-sch-group"><th scope="colgroup" colspan="4">Spieltag 5</th></tr>
        <tr role="row" class="dss-sch-row">
          <td role="cell" class="dss-sch-when">
            <span class="dss-sch-date">Sa, 26.09.2026</span>
            <span class="dss-sch-time"><input type="text" value="17:30" aria-label="Anwurfzeit TSV Jahn Freising" /></span>
          </td>
          <td role="cell" class="dss-sch-ha">
            <span class="dss-chip dss-chip--mono dss-chip--sky">vs.</span>
          </td>
          <td role="cell" class="dss-sch-match">
            <span class="dss-sch-opp">
              <span class="dss-sch-logo" aria-hidden="true">TJF</span>
              <span class="dss-sch-team"><a class="dss-link" href="/teams/freising">TSV Jahn Freising</a></span>
            </span>
          </td>
          <td role="cell" class="dss-sch-res">
            <span class="dss-chip dss-chip--mono dss-chip--err" aria-hidden="true">N</span>
            <span class="dss-sch-score" aria-hidden="true">65 : 108</span>
            <span class="dss-sr-only">Eigene 65, Gegner 108, Niederlage</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

  const tableReact = `import { ScheduleTable } from '@bbv/dss-design-system/react';

<ScheduleTable
  games={games}
  caption="Spielplan der Mannschaft"
  title="Spielplan"
  meta="Saison 2026/27"
  renderLink={({ href, className, children }) => (
    <RouterLink to={href} className={className}>{children}</RouterLink>
  )}
  renderTime={(game) => <TimeInput game={game} />}
/>`;

  const tableSvelte = `<script>
  import ScheduleTable from '@bbv/dss-design-system/svelte/ScheduleTable';
<\/script>

<ScheduleTable {games} caption="Spielplan der Mannschaft" title="Spielplan" meta="Saison 2026/27">
  {#snippet time(game)}
    <input type="text" value={game.time} aria-label="Anwurfzeit {game.opponent.name}" />
  {/snippet}
</ScheduleTable>`;

  // Gegenüberstellung (layout versus), eine Zeile ohne Zusatzspalte
  const versusVanilla = `<div class="dss-frame">
  <div class="dss-table-scroll">
    <table role="table" class="dss-tbl dss-tbl--schedule dss-tbl--default dss-sch--versus">
      <caption class="dss-sr-only">Heimspiele</caption>
      <thead role="rowgroup" class="dss-sr-only">
        <tr role="row">
          <th scope="col" role="columnheader">Zeit</th>
          <th scope="col" role="columnheader">Spiel</th>
          <th scope="col" role="columnheader">Ergebnis</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <tr role="row" class="dss-sch-row">
          <td role="cell" class="dss-sch-when"><span class="dss-sch-time">19:00</span></td>
          <td role="cell" class="dss-sch-match">
            <span class="dss-sch-team">Team A</span>
            <span class="dss-sch-sep" aria-hidden="true"> – </span>
            <span class="dss-sr-only"> gegen </span>
            <span class="dss-sch-team is-loser">Team B</span>
          </td>
          <td role="cell" class="dss-sch-res">
            <span class="dss-sch-score" aria-hidden="true">72 : 65</span>
            <span class="dss-sr-only">Heim 72, Gast 65</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

  const versusReact = `import { ScheduleTable } from '@bbv/dss-design-system/react';

const games = [
  { id: 'v1', state: 'finished', time: '19:00', heim: { name: 'Team A', score: 72 }, gast: { name: 'Team B', score: 65 } },
];

<ScheduleTable games={games} caption="Heimspiele" />`;

  const versusSvelte = `<script>
  import ScheduleTable from '@bbv/dss-design-system/svelte/ScheduleTable';
  const games = [
    { id: 'v1', state: 'finished', time: '19:00', heim: { name: 'Team A', score: 72 }, gast: { name: 'Team B', score: 65 } },
  ];
<\/script>

<ScheduleTable {games} caption="Heimspiele" />`;

  // Zeitraster: eine Zeile, Halle 1 belegt, Halle 2 frei
  const gridVanilla = `<div class="dss-frame">
  <div class="dss-table-scroll">
    <table role="table" class="dss-tbl dss-sgrid dss-tbl--default">
      <caption class="dss-sr-only">Hallenbelegung</caption>
      <thead role="rowgroup">
        <tr role="row">
          <th scope="col" role="columnheader" class="dss-sg-time">Zeit</th>
          <th scope="col" role="columnheader">Halle 1</th>
          <th scope="col" role="columnheader">Halle 2</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <tr role="row">
          <th scope="row" role="rowheader" class="dss-sg-time">09:00</th>
          <td role="cell" class="dss-sg-cell" data-label="Halle 1">
            <div class="dss-sg-game">
              <div class="dss-sg-teams">
                <span class="dss-sch-team">Team A</span>
                <span class="dss-sch-sep" aria-hidden="true"> – </span>
                <span class="dss-sr-only"> gegen </span>
                <span class="dss-sch-team">Team B</span>
              </div>
            </div>
          </td>
          <td role="cell" class="dss-sg-cell is-empty" data-label="Halle 2">
            <span class="dss-sg-empty">frei</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

  const gridData = `const columns = [{ id: 'h1', label: 'Halle 1' }, { id: 'h2', label: 'Halle 2' }];
const slots = ['09:00'];
const games = [
  { id: 'g1', state: 'scheduled', time: '09:00', column: 'h1', heim: { name: 'Team A' }, gast: { name: 'Team B' } },
];`;

  const gridReact = `import { ScheduleGrid } from '@bbv/dss-design-system/react';

${gridData}

<ScheduleGrid games={games} columns={columns} slots={slots} caption="Hallenbelegung" />`;

  const gridSvelte = `<script>
  import ScheduleGrid from '@bbv/dss-design-system/svelte/ScheduleGrid';
  ${gridData.replaceAll('\n', '\n  ')}
<\/script>

<ScheduleGrid {games} {columns} {slots} caption="Hallenbelegung" />`;

  // Datenbeispiel: für alle Fassungen gleich
  const codeGame = `const games = [{
  id: '1', state: 'finished', section: 'Spieltag 5',
  date: 'Sa, 26.09.2026', time: '17:30',
  at: 'heim',
  opponent: { name: 'TSV Jahn Freising', href: '/teams/freising', score: 108 },
  ownScore: 65,
}];`;
</script>

<style>
  .var-card { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
  .var-card.wide { grid-column: 1 / -1; }
  .var-card .use { font-family: var(--font-body); font-size: 14px; line-height: 1.45; color: var(--n-700); margin: 0; }
  .var-card .use b { color: var(--base-900); font-family: var(--font-mono); font-size: 12.5px; }
  .var-card :global(.dss-frame) { overflow: hidden; }
  .bullets { margin: 12px 0 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: var(--n-700); max-width: 720px; }
  .bullets b { color: var(--base-900); }
  .state-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .state-item { min-width: 0; }
  .state-item p { margin: 10px 0 0; font-size: 13.5px; line-height: 1.5; color: var(--n-700); }
  .dens-stack { display: flex; flex-direction: column; gap: 24px; }
  .phones { display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-start; }
  .phone { max-width: 100%; min-width: 0; }
  .phone-scroll { max-width: 100%; overflow-x: auto; padding-bottom: 4px; }
  .phone iframe {
    display: block; width: 390px; height: 560px; max-width: none;
    border: 1px solid var(--page-line); border-radius: 18px; background: var(--n-0);
  }
  .scroll-note { font-size: 13.5px; color: var(--n-700); margin: 12px 0 0; max-width: 720px; line-height: 1.5; }
  .code { background: var(--base-1000); color: var(--n-100); padding: 22px 24px; overflow-x: auto; }
  .code pre { margin: 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: var(--n-100); font-variant-ligatures: none; }
  :global(.spec code) { font-variant-ligatures: none; }
  .tbl-wrap { overflow-x: auto; }
  .tbl-wrap .spec-tokens { min-width: 560px; }
  .hear { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 24px; }
  .hear li { font-size: 14px; line-height: 1.5; color: var(--n-700); border-left: 3px solid var(--page-line); padding-left: 12px; }
  .hear li q { color: var(--base-900); font-weight: 600; }
  @media (max-width: 760px) {
    .hear { grid-template-columns: minmax(0, 1fr); }
  }
</style>

<SpecPage
  title="Spielplan"
  intro="ScheduleTable und ScheduleGrid zeigen Spiele als Tabelle bzw. als Zeitraster. Diese Seite erklärt, wann welche Variante passt, wie jeder Zustand aussieht und wie die Bausteine auf dem Handy und für Screenreader funktionieren."
>
  <!-- 01 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">01 — Auswahl</div>
      <div class="spec-title">
        <h2>Wann welche Variante.</h2>
        <p>
          Die Wahl hängt davon ab, wessen Sicht gezeigt wird und ob Spiele parallel laufen. Ohne Angabe wählt
          <code>ScheduleTable</code> das Layout selbst: <code>opponent</code>, sobald ein Spiel einen <code>opponent</code> hat,
          sonst <code>versus</code>. <code>columns</code> musst du immer ausdrücklich setzen.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-2">
        <div class="var-card">
          <div class="spec-cap">Liga, Halle</div>
          <p class="use"><b>layout="versus"</b> · Heim – Gast in einer Zelle, Liga als Unterzeile, Halle unter der Zeit. Für Ligaübersichten und Hallenpläne.</p>
          <ScheduleTable games={miniLiga} layout="versus" caption="Beispiel Liga" />
        </div>
        <div class="var-card">
          <div class="spec-cap">Mannschaft</div>
          <p class="use"><b>layout="opponent"</b> · Sicht einer Mannschaft mit vs./@ und Ergebnis eigene : Gegner. Für Mannschaftsseiten im Vereinsregister.</p>
          <ScheduleTable games={miniMannschaft} layout="opponent" caption="Beispiel Mannschaft" />
        </div>
        <div class="var-card">
          <div class="spec-cap">Turnier-Liste</div>
          <p class="use"><b>layout="columns"</b> · Eine Spalte je Angabe: Nr, Zeit, Feld, Heim, Ergebnis, Gast. Für Turnierlisten, die man durchsucht.</p>
          <ScheduleTable games={miniTurnier} layout="columns" caption="Beispiel Turnier-Liste" />
        </div>
        <div class="var-card wide">
          <div class="spec-cap">Tagesplan, Hallenbelegung</div>
          <p class="use"><b>ScheduleGrid</b> · Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten. Für parallele Spiele.</p>
          <ScheduleGrid games={miniRaster} columns={miniHallen} caption="Beispiel Tagesplan" />
        </div>
      </div>
    </div>
  </section>

  <!-- 02 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">02 — Tabelle</div>
      <div class="spec-title">
        <h2>Drei Layouts, eine Zeile pro Spiel.</h2>
        <p>
          Spiele mit gleicher <code>section</code> werden unter einer Gruppenzeile zusammengefasst. <code>versus</code> und
          <code>columns</code> brauchen <code>heim</code> und <code>gast</code>; ein Spiel nur mit <code>opponent</code> zeigt dort
          „?“ für die fehlenden Teams und kein Ergebnis.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">opponent · Mannschaftsplan <span class="pill amber">Touch 60 px</span></div>
        <div class="spec-frame tight">
          <ScheduleTable games={mannschaft} layout="opponent" title="Spielplan" meta="4 Spiele" caption="Beispiel Mannschafts-Spielplan" />
        </div>
        <ul class="bullets">
          <li><b>Wann:</b> Spielplan einer Mannschaft, alles aus ihrer Sicht.</li>
          <li><b>Felder:</b> Chip <i>vs.</i> (Heim) oder <i>@</i> (Auswärts), Logo (<code>logo</code>) oder sonst die Initialen, Gegner als Link, S-/N-/U-Chip, Ergebnis eigene : Gegner und „vorläufig“.</li>
          <li><b>Hinweis:</b> <code>ownScore</code> sind die Punkte der eigenen Mannschaft, <code>opponent.score</code> die des Gegners.</li>
        </ul>
      </div>
      <div>
        <div class="spec-cap">versus · Liga und Halle <span class="pill amber">Touch 60 px mit Liga-Zeile</span></div>
        <div class="spec-frame tight">
          <ScheduleTable games={liga} layout="versus" title="Spieltage" meta="Bayernliga" caption="Beispiel Liga-Spielplan" />
        </div>
        <ul class="bullets">
          <li><b>Wann:</b> Liga- oder Hallenübersicht mit Spielen verschiedener Mannschaften.</li>
          <li><b>Felder:</b> Heim – Gast in einer Zelle, Liga als Unterzeile, Halle unter der Zeit, Ergebnis rechts. Der Verlierer eines beendeten Spiels ist abgeblendet.</li>
        </ul>
      </div>
      <div>
        <div class="spec-cap">columns · Turnier <span class="pill amber">Standard 48 px</span></div>
        <div class="spec-frame tight">
          <ScheduleTable games={turnier} layout="columns" title="Spielplan" meta="4 Spiele" caption="Beispiel Turnier-Spielplan" />
        </div>
        <ul class="bullets">
          <li><b>Wann:</b> Turnierliste mit Spielnummer, Feld und Halle.</li>
          <li><b>Spalten:</b> Nr, Zeit, Feld, Halle, Heim, Ergebnis, Gast. Nr, Feld und Halle erscheinen nur, wenn mindestens ein Spiel den Wert hat.</li>
          <li><b>Hinweis-Spalte:</b> kommt nur dazu, wenn ein <code>notice</code>-Snippet (Svelte) bzw. <code>renderNotice</code> (React) übergeben wird, siehe Abschnitt 04 und 06.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 03 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">03 — Zeitraster</div>
      <div class="spec-title">
        <h2>Parallele Spiele nebeneinander.</h2>
        <p>
          Jede Zeile ist eine Anwurfzeit, jede Spalte eine Halle oder ein Feld (Namen frei wählbar). Ein Spiel landet über
          <code>column</code> (passt zu <code>columns[].id</code>) und <code>time</code> in seiner Zelle. Pausen kommen über <code>breaks</code>,
          ein Freilos ist ein Spiel mit <code>state: 'bye'</code>, eine Zelle ohne Spiel zeigt „frei“ (<code>emptyLabel</code>).
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Drei Hallen, Pause, Freilos, leere Zelle</div>
        <div class="spec-frame tight">
          <ScheduleGrid
            games={raster}
            columns={hallen}
            breaks={[{ time: '10:15', label: 'Mittagspause' }]}
            title="Zeitraster"
            meta="Samstag, 10.10.2026"
            caption="Turnier-Tagesplan"
          />
        </div>
      </div>
      <div>
        <div class="spec-cap">Gegenbeispiel: fünf Spalten <span class="pill">scrollt im Rahmen</span></div>
        <div class="spec-frame tight">
          <ScheduleGrid games={raster5} columns={hallen5} title="Fünf Hallen" meta="09:00 bis 09:30" caption="Zeitraster mit fünf Hallen" />
        </div>
        <p class="scroll-note">
          Bei zu vielen Spalten scrollt der Rahmen seitlich, die Zeitspalte bleibt dabei stehen. <b>Empfohlen: höchstens drei Spalten je Raster</b>, die App teilt darüber auf mehrere Raster auf.
        </p>
      </div>
    </div>
  </section>

  <!-- 04 -->
  <section class="spec-s" id="zustaende">
    <div class="spec-s-head">
      <div class="spec-num">04 — Zustände</div>
      <div class="spec-title">
        <h2>Jeder Zustand einzeln.</h2>
        <p>
          Der Zustand steht in <code>state</code> (<code>scheduled</code>, <code>live</code>, <code>finished</code>, <code>cancelled</code>,
          <code>postponed</code>, <code>bye</code>); <code>provisional</code>, <code>own</code>, <code>placeholder</code> und <code>outcome</code> sind
          weitere Felder. Jede Mini-Tabelle zeigt genau einen Fall.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="state-grid" data-testid="states">
        {#each states as s (s.key)}
          <div class="state-item">
            <div class="spec-cap">{s.label}</div>
            {#if s.extra === 'notice'}
              <ScheduleTable games={s.games} layout={s.layout} caption={`Zustand ${s.label}`}>
                {#snippet notice()}<span class="dss-chip dss-chip--warn">Sperrzeit</span>{/snippet}
              </ScheduleTable>
            {:else if s.extra === 'time'}
              <ScheduleTable games={s.games} layout={s.layout} caption={`Zustand ${s.label}`}>
                {#snippet time(game)}<input type="text" value={game.time} aria-label={`Anwurfzeit Spiel ${game.nr}`} style={inputStyle} />{/snippet}
              </ScheduleTable>
            {:else}
              <ScheduleTable games={s.games} layout={s.layout} caption={`Zustand ${s.label}`} />
            {/if}
            <p>{s.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 05 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">05 — Dichte und Handy</div>
      <div class="spec-title">
        <h2>Drei Zeilenhöhen, eine Handy-Karte.</h2>
        <p>
          <code>density</code> steuert die Zeilenhöhe: <b>touch 60 px</b>, <b>default 48 px</b> (Standard), <b>compact 40 px</b>.
          <code>ScheduleTable</code> wählt ohne Angabe <code>touch</code> bei <code>opponent</code> oder wenn ein Spiel eine
          Liga-Unterzeile hat, sonst <code>default</code>. <code>ScheduleGrid</code> nimmt immer <code>default</code>.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="dens-stack">
        {#each [['touch', 'Touch · 60 px'], ['default', 'Standard · 48 px'], ['compact', 'Kompakt · 40 px']] as [d, label] (d)}
          <div>
            <div class="spec-cap">{label}</div>
            <div class="spec-frame tight">
              <ScheduleTable games={turnier.slice(0, 2)} layout="columns" density={d as 'touch' | 'default' | 'compact'} caption={`Dichte ${label}`} />
            </div>
          </div>
        {/each}
      </div>

      <div>
        <div class="spec-cap">Handy-Ansicht · 390 px Breite</div>
        <p class="scroll-note" style="margin: 0 0 16px;">
          Unter 640 px Breite werden Zeilen zu Karten und Anwurfzeiten zu Blöcken. Diese Regeln hängen an der Breite des Fensters,
          nicht an der des Rahmens. Darum sind die Vorschauen eingebettete Seiten mit fester Breite von 390 px.
        </p>
        <div class="phones">
          {#each previews as p (p.id)}
            <div class="phone">
              <div class="spec-cap">{p.cap}</div>
              <div class="phone-scroll" tabindex="0" role="region" aria-label={`Scrollbereich: ${p.cap}`}>
                <iframe title={p.title} src={mobileBase + p.id} loading="lazy"></iframe>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- 06 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">06 — Daten und Snippets</div>
      <div class="spec-title">
        <h2>Ein Datenmodell, zwei Frameworks.</h2>
        <p>
          Die Typen stehen in <code>js/schedule.d.ts</code> (Export <code>@bbv/dss-design-system/schedule.js</code>). Datum und Zeit
          liefert die App fertig formatiert, die Bausteine formatieren nichts. Die Code-Beispiele folgen dem Umschalter „Fassung“ in der Werkzeugleiste.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">ScheduleGame</div>
        <div class="tbl-wrap" tabindex="0" role="region" aria-label="Tabelle ScheduleGame, seitlich scrollbar">
          <table class="spec-tokens">
            <thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead>
            <tbody>
              <tr><td class="k">id</td><td class="v">string</td><td class="d">Eindeutige Kennung (Pflicht).</td></tr>
              <tr><td class="k">state</td><td class="v">'scheduled' | 'live' | 'finished' | 'cancelled' | 'postponed' | 'bye'</td><td class="d">Zustand (Pflicht).</td></tr>
              <tr><td class="k">nr</td><td class="v">string</td><td class="d">Spielnummer, z. B. „#3“.</td></tr>
              <tr><td class="k">section</td><td class="v">string</td><td class="d">Gruppenzeile, z. B. „Spieltag 5“ oder „Halbfinale“.</td></tr>
              <tr><td class="k">date</td><td class="v">string</td><td class="d">Fertig formatiert, z. B. „Sa, 26.09.2026“.</td></tr>
              <tr><td class="k">time</td><td class="v">string</td><td class="d">„17:30“ oder „09:30–09:50“.</td></tr>
              <tr><td class="k">venue</td><td class="v">string</td><td class="d">Halle, freier Text.</td></tr>
              <tr><td class="k">field</td><td class="v">string</td><td class="d">Feld in der Halle, freier Text.</td></tr>
              <tr><td class="k">column</td><td class="v">string</td><td class="d">Nur ScheduleGrid: Kennung der Spalte, passt zu <code>columns[].id</code>.</td></tr>
              <tr><td class="k">heim, gast</td><td class="v">ScheduleTeam</td><td class="d">Gegenüberstellung (Liga, Halle, Turnier).</td></tr>
              <tr><td class="k">opponent</td><td class="v">ScheduleTeam</td><td class="d">Perspektive einer Mannschaft; <code>opponent.score</code> sind die Punkte des Gegners.</td></tr>
              <tr><td class="k">at</td><td class="v">'heim' | 'gast'</td><td class="d">Bei <code>opponent</code>: „heim“ zeigt „vs.“, „gast“ zeigt „@“.</td></tr>
              <tr><td class="k">ownScore</td><td class="v">number</td><td class="d">Punkte der eigenen Mannschaft.</td></tr>
              <tr><td class="k">outcome</td><td class="v">'S' | 'N' | 'U'</td><td class="d">Überschreibt die berechnete Bewertung (z. B. Forfait).</td></tr>
              <tr><td class="k">league</td><td class="v">{'{ name, href? }'}</td><td class="d">Liga, erscheint als Unterzeile.</td></tr>
              <tr><td class="k">provisional</td><td class="v">boolean</td><td class="d">Vorläufiges Ergebnis.</td></tr>
              <tr><td class="k">note</td><td class="v">string</td><td class="d">Notiz, z. B. Grund einer Absage.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div class="spec-cap">ScheduleTeam</div>
        <div class="tbl-wrap" tabindex="0" role="region" aria-label="Tabelle ScheduleTeam, seitlich scrollbar">
          <table class="spec-tokens">
            <thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead>
            <tbody>
              <tr><td class="k">name</td><td class="v">string</td><td class="d">Mannschaftsname (Pflicht).</td></tr>
              <tr><td class="k">href</td><td class="v">string</td><td class="d">Name als Link.</td></tr>
              <tr><td class="k">logo</td><td class="v">string</td><td class="d">Logo-URL; ohne Logo erscheinen die Initialen.</td></tr>
              <tr><td class="k">score</td><td class="v">number</td><td class="d">Punkte.</td></tr>
              <tr><td class="k">placeholder</td><td class="v">boolean</td><td class="d">Platzhalter wie „Erster Gruppe A“: kursiv und gedämpft.</td></tr>
              <tr><td class="k">own</td><td class="v">boolean</td><td class="d">Eigene Mannschaft (Hervorhebung).</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div class="spec-cap">Props · ScheduleTable und ScheduleGrid</div>
        <div class="tbl-wrap" tabindex="0" role="region" aria-label="Tabelle Props, seitlich scrollbar">
          <table class="spec-tokens">
            <thead><tr><th>Prop</th><th>Für</th><th>Beschreibung</th></tr></thead>
            <tbody>
              <tr><td class="k">games</td><td class="v">beide</td><td class="d">Liste der Spiele (Pflicht).</td></tr>
              <tr><td class="k">layout</td><td class="v">Table</td><td class="d">'versus' | 'opponent' | 'columns'; Standard: <code>opponent</code>, sobald ein Spiel <code>opponent</code> hat, sonst <code>versus</code>.</td></tr>
              <tr><td class="k">columns</td><td class="v">Grid</td><td class="d">Spalten als <code>{'{ id, label }'}</code> (Pflicht).</td></tr>
              <tr><td class="k">slots, breaks</td><td class="v">Grid</td><td class="d">Anwurfzeiten vorgeben bzw. Pausen <code>{'{ time, label }'}</code>.</td></tr>
              <tr><td class="k">emptyLabel</td><td class="v">Grid</td><td class="d">Text leerer Zellen; Standard „frei“.</td></tr>
              <tr><td class="k">density</td><td class="v">beide</td><td class="d">'touch' | 'default' | 'compact'; Table leitet sie aus den Spielen ab, Grid nimmt <code>default</code>.</td></tr>
              <tr><td class="k">title, meta</td><td class="v">beide</td><td class="d">Rahmenkopf. In Svelte reine Strings, in React beliebige Knoten.</td></tr>
              <tr><td class="k">caption</td><td class="v">beide</td><td class="d">Unsichtbare Tabellenbeschriftung für Screenreader.</td></tr>
              <tr><td class="k">class / className</td><td class="v">beide</td><td class="d">Zusätzliche Klasse am Rahmen (Svelte <code>class</code>, React <code>className</code>).</td></tr>
              <tr><td class="k">titleAs</td><td class="v">React</td><td class="d">Überschriftenebene 'h2' | 'h3' | 'h4'. Svelte: immer h3.</td></tr>
              <tr><td class="k">renderLink</td><td class="v">React</td><td class="d">Router-Links für Teamnamen und Liga. Svelte: einfache <code>&lt;a&gt;</code>.</td></tr>
              <tr><td class="k">renderTime / time</td><td class="v">Table</td><td class="d">Ersetzt die Uhrzeit (React: Funktion, Svelte: Snippet <code>time</code>).</td></tr>
              <tr><td class="k">renderNotice / notice</td><td class="v">beide</td><td class="d">Table: zusätzliche Spalte „Hinweis“. Grid: zusätzlicher Inhalt in der Spielzelle.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <CodeSwitch label="ScheduleTable, Mannschaftssicht" vanilla={tableVanilla} svelte={tableSvelte} react={tableReact} />
      <CodeSwitch label="ScheduleTable, Gegenüberstellung" vanilla={versusVanilla} svelte={versusSvelte} react={versusReact} />
      <CodeSwitch label="ScheduleGrid, Zeitraster" vanilla={gridVanilla} svelte={gridSvelte} react={gridReact} />
      <div>
        <div class="spec-cap">Ein Spiel (Mannschaftssicht), für alle Fassungen gleich</div>
        <div class="spec-frame code" tabindex="0" role="region" aria-label="Codebeispiel Ein Spiel (Mannschaftssicht)"><pre>{codeGame}</pre></div>
      </div>
    </div>
  </section>

  <!-- 07 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">07 — Barrierefreiheit</div>
      <div class="spec-title">
        <h2>Was Screenreader hören.</h2>
        <p>
          Was optisch durch Chip, Farbe oder Durchstreichung gezeigt wird, steht zusätzlich als unsichtbarer Text im Dokument.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <ul class="hear">
        <li>Ergebnis als Text: <q>Eigene 65, Gegner 108, Niederlage</q>. Die sichtbaren Chips und Zahlen sind für Screenreader verborgen, damit nichts doppelt kommt.</li>
        <li>Vorläufig und live hinter dem Ergebnis: <q>vorläufig</q>, <q>läuft</q>.</li>
        <li>Abgesagte und verlegte Spiele: <q>abgesagt</q> bzw. <q>verschoben</q> hinter der Zeit (im Raster vor der Paarung).</li>
        <li>Freilos: <q>TSV Tröster hat Freilos</q>; ohne Mannschaft steht dort die Notiz oder „Spielfrei“.</li>
        <li>Freilos im Raster ohne Zeit: der Zeitkopf liest <q>Zeit offen</q>.</li>
        <li>Zwischen den Paarungen: <q>gegen</q> statt des sichtbaren Gedankenstrichs.</li>
      </ul>
      <table class="spec-tokens">
        <thead><tr><th>Thema</th><th>Umsetzung</th></tr></thead>
        <tbody>
          <tr><td class="k">Tabellensemantik</td><td class="d">Echte <code>table</code>, <code>th scope</code> und <code>caption</code> (unsichtbar, aus <code>caption</code>). Beim Layout <code>opponent</code> und <code>versus</code> ist der Tabellenkopf nur für Screenreader sichtbar, bei <code>columns</code> sichtbar.</td></tr>
          <tr><td class="k">Handy-Karten</td><td class="d">Die <code>role</code>-Attribute im Markup bleiben bewusst, damit die Tabellensemantik erhalten bleibt, wenn das Handy-CSS Zeilen zu Karten macht.</td></tr>
          <tr><td class="k">Farbe</td><td class="d">Kein Zustand nur über Farbe: Live hat ein Wort-Tag, abgesagt und verlegt tragen Text, vorläufig steht im Klartext, S/N/U sind Buchstaben.</td></tr>
          <tr><td class="k">Fokus</td><td class="d">Links und Eingaben zeigen den DSS-Fokusring.</td></tr>
          <tr><td class="k">Dunkel</td><td class="d">Der seitenweite Dark Mode wirkt über die <code>--dss-*</code>-Variablen. Der dunkle Rahmen <code>dss-frame--dark</code> wird nicht unterstützt.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</SpecPage>
