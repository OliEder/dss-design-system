import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayByPlay, type PbpEvent } from './PlayByPlay';
import { expectNoA11yViolations } from './test-utils';

const EVENTS: PbpEvent[] = [
  { id: 1, time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'N. Wimberg #7', detail: 'Assist · T. Reuter #13', score: { heim: 87, gast: 64 } },
  { id: 2, time: '03:05', quarter: 'Q4', team: 'gast', kind: 'foul', title: '5. Foul · M. Wagner #23', score: { heim: 84, gast: 64 } },
  { id: 3, time: '04:45', quarter: 'Q4', team: 'none', kind: 'sub', title: 'Auswechslung' },
];

describe('PlayByPlay', () => {
  it('rendert Titel als Überschrift und den Feed als benanntes Log', () => {
    render(<PlayByPlay events={EVENTS} title="Spielverlauf" />);
    expect(screen.getByRole('heading', { name: 'Spielverlauf', level: 3 })).toBeInTheDocument();
    const log = screen.getByRole('log', { name: 'Spielverlauf' });
    expect(log).toHaveAttribute('tabindex', '0');
  });

  it('rendert jedes Ereignis mit Zeit, Viertel, fettem Titelteil und Detail', () => {
    const { container } = render(<PlayByPlay events={EVENTS} />);
    expect(container.querySelectorAll('.dss-pbp-event')).toHaveLength(3);
    expect(screen.getByText('02:14')).toBeInTheDocument();
    expect(screen.getByText('Drei-Punkte-Wurf').tagName).toBe('B');
    expect(screen.getByText('Assist · T. Reuter #13')).toHaveClass('dss-pbp-detail');
  });

  it('setzt die Ereignisart als Klasse und die Teamfarbe am Streifen', () => {
    const { container } = render(<PlayByPlay events={EVENTS} />);
    const events = container.querySelectorAll('.dss-pbp-event');
    expect(events[1]).toHaveClass('dss-pbp-event--foul');
    expect(events[2]).toHaveClass('dss-pbp-event--sub');
    const strips = container.querySelectorAll('.dss-pbp-strip');
    expect(strips[0]).toHaveClass('dss-pbp-strip--heim');
    expect(strips[1]).toHaveClass('dss-pbp-strip--gast');
    expect(strips[2]).toHaveClass('dss-pbp-strip--none');
    strips.forEach((strip) => expect(strip).toHaveAttribute('aria-hidden', 'true'));
  });

  it('sagt die Mannschaft per Screenreader-Text an', () => {
    render(<PlayByPlay events={EVENTS} />);
    expect(screen.getAllByText('Heim:')[0]).toHaveClass('dss-sr-only');
    expect(screen.getAllByText('Gast:')[0]).toHaveClass('dss-sr-only');
  });

  it('beschriftet den Spielstand zusammenhängend und lässt ihn ohne Score weg', () => {
    const { container } = render(<PlayByPlay events={EVENTS} />);
    expect(screen.getByText('Spielstand 87 zu 64')).toHaveClass('dss-sr-only');
    const visible = container.querySelector('.dss-pbp-score [aria-hidden="true"]');
    expect(visible).toHaveTextContent('87:64');
    expect(container.querySelectorAll('.dss-pbp-score')).toHaveLength(2);
  });

  it('zeigt Live-Marke, Meta und dunkle Fläche', () => {
    const { container } = render(<PlayByPlay events={EVENTS} live meta="Q4" dark />);
    expect(container.firstElementChild).toHaveClass('dss-pbp-frame', 'dss-pbp-frame--dark');
    expect(container.querySelector('.dss-pbp-live')).toHaveTextContent('Live');
    expect(container.querySelector('.dss-pbp-meta')).toHaveTextContent('Q4');
  });

  it('blendet die Live-Marke aus, wenn live false ist', () => {
    const { container } = render(<PlayByPlay events={EVENTS} live={false} />);
    expect(container.querySelector('.dss-pbp-live')).toBeNull();
  });

  it('hat keine A11y-Verstöße', async () => {
    const { container } = render(<PlayByPlay events={EVENTS} />);
    await expectNoA11yViolations(container);
  });
});
