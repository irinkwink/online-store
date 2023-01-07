import State from '../../app/state';
import CartPageView from '../../view/cartPage/cartPageView';
import PageController from '../pageController';
import { IProductInLS, IProductLS } from '../../../types/interfaces';
class CartPageController extends PageController {
  view: CartPageView;

  constructor(state: State) {
    super(state);
    this.view = new CartPageView();
  }

  start() {
    console.log('Cart Page');
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.view.identityProducts(cart, products);
    const settings = this.state.getState().onlineStoreSettings.promoСodes;
    this.view.render(productsToRender);
    this.view.drawTotal();
    this.view.drawPromo(settings);
    const discount = this.getDiscount(settings);
    console.log(discount);
    const totalPrice = this.view.getTotalPrice(productsToRender);
    const totalNum = this.view.getTotalNum(productsToRender);
    this.view.updateTotalNumber(totalNum);
    this.view.updateTotalPrice(totalPrice);
    if (discount > 0) {
      this.view.updateDiscountPrice(discount, totalPrice);
    }
    this.view.cartTable?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cart-table-row__controls')) {
        const el = target.closest('.cart-table-row__controls') as HTMLElement;
        const id = Number(el.dataset.id);
        const action = target.id;
        this.controlCartButtons(action, id);
      }
    });
    this.getInputValue();
    this.view.updateDiscountPrice(discount, totalPrice);
    this.deletePromocode();
  }

  public getInputValue() {
    const promoInput: HTMLInputElement | null = document.querySelector('.promo-block__input');
    const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
    promoInput?.addEventListener('input', () => {
      const val: string = promoInput.value;
      console.log(val);
      const isValid = this.state.checkPromoCodes(val);
      this.view.drawPromoApplied(isValid, val);
      if (isValid) {
        promoBlock?.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (target.id === 'add-code') {
            const promoInput: HTMLInputElement | null = document.querySelector('.promo-block__input');
            if (promoInput) {
              const val: string = promoInput.value;
              this.state.addCodeToSettings(val);
              this.updateTotalBlock();
              this.getInputValue();
            }
          }
        });
      }
    });
  }
  deletePromocode() {
    const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
    const codes = ['RSS', 'EPAM'];
    promoBlock?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'delete-code') {
        const code = target.getAttribute('code');
        const res = codes.filter((codeItem) => codeItem === code);
        this.state.dropCodeFromSetting(res[0]);
        this.updateTotalBlock();
        this.getInputValue();
      }
    });
  }

  updateTotalBlock() {
    const settings = this.state.getState().onlineStoreSettings;
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.view.identityProducts(cart, products);
    const discount = settings.promoСodes.length * 0.1;
    const totalPrice = this.view.getTotalPrice(productsToRender);
    this.view.drawPromo(settings.promoСodes);
    this.view.updateDiscountPrice(discount, totalPrice);
  }

  getProductsToRender(): IProductLS[] {
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.view.identityProducts(cart, products);
    return productsToRender;
  }
  identityProducts(arr: IProductInLS[], state: State): IProductLS[] {
    const pickedProducts = [];
    if (arr.length > 0) {
      for (let i = 1; i < arr.length; i++) {
        const products = state.getState().products;
        const fined = products.filter((item) => item.id == arr[i].id);
        const num = arr[i].num;
        const btnState = arr[i].btnState;
        const res: IProductLS[] = JSON.parse(JSON.stringify(fined));
        res.forEach(function (item) {
          item.num = num;
          item.btnState = btnState;
        });
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

  getDiscount(settings: string[]): number {
    return settings.length * 0.1;
  }

  updateProductsCartNum(id: number) {
    const productsNum = document.querySelectorAll('.cart-table-row__num');
    const index: number = this.state.getState().onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    const num = this.state.getState().onlineStoreSettings.cart.filter((cartItem) => cartItem.id == id);
    productsNum[index].textContent = String(num[0].num);
  }
  controlCartButtons(action: string, id: number) {
    let num = this.state.getTotalNumInCart();
    let cart = this.getProductsToRender();
    let summ = this.getTotalPrice(cart);
    switch (action) {
      case 'btn-delete': {
        this.state.removeProductFromCart(id);
        num = this.state.getTotalNumInCart();
        this.view.updateTotalNumber(num);
        cart = this.getProductsToRender();
        summ = this.getTotalPrice(cart);
        this.view.updateTotalPrice(summ);
        this.view.render(cart);
        break;
      }
      case 'btn-plus': {
        this.state.addProductToCart(id);
        this.view.updateTotalNumber(num);
        cart = this.getProductsToRender();
        summ = this.getTotalPrice(cart);
        num = this.state.getTotalNumInCart();
        this.view.updateTotalPrice(summ);
        this.updateProductsCartNum(id);
        break;
      }
      case 'btn-minus': {
        cart = this.getProductsToRender();
        summ = this.getTotalPrice(cart);
        num = this.state.getTotalNumInCart();
        this.state.deleteItemFromCart(id);
        this.view.updateTotalPrice(summ);
        this.view.updateTotalNumber(num);
        this.updateProductsCartNum(id);
        break;
      }
    }
  }
}

export default CartPageController;
