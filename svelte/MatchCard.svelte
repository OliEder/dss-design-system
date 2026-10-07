<script lang="ts">
  /**
   * DSS MatchCard · Svelte 5
   * --------------------------------------------------------------
   * Drei Spielzustände, eine Kartengrammatik. Nutzt nur Klassen aus css/components.css.
   *
   *   scheduled — Datum/Uhrzeit, Halle, Teams
   *   live      — Spielstand, Viertel + Uhr, Puls
   *   finished  — Endstand, Sieger/Verlierer
   *
   * Mit `href` ist die Karte ein Link, mit `onclick` ein Button, sonst ein div.
   */
  type State = 'scheduled' | 'live' | 'finished';
  type Team = { name: string; short?: string; color?: 'heim' | 'gast'; score?: number };

  let {
    state = 'scheduled',
    league = '',
    matchday = '',
    date = '',
    time = '',
    venue = '',
    heim,
    gast,
    quarter = '',
    clock = '',
    href = undefined,
    onclick = undefined,
  }: {
    state?: State;
    league?: string;
    matchday?: string;
    date?: string;
    time?: string;
    venue?: string;
    heim: Team;
    gast: Team;
    quarter?: string;
    clock?: string;
    href?: string;
    onclick?: () => void;
  } = $props();

  let heimWin = $derived(state === 'finished' && (heim.score ?? 0) > (gast.score ?? 0));
  let gastWin = $derived(state === 'finished' && (gast.score ?? 0) > (heim.score ?? 0));
  const tag = $derived(href ? 'a' : onclick ? 'button' : 'div');
</script>

<!-- Der Handler hängt nur an <a>/<button> (nie am <div>); Svelte kann das bei svelte:element nicht erkennen. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={tag}
  class={`dss-match dss-match--${state}`}
  href={tag === 'a' ? href : undefined}
  type={tag === 'button' ? 'button' : undefined}
  onclick={tag === 'div' ? undefined : onclick}
>
  <span class="dss-match-head">
    <span class="dss-match-league">
      {#if league}<span>{league}</span>{/if}
      {#if matchday}<span class="dss-match-muted">· {matchday}</span>{/if}
    </span>
    {#if state === 'live'}
      <span class="dss-match-live"><span class="dss-match-pulse" aria-hidden="true"></span> Live · {quarter} {clock}</span>
    {:else if state === 'finished'}
      <span class="dss-match-final">Endstand</span>
    {:else if date}
      <span class="dss-match-when">{date}{time ? ` · ${time}` : ''}</span>
    {/if}
  </span>

  <span class="dss-match-body">
    <span class={`dss-match-team ${gastWin ? 'is-loser' : ''}`}>
      <span class="dss-match-dot" aria-hidden="true"></span>
      <span class="dss-match-name">{heim.name}</span>
      {#if state !== 'scheduled' && heim.score !== undefined}<span class="dss-match-score">{heim.score}</span>{/if}
    </span>
    <span class={`dss-match-team dss-match-team--gast ${heimWin ? 'is-loser' : ''}`}>
      <span class="dss-match-dot" aria-hidden="true"></span>
      <span class="dss-match-name">{gast.name}</span>
      {#if state !== 'scheduled' && gast.score !== undefined}<span class="dss-match-score">{gast.score}</span>{/if}
    </span>
  </span>

  {#if venue}
    <span class="dss-match-foot"><span>{venue}</span></span>
  {/if}
</svelte:element>
