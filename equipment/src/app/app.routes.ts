import { Routes } from '@angular/router';
import { EquipmentList } from './pages/equipment-list/equipment-list';

export const routes: Routes = [
  { path: '', component: EquipmentList, pathMatch: 'full' },
];

