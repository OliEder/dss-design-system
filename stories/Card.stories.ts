import CardDemo from './components/CardDemo.svelte';

export default {
  title: 'Components/Card',
  component: CardDemo,
  tags: ['autodocs'],
  argTypes: {
    view:    { control: 'inline-radio', options: ['single', 'headerFooter', 'all'] },
    variant: { control: 'inline-radio', options: ['default', 'elevated', 'flat', 'hoverable'] },
    padding: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: { view: 'single', variant: 'default', padding: 'md' },
};

export const Default      = { args: { variant: 'default'   } };
export const Elevated     = { args: { variant: 'elevated'  } };
export const Flat         = { args: { variant: 'flat'      } };
export const Hoverable    = { args: { variant: 'hoverable' } };
export const MitHeaderFooter = { args: { view: 'headerFooter' } };
export const AlleVarianten   = { args: { view: 'all' } };
