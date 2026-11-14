import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Products, pathMatch: 'full' },
  { path: 'about', component: About },
];

