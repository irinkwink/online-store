import State from '../../app/state';
import FooterController from './footerController';
import HeaderController from './headerController';
import MainController from './mainController';

class TemplatePageController {
  private _state: State;
  private _header: HeaderController;
  private _main: MainController;
  private _footer: FooterController;

  public constructor(state: State) {
    this._state = state;
    this._header = new HeaderController(state);
    this._main = new MainController();
    this._footer = new FooterController();
  }

  public get state(): State {
    return this._state;
  }

  public get header(): HeaderController {
    return this._header;
  }

  public get main(): MainController {
    return this._main;
  }

  public get footer(): FooterController {
    return this._footer;
  }

  public start(): void {
    const root = document.querySelector('.root');
    if (root) {
      root.innerHTML = '';

      this._header.init();
      this._main.init();
      this._footer.init();

      if (this._header.view.header) root.append(this._header.view.header);
      if (this._main.view.main) root.append(this._main.view.main);
      if (this._footer.view.footer) root.append(this._footer.view.footer);
    }
  }
}

export default TemplatePageController;
