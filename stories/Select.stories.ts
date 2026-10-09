import SelectDemo from './components/SelectDemo.svelte';
import SelectExamples from './components/SelectExamples.svelte';

export default {
  title: 'Components/Select',
  component: SelectDemo,
  argTypes: {
    label:    { control: 'text', description: 'Beschriftung über dem Feld; per `for` mit dem Select verknüpft', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    state:    { control: 'inline-radio', options: ['default', 'error', 'ok', 'warn'], description: 'Rückmeldung: Rahmen und Hilfetext in Rot, Grün oder Amber; `error` setzt zusätzlich `aria-invalid`', table: { type: { summary: "'default' | 'error' | 'ok' | 'warn'" }, defaultValue: { summary: "'default'" } } },
    density:  { control: 'inline-radio', options: ['default', 'compact'], description: 'Feldhöhe: 44 px oder 36 px', table: { type: { summary: "'default' | 'compact'" }, defaultValue: { summary: "'default'" } } },
    disabled: { control: 'boolean', description: 'Sperrt das Feld: gedämpfte Schrift, Cursor `not-allowed`', table: { defaultValue: { summary: 'false' } } },
    required: { control: 'boolean', description: 'Pflichtfeld: Sternchen am Label und `required` am Select', table: { defaultValue: { summary: 'false' } } },
    help:     { control: 'text', description: 'Hinweis- oder Fehlertext unter dem Feld; wird per `aria-describedby` verknüpft', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    options:  { control: false, description: 'Auswahlliste; `disabled` sperrt einzelne Einträge (React alternativ mit `<option>`-Kindern)', table: { type: { summary: '{ value: string; label: string; disabled?: boolean }[]' } } },
    value:    { control: false, description: 'Gewählter Wert (Svelte: `bind:value`)', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    id:       { control: false, description: 'Eigene id; sonst wird eine erzeugt', table: { type: { summary: 'string' } } },
    name:     { control: false, description: 'Name für Formular-Übermittlung', table: { type: { summary: 'string' } } },
    onchange: { control: false, description: 'Wird bei Änderung der Auswahl aufgerufen', table: { type: { summary: '(e: Event) => void' } } },
  },
  args: { label: 'Turniermodus', state: 'default', density: 'default', disabled: false, required: false, help: '' },
};

export const Standard = {};
export const Pflichtfeld = { args: { required: true } };
export const Kompakt = { args: { density: 'compact' } };
export const Fehler = { args: { state: 'error', help: 'Bitte einen Modus wählen.' } };
export const Deaktiviert = { args: { disabled: true } };

// Beispiele für die Doku-Seite (Select.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: SelectExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Varianten = { ...example('varianten'), tags: ['!dev'] };
export const Zustaende = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story.
export const DoLabel      = { ...example('do-label'), tags: ['!dev'] };
export const DontLabel    = { ...example('dont-label'), tags: ['!dev'] };
export const DoFehler     = { ...example('do-fehler'), tags: ['!dev'] };
export const DontFehler   = { ...example('dont-fehler'), tags: ['!dev'] };
export const DoDichte     = { ...example('do-dichte'), tags: ['!dev'] };
export const DontDichte   = { ...example('dont-dichte'), tags: ['!dev'] };
export const DoGesperrt   = { ...example('do-gesperrt'), tags: ['!dev'] };
export const DontGesperrt = { ...example('dont-gesperrt'), tags: ['!dev'] };
