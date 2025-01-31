import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookEntity, criteria } from './books.store';
import { map } from 'rxjs';
export type ApiBookEntity = {
  data: BookEntity[];
};
export class BooksDataService {
  #client = inject(HttpClient);

  getBooks() {
    return this.#client
      .get<ApiBookEntity>('/api/books')
      .pipe(map((response) => response.data));
  }

  // getSortedBook(criteria: criteria) {
  //   return this.getBooks().pipe(
  //     map((books) => {
  //       return books.sort((a, b) => {
  //         if (criteria === 'id' || criteria === 'year') {
  //           return Number(a[criteria]) - Number(b[criteria]);
  //         } else {
  //           if (a[criteria] < b[criteria]) return -1;
  //           if (a[criteria] > b[criteria]) return 1;
  //           return 0;
  //         }
  //       });
  //     }),
  //   );
  // }
}
