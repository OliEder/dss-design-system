export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<!-- Dunkel: dss-pbp-frame--dark. Teamstreifen: dss-pbp-strip--heim | --gast | --none.
     Art: dss-pbp-event--score-2p | --score-3p | --ft | --foul | --timeout | --sub | --turnover -->
<div class="dss-pbp-frame">
  <div class="dss-pbp-head">
    <h3 class="dss-pbp-title">Play-by-Play · neueste oben</h3>
    <div class="dss-pbp-meta">
      <span>2 Events</span>
      <span class="dss-pbp-live"><span class="dss-pbp-dot" aria-hidden="true"></span> Live</span>
    </div>
  </div>
  <div class="dss-pbp-feed" role="log" aria-label="Play-by-Play · neueste oben" tabindex="0">
    <div class="dss-pbp-event dss-pbp-event--score-3p">
      <div class="dss-pbp-time">02:14<span class="dss-pbp-q">Q4</span></div>
      <div class="dss-pbp-strip dss-pbp-strip--heim" aria-hidden="true"></div>
      <div class="dss-pbp-body">
        <div class="dss-pbp-action">
          <span class="dss-sr-only">Heim: </span><b>Drei-Punkte-Wurf</b> · Spieler #7
        </div>
        <div class="dss-pbp-detail">Assist · Spieler #13</div>
      </div>
      <div class="dss-pbp-score">
        <span aria-hidden="true">87<span class="dss-pbp-sep">:</span>64</span>
        <span class="dss-sr-only">Spielstand 87 zu 64</span>
      </div>
    </div>
    <div class="dss-pbp-event dss-pbp-event--timeout">…</div>
  </div>
</div>

<!-- Neues Ereignis: oben einfügen (neueste zuerst) -->
<script>
  document.querySelector('.dss-pbp-feed').prepend(eintrag);
</script>`;

export const svelte = `<script>
  import PlayByPlay from '@bbv/dss-design-system/svelte/PlayByPlay';

  let events = $state([
    { id: 2, time: '02:38', quarter: 'Q4', team: 'gast', title: 'Defensiv-Rebound · Spieler #23', score: { heim: 84, gast: 64 } },
    { id: 1, time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'Spieler #7', detail: 'Assist · Spieler #13', score: { heim: 87, gast: 64 } },
  ]);

  // Neues Ereignis kommt oben dazu; der Baustein sortiert nicht selbst.
  // subscribe: deine Live-Quelle (z. B. WebSocket); sie liefert eine Funktion zum Abmelden.
  let { subscribe } = $props();
  $effect(() => subscribe((e) => { events = [e, ...events]; }));
</script>

<PlayByPlay meta={\`\${events.length} Events\`} {events} />
<!-- title, titleAs ('h2' | 'h3' | 'h4'), meta, live (Standard true), dark -->`;

export const react = `import { useEffect, useState } from 'react';
import { PlayByPlay, type PbpEvent } from '@bbv/dss-design-system/react';

const start: PbpEvent[] = [
  { id: 2, time: '02:38', quarter: 'Q4', team: 'gast', title: 'Defensiv-Rebound · Spieler #23', score: { heim: 84, gast: 64 } },
  { id: 1, time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'Spieler #7', detail: 'Assist · Spieler #13', score: { heim: 87, gast: 64 } },
];

export function Feed({ subscribe }: { subscribe: (cb: (e: PbpEvent) => void) => () => void }) {
  const [events, setEvents] = useState(start);
  // Neues Ereignis kommt oben dazu; der Baustein sortiert nicht selbst.
  // subscribe: deine Live-Quelle (z. B. WebSocket); sie liefert eine Funktion zum Abmelden.
  useEffect(() => subscribe((e) => setEvents((prev) => [e, ...prev])), [subscribe]);
  return <PlayByPlay meta={\`\${events.length} Events\`} events={events} />;
}`;
