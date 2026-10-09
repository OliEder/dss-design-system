<script lang="ts">
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';
  import ScheduleGrid from '../../svelte/ScheduleGrid.svelte';
  import type { ScheduleGame } from '../../js/schedule.js';

  let { example }: { example: string } = $props();

  const D = 'Sa, 10.10.2026';

  // 01 · kleine Beispiele
  const miniLiga: ScheduleGame[] = [
    { id: 'a1', state: 'scheduled', date: D, time: '15:00', heim: { name: 'Norvik Baskets Rosenau', href: '#' }, gast: { name: 'FC Waldbach', href: '#' }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Halle am Stadtpark' },
  ];
  const miniMannschaft: ScheduleGame[] = [
    { id: 'a2', state: 'scheduled', date: D, time: '19:30', at: 'gast', opponent: { name: 'Bergheimer Basketball Club', href: '#' } },
  ];
  const miniTurnier: ScheduleGame[] = [
    { id: 'a3', state: 'scheduled', nr: '#6', time: '10:00–10:20', field: 'F1', heim: { name: 'BG Seeberg' }, gast: { name: 'TSV Nordhain', own: true } },
  ];
  const miniRaster: ScheduleGame[] = [
    { id: 'a4', state: 'scheduled', time: '09:00', column: 'h1', heim: { name: 'TSV Nordhain', own: true }, gast: { name: 'Lindenberg Hawks' } },
    { id: 'a5', state: 'scheduled', time: '09:00', column: 'h2', heim: { name: 'BG Seeberg' }, gast: { name: 'TV Elbach' } },
  ];
  const miniHallen = [{ id: 'h1', label: 'Halle 1' }, { id: 'h2', label: 'Halle 2' }];

  // 02 · Layouts
  const mannschaft: ScheduleGame[] = [
    { id: 'm1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV Falken Auental', href: '#', score: 108 }, ownScore: 65 },
    { id: 'm2', state: 'finished', date: 'Sa, 03.10.2026', time: '17:30', at: 'heim', provisional: true, opponent: { name: 'Dukes Eschental', href: '#', score: 0 }, ownScore: 20, outcome: 'S' },
    { id: 'm3', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast', opponent: { name: 'Bergheimer Basketball Club', href: '#' } },
    { id: 'm4', state: 'postponed', date: 'So, 25.10.2026', time: '17:00', at: 'gast', opponent: { name: 'TV 1881 Wiesental', href: '#' }, note: 'Verlegt auf Sa, 14.11.2026, 19:00' },
  ];
  const liga: ScheduleGame[] = [
    { id: 'l1', state: 'finished', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '17:00', heim: { name: 'TuSpo Hellenthal', href: '#', score: 64 }, gast: { name: 'TSV Hollbach 2', href: '#', score: 90 }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Sporthalle Hellenthal' },
    { id: 'l2', state: 'live', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '15:45', heim: { name: 'TG 48 Mainau 2', href: '#', score: 52 }, gast: { name: 'CVJM Ostfeld', href: '#', score: 48 }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Mainauer Sporthalle' },
    { id: 'l3', state: 'scheduled', section: 'Spieltag 6', date: D, time: '15:00', heim: { name: 'Norvik Baskets Rosenau', href: '#', own: true }, gast: { name: 'FC Waldbach', href: '#' }, league: { name: 'U18 männlich Bezirksoberliga', href: '#' }, venue: 'Halle am Stadtpark Rosenau' },
  ];
  const turnier: ScheduleGame[] = [
    { id: 't1', state: 'finished', nr: '#1', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F1', venue: 'Halle 1', heim: { name: 'TSV Nordhain', score: 42, own: true }, gast: { name: 'Lindenberg Hawks', score: 31 } },
    { id: 't2', state: 'live', nr: '#2', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F2', venue: 'Halle 1', heim: { name: 'BG Seeberg', score: 28 }, gast: { name: 'TV Elbach', score: 26 } },
    { id: 't3', state: 'scheduled', nr: '#3', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F1', venue: 'Halle 2', heim: { name: 'TSV Nordhain', own: true }, gast: { name: 'TV Elbach' } },
    { id: 't9', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00–11:20', field: 'F1', venue: 'Halle 1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
  ];

  // 03 · Raster
  const raster: ScheduleGame[] = [
    { id: 'r1', state: 'finished', nr: '#1', section: 'Gruppe A', time: '09:00', column: 'h1', heim: { name: 'TSV Nordhain', score: 42, own: true }, gast: { name: 'Lindenberg Hawks', score: 31 } },
    { id: 'r2', state: 'finished', nr: '#2', section: 'Gruppe A', time: '09:00', column: 'h2', heim: { name: 'BG Seeberg', score: 28 }, gast: { name: 'TV Elbach', score: 35 } },
    { id: 'r3', state: 'live', nr: '#3', section: 'Gruppe B', time: '09:00', column: 'h3', heim: { name: 'SV Kiefernau', score: 12 }, gast: { name: 'MTV Bergfeld', score: 10 } },
    { id: 'r4', state: 'scheduled', nr: '#4', section: 'Gruppe A', time: '09:30', column: 'h1', heim: { name: 'TSV Nordhain', own: true }, gast: { name: 'TV Elbach' } },
    { id: 'r5', state: 'cancelled', nr: '#5', section: 'Gruppe A', time: '09:30', column: 'h2', heim: { name: 'Lindenberg Hawks' }, gast: { name: 'BG Seeberg' }, note: 'Halle gesperrt' },
    { id: 'r6', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00', column: 'h1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
    { id: 'r7', state: 'bye', time: '09:30', heim: { name: 'SV Kiefernau' } },
  ];
  const hallen = [
    { id: 'h1', label: 'Sporthalle Nordhain' },
    { id: 'h2', label: 'Seehalle Seeberg' },
    { id: 'h3', label: 'Feld 3' },
  ];
  const hallen5 = [
    { id: 'h1', label: 'Halle 1' }, { id: 'h2', label: 'Halle 2' }, { id: 'h3', label: 'Halle 3' },
    { id: 'h4', label: 'Halle 4' }, { id: 'h5', label: 'Halle 5' },
  ];
  const raster5: ScheduleGame[] = [
    { id: 'f1', state: 'scheduled', time: '09:00', column: 'h1', heim: { name: 'TSV Nordhain', own: true }, gast: { name: 'Lindenberg Hawks' } },
    { id: 'f2', state: 'live', time: '09:00', column: 'h2', heim: { name: 'BG Seeberg', score: 8 }, gast: { name: 'TV Elbach', score: 6 } },
    { id: 'f3', state: 'scheduled', time: '09:00', column: 'h3', heim: { name: 'SV Kiefernau' }, gast: { name: 'MTV Bergfeld' } },
    { id: 'f4', state: 'scheduled', time: '09:00', column: 'h4', heim: { name: 'TB Grünfeld' }, gast: { name: 'TG 48 Mainau' } },
    { id: 'f5', state: 'scheduled', time: '09:00', column: 'h5', heim: { name: 'CVJM Ostfeld' }, gast: { name: 'FC Waldbach' } },
    { id: 'f6', state: 'scheduled', time: '09:30', column: 'h1', heim: { name: 'TV Elbach' }, gast: { name: 'BG Seeberg' } },
  ];

  // 04 · Zustände (je ein Spiel)
  const ft = (id: string, extra: Partial<ScheduleGame>): ScheduleGame => ({
    id, state: 'scheduled', date: D, time: '15:00',
    heim: { name: 'TuSpo Hellenthal' }, gast: { name: 'TSV Hollbach 2' }, ...extra,
  });
  const opp = (id: string, extra: Partial<ScheduleGame>): ScheduleGame => ({
    id, state: 'finished', date: D, time: '17:30', at: 'heim',
    opponent: { name: 'TSV Falken Auental', score: 70 }, ownScore: 80, ...extra,
  });

  type StateEx = { key: string; label: string; games: ScheduleGame[]; layout?: 'versus' | 'opponent' | 'columns'; extra?: 'notice' | 'time' };
  const states: StateEx[] = [
    { key: 'scheduled', label: 'Geplant', games: [ft('s1', {})] },
    { key: 'live', label: 'Live', games: [ft('s2', { state: 'live', heim: { name: 'TuSpo Hellenthal', score: 52 }, gast: { name: 'TSV Hollbach 2', score: 48 } })] },
    { key: 'finished', label: 'Beendet', games: [ft('s3', { state: 'finished', heim: { name: 'TuSpo Hellenthal', score: 64 }, gast: { name: 'TSV Hollbach 2', score: 90 } })] },
    { key: 'provisional', label: 'Vorläufig', games: [ft('s4', { state: 'finished', provisional: true, heim: { name: 'TuSpo Hellenthal', score: 64 }, gast: { name: 'TSV Hollbach 2', score: 90 } })] },
    { key: 'cancelled', label: 'Abgesagt', games: [ft('s5', { state: 'cancelled', note: 'Abgesagt: Halle gesperrt' })] },
    { key: 'postponed', label: 'Verlegt', games: [ft('s6', { state: 'postponed', note: 'Verlegt auf Sa, 14.11.2026, 19:00' })] },
    { key: 'bye', label: 'Freilos', games: [{ id: 's7', state: 'bye', time: '09:30', heim: { name: 'TSV Nordhain' } }], layout: 'columns' },
    { key: 'own', label: 'Eigene Mannschaft', games: [ft('s8', { heim: { name: 'Norvik Baskets Rosenau', own: true }, gast: { name: 'FC Waldbach' } })], layout: 'versus' },
    { key: 'placeholder', label: 'Platzhalter', games: [ft('s9', { heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } })] },
    { key: 'win', label: 'Sieg (S)', games: [opp('s10', {})], layout: 'opponent' },
    { key: 'loss', label: 'Niederlage (N)', games: [opp('s11', { opponent: { name: 'TSV Falken Auental', score: 108 }, ownScore: 65 })], layout: 'opponent' },
    { key: 'draw', label: 'Unentschieden (U)', games: [opp('s12', { opponent: { name: 'TSV Falken Auental', score: 70 }, ownScore: 70 })], layout: 'opponent' },
    { key: 'forfeit', label: 'Forfait über outcome', games: [opp('s13', { opponent: { name: 'Dukes Eschental', score: 0 }, ownScore: 20, outcome: 'S' })], layout: 'opponent' },
    { key: 'notice', label: 'Konflikt-Hinweis', games: [{ id: 's14', state: 'scheduled', nr: '#6', time: '10:00–10:20', field: 'F1', heim: { name: 'BG Seeberg' }, gast: { name: 'TSV Nordhain', own: true } }], layout: 'columns', extra: 'notice' },
    { key: 'time', label: 'Bearbeitbare Zeit', games: [{ id: 's15', state: 'scheduled', nr: '#9', time: '11:00', field: 'F1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } }], layout: 'columns', extra: 'time' },
  ];

  // Dos und Don'ts
  const eigene: ScheduleGame[] = [
    ft('e1', { heim: { name: 'Norvik Baskets Rosenau', own: true }, gast: { name: 'FC Waldbach' } }),
    ft('e2', { time: '17:00' }),
  ];

  const inputStyle = 'width: 7ch; font: inherit; padding: 2px 6px; border: 1px solid var(--dss-line); border-radius: 6px; background: var(--dss-surface); color: var(--dss-fg);';
</script>

{#if example === 'mini-liga'}
  <ScheduleTable games={miniLiga} layout="versus" caption="Beispiel Liga" />
{:else if example === 'mini-mannschaft'}
  <ScheduleTable games={miniMannschaft} layout="opponent" caption="Beispiel Mannschaft" />
{:else if example === 'mini-turnier'}
  <ScheduleTable games={miniTurnier} layout="columns" caption="Beispiel Turnier-Liste" />
{:else if example === 'mini-raster'}
  <ScheduleGrid games={miniRaster} columns={miniHallen} caption="Beispiel Tagesplan" />
{:else if example === 'layout-opponent'}
  <ScheduleTable games={mannschaft} layout="opponent" title="Spielplan" meta="4 Spiele" caption="Beispiel Mannschafts-Spielplan" />
{:else if example === 'layout-versus'}
  <ScheduleTable games={liga} layout="versus" title="Spieltage" meta="Bayernliga" caption="Beispiel Liga-Spielplan" />
{:else if example === 'layout-columns'}
  <ScheduleTable games={turnier} layout="columns" title="Spielplan" meta="4 Spiele" caption="Beispiel Turnier-Spielplan" />
{:else if example === 'raster-3'}
  <ScheduleGrid
    games={raster}
    columns={hallen}
    breaks={[{ time: '10:15', label: 'Mittagspause' }]}
    title="Zeitraster"
    meta="Samstag, 10.10.2026"
    caption="Turnier-Tagesplan"
  />
{:else if example === 'raster-5'}
  <ScheduleGrid games={raster5} columns={hallen5} title="Fünf Hallen" meta="09:00 bis 09:30" caption="Zeitraster mit fünf Hallen" />
{:else if example === 'dichte-touch'}
  <ScheduleTable games={turnier.slice(0, 2)} layout="columns" density="touch" caption="Dichte Touch · 60 px" />
{:else if example === 'dichte-default'}
  <ScheduleTable games={turnier.slice(0, 2)} layout="columns" density="default" caption="Dichte Standard · 48 px" />
{:else if example === 'dichte-compact'}
  <ScheduleTable games={turnier.slice(0, 2)} layout="columns" density="compact" caption="Dichte Kompakt · 40 px" />
{:else if example === 'do-dichte'}
  <ScheduleTable games={turnier.slice(0, 2)} layout="columns" density="touch" caption="Touch-Dichte" />
{:else if example === 'dont-dichte'}
  <ScheduleTable games={turnier.slice(0, 2)} layout="columns" density="compact" caption="Kompakte Dichte" />
{:else if example === 'do-absage'}
  <ScheduleTable games={[ft('d1', { state: 'cancelled', note: 'Abgesagt: Halle gesperrt' })]} caption="Abgesagt mit Grund" />
{:else if example === 'dont-absage'}
  <ScheduleTable games={[ft('d2', { state: 'cancelled' })]} caption="Abgesagt ohne Grund" />
{:else if example === 'do-hallen'}
  <ScheduleGrid games={raster} columns={hallen} caption="Drei Hallen" />
{:else if example === 'dont-hallen'}
  <ScheduleGrid games={raster5} columns={hallen5} caption="Fünf Hallen" />
{:else if example === 'do-eigene'}
  <ScheduleTable games={eigene} layout="versus" caption="Eigene Mannschaft dezent" />
{:else if example === 'dont-eigene'}
  <!-- Nachgestellt: die Komponente kann eine laute Zeile nicht, die Hintergrundfarbe kommt von außen. -->
  <div class="shout">
    <ScheduleTable games={eigene} layout="versus" caption="Eigene Mannschaft laut" />
  </div>
{/if}

{#each states as s (s.key)}
  {#if example === 'zustand-' + s.key}
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
  {/if}
{/each}

<style>
  .shout :global(.dss-tbl tbody tr:not(.dss-sch-group)) { background: var(--signal-400); }
</style>
