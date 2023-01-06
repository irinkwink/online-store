import { CartTotal } from '../../../types/types';
import State from '../../app/state';
import { getSearchParamsFromUrl } from '../../router/urlController';
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

  public init(page: string) {
    this.calculateCartTotal();
    this.view.draw(this.cartTotal, page);

    if (page === 'catalog') {
      const searchParams = getSearchParamsFromUrl();

      const searchParam = searchParams.find((item) => item.key === 'search');
      if (searchParam) {
        this.view.updateSearchInput(searchParam.value);
      }
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
