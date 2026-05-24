<script context="module" lang="ts">
  import type { Meta } from '@storybook/sveltekit';
  import Card from '../svelte/Card.svelte';

  export const meta = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
      variant: { control: 'inline-radio', options: ['default', 'elevated', 'flat', 'hoverable'] },
      padding: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    },
    args: {
      variant: 'default',
      padding: 'md',
    },
  } satisfies Meta<Card>;
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Card from '../svelte/Card.svelte';
</script>

<Story name="Default">
  {#snippet template(args)}
    <div style="max-width: 360px;">
      <Card {...args}>
        <h4 style="margin:0 0 6px;font-family:var(--font-display);">Default</h4>
        <p style="margin:0;color:var(--n-700);font-size:14px;">
          1&nbsp;px Border, Radius&nbsp;lg, Surface-0. Standard für Detail-Frames und Listen-Items.
        </p>
      </Card>
    </div>
  {/snippet}
</Story>

<Story name="Elevated" args={{ variant: 'elevated' }}>
  {#snippet template(args)}
    <div style="max-width: 360px;">
      <Card {...args}>
        <h4 style="margin:0 0 6px;font-family:var(--font-display);">Elevated</h4>
        <p style="margin:0;color:var(--n-700);font-size:14px;">
          Shadow-md, keine Border. Für schwebende Listen-Items und Live-Tiles.
        </p>
      </Card>
    </div>
  {/snippet}
</Story>

<Story name="Flat" args={{ variant: 'flat' }}>
  {#snippet template(args)}
    <div style="max-width: 360px;">
      <Card {...args}>
        <h4 style="margin:0 0 6px;font-family:var(--font-display);">Flat</h4>
        <p style="margin:0;color:var(--n-700);font-size:14px;">
          Surface-2, keine Border, kein Schatten. Für hohe Dichte ohne visuelles Rauschen.
        </p>
      </Card>
    </div>
  {/snippet}
</Story>

<Story name="Hoverable" args={{ variant: 'hoverable' }}>
  {#snippet template(args)}
    <div style="max-width: 360px;">
      <Card {...args}>
        <h4 style="margin:0 0 6px;font-family:var(--font-display);">Hoverable · interaktiv</h4>
        <p style="margin:0;color:var(--n-700);font-size:14px;">
          Cursor wird Pointer, Border zieht auf Ink-300 an, leichter Lift &amp; Schatten.
        </p>
      </Card>
    </div>
  {/snippet}
</Story>

<Story name="Mit Header & Footer">
  {#snippet template(args)}
    <div style="max-width: 380px;">
      <Card {...args}>
        {#snippet header()}
          <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;border-bottom:1px solid var(--page-line);">
            <span>Roster · TSV München</span>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--page-mute);">12 Spieler</span>
          </div>
        {/snippet}
        <ul style="margin:0;padding:0;list-style:none;font-size:14px;line-height:2;color:var(--ink-800);">
          <li>4 · Sandro Mauer</li>
          <li>7 · Lukas König</li>
          <li>14 · Daniel Reiß (C)</li>
          <li>23 · Max Bauer</li>
          <li>33 · Tom Lindner</li>
        </ul>
        {#snippet footer()}
          <span>Stand · 17. Spieltag</span>
          <span>BBL · Bayernliga Süd</span>
        {/snippet}
      </Card>
    </div>
  {/snippet}
</Story>

<Story name="Alle 4 Varianten">
  <div class="sb-grid-3">
    <Card variant="default">
      <h4 style="margin:0 0 6px;font-family:var(--font-display);">Default</h4>
      <p style="margin:0;color:var(--n-700);font-size:13px;">Border · Surface-0</p>
    </Card>
    <Card variant="elevated">
      <h4 style="margin:0 0 6px;font-family:var(--font-display);">Elevated</h4>
      <p style="margin:0;color:var(--n-700);font-size:13px;">Shadow-md · borderless</p>
    </Card>
    <Card variant="flat">
      <h4 style="margin:0 0 6px;font-family:var(--font-display);">Flat</h4>
      <p style="margin:0;color:var(--n-700);font-size:13px;">Surface-2 · plain</p>
    </Card>
    <Card variant="hoverable" onclick={() => alert('klick')}>
      <h4 style="margin:0 0 6px;font-family:var(--font-display);">Hoverable</h4>
      <p style="margin:0;color:var(--n-700);font-size:13px;">Klick / Lift / Glow</p>
    </Card>
  </div>
</Story>
