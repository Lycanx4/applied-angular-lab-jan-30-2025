import { NgFor, UpperCasePipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-nav-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe, RouterLink, RouterLinkActive, FeatureDirective],
  template: `
    <ul class="{{ classNames() }}">
      @for (link of links(); track link.href) {
        @if (link.feature) {
          <li>
            <a
              routerLinkActive="active"
              *feature="link.feature"
              [routerLink]="[link.href]"
              >{{ link.text | uppercase }}</a
            >
          </li>
        } @else {
          <li>
            <a routerLinkActive="active" [routerLink]="[link.href]">{{
              link.text | uppercase
            }}</a>
          </li>
        }
      }
    </ul>
  `,
  styles: ``,
})
export class NavigationListItemComponent {
  classNames = input.required<string>();
  links = signal<{ href: string; text: string; feature?: string }[]>([
    {
      href: 'resources',
      text: 'Resources',
    },
    {
      href: 'books',
      text: 'Books',
    },
    {
      href: 'demos',
      text: 'Demos',
    },
    {
      href: 'golf',
      text: 'Golf',
      feature: 'golf',
    },
    {
      href: 'jeff-counter',
      text: 'Counter (Jeff)',
    },
    {
      href: 'counter',
      text: 'Counter',
    },
  ]);
}
