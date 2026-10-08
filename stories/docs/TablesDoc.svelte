<script>
  import SpecPage from './_SpecPage.svelte';
  import Table from '../../svelte/Table.svelte';
  import PlayByPlay from '../../svelte/PlayByPlay.svelte';
  import ScheduleTable from '../../svelte/ScheduleTable.svelte';

  const boxscore = [
    { num: '4',  name: 'A. Seiferth', pos: 'pg', min: '32:14', pts: 22, p2: '6/11', p3: '3/6',  ft: '1/2', reb: 4, ast: 8, foul: 2, pm: '+18' },
    { num: '7',  name: 'N. Wimberg',  pos: 'sg', min: '29:45', pts: 19, p2: '4/8',  p3: '3/8',  ft: '2/2', reb: 3, ast: 5, foul: 3, pm: '+15' },
    { num: '11', name: 'R. Christen', pos: 'sf', min: '28:02', pts: 14, p2: '5/10', p3: '0/2',  ft: '4/4', reb: 7, ast: 2, foul: 2, pm: '+12' },
    { num: '13', name: 'T. Reuter',   pos: 'pf', min: '26:18', pts: 12, p2: '5/9',  p3: '0/0',  ft: '2/3', reb: 9, ast: 1, foul: 3, pm: '+9'  },
    { num: '15', name: 'J. Albers',   pos: 'c',  min: '24:30', pts: 10, p2: '4/7',  p3: '0/0',  ft: '2/4', reb: 11,ast: 1, foul: 4, pm: '+8'  },
  ];

  const events = [
    { id: 1, time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'N. Wimberg #7', detail: 'Assist · T. Reuter #13 · 3/7 von Downtown', score: { heim: 87, gast: 64 } },
    { id: 2, time: '02:38', quarter: 'Q4', team: 'gast', kind: 'default',  title: 'Defensiv-Rebound · M. Wagner #23', detail: '9 Rebounds gesamt', score: { heim: 84, gast: 64 } },
    { id: 3, time: '03:05', quarter: 'Q4', team: 'gast', kind: 'foul',     title: '5. Foul · M. Wagner #23 · Fouled Out', detail: 'offensiv · gegen R. Christen #21', score: { heim: 82, gast: 64 } },
    { id: 4, time: '03:21', quarter: 'Q4', team: 'gast', kind: 'timeout',  title: 'Auszeit · USC Heidelberg', detail: '2. von 3 Auszeiten · 75 Sekunden', score: { heim: 82, gast: 64 } },
  ];
</script>

<SpecPage
  title="Tables & Live-Scoring"
  intro="Tabellen sind das Rückgrat des Spielberichts. Vier Density-Stufen decken jeden Surface ab — vom Touch-Tisch in der Halle bis zur Admin-Konsole. Plus ein spezialisierter Live-Stream für Play-by-Play."
