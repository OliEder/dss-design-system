<script lang="ts">
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';
  import ScheduleGrid from '../../svelte/ScheduleGrid.svelte';
  import type { ScheduleGame } from '../../js/schedule.js';

  let { preset = 'mannschaft', density = undefined }: { preset?: string; density?: 'touch' | 'default' | 'compact' } = $props();

  const mannschaft: ScheduleGame[] = [
    { id: 'm1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV Jahn Freising', href: '#', score: 108 }, ownScore: 65 },
    { id: 'm2', state: 'finished', date: 'Sa, 03.10.2026', time: '17:30', at: 'heim', provisional: true, opponent: { name: 'Dukes Dingolfing', href: '#', score: 0 }, ownScore: 20, outcome: 'S' },
    { id: 'm3', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast', opponent: { name: 'Nürnberger Basketball Club', href: '#' } },
    { id: 'm4', state: 'scheduled', date: 'Sa, 17.10.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV 1884 Wolnzach', href: '#' } },
    { id: 'm5', state: 'postponed', date: 'So, 25.10.2026', time: '17:00', at: 'gast', opponent: { name: 'TV 1881 Altdorf', href: '#' }, note: 'Verlegt auf Sa, 14.11.2026, 19:00' },
  ];

  const liga: ScheduleGame[] = [
    { id: 'l1', state: 'finished', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '17:00', heim: { name: 'TuSpo Heroldsberg', href: '#', score: 64 }, gast: { name: 'TSV Breitengüßbach 2', href: '#', score: 90 }, league: { name: 'Bayernliga Herren Mitte', href: '#' } },
    { id: 'l2', state: 'live', section: 'Spieltag 5', date: 'So, 04.10.2026', time: '15:45', heim: { name: 'TG 48 Würzburg 2', href: '#', score: 52 }, gast: { name: 'CVJM Erlangen', href: '#', score: 48 }, league: { name: 'Bayernliga Herren Mitte', href: '#' } },
    { id: 'l3', state: 'scheduled', section: 'Spieltag 6', date: 'Sa, 10.10.2026', time: '15:00', heim: { name: 'Fibalon Baskets Neumarkt', href: '#', own: true }, gast: { name: 'FC Tegernheim', href: '#' }, league: { name: 'U18 männlich Bezirksoberliga', href: '#' } },
    { id: 'l4', state: 'cancelled', section: 'Spieltag 6', date: 'Sa, 10.10.2026', time: '17:30', heim: { name: 'TB Weiden', href: '#' }, gast: { name: 'SV Oberdürrbach 1959', href: '#' }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, note: 'Abgesagt: Halle gesperrt' },
  ];

  const turnier: ScheduleGame[] = [
    { id: 't1', state: 'finished', nr: '#1', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F1', heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 } },
    { id: 't2', state: 'finished', nr: '#2', section: 'Runde 1 · Gruppe A', time: '09:00–09:20', field: 'F2', heim: { name: 'BG Zirndorf', score: 28 }, gast: { name: 'TV Lich', score: 35 } },
    { id: 't3', state: 'live', nr: '#3', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F1', heim: { name: 'TSV Tröster', score: 18, own: true }, gast: { name: 'TV Lich', score: 20 } },
    { id: 't4', state: 'cancelled', nr: '#4', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F2', heim: { name: 'USC Heidelberg' }, gast: { name: 'SV Aschaffenburg' }, note: 'Rückzug SV Aschaffenburg' },
    { id: 't5', state: 'bye', nr: '#5', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', heim: { name: 'BG Zirndorf' } },
    { id: 't6', state: 'scheduled', nr: '#6', section: 'Runde 3 · Gruppe A', time: '10:00–10:20', field: 'F1', heim: { name: 'BG Zirndorf' }, gast: { name: 'TSV Tröster', own: true } },
    { id: 't9', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00–11:20', field: 'F1', heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true } },
  ];

  const rasterGames: ScheduleGame[] = [
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
</script>

<div style="padding: 24px; max-width: 1100px;">
  {#if preset === 'mannschaft'}
    <ScheduleTable games={mannschaft} {density} title="Spielplan" meta="5 Spiele" caption="Spielplan der Mannschaft" />
  {:else if preset === 'liga'}
    <ScheduleTable games={liga} {density} caption="Spielplan der Liga" />
  {:else if preset === 'turnier'}
    <ScheduleTable games={turnier} layout="columns" {density} title="Spielplan" meta="7 Spiele · Ende ca. 12:10" caption="Turnier-Spielplan">
      {#snippet notice(game)}
        {#if game.id === 't6'}<span class="dss-chip dss-chip--warn">Sperrzeit</span>{/if}
      {/snippet}
    </ScheduleTable>
  {:else}
    <ScheduleGrid
      games={rasterGames}
      columns={hallen}
      breaks={[{ time: '10:15', label: 'Mittagspause' }]}
      {density}
      title="Zeitraster"
      meta="Samstag, 10.10.2026"
      caption="Turnier-Tagesplan"
    />
  {/if}
</div>
