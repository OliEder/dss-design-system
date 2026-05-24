<script>
  import TextInput from '../../svelte/TextInput.svelte';

  let {
    view = 'single',
    label = 'Trikotnummer',
    value = '',
    placeholder = '0 · 00 · 1–99',
    help = 'FIBA: 0, 00, einstellig (1–9), zweistellig (01–99).',
    state = 'default',
    required = true,
    optional = '',
    disabled = false,
  } = $props();
</script>

{#if view === 'single'}
  <div style="padding: 24px; max-width: 360px;">
    <TextInput {label} {value} {placeholder} {help} {state} {required} {optional} {disabled} />
  </div>
{:else}
  <div class="stack">
    <TextInput label="Default" placeholder="Eingabe…" help="Hinweistext" />
    <TextInput label="Fokus" value="In Bearbeitung" />
    <TextInput label="Erfolg" value="Frank Müller" state="ok" help="Spieler bestätigt" />
    <TextInput label="Warnung" value="21:45" state="warn" help="Späte Anwurfzeit" />
    <TextInput label="Fehler" value="107" state="error" help="Max. 99 erlaubt." required />
    <TextInput label="Disabled" value="—" disabled />
  </div>
{/if}

<style>
  .stack { display: flex; flex-direction: column; gap: 16px; padding: 24px; max-width: 360px; }
</style>
