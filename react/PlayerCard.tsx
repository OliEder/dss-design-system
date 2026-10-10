import { useState, type MouseEventHandler } from 'react';
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
  /** Foto-URL: ersetzt die Trikotmarke; die Trikotnummer bleibt als Badge (hero: Porträtfläche). Leer oder bei Ladefehler: Trikotmarke. */
  photo?: string;
  /** Alternativtext des Fotos; Standard leer (dekorativ, der Name steht daneben). */
  photoAlt?: string;
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
  photo = '',
  photoAlt = '',
  className,
}: PlayerCardProps) {
  // Eine URL, die nicht lädt, wird gemerkt: dann erscheint wieder die Trikotmarke (kein kaputtes Bildsymbol)
  const [failedUrl, setFailedUrl] = useState('');
  const showPhoto = Boolean(photo) && photo !== failedUrl;
  const imgSize = size === 'compact' ? 32 : size === 'standard' ? 64 : 200;
  const img = (
    <img
      className="dss-pc-img"
      src={photo}
      alt={photoAlt}
      width={imgSize}
      height={imgSize}
      loading="lazy"
      decoding="async"
      onError={() => setFailedUrl(photo)}
    />
  );

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
        {showPhoto ? (
          <span className="dss-pc-av">
            {img}
            <span className={cn('dss-tn', 'dss-tn--badge', team, captain && 'captain')}>{jersey}</span>
          </span>
        ) : (
          <span className={cn('dss-tn', team, 'small', captain && 'captain')}>{jersey}</span>
        )}
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
        {/* Pill nur visuell: die Position steht schon in der Meta-Zeile. Leeres <span /> = Platzhalter für die Grid-Spalte. */}
        {position ? <span className={posClass} aria-hidden="true">{position}</span> : <span />}
        {stat !== null ? (
          <span className="dss-pc-stat">
            {stat}
            {statLabel ? <span className="dss-pc-stat-l">{statLabel}</span> : null}
          </span>
        ) : (
          // Platzhalter für die Grid-Spalte der Statistik
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
          {showPhoto ? (
            <span className="dss-pc-av dss-pc-av--lg">
              {img}
              <span className={cn('dss-tn', 'dss-tn--badge', 'dss-tn--badge-lg', team, captain && 'captain')}>{jersey}</span>
            </span>
          ) : (
            <span className={cn('dss-tn', team, 'large', captain && 'captain')}>{jersey}</span>
          )}
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
    <div className={cn('dss-pc-hero', showPhoto && 'dss-pc-hero--photo', className)}>
      <div className="dss-pc-hero-left">
        {showPhoto ? (
          <>
            {img}
            <span className={cn('dss-tn', 'dss-tn--badge', 'dss-tn--badge-lg', team, captain && 'captain')}>{jersey}</span>
          </>
        ) : (
          <span className={cn('dss-tn', 'hero', team, captain && 'captain')}>{jersey}</span>
        )}
      </div>
      <div className="dss-pc-hero-right">
        <Heading className="dss-pc-nm">{name}</Heading>
        {role}
        <Vitals vitals={vitals} />
      </div>
    </div>
  );
}
