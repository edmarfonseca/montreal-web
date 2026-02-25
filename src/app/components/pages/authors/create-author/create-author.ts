import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-author',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-author.html',
  styleUrl: './create-author.css',
})
export class CreateAuthor {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  form = new FormGroup({

    name: new FormControl('', [
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

    this.httpClient.post(environment.AuthorsApi, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `${this.form.value.name} cadastrado.`;
          this.form.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error;
          this.cdr.detectChanges();
        }
      });

  }

}