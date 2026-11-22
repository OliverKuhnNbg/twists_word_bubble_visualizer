import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggleComponent {
  readonly isDark = input.required<boolean>();
  readonly toggled = output<void>();
}
