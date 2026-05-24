<script lang="ts">
  /**
   * DSS Skeleton · Svelte 5 example
   * --------------------------------------------------------------
   * Shimmer-placeholder for loading states. Sizes match the future
   * content so layout doesn't jump on data arrival.
   *
   * Variants:
   *   line      — text line (use width prop to match the real heading)
   *   block     — rectangular block (cards, images)
   *   circle    — avatar / jersey
   *   row       — pre-built "player row" skeleton
   *   match     — pre-built match-card skeleton
   */
  let {
    variant = 'line',
    width = 'auto',
    height = 'auto',
    rounded = '6px',
    count = 1,
  }: {
    variant?: 'line' | 'block' | 'circle' | 'row' | 'match';
    width?: string;
    height?: string;
    rounded?: string;
    count?: number;
  } = $props();
</script>

{#if variant === 'row'}
  {#each Array(count) as _, i}
    <div class="dss-skel-row" aria-busy="true">
      <div class="dss-skel dss-skel--circle"  style="width: 44px; height: 44px;"></div>
      <div class="who">
        <div class="dss-skel dss-skel--line"  style="width: 50%; height: 14px;"></div>
        <div class="dss-skel dss-skel--line"  style="width: 30%; height: 10px; margin-top: 4px;"></div>
      </div>
      <div class="dss-skel dss-skel--line"   style="width: 60px; height: 18px;"></div>
    </div>
  {/each}
{:else if variant === 'match'}
  <div class="dss-skel-match" aria-busy="true">
    <div class="head">
      <div class="dss-skel dss-skel--line" style="width: 90px; height: 10px;"></div>
      <div class="dss-skel dss-skel--line" style="width: 70px; height: 10px;"></div>
    </div>
    <div class="row">
      <div class="dss-skel dss-skel--circle" style="width: 12px; height: 12px;"></div>
      <div class="dss-skel dss-skel--line" style="flex: 1; height: 18px;"></div>
      <div class="dss-skel dss-skel--line" style="width: 36px; height: 22px;"></div>
    </div>
    <div class="row">
      <div class="dss-skel dss-skel--circle" style="width: 12px; height: 12px;"></div>
      <div class="dss-skel dss-skel--line" style="flex: 1; height: 18px;"></div>
      <div class="dss-skel dss-skel--line" style="width: 36px; height: 22px;"></div>
    </div>
  </div>
{:else}
  {#each Array(count) as _, i}
    <div
      class={`dss-skel dss-skel--${variant}`}
      style={`width: ${width}; height: ${height}; border-radius: ${variant === 'circle' ? '50%' : rounded};`}
      aria-busy="true"
    ></div>
  {/each}
{/if}

<style>
  .dss-skel {
    display: inline-block;
    background: linear-gradient(90deg,
      var(--n-100) 0%,
      var(--n-200) 50%,
      var(--n-100) 100%);
    background-size: 200% 100%;
    animation: dss-skel-shimmer 1.4s ease-in-out infinite;
  }
  .dss-skel--line  { display: block; width: 100%; height: 14px; border-radius: 4px; }
  .dss-skel--block { display: block; width: 100%; height: 120px; border-radius: 8px; }
  .dss-skel--circle { border-radius: 50%; }
  @keyframes dss-skel-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .dss-skel-row {
    display: grid;
    grid-template-columns: 44px 1fr auto;
    gap: 14px; align-items: center;
    padding: 12px 16px;
    background: var(--n-0);
    border: 1px solid var(--page-line);
    border-radius: 12px;
    margin-bottom: 8px;
  }
  .dss-skel-row .who { display: flex; flex-direction: column; min-width: 0; }

  .dss-skel-match {
    display: flex; flex-direction: column; gap: 10px;
    padding: 16px 18px;
    background: var(--n-0);
    border: 1px solid var(--page-line);
    border-radius: 14px;
    min-width: 320px;
  }
  .dss-skel-match .head { display: flex; justify-content: space-between; }
  .dss-skel-match .row  { display: flex; gap: 14px; align-items: center; }
</style>
