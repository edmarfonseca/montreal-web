import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-author',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-author.html',
  styleUrl: './list-author.css',
})
export class ListAuthor {

  authors: any[] = [];

  constructor(
    private httpCLient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {

    this.httpCLient.get(environment.AuthorsApi)
      .subscribe({
        next: (data) => {
          this.authors = data as any[];
          this.cdr.detectChanges();
        }
      });

  }

  onDelete(id: string) {

    if (confirm('Confirma a exclusão?')) {

      this.httpCLient.delete(environment.AuthorsApi + '/' + id)
        .subscribe({
          next: (data) => {
            this.loadAuthors();
          }
        })
    }

  }

}