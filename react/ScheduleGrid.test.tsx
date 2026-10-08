import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ScheduleGrid } from './ScheduleGrid';
import type { ScheduleGame, ScheduleGridColumn } from './schedule-types';
import { expectNoA11yViolations } from './test-utils';

const COLUMNS: ScheduleGridColumn[] = [
  { id: 'f1', label: 'Sporthalle Breitengüßbach' },
  { id: 'f2', label: 'Feld 2' },
];

const GAMES: ScheduleGame[] = [
  {
    id: 'a', state: 'finished', nr: '#1', section: 'Gruppe A', time: '09:00', column: 'f1',
    heim: { name: 'TSV Tröster', score: 42, own: true }, gast: { name: 'USC Heidelberg', score: 31 },
  },
  {
    id: 'b', state: 'live', nr: '#2', section: 'Gruppe A', time: '09:00', column: 'f2',
    heim: { name: 'BG Zirndorf', score: 12 }, gast: { name: 'TV Lich', score: 10 },
  },
  {
    id: 'c', state: 'cancelled', nr: '#3', time: '09:30', column: 'f1', note: 'Rückzug TV Lich',
    heim: { name: 'TSV Tröster' }, gast: { name: 'TV Lich' },
  },
  {
    id: 'd', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00', column: 'f1',
    heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true },
  },
  { id: 'e', state: 'bye', time: '09:30', heim: { name: 'MTV Ansbach' } },
];

describe('ScheduleGrid', () => {
  it('zeigt Zeit als Zeilenkopf und freie Hallennamen als Spaltenköpfe', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    expect([...container.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual([
      'Zeit', 'Sporthalle Breitengüßbach', 'Feld 2',
    ]);
    const rowHeads = [...container.querySelectorAll('tbody th[scope="row"]')].map((th) => th.textContent);
    expect(rowHeads).toEqual(['09:00', '09:30', '09:30', '11:00']);
  });

  it('setzt die Spiele in die richtige Spalte und zeigt leere Zellen als "frei"', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    const firstRow = container.querySelector('tbody tr') as HTMLElement;
    const cells = firstRow.querySelectorAll('td.dss-sg-cell');
    expect(within(cells[0] as HTMLElement).getByText('TSV Tröster')).toBeInTheDocument();
    expect(within(cells[1] as HTMLElement).getByText('BG Zirndorf')).toBeInTheDocument();
    const emptyCells = container.querySelectorAll('td.dss-sg-cell.is-empty');
    expect(emptyCells.length).toBeGreaterThan(0);
    expect(within(emptyCells[0] as HTMLElement).getByText('frei')).toHaveClass('dss-sg-empty');
  });

  it('trägt den Spaltennamen als data-label für die Handy-Ansicht', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    const cells = container.querySelectorAll('tbody tr:first-child td.dss-sg-cell');
    expect(cells[0]).toHaveAttribute('data-label', 'Sporthalle Breitengüßbach');
    expect(cells[1]).toHaveAttribute('data-label', 'Feld 2');
  });

  it('zeigt Zustände in der Zelle: live, Ergebnis, abgesagt, Platzhalter, Meta', () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} />);
    expect(container.querySelector('.dss-sg-game.is-own')).toBeInTheDocument();
    expect(container.querySelector('.dss-sg-game.is-live .dss-match-live')).toHaveTextContent('Live');
    expect(screen.getByText('Heim 42, Gast 31')).toHaveClass('dss-sr-only');
    expect(screen.getByText('Heim 12, Gast 10, läuft')).toBeInTheDocument();
    expect(container.querySelector('.dss-sg-game.is-cancelled')).toBeInTheDocument();
    expect(screen.getByText('Rückzug TV Lich')).toHaveClass('dss-sch-note');
    expect(screen.getByText('Erster Gruppe A')).toHaveClass('dss-sch-ph');
    expect(screen.getByText('#1 · Gruppe A')).toHaveClass('dss-sg-meta');
  });

  it('zeigt Pausen und Freilose als Zeile über alle Spalten', () => {
    const { container } = render(
      <ScheduleGrid games={GAMES} columns={COLUMNS} breaks={[{ time: '10:00', label: 'Mittagspause' }]} />,
    );
    const pause = container.querySelector('tr.dss-sg-break td') as HTMLElement;
    expect(pause).toHaveAttribute('colspan', '2');
    expect(pause).toHaveTextContent('Mittagspause');
    const bye = container.querySelector('tr.dss-sg-bye td') as HTMLElement;
    expect(bye).toHaveTextContent('MTV Ansbach hat Freilos');
    const order = [...container.querySelectorAll('tbody tr')].map((tr) => tr.className || 'slot');
    expect(order).toEqual(['slot', 'slot', 'dss-sg-bye', 'dss-sg-break', 'slot']);
  });

  it('nutzt eigenen Text für leere Zellen und rendert den Slot notice', () => {
    const { container } = render(
      <ScheduleGrid
        games={GAMES}
        columns={COLUMNS}
        emptyLabel="–"
        renderNotice={(g) => (g.id === 'a' ? <span className="dss-chip dss-chip--warn">Sperrzeit</span> : null)}
      />,
    );
    expect(screen.getByText('Sperrzeit')).toBeInTheDocument();
    expect(container.querySelector('.dss-sg-empty')).toHaveTextContent('–');
  });

  it('druckt kein "undefined" bei beendetem Spiel mit nur opponent und ownScore', () => {
    const perspective: ScheduleGame = {
      id: 'p', state: 'finished', time: '09:00', column: 'f1',
      opponent: { name: 'USC Heidelberg', score: 31 }, ownScore: 42,
    };
    const { container } = render(<ScheduleGrid games={[perspective]} columns={COLUMNS} />);
    expect(container.textContent).not.toContain('undefined');
    expect(container.querySelector('.dss-sg-result')).toBeNull();
  });

  it('druckt kein "undefined" bei gemischtem Spiel (heim/gast ohne Ergebnis plus Perspektive)', () => {
    const mixed: ScheduleGame = {
      id: 'm', state: 'finished', time: '09:00', column: 'f1',
      heim: { name: 'A' }, gast: { name: 'B' },
      opponent: { name: 'C', score: 31 }, ownScore: 42,
    };
    const { container } = render(<ScheduleGrid games={[mixed]} columns={COLUMNS} />);
    expect(container.textContent).not.toContain('undefined');
    expect(container.querySelector('.dss-sg-result')).toBeNull();
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleGrid games={GAMES} columns={COLUMNS} caption="Zeitraster" />);
    await expectNoA11yViolations(container);
  });
});

