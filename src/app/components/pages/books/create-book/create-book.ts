import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-book.html',
  styleUrl: './create-book.css',
})
export class CreateBook {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  categories: any[] = [];
  authors: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadAuthors();
  }

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

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const requestData = {
      title: this.form.value.title,
      categoryId: this.form.value.categoryId,
      authorId: this.form.value.authorId
    };

    this.httpClient.post(environment.BooksApi, requestData)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `${this.form.value.title} cadastrado.`;
          this.form.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error;
          this.cdr.detectChanges();
        }
      });

  }

}