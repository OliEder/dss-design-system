<script lang="ts">
  /**
   * DSS Button · Svelte 5 example
   * --------------------------------------------------------------
   * Wraps the design-system button variants in a single component.
   * Reads tokens from tokens.css (must be imported at app root).
   *
   * Variants:  primary · amber · secondary · danger · ghost
   * Sizes:     sm · md · lg
   * Touch:     opt-in via `touch` (auto-applies 64px hallen-target)
   */
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'amber' | 'secondary' | 'danger' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  let {
    variant = 'primary',
    size = 'md',
    touch = false,
    disabled = false,
    type = 'button',
    children,
    onclick,
  }: {
    variant?: Variant;
    size?: Size;
    touch?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    children: Snippet;
    onclick?: (e: MouseEvent) => void;
  } = $props();
</script>

<button
  {type}
  {disabled}
  class="dss-btn dss-btn--{variant} dss-btn--{size}"
  class:is-touch={touch}
  {onclick}
>
  {@render children()}
</button>

<style>
  .dss-btn {
    appearance: none;
    border: 0;
    font-family: var(--font-body);
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    transition: transform 0.08s, background 0.12s, box-shadow 0.12s;
    outline: 0;
  }
  .dss-btn:active   { transform: scale(0.98); }
  .dss-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .dss-btn:focus-visible {
    box-shadow: 0 0 0 var(--ring-w) var(--ring-color);
  }

  /* Variants */
  .dss-btn--primary   { background: var(--ink-900);   color: white;            border-radius: var(--radius-md); }
  .dss-btn--primary:hover:not(:disabled)   { background: var(--ink-700); }

  .dss-btn--amber     { background: var(--amber-400); color: var(--ink-1000);  border-radius: var(--radius-md); }
  .dss-btn--amber:hover:not(:disabled)     { background: var(--amber-500); }

  .dss-btn--secondary { background: var(--n-100);     color: var(--ink-900);   border-radius: var(--radius-md);
                        box-shadow: inset 0 0 0 1px var(--n-200); }
  .dss-btn--secondary:hover:not(:disabled) { background: var(--n-200); }

  .dss-btn--danger    { background: var(--err-button); color: white;           border-radius: var(--radius-md); }
  .dss-btn--danger:hover:not(:disabled)    { filter: brightness(1.08); }

  .dss-btn--ghost     { background: transparent;     color: var(--ink-800);   border-radius: var(--radius-md);
                        box-shadow: inset 0 0 0 1px var(--n-300); }
  .dss-btn--ghost:hover:not(:disabled)     { background: var(--ink-50); }

  /* Sizes */
  .dss-btn--sm { height: var(--touch-sm); padding: 0 14px; font-size: 13px; }
  .dss-btn--md { height: var(--touch-sm); padding: 0 18px; font-size: 14px; }
  .dss-btn--lg { height: var(--touch-md); padding: 0 22px; font-size: 15px; border-radius: var(--radius-lg); }

  .dss-btn.is-touch {
    height: var(--touch-lg);
    padding: 0 24px;
    font-size: 16px;
    border-radius: var(--radius-lg);
  }
</style>
