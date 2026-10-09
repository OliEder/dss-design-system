import PlayByPlayDemo from './components/PlayByPlayDemo.svelte';
import PlayByPlayExamples from './components/PlayByPlayExamples.svelte';

export default {
  title: 'Components/PlayByPlay',
  component: PlayByPlayDemo,
  argTypes: {
    mode: { control: 'inline-radio', options: ['static', 'live'], description: 'Nur Demo: `static` zeigt acht feste Ereignisse, `live` fügt nach „Live-Scoring starten“ alle 2,2 Sekunden ein Ereignis oben ein', table: { type: { summary: "'static' | 'live'" }, defaultValue: { summary: "'static'" } } },
    dark: { control: 'boolean', description: 'Dunkle Fläche (Kampfgericht-Tisch), auch im hellen Theme dunkel', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } } },
  },
  args: { mode: 'static', dark: false },
};

export const PlayByPlayStandard      = { args: { mode: 'static', dark: false } };
export const LiveScoringInteraktiv   = { args: { mode: 'live',   dark: false } };
export const KampfgerichtTischDark   = { args: { mode: 'live',   dark: true  } };

// Beispiele für die Doku-Seite (PlayByPlay.mdx). Die Steuerelemente passen hier nicht, daher aus.
const example = (name: string) => ({
  render: () => ({ Component: PlayByPlayExamples, props: { example: name } }),
  parameters: { controls: { disable: true }, layout: 'padded' },
});

export const Eintrag    = { ...example('eintrag'), tags: ['!dev'] };
export const Arten      = { ...example('arten'), tags: ['!dev'] };
export const Dunkel     = { ...example('dunkel'), tags: ['!dev'] };
export const Zustaende  = { ...example('zustaende'), tags: ['!dev'] };

// Dos und Don'ts: nur in der Doku. Der Tag steht als Literal an jeder Story (der Indexer liest keine Funktionsrückgaben).
export const DoReihenfolge   = { ...example('do-reihenfolge'), tags: ['!dev'] };
export const DontReihenfolge = { ...example('dont-reihenfolge'), tags: ['!dev'] };
export const DoTeam          = { ...example('do-team'), tags: ['!dev'] };
export const DontTeam        = { ...example('dont-team'), tags: ['!dev'] };
export const DoZeit          = { ...example('do-zeit'), tags: ['!dev'] };
export const DontZeit        = { ...example('dont-zeit'), tags: ['!dev'] };
export const DoLive          = { ...example('do-live'), tags: ['!dev'] };
export const DontLive        = { ...example('dont-live'), tags: ['!dev'] };
