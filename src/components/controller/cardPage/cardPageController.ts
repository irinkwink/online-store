import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';
import { getSearchParamsFromUrl } from '../../routes/urlController';
import CardPageView from '../../view/cardPage/cardPageView';

class CardPageController {
  view: CardPageView;
  id: number;

  constructor() {
    this.view = new CardPageView();
    this.id = 0;
  }

  start(state: State) {
    console.log('card page');

    const searchParams = getSearchParamsFromUrl();

    const idParam = searchParams.filter((item) => item.key === 'id');
    if (idParam.length !== 0) {
      this.id = +idParam[0].value;
      const product: IProduct = state.getState().products.filter((item) => item.id === this.id)[0];
      console.log('product: ', product);
      this.view.drawCard(product);
    }
  }
}

export default CardPageController;
