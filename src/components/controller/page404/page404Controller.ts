import Page404View from '../../view/page404/page404View';
import PageController from '../pageController';
import TemplatePageController from '../templatePage/templatePageController';

class Page404Controller extends PageController {
  public view: Page404View;

  public constructor(templatePage: TemplatePageController) {
    super(templatePage, 'page404');
    this.view = new Page404View();
  }

  public start(): void {
    super.start();
    this.view.wrapper = this.main.view.main;

    this.view.draw();
  }
}

export default Page404Controller;
