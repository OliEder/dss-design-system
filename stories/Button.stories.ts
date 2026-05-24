import ButtonDemo from './components/ButtonDemo.svelte';

export default {
  title: 'Components/Button',
  component: ButtonDemo,
  tags: ['autodocs'],
  argTypes: {
    view:    { control: 'inline-radio', options: ['single', 'variants', 'sizes', 'disabled'] },
    variant: { control: 'select', options: ['primary', 'amber', 'secondary', 'danger', 'ghost'] },
    size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    touch:   { control: 'boolean' },
    disabled:{ control: 'boolean' },
    label:   { control: 'text' },
  },
  args: { view: 'single', variant: 'primary', size: 'md', touch: false, disabled: false, label: 'Spielbericht freigeben' },
};

export const Primary       = { args: { variant: 'primary',   label: 'Spielbericht freigeben' } };
export const Amber         = { args: { variant: 'amber',     label: 'Live-Scoring starten' } };
export const Secondary     = { args: { variant: 'secondary', label: 'Abbrechen' } };
export const Danger        = { args: { variant: 'danger',    label: 'Spiel verwerfen' } };
export const Ghost         = { args: { variant: 'ghost',     label: 'Mehr Optionen' } };
export const HallenTouch   = { args: { variant: 'amber', touch: true, label: '2-Punkte buchen' } };
export const AlleVarianten = { args: { view: 'variants' } };
export const AlleGroessen  = { args: { view: 'sizes' } };
export const Disabled      = { args: { view: 'disabled' } };
