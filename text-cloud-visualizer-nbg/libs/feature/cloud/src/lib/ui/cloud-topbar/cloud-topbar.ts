import { Component, inject } from '@angular/core';
import { AppStore } from '@text-cloud-visualizer-nbg/core';
import { ThemeToggleComponent } from '@text-cloud-visualizer-nbg/ui'; // ggf. Alias aus tsconfig.base.json prüfen

@Component({
  selector: 'lib-cloud-topbar',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './cloud-topbar.html',
  styleUrl: './cloud-topbar.scss',
})
export class CloudTopbarComponent {
  readonly appStore = inject(AppStore);
}
