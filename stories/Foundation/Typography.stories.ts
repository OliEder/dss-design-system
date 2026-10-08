import Typography from './Typography.svelte';

export default {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['scale', 'families', 'numbers', 'context', 'audit'] },
  },
};

export const Scale = { args: { mode: 'scale' } };
export const FamiliesAndWeights = { args: { mode: 'families' } };
export const NumbersAndMono = { args: { mode: 'numbers' } };
export const InContext = { args: { mode: 'context' } };
export const Audit = { args: { mode: 'audit' } };
