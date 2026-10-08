<script lang="ts">
  /**
   * DSS Tabs · Svelte 5 example
   * --------------------------------------------------------------
   * Matches the v0.6 Navigation spec — four variants:
   *
   *   underline  — page tabs, sticky-safe (default)
   *   segmented  — single-pick toggle with shared track
   *   pills      — wrap-friendly filter chips (multi-active possible)
   *   vertical   — sidebar-style tabs (settings pages)
   *
   * Usage:
   *   <Tabs bind:value={tab} variant="underline" items={[
   *     { id: 'overview', label: 'Übersicht', icon: 'i-board' },
   *     { id: 'roster',   label: 'Aufstellung', count: 12 },
   *     { id: 'box',      label: 'Boxscore' },
   *   ]} />
   *
   * Reads tokens from tokens.css.
   * Icons referenced via `icon` are <use href="#i-…">; sprite must be
   * loaded in the page (or use the Icon.svelte component to inline).
   */

  type TabItem = {
    id: string;
    label: string;
    icon?: string;     // sprite id, e.g. 'i-board'  (without the '#')
    count?: number;    // optional badge
    disabled?: boolean;
  };

  type Variant = 'underline' | 'segmented' | 'pills' | 'vertical';
  type Size = 'sm' | 'md' | 'lg';

  let {
    items,
    value = $bindable(''),
    variant = 'underline',
    size = 'md',
    multi = false,         // pills can toggle multi-select
    activeIds = $bindable<string[]>([]),
    ariaLabel = 'Tabs',
    onchange,
  }: {
    items: TabItem[];
    value?: string;
    variant?: Variant;
    size?: Size;
    multi?: boolean;
    activeIds?: string[];
    ariaLabel?: string;
    onchange?: (id: string) => void;
  } = $props();

  // Initialise value to the first item if not provided.
  $effect(() => {
    if (!multi && !value && items.length) value = items[0].id;
  });

  function isActive(id: string) {
    return multi ? activeIds.includes(id) : value === id;
  }

  function select(item: TabItem) {
    if (item.disabled) return;
    if (multi) {
      activeIds = activeIds.includes(item.id)
        ? activeIds.filter(x => x !== item.id)
        : [...activeIds, item.id];
    } else {
      value = item.id;
    }
    onchange?.(item.id);
  }

  function onKey(e: KeyboardEvent, idx: number) {
    const isHoriz = variant !== 'vertical';
    const nextKey = isHoriz ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHoriz ? 'ArrowLeft'  : 'ArrowUp';
    if (e.key === nextKey || e.key === prevKey) {
      e.preventDefault();
      const dir = e.key === nextKey ? 1 : -1;
      let n = idx;
      for (let i = 0; i < items.length; i++) {
        n = (n + dir + items.length) % items.length;
        if (!items[n].disabled) break;
      }
      select(items[n]);
      // refocus
      const btns = (e.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('button.dss-tab');
      btns?.[n]?.focus();
    }
  }
</script>

<div
  class="dss-tabs dss-tabs--{variant} dss-tabs--{size}"
  role={multi ? 'group' : 'tablist'}
  aria-label={ariaLabel}
  aria-orientation={variant === 'vertical' ? 'vertical' : 'horizontal'}
>
  {#each items as item, i (item.id)}
    <button
      type="button"
      class="dss-tab"
      class:is-active={isActive(item.id)}
      class:is-disabled={item.disabled}
      role={multi ? undefined : 'tab'}
      aria-selected={multi ? undefined : isActive(item.id)}
      aria-pressed={multi ? isActive(item.id) : undefined}
      disabled={item.disabled}
      tabindex={isActive(item.id) ? 0 : -1}
      onclick={() => select(item)}
      onkeydown={(e) => onKey(e, i)}
    >
      {#if item.icon}
        <svg class="dss-tab-ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <use href={`#${item.icon}`}></use>
        </svg>
      {/if}
      <span class="dss-tab-label">{item.label}</span>
      {#if item.count !== undefined}
        <span class="dss-tab-count">{item.count}</span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .dss-tabs {
    display: flex;
    gap: 0;
    font-family: var(--font-body);
  }

  /* ── Base tab button ──────────────────────────────────────── */
  .dss-tab {
    appearance: none;
    border: 0;
    background: transparent;
    color: var(--base-700);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-weight: 600;
    white-space: nowrap;
    transition: background 0.12s, color 0.12s, box-shadow 0.12s;
  }
  .dss-tab:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 var(--ring-w) var(--ring-color);
    border-radius: var(--radius-md);
  }
  .dss-tab.is-disabled,
  .dss-tab[disabled] { opacity: 0.45; cursor: not-allowed; }

  .dss-tab-ic { flex-shrink: 0; }
  .dss-tab-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    padding: 0 6px;
    height: 18px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--page-mute);
    background: var(--n-100);
    border-radius: var(--radius-full);
  }
  .dss-tab.is-active .dss-tab-count { background: var(--action-bg); color: var(--n-0); }

  /* ── Sizes ────────────────────────────────────────────────── */
  .dss-tabs--sm .dss-tab { height: 36px; padding: 0 10px; font-size: 13px; }
  .dss-tabs--md .dss-tab { height: 44px; padding: 0 14px; font-size: 14px; }
  .dss-tabs--lg .dss-tab { height: 56px; padding: 0 18px; font-size: 15px; }

  /* ── Variant: underline ──────────────────────────────────── */
  .dss-tabs--underline {
    border-bottom: 1px solid var(--page-line);
    gap: var(--space-1);
  }
  .dss-tabs--underline .dss-tab {
    position: relative;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .dss-tabs--underline .dss-tab:hover:not(.is-disabled) { color: var(--base-900); }
  .dss-tabs--underline .dss-tab.is-active {
    color: var(--base-900);
    border-bottom-color: var(--indicator);
  }

  /* ── Variant: segmented ──────────────────────────────────── */
  .dss-tabs--segmented {
    display: inline-flex;
    padding: 3px;
    background: var(--n-100);
    border-radius: var(--radius-md);
    gap: 2px;
  }
  .dss-tabs--segmented .dss-tab {
    height: auto;
    padding: 8px 14px;
    border-radius: calc(var(--radius-md) - 2px);
    color: var(--base-700);
  }
  .dss-tabs--segmented.dss-tabs--lg .dss-tab { padding: 12px 20px; }
  .dss-tabs--segmented .dss-tab:hover:not(.is-active):not(.is-disabled) {
    background: var(--n-200);
  }
  .dss-tabs--segmented .dss-tab.is-active {
    background: var(--surface-0);
    color: var(--base-900);
    box-shadow: var(--shadow-sm);
  }

  /* ── Variant: pills ──────────────────────────────────────── */
  .dss-tabs--pills {
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .dss-tabs--pills .dss-tab {
    border-radius: var(--radius-full);
    border: 1px solid var(--page-line);
    background: var(--surface-0);
    color: var(--base-700);
    height: 36px;
    padding: 0 14px;
    font-size: 13px;
  }
  .dss-tabs--pills .dss-tab:hover:not(.is-active):not(.is-disabled) {
    border-color: var(--base-300);
    color: var(--base-900);
  }
  .dss-tabs--pills .dss-tab.is-active {
    background: var(--action-bg);
    border-color: var(--action-bg);
    color: var(--n-0);
  }
  .dss-tabs--pills .dss-tab.is-active .dss-tab-count {
    background: var(--n-0);
    color: var(--base-900);
  }

  /* ── Variant: vertical ───────────────────────────────────── */
  .dss-tabs--vertical {
    flex-direction: column;
    gap: 2px;
    align-items: stretch;
    min-width: 220px;
  }
  .dss-tabs--vertical .dss-tab {
    height: auto;
    justify-content: flex-start;
    padding: 10px 14px;
    border-radius: var(--radius-md);
    color: var(--base-700);
  }
  .dss-tabs--vertical .dss-tab:hover:not(.is-active):not(.is-disabled) {
    background: var(--n-100);
  }
  .dss-tabs--vertical .dss-tab.is-active {
    background: var(--n-100);
    color: var(--base-900);
    box-shadow: inset 3px 0 0 var(--indicator);
  }
</style>
