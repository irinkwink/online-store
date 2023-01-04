import { IProduct, IProductInLS, IProductLS } from '../../../types/interfaces';
import State from '../../app/state';
import { myPromoCode } from '../localStorage/PromoCodes';

export class CartPageView {
  products?: IProduct[];
  productsInLS? = [null];
  private controlElem: HTMLDivElement | null;
  public tableRow: HTMLDivElement | null;

  constructor() {
    this.products = [];
    this.controlElem = null;
    this.tableRow = null;
  }

  public get cartControlElem(): HTMLDivElement | null {
    return this.controlElem;
  }

  public render(productsInCart: IProductLS[]) {
    const cartTable: HTMLElement | null = document.querySelector('.cart-table');
    const cartTabeleWr: HTMLElement | null = document.querySelector('.cart__wr');
    if (cartTable) {
      productsInCart.forEach((product) => {
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

        const cartControlElem = document.createElement('div');
        cartControlElem.className = 'cart-table-row__controls';
        const plusBtn = document.createElement('button');
        this.controlElem = cartControlElem;

        plusBtn.className = 'btn cart-table-row__btn';
        plusBtn.id = 'btn-plus';
        plusBtn.textContent = '+';
        const minusBtn = document.createElement('button');
        minusBtn.className = 'btn cart-table-row__btn';
        minusBtn.id = 'btn-minus';
        minusBtn.textContent = '-';
        const productsNum = document.createElement('span');
        productsNum.className = 'cart-table-row__num';
        const numProducts = product.num;
        productsNum.textContent = String(product.num);
        cartControlElem.append(minusBtn, productsNum, plusBtn);

        const productDelBtn = document.createElement('button');
        productDelBtn.className = 'btn cart-table-row__delete';
        tableRow.append(productImage, productInfo, cartControlElem, productPrice, productDelBtn);
        cartTable.append(tableRow);
        console.log(cartControlElem);
        console.log(this.controlElem);
        // tableRow.addEventListener('click', function (e) {
        //   const target = e.target as HTMLElement;
        //   if (target.classList.contains('btn-plus')) {
        //     if (numProducts) {
        //       numProducts++;
        //       storageUtility.increaseNum(productID);
        //       productsNum.textContent = String(numProducts);
        //     }
        //   } else if (target.classList.contains('btn-minus') && numProducts !== 1) {
        //     if (numProducts) {
        //       numProducts--;
        //       storageUtility.decreaseNum(productID);
        //       productsNum.textContent = String(numProducts);
        //     }
        //   }
        // });
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
      this.drawPromo();
    }
  }
  drawPromo() {
    const total: HTMLElement | null = document.querySelector('.total');
    const promoBlock = document.createElement('div');
    promoBlock.className = 'promo-block';
    const promoInput = document.createElement('input');
    promoInput.type = 'text';
    promoInput.className = 'promo-block__input';
    promoInput.placeholder = 'Enter promo code';
    const codeInfo = document.createElement('p');
    codeInfo.textContent = "Promo for test: 'RSS', 'EPAM'";
    promoBlock.append(promoInput, codeInfo);
    if (total) {
      total.insertAdjacentElement('beforeend', promoBlock);
    }
    promoInput.addEventListener('input', function (e) {
      const inputVal = promoInput.value;
      myPromoCode.checkEnteredCode(inputVal, promoBlock);
    });

    myPromoCode.drawPromoApplied();
  }
}

export default CartPageView;
