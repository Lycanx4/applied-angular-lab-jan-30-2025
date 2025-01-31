import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  setEntities,
  updateEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, pipe, switchMap, tap } from 'rxjs';
import { BooksDataService } from './books.data';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};
export type criteria = 'id' | 'title' | 'author' | 'year';
export const BooksStore = signalStore(
  withEntities<BookEntity>(),
  withDevtools('book-store'),
  withComputed((store) => {
    return {
      userPref: computed(() => localStorage.getItem('prefs') as criteria),
      books: computed(() => store.entities()),
      booksCount: computed(() => store.entities().length),
      earliestYear: computed(() =>
        store
          .entities()
          .reduce((min, book) => (book.year < min ? book.year : min), Infinity),
      ),
      latestYear: computed(() =>
        store
          .entities()
          .reduce(
            (max, book) => (book.year > max ? book.year : max),
            -Infinity,
          ),
      ),
      averagePages: computed(() =>
        Math.round(
          store.entities().reduce((sum, book) => sum + book.pages, 0) /
            store.entities().length,
        ),
      ),
    };
  }),
  withMethods((store) => {
    const service = inject(BooksDataService);
    return {
      getBookById(id: string): BookEntity | undefined {
        return store.entities().find((book) => book.id === id);
      },
      sortBooks(criteria: criteria): BookEntity[] {
        const sortedBooks = [...store.entities()].sort((a, b) => {
          if (criteria === 'id' || criteria === 'year') {
            return Number(a[criteria]) - Number(b[criteria]);
          } else {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return 0;
          }
        });
        patchState(store, setEntities(sortedBooks)); // not working :(
        return sortedBooks;
      },
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.getBooks().pipe(
              tap((r) => {
                patchState(store, setEntities(r));
              }),
            ),
          ),
        ),
      ),
    };
  }),

  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
