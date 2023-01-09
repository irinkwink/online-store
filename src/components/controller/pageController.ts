import State from '../app/state';
import FooterController from './templatePage/footerController';
import HeaderController from './templatePage/headerController';
import MainController from './templatePage/mainController';
import TemplatePageController from './templatePage/templatePageController';

class PageController {
  protected state: State;
  protected header: HeaderController;
  protected main: MainController;
  protected footer: FooterController;
  private page: string;

  protected constructor(templatePage: TemplatePageController, page: string) {
    this.state = templatePage.state;
    this.header = templatePage.header;
    this.main = templatePage.main;
    this.footer = templatePage.footer;
    this.page = page;
  }

  public start(): void {
    this.header.updateHeader(this.page);
    this.main.emptyMain();
  }
}

export default PageController;
