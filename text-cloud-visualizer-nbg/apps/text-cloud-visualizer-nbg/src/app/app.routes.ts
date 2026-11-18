import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'cloud',
    // Lädt die Feature-Library erst, wenn die Route wirklich aufgerufen wird
    loadComponent: () =>
      import('@text-cloud-visualizer-nbg/cloud').then((m) => m.Cloud),
  },
  {
    path: '',
    redirectTo: 'cloud',
    pathMatch: 'full',
  },
];
