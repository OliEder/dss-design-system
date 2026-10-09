import IconDemo from './components/IconDemo.svelte';
import IconExamples from './components/IconExamples.svelte';
import { ICON_NAMES } from '../svelte/Icon.svelte';

export default {
  title: 'Components/Icon',
  component: IconDemo,
  argTypes: {
    name:  { control: 'select', options: ICON_NAMES, description: 'ID des Symbols im Sprite, ohne das Präfix `i-`', table: { type: { summary: 'IconName' } } },
    size:  { control: { type: 'range', min: 12, max: 96, step: 2 }, description: 'Breite und Höhe in Pixeln (Zahl) oder als CSS-Länge (Text)', table: { type: { summary: 'number | string' }, defaultValue: { summary: '24' } } },
    title: { control: 'text', description: 'Beschriftung. Mit `title` ist das Icon ein Bild (`role="img"`, `aria-label`), ohne ist es dekorativ (`aria-hidden`)', table: { type: { summary: 'string' } } },
  },
  args: { name: 'whistle', size: 32, title: '' },
};

export const Standard = {};

// Beispiele für die Doku-Seite (Icon.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: IconExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const AlleFamilien = { ...example('galerie'), tags: ['!dev'], parameters: { controls: { disable: true }, layout: 'fullscreen' } };

export const Groessen          = { ...example('groessen'), parameters: { controls: { disable: true }, layout: 'fullscreen' }, tags: ['!dev'] };
export const Farbe             = { ...example('farbe'), tags: ['!dev'] };
export const Barrierefreiheit  = { ...example('barrierefreiheit'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story.
export const DoBeschriftung    = { ...example('do-beschriftung'), tags: ['!dev'] };
export const DontBeschriftung  = { ...example('dont-beschriftung'), tags: ['!dev'] };
export const DoGroesse         = { ...example('do-groesse'), tags: ['!dev'] };
export const DontGroesse       = { ...example('dont-groesse'), tags: ['!dev'] };
export const DoFarbe           = { ...example('do-farbe'), tags: ['!dev'] };
export const DontFarbe         = { ...example('dont-farbe'), tags: ['!dev'] };
export const DoCurrentcolor    = { ...example('do-currentcolor'), tags: ['!dev'] };
export const DontCurrentcolor  = { ...example('dont-currentcolor'), tags: ['!dev'] };
