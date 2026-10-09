import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Introduction from './Introduction.svelte';

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  // Die Einführung ist die MDX-Seite; die Kachelreihe ist darin eingebettet
  tags: ['!dev'],
  parameters: { layout: 'padded' },
};
export default meta;

export const Welcome: StoryObj<typeof Introduction> = {};
