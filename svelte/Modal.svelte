<script lang="ts">
  /**
   * DSS Modal · Svelte 5 example
   * --------------------------------------------------------------
   * Modal with backdrop, optional icon header, body, and footer slot.
   * Closes on Escape and on backdrop click.
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
    children: Snippet;
    footer?: Snippet;
    onclose?: () => void;
  } = $props();

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
  <div class="dss-backdrop" onclick={closable ? handleClose : null} role="presentation"></div>
  <div class="dss-modal-wrap" role="dialog" aria-modal="true" aria-labelledby="dss-modal-title">
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
          <h4 class="dss-m-title" id="dss-modal-title">{title}</h4>
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

<style>
  .dss-backdrop {
    position: fixed; inset: 0; z-index: 100;
    background: var(--backdrop);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  .dss-modal-wrap {
    position: fixed; inset: 0; z-index: 101;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    pointer-events: none;
  }
  .dss-modal {
    pointer-events: auto;
    background: var(--n-0);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    display: flex; flex-direction: column;
    max-height: calc(100vh - 48px);
    overflow: hidden;
    width: 480px;
    max-width: 100%;
  }
  .dss-modal--sm    { width: 380px; }
  .dss-modal--wide  { width: 560px; }
  .dss-modal--xwide { width: 720px; }

  .dss-m-head {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 22px 24px 12px;
  }
  .dss-m-head-icon {
    width: 36px; height: 36px;
    border-radius: var(--radius-md);
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .dss-m-head-icon svg { width: 16px; height: 16px; }
  .dss-m-head-icon--danger { background: var(--err-soft);  color: var(--err-text); }
  .dss-m-head-icon--warn   { background: var(--warn-soft); color: var(--warn-text); }
  .dss-m-head-icon--ok     { background: var(--ok-soft);   color: var(--ok-text); }
  .dss-m-head-icon--info   { background: var(--info-soft); color: var(--info-text); }

  .dss-m-head-text { flex: 1; min-width: 0; }
  .dss-m-title {
    margin: 0;
    font-family: var(--font-display); font-weight: 700; font-size: 20px;
    color: var(--ink-900);
  }
  .dss-m-subtitle {
    margin: 4px 0 0;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--page-mute);
    text-transform: uppercase; letter-spacing: 0.06em;
    font-weight: 600;
  }
  .dss-m-close {
    appearance: none; border: 0;
    background: var(--n-100); color: var(--ink-700);
    width: 32px; height: 32px;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }
  .dss-m-close:hover { background: var(--n-200); }

  .dss-m-body {
    padding: 4px 24px 20px;
    overflow-y: auto;
    flex: 1; min-height: 0;
    color: var(--ink-700);
    font-size: 14.5px;
    line-height: 1.55;
  }
  .dss-m-footer {
    display: flex; align-items: center; justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px 20px;
    border-top: 1px solid var(--page-line);
    background: var(--n-50);
  }
</style>
