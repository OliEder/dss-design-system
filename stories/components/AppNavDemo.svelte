<script lang="ts">
  import AppNav from '../../svelte/AppNav.svelte';
  import TopBar from '../../svelte/TopBar.svelte';

  let { tone = 'light', currentHref = '/ergebnisse' }: { tone?: 'light' | 'dark'; currentHref?: string } = $props();

  const items = [
    { id: 'prep', label: 'Vorbereiten', items: [
      { id: 'teams', label: 'Teams', href: '/teams' },
      { id: 'config', label: 'Konfiguration', href: '/konfiguration' },
    ] },
    { id: 'play', label: 'Spielen', items: [
      { id: 'results', label: 'Ergebnisse erfassen', href: '/ergebnisse' },
    ] },
    { id: 'view', label: 'Ansehen', items: [
      { id: 'schedule', label: 'Zeitplan', href: '/zeitplan', disabled: true, hint: 'Erst nach dem Zeitplan verfügbar' },
      { id: 'overview', label: 'Turnierübersicht', href: '/uebersicht' },
    ] },
    { id: 'export', label: 'Export', href: '/export' },
    { id: 'help', label: 'Hilfe', items: [
      { id: 'manual', label: 'Anleitung', href: '/anleitung' },
      { id: 'demos', label: 'Demo-Turniere', href: '/demos' },
    ] },
  ];
</script>

<div style="min-height: 320px;">
  <TopBar brand="Turnier-Manager" mark="T" />
  <AppNav {items} {tone} {currentHref} />
</div>
