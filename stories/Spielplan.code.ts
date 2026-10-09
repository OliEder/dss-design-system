const imports = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->
`;

// Mannschaftssicht (layout opponent), mit eigener Uhrzeit
export const tableVanilla = imports + `
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

export const tableReact = `import { ScheduleTable } from '@bbv/dss-design-system/react';

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

export const tableSvelte = `<script>
  import ScheduleTable from '@bbv/dss-design-system/svelte/ScheduleTable';
</script>

<ScheduleTable {games} caption="Spielplan der Mannschaft" title="Spielplan" meta="Saison 2026/27">
  {#snippet time(game)}
    <input type="text" value={game.time} aria-label="Anwurfzeit {game.opponent.name}" />
  {/snippet}
</ScheduleTable>`;

// Gegenüberstellung (layout versus), eine Zeile ohne Zusatzspalte
export const versusVanilla = `<div class="dss-frame">
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

export const versusReact = `import { ScheduleTable } from '@bbv/dss-design-system/react';

const games = [
  { id: 'v1', state: 'finished', time: '19:00', heim: { name: 'Team A', score: 72 }, gast: { name: 'Team B', score: 65 } },
];

<ScheduleTable games={games} caption="Heimspiele" />`;

export const versusSvelte = `<script>
  import ScheduleTable from '@bbv/dss-design-system/svelte/ScheduleTable';
  const games = [
    { id: 'v1', state: 'finished', time: '19:00', heim: { name: 'Team A', score: 72 }, gast: { name: 'Team B', score: 65 } },
  ];
</script>

<ScheduleTable {games} caption="Heimspiele" />`;

// Zeitraster: eine Zeile, Halle 1 belegt, Halle 2 frei
export const gridVanilla = `<div class="dss-frame">
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

export const gridReact = `import { ScheduleGrid } from '@bbv/dss-design-system/react';

${gridData}

<ScheduleGrid games={games} columns={columns} slots={slots} caption="Hallenbelegung" />`;

export const gridSvelte = `<script>
  import ScheduleGrid from '@bbv/dss-design-system/svelte/ScheduleGrid';
  ${gridData.replaceAll('\n', '\n  ')}
</script>

<ScheduleGrid {games} {columns} {slots} caption="Hallenbelegung" />`;

// Datenbeispiel: für alle Fassungen gleich
export const codeGame = `const games = [{
  id: '1', state: 'finished', section: 'Spieltag 5',
  date: 'Sa, 26.09.2026', time: '17:30',
  at: 'heim',
  opponent: { name: 'TSV Jahn Freising', href: '/teams/freising', score: 108 },
  ownScore: 65,
}];`;
