<script lang="ts">
  /**
   * DSS SpecPage · Storybook doc page shell
   * --------------------------------------------------------------
   * Mirrors the aesthetic of the HTML spec documents:
   *   • 80px mono section number (amber-800)
   *   • 34px display heading (letter-spacing -0.02em)
   *   • 15.5px body text (max-width 720px)
   *   • Framed demos with sub-caption + meta pill
   *
   * Used by every `Docs/*` story to deliver an HTML-spec-like
   * documentation page directly inside Storybook.
   */
  import type { Snippet } from 'svelte';

  let {
    title,
    intro = '',
    children,
  }: {
    title: string;
    intro?: string;
    children: Snippet;
  } = $props();
</script>

<div class="spec">
  <header class="spec-hero">
    <h1>{title}</h1>
    {#if intro}<p class="lede">{intro}</p>{/if}
  </header>
  {@render children()}
</div>

<style>
  :global(.spec) {
    font-family: var(--font-body);
    color: var(--base-900);
    background: var(--page-bg);
    min-height: 100vh;
    padding: 56px 64px 80px;
    max-width: 1200px;
    margin: 0 auto;
  }

  :global(.spec-hero) {
    border-bottom: 1px solid var(--page-line);
    padding-bottom: 36px;
    margin-bottom: 28px;
  }
  :global(.spec-hero h1) {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 56px; letter-spacing: -0.025em;
    line-height: 1.02;
    color: var(--base-900);
    margin: 0 0 14px;
  }
  :global(.spec-hero .lede) {
    font-size: 18px; line-height: 1.55;
    color: var(--n-700);
    max-width: 720px;
    margin: 0;
    text-wrap: pretty;
  }

  /* Section primitive */
  :global(.spec-s) {
    padding: 56px 0;
    border-bottom: 1px solid var(--page-line);
  }
  :global(.spec-s:last-child) { border-bottom: 0; }
  :global(.spec-s-head) {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 32px; align-items: baseline;
    margin-bottom: 28px;
  }
  :global(.spec-num) {
    font-family: var(--font-mono);
    font-size: 12px; letter-spacing: 0.06em;
    color: var(--signal-800);
    padding-top: 6px;
    font-weight: 600;
  }
  :global(.spec-title h2) {
    font-family: var(--font-display);
    font-weight: 700; font-size: 34px;
    letter-spacing: -0.02em; line-height: 1.08;
    margin: 0 0 10px;
    color: var(--base-900);
  }
  :global(.spec-title p) {
    margin: 0;
    color: var(--n-700);
    font-size: 15.5px;
    line-height: 1.55;
    max-width: 720px;
    text-wrap: pretty;
  }
  :global(.spec-title p + p) { margin-top: 8px; }
  :global(.spec-title b) { color: var(--base-900); }
  :global(.spec-title code) {
    font-family: var(--font-mono); font-size: 13px;
    background: var(--n-100); color: var(--base-900);
    padding: 1px 6px; border-radius: 4px;
  }

  :global(.spec-body) {
    display: flex; flex-direction: column;
    gap: 32px;
  }

  /* Caption above a framed demo */
  :global(.spec-cap) {
    font-family: var(--font-mono);
    font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--page-mute);
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
    font-weight: 600;
  }
  :global(.spec-cap::after) {
    content: ''; flex: 1; height: 1px; background: var(--page-line);
  }
  :global(.spec-cap .pill) {
    background: var(--base-100); color: var(--base-700);
    padding: 2px 8px; border-radius: 4px;
    font-size: 9.5px; letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  :global(.spec-cap .pill.dark)  { background: var(--base-900); color: var(--n-50); }
  :global(.spec-cap .pill.amber) { background: var(--signal-100); color: var(--signal-800); }
  :global(.spec-cap .pill.ok)    { background: var(--ok-soft);   color: var(--ok-text); }

  /* Framed demo container */
  :global(.spec-frame) {
    border: 1px solid var(--page-line);
    border-radius: 14px;
    background: var(--n-0);
    overflow: hidden;
    padding: 28px;
  }
  :global(.spec-frame.tight) { padding: 0; }
  :global(.spec-frame.canvas) {
    background:
      linear-gradient(0deg,  var(--page-line) 1px, transparent 1px) 0 0/24px 24px,
      linear-gradient(90deg, var(--page-line) 1px, transparent 1px) 0 0/24px 24px;
    padding: 32px;
  }
  :global(.spec-frame.dark) {
    background: var(--n-1000);
    border-color: var(--n-800);
    color: var(--n-100);
  }

  /* Two-column variant grids */
  :global(.spec-grid-2) { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  :global(.spec-grid-3) { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  :global(.spec-grid-4) { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }

  :global(.spec-row) { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
  :global(.spec-stack) { display: flex; flex-direction: column; gap: 12px; }

  /* Token/spec table */
  :global(.spec-tokens) {
    width: 100%; border-collapse: collapse;
    font-family: var(--font-mono); font-size: 12.5px;
  }
  :global(.spec-tokens th),
  :global(.spec-tokens td) {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid var(--page-line);
  }
  :global(.spec-tokens th) {
    background: var(--n-50);
    font-size: 10.5px; letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--page-mute);
    font-weight: 600;
  }
  :global(.spec-tokens td.k) { color: var(--base-900); font-weight: 600; }
  :global(.spec-tokens td.v) { color: var(--n-700); }
  :global(.spec-tokens td.d) { color: var(--n-700); font-family: var(--font-body); font-size: 13px; }

  @media (max-width: 760px) {
    :global(.spec) { padding: 32px 24px 64px; }
    :global(.spec-hero h1) { font-size: 38px; }
    :global(.spec-s-head) { grid-template-columns: 1fr; gap: 10px; }
    :global(.spec-grid-2),
    :global(.spec-grid-3),
    :global(.spec-grid-4) { grid-template-columns: 1fr; }
  }
</style>
