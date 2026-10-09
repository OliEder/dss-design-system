import NavigationDemo from './components/NavigationDemo.svelte';
import NavigationExamples from './components/NavigationExamples.svelte';

export default {
  title: 'Components/Navigation',
  component: NavigationDemo,
  argTypes: {
    view: { control: 'inline-radio', options: ['topbar', 'bottomnav', 'breadcrumbs', 'stepper', 'all'], description: 'Nur Demo: welche Komponenten gezeigt werden. Die Props der Komponenten stehen in den Tabellen im Abschnitt „Verwendung“', table: { type: { summary: "'topbar' | 'bottomnav' | 'breadcrumbs' | 'stepper' | 'all'" }, defaultValue: { summary: "'topbar'" } } },
  },
  args: { view: 'topbar' },
};

export const TopBarLiveAdmin    = { args: { view: 'topbar' } };
export const BottomNavMobil     = { args: { view: 'bottomnav' } };
export const BreadcrumbsDreiArt = { args: { view: 'breadcrumbs' } };
export const StepperSetupFlows  = { args: { view: 'stepper' } };
export const AlleZusammen       = { args: { view: 'all' } };

// Beispiele für die Doku-Seite (Navigation.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: NavigationExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const TopBarKontexte  = { ...example('topbar'), tags: ['!dev'] };
export const TopBarEigene    = { ...example('topbar-eigene'), tags: ['!dev'] };
export const BottomNavBeispiele = { ...example('bottomnav'), tags: ['!dev'] };
export const BreadcrumbsArten = { ...example('breadcrumbs'), tags: ['!dev'] };
export const StepperLayouts  = { ...example('stepper'), tags: ['!dev'] };
export const StepperKlickbar = { ...example('stepper-klickbar'), tags: ['!dev'] };
export const Zustaende       = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story (der Indexer liest keine Funktionsrückgaben).
export const DoBottomNav   = { ...example('do-bottomnav'), tags: ['!dev'] };
export const DontBottomNav = { ...example('dont-bottomnav'), tags: ['!dev'] };
export const DoPfad        = { ...example('do-pfad'), tags: ['!dev'] };
export const DontPfad      = { ...example('dont-pfad'), tags: ['!dev'] };
export const DoStepper     = { ...example('do-stepper'), tags: ['!dev'] };
export const DontStepper   = { ...example('dont-stepper'), tags: ['!dev'] };
export const DoLive        = { ...example('do-live'), tags: ['!dev'] };
export const DontLive      = { ...example('dont-live'), tags: ['!dev'] };
