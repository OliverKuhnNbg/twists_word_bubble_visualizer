# Twist`s Text Cloud Visualizer NBG

Dieses Projekt ist eine interaktive Text Cloud Visualisierung. Es wird in einem Nx Monorepo mit einer strengen Domain-Driven Design (DDD) Architektur entwickelt.

## Tech-Stack

Das Fundament der Anwendung basiert auf modernen und hochperformanten Web-Technologien:

- **Framework:** Angular 17+ (Zoneless / `provideExperimentalZonelessChangeDetection`)
- **State Management:** NgRx SignalStore
- **Visualisierung & Rendering:** D3.js (`d3-cloud`)
- **Dokumenten-Verarbeitung:** PDF.js (`pdfjs-dist`)
- **UI & Styling:** Bootstrap (SCSS) & Phosphor Icons
- **Testing & Tooling:** Nx, Esbuild, Jest (Unit), Playwright (E2E), Prettier

## Lokale Entwicklung & Nx-Befehle

Alle Befehle werden im Workspace-Root (`text-cloud-visualizer-nbg`) ausgeführt:

### Quickstart (Dev-Server)

```bash
npx nx serve text-cloud-visualizer-nbg
```

Sobald der Build abgeschlossen ist, läuft der Entwicklungsserver standardmäßig unter **`http://localhost:4200`**.

### Weitere nützliche Nx-Befehle

```bash
# Produktions-Build erstellen
npx nx build text-cloud-visualizer-nbg

# Unit-Tests (Jest) für die App oder alle betroffenen Projekte ausführen
npx nx test text-cloud-visualizer-nbg
npx nx affected -t test

# End-to-End-Tests (Playwright) starten
npx nx e2e text-cloud-visualizer-nbg-e2e

# Linting & Code-Formatierung prüfen
npx nx affected -t lint

# Abhängigkeitsgraph der DDD-Schichten visualisieren
npx nx graph
```

---

## Domain-Driven Design (DDD) Ordnerstruktur

Dieses Projekt folgt einer strikten DDD-Architektur. Das Ziel ist eine saubere Trennung von Zuständigkeiten, maximale Skalierbarkeit und die strikte Vermeidung von zirkulären Abhängigkeiten.

### Funktion der Architekturschichten

- **`apps/`**: Enthält lediglich das App-Routing, die Root-Komponente und die `app.config.ts`. Hier findet **keine** Business-Logik statt. Die App dient nur als Hülle, die Features lädt.
- **`libs/core/`**: Globale Singleton-Services, App-weiter State (z. B. der Root NgRx SignalStore / `ThemeStore`), globale Interceptors und Konfigurationen. Wird ausschließlich in der `app.config.ts` oder Root-App geladen, niemals in anderen Libraries.
- **`libs/shared/ui/`**: Rein präsentative, "dumme" UI-Komponenten (Buttons, Layout-Wrapper, Modals, Theme-Toggle), die überall in der App wiederverwendet werden. Diese Komponenten haben keinen eigenen State und kennen keine Features.
- **`libs/feature/cloud/`**: "Smart Components" für den spezifischen Business-Use-Case (hier: Word Cloud Generierung). Enthält das Feature-Routing, orchestriert die UI-Komponenten und hält lokalen Feature-State.
- **`libs/data-access/`**: Kapselt jeglichen Kontakt zur "Außenwelt". Hier liegen API-Aufrufe, DTOs (Data Transfer Objects) und Services für externe Libraries (wie das PDF.js Parsing). Features konsumieren diese Schicht, um an Daten zu gelangen.

### Visualisierung der Ordnerstruktur

```text
text-cloud-visualizer-nbg/
├── apps/
│   ├── text-cloud-visualizer-nbg/         # Root Angular App (Bootstrap Hülle)
│   └── text-cloud-visualizer-nbg-e2e/     # Playwright E2E Tests
├── libs/
│   ├── core/                              # Globaler State, Setup
│   ├── data-access/                       # PDF.js Service, API-Calls
│   ├── feature/
│   │   └── cloud/                         # Smart Components, Word-Cloud Logik
│   └── shared/
│       └── ui/                            # Reusable UI (Buttons, Icons)
├── nx.json                                # Nx Workspace Konfiguration
├── package.json                           # Zentrale Abhängigkeiten
└── tsconfig.base.json                     # Globale TypeScript Pfade (Aliases)
```

## GUI-Architektur & Ausbauplan (Workspace-Layout)

Um maximale Zeichenfläche mit schnellem Zugriff auf alle Parameter zu verbinden, folgt die Oberfläche einem **Hybrid-Layout (Topbar + einklappbares Sidepanel)**:

