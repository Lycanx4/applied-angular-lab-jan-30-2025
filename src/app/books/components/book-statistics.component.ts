import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-book-statistics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card card-side bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Books Statistics</h2>
        <p>Total number of books: {{ store.booksCount() }}</p>
        <p>Earliest year: {{ store.earliestYear() }}</p>
        <p>Latest year: {{ store.latestYear() }}</p>
        <p>Average number of pages: {{ store.averagePages() }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookStatisticsComponent {
  store = inject(BooksStore);
}
