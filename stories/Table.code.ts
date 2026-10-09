export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<!-- Dichte: dss-tbl--touch | --compact | --dense (ohne Angabe 48 px). Dunkel: dss-frame--dark. Streifen: dss-tbl--striped -->
<div class="dss-frame">
  <div class="dss-frame-head">
    <h3 class="dss-frame-title">Spieler-Statistiken</h3>
    <div class="dss-frame-meta">
      <span>Stand · 4. Viertel</span>
      <!-- nur bei laufendem Spiel -->
      <span class="dss-crumb"><span class="dss-crumb-dot" aria-hidden="true"></span> Live</span>
    </div>
  </div>
  <!-- Scrollbereich: Region mit Namen, per Tastatur erreichbar -->
  <div class="dss-table-scroll" role="region" tabindex="0" aria-label="Spieler-Statistiken">
    <table class="dss-tbl dss-tbl--compact">
      <thead>
        <tr>
          <th scope="col">Spieler</th>
          <th scope="col" class="right sortable">MIN</th>
          <th scope="col" class="right sortable sort-desc" aria-sort="descending">PTS</th>
          <th scope="col" class="right">+/−</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">A. Seiferth</span></div></div></td>
          <td class="num">32:14</td>
          <td class="num lead">22</td>
          <td class="num plus">+18</td>
        </tr>
        <tr class="is-own">
          <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">N. Wimberg</span></div></div></td>
          <td class="num">29:45</td>
          <td class="num lead">19</td>
          <td class="num minus">−4</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td>Team</td><td class="num">—</td><td class="num">41</td><td class="num plus">+14</td></tr>
      </tfoot>
    </table>
  </div>
</div>`;

export const svelte = `<script>
  import Table from '@bbv/dss-design-system/svelte/Table';

  const spieler = [
    { name: 'A. Seiferth', min: '32:14', pts: 22, pm: '+18' },
    { name: 'N. Wimberg', min: '29:45', pts: 19, pm: '−4' },
  ];
</script>

<Table
  title="Spieler-Statistiken"
  meta="Stand · 4. Viertel"
  live
  density="compact"
  columns={[
    { key: 'name', label: 'Spieler' },
    { key: 'min', label: 'MIN', align: 'right', sortable: true },
    { key: 'pts', label: 'PTS', align: 'right', sortable: true, sort: 'desc' },
    { key: 'pm', label: '+/−', align: 'right' },
  ]}
>
  {#snippet rows()}
    {#each spieler as s}
      <tr>
        <td>{s.name}</td>
        <td class="num">{s.min}</td>
        <td class="num lead">{s.pts}</td>
        <td class={s.pm.startsWith('+') ? 'num plus' : 'num minus'}>{s.pm}</td>
      </tr>
    {/each}
  {/snippet}
  {#snippet foot()}
    <tr><td>Team</td><td class="num">—</td><td class="num">41</td><td class="num plus">+14</td></tr>
  {/snippet}
</Table>`;

export const react = `import { Table } from '@bbv/dss-design-system/react';

const spieler = [
  { name: 'A. Seiferth', min: '32:14', pts: 22, pm: '+18' },
  { name: 'N. Wimberg', min: '29:45', pts: 19, pm: '−4' },
];

<Table
  title="Spieler-Statistiken"
  meta="Stand · 4. Viertel"
  live
  density="compact"
  columns={[
    { key: 'name', label: 'Spieler' },
    { key: 'min', label: 'MIN', align: 'right', sortable: true },
    { key: 'pts', label: 'PTS', align: 'right', sortable: true, sort: 'desc' },
    { key: 'pm', label: '+/−', align: 'right' },
  ]}
  foot={
    <tr>
      <td>Team</td><td className="num">—</td><td className="num">41</td><td className="num plus">+14</td>
    </tr>
  }
>
  {spieler.map((s) => (
    <tr key={s.name}>
      <td>{s.name}</td>
      <td className="num">{s.min}</td>
      <td className="num lead">{s.pts}</td>
      <td className={s.pm.startsWith('+') ? 'num plus' : 'num minus'}>{s.pm}</td>
    </tr>
  ))}
</Table>`;
