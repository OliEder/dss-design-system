import ScheduleDemo from './components/ScheduleDemo.svelte';

export default {
  title: 'Components/Spielplan/Zeitraster',
  component: ScheduleDemo,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    density: { control: 'inline-radio', options: ['default', 'compact', 'touch'] },
  },
  args: { preset: 'raster', density: 'default' },
};

export const Zeitraster = { args: { preset: 'raster' } };
export const Kompakt = { args: { preset: 'raster', density: 'compact' } };
