<script>
  import SpecPage from './_SpecPage.svelte';
  import Button from '../../svelte/Button.svelte';
  const variants = ['primary', 'amber', 'secondary', 'danger', 'ghost'];
</script>

<SpecPage
  title="Button"
  intro="Die meistgenutzte Aktion im Spielbericht. Fünf Varianten decken alle Hierarchien ab — vom Live-Scoring-Trigger bis zum unauffälligen Ghost-Link. Drei Größen plus ein Hallen-Touch-Modus für den Kampfgerichts-Tisch."
>
  <!-- 01 — Anatomy -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">01 — Anatomy</div>
      <div class="spec-title">
        <h2>Eine Form, fünf Stimmen.</h2>
        <p>
          Buttons haben eine einheitliche Höhe je Größe, gleiche Padding-Geometrie und
          dieselbe Radius-Skala. Die <b>Variante</b> wechselt nur Farbe und Border —
          die Anatomie bleibt konstant. So bleibt das Vokabular klein, aber jedes Wort
          hat einen klaren Ton.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Variants <span class="pill">5</span></div>
        <div class="spec-frame">
          <div class="spec-row">
            <Button variant="primary">Primary</Button>
            <Button variant="amber">Amber</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 02 — Hierarchy -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">02 — Hierarchy</div>
      <div class="spec-title">
        <h2>Wann was.</h2>
        <p>
          <b>Primary</b> für die Hauptaktion einer Ansicht — <b>genau eine pro Screen</b>.
          <b>Amber</b> markiert Spielbericht-Aktionen mit Konsequenz (Live-Scoring starten,
          Aktionen abschließen). <b>Secondary</b> ist der Begleiter — Abbrechen, Zurück.
          <b>Danger</b> ist destruktiv und unwiderruflich. <b>Ghost</b> verschwindet fast
          und eignet sich für Toolbar-Aktionen.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-2">
        <div>
          <div class="spec-cap">Modal-Footer · Standard</div>
          <div class="spec-frame">
            <div class="spec-row" style="justify-content: flex-end;">
              <Button variant="secondary">Abbrechen</Button>
              <Button variant="primary">Freigeben</Button>
            </div>
          </div>
        </div>
        <div>
          <div class="spec-cap">Modal-Footer · Destruktiv</div>
          <div class="spec-frame">
            <div class="spec-row" style="justify-content: flex-end;">
              <Button variant="secondary">Behalten</Button>
              <Button variant="danger">Verwerfen</Button>
            </div>
          </div>
        </div>
        <div>
          <div class="spec-cap">Live-Scoring-Trigger <span class="pill amber">Touch</span></div>
          <div class="spec-frame">
            <Button variant="amber" touch>Live-Scoring starten</Button>
          </div>
        </div>
        <div>
          <div class="spec-cap">Toolbar · Quiet</div>
          <div class="spec-frame">
            <div class="spec-row">
              <Button variant="ghost">Filter</Button>
              <Button variant="ghost">Export</Button>
              <Button variant="ghost">Mehr…</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 03 — Sizes -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">03 — Sizes</div>
      <div class="spec-title">
        <h2>Drei Stufen plus Hallen-Touch.</h2>
        <p>
          <code>sm · md · lg</code> decken alle Screen-Kontexte ab. Der zusätzliche
          <code>touch</code>-Modus erzwingt <b>64 px Höhe</b> für den Kampfgerichts-Tisch —
          getestet bis Wollhandschuh-Bedienung.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Sizes</div>
        <div class="spec-frame">
          <div class="spec-row">
            <Button size="sm">Small · 36 px</Button>
            <Button size="md">Medium · 44 px</Button>
            <Button size="lg">Large · 52 px</Button>
            <Button touch>Touch · 64 px</Button>
          </div>
        </div>
      </div>
      <div>
        <table class="spec-tokens">
          <thead><tr><th>Size</th><th>Höhe</th><th>Padding-X</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td class="k">sm</td>    <td class="v">36 px</td><td class="v">14 px</td><td class="d">Inline / Toolbar / Compact-Listen</td></tr>
            <tr><td class="k">md</td>    <td class="v">44 px</td><td class="v">18 px</td><td class="d">Default · alle Screens</td></tr>
            <tr><td class="k">lg</td>    <td class="v">52 px</td><td class="v">22 px</td><td class="d">Hero-CTA · Modal-Primary</td></tr>
            <tr><td class="k">touch</td> <td class="v">64 px</td><td class="v">28 px</td><td class="d">Kampfgericht · Halle · Tisch</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- 04 — States -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">04 — States</div>
      <div class="spec-title">
        <h2>Hover, Focus, Disabled.</h2>
        <p>
          Jede Variante hat einen Hover-Zustand (eine Stufe dunkler bzw. heller), einen Fokus-Ring mit mindestens
          <b>3:1</b> Kontrast auf hellem und dunklem Grund und einen Active-Zustand (leicht verkleinert).
          Disabled reduziert auf 50 % Opacity und schaltet den Pointer ab.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Zustände · Variante × Zustand</div>
        <div class="spec-frame states">
          <div class="st-head"></div>
          {#each ['Default', 'Hover', 'Focus', 'Active', 'Disabled'] as s}<div class="st-head">{s}</div>{/each}
          {#each variants as v}
            <div class="st-rowlabel">{v}</div>
            <div><button class="dss-btn dss-btn--{v} dss-btn--md">{v}</button></div>
            <div><button class="dss-btn dss-btn--{v} dss-btn--md pseudo-hover">{v}</button></div>
            <div><button class="dss-btn dss-btn--{v} dss-btn--md pseudo-focus-visible">{v}</button></div>
            <div><button class="dss-btn dss-btn--{v} dss-btn--md pseudo-hover pseudo-active">{v}</button></div>
            <div><button class="dss-btn dss-btn--{v} dss-btn--md" disabled>{v}</button></div>
          {/each}
        </div>
        <p class="st-note">
          Die Zustände sind fest gesetzt (Klassen <code>pseudo-hover</code>, <code>pseudo-focus-visible</code>,
          <code>pseudo-active</code>, nur im Storybook). Live: mit der Maus darüberfahren, mit Tab hineinspringen.
          Marke und Light/Dark in der Toolbar umschalten.
        </p>
      </div>
      <div>
        <div class="spec-cap">Fokus-Ring auf hellem und dunklem Grund</div>
        <div class="spec-row">
          <div class="st-surface st-light"><button class="dss-btn dss-btn--secondary dss-btn--md pseudo-focus-visible">Auf hell</button></div>
          <div class="st-surface st-dark"><button class="dss-btn dss-btn--secondary dss-btn--md pseudo-focus-visible">Auf dunkel</button></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 05 — Usage -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">05 — Usage</div>
      <div class="spec-title">
        <h2>Import & Props.</h2>
        <p>
          Importiere den Button via Path-Export und reiche bei Bedarf <code>variant</code>,
          <code>size</code> oder <code>touch</code> rein.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-frame" style="background: var(--base-1000); color: var(--n-100); padding: 22px 24px;">
        <pre style="margin: 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: var(--n-100);">{`import Button from '@bbv/dss/svelte/Button';

<Button>Spielbericht freigeben</Button>
<Button variant="amber" touch>Live-Scoring starten</Button>
<Button variant="danger">Verwerfen</Button>
<Button variant="ghost" size="sm">Mehr…</Button>`}</pre>
      </div>

      <div>
        <table class="spec-tokens">
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Beschreibung</th></tr></thead>
          <tbody>
            <tr><td class="k">variant</td>  <td class="v">'primary' \| 'amber' \| 'secondary' \| 'danger' \| 'ghost'</td><td class="v">'primary'</td><td class="d">Visueller Ton</td></tr>
            <tr><td class="k">size</td>     <td class="v">'sm' \| 'md' \| 'lg'</td><td class="v">'md'</td><td class="d">Höhenstufe</td></tr>
            <tr><td class="k">touch</td>    <td class="v">boolean</td><td class="v">false</td><td class="d">Erzwingt 64 px Hallen-Touch-Modus</td></tr>
            <tr><td class="k">disabled</td> <td class="v">boolean</td><td class="v">false</td><td class="d">Schaltet die Interaktion ab</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</SpecPage>

<style>
  .states { display: grid; grid-template-columns: 90px repeat(5, max-content); gap: 14px 24px; align-items: center; padding: 22px 24px; overflow-x: auto; }
  .st-head { font-family: var(--font-mono); font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-mute); }
  .st-rowlabel { font-family: var(--font-mono); font-size: var(--fs-caption); color: var(--page-mute); }
  .st-note { margin: 10px 0 0; font-size: var(--fs-body-sm); color: var(--page-mute); max-width: 70ch; }
  .st-surface { padding: 28px 36px; border-radius: var(--radius-lg); border: 1px solid var(--page-line); }
  .st-light { background: var(--n-0); }
  .st-dark { background: var(--base-1000); }
</style>
