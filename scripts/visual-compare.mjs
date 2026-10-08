#!/usr/bin/env node
/**
 * Visueller Vorher/Nachher-Vergleich der Svelte-Stories (Storybook-Static).
 *
 *   node scripts/visual-compare.mjs capture before   # baut Storybook, speichert .visual/before/*.png
 *   node scripts/visual-compare.mjs capture after
 *   node scripts/visual-compare.mjs compare          # magick compare, Diffs nach .visual/diff/
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdir, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const ROOT = new URL('../', import.meta.url).pathname;
const STATIC_DIR = join(ROOT, 'storybook-static');
const OUT = join(ROOT, '.visual');
const TITLES = ['Components/ScheduleTable', 'Components/ScheduleGrid', 'Components/Button', 'Components/Card', 'Components/Tabs', 'Components/TextInput', 'Components/Modal', 'Components/Table', 'Components/Navigation', 'Components/EmptyState', 'Components/Card Library', 'Components/PlayByPlay', 'Components/AppNav'];
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png' };

function serveStatic() {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const file = join(STATIC_DIR, path === '/' ? 'index.html' : path);
    if (!existsSync(file)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function capture(label) {
  execFileSync('npx', ['storybook', 'build', '-o', 'storybook-static', '--quiet'], { cwd: ROOT, stdio: 'inherit' });
  const index = JSON.parse(await readFile(join(STATIC_DIR, 'index.json'), 'utf8'));
  const ids = Object.values(index.entries).filter((e) => e.type === 'story' && TITLES.includes(e.title)).map((e) => e.id);
  if (ids.length === 0) throw new Error('Keine Stories gefunden');

  const dir = join(OUT, label);
  await mkdir(dir, { recursive: true });
  const server = await serveStatic();
  const { port } = server.address();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1000, height: 800 }, deviceScaleFactor: 1 });
    for (const id of ids) {
      await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(dir, `${id}.png`), fullPage: true });
      console.log(`  ${label}/${id}.png`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

async function compare() {
  const beforeDir = join(OUT, 'before');
  const afterDir = join(OUT, 'after');
  const diffDir = join(OUT, 'diff');
  await mkdir(diffDir, { recursive: true });
  let changed = 0;
  for (const file of (await readdir(beforeDir)).filter((f) => f.endsWith('.png'))) {
    const result = spawnSync('magick', ['compare', '-metric', 'AE', join(beforeDir, file), join(afterDir, file), join(diffDir, file)], { encoding: 'utf8' });
    const detail = (result.stderr || '').trim();
    const differing = result.status === 0 ? 0 : result.status === 1 ? Number.parseInt(detail, 10) : -1;
    if (differing !== 0) changed++;
    console.log(`${differing === 0 ? 'gleich   ' : differing < 0 ? 'GRÖSSE   ' : 'ABWEICHT '} ${file}${differing > 0 ? `  (${differing} px)` : ''}${differing < 0 ? `  ${detail}` : ''}`);
  }
  console.log(changed === 0 ? '\nKeine Abweichungen.' : `\n${changed} Abweichung(en) — Diffs in .visual/diff/, einzeln bewerten.`);
}

const [mode, label] = process.argv.slice(2);
if (mode === 'capture' && (label === 'before' || label === 'after')) await capture(label);
else if (mode === 'compare') await compare();
else { console.error('Aufruf: visual-compare.mjs capture <before|after> | compare'); process.exit(2); }
