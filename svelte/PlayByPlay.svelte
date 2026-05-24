<script lang="ts">
  /**
   * DSS PlayByPlay · Svelte 5 example
   * --------------------------------------------------------------
   * Live-Scoring event stream — chronological feed of game actions.
   * Each event row has:
   *   • Mono time stamp (M:SS + Q1–Q4 label)
   *   • 4 px team-color strip (heim / gast / none)
   *   • Action title (bold) + optional detail line
   *   • Cumulative score (Heim : Gast)
   *
   * Event kinds drive accent colors:
   *   default · score-2p · score-3p · ft · foul · timeout · sub · turnover
   *
   * Pass an array of events. The component appends new events with a
   * fade-in animation so the latest entry is visually obvious — true
   * "live" feel for Kampfgericht boards.
   */

  export type PbpEvent = {
    id: string | number;
    time: string;        // "M:SS"
    quarter: string;     // "Q1" .. "OT"
    team?: 'heim' | 'gast' | 'none';
    kind?: 'default' | 'score-2p' | 'score-3p' | 'ft' | 'foul' | 'timeout' | 'sub' | 'turnover';
    title: string;
    titleBold?: string;  // optional leading bold phrase
    detail?: string;
    score?: { heim: number; gast: number };
  };

  let {
    title = 'Play-by-Play · neueste oben',
    meta = '',
    live = true,
    dark = false,
    events,
  }: {
    title?: string;
    meta?: string;
    live?: boolean;
    dark?: boolean;
    events: PbpEvent[];
  } = $props();
</script>

<div class={`dss-pbp-frame ${dark ? 'dss-pbp-frame--dark' : ''}`}>
  <div class="dss-pbp-head">
    <h3>{title}</h3>
    <div class="dss-pbp-meta">
      {#if meta}<span>{meta}</span>{/if}
      {#if live}<span class="dss-pbp-live"><span class="dot"></span> Live</span>{/if}
    </div>
  </div>

  <div class="dss-pbp-feed">
    {#each events as e (e.id)}
      <div class={`dss-pbp-event dss-pbp-event--${e.kind ?? 'default'}`}>
        <div class="dss-pbp-time">
          {e.time}
          <span class="q">{e.quarter}</span>
        </div>
        <div class={`dss-pbp-strip dss-pbp-strip--${e.team ?? 'none'}`}></div>
        <div class="dss-pbp-body">
          <div class="dss-pbp-action">
            {#if e.titleBold}<b>{e.titleBold}</b> · {/if}{e.title}
          </div>
          {#if e.detail}
            <div class="dss-pbp-detail">{e.detail}</div>
          {/if}
        </div>
        {#if e.score}
          <div class="dss-pbp-score">{e.score.heim}<span class="sep">:</span>{e.score.gast}</div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .dss-pbp-frame {
    border: 1px solid var(--page-line);
    border-radius: 14px;
    background: var(--n-0);
    overflow: hidden;
  }
  .dss-pbp-frame--dark {
    background: var(--n-1000);
    border-color: var(--n-800);
    color: var(--n-100);
  }

  .dss-pbp-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 22px;
    border-bottom: 1px solid var(--page-line);
    background: var(--n-50);
  }
  .dss-pbp-frame--dark .dss-pbp-head {
    background: var(--n-950);
    border-color: var(--n-800);
  }
  .dss-pbp-head h3 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 600; font-size: 16px;
    color: inherit;
    letter-spacing: -0.005em;
  }
  .dss-pbp-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--page-mute);
    letter-spacing: 0.06em; text-transform: uppercase;
    display: flex; gap: 14px; align-items: center;
  }
  .dss-pbp-frame--dark .dss-pbp-meta { color: var(--n-400); }
  .dss-pbp-live { display: inline-flex; align-items: center; gap: 6px; }
  .dss-pbp-live .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--ok-fill);
    animation: dss-pbp-pulse 1.8s infinite;
  }
  @keyframes dss-pbp-pulse {
    0%   { box-shadow: 0 0 0 0 oklch(0.65 0.18 150 / 0.6); }
    70%  { box-shadow: 0 0 0 8px oklch(0.65 0.18 150 / 0); }
    100% { box-shadow: 0 0 0 0 oklch(0.65 0.18 150 / 0); }
  }

  .dss-pbp-feed { max-height: 600px; overflow-y: auto; }

  .dss-pbp-event {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 22px;
    border-bottom: 1px solid var(--page-line);
    transition: background 0.12s;
    animation: dss-pbp-in 0.45s ease-out;
  }
  @keyframes dss-pbp-in {
    from { opacity: 0; transform: translateY(-4px); background: var(--amber-50); }
    to   { opacity: 1; transform: translateY(0);   background: transparent; }
  }
  .dss-pbp-frame--dark .dss-pbp-event { border-bottom-color: var(--n-800); }
  .dss-pbp-event:last-child { border-bottom: 0; }
  .dss-pbp-event:hover { background: var(--ink-50); }
  .dss-pbp-frame--dark .dss-pbp-event:hover { background: var(--n-900); }

  .dss-pbp-time {
    font-family: var(--font-mono); font-weight: 700;
    font-size: 13px; color: var(--ink-700);
    width: 70px; flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .dss-pbp-frame--dark .dss-pbp-time { color: var(--n-200); }
  .dss-pbp-time .q {
    font-size: 10px; color: var(--n-500); display: block;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .dss-pbp-frame--dark .dss-pbp-time .q { color: var(--n-400); }

  .dss-pbp-strip {
    width: 4px; height: 36px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .dss-pbp-strip--heim { background: var(--team-heim, oklch(0.55 0.20 27)); }
  .dss-pbp-strip--gast { background: var(--team-gast, oklch(0.55 0.18 245)); }
  .dss-pbp-strip--none { background: var(--n-300); }
  .dss-pbp-frame--dark .dss-pbp-strip--none { background: var(--n-700); }

  .dss-pbp-body {
    flex: 1; min-width: 0;
    display: flex; flex-direction: column; gap: 2px;
  }
  .dss-pbp-action {
    font-family: var(--font-body); font-weight: 600;
    font-size: 14px;
    color: var(--ink-900);
    line-height: 1.25;
  }
  .dss-pbp-frame--dark .dss-pbp-action { color: var(--n-50); }
  .dss-pbp-action b { font-weight: 700; }

  .dss-pbp-detail {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--n-600);
    letter-spacing: 0.02em;
  }
  .dss-pbp-frame--dark .dss-pbp-detail { color: var(--n-400); }

  .dss-pbp-score {
    font-family: var(--font-mono); font-weight: 700;
    font-size: 16px;
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    flex-shrink: 0;
    min-width: 80px;
    text-align: right;
  }
  .dss-pbp-frame--dark .dss-pbp-score { color: var(--n-50); }
  .dss-pbp-score .sep { color: var(--n-400); margin: 0 4px; font-weight: 500; }

  /* Event-kind accents */
  .dss-pbp-event--foul .dss-pbp-action { color: var(--err-text); }
  .dss-pbp-frame--dark .dss-pbp-event--foul .dss-pbp-action { color: oklch(0.88 0.16 27); }
  .dss-pbp-event--timeout .dss-pbp-action { color: var(--info-text); }
  .dss-pbp-frame--dark .dss-pbp-event--timeout .dss-pbp-action { color: oklch(0.88 0.13 245); }
  .dss-pbp-event--score-3p .dss-pbp-action b { color: var(--amber-800); }
  .dss-pbp-frame--dark .dss-pbp-event--score-3p .dss-pbp-action b { color: var(--amber-400); }
</style>
