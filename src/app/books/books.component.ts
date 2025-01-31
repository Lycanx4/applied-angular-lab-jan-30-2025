import { ChangeDetectionStrategy, Component, resource } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      <h2 class="text-2xl text-accent">Books</h2>
    </div>

    <div class="flex flex-col">
      <div>
        <a class="btn btn-sm btn-primary m-3" routerLink="table">Table</a>
        <a class="btn btn-sm btn-primary m-3" routerLink="statistics "
          >Statistics
        </a>
        <a class="btn btn-sm btn-primary m-3" routerLink="preferences"
          >Preferences</a
        >
      </div>
      <div><router-outlet /></div>
    </div>
  `,
  styles: ``,
})
export class BooksComponent {}
