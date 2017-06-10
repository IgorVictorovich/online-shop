import { NgModule } from '@angular/core';

import { ProductComponent } from '../form/product.component';
import { routing } from './product.lazy.routing';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [routing, CommonModule],
  declarations: [ProductComponent]
})
export class ProductModule {}
