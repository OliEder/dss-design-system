<script lang="ts">
  /**
   * DSS Modal · Svelte 5 example
   * --------------------------------------------------------------
   * Modal with backdrop, optional icon header, body, and footer slot.
   * Closes on Escape; a click on the backdrop closes only with dismissOnBackdrop. Nutzt ausschließlich die Klassen aus
   * css/components.css (kein eigener Scoped-Style).
   */
  import type { Snippet } from 'svelte';

  type Severity = 'default' | 'danger' | 'warn' | 'ok' | 'info';
  type Size = 'sm' | 'md' | 'wide' | 'xwide';

  let {
    open = $bindable(false),
    title = '',
    subtitle = '',
    severity = 'default',
    size = 'md',
    closable = true,
    dismissOnBackdrop = false,
    children,
    footer,
    onclose,
  }: {
    open?: boolean;
    title?: string;
    subtitle?: string;
    severity?: Severity;
    size?: Size;
    closable?: boolean;
    /** Schließen per Klick auf den Hintergrund (Standard: false). */
    dismissOnBackdrop?: boolean;
    children: Snippet;
    footer?: Snippet;
    onclose?: () => void;
  } = $props();

  const uid = $props.id();
  const titleId = `dss-modal-title-${uid}`;

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleKey(e: KeyboardEvent) {
    if (open && closable && e.key === 'Escape') handleClose();
  }
</script>

<svelte:window onkeydown={handleKey} />

{#if open}
  <div class="dss-backdrop" onclick={closable && dismissOnBackdrop ? handleClose : null} role="presentation"></div>
  <div class="dss-modal-wrap" role="dialog" aria-modal="true" aria-labelledby={titleId}>
    <div class="dss-modal dss-modal--{size}">
      <div class="dss-m-head">
        {#if severity !== 'default'}
          <div class="dss-m-head-icon dss-m-head-icon--{severity}">
            {#if severity === 'danger'}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><path d="M5.2 10.8l5.6-5.6"/></svg>
            {:else if severity === 'warn'}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1.5L15 14H1z"/><path d="M8 6v3M8 11.5v.05"/></svg>
            {:else if severity === 'ok'}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.2l3.5 3.5L13 5"/></svg>
            {:else}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><path d="M8 7v4M8 4.5v.05"/></svg>
            {/if}
          </div>
        {/if}
        <div class="dss-m-head-text">
          <h2 class="dss-m-title" id={titleId}>{title}</h2>
          {#if subtitle}<div class="dss-m-subtitle">{subtitle}</div>{/if}
        </div>
        {#if closable}
          <button class="dss-m-close" aria-label="Schließen" onclick={handleClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
          </button>
        {/if}
      </div>
      <div class="dss-m-body">
        {@render children()}
      </div>
      {#if footer}
        <div class="dss-m-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
