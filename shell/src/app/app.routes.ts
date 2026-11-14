import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

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
];


