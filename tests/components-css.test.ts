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
  // EmptyState (v0.8)
  'dss-empty--neutral', 'dss-empty--action', 'dss-empty--error', 'dss-empty-icon', 'dss-empty-title',
  'dss-empty-body', 'dss-empty-actions', 'dss-empty-extra',
  // Stepper (v0.8)
  'dss-step--h', 'dss-step--c', 'dss-step--v', 'dss-step-item', 'dss-step-dot', 'dss-step-label',
  'dss-step-line', 'dss-step-rail', 'dss-step-vline', 'dss-step-body', 'dss-step-desc',
  'dss-step-track', 'dss-step-fill', 'dss-step-info', 'dss-step-num', 'dss-step-cur',
  // AppNav (v0.8)
  'dss-appnav', 'dss-appnav--dark', 'dss-appnav-bar', 'dss-appnav-list', 'dss-appnav-item', 'dss-appnav-link',
  'dss-appnav-group-btn', 'dss-appnav-chev', 'dss-appnav-panel', 'dss-appnav-toggle', 'dss-appnav-context',
  // BottomNav (v0.9)
  'dss-bnav', 'dss-bnav-item', 'dss-bnav-ic', 'dss-bnav-lbl', 'dss-bnav-badge', 'dss-bnav-fab',
  // Breadcrumbs (v0.9)
  'dss-crumbs', 'dss-crumbs--tagged', 'dss-crumbs--chip', 'dss-crumbs-item', 'dss-crumbs-sep', 'dss-crumbs-tag', 'dss-crumbs-chip',
  // Skeleton (v0.9)
  'dss-skel', 'dss-skel--line', 'dss-skel--block', 'dss-skel--circle', 'dss-skel-row', 'dss-skel-who',
  'dss-skel-match', 'dss-skel-match-head', 'dss-skel-match-row',
  // Icon
  'dss-icon',
  // MatchCard (v0.9)
  'dss-match', 'dss-match--live', 'dss-match-head', 'dss-match-muted', 'dss-match-when', 'dss-match-final',
  'dss-match-live', 'dss-match-pulse', 'dss-match-body', 'dss-match-team', 'dss-match-team--gast', 'dss-match-dot',
  'dss-match-name', 'dss-match-score', 'dss-match-foot',
  // PlayerCard (v0.9)
  'dss-pc-row', 'dss-pc-who', 'dss-pc-name', 'dss-pc-meta', 'dss-pc-stat', 'dss-pc-stat-l', 'dss-pc-card', 'dss-pc-head',
  'dss-pc-nm', 'dss-pc-role', 'dss-pc-cap', 'dss-pc-vitals', 'dss-pc-v', 'dss-pc-v--amber', 'dss-pc-l', 'dss-pc-hero',
  'dss-pc-hero-left', 'dss-pc-hero-right',
  // PlayByPlay (v0.9)
  'dss-pbp-frame', 'dss-pbp-frame--dark', 'dss-pbp-head', 'dss-pbp-title', 'dss-pbp-meta', 'dss-pbp-live', 'dss-pbp-dot',
  'dss-pbp-feed', 'dss-pbp-event', 'dss-pbp-time', 'dss-pbp-q', 'dss-pbp-strip', 'dss-pbp-strip--heim', 'dss-pbp-strip--gast',
  'dss-pbp-strip--none', 'dss-pbp-body', 'dss-pbp-action', 'dss-pbp-detail', 'dss-pbp-score', 'dss-pbp-sep',
  'dss-pbp-event--foul', 'dss-pbp-event--timeout', 'dss-pbp-event--score-3p',
  // CourtLines (v0.9)
  'dss-courtbg', 'dss-courtbg--absolute', 'dss-courtlines',
];

describe('css/components.css', () => {
  it.each(REQUIRED)('definiert .%s', (name) => {
    expect(hasClass(name)).toBe(true);
  });
});
