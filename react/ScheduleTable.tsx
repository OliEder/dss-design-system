import { Fragment, type ReactNode } from 'react';
import { cn } from './cn';
import {
  ariaForResult,
  columnsFor,
  densityFor,
  groupBySection,
  hasScore,
  initials,
  layoutFor,
  resolveOutcome,
  stateLabel,
  winnerSide,
} from '../js/schedule.js';
import { LiveTag, ResultText, TeamName, type ScheduleRenderLink } from './ScheduleParts';
import type { ScheduleDensity, ScheduleGame, ScheduleLayout } from './schedule-types';

export type { ScheduleLinkProps } from './ScheduleParts';

export interface ScheduleTableProps {
  games: ScheduleGame[];
  /**
   * Art der Spiel-Zelle; Standard: `opponent`, sobald ein Spiel `opponent` hat, sonst `versus`.
   * `columns` und `versus` brauchen `heim`/`gast`; Spiele, die nur `opponent` haben, zeigen dort "?" für die
   * fehlenden Teams und kein Ergebnis.
   */
  layout?: ScheduleLayout;
  /** Zeilenhöhe; Standard: `touch` bei `opponent` oder Liga-Unterzeile, sonst `default`. */
  density?: ScheduleDensity;
  /** Titel im Rahmenkopf. */
  title?: ReactNode;
  /** Überschriftenebene des Titels; Standard: `h3`. */
  titleAs?: 'h2' | 'h3' | 'h4';
  /** Angaben rechts im Rahmenkopf, z. B. Saison oder Stand. */
  meta?: ReactNode;
  /** Unsichtbare Tabellenbeschriftung für Screenreader. */
  caption?: string;
  /** Zusätzliche Klasse am äußeren Rahmen. */
  className?: string;
  /** Router-Links für Teamnamen und Liga. */
  renderLink?: ScheduleRenderLink;
  /** Ersetzt die Uhrzeit, z. B. durch eine bearbeitbare Startzeit. */
  renderTime?: (game: ScheduleGame) => ReactNode;
  /** Zusätzliche Zelle am Zeilenende, z. B. Konflikt-Badge. */
  renderNotice?: (game: ScheduleGame) => ReactNode;
}

const OUTCOME_CHIP = { S: 'dss-chip--ok', N: 'dss-chip--err', U: '' } as const;

