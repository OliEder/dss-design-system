<script lang="ts">
  /**
   * DSS Card · Svelte 5 example
   * --------------------------------------------------------------
   * Frame/container component matching the v0.6 Cards & Lists spec.
   * Reads tokens from tokens.css (must be imported at app root).
   *
   * Variants:
   *   default    — 1 px border, radius-lg, surface-0
   *   elevated   — shadow-md, no border (floating list items, live tiles)
   *   flat       — surface-2, no border, no shadow (high-density lists)
   *   hoverable  — interactive: pointer cursor, border lifts, soft shadow on hover
   *
   * Slots:
   *   header  (optional) — pinned strip above body
   *   default            — body content
   *   footer  (optional) — muted footer strip
   */
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'elevated' | 'flat' | 'hoverable';

  let {
    variant = 'default',
    padding = 'md',
    as = 'div',
    href = undefined,
    onclick = undefined,
    header = undefined,
    children,
    footer = undefined,
    class: klass = '',
  }: {
    variant?: Variant;
    padding?: 'sm' | 'md' | 'lg';
    as?: 'div' | 'article' | 'section' | 'a' | 'button';
    href?: string;
    onclick?: (e: MouseEvent) => void;
    header?: Snippet;
    children: Snippet;
    footer?: Snippet;
    class?: string;
  } = $props();

  // If href is set and as is 'div', auto-promote to anchor.
  const tag = href ? 'a' : as;
</script>

<svelte:element
  this={tag}
  href={href}
  {onclick}
  class={`dss-card dss-card--${variant} dss-card--pad-${padding} ${klass}`}
  role={tag === 'div' && onclick ? 'button' : undefined}
  tabindex={tag === 'div' && onclick ? 0 : undefined}
>
  {#if header}
    <div class="dss-card-head">{@render header()}</div>
  {/if}
  <div class="dss-card-body">
    {@render children()}
  </div>
  {#if footer}
    <div class="dss-card-foot">{@render footer()}</div>
  {/if}
</svelte:element>

<style>
  .dss-card {
    display: flex;
    flex-direction: column;
    background: var(--surface-0);
    border-radius: var(--radius-lg);
    color: var(--base-900);
    text-decoration: none;
    overflow: hidden;
    transition: transform 0.12s, box-shadow 0.12s, border-color 0.12s;
  }

  /* ── Variants ─────────────────────────────────────────────── */
  .dss-card--default {
    border: 1px solid var(--page-line);
  }
  .dss-card--elevated {
    border: 0;
    box-shadow: var(--shadow-md);
  }
  .dss-card--flat {
    background: var(--surface-2);
    border: 0;
  }
  .dss-card--hoverable {
    border: 1px solid var(--page-line);
    cursor: pointer;
  }
  .dss-card--hoverable:hover {
    border-color: var(--base-300);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  .dss-card--hoverable:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 var(--ring-w) var(--ring-color);
  }

  /* ── Sub-regions ──────────────────────────────────────────── */
  .dss-card-head {
    padding: 14px 18px 0;
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--base-900);
  }
  .dss-card-body {
    flex: 1;
    min-width: 0;
  }
  .dss-card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 18px;
    background: var(--surface-1);
    border-top: 1px solid var(--page-line);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--page-mute);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
  }
  .dss-card--flat .dss-card-foot { background: var(--surface-1); }
  .dss-card--elevated .dss-card-foot { background: transparent; border-top-color: transparent; }

  /* ── Padding scale (applied to body) ──────────────────────── */
  .dss-card--pad-sm .dss-card-body { padding: 12px 14px; }
  .dss-card--pad-md .dss-card-body { padding: 18px 20px; }
  .dss-card--pad-lg .dss-card-body { padding: 24px 28px; }
  .dss-card--pad-sm .dss-card-head + .dss-card-body,
  .dss-card--pad-md .dss-card-head + .dss-card-body,
  .dss-card--pad-lg .dss-card-head + .dss-card-body { padding-top: 8px; }
</style>
