<script lang="ts">
  /**
   * DSS Table · Svelte 5 example
   * --------------------------------------------------------------
   * Tabular data primitive matching the v0.7 Tables spec.
   *
   * Densities  : touch (60px) · default (48px) · compact (40px) · dense (32px)
   * Surfaces   : light (default) · dark (Kampfgericht-Tisch)
   * Features   : sticky header, sortable indicator, optional striping,
   *              tfoot totals row, hover highlight.
   *
   * The component renders a generic <table>; cells are author-controlled
   * via the `rows` snippet. For boxscore-typical cell styling use the
   * helper classes documented in tokens.css:
   *   .num · .num.lead · .num.dim    (right-aligned numeric)
   *   .center
   * Plus the small "decoration" classes:
   *   .tn / .tn.heim / .tn.gast / .tn.captain   (jersey-number badge)
   *   .pos.pg / .pos.sg / .pos.sf / .pos.pf / .pos.c
   *   .pill-s / .pill-s.on / .bench / .dnp
   */
  import type { Snippet } from 'svelte';

  type Density = 'touch' | 'default' | 'compact' | 'dense';

  let {
    title = '',
    meta = '',
    live = false,
    density = 'default',
    dark = false,
    striped = false,
    columns,
    rows,
    head = undefined,
    body,
    foot = undefined,
    class: klass = '',
  }: {
    title?: string;
    meta?: string;
    live?: boolean;
    density?: Density;
    dark?: boolean;
    striped?: boolean;
    columns?: { key: string; label: string; align?: 'left' | 'right' | 'center'; width?: string; sortable?: boolean; sort?: 'asc' | 'desc' | null }[];
    rows?: Snippet;
    head?: Snippet;
    body?: Snippet;
    foot?: Snippet;
    class?: string;
  } = $props();
</script>

