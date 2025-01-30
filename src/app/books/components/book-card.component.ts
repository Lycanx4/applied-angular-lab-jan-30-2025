import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BookEntity } from '../books.component';

@Component({
  selector: 'app-book-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card bg-base-100 w-96 shadow-xl m-3">
      <figure>
        <img
          src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg"
          [alt]="book().title"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ book().title }}
        </h2>
        <p>Author: {{ book().author }}</p>
        <p>Country: {{ book().country }}</p>
        <p>Language: {{ book().language }}</p>
        <p>
          <a [href]="book().link">Link to {{ book().title }}</a>
        </p>
        <div class="card-actions justify-end">
          <div title="year" class="badge badge-outline">
            Year: {{ book().year }}
          </div>
          <div title="pages" class="badge badge-outline">
            {{ book().pages }} pages
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookCardComponent {
  book = input.required<BookEntity>();
}
