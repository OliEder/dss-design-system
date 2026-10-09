<script>
  // Kennzahlen der Einstiegsseite, ohne Props.
</script>

<div class="grid">
  <div class="tile">
    <div class="kpi">3</div>
    <div class="lbl">Hue-Achsen</div>
    <p>Ink · Amber · Sky, alle oklch-basiert.</p>
  </div>
  <div class="tile">
    <div class="kpi">AAA</div>
    <div class="lbl">WCAG 2.1</div>
    <p>Text-Token-Paare validiert ≥ 7:1.</p>
  </div>
  <div class="tile">
    <div class="kpi">67</div>
    <div class="lbl">Icons</div>
    <p>Basketball-spezifisch + UI-Core.</p>
  </div>
  <div class="tile">
    <div class="kpi">64<span>px</span></div>
    <div class="lbl">Hallen-Touch</div>
    <p>Kampfgericht-taugliche Hit-Targets.</p>
  </div>
</div>

<style>
  .grid { font-family: var(--font-body); display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 14px; }
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
    color: var(--page-fg);
    letter-spacing: -0.03em;
  }
  .kpi span { font-size: 18px; color: var(--page-mute); font-weight: 600; margin-left: 2px; }
  .lbl {
    font-family: var(--font-mono); font-size: 11px;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--page-mute); font-weight: 600;
    margin: 6px 0 8px;
  }
  .tile p { color: var(--page-fg); font-size: 14px; margin: 4px 0; }
</style>
