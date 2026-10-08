<script lang="ts">
  /**
   * Code-Beispiel in drei Fassungen (Vanilla, Svelte, React). Nur Storybook-Doku, nicht Teil des Pakets.
   * Sichtbar ist genau eine Fassung, gesteuert über html[data-framework] (Toolbar "Fassung" in .storybook/preview.ts).
   * Ohne Attribut oder mit unbekanntem Wert gilt Svelte.
   */
  let { vanilla, svelte, react, label }: { vanilla?: string; svelte?: string; react?: string; label?: string } = $props();

  const blocks = $derived([
    { key: 'vanilla', name: 'Vanilla HTML', code: vanilla },
    { key: 'svelte', name: 'Svelte', code: svelte },
    { key: 'react', name: 'React', code: react },
  ]);
</script>

<div class="cs">
  {#if label}<div class="spec-cap">{label}</div>{/if}
  {#each blocks as b (b.key)}
    <div class="code code-{b.key}" tabindex="0" role="region" aria-label="Code-Beispiel {b.name}">
      <span class="chip">{b.name}</span>
      {#if b.code}
        <pre>{b.code}</pre>
      {:else}
        <p class="none">Für diese Fassung gibt es hier kein Beispiel.</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .code {
    display: none;
    border: 1px solid var(--page-line);
    border-radius: 14px;
    background: var(--base-1000);
    color: var(--n-100);
    padding: 16px 24px 22px;
    overflow-x: auto;
  }
  .code-svelte { display: block; }
  :global(html[data-framework='vanilla']) .code-vanilla { display: block; }
  :global(html[data-framework='vanilla']) .code-svelte { display: none; }
  :global(html[data-framework='react']) .code-react { display: block; }
  :global(html[data-framework='react']) .code-svelte { display: none; }
  .chip {
    display: inline-block;
    margin-bottom: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--n-100);
    color: var(--base-1000);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  pre {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.6;
    color: var(--n-100);
    font-variant-ligatures: none;
  }
  .none { margin: 0; font-style: italic; font-size: 13.5px; color: var(--n-300); }
</style>
