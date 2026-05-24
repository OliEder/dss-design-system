<script context="module" lang="ts">
  import type { Meta } from '@storybook/sveltekit';
  import Icon, { ICON_NAMES } from '../svelte/Icon.svelte';

  export const meta = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
      name: { control: 'select', options: ICON_NAMES },
      size: { control: { type: 'range', min: 12, max: 96, step: 2 } },
    },
    args: {
      name: 'whistle',
      size: 32,
    },
  } satisfies Meta<Icon>;

  // Group the 54 icons by family, matching the v0.6 Icons spec
  const families: { title: string; ids: string[] }[] = [
    { title: 'Spielaktionen', ids: ['2p', '3p', 'ft', 'foul-p', 'foul-t', 'foul-u', 'foul-d', 'rebound', 'assist', 'steal', 'block', 'turnover', 'sub'] },
    { title: 'Court',         ids: ['hoop', 'backboard', 'zone', '3line', 'center', 'shotclock'] },
    { title: 'Rollen',        ids: ['whistle', 'scorer', 'coach', 'captain', 'dnp'] },
    { title: 'Status',        ids: ['live', 'timeout', 'half', 'dq', 'foulout', 'bonus'] },
    { title: 'System',        ids: ['sync', 'offline', 'valid', 'print', 'signature', 'cloud', 'lock'] },
    { title: 'UI · Navigation', ids: ['home', 'search', 'bell', 'cog', 'menu', 'more-h', 'chevron-r', 'chevron-d', 'chevron-l', 'chevron-u', 'arr-r'] },
    { title: 'UI · Aktionen',   ids: ['plus', 'minus', 'check', 'x', 'edit', 'trash', 'filter', 'sort', 'export', 'import', 'share'] },
    { title: 'UI · Content',    ids: ['calendar', 'roster', 'stats', 'trophy', 'folder', 'question', 'info', 'warn'] },
  ];
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Icon from '../svelte/Icon.svelte';
</script>

<Story name="Standard" />

<Story name="Größen">
  <div class="sb-row" style="align-items: baseline;">
    <Icon name="whistle" size={16} />
    <Icon name="whistle" size={24} />
    <Icon name="whistle" size={32} />
    <Icon name="whistle" size={48} />
    <Icon name="whistle" size={64} />
  </div>
</Story>

<Story name="currentColor · Tint folgt Text">
  <div class="sb-row">
    <span style="display:inline-flex;align-items:center;gap:6px;color:var(--amber-700);">
      <Icon name="live" /> Live
    </span>
    <span style="display:inline-flex;align-items:center;gap:6px;color:var(--err-text);">
      <Icon name="foul-d" /> Disqualifiziert
    </span>
    <span style="display:inline-flex;align-items:center;gap:6px;color:var(--ok-text);">
      <Icon name="valid" /> Validiert
    </span>
    <span style="display:inline-flex;align-items:center;gap:6px;color:var(--sky-700);">
      <Icon name="whistle" /> Schiri
    </span>
  </div>
</Story>

<Story name="Spielaktionen (13)">
  <div class="sb-row">
    {#each ['2p', '3p', 'ft', 'foul-p', 'foul-t', 'foul-u', 'foul-d', 'rebound', 'assist', 'steal', 'block', 'turnover', 'sub'] as n}
      <div class="tile">
        <Icon name={n} size={32} />
        <div class="lbl">{n}</div>
      </div>
    {/each}
  </div>
</Story>

<Story name="Alle Familien">
  <div class="sb-stack">
    {#each families as fam}
      <div>
        <div class="sb-label" style="margin-bottom:8px;">{fam.title} · {fam.ids.length}</div>
        <div class="sb-row">
          {#each fam.ids as n}
            <div class="tile">
              <Icon name={n} size={28} />
              <div class="lbl">{n}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Story>

<style>
  .tile {
    width: 88px; min-height: 84px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px;
    background: var(--surface-0);
    border: 1px solid var(--page-line);
    border-radius: var(--radius-md);
    padding: 10px 6px;
    color: var(--ink-800);
  }
  .lbl {
    font-family: var(--font-mono); font-size: 10.5px;
    color: var(--page-mute);
    text-align: center; max-width: 100%;
    overflow: hidden; text-overflow: ellipsis;
  }
</style>
