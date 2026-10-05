import BannerDemo from './components/BannerDemo.svelte';

export default {
  title: 'Components/Banner',
  component: BannerDemo,
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'inline-radio', options: ['info', 'ok', 'warn', 'danger'] },
    icon:     { control: 'boolean' },
    title:    { control: 'text' },
    body:     { control: 'text' },
  },
  args: { severity: 'info', title: '', icon: true, body: 'Geschätzte Gesamtdauer: 180 Minuten.' },
};

export const Info = {};
export const Erfolg = { args: { severity: 'ok', body: 'Spielplan gespeichert.' } };
export const Warnung = { args: { severity: 'warn', title: 'Hallenzeit knapp', body: 'Das passt nur mit weniger Runden in die verfügbare Hallenzeit.' } };
export const Fehler = { args: { severity: 'danger', title: 'Export fehlgeschlagen', body: 'Bitte erneut versuchen.' } };
export const OhneIcon = { args: { icon: false } };
