<script lang="ts">
  /**
   * DSS Skeleton · Svelte 5
   * --------------------------------------------------------------
   * Shimmer-Platzhalter für Ladezustände; Größen entsprechen dem späteren Inhalt.
   * Nutzt nur Klassen aus css/components.css. Die Platzhalter sind dekorativ
   * (aria-hidden), ein einzelner Status-Text (`label`) meldet das Laden.
   *
   *   line   — Textzeile (width passend zur echten Überschrift)
   *   block  — Rechteck (Karten, Bilder)
   *   circle — Avatar / Trikot
   *   row    — fertige Spieler-Zeile
   *   match  — fertige Spielkarte
   */
  let {
    variant = 'line',
    width = 'auto',
    height = 'auto',
    rounded = '6px',
    count = 1,
    label = 'Lädt …',
  }: {
    variant?: 'line' | 'block' | 'circle' | 'row' | 'match';
    width?: string;
    height?: string;
    rounded?: string;
    count?: number;
    label?: string;
  } = $props();
</script>

{#if variant === 'row'}
  {#each Array(count) as _, i (i)}
    <div class="dss-skel-row" aria-hidden="true">
      <div class="dss-skel dss-skel--circle" style="width: 44px; height: 44px;"></div>
      <div class="dss-skel-who">
        <div class="dss-skel dss-skel--line" style="width: 50%; height: 14px;"></div>
        <div class="dss-skel dss-skel--line" style="width: 30%; height: 10px; margin-top: 4px;"></div>
      </div>
      <div class="dss-skel dss-skel--line" style="width: 60px; height: 18px;"></div>
    </div>
  {/each}
{:else if variant === 'match'}
  <div class="dss-skel-match" aria-hidden="true">
    <div class="dss-skel-match-head">
      <div class="dss-skel dss-skel--line" style="width: 90px; height: 10px;"></div>
      <div class="dss-skel dss-skel--line" style="width: 70px; height: 10px;"></div>
    </div>
    {#each [0, 1] as row (row)}
      <div class="dss-skel-match-row">
        <div class="dss-skel dss-skel--circle" style="width: 12px; height: 12px;"></div>
        <div class="dss-skel dss-skel--line" style="flex: 1; height: 18px;"></div>
        <div class="dss-skel dss-skel--line" style="width: 36px; height: 22px;"></div>
      </div>
    {/each}
  </div>
{:else}
  {#each Array(count) as _, i (i)}
    <div
      class={`dss-skel dss-skel--${variant}`}
      style={`width: ${width}; height: ${height}; border-radius: ${variant === 'circle' ? '50%' : rounded};`}
      aria-hidden="true"
    ></div>
  {/each}
{/if}
<span role="status" class="dss-sr-only">{label}</span>
