import { Component, inject } from '@angular/core';
import { CloudStore } from '../store/cloud.store';
import { CloudInputComponent } from '../ui/cloud-input/cloud-input';
// import { CloudCanvasComponent } from './ui/cloud-canvas.component';

@Component({
  selector: 'lib-cloud',
  standalone: true,
  // Hier wird der Store an den Lebenszyklus des Features gebunden
  providers: [CloudStore],
  imports: [CloudInputComponent],
  templateUrl: './cloud.html',
  styleUrl: './cloud.scss',
})
export class Cloud {
  readonly store = inject(CloudStore);
}
