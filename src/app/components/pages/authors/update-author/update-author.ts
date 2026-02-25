import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-author',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-author.html',
  styleUrl: './update-author.css',
})
export class UpdateAuthor {

  mensagemErro: string = '';
  id: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  form = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ])

  });

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.AuthorsApi + '/' + this.id)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data);
        }
      })

  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {

    this.mensagemErro = '';

    this.httpClient.put(environment.AuthorsApi + '/' + this.id, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['pages/authors/list-author'])
        },
        error: (e) => {
          this.mensagemErro = e.error;
          this.form.reset();
        }
      });
  }

}