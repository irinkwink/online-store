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
}

export default AppController;
