// Teamkarte (Platzhalter-URLs für die Logo-Dateien); das Vanilla-Markup entspricht dem Svelte-/React-Ausgabe-Markup (tests/karten-code.test.ts)
export const vanilla = `<!-- Teamkarte: dss-team--standard; compact: dss-team--compact (Listenzeile).
     Klickbar: der Name in der Überschrift ist ein <a class="dss-team-link"> oder <button class="dss-team-link" type="button">,
     die Karte bekommt dss-team--link (der Link deckt per ::after die ganze Karte ab). Blöcke, für die es keine Daten gibt, lässt du weg. -->
<div class="dss-team dss-team--standard dss-team--link">
  <div class="dss-team-head">
    <span class="dss-team-logo dss-team-logo--lg" aria-hidden="true"><img src="/logos/nordhain.svg" alt="" loading="lazy" /></span>
    <div class="dss-team-who">
      <h3 class="dss-team-nm"><a class="dss-team-link" href="/teams/nordhain">TSV Nordhain 1920</a></h3>
      <div class="dss-team-sub"><span>Bayernliga Süd</span><span>2026/27</span></div>
    </div>
  </div>
  <div class="dss-team-vitals">
    <div>
      <div class="dss-pc-v" aria-hidden="true">12–3</div>
      <div class="dss-pc-l" aria-hidden="true">S–N</div>
      <span class="dss-sr-only">Bilanz: 12 Siege, 3 Niederlagen</span>
    </div>
    <div>
      <div class="dss-pc-v" aria-hidden="true">3</div>
      <div class="dss-pc-l" aria-hidden="true">Platz von 12</div>
      <span class="dss-sr-only">Tabellenplatz 3 von 12</span>
    </div>
  </div>
  <div class="dss-team-games">
    <div class="dss-team-game">
      <div class="dss-team-game-l">Nächstes Spiel</div>
      <div class="dss-team-game-row">
        <span class="dss-chip dss-chip--mono dss-chip--sky" aria-hidden="true">vs.</span>
        <span class="dss-team-game-opp"><span><span class="dss-sr-only">Heimspiel gegen </span>Lindenberg Hawks</span></span>
        <span class="dss-team-game-end">Sa, 25.05. · 19:30</span>
      </div>
      <div class="dss-team-game-venue">Nordhain-Halle</div>
    </div>
    <div class="dss-team-game">
      <div class="dss-team-game-l">Letztes Spiel · Sa, 18.05.</div>
      <div class="dss-team-game-row">
        <span class="dss-chip dss-chip--mono dss-chip--amber" aria-hidden="true">@</span>
        <span class="dss-team-game-opp"><span><span class="dss-sr-only">Auswärtsspiel bei </span>BG Seeberg</span></span>
        <span class="dss-team-game-end">
          <span class="dss-chip dss-chip--mono dss-chip--ok" aria-hidden="true">S</span>
          <span class="dss-team-game-score" aria-hidden="true">92 : 79</span>
          <span class="dss-sr-only">Eigene 92, Gegner 79, Sieg</span>
        </span>
      </div>
    </div>
  </div>
  <div class="dss-team-squad">14 Spieler · 3 Trainer</div>
  <div class="dss-team-stats" role="group" aria-label="Saison-Statistik">
    <div class="dss-team-sec" aria-hidden="true">Saison-Statistik</div>
    <div class="dss-team-vitals">
      <div><div class="dss-pc-v">48,2</div><div class="dss-pc-l">2PP %</div></div>
      <div><div class="dss-pc-v">41,3</div><div class="dss-pc-l">TRB</div></div>
    </div>
  </div>
</div>

<!-- Listenzeile (compact) -->
<div class="dss-team dss-team--compact dss-team--link">
  <span class="dss-team-logo" aria-hidden="true"><img src="/logos/nordhain.svg" alt="" loading="lazy" /></span>
  <div class="dss-team-who">
    <span class="dss-team-nm"><a class="dss-team-link" href="/teams/nordhain">TSV Nordhain 1920</a></span>
    <div class="dss-team-sub"><span>Bayernliga Süd</span></div>
  </div>
  <span class="dss-team-end">
    <span class="dss-team-rec" aria-hidden="true">12–3</span>
    <span class="dss-sr-only">Bilanz: 12 Siege, 3 Niederlagen</span>
    <span class="dss-team-rank" aria-hidden="true">Platz 3</span>
    <span class="dss-sr-only">Tabellenplatz 3</span>
  </span>
</div>`;

