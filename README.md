# Twist`s Text Cloud Visualizer NBG

Dieses Projekt ist eine interaktive Text Cloud Visualisierung. Es wird in einem Nx Monorepo mit einer strengen Domain-Driven Design (DDD) Architektur entwickelt.

## Tech-Stack

Das Fundament der Anwendung basiert auf modernen und hochperformanten Web-Technologien:

- **Framework:** Angular (Zoneless / `provideExperimentalZonelessChangeDetection`)
- **State Management:** NgRx SignalStore
- **Visualisierung & Rendering:** D3.js & d3-cloud
- **Dokumenten-Verarbeitung:** PDF.js
- **UI & Styling:** Bootstrap & Phosphor Icons
- **Tooling:** Nx, Esbuild, Jest, Prettier

## Lokale Entwicklung

Um die Anwendung lokal im Entwicklungsmodus zu starten, öffne ein Terminal im Workspace-Root (`text-cloud-visualizer-nbg`) und führe den folgenden Befehl aus:

```bash
npx nx serve text-cloud-visualizer-nbg
```

Sobald der Build abgeschlossen ist, läuft der Entwicklungsserver standardmäßig unter **`http://localhost:4200`**.

## Domain-Driven Design (DDD) Ordnerstruktur

Dieses Projekt folgt einer strikten DDD-Architektur. Das Ziel ist eine saubere Trennung von Zuständigkeiten, maximale Skalierbarkeit und die strikte Vermeidung von zirkulären Abhängigkeiten.

### Funktion der Architekturschichten

- **`apps/`**: Enthält lediglich das App-Routing, die Root-Komponente und die `app.config.ts`. Hier findet **keine** Business-Logik statt. Die App dient nur als Hülle, die Features lädt.
- **`libs/core/`**: Globale Singleton-Services, App-weiter State (z. B. der Root NgRx SignalStore), globale Interceptors und Konfigurationen. Wird ausschließlich in der `app.config.ts` oder Root-App geladen, niemals in anderen Libraries.
- **`libs/shared/ui/`**: Rein präsentative, "dumme" UI-Komponenten (Buttons, Layout-Wrapper, Modals), die überall in der App wiederverwendet werden. Diese Komponenten haben keinen eigenen State und kennen keine Features.
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
