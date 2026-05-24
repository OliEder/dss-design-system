import TablesDemo from './components/TablesDemo.svelte';

export default {
  title: 'Components/Table',
  component: TablesDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Data-Table** für den Digitalen Spielbericht und alle Schwester-Apps.

- 4 Density-Stufen: **touch (60 px)** · default (48 px) · compact (40 px) · dense (32 px).
- Light- und Dark-Surface (Kampfgericht-Tisch).
- Sticky Header, sortierbare Spalten, optionales Striping, \`tfoot\`-Totalzeile.
- Helper-Klassen für Basketball-spezifische Zellen: \`.dss-tn\` (Trikot-Badge), \`.dss-pos\` (Position), \`.dss-player\` (Namen-Layout), \`.dss-pill-s\` (Status-Chips).

Stories zeigen die wichtigsten Einsätze: **Team Roster** (Touch-Setup am Tisch), **Boxscore Light/Dark** (Live-Statistik), **Crew** (Schiri-Setup) und **Density-Vergleich**.
        `.trim(),
      },
    },
  },
  argTypes: {
    preset:  { control: 'inline-radio', options: ['boxscore', 'roster', 'crew', 'density'] },
    density: { control: 'inline-radio', options: ['touch', 'default', 'compact', 'dense'] },
    dark:    { control: 'boolean' },
  },
  args: { preset: 'boxscore', density: 'compact', dark: false },
};

export const BoxscoreLight = { args: { preset: 'boxscore', density: 'compact', dark: false } };
export const BoxscoreDarkKampfgericht = { args: { preset: 'boxscore', density: 'compact', dark: true } };
export const TeamRosterTouch = { args: { preset: 'roster' } };
export const KampfgerichtCrew = { args: { preset: 'crew' } };
export const DensityVergleich = { args: { preset: 'density' } };
