<script context="module" lang="ts">
  import type { Meta } from '@storybook/sveltekit';
  import Modal from '../svelte/Modal.svelte';

  export const meta = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
      severity: { control: 'inline-radio', options: ['default', 'danger', 'warn', 'ok', 'info'] },
      size:     { control: 'inline-radio', options: ['sm', 'md', 'wide', 'xwide'] },
      closable: { control: 'boolean' },
    },
    args: {
      open: true,
      title: 'Spielbericht freigeben',
      subtitle: 'BBL · 17. Spieltag · Heim 87 : 74',
      severity: 'default',
      size: 'md',
      closable: true,
    },
  } satisfies Meta<Modal>;
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Modal from '../svelte/Modal.svelte';
  import Button from '../svelte/Button.svelte';
</script>

<Story name="Standard">
  {#snippet template(args)}
    <Modal {...args}>
      Nach Freigabe ist eine Korrektur nur noch über den Verband möglich.
      Schiedsrichter und beide Trainer müssen unterschrieben haben.
      {#snippet footer()}
        <Button variant="secondary">Abbrechen</Button>
        <Button variant="primary">Freigeben</Button>
      {/snippet}
    </Modal>
  {/snippet}
</Story>

<Story name="Danger · Spiel verwerfen" args={{
  severity: 'danger',
  title: 'Spielbericht endgültig verwerfen?',
  subtitle: 'Nicht wiederherstellbar',
}}>
  {#snippet template(args)}
    <Modal {...args}>
      Alle erfassten Aktionen, Aufstellungen und Schiri-Lizenzen werden gelöscht.
      Diese Aktion lässt sich nicht rückgängig machen.
      {#snippet footer()}
        <Button variant="secondary">Behalten</Button>
        <Button variant="danger">Verwerfen</Button>
      {/snippet}
    </Modal>
  {/snippet}
</Story>

<Story name="Warn · Späte Anwurfzeit" args={{
  severity: 'warn',
  title: 'Anwurfzeit nach 22:00 Uhr',
  subtitle: 'Hallenordnung prüfen',
}}>
  {#snippet template(args)}
    <Modal {...args}>
      Die Halle schließt um 23:00 — Spielzeit + Verlängerung evtl. nicht eingehalten.
      {#snippet footer()}
        <Button variant="secondary">Zeit ändern</Button>
        <Button variant="amber">Trotzdem ansetzen</Button>
      {/snippet}
    </Modal>
  {/snippet}
</Story>

<Story name="OK · Sync erfolgreich" args={{
  severity: 'ok',
  title: 'Spielbericht synchronisiert',
  subtitle: 'Verband BBV · gerade eben',
  size: 'sm',
}}>
  {#snippet template(args)}
    <Modal {...args}>
      Alle 47 Aktionen wurden an den Verband übertragen.
      {#snippet footer()}
        <Button variant="primary">OK</Button>
      {/snippet}
    </Modal>
  {/snippet}
</Story>

<Story name="Info · Erläuterung" args={{
  severity: 'info',
  title: 'Bonus-Status',
  subtitle: 'FIBA-Regel 35',
  size: 'wide',
}}>
  {#snippet template(args)}
    <Modal {...args}>
      Ab dem 5. Mannschafts-Foul eines Viertels werden alle weiteren Fouls
      mit 2 Freiwürfen geahndet — unabhängig von der Foul-Situation.
      {#snippet footer()}
        <Button variant="primary">Verstanden</Button>
      {/snippet}
    </Modal>
  {/snippet}
</Story>
