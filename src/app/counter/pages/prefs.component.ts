import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor],
  template: `
    <button
      *ngFor="let pref of store.prefsList()"
      class="btn btn-primary mr-2"
      [disabled]="store.countBy() === pref"
      (click)="store.updateCountBy(pref)"
    >
      Count by {{ pref }}
    </button>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
