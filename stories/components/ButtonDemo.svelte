<script>
  import Button from '../../svelte/Button.svelte';

  let {
    view = 'single',
    variant = 'primary',
    size = 'md',
    touch = false,
    disabled = false,
    label = 'Spielbericht freigeben',
  } = $props();
</script>

{#if view === 'single'}
  <Button {variant} {size} {touch} {disabled}>{label}</Button>
{:else if view === 'variants'}
  <div class="row">
    <Button variant="primary">Primary</Button>
    <Button variant="amber">Amber</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
{:else if view === 'sizes'}
  <div class="row">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button touch>Touch · 64 px</Button>
  </div>
{:else if view === 'disabled'}
  <div class="row">
    <Button disabled>Primary</Button>
    <Button variant="amber" disabled>Amber</Button>
    <Button variant="secondary" disabled>Secondary</Button>
  </div>
{/if}

<style>
  .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; padding: 24px; }
</style>
