import TextInputDemo from './components/TextInputDemo.svelte';

export default {
  title: 'Components/TextInput',
  component: TextInputDemo,
  tags: ['autodocs'],
  argTypes: {
    view:     { control: 'inline-radio', options: ['single', 'all'] },
    state:    { control: 'inline-radio', options: ['default', 'error', 'ok', 'warn'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    view: 'single',
    label: 'Trikotnummer',
    value: '',
    placeholder: '0 · 00 · 1–99',
    help: 'FIBA: 0, 00, einstellig (1–9), zweistellig (01–99).',
    state: 'default',
    required: true,
  },
};

export const Default        = {};
export const MitOptional    = { args: { label: 'Zweitname', optional: 'Optional', required: false, help: 'Wird auf dem Spielbericht nicht abgedruckt.', placeholder: 'z.B. Sandro' } };
export const Fehler         = { args: { label: 'Trikotnummer', value: '107', state: 'error', help: 'Ungültig — Nummern müssen FIBA-konform sein (max. 99).' } };
export const Erfolg         = { args: { label: 'Lizenz-Nummer Schiri', value: 'SR-2025-1834', state: 'ok', help: 'Lizenz geprüft · Saison 25/26.' } };
export const Warnung        = { args: { label: 'Beginn', value: '21:45', state: 'warn', help: 'Spätes Spiel — Hallen-Schließung beachten.' } };
export const Disabled       = { args: { label: 'Spieler-ID', value: 'BBV-91842', disabled: true, help: 'Automatisch zugewiesen, nicht editierbar.' } };
export const AlleStates     = { args: { view: 'all' } };
