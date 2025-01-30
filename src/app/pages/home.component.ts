import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <p>Welcome Home Kaung</p>
    <pre>{{ booksResource.value() | json }}</pre>
  `,
  styles: ``,
})
export class HomeComponent {
  booksResource = resource({
    loader: () => fetch('./api/books').then((b) => b.json()),
  });
}
