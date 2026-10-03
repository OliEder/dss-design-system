# DSS Design System

**Digitaler Spielbericht · Komponenten-Library für Basketball-Apps**
Version 0.6 · WCAG 2.1 AAA · Framework-agnostisch · *Pre-release*

---

## Was ist drin

```
tokens/
  tokens.css            ← CSS Custom Properties (drop-in)
  tokens.json           ← Design Tokens Community Group format
  tailwind.preset.js    ← Tailwind v3/v4 preset
svelte/
  Button.svelte         ← Reference component
  TextInput.svelte      ← Reference component
  Modal.svelte          ← Reference component
  Card.svelte           ← v0.6
  Tabs.svelte           ← v0.6
  Icon.svelte           ← v0.6 (54 Glyphen)
.storybook/             ← v0.6 · Storybook config
stories/                ← v0.6 · Stories für alle Komponenten + Foundation
docs/
  DSS Design System - Identity Overview v0.3.html
  DSS Design System - Tables.html
  DSS Design System - Forms.html
  DSS Design System - Modals.html
  DSS Design System - Navigation.html       ← v0.6
  DSS Design System - Cards & Lists.html    ← v0.6
  DSS Design System - Icons.html            ← v0.6
```

---

## Quick Start

### Vanilla / Svelte / React (mit CSS Custom Properties)

```html
<link rel="stylesheet" href="tokens/tokens.css" />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
```

Dann tokens benutzen:

```css
.button-primary {
  background: var(--ink-900);
  color: white;
  height: var(--touch-md);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
}
```

### Tailwind

```js
// tailwind.config.js
import dssPreset from './tokens/tailwind.preset.js';

export default {
  presets: [dssPreset],
  content: ['./src/**/*.{html,svelte,ts,tsx}'],
};
```

```html
<button class="bg-ink-900 text-white h-touch-md rounded-md font-body">
  Korb erfassen
</button>
```

### Design Tokens (Style Dictionary, Theo, etc.)

```bash
npx style-dictionary build --tokens tokens/tokens.json
```

---

## Vanilla CSS (ohne Svelte)

Für Seiten ohne Build-Schritt gibt es `css/components.css` mit denselben Klassennamen wie die
Svelte-Komponenten (`dss-btn`, `dss-card`, `dss-tabs`, `dss-tbl`, `dss-chip`, …):

```html
<html data-theme="light">
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/components.css" />

<button class="dss-btn dss-btn--amber dss-btn--lg">Suchen</button>
<span class="dss-chip dss-chip--sky">Männlich</span>
```

Farben laufen über die semantischen Variablen `--dss-*`; Dark schaltet `data-theme="dark"` oder die
OS-Präferenz.

## Identitäts-Achsen

| Achse | Rolle | Anchor |
|---|---|---|
| **Ink** (Hue 60°) | Primary · Text · Buttons | `ink-800` |
| **Amber** (Hue 83°) | Signal · CTA · Spieluhr | `amber-400` |
| **Sky** (Hue 244°) | Atmosphäre · Heim · Info | `sky-400` |

### DBB-Compat-Preset

Falls Vertrag mit dem DBB entsteht, schalten **drei Hue-Werte** auf das offizielle DBB-Branding:

```css
:root {
  --h-ink:   0;     /* echtes Schwarz */
  --h-amber: 90;    /* DBB-Gold */
  --h-sky:   225;   /* DBB-Hellblau */
}
```

Strukturen, Kontraste und Komponenten bleiben unverändert.

---

## Accessibility

- **WCAG 2.1 AAA** durchgehend validiert (siehe Identity Overview · Section 01 · Audit-Tabelle).
- Body Text auf Surface: **≥ 7:1**.
- Large Text und Komponenten: **≥ 4.5:1 / 3:1**.
- Fokus-Ringe: **3 px Sky-200**, ≥ 3:1 Kontrast.
- Touch-Targets: **44 / 56 / 64 px** je nach Surface (Web / Tablet / Hallen-Tisch).

---

## Themes

Tokens unterstützen Light und Dark out-of-the-box:

```html
<!-- Auto via OS-Präferenz -->
<html>

<!-- Force light -->
<html data-theme="light">

<!-- Force dark (Kampfgericht-Tablet, TV-Scoreboard) -->
<html data-theme="dark">
```

---

## Komponenten-Referenzen

