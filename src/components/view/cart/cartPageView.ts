import { IProduct, IProductInLS, IProductLS } from '../../../types/interfaces';
import State from '../../app/state';
import { storageUtility } from '../localStorage/LocalStorage';

export class Cart {
  products?: IProduct[];
  productsInLS? = [null];

  constructor() {
    this.products = [];
  }

  identityProducts(arr: IProductInLS[], state: State): IProductLS[] {
    const pickedProducts = [];
    if (arr.length > 0) {
      for (let i = 1; i < arr.length; i++) {
        const products = state.getState().products;
        console.log(products);
        console.log(arr[i]);
        const fined = products.filter((item) => item.id == arr[i].id);
        const num = arr[i].num;
        const res: IProductLS[] = JSON.parse(JSON.stringify(fined));
        res.forEach((item) => (item.num = num));
        if (res.length > 0) {
          pickedProducts.push(...res);
        }
      }
    } else {
      return [];
    }
    return pickedProducts;
  }
  getTotalPrice(productsInCart: IProductLS[]): number {
    let totalPrice = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      const num = productsInCart[i].num;
      totalPrice += productsInCart[i].price * num;
    }
    return totalPrice;
  }

  getTotalNum(productsInCart: IProductLS[]): number {
    let totalNum = 0;
    productsInCart.forEach((product) => (totalNum += product.num));
    return totalNum;
  }

  render(productsInCart: IProductLS[]) {
    console.log('вывод');
    const cartTable: HTMLElement | null = document.querySelector('.cart-table');
    const cartTabeleWr: HTMLElement | null = document.querySelector('.cart__wr');
    if (cartTable) {
      productsInCart.forEach(function (product) {
        console.log(product);
        const productID = product.id;
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
        const plusBtn = document.createElement('button');
        plusBtn.className = 'btn cart-table-row__btn btn-plus';
        plusBtn.textContent = '+';
        const minusBtn = document.createElement('button');
        minusBtn.className = 'btn cart-table-row__btn btn-minus';
        minusBtn.textContent = '-';
        const productsNum = document.createElement('span');
        productsNum.className = 'cart-table-row__num';
        let numProducts = product.num;
        productsNum.textContent = String(product.num);
        productControls.append(minusBtn, productsNum, plusBtn);
        const productDelBtn = document.createElement('button');
        productDelBtn.className = 'btn cart-table-row__delete';
        const delBtnImg = new Image();
        delBtnImg.src = 'img/logo.svg';
        delBtnImg.alt = 'close icon';
        productDelBtn.append(delBtnImg);
        tableRow.append(productImage, productInfo, productControls, productPrice, productDelBtn);
        cartTable.append(tableRow);
        tableRow.addEventListener('click', function (e) {
          const target = e.target as HTMLElement;
          const curTarget = e.currentTarget as HTMLElement;
          if (target.classList.contains('btn-plus')) {
            if (numProducts) {
              numProducts++;
              storageUtility.increaseNum(productID);
              productsNum.textContent = String(numProducts);
            }
          } else if (target.classList.contains('btn-minus') && numProducts !== 1) {
            if (numProducts) {
              numProducts--;
              storageUtility.decreaseNum(productID);
              productsNum.textContent = String(numProducts);
            }
          }
        });
      });

      // summary
      const total = document.createElement('div');
      total.className = 'total';

      const totalHead = document.createElement('div');
      totalHead.className = 'summary__head';
      totalHead.textContent = 'Summary';
      const totalSummary = document.createElement('div');
      totalSummary.className = 'total__header';
      const totalPrice = document.createElement('span');
      totalPrice.className = 'total__price';
      totalSummary.append(totalPrice);
      totalSummary.insertAdjacentHTML(
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
            <span>Products:</span>
            <span class="total-num"></span>
        `
      );
      total.append(totalHead, totalRow, totalSummary);
      if (cartTabeleWr) {
        cartTabeleWr.append(total);
      }
    }
  }
}

export default Cart;
