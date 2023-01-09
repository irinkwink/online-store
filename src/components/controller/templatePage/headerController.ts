import State from '../../app/state';
import { getSearchParamValueFromUrl } from '../../router/urlController';
import HeaderView from '../../view/templatePage/headerView';

class HeaderController {
  private state: State;
  public view: HeaderView;

  constructor(state: State) {
    this.state = state;
    this.view = new HeaderView();
  }

  public init(): void {
    this.view.draw(this.state.calculateCartTotal());
  }

  public updateHeader(page: string): void {
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

  updateHeaderCartTotal(): void {
    this.view.updateCartTotal(this.state.calculateCartTotal());
  }
}

export default HeaderController;
