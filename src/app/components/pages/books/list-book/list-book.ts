import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-book',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-book.html',
  styleUrl: './list-book.css',
})
export class ListBook {

  books: any[] = [];

  constructor(
    private httpCLient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {

    this.httpCLient.get(environment.BooksApi)
      .subscribe({
        next: (data) => {
          this.books = data as any[];
          this.cdr.detectChanges();
        }
      });

  }

  onDelete(id: string) {

    if (confirm('Confirma a exclusão?')) {

      this.httpCLient.delete(environment.BooksApi + '/' + id)
        .subscribe({
          next: (data) => {
            this.loadBooks();
          }
        })
    }

  }

}