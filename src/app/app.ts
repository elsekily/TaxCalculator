import { Component, signal } from '@angular/core';
import { TaxCalculatorComponent } from './components/tax-calculator/tax-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaxCalculatorComponent],
  template: `
    <div class="container py-4">
      <app-tax-calculator></app-tax-calculator>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f8f9fa;
      min-height: 100vh;
    }
  `]
})
export class App {
  protected readonly title = signal('Tax Calculator');
}
