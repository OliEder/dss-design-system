// @vitest-environment node
// TeamCard (Paket 4, Teil C): reine Hilfsfunktionen in js/team.js, Tabellentests.
import { describe, it, expect } from 'vitest';
import { formatNumber, lastResult, opponentPrefix, rankInfo, recordInfo, squadText, statEntries } from '../js/team.js';

describe('formatNumber', () => {
  it.each([[48.2, '48,2'], [36, '36'], [0, '0'], [12.05, '12,05'], [-1.5, '-1,5']])('%s -> %s (ohne Intl, Komma)', (value, text) => {
    expect(formatNumber(value)).toBe(text);
  });
  it.each([undefined, Number.NaN, Infinity, null, '3'])('%s ergibt leeren Text', (value) => {
    expect(formatNumber(value as never)).toBe('');
  });
});

describe('recordInfo', () => {
  it('S–N', () => {
    expect(recordInfo({ w: 12, l: 3 })).toEqual({ text: '12–3', label: 'S–N', aria: 'Bilanz: 12 Siege, 3 Niederlagen' });
  });
  it('S–U–N', () => {
    expect(recordInfo({ w: 5, d: 1, l: 2 })).toEqual({ text: '5–1–2', label: 'S–U–N', aria: 'Bilanz: 5 Siege, 1 Unentschieden, 2 Niederlagen' });
  });
  it('Einzahl', () => {
    expect(recordInfo({ w: 1, l: 1 })!.aria).toBe('Bilanz: 1 Sieg, 1 Niederlage');
  });
  it('0:0 ist eine Bilanz', () => {
    expect(recordInfo({ w: 0, l: 0 })!.text).toBe('0–0');
  });
  it.each([undefined, {}, { w: 1 }, { l: 1 }, { w: Number.NaN, l: 1 }])('%j ergibt undefined', (value) => {
    expect(recordInfo(value as never)).toBeUndefined();
  });
});

describe('rankInfo', () => {
  it('Platz von', () => {
    expect(rankInfo(3, 12)).toEqual({ text: '3', label: 'Platz von 12', aria: 'Tabellenplatz 3 von 12' });
  });
  it('ohne rankOf', () => {
    expect(rankInfo(3)).toEqual({ text: '3', label: 'Platz', aria: 'Tabellenplatz 3' });
  });
  it('rankOf kleiner als rank oder ungültig wird ignoriert', () => {
    expect(rankInfo(5, 4)!.label).toBe('Platz');
    expect(rankInfo(5, 1.5)!.label).toBe('Platz');
  });
  it.each([0, -1, 1.5, Number.NaN, undefined])('Platz %s ist ungültig', (value) => {
    expect(rankInfo(value as never, 12)).toBeUndefined();
  });
});

describe('squadText', () => {
  it.each([
    [{ players: 14, staff: 3 }, '14 Spieler · 3 Trainer'],
    [{ players: 9 }, '9 Spieler'],
    [{ players: 0, staff: 0 }, '0 Spieler · 0 Trainer'],
    [undefined, ''],
    [{ staff: 2 }, ''],
  ])('%j -> %s', (value, text) => {
    expect(squadText(value as never)).toBe(text);
  });
});

describe('statEntries', () => {
  it('feste Reihenfolge, nur übergebene Felder, deutsches Komma', () => {
    expect(statEntries({ to: 12, twoPtPct: 48.2, trb: 41.5 })).toEqual([
      { key: 'twoPtPct', label: '2PP %', value: '48,2' },
      { key: 'trb', label: 'TRB', value: '41,5' },
      { key: 'to', label: 'TO', value: '12' },
    ]);
  });
  it('threePtPct heißt „3PP %“', () => {
    expect(statEntries({ threePtPct: 36.5 })).toEqual([{ key: 'threePtPct', label: '3PP %', value: '36,5' }]);
  });
  it('0 ist ein Wert', () => {
    expect(statEntries({ to: 0 })).toHaveLength(1);
  });
  it.each([undefined, {}, { twoPtPct: undefined }, { trb: Number.NaN }, { to: null }])('ohne Daten (%j) leer', (value) => {
    expect(statEntries(value as never)).toEqual([]);
  });
});

describe('lastResult / opponentPrefix', () => {
  it('Sieg, Niederlage, Unentschieden mit Text wie ariaForResult', () => {
    expect(lastResult({ opponent: { name: 'Y' }, ownScore: 92, opponentScore: 79 })).toEqual({ outcome: 'S', score: '92 : 79', aria: 'Eigene 92, Gegner 79, Sieg' });
    expect(lastResult({ opponent: { name: 'Y' }, ownScore: 70, opponentScore: 80 })!.aria).toBe('Eigene 70, Gegner 80, Niederlage');
    expect(lastResult({ opponent: { name: 'Y' }, ownScore: 70, opponentScore: 70 })!.aria).toBe('Eigene 70, Gegner 70, Unentschieden');
  });
  it('ohne gültige Punkte undefined', () => {
    expect(lastResult(undefined)).toBeUndefined();
    expect(lastResult({ opponent: { name: 'Y' }, ownScore: Number.NaN, opponentScore: 1 })).toBeUndefined();
  });
  it('Zusatztext vor dem Gegner', () => {
    expect(opponentPrefix('heim')).toBe('Heimspiel gegen ');
    expect(opponentPrefix('gast')).toBe('Auswärtsspiel bei ');
    expect(opponentPrefix(undefined)).toBe('gegen ');
  });
});
