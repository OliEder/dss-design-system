import Colors from './Colors.svelte';

export default {
  title: 'Foundation/Colors',
  component: Colors,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['hues', 'semantic'] },
  },
};

export const HueRamps = { args: { mode: 'hues' } };
export const SemanticTokens = { args: { mode: 'semantic' } };
