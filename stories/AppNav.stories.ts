import AppNavDemo from './components/AppNavDemo.svelte';

export default {
  title: 'Components/AppNav',
  component: AppNavDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**AppNav** — Hauptnavigation mit Gruppen-Dropdowns (Disclosure), gesperrten Einträgen und mobilem Hamburger-Menü (< 720 px).

- Aktiver Link über \`currentHref\` → \`aria-current="page"\`.
- Gesperrte Einträge sind nicht fokussierbar und tragen einen Hinweis.
- Esc und Klick außerhalb schließen, der Fokus kehrt zum Auslöser zurück.
- Vanilla-Variante: Markup-Vertrag und \`js/appnav.js\` (siehe README).
        `.trim(),
      },
    },
  },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark'] } },
  args: { tone: 'light', currentHref: '/ergebnisse' },
};

export const Hell = { args: { tone: 'light' } };
export const Dunkel = { args: { tone: 'dark' } };
