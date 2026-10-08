<script lang="ts">
  /**
   * DSS ScheduleGrid · Svelte 5
   * --------------------------------------------------------------
   * Zeitraster: Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten
   * (empfohlen: höchstens drei). Nutzt ausschließlich die Klassen aus
   * css/components.css (kein eigener Scoped-Style); gleiche Struktur wie
   * die React-Fassung. Slot `notice`: zusätzlicher Inhalt in der Spielzelle.
   */
  import type { Snippet } from 'svelte';
  import { ariaForResult, buildGrid, hasScore, winnerSide } from '../js/schedule.js';
  import type { ScheduleBreak, ScheduleDensity, ScheduleGame, ScheduleGridColumn, ScheduleTeam } from '../js/schedule.js';

  let {
    games,
    columns,
    slots = undefined,
    breaks = undefined,
    emptyLabel = 'frei',
    density = 'default',
    title = '',
    meta = '',
    caption = '',
    class: klass = '',
    notice = undefined,
  }: {
    games: ScheduleGame[];
    columns: ScheduleGridColumn[];
    slots?: string[];
    breaks?: ScheduleBreak[];
    emptyLabel?: string;
    density?: ScheduleDensity;
    title?: string;
    meta?: string;
    caption?: string;
    class?: string;
    notice?: Snippet<[ScheduleGame]>;
  } = $props();

  const rows = $derived(buildGrid({ games, columns, slots, breaks }));
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

{#snippet gameBlock(game: ScheduleGame)}
  {@const winner = winnerSide(game)}
  {@const own = game.heim?.own || game.gast?.own}
  {@const metaText = [game.nr, game.section].filter(Boolean).join(' · ')}
  <div
    class="dss-sg-game"
    class:is-own={own}
    class:is-live={game.state === 'live'}
    class:is-cancelled={game.state === 'cancelled'}
    class:is-postponed={game.state === 'postponed'}
  >
    <div class="dss-sg-teams">
      {@render team(game.heim, winner === 'gast')}
      <span class="dss-sch-sep" aria-hidden="true"> – </span>
      <span class="dss-sr-only"> gegen </span>
      {@render team(game.gast, winner === 'heim')}
    </div>
    {#if game.state === 'live'}
      <span class="dss-match-live dss-sch-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live</span>
    {/if}
    {#if (game.state === 'finished' || game.state === 'live') && hasScore(game, 'versus')}
      <div class="dss-sg-result">
        <span class="dss-sch-score" aria-hidden="true">{game.heim?.score} : {game.gast?.score}</span>
        <span class="dss-sr-only">{ariaForResult(game, 'versus')}</span>
        {#if game.provisional}<small aria-hidden="true">vorläufig</small>{/if}
      </div>
    {/if}
    {#if metaText}<div class="dss-sg-meta">{metaText}</div>{/if}
    {#if game.note}<div class="dss-sch-note">{game.note}</div>{/if}
    {#if notice}{@render notice(game)}{/if}
  </div>
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
    <table role="table" class="dss-tbl dss-sgrid dss-tbl--{density}">
      {#if caption}<caption class="dss-sr-only">{caption}</caption>{/if}
      <!-- svelte-ignore a11y_no_redundant_roles -->
      <thead role="rowgroup">
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <tr role="row">
          <th scope="col" role="columnheader" class="dss-sg-time">Zeit</th>
          {#each columns as column (column.id)}
            <th scope="col" role="columnheader">{column.label}</th>
          {/each}
        </tr>
      </thead>
      <!-- svelte-ignore a11y_no_redundant_roles -->
      <tbody role="rowgroup">
        {#each rows as row, index (`${row.kind}-${row.time ?? ''}-${index}`)}
          {#if row.kind === 'break'}
            <!-- svelte-ignore a11y_no_redundant_roles -->
            <tr role="row" class="dss-sg-break">
              <th scope="row" role="rowheader" class="dss-sg-time">{row.time}</th>
              <td role="cell" colspan={columns.length}>{row.label}</td>
            </tr>
          {:else if row.kind === 'bye'}
            <!-- svelte-ignore a11y_no_redundant_roles -->
            <tr role="row" class="dss-sg-bye">
              <th scope="row" role="rowheader" class="dss-sg-time">{row.time ?? ''}</th>
              <td role="cell" colspan={columns.length}>{row.game.heim ? `${row.game.heim.name} hat Freilos` : (row.game.note ?? 'Spielfrei')}</td>
            </tr>
          {:else}
            <!-- svelte-ignore a11y_no_redundant_roles -->
            <tr role="row">
              <th scope="row" role="rowheader" class="dss-sg-time">{row.time}</th>
              {#each row.cells as cell, columnIndex (columns[columnIndex].id)}
                <td role="cell" class="dss-sg-cell" class:is-empty={cell.length === 0} data-label={columns[columnIndex].label}>
                  {#if cell.length === 0}
                    <span class="dss-sg-empty">{emptyLabel}</span>
                  {:else}
                    {#each cell as game (game.id)}{@render gameBlock(game)}{/each}
                  {/if}
                </td>
              {/each}
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>
