import { useState, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { cn } from './cn';

export interface BottomNavItem {
  id: string;
  /** Pflicht, auch für den FAB (wird dort zum zugänglichen Namen). */
  label: string;
  icon?: IconName;
  badge?: number | string;
  /** Hervorgehobene Mittelaktion (Standard-Icon `plus`). */
  fab?: boolean;
  /** Mit `href` wird der Eintrag ein Link statt eines Buttons. */
  href?: string;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  /** Kontrolliert (value) oder unkontrolliert (defaultValue). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

/** Mobile Navigation am unteren Bildschirmrand (4–5 Einträge, optional zentraler FAB). */
export function BottomNav({
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  ariaLabel = 'Hauptnavigation',
  className,
}: BottomNavProps) {
  const [inner, setInner] = useState(defaultValue ?? items.find((item) => !item.fab)?.id ?? '');
  const value = valueProp ?? inner;

  const pick = (item: BottomNavItem) => {
    setInner(item.id);
    onValueChange?.(item.id);
  };

  return (
    <nav aria-label={ariaLabel} className={cn('dss-bnav', className)}>
      {items.map((item) => {
        if (item.fab) {
          const icon = <Icon name={item.icon ?? 'plus'} size={22} />;
          return item.href ? (
            <a key={item.id} className="dss-bnav-fab" href={item.href} aria-label={item.label} onClick={() => pick(item)}>
              {icon}
            </a>
          ) : (
            <button key={item.id} type="button" className="dss-bnav-fab" aria-label={item.label} onClick={() => pick(item)}>
              {icon}
            </button>
          );
        }
        const active = value === item.id;
        const itemClass = cn('dss-bnav-item', active && 'is-active');
        const body: ReactNode = (
          <>
            {item.icon ? <Icon name={item.icon} size={22} className="dss-bnav-ic" /> : null}
            <span className="dss-bnav-lbl">{item.label}</span>
            {item.badge !== undefined ? <span className="dss-bnav-badge">{item.badge}</span> : null}
          </>
        );
        return item.href ? (
          <a key={item.id} className={itemClass} href={item.href} aria-current={active ? 'page' : undefined} onClick={() => pick(item)}>
            {body}
          </a>
        ) : (
          <button key={item.id} type="button" className={itemClass} aria-current={active ? 'page' : undefined} onClick={() => pick(item)}>
            {body}
          </button>
        );
      })}
    </nav>
  );
}
