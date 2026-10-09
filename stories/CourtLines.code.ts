export const vanilla = `<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" /> <!-- die Masken liegen in css/courtlines/ daneben -->

<!-- Ganze Seite: füllt den Viewport (position: fixed) -->
<div class="dss-courtbg" aria-hidden="true"><div class="dss-courtlines"></div></div>
<main style="position: relative; z-index: 1">…Seiteninhalt…</main>

<!-- Nur ein Bereich: Modifikator dss-courtbg--absolute, der Bereich braucht position: relative -->
<section style="position: relative; overflow: hidden">
  <div class="dss-courtbg dss-courtbg--absolute" aria-hidden="true"><div class="dss-courtlines"></div></div>
  <div style="position: relative; z-index: 1">…Inhalt…</div>
</section>`;

export const svelte = `<script>
  import CourtLines from '@bbv/dss-design-system/svelte/CourtLines';
</script>

<!-- Ganze Seite: füllt den Viewport -->
<CourtLines />
<main style="position: relative; z-index: 1">…Seiteninhalt…</main>

<!-- Nur ein Bereich: füllt den nächsten positionierten Container -->
<section style="position: relative; overflow: hidden">
  <CourtLines position="absolute" />
  <div style="position: relative; z-index: 1">…Inhalt…</div>
</section>`;

export const react = `import { CourtLines } from '@bbv/dss-design-system/react';

{/* Ganze Seite: füllt den Viewport */}
<CourtLines />
<main style={{ position: 'relative', zIndex: 1 }}>…Seiteninhalt…</main>

{/* Nur ein Bereich: füllt den nächsten positionierten Container */}
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <CourtLines position="absolute" />
  <div style={{ position: 'relative', zIndex: 1 }}>…Inhalt…</div>
</section>`;
