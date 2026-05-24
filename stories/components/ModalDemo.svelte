<script>
  import Modal from '../../svelte/Modal.svelte';
  import Button from '../../svelte/Button.svelte';

  let {
    severity = 'default',
    size = 'md',
    title = 'Spielbericht freigeben',
    subtitle = 'BBL · 17. Spieltag · Heim 87 : 74',
    closable = true,
    body = 'Nach Freigabe ist eine Korrektur nur noch über den Verband möglich. Schiedsrichter und beide Trainer müssen unterschrieben haben.',
    cancelLabel = 'Abbrechen',
    confirmLabel = 'Freigeben',
    confirmVariant = 'primary',
  } = $props();

  // Modal is always open in the showcase
  let open = $state(true);
</script>

<Modal bind:open {title} {subtitle} {severity} {size} {closable}>
  {body}
  {#snippet footer()}
    <Button variant="secondary">{cancelLabel}</Button>
    <Button variant={confirmVariant}>{confirmLabel}</Button>
  {/snippet}
</Modal>
