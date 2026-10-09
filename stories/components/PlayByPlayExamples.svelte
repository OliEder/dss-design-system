<script lang="ts">
  import PlayByPlay from '../../svelte/PlayByPlay.svelte';
  import { initialEvents, type Ev } from './pbpData';

  let { example }: { example: string } = $props();

  // Aufbau: ein Eintrag mit allen Teilen
  const eintrag: Ev[] = [initialEvents[0]];

  // Ereignisarten: je Art ein Eintrag (Zeiten und Texte frei erfunden)
  const arten: Ev[] = [
    { id: 'a1', time: '09:41', quarter: 'Q2', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'Spieler #7', score: { heim: 31, gast: 28 } },
    { id: 'a2', time: '09:58', quarter: 'Q2', team: 'gast', kind: 'score-2p', title: '2-Punkte-Wurf · Spieler #12', score: { heim: 28, gast: 28 } },
    { id: 'a3', time: '10:12', quarter: 'Q2', team: 'heim', kind: 'ft', title: 'Freiwurf · Spieler #4 · 1/2', score: { heim: 28, gast: 26 } },
    { id: 'a4', time: '10:30', quarter: 'Q2', team: 'gast', kind: 'foul', title: 'Foul · Spieler #23', detail: 'offensiv', score: { heim: 27, gast: 26 } },
    { id: 'a5', time: '10:44', quarter: 'Q2', team: 'heim', kind: 'timeout', title: 'Auszeit · Heim', detail: '1. von 3 Auszeiten', score: { heim: 27, gast: 26 } },
    { id: 'a6', time: '11:02', quarter: 'Q2', team: 'none', kind: 'sub', title: 'Auswechslung', detail: 'Spieler #21 für Spieler #7', score: { heim: 27, gast: 26 } },
    { id: 'a7', time: '11:20', quarter: 'Q2', team: 'gast', kind: 'turnover', title: 'Ballverlust · Spieler #3', score: { heim: 27, gast: 26 } },
    { id: 'a8', time: '11:35', quarter: 'Q2', team: 'heim', kind: 'default', title: 'Rebound · Spieler #5', score: { heim: 27, gast: 26 } },
  ];

  const drei = initialEvents.slice(0, 3);
  const dreiAelteste = [...drei].reverse();

  // Erzwingt einen Zustand auf Teilen des Bausteins (die Matrix läuft ohne Maus und Tastatur)
  function force(node: HTMLElement, p: { sel: string; cls: string }) {
    node.querySelector(p.sel)?.classList.add(p.cls);
  }
  const cols = ['Standard', 'Hover', 'Fokus'] as const;
  const colForce: Record<(typeof cols)[number], { sel: string; cls: string } | null> = {
    Standard: null,
    Hover: { sel: '.dss-pbp-event', cls: 'pseudo-hover' },
    Fokus: { sel: '.dss-pbp-feed', cls: 'pseudo-focus-visible' },
  };
</script>

{#if example === 'eintrag'}
  <div class="wide">
    <PlayByPlay title="Ein Eintrag" meta="1 Event" events={eintrag} />
  </div>
{:else if example === 'arten'}
  <div class="wide">
    <PlayByPlay title="Ereignisarten" meta="8 Arten" live={false} events={arten} />
  </div>
{:else if example === 'dunkel'}
  <div class="wide">
    <PlayByPlay title="Play-by-Play · neueste oben" meta="Q4" dark events={drei} />
  </div>
{:else if example === 'zustaende'}
  <!-- data-fixed-states: die Werkzeugleiste "Zustand" lässt diese Matrix in Ruhe -->
  <div class="matrix" data-fixed-states>
    {#each [false, true] as d}
      {#each cols as c}
        <div>
          <div class="cap">{d ? 'Dunkle Fläche' : 'Folgt dem Seiten-Theme'} · {c}</div>
          <div use:force={colForce[c] ?? { sel: '.none', cls: 'x' }}>
            <PlayByPlay title={`Feed, ${c}`} live={false} dark={d} events={drei.slice(0, 2)} />
          </div>
        </div>
      {/each}
    {/each}
  </div>

<!-- Dos und Don'ts -->
{:else if example === 'do-reihenfolge'}
  <div class="wide"><PlayByPlay title="Play-by-Play · neueste oben" live={false} events={drei} /></div>
{:else if example === 'dont-reihenfolge'}
  <!-- Der Baustein sortiert nicht: die App liefert die Ereignisse in der Reihenfolge, die der Titel nennt -->
  <div class="wide"><PlayByPlay title="Play-by-Play · neueste oben" live={false} events={dreiAelteste} /></div>
{:else if example === 'do-team'}
  <div class="wide">
    <PlayByPlay title="Auszeiten" live={false} events={[{ id: 1, time: '03:21', quarter: 'Q4', team: 'gast', kind: 'timeout', title: 'Auszeit · Gast', detail: '2. von 3 Auszeiten', score: { heim: 82, gast: 64 } }]} />
  </div>
{:else if example === 'dont-team'}
  <div class="wide">
    <PlayByPlay title="Auszeiten" live={false} events={[{ id: 1, time: '03:21', quarter: 'Q4', team: 'gast', kind: 'timeout', title: 'Auszeit', detail: '2. von 3 Auszeiten', score: { heim: 82, gast: 64 } }]} />
  </div>
{:else if example === 'do-zeit'}
  <div class="wide">
    <PlayByPlay title="Zeitangabe" live={false} events={[{ id: 1, time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: '2-Punkte-Wurf · Spieler #7', score: { heim: 87, gast: 64 } }]} />
  </div>
{:else if example === 'dont-zeit'}
  <div class="wide">
    <PlayByPlay title="Zeitangabe" live={false} events={[{ id: 1, time: '2 Min. 14 Sek. verbleibend', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: '2-Punkte-Wurf · Spieler #7', score: { heim: 87, gast: 64 } }]} />
  </div>
{:else if example === 'do-live'}
  <div class="wide"><PlayByPlay title="Play-by-Play · neueste oben" meta="Spiel beendet" live={false} events={drei.slice(0, 2)} /></div>
{:else if example === 'dont-live'}
  <div class="wide"><PlayByPlay title="Play-by-Play · neueste oben" meta="Spiel beendet" live events={drei.slice(0, 2)} /></div>
{/if}

<style>
  .wide { width: 100%; }
  .matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 20px; }
  .cap { font-family: var(--font-mono); font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-mute); margin-bottom: 8px; }
</style>
