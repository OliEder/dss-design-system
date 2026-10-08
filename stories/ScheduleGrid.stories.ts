import ScheduleDemo from './components/ScheduleDemo.svelte';

export default {
  title: 'Components/ScheduleGrid',
  component: ScheduleDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Zeitraster** für Turnier-Tagespläne und Hallenbelegung: Anwurfzeiten als Zeilen, Hallen oder Felder als Spalten.

- Empfohlen: **höchstens drei Spalten** je Raster; darüber teilt die Anwendung auf (ein Raster je Hallen-Gruppe). Als Sicherung scrollt der Rahmen seitlich, die Zeitspalte bleibt stehen.
- \`column\` jedes Spiels muss zu einer Spalten-\`id\` passen, sonst erscheint das Spiel nicht.
- Pausen und Sperrzeiten über \`breaks\`, Freilos über ein Spiel mit \`state: 'bye'\`.
- Unter 640 px wird jede Anwurfzeit ein Block mit der Spalten-Beschriftung als Überschrift.
        `.trim(),
      },
    },
  },
  args: { preset: 'raster' },
};

export const Zeitraster = { args: { preset: 'raster' } };
export const Kompakt = { args: { preset: 'raster', density: 'compact' } };
