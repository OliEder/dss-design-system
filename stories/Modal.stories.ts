import ModalDemo from './components/ModalDemo.svelte';

export default {
  title: 'Components/Modal',
  component: ModalDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    severity: { control: 'inline-radio', options: ['default', 'danger', 'warn', 'ok', 'info'] },
    size:     { control: 'inline-radio', options: ['sm', 'md', 'wide', 'xwide'] },
    closable: { control: 'boolean' },
  },
  args: {
    title: 'Spielbericht freigeben',
    subtitle: 'BBL · 17. Spieltag · Heim 87 : 74',
    severity: 'default',
    size: 'md',
    closable: true,
    body: 'Nach Freigabe ist eine Korrektur nur noch über den Verband möglich. Schiedsrichter und beide Trainer müssen unterschrieben haben.',
    cancelLabel: 'Abbrechen',
    confirmLabel: 'Freigeben',
    confirmVariant: 'primary',
  },
};

export const Standard = {};
export const DangerSpielVerwerfen = { args: {
  severity: 'danger',
  title: 'Spielbericht endgültig verwerfen?',
  subtitle: 'Nicht wiederherstellbar',
  body: 'Alle erfassten Aktionen, Aufstellungen und Schiri-Lizenzen werden gelöscht. Diese Aktion lässt sich nicht rückgängig machen.',
  cancelLabel: 'Behalten',
  confirmLabel: 'Verwerfen',
  confirmVariant: 'danger',
}};
export const WarnAnwurfzeit = { args: {
  severity: 'warn',
  title: 'Anwurfzeit nach 22:00 Uhr',
  subtitle: 'Hallenordnung prüfen',
  body: 'Die Halle schließt um 23:00 — Spielzeit + Verlängerung evtl. nicht eingehalten.',
  cancelLabel: 'Zeit ändern',
  confirmLabel: 'Trotzdem ansetzen',
  confirmVariant: 'amber',
}};
export const OkSync = { args: {
  severity: 'ok',
  title: 'Spielbericht synchronisiert',
  subtitle: 'Verband BBV · gerade eben',
  size: 'sm',
  body: 'Alle 47 Aktionen wurden an den Verband übertragen.',
  cancelLabel: 'Schließen',
  confirmLabel: 'OK',
}};
export const InfoBonus = { args: {
  severity: 'info',
  title: 'Bonus-Status',
  subtitle: 'FIBA-Regel 35',
  size: 'wide',
  body: 'Ab dem 5. Mannschafts-Foul eines Viertels werden alle weiteren Fouls mit 2 Freiwürfen geahndet — unabhängig von der Foul-Situation.',
  cancelLabel: 'Schließen',
  confirmLabel: 'Verstanden',
}};
