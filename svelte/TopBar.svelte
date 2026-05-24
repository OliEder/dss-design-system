<script lang="ts">
  /**
   * DSS TopBar · Svelte 5 example
   * --------------------------------------------------------------
   * App-shell top bar — dark surface, fixed 56 px height.
   * Holds brand (left), optional match context, and user actions (right).
   *
   * Three context variants:
   *   default — quiet, no live indicator
   *   live    — red pulse + scoreline + game clock (Schiri-/Coach-App)
   *   admin   — breadcrumb context (Vereinsregister, Settings)
   */
  import type { Snippet } from 'svelte';

  let {
    brand = 'DSS',
    mark = 'D',
    context = 'default',
    matchLabel = '',
    score = '',
    clock = '',
    user = '',
    userInitials = '',
    leading,
    center,
    actions,
  }: {
    brand?: string;
    mark?: string;
    context?: 'default' | 'live' | 'admin';
    matchLabel?: string;
    score?: string;
    clock?: string;
    user?: string;
    userInitials?: string;
    leading?: Snippet;
    center?: Snippet;
    actions?: Snippet;
  } = $props();
</script>

<div class="dss-topbar">
  <div class="brand">
    <span class="mark">{mark}</span>
    {brand}
  </div>

  {#if leading}{@render leading()}{/if}

  {#if center}
    <div class="center">{@render center()}</div>
  {:else if context === 'live'}
    <div class="ctx">
      <span class="live">Live</span>
      {#if matchLabel}<span>{matchLabel}</span>{/if}
      {#if score}<span class="score">{score}</span>{/if}
      {#if clock}<span class="clock">{clock}</span>{/if}
    </div>
  {:else if context === 'admin' && matchLabel}
    <div class="ctx">
      <span>{matchLabel}</span>
    </div>
  {/if}

  <span class="spacer"></span>

  {#if actions}{@render actions()}{/if}

  {#if user}
    <div class="userchip">
      {#if userInitials}<span class="av">{userInitials}</span>{/if}
      {user}
    </div>
  {/if}
</div>

<style>
  .dss-topbar {
    display: flex; align-items: center;
    height: 56px;
    padding: 0 20px;
    background: var(--ink-1000);
    color: var(--n-100);
    border-bottom: 1px solid var(--n-900);
    gap: 20px;
    font-family: var(--font-body);
  }
  .brand {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display); font-weight: 700;
    font-size: 15px; letter-spacing: -0.01em;
    color: white;
  }
  .mark {
    width: 26px; height: 26px; border-radius: 6px;
    background: var(--amber-400); color: var(--ink-1000);
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 13px;
  }
  .ctx {
    display: flex; align-items: center; gap: 14px;
    margin-left: 28px;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--n-300);
    letter-spacing: 0.04em;
  }
  .ctx .live {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--err-fill); font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .ctx .live::before {
    content: ''; width: 7px; height: 7px; border-radius: 50%;
    background: var(--err-fill);
    animation: dss-tb-pulse 1.6s ease-in-out infinite;
  }
  @keyframes dss-tb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
  .ctx .score { font-weight: 700; font-size: 14px; color: white; letter-spacing: -0.01em; }
  .ctx .clock { color: var(--amber-300); font-weight: 700; }

  .center { flex: 1; display: flex; justify-content: center; }
  .spacer { flex: 1; }

  .userchip {
    display: flex; align-items: center; gap: 10px;
    padding: 5px 12px 5px 5px;
    border-radius: 999px;
    background: var(--n-900);
    color: var(--n-100);
    font-size: 12.5px; font-weight: 500;
  }
  .userchip .av {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--sky-600); color: white;
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 700; font-size: 12px;
  }
</style>
