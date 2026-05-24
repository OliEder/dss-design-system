<script>
  const ramps = [
    { name: 'Ink',     cssVar: '--ink-',   steps: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] },
    { name: 'Amber',   cssVar: '--amber-', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
    { name: 'Sky',     cssVar: '--sky-',   steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
    { name: 'Neutral', cssVar: '--n-',     steps: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000] },
  ];

  const semantic = [
    { name: 'Success', tokens: [{ label: 'fill', v: '--ok-fill' }, { label: 'text', v: '--ok-text' }, { label: 'soft', v: '--ok-soft' }] },
    { name: 'Warning', tokens: [{ label: 'fill', v: '--warn-fill' }, { label: 'text', v: '--warn-text' }, { label: 'soft', v: '--warn-soft' }] },
    { name: 'Error',   tokens: [{ label: 'fill', v: '--err-fill' }, { label: 'button', v: '--err-button' }, { label: 'text', v: '--err-text' }, { label: 'soft', v: '--err-soft' }] },
    { name: 'Info',    tokens: [{ label: 'fill', v: '--info-fill' }, { label: 'text', v: '--info-text' }, { label: 'soft', v: '--info-soft' }] },
  ];

  let { mode = 'hues' } = $props();
</script>

<div class="wrap">
  {#if mode === 'hues'}
    <h2>Hue Ramps · Ink · Amber · Sky · Neutral</h2>
    <p class="muted">Drei-Achsen-Identität. Hue-Tokens umschaltbar für DBB-Compat.</p>
    {#each ramps as ramp}
      <div class="ramp">
        <div class="ramp-h">{ramp.name}</div>
        <div class="ramp-row">
          {#each ramp.steps as s}
            <div class="swatch">
              <div class="chip" style={`background: var(${ramp.cssVar}${s});`}></div>
              <div class="step">{s}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {:else}
    <h2>Semantic · success / warning / error / info</h2>
    {#each semantic as group}
      <div class="ramp">
        <div class="ramp-h">{group.name}</div>
        <div class="ramp-row">
          {#each group.tokens as t}
            <div class="swatch">
              <div class="chip" style={`background: var(${t.v});`}></div>
              <div class="step">{t.label}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .wrap { padding: 32px 40px; font-family: var(--font-body); color: var(--page-fg); background: var(--page-bg); min-height: 100vh; }
  h2 { font-family: var(--font-display); font-size: 24px; margin: 0 0 4px; letter-spacing: -0.015em; }
  .muted { color: var(--page-mute); margin: 0 0 28px; }
  .ramp { margin-bottom: 22px; }
  .ramp-h {
    font-family: var(--font-mono); font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--page-mute); margin-bottom: 8px;
  }
  .ramp-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .swatch { width: 76px; display: flex; flex-direction: column; align-items: stretch; }
  .chip {
    height: 56px;
    border-radius: var(--radius-md);
    border: 1px solid var(--page-line);
  }
  .step {
    font-family: var(--font-mono); font-size: 10.5px;
    color: var(--page-mute); margin-top: 4px;
    text-align: center;
  }
</style>
