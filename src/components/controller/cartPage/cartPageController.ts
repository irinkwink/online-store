import State from '../../app/state';
import Cart from '../../view/cart/cartPageView';
import { storageUtility } from '../../view/localStorage/LocalStorage';

class CartPageController {
  cart: Cart;

  constructor() {
    this.cart = new Cart();
  }

  start(state: State) {
    console.log('Cart Page');
    const productsInLS = storageUtility.getProducts();
    console.log(productsInLS);
    const productsToRender = this.cart.identityProducts(productsInLS, state);
    this.cart.render(productsToRender);
    storageUtility.updateHeaderCart();
    const totalPrice = this.cart.getTotalPrice(productsToRender);
    const totalNum = this.cart.getTotalNum(productsToRender);

    const cartTotalPrice: HTMLElement | null = document.querySelector('.total-price');
    if (cartTotalPrice) {
      cartTotalPrice.innerHTML = String(`Total price ${totalPrice} $`);
    }

    const cartTotalNumbers: HTMLElement | null = document.querySelector('.total-num');
    if (cartTotalNumbers) {
      cartTotalNumbers.innerHTML = String(totalNum);
    }
  }
}

export default CartPageController;
