<script lang="ts" module>
  export type PbpEvent = {
    id: string | number;
    time: string; // "M:SS"
    /** Spielabschnitt ab 1 (mit `periods`): Chip „V1“ bis „V4“ bzw. „A1“ bis „A8“, „VL“ für die Verlängerung. */
    period?: number;
    /** @deprecated Stattdessen `period`; ohne `period` wird der Text unverändert angezeigt. */
    quarter?: string; // freier Text, z. B. "Q1" .. "OT"
    team?: 'heim' | 'gast' | 'none';
    kind?: 'default' | 'score-2p' | 'score-3p' | 'ft' | 'foul' | 'timeout' | 'sub' | 'turnover';
    title: string;
    titleBold?: string;
    detail?: string;
    score?: { heim: number; gast: number };
  };
</script>

<script lang="ts">
  import { resolvePeriod } from '../js/periods.js';
  /**
   * DSS PlayByPlay · Svelte 5
   * --------------------------------------------------------------
   * Live-Scoring-Ereignisstrom, chronologisch. Je Ereignis: Zeit (M:SS + Spielabschnitt),
   * 4 px Teamstreifen, Aktion (+ Detail), kumulierter Spielstand. Nutzt nur Klassen
   * aus css/components.css. Der Feed ist ein `role="log"` und per Tastatur scrollbar.
   *
   * Spielabschnitt: `period` je Ereignis und `periods` (4 Viertel, Standard, oder 8 Achtel) an der Komponente; der Chip
   * zeigt die Kurzform (V3, A5, VL), Screenreader lesen den vollen Text („3. Viertel“). `quarter` ist veraltet (Alias).
   *
   * Ereignisarten: default · score-2p · score-3p · ft · foul · timeout · sub · turnover
   */
  let {
    title = 'Play-by-Play · neueste oben',
    titleAs = 'h3',
    meta = '',
    live = true,
    dark = false,
    periods = 4,
    events,
  }: {
    title?: string;
    titleAs?: 'h2' | 'h3' | 'h4';
    meta?: string;
    live?: boolean;
    dark?: boolean;
    periods?: 4 | 8;
    events: PbpEvent[];
  } = $props();

  const teamText = { heim: 'Heim:', gast: 'Gast:' } as const;
</script>

<div class={`dss-pbp-frame ${dark ? 'dss-pbp-frame--dark' : ''}`}>
  <div class="dss-pbp-head">
    <svelte:element this={titleAs} class="dss-pbp-title">{title}</svelte:element>
    <div class="dss-pbp-meta">
      {#if meta}<span>{meta}</span>{/if}
      {#if live}<span class="dss-pbp-live"><span class="dss-pbp-dot" aria-hidden="true"></span> Live</span>{/if}
    </div>
  </div>

  <div class="dss-pbp-feed" role="log" aria-label={title} tabindex="0">
    {#each events as e (e.id)}
      {@const abschnitt = resolvePeriod({ period: e.period, periods, quarter: e.quarter })}
      <div class={`dss-pbp-event dss-pbp-event--${e.kind ?? 'default'}`}>
        <div class="dss-pbp-time">
          {e.time}
          {#if abschnitt.short}
            <span class="dss-pbp-q">{#if abschnitt.alias}{abschnitt.label}{:else}<span aria-hidden="true">{abschnitt.short}</span><span class="dss-sr-only">{abschnitt.label}</span>{/if}</span>
          {/if}
        </div>
        <div class={`dss-pbp-strip dss-pbp-strip--${e.team ?? 'none'}`} aria-hidden="true"></div>
        <div class="dss-pbp-body">
          <div class="dss-pbp-action">
            {#if e.team && e.team !== 'none'}<span class="dss-sr-only">{teamText[e.team]} </span>{/if}
            {#if e.titleBold}<b>{e.titleBold}</b> · {/if}{e.title}
          </div>
          {#if e.detail}
            <div class="dss-pbp-detail">{e.detail}</div>
          {/if}
        </div>
        {#if e.score}
          <div class="dss-pbp-score"><span aria-hidden="true">{e.score.heim}<span class="dss-pbp-sep">:</span>{e.score.gast}</span><span class="dss-sr-only">{`Spielstand ${e.score.heim} zu ${e.score.gast}`}</span></div>
        {/if}
      </div>
    {/each}
  </div>
</div>
