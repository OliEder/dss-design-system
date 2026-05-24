<script context="module" lang="ts">
  import type { Meta } from '@storybook/sveltekit';
  import Tabs from '../svelte/Tabs.svelte';

  export const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
      variant: { control: 'inline-radio', options: ['underline', 'segmented', 'pills', 'vertical'] },
      size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    },
    args: {
      variant: 'underline',
      size: 'md',
    },
  } satisfies Meta<Tabs>;

  const pageTabs = [
    { id: 'overview', label: 'Übersicht' },
    { id: 'roster',   label: 'Aufstellung', count: 12 },
    { id: 'box',      label: 'Boxscore' },
    { id: 'pbp',      label: 'Play-by-Play', count: 47 },
    { id: 'crew',     label: 'Kampfgericht' },
  ];

  const density = [
    { id: 'touch',   label: 'Touch' },
    { id: 'default', label: 'Default' },
    { id: 'compact', label: 'Compact' },
    { id: 'dense',   label: 'Dense' },
  ];

  const quarters = [
    { id: 'q1', label: 'Q1' },
    { id: 'q2', label: 'Q2' },
    { id: 'q3', label: 'Q3' },
    { id: 'q4', label: 'Q4' },
    { id: 'ot', label: 'OT', disabled: true },
  ];

  const filters = [
    { id: 'a',  label: 'Bayernliga Süd' },
    { id: 'b',  label: 'Regionalliga' },
    { id: 'c',  label: 'Saison 25/26' },
    { id: 'd',  label: 'Damen' },
    { id: 'e',  label: 'U18 männlich' },
    { id: 'f',  label: 'Pokal' },
  ];

  const settings = [
    { id: 'profile', label: 'Profil' },
    { id: 'notify',  label: 'Benachrichtigungen' },
    { id: 'team',    label: 'Team-Config' },
    { id: 'license', label: 'Schiedsrichter-Lizenz' },
    { id: 'print',   label: 'Druck & Export' },
  ];
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Tabs from '../svelte/Tabs.svelte';

  let v1 = $state('overview');
  let v2 = $state('default');
  let v3 = $state('q2');
  let v4 = $state<string[]>(['a', 'c']);
  let v5 = $state('team');
</script>

<Story name="Underline · Seiten-Tabs">
  <div style="max-width: 720px;">
    <Tabs items={pageTabs} bind:value={v1} variant="underline" />
    <div style="padding: 16px; font-size: 14px; color: var(--ink-700);">
      Aktive Section: <code>{v1}</code>
    </div>
  </div>
</Story>

<Story name="Segmented · Dichte-Toggle">
  <div class="sb-stack">
    <Tabs items={density} bind:value={v2} variant="segmented" />
    <Tabs items={density} bind:value={v2} variant="segmented" size="lg" />
    <span class="sb-label">Aktiv: {v2}</span>
  </div>
</Story>

<Story name="Segmented · Viertel (Hallen-Touch)" args={{ variant: 'segmented', size: 'lg' }}>
  {#snippet template(args)}
    <Tabs items={quarters} bind:value={v3} {...args} />
  {/snippet}
</Story>

<Story name="Pills · Filter-Strip (multi)">
  <div style="max-width: 640px;">
    <Tabs items={filters} variant="pills" multi bind:activeIds={v4} />
    <div style="margin-top: 12px; font-family: var(--font-mono); font-size: 12px; color: var(--page-mute);">
      Aktive Filter: [{v4.join(', ')}]
    </div>
  </div>
</Story>

<Story name="Vertical · Settings-Sidebar">
  <div style="display: flex; gap: 24px; align-items: flex-start;">
    <Tabs items={settings} bind:value={v5} variant="vertical" />
    <div style="flex:1;background:var(--surface-0);border:1px solid var(--page-line);border-radius:var(--radius-lg);padding:24px;min-height:240px;">
      <h3 style="margin:0 0 8px;font-family:var(--font-display);">{settings.find(s=>s.id===v5)?.label}</h3>
      <p style="margin:0;color:var(--ink-700);font-size:14px;">Inhalt der gewählten Settings-Section.</p>
    </div>
  </div>
</Story>

<Story name="Alle Varianten">
  <div class="sb-stack">
    <span class="sb-label">Underline</span>
    <Tabs items={pageTabs.slice(0,3)} variant="underline" />
    <span class="sb-label">Segmented</span>
    <Tabs items={density} variant="segmented" />
    <span class="sb-label">Pills</span>
    <Tabs items={filters.slice(0,4)} variant="pills" multi />
    <span class="sb-label">Vertical</span>
    <Tabs items={settings.slice(0,4)} variant="vertical" />
  </div>
</Story>
