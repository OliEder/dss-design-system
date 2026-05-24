<script lang="ts">
  /**
   * DSS EmptyState · Svelte 5 example
   * --------------------------------------------------------------
   * Three tonalities for "nothing here" states:
   *
   *   neutral — no data / first-run (calm)
   *   action  — something missing, user can fix it (amber)
   *   error   — load failed, retry path (red)
   *
   * Always provide a next step (CTA or hint).
   */
  import type { Snippet } from 'svelte';

  let {
    tone = 'neutral',
    title,
    body = '',
    icon = '',
    cta = '',
    onclick,
    children,
  }: {
    tone?: 'neutral' | 'action' | 'error';
    title: string;
    body?: string;
    icon?: string;     // sprite id without #
    cta?: string;
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<div class={`dss-empty dss-empty--${tone}`}>
  <div class="dss-empty-icon">
    {#if icon}
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <use href={`#${icon}`}></use>
      </svg>
    {:else if tone === 'error'}
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 4 10 17H2L12 4Z"/><path d="M12 10v5"/><circle cx="12" cy="18.2" r=".7" fill="currentColor"/></svg>
    {:else if tone === 'action'}
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><circle cx="12" cy="16.5" r=".7" fill="currentColor"/></svg>
    {:else}
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16"/></svg>
    {/if}
  </div>
  <h4 class="dss-empty-title">{title}</h4>
  {#if body}<p class="dss-empty-body">{body}</p>{/if}
  {#if cta}
    <button class={`dss-empty-cta dss-empty-cta--${tone}`} onclick={onclick}>{cta}</button>
  {/if}
  {#if children}<div class="dss-empty-extra">{@render children()}</div>{/if}
</div>

<style>
  .dss-empty {
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    padding: 40px 32px;
    border: 1px dashed var(--page-line);
    border-radius: 14px;
    background: var(--n-0);
    font-family: var(--font-body);
    max-width: 460px;
    margin: 0 auto;
  }
  .dss-empty-icon {
    width: 60px; height: 60px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }
  .dss-empty--neutral .dss-empty-icon { background: var(--n-100); color: var(--n-600); }
  .dss-empty--action  .dss-empty-icon { background: var(--amber-100); color: var(--amber-800); }
  .dss-empty--error   .dss-empty-icon { background: var(--err-soft); color: var(--err-text); }

  .dss-empty--action  { border-color: var(--amber-300); background: var(--amber-50); }
  .dss-empty--error   { border-color: var(--err-fill); background: var(--err-soft); }

  .dss-empty-title {
    margin: 0 0 6px;
    font-family: var(--font-display); font-weight: 700; font-size: 18px;
    color: var(--ink-900);
    letter-spacing: -0.01em;
  }
  .dss-empty-body {
    margin: 0 0 16px;
    color: var(--n-700);
    font-size: 14px; line-height: 1.55;
    max-width: 360px;
    text-wrap: pretty;
  }
  .dss-empty-cta {
    appearance: none; cursor: pointer;
    padding: 10px 18px;
    border-radius: var(--radius-md);
    border: 1px solid var(--ink-900);
    background: var(--ink-900); color: var(--n-0);
    font-family: var(--font-body); font-weight: 600; font-size: 13.5px;
    transition: background 0.12s;
  }
  .dss-empty-cta:hover { background: var(--ink-800); }
  .dss-empty-cta--action {
    background: var(--amber-500); border-color: var(--amber-500); color: var(--ink-1000);
  }
  .dss-empty-cta--action:hover { background: var(--amber-400); border-color: var(--amber-400); }
  .dss-empty-cta--error {
    background: var(--err-button); border-color: var(--err-button); color: white;
  }
  .dss-empty-cta--error:hover { background: var(--err-fill); }

  .dss-empty-extra { margin-top: 12px; font-size: 12.5px; color: var(--page-mute); }
</style>
