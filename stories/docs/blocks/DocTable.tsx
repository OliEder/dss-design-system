import type { ReactNode } from 'react';

/** Datentabelle für die Doku (Felder, Props). Der Scrollbereich ist fokussierbar. Nur Storybook-Doku. */
export function DocTable({ label, head, rows }: { label: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="dss-doc-table-wrap" tabIndex={0} role="region" aria-label={`${label}, seitlich scrollbar`}>
      <table className="dss-doc-table" aria-label={label}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i}>
              {cells.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="dss-doc-k">{c}</th>
                ) : (
                  <td key={j} className={j === 1 ? 'dss-doc-v' : undefined}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
