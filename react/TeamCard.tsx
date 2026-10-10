import type { MouseEventHandler, ReactNode } from 'react';
import { cn } from './cn';
import { initials, shortName } from '../js/schedule.js';
import { lastResult, opponentPrefix, rankInfo, recordInfo, squadText, statEntries } from '../js/team.js';
import type { TeamLast, TeamNext, TeamRecord, TeamRef, TeamSquad, TeamStats } from '../js/team.js';
import { useHeadingTag, type HeadingTag } from './HeadingLevel';

export type { TeamLast, TeamNext, TeamRecord, TeamRef, TeamSquad, TeamStats };
export type TeamCardSize = 'standard' | 'compact';
export type TeamCardNames = 'full' | 'short';

export interface TeamCardProps {
  /** Name der Mannschaft; als einziges Feld Pflicht. */
  name: string;
  /** Kurzname: Anzeige bei `names="short"` und automatisch bis 640 px Breite. */
  short?: string;
  /** Logo-URL; ohne Logo erscheinen die Initialen im Kreis. */
  logo?: string;
  /** `short` zeigt den Kurznamen (falls vorhanden); bis 640 px erscheint er automatisch (CSS). Standard: `full`. */
  names?: TeamCardNames;
  /** Logo bzw. Initialen vor dem Gegner in den Spielzeilen. Standard: aus. */
  logos?: boolean;
  league?: string;
  /** Link der Liga; nur ohne `href`/`onClick` (eine Aktion je Karte). */
  leagueHref?: string;
  /** z. B. „2026/27“ */
  season?: string;
  /** Bilanz: Siege, Niederlagen, optional Unentschieden. */
  record?: TeamRecord;
  /** Tabellenplatz (ganze Zahl ab 1), mit `rankOf` „Platz von 12“. */
  rank?: number;
  rankOf?: number;
  points?: number;
  next?: TeamNext;
  last?: TeamLast;
  squad?: TeamSquad;
  /** Saison-Statistik; nur übergebene Felder erscheinen, ohne Feld entfällt der ganze Block. */
  stats?: TeamStats;
  /** `standard`: Karte mit allen Blöcken; `compact`: Listenzeile. */
  size?: TeamCardSize;
  /** Mit `href` ist die ganze Karte ein Link (ein zusätzlicher `onClick` hängt am Link, z. B. für einen SPA-Router), mit `onClick` allein ein Button, sonst nicht klickbar. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Überschriftenebene des Namens in `standard`, h2 bis h6. Rangfolge: `titleAs` vor der Ebene aus `HeadingLevel` vor h3. */
  titleAs?: HeadingTag;
  className?: string;
}

const OUTCOME_CHIP = { S: 'dss-chip--ok', N: 'dss-chip--err', U: '' } as const;

/** Name mit Kurzform: beide Texte im Markup, der Kurzname ist für Hilfstechnik versteckt (der volle Name gilt). */
function NameText({ team, names }: { team: TeamRef; names: TeamCardNames }) {
  const short = shortName(team);
  if (!short) return <>{team.name}</>;
  return (
    <span className={cn('dss-team-name', names === 'short' && 'dss-team-name--short')}>
      <span className="dss-name-full">{team.name}</span>
      <span className="dss-name-short" aria-hidden="true" title={team.name}>
        {short}
      </span>
    </span>
  );
}

function LogoBadge({ team, size }: { team: TeamRef; size?: string }) {
  return (
    <span className={cn('dss-team-logo', size, !team.logo && 'dss-team-logo--initials')} aria-hidden="true">
      {team.logo ? <img src={team.logo} alt="" loading="lazy" /> : initials(team.name, 2)}
    </span>
  );
}

function Tile({ value, label, aria }: { value: string; label: string; aria: string }) {
  return (
    <div>
      <div className="dss-pc-v" aria-hidden="true">
        {value}
      </div>
      <div className="dss-pc-l" aria-hidden="true">
        {label}
      </div>
      <span className="dss-sr-only">{aria}</span>
    </div>
  );
}

