<script>
  import Table from '../../svelte/Table.svelte';

  // ─── Preset data ───────────────────────────────────────────────
  const roster = [
    { num: '4',  name: 'A. Seiferth',  pos: 'PG', cap: false, status: 'on' },
    { num: '7',  name: 'N. Wimberg',   pos: 'SG', cap: false, status: 'on' },
    { num: '11', name: 'R. Christen',  pos: 'SF', cap: true,  status: 'on' },
    { num: '13', name: 'T. Reuter',    pos: 'PF', cap: false, status: 'on' },
    { num: '15', name: 'J. Albers',    pos: 'C',  cap: false, status: 'on' },
    { num: '21', name: 'P. Steidl',    pos: 'SG', cap: false, status: 'bench' },
    { num: '24', name: 'M. Niebuhr',   pos: 'SF', cap: false, status: 'bench' },
    { num: '32', name: 'F. Diener',    pos: 'PF', cap: false, status: 'bench' },
    { num: '8',  name: 'O. Brettschneider', pos: 'SG', cap: false, status: 'bench' },
    { num: '9',  name: 'L. Markwart',  pos: 'PG', cap: false, status: 'dnp' },
  ];

  const boxscore = [
    { num: '4',  name: 'A. Seiferth', pos: 'pg', min: '32:14', pts: 22, p2: '6/11', p3: '3/6',  ft: '1/2', reb: 4, ast: 8, foul: 2, pm: '+18' },
    { num: '7',  name: 'N. Wimberg',  pos: 'sg', min: '29:45', pts: 19, p2: '4/8',  p3: '3/8',  ft: '2/2', reb: 3, ast: 5, foul: 3, pm: '+15' },
    { num: '11', name: 'R. Christen', pos: 'sf', min: '28:02', pts: 14, p2: '5/10', p3: '0/2',  ft: '4/4', reb: 7, ast: 2, foul: 2, pm: '+12' },
    { num: '13', name: 'T. Reuter',   pos: 'pf', min: '26:18', pts: 12, p2: '5/9',  p3: '0/0',  ft: '2/3', reb: 9, ast: 1, foul: 3, pm: '+9'  },
    { num: '15', name: 'J. Albers',   pos: 'c',  min: '24:30', pts: 10, p2: '4/7',  p3: '0/0',  ft: '2/4', reb: 11,ast: 1, foul: 4, pm: '+8'  },
    { num: '21', name: 'P. Steidl',   pos: 'sg', min: '12:08', pts: 6,  p2: '2/4',  p3: '0/2',  ft: '2/2', reb: 1, ast: 3, foul: 1, pm: '+3'  },
    { num: '24', name: 'M. Niebuhr',  pos: 'sf', min: '08:55', pts: 4,  p2: '1/3',  p3: '0/1',  ft: '2/2', reb: 2, ast: 0, foul: 1, pm: '+2'  },
  ];

  const crew = [
    { role: 'Hauptschiedsrichter', name: 'Stefan Bauer',  license: 'SR-2024-0892', status: 'on' },
    { role: '2. Schiedsrichter',    name: 'Markus Höhne',  license: 'SR-2024-1245', status: 'on' },
    { role: 'Anschreiber',          name: 'Jana Lutz',     license: 'KG-2025-7621', status: 'on' },
    { role: 'Zeitnehmer',           name: 'Tom Kellner',   license: 'KG-2025-7188', status: 'on' },
    { role: '24-Sek.-Zeitnehmer',   name: 'Eva Hartmann',  license: 'KG-2025-8042', status: 'on' },
  ];

  let { preset = 'boxscore', density = 'compact', dark = false } = $props();
</script>

<div style="padding: 24px;">

