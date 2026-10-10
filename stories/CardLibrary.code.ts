export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<!-- Spielkarte: dss-match--scheduled | --live | --finished.
     Klickbar als a (Link) oder button (type="button"), sonst div. Bei finished: Verlierer mit is-loser. -->
<div class="dss-match dss-match--live">
  <span class="dss-match-head">
    <span class="dss-match-league">
      <span>Bayernliga Süd</span><span class="dss-match-muted">· 17. Spieltag</span>
    </span>
    <span class="dss-match-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live · 4. Viertel 02:14</span>
  </span>
  <span class="dss-match-body">
    <span class="dss-match-team">
      <span class="dss-match-dot" aria-hidden="true"></span>
      <span class="dss-match-name">TSV Nordhain</span>
      <span class="dss-match-score">87</span>
    </span>
    <span class="dss-match-team dss-match-team--gast">
      <span class="dss-match-dot" aria-hidden="true"></span>
      <span class="dss-match-name">Lindenberg Hawks</span>
      <span class="dss-match-score">64</span>
    </span>
  </span>
  <span class="dss-match-foot"><span>Nordhain-Halle</span></span>
</div>

<!-- Spielerzeile (compact); als button klickbar -->
<button type="button" class="dss-pc-row">
  <span class="dss-tn heim small captain">4</span>
  <span class="dss-pc-who">
    <span class="dss-pc-name">J. Tanner (C)</span>
    <span class="dss-pc-meta">PG</span>
  </span>
  <span class="dss-pos pg" aria-hidden="true">PG</span>
  <span class="dss-pc-stat">22<span class="dss-pc-stat-l">PTS</span></span>
</button>

<!-- Ladezustand: dekorativ verborgen, ein Status-Text meldet das Laden -->
<div class="dss-skel-row" aria-hidden="true">
  <div class="dss-skel dss-skel--circle" style="width: 44px; height: 44px;"></div>
  <div class="dss-skel-who">
    <div class="dss-skel dss-skel--line" style="width: 50%; height: 14px;"></div>
    <div class="dss-skel dss-skel--line" style="width: 30%; height: 10px; margin-top: 4px;"></div>
  </div>
  <div class="dss-skel dss-skel--line" style="width: 60px; height: 18px;"></div>
</div>
<span role="status" class="dss-sr-only">Lädt …</span>`;

export const svelte = `<script>
  import MatchCard from '@bbv/dss-design-system/svelte/MatchCard';
  import PlayerCard from '@bbv/dss-design-system/svelte/PlayerCard';
  import Skeleton from '@bbv/dss-design-system/svelte/Skeleton';
</script>

<MatchCard
  state="live"
  league="Bayernliga Süd"
  matchday="17. Spieltag"
  period={4}
  clock="02:14"
  venue="Nordhain-Halle"
  heim={{ name: 'TSV Nordhain', score: 87 }}
  gast={{ name: 'Lindenberg Hawks', score: 64 }}
/>

<!-- Mit href ein Link, mit onclick ein Button, sonst ein div -->
<MatchCard state="scheduled" heim={{ name: 'TSV Nordhain' }} gast={{ name: 'Lindenberg Hawks' }} href="/spiele/17" />

<PlayerCard size="compact" jersey="4" name="J. Tanner" position="PG" team="heim" captain stat={22} statLabel="PTS" onclick={openSpieler} />

<PlayerCard
  size="standard"
  jersey="4"
  name="J. Tanner"
  position="PG"
  team="heim"
  captain
  age="24 J."
  height_cm="188"
  vitals={[
    { label: 'PPG', value: '17.4', accent: true },
    { label: 'APG', value: '6.2' },
    { label: 'RPG', value: '3.1' },
    { label: 'EFF', value: '22.8' },
  ]}
/>

<!-- Ladezustand: fertige Muster oder Bausteine -->
<Skeleton variant="row" count={4} />
<Skeleton variant="match" />
<Skeleton variant="line" width="80%" height="22px" />`;

export const react = `import { MatchCard, PlayerCard, Skeleton } from '@bbv/dss-design-system/react';

<MatchCard
  state="live"
  league="Bayernliga Süd"
  matchday="17. Spieltag"
  period={4}
  clock="02:14"
  venue="Nordhain-Halle"
  heim={{ name: 'TSV Nordhain', score: 87 }}
  gast={{ name: 'Lindenberg Hawks', score: 64 }}
