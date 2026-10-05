<script>
  import Banner from '../../svelte/Banner.svelte';

  let { severity = 'info', title = '', icon = true, body = 'Geschätzte Gesamtdauer: 180 Minuten.' } = $props();
</script>

<div style="max-width: 560px">
  <Banner {severity} {title} {icon}>{body}</Banner>
</div>
