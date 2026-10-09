<script>
  import Modal from '../../svelte/Modal.svelte';
  import Button from '../../svelte/Button.svelte';
  import ModalDemo from './ModalDemo.svelte';

  /** @type {{ example: string }} */
  let { example } = $props();

  const severities = [
    { severity: 'default', title: 'Spielbericht freigeben', subtitle: 'Standard', body: 'Nach Freigabe ist eine Korrektur nur noch über den Verband möglich.', cancelLabel: 'Abbrechen', confirmLabel: 'Freigeben' },
    { severity: 'danger', title: 'Spielbericht verwerfen?', subtitle: 'Nicht wiederherstellbar', body: 'Alle erfassten Aktionen werden gelöscht. Das lässt sich nicht rückgängig machen.', cancelLabel: 'Behalten', confirmLabel: 'Verwerfen', confirmVariant: 'danger' },
    { severity: 'warn', title: 'Anwurfzeit nach 22:00 Uhr', subtitle: 'Hallenordnung prüfen', body: 'Die Halle schließt um 23:00, Spielzeit und Verlängerung passen evtl. nicht hinein.', cancelLabel: 'Zeit ändern', confirmLabel: 'Trotzdem ansetzen', confirmVariant: 'amber' },
    { severity: 'ok', title: 'Spielbericht synchronisiert', subtitle: 'Verband BBV · gerade eben', body: 'Alle 47 Aktionen wurden an den Verband übertragen.', cancelLabel: 'Schließen', confirmLabel: 'OK' },
    { severity: 'info', title: 'Bonus-Status', subtitle: 'FIBA-Regel 35', body: 'Ab dem 5. Mannschafts-Foul eines Viertels gibt es für jedes weitere Foul 2 Freiwürfe.', cancelLabel: 'Schließen', confirmLabel: 'Verstanden' },
  ];
  const sizes = [
    { size: 'sm', label: 'sm · 380 px' },
    { size: 'md', label: 'md · 480 px (Standard)' },
    { size: 'wide', label: 'wide · 560 px' },
    { size: 'xwide', label: 'xwide · 720 px' },
  ];
  const cols = ['Standard', 'Hover', 'Fokus', 'Aktiv', 'Gesperrt'];
  const buttons = [
    { name: 'Primär', variant: 'primary', label: 'Freigeben' },
    { name: 'Sekundär', variant: 'secondary', label: 'Abbrechen' },
    { name: 'Danger', variant: 'danger', label: 'Verwerfen' },
  ];
  const stateClass = { Standard: '', Hover: 'pseudo-hover', Fokus: 'pseudo-focus-visible', Aktiv: 'pseudo-hover pseudo-active', Gesperrt: '' };

  let interactiveOpen = $state(false);
</script>

