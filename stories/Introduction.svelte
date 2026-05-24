<script>
  // Static welcome card. No props.
</script>

<div class="intro">
  <div class="brand">
    <span class="mono">D</span>
    <div>
      <h1>DSS Design System</h1>
      <p>Bayerischer Basketball Verband · Digitaler Spielbericht</p>
    </div>
  </div>

  <div class="grid">
    <div class="tile">
      <div class="kpi">3</div>
      <div class="lbl">Hue-Achsen</div>
      <p>Ink · Amber · Sky — alle oklch-basiert.</p>
    </div>
    <div class="tile">
      <div class="kpi">AAA</div>
      <div class="lbl">WCAG 2.1</div>
      <p>Text-Token-Paare validiert ≥ 7:1.</p>
    </div>
    <div class="tile">
      <div class="kpi">54</div>
      <div class="lbl">Icons</div>
      <p>Basketball-spezifisch + UI-Core.</p>
    </div>
    <div class="tile">
      <div class="kpi">64<span>px</span></div>
      <div class="lbl">Hallen-Touch</div>
      <p>Kampfgericht-taugliche Hit-Targets.</p>
    </div>
  </div>

  <h2>Komponenten</h2>
  <ul>
    <li><strong>Button</strong> — 5 Varianten · 3 Größen · Touch-Modus</li>
    <li><strong>TextInput</strong> — mit Label, Helper, Validierung</li>
    <li><strong>Modal</strong> — Severity-Header, Footer-Slot, Esc-Close</li>
    <li><strong>Card</strong> — Default · Elevated · Flat · Hoverable</li>
    <li><strong>Tabs</strong> — Underline · Segmented · Pills · Vertical</li>
    <li><strong>Icon</strong> — Sprite mit 54 Glyphen, currentColor</li>
  </ul>
</div>

<style>
  .intro {
    font-family: var(--font-body);
    color: var(--page-fg);
    background: var(--page-bg);
    padding: 48px;
    max-width: 1100px;
    margin: 0 auto;
    line-height: 1.55;
  }
  .brand { display: flex; align-items: center; gap: 18px; margin-bottom: 36px; }
  .mono {
    width: 56px; height: 56px;
    display: grid; place-items: center;
    font-family: var(--font-display); font-weight: 800; font-size: 32px;
    background: var(--ink-900); color: var(--n-0);
    border-radius: var(--radius-md);
  }
  h1 { font-family: var(--font-display); font-size: 36px; margin: 0; letter-spacing: -0.02em; }
  h2 { font-family: var(--font-display); font-size: 22px; margin: 36px 0 12px; }
  p  { margin: 4px 0; color: var(--page-mute); }

  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 18px; }
  .tile {
    background: var(--surface-0);
    border: 1px solid var(--page-line);
    border-radius: var(--radius-lg);
    padding: 18px;
  }
  .kpi {
    font-family: var(--font-display);
    font-size: 44px; line-height: 1;
    font-weight: 800;
    color: var(--ink-900);
    letter-spacing: -0.03em;
  }
  .kpi span { font-size: 18px; color: var(--page-mute); font-weight: 600; margin-left: 2px; }
  .lbl {
    font-family: var(--font-mono); font-size: 11px;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--page-mute); font-weight: 600;
    margin: 6px 0 8px;
  }
  .tile p { color: var(--ink-700); font-size: 14px; }

  ul { padding-left: 18px; }
  li { padding: 4px 0; }
  strong { color: var(--ink-900); }
</style>
