import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-list-category',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-category.html',
  styleUrl: './list-category.css',
})
export class ListCategory {

  categories: any[] = [];

  constructor(
    private httpCLient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {

    this.httpCLient.get(environment.CategoriesApi)
      .subscribe({
        next: (data) => {
          this.categories = data as any[];
          this.cdr.detectChanges();
        }
      });

  }

  onDelete(id: string) {

    if (confirm('Confirma a exclusão?')) {

      this.httpCLient.delete(environment.CategoriesApi + '/' + id)
        .subscribe({
          next: (data) => {
            this.loadCategories();
          }
        })
    }

  }

}