import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppStore } from '@text-cloud-visualizer-nbg/core';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Diese Zeile MUSS zwingend innerhalb der Klasse stehen
  readonly store = inject(AppStore);
}
