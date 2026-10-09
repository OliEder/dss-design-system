<script lang="ts">
  import Icon, { type IconName } from '../../svelte/Icon.svelte';

  let { name = 'whistle', size = 32, title = undefined }: { name?: IconName; size?: number; title?: string } = $props();
</script>

<Icon {name} {size} {title} />
