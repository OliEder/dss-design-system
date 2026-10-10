import Live from './Live.svelte';

export default {
  // Die Seite ist die MDX-Seite; die Story ist darin eingebettet
  tags: ['!dev'],
  title: 'Foundation/Live',
  component: Live,
  parameters: { layout: 'padded' },
};

export const Alle = {};

// Zeitraster-Zelle in Mindestbreite: Live ohne Stand, das Tag steht hinter der Paarung
export const OhneStand = { render: () => ({ Component: Live, props: { mode: 'ohne-stand' } }) };
