import ButtonDemo from './components/ButtonDemo.svelte';
import ButtonExamples from './components/ButtonExamples.svelte';

export default {
  title: 'Components/Button',
  component: ButtonDemo,
  argTypes: {
    view:    { control: 'inline-radio', options: ['single', 'variants', 'sizes', 'disabled'], description: 'Demo-Ansicht (nur Storybook)', table: { disable: true } },
    variant: { control: 'select', options: ['primary', 'amber', 'secondary', 'danger', 'ghost'], description: 'Visueller Ton', table: { type: { summary: "'primary' | 'amber' | 'secondary' | 'danger' | 'ghost'" }, defaultValue: { summary: "'primary'" } } },
    size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Höhenstufe', table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: "'md'" } } },
    touch:   { control: 'boolean', description: 'Erzwingt 64 px Hallen-Touch-Modus', table: { defaultValue: { summary: 'false' } } },
    disabled:{ control: 'boolean', description: 'Schaltet die Interaktion ab', table: { defaultValue: { summary: 'false' } } },
    label:   { control: 'text', description: 'Beschriftung (nur Storybook, in der App ist es der Inhalt)', table: { disable: true } },
  },
  args: { view: 'single', variant: 'primary', size: 'md', touch: false, disabled: false, label: 'Spielbericht freigeben' },
};

export const Primary       = { args: { variant: 'primary',   label: 'Spielbericht freigeben' } };
export const Amber         = { args: { variant: 'amber',     label: 'Live-Scoring starten' } };
export const Secondary     = { args: { variant: 'secondary', label: 'Abbrechen' } };
export const Danger        = { args: { variant: 'danger',    label: 'Spiel verwerfen' } };
export const Ghost         = { args: { variant: 'ghost',     label: 'Mehr Optionen' } };
export const HallenTouch   = { args: { variant: 'amber', touch: true, label: '2-Punkte buchen' } };
export const AlleVarianten = { args: { view: 'variants' } };
export const AlleGroessen  = { args: { view: 'sizes' } };
export const Disabled      = { args: { view: 'disabled' } };

// Beispiele für die Doku-Seite (Button.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string, extra: Record<string, unknown> = {}) => ({
  ...extra,
  render: () => ({ Component: ButtonExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Anatomie   = { ...example('anatomie'), tags: ['!dev'] };
export const Hierarchie = { ...example('hierarchie'), tags: ['!dev'] };
export const Groessen   = { ...example('groessen'), tags: ['!dev'] };
export const Zustaende  = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku, nicht in der Seitenleiste. Der Tag steht als Literal an jeder Story
// (Storybooks Indexer liest Tags nur aus Objektliteralen, nicht aus dem Rückgabewert einer Funktion).
export const DoHaupt    = { ...example('do-haupt'), tags: ['!dev'] };
export const DontHaupt  = { ...example('dont-haupt'), tags: ['!dev'] };
export const DoVerb     = { ...example('do-verb'), tags: ['!dev'] };
export const DontVerb   = { ...example('dont-verb'), tags: ['!dev'] };
export const DoDanger   = { ...example('do-danger'), tags: ['!dev'] };
export const DontDanger = { ...example('dont-danger'), tags: ['!dev'] };
export const DoTouch    = { ...example('do-touch'), tags: ['!dev'] };
export const DontTouch  = { ...example('dont-touch'), tags: ['!dev'] };
export const DoGrund    = { ...example('do-grund'), tags: ['!dev'] };
export const DontGrund  = { ...example('dont-grund'), tags: ['!dev'] };
