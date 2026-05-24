<script lang="ts">
  /**
   * DSS Breadcrumbs · Svelte 5 example
   * --------------------------------------------------------------
   * Three variants:
   *   plain   — simple chevron-separated path (page-header default)
   *   tagged  — same path + context labels on items (admin / archive)
   *   chip    — pill-style breadcrumbs (mobile-friendly)
   *
   * Items array: [{ label, href?, tag? }]
   * Last item is rendered as current page (no link, bold).
   */
  type Item = {
    label: string;
    href?: string;
    tag?: string;
  };

  let {
    items,
    variant = 'plain',
  }: {
    items: Item[];
    variant?: 'plain' | 'tagged' | 'chip';
  } = $props();
</script>

<nav class={`dss-crumbs dss-crumbs--${variant}`} aria-label="Breadcrumb">
  {#each items as it, i}
    {@const isLast = i === items.length - 1}
    {#if variant === 'chip'}
      {#if isLast}
        <span class="chip is-current">{it.label}</span>
      {:else}
        <a class="chip" href={it.href ?? '#'}>{it.label}</a>
        <svg class="sep" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
      {/if}
    {:else}
      {#if isLast}
        <span class="crumb is-current">
          {#if variant === 'tagged' && it.tag}<span class="tag">{it.tag}</span>{/if}
          {it.label}
        </span>
      {:else}
        <a class="crumb" href={it.href ?? '#'}>
          {#if variant === 'tagged' && it.tag}<span class="tag">{it.tag}</span>{/if}
          {it.label}
        </a>
        <svg class="sep" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
      {/if}
    {/if}
  {/each}
</nav>

<style>
  .dss-crumbs {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--n-600);
    flex-wrap: wrap;
  }
  .crumb {
    color: var(--n-600);
    text-decoration: none;
    padding: 2px 0;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .crumb:hover { color: var(--ink-900); }
  .crumb.is-current {
    color: var(--ink-900);
    font-weight: 600;
  }
  .sep {
    color: var(--n-400);
    opacity: 0.7;
    flex-shrink: 0;
  }

  /* tagged variant — small mono tag prefix per item */
  .dss-crumbs--tagged .tag {
    font-family: var(--font-mono); font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    padding: 2px 6px;
    border-radius: 4px;
    background: var(--n-100); color: var(--n-700);
  }
  .dss-crumbs--tagged .is-current .tag {
    background: var(--ink-900); color: var(--n-0);
  }

  /* chip variant */
  .dss-crumbs--chip { gap: 4px; }
  .dss-crumbs--chip .chip {
    display: inline-flex; align-items: center;
    padding: 5px 10px;
    border-radius: 999px;
    background: var(--n-100); color: var(--n-700);
    text-decoration: none;
    font-size: 12px; font-weight: 500;
  }
  .dss-crumbs--chip .chip:hover { background: var(--n-200); color: var(--ink-900); }
  .dss-crumbs--chip .chip.is-current {
    background: var(--ink-900); color: var(--n-0);
    font-weight: 600;
  }
</style>
