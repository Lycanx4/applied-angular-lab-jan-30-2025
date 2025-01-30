import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookTableComponent } from './components/book-table.component';
import { BookStatisticsComponent } from './components/book-statistics.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'table',
        component: BookTableComponent,
      },
      {
        path: 'statistics ',
        component: BookStatisticsComponent,
      },

      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
