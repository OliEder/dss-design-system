import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlayerCard } from './PlayerCard';
import { expectNoA11yViolations } from './test-utils';

const VITALS = [
  { label: 'PTS', value: 22, accent: true },
  { label: 'REB', value: 6 },
  { label: 'AST', value: 4 },
  { label: 'FG%', value: '48' },
];

describe('PlayerCard', () => {
  it('rendert compact als div mit Trikot, Name, Position und Statistik', () => {
    const { container } = render(
      <PlayerCard size="compact" jersey={4} name="J. Tanner" position="PG" captain playerRole="Spielmacher" stat={22} statLabel="PTS" />,
    );
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild).toHaveClass('dss-pc-row');
    expect(screen.getByText('J. Tanner (C)')).toBeInTheDocument();
    expect(container.querySelector('.dss-tn')).toHaveClass('heim', 'small', 'captain');
    expect(container.querySelector('.dss-pos')).toHaveClass('pg');
    expect(container.querySelector('.dss-pos')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('22')).toBeInTheDocument();
  });

  it('wird compact mit onClick zum Button', () => {
    const onClick = vi.fn();
    render(<PlayerCard size="compact" jersey={7} name="M. Okafor" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /M. Okafor/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('rendert standard mit Überschrift, Kapitän-Marke, Alter, Größe und Kennzahlen', () => {
    const { container } = render(
      <PlayerCard size="standard" jersey={13} name="K. Vogler" position="PF" team="gast" captain age="24 J." heightCm="198" vitals={VITALS} />,
    );
    expect(container.firstElementChild).toHaveClass('dss-pc-card');
    expect(screen.getByRole('heading', { name: 'K. Vogler', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Kapitän')).toHaveClass('dss-pc-cap');
    expect(screen.getByText('198 cm')).toBeInTheDocument();
    expect(container.querySelector('.dss-tn')).toHaveClass('gast', 'large');
    expect(container.querySelectorAll('.dss-pc-vitals .dss-pc-v')).toHaveLength(4);
    expect(container.querySelector('.dss-pc-v--amber')).toHaveTextContent('22');
  });

  it('rendert hero mit großer Trikotnummer und wählbarer Überschriftenebene', () => {
    const { container } = render(<PlayerCard size="hero" jersey={9} name="H. Lorenz" titleAs="h2" vitals={VITALS} />);
    expect(container.firstElementChild).toHaveClass('dss-pc-hero');
    expect(container.querySelector('.dss-tn')).toHaveClass('hero');
    expect(screen.getByRole('heading', { name: 'H. Lorenz', level: 2 })).toBeInTheDocument();
  });

  it('lässt Kennzahlen weg, wenn keine übergeben werden', () => {
    const { container } = render(<PlayerCard jersey={1} name="X" />);
    expect(container.querySelector('.dss-pc-vitals')).toBeNull();
  });

  it.each(['compact', 'standard', 'hero'] as const)('hat in %s keine A11y-Verstöße', async (size) => {
    const { container } = render(<PlayerCard size={size} jersey={4} name="J. Tanner" position="PG" vitals={VITALS} stat={22} statLabel="PTS" />);
    await expectNoA11yViolations(container);
  });
});
