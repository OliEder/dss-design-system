import { describe, it, expect } from 'vitest';
import {
  ariaForResult,
  buildGrid,
  columnsFor,
  densityFor,
  groupBySection,
  hasScore,
  initials,
  layoutFor,
  outcome,
  resolveOutcome,
  slotsFromGames,
  startMinutes,
  winnerSide,
} from '../js/schedule.js';
import type { ScheduleGame } from '../js/schedule.js';

const versus = (over: Partial<ScheduleGame> = {}): ScheduleGame => ({
  id: 'g1',
  state: 'finished',
  heim: { name: 'TSV Tröster', score: 87 },
  gast: { name: 'USC Heidelberg', score: 64 },
  ...over,
});

const persp = (over: Partial<ScheduleGame> = {}): ScheduleGame => ({
  id: 'p1',
  state: 'finished',
  at: 'heim',
  opponent: { name: 'TSV Jahn Freising', score: 108 },
  ownScore: 65,
  ...over,
});

describe('outcome', () => {
  it('bewertet Sieg, Niederlage und Unentschieden', () => {
    expect(outcome(70, 60)).toBe('S');
    expect(outcome(60, 70)).toBe('N');
    expect(outcome(60, 60)).toBe('U');
  });
  it('liefert undefined, wenn ein Stand fehlt', () => {
    expect(outcome(undefined, 60)).toBeUndefined();
    expect(outcome(60, undefined)).toBeUndefined();
    expect(outcome(NaN, 1)).toBeUndefined();
  });
});

describe('resolveOutcome', () => {
  it('berechnet nur bei beendeten Perspektive-Spielen', () => {
    expect(resolveOutcome(persp())).toBe('N');
    expect(resolveOutcome(persp({ state: 'live' }))).toBeUndefined();
    expect(resolveOutcome(persp({ state: 'scheduled', ownScore: undefined, opponent: { name: 'X' } }))).toBeUndefined();
    expect(resolveOutcome(versus())).toBeUndefined();
  });
  it('lässt einen gesetzten outcome gewinnen (Forfait)', () => {
    expect(resolveOutcome(persp({ ownScore: 0, opponent: { name: 'X', score: 20 }, outcome: 'S' }))).toBe('S');
  });
});

describe('winnerSide', () => {
  it('nennt den Sieger bei beendeten Spielen', () => {
    expect(winnerSide(versus())).toBe('heim');
    expect(winnerSide(versus({ heim: { name: 'A', score: 1 }, gast: { name: 'B', score: 2 } }))).toBe('gast');
  });
  it('liefert null bei Gleichstand, ohne Stand und bei laufenden Spielen', () => {
    expect(winnerSide(versus({ heim: { name: 'A', score: 2 }, gast: { name: 'B', score: 2 } }))).toBeNull();
    expect(winnerSide(versus({ heim: { name: 'A' }, gast: { name: 'B' } }))).toBeNull();
    expect(winnerSide(versus({ state: 'live' }))).toBeNull();
  });
});

describe('hasScore', () => {
  it('prüft beide Stände je nach Art', () => {
    expect(hasScore(versus())).toBe(true);
    expect(hasScore(versus({ heim: { name: 'A', score: 1 }, gast: { name: 'B' } }))).toBe(false);
    expect(hasScore(persp())).toBe(true);
    expect(hasScore(persp({ ownScore: undefined }))).toBe(false);
  });
});

describe('layoutFor und densityFor', () => {
  it('wählt opponent, sobald ein Spiel einen Gegner hat', () => {
    expect(layoutFor([versus()])).toBe('versus');
    expect(layoutFor([versus(), persp()])).toBe('opponent');
  });
  it('wählt touch bei opponent oder Liga-Unterzeile, sonst default', () => {
    expect(densityFor([versus()], 'versus')).toBe('default');
    expect(densityFor([persp()], 'opponent')).toBe('touch');
    expect(densityFor([versus({ league: { name: 'Bayernliga' } })], 'versus')).toBe('touch');
  });
});

describe('columnsFor', () => {
  it('liefert feste Spalten für versus und opponent', () => {
    expect(columnsFor('versus', []).map((c) => c.key)).toEqual(['when', 'match', 'res']);
    expect(columnsFor('opponent', []).map((c) => c.key)).toEqual(['when', 'ha', 'match', 'res']);
  });
  it('blendet bei columns Spalten ohne Daten aus', () => {
    expect(columnsFor('columns', [versus()]).map((c) => c.key)).toEqual(['when', 'heim', 'res', 'gast']);
    const full = [versus({ nr: '#1', field: 'F1', venue: 'Halle A' })];
    expect(columnsFor('columns', full, true).map((c) => c.key)).toEqual([
      'nr', 'when', 'field', 'venue', 'heim', 'res', 'gast', 'notice',
    ]);
  });
});

