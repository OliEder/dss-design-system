<script>
  import SpecPage from './_SpecPage.svelte';
  import TextInput from '../../svelte/TextInput.svelte';
</script>

<SpecPage
  title="Forms"
  intro="Eingabefelder mit klarer Label-Hierarchie, sichtbarer Validierung und allen vier Status-Tonalitäten. Alle Felder validieren mindestens WCAG 2.1 AAA Kontrast in Default und Focus."
>
  <!-- 01 -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">01 — Anatomy</div>
      <div class="spec-title">
        <h2>Label oben, Hilfe unten, Status farbig.</h2>
        <p>
          Die TextInput-Anatomie folgt einer festen Reihenfolge: <b>Label</b> (oben,
          optional mit <code>Optional</code>-Tag), <b>Input</b> (Mitte), <b>Helper-Text</b>
          (unten, klein, farbcodiert je Status). Das Erforderlich-Sternchen sitzt
          inline am Label-Ende.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-2">
        <div>
          <div class="spec-cap">Default · Mit Hilfe-Text</div>
          <div class="spec-frame">
            <TextInput label="Trikotnummer" placeholder="0 · 00 · 1–99" help="FIBA: 0, 00, einstellig (1–9), zweistellig (01–99)." required />
          </div>
        </div>
        <div>
          <div class="spec-cap">Optional · Ohne Sternchen</div>
          <div class="spec-frame">
            <TextInput label="Zweitname" optional="Optional" placeholder="z.B. Sandro" help="Wird auf dem Spielbericht nicht abgedruckt." />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 02 — States -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">02 — States</div>
      <div class="spec-title">
        <h2>Vier Tonalitäten für Feedback.</h2>
        <p>
          <b>Default</b> ist neutral.
          <b>Erfolg</b> (grün) bestätigt valide Eingaben — z.B. überprüfte Lizenzen.
          <b>Warnung</b> (amber) flaggt grenzwertige Werte (späte Anwurfzeit).
          <b>Fehler</b> (rot) blockt die Eingabe und zeigt den Korrektur-Pfad.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-2">
        <TextInput label="Default"  placeholder="Eingabe…" help="Hinweistext" />
        <TextInput label="Erfolg"   value="Frank Müller" state="ok"    help="Spieler bestätigt" />
        <TextInput label="Warnung"  value="21:45"        state="warn"  help="Späte Anwurfzeit — Hallen-Schließung prüfen." />
        <TextInput label="Fehler"   value="107"          state="error" help="Ungültig — Nummern müssen FIBA-konform sein (max. 99)." required />
      </div>
    </div>
  </section>

  <!-- 03 — Disabled & Read-only -->
  <section class="spec-s">
    <div class="spec-s-head">
      <div class="spec-num">03 — Disabled</div>
      <div class="spec-title">
        <h2>Wenn das Feld nicht editierbar ist.</h2>
        <p>
          Automatisch zugewiesene Werte (Spieler-IDs, generierte Codes) bekommen
          <code>disabled</code> — der Hintergrund wird gedimmt, der Cursor zeigt
          <code>not-allowed</code>.
        </p>
      </div>
    </div>
    <div class="spec-body">
      <div class="spec-grid-2">
        <TextInput label="Spieler-ID" value="BBV-91842"  disabled help="Automatisch zugewiesen, nicht editierbar." />
        <TextInput label="Lizenz-Code" value="SR-2025-1834" disabled help="Generiert beim Speichern." />
      </div>
    </div>
  </section>
</SpecPage>
