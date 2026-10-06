// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const css = readFileSync(new URL('../css/components.css', import.meta.url), 'utf8');
const hasClass = (name: string) => new RegExp(`\\.${name}(?![\\w-])`).test(css);

// Klassen, die React-Paket und neue Svelte-Komponenten voraussetzen (v0.7).
const REQUIRED = [
  // Button
  'dss-btn--danger', 'is-touch',
  // Felder
  'dss-field-label', 'dss-field-help', 'dss-field-help--err', 'dss-field-help--ok',
  'dss-field-help--warn', 'is-error', 'is-ok', 'is-warn',
  'dss-input--default', 'dss-input--compact', 'dss-addon--right', 'dss-select--compact',
  // Banner
  'dss-banner', 'dss-banner--info', 'dss-banner--ok', 'dss-banner--warn', 'dss-banner--danger',
  'dss-banner-icon', 'dss-banner-body', 'dss-banner-title',
  // Modal
  'dss-backdrop', 'dss-modal-wrap', 'dss-modal', 'dss-modal--sm', 'dss-modal--wide', 'dss-modal--xwide',
  'dss-m-head', 'dss-m-head-icon', 'dss-m-head-icon--danger', 'dss-m-head-icon--warn',
  'dss-m-head-icon--ok', 'dss-m-head-icon--info', 'dss-m-head-text', 'dss-m-title',
  'dss-m-subtitle', 'dss-m-close', 'dss-m-body', 'dss-m-footer',
  // Tabs
  'dss-tabs--sm', 'dss-tabs--lg', 'dss-tabs--vertical', 'dss-tab-ic', 'dss-tab-count',
  // Checkbox (v0.8)
  'dss-check', 'dss-check--compact', 'dss-check-input', 'dss-check-text', 'dss-check-label', 'dss-check-hint',
  // Table (v0.8)
  'dss-frame--dark', 'dss-frame-head', 'dss-frame-title', 'dss-frame-meta', 'dss-crumb', 'dss-crumb-dot',
  'dss-tbl--touch', 'dss-tbl--dense', 'dss-tbl--striped', 'dss-tn', 'dss-player', 'dss-pos', 'dss-pill-s',
  // TopBar (v0.8)
  'dss-topbar--dark', 'dss-topbar-brand', 'dss-topbar-mark', 'dss-topbar-ctx', 'dss-topbar-live',
  'dss-topbar-score', 'dss-topbar-clock', 'dss-topbar-center', 'dss-topbar-spacer', 'dss-topbar-user', 'dss-topbar-av',
  // Icon
  'dss-icon',
];

describe('css/components.css', () => {
  it.each(REQUIRED)('definiert .%s', (name) => {
    expect(hasClass(name)).toBe(true);
  });
});
