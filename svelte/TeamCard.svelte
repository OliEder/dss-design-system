<script lang="ts">
  /**
   * DSS TeamCard · Svelte 5
   * --------------------------------------------------------------
   * Mannschaftskarte: Kopf (Logo, Name, Liga, Saison), Bilanz und Tabellenplatz, nächstes und letztes Spiel,
   * Kader-Kurzliste, optionale Saison-Statistik. Alles außer `name` ist optional; was fehlt, erscheint nicht
   * (kein leerer Rahmen, kein Strich als Platzhalter). Nutzt nur Klassen aus css/components.css (`dss-team*`).
   *
   *   standard — Karte mit allen Blöcken
   *   compact  — Listenzeile: Logo 32 px, Name, Liga, Bilanz kurz, Platz
   *
   * Mit `href` ist die ganze Karte ein Link (ein zusätzlicher `onclick` hängt am Link, z. B. für einen SPA-Router), mit
   * `onclick` allein ein Button (Name als Link bzw. Button in der Überschrift, flächig geklickt per ::after), sonst nicht klickbar. Eine Aktion je Karte: `leagueHref` zählt nur ohne `href`/`onclick`.
   * `names`/`logos` wie bei MatchCard (Kurzname bis 640 px automatisch; Logos der Gegner in den Spielzeilen).
   */
  import { initials, shortName } from '../js/schedule.js';
  import type { HeadingTag } from '../js/heading.js';
  import { useHeadingTag } from './heading-context.js';
  import { lastResult, opponentPrefix, rankInfo, recordInfo, squadText, statEntries } from '../js/team.js';
  import type { TeamLast, TeamNext, TeamRecord, TeamRef, TeamSquad, TeamStats } from '../js/team.js';

  const OUTCOME_CHIP = { S: 'dss-chip--ok', N: 'dss-chip--err', U: '' } as const;

  let {
    name,
    short = undefined,
    logo = undefined,
    names = 'full',
    logos = false,
    league = '',
    leagueHref = undefined,
    season = '',
    record = undefined,
    rank = undefined,
    rankOf = undefined,
    points = undefined,
    next = undefined,
    last = undefined,
    squad = undefined,
    stats = undefined,
    size = 'standard',
    href = undefined,
    onclick = undefined,
    titleAs = undefined,
  }: {
    name: string;
    short?: string;
    logo?: string;
    names?: 'full' | 'short';
    logos?: boolean;
    league?: string;
    leagueHref?: string;
    season?: string;
    record?: TeamRecord;
    rank?: number;
    rankOf?: number;
    points?: number;
    next?: TeamNext;
    last?: TeamLast;
    squad?: TeamSquad;
    stats?: TeamStats;
    size?: 'standard' | 'compact';
    href?: string;
    onclick?: () => void;
    /** Überschriftenebene, h2 bis h6. Rangfolge: `titleAs` vor der Ebene aus `HeadingLevel` vor h3. */
    titleAs?: HeadingTag;
  } = $props();

  const heading = useHeadingTag(() => titleAs);

  const clickable = $derived(Boolean(href) || Boolean(onclick));
  const rec = $derived(recordInfo(record));
  const pos = $derived(rankInfo(rank, rankOf));
  const hasPoints = $derived(typeof points === 'number' && Number.isFinite(points));
  const squadLine = $derived(squadText(squad));
  const statList = $derived(statEntries(stats));
  const res = $derived(lastResult(last));
</script>

