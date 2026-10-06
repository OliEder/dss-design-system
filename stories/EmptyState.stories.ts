import EmptyStateDemo from './components/EmptyStateDemo.svelte';

export default {
  title: 'Components/EmptyState',
  component: EmptyStateDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**EmptyState** — Leer-, Hinweis- und Fehlerzustände mit klarem nächsten Schritt.

- **neutral** — keine Daten / Erstnutzung
- **action** — etwas fehlt, die Nutzerin kann es beheben (Amber)
- **error** — Laden fehlgeschlagen, Wiederholen möglich (Rot)
        `.trim(),
      },
    },
  },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'action', 'error'] } },
  args: { tone: 'neutral' },
};

export const Neutral = { args: { tone: 'neutral' } };
export const Action = { args: { tone: 'action' } };
export const Error = { args: { tone: 'error' } };
