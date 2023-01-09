import PageController from '../pageController';
import TemplatePageController from '../templatePage/templatePageController';

class Page404Controller extends PageController {
  public constructor(templatePage: TemplatePageController) {
    super(templatePage, 'catalog');
  }

  public start(): void {
    console.log('page 404');
  }
}

export default Page404Controller;
