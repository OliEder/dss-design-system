import CheckboxDemo from './components/CheckboxDemo.svelte';

export default {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Natives Kontrollkästchen im DSS-Look. Die gesamte Label-Fläche ist klickbar (≥ 44 px). Optionaler Hinweistext wird per `aria-describedby` verknüpft.',
      },
    },
  },
  argTypes: { density: { control: 'inline-radio', options: ['default', 'compact'] }, disabled: { control: 'boolean' } },
  args: { density: 'default', disabled: false },
};

export const Default = {};
export const Kompakt = { args: { density: 'compact' } };
export const Deaktiviert = { args: { disabled: true } };
