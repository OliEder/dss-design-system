<script>
  import PlayByPlay from '../../svelte/PlayByPlay.svelte';

  const initialEvents = [
    { id: 1,  time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'N. Wimberg #7', detail: 'Assist · T. Reuter #13 · 3/7 von Downtown', score: { heim: 87, gast: 64 } },
    { id: 2,  time: '02:38', quarter: 'Q4', team: 'gast', kind: 'default',  title: 'Defensiv-Rebound · M. Wagner #23', detail: '9 Rebounds gesamt',                                  score: { heim: 84, gast: 64 } },
    { id: 3,  time: '02:42', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: '2-Punkte-Wurf · A. Seiferth #4', detail: 'aus der Zone · 8/12 FG',                                  score: { heim: 84, gast: 64 } },
    { id: 4,  time: '03:05', quarter: 'Q4', team: 'gast', kind: 'foul',     title: '5. Foul · M. Wagner #23 · Fouled Out', detail: 'offensiv · gegen R. Christen #21',                  score: { heim: 82, gast: 64 } },
    { id: 5,  time: '03:21', quarter: 'Q4', team: 'gast', kind: 'timeout',  title: 'Auszeit · USC Heidelberg', detail: '2. von 3 Auszeiten · 75 Sekunden',                              score: { heim: 82, gast: 64 } },
    { id: 6,  time: '03:48', quarter: 'Q4', team: 'heim', kind: 'ft',       title: 'Freiwurf · A. Seiferth #4 · 2/2', detail: 'nach Foul · 5/6 FT',                                     score: { heim: 82, gast: 64 } },
    { id: 7,  time: '04:12', quarter: 'Q4', team: 'gast', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'D. Mathis #3', detail: 'unassisted · von links Flügel',              score: { heim: 80, gast: 64 } },
    { id: 8,  time: '04:45', quarter: 'Q4', team: 'none', kind: 'sub',      title: 'Auswechslung · TSV Tröster', detail: 'P. Steidl #21 für N. Wimberg #7',                              score: { heim: 80, gast: 61 } },
  ];

  // Live-Scoring scenarios — append a new event every few seconds
  const liveBank = [
    { time: '01:58', quarter: 'Q4', team: 'gast', kind: 'score-2p', title: '2-Punkte-Wurf · B. Skerlec #12', detail: 'aus der Zone',                       score: { heim: 87, gast: 66 } },
    { time: '01:34', quarter: 'Q4', team: 'heim', kind: 'foul',     title: 'Foul · T. Reuter #13', detail: 'defensiv · 3. Foul',                            score: { heim: 87, gast: 66 } },
    { time: '01:33', quarter: 'Q4', team: 'gast', kind: 'ft',       title: 'Freiwurf · D. Mathis #3 · 1/2', detail: '5/6 FT',                              score: { heim: 87, gast: 67 } },
    { time: '01:33', quarter: 'Q4', team: 'gast', kind: 'ft',       title: 'Freiwurf · D. Mathis #3 · 2/2', detail: '6/7 FT',                              score: { heim: 87, gast: 68 } },
    { time: '01:08', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'A. Seiferth #4', detail: 'vom Top of the Key',  score: { heim: 90, gast: 68 } },
    { time: '00:42', quarter: 'Q4', team: 'gast', kind: 'turnover', title: 'Ballverlust · D. Mathis #3', detail: 'Steal · A. Seiferth #4',                 score: { heim: 90, gast: 68 } },
    { time: '00:32', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: 'Fastbreak · A. Seiferth #4', detail: 'Layup · 4. Punkt in Folge',              score: { heim: 92, gast: 68 } },
  ];

  let { mode = 'static', dark = false } = $props();

  let events = $state([...initialEvents]);
  let timer = $state(null);
  let liveIndex = $state(0);
  let isLive = $state(false);

  function startLive() {
    if (isLive) return;
    isLive = true;
    events = [...initialEvents];
    liveIndex = 0;
    timer = setInterval(() => {
      if (liveIndex >= liveBank.length) {
        stopLive();
        return;
      }
      const next = liveBank[liveIndex];
      events = [{ ...next, id: `live-${liveIndex}` }, ...events];
      liveIndex++;
    }, 2200);
  }
  function stopLive() {
    isLive = false;
    if (timer) clearInterval(timer);
    timer = null;
  }
  function reset() {
    stopLive();
    events = [...initialEvents];
    liveIndex = 0;
  }

  $effect(() => () => { if (timer) clearInterval(timer); });
</script>

<div style="padding: 24px;">
  {#if mode === 'live'}
    <div style="display: flex; gap: 8px; margin-bottom: 16px; align-items: center;">
      <button class="ctl ctl--p" onclick={startLive} disabled={isLive}>▶ Live-Scoring starten</button>
      <button class="ctl"        onclick={stopLive}  disabled={!isLive}>⏸ Pause</button>
      <button class="ctl"        onclick={reset}>↻ Zurücksetzen</button>
      <span style="margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--page-mute); text-transform: uppercase; letter-spacing: 0.08em;">
        {isLive ? `Live · ${liveIndex}/${liveBank.length}` : `Bereit · ${liveBank.length} Events in der Pipeline`}
      </span>
    </div>
  {/if}

  <PlayByPlay
    title="Play-by-Play · neueste oben"
    meta={`${events.length} Events`}
    live={mode === 'live' ? isLive : true}
    {dark}
    {events}
  />
</div>

<style>
  .ctl {
    appearance: none; cursor: pointer;
    border: 1px solid var(--page-line);
    background: var(--surface-0); color: var(--ink-900);
    font-family: var(--font-body); font-weight: 600; font-size: 13px;
    padding: 8px 14px;
    border-radius: var(--radius-md);
    transition: background 0.12s, border-color 0.12s;
  }
  .ctl:hover:not(:disabled) { background: var(--n-100); border-color: var(--ink-300); }
  .ctl:disabled { opacity: 0.4; cursor: not-allowed; }
  .ctl--p {
    background: var(--ink-900); color: var(--n-0); border-color: var(--ink-900);
  }
  .ctl--p:hover:not(:disabled) { background: var(--ink-800); border-color: var(--ink-800); }
</style>