<div class={`dss-frame ${dark ? 'dss-frame--dark' : ''} ${klass}`}>
  {#if title || meta || live}
    <div class="dss-frame-head">
      <h3>{title}</h3>
      <div class="dss-frame-meta">
        {#if meta}<span>{meta}</span>{/if}
        {#if live}<span class="dss-crumb"><span class="dss-crumb-dot"></span> Live</span>{/if}
      </div>
    </div>
  {/if}

  <div class="dss-table-scroll">
    <table class={`dss-tbl dss-tbl--${density} ${striped ? 'dss-tbl--striped' : ''}`}>
      {#if columns}
        <thead>
          <tr>
            {#each columns as col}
              <th
                class={`${col.align ?? 'left'} ${col.sortable ? 'sortable' : ''} ${col.sort ? `sort-${col.sort}` : ''}`}
                style={col.width ? `width: ${col.width};` : ''}
              >{col.label}</th>
            {/each}
          </tr>
        </thead>
      {/if}
      {#if head}<thead>{@render head()}</thead>{/if}
      {#if body || rows}<tbody>{@render (body ?? rows)?.()}</tbody>{/if}
      {#if foot}<tfoot>{@render foot()}</tfoot>{/if}
    </table>
  </div>
</div>

<style>
  /* Frame */
  .dss-frame {
    border: 1px solid var(--page-line);
    border-radius: 14px;
    background: var(--n-0);
    overflow: hidden;
    color: var(--ink-900);
  }
  .dss-frame--dark {
    background: var(--n-1000);
    border-color: var(--n-800);
    color: var(--n-100);
  }
  .dss-frame-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 22px;
    border-bottom: 1px solid var(--page-line);
    background: var(--n-50);
  }
  .dss-frame--dark .dss-frame-head { background: var(--n-950); border-color: var(--n-800); }
  .dss-frame-head h3 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 600; font-size: 16px;
    color: inherit;
    letter-spacing: -0.005em;
  }
  .dss-frame-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--page-mute);
    letter-spacing: 0.06em; text-transform: uppercase;
    display: flex; gap: 14px; align-items: center;
  }
  .dss-frame--dark .dss-frame-meta { color: var(--n-400); }
  .dss-crumb { display: inline-flex; align-items: center; gap: 6px; }
  .dss-crumb-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--ok-fill);
    box-shadow: 0 0 0 0 var(--ok-fill);
    animation: dss-pulse 2s infinite;
  }
  @keyframes dss-pulse {
    0%   { box-shadow: 0 0 0 0 oklch(0.65 0.18 150 / 0.6); }
    70%  { box-shadow: 0 0 0 8px oklch(0.65 0.18 150 / 0); }
    100% { box-shadow: 0 0 0 0 oklch(0.65 0.18 150 / 0); }
  }

  /* Scroll wrapper */
  .dss-table-scroll { overflow-x: auto; }

  /* Table base */
  :global(.dss-tbl) {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-body);
    font-size: 14px;
    color: inherit;
  }
  :global(.dss-tbl th),
  :global(.dss-tbl td) {
    text-align: left;
    padding: 0 14px;
    vertical-align: middle;
    white-space: nowrap;
  }
  :global(.dss-tbl th) {
    font-family: var(--font-mono);
    font-size: 10.5px; font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--n-700);
    background: var(--n-50);
    height: 38px;
    border-bottom: 1px solid var(--page-line);
    position: sticky; top: 0; z-index: 1;
  }
  :global(.dss-frame--dark .dss-tbl th) {
    color: var(--n-400);
    background: var(--n-950);
    border-bottom-color: var(--n-800);
  }
  :global(.dss-tbl td) {
    height: 48px;
    border-bottom: 1px solid var(--page-line);
    color: var(--ink-700);
  }
  :global(.dss-frame--dark .dss-tbl td) {
    border-bottom-color: var(--n-800);
    color: var(--n-200);
  }
  :global(.dss-tbl tbody tr:last-child td) { border-bottom: 0; }
  :global(.dss-tbl tbody tr:hover td) { background: var(--ink-50); }
  :global(.dss-frame--dark .dss-tbl tbody tr:hover td) { background: var(--n-900); }

  /* Right/center align + numeric font */
  :global(.dss-tbl th.right),
  :global(.dss-tbl td.right),
  :global(.dss-tbl th.num),
  :global(.dss-tbl td.num) {
    text-align: right;
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }
  :global(.dss-tbl td.num.lead) { color: var(--ink-900); font-weight: 700; }
  :global(.dss-frame--dark .dss-tbl td.num.lead) { color: var(--n-50); }
  :global(.dss-tbl td.num.dim)  { color: var(--n-500); }
  :global(.dss-tbl th.center),
  :global(.dss-tbl td.center) { text-align: center; }

  /* Sort indicators */
  :global(.dss-tbl th.sortable) { cursor: pointer; user-select: none; }
  :global(.dss-tbl th.sortable::after) {
    content: ''; display: inline-block;
    width: 0; height: 0;
    border: 4px solid transparent;
    border-top-color: var(--n-400);
    margin-left: 6px; vertical-align: -2px;
    opacity: 0.5;
  }
  :global(.dss-tbl th.sort-asc::after)  { border-top: 0; border-bottom-color: var(--ink-700); opacity: 1; vertical-align: 1px; }
  :global(.dss-tbl th.sort-desc::after) { border-top-color: var(--ink-700); opacity: 1; }
  :global(.dss-frame--dark .dss-tbl th.sort-asc::after)  { border-bottom-color: var(--n-50); }
  :global(.dss-frame--dark .dss-tbl th.sort-desc::after) { border-top-color: var(--n-50); }

  /* Density */
  :global(.dss-tbl--touch td)   { height: 60px; font-size: 15px; }
  :global(.dss-tbl--default td) { height: 48px; }
  :global(.dss-tbl--compact td) { height: 40px; font-size: 13.5px; padding: 0 12px; }
  :global(.dss-tbl--compact th) { padding: 0 12px; }
  :global(.dss-tbl--dense td)   { height: 32px; font-size: 13px; padding: 0 10px; }
  :global(.dss-tbl--dense th)   { padding: 0 10px; height: 32px; }

  /* Striped */
  :global(.dss-tbl--striped tbody tr:nth-child(even) td) { background: var(--n-50); }
  :global(.dss-frame--dark .dss-tbl--striped tbody tr:nth-child(even) td) { background: var(--n-900); }

  /* Footer totals */
  :global(.dss-tbl tfoot td) {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    color: var(--ink-900);
    background: var(--n-100);
    border-top: 1px solid var(--n-300);
    border-bottom: 0;
    height: 42px;
  }
  :global(.dss-frame--dark .dss-tbl tfoot td) {
    background: var(--n-900); color: var(--n-50); border-top-color: var(--n-700);
  }

  /* ── Decoration classes (jersey, position, pills, etc.) ───── */
  :global(.dss-tn) {
    display: inline-flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 10px;
    font-family: var(--font-display); font-weight: 800;
    font-size: 18px; letter-spacing: -0.02em;
    background: var(--n-100); color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  :global(.dss-frame--dark .dss-tn) { background: var(--n-800); color: var(--n-50); }
  :global(.dss-tn.heim) { background: var(--team-heim, oklch(0.55 0.20 27)); color: white; }
  :global(.dss-tn.gast) { background: var(--team-gast, oklch(0.55 0.18 245)); color: white; }
  :global(.dss-tn.captain) { box-shadow: 0 0 0 2px var(--amber-500); }
  :global(.dss-tn.small) { width: 32px; height: 32px; font-size: 13.5px; border-radius: 7px; }

  :global(.dss-player) { display: flex; align-items: center; gap: 12px; }
  :global(.dss-player-info) { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  :global(.dss-player-name) {
    font-family: var(--font-body); font-weight: 600;
    font-size: 14px; color: var(--ink-900);
    letter-spacing: -0.005em; line-height: 1.2;
  }
  :global(.dss-frame--dark .dss-player-name) { color: var(--n-50); }
  :global(.dss-player-meta) {
    font-family: var(--font-mono); font-size: 10.5px;
    color: var(--n-600);
    letter-spacing: 0.04em; text-transform: uppercase;
    line-height: 1.2;
  }
  :global(.dss-frame--dark .dss-player-meta) { color: var(--n-400); }
  :global(.dss-player.bench .dss-player-name) { color: var(--ink-600); font-weight: 500; }
  :global(.dss-frame--dark .dss-player.bench .dss-player-name) { color: var(--n-300); }
  :global(.dss-player.dnp .dss-player-name) { color: var(--n-500); text-decoration: line-through; font-weight: 400; }

  :global(.dss-pos) {
    display: inline-flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; border-radius: 5px;
    font-family: var(--font-mono); font-weight: 700; font-size: 10px;
    background: var(--ink-100); color: var(--ink-700);
  }
  :global(.dss-pos.pg) { background: var(--sky-100);   color: var(--sky-800); }
  :global(.dss-pos.sg) { background: var(--info-soft); color: var(--info-text); }
  :global(.dss-pos.sf) { background: var(--amber-100); color: var(--amber-800); }
  :global(.dss-pos.pf) { background: var(--warn-soft); color: var(--warn-text); }
  :global(.dss-pos.c)  { background: var(--err-soft);  color: var(--err-text); }

  :global(.dss-pill-s) {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: var(--font-mono); font-size: 10px; font-weight: 600;
    padding: 3px 7px; border-radius: 4px;
    text-transform: uppercase; letter-spacing: 0.06em;
    background: var(--n-100); color: var(--n-700);
  }
  :global(.dss-pill-s.on)  { background: var(--ok-soft); color: var(--ok-text); }
  :global(.dss-pill-s.cap) { background: var(--amber-100); color: var(--amber-800); }
  :global(.dss-pill-s.dnp) { background: var(--err-soft); color: var(--err-text); }
</style>
