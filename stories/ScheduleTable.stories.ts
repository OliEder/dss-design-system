import ScheduleDemo from './components/ScheduleDemo.svelte';

export default {
  title: 'Components/ScheduleTable',
  component: ScheduleDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Spielplan als Tabelle.** Eine Zeile pro Spiel, nach Spieltag oder Runde gruppiert.

- \`layout="versus"\` (Standard): „Heim – Gast“ in einer Zelle, Liga als Unterzeile, Ergebnis rechts.
- \`layout="opponent"\`: Perspektive einer Mannschaft mit Chip **vs.**/**@**, Logo, Gegner, S/N-Chip, Ergebnis *eigene : Gegner*.
- \`layout="columns"\`: Turnier-Ansicht mit Nr, Zeit, Feld, Heim, Ergebnis, Gast; Snippets \`time\` und \`notice\`.
- Zustände: geplant, live (grüner Puls hinter der Uhrzeit), beendet, abgesagt, verlegt, Freilos; vorläufige Ergebnisse.
- Unter 640 px wird jede Zeile zur Karte.
        `.trim(),
      },
    },
  },
  argTypes: {
    preset: { control: 'inline-radio', options: ['mannschaft', 'liga', 'turnier'] },
    density: { control: 'inline-radio', options: ['auto', 'touch', 'default', 'compact'] },
  },
  args: { preset: 'mannschaft', density: 'auto' },
};

export const Mannschaft = { args: { preset: 'mannschaft' } };
export const LigaUndHalle = { args: { preset: 'liga' } };
export const Turnier = { args: { preset: 'turnier' } };
