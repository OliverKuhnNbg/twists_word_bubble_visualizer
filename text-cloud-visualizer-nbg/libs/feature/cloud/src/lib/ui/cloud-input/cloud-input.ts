import { Component, inject } from '@angular/core';
import { CloudStore } from '../../store/cloud.store';
// import { CloudInputComponent } from './ui/cloud-input.component';
// import { CloudCanvasComponent } from './ui/cloud-canvas.component';

@Component({
  selector: 'lib-cloud-input',
  standalone: true,
  templateUrl: './cloud-input.html',
  styleUrl: './cloud-input.scss',
})
export class CloudInputComponent {
  readonly store = inject(CloudStore);

  onTextInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    console.log('componet value current Value: ' + value);
    this.store.setRawText(value);
  }
}
