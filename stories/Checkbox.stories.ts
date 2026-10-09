import CheckboxDemo from './components/CheckboxDemo.svelte';
import CheckboxExamples from './components/CheckboxExamples.svelte';

export default {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  argTypes: {
    density:  { control: 'inline-radio', options: ['default', 'compact'], description: 'Mindesthöhe der Klickfläche: 44 px oder 36 px', table: { type: { summary: "'default' | 'compact'" }, defaultValue: { summary: "'default'" } } },
    disabled: { control: 'boolean', description: 'Sperrt das Kontrollkästchen: 50 % Opacity, Cursor `not-allowed`', table: { defaultValue: { summary: 'false' } } },
    label:    { control: false, description: 'Beschriftung (Pflicht); die ganze Label-Fläche ist klickbar', table: { type: { summary: 'string' } } },
    hint:     { control: false, description: 'Erklärender Zusatztext unter dem Label; wird per `aria-describedby` verknüpft', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    checked:  { control: false, description: 'Angekreuzt (Svelte: `bind:checked`, React: `checked` und `onChange`)', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } } },
    id:       { control: false, description: 'Eigene id; sonst wird eine erzeugt', table: { type: { summary: 'string' } } },
    name:     { control: false, description: 'Name für Formular-Übermittlung', table: { type: { summary: 'string' } } },
    onchange: { control: false, description: 'Wird bei Änderung aufgerufen (Svelte: mit dem neuen Wert)', table: { type: { summary: '(checked: boolean) => void' } } },
  },
  args: { density: 'default', disabled: false },
};

export const Default = {};
export const Kompakt = { args: { density: 'compact' } };
export const Deaktiviert = { args: { disabled: true } };

// Beispiele für die Doku-Seite (Checkbox.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: CheckboxExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Anatomie  = { ...example('anatomie'), tags: ['!dev'] };
export const Dichten   = { ...example('dichten'), tags: ['!dev'] };
export const Zustaende = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story.
export const DoLabel      = { ...example('do-label'), tags: ['!dev'] };
export const DontLabel    = { ...example('dont-label'), tags: ['!dev'] };
export const DoHint       = { ...example('do-hint'), tags: ['!dev'] };
export const DontHint     = { ...example('dont-hint'), tags: ['!dev'] };
export const DoDichte     = { ...example('do-dichte'), tags: ['!dev'] };
export const DontDichte   = { ...example('dont-dichte'), tags: ['!dev'] };
export const DoGesperrt   = { ...example('do-gesperrt'), tags: ['!dev'] };
export const DontGesperrt = { ...example('dont-gesperrt'), tags: ['!dev'] };
