import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-update-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-book.html',
  styleUrl: './update-book.css',
})
export class UpdateBook {

  mensagemErro: string = '';
  id: string = '';

  categories: any[] = [];
  authors: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  form = new FormGroup({

    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),

    categoryId: new FormControl('', [
      Validators.required
    ]),

    authorId: new FormControl('', [
      Validators.required
    ])

  });

  ngOnInit() {

    this.loadCategories();

    this.loadAuthors();

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.BooksApi + '/' + this.id)
      .subscribe({
        next: (data: any) => {
          const formData = {
            title: data.title,
            categoryId: data.category.id,
            authorId: data.author.id
          };

          this.form.patchValue(formData);
          this.cdr.detectChanges();
        }
      })

  }

  get f() {
    return this.form.controls;
  }

  loadCategories() {

    this.httpClient.get(environment.CategoriesApi)
      .subscribe({
        next: (data: any) => {
          this.categories = data;
          this.cdr.detectChanges();
        }
      });

  }

  loadAuthors() {

    this.httpClient.get(environment.AuthorsApi)
      .subscribe({
        next: (data: any) => {
          this.authors = data;
          this.cdr.detectChanges();
        }
      });

  }

  onSubmit() {

    this.mensagemErro = '';

    this.httpClient.put(environment.BooksApi + '/' + this.id, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['pages/books/list-book'])
        },
        error: (e) => {
          this.mensagemErro = e.error;
          this.cdr.detectChanges();
        }
      });
  }

}