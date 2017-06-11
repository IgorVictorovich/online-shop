import { Component } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from './model/product';
import { FileService } from './service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ProductService,
    Product,
    FileService
  ]
})
export class AppComponent {
  constructor(private productService: ProductService) {
    this.productService.setDemoDataToStorage();
  }
}
