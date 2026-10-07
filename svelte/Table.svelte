<script lang="ts">
  /**
   * DSS Table · Svelte 5
   * --------------------------------------------------------------
   * Datentabelle nach der Tables-Spec. Nutzt nur die Klassen aus
   * css/components.css.
   *
   * Dichten : touch (60px) · default (48px) · compact (40px) · dense (32px)
   * Flächen : hell (Standard) · dunkel (Kampfgericht-Tisch)
   * Features: sticky Kopf, Sortier-Pfeil + aria-sort, optionales Striping,
   *           tfoot-Summenzeile, Hover.
   *
   * Zellen kommen vom Aufrufer über die `rows`/`body`-Snippets. Hilfsklassen:
   *   .num · .num.lead · .num.dim · .center
   *   .dss-tn / .dss-pos / .dss-pill-s / .dss-player (Dekoration)
   */
  import type { Snippet } from 'svelte';

  type Density = 'touch' | 'default' | 'compact' | 'dense';

  let {
    title = '',
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
    class: klass = '',
  }: {
    title?: string;
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
    class?: string;
  } = $props();
</script>

<div class={`dss-frame ${dark ? 'dss-frame--dark' : ''} ${klass}`}>
  {#if title || meta || live}
    <div class="dss-frame-head">
      {#if title}<h3 class="dss-frame-title">{title}</h3>{:else}<span></span>{/if}
      <div class="dss-frame-meta">
        {#if meta}<span>{meta}</span>{/if}
        {#if live}<span class="dss-crumb"><span class="dss-crumb-dot" aria-hidden="true"></span> Live</span>{/if}
      </div>
    </div>
  {/if}

  <div class="dss-table-scroll">
    <table class={`dss-tbl dss-tbl--${density} ${striped ? 'dss-tbl--striped' : ''}`}>
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
