export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<button type="button" class="dss-btn dss-btn--primary dss-btn--md">Spielbericht freigeben</button>
<button type="button" class="dss-btn dss-btn--amber dss-btn--md is-touch">Live-Scoring starten</button>
<button type="button" class="dss-btn dss-btn--danger dss-btn--md">Verwerfen</button>
<button type="button" class="dss-btn dss-btn--ghost dss-btn--sm">Mehr…</button>
<button type="button" class="dss-btn dss-btn--primary dss-btn--md" disabled>Gesperrt</button>`;

export const svelte = `import Button from '@bbv/dss-design-system/svelte/Button';

<Button>Spielbericht freigeben</Button>
<Button variant="amber" touch>Live-Scoring starten</Button>
<Button variant="danger">Verwerfen</Button>
<Button variant="ghost" size="sm">Mehr…</Button>
<Button disabled>Gesperrt</Button>`;

export const react = `import { Button } from '@bbv/dss-design-system/react';

<Button>Spielbericht freigeben</Button>
<Button variant="amber" touch>Live-Scoring starten</Button>
<Button variant="danger">Verwerfen</Button>
<Button variant="ghost" size="sm">Mehr…</Button>
<Button disabled>Gesperrt</Button>`;
