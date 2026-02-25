import { Routes } from '@angular/router';
import { CreateCategory } from './components/pages/categories/create-category/create-category';
import { ListCategory } from './components/pages/categories/list-category/list-category';
import { UpdateCategory } from './components/pages/categories/update-category/update-category';
import { CreateAuthor } from './components/pages/authors/create-author/create-author';
import { ListAuthor } from './components/pages/authors/list-author/list-author';
import { UpdateAuthor } from './components/pages/authors/update-author/update-author';
import { ListBook } from './components/pages/books/list-book/list-book';
import { CreateBook } from './components/pages/books/create-book/create-book';
import { UpdateBook } from './components/pages/books/update-book/update-book';

export const routes: Routes = [
    {
        path: 'pages/categories/create-category',
        component: CreateCategory
    },
    {
        path: 'pages/categories/list-category',
        component: ListCategory
    },
    {
        path: 'pages/categories/update-category/:id',
        component: UpdateCategory
    },
    {
        path: 'pages/authors/create-author',
        component: CreateAuthor
    },
    {
        path: 'pages/authors/list-author',
        component: ListAuthor
    },
    {
        path: 'pages/authors/update-author/:id',
        component: UpdateAuthor
    },
    {
        path: 'pages/books/create-book',
        component: CreateBook
    },
    {
        path: 'pages/books/list-book',
        component: ListBook
    },
    {
        path: 'pages/books/update-book/:id',
        component: UpdateBook
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages/books/list-book'
    }
];