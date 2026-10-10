// @vitest-environment node
// Svelte und React erzeugen für die Karten dasselbe Markup (Server-Rendering beider Fassungen, normalisiert).
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer, type ViteDevServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const rootDir = new URL('../', import.meta.url).pathname;
let vite: ViteDevServer;
let render: (component: unknown, options: { props: Record<string, unknown> }) => { body: string };
const load = async (path: string, name = 'default') => ((await vite.ssrLoadModule(rootDir + path)) as Record<string, unknown>)[name];

// Whitespace an Tag-Grenzen, Kommentare und Klassenreihenfolge sind kein Unterschied
const normalize = (html: string) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '')
    // Svelte merkt sich beim Server-Rendern einen früh ausgelösten Bildfehler (Ereignis-Wiedergabe); kein Markup-Unterschied
    .replace(/ onerror="this\.__e=event"/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ ?> ?/g, '>')
    .replace(/ ?</g, '<')
    .replace(/class="([^"]*)"/g, (_m, value: string) => `class="${value.trim().split(/\s+/).sort().join(' ')}"`)
    .replace(/<(img|br)([^>]*?)\/?>/g, '<$1$2>')
    .trim();

beforeAll(async () => {
  vite = await createServer({
    root: rootDir, configFile: false, plugins: [svelte({ configFile: rootDir + 'svelte.config.js' })],
    esbuild: { jsx: 'automatic' }, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error',
  });
  render = ((await vite.ssrLoadModule('svelte/server')) as { render: typeof render }).render;
}, 60000);
afterAll(async () => {
  await vite?.close();
});

// Svelte-Props und React-Props unterscheiden sich in wenigen Namen (height_cm/heightCm, role/playerRole)
const same = async (sveltePath: string, reactPath: string, reactName: string, svelteProps: Record<string, unknown>, reactProps = svelteProps) => {
  const Svelte = await load(sveltePath);
  const React = await load(reactPath, reactName);
  expect(normalize(render(Svelte, { props: svelteProps }).body)).toBe(normalize(renderToStaticMarkup(createElement(React as never, reactProps))));
};

const VITALS = [{ label: 'PPG', value: '17.4', accent: true }, { label: 'APG', value: '6.2' }];

describe('PlayerCard: Svelte und React erzeugen dasselbe Markup', () => {
  const photos: (string | undefined)[] = [undefined, '', '/players/jt.jpg'];
  const alts: (string | undefined)[] = [undefined, 'Porträt J. Tanner'];
  for (const size of ['compact', 'standard', 'hero'] as const) {
    for (const photo of photos) {
      for (const photoAlt of alts) {
        for (const captain of [false, true]) {
          it(`${size} photo=${JSON.stringify(photo)} alt=${JSON.stringify(photoAlt)} captain=${captain}`, async () => {
            const base = { size, jersey: '4', name: 'J. Tanner', position: 'PG', team: 'heim', captain, vitals: VITALS, stat: 22, statLabel: 'PTS', ...(photo === undefined ? {} : { photo }), ...(photoAlt === undefined ? {} : { photoAlt }) };
            await same('svelte/PlayerCard.svelte', 'react/PlayerCard.tsx', 'PlayerCard', base);
          });
        }
      }
    }
  }
});