/>

{/* Mit href ein Link, mit onClick ein Button, sonst ein div */}
<MatchCard state="scheduled" heim={{ name: 'TSV Nordhain' }} gast={{ name: 'Lindenberg Hawks' }} href="/spiele/17" />

<PlayerCard size="compact" jersey="4" name="J. Tanner" position="PG" team="heim" captain stat={22} statLabel="PTS" onClick={openSpieler} />

<PlayerCard
  size="standard"
  jersey="4"
  name="J. Tanner"
  position="PG"
  team="heim"
  captain
  age="24 J."
  heightCm="188"
  vitals={[
    { label: 'PPG', value: '17.4', accent: true },
    { label: 'APG', value: '6.2' },
    { label: 'RPG', value: '3.1' },
    { label: 'EFF', value: '22.8' },
  ]}
/>

{/* Ladezustand: fertige Muster oder Bausteine */}
<Skeleton variant="row" count={4} />
<Skeleton variant="match" />
<Skeleton variant="line" width="80%" height="22px" />`;


// Kurznamen und Logos der MatchCard (Platzhalter-URL für die Logo-Dateien)
export const namesVanilla = `<!-- Mit Logos: dss-match--logos an der Karte, Logo zwischen Trikotpunkt und Name.
     names="short": dss-team-name--short am Namen; ohne die Klasse erscheint der Kurzname nur bis 640 px Breite. -->
<div class="dss-match dss-match--scheduled dss-match--logos">
  <span class="dss-match-head">
    <span class="dss-match-league"><span>Bayernliga Süd</span></span>
    <span class="dss-match-when">Sa, 25. Mai · 19:30</span>
  </span>
  <span class="dss-match-body">
    <span class="dss-match-team">
      <span class="dss-match-dot" aria-hidden="true"></span>
      <span class="dss-team-logo" aria-hidden="true"><img src="/logos/nordhain.svg" alt="" loading="lazy" /></span>
      <span class="dss-match-name dss-team-name dss-team-name--short"><span class="dss-name-full">TSV Nordhain 1920</span><span class="dss-name-short" aria-hidden="true">TSV N.</span></span>
    </span>
    <span class="dss-match-team dss-match-team--gast">
      <span class="dss-match-dot" aria-hidden="true"></span>
      <span class="dss-team-logo dss-team-logo--initials" aria-hidden="true">LH</span>
      <span class="dss-match-name">Lindenberg Hawks</span>
    </span>
  </span>
</div>`;

export const namesSvelte = `<script>
  import MatchCard from '@bbv/dss-design-system/svelte/MatchCard';
</script>

<!-- names="short": Kurzname; logos: Logo bzw. Initialen. Bis 640 px Breite erscheint der Kurzname auch bei names="full". -->
<MatchCard
  state="scheduled"
  league="Bayernliga Süd"
  date="Sa, 25. Mai"
  time="19:30"
  names="short"
  logos
  heim={{ name: 'TSV Nordhain 1920', short: 'TSV N.', logo: '/logos/nordhain.svg' }}
  gast={{ name: 'Lindenberg Hawks', short: 'Hawks' }}
/>`;

export const namesReact = `import { MatchCard } from '@bbv/dss-design-system/react';

{/* names="short": Kurzname; logos: Logo bzw. Initialen. Bis 640 px Breite erscheint der Kurzname auch bei names="full". */}
<MatchCard
  state="scheduled"
  league="Bayernliga Süd"
  date="Sa, 25. Mai"
  time="19:30"
  names="short"
  logos
  heim={{ name: 'TSV Nordhain 1920', short: 'TSV N.', logo: '/logos/nordhain.svg' }}
  gast={{ name: 'Lindenberg Hawks', short: 'Hawks' }}
/>`;


// Spielerkarte mit Foto (Platzhalter-URL für die Bilddatei)
export const photoVanilla = `<!-- Foto statt Trikotmarke: .dss-pc-av um Bild und Badge; die Trikotnummer bleibt als .dss-tn--badge.
     alt="" (dekorativ): der Name steht daneben. width/height gleich, lazy und async laden. -->
