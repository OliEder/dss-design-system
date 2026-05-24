<script lang="ts">
  /**
   * DSS Stepper · Svelte 5 example
   * --------------------------------------------------------------
   * Multi-step flow indicator — setup wizards, Spiel-Vorbereitung,
   * Onboarding. Three layouts share the same data model.
   *
   *   horizontal — pills + connector lines (default, desktop)
   *   compact    — single-line progress with current step highlighted
   *   vertical   — stacked list with description (sidebar wizards)
   *
   * Step state:
   *   done    — green check, clickable to go back
   *   current — amber accent, animated
   *   pending — muted, not interactive
   */
  type Step = {
    id: string;
    label: string;
    description?: string;
    state: 'done' | 'current' | 'pending';
  };

  let {
    steps,
    variant = 'horizontal',
    onstep,
  }: {
    steps: Step[];
    variant?: 'horizontal' | 'compact' | 'vertical';
    onstep?: (id: string) => void;
  } = $props();

  function go(s: Step) {
    if (s.state === 'pending') return;
    onstep?.(s.id);
  }

  let currentIdx = $derived(steps.findIndex(s => s.state === 'current'));
  let doneCount  = $derived(steps.filter(s => s.state === 'done').length);
</script>

{#if variant === 'horizontal'}
  <ol class="dss-step dss-step--h">
    {#each steps as s, i}
      <li class={`step state-${s.state}`}>
        <button class="dot" onclick={() => go(s)} disabled={s.state === 'pending'} aria-label={s.label}>
          {#if s.state === 'done'}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
          {:else}
            <span>{i + 1}</span>
          {/if}
        </button>
        <div class="label">{s.label}</div>
        {#if i < steps.length - 1}<span class="line" aria-hidden="true"></span>{/if}
      </li>
    {/each}
  </ol>

{:else if variant === 'compact'}
  <div class="dss-step dss-step--c">
    <div class="track">
      <div class="fill" style={`width: ${(doneCount / steps.length) * 100}%;`}></div>
    </div>
    <div class="info">
      <span class="num">{currentIdx + 1} / {steps.length}</span>
      <span class="cur">{steps[currentIdx]?.label ?? '—'}</span>
    </div>
  </div>

{:else}
  <ol class="dss-step dss-step--v">
    {#each steps as s, i}
      <li class={`step state-${s.state}`}>
        <div class="rail">
          <button class="dot" onclick={() => go(s)} disabled={s.state === 'pending'} aria-label={s.label}>
            {#if s.state === 'done'}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
            {:else}
              <span>{i + 1}</span>
            {/if}
          </button>
          {#if i < steps.length - 1}<span class="vline" aria-hidden="true"></span>{/if}
        </div>
        <div class="body">
          <div class="label">{s.label}</div>
          {#if s.description}<div class="desc">{s.description}</div>{/if}
        </div>
      </li>
    {/each}
  </ol>
{/if}

<style>
  /* ── Horizontal ─────────────────────────────────────────────── */
  .dss-step--h {
    list-style: none; margin: 0; padding: 0;
    display: flex; align-items: flex-start;
    font-family: var(--font-body);
  }
  .dss-step--h .step {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    position: relative; min-width: 0;
  }
  .dss-step--h .dot {
    appearance: none; cursor: pointer;
    width: 32px; height: 32px; border-radius: 50%;
    border: 2px solid var(--n-300);
    background: var(--n-0); color: var(--n-600);
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-weight: 700; font-size: 13px;
    z-index: 1;
    transition: all 0.12s;
  }
  .dss-step--h .dot:disabled { cursor: not-allowed; }
  .dss-step--h .label {
    font-size: 12.5px; font-weight: 600; color: var(--n-700);
    margin-top: 8px; text-align: center;
    max-width: 140px;
  }
  .dss-step--h .line {
    position: absolute; top: 16px; left: calc(50% + 18px); right: calc(-50% + 18px);
    height: 2px;
    background: var(--n-200);
    z-index: 0;
  }
  /* states */
  .dss-step--h .state-done .dot {
    background: var(--ok-fill); border-color: var(--ok-fill); color: white;
  }
  .dss-step--h .state-done + .step .line,
  .dss-step--h .state-done .line {
    background: var(--ok-fill);
  }
  .dss-step--h .state-done .label { color: var(--ink-900); }
  .dss-step--h .state-current .dot {
    border-color: var(--amber-500); background: var(--amber-500); color: var(--ink-1000);
    box-shadow: 0 0 0 4px var(--amber-100);
  }
  .dss-step--h .state-current .label { color: var(--ink-900); font-weight: 700; }
  .dss-step--h .state-pending .label { color: var(--n-500); }

  /* ── Compact ────────────────────────────────────────────────── */
  .dss-step--c {
    display: flex; flex-direction: column; gap: 8px;
    font-family: var(--font-body);
  }
  .dss-step--c .track {
    height: 4px; border-radius: 999px;
    background: var(--n-200);
    overflow: hidden;
  }
  .dss-step--c .fill {
    height: 100%;
    background: var(--ok-fill);
    transition: width 0.3s;
  }
  .dss-step--c .info {
    display: flex; gap: 12px; align-items: baseline;
    font-size: 13px;
  }
  .dss-step--c .num {
    font-family: var(--font-mono); font-weight: 700;
    color: var(--page-mute);
    text-transform: uppercase; letter-spacing: 0.08em;
    font-size: 11px;
  }
  .dss-step--c .cur { color: var(--ink-900); font-weight: 600; }

  /* ── Vertical ───────────────────────────────────────────────── */
  .dss-step--v {
    list-style: none; margin: 0; padding: 0;
    font-family: var(--font-body);
  }
  .dss-step--v .step {
    display: flex; gap: 14px;
    padding-bottom: 18px;
  }
  .dss-step--v .step:last-child { padding-bottom: 0; }
  .dss-step--v .rail {
    display: flex; flex-direction: column; align-items: center;
    width: 32px; flex-shrink: 0;
  }
  .dss-step--v .dot {
    appearance: none; cursor: pointer;
    width: 30px; height: 30px; border-radius: 50%;
    border: 2px solid var(--n-300);
    background: var(--n-0); color: var(--n-600);
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-weight: 700; font-size: 12px;
  }
  .dss-step--v .vline { flex: 1; width: 2px; background: var(--n-200); margin: 4px 0; min-height: 16px; }
  .dss-step--v .body { padding-top: 4px; flex: 1; }
  .dss-step--v .label { font-size: 14px; font-weight: 600; color: var(--n-800); }
  .dss-step--v .desc  { font-size: 13px; color: var(--n-600); margin-top: 2px; }
  .dss-step--v .state-done .dot {
    background: var(--ok-fill); border-color: var(--ok-fill); color: white;
  }
  .dss-step--v .state-done .vline { background: var(--ok-fill); }
  .dss-step--v .state-current .dot {
    border-color: var(--amber-500); background: var(--amber-500); color: var(--ink-1000);
    box-shadow: 0 0 0 4px var(--amber-100);
  }
  .dss-step--v .state-current .label { color: var(--ink-900); font-weight: 700; }
  .dss-step--v .state-pending .label { color: var(--n-500); }
  .dss-step--v .state-pending .desc  { color: var(--n-500); }
</style>
