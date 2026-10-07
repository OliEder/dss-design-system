<script lang="ts">
  /**
   * DSS PlayerCard · Svelte 5
   * --------------------------------------------------------------
   * Drei Maßstäbe derselben Spielerprimitive. Nutzt nur Klassen aus css/components.css
   * (`.dss-tn`/`.dss-pos` teilt sie mit der Table).
   *
   *   compact  — Listenzeile (Roster / Bank); mit `onclick` ein Button, sonst ein div
   *   standard — Karte mit Kopf + 4 Kennzahlen
   *   hero     — dunkle Großkarte mit großer Trikotnummer + 4 Kennzahlen
   */
  type Size = 'compact' | 'standard' | 'hero';
  type Stat = { label: string; value: string | number; accent?: boolean };

  let {
    size = 'standard',
    jersey,
    name,
    position = '',
    team = 'heim',
    captain = false,
    age = '',
    height_cm = '',
    role = '',
    vitals = [],
    stat = null,
    statLabel = '',
    onclick = undefined,
    titleAs = 'h3',
  }: {
    size?: Size;
    jersey: string | number;
    name: string;
    position?: string;
    team?: 'heim' | 'gast';
    captain?: boolean;
    age?: string;
    height_cm?: string;
    role?: string;
    vitals?: Stat[];
    stat?: string | number | null;
    statLabel?: string;
    onclick?: () => void;
    titleAs?: 'h2' | 'h3' | 'h4';
  } = $props();

  const posClass = $derived(position ? `dss-pos ${position.toLowerCase()}` : '');
</script>

{#snippet roleLine()}
  <div class="dss-pc-role">
    {#if position}<span class={posClass}>{position}</span>{/if}
    {#if captain}<span class="dss-pc-cap">Kapitän</span>{/if}
    {#if age}<span>{age}</span>{/if}
    {#if height_cm}<span>{height_cm} cm</span>{/if}
  </div>
{/snippet}

{#snippet vitalsGrid()}
  {#if vitals.length}
    <div class="dss-pc-vitals">
      {#each vitals as v (v.label)}
        <div>
          <div class={`dss-pc-v ${v.accent ? 'dss-pc-v--amber' : ''}`}>{v.value}</div>
          <div class="dss-pc-l">{v.label}</div>
        </div>
      {/each}
    </div>
  {/if}
{/snippet}

{#snippet compactBody()}
  <span class={`dss-tn ${team} small ${captain ? 'captain' : ''}`}>{jersey}</span>
  <span class="dss-pc-who">
    <span class="dss-pc-name">{name}{captain ? ' (C)' : ''}</span>
    {#if role || position}
      <span class="dss-pc-meta">{position}{role ? ` · ${role}` : ''}</span>
    {/if}
  </span>
  <!-- Pill nur visuell: die Position steht schon in der Meta-Zeile. Leeres span = Platzhalter für die Grid-Spalte. -->
  {#if position}<span class={posClass} aria-hidden="true">{position}</span>{:else}<span></span>{/if}
  {#if stat !== null}
    <span class="dss-pc-stat">
      {stat}
      {#if statLabel}<span class="dss-pc-stat-l">{statLabel}</span>{/if}
    </span>
  {:else}
    <span></span>
  {/if}
{/snippet}

{#if size === 'compact'}
  {#if onclick}
    <button class="dss-pc-row" {onclick} type="button">{@render compactBody()}</button>
  {:else}
    <div class="dss-pc-row">{@render compactBody()}</div>
  {/if}

{:else if size === 'standard'}
  <div class="dss-pc-card">
    <div class="dss-pc-head">
      <span class={`dss-tn ${team} large ${captain ? 'captain' : ''}`}>{jersey}</span>
      <div class="dss-pc-who">
        <svelte:element this={titleAs} class="dss-pc-nm">{name}</svelte:element>
        {@render roleLine()}
      </div>
    </div>
    {@render vitalsGrid()}
  </div>

{:else}
  <div class="dss-pc-hero">
    <div class="dss-pc-hero-left">
      <span class={`dss-tn hero ${team} ${captain ? 'captain' : ''}`}>{jersey}</span>
    </div>
    <div class="dss-pc-hero-right">
      <svelte:element this={titleAs} class="dss-pc-nm">{name}</svelte:element>
      {@render roleLine()}
      {@render vitalsGrid()}
    </div>
  </div>
{/if}