<div class="dss-pc-row">
  <span class="dss-pc-av">
    <img class="dss-pc-img" src="/players/jt.jpg" alt="" width="32" height="32" loading="lazy" decoding="async" />
    <span class="dss-tn dss-tn--badge heim captain">4</span>
  </span>
  <span class="dss-pc-who">
    <span class="dss-pc-name">J. Tanner (C)</span>
    <span class="dss-pc-meta">PG</span>
  </span>
  <span class="dss-pos pg" aria-hidden="true">PG</span>
  <span class="dss-pc-stat">22<span class="dss-pc-stat-l">PTS</span></span>
</div>

<!-- Standard: .dss-pc-av--lg (64 px) im Kartenkopf, Badge mit .dss-tn--badge-lg -->
<div class="dss-pc-card">
  <div class="dss-pc-head">
    <span class="dss-pc-av dss-pc-av--lg">
      <img class="dss-pc-img" src="/players/jt.jpg" alt="" width="64" height="64" loading="lazy" decoding="async" />
      <span class="dss-tn dss-tn--badge dss-tn--badge-lg heim captain">4</span>
    </span>
    <div class="dss-pc-who">
      <h3 class="dss-pc-nm">J. Tanner</h3>
      <div class="dss-pc-role"><span class="dss-pos pg">PG</span><span class="dss-pc-cap">Kapitän</span></div>
    </div>
  </div>
</div>

<!-- Hero: .dss-pc-hero--photo, Bild und Badge im linken Feld -->
<div class="dss-pc-hero dss-pc-hero--photo">
  <div class="dss-pc-hero-left">
    <img class="dss-pc-img" src="/players/jt.jpg" alt="" width="200" height="200" loading="lazy" decoding="async" />
    <span class="dss-tn dss-tn--badge dss-tn--badge-lg heim captain">4</span>
  </div>
  <div class="dss-pc-hero-right">
    <h3 class="dss-pc-nm">Jonas Tanner</h3>
  </div>
</div>`;

export const photoSvelte = `<script>
  import PlayerCard from '@bbv/dss-design-system/svelte/PlayerCard';
</script>

<!-- photo: URL des Fotos. photoAlt bleibt leer (dekorativ), weil der Name danebensteht.
     Ohne photo, mit leerem photo oder bei Ladefehler erscheint die Trikotmarke. -->
<PlayerCard size="compact" jersey="4" name="J. Tanner" position="PG" captain stat={22} statLabel="PTS" photo="/players/jt.jpg" />

<PlayerCard
  size="hero"
  jersey="4"
  name="Jonas Tanner"
  position="PG"
  captain
  photo="/players/jt.jpg"
  vitals={[
    { label: 'PPG', value: '17.4', accent: true },
    { label: 'APG', value: '6.2' },
    { label: 'STL', value: '2.1' },
    { label: '3P%', value: '41.8' },
  ]}
/>

<!-- Nur wenn das Bild eine Information trägt, die nicht im Text steht -->
<PlayerCard size="standard" jersey="4" name="J. Tanner" photo="/players/jt.jpg" photoAlt="J. Tanner im Heimtrikot" />`;

export const photoReact = `import { PlayerCard } from '@bbv/dss-design-system/react';

{/* photo: URL des Fotos. photoAlt bleibt leer (dekorativ), weil der Name danebensteht.
    Ohne photo, mit leerem photo oder bei Ladefehler erscheint die Trikotmarke. */}
<PlayerCard size="compact" jersey="4" name="J. Tanner" position="PG" captain stat={22} statLabel="PTS" photo="/players/jt.jpg" />

<PlayerCard
  size="hero"
  jersey="4"
  name="Jonas Tanner"
  position="PG"
  captain
  photo="/players/jt.jpg"
  vitals={[
    { label: 'PPG', value: '17.4', accent: true },
    { label: 'APG', value: '6.2' },
    { label: 'STL', value: '2.1' },
    { label: '3P%', value: '41.8' },
  ]}
/>

{/* Nur wenn das Bild eine Information trägt, die nicht im Text steht */}
<PlayerCard size="standard" jersey="4" name="J. Tanner" photo="/players/jt.jpg" photoAlt="J. Tanner im Heimtrikot" />`;

// Teamkarte (Platzhalter-URLs für die Logo-Dateien); das Vanilla-Markup entspricht dem Svelte-/React-Ausgabe-Markup (tests/karten-code.test.ts)
export const teamVanilla = `<!-- Teamkarte: dss-team--standard; compact: dss-team--compact (Listenzeile).
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

export const teamSvelte = `<script>
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

export const teamReact = `import { TeamCard, type TeamCardProps } from '@bbv/dss-design-system/react';

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
