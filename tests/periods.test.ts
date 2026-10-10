// @vitest-environment node
// Spielabschnitte (Paket 4, Teil B): reine Funktionen in js/periods.js, Tabellentests.
import { describe, it, expect } from 'vitest';
import { isPeriod, normalizePeriods, periodLabel, periodShort, resolvePeriod } from '../js/periods.js';

describe('periodLabel / periodShort', () => {
  const viertel: [number, string, string][] = [
    [1, '1. Viertel', 'V1'], [2, '2. Viertel', 'V2'], [3, '3. Viertel', 'V3'], [4, '4. Viertel', 'V4'],
    [5, 'Verlängerung', 'VL'], [6, '2. Verlängerung', 'VL2'], [7, '3. Verlängerung', 'VL3'],
  ];
  it.each(viertel)('4 Viertel (Standard): %i -> %s / %s', (period, label, short) => {
    expect(periodLabel(period)).toBe(label);
    expect(periodShort(period)).toBe(short);
    expect(periodLabel(period, 4)).toBe(label);
    expect(periodShort(period, 4)).toBe(short);
  });

  const achtel: [number, string, string][] = [
    [1, '1. Achtel', 'A1'], [2, '2. Achtel', 'A2'], [3, '3. Achtel', 'A3'], [4, '4. Achtel', 'A4'],
    [5, '5. Achtel', 'A5'], [6, '6. Achtel', 'A6'], [7, '7. Achtel', 'A7'], [8, '8. Achtel', 'A8'],
    [9, 'Verlängerung', 'VL'], [10, '2. Verlängerung', 'VL2'],
  ];
  it.each(achtel)('8 Achtel: %i -> %s / %s', (period, label, short) => {
    expect(periodLabel(period, 8)).toBe(label);
    expect(periodShort(period, 8)).toBe(short);
  });

  it('die Grenze hängt von periods ab: 5 ist bei 4 die Verlängerung, bei 8 das 5. Achtel', () => {
    expect(periodLabel(5, 4)).toBe('Verlängerung');
    expect(periodLabel(5, 8)).toBe('5. Achtel');
  });

  it.each([0, -1, -4, 1.5, 2.0000001, Number.NaN, Infinity, -Infinity])('ungültiger Wert %s ergibt leeren Text', (value) => {
    expect(periodLabel(value)).toBe('');
    expect(periodShort(value)).toBe('');
    expect(periodLabel(value, 8)).toBe('');
  });

  it.each([undefined, null, '3', true, {}])('kein Zahlentyp (%j) ergibt leeren Text', (value) => {
    expect(periodLabel(value as never)).toBe('');
    expect(periodShort(value as never)).toBe('');
  });

  it('periods außer 8 gilt als 4', () => {
    for (const odd of [undefined, 0, 3, 6, 16, '8', null]) {
      expect(normalizePeriods(odd)).toBe(4);
      expect(periodLabel(5, odd as never)).toBe('Verlängerung');
    }
    expect(normalizePeriods(8)).toBe(8);
  });

  it('isPeriod: ganze Zahl ab 1', () => {
    expect([1, 2, 10].every(isPeriod)).toBe(true);
    expect([0, -1, 1.2, Number.NaN, '1', undefined].some(isPeriod)).toBe(false);
  });
});

describe('resolvePeriod (Alias quarter)', () => {
  it('gültiges period gewinnt, auch wenn quarter gesetzt ist', () => {
    expect(resolvePeriod({ period: 3, quarter: 'Q4' })).toEqual({ label: '3. Viertel', short: 'V3', alias: false });
  });

  it('ohne period wird quarter unverändert angezeigt (kurz und lang gleich)', () => {
    expect(resolvePeriod({ quarter: 'Q4' })).toEqual({ label: 'Q4', short: 'Q4', alias: true });
    expect(resolvePeriod({ quarter: 'OT' })).toEqual({ label: 'OT', short: 'OT', alias: true });
    expect(resolvePeriod({ quarter: 'Halbzeit', periods: 8 }).label).toBe('Halbzeit');
  });

  it('ungültiges period fällt auf quarter zurück, sonst leer', () => {
    expect(resolvePeriod({ period: 0, quarter: 'Q2' }).label).toBe('Q2');
    expect(resolvePeriod({ period: Number.NaN, quarter: '' })).toEqual({ label: '', short: '', alias: false });
    expect(resolvePeriod({ period: -2 }).label).toBe('');
    expect(resolvePeriod({ period: 1.5 }).short).toBe('');
    expect(resolvePeriod()).toEqual({ label: '', short: '', alias: false });
  });

  it('periods wirkt auch hier', () => {
    expect(resolvePeriod({ period: 5, periods: 8 }).label).toBe('5. Achtel');
    expect(resolvePeriod({ period: 9, periods: 8 }).short).toBe('VL');
  });
});
