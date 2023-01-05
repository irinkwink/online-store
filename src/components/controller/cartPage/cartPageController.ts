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

    // const cartTotalNumbers: HTMLElement | null = document.querySelector('.total-num');
    // if (cartTotalNumbers) {
    //   cartTotalNumbers.innerHTML = String(totalNum);
    // }

    //this.controlCartButtons();
    this.control();
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

    const cartTotalNumbers: HTMLElement | null = document.querySelector('.total-num');
    if (cartTotalNumbers) {
      cartTotalNumbers.innerHTML = String(totalNum);
      cartTotalNumbers.innerHTML = String(totalNum);
    }
  }
}

export default CartPageController;
