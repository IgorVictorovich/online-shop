import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ImageFile } from '../service/file.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  private id: string;
  public model: Product;
  public images: Array<ImageFile>;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {}

  ngOnInit() {
    this.route.params.subscribe((resp) => {
      this.id = resp.id;
      this.loadProductInfo(this.id);
    }
    ).unsubscribe();
  }

  private loadProductInfo(id: string) {
    this.model = this.productService.getDataById(id);
    this.images = this.model.Files;
  }

}
