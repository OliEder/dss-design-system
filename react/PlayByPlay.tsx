import { cn } from './cn';
import { resolvePeriod } from '../js/periods.js';
import { useHeadingTag, type HeadingTag } from './HeadingLevel';

export type PbpTeam = 'heim' | 'gast' | 'none';
export type PbpKind = 'default' | 'score-2p' | 'score-3p' | 'ft' | 'foul' | 'timeout' | 'sub' | 'turnover';

export interface PbpEvent {
  id: string | number;
  /** „M:SS“ */
  time: string;
  /** Spielabschnitt ab 1 (mit `periods`): Chip „V1“ bis „V4“ bzw. „A1“ bis „A8“, „VL“ für die Verlängerung; Screenreader lesen „3. Viertel“. */
  period?: number;
  /** @deprecated Stattdessen `period`; ohne `period` wird der Text unverändert angezeigt („Q1“ … „OT“). */
  quarter?: string;
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
  /** Überschriftenebene des Titels, h2 bis h6. Rangfolge: `titleAs` vor der Ebene aus `HeadingLevel` vor h3. */
  titleAs?: HeadingTag;
  meta?: string;
  live?: boolean;
  dark?: boolean;
  /** 4 Viertel (Standard) oder 8 Achtel (Mini-Basketball). */
  periods?: 4 | 8;
  className?: string;
}

const TEAM_TEXT = { heim: 'Heim:', gast: 'Gast:' } as const;

/** Live-Scoring-Ereignisstrom: Zeit, Teamstreifen, Aktion, Spielstand; neue Einträge blenden ein. */
export function PlayByPlay({
  events,
  title = 'Play-by-Play · neueste oben',
  titleAs,
  meta = '',
  live = true,
  dark = false,
  periods = 4,
  className,
}: PlayByPlayProps) {
  const Heading = useHeadingTag(titleAs);
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
          const abschnitt = resolvePeriod({ period: event.period, periods, quarter: event.quarter });
          return (
            <div key={event.id} className={cn('dss-pbp-event', `dss-pbp-event--${event.kind ?? 'default'}`)}>
              <div className="dss-pbp-time">
                {event.time}
                {abschnitt.short ? (
                  <span className="dss-pbp-q">
                    {abschnitt.alias ? (
                      abschnitt.label
                    ) : (
                      <>
                        <span aria-hidden="true">{abschnitt.short}</span>
                        <span className="dss-sr-only">{abschnitt.label}</span>
                      </>
                    )}
                  </span>
                ) : null}
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
                <div className="dss-pbp-score">
                  <span aria-hidden="true">
                    {event.score.heim}
                    <span className="dss-pbp-sep">:</span>
                    {event.score.gast}
                  </span>
                  <span className="dss-sr-only">{`Spielstand ${event.score.heim} zu ${event.score.gast}`}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
