import SelectDemo from './components/SelectDemo.svelte';

export default {
  title: 'Components/Select',
  component: SelectDemo,
  tags: ['autodocs'],
  argTypes: {
    state:    { control: 'inline-radio', options: ['default', 'error', 'ok', 'warn'] },
    density:  { control: 'inline-radio', options: ['default', 'compact'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label:    { control: 'text' },
    help:     { control: 'text' },
  },
  args: { label: 'Turniermodus', state: 'default', density: 'default', disabled: false, required: false, help: '' },
};

export const Standard = {};
export const Pflichtfeld = { args: { required: true } };
export const Kompakt = { args: { density: 'compact' } };
export const Fehler = { args: { state: 'error', help: 'Bitte einen Modus wählen.' } };
export const Deaktiviert = { args: { disabled: true } };
