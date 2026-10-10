<script lang="ts">
  // Testhilfe: Ebenen ändern sich zur Laufzeit (äußeres level, inneres by, titleAs, Modal-titleAs).
  import HeadingLevel from '../../svelte/HeadingLevel.svelte';
  import Modal from '../../svelte/Modal.svelte';
  import EmptyState from '../../svelte/EmptyState.svelte';
  import PlayerCard from '../../svelte/PlayerCard.svelte';
  import TeamCard from '../../svelte/TeamCard.svelte';
  import Table from '../../svelte/Table.svelte';

  let outer = $state<any>(3);
  let inner = $state(2);
  let titleAs = $state<any>(undefined);
  let modalAs = $state<any>(undefined);
  export function set(values: { outer?: any; inner?: number; titleAs?: any; modalAs?: any }) {
    if ('outer' in values) outer = values.outer;
    if ('inner' in values) inner = values.inner!;
    if ('titleAs' in values) titleAs = values.titleAs;
    if ('modalAs' in values) modalAs = values.modalAs;
  }
</script>

<div id="direkt">
  <HeadingLevel level={outer}>
    <EmptyState title="direkt" />
    <div id="innen">
      <HeadingLevel by={inner}>
        <EmptyState title="innen" {titleAs} />
        <PlayerCard jersey="4" name="Karte" />
        <TeamCard name="Team" />
        <Table title="Tabelle" columns={[{ key: 'a', label: 'A' }]}>
          {#snippet rows()}<tr><td>x</td></tr>{/snippet}
        </Table>
      </HeadingLevel>
    </div>
  </HeadingLevel>
</div>

<div id="modal">
  <Modal open title="Modal" titleAs={modalAs}>
    <EmptyState title="im Modal" />
  </Modal>
</div>
