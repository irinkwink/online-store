import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';

export class Cart {
  products?: IProduct[];
  productsInLS? = [null];

  constructor() {
    this.products = [];
  }

  identityProducts(arr: number[], state: State): IProduct[] {
    const pickedProducts = [];
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const products = state.getState().products;
        console.log(products);
        const fined = products.filter((item) => item.id == arr[i]);
        if (fined.length > 0) {
          pickedProducts.push(...fined);
        }
      }
    } else {
      return [];
    }
    return pickedProducts;
  }

  render(productsInCart: IProduct[]) {
    console.log('вывод');
    const cartTable: HTMLElement | null = document.querySelector('.cart-table');
    if (cartTable) {
      console.log('вывод');
      productsInCart.forEach(function (product) {
        console.log(product);
        const tableRow = document.createElement('tr');
        const infoTd = document.createElement('td');
        const productTitle = document.createElement('h3');
        productTitle.innerHTML = `${product.title}`;
        tableRow.className = 'cart-table__row';
        const plusBtn = document.createElement('button');
        plusBtn.className = 'btn btn__plus';
        infoTd.append(productTitle);
        tableRow.append(plusBtn, infoTd);
        cartTable.append(tableRow);
      });
    } else {
      console.log('yt dsikj');
    }
  }
}

export default Cart;
