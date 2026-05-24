import PlayByPlayDemo from './components/PlayByPlayDemo.svelte';

export default {
  title: 'Components/PlayByPlay',
  component: PlayByPlayDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Live-Scoring Event-Stream** — chronologischer Spielverlauf für Kampfgerichtstisch
und Zuschauer-Boards.

Jeder Event-Eintrag hat:
- Mono-Zeitstempel (M:SS + Quarter-Label)
- 4-px-Teamfarbstrip (Heim · Gast · neutral)
- Action-Titel mit optional fett geleitetem Schlüsselwort
- Optionaler Detail-Untertitel (Mono · klein)
- Live-Spielstand rechts

**Event-Kinds** mit Farb-Akzent:
- \`score-3p\` — Amber-Hervorhebung des fett-Texts
- \`score-2p\`, \`ft\`, \`sub\` — neutral
- \`foul\` — rot
- \`timeout\` — blau
- \`turnover\` — neutral

Neue Events fließen mit Fade-in-Animation oben rein — der Live-Modus
in den Stories simuliert das mit einem 2-Sekunden-Intervall.
        `.trim(),
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['static', 'live'] },
    dark: { control: 'boolean' },
  },
  args: { mode: 'static', dark: false },
};

export const PlayByPlayStandard      = { args: { mode: 'static', dark: false } };
export const LiveScoringInteraktiv   = { args: { mode: 'live',   dark: false } };
export const KampfgerichtTischDark   = { args: { mode: 'live',   dark: true  } };
