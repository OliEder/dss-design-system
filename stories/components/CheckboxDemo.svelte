<script lang="ts">
  import Checkbox from '../../svelte/Checkbox.svelte';

  let { density = 'default', disabled = false }: { density?: 'default' | 'compact'; disabled?: boolean } = $props();
  let withReturn = $state(true);
  let seeded = $state(false);
</script>

<div style="padding: 24px; display: flex; flex-direction: column; gap: 8px; max-width: 420px;">
  <Checkbox label="Mit Rückspiel" hint="Jede Paarung wird zweimal gespielt." bind:checked={withReturn} {density} {disabled} />
  <Checkbox label="Teams setzen" bind:checked={seeded} {density} {disabled} />
</div>