{#snippet nameText(t: TeamRef, withNames: 'full' | 'short')}
  {@const kurz = shortName(t)}
  {#if kurz}<span class="dss-team-name" class:dss-team-name--short={withNames === 'short'}><span class="dss-name-full">{t.name}</span><span class="dss-name-short" aria-hidden="true" title={t.name}>{kurz}</span></span>{:else}{t.name}{/if}
{/snippet}

{#snippet logoBadge(t: TeamRef, cls: string)}
  <span class={cls ? `dss-team-logo ${cls}` : 'dss-team-logo'} class:dss-team-logo--initials={!t.logo} aria-hidden="true">{#if t.logo}<img src={t.logo} alt="" loading="lazy" />{:else}{initials(t.name, 2)}{/if}</span>
{/snippet}

{#snippet nameBlock()}
  {#if href}<a class="dss-team-link" {href} {onclick}>{@render nameText({ name, short }, names)}</a>
  {:else if onclick}<button class="dss-team-link" type="button" {onclick}>{@render nameText({ name, short }, names)}</button>
  {:else}{@render nameText({ name, short }, names)}{/if}
{/snippet}

{#snippet leagueLine()}
  {#if league || season}
    <div class="dss-team-sub">
      {#if league}{#if leagueHref && !clickable}<a class="dss-link" href={leagueHref}>{league}</a>{:else}<span>{league}</span>{/if}{/if}
      {#if season}<span>{season}</span>{/if}
    </div>
  {/if}
{/snippet}

{#snippet tile(value: string, label: string, aria: string)}
  <div>
    <div class="dss-pc-v" aria-hidden="true">{value}</div>
    <div class="dss-pc-l" aria-hidden="true">{label}</div>
    <span class="dss-sr-only">{aria}</span>
  </div>
{/snippet}

{#snippet opponentName(o: TeamRef, at: 'heim' | 'gast' | undefined)}
  {#if at}<span class={`dss-chip dss-chip--mono ${at === 'gast' ? 'dss-chip--amber' : 'dss-chip--sky'}`} aria-hidden="true">{at === 'gast' ? '@' : 'vs.'}</span>{/if}
  <span class="dss-team-game-opp">
    {#if logos}{@render logoBadge(o, 'dss-team-logo--sm')}{/if}
    <span><span class="dss-sr-only">{opponentPrefix(at)}</span>{@render nameText(o, names)}</span>
  </span>
{/snippet}

{#if size === 'compact'}
  <div class={`dss-team dss-team--compact${clickable ? ' dss-team--link' : ''}`}>
    {@render logoBadge({ name, logo }, '')}
    <div class="dss-team-who">
      <span class="dss-team-nm">{@render nameBlock()}</span>
      {@render leagueLine()}
    </div>
    <span class="dss-team-end">
      {#if rec}<span class="dss-team-rec" aria-hidden="true">{rec.text}</span><span class="dss-sr-only">{rec.aria}</span>{/if}
      {#if pos}<span class="dss-team-rank" aria-hidden="true">Platz {pos.text}</span><span class="dss-sr-only">{pos.aria}</span>{/if}
    </span>
  </div>
{:else}
  <div class={`dss-team dss-team--standard${clickable ? ' dss-team--link' : ''}`}>
    <div class="dss-team-head">
      {@render logoBadge({ name, logo }, 'dss-team-logo--lg')}
      <div class="dss-team-who">
        <svelte:element this={heading.tag} class="dss-team-nm">{@render nameBlock()}</svelte:element>
        {@render leagueLine()}
      </div>
    </div>

    {#if rec || pos || hasPoints}
      <div class="dss-team-vitals">
        {#if rec}{@render tile(rec.text, rec.label, rec.aria)}{/if}
        {#if pos}{@render tile(pos.text, pos.label, pos.aria)}{/if}
        {#if hasPoints}{@render tile(String(points), 'Punkte', `Punkte: ${points}`)}{/if}
      </div>
    {/if}

    {#if next || last}
      <div class="dss-team-games">
        {#if next}
          <div class="dss-team-game">
            <div class="dss-team-game-l">Nächstes Spiel</div>
            <div class="dss-team-game-row">
              {@render opponentName(next.opponent, next.at)}
              {#if next.date || next.time}<span class="dss-team-game-end">{[next.date, next.time].filter(Boolean).join(' · ')}</span>{/if}
            </div>
            {#if next.venue}<div class="dss-team-game-venue">{next.venue}</div>{/if}
          </div>
        {/if}
        {#if last}
          <div class="dss-team-game">
            <div class="dss-team-game-l">{last.date ? `Letztes Spiel · ${last.date}` : 'Letztes Spiel'}</div>
            <div class="dss-team-game-row">
              {@render opponentName(last.opponent, last.at)}
              {#if res}
                <span class="dss-team-game-end">
                  {#if res.outcome}<span class={`dss-chip dss-chip--mono ${OUTCOME_CHIP[res.outcome]}`} aria-hidden="true">{res.outcome}</span>{/if}
                  <span class="dss-team-game-score" aria-hidden="true">{res.score}</span>
                  <span class="dss-sr-only">{res.aria}</span>
                </span>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {/if}

    {#if squadLine}<div class="dss-team-squad">{squadLine}</div>{/if}

    {#if statList.length}
      <div class="dss-team-stats" role="group" aria-label="Saison-Statistik">
        <div class="dss-team-sec" aria-hidden="true">Saison-Statistik</div>
        <div class="dss-team-vitals">
          {#each statList as s (s.key)}
            <div>
              <div class="dss-pc-v">{s.value}</div>
              <div class="dss-pc-l">{s.label}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}
