/**
 * DSS AppNav · Vanilla-Verhalten
 * --------------------------------------------------------------
 * Ergänzt das Markup der AppNav (css/components.css) um Verhalten, ohne Framework:
 * Hamburger-Menü, Gruppen-Dropdowns (Disclosure), Esc, Klick außerhalb.
 *
 * Markup-Vertrag (Klassen siehe components.css):
 *   <nav class="dss-appnav dss-appnav--light" data-dss-appnav aria-label="Hauptnavigation">
 *     <div class="dss-appnav-bar">
 *       <button type="button" class="dss-appnav-toggle" data-appnav-toggle
 *               aria-expanded="false" aria-controls="nav-list">Menü</button>
 *       <ul class="dss-appnav-list" id="nav-list">
 *         <li class="dss-appnav-item"><a class="dss-appnav-link is-active" aria-current="page" href="/">Start</a></li>
 *         <li class="dss-appnav-item">
 *           <button type="button" class="dss-appnav-group-btn" data-appnav-group
 *                   aria-expanded="false" aria-controls="nav-g1">Gruppe</button>
 *           <ul class="dss-appnav-panel" id="nav-g1" hidden>
 *             <li><a class="dss-appnav-link" href="/a">Seite A</a></li>
 *           </ul>
 *         </li>
 *       </ul>
 *     </div>
 *   </nav>
 *
 * <script type="module" src="…/js/appnav.js"></script> initialisiert alle [data-dss-appnav] automatisch.
 */
const OPEN = 'is-open';

/** Initialisiert eine AppNav; gibt eine Funktion zum Entfernen des globalen Listeners zurück. */
export function initAppNav(root) {
  if (root.dataset.dssAppnavReady) return () => {};
  root.dataset.dssAppnavReady = 'true';

  const toggle = root.querySelector('[data-appnav-toggle]');
  const groups = Array.from(root.querySelectorAll('[data-appnav-group]'));

  const panelOf = (button) => document.getElementById(button.getAttribute('aria-controls'));
  const setGroup = (button, open) => {
    button.setAttribute('aria-expanded', String(open));
    button.classList.toggle(OPEN, open);
    const panel = panelOf(button);
    if (panel) panel.hidden = !open;
  };
  const closeGroups = () => groups.forEach((button) => setGroup(button, false));
  const setMenu = (open) => {
    root.classList.toggle(OPEN, open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  };

  if (toggle) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  }

  groups.forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeGroups();
      setGroup(button, open);
    });
  });

  root.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a[href]')) {
      closeGroups();
      setMenu(false);
    }
  });

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openButton = groups.find((button) => button.getAttribute('aria-expanded') === 'true');
    if (openButton) {
      closeGroups();
      openButton.focus();
    } else if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  const onOutside = (event) => {
    if (!root.contains(event.target)) closeGroups();
  };
  document.addEventListener('mousedown', onOutside);
  return () => document.removeEventListener('mousedown', onOutside);
}

/** Initialisiert alle AppNavs im Bereich (Standard: ganzes Dokument). */
export function initAppNavs(scope = document) {
  return Array.from(scope.querySelectorAll('[data-dss-appnav]')).map(initAppNav);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initAppNavs());
  else initAppNavs();
}
