import Headings from './Headings.svelte';

export default {
  // Die Seite ist die MDX-Seite; die Beispiele sind darin eingebettet und stehen nicht in der Seitenleiste
  tags: ['!dev'],
  title: 'Foundation/Headings',
  component: Headings,
  parameters: { layout: 'padded' },
};

const example = (mode: string) => ({ render: () => ({ Component: Headings, props: { mode } }) });

export const Seite = example('seite');
export const Rangfolge = example('rangfolge');
export const Tokens = example('tokens');

export const DoEbenen = example('do-ebenen');
export const DontEbenen = example('dont-ebenen');
export const DoGroesse = example('do-groesse');
export const DontGroesse = example('dont-groesse');
export const DoH1 = example('do-h1');
export const DontH1 = example('dont-h1');
