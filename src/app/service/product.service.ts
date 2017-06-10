import { Injectable } from '@angular/core';
import { Product } from '../model/product';

/**
 * storage key.
 * @readonly
 * @private
 */
const STORAGE_KEY = 'online-shop-storage-key';

@Injectable()
/**
 * Representing a product service for retrieving and saving data.
 * @class
 * */
export class ProductService {
  /**
   * Merge old and new product values, skip value in edited product, if undefined.
   * @private
   * @param {Product} oldValue - product current values
   * @param {Product} newValue - product edited values
   * @return {Product} merged value.
   */
  private static mergeProduct(oldValue: Product, newValue: Product): Product {
    const keys = Object.keys(oldValue);

    for (let i = 0; i < keys.length; i++) {
      if (typeof newValue[keys[i]] === 'undefined') {
        continue;
      }
      oldValue[keys[i]] = newValue[keys[i]];
    }

    return oldValue;
  }

  /**
   * Retrieving data from local storage.
   * @private
   * @return {Array<Product>} array of products.
   */
  private static getFromStorage(): Array<Product> {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * Saving data to local storage.
   * @private
   * @param {Product} item - product to save
   */
  private setDataToStore(item: Product): void {
    let dataArray = [];
    const data = ProductService.getFromStorage();

    if (!data) {
      dataArray.push(item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
    } else {
      dataArray = data.concat(item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
    }
  }

  /**
   * Searching product in local storage, by id.
   * @private
   * @param {string} id - item id
   * @param {Array<Product>} data - data to search (by default - fetching from storage)
   * @return {Product} searched product, if exists
   */
  private findProductById(id: string, data?: Array<Product>): Product {
    if (!data) {
      data = ProductService.getFromStorage();
    }
    return data.find((item) => {return item.Id === id; });
  }

  public getData(): Array<Product> {
    return ProductService.getFromStorage();
  }

  public getDataById(id: string): Product {
    const dataToSearch = ProductService.getFromStorage();
    return this.findProductById(id, dataToSearch);
  }

  /**
   * Save data to storage.
   * @public
   * @param {Product} product - product item
   * @param {boolean} needUpdate - used for updating product instead of create
   */
  public setData(product: Product, needUpdate?: boolean): void {
    if (needUpdate) {
      const oldProduct: Product = this.findProductById(product.Id);
      product = ProductService.mergeProduct(oldProduct, product);
      this.removeProductById(product.Id);
    }
    this.setDataToStore(product);
  }

  /**
   * Remove product from storage.
   * @public
   * @param {string} id - product identifier
   * @return {Array<Product>} updated product list
   */
  public removeProductById(id: string): Array<Product> {
    const data = ProductService.getFromStorage();
    if (!data) {
      return [];
    }
    const idx = data.indexOf(this.findProductById(id, data));
    data.splice( idx, 1 );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
}
