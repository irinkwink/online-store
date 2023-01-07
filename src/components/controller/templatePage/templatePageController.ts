import State from '../../app/state';
import FooterController from './footerController';
import HeaderController from './headerController';
import MainController from './mainController';

class TemplatePageController {
  private _state: State;
  private _header: HeaderController;
  private _main: MainController;
  private _footer: FooterController;

  constructor(state: State) {
    this._state = state;
    this._header = new HeaderController(state);
    this._main = new MainController();
    this._footer = new FooterController();
  }

  public get state() {
    return this._state;
  }

  public get header() {
    return this._header;
  }

  public get main() {
    return this._main;
  }

  public get footer() {
    return this._footer;
  }

  public start(): void {
    const root = document.querySelector('.root');
    if (root) {
      root.innerHTML = '';

      this._header.init();
      this._main.init();
      this._footer.init();

      root.append(this._header.view.header as Node);
      root.append(this._main.view.main as Node);
      root.append(this._footer.view.footer as Node);
    }
  }
}

export default TemplatePageController;
