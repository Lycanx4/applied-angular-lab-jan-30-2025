import {
  Component,
  ChangeDetectionStrategy,
  input,
  resource,
} from '@angular/core';
import { BookEntity } from '../books.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor],
  template: `
    <div>
      <h2 class="text-2xl text-accent">Books Table</h2>
      <div>
        <button class="btn btn-sm btn-primary m-3" (click)="sortBooks('id')">
          Sort by Id
        </button>
        <button class="btn btn-sm btn-primary m-3" (click)="sortBooks('title')">
          Sort by Title
        </button>
        <button
          class="btn btn-sm btn-primary m-3"
          (click)="sortBooks('author')"
        >
          Sort by Author
        </button>
        <button class="btn btn-sm btn-primary m-3" (click)="sortBooks('year')">
          Sort by Year
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publish Year</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-base-200" *ngFor="let book of books.value()">
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>
                <a [href]="book.link">Detail</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookTableComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
  sortBooks(criteria: 'id' | 'title' | 'author' | 'year') {
    const sortedBooks = this.books.value()?.sort((a, b) => {
      if (criteria === 'id' || criteria === 'year') {
        return Number(a[criteria]) - Number(b[criteria]);
      } else {
        if (a[criteria] < b[criteria]) {
          return -1;
        }
        if (a[criteria] > b[criteria]) {
          return 1;
        }
        return 0;
      }
    });
    if (sortedBooks) {
      this.books = resource<BookEntity[], unknown>({
        loader: () => Promise.resolve(sortedBooks),
      });
    }
  }
}
