<script lang="ts">
  import MatchCard from '../../svelte/MatchCard.svelte';
  import PlayerCard from '../../svelte/PlayerCard.svelte';
  import Skeleton from '../../svelte/Skeleton.svelte';
  import TeamCard from '../../svelte/TeamCard.svelte';

  // Spielwiese für die Controls: ein Teil der Props gilt je nach `kind`, der Rest bleibt ungenutzt.
  let { kind = 'match', interactive = 'none', ...rest }: { kind?: 'match' | 'player' | 'team' | 'skeleton'; interactive?: 'none' | 'link' | 'button'; [key: string]: any } = $props();

  // Erfundene Vereinslogos (nur Storybook) für die Teams der Spielwiese
  import nordhainLogo from '../assets/logos/nordhain.svg';
  import hawksLogo from '../assets/logos/hawks.svg';
  import seebergLogo from '../assets/logos/seeberg.svg';
  const LOGO: Record<string, string> = { 'TSV Nordhain': nordhainLogo, 'Lindenberg Hawks': hawksLogo, 'BG Seeberg': seebergLogo, 'TSV Nordhain 1920': nordhainLogo };
  const withLogo = (team: { name: string; logo?: string }) => ({ logo: LOGO[team.name], ...team });

  // Demo-Fotos (nur Storybook): Auswahl über den Namen der Datei
  import tannerFoto from '../assets/players/tanner.jpg';
  import okaforFoto from '../assets/players/okafor.jpg';
  import voglerFoto from '../assets/players/vogler.jpg';
  import hollisFoto from '../assets/players/hollis.jpg';
  import mertensFoto from '../assets/players/mertens.jpg';
  import sorellFoto from '../assets/players/sorell.jpg';
  const FOTO: Record<string, string> = { tanner: tannerFoto, okafor: okaforFoto, vogler: voglerFoto, hollis: hollisFoto, mertens: mertensFoto, sorell: sorellFoto };

  const noop = () => {};
  const stay = (e?: Event) => e?.preventDefault();
</script>

<div style="max-width: 420px;">
  {#if kind === 'match'}
    <MatchCard
      state={rest.state}
      league={rest.league}
      matchday={rest.matchday}
      date={rest.date}
      time={rest.time}
      venue={rest.venue}
      heim={withLogo(rest.heim)}
      gast={withLogo(rest.gast)}
      names={rest.names}
      logos={rest.logos}
      period={rest.period}
      periods={rest.periods}
      quarter={rest.quarter}
      clock={rest.clock}
      href={interactive === 'link' ? '#spiel' : undefined}
      onclick={interactive === 'link' ? (stay as () => void) : interactive === 'button' ? noop : undefined}
    />
  {:else if kind === 'player'}
    <PlayerCard
      size={rest.size}
      jersey={rest.jersey}
      name={rest.name}
      position={rest.position}
      team={rest.team}
      captain={rest.captain}
      age={rest.age}
      height_cm={rest.height_cm}
      role={rest.role}
      vitals={rest.vitals}
      stat={rest.stat}
      statLabel={rest.statLabel}
      photo={FOTO[rest.photo] ?? rest.photo}
      photoAlt={rest.photoAlt}
      onclick={interactive === 'button' ? noop : undefined}
    />
  {:else if kind === 'team'}
    <TeamCard
      name={rest.name}
      short={rest.short}
      logo={LOGO[rest.name]}
      names={rest.names}
      logos={rest.logos}
      league={rest.league}
      leagueHref={rest.leagueHref}
      season={rest.season}
      record={rest.record}
      rank={rest.rank}
      rankOf={rest.rankOf}
      points={rest.points}
      next={rest.next ? { ...rest.next, opponent: withLogo(rest.next.opponent) } : undefined}
      last={rest.last ? { ...rest.last, opponent: withLogo(rest.last.opponent) } : undefined}
      squad={rest.squad}
      stats={rest.stats}
      size={rest.size}
      href={interactive === 'link' ? '#team' : undefined}
      onclick={interactive === 'button' ? noop : undefined}
      titleAs={rest.titleAs}
    />
  {:else}
    <Skeleton
      variant={rest.variant}
      count={rest.count}
      width={rest.width}
      height={rest.height}
      rounded={rest.rounded}
      label={rest.label}
    />
  {/if}
</div>
