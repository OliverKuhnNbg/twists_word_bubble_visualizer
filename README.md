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