describe('startMinutes und slotsFromGames', () => {
  it('liest die Startzeit aus Zeiten und Zeitspannen', () => {
    expect(startMinutes('09:30')).toBe(570);
    expect(startMinutes('09:30–09:50')).toBe(570);
    expect(startMinutes('später')).toBe(Infinity);
    expect(startMinutes(undefined)).toBe(Infinity);
  });
  it('leitet eindeutige, sortierte Zeitzeilen ab und ignoriert Freilose', () => {
    const games = [
      versus({ id: 'a', time: '10:00' }),
      versus({ id: 'b', time: '09:00' }),
      versus({ id: 'c', time: '10:00' }),
      versus({ id: 'd', time: '09:30', state: 'bye' }),
    ];
    expect(slotsFromGames(games)).toEqual(['09:00', '10:00']);
  });
});

describe('groupBySection', () => {
  it('beginnt eine Gruppe, sobald sich section ändert', () => {
    const g = groupBySection([
      versus({ id: '1', section: 'Runde 1' }),
      versus({ id: '2', section: 'Runde 1' }),
      versus({ id: '3', section: 'Runde 2' }),
      versus({ id: '4' }),
    ]);
    expect(g.map((x) => [x.section, x.games.map((y) => y.id)])).toEqual([
      ['Runde 1', ['1', '2']],
      ['Runde 2', ['3']],
      [undefined, ['4']],
    ]);
  });
});

describe('initials', () => {
  it('nimmt bis zu drei Anfangsbuchstaben in Großbuchstaben', () => {
    expect(initials('TSV Jahn Freising')).toBe('TJF');
    expect(initials('Nürnberger Basketball Club Bayern')).toBe('NBC');
    expect(initials('Dukes')).toBe('D');
    expect(initials('')).toBe('');
  });
});

describe('ariaForResult', () => {
  it('beschreibt die Gegenüberstellung', () => {
    expect(ariaForResult(versus(), 'versus')).toBe('Heim 87, Gast 64');
  });
  it('beschreibt die Perspektive mit Bewertung', () => {
    expect(ariaForResult(persp(), 'opponent')).toBe('Eigene 65, Gegner 108, Niederlage');
    expect(ariaForResult(persp({ outcome: 'U', ownScore: 80, opponent: { name: 'X', score: 80 } }), 'opponent')).toBe(
      'Eigene 80, Gegner 80, Unentschieden',
    );
  });
  it('ergänzt vorläufig und läuft', () => {
    expect(ariaForResult(persp({ provisional: true }), 'opponent')).toBe('Eigene 65, Gegner 108, Niederlage, vorläufig');
    expect(ariaForResult(versus({ state: 'live' }), 'versus')).toBe('Heim 87, Gast 64, läuft');
  });
});

describe('buildGrid', () => {
  const columns = [
    { id: 'f1', label: 'Feld 1' },
    { id: 'f2', label: 'Feld 2' },
  ];
  const games = [
    versus({ id: 'a', time: '09:30', column: 'f1' }),
    versus({ id: 'b', time: '09:00', column: 'f2' }),
    versus({ id: 'c', time: '09:00', column: 'f1' }),
    versus({ id: 'bye', time: '09:30', state: 'bye', heim: { name: 'BG Zirndorf' }, gast: undefined }),
    versus({ id: 'x', time: '09:00', column: 'unbekannt' }),
  ];

  it('ordnet Spiele nach Zeit und Spalte und lässt Lücken leer', () => {
    const rows = buildGrid({ games, columns });
    const slots = rows.filter((r) => r.kind === 'slot');
    expect(slots.map((r) => r.time)).toEqual(['09:00', '09:30']);
    expect(slots[0].cells.map((c) => c.map((g) => g.id))).toEqual([['c'], ['b']]);
    expect(slots[1].cells.map((c) => c.map((g) => g.id))).toEqual([['a'], []]);
  });

  it('zeigt Spiele mit unbekannter Spalte nicht an', () => {
    const ids = buildGrid({ games, columns })
      .filter((r) => r.kind === 'slot')
      .flatMap((r) => r.cells.flat())
      .map((g) => g.id);
    expect(ids).not.toContain('x');
  });

  it('fügt Pausen und Freilose in Zeitreihenfolge ein', () => {
    const rows = buildGrid({ games, columns, breaks: [{ time: '09:15', label: 'Pause' }] });
    expect(rows.map((r) => `${r.kind}@${r.time}`)).toEqual(['slot@09:00', 'break@09:15', 'slot@09:30', 'bye@09:30']);
  });

  it('nutzt vorgegebene slots, auch ohne Spiele', () => {
    const rows = buildGrid({ games, columns, slots: ['09:00', '10:00'] });
    const slots = rows.filter((r) => r.kind === 'slot');
    expect(slots.map((r) => r.time)).toEqual(['09:00', '10:00']);
    expect(slots[1].cells.map((c) => c.length)).toEqual([0, 0]);
  });
});
