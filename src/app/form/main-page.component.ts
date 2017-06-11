import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-main-page-form',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  public products: Array<Product>;

  constructor(private productService: ProductService) {}

  public loadData(): void {
    this.productService.getData((data) => {
      this.products = data;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  public onProductDelete(name: string, id: string) {
    if (confirm('Are you sure to delete ' + name)) {
      this.products = this.productService.removeProductById(id);
    }
  }
}
