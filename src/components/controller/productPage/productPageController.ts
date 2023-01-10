import { SLIDER_MOVE } from '../../app/const';
import ProductPageView from '../../view/productPage/productPageView';
import PageController from '../pageController';
import TemplatePageController from '../templatePage/templatePageController';

class ProductPageController extends PageController {
  public view: ProductPageView;
  private id: number;
  private count: number;
  private stock: number;
  private isInCart: boolean;
  private sliderPosition: number;

  public constructor(templatePage: TemplatePageController) {
    super(templatePage, 'product');
    this.view = new ProductPageView();
    this.id = 0;
    this.count = 1;
    this.stock = 1;
    this.isInCart = false;
    this.sliderPosition = 0;
  }

  public start(): void {
    super.start();
    this.view.wrapper = this.main.view.main;

    const fullPath = window.location.pathname;
    const id = fullPath.split('/')[2];

    if (id) {
      this.id = +id;
      const product = this.state.getState().products.find((item) => item.id === this.id);
      const cartProductInfo = this.state.getState().onlineStoreSettings.cart.find((item) => item.id === this.id);
      const numInCart = cartProductInfo ? cartProductInfo.num : 0;
      if (product) {
        this.stock = product.stock;
        this.count = numInCart ? numInCart : 1;
        this.view.draw(product, numInCart);
        this.controlCardSlider();
        this.controlCardButtons();
      } else {
        this.view.drawMessage();
      }
    }
  }

  private controlCardSlider(): void {
    this.view.cardSliderElem?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target) {
        const thumb = target.closest('.card__thumb');
        if (thumb instanceof HTMLImageElement) {
          this.view.updateImage(thumb.src);
        }

        const arrow = target.closest('.card__arrow');
        if (arrow instanceof HTMLButtonElement) {
          this.sliderPosition += arrow.id === 'arrowRrev' ? SLIDER_MOVE : -SLIDER_MOVE;
          this.view.scrollSlider(this.sliderPosition);
        }
      }
    });
  }

  private controlCardButtons(): void {
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
      }
    });
  }

  private updateCart(): void {
    this.view.updateBtnToCart();
    if (this.isInCart) {
      this.state.removeProductFromCart(this.id);
    } else {
      this.state.addProductToCart(this.id, this.count);
    }
    this.header.updateHeaderCartTotal();
    this.isInCart = !this.isInCart;
  }

  private changeCount(operation: string): void {
    switch (operation) {
      case 'dec': {
        if (this.count > 1) {
          this.count -= 1;
          this.view.updateCountNumber(this.count);
        }
        break;
      }
      case 'inc': {
        if (this.count < this.stock) {
          this.count += 1;
          this.view.updateCountNumber(this.count, this.count === this.stock);
        }
        break;
      }
    }
  }
}

export default ProductPageController;
