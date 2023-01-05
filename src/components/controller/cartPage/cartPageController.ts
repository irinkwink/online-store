import State from '../../app/state';
import CartPageView from '../../view/cartPage/cartPageView';
import { storageUtility } from '../../view/localStorage/LocalStorage';
import PageController from '../pageController';

class CartPageController extends PageController {
  view: CartPageView;

  constructor(state: State) {
    super(state);
    //todo тут заменила на вью, забирай оттуда всю логику и реализую её в методах тут, это и есть основной класс cart
    this.view = new CartPageView();
  }

  start() {
    console.log('Cart Page');

    const products = this.state.getState().products;

    //!! теперь корзина берется из стейта.
    //todo Лучше переименовать productsInLS на cart (там же не конкретные продукты, а список из id и количества)

    const productsInLS = this.state.getState().onlineStoreSettings.cart;
    // const productsInLS = storageUtility.getProducts();

    console.log(productsInLS);

    //!! отпляю в метод вторым параметром не state. а сразу продукты.

    const productsToRender = this.view.identityProducts(productsInLS, products);
    this.view.render(productsToRender);
    storageUtility.updateHeaderCart();

    const totalPrice = this.view.getTotalPrice(productsToRender);
    const totalNum = this.view.getTotalNum(productsToRender);

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
