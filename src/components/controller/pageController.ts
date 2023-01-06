import State from '../app/state';
import FooterController from './templatePage/footerController';
import HeaderController from './templatePage/headerController';
import MainController from './templatePage/mainController';

class PageController {
  protected state: State;
  private page: string;
  protected header: HeaderController;
  protected main: MainController;
  protected footer: FooterController;

  constructor(state: State, page: string) {
    this.state = state;
    this.page = page;
    this.header = new HeaderController(state);
    this.main = new MainController();
    this.footer = new FooterController();
  }

  public start(): void {
    const root = document.querySelector('.root');
    if (root) {
      root.innerHTML = '';

      this.header.init(this.page);
      this.main.init();
      this.footer.init();

      root.append(this.header.view.header as Node);
      root.append(this.main.view.main as Node);
      root.append(this.footer.view.footer as Node);
    }
  }
}

export default PageController;
