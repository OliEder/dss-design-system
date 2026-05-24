import type { Meta, StoryObj } from '@storybook/sveltekit';
import Introduction from './Introduction.svelte';

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# DSS Design System

Komponenten-Bibliothek für den **Digitalen Spielbericht** des Bayerischen Basketball Verbands
und Schwester-Apps (Scoreboard, Vereinsregister, Live-Scoring).

- **Identität:** Standalone (Ink · Amber · Sky), 1-Hue-Swap auf DBB-Kompat.
- **A11y:** WCAG 2.1 AAA für alle Text-Paare validiert.
- **Touch:** 44 / 56 / 64 px Stufung — bis Hallen-Tisch-Bedienung.
- **Tokens:** \`tokens.css\` · \`tokens.json\` · \`tailwind.preset.js\`.
- **Komponenten:** Button · TextInput · Modal · Card · Tabs · Icon (54 Glyphen).

Siehe \`CHANGELOG.md\` für den Pack-Stand (aktuell **v0.6 · App-Shell-Pack**).
`,
      },
    },
  },
};
export default meta;

export const Welcome: StoryObj<typeof Introduction> = {};