1. **Schlanke Topbar (`52px`, permanent sichtbar):**
   - **Links:** Toggle-Button zum Ein-/Ausblenden des Control-Panels, App-Titel und Live-Status-Badge (`isProcessing`).
   - **Mitte / Rechts:** Format-Anpassung („Fit to Aspect“), Light-/Dark-Theme-Switch sowie direkte Export-Aktionen (**SVG** & **PNG**).
2. **Einklappbares Sidepanel (`360px` Desktop / `Offcanvas` Mobile):**
   - Gruppierte Parameter-Sektionen (Quelle: Text/PDF, Form & SVG-Maske, Typografie, Farbpaletten & HSL-Modi, Rotation & Stoppwörter).
   - Einklappbar über CSS-Transition (`margin-left`), um die Zeichenfläche auf 100 % Viewport-Breite zu erweitern.
3. **Responsive SVG-Stage (`viewBox`-Entkopplung):**
   - `d3-cloud` rechnet auf einer festen logischen Basis (z. B. `1200 × 800`), während das `<svg>`-Element per `viewBox` und `preserveAspectRatio="xMidYMid meet"` verlustfrei mit dem Container skaliert.
   - Kein teures D3-Neu-Rendering beim Fenster-Resize; optionale Anpassung des Seitenverhältnisses über `ResizeObserver` / `getBoundingClientRect()`.
4. **Dynamischer State & Export-Pipeline:**
   - **NgRx SignalStore (`CloudStore`):** Entkoppelt schnelle UI-Inputs (Slider, Textfeld) per `rxMethod` + `debounceTime(250)` von der D3-Layout-Berechnung.
   - **Export-Service:** Serialisiert den klonierten DOM-SVG-Knoten inklusive eingebetteter Styles für verlustfreien, transparenten **SVG-Download** (optimiert für Inkscape) sowie hochskalierten **PNG-Export** über ein Offscreen-`<canvas>`.

### Detaillierter Workspace-Verzeichnisbaum

```text
text-cloud-visualizer-nbg/
├── apps/
│   ├── text-cloud-visualizer-nbg/
│   │   └── src/
│   │       ├── app/
│   │       │   ├── app.component.ts                 # Root-Shell (<router-outlet>)
│   │       │   ├── app.config.ts                    # Zoneless Setup & Core Provider
│   │       │   └── app.routes.ts                    # Lazy-Loading der Cloud-Feature-Route
│   │       ├── styles.scss                          # Globale Bootstrap 5 & Phosphor Imports
│   │       └── index.html
│   └── text-cloud-visualizer-nbg-e2e/
├── libs/
│   ├── core/
│   │   └── src/lib/
│   │       ├── config/                              # Globale Konstanten
│   │       └── state/
│   │           └── theme.store.ts                   # Globaler Light/Dark-Theme SignalStore
│   ├── data-access/
│   │   └── src/lib/
│   │       ├── models/
│   │       │   └── cloud-config.model.ts            # Interfaces für Wörter, Paletten, Masken
│   │       └── services/
│   │           ├── pdf-parser.service.ts            # Text-Extraktion via PDF.js
│   │           ├── svg-mask.service.ts              # Parsing & Rasterisierung von SVG-Shapes
│   │           └── cloud-export.service.ts          # DOM-SVG-Serialisierung & PNG-Canvas-Export
│   ├── feature/
│   │   └── cloud/
│   │       └── src/
│   │           ├── lib/
│   │           │   ├── state/
│   │           │   │   └── cloud.store.ts           # NgRx SignalStore (Inputs, Debounce, D3-Trigger)
│   │           │   ├── containers/
│   │           │   │   └── cloud-workspace/         # Smart Shell (Topbar, Toggle-Panel, SVG-Stage)
│   │           │   └── components/
│   │           │       ├── cloud-canvas/            # D3-Cloud SVG-Renderer & Zoom-Wrapper
│   │           │       ├── source-controls/         # Text-Input, PDF-Upload & Stoppwörter
│   │           │       ├── style-controls/          # Fonts, Farbpaletten & Winkel-Presets
│   │           │       └── shape-controls/          # SVG-Masken-Upload & Seitenverhältnis
│   │           └── index.ts                         # Public API der Feature-Library
│   └── shared/
│       └── ui/
│           └── src/lib/
│               ├── theme-toggle/                    # Dummer Light/Dark-Mode Button
│               ├── workspace-topbar/                # Wiederverwendbare Header-Leiste
│               ├── collapsible-sidebar/             # Responsives Sidepanel / Offcanvas-Wrapper
│               └── range-slider/                    # Bootstrap-Range-Control mit Wert-Anzeige
├── AGENTS.md                                        # Projektregeln & Architektur-Leitplanken
├── nx.json
├── package.json
└── tsconfig.base.json
```
