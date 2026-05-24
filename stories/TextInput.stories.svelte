<script context="module" lang="ts">
  import type { Meta } from '@storybook/sveltekit';
  import TextInput from '../svelte/TextInput.svelte';

  export const meta = {
    title: 'Components/TextInput',
    component: TextInput,
    tags: ['autodocs'],
    argTypes: {
      state: { control: 'inline-radio', options: ['default', 'error', 'ok', 'warn'] },
      type:  { control: 'select', options: ['text', 'number', 'email', 'tel', 'password'] },
      required: { control: 'boolean' },
      disabled: { control: 'boolean' },
    },
    args: {
      label: 'Trikotnummer',
      value: '',
      placeholder: '0 · 00 · 1–99',
      help: 'FIBA: 0, 00, einstellig (1–9), zweistellig (01–99).',
      state: 'default',
      required: true,
    },
  } satisfies Meta<TextInput>;
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import TextInput from '../svelte/TextInput.svelte';
</script>

<Story name="Default" />

<Story name="Mit Optional-Label" args={{
  label: 'Zweitname',
  optional: 'Optional',
  required: false,
  help: 'Wird auf dem Spielbericht nicht abgedruckt.',
  placeholder: 'z.B. Sandro',
}} />

<Story name="Fehler" args={{
  label: 'Trikotnummer',
  value: '107',
  state: 'error',
  help: 'Ungültig — Nummern müssen FIBA-konform sein (max. 99).',
}} />

<Story name="Erfolg" args={{
  label: 'Lizenz-Nummer Schiri',
  value: 'SR-2025-1834',
  state: 'ok',
  help: 'Lizenz geprüft · Saison 25/26.',
}} />

<Story name="Warnung" args={{
  label: 'Beginn',
  value: '21:45',
  state: 'warn',
  help: 'Spätes Spiel — Hallen-Schließung beachten.',
}} />

<Story name="Disabled" args={{
  label: 'Spieler-ID',
  value: 'BBV-91842',
  disabled: true,
  help: 'Automatisch zugewiesen, nicht editierbar.',
}} />

<Story name="Alle States nebeneinander">
  <div class="sb-stack" style="max-width: 360px;">
    <TextInput label="Default" placeholder="Eingabe…" help="Hinweistext" />
    <TextInput label="Fokus" value="In Bearbeitung" />
    <TextInput label="Erfolg" value="Frank Müller" state="ok" help="Spieler bestätigt" />
    <TextInput label="Warnung" value="21:45" state="warn" help="Späte Anwurfzeit" />
    <TextInput label="Fehler" value="107" state="error" help="Max. 99 erlaubt." required />
    <TextInput label="Disabled" value="—" disabled />
  </div>
</Story>
