import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProductComponent } from '../form/new-product.component';

const routes: Routes = [
  { path: '', component: NewProductComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
