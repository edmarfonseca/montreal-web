import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-update-category',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-category.html',
  styleUrl: './update-category.css',
})
export class UpdateCategory {

  mensagemErro: string = '';
  id: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  form = new FormGroup({

    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ])

  });

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.CategoriesApi + '/' + this.id)
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

    this.httpClient.put(environment.CategoriesApi + '/' + this.id, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['pages/categories/list-category'])
        },
        error: (e) => {
          this.mensagemErro = e.error;
          this.form.reset();
        }
      });
  }

}