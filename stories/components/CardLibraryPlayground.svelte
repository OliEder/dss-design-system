<script lang="ts">
  import MatchCard from '../../svelte/MatchCard.svelte';
  import PlayerCard from '../../svelte/PlayerCard.svelte';
  import Skeleton from '../../svelte/Skeleton.svelte';

  // Spielwiese für die Controls: ein Teil der Props gilt je nach `kind`, der Rest bleibt ungenutzt.
  let { kind = 'match', interactive = 'none', ...rest }: { kind?: 'match' | 'player' | 'skeleton'; interactive?: 'none' | 'link' | 'button'; [key: string]: any } = $props();

  // Erfundene Vereinslogos (nur Storybook) für die Teams der Spielwiese
  import nordhainLogo from '../assets/logos/nordhain.svg';
  import hawksLogo from '../assets/logos/hawks.svg';
  const LOGO: Record<string, string> = { 'TSV Nordhain': nordhainLogo, 'Lindenberg Hawks': hawksLogo };
  const withLogo = (team: { name: string; logo?: string }) => ({ logo: LOGO[team.name], ...team });

  // Demo-Fotos (nur Storybook): Auswahl über den Schlüssel, siehe players.ts
  import { FOTO } from './players';

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
