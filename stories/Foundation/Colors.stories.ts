import Colors from './Colors.svelte';

export default {
  // Die Seite ist die MDX-Seite; die Stories sind darin eingebettet
  tags: ['!dev'],
  title: 'Foundation/Colors',
  component: Colors,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['hues', 'roles', 'semantic'], description: 'Anzeige: Farbfamilien, Rollen-Tokens oder semantische Farben' },
  },
};

export const HueRamps = { args: { mode: 'hues' } };
export const Roles = { args: { mode: 'roles' } };
export const SemanticTokens = { args: { mode: 'semantic' } };
