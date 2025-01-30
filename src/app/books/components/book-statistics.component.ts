import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { BookEntity } from '../books.component';

@Component({
  selector: 'app-book-statistics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card card-side bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Books Statistics</h2>
        <p>Total number of books: {{ books.value()?.length }}</p>
        <p>Earliest year: {{ earliestYear }}</p>
        <p>Latest year: {{ latestYear }}</p>
        <p>Average number of pages: {{ averagePages }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookStatisticsComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
  get earliestYear(): number | undefined {
    return this.books
      .value()
      ?.reduce((min, book) => (book.year < min ? book.year : min), Infinity);
  }

  get latestYear(): number | undefined {
    return this.books
      .value()
      ?.reduce((max, book) => (book.year > max ? book.year : max), -Infinity);
  }

  get averagePages(): number | undefined {
    const books = this.books.value();
    if (!books || books.length === 0) return undefined;
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    return Math.round(totalPages / books.length);
  }
}
