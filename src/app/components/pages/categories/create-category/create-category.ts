import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-category',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  form = new FormGroup({

    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ])

  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.post(environment.CategoriesApi, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `${this.form.value.description} cadastrado.`;
          this.form.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error;
          this.cdr.detectChanges();
        }
      });

  }

}