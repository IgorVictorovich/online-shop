import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ImageFile } from '../service/file.service';

@Injectable()
export class Product {
  public Id: string;
  public Title: string;
  public Description: string;
  public Price: number;
  public Files: Array<ImageFile>;

  public setProduct(title: string, description: string, price: number, files?: Array<ImageFile>, id?: string): Product {
    this.Id = id || UUID.UUID();
    this.Title = title;
    this.Description = description;
    this.Price = price;
    if (files) {
      this.Files = files;
    }

    return this;
  }
}
