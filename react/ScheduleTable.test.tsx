import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ScheduleTable } from './ScheduleTable';
import type { ScheduleGame } from './schedule-types';
import { expectNoA11yViolations } from './test-utils';

const VERSUS: ScheduleGame[] = [
  {
    id: 'v1', state: 'finished', section: 'Spieltag 5', date: 'Sa, 11.10.2026', time: '18:00',
    heim: { name: 'TSV Tröster', href: '/teams/troester', score: 87, own: true },
    gast: { name: 'USC Heidelberg', score: 64 },
    league: { name: 'Bayernliga Süd', href: '/ligen/by' },
  },
  {
    id: 'v2', state: 'scheduled', section: 'Spieltag 6', date: 'Sa, 18.10.2026', time: '18:00',
    heim: { name: 'TV Lich' }, gast: { name: 'TSV Tröster', own: true },
  },
];

const PERSPECTIVE: ScheduleGame[] = [
  {
    id: 'p1', state: 'finished', date: 'Sa, 26.09.2026', time: '17:30', at: 'heim',
    opponent: { name: 'TSV Jahn Freising', href: '/teams/freising', score: 108 }, ownScore: 65,
  },
  {
    id: 'p2', state: 'finished', date: 'Sa, 03.10.2026', time: '17:30', at: 'heim', provisional: true,
    opponent: { name: 'Dukes Dingolfing', score: 0 }, ownScore: 20,
  },
  {
    id: 'p3', state: 'scheduled', date: 'Sa, 10.10.2026', time: '19:30', at: 'gast',
    opponent: { name: 'Nürnberger Basketball Club', logo: '/logos/nbc.png' },
  },
];

const TOURNAMENT: ScheduleGame[] = [
  {
    id: 't1', state: 'live', nr: '#3', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F1',
    heim: { name: 'TSV Tröster', score: 18, own: true }, gast: { name: 'TV Lich', score: 20 },
  },
  {
    id: 't2', state: 'cancelled', nr: '#4', section: 'Runde 2 · Gruppe A', time: '09:30–09:50', field: 'F2',
    heim: { name: 'USC Heidelberg' }, gast: { name: 'SV Aschaffenburg' }, note: 'Rückzug SV Aschaffenburg',
  },
  {
    id: 't3', state: 'bye', nr: '#5', section: 'Runde 2 · Gruppe A', time: '09:30–09:50',
    heim: { name: 'BG Zirndorf' },
  },
  {
    id: 't4', state: 'scheduled', nr: '#9', section: 'Halbfinale', time: '11:00–11:20', field: 'F1',
    heim: { name: 'Erster Gruppe A', placeholder: true }, gast: { name: 'Zweiter Gruppe B', placeholder: true },
  },
];

describe('ScheduleTable · versus', () => {
  it('zeigt Gruppenzeilen, Teams als Links und die Liga als Unterzeile', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    const groups = container.querySelectorAll('tr.dss-sch-group th');
    expect([...groups].map((g) => g.textContent)).toEqual(['Spieltag 5', 'Spieltag 6']);
    expect(groups[0]).toHaveAttribute('colspan', '3');
    expect(groups[0]).toHaveAttribute('scope', 'colgroup');
    expect(screen.getByRole('link', { name: 'TSV Tröster' })).toHaveAttribute('href', '/teams/troester');
    expect(screen.getByRole('link', { name: 'Bayernliga Süd' })).toHaveAttribute('href', '/ligen/by');
  });

  it('spricht das Ergebnis aus und blendet den Verlierer ab', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    expect(screen.getByText('Heim 87, Gast 64')).toHaveClass('dss-sr-only');
    const teams = container.querySelectorAll('tr.dss-sch-row')[0].querySelectorAll('.dss-sch-team');
    expect(teams[0]).not.toHaveClass('is-loser');
    expect(teams[1]).toHaveClass('is-loser');
  });

  it('zeigt "–" ohne Ergebnis und markiert die eigene Mannschaft', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    const rows = container.querySelectorAll('tr.dss-sch-row');
    expect(rows[0]).toHaveClass('is-own');
    expect(rows[1].querySelector('.dss-sch-none')).toHaveTextContent('–');
  });

  it('wählt touch bei Liga-Unterzeile und default sonst', () => {
    const { container, rerender } = render(<ScheduleTable games={VERSUS} />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--touch');
    rerender(<ScheduleTable games={[VERSUS[1]]} />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--default');
    rerender(<ScheduleTable games={[VERSUS[1]]} density="compact" />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--compact');
  });

  it('versteckt den Tabellenkopf visuell, behält ihn aber für Screenreader', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('dss-sr-only');
    expect([...container.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual(['Zeit', 'Spiel', 'Ergebnis']);
  });

  it('trägt Tabellen-Rollen für die Handy-Ansicht', () => {
    const { container } = render(<ScheduleTable games={VERSUS} />);
    expect(container.querySelector('table')).toHaveAttribute('role', 'table');
    expect(container.querySelector('tbody')).toHaveAttribute('role', 'rowgroup');
    expect(container.querySelector('tr.dss-sch-row')).toHaveAttribute('role', 'row');
    expect(container.querySelector('td')).toHaveAttribute('role', 'cell');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleTable games={VERSUS} title="Bayernliga" caption="Spielplan" />);
    await expectNoA11yViolations(container);
  });
});

describe('ScheduleTable · opponent', () => {
  it('zeigt Chip vs. oder @, Logo oder Initialen und die Bewertung', () => {
    const { container } = render(<ScheduleTable games={PERSPECTIVE} />);
    expect(container.querySelector('table')).toHaveClass('dss-tbl--touch');
    const chips = [...container.querySelectorAll('.dss-sch-ha .dss-chip')].map((c) => c.textContent);
    expect(chips).toEqual(['vs.', 'vs.', '@']);
    const logos = container.querySelectorAll('.dss-sch-logo');
    expect(logos[0]).toHaveTextContent('TJF');
    expect(logos[2].querySelector('img')).toHaveAttribute('src', '/logos/nbc.png');
    expect(screen.getByText('Eigene 65, Gegner 108, Niederlage')).toBeInTheDocument();
    expect(container.querySelector('.dss-chip--err')).toHaveTextContent('N');
  });

  it('zeigt vorläufig und Sieg-Chip, bei offenem Spiel nur "–"', () => {
    const { container } = render(<ScheduleTable games={PERSPECTIVE} />);
    expect(screen.getByText('Eigene 20, Gegner 0, Sieg, vorläufig')).toBeInTheDocument();
    expect(container.querySelector('.dss-chip--ok')).toHaveTextContent('S');
    const rows = container.querySelectorAll('tr.dss-sch-row');
    expect(within(rows[2] as HTMLElement).getByText('–')).toBeInTheDocument();
    expect(within(rows[2] as HTMLElement).queryByText(/Eigene/)).toBeNull();
  });

  it('nimmt einen gesetzten outcome statt der Rechnung (Forfait)', () => {
    const forfeit: ScheduleGame = { ...PERSPECTIVE[0], id: 'f', ownScore: 0, opponent: { name: 'X', score: 20 }, outcome: 'S' };
    const { container } = render(<ScheduleTable games={[forfeit]} />);
    expect(container.querySelector('.dss-chip--ok')).toHaveTextContent('S');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleTable games={PERSPECTIVE} caption="Spielplan" />);
    await expectNoA11yViolations(container);
  });
});

