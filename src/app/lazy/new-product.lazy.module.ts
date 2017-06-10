import { NgModule } from '@angular/core';

import { NewProductComponent } from '../form/new-product.component';
import { routing } from './new-product.lazy.routing';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  imports: [
    routing,
    FormsModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [NewProductComponent]
})
export class NewProductModule {}
