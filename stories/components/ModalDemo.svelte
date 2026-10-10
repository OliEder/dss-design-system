<script>
  import Modal from '../../svelte/Modal.svelte';
  import Button from '../../svelte/Button.svelte';

  let {
    severity = 'default',
    size = 'md',
    title = 'Spielbericht freigeben',
    titleAs = undefined,
    subtitle = 'BBL · 17. Spieltag · Heim 87 : 74',
    closable = true,
    body = 'Nach Freigabe ist eine Korrektur nur noch über den Verband möglich. Schiedsrichter und beide Trainer müssen unterschrieben haben.',
    cancelLabel = 'Abbrechen',
    confirmLabel = 'Freigeben',
    confirmVariant = 'primary',
    footer: withFooter = true,
  } = $props();

  // In der Doku ist das Modal immer offen: Schließen (Escape, Hintergrund, Button) öffnet es sofort wieder,
  // sonst würde ein Escape alle Vorschauen der Seite schließen.
  let open = $state(true);
</script>

{#if withFooter}
  <Modal bind:open {title} {titleAs} {subtitle} {severity} {size} {closable} onclose={() => (open = true)}>
    {body}
    {#snippet footer()}
      <Button variant="secondary">{cancelLabel}</Button>
      <Button variant={confirmVariant}>{confirmLabel}</Button>
    {/snippet}
  </Modal>
{:else}
  <Modal bind:open {title} {titleAs} {subtitle} {severity} {size} {closable} onclose={() => (open = true)}>
    {body}
  </Modal>
{/if}
