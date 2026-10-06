import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { cn } from './cn';

export type EmptyStateTone = 'neutral' | 'action' | 'error';

export interface EmptyStateProps {
  tone?: EmptyStateTone;
  title: string;
  body?: ReactNode;
  /** Sprite-Icon; ohne Angabe ein tonalitätsabhängiges Standard-Symbol. */
  icon?: IconName;
  /** Einfacher CTA-Button; für mehrere/andere Aktionen `actions` nutzen. */
  cta?: string;
  onCta?: () => void;
  actions?: ReactNode;
  /** Überschriftenebene (Standard h3). */
  titleAs?: 'h2' | 'h3' | 'h4';
  className?: string;
  /** Zusatz-Inhalt unter den Aktionen. */
  children?: ReactNode;
}

const CTA_VARIANT = { neutral: 'primary', action: 'amber', error: 'danger' } as const;

function ToneIcon({ tone }: { tone: EmptyStateTone }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 28,
    height: 28,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
  if (tone === 'error') {
    return (
      <svg {...common}>
        <path d="m12 4 10 17H2L12 4Z" />
        <path d="M12 10v5" />
        <circle cx="12" cy="18.2" r=".7" fill="currentColor" />
      </svg>
    );
  }
  if (tone === 'action') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <circle cx="12" cy="16.5" r=".7" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
    </svg>
  );
}

/** Leer-, Hinweis- oder Fehlerzustand mit klarem nächsten Schritt. */
export function EmptyState({
  tone = 'neutral',
  title,
  body,
  icon,
  cta,
  onCta,
  actions,
  titleAs: Heading = 'h3',
  className,
  children,
}: EmptyStateProps) {
  return (
    <div className={cn('dss-empty', `dss-empty--${tone}`, className)}>
      <div className="dss-empty-icon">{icon ? <Icon name={icon} size={28} /> : <ToneIcon tone={tone} />}</div>
      <Heading className="dss-empty-title">{title}</Heading>
      {body ? <p className="dss-empty-body">{body}</p> : null}
      {cta || actions ? (
        <div className="dss-empty-actions">
          {cta ? (
            <button type="button" className={cn('dss-btn', 'dss-btn--md', `dss-btn--${CTA_VARIANT[tone]}`)} onClick={onCta}>
              {cta}
            </button>
          ) : null}
          {actions}
        </div>
      ) : null}
      {children ? <div className="dss-empty-extra">{children}</div> : null}
    </div>
  );
}
