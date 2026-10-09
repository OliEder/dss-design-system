<script lang="ts">
  import EmptyState from '../../svelte/EmptyState.svelte';

  let {
    tone = 'neutral',
    title = 'Noch keine Spiele',
    body = '',
    cta = '',
    titleAs = 'h3',
  }: { tone?: 'neutral' | 'action' | 'error'; title?: string; body?: string; cta?: string; titleAs?: 'h2' | 'h3' | 'h4' } = $props();
</script>

<div style="padding: 24px;">
  <EmptyState {tone} {title} {body} {cta} {titleAs} />
</div>
