<script>
  import SpecPage from './_SpecPage.svelte';
  import TopBar from '../../svelte/TopBar.svelte';
  import BottomNav from '../../svelte/BottomNav.svelte';
  import Breadcrumbs from '../../svelte/Breadcrumbs.svelte';
  import Stepper from '../../svelte/Stepper.svelte';
  import Tabs from '../../svelte/Tabs.svelte';

  const schiriNav = [
    { id: 'overview', label: 'Übersicht', icon: 'i-home' },
    { id: 'roster',   label: 'Roster',    icon: 'i-roster' },
    { id: 'score',    label: '',          icon: 'i-plus', fab: true },
    { id: 'foul',     label: 'Fouls',     icon: 'i-foul-p', badge: 3 },
    { id: 'settings', label: 'Settings',  icon: 'i-cog' },
  ];

  const setupSteps = [
    { id: 's1', label: 'Spiel-Daten',  description: 'Datum, Halle, Liga',          state: 'done' },
    { id: 's2', label: 'Aufstellungen', description: 'Heim & Gast bestätigen',       state: 'done' },
    { id: 's3', label: 'Kampfgericht',  description: 'Schiri-Lizenzen & Crew',       state: 'current' },
    { id: 's4', label: 'Freigabe',      description: 'Unterschriften & Übertragung', state: 'pending' },
  ];

  const pageTabs = [
    { id: 'overview', label: 'Übersicht' },
    { id: 'roster',   label: 'Aufstellung', count: 12 },
    { id: 'box',      label: 'Boxscore' },
    { id: 'pbp',      label: 'Play-by-Play', count: 47 },
    { id: 'crew',     label: 'Kampfgericht' },
  ];
</script>

<SpecPage
  title="Navigation"
  intro="Vier Familien decken jede Navigations-Situation ab — Top-Bar trägt Marke und Live-Kontext, Sidebar/Tabs strukturieren die App, Bottom-Nav dient Mobile, Breadcrumbs und Stepper orientieren in Hierarchie und Flow."
