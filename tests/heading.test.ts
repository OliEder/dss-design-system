// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { headingLevel, headingTag, levelOfTag, nextLevel, resolveHeading } from '../js/heading.js';

describe('headingLevel', () => {
  const table: [unknown, number][] = [
    [2, 2], [3, 3], [4, 4], [5, 5], [6, 6],
    [1, 2], [0, 2], [-1, 2], [7, 6], [100, 6], [-Infinity, 2], [Infinity, 6],
    [3.5, 3], [NaN, 3], [undefined, 3], [null, 3], [{}, 3], [[], 3], [true, 3],
    ['3', 3], [' 4 ', 4], ['1', 2], ['9', 6], ['3.5', 3], ['', 3], ['h3', 3], ['abc', 3],
  ];
  it.each(table)('%j -> %i', (input, expected) => {
    expect(headingLevel(input)).toBe(expected);
  });
});

describe('headingTag', () => {
  it.each([[2, 'h2'], [3, 'h3'], [6, 'h6'], [1, 'h2'], [0, 'h2'], [7, 'h6'], [3.5, 'h3'], [NaN, 'h3'], [undefined, 'h3'], [null, 'h3'], ['3', 'h3'], ['5', 'h5'], [-1, 'h2']])('%j -> %s', (input, expected) => {
    expect(headingTag(input)).toBe(expected);
  });
});

describe('nextLevel', () => {
  const table: [unknown, unknown, number][] = [
    [2, undefined, 3], [3, undefined, 4], [5, undefined, 6], [6, undefined, 6],
    [2, 2, 4], [3, 3, 6], [3, 10, 6],
    [4, -1, 3], [3, -5, 2], [2, 0, 2],
    // ohne Vorfahr (ungültig/fehlend) zählt die Ausgangsebene 2
    [undefined, undefined, 3], [null, undefined, 3], [NaN, undefined, 3], [undefined, 2, 4], ['x', 1, 3],
    // ungültiges by -> 1
    [2, NaN, 3], [2, 1.5, 3], [2, '2', 3], [2, null, 3],
    // Zahlen-Zeichenketten gelten wie Zahlen
    ['3', undefined, 4],
    // Werte außerhalb 2..6 werden zuerst begrenzt
    [1, undefined, 3], [9, undefined, 6],
  ];
  it.each(table)('(%j, %j) -> %i', (current, by, expected) => {
    expect(nextLevel(current, by as number | undefined)).toBe(expected);
  });
});

describe('resolveHeading: titleAs > Ebene aus HeadingLevel > h3', () => {
  it.each([
    ['h2', undefined, 'h2'], ['h5', 3, 'h5'], ['h6', 2, 'h6'], ['h4', 6, 'h4'],
    [undefined, undefined, 'h3'], [undefined, 4, 'h4'], [undefined, 6, 'h6'], [undefined, 2, 'h2'], [undefined, 7, 'h6'],
    // h1 und Fremdwerte sind keine gültige titleAs: Rückfall auf die Ebene
    ['h1', 4, 'h4'], ['div', undefined, 'h3'], ['', 5, 'h5'], [null, 4, 'h4'], ['H3', 5, 'h5'],
  ])('(%j, %j) -> %s', (titleAs, level, expected) => {
    expect(resolveHeading(titleAs as string | undefined, level as number | undefined)).toBe(expected);
  });
});

describe('levelOfTag', () => {
  it.each([['h2', 2], ['h3', 3], ['h4', 4], ['h5', 5], ['h6', 6], ['h1', 3], ['H3', 3], ['div', 3], [4, 3], [undefined, 3], [null, 3]])('%j -> %i', (tag, expected) => {
    expect(levelOfTag(tag)).toBe(expected);
  });
  it('ist die Umkehrung von headingTag für 2 bis 6', () => {
    for (const level of [2, 3, 4, 5, 6]) expect(levelOfTag(headingTag(level))).toBe(level);
  });
});
