import Typography from './Typography.svelte';

export default {
  // Die Seite ist die MDX-Seite; die Stories sind darin eingebettet
  tags: ['!dev'],
  title: 'Foundation/Typography',
  component: Typography,
  parameters: { layout: 'padded' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['scale', 'families', 'numbers', 'context', 'audit'], description: 'Anzeige: Skala, Familien, Zahlen, Einsatz oder Audit' },
  },
};

export const Scale = { args: { mode: 'scale' } };
export const FamiliesAndWeights = { args: { mode: 'families' } };
export const NumbersAndMono = { args: { mode: 'numbers' } };
export const InContext = { args: { mode: 'context' } };
export const Audit = { args: { mode: 'audit' } };
