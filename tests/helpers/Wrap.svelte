<script lang="ts">
  // Testhilfe: umhüllt eine Komponente mit verschachtelten HeadingLevel (je Eintrag von `wrap` eines).
  import HeadingLevel from '../../svelte/HeadingLevel.svelte';
  let { Comp, props = {}, wrap = [] }: { Comp: any; props?: Record<string, unknown>; wrap?: { level?: any; by?: number }[] } = $props();
</script>

{#snippet inner(i: number)}
  {#if i >= wrap.length}
    <Comp {...props} />
  {:else}
    <HeadingLevel level={wrap[i].level} by={wrap[i].by}>{@render inner(i + 1)}</HeadingLevel>
  {/if}
{/snippet}
{@render inner(0)}
