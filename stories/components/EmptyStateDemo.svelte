<script lang="ts">
  import EmptyState from '../../svelte/EmptyState.svelte';

  let { tone = 'neutral' }: { tone?: 'neutral' | 'action' | 'error' } = $props();

  const content = {
    neutral: { title: 'Noch keine Spiele', body: 'Sobald ein Spielplan existiert, erscheinen die Partien hier.' },
    action: { title: 'Zeitplan fehlt', body: 'Erzeuge zuerst einen Zeitplan, um Ergebnisse zu erfassen.', cta: 'Zeitplan erzeugen' },
    error: { title: 'Laden fehlgeschlagen', body: 'Die Daten konnten nicht geladen werden.', cta: 'Erneut versuchen' },
  } as const;
</script>

<div style="padding: 24px;">
  <EmptyState {tone} {...content[tone]} />
</div>