{#if preset === 'roster'}
  <Table
    title="TSV Tröster Breitengüßbach"
    meta="12 Spieler · Validiert · Touch · 60 px"
    density="touch"
    {dark}
    columns={[
      { key: 'check', label: '✓', width: '52px', align: 'center' },
      { key: 'num', label: '#', width: '64px', align: 'center' },
      { key: 'name', label: 'Spieler' },
      { key: 'pos', label: 'Position', width: '90px', align: 'center' },
      { key: 'status', label: 'Status', width: '100px', align: 'center' },
    ]}
  >
    {#snippet rows()}
      {#each roster as r}
        <tr>
          <td class="center"><input type="checkbox" checked={r.status === 'on'} /></td>
          <td class="center"><span class={`dss-tn heim ${r.cap ? 'captain' : ''}`}>{r.num}</span></td>
          <td>
            <div class={`dss-player ${r.status === 'bench' ? 'bench' : ''} ${r.status === 'dnp' ? 'dnp' : ''}`}>
              <div class="dss-player-info">
                <span class="dss-player-name">{r.name}{r.cap ? ' (C)' : ''}</span>
                {#if r.cap}<span class="dss-player-meta">Kapitän</span>{/if}
              </div>
            </div>
          </td>
          <td class="center"><span class={`dss-pos ${r.pos.toLowerCase()}`}>{r.pos}</span></td>
          <td class="center">
            <span class={`dss-pill-s ${r.status === 'on' ? 'on' : ''} ${r.status === 'dnp' ? 'dnp' : ''} ${r.cap ? 'cap' : ''}`}>
              {r.status === 'on' ? 'Aktiv' : r.status === 'bench' ? 'Bank' : 'DNP'}
            </span>
          </td>
        </tr>
      {/each}
    {/snippet}
  </Table>

{:else if preset === 'boxscore'}
  <Table
    title={dark ? 'USC Heidelberg · Live Statistik' : 'Spieler-Statistiken Q1 – Q4'}
    meta={dark ? 'Q4 · 02:14' : 'Stand · 4. Viertel · 02:14'}
    live={dark}
    {density}
    {dark}
    columns={[
      { key: 'num',  label: '#',   width: '52px' },
      { key: 'name', label: 'Spieler' },
      { key: 'pos',  label: 'Pos', width: '50px', align: 'center' },
      { key: 'min',  label: 'MIN', width: '60px', align: 'right', sortable: true },
      { key: 'pts',  label: 'PTS', width: '60px', align: 'right', sortable: true, sort: 'desc' },
      { key: 'p2',   label: '2P',  width: '70px', align: 'right', sortable: true },
      { key: 'p3',   label: '3P',  width: '70px', align: 'right', sortable: true },
      { key: 'ft',   label: 'FT',  width: '70px', align: 'right', sortable: true },
      { key: 'reb',  label: 'REB', width: '56px', align: 'right', sortable: true },
      { key: 'ast',  label: 'AST', width: '56px', align: 'right', sortable: true },
      { key: 'foul', label: 'F',   width: '50px', align: 'right', sortable: true },
      { key: 'pm',   label: '+/−', width: '64px', align: 'right', sortable: true },
    ]}
  >
    {#snippet rows()}
      {#each boxscore as p}
        <tr>
          <td><span class="dss-tn heim small">{p.num}</span></td>
          <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">{p.name}</span></div></div></td>
          <td class="center"><span class={`dss-pos ${p.pos}`}>{p.pos.toUpperCase()}</span></td>
          <td class="num">{p.min}</td>
          <td class="num lead">{p.pts}</td>
          <td class="num">{p.p2}</td>
          <td class="num">{p.p3}</td>
          <td class="num">{p.ft}</td>
          <td class="num">{p.reb}</td>
          <td class="num">{p.ast}</td>
          <td class="num">{p.foul}</td>
          <td class="num" style="color: var(--ok-text)">{p.pm}</td>
        </tr>
      {/each}
    {/snippet}
    {#snippet foot()}
      <tr>
        <td colspan="3" style="text-align: left; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--n-600);">Team Total</td>
        <td class="num">—</td>
        <td class="num" style="font-size: 15px;">87</td>
        <td class="num">27/52</td>
        <td class="num">6/19</td>
        <td class="num">15/19</td>
        <td class="num">37</td>
        <td class="num">20</td>
        <td class="num">16</td>
        <td class="num" style="color: var(--ok-text)">+23</td>
      </tr>
    {/snippet}
  </Table>

{:else if preset === 'crew'}
  <Table
    title="Kampfgericht & Schiedsrichter"
    meta="5 Personen · Spielbericht-Setup"
    density="default"
    {dark}
    columns={[
      { key: 'role', label: 'Rolle' },
      { key: 'name', label: 'Person' },
      { key: 'lic',  label: 'Lizenz', width: '180px' },
      { key: 'status', label: 'Status', width: '120px', align: 'center' },
    ]}
  >
    {#snippet rows()}
      {#each crew as c}
        <tr>
          <td>{c.role}</td>
          <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">{c.name}</span></div></div></td>
          <td style="font-family: var(--font-mono); font-size: 12px;">{c.license}</td>
          <td class="center"><span class="dss-pill-s on">Bestätigt</span></td>
        </tr>
      {/each}
    {/snippet}
  </Table>

{:else if preset === 'density'}
  <div style="display: flex; flex-direction: column; gap: 24px;">
    {#each ['touch', 'default', 'compact', 'dense'] as d}
      <div>
        <div style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--page-mute); margin-bottom: 8px;">
          Density · {d} · {d === 'touch' ? '60' : d === 'default' ? '48' : d === 'compact' ? '40' : '32'} px
        </div>
        <Table density={d} {dark} columns={[
          { key: 'num', label: '#', width: '52px' },
          { key: 'name', label: 'Spieler' },
          { key: 'pts', label: 'PTS', width: '70px', align: 'right' },
          { key: 'reb', label: 'REB', width: '70px', align: 'right' },
          { key: 'ast', label: 'AST', width: '70px', align: 'right' },
        ]}>
          {#snippet rows()}
            {#each boxscore.slice(0, 4) as p}
              <tr>
                <td><span class="dss-tn heim small">{p.num}</span></td>
                <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">{p.name}</span></div></div></td>
                <td class="num lead">{p.pts}</td>
                <td class="num">{p.reb}</td>
                <td class="num">{p.ast}</td>
              </tr>
            {/each}
          {/snippet}
        </Table>
      </div>
    {/each}
  </div>
{/if}

</div>