| File | Inhalt |
|---|---|
| **Identity Overview** | Color · Type · Spacing · Buttons · AAA-Audit |
| **Tables** | Roster · Boxscore · Play-by-Play · Comparison · Crew |
| **Forms** | Inputs · States · Setup · Live Scoring · Team-Config |
| **Modals** | Confirm · Sheet · Drawer · Toast · Banner · Popover |
| **Navigation** *(v0.6)* | App-Shell · Top-Bar · Sidebar · Tabs · Breadcrumbs · Bottom-Nav · Stepper · Sub-Nav |
| **Cards & Lists** *(v0.6)* | Match-Cards · Player-Cards · Standings · Crew · Empty / Loading / Error |
| **Icons** *(v0.6)* | 54 Glyphen: Aktionen · Court · Rollen · Status · System · UI-Core |

Jede HTML-Datei ist ein eigenständiges, scrollbares Dokument zum Live-Anschauen.

---

## Storybook

Alle Svelte-Komponenten + die Foundation-Tokens sind in Storybook live anschaubar
und durchklickbar — inkl. Light/Dark-Toggle und A11y-Checks.

```bash
npm install
npm run storybook       # dev server auf http://localhost:6006
npm run build-storybook # statische Site nach storybook-static/
```

Was drin ist:

- **Introduction** — Pack-Übersicht
- **Foundation/Colors** — alle Hue-Ramps (Ink · Amber · Sky · Neutral) + Semantic
- **Components** — Button · TextInput · Modal · Card · Tabs · Icon

Stories liegen unter `stories/`, geschrieben in [Svelte CSF](https://github.com/storybookjs/addon-svelte-csf).

---

## FIBA-Regel-Notizen

**Trikotnummern** (im Token-File als `validation.trikotnummer` definiert):

- Erlaubt: `0`, `00`, einstellig `1–9`, zweistellig `01–09` und `10–99`
- `7` und `07` sind **unterschiedliche Nummern**
- Eindeutig pro Mannschaft

```regex
^(0|00|0?[1-9]|[1-9][0-9])$
```

---

## Auf GitHub veröffentlichen

### Variante A · Einfach (privates Repo)

1. **Auf github.com:** Neues Repo erstellen, z. B. `dss-design-system` — privat oder public
2. **Lokal:** Projekt herunterladen (alle Dateien aus diesem Workspace)
3. Terminal im Projekt-Ordner:
   ```bash
   git init
   git add .
   git commit -m "DSS Design System v1.0"
   git branch -M main
   git remote add origin https://github.com/<dein-user>/dss-design-system.git
   git push -u origin main
   ```

### Variante B · Als npm-Package

Damit eure App-Repos das System via `npm install` einbinden können:

1. `package.json` im Repo-Root anlegen:
   ```json
   {
     "name": "@bbv/dss-design-system",
     "version": "1.0.0",
     "description": "DSS Design System for Basketball Apps",
     "main": "tokens/tokens.css",
     "exports": {
       "./tokens.css":    "./tokens/tokens.css",
       "./tokens.json":   "./tokens/tokens.json",
       "./tailwind":      "./tokens/tailwind.preset.js",
       "./svelte/*":      "./svelte/*.svelte"
     },
     "files": ["tokens/", "svelte/", "README.md"],
     "license": "MIT"
   }
   ```
2. In den App-Repos:
   ```bash
   # Wenn das Repo public ist:
   npm install <github-user>/<repo>

   # Wenn private:
   # GitHub Packages oder als git+ssh URL
   npm install git+ssh://git@github.com:<user>/<repo>.git
   ```

### Variante C · GitHub Pages (Docs live hosten)

Die HTML-Dokumente werden automatisch öffentlich anschaubar:

1. Im Repo: **Settings → Pages**
2. Source: `main` Branch, Ordner `/` (root) oder `/docs`
3. Save → nach ~2 Minuten ist die Library erreichbar unter:
   ```
   https://<user>.github.io/<repo>/DSS%20Design%20System%20-%20Identity%20Overview%20v0.3.html
   ```

### GitHub-Setup-Checkliste

- [ ] GitHub-Account hast du bereits
- [ ] Repo erstellt (public oder private, Lizenz wählen — MIT für freie Nutzung)
- [ ] `.gitignore` mit `node_modules/`, `.DS_Store`, etc.
- [ ] README.md (dieses Dokument)
- [ ] CHANGELOG.md (für Versionierung)
- [ ] Tag für v0.5 (Pre-release):
  ```bash
  git tag -a v0.5.0 -m "Pre-release · Foundation complete"
  git push --tags
  ```

---

## Nächste Schritte (optional)

- **Visual Regression Tests** mit Playwright + Percy
- **Figma Tokens** Export via Tokens Studio Plugin (tokens.json kompatibel)
- **Icon-Library** als eigenes Sub-Package

---

## Lizenz

MIT · Frei für Vereins-, Verbands- und kommerzielle Nutzung im Basketball-Kontext.

---

*Maintained for the Basketball-Apps ecosystem · v0.6 (Pre-release) · Mai 2026*
