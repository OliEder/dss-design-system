<script>
  import SpecPage from './_SpecPage.svelte';
  import Card from '../../svelte/Card.svelte';
  import MatchCard from '../../svelte/MatchCard.svelte';
  import PlayerCard from '../../svelte/PlayerCard.svelte';
  import EmptyState from '../../svelte/EmptyState.svelte';
  import Skeleton from '../../svelte/Skeleton.svelte';
</script>

<SpecPage
  title="Cards & Lists"
  intro="Karten sind die Container, in denen alles wohnt. Ein generischer Container (Card) plus vier domänen-spezifische Varianten (MatchCard, PlayerCard, EmptyState, Skeleton) decken das gesamte Spielberichts-Erlebnis ab — von der Roster-Liste bis zum Live-Spielstand."
>
  <!-- 01 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">01 — Anatomy</div>
      <div class="spec-title">
        <h2>Vier Karten-Varianten, eine Grammatik.</h2>
        <p>
          Jede Karte besteht aus <b>Body</b> und optionalem <b>Header/Footer</b>.
          <b>Default</b> ist Border + Radius&nbsp;lg + Surface-0; <b>Elevated</b> tauscht
          die Border gegen <code>shadow-md</code>; <b>Flat</b> sitzt auf Surface-2 ohne
          Border und Schatten; <b>Hoverable</b> wird interaktiv mit Pointer + Lift.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-4">
        <Card variant="default">
          <h4 style="margin:0 0 6px;font-family:var(--font-display);">Default</h4>
          <p style="margin:0;color:var(--n-700);font-size:13px;">Border · Surface-0</p>
        </Card>
        <Card variant="elevated">
          <h4 style="margin:0 0 6px;font-family:var(--font-display);">Elevated</h4>
          <p style="margin:0;color:var(--n-700);font-size:13px;">Shadow-md · borderless</p>
        </Card>
        <Card variant="flat">
          <h4 style="margin:0 0 6px;font-family:var(--font-display);">Flat</h4>
          <p style="margin:0;color:var(--n-700);font-size:13px;">Surface-2 · plain</p>
        </Card>
        <Card variant="hoverable">
          <h4 style="margin:0 0 6px;font-family:var(--font-display);">Hoverable</h4>
          <p style="margin:0;color:var(--n-700);font-size:13px;">Klick / Lift / Glow</p>
        </Card>
      </div>
    </div>
  </section>

  <!-- 02 — Match Cards -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">02 — Match Cards</div>
      <div class="spec-title">
        <h2>Drei Zustände eines Spiels.</h2>
        <p>
          <b>Scheduled</b> zeigt Anpfiff, Halle und die Teams ohne Punkte.
          <b>Live</b> öffnet sich ins Hauptlayout, zeigt den laufenden Spielstand,
          eine pulsierende Indikator-Lampe oben und Quarter + Spieluhr.
          <b>Finished</b> hebt den Sieger fett hervor, der Verlierer wird gedimmt.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-3">
        <MatchCard state="scheduled" league="Bayernliga Süd" matchday="17. Spieltag" date="Sa, 25. Mai" time="19:30" venue="Tröster-Halle" heim={{ name: 'TSV Tröster' }} gast={{ name: 'USC Heidelberg' }} />
        <MatchCard state="live"      league="Bayernliga Süd" matchday="17. Spieltag" quarter="Q4" clock="02:14" venue="Tröster-Halle" heim={{ name: 'TSV Tröster', score: 87 }} gast={{ name: 'USC Heidelberg', score: 64 }} />
        <MatchCard state="finished"  league="Bayernliga Süd" matchday="16. Spieltag" venue="Tröster-Halle" heim={{ name: 'TSV Tröster', score: 92 }} gast={{ name: 'BG Topstars', score: 79 }} />
      </div>
    </div>
  </section>

  <!-- 03 — Player Cards -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">03 — Player Cards</div>
      <div class="spec-title">
        <h2>Spieler in drei Maßstäben.</h2>
        <p>
          <b>Compact</b> für Roster-Listen und Bank-Anzeige (32 px Trikot, eine Zeile).
          <b>Standard</b> für Spieltags-Übersicht mit 64 px Trikot, Position-Tag und 4 Vitals.
          <b>Hero</b> ist die dunkle Profil-Karte mit 110 px Trikot und Amber-Glow für Detail-Screens.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div>
        <div class="spec-cap">Compact · Roster-Row</div>
        <div class="spec-frame">
          <div class="spec-stack">
            <PlayerCard size="compact" jersey="4"  name="A. Seiferth" position="PG" team="heim" captain stat={22} statLabel="PTS" />
            <PlayerCard size="compact" jersey="7"  name="N. Wimberg"  position="SG" team="heim" stat={19} statLabel="PTS" />
            <PlayerCard size="compact" jersey="13" name="T. Reuter"   position="PF" team="heim" stat={12} statLabel="PTS" />
          </div>
        </div>
      </div>

      <div>
        <div class="spec-cap">Standard · Übersicht</div>
        <div class="spec-grid-2">
          <PlayerCard size="standard" jersey="4"  name="A. Seiferth" position="PG" team="heim" captain age="24 J." height_cm="188" vitals={[{ label: 'PPG', value: '17.4', accent: true }, { label: 'APG', value: '6.2' }, { label: 'RPG', value: '3.1' }, { label: 'EFF', value: '22.8' }]} />
          <PlayerCard size="standard" jersey="15" name="J. Albers"   position="C"  team="heim"         age="29 J." height_cm="208" vitals={[{ label: 'PPG', value: '12.1' }, { label: 'RPG', value: '9.8', accent: true }, { label: 'BPG', value: '1.4' }, { label: 'EFF', value: '18.5' }]} />
        </div>
      </div>

      <div>
        <div class="spec-cap">Hero · Profil <span class="pill dark">Dark</span></div>
        <PlayerCard size="hero" jersey="4" name="Aaron Seiferth" position="PG" captain age="24 J." height_cm="188" vitals={[{ label: 'PPG', value: '17.4', accent: true }, { label: 'APG', value: '6.2' }, { label: 'STL', value: '2.1' }, { label: '3P%', value: '41.8' }]} />
      </div>
    </div>
  </section>

  <!-- 04 — Empty States -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">04 — Empty States</div>
      <div class="spec-title">
        <h2>Wenn nichts da ist, etwas erklären.</h2>
        <p>
          Drei Tonalitäten: <b>neutral</b> (keine Daten vorhanden), <b>action</b> (etwas
          fehlt, der User kann es beheben — Amber-Akzent) und <b>error</b> (Laden
          fehlgeschlagen, mit Retry-Pfad). Empty-States ohne nächsten Schritt sind verboten.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-3">
        <EmptyState tone="neutral" title="Noch keine Spiele angesetzt" body="Sobald Spiele für den aktuellen Spieltag eingetragen sind, erscheinen sie hier." cta="Spielplan öffnen" />
        <EmptyState tone="action"  title="Schiri-Lizenz fehlt"          body="Für die Freigabe wird die Lizenz des Hauptschiedsrichters benötigt."        cta="Lizenz hinzufügen" />
        <EmptyState tone="error"   title="Verbindung fehlgeschlagen"    body="Wir konnten die Spielberichte nicht synchronisieren."                       cta="Erneut versuchen" />
      </div>
    </div>
  </section>

  <!-- 05 — Skeletons -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">05 — Skeletons</div>
      <div class="spec-title">
        <h2>Loading ohne Springen.</h2>
        <p>
          Shimmer-Placeholder nehmen exakt die Form der späteren Komponente ein —
          damit es beim Daten-Eintreffen keine Layout-Shifts gibt. Primitives für
          Text, Blöcke und Avatare; vorgebaute Patterns für die gängigsten Rows.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-2">
        <div>
          <div class="spec-cap">Player-List · 4 Reihen</div>
          <div class="spec-frame">
            <Skeleton variant="row" count={4} />
          </div>
        </div>
        <div>
          <div class="spec-cap">Match-Card</div>
          <div class="spec-frame">
            <Skeleton variant="match" />
            <div style="height: 10px;"></div>
            <Skeleton variant="match" />
          </div>
        </div>
      </div>
    </div>
  </section>
</SpecPage>
