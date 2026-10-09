import TextInputDemo from './components/TextInputDemo.svelte';
import TextInputExamples from './components/TextInputExamples.svelte';

export default {
  title: 'Components/TextInput',
  component: TextInputDemo,
  argTypes: {
    view:        { control: 'inline-radio', options: ['single', 'all'], description: 'Demo-Ansicht (nur Storybook)', table: { disable: true } },
    label:       { control: 'text', description: 'Beschriftung über dem Feld; per `for` mit dem Input verknüpft', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    value:       { control: 'text', description: 'Eingegebener Wert (Svelte: `bind:value`)', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    placeholder: { control: 'text', description: 'Beispielwert im leeren Feld, ersetzt kein Label', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    help:        { control: 'text', description: 'Hinweis- oder Fehlertext unter dem Feld; wird per `aria-describedby` verknüpft', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    state:       { control: 'inline-radio', options: ['default', 'error', 'ok', 'warn'], description: 'Rückmeldung: Rahmen und Hilfetext in Rot, Grün oder Amber; `error` setzt zusätzlich `aria-invalid`', table: { type: { summary: "'default' | 'error' | 'ok' | 'warn'" }, defaultValue: { summary: "'default'" } } },
    density:     { control: 'inline-radio', options: ['touch', 'default', 'compact'], description: 'Feldhöhe: 56 px, 44 px oder 36 px', table: { type: { summary: "'touch' | 'default' | 'compact'" }, defaultValue: { summary: "'default'" } } },
    type:        { control: false, description: 'HTML-Typ des Inputs', table: { type: { summary: 'string' }, defaultValue: { summary: "'text'" } } },
    required:    { control: 'boolean', description: 'Pflichtfeld: Sternchen am Label und `required` am Input', table: { defaultValue: { summary: 'false' } } },
    optional:    { control: 'text', description: 'Kleiner Zusatz am Label, z. B. „Optional“', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    disabled:    { control: 'boolean', description: 'Sperrt das Feld: gedämpfte Schrift, Cursor `not-allowed`', table: { defaultValue: { summary: 'false' } } },
    pattern:     { control: false, description: 'Muster für die Browser-Validierung', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    inputmode:   { control: false, description: 'Tastaturvorschlag auf dem Handy', table: { type: { summary: "'numeric' | 'decimal' | 'text' | 'tel' | 'email'" } } },
    maxlength:   { control: false, description: 'Maximale Zeichenzahl', table: { type: { summary: 'number' } } },
    id:          { control: false, description: 'Eigene id; sonst wird eine erzeugt', table: { type: { summary: 'string' } } },
    name:        { control: false, description: 'Name für Formular-Übermittlung', table: { type: { summary: 'string' } } },
    prefix:      { control: false, description: 'Zusatz links im Feld (Svelte: Snippet, React: ReactNode)', table: { type: { summary: 'Snippet' } } },
    suffix:      { control: false, description: 'Zusatz rechts im Feld (Svelte: Snippet, React: ReactNode)', table: { type: { summary: 'Snippet' } } },
  },
  args: {
    view: 'single',
    label: 'Trikotnummer',
    value: '',
    placeholder: '0 · 00 · 1–99',
    help: 'FIBA: 0, 00, einstellig (1–9), zweistellig (01–99).',
    state: 'default',
    density: 'default',
    required: true,
  },
};

export const Default        = {};
export const MitOptional    = { args: { label: 'Zweitname', optional: 'Optional', required: false, help: 'Wird auf dem Spielbericht nicht abgedruckt.', placeholder: 'z.B. Sandro' } };
export const Fehler         = { args: { label: 'Trikotnummer', value: '107', state: 'error', help: 'Ungültig: Nummern müssen FIBA-konform sein (max. 99).' } };
export const Erfolg         = { args: { label: 'Lizenz-Nummer Schiri', value: 'SR-2025-1834', state: 'ok', help: 'Lizenz geprüft · Saison 25/26.' } };
export const Warnung        = { args: { label: 'Beginn', value: '21:45', state: 'warn', help: 'Spätes Spiel: Hallen-Schließung beachten.' } };
export const Disabled       = { args: { label: 'Spieler-ID', value: 'BBV-91842', disabled: true, help: 'Automatisch zugewiesen, nicht editierbar.' } };
export const AlleStates     = { args: { view: 'all' } };

// Beispiele für die Doku-Seite (TextInput.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: TextInputExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Anatomie     = { ...example('anatomie'), tags: ['!dev'] };
export const Tonalitaeten = { ...example('tonalitaeten'), tags: ['!dev'] };
export const Gesperrt     = { ...example('gesperrt'), tags: ['!dev'] };
export const Dichten      = { ...example('dichten'), tags: ['!dev'] };
export const Zustaende    = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story (der Indexer liest keine Funktionsrückgaben).
export const DoLabel       = { ...example('do-label'), tags: ['!dev'] };
export const DontLabel     = { ...example('dont-label'), tags: ['!dev'] };
export const DoFehler      = { ...example('do-fehler'), tags: ['!dev'] };
export const DontFehler    = { ...example('dont-fehler'), tags: ['!dev'] };
export const DoFormat      = { ...example('do-format'), tags: ['!dev'] };
export const DontFormat    = { ...example('dont-format'), tags: ['!dev'] };
export const DoWarnung     = { ...example('do-warnung'), tags: ['!dev'] };
export const DontWarnung   = { ...example('dont-warnung'), tags: ['!dev'] };
export const DoGesperrt    = { ...example('do-gesperrt'), tags: ['!dev'] };
export const DontGesperrt  = { ...example('dont-gesperrt'), tags: ['!dev'] };
