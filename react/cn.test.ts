import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('verbindet Klassen mit Leerzeichen', () => {
    expect(cn('a', 'b')).toBe('a b');
  });
  it('ignoriert falsy-Werte', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b');
  });
  it('liefert einen leeren String ohne Eingabe', () => {
    expect(cn()).toBe('');
  });
});
