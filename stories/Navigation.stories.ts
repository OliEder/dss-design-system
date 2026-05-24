import NavigationDemo from './components/NavigationDemo.svelte';

export default {
  title: 'Components/Navigation',
  component: NavigationDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**App-Shell-Navigation** — alle Navigationskomponenten außer Tabs.

- **TopBar** — Dunkle App-Top-Bar (56 px). 3 Kontexte: Default · Live (mit Spielstand + Uhr) · Admin.
- **BottomNav** — Mobile Bottom-Navigation für Schiri-App / Coach-App. 4–5 Items, optional FAB für die zentrale Aktion.
- **Breadcrumbs** — Drei Varianten: Plain (Page-Header), Tagged (mit Kontext-Labels) und Chip (mobile-friendly).
- **Stepper** — Setup-Flows in drei Layouts: Horizontal · Compact (Sticky-Header) · Vertikal (Sidebar-Wizard).

Tabs als 4. Navigations-Family liegen weiterhin unter \`Components/Tabs\`.
        `.trim(),
      },
    },
  },
  argTypes: {
    view: { control: 'inline-radio', options: ['topbar', 'bottomnav', 'breadcrumbs', 'stepper', 'all'] },
  },
  args: { view: 'topbar' },
};

export const TopBarLiveAdmin    = { args: { view: 'topbar' } };
export const BottomNavMobil     = { args: { view: 'bottomnav' } };
export const BreadcrumbsDreiArt = { args: { view: 'breadcrumbs' } };
export const StepperSetupFlows  = { args: { view: 'stepper' } };
export const AlleZusammen       = { args: { view: 'all' } };
