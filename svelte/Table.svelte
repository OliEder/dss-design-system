<script lang="ts">
  /**
   * DSS Table · Svelte 5
   * --------------------------------------------------------------
   * Datentabelle nach der Tables-Spec. Nutzt nur die Klassen aus
   * css/components.css.
   *
   * Dichten : touch (60px) · default (48px) · compact (40px) · dense (32px)
   * Flächen : hell (Standard) · dunkel (Kampfgericht-Tisch)
   * Features: sticky Kopf (sobald der Scrollbereich eine Höhe hat), Sortier-Pfeil +
   *           aria-sort, optionales Striping, tfoot-Summenzeile, Hover.
   *           Der Scrollbereich ist eine Region mit Namen (caption, sonst title) und per
   *           Tastatur erreichbar.
   *
   * Zellen kommen vom Aufrufer über die `rows`/`body`-Snippets. Hilfsklassen:
   *   .num · .num.lead · .num.dim · .center
   *   .dss-tn / .dss-pos / .dss-pill-s / .dss-player (Dekoration)
   */
  import type { Snippet } from 'svelte';
  import type { HeadingTag } from '../js/heading.js';
  import { useHeadingTag } from './heading-context.js';

  type Density = 'touch' | 'default' | 'compact' | 'dense';

  let {
    title = '',
    titleAs = undefined,
    meta = '',
    live = false,
    density = 'default',
    dark = false,
    striped = false,
    columns,
    rows,
    head = undefined,
    body,
    foot = undefined,
    caption = '',
    class: klass = '',
  }: {
    title?: string;
      /** Überschriftenebene, h2 bis h6. Rangfolge: `titleAs` vor der Ebene aus `HeadingLevel` vor h3. */
    titleAs?: HeadingTag;
    meta?: string;
    live?: boolean;
    density?: Density;
    dark?: boolean;
    striped?: boolean;
    columns?: { key: string; label: string; align?: 'left' | 'right' | 'center'; width?: string; sortable?: boolean; sort?: 'asc' | 'desc' | null }[];
    rows?: Snippet;
    head?: Snippet;
    body?: Snippet;
    foot?: Snippet;
    /** Unsichtbare Tabellenbeschriftung für Screenreader; benennt auch den Scrollbereich. */
    caption?: string;
    class?: string;
  } = $props();

  const heading = useHeadingTag(() => titleAs);
</script>

<div class={`dss-frame ${dark ? 'dss-frame--dark' : ''} ${klass}`}>
  {#if title || meta || live}
    <div class="dss-frame-head">
      {#if title}<svelte:element this={heading.tag} class="dss-frame-title">{title}</svelte:element>{:else}<span></span>{/if}
      <div class="dss-frame-meta">
        {#if meta}<span>{meta}</span>{/if}
        {#if live}<span class="dss-crumb"><span class="dss-crumb-dot" aria-hidden="true"></span> Live</span>{/if}
      </div>
    </div>
  {/if}

  <!-- svelte-ignore a11y_no_noninteractive_tabindex -- Fokussierbar mit Absicht: Tastaturnutzer müssen den scrollbaren Bereich erreichen (WCAG 2.1.1) -->
  <div class="dss-table-scroll" role="region" tabindex="0" aria-label={caption || title || 'Tabelle'}>
    <table class={`dss-tbl dss-tbl--${density} ${striped ? 'dss-tbl--striped' : ''}`}>
      {#if caption}<caption class="dss-sr-only">{caption}</caption>{/if}
      {#if columns}
        <thead>
          <tr>
            {#each columns as col (col.key)}
              <th
                scope="col"
                class={`${col.align ?? 'left'} ${col.sortable ? 'sortable' : ''} ${col.sort ? `sort-${col.sort}` : ''}`}
                style={col.width ? `width: ${col.width};` : ''}
                aria-sort={col.sort === 'asc' ? 'ascending' : col.sort === 'desc' ? 'descending' : undefined}
              >{col.label}</th>
            {/each}
          </tr>
        </thead>
      {/if}
      {#if head && !columns}<thead>{@render head()}</thead>{/if}
      {#if body || rows}<tbody>{@render (body ?? rows)?.()}</tbody>{/if}
      {#if foot}<tfoot>{@render foot()}</tfoot>{/if}
    </table>
  </div>
</div>
