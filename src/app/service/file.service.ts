import {Injectable} from '@angular/core';

@Injectable()
export class ImageFile {
    constructor(
      public Id: number,
      public FileName: string,
      public Src: string
    ) {}
}

@Injectable()
export class FileService {
  private Images: Array<ImageFile>;

  public getFiles(): Array<ImageFile> {
    return this.Images;
  }

  public addFile(id: number, fileName: string, data: string): void {
    this.Images = this.Images || [];
    this.Images = this.Images.concat(new ImageFile(id, fileName, data));
  }

  public removeFileById(fileName: string, lastModified: number): Array<ImageFile> {
    const matchedItem = this.Images.find((item) => {
      return (item.FileName === fileName && item.Id === lastModified);
    });
    const idx = this.Images.indexOf(matchedItem);
    this.Images.splice( idx, 1 );

    return this.Images;
  }
}
