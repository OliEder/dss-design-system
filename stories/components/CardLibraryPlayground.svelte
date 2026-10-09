<script lang="ts">
  import MatchCard from '../../svelte/MatchCard.svelte';
  import PlayerCard from '../../svelte/PlayerCard.svelte';
  import Skeleton from '../../svelte/Skeleton.svelte';

  // Spielwiese für die Controls: ein Teil der Props gilt je nach `kind`, der Rest bleibt ungenutzt.
  let { kind = 'match', interactive = 'none', ...rest }: { kind?: 'match' | 'player' | 'skeleton'; interactive?: 'none' | 'link' | 'button'; [key: string]: any } = $props();

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
      heim={rest.heim}
      gast={rest.gast}
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
