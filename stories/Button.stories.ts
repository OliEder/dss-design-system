import ButtonDemo from './components/ButtonDemo.svelte';
import ButtonExamples from './components/ButtonExamples.svelte';

export default {
  title: 'Components/Button',
  component: ButtonDemo,
  argTypes: {
    view:    { control: 'inline-radio', options: ['single', 'variants', 'sizes', 'disabled'], description: 'Demo-Ansicht (nur Storybook)', table: { disable: true } },
    variant: { control: 'select', options: ['primary', 'amber', 'secondary', 'danger', 'ghost'], description: 'Visueller Ton', table: { defaultValue: { summary: "'primary'" } } },
    size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Höhenstufe', table: { defaultValue: { summary: "'md'" } } },
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

export const Anatomie   = example('anatomie');
export const Hierarchie = example('hierarchie');
export const Groessen   = example('groessen');
export const Zustaende  = example('zustaende');

// Dos und Don'ts: nur in der Doku, nicht in der Seitenleiste
const hidden = (name: string) => example(name, { tags: ['!dev'] });
export const DoHaupt    = hidden('do-haupt');
export const DontHaupt  = hidden('dont-haupt');
export const DoVerb     = hidden('do-verb');
export const DontVerb   = hidden('dont-verb');
export const DoDanger   = hidden('do-danger');
export const DontDanger = hidden('dont-danger');
export const DoTouch    = hidden('do-touch');
export const DontTouch  = hidden('dont-touch');
export const DoGrund    = hidden('do-grund');
export const DontGrund  = hidden('dont-grund');
