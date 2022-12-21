import State from '../../app/state';
//import { IProduct } from '../../../types/interfaces';
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
  }
}

export default CartPageController;
