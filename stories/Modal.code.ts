export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<!-- Größen: dss-modal--sm | (ohne = md) | dss-modal--wide | dss-modal--xwide.
     Escape, Fokus ins Modal, Fokusfalle und Fokus-Rückgabe musst du selbst ergänzen. -->
<div class="dss-backdrop"></div>
<div class="dss-modal-wrap">
  <div class="dss-modal dss-modal--sm" role="dialog" aria-modal="true" aria-labelledby="verwerfen-titel">
    <div class="dss-m-head">
      <!-- Symbol nur bei Schweregrad: dss-m-head-icon--danger | --warn | --ok | --info -->
      <div class="dss-m-head-icon dss-m-head-icon--danger">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5.2 10.8l5.6-5.6"/></svg>
      </div>
      <div class="dss-m-head-text">
        <h2 class="dss-m-title" id="verwerfen-titel">Spielbericht verwerfen?</h2>
        <div class="dss-m-subtitle">Nicht wiederherstellbar</div>
      </div>
      <button type="button" class="dss-m-close" aria-label="Schließen">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>
      </button>
    </div>
    <div class="dss-m-body">Alle erfassten Aktionen werden gelöscht. Das lässt sich nicht rückgängig machen.</div>
    <div class="dss-m-footer">
      <button type="button" class="dss-btn dss-btn--secondary dss-btn--md">Behalten</button>
      <button type="button" class="dss-btn dss-btn--danger dss-btn--md">Verwerfen</button>
    </div>
  </div>
</div>`;

export const svelte = `<script>
  import Modal from '@bbv/dss-design-system/svelte/Modal';
  import Button from '@bbv/dss-design-system/svelte/Button';

  let open = $state(false);
  let verwerfen = $state(false);
</script>

<Button onclick={() => (open = true)}>Spielbericht freigeben</Button>

<!-- Escape schließt, solange closable gilt (Standard). Ein Klick auf den Hintergrund schließt nicht; mit dismissOnBackdrop schon. -->
<Modal bind:open title="Spielbericht freigeben?" subtitle="BBL · 17. Spieltag" onclose={() => console.log('geschlossen')}>
  Nach Freigabe ist eine Korrektur nur noch über den Verband möglich.
  {#snippet footer()}
    <Button variant="secondary" onclick={() => (open = false)}>Abbrechen</Button>
    <Button onclick={() => (open = false)}>Freigeben</Button>
  {/snippet}
</Modal>

<!-- Zerstörerische Aktion: Schweregrad danger, Button danger, kleine Breite -->
<Modal bind:open={verwerfen} title="Spielbericht verwerfen?" subtitle="Nicht wiederherstellbar" severity="danger" size="sm">
  Alle erfassten Aktionen werden gelöscht.
  {#snippet footer()}
    <Button variant="secondary" onclick={() => (verwerfen = false)}>Behalten</Button>
    <Button variant="danger" onclick={() => (verwerfen = false)}>Verwerfen</Button>
  {/snippet}
</Modal>`;

export const react = `import { useState } from 'react';
import { Button, Modal } from '@bbv/dss-design-system/react';

export function Freigabe() {
  const [open, setOpen] = useState(false);
  const [verwerfen, setVerwerfen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Spielbericht freigeben</Button>

      {/* Radix Dialog: Fokus ins Modal, Fokusfalle, Escape. Den Fokus nach dem Schließen setzt du selbst zurück. */}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Spielbericht freigeben?"
        subtitle="BBL · 17. Spieltag"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button onClick={() => setOpen(false)}>Freigeben</Button>
          </>
        }
      >
        Nach Freigabe ist eine Korrektur nur noch über den Verband möglich.
      </Modal>

      {/* Zerstörerische Aktion: Der Dialog endet nur über einen Button (ein Klick daneben schließt nicht, Standard) */}
      <Modal
        open={verwerfen}
        onOpenChange={setVerwerfen}
        title="Spielbericht verwerfen?"
        subtitle="Nicht wiederherstellbar"
        severity="danger"
        size="sm"
        footer={<Button variant="danger" onClick={() => setVerwerfen(false)}>Verwerfen</Button>}
      >
        Alle erfassten Aktionen werden gelöscht.
      </Modal>
    </>
  );
}`;
