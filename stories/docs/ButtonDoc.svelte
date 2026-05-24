<script>
  import SpecPage from './_SpecPage.svelte';
  import Button from '../../svelte/Button.svelte';
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
          Jede Variante hat sichtbare Hover- und Focus-Indikatoren mit <b>WCAG 2.1 AAA</b>
          Kontrast. Disabled reduziert auf 45 % Opacity und schaltet den Pointer ab.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Disabled · alle Varianten</div>
        <div class="spec-frame">
          <div class="spec-row">
            <Button variant="primary"   disabled>Primary</Button>
            <Button variant="amber"     disabled>Amber</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="danger"    disabled>Danger</Button>
            <Button variant="ghost"     disabled>Ghost</Button>
          </div>
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
      <div class="spec-frame" style="background: var(--ink-1000); color: var(--n-100); padding: 22px 24px;">
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
