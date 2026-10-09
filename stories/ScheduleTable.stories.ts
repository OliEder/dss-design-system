import ScheduleDemo from './components/ScheduleDemo.svelte';

export default {
  title: 'Components/ScheduleTable',
  component: ScheduleDemo,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    preset: { control: 'inline-radio', options: ['mannschaft', 'liga', 'turnier'] },
    density: { control: 'inline-radio', options: ['auto', 'touch', 'default', 'compact'] },
  },
  args: { preset: 'mannschaft', density: 'auto' },
};

export const Mannschaft = { args: { preset: 'mannschaft' } };
export const LigaUndHalle = { args: { preset: 'liga' } };
export const Turnier = { args: { preset: 'turnier' } };
