<script lang="ts">
  import CourtLines from '../../svelte/CourtLines.svelte';
</script>

<div style="position: relative; min-height: 420px; overflow: hidden; border: 1px solid var(--dss-line); border-radius: 12px; background: var(--dss-surface);">
  <CourtLines position="absolute" />
  <div style="position: relative; z-index: 1; padding: 32px;">
    <h2 style="margin: 0 0 8px; font-family: var(--font-display); color: var(--dss-fg);">Seiteninhalt über den Spielfeldlinien</h2>
    <p style="margin: 0; max-width: 46ch; color: var(--dss-fg-soft);">Die Linien bleiben dezent, damit auch gedämpfter Text lesbar bleibt. Der Inhalt braucht <code>position: relative; z-index: 1</code>.</p>
  </div>
</div>
