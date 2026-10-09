import CardDemo from './components/CardDemo.svelte';
import CardExamples from './components/CardExamples.svelte';

export default {
  title: 'Components/Card',
  component: CardDemo,
  argTypes: {
    view:    { control: 'inline-radio', options: ['single', 'headerFooter', 'all'], description: 'Nur Demo: eine Karte, eine Karte mit Kopf und Fuß oder alle vier Varianten', table: { type: { summary: "'single' | 'headerFooter' | 'all'" }, defaultValue: { summary: "'single'" } } },
    variant: { control: 'inline-radio', options: ['default', 'elevated', 'flat', 'hoverable'], description: 'Aussehen: `default` mit Rand, `elevated` mit Schatten statt Rand, `flat` auf Fläche 2 ohne Rand, `hoverable` klickbar mit Zeiger und Lift', table: { type: { summary: "'default' | 'elevated' | 'flat' | 'hoverable'" }, defaultValue: { summary: "'default'" } } },
    padding: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Innenabstand des Inhalts (nicht des Kopfes): 12/14, 18/20 oder 24/28 px', table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: "'md'" } } },
  },
  args: { view: 'single', variant: 'default', padding: 'md' },
};

export const Default      = { args: { variant: 'default'   } };
export const Elevated     = { args: { variant: 'elevated'  } };
export const Flat         = { args: { variant: 'flat'      } };
export const Hoverable    = { args: { variant: 'hoverable' } };
export const MitHeaderFooter = { args: { view: 'headerFooter' } };
export const AlleVarianten   = { args: { view: 'all' } };

// Beispiele für die Doku-Seite (Card.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: CardExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Varianten = { ...example('varianten'), tags: ['!dev'] };
export const KopfFuss  = { ...example('kopf-fuss'), tags: ['!dev'] };
export const Abstand   = { ...example('abstand'), tags: ['!dev'] };
export const Klickbar  = { ...example('klickbar'), tags: ['!dev'] };
export const Zustaende = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story (der Indexer liest keine Funktionsrückgaben).
export const DoKlick      = { ...example('do-klick'), tags: ['!dev'] };
export const DontKlick    = { ...example('dont-klick'), tags: ['!dev'] };
export const DoZiel       = { ...example('do-ziel'), tags: ['!dev'] };
export const DontZiel     = { ...example('dont-ziel'), tags: ['!dev'] };
export const DoHoehe      = { ...example('do-hoehe'), tags: ['!dev'] };
export const DontHoehe    = { ...example('dont-hoehe'), tags: ['!dev'] };
export const DoFlat       = { ...example('do-flat'), tags: ['!dev'] };
export const DontFlat     = { ...example('dont-flat'), tags: ['!dev'] };