export const svelte = `<script>
  import TeamCard from '@bbv/dss-design-system/svelte/TeamCard';

  const nordhain = {
    name: 'TSV Nordhain 1920',
    short: 'Nordhain',
    logo: '/logos/nordhain.svg',
    league: 'Bayernliga Süd',
    season: '2026/27',
    record: { w: 12, l: 3 },
    rank: 3,
    rankOf: 12,
    points: 24,
    next: { date: 'Sa, 25.05.', time: '19:30', opponent: { name: 'Lindenberg Hawks', short: 'Hawks' }, at: 'heim', venue: 'Nordhain-Halle' },
    last: { date: 'Sa, 18.05.', opponent: { name: 'BG Seeberg', short: 'Seeberg' }, ownScore: 92, opponentScore: 79, at: 'gast' },
    squad: { players: 14, staff: 3 },
  };
</script>

<!-- Alles außer name ist optional; was fehlt, erscheint nicht. href: die ganze Karte ist der Link (onclick: Button). -->
<TeamCard {...nordhain} href="/teams/nordhain" />

<!-- Saison-Statistik nur mit Daten: nur übergebene Felder erscheinen, ohne Feld entfällt der Block -->
<TeamCard {...nordhain} stats={{ twoPtPct: 48.2, threePtPct: 36.5, trb: 41.3, to: 12.1 }} />

<!-- Nur der Name -->
<TeamCard name="SV Kiefernau" />

<!-- Liste: size="compact", Kurzname und Logo -->
<TeamCard size="compact" name="TSV Nordhain 1920" short="Nordhain" logo="/logos/nordhain.svg" league="Bayernliga Süd" record={{ w: 12, l: 3 }} rank={3} href="/teams/nordhain" />

<!-- names="short": Kurzname (bis 640 px automatisch); logos: Logo/Initialen der Gegner; titleAs: 'h2' | 'h3' | 'h4' -->
<TeamCard {...nordhain} names="short" logos titleAs="h2" />`;

export const react = `import { TeamCard, type TeamCardProps } from '@bbv/dss-design-system/react';

const nordhain: TeamCardProps = {
  name: 'TSV Nordhain 1920',
  short: 'Nordhain',
  logo: '/logos/nordhain.svg',
  league: 'Bayernliga Süd',
  season: '2026/27',
  record: { w: 12, l: 3 },
  rank: 3,
  rankOf: 12,
  points: 24,
  next: { date: 'Sa, 25.05.', time: '19:30', opponent: { name: 'Lindenberg Hawks', short: 'Hawks' }, at: 'heim', venue: 'Nordhain-Halle' },
  last: { date: 'Sa, 18.05.', opponent: { name: 'BG Seeberg', short: 'Seeberg' }, ownScore: 92, opponentScore: 79, at: 'gast' },
  squad: { players: 14, staff: 3 },
};

{/* Alles außer name ist optional; was fehlt, erscheint nicht. href: die ganze Karte ist der Link (onClick: Button). */}
<TeamCard {...nordhain} href="/teams/nordhain" />

{/* Saison-Statistik nur mit Daten: nur übergebene Felder erscheinen, ohne Feld entfällt der Block */}
<TeamCard {...nordhain} stats={{ twoPtPct: 48.2, threePtPct: 36.5, trb: 41.3, to: 12.1 }} />

{/* Nur der Name */}
<TeamCard name="SV Kiefernau" />

{/* Liste: size="compact", Kurzname und Logo */}
<TeamCard size="compact" name="TSV Nordhain 1920" short="Nordhain" logo="/logos/nordhain.svg" league="Bayernliga Süd" record={{ w: 12, l: 3 }} rank={3} href="/teams/nordhain" />

{/* names="short": Kurzname (bis 640 px automatisch); logos: Logo/Initialen der Gegner; titleAs: 'h2' | 'h3' | 'h4' */}
<TeamCard {...nordhain} names="short" logos titleAs="h2" />`;