describe('ScheduleGrid · Zustand als Text', () => {
  const base: ScheduleGame = {
    id: 's', state: 'scheduled', time: '09:00', column: 'f1', heim: { name: 'A' }, gast: { name: 'B' },
  };
  const srTexts = (container: HTMLElement) =>
    [...container.querySelectorAll('.dss-sr-only')].map((el) => el.textContent?.trim());

  it('macht abgesagte Spiele hörbar, als erstes Kind von dss-sg-teams', () => {
    const { container } = render(<ScheduleGrid games={[{ ...base, state: 'cancelled' }]} columns={COLUMNS} />);
    const span = container.querySelector('.dss-sg-teams > .dss-sr-only') as HTMLElement;
    expect(span).toHaveTextContent('abgesagt');
    expect(span).toBe(container.querySelector('.dss-sg-teams')?.firstElementChild);
  });

  it('macht verschobene Spiele hörbar', () => {
    const { container } = render(<ScheduleGrid games={[{ ...base, state: 'postponed' }]} columns={COLUMNS} />);
    expect(container.querySelector('.dss-sg-teams > .dss-sr-only')).toHaveTextContent('verschoben');
  });

  it('sagt bei angesetzten und beendeten Spielen nichts', () => {
    const finished: ScheduleGame = {
      ...base, id: 'f', state: 'finished', heim: { name: 'A', score: 1 }, gast: { name: 'B', score: 2 },
    };
    const { container } = render(<ScheduleGrid games={[base, finished]} columns={COLUMNS} />);
    expect(srTexts(container)).not.toContain('abgesagt');
    expect(srTexts(container)).not.toContain('verschoben');
  });
});