/** Spielplan als Tabelle: Gegenüberstellung, Perspektive einer Mannschaft oder Turnier-Spalten. */
export function ScheduleTable({
  games,
  layout,
  density,
  title,
  titleAs: Heading = 'h3',
  meta,
  caption,
  className,
  renderLink,
  renderTime,
  renderNotice,
}: ScheduleTableProps) {
  const mode: ScheduleLayout = layout ?? layoutFor(games);
  const dens: ScheduleDensity = density ?? densityFor(games, mode);
  const cols = columnsFor(mode, games, Boolean(renderNotice));
  const groups = groupBySection(games);
  const hasHead = Boolean(title || meta);

  const league = (game: ScheduleGame) =>
    game.league ? (
      <span className="dss-sch-sub">
        {game.league.href ? (
          renderLink ? (
            renderLink({ href: game.league.href, className: 'dss-link', children: game.league.name })
          ) : (
            <a className="dss-link" href={game.league.href}>
              {game.league.name}
            </a>
          )
        ) : (
          game.league.name
        )}
      </span>
    ) : null;

  const note = (game: ScheduleGame) => (game.note ? <span className="dss-sch-note">{game.note}</span> : null);

  const cell = (key: string, game: ScheduleGame): ReactNode => {
    const winner = winnerSide(game);
    switch (key) {
      case 'nr':
        return (
          <td key={key} role="cell" className="dss-sch-nr">
            {game.nr}
          </td>
        );
      case 'when':
        return (
          <td key={key} role="cell" className="dss-sch-when">
            {game.date ? <span className="dss-sch-date">{game.date}</span> : null}
            {renderTime || game.time ? <span className="dss-sch-time">{renderTime ? renderTime(game) : game.time}</span> : null}
            {stateLabel(game.state) ? <span className="dss-sr-only">{` ${stateLabel(game.state)}`}</span> : null}
            {game.state === 'live' ? <LiveTag /> : null}
            {mode !== 'columns' && game.venue ? <span className="dss-sch-venue">{game.venue}</span> : null}
          </td>
        );
      case 'ha':
        return (
          <td key={key} role="cell" className="dss-sch-ha">
            <span className={cn('dss-chip dss-chip--mono', game.at === 'gast' ? 'dss-chip--amber' : 'dss-chip--sky')}>
              {game.at === 'gast' ? '@' : 'vs.'}
            </span>
          </td>
        );
      case 'match':
        return (
          <td key={key} role="cell" className="dss-sch-match">
            {mode === 'opponent' && game.opponent ? (
              <span className="dss-sch-opp">
                <span className="dss-sch-logo" aria-hidden="true">
                  {game.opponent.logo ? <img src={game.opponent.logo} alt="" /> : initials(game.opponent.name)}
                </span>
                <TeamName team={game.opponent} renderLink={renderLink} />
              </span>
            ) : (
              <>
                <TeamName team={game.heim} loser={winner === 'gast'} renderLink={renderLink} />
                <span className="dss-sch-sep" aria-hidden="true">
                  {' – '}
                </span>
                <span className="dss-sr-only"> gegen </span>
                <TeamName team={game.gast} loser={winner === 'heim'} renderLink={renderLink} />
              </>
            )}
            {league(game)}
            {note(game)}
          </td>
        );
      case 'heim':
        return (
          <td key={key} role="cell" className="dss-sch-heim">
            <TeamName team={game.heim} loser={winner === 'gast'} renderLink={renderLink} />
          </td>
        );
      case 'gast':
        return (
          <td key={key} role="cell" className="dss-sch-gast">
            <TeamName team={game.gast} loser={winner === 'heim'} renderLink={renderLink} />
            {note(game)}
          </td>
        );
      case 'field':
        return (
          <td key={key} role="cell" className="dss-sch-field-cell">
            {game.field ? (
              <span className="dss-chip dss-chip--mono dss-sch-field" title={game.field}>
                {game.field}
              </span>
            ) : null}
          </td>
        );
      case 'venue':
        return (
          <td key={key} role="cell" className="dss-sch-venue-cell">
            {game.venue}
          </td>
        );
      case 'res': {
        const scored = (game.state === 'finished' || game.state === 'live') && hasScore(game, mode);
        if (!scored) {
          return (
            <td key={key} role="cell" className="dss-sch-res">
              <span className="dss-sch-none">–</span>
            </td>
          );
        }
        const result = mode === 'opponent' ? resolveOutcome(game) : undefined;
        const visible =
          mode === 'opponent' && game.opponent
            ? `${game.ownScore} : ${game.opponent.score}`
            : `${game.heim?.score} : ${game.gast?.score}`;
        return (
          <td key={key} role="cell" className="dss-sch-res">
            {result ? (
              <span className={cn('dss-chip dss-chip--mono', OUTCOME_CHIP[result])} aria-hidden="true">
                {result}
              </span>
            ) : null}
            <ResultText visible={visible} spoken={ariaForResult(game, mode)} provisional={game.provisional} />
          </td>
        );
      }
      case 'notice':
        return (
          <td key={key} role="cell" className="dss-sch-notice">
            {renderNotice ? renderNotice(game) : null}
          </td>
        );
      default:
        return null;
    }
  };

  const row = (game: ScheduleGame): ReactNode => {
    const own = game.heim?.own || game.gast?.own;
    const classes = cn(
      'dss-sch-row',
      own && mode !== 'opponent' && 'is-own',
      game.state === 'live' && 'is-live',
      game.state === 'cancelled' && 'is-cancelled',
      game.state === 'postponed' && 'is-postponed',
      game.state === 'bye' && 'is-bye',
    );
    if (game.state === 'bye') {
      return (
        <tr key={game.id} role="row" className={classes}>
          <td role="cell" className="dss-sch-bye" colSpan={cols.length}>
            {game.time ? <span className="dss-sch-time">{game.time} · </span> : null}
            {game.heim ? `${game.heim.name} hat Freilos` : (game.note ?? 'Spielfrei')}
          </td>
        </tr>
      );
    }
    return (
      <tr key={game.id} role="row" className={classes}>
        {cols.map((col) => cell(col.key, game))}
      </tr>
    );
  };

  return (
    <div className={cn('dss-frame', className)}>
      {hasHead ? (
        <div className="dss-frame-head">
          {/* Platzhalter, damit die Meta-Angaben rechts stehen */}
          {title ? <Heading className="dss-frame-title">{title}</Heading> : <span />}
          <div className="dss-frame-meta">{meta ? <span>{meta}</span> : null}</div>
        </div>
      ) : null}
      {/* Scrollbereich ist fokussierbar, damit Tastaturnutzer ihn scrollen können (WCAG 2.1.1) */}
      <div className="dss-table-scroll" role="region" tabIndex={0} aria-label={caption || (typeof title === 'string' && title) || 'Spielplan'}>
        <table role="table" className={cn('dss-tbl dss-tbl--schedule', `dss-tbl--${dens}`, `dss-sch--${mode}`)}>
          {caption ? <caption className="dss-sr-only">{caption}</caption> : null}
          <thead role="rowgroup" className={mode === 'columns' ? undefined : 'dss-sr-only'}>
            <tr role="row">
              {cols.map((col) => (
                <th key={col.key} scope="col" role="columnheader">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup">
            {groups.map((group, index) => (
              <Fragment key={`${group.section ?? 'ohne'}-${index}`}>
                {group.section ? (
                  <tr role="row" className="dss-sch-group">
                    <th scope="colgroup" colSpan={cols.length}>
                      {group.section}
                    </th>
                  </tr>
                ) : null}
                {group.games.map(row)}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
