import { CartTotal } from '../../../types/types';
import State from '../../app/state';
import { getSearchParamValueFromUrl } from '../../router/urlController';
import HeaderView from '../../view/templatePage/headerView';

class HeaderController {
  private state: State;
  public view: HeaderView;
  private cartTotal: CartTotal;

  constructor(state: State) {
    this.state = state;
    this.view = new HeaderView();
    this.cartTotal = {
      productsNum: 0,
      totalAmount: 0,
    };
  }

  public init() {
    this.calculateCartTotal();
    this.view.draw(this.cartTotal);
  }

  public updateHeader(page: string) {
    if (page === 'catalog') {
      if (!this.view.searchForm) {
        const searchValue = getSearchParamValueFromUrl('search');

        if (searchValue) {
          this.view.addSearchFormToHeader(searchValue);
        } else {
          this.view.addSearchFormToHeader();
        }
      } else {
        this.view.emptySearchInput();
      }
    } else {
      this.view.removeSearchFormFromHeader();
    }
  }

  private calculateCartTotal() {
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;

    this.cartTotal = cart.reduce(
      (acc, item) => {
        acc.productsNum += item.num;
        const price = products.find((product) => product.id === item.id)?.price;
        if (price) {
          acc.totalAmount += price * item.num;
        }
        return acc;
      },
      {
        productsNum: 0,
        totalAmount: 0,
      }
    );
  }

  updateHeaderCartTotal() {
    this.calculateCartTotal();
    this.view.updateCartTotal(this.cartTotal);
  }
}

export default HeaderController;
