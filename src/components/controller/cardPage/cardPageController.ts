import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';
import { getSearchParamsFromUrl } from '../../routes/urlController';
import CardPageView from '../../view/cardPage/cardPageView';

class CardPageController {
  state: State;
  view: CardPageView;
  id: number;
  count: number;
  stock: number;
  isInCart: boolean;

  constructor(state: State) {
    this.state = state;
    this.view = new CardPageView();
    this.id = 0;
    this.count = 0;
    this.stock = 1;
    this.isInCart = false;
  }

  start() {
    console.log('card page');

    const searchParams = getSearchParamsFromUrl();

    const idParam = searchParams.filter((item) => item.key === 'id');
    if (idParam.length !== 0) {
      this.id = +idParam[0].value;
      const product: IProduct = this.state.getState().products.filter((item) => item.id === this.id)[0];
      this.isInCart = this.state.getState().cart.filter((item) => item.id === this.id).length !== 0;
      console.log('product: ', product);

      this.stock = product.stock;
      this.view.drawCard(product, this.isInCart);
      this.controlCardSlider();
      this.controlCardButtons();
    }
  }

  controlCardSlider() {
    this.view.cardThumbsElem?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target) {
        const thumb = target.closest('.card__thumb');
        if (thumb instanceof HTMLImageElement) {
          this.view.updateImage(thumb.src);
        }
      }
    });
  }

  controlCardButtons() {
    this.view.cardControlElem?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      switch (target.id) {
        case 'cardBtnDec': {
          this.changeCount('dec');
          break;
        }
        case 'cardBtnInc': {
          this.changeCount('inc');
          break;
        }
        case 'cardBtnToCart': {
          this.updateCart();
          break;
        }
        case 'cardBtnOneClick': {
          // this.buyInOneClick(this.id);
          break;
        }
      }
    });
  }

  updateCart() {
    this.view.updateBtnCart();
    console.log('this.isInCart: ', this.isInCart);
    if (this.isInCart) {
      this.state.removeProductFromCart(this.id);
    } else {
      this.state.addProductToCart(this.id, this.count);
      console.log('this.count: ', this.count);
    }
    this.isInCart = !this.isInCart;
  }

  changeCount(operation: string) {
    switch (operation) {
      case 'dec': {
        if (this.count > 1) {
          this.count = this.count - 1;
          this.view.updateCountNumber(this.count);
        }
        break;
      }
      case 'inc': {
        if (this.count < this.stock) {
          this.count = this.count + 1;
          this.view.updateCountNumber(this.count, this.count === this.stock);
        }
        break;
      }
    }
  }
}

export default CardPageController;
