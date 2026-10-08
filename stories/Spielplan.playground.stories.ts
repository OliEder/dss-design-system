import SpielplanPlayground from './components/SpielplanPlayground.svelte';

const cat = (category: string) => ({ category });
const bool = (description: string, category: string) => ({ control: 'boolean', description, table: cat(category) });

// Spielwiese: alle Werte lassen sich im Controls-Reiter schalten, gezeigt werden die echten Komponenten.
const testgame = {
  state: {
    control: 'select',
    options: ['scheduled', 'live', 'finished', 'cancelled', 'postponed', 'bye'],
    description: 'Zustand des Testspiels (erste Zeile)',
    table: cat('Testspiel'),
  },
  provisional: bool('Ergebnis vorläufig', 'Testspiel'),
  scoreHeim: { control: { type: 'number', min: 0, max: 200, step: 1 }, description: 'Punkte Heim (bei Mannschaft: eigene)', table: cat('Testspiel') },
  scoreGast: { control: { type: 'number', min: 0, max: 200, step: 1 }, description: 'Punkte Gast (bei Mannschaft: Gegner)', table: cat('Testspiel') },
  note: { control: 'text', description: 'Notiz zum Spiel', table: cat('Testspiel') },
  own: bool('Eigene Mannschaft hervorheben (ohne Wirkung im Layout Mannschaft)', 'Testspiel'),
  placeholder: bool('Gegner ist ein Platzhalter („Erster Gruppe A“)', 'Testspiel'),
};

export default {
  title: 'Components/Spielplan Spielwiese',
  component: SpielplanPlayground,
  parameters: { layout: 'fullscreen' },
};

export const Tabelle = {
  args: {
    kind: 'table',
    layout: 'opponent',
    density: 'auto',
    state: 'live',
    provisional: false,
    scoreHeim: 52,
    scoreGast: 48,
    note: '',
    showLeague: false,
    showVenue: false,
    showField: false,
    own: false,
    placeholder: false,
    outcome: 'auto',
    showNotice: false,
    editableTime: false,
  },
  argTypes: {
    kind: { table: { disable: true } },
    halls: { table: { disable: true } },
    showBreak: { table: { disable: true } },
    showBye: { table: { disable: true } },
    showEmptyCell: { table: { disable: true } },
    layout: { control: 'inline-radio', options: ['versus', 'opponent', 'columns'], description: 'versus: Liga/Halle, opponent: Mannschaft, columns: Turnier', table: cat('Layout') },
    density: { control: 'inline-radio', options: ['auto', 'touch', 'default', 'compact'], description: 'auto: Standard des Layouts', table: cat('Layout') },
    ...testgame,
    showLeague: bool('Liga-Unterzeile anzeigen', 'Optionen'),
    showVenue: bool('Halle anzeigen', 'Optionen'),
    showField: bool('Feld anzeigen (Spalte im Layout Turnier)', 'Optionen'),
    outcome: {
      control: 'inline-radio',
      options: ['auto', 'S', 'N', 'U'],
      description: 'Bewertung erzwingen (nur Layout Mannschaft, Zustand beendet)',
      table: cat('Testspiel'),
    },
    showNotice: bool('Snippet notice: Chip „Sperrzeit“', 'Optionen'),
    editableTime: bool('Snippet time: Eingabefeld für die Zeit des Testspiels', 'Optionen'),
  },
};

export const Zeitraster = {
  args: {
    kind: 'grid',
    density: 'default',
    halls: 3,
    showBreak: true,
    showBye: true,
    showEmptyCell: true,
    state: 'live',
    provisional: false,
    scoreHeim: 18,
    scoreGast: 20,
    note: '',
    own: true,
    placeholder: false,
  },
  argTypes: {
    kind: { table: { disable: true } },
    layout: { table: { disable: true } },
    outcome: { table: { disable: true } },
    showLeague: { table: { disable: true } },
    showVenue: { table: { disable: true } },
    showField: { table: { disable: true } },
    showNotice: { table: { disable: true } },
    editableTime: { table: { disable: true } },
    density: { control: 'inline-radio', options: ['default', 'compact', 'touch'], description: 'Zeilendichte', table: cat('Layout') },
    halls: { control: { type: 'number', min: 1, max: 5, step: 1 }, description: 'Anzahl Hallen (1 bis 5)', table: cat('Layout') },
    showBreak: bool('Pause zeigen', 'Optionen'),
    showBye: bool('Freilos zeigen', 'Optionen'),
    showEmptyCell: bool('Eine Zelle ohne Spiel', 'Optionen'),
    ...testgame,
  },
};
