import State from '../../app/state';
import Cart from '../../view/cart/cartPageView';
import CartPageView from '../../view/cart/cartPageView';
import { IProductInLS, IProductLS } from '../../../types/interfaces';
import { storageUtility } from '../../view/localStorage/LocalStorage';

class CartPageController {
  cart: Cart;
  state: State;
  view: CartPageView;
  count: number;
  stock: number;

  constructor(state: State) {
    this.cart = new Cart();
    this.state = state;
    this.view = new CartPageView();
    this.count = 1;
    this.stock = 1;
  }

  start() {
    console.log('Cart Page');
    console.log(this.state.getState());

    const productsInLS = storageUtility.getProducts();
    console.log(productsInLS);
    const productsToRender = this.identityProducts(productsInLS, this.state);
    this.cart.render(productsToRender);
    storageUtility.updateHeaderCart(productsInLS.length - 1);
    const totalPrice = this.getTotalPrice(productsToRender);
    // const totalPrice = this.getTotalPrice(productsToRender);
    // const totalNum = this.getTotalNum(productsToRender);

    // const cartTotalPrice: HTMLElement | null = document.querySelector('.total-price');
    // if (cartTotalPrice) {
    //   cartTotalPrice.innerHTML = String(`Total price ${totalPrice} $`);
    // }

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

  getTotalNum(productsInCart: IProductLS[]): number {
    let totalNum = 0;
    productsInCart.forEach((product) => (totalNum += product.num));
    return totalNum;
  }

  removeFromCart() {
    this.count = 0;
  }
  control() {
    console.log('click');
    this.view.tableRow?.addEventListener('click', function (e) {
      console.log('click');
      console.log(e.target);
    });
  }
  controlCartButtons() {
    console.log(this.view.cartControlElem);
    if (this.view.cartControlElem) {
      console.log(true);
    } else {
      console.log(this.view.cartControlElem);
    }
    this.view.cartControlElem?.addEventListener('click', (e) => {
      console.log('click');
      const target = e.target as HTMLElement;
      switch (target.id) {
        case 'btn-plus': {
          this.changeCount('dec');
          break;
        }
        case 'btn-minus': {
          this.changeCount('inc');
          break;
        }
        // case 'btn-delete': {
        //   this.updateCart();
        //   break;
        // }
      }
    });
  }
  changeCount(operation: string) {
    switch (operation) {
      case 'dec': {
        if (this.count > 1) {
          this.count = this.count - 1;
          //this.view.updateCountNumber(this.count);
          console.log(this.count);
        }
        break;
      }
      case 'inc': {
        if (this.count < this.stock) {
          this.count = this.count + 1;
          console.log(this.count);
          //this.view.updateCountNumber(this.count, this.count === this.stock);
        }
        break;
      }
    }
  }
}

export default CartPageController;
