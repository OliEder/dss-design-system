export const vanilla = `<!-- Einmal im App-Root einbinden -->
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />
<!-- optional: <link rel="stylesheet" href="fonts/fonts.css" /> -->

<!-- Fläche: dss-appnav--light | dss-appnav--dark. Die aktuelle Seite trägt is-active und aria-current="page".
     data-dss-appnav, data-appnav-toggle und data-appnav-group verbindet js/appnav.js mit dem Verhalten. -->
<nav class="dss-appnav dss-appnav--light" data-dss-appnav aria-label="Hauptnavigation">
  <div class="dss-appnav-bar">
    <button type="button" class="dss-appnav-toggle" data-appnav-toggle aria-expanded="false" aria-controls="nav-list">Menü</button>
    <ul class="dss-appnav-list" id="nav-list">
      <li class="dss-appnav-item"><a class="dss-appnav-link is-active" aria-current="page" href="/">Start</a></li>
      <li class="dss-appnav-item">
        <button type="button" class="dss-appnav-group-btn" data-appnav-group aria-expanded="false" aria-controls="nav-g1">Vorbereiten</button>
        <ul class="dss-appnav-panel" id="nav-g1" hidden>
          <li><a class="dss-appnav-link" href="/teams">Teams</a></li>
          <!-- Gesperrt: kein Link, nicht fokussierbar; der Hinweis erscheint als Tooltip und für Screenreader -->
          <li>
            <span role="link" aria-disabled="true" class="dss-appnav-link is-disabled" title="Erst nach dem Zeitplan verfügbar">
              Zeitplan<span class="dss-sr-only"> – Erst nach dem Zeitplan verfügbar</span>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>

<script type="module" src="js/appnav.js"></script>`;

export const svelte = `<script>
  import AppNav from '@bbv/dss-design-system/svelte/AppNav';
  import TopBar from '@bbv/dss-design-system/svelte/TopBar';

  // Link: { id, label, href }. Gruppe: { id, label, items: Link[] }. Gesperrt: disabled + hint.
  const items = [
    { id: 'prep', label: 'Vorbereiten', items: [
      { id: 'teams', label: 'Teams', href: '/teams' },
      { id: 'schedule', label: 'Zeitplan', href: '/zeitplan', disabled: true, hint: 'Erst nach dem Zeitplan verfügbar' },
    ] },
    { id: 'results', label: 'Ergebnisse', href: '/ergebnisse' },
    { id: 'report', label: 'Auswertung', disabled: true, hint: 'Erst nach Turnierende verfügbar', items: [] },
  ];
</script>

<TopBar brand="Turnier-Manager" mark="T" />

<!-- currentHref markiert den Link mit genau diesem href; tone="dark" ist eine immer dunkle Fläche -->
<AppNav {items} currentHref="/ergebnisse" tone="dark">
  {#snippet context()}<span>Saison 25/26</span>{/snippet}
</AppNav>`;

export const react = `import { AppNav, TopBar, type AppNavItem } from '@bbv/dss-design-system/react';

// Dein Router: navigiert ohne Seitenwechsel
declare function navigate(href: string): void;

// Link: { id, label, href }. Gruppe: { id, label, items }. Gesperrt: disabled + hint.
const items: AppNavItem[] = [
  { id: 'prep', label: 'Vorbereiten', items: [
    { id: 'teams', label: 'Teams', href: '/teams' },
    { id: 'schedule', label: 'Zeitplan', href: '/zeitplan', disabled: true, hint: 'Erst nach dem Zeitplan verfügbar' },
  ] },
  { id: 'results', label: 'Ergebnisse', href: '/ergebnisse' },
  { id: 'report', label: 'Auswertung', disabled: true, hint: 'Erst nach Turnierende verfügbar', items: [] },
];

export function Kopf() {
  return (
    <>
      <TopBar brand="Turnier-Manager" mark="T" />
      <AppNav
        items={items}
        currentHref="/ergebnisse"
        tone="dark"
        context={<span>Saison 25/26</span>}
        // Eigene Link-Darstellung für einen Router; onNavigate schließt Dropdown und Menü
        renderLink={({ item, className, ariaCurrent, onNavigate, children }) => (
          <a
            href={item.href}
            className={className}
            aria-current={ariaCurrent}
            onClick={(event) => {
              event.preventDefault();
              navigate(item.href);
              onNavigate();
            }}
          >
            {children}
          </a>
        )}
      />
    </>
  );
}`;
