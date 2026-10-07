import CourtLinesDemo from './components/CourtLinesDemo.svelte';

export default {
  title: 'Components/CourtLines',
  component: CourtLinesDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Spielfeldlinien (FIBA 28 × 15 m) als dezenter Seitenhintergrund, aus dem Vereinsregister übernommen. Reine CSS-Maske über `--dss-line`, dark-sicher, auf dem Handy als Hochformat. Seiteninhalt braucht `position: relative; z-index: 1`.',
      },
    },
  },
};

export const Standard = {};
