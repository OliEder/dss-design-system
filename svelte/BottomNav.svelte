<script lang="ts">
  /**
   * DSS BottomNav · Svelte 5
   * --------------------------------------------------------------
   * Mobile Navigation am unteren Rand (Schiri-App, Coach-App, Zuschauer-Modus),
   * 4–5 Einträge, optional zentraler FAB. Nutzt nur Klassen aus css/components.css.
   *
   * Eintrag: { id, label, icon (Sprite-ID ohne '#'), badge?, fab?, href? }
   * Mit href wird der Eintrag ein Link statt eines Buttons. Das Label ist Pflicht,
   * auch für den FAB (zugänglicher Name).
   */
  type Item = {
    id: string;
    label: string;
    icon?: string;
    badge?: number | string;
    fab?: boolean;
    href?: string;
  };

  let {
    items,
    value = $bindable(''),
    onchange,
    ariaLabel = 'Hauptnavigation',
  }: {
    items: Item[];
    value?: string;
    onchange?: (id: string) => void;
    ariaLabel?: string;
  } = $props();

  $effect(() => {
    if (!value && items.length) value = (items.find((item) => !item.fab) ?? items[0]).id;
  });

  function pick(it: Item) {
    value = it.id;
    onchange?.(it.id);
  }
</script>

{#snippet fabIcon(it: Item)}
  {#if it.icon}
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><use href={`#${it.icon}`}></use></svg>
  {:else}
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg>
  {/if}
{/snippet}

{#snippet itemBody(it: Item)}
  {#if it.icon}
    <svg class="dss-bnav-ic" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><use href={`#${it.icon}`}></use></svg>
  {/if}
  <span class="dss-bnav-lbl">{it.label}</span>
  {#if it.badge !== undefined}<span class="dss-bnav-badge">{it.badge}</span>{/if}
{/snippet}

<nav class="dss-bnav" aria-label={ariaLabel}>
  {#each items as it (it.id)}
    {#if it.fab}
      {#if it.href}
        <a class="dss-bnav-fab" href={it.href} aria-label={it.label} onclick={() => pick(it)}>{@render fabIcon(it)}</a>
      {:else}
        <button type="button" class="dss-bnav-fab" aria-label={it.label} onclick={() => pick(it)}>{@render fabIcon(it)}</button>
      {/if}
    {:else if it.href}
      <a
        class="dss-bnav-item"
        class:is-active={value === it.id}
        href={it.href}
        aria-current={value === it.id ? 'page' : undefined}
        onclick={() => pick(it)}
      >{@render itemBody(it)}</a>
    {:else}
      <button
        type="button"
        class="dss-bnav-item"
        class:is-active={value === it.id}
        aria-current={value === it.id ? 'page' : undefined}
        onclick={() => pick(it)}
      >{@render itemBody(it)}</button>
    {/if}
  {/each}
</nav>
