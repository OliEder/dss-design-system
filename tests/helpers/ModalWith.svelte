<script lang="ts">
  // Testhilfe: offenes Modal mit einer Titelkomponente im Inhalt und im Footer.
  import Modal from '../../svelte/Modal.svelte';
  import HeadingLevel from '../../svelte/HeadingLevel.svelte';
  let { Comp, props = {}, titleAs = undefined, inFooter = false, nested = undefined, outer = undefined }: { Comp: any; props?: Record<string, unknown>; titleAs?: any; inFooter?: boolean; nested?: number; outer?: number } = $props();
</script>

{#snippet content()}
  {#if nested !== undefined}
    <HeadingLevel level={nested as any}><Comp {...props} /></HeadingLevel>
  {:else}
    <Comp {...props} />
  {/if}
{/snippet}
{#snippet body()}
  {#if inFooter}x{:else}{@render content()}{/if}
{/snippet}
{#snippet foot()}{@render content()}{/snippet}

{#snippet modal()}
  {#if inFooter}
    <Modal open title="Kader" {titleAs} children={body} footer={foot} />
  {:else}
    <Modal open title="Kader" {titleAs} children={body} />
  {/if}
{/snippet}
{#if outer !== undefined}
  <HeadingLevel level={outer as any}>{@render modal()}</HeadingLevel>
{:else}
  {@render modal()}
{/if}
