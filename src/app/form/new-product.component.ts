import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { FileService } from '../service/file.service';
import { ActivatedRoute } from '@angular/router';

enum RecordMode {
  New,
  Edit,
}

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {

  private id: string;

  public fileSizeLimit = 1000000;
  public errorMsgOversize = `Image too large!\nAllowed size is ${
    NewProductComponent.getMbFromBytes(this.fileSizeLimit)
  } MB per file`;

  public title;
  public description;
  public price;

  public recordMode: RecordMode;
  public isSuccess: boolean;
  public errorMessage: string;

  private static getMbFromBytes(bytes): number {
    return Math.round(bytes / 1024 / 1024);
  }

  constructor(
    private service: ProductService,
    private fileService: FileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((resp) => {
        this.id = resp.id;
        this.handleRecordMode(this.id);
      }
    ).unsubscribe();
  }

  private handleRecordMode(id: string) {
    if (!id) {
      this.recordMode = RecordMode.New;
      return;
    }
    this.recordMode = RecordMode.Edit;
    const product: Product  = this.service.getDataById(id);
    this.title = product.Title;
    this.description = product.Description;
    this.price = product.Price;
  }

  private saveData(product: Product) {
    this.service.setData(product, this.recordMode === RecordMode.Edit);
  }

  public imageUploaded(item) {
    if (!item.pending) {
      this.fileService.addFile(item.file.lastModified, item.file.name, item.src);
    }
  }
  public imageRemoved(item) {
    this.fileService.removeFileById(item.file.name, item.file.lastModified);
  }

  public onSubmit() {
    const model = new Product();
    model.setProduct(this.title, this.description, this.price, this.fileService.getFiles(), this.id);
    try {
      this.saveData(model);
      this.isSuccess = true;
    } catch (ex) {
      this.isSuccess = false;
      this.errorMessage = ex;
      console.error(ex);
    }
  }
}
