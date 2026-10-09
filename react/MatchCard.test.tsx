import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MatchCard } from './MatchCard';
import { expectNoA11yViolations } from './test-utils';

const HEIM = { name: 'TSV Nordhain' };
const GAST = { name: 'Lindenberg Hawks' };

describe('MatchCard', () => {
  it('zeigt in „scheduled“ Datum, Uhrzeit, Halle und keine Punkte', () => {
    const { container } = render(
      <MatchCard league="BBL" matchday="17. Spieltag" date="Sa 12.10." time="18:00" venue="Halle Nord" heim={{ ...HEIM, score: 0 }} gast={GAST} />,
    );
    expect(container.firstElementChild).toHaveClass('dss-match', 'dss-match--scheduled');
    expect(screen.getByText('Sa 12.10. · 18:00')).toBeInTheDocument();
    expect(screen.getByText('Halle Nord')).toBeInTheDocument();
    expect(container.querySelector('.dss-match-score')).toBeNull();
  });

  it('zeigt in „live“ Spielstand, Viertel und Uhr', () => {
    const { container } = render(<MatchCard state="live" quarter="Q4" clock="02:14" heim={{ ...HEIM, score: 87 }} gast={{ ...GAST, score: 64 }} />);
    expect(container.firstElementChild).toHaveClass('dss-match--live');
    expect(screen.getByText(/Live · Q4 02:14/)).toBeInTheDocument();
    expect(screen.getByText('87')).toBeInTheDocument();
    expect(screen.getByText('64')).toBeInTheDocument();
  });

  it('markiert in „finished“ den Verlierer', () => {
    const { container } = render(<MatchCard state="finished" heim={{ ...HEIM, score: 80 }} gast={{ ...GAST, score: 70 }} />);
    expect(screen.getByText('Endstand')).toBeInTheDocument();
    const teams = container.querySelectorAll('.dss-match-team');
    expect(teams[0]).not.toHaveClass('is-loser');
    expect(teams[1]).toHaveClass('is-loser');
  });

  it('rendert ohne href und onClick ein div', () => {
    const { container } = render(<MatchCard heim={HEIM} gast={GAST} />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('wird mit onClick zum Button und löst den Handler aus', () => {
    const onClick = vi.fn();
    render(<MatchCard heim={HEIM} gast={GAST} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /TSV Nordhain/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('wird mit href zum Link', () => {
    render(<MatchCard heim={HEIM} gast={GAST} href="/spiele/42" />);
    expect(screen.getByRole('link', { name: /TSV Nordhain/ })).toHaveAttribute('href', '/spiele/42');
  });

  it('hat keine A11y-Verstöße (Link und live)', async () => {
    const { container } = render(
      <MatchCard state="live" quarter="Q2" clock="05:00" venue="Halle" heim={{ ...HEIM, score: 30 }} gast={{ ...GAST, score: 28 }} href="/s" />,
    );
    await expectNoA11yViolations(container);
  });
});
