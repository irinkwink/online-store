import { IProductsData } from '../../types/interfaces';

class AppController {
  getProducts(callback: (data: IProductsData) => void) {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data: IProductsData) => {
        console.log(data);
        callback(data);
      });
  }

  getCategories(callback: (data: string[]) => void) {
    fetch('https://dummyjson.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        callback(data);
      });
  }
  checkCart(callback: (data: IProductsData) => void) {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data: IProductsData) => {
        console.log(data);
        callback(data);
      });
  }
}

export default AppController;