{#snippet mock()}
  <div class="mock" aria-hidden="true">
    <div class="mock-h">Spielbericht · Spieltag 17</div>
    <div class="mock-l"></div><div class="mock-l mock-s"></div><div class="mock-l"></div>
  </div>
{/snippet}

{#if example === 'anatomie'}
  <div class="frame" style="height: 440px">
    {@render mock()}
    <ModalDemo title="Spielbericht beenden?" subtitle="Schiedsrichter-Unterschrift" body="Nach dem Senden kann der Spielbericht nicht mehr bearbeitet werden. Beide Schiedsrichter müssen unterschreiben." cancelLabel="Abbrechen" confirmLabel="Senden" />
  </div>
{:else if example === 'schweregrade'}
  <div class="grid2">
    {#each severities as s}
      <div>
        <div class="cap">{s.severity}</div>
        <div class="frame" style="height: 400px">
          {@render mock()}
          <ModalDemo {...s} size="sm" />
        </div>
      </div>
    {/each}
  </div>
{:else if example === 'groessen'}
  <div class="stack">
    {#each sizes as s}
      <div>
        <div class="cap">{s.label}</div>
        <div class="frame" style="height: 320px">
          {@render mock()}
          <ModalDemo size={s.size} title="Spielbericht freigeben" subtitle="BBL · 17. Spieltag" body="Nach Freigabe ist eine Korrektur nur noch über den Verband möglich." />
        </div>
      </div>
    {/each}
  </div>
{:else if example === 'interaktiv'}
  <div class="frame" style="height: 440px">
    <div class="page">
      <p class="page-t">Spielbericht · 17. Spieltag · Heim 87 : 74</p>
      <Button variant="primary" onclick={() => (interactiveOpen = true)}>Spielbericht freigeben</Button>
    </div>
    <Modal bind:open={interactiveOpen} title="Spielbericht freigeben?" subtitle="BBL · 17. Spieltag · Heim 87 : 74">
      Nach Freigabe ist eine Korrektur nur noch über den Verband möglich.
      {#snippet footer()}
        <Button variant="secondary" onclick={() => (interactiveOpen = false)}>Abbrechen</Button>
        <Button variant="primary" onclick={() => (interactiveOpen = false)}>Freigeben</Button>
      {/snippet}
    </Modal>
  </div>
{:else if example === 'zustaende'}
  <!-- data-fixed-states: die Werkzeugleiste "Zustand" lässt diese Matrix in Ruhe -->
  <div class="matrix" data-fixed-states>
    <div class="surface">
      <div class="states">
        <div class="head"></div>
        {#each cols as c}<div class="head">{c}</div>{/each}
        <div class="rowlabel">Schließen</div>
        {#each cols as c}
          <div class="cell cell-body">
            {#if c === 'Gesperrt'}
              <span class="none">nicht vorgesehen</span>
            {:else}
              <button type="button" class="dss-m-close {stateClass[c]}" aria-label="Schließen"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg></button>
            {/if}
          </div>
        {/each}
        {#each buttons as b}
          <div class="rowlabel">{b.name}</div>
          {#each cols as c}
            <div class="cell cell-foot">
              <button type="button" class="dss-btn dss-btn--{b.variant} dss-btn--md {stateClass[c]}" disabled={c === 'Gesperrt'}>{b.label}</button>
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>

<!-- Dos und Don'ts -->
{:else if example === 'do-aktion'}
  <ModalDemo size="sm" title="Spielbericht senden?" subtitle="Letzter Schritt" body="Nach dem Senden ist der Bericht final." cancelLabel="Noch prüfen" confirmLabel="Senden" />
{:else if example === 'dont-aktion'}
  <ModalDemo size="sm" title="Achtung" subtitle="" body="Nach dem Senden ist der Bericht final." cancelLabel="Nein" confirmLabel="OK" />
{:else if example === 'do-danger'}
  <ModalDemo size="sm" severity="danger" title="Spielbericht verwerfen?" subtitle="Nicht wiederherstellbar" body="Alle erfassten Aktionen werden gelöscht." cancelLabel="Behalten" confirmLabel="Verwerfen" confirmVariant="danger" />
{:else if example === 'dont-danger'}
  <ModalDemo size="sm" title="Spielbericht verwerfen?" subtitle="Nicht wiederherstellbar" body="Alle erfassten Aktionen werden gelöscht." cancelLabel="Behalten" confirmLabel="Verwerfen" />
{:else if example === 'do-ausweg'}
  <ModalDemo size="sm" title="Verbindung verloren" subtitle="Offline" body="Aktionen werden lokal gespeichert und später hochgeladen." cancelLabel="Später" confirmLabel="Verstanden" />
{:else if example === 'dont-ausweg'}
  <!-- closable=false ohne Footer: kein Schließen-Button, kein Escape, kein Hintergrund-Klick, keine Aktion -->
  <ModalDemo size="sm" closable={false} footer={false} title="Verbindung verloren" subtitle="Offline" body="Aktionen werden lokal gespeichert und später hochgeladen." />
{:else if example === 'do-schwere'}
  <ModalDemo size="sm" severity="info" title="Bonus-Status" subtitle="FIBA-Regel 35" body="Ab dem 5. Mannschafts-Foul eines Viertels gibt es 2 Freiwürfe." cancelLabel="Schließen" confirmLabel="Verstanden" />
{:else if example === 'dont-schwere'}
  <ModalDemo size="sm" severity="danger" title="Bonus-Status" subtitle="FIBA-Regel 35" body="Ab dem 5. Mannschafts-Foul eines Viertels gibt es 2 Freiwürfe." cancelLabel="Schließen" confirmLabel="Verstanden" />
{/if}

<style>
  .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }
  .stack { display: flex; flex-direction: column; gap: 24px; }
  .cap, .head, .rowlabel { font-family: var(--font-mono); font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-mute); }
  .cap { margin-bottom: 8px; }
  /* Das Modal ist position: fixed. transform macht den Rahmen zum Bezugsrahmen, sonst überdeckt es die ganze Seite. */
  .frame { position: relative; transform: translateZ(0); overflow: hidden; width: 100%; height: 400px; border: 1px solid var(--page-line); border-radius: var(--radius-lg); background: var(--page-bg); }
  .mock { padding: 24px; display: flex; flex-direction: column; gap: 10px; color: var(--page-fg); }
  .mock-h { font-family: var(--font-display); font-weight: 700; }
  .mock-l { height: 10px; border-radius: 5px; background: var(--page-line); }
  .mock-s { width: 60%; }
  .page { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
  .page-t { margin: 0; font-family: var(--font-display); font-weight: 700; color: var(--page-fg); }
  .matrix { display: flex; flex-direction: column; gap: 16px; }
  .surface { background: var(--page-bg); border: 1px solid var(--page-line); border-radius: var(--radius-lg); padding: 22px 24px; overflow-x: auto; }
  .states { display: grid; grid-template-columns: 90px repeat(5, minmax(120px, 1fr)); gap: 10px 12px; align-items: center; }
  .cell { display: flex; align-items: center; justify-content: center; min-height: 64px; border-radius: var(--radius-md); padding: 8px; }
  .cell-body { background: var(--dss-surface); }
  .cell-foot { background: var(--dss-surface-2); }
  .none { font-size: var(--fs-caption); color: var(--page-mute); }
</style>
