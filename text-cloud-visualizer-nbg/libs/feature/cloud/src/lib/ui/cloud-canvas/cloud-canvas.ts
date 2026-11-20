import { Component, inject } from '@angular/core';
import { CloudStore } from '../../store/cloud.store';

@Component({
  selector: 'lib-cloud-canvas',
  standalone: true,
  templateUrl: './cloud-canvas.html',
  styleUrl: './cloud-canvas.scss',
})
export class CloudCanvasComponent {
  readonly store = inject(CloudStore);
}
