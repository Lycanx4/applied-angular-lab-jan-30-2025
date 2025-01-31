import { NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-prefs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor],
  template: `
    <button
      *ngFor="let pref of prefsList"
      class="btn btn-primary mr-2"
      [disabled]="currentPrefs === pref"
      (click)="setPrefs(pref)"
    >
      Sort by {{ pref }}
    </button>
  `,
  styles: ``,
})
export class PrefsPageComponent implements OnInit {
  prefsList = ['id', 'title', 'author', 'year'];
  currentPrefs = '';
  ngOnInit() {
    const storedPrefs = localStorage.getItem('prefs') || 'id';
    if (storedPrefs) {
      this.currentPrefs = storedPrefs;
    }
  }
  setPrefs(pref: string) {
    this.currentPrefs = pref;
    localStorage.setItem('prefs', pref);
  }
}
