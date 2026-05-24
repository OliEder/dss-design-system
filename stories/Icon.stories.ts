import IconDemo from './components/IconDemo.svelte';
import { ICON_NAMES } from '../svelte/Icon.svelte';

export default {
  title: 'Components/Icon',
  component: IconDemo,
  tags: ['autodocs'],
  argTypes: {
    view: { control: 'inline-radio', options: ['single', 'sizes', 'tint', 'actions', 'all'] },
    name: { control: 'select', options: ICON_NAMES },
    size: { control: { type: 'range', min: 12, max: 96, step: 2 } },
  },
  args: { view: 'single', name: 'whistle', size: 32 },
};

export const Standard         = {};
export const Groessen         = { args: { view: 'sizes' } };
export const CurrentColorTint = { args: { view: 'tint' } };
export const Spielaktionen    = { args: { view: 'actions' } };
export const AlleFamilien     = { args: { view: 'all' } };
