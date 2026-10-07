import type { ReactNode } from 'react';
import { cn } from './cn';

export type TableDensity = 'touch' | 'default' | 'compact' | 'dense';

export interface TableColumn {
  key: string;
  label: ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: string;
  sortable?: boolean;
  /** Aktuelle Sortierrichtung; setzt `aria-sort` und den Pfeil. */
  sort?: 'asc' | 'desc' | null;
}

export interface TableProps {
  title?: ReactNode;
  /** Überschriftenebene des Titels (Standard h3). */
  titleAs?: 'h2' | 'h3' | 'h4';
  meta?: ReactNode;
  live?: boolean;
  density?: TableDensity;
  dark?: boolean;
  striped?: boolean;
  /** Einfacher Kopf aus Spaltendefinitionen; alternativ `head` für eigene Kopfzeilen. */
  columns?: TableColumn[];
  /** Eigene Kopfzeilen; wird ignoriert, wenn `columns` gesetzt ist. */
  head?: ReactNode;
  /** Zeilen des tbody (`<tr>`-Elemente). */
  children?: ReactNode;
  foot?: ReactNode;
  /** Unsichtbare Tabellenbeschriftung für Screenreader (wenn kein sichtbarer Titel genügt). */
  caption?: string;
  className?: string;
}

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

/** Datentabelle im DSS-Rahmen (Titelzeile optional). Zellen liefert die Anwendung als `<tr>`-Kinder. */
export function Table({
  title,
  titleAs: Heading = 'h3',
  meta,
  live = false,
  density = 'default',
  dark = false,
  striped = false,
  columns,
  head,
  children,
  foot,
  caption,
  className,
}: TableProps) {
  const hasHead = Boolean(title || meta || live);
  return (
    <div className={cn('dss-frame', dark && 'dss-frame--dark', className)}>
      {hasHead ? (
        <div className="dss-frame-head">
          {title ? <Heading className="dss-frame-title">{title}</Heading> : <span />}
          <div className="dss-frame-meta">
            {meta ? <span>{meta}</span> : null}
            {live ? (
              <span className="dss-crumb">
                <span className="dss-crumb-dot" aria-hidden="true" /> Live
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="dss-table-scroll">
        <table className={cn('dss-tbl', `dss-tbl--${density}`, striped && 'dss-tbl--striped')}>
          {caption ? <caption className="dss-sr-only">{caption}</caption> : null}
          {columns ? (
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={cn(col.align ?? 'left', col.sortable && 'sortable', col.sort && `sort-${col.sort}`)}
                    style={col.width ? { width: col.width } : undefined}
                    aria-sort={col.sort ? ARIA_SORT[col.sort] : undefined}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          {!columns && head ? <thead>{head}</thead> : null}
          <tbody>{children}</tbody>
          {foot ? <tfoot>{foot}</tfoot> : null}
        </table>
      </div>
    </div>
  );
}
