import { cn } from './cn';

export type PbpTeam = 'heim' | 'gast' | 'none';
export type PbpKind = 'default' | 'score-2p' | 'score-3p' | 'ft' | 'foul' | 'timeout' | 'sub' | 'turnover';

export interface PbpEvent {
  id: string | number;
  /** „M:SS“ */
  time: string;
  /** „Q1“ … „OT“ */
  quarter: string;
  team?: PbpTeam;
  kind?: PbpKind;
  title: string;
  /** Optionaler fett gesetzter Einleitungsteil. */
  titleBold?: string;
  detail?: string;
  /** Kumulierter Spielstand nach dem Ereignis. */
  score?: { heim: number; gast: number };
}

export interface PlayByPlayProps {
  events: PbpEvent[];
  title?: string;
  /** Überschriftenebene des Titels (Standard h3). */
  titleAs?: 'h2' | 'h3' | 'h4';
  meta?: string;
  live?: boolean;
  dark?: boolean;
  className?: string;
}

const TEAM_TEXT = { heim: 'Heim:', gast: 'Gast:' } as const;

/** Live-Scoring-Ereignisstrom: Zeit, Teamstreifen, Aktion, Spielstand; neue Einträge blenden ein. */
export function PlayByPlay({
  events,
  title = 'Play-by-Play · neueste oben',
  titleAs: Heading = 'h3',
  meta = '',
  live = true,
  dark = false,
  className,
}: PlayByPlayProps) {
  return (
    <div className={cn('dss-pbp-frame', dark && 'dss-pbp-frame--dark', className)}>
      <div className="dss-pbp-head">
        <Heading className="dss-pbp-title">{title}</Heading>
        <div className="dss-pbp-meta">
          {meta ? <span>{meta}</span> : null}
          {live ? (
            <span className="dss-pbp-live">
              <span className="dss-pbp-dot" aria-hidden="true" /> Live
            </span>
          ) : null}
        </div>
      </div>

      <div className="dss-pbp-feed" role="log" aria-label={title} tabIndex={0}>
        {events.map((event) => {
          const team = event.team ?? 'none';
          return (
            <div key={event.id} className={cn('dss-pbp-event', `dss-pbp-event--${event.kind ?? 'default'}`)}>
              <div className="dss-pbp-time">
                {event.time}
                <span className="dss-pbp-q">{event.quarter}</span>
              </div>
              <div className={cn('dss-pbp-strip', `dss-pbp-strip--${team}`)} aria-hidden="true" />
              <div className="dss-pbp-body">
                <div className="dss-pbp-action">
                  {team !== 'none' ? <span className="dss-sr-only">{TEAM_TEXT[team]} </span> : null}
                  {event.titleBold ? (
                    <>
                      <b>{event.titleBold}</b> ·{' '}
                    </>
                  ) : null}
                  {event.title}
                </div>
                {event.detail ? <div className="dss-pbp-detail">{event.detail}</div> : null}
              </div>
              {event.score ? (
                <div className="dss-pbp-score" aria-label={`Spielstand ${event.score.heim} zu ${event.score.gast}`}>
                  {event.score.heim}
                  <span className="dss-pbp-sep" aria-hidden="true">
                    :
                  </span>
                  {event.score.gast}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
