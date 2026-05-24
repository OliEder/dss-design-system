<script lang="ts">
  /**
   * DSS BottomNav · Svelte 5 example
   * --------------------------------------------------------------
   * Mobile bottom navigation — primary nav for Schiri-App, Coach-App,
   * Zuschauer-Modus. 4 or 5 items, optional FAB-like center action.
   *
   * Each item:
   *   { id, label, icon (sprite id, without '#'), badge?, fab? }
   *
   * The bar sits flush with the bottom edge, 64 px high (or 72 px with
   * safe-area on iOS — host-controlled).
   */
  type Item = {
    id: string;
    label: string;
    icon?: string;
    badge?: number | string;
    fab?: boolean;
  };

  let {
    items,
    value = $bindable(''),
    onchange,
  }: {
    items: Item[];
    value?: string;
    onchange?: (id: string) => void;
  } = $props();

  $effect(() => {
    if (!value && items.length) value = items[0].id;
  });

  function pick(it: Item) {
    value = it.id;
    onchange?.(it.id);
  }
</script>

<nav class="dss-bnav" role="navigation" aria-label="Hauptnavigation">
  {#each items as it (it.id)}
    {#if it.fab}
      <button class="dss-bnav-fab" onclick={() => pick(it)} aria-label={it.label}>
        {#if it.icon}
          <svg viewBox="0 0 24 24" width="22" height="22"><use href={`#${it.icon}`}></use></svg>
        {:else}
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        {/if}
      </button>
    {:else}
      <button
        class="dss-bnav-item"
        class:is-active={value === it.id}
        onclick={() => pick(it)}
        aria-current={value === it.id ? 'page' : undefined}
      >
        {#if it.icon}
          <svg class="ic" viewBox="0 0 24 24" width="22" height="22"><use href={`#${it.icon}`}></use></svg>
        {/if}
        <span class="lbl">{it.label}</span>
        {#if it.badge !== undefined}<span class="badge">{it.badge}</span>{/if}
      </button>
    {/if}
  {/each}
</nav>

<style>
  .dss-bnav {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    height: 64px;
    background: var(--n-0);
    border-top: 1px solid var(--page-line);
    font-family: var(--font-body);
  }
  .dss-bnav-item {
    appearance: none;
    border: 0; background: transparent; cursor: pointer;
    flex: 1;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px;
    padding: 6px 4px;
    color: var(--n-600);
    position: relative;
    transition: color 0.12s;
  }
  .dss-bnav-item .ic { color: currentColor; }
  .dss-bnav-item .lbl {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.02em;
  }
  .dss-bnav-item:hover { color: var(--ink-700); }
  .dss-bnav-item.is-active { color: var(--ink-900); }
  .dss-bnav-item.is-active::before {
    content: ''; position: absolute; top: 0; left: 50%;
    width: 36px; height: 3px;
    background: var(--amber-500);
    transform: translateX(-50%);
    border-radius: 0 0 3px 3px;
  }

  .dss-bnav-item .badge {
    position: absolute; top: 6px; right: calc(50% - 22px);
    min-width: 18px; height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--err-fill); color: white;
    font-family: var(--font-mono); font-size: 10px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center;
    line-height: 1;
  }

  .dss-bnav-fab {
    appearance: none; border: 0; cursor: pointer;
    align-self: center;
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--amber-500); color: var(--ink-1000);
    display: inline-flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow-md);
    margin: 0 4px;
    transform: translateY(-12px);
    transition: background 0.12s, transform 0.12s;
  }
  .dss-bnav-fab:hover { background: var(--amber-400); transform: translateY(-14px); }
</style>
