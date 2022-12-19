import { IProductsData } from '../../types/interfaces';
import Products from './products/products';

export class AppView {
  products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: IProductsData) {
    console.log('data: ', data);
    const values = data?.products ? data?.products : [];
    this.products.draw(values);
  }
}

export default AppView;
