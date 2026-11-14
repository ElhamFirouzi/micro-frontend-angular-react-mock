import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'orders-wrapper',
  template: '<orders-app></orders-app>',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class OrdersWrapper {}

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule('products', './Routes').then((m) => m.routes),
  },
  {
    path: 'equipment',
    loadChildren: () =>
      loadRemoteModule('equipment', './Routes').then((m) => m.routes),
  },
  {
    path: 'orders',
    loadComponent: () =>
      loadRemoteModule('orders', './Bootstrap').then(() => OrdersWrapper),
  },
];


