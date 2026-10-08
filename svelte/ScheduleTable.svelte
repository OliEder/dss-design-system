<script lang="ts">
  /**
   * DSS ScheduleTable · Svelte 5
   * --------------------------------------------------------------
   * Spielplan als Tabelle: Gegenüberstellung (versus), Perspektive einer
   * Mannschaft (opponent) oder Turnier-Spalten (columns). Nutzt
   * ausschließlich die Klassen aus css/components.css (kein eigener
   * Scoped-Style); gleiche Struktur wie die React-Fassung.
   *
   * Slots: `time` (ersetzt die Uhrzeit) und `notice` (zusätzliche Zelle am
   * Zeilenende), jeweils mit dem Spiel als Argument.
   */
  import type { Snippet } from 'svelte';
  import {
    ariaForResult,
    columnsFor,
    densityFor,
    groupBySection,
    hasScore,
    initials,
    layoutFor,
    resolveOutcome,
    winnerSide,
  } from '../js/schedule.js';
  import type { ScheduleDensity, ScheduleGame, ScheduleLayout, ScheduleTeam } from '../js/schedule.js';

  let {
    games,
    layout = undefined,
    density = undefined,
    title = '',
    meta = '',
    caption = '',
    class: klass = '',
    time = undefined,
    notice = undefined,
  }: {
    games: ScheduleGame[];
    layout?: ScheduleLayout;
    density?: ScheduleDensity;
    title?: string;
    meta?: string;
    caption?: string;
    class?: string;
    time?: Snippet<[ScheduleGame]>;
    notice?: Snippet<[ScheduleGame]>;
  } = $props();

  const mode = $derived<ScheduleLayout>(layout ?? layoutFor(games));
  const dens = $derived<ScheduleDensity>(density ?? densityFor(games, mode));
  const cols = $derived(columnsFor(mode, games, Boolean(notice)));
  const groups = $derived(groupBySection(games));
  const OUTCOME_CHIP = { S: 'dss-chip--ok', N: 'dss-chip--err', U: '' } as const;
</script>

