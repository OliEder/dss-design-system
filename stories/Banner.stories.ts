import BannerDemo from './components/BannerDemo.svelte';
import BannerExamples from './components/BannerExamples.svelte';

export default {
  title: 'Components/Banner',
  component: BannerDemo,
  argTypes: {
    severity: { control: 'inline-radio', options: ['info', 'ok', 'warn', 'danger'], description: 'Schweregrad: Farbe und Symbol; bei `warn` und `danger` ist die Rolle `alert`, sonst `status`', table: { type: { summary: "'info' | 'ok' | 'warn' | 'danger'" }, defaultValue: { summary: "'info'" } } },
    icon:     { control: 'boolean', description: 'Zeigt das Symbol zum Schweregrad (für Screenreader verborgen)', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } } },
    title:    { control: 'text', description: 'Fette Titelzeile über dem Text; leer lässt sie weg', table: { type: { summary: 'string' }, defaultValue: { summary: "''" } } },
    body:     { control: 'text', description: 'Text des Hinweises (Svelte: Kinder, React: `children`), darf Links enthalten', table: { type: { summary: 'string' } } },
    role:     { control: false, description: "Überschreibt die Rolle (Standard: `alert` für `warn`/`danger`, sonst `status`)", table: { type: { summary: "'alert' | 'status' | 'none'" } } },
  },
  args: { severity: 'info', title: '', icon: true, body: 'Geschätzte Gesamtdauer: 180 Minuten.' },
};

export const Info = {};
export const Erfolg = { args: { severity: 'ok', body: 'Spielplan gespeichert.' } };
export const Warnung = { args: { severity: 'warn', title: 'Hallenzeit knapp', body: 'Das passt nur mit weniger Runden in die verfügbare Hallenzeit.' } };
export const Fehler = { args: { severity: 'danger', title: 'Export fehlgeschlagen', body: 'Bitte erneut versuchen.' } };
export const OhneIcon = { args: { icon: false } };

// Beispiele für die Doku-Seite (Banner.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: BannerExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Schweregrade = { ...example('schweregrade'), tags: ['!dev'] };
export const Aufbau       = { ...example('aufbau'), tags: ['!dev'] };
export const MitLink      = { ...example('link'), tags: ['!dev'] };
export const Zustaende    = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story (der Indexer liest keine Funktionsrückgaben).
export const DoText        = { ...example('do-text'), tags: ['!dev'] };
export const DontText      = { ...example('dont-text'), tags: ['!dev'] };
export const DoSchwere     = { ...example('do-schwere'), tags: ['!dev'] };
export const DontSchwere   = { ...example('dont-schwere'), tags: ['!dev'] };
export const DoNichtFarbe  = { ...example('do-farbe'), tags: ['!dev'] };
export const DontNichtFarbe = { ...example('dont-farbe'), tags: ['!dev'] };
export const DoFeld        = { ...example('do-feld'), tags: ['!dev'] };
export const DontFeld      = { ...example('dont-feld'), tags: ['!dev'] };