/** Mannschaftskarte: Kopf, Bilanz und Tabellenplatz, nächstes und letztes Spiel, Kader, optionale Saison-Statistik; compact als Listenzeile. */
export function TeamCard({
  name,
  short,
  logo,
  names = 'full',
  logos = false,
  league = '',
  leagueHref,
  season = '',
  record,
  rank,
  rankOf,
  points,
  next,
  last,
  squad,
  stats,
  size = 'standard',
  href,
  onClick,
  titleAs,
  className,
}: TeamCardProps) {
  const Heading = useHeadingTag(titleAs);
  const clickable = Boolean(href) || Boolean(onClick);
  const rec = recordInfo(record);
  const pos = rankInfo(rank, rankOf);
  const hasPoints = typeof points === 'number' && Number.isFinite(points);
  const squadLine = squadText(squad);
  const statList = statEntries(stats);
  const res = lastResult(last);
  const own: TeamRef = { name, short, logo };

  const nameBlock: ReactNode = href ? (
    <a className="dss-team-link" href={href} onClick={onClick}>
      <NameText team={own} names={names} />
    </a>
  ) : onClick ? (
    <button className="dss-team-link" type="button" onClick={onClick}>
      <NameText team={own} names={names} />
    </button>
  ) : (
    <NameText team={own} names={names} />
  );

  const leagueLine =
    league || season ? (
      <div className="dss-team-sub">
        {league ? (
          leagueHref && !clickable ? (
            <a className="dss-link" href={leagueHref}>
              {league}
            </a>
          ) : (
            <span>{league}</span>
          )
        ) : null}
        {season ? <span>{season}</span> : null}
      </div>
    ) : null;

  const opponent = (o: TeamRef, at: 'heim' | 'gast' | undefined) => (
    <>
      {at ? (
        <span className={cn('dss-chip', 'dss-chip--mono', at === 'gast' ? 'dss-chip--amber' : 'dss-chip--sky')} aria-hidden="true">
          {at === 'gast' ? '@' : 'vs.'}
        </span>
      ) : null}
      <span className="dss-team-game-opp">
        {logos ? <LogoBadge team={o} size="dss-team-logo--sm" /> : null}
        <span>
          <span className="dss-sr-only">{opponentPrefix(at)}</span>
          <NameText team={o} names={names} />
        </span>
      </span>
    </>
  );

  if (size === 'compact') {
    return (
      <div className={cn('dss-team', 'dss-team--compact', clickable && 'dss-team--link', className)}>
        <LogoBadge team={own} />
        <div className="dss-team-who">
          <span className="dss-team-nm">{nameBlock}</span>
          {leagueLine}
        </div>
        <span className="dss-team-end">
          {rec ? (
            <>
              <span className="dss-team-rec" aria-hidden="true">
                {rec.text}
              </span>
              <span className="dss-sr-only">{rec.aria}</span>
            </>
          ) : null}
          {pos ? (
            <>
              <span className="dss-team-rank" aria-hidden="true">
                Platz {pos.text}
              </span>
              <span className="dss-sr-only">{pos.aria}</span>
            </>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('dss-team', 'dss-team--standard', clickable && 'dss-team--link', className)}>
      <div className="dss-team-head">
        <LogoBadge team={own} size="dss-team-logo--lg" />
        <div className="dss-team-who">
          <Heading className="dss-team-nm">{nameBlock}</Heading>
          {leagueLine}
        </div>
      </div>

      {rec || pos || hasPoints ? (
        <div className="dss-team-vitals">
          {rec ? <Tile value={rec.text} label={rec.label} aria={rec.aria} /> : null}
          {pos ? <Tile value={pos.text} label={pos.label} aria={pos.aria} /> : null}
          {hasPoints ? <Tile value={String(points)} label="Punkte" aria={`Punkte: ${points}`} /> : null}
        </div>
      ) : null}

      {next || last ? (
        <div className="dss-team-games">
          {next ? (
            <div className="dss-team-game">
              <div className="dss-team-game-l">Nächstes Spiel</div>
              <div className="dss-team-game-row">
                {opponent(next.opponent, next.at)}
                {next.date || next.time ? <span className="dss-team-game-end">{[next.date, next.time].filter(Boolean).join(' · ')}</span> : null}
              </div>
              {next.venue ? <div className="dss-team-game-venue">{next.venue}</div> : null}
            </div>
          ) : null}
          {last ? (
            <div className="dss-team-game">
              <div className="dss-team-game-l">{last.date ? `Letztes Spiel · ${last.date}` : 'Letztes Spiel'}</div>
              <div className="dss-team-game-row">
                {opponent(last.opponent, last.at)}
                {res ? (
                  <span className="dss-team-game-end">
                    {res.outcome ? (
                      <span className={cn('dss-chip', 'dss-chip--mono', OUTCOME_CHIP[res.outcome])} aria-hidden="true">
                        {res.outcome}
                      </span>
                    ) : null}
                    <span className="dss-team-game-score" aria-hidden="true">
                      {res.score}
                    </span>
                    <span className="dss-sr-only">{res.aria}</span>
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {squadLine ? <div className="dss-team-squad">{squadLine}</div> : null}

      {statList.length > 0 ? (
        <div className="dss-team-stats" role="group" aria-label="Saison-Statistik">
          <div className="dss-team-sec" aria-hidden="true">
            Saison-Statistik
          </div>
          <div className="dss-team-vitals">
            {statList.map((stat) => (
              <div key={stat.key}>
                <div className="dss-pc-v">{stat.value}</div>
                <div className="dss-pc-l">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
