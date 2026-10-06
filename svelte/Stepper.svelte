<script lang="ts">
  /**
   * DSS Stepper · Svelte 5
   * --------------------------------------------------------------
   * Schrittanzeige für Setup-Wizards, Spiel-Vorbereitung, Onboarding.
   * Drei Layouts mit demselben Datenmodell. Nutzt nur Klassen aus
   * css/components.css.
   *
   *   horizontal — Punkte + Verbindungslinien (Standard, Desktop)
   *   compact    — einzeilige Fortschrittsleiste mit aktuellem Schritt
   *   vertical   — gestapelte Liste mit Beschreibung (Sidebar-Wizards)
   *
   * Schrittzustand: done (grün, anklickbar) · current (Amber) · pending (gedämpft).
   * Der Punkt ist nur ein Button, wenn `onstep` gesetzt und der Schritt nicht
   * pending ist; sonst eine reine Anzeige.
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
    ariaLabel = 'Fortschritt',
  }: {
    steps: Step[];
    variant?: 'horizontal' | 'compact' | 'vertical';
    onstep?: (id: string) => void;
    ariaLabel?: string;
  } = $props();

  const stateText = { done: 'erledigt', current: 'aktuell', pending: 'ausstehend' } as const;

  let currentIdx = $derived(steps.findIndex((s) => s.state === 'current'));
  let doneCount = $derived(steps.filter((s) => s.state === 'done').length);
</script>

{#snippet dot(s: Step, i: number)}
  {#if onstep && s.state !== 'pending'}
    <button type="button" class="dss-step-dot" aria-label={s.label} onclick={() => onstep?.(s.id)}>
      {#if s.state === 'done'}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
      {:else}
        <span aria-hidden="true">{i + 1}</span>
      {/if}
    </button>
  {:else}
    <span class="dss-step-dot" aria-hidden="true">
      {#if s.state === 'done'}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
      {:else}
        <span>{i + 1}</span>
      {/if}
    </span>
  {/if}
{/snippet}

{#if variant === 'horizontal'}
  <ol class="dss-step dss-step--h" aria-label={ariaLabel}>
    {#each steps as s, i (s.id)}
      <li class={`dss-step-item is-${s.state}`} aria-current={s.state === 'current' ? 'step' : undefined}>
        {@render dot(s, i)}
        <div class="dss-step-label">{s.label}<span class="dss-sr-only"> ({stateText[s.state]})</span></div>
        {#if i < steps.length - 1}<span class="dss-step-line" aria-hidden="true"></span>{/if}
      </li>
    {/each}
  </ol>

{:else if variant === 'compact'}
  <div class="dss-step dss-step--c" role="group" aria-label={ariaLabel}>
    <div class="dss-step-track" aria-hidden="true">
      <div class="dss-step-fill" style={`width: ${(doneCount / steps.length) * 100}%;`}></div>
    </div>
    <div class="dss-step-info">
      <span class="dss-step-num">{currentIdx + 1} / {steps.length}</span>
      <span class="dss-step-cur">{steps[currentIdx]?.label ?? '—'}</span>
    </div>
  </div>

{:else}
  <ol class="dss-step dss-step--v" aria-label={ariaLabel}>
    {#each steps as s, i (s.id)}
      <li class={`dss-step-item is-${s.state}`} aria-current={s.state === 'current' ? 'step' : undefined}>
        <div class="dss-step-rail">
          {@render dot(s, i)}
          {#if i < steps.length - 1}<span class="dss-step-vline" aria-hidden="true"></span>{/if}
        </div>
        <div class="dss-step-body">
          <div class="dss-step-label">{s.label}<span class="dss-sr-only"> ({stateText[s.state]})</span></div>
          {#if s.description}<div class="dss-step-desc">{s.description}</div>{/if}
        </div>
      </li>
    {/each}
  </ol>
{/if}
