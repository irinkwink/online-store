import { IProduct, IProductInLS } from '../../../types/interfaces';
import State from '../../app/state';

export class Cart {
  products?: IProduct[];
  productsInLS? = [null];

  constructor() {
    this.products = [];
  }

  identityProducts(arr: IProductInLS[], state: State): IProduct[] {
    const pickedProducts = [];
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const products = state.getState().products;
        console.log(products);
        const fined = products.filter((item) => item.id == arr[i].id);
        if (fined.length > 0) {
          pickedProducts.push(...fined);
        }
      }
    } else {
      return [];
    }
    return pickedProducts;
  }
  getTotalPrice(productsInCart: IProduct[]): number {
    let totalPrice = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      totalPrice += productsInCart[i].price;
    }
    return totalPrice;
  }

  render(productsInCart: IProduct[]) {
    console.log('вывод');
    const cartTable: HTMLElement | null = document.querySelector('.cart-table');
    if (cartTable) {
      productsInCart.forEach(function (product) {
        console.log(product);
        const tableRow = document.createElement('div');
        tableRow.className = 'cart-table__row cart-table-row';

        const productImage = new Image();
        productImage.className = 'cart-table-row__img';
        productImage.src = product.thumbnail;
        productImage.alt = product.title;

        const productInfo = document.createElement('div');
        productInfo.className = 'cart-table-row__info';

        const productTitle = document.createElement('h3');
        productTitle.className = 'cart-table-row__title';
        productTitle.innerHTML = `${product.title}`;
        const productDesc = document.createElement('div');
        productDesc.className = 'cart-table-row__desc';
        productDesc.innerHTML = `${product.description}`;
        productInfo.append(productTitle, productDesc);
        const productPrice = document.createElement('div');
        productPrice.className = 'cart-table-row__price';
        productPrice.innerHTML = `${product.price}$`;

        const productControls = document.createElement('div');
        productControls.className = 'cart-table-row__controls';
        productControls.insertAdjacentHTML(
          'afterbegin',
          `
                <button class="btn cart-table-row__btn">-</button>
                <span class="cart-table-row__num">1</span>
                <button class="btn cart-table-row__btn">+</button>
            `
        );
        const productDelBtn = document.createElement('button');
        productDelBtn.className = 'btn cart-table-row__delete';
        productDelBtn.insertAdjacentHTML(
          'afterbegin',
          `
                <img src="/asset/close.svg" alt="close icon">
            `
        );
        tableRow.append(productImage, productInfo, productControls, productPrice, productDelBtn);
        cartTable.append(tableRow);
      });
      const total = document.createElement('div');
      total.className = 'total';

      const totalHeader = document.createElement('div');
      totalHeader.className = 'total__header';
      const totalPrice = document.createElement('span');
      totalPrice.className = 'total__price';
      totalHeader.append(totalPrice);
      totalHeader.insertAdjacentHTML(
        'afterbegin',
        `

            <div class="total-price">Total price</div>
        `
      );

      const totalRow = document.createElement('div');
      totalRow.className = 'total__row';
      totalRow.insertAdjacentHTML(
        'afterbegin',
        `
            <span>Numbers of products </span>
            <span class="total-num"></span>
        `
      );
      total.append(totalHeader, totalRow);
      cartTable.append(total);
    }
  }
}

export default Cart;