>
  <!-- 01 — Top-Bar -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">01 — Top-Bar</div>
      <div class="spec-title">
        <h2>Drei Anatomien für drei Kontexte.</h2>
        <p>
          Die Top-Bar bleibt strukturell gleich — Brand links, Spacer, Aktionen rechts —
          aber der Kontext-Inhalt schaltet die Persönlichkeit:
          <b>Live</b> bringt rote Pulse-Indikator + Spielstand + Uhr,
          <b>Admin</b> trägt Breadcrumb-Kontext für Vereinsregister,
          <b>Default</b> bleibt ruhig.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Live · Schiri-/Coach-App <span class="pill ok">Live</span></div>
        <div class="spec-frame tight">
          <TopBar brand="DSS" mark="D" context="live" matchLabel="BBL · 17. Spieltag" score="87 : 64" clock="Q4 · 02:14" user="Stefan B." userInitials="SB" />
        </div>
      </div>
      <div>
        <div class="spec-cap">Admin · Vereinsregister</div>
        <div class="spec-frame tight">
          <TopBar brand="BBV" mark="B" context="admin" matchLabel="Vereinsregister · TSV Tröster Breitengüßbach" user="Jana Lutz" userInitials="JL" />
        </div>
      </div>
      <div>
        <div class="spec-cap">Default · ruhig</div>
        <div class="spec-frame tight">
          <TopBar brand="DSS Coach" mark="C" user="Tom K." userInitials="TK" />
        </div>
      </div>
    </div>
  </section>

  <!-- 02 — Tabs -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">02 — Tabs</div>
      <div class="spec-title">
        <h2>Vier Tab-Stile, ein Vokabular.</h2>
        <p>
          <b>Underline</b> für hierarchische Seitenebenen,
          <b>Segmented</b> für In-Panel-Schaltflächen,
          <b>Pills</b> als wrap-freundliche Filterleiste,
          <b>Vertical</b> für Settings-Sidebars. Tastatur-Navigation ist überall identisch.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Underline · Seiten-Tabs</div>
        <div class="spec-frame">
          <Tabs items={pageTabs} variant="underline" value="overview" />
        </div>
      </div>
      <div>
        <div class="spec-cap">Segmented · Dichte-Toggle</div>
        <div class="spec-frame">
          <Tabs items={[{ id: 't', label: 'Touch' }, { id: 'd', label: 'Default' }, { id: 'c', label: 'Compact' }, { id: 'x', label: 'Dense' }]} variant="segmented" value="d" />
        </div>
      </div>
      <div>
        <div class="spec-cap">Pills · Filter-Strip</div>
        <div class="spec-frame">
          <Tabs items={[{ id: 'a', label: 'Bayernliga Süd' }, { id: 'b', label: 'Regionalliga' }, { id: 'c', label: 'Saison 25/26' }, { id: 'd', label: 'Damen' }, { id: 'e', label: 'U18 m.' }]} variant="pills" multi activeIds={['a', 'c']} />
        </div>
      </div>
    </div>
  </section>

  <!-- 03 — Bottom-Nav -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">03 — Bottom-Nav</div>
      <div class="spec-title">
        <h2>Schiri-App, Coach-App, Zuschauer-Modus.</h2>
        <p>
          Für Mobile-Surfaces in der Halle: Bottom-Nav mit 4 oder 5 Items,
          alternativ mit zentralem <b>FAB</b> für die Hauptaktion (z.B. <i>Punkt buchen</i>).
          Badge-Indikatoren weisen auf neue Events hin. 64 px Höhe + Safe-Area-aware.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Schiri-App · 5 Items mit FAB &amp; Badge</div>
        <div style="max-width: 380px;">
          <div class="spec-frame tight">
            <div style="height: 200px; background: linear-gradient(0deg, var(--n-50), var(--n-0)); border-bottom: 1px solid var(--page-line);"></div>
            <BottomNav items={schiriNav} />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 04 — Breadcrumbs -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">04 — Breadcrumbs</div>
      <div class="spec-title">
        <h2>Wo bin ich, wo komme ich her.</h2>
        <p>
          Drei Ausführungen:
          <b>Plain</b> für Page-Header,
          <b>Tagged</b> mit Kontext-Labels (Org · Liga · Team) für Admin-Surfaces,
          <b>Chip</b> als Pill-Style für Mobile.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-stack">
        <div>
          <div class="spec-cap">Plain</div>
          <div class="spec-frame">
            <Breadcrumbs items={[{ label: 'Verband', href: '#' }, { label: 'Bayernliga', href: '#' }, { label: 'TSV Tröster', href: '#' }, { label: 'Roster' }]} />
          </div>
        </div>
        <div>
          <div class="spec-cap">Tagged</div>
          <div class="spec-frame">
            <Breadcrumbs variant="tagged" items={[{ label: 'Verband', href: '#', tag: 'Org' }, { label: 'Bayernliga', href: '#', tag: 'Liga' }, { label: 'TSV Tröster', href: '#', tag: 'Team' }, { label: 'Roster', tag: 'View' }]} />
          </div>
        </div>
        <div>
          <div class="spec-cap">Chip</div>
          <div class="spec-frame">
            <Breadcrumbs variant="chip" items={[{ label: 'Verband', href: '#' }, { label: 'Bayernliga', href: '#' }, { label: 'Roster' }]} />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 05 — Stepper -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">05 — Stepper</div>
      <div class="spec-title">
        <h2>Setup-Flows, Spiel-Vorbereitung, Onboarding.</h2>
        <p>
          Drei Repräsentationen, gleiche Datenstruktur (<code>done · current · pending</code>):
          <b>Horizontal</b> für Wizard-Header,
          <b>Compact</b> als 4 px Progress-Track für Sticky-Header,
          <b>Vertikal</b> für Sidebar-Wizards mit Beschreibung pro Schritt.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Horizontal</div>
        <div class="spec-frame"><Stepper steps={setupSteps} /></div>
      </div>
      <div class="spec-grid-2">
        <div>
          <div class="spec-cap">Compact</div>
          <div class="spec-frame"><Stepper steps={setupSteps} variant="compact" /></div>
        </div>
        <div>
          <div class="spec-cap">Vertikal</div>
          <div class="spec-frame"><Stepper steps={setupSteps} variant="vertical" /></div>
        </div>
      </div>
    </div>
  </section>
</SpecPage>
