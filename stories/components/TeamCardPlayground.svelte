<script lang="ts">
  import TeamCard from '../../svelte/TeamCard.svelte';

  // Spielwiese für die Controls: alle Props der TeamCard; die Spielwiese ergänzt erfundene Logos für die Teams
  let { interactive = 'none', ...rest }: { interactive?: 'none' | 'link' | 'button'; [key: string]: any } = $props();

  import nordhainLogo from '../assets/logos/nordhain.svg';
  import hawksLogo from '../assets/logos/hawks.svg';
  import seebergLogo from '../assets/logos/seeberg.svg';
  const LOGO: Record<string, string> = { 'TSV Nordhain 1920': nordhainLogo, 'Lindenberg Hawks': hawksLogo, 'BG Seeberg': seebergLogo };
  const withLogo = (team: { name: string; logo?: string }) => ({ logo: LOGO[team.name], ...team });

  const noop = () => {};
</script>

<div style="max-width: 520px;">
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
</div>
