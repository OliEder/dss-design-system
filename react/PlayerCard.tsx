import type { MouseEventHandler } from 'react';
import { cn } from './cn';

export type PlayerCardSize = 'compact' | 'standard' | 'hero';
export type PlayerTeam = 'heim' | 'gast';

export interface PlayerVital {
  label: string;
  value: string | number;
  /** Hebt den Wert in Amber hervor. */
  accent?: boolean;
}

export interface PlayerCardProps {
  size?: PlayerCardSize;
  jersey: string | number;
  name: string;
  position?: string;
  team?: PlayerTeam;
  captain?: boolean;
  age?: string;
  heightCm?: string;
  /** Rolle/Funktion im Team (z. B. „Spielmacher“), nur in compact sichtbar. */
  playerRole?: string;
  vitals?: PlayerVital[];
  /** Hauptstatistik der compact-Zeile mit Beschriftung. */
  stat?: string | number | null;
  statLabel?: string;
  /** Nur compact: mit onClick wird die Zeile ein Button. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Überschriftenebene des Namens in standard/hero (Standard h3). */
  titleAs?: 'h2' | 'h3' | 'h4';
  className?: string;
}

function Vitals({ vitals }: { vitals: PlayerVital[] }) {
  if (vitals.length === 0) return null;
  return (
    <div className="dss-pc-vitals">
      {vitals.map((vital) => (
        <div key={vital.label}>
          <div className={cn('dss-pc-v', vital.accent && 'dss-pc-v--amber')}>{vital.value}</div>
          <div className="dss-pc-l">{vital.label}</div>
        </div>
      ))}
    </div>
  );
}

/** Spielerprimitive in drei Maßstäben: compact (Listenzeile), standard (Karte), hero (dunkle Großkarte). */
export function PlayerCard({
  size = 'standard',
  jersey,
  name,
  position = '',
  team = 'heim',
  captain = false,
  age = '',
  heightCm = '',
  playerRole = '',
  vitals = [],
  stat = null,
  statLabel = '',
  onClick,
  titleAs: Heading = 'h3',
  className,
}: PlayerCardProps) {
  const posClass = position ? `dss-pos ${position.toLowerCase()}` : '';
  const role = (
    <div className="dss-pc-role">
      {position ? <span className={posClass}>{position}</span> : null}
      {captain ? <span className="dss-pc-cap">Kapitän</span> : null}
      {age ? <span>{age}</span> : null}
      {heightCm ? <span>{heightCm} cm</span> : null}
    </div>
  );

  if (size === 'compact') {
    const body = (
      <>
        <span className={cn('dss-tn', team, 'small', captain && 'captain')}>{jersey}</span>
        <span className="dss-pc-who">
          <span className="dss-pc-name">
            {name}
            {captain ? ' (C)' : ''}
          </span>
          {position || playerRole ? (
            <span className="dss-pc-meta">
              {position}
              {playerRole ? ` · ${playerRole}` : ''}
            </span>
          ) : null}
        </span>
        {position ? <span className={posClass}>{position}</span> : <span />}
        {stat !== null ? (
          <span className="dss-pc-stat">
            {stat}
            {statLabel ? <span className="dss-pc-stat-l">{statLabel}</span> : null}
          </span>
        ) : (
          <span />
        )}
      </>
    );
    return onClick ? (
      <button type="button" className={cn('dss-pc-row', className)} onClick={onClick}>
        {body}
      </button>
    ) : (
      <div className={cn('dss-pc-row', className)}>{body}</div>
    );
  }

  if (size === 'standard') {
    return (
      <div className={cn('dss-pc-card', className)}>
        <div className="dss-pc-head">
          <span className={cn('dss-tn', team, 'large', captain && 'captain')}>{jersey}</span>
          <div className="dss-pc-who">
            <Heading className="dss-pc-nm">{name}</Heading>
            {role}
          </div>
        </div>
        <Vitals vitals={vitals} />
      </div>
    );
  }

  return (
    <div className={cn('dss-pc-hero', className)}>
      <div className="dss-pc-hero-left">
        <span className={cn('dss-tn', 'hero', team, captain && 'captain')}>{jersey}</span>
      </div>
      <div className="dss-pc-hero-right">
        <Heading className="dss-pc-nm">{name}</Heading>
        {role}
        <Vitals vitals={vitals} />
      </div>
    </div>
  );
}