describe('ScheduleTable · columns (Turnier)', () => {
  it('zeigt sichtbaren Kopf nur mit Spalten, für die Daten vorliegen', () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" />);
    expect(container.querySelector('thead')).not.toHaveClass('dss-sr-only');
    expect([...container.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual([
      'Nr', 'Zeit', 'Feld', 'Heim', 'Ergebnis', 'Gast',
    ]);
  });

  it('zeigt Live hinter der Uhrzeit, durchgestrichen bei abgesagt und den Grund', () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" />);
    const rows = container.querySelectorAll('tr.dss-sch-row');
    expect(rows[0]).toHaveClass('is-live');
    const when = rows[0].querySelector('.dss-sch-when') as HTMLElement;
    expect(when.querySelector('.dss-sch-time')).toHaveTextContent('09:30–09:50');
    expect(when.querySelector('.dss-match-live')).toHaveTextContent('Live');
    expect(screen.getByText('Heim 18, Gast 20, läuft')).toHaveClass('dss-sr-only');
    expect(rows[1]).toHaveClass('is-cancelled');
    expect(screen.getByText('Rückzug SV Aschaffenburg')).toHaveClass('dss-sch-note');
  });

  it('zeigt Freilos als Zeile über alle Spalten und Platzhalter kursiv', () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" />);
    const bye = container.querySelector('tr.is-bye td') as HTMLElement;
    expect(bye).toHaveAttribute('colspan', '6');
    expect(bye).toHaveTextContent('BG Zirndorf hat Freilos');
    expect(screen.getByText('Erster Gruppe A')).toHaveClass('dss-sch-ph');
  });

  it('rendert Slots für Zeit, Hinweis und Router-Links', () => {
    const games: ScheduleGame[] = [{ ...TOURNAMENT[0], heim: { name: 'TSV Tröster', href: '/t/1' } }];
    const { container } = render(
      <ScheduleTable
        games={games}
        layout="columns"
        renderTime={(g) => <input aria-label={`Start ${g.nr}`} defaultValue={g.time} />}
        renderNotice={() => <span className="dss-chip dss-chip--warn">Sperrzeit</span>}
        renderLink={({ href, className, children }) => (
          <a data-router className={className} href={href}>
            {children}
          </a>
        )}
      />,
    );
    expect(screen.getByLabelText('Start #3')).toHaveValue('09:30–09:50');
    expect(screen.getByText('Sperrzeit')).toBeInTheDocument();
    expect(container.querySelector('a[data-router]')).toHaveAttribute('href', '/t/1');
    const heads = container.querySelectorAll('thead th');
    expect(heads[heads.length - 1]).toHaveTextContent('Hinweis');
  });

  it('hat keine axe-Verstöße', async () => {
    const { container } = render(<ScheduleTable games={TOURNAMENT} layout="columns" caption="Spielplan" />);
    await expectNoA11yViolations(container);
  });
});