>
  <!-- 01 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">01 — Density</div>
      <div class="spec-title">
        <h2>Vier Stufen, ein Vokabular.</h2>
        <p>
          Tabellen müssen je nach Surface unterschiedlich dicht sein: am
          Kampfgerichts-Tisch <b>Touch (60 px)</b>, im Web-Boxscore <b>Compact (40 px)</b>,
          in Admin-Listen <b>Dense (32 px)</b>. Eine Skala, ein Vokabular.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <table class="spec-tokens">
        <thead><tr><th>Density</th><th>Row-Höhe</th><th>Schriftgröße</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td class="k">touch</td>    <td class="v">60 px</td><td class="v">15 px</td><td class="d">Hallen-Tisch · Trikot-Auswahl · Touch-First</td></tr>
          <tr><td class="k">default</td>  <td class="v">48 px</td><td class="v">14 px</td><td class="d">Standard-Listen · Web</td></tr>
          <tr><td class="k">compact</td>  <td class="v">40 px</td><td class="v">13.5 px</td><td class="d">Boxscore · Statistiken</td></tr>
          <tr><td class="k">dense</td>    <td class="v">32 px</td><td class="v">13 px</td><td class="d">Admin · Vereinsregister · Logs</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 02 — Boxscore Light -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">02 — Boxscore</div>
      <div class="spec-title">
        <h2>Statistiken auf einen Blick.</h2>
        <p>
          Compact-Density mit allen relevanten Wurfstatistiken, sortierbar nach jeder
          Spalte. PTS ist fett (<code>.num.lead</code>), <code>+/−</code> nimmt die Farbe
          des Vorzeichens an. Footer-Row mit <code>tfoot</code> zeigt die Team-Totals.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Boxscore · Light <span class="pill">Compact</span></div>
        <Table
          title="Spieler-Statistiken Q1 – Q4"
          meta="Stand · 4. Viertel · 02:14"
          density="compact"
          columns={[
            { key: 'num', label: '#', width: '52px' },
            { key: 'name', label: 'Spieler' },
            { key: 'pos', label: 'Pos', width: '50px', align: 'center' },
            { key: 'min', label: 'MIN', width: '60px', align: 'right', sortable: true },
            { key: 'pts', label: 'PTS', width: '60px', align: 'right', sortable: true, sort: 'desc' },
            { key: 'p2',  label: '2P',  width: '70px', align: 'right' },
            { key: 'p3',  label: '3P',  width: '70px', align: 'right' },
            { key: 'ft',  label: 'FT',  width: '70px', align: 'right' },
            { key: 'reb', label: 'REB', width: '56px', align: 'right' },
            { key: 'ast', label: 'AST', width: '56px', align: 'right' },
            { key: 'pm',  label: '+/−', width: '64px', align: 'right' },
          ]}
        >
          {#snippet rows()}
            {#each boxscore as p}
              <tr>
                <td><span class="dss-tn heim small">{p.num}</span></td>
                <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">{p.name}</span></div></div></td>
                <td class="center"><span class={`dss-pos ${p.pos}`}>{p.pos.toUpperCase()}</span></td>
                <td class="num">{p.min}</td>
                <td class="num lead">{p.pts}</td>
                <td class="num">{p.p2}</td>
                <td class="num">{p.p3}</td>
                <td class="num">{p.ft}</td>
                <td class="num">{p.reb}</td>
                <td class="num">{p.ast}</td>
                <td class="num" style="color: var(--ok-text)">{p.pm}</td>
              </tr>
            {/each}
          {/snippet}
        </Table>
      </div>
    </div>
  </section>

  <!-- 03 — Boxscore Dark -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">03 — Kampfgericht Dark</div>
      <div class="spec-title">
        <h2>Dieselbe Tabelle, andere Bühne.</h2>
        <p>
          Am Kampfgerichts-Tisch wird das Licht oft gedimmt — der Dark-Mode
          dreht die Surfaces und behält dieselben Farb-Akzente. Die rote Bonus-Zeile,
          das +/− und die Position-Tags bleiben lesbar.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <Table
        title="USC Heidelberg · Live Statistik"
        meta="Q4 · 02:14"
        live
        density="compact"
        dark
        columns={[
          { key: 'num', label: '#', width: '52px' },
          { key: 'name', label: 'Spieler' },
          { key: 'pos', label: 'Pos', width: '50px', align: 'center' },
          { key: 'pts', label: 'PTS', width: '60px', align: 'right' },
          { key: 'reb', label: 'REB', width: '56px', align: 'right' },
          { key: 'ast', label: 'AST', width: '56px', align: 'right' },
          { key: 'pm',  label: '+/−', width: '64px', align: 'right' },
        ]}
      >
        {#snippet rows()}
          {#each boxscore.slice(0, 4) as p}
            <tr>
              <td><span class="dss-tn gast small">{p.num}</span></td>
              <td><div class="dss-player"><div class="dss-player-info"><span class="dss-player-name">{p.name}</span></div></div></td>
              <td class="center"><span class={`dss-pos ${p.pos}`}>{p.pos.toUpperCase()}</span></td>
              <td class="num lead">{p.pts}</td>
              <td class="num">{p.reb}</td>
              <td class="num">{p.ast}</td>
              <td class="num" style="color: var(--err-text)">−{Math.abs(parseInt(p.pm))}</td>
            </tr>
          {/each}
        {/snippet}
      </Table>
    </div>
  </section>

  <!-- 04 — Play-by-Play -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">04 — Play-by-Play</div>
      <div class="spec-title">
        <h2>Was gerade auf dem Feld passiert.</h2>
        <p>
          Chronologischer Event-Stream. Jede Reihe hat einen <b>4-Pixel-Balken</b> in der
          Teamfarbe, die Zeitachse links als Mono-Spalte und den Spielstand rechts.
          Fouls (rot) und Auszeiten (blau) heben sich farblich ab, 3-Punkt-Würfe
          bekommen die Amber-Hervorhebung.
        </p>
        <p>Die Live-Variante unter <code>Components/PlayByPlay → LiveScoringInteraktiv</code> simuliert das Event-Streaming.</p>
      </div>
    </div>
    <div class="spec-body">
      <PlayByPlay title="Play-by-Play · neueste oben" meta="4 Events" events={events} />
    </div>
  </section>

  <!-- Spielpläne -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">Spielpläne</div>
      <div class="spec-title">
        <h2>Eine Zeile pro Spiel.</h2>
        <p>
          <b>ScheduleTable</b> setzt Spielpläne aus den vorhandenen Bausteinen zusammen: Dichte aus der Tabelle,
          Chips, Live-Grün und Ergebnis in Mono. Drei Spiel-Zellen: <code>versus</code> (Liga, Halle),
          <code>opponent</code> (Mannschaft mit vs./@) und <code>columns</code> (Turnier). Das Zeitraster
          <b>ScheduleGrid</b> zeigt parallele Spiele auf mehreren Hallen oder Feldern.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Mannschafts-Spielplan · opponent</div>
        <ScheduleTable
          caption="Beispiel Mannschafts-Spielplan"
          games={[
            { id: 'd1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim', opponent: { name: 'TSV Jahn Freising', href: '#', score: 108 }, ownScore: 65 },
            { id: 'd2', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast', opponent: { name: 'Nürnberger Basketball Club', href: '#' } },
          ]}
        />
      </div>
    </div>
  </section>
</SpecPage>
