import type { ReactNode } from 'react';

export type DosDontsPair = { title: string; doText: string; dontText: string; good: ReactNode; bad: ReactNode };

// React 18 kennt `inert` nicht als Prop, ein leerer String reicht als Attribut.
const INERT = { inert: '' } as Record<string, string>;

/** Beispielpaare "richtig / falsch". Falsche Beispiele sind nur Anschauung (inert). Nur Storybook-Doku. */
export function DosDonts({ pairs }: { pairs: DosDontsPair[] }) {
  return (
    <div className="dss-dd">
      {pairs.map((p) => (
        <section key={p.title} className="dss-dd-pair">
          <h3 className="dss-dd-title">{p.title}</h3>
          <div className="dss-dd-cols">
            <figure className="dss-dd-col dss-dd-do">
              <div className="dss-dd-stage">{p.good}</div>
              <figcaption>
                <span className="dss-dd-badge">✓ Do</span> {p.doText}
              </figcaption>
            </figure>
            <figure className="dss-dd-col dss-dd-dont">
              <div className="dss-dd-stage" {...INERT}>
                {p.bad}
              </div>
              <figcaption>
                <span className="dss-dd-badge">
                  ✗ Don't<span className="dss-sr-only"> </span>
                  <span className="dss-sr-only">Beispiel für falsche Verwendung</span>
                </span>{' '}
                {p.dontText}
              </figcaption>
            </figure>
          </div>
        </section>
      ))}
    </div>
  );
}
