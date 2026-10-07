import type { MouseEventHandler } from 'react';
import { cn } from './cn';

export type MatchState = 'scheduled' | 'live' | 'finished';

export interface MatchTeam {
  name: string;
  score?: number;
}

export interface MatchCardProps {
  state?: MatchState;
  league?: string;
  matchday?: string;
  date?: string;
  time?: string;
  venue?: string;
  heim: MatchTeam;
  gast: MatchTeam;
  /** Nur bei `live`: Spielviertel und Uhr. */
  quarter?: string;
  clock?: string;
  /** Mit `href` wird die Karte ein Link, mit `onClick` ein Button, sonst ein div. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

/** Spielkarte in drei Zuständen: angesetzt, live, beendet (Sieger/Verlierer). */
export function MatchCard({
  state = 'scheduled',
  league,
  matchday,
  date,
  time,
  venue,
  heim,
  gast,
  quarter = '',
  clock = '',
  href,
  onClick,
  className,
}: MatchCardProps) {
  const heimWin = state === 'finished' && (heim.score ?? 0) > (gast.score ?? 0);
  const gastWin = state === 'finished' && (gast.score ?? 0) > (heim.score ?? 0);
  const showScore = state !== 'scheduled';

  const body = (
    <>
      <span className="dss-match-head">
        <span className="dss-match-league">
          {league ? <span>{league}</span> : null}
          {matchday ? <span className="dss-match-muted">· {matchday}</span> : null}
        </span>
        {state === 'live' ? (
          <span className="dss-match-live">
            <span className="dss-match-pulse" aria-hidden="true" /> Live · {quarter} {clock}
          </span>
        ) : state === 'finished' ? (
          <span className="dss-match-final">Endstand</span>
        ) : date ? (
          <span className="dss-match-when">
            {date}
            {time ? ` · ${time}` : ''}
          </span>
        ) : null}
      </span>
      <span className="dss-match-body">
        <span className={cn('dss-match-team', gastWin && 'is-loser')}>
          <span className="dss-match-dot" aria-hidden="true" />
          <span className="dss-match-name">{heim.name}</span>
          {showScore && heim.score !== undefined ? <span className="dss-match-score">{heim.score}</span> : null}
        </span>
        <span className={cn('dss-match-team', 'dss-match-team--gast', heimWin && 'is-loser')}>
          <span className="dss-match-dot" aria-hidden="true" />
          <span className="dss-match-name">{gast.name}</span>
          {showScore && gast.score !== undefined ? <span className="dss-match-score">{gast.score}</span> : null}
        </span>
      </span>
      {venue ? (
        <span className="dss-match-foot">
          <span>{venue}</span>
        </span>
      ) : null}
    </>
  );

  const cls = cn('dss-match', `dss-match--${state}`, className);
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {body}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {body}
      </button>
    );
  }
  return <div className={cls}>{body}</div>;
}
