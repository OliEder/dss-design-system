<script lang="ts">
  /**
   * DSS MatchCard · Svelte 5 example
   * --------------------------------------------------------------
   * Three game states, one card grammar.
   *
   *   scheduled — kickoff time, hall, teams (date pill left)
   *   live      — open layout, current score, quarter+clock, pulse
   *   finished  — final score, winner/loser styling
   */
  type State = 'scheduled' | 'live' | 'finished';
  type Team = { name: string; short?: string; color?: 'heim' | 'gast'; score?: number };

  let {
    state = 'scheduled',
    league = '',
    matchday = '',
    date = '',
    time = '',
    venue = '',
    heim,
    gast,
    quarter = '',
    clock = '',
    onclick,
  }: {
    state?: State;
    league?: string;
    matchday?: string;
    date?: string;
    time?: string;
    venue?: string;
    heim: Team;
    gast: Team;
    quarter?: string;
    clock?: string;
    onclick?: () => void;
  } = $props();

  let heimWin = $derived(state === 'finished' && (heim.score ?? 0) > (gast.score ?? 0));
  let gastWin = $derived(state === 'finished' && (gast.score ?? 0) > (heim.score ?? 0));
</script>

<button class={`dss-match dss-match--${state}`} onclick={onclick} type="button">
  <header class="dss-match-head">
    <div class="dss-match-league">
      {#if league}<span>{league}</span>{/if}
      {#if matchday}<span class="muted">· {matchday}</span>{/if}
    </div>
    {#if state === 'live'}
      <span class="dss-match-live"><span class="dot"></span> Live · {quarter} {clock}</span>
    {:else if state === 'finished'}
      <span class="dss-match-final">Endstand</span>
    {:else if date}
      <span class="dss-match-when">{date}{time ? ` · ${time}` : ''}</span>
    {/if}
  </header>

  <div class="dss-match-body">
    <div class={`team heim ${gastWin ? 'loser' : ''}`}>
      <span class="dot"></span>
      <span class="name">{heim.name}</span>
      {#if state !== 'scheduled' && heim.score !== undefined}
        <span class="score">{heim.score}</span>
      {/if}
    </div>
    <div class={`team gast ${heimWin ? 'loser' : ''}`}>
      <span class="dot"></span>
      <span class="name">{gast.name}</span>
      {#if state !== 'scheduled' && gast.score !== undefined}
        <span class="score">{gast.score}</span>
      {/if}
    </div>
  </div>

  {#if venue || (state === 'scheduled' && time)}
    <footer class="dss-match-foot">
      {#if venue}<span>{venue}</span>{/if}
    </footer>
  {/if}
</button>

<style>
  .dss-match {
    appearance: none; cursor: pointer;
    background: var(--n-0);
    border: 1px solid var(--page-line);
    border-radius: 14px;
    padding: 0;
    text-align: left;
    width: 100%;
    font-family: var(--font-body);
    transition: border-color 0.12s, box-shadow 0.12s, transform 0.12s;
    overflow: hidden;
  }
  .dss-match:hover { border-color: var(--ink-300); box-shadow: var(--shadow-md); transform: translateY(-1px); }

  .dss-match--live  { border-color: var(--ok-fill); }
  .dss-match--live::before {
    content: ''; display: block; height: 3px;
    background: var(--ok-fill);
  }

  .dss-match-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 18px 8px;
    font-family: var(--font-mono); font-size: 10.5px;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--page-mute); font-weight: 600;
  }
  .dss-match-league .muted { opacity: 0.6; margin-left: 4px; }
  .dss-match-when { color: var(--ink-700); }
  .dss-match-final { color: var(--ink-900); }
  .dss-match-live {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--ok-text);
  }
  .dss-match-live .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--ok-fill);
    animation: dss-mc-pulse 1.6s ease-in-out infinite;
  }
  @keyframes dss-mc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  .dss-match-body {
    padding: 6px 18px 16px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .team {
    display: grid;
    grid-template-columns: 16px 1fr auto;
    gap: 14px; align-items: center;
  }
  .team .dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--team-heim, oklch(0.55 0.20 27));
  }
  .team.gast .dot { background: var(--team-gast, oklch(0.55 0.18 245)); }
  .team .name {
    font-family: var(--font-display); font-weight: 600; font-size: 17px;
    letter-spacing: -0.01em; color: var(--ink-900);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .team .score {
    font-family: var(--font-mono); font-weight: 700; font-size: 22px;
    color: var(--ink-900);
    font-variant-numeric: tabular-nums; letter-spacing: -0.02em;
  }
  .team.loser .name  { color: var(--n-600); font-weight: 500; }
  .team.loser .score { color: var(--n-500); }

  .dss-match-foot {
    display: flex; justify-content: space-between;
    padding: 10px 18px;
    background: var(--n-50);
    border-top: 1px solid var(--page-line);
    font-family: var(--font-mono); font-size: 11px;
    color: var(--page-mute);
    letter-spacing: 0.04em;
  }
</style>
