import CardLibraryDemo from './components/CardLibraryDemo.svelte';

export default {
  title: 'Components/Card Library',
  component: CardLibraryDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Domänen-spezifische Karten** — der Card-Container (\`Components/Card\`) ist die
generische Basis. Diese Komponenten sind darauf aufgebaute, fertige Patterns:

- **MatchCard** — Spiel-Karte in 3 Zuständen: \`scheduled\` · \`live\` · \`finished\`.
  Heim/Gast-Punkte, Liga-Tag, Halle, Live-Pulse, Endstand-Styling.
- **PlayerCard** — Spieler in 3 Maßstäben: \`compact\` (Roster-Row) · \`standard\` (Übersicht mit 4 Vitals) · \`hero\` (Dark-Profile).
- **EmptyState** — 3 Tonalitäten: \`neutral\` · \`action\` (Amber) · \`error\` (Rot). Immer mit nächstem Schritt.
- **Skeleton** — Shimmer-Placeholder für Loading-States. Primitives (\`line\` · \`block\` · \`circle\`) und vorgefertigte Patterns (\`row\` · \`match\`).
        `.trim(),
      },
    },
  },
  argTypes: {
    view: { control: 'inline-radio', options: ['match', 'player', 'empty', 'skeleton'] },
  },
  args: { view: 'match' },
};

export const MatchCards    = { args: { view: 'match' } };
export const PlayerCards   = { args: { view: 'player' } };
export const EmptyStates   = { args: { view: 'empty' } };
export const Skeletons     = { args: { view: 'skeleton' } };