{#snippet team(t: ScheduleTeam | undefined, loser: boolean)}
  {@const current = t ?? { name: '?' }}
  <span class="dss-sch-team" class:is-loser={loser}>
    {#if current.href && !current.placeholder}
      <a class="dss-link" href={current.href}>{current.name}</a>
    {:else if current.placeholder}
      <span class="dss-sch-ph">{current.name}</span>
    {:else}
      {current.name}
    {/if}
  </span>
{/snippet}

{#snippet noteText(game: ScheduleGame)}
  {#if game.note}<span class="dss-sch-note">{game.note}</span>{/if}
{/snippet}

{#snippet row(game: ScheduleGame)}
  {@const own = game.heim?.own || game.gast?.own}
  {@const winner = winnerSide(game)}
  {#if game.state === 'bye'}
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <tr role="row" class="dss-sch-row is-bye">
      <td role="cell" class="dss-sch-bye" colspan={cols.length}>
        {#if game.time}<span class="dss-sch-time">{game.time} · </span>{/if}
        {game.heim ? `${game.heim.name} hat Freilos` : (game.note ?? 'Spielfrei')}
      </td>
    </tr>
  {:else}
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <tr
      role="row"
      class="dss-sch-row"
      class:is-own={own && mode !== 'opponent'}
      class:is-live={game.state === 'live'}
      class:is-cancelled={game.state === 'cancelled'}
      class:is-postponed={game.state === 'postponed'}
    >
      {#each cols as col (col.key)}
        {#if col.key === 'nr'}
          <td role="cell" class="dss-sch-nr">{game.nr}</td>
        {:else if col.key === 'when'}
          <td role="cell" class="dss-sch-when">
            {#if game.date}<span class="dss-sch-date">{game.date}</span>{/if}
            {#if time || game.time}<span class="dss-sch-time">{#if time}{@render time(game)}{:else}{game.time}{/if}</span>{/if}
            {#if game.state === 'live'}
              <span class="dss-match-live dss-sch-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live</span>
            {/if}
            {#if mode !== 'columns' && game.venue}<span class="dss-sch-venue">{game.venue}</span>{/if}
          </td>
        {:else if col.key === 'ha'}
          <td role="cell" class="dss-sch-ha">
            <span class="dss-chip dss-chip--mono {game.at === 'gast' ? 'dss-chip--amber' : 'dss-chip--sky'}">{game.at === 'gast' ? '@' : 'vs.'}</span>
          </td>
        {:else if col.key === 'match'}
          <td role="cell" class="dss-sch-match">
            {#if mode === 'opponent' && game.opponent}
              <span class="dss-sch-opp">
                <span class="dss-sch-logo" aria-hidden="true">
                  {#if game.opponent.logo}<img src={game.opponent.logo} alt="" />{:else}{initials(game.opponent.name)}{/if}
                </span>
                {@render team(game.opponent, false)}
              </span>
            {:else}
              {@render team(game.heim, winner === 'gast')}
              <span class="dss-sch-sep" aria-hidden="true"> – </span>
              <span class="dss-sr-only"> gegen </span>
              {@render team(game.gast, winner === 'heim')}
            {/if}
            {#if game.league}
              <span class="dss-sch-sub">
                {#if game.league.href}<a class="dss-link" href={game.league.href}>{game.league.name}</a>{:else}{game.league.name}{/if}
              </span>
            {/if}
            {@render noteText(game)}
          </td>
        {:else if col.key === 'heim'}
          <td role="cell" class="dss-sch-heim">{@render team(game.heim, winner === 'gast')}</td>
        {:else if col.key === 'gast'}
          <td role="cell" class="dss-sch-gast">{@render team(game.gast, winner === 'heim')}{@render noteText(game)}</td>
        {:else if col.key === 'field'}
          <td role="cell" class="dss-sch-field-cell">
            {#if game.field}<span class="dss-chip dss-chip--mono dss-sch-field" title={game.field}>{game.field}</span>{/if}
          </td>
        {:else if col.key === 'venue'}
          <td role="cell" class="dss-sch-venue-cell">{game.venue}</td>
        {:else if col.key === 'res'}
          {@const scored = (game.state === 'finished' || game.state === 'live') && hasScore(game, mode)}
          {@const result = mode === 'opponent' ? resolveOutcome(game) : undefined}
          <td role="cell" class="dss-sch-res">
            {#if !scored}
              <span class="dss-sch-none">–</span>
            {:else}
              {#if result}<span class="dss-chip dss-chip--mono {OUTCOME_CHIP[result]}" aria-hidden="true">{result}</span>{/if}
              <span class="dss-sch-score" aria-hidden="true">{mode === 'opponent' && game.opponent ? `${game.ownScore} : ${game.opponent.score}` : `${game.heim?.score} : ${game.gast?.score}`}</span>
              <span class="dss-sr-only">{ariaForResult(game, mode)}</span>
              {#if game.provisional}<small aria-hidden="true">vorläufig</small>{/if}
            {/if}
          </td>
        {:else if col.key === 'notice'}
          <td role="cell" class="dss-sch-notice">{#if notice}{@render notice(game)}{/if}</td>
        {/if}
      {/each}
    </tr>
  {/if}
{/snippet}

<div class="dss-frame {klass}">
  {#if title || meta}
    <div class="dss-frame-head">
      {#if title}<h3 class="dss-frame-title">{title}</h3>{:else}<span></span>{/if}
      <div class="dss-frame-meta">{#if meta}<span>{meta}</span>{/if}</div>
    </div>
  {/if}
  <div class="dss-table-scroll">
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <table role="table" class="dss-tbl dss-tbl--schedule dss-tbl--{dens} dss-sch--{mode}">
      {#if caption}<caption class="dss-sr-only">{caption}</caption>{/if}
      <!-- svelte-ignore a11y_no_redundant_roles -->
      <thead role="rowgroup" class:dss-sr-only={mode !== 'columns'}>
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <tr role="row">
          {#each cols as col (col.key)}
            <th scope="col" role="columnheader">{col.label}</th>
          {/each}
        </tr>
      </thead>
      <!-- svelte-ignore a11y_no_redundant_roles -->
      <tbody role="rowgroup">
        {#each groups as group, index (`${group.section ?? 'ohne'}-${index}`)}
          {#if group.section}
            <!-- svelte-ignore a11y_no_redundant_roles -->
            <tr role="row" class="dss-sch-group"><th scope="colgroup" colspan={cols.length}>{group.section}</th></tr>
          {/if}
          {#each group.games as game (game.id)}
            {@render row(game)}
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</div>
