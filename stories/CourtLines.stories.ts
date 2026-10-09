import CourtLinesDemo from './components/CourtLinesDemo.svelte';
import CourtLinesExamples from './components/CourtLinesExamples.svelte';

export default {
  title: 'Components/CourtLines',
  component: CourtLinesDemo,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['fixed', 'absolute'],
      description: '`fixed` füllt den Viewport, `absolute` den nächsten positionierten Container',
      table: { type: { summary: "'fixed' | 'absolute'" }, defaultValue: { summary: "'fixed'" } },
    },
  },
  args: { position: 'absolute' },
};

export const Standard = {};

// Beispiele für die Doku-Seite (CourtLines.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: CourtLinesExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story.
export const DoInhalt    = { ...example('do-inhalt'), tags: ['!dev'] };
export const DontInhalt  = { ...example('dont-inhalt'), tags: ['!dev'] };
export const DoDezent    = { ...example('do-dezent'), tags: ['!dev'] };
export const DontDezent  = { ...example('dont-dezent'), tags: ['!dev'] };
export const DoRahmen    = { ...example('do-rahmen'), tags: ['!dev'] };
export const DontRahmen  = { ...example('dont-rahmen'), tags: ['!dev'] };
