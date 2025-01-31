import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookTableComponent } from './components/book-table.component';
import { BookStatisticsComponent } from './components/book-statistics.component';
import { PrefsPageComponent } from './components/prefs-page.component';
import { BooksStore } from './services/books.store';
import { BooksDataService } from './services/books.data';
import { BookCardComponent } from './components/book-card.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksStore, BooksDataService],
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
        path: 'preferences',
        component: PrefsPageComponent,
      },
      {
        path: 'details/:id',
        component: BookCardComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
