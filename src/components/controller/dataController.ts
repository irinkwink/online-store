import { IProductsData } from '../../types/interfaces';

class DataController {
  public async getProducts() {
    return fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data: IProductsData) => {
        console.log(data);
        return data;
      });
  }
}

export default DataController;
