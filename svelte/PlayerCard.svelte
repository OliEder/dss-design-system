<script lang="ts">
  /**
   * DSS PlayerCard · Svelte 5 example
   * --------------------------------------------------------------
   * Three scales of the same player primitive.
   *
   *   compact  — single-row list item (roster / bench display)
   *   standard — card with head + 4 vitals grid (player overview)
   *   hero     — full-bleed dark card with large jersey + 4 vitals
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
    onclick,
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
  } = $props();
</script>

{#if size === 'compact'}
  <button class="dss-pc-row" onclick={onclick} type="button">
    <span class={`dss-tn ${team} small ${captain ? 'captain' : ''}`}>{jersey}</span>
    <div class="who">
      <div class="name">{name}{captain ? ' (C)' : ''}</div>
      {#if role || position}
        <div class="meta">{position}{role ? ` · ${role}` : ''}</div>
      {/if}
    </div>
    {#if position}<span class={`dss-pos ${position.toLowerCase()}`}>{position}</span>{/if}
    {#if stat !== null}
      <div class="stat">
        {stat}
        {#if statLabel}<span class="l">{statLabel}</span>{/if}
      </div>
    {/if}
  </button>

{:else if size === 'standard'}
  <div class="dss-pc-card">
    <div class="head">
      <span class={`dss-tn ${team} large ${captain ? 'captain' : ''}`}>{jersey}</span>
      <div class="who">
        <div class="nm">{name}</div>
        <div class="role">
          {#if position}<span class={`dss-pos ${position.toLowerCase()}`}>{position}</span>{/if}
          {#if captain}<span class="cap">Kapitän</span>{/if}
          {#if age}<span>{age}</span>{/if}
          {#if height_cm}<span>{height_cm} cm</span>{/if}
        </div>
      </div>
    </div>
    {#if vitals.length}
      <div class="vitals">
        {#each vitals as v}
          <div class="s">
            <div class={`v ${v.accent ? 'amber' : ''}`}>{v.value}</div>
            <div class="l">{v.label}</div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

{:else}
  <div class="dss-pc-hero">
    <div class="left">
      <span class={`dss-tn hero ${team} ${captain ? 'captain' : ''}`}>{jersey}</span>
    </div>
    <div class="right">
      <h3 class="nm">{name}</h3>
      <div class="role">
        {#if position}<span class={`dss-pos ${position.toLowerCase()}`}>{position}</span>{/if}
        {#if captain}<span class="cap">Kapitän</span>{/if}
        {#if age}<span>{age}</span>{/if}
        {#if height_cm}<span>{height_cm} cm</span>{/if}
      </div>
      {#if vitals.length}
        <div class="vitals">
          {#each vitals as v}
            <div class="s">
              <div class={`v ${v.accent ? 'amber' : ''}`}>{v.value}</div>
              <div class="l">{v.label}</div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* shared tn (mirrors Table component) */
  :global(.dss-tn) {
    display: inline-flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 10px;
    font-family: var(--font-display); font-weight: 800;
    font-size: 18px; letter-spacing: -0.02em;
    background: var(--n-100); color: var(--ink-900);
    font-variant-numeric: tabular-nums; flex-shrink: 0;
  }
  :global(.dss-tn.heim) { background: var(--team-heim, oklch(0.55 0.20 27)); color: white; }
  :global(.dss-tn.gast) { background: var(--team-gast, oklch(0.55 0.18 245)); color: white; }
  :global(.dss-tn.captain) { box-shadow: 0 0 0 2px var(--amber-500); }
  :global(.dss-tn.small) { width: 32px; height: 32px; font-size: 13.5px; border-radius: 7px; }
  :global(.dss-tn.large) { width: 64px; height: 64px; font-size: 26px; border-radius: 14px; }
  :global(.dss-tn.hero)  { width: 110px; height: 110px; font-size: 48px; border-radius: 22px; }

  :global(.dss-pos) {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 26px; height: 22px; padding: 0 6px;
    border-radius: 5px;
    background: var(--n-100); color: var(--ink-700);
    font-family: var(--font-mono); font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.06em;
  }
  :global(.dss-pos.pg) { background: var(--sky-100); color: var(--sky-800); }
  :global(.dss-pos.sg) { background: var(--info-soft); color: var(--info-text); }
  :global(.dss-pos.sf) { background: var(--ok-soft); color: var(--ok-text); }
  :global(.dss-pos.pf) { background: var(--warn-soft); color: var(--warn-text); }
  :global(.dss-pos.c)  { background: var(--err-soft); color: var(--err-text); }

  /* ── compact row ─────────────────────────────────────────────── */
  .dss-pc-row {
    appearance: none; cursor: pointer;
    display: grid;
    grid-template-columns: 32px 1fr auto auto;
    gap: 14px; align-items: center;
    padding: 12px 16px;
    background: var(--n-0);
    border: 1px solid var(--page-line);
    border-radius: 12px;
    width: 100%;
    text-align: left;
    font-family: var(--font-body);
    transition: border-color 0.12s, background 0.12s;
  }
  .dss-pc-row:hover { border-color: var(--ink-300); background: var(--n-50); }
  .dss-pc-row .who { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .dss-pc-row .name {
    font-weight: 600; font-size: 14.5px;
    color: var(--ink-900); letter-spacing: -0.005em; line-height: 1.2;
  }
  .dss-pc-row .meta {
    font-family: var(--font-mono); font-size: 10.5px;
    color: var(--page-mute);
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .dss-pc-row .stat {
    text-align: right;
    font-family: var(--font-mono); font-weight: 700;
    font-size: 14px; color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .dss-pc-row .stat .l {
    display: block;
    font-weight: 500; font-size: 10px;
    color: var(--page-mute);
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  /* ── standard card ───────────────────────────────────────────── */
  .dss-pc-card {
    background: var(--n-0);
    border: 1px solid var(--page-line);
    border-radius: 14px;
    overflow: hidden;
    display: flex; flex-direction: column;
    font-family: var(--font-body);
  }
  .dss-pc-card .head {
    padding: 22px;
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 16px; align-items: center;
    border-bottom: 1px solid var(--page-line);
  }
  .dss-pc-card .who { display: flex; flex-direction: column; gap: 4px; }
  .dss-pc-card .nm {
    font-family: var(--font-display); font-weight: 600;
    font-size: 19px; letter-spacing: -0.01em;
    color: var(--ink-900);
  }
  .dss-pc-card .role {
    display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
    font-family: var(--font-mono); font-size: 10.5px;
    color: var(--page-mute);
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .dss-pc-card .role .cap,
  .dss-pc-hero .role .cap {
    padding: 2px 6px; border-radius: 4px;
    background: var(--amber-100); color: var(--amber-800);
    font-weight: 700;
  }
  .dss-pc-card .vitals {
    display: grid; grid-template-columns: repeat(4, 1fr);
    padding: 18px 22px;
    gap: 16px;
  }
  .dss-pc-card .vitals .s .v {
    font-family: var(--font-display); font-weight: 800;
    font-size: 22px; letter-spacing: -0.02em;
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .dss-pc-card .vitals .v.amber { color: var(--amber-700); }
  .dss-pc-card .vitals .s .l {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--page-mute);
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-top: 2px;
  }

  /* ── hero card ───────────────────────────────────────────────── */
  .dss-pc-hero {
    background: var(--ink-1000);
    color: white;
    border-radius: 18px;
    overflow: hidden;
    padding: 32px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 28px; align-items: center;
    position: relative;
    font-family: var(--font-body);
  }
  .dss-pc-hero::before {
    content: ''; position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: var(--amber-400);
    opacity: 0.16;
    filter: blur(20px);
  }
  .dss-pc-hero .left,
  .dss-pc-hero .right { position: relative; z-index: 1; }
  .dss-pc-hero .right { display: flex; flex-direction: column; gap: 18px; }
  .dss-pc-hero .nm {
    font-family: var(--font-display); font-weight: 700;
    font-size: 32px; letter-spacing: -0.025em;
    line-height: 1.05; margin: 0;
  }
  .dss-pc-hero .role {
    display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
    font-family: var(--font-mono); font-size: 11px;
    color: rgba(255,255,255,0.65);
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .dss-pc-hero .role .dss-pos { background: rgba(255,255,255,0.12); color: white; }
  .dss-pc-hero .vitals {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 24px; padding-top: 8px;
    border-top: 1px solid rgba(255,255,255,0.12);
  }
  .dss-pc-hero .vitals .s .v {
    font-family: var(--font-display); font-weight: 800;
    font-size: 22px; letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .dss-pc-hero .vitals .v.amber { color: var(--amber-400); }
  .dss-pc-hero .vitals .s .l {
    font-family: var(--font-mono); font-size: 10px;
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-top: 2px;
  }
</style>
