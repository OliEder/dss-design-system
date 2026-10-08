import type { ReactNode } from 'react';
import { cn } from './cn';
import type { ScheduleTeam } from './schedule-types';

export interface ScheduleLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

export type ScheduleRenderLink = (props: ScheduleLinkProps) => ReactNode;

interface TeamNameProps {
  team: ScheduleTeam | undefined;
  loser?: boolean;
  renderLink?: ScheduleRenderLink;
}

/** Teamname: Platzhalter kursiv, mit `href` als Link, Verlierer abgeblendet. */
export function TeamName({ team, loser = false, renderLink }: TeamNameProps) {
  const current = team ?? { name: '?' };
  const label = current.placeholder ? <span className="dss-sch-ph">{current.name}</span> : current.name;
  let node: ReactNode = label;
  if (current.href && !current.placeholder) {
    node = renderLink ? (
      renderLink({ href: current.href, className: 'dss-link', children: label })
    ) : (
      <a className="dss-link" href={current.href}>
        {label}
      </a>
    );
  }
  return <span className={cn('dss-sch-team', loser && 'is-loser')}>{node}</span>;
}

/** Grüner Live-Hinweis (wie MatchCard), steht hinter der Uhrzeit. */
export function LiveTag() {
  return (
    <span className="dss-match-live dss-sch-live">
      <span className="dss-match-pulse" aria-hidden="true" /> Live
    </span>
  );
}

interface ResultTextProps {
  visible: string;
  spoken: string;
  provisional?: boolean;
}

/** Sichtbares Ergebnis (für Screenreader versteckt) plus gesprochener Text. */
export function ResultText({ visible, spoken, provisional = false }: ResultTextProps) {
  return (
    <>
      <span className="dss-sch-score" aria-hidden="true">
        {visible}
      </span>
      <span className="dss-sr-only">{spoken}</span>
      {provisional ? <small aria-hidden="true">vorläufig</small> : null}
    </>
  );
}
