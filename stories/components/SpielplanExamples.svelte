<script lang="ts">
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';
  import type { ScheduleGame } from '../../js/schedule.js';

  let { example }: { example: string } = $props();

  const D = 'Sa, 10.10.2026';
  const miniLiga: ScheduleGame[] = [
    { id: 'a1', state: 'scheduled', date: D, time: '15:00', heim: { name: 'Fibalon Baskets Neumarkt', href: '#' }, gast: { name: 'FC Tegernheim', href: '#' }, league: { name: 'Bayernliga Herren Mitte', href: '#' }, venue: 'Halle am Stadtpark' },
  ];
</script>

{#if example === 'mini-liga'}
  <ScheduleTable games={miniLiga} layout="versus" caption="Beispiel Liga" />
{/if}
