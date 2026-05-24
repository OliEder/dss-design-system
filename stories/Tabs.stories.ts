import TabsDemo from './components/TabsDemo.svelte';

export default {
  title: 'Components/Tabs',
  component: TabsDemo,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['underline', 'segmented', 'pills', 'vertical'] },
    size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    preset:  { control: 'select', options: ['page', 'density', 'quarters', 'filters', 'settings'] },
    multi:   { control: 'boolean' },
    sidebar: { control: 'boolean' },
  },
  args: { variant: 'underline', size: 'md', preset: 'page', value: 'overview' },
};

export const UnderlineSeitenTabs = { args: { variant: 'underline', preset: 'page', value: 'overview' } };
export const SegmentedDichte     = { args: { variant: 'segmented', preset: 'density', value: 'default' } };
export const SegmentedViertel    = { args: { variant: 'segmented', size: 'lg', preset: 'quarters', value: 'q2' } };
export const PillsFilterStrip    = { args: { variant: 'pills', preset: 'filters', multi: true, activeIds: ['a', 'c'] } };
export const VerticalSidebar     = { args: { variant: 'vertical', preset: 'settings', value: 'team', sidebar: true } };
