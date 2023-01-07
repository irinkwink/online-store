import PageController from '../pageController';
import TemplatePageController from '../templatePage/templatePageController';

class Page404Controller extends PageController {
  constructor(templatePage: TemplatePageController) {
    super(templatePage, 'catalog');
  }

  start() {
    console.log('page 404');
  }
}

export default Page404Controller;
