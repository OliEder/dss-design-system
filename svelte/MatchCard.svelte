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
   *
   * `names`: "full" (Standard) oder "short" (Kurzname, falls vorhanden); bis 640 px Breite erscheint
   * der Kurzname automatisch (CSS, Viewport-Regel). `logos`: Logo bzw. Initialen vor dem Namen (Standard aus).
   */
  import { initials, shortName } from '../js/schedule.js';
  type State = 'scheduled' | 'live' | 'finished';
  type Team = { name: string; short?: string; logo?: string; color?: 'heim' | 'gast'; score?: number };
  type Names = 'full' | 'short';

  let {
    state = 'scheduled',
    league = '',
    matchday = '',
    date = '',
    time = '',
    venue = '',
    heim,
    gast,
    names = 'full',
    logos = false,
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
    names?: Names;
    logos?: boolean;
    quarter?: string;
    clock?: string;
    href?: string;
    onclick?: () => void;
  } = $props();

  let heimWin = $derived(state === 'finished' && (heim.score ?? 0) > (gast.score ?? 0));
  let gastWin = $derived(state === 'finished' && (gast.score ?? 0) > (heim.score ?? 0));
  const tag = $derived(href ? 'a' : onclick ? 'button' : 'div');
</script>

{#snippet teamBlock(t: Team)}
  {#if logos}<span class="dss-team-logo" class:dss-team-logo--initials={!t.logo} aria-hidden="true">{#if t.logo}<img src={t.logo} alt="" loading="lazy" />{:else}{initials(t.name, 2)}{/if}</span>{/if}
  {#if shortName(t)}<span class="dss-match-name dss-team-name" class:dss-team-name--short={names === 'short'}><span class="dss-name-full">{t.name}</span><span class="dss-name-short" aria-hidden="true">{shortName(t)}</span></span>{:else}<span class="dss-match-name">{t.name}</span>{/if}
{/snippet}

<!-- Der Handler hängt nur an <a>/<button> (nie am <div>); Svelte kann das bei svelte:element nicht erkennen. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={tag}
  class={`dss-match dss-match--${state}${logos ? ' dss-match--logos' : ''}`}
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
      {@render teamBlock(heim)}
      {#if state !== 'scheduled' && heim.score !== undefined}<span class="dss-match-score">{heim.score}</span>{/if}
    </span>
    <span class={`dss-match-team dss-match-team--gast ${heimWin ? 'is-loser' : ''}`}>
      <span class="dss-match-dot" aria-hidden="true"></span>
      {@render teamBlock(gast)}
      {#if state !== 'scheduled' && gast.score !== undefined}<span class="dss-match-score">{gast.score}</span>{/if}
    </span>
  </span>

  {#if venue}
    <span class="dss-match-foot"><span>{venue}</span></span>
  {/if}
</svelte:element>
