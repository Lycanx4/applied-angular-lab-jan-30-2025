import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BooksStore, criteria } from '../services/books.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="link" (click)="sortBooks('id')">Id</th>
              <th class="link" (click)="sortBooks('title')">Title</th>
              <th class="link" (click)="sortBooks('author')">Author</th>
              <th class="link" (click)="sortBooks('year')">Publish Year</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody *ngIf="books().length === 0 || !books()">
            <h2 class="text-red">Unexcepted Error Occur</h2>
            <div class="link" (click)="sortBooks(store.userPref())">
              Please click the link to continue...
            </div>
            <!-- fake link still need to solve patchState in Book Store -->
          </tbody>
          <tbody>
            <tr class="bg-base-200" *ngFor="let book of books()">
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>
                <a [href]="['books/details/' + book.id]">Detail</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookTableComponent implements OnInit {
  store = inject(BooksStore);
  books = signal(this.store.books());
  sortBooks(criteria: criteria) {
    this.books.set(this.store.sortBooks(criteria));
  }
  ngOnInit() {
    if (this.store.userPref()) {
      this.sortBooks(this.store.userPref());
    }
  }
  //I know this is not a good way to implement,
  // but the patchState in BookStore is not working for some reason :(
}
