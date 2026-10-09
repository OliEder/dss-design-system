export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<!-- Stile: dss-tabs--underline | --segmented | --pills | --vertical. Größen: dss-tabs--sm | --md | --lg.
     Gewählt ist der Tab mit .is-active und aria-selected="true". Umschalten, Pfeiltasten und Panel
     musst du selbst ergänzen (für Pills als Filter: aria-pressed statt role="tab"). -->
<div class="dss-tabs dss-tabs--underline dss-tabs--md" role="tablist" aria-label="Spielansicht">
  <button type="button" class="dss-tab is-active" role="tab" aria-selected="true" tabindex="0">
    <span class="dss-tab-label">Übersicht</span>
  </button>
  <button type="button" class="dss-tab" role="tab" aria-selected="false" tabindex="-1">
    <span class="dss-tab-label">Aufstellung</span>
    <span class="dss-tab-count">12</span>
  </button>
  <button type="button" class="dss-tab is-disabled" role="tab" aria-selected="false" tabindex="-1" disabled>
    <span class="dss-tab-label">Boxscore</span>
  </button>
</div>`;

export const svelte = `<script>
  import Tabs from '@bbv/dss-design-system/svelte/Tabs';

  const ansichten = [
    { id: 'overview', label: 'Übersicht' },
    { id: 'roster', label: 'Aufstellung', count: 12 },
    { id: 'box', label: 'Boxscore' },
  ];
  const ligen = [
    { id: 'a', label: 'Bayernliga Süd' },
    { id: 'b', label: 'Regionalliga' },
    { id: 'c', label: 'Saison 25/26' },
  ];

  let ansicht = $state('overview');
  let aktiv = $state(['a']);
</script>

<!-- Einzelauswahl: Pfeiltasten wählen und fokussieren -->
<Tabs bind:value={ansicht} items={ansichten} ariaLabel="Spielansicht" />

<!-- Das Panel rendert die App selbst -->
{#if ansicht === 'overview'}
  <p>Zusammenfassung des Spiels.</p>
{:else if ansicht === 'roster'}
  <p>Aufstellung beider Mannschaften.</p>
{/if}

<!-- Mehrfachauswahl: Pills als Filter -->
<Tabs bind:activeIds={aktiv} items={ligen} variant="pills" multi ariaLabel="Ligen filtern" />`;

export const react = `import { useState } from 'react';
import { Tabs, type TabItem } from '@bbv/dss-design-system/react';

const ansichten: TabItem[] = [
  { id: 'overview', label: 'Übersicht' },
  { id: 'roster', label: 'Aufstellung', count: 12 },
  { id: 'box', label: 'Boxscore' },
];
const ligen: TabItem[] = [
  { id: 'a', label: 'Bayernliga Süd' },
  { id: 'b', label: 'Regionalliga' },
  { id: 'c', label: 'Saison 25/26' },
];

export function Spielansicht() {
  const [ansicht, setAnsicht] = useState('overview');
  const [aktiv, setAktiv] = useState<string[]>(['a']);
  return (
    <>
      {/* Einzelauswahl: Pfeiltasten wählen und fokussieren */}
      <Tabs items={ansichten} value={ansicht} onValueChange={setAnsicht} ariaLabel="Spielansicht" />

      {/* Das Panel rendert die App selbst */}
      {ansicht === 'overview' && <p>Zusammenfassung des Spiels.</p>}
      {ansicht === 'roster' && <p>Aufstellung beider Mannschaften.</p>}

      {/* Mehrfachauswahl: Pills als Filter */}
      <Tabs items={ligen} variant="pills" multi activeIds={aktiv} onActiveIdsChange={setAktiv} ariaLabel="Ligen filtern" />
    </>
  );
}`;
