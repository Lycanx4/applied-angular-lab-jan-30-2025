import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="m-2 text-yellow-200">Count By: {{ store.countBy() }}</div>
    <div>
      <button
        class="btn btn-warning m-2"
        [disabled]="store.removeCounterDisabled()"
        (click)="store.minusCount()"
      >
        -
      </button>
      <span data-testid="current"> {{ store.count() }} </span>
      <button class="btn btn-primary m-2" (click)="store.addCount()">+</button>
      <button class="btn btn-secondary m-2" (click)="store.resetCounter()">
        Reset
      </button>
    </div>
    <div class="m-2 text-blue-300">
      <b
        ><span>{{ store.fizzBuzz() }}</span></b
      >
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
