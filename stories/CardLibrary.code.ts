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
    <span class="dss-match-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live · Q4 02:14</span>
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
  quarter="Q4"
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
  quarter="Q4"
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
