import SpielplanExamples from './components/SpielplanExamples.svelte';

// Beispiele für die Doku-Seite (Spielplan.mdx). Nicht in der Seitenleiste: tags auf Meta-Ebene gelten für alle Stories.
export default {
  title: 'Components/Spielplan',
  component: SpielplanExamples,
  tags: ['!dev'],
  parameters: { controls: { disable: true }, layout: 'padded' },
};

const example = (name: string) => ({ render: () => ({ Component: SpielplanExamples, props: { example: name } }) });

export const MiniLiga = example('mini-liga');
