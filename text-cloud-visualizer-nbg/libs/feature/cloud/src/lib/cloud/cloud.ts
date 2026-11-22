import { Component, inject } from '@angular/core';
import { CloudStore } from '../store/cloud.store';
import { CloudLayoutService } from '../services/cloud-layout.service';
import { CloudInputComponent } from '../ui/cloud-input/cloud-input';
import { CloudCanvasComponent } from '../ui/cloud-canvas/cloud-canvas';
import { CloudTopbarComponent } from '../ui/cloud-topbar/cloud-topbar';

@Component({
  selector: 'lib-cloud',
  standalone: true,
  // Hier wird der Store an den Lebenszyklus des Features gebunden
  providers: [CloudLayoutService, CloudStore],
  imports: [CloudInputComponent, CloudCanvasComponent, CloudTopbarComponent],
  templateUrl: './cloud.html',
  styleUrl: './cloud.scss',
})
export class Cloud {
  readonly store = inject(CloudStore);
}
